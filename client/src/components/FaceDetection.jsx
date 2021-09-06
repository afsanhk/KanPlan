import React, { useContext, useEffect, useRef } from 'react';
import * as tfjs from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import drawFaceContainer from '../utils/drawFaceContainer';
import '../styles/FaceDetection.scss';
import { imageContext } from '../providers/ImagePorvider';

const blazeface = require('@tensorflow-models/blazeface');

function FaceDetection({ userID, show }) {
  const { setImage } = useContext(imageContext);

  const webcamRef = useRef(null);
  const ctxRef = useRef(null);
  const countDown = 5;
  let count = 0;

  useEffect(() => {
    const timerIntervalId = setInterval(() => {
      (async () => {
        const net = await blazeface.load();
        const returnTensors = !true;

        if (webcamRef.current !== null && webcamRef.current.video.readyState === 4 && typeof webcamRef.current !== undefined) {
          const { video } = webcamRef.current;
          const { videoWidth, videoHeight } = video;
          let ctx;

          ctxRef.current.width = videoWidth;
          ctxRef.current.height = videoHeight;

          const detections = await net.estimateFaces(video, returnTensors);

          if (detections.length) {
            count++;
          } else {
            count = 0;
          }
    
          if (count === countDown) {
          
          } else if (count === countDown + 5) {
            capture(count, countDown);
          }
          if (ctxRef.current) {
            ctx = ctxRef.current.getContext('2d');
            drawFaceContainer(ctx, detections, ctxRef.current.width, ctxRef.current.height, count, countDown);
          }
        }
      })();
    }, 1000);

    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc, userID);
  };
  return (
    <div className="face-detection">
      <div className="face-detection-container">
        <Webcam className="face-detection-webcam" muted audio={false} screenshotFormat="image/jpeg" autoPlay mirrored ref={webcamRef} />
        <canvas className="face-detection-canvas" ref={ctxRef}></canvas>
      </div>
    </div>
  );
}

export default FaceDetection;
