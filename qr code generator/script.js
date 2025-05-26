/* global QRCode */

// eslint-disable-next-line no-unused-vars
function generateQR() {
  const text = document.getElementById('text').value;

  // Clear previous QR code
  const qrContainer = document.getElementById('qr-code');
  qrContainer.innerHTML = '';

  // Generate new QR code
  new QRCode(qrContainer, {
    text: text,
    width: 128,
    height: 128
  });
}
