function generateQR() {
    var container = document.getElementById("qr-code");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    var ssid = document.getElementById("ssid").value;
    var password = document.getElementById("password").value;
    var text = `WIFI:S:${ssid};T:WPA;P:${password};;`;
    var qr = new QRCode(document.getElementById("qr-code"), {
        text: text,
        width: 128,
        height: 128
    })
}

function updateButton() {
    var ssid = document.getElementById("ssid").value;
    var button = document.getElementById("generate-button");
    if (ssid.trim() === "") {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }