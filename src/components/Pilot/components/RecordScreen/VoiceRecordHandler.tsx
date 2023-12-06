import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setVoiceRecording, setVoiceRecordingMedia } from '../../../../features/task/taskSlice';

export function useVoiceRecorder() {
  const dispatch = useAppDispatch();

  const [isRecording, setIsRecording] = useState(false);
  const [recordedData, setRecordedData] = useState<{
    recorder: MediaRecorder | null;
    stream: MediaStream | null;
  }>({
    recorder: null,
    stream: null
  });
  const [recordedBlob, setRecordedBlob] = useState<Blob | undefined>(undefined);

  const { recorder, stream, voiceRecording } = useAppSelector((state) => state.task);

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const combinedStream = new MediaStream();

      userStream.getTracks().forEach((track) => combinedStream.addTrack(track));

      combinedStream.getAudioTracks();

      const recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });

      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedBlob(blob);
        setIsRecording(false);
      };
      setRecordedData({ recorder, stream: combinedStream });
      dispatch(setVoiceRecording('recording'));

      recorder.start();
      return { recorder, combinedStream: stream };
    } catch (error) {
      return error;
    }
  };

  const stopRecording = () => {
    if (recorder && recorder.state !== 'inactive') {
      dispatch(setVoiceRecording('idle'));
    }

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (recordedData.recorder && recordedData.stream) {
      dispatch(setVoiceRecordingMedia(recordedData));
    }
  }, [recordedData]);

  useEffect(() => {
    if (voiceRecording === 'recording') {
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
  }, [voiceRecording]);

  return { startRecording, stopRecording, isRecording, recordedBlob, recordedData };
}
