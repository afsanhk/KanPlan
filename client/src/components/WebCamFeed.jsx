import React, { useRef } from 'react';

function WebCamFeed() {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  return (
    <div>
      <button>Take a photo</button>
      <video ref={videoRef} />
      <canvas />
    </div>
  );
}

export default WebCamFeed;
