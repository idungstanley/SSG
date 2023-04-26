import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

export default function Recording() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });

  // console.log(mediaBlobUrl);

  return (
    <div>
      {status == 'recording' ? (
        <>
          <button onClick={stopRecording} className="screenRecording">
            Stop Recording
          </button>
        </>
      ) : (
        <>
          <div className="screenRecording flex flex-col">
            <button onClick={startRecording}>Start Recording</button>
            <br />
            <p>{mediaBlobUrl && <video src={mediaBlobUrl} controls />}</p>
          </div>
        </>
      )}
    </div>
  );
}
