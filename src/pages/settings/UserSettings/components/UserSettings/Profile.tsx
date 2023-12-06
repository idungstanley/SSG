import CurrentUser from './CurrentUser';
import Region from './Region';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import {
  setAvatarFile,
  setCurrentUserModal,
  setShowAvatarUpload,
  setShowConfirmationModal,
  setUserInfo
} from '../../../../../features/settings/user/userSettingsSlice';
import UploadAvatar from '../UploadAvatar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PaletteManager from '../../../../../components/ColorPalette';
import { UseRemoveAvatar, UseUpdateAvatar } from '../../../../../features/settings/user/userSettingsServices';
import { DependencyList, useEffect, useRef, useState } from 'react';
import { ListColourProps } from '../../../../../components/tasks/ListItem';
import { useGetColors } from '../../../../../features/account/accountService';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import { setPaletteDropDown } from '../../../../../features/account/accountSlice';
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Menu } from '@mui/material';

function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn(...(deps as []));
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}

async function canvasPreview(image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
  ctx.restore();
}

function Profile() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { name, email, time_format, date_format, start_week, showAvatarUpload, userData, avatarFile } = useAppSelector(
    (state) => state.userSetting
  );
  const { paletteDropdown } = useAppSelector((state) => state.account);
  const { updateCords } = useAppSelector((state) => state.task);

  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [paletteColor, setPaletteColor] = useState<string | ListColourProps | null | undefined>(
    userData?.color as string
  );

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const { show } = paletteDropdown;

  useGetColors();

  const updateAvatarMutation = useMutation(UseUpdateAvatar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['self']);
      dispatch(setAvatarFile(null));
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  });

  const deleteAvatarMutation = useMutation(UseRemoveAvatar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['self']);
      dispatch(setCurrentUserModal(false));
    }
  });

  const { cords, relativeRef } = useAbsolute(updateCords, 266);

  const handleUpdateColor = (c: string | ListColourProps | null | undefined) => {
    setPaletteColor(c);
    dispatch(setUserInfo({ color: c as string }));
  };

  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  const onDownloadCropClick = async () => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    const blob = await offscreen.convertToBlob({ type: 'image/png' });
    const newFile = new File([blob], 'avatar.png', { type: 'image/png' });

    updateAvatarMutation.mutateAsync(newFile);
  };

  useEffect(() => {
    if (avatarFile?.preview && !crop && !completedCrop) {
      const startedPosition = {
        unit: 'px',
        width: 50,
        height: 50,
        x: 0,
        y: 0
      };
      setCrop(startedPosition as Crop);
    }
  }, [avatarFile?.preview, crop, completedCrop]);

  return (
    <div className="w-full m-2 bg-white rounded-lg">
      <div className="p-4 overflow-y-auto" style={{ maxHeight: '98vh' }}>
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          PERSONAL PROFILE
        </h1>
        <section>
          <div className="flex justify-center my-2">
            <div>
              <CurrentUser paletteColor={paletteColor} />
            </div>
          </div>
          <div className="flex justify-center w-full" ref={relativeRef}>
            {show && (
              <>
                <PaletteManager
                  setPaletteColor={handleUpdateColor}
                  cords={{ top: cords.top - 20, left: cords.left - 40 }}
                  bottomContent={
                    <div className="p-2">
                      <div
                        className="flex justify-center w-full p-1 text-blue-600 border border-blue-500 rounded cursor-pointer hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          dispatch(setShowAvatarUpload(true));
                          dispatch(setPaletteDropDown({ show: false, paletteId: null }));
                        }}
                      >
                        <button className="text-xs">Add custom avatar</button>
                      </div>
                      {userData?.avatar_path && (
                        <div
                          className="flex justify-center w-full p-1 my-1 text-red-600 border border-red-500 rounded cursor-pointer hover:bg-red-600 hover:text-white"
                          onClick={() => deleteAvatarMutation.mutateAsync()}
                        >
                          <button className="text-xs">Remove Avatar</button>
                        </div>
                      )}
                    </div>
                  }
                />
              </>
            )}
          </div>

          <section>
            <h1 className="my-2 font-semibold" style={{ fontSize: '15px' }}>
              EDIT PROFILE
            </h1>
            <div className="my">
              <h5 className="font-semibold my" style={{ fontSize: '15px' }}>
                Full Name
              </h5>
              <input
                type="text"
                className="w-full h-10 rounded"
                style={{ fontSize: '15px' }}
                value={name}
                onChange={(e) => {
                  dispatch(setUserInfo({ name: e.target.value }));
                }}
              />
            </div>
            <div className="my-2">
              <h5 className="font-semibold my" style={{ fontSize: '15px' }}>
                Email
              </h5>
              <input
                type="text"
                className="w-full h-10 rounded"
                style={{ fontSize: '15px' }}
                value={email}
                onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
              />
            </div>
            <div className="my-2">
              <h5 className="font-semibold my" style={{ fontSize: '15px' }}>
                Password
              </h5>
              <input
                type="password"
                className="w-full h-10 rounded"
                style={{ fontSize: '15px' }}
                defaultValue="https://www.alsoit.io"
                onFocus={() => {
                  dispatch(setShowConfirmationModal(true));
                }}
              />
            </div>
          </section>
          <section>
            <div className="my">
              <h1 className="my-2 font-semibold" style={{ fontSize: '15px' }}>
                LANGUAGE & REGION SETTINGS
              </h1>
            </div>
            <div className="flex justify-between my-3">
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Language
                </h5>
                <select name="language" style={{ fontSize: '15px' }} className="w-full h-10 text-xs rounded my">
                  <option value="en">English</option>
                </select>
              </div>
              <div style={{ width: '48%' }}>
                <h5 className="font-bold" style={{ fontSize: '15px' }}>
                  Region
                </h5>
                <Region />
              </div>
            </div>
            <div className="flex justify-between my-3 ">
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Start of the week
                </h5>
                <select
                  name="Day"
                  className="w-full h-10 rounded my"
                  value={start_week}
                  onChange={(e) => dispatch(setUserInfo({ start_week: e.target.value }))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="1">Monday</option>
                  <option value="0">Sunday</option>
                </select>
              </div>
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Time Format
                </h5>
                <select
                  name="Time-format"
                  className="w-full h-10 rounded my"
                  value={time_format}
                  onChange={(e) => dispatch(setUserInfo({ time_format: e.target.value }))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="1">24-hours</option>
                  <option value="0">12-hours</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between my-3 ">
              <div style={{ width: '48%' }}>
                <h5 className="font-semibold" style={{ fontSize: '15px' }}>
                  Date Format
                </h5>
                <select
                  name="Date-format"
                  className="w-full h-10 rounded my"
                  value={date_format}
                  onChange={(e) => dispatch(setUserInfo({ date_format: e.target.value }))}
                  style={{ fontSize: '15px' }}
                >
                  <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                  <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                  <option value="yyyy/mm/dd">yyyy/mm/dd</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="flex items-center justify-center h-10 px-3 my-8 font-bold border-2 rounded text-alsoit-danger border-alsoit-danger w-52"
                style={{ fontSize: '15px' }}
              >
                Delete Account
              </button>
            </div>
          </section>
        </section>

        {showAvatarUpload && <UploadAvatar />}

        <Menu
          open={!!avatarFile}
          onClose={() => {
            dispatch(setAvatarFile(null));
            setCrop(undefined);
            setCompletedCrop(undefined);
          }}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          PaperProps={{
            style: { borderRadius: '5px' }
          }}
        >
          <div key="avatar_image" className="flex flex-col items-center min-w-[400px] p-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
            >
              <img ref={imgRef} src={avatarFile?.preview} style={{ maxHeight: '300px' }} />
            </ReactCrop>
            {!!completedCrop && (
              <>
                <div className="flex justify-center mt-2">
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      objectFit: 'contain',
                      width: completedCrop.width,
                      height: completedCrop.height,
                      borderRadius: '50%'
                    }}
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-end mt-2">
                    <button
                      className="flex hover:bg-alsoit-purple-100 text-white font-bold py-2 px-6 rounded bg-alsoit-purple-300"
                      onClick={onDownloadCropClick}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Menu>
      </div>
    </div>
  );
}

export default Profile;
