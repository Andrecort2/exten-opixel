document.getElementById('applyPixelArt').addEventListener('click', () => {
  // Obter o valor atual do campo de entrada
  const pixelCount = parseInt(document.getElementById('pixelCount').value);

  // Enviar mensagem para o content script com o valor de pixelCount
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'applyPixelArt', pixelCount });
  });

  // Fechar o popup após clicar no botão
  window.close();
});
