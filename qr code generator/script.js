function generateQR() {
    var text = document.getElementById("text").value;
    var qr = new QRCode(document.getElementById("qr-code"), {
      text: text,
      width: 128,
      height: 128
    });
  }