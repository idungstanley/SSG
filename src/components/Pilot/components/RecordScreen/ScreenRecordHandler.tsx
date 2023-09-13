import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setScreenRecording, setScreenRecordingMedia } from '../../../../features/task/taskSlice';
import { useMediaStream } from '../../../../features/task/taskService';

export function useScreenRecorder() {
  const dispatch = useAppDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedData, setrecordedData] = useState<{
    recorder: MediaRecorder | null;
    stream: MediaStream | null;
  }>({
    recorder: null,
    stream: null
  });
  const [recordedBlob, setRecordedBlob] = useState<Blob | undefined>(undefined);

  const { isMuted } = useAppSelector((state) => state.workspace);
  const { recorder, stream, screenRecording, recordBlob } = useAppSelector((state) => state.task);

  const { handleStopStream } = useMediaStream();

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      const combinedStream = new MediaStream();

      userStream.getTracks().forEach((track) => combinedStream.addTrack(track));
      screenStream.getTracks().forEach((track) => combinedStream.addTrack(track));

      combinedStream.getAudioTracks().map((tracks) => (tracks.enabled = !isMuted));

      const recorder = new MediaRecorder(combinedStream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        handleStopStream({ blob });
        setRecordedBlob(blob);
        setIsRecording(false);
      };
      setrecordedData({ recorder, stream: combinedStream });
      dispatch(setScreenRecording('recording'));

      recorder.start();
      return { recorder, combinedStream: stream };
    } catch (error) {
      console.error('Error starting screen recording:', error);
    }
  };

  const stopRecording = () => {
    if (recorder && recorder.state !== 'inactive') {
      dispatch(setScreenRecording('idle'));
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (recordedData.recorder && recordedData.stream) {
      dispatch(setScreenRecordingMedia(recordedData));
    }
  }, [recordedData]);

  useEffect(() => {
    if (screenRecording === 'recording') {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }

    return () => {
      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onstop = null;
      }
    };
  }, [screenRecording]);

  return { startRecording, stopRecording, isRecording, recordedBlob, recordedData };
}
