import { useEffect, useRef, useState } from 'react';
import { PiPauseCircle, PiPlayCircle } from 'react-icons/pi';
import MicIcon from '../../../../../assets/icons/chatIcons/MicIcon';
import ChatDelete from '../../../../../assets/icons/ChatDelete';
import WaveSurfer from 'wavesurfer.js';

interface IVoiceAudioProps {
  url: string;
  isReadable?: boolean;
  isRecording?: boolean;
  clearVoice?: () => void;
}

export default function VoiceAudio({ url, isRecording, isReadable = false, clearVoice }: IVoiceAudioProps) {
  const [isPlaying, setToggleIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer>();

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current as HTMLElement,
      cursorWidth: 0,
      barWidth: 2,
      barRadius: 10,
      barHeight: isReadable ? 12 : 20,
      barGap: isReadable ? 1 : 2,
      waveColor: '#B2B2B2',
      progressColor: '#BF01FE',
      height: isReadable ? 12 : 20
    });
    waveSurfer.load(url);
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer;
      setDuration(waveSurfer.getDecodedData()?.duration ? String(waveSurfer.getDecodedData()?.duration) : '');
    });

    waveSurfer.on('finish', () => {
      setToggleIsPlaying(waveSurferRef.current?.isPlaying() as boolean);
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [url]);

  const renderDuration = (time: string) => {
    let minutes = String(Math.floor(Number(time) / 60));
    let seconds = String(Math.floor(Number(time) % 60));
    if (Math.floor(Number(time) / 60) < 10) {
      minutes = `0${Math.floor(Number(time) / 60)}`;
    }
    if (Math.floor(Number(time) % 60) < 10) {
      seconds = `0${Math.floor(Number(time) % 60)}`;
    }
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <div className={`flex justify-between ${isReadable ? 'items-center' : 'px-[22px] py-2 bg-[#D9D9D9]'}`}>
        <div className="flex items-center">
          <div className={`${isReadable ? 'mr-1' : 'h-[14px] mr-3'}`}>
            <button
              onClick={() => {
                waveSurferRef.current?.playPause();
                setToggleIsPlaying(waveSurferRef.current?.isPlaying() as boolean);
              }}
              type="button"
              className={`${isReadable ? 'w-5 h-5 p-[3px] rounded-[4px] bg-[#D9D9D9]' : ''}`}
            >
              {isPlaying ? <PiPauseCircle size={14} /> : <PiPlayCircle size={14} />}
            </button>
          </div>
          {duration && !isReadable ? (
            <div className="mr-4 py-[3.5] px-2 rounded-[5px] bg-alsoit-gray-125 text-[11px]">
              {renderDuration(duration)}
            </div>
          ) : null}
        </div>
        <div ref={containerRef} className="w-full min-w-[106px]" />
        {!isReadable ? (
          <div className="flex items-center">
            <div className={`ml-[14px] mr-[10px] rounded-[5px] ${isRecording ? 'recordingAnimation' : ''}`}>
              <MicIcon color={isRecording ? 'white' : ''} />
            </div>
            <div onClick={clearVoice} className="cursor-pointer">
              <ChatDelete />
            </div>
          </div>
        ) : null}
      </div>
      {isReadable && duration ? (
        <div className="inline-block pt-[3px] text-[11px]">{renderDuration(duration)}</div>
      ) : null}
    </div>
  );
}
