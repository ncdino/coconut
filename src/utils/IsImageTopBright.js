export const isImageTopBright = (imageUrl, callback) => {
  const image = new Image();
  image.crossOrigin = "Anonymous"; // CORS 문제 방지
  image.src = imageUrl;

  image.onload = function () {
    // canvas 생성
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    // 이미지 그리기
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // 상단 10픽셀 추출
    const imageData = ctx.getImageData(0, 0, image.width, 10).data;

    let totalBrightness = 0;
    const pixelCount = imageData.length / 4;

    // 모든 픽셀의 밝기를 합산
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];

      // RGB를 이용한 밝기 계산 (Y = 0.299R + 0.587G + 0.114B)
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      totalBrightness += brightness;
    }

    // 평균 밝기 계산
    const avgBrightness = totalBrightness / pixelCount;

    // 기준 밝기 128을 기준으로 true/false 반환
    const isBright = avgBrightness > 128;

    callback(isBright);
  };
};
