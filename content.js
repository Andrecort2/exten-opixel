function applyPixelArt(context, canvas, pixelSize) {
  const width = canvas.width;
  const height = canvas.height;

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const pixelData = context.getImageData(x, y, pixelSize, pixelSize);
      const pixelColor = pixelData.data.slice(0, 4);
      context.fillStyle = `rgba(${pixelColor[0]}, ${pixelColor[1]}, ${pixelColor[2]}, ${pixelColor[3] / 255})`;
      context.fillRect(x, y, pixelSize, pixelSize);
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applyPixelArt') {
    const images = document.getElementsByTagName('img');

    for (const img of images) {
      img.crossOrigin = 'anonymous';
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0, img.width, img.height);

      // Aplicar o efeito de pixel art no canvas
      applyPixelArt(context, canvas, 4);

      // Substituir a imagem original pelo conteúdo do canvas
      img.src = canvas.toDataURL();
    }
  }
});
