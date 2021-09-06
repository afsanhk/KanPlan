const drawFaceContainer = (ctx, detections, canvasWidth, canvasHeight, count, countDown) => {
  detections.forEach((detection) => {
    // do the magic
    const { topLeft, bottomRight, landmarks } = detection;
    const rightEye = [landmarks[0][0], landmarks[0][1]];
    const leftEye = [landmarks[1][0], landmarks[1][1]];
    const nose = [landmarks[2][0], landmarks[2][1]];
    const mouth = [landmarks[3][0], landmarks[3][1]];
    const rightEar = [landmarks[4][0], landmarks[4][1]];
    const leftEar = [landmarks[5][0], landmarks[5][1]];

    if (count === countDown) {
      ctx.font = '30px Arial';
      ctx.fillText('Face Detected!', canvasWidth - 230, 50);
    } else if (count > countDown && count <= countDown + 4) {
      ctx.font = '30px Arial';
      ctx.fillText(`CountDown: ${countDown + 4 - count}`, canvasWidth - 230, 50);
    } else if (count < countDown) {
      ctx.scale(-1, 1);
      ctx.fillStyle = 'rgba(256,0,0,0.3)';
      ctx.fillRect(topLeft[0] - canvasWidth, topLeft[1], bottomRight[0] - topLeft[0], bottomRight[1] - topLeft[1]);
      ctx.fillStyle = 'black';
      ctx.fillRect(rightEye[0] - canvasWidth, rightEye[1], 5, 5);
      ctx.fillRect(leftEye[0] - canvasWidth, leftEye[1], 5, 5);
      ctx.fillRect(nose[0] - canvasWidth, nose[1], 5, 5);
      ctx.fillRect(mouth[0] - canvasWidth, mouth[1], 5, 5);
      ctx.fillRect(rightEar[0] - canvasWidth, rightEar[1], 5, 5);
      ctx.fillRect(leftEar[0] - canvasWidth, leftEar[1], 5, 5);
    } else if (count === countDown + 5) {
      ctx.font = '30px Arial';
      ctx.fillText('Taking Picture!', canvasWidth - 230, 50);
    } else {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  });
};
export default drawFaceContainer;
