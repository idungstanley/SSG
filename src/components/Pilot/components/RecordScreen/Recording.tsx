import React, { useState } from 'react';

export default function Recording() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  const startRecording = async () => {
    const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
    setStream(displayStream);
    const mediaRecorder = new MediaRecorder(displayStream);
    setRecorder(mediaRecorder);
    const chunks: BlobPart[] = [];
    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      const videoUrl = URL.createObjectURL(blob);
      setVideoUrl(videoUrl);
    };
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (recorder?.state === 'recording') {
      recorder.stop();
      stream?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div>
      {isRecording ? (
        <>
          <video src={videoUrl} controls />
          <button onClick={stopRecording} className="screenRecording"></button>
        </>
      ) : (
        <>
          <div className="screenRecording">
            {videoUrl && <video src={videoUrl} controls />}
            <button onClick={startRecording}>Start Recording</button>
          </div>
        </>
      )}
    </div>
  );
}

// export default function Recording() {
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);

//   const startRecording = async () => {
//     const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//     setStream(displayStream);
//     const mediaRecorder = new MediaRecorder(displayStream);
//     setRecorder(mediaRecorder);
//     const chunks: BlobPart[] = [];
//     mediaRecorder.ondataavailable = (e: BlobEvent) => {
//       chunks.push(e.data);
//     };
//     mediaRecorder.onstop = () => {
//       const blob = new Blob(chunks, { type: 'video/mp4' });
//       const videoUrl = URL.createObjectURL(blob);
//       setVideoUrl(videoUrl);
//     };
//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (recorder?.state === 'recording') {
//       recorder.stop();
//       stream?.getTracks().forEach((track) => track.stop());
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div>
//       {isRecording ? (
//         <>
//           <video src={videoUrl as string} controls />
//           <button onClick={stopRecording}>Stop Recording</button>
//         </>
//       ) : (
//         <button onClick={startRecording}>Start Recording</button>
//       )}
//     </div>
//   );
// }
