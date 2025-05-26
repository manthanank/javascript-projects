/* global QRCode */

let currentQRCode = null;

function generateQR() {
  const container = document.getElementById('qr-code');
  const placeholder = document.getElementById('qr-placeholder');
  const actions = document.getElementById('qr-actions');
  const button = document.getElementById('generate-button');

  // Clear previous QR code
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Get form values
  const ssid = document.getElementById('ssid').value.trim();
  const password = document.getElementById('password').value;
  const security = document.getElementById('security').value;
  const hidden = document.getElementById('hidden').checked;

  if (!ssid) {
    showNotification('Please enter a network name (SSID)', 'error');
    return;
  }

  // Show loading state
  button.innerHTML = '<div class="loading"></div> Generating...';
  button.disabled = true;

  // Build WiFi QR code string
  let wifiString = `WIFI:T:${security};S:${ssid};`;

  if (security !== 'nopass' && password) {
    wifiString += `P:${password};`;
  }

  if (hidden) {
    wifiString += 'H:true;';
  }

  wifiString += ';';

  // Generate QR code with enhanced options
  try {
    currentQRCode = new QRCode(container, {
      text: wifiString,
      width: 256,
      height: 256,
      colorDark: '#1f2937',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });

    // Hide placeholder and show actions
    placeholder.style.display = 'none';
    actions.style.display = 'flex';

    // Add animation
    container.classList.add('fade-in-up');

    showNotification('QR code generated successfully!', 'success');
  } catch (error) {
    console.error('Error generating QR code:', error);
    showNotification('Failed to generate QR code. Please try again.', 'error');
  } finally {
    // Reset button
    button.innerHTML = '<i class="fas fa-qrcode"></i> Generate QR Code';
    button.disabled = false;
  }
}

// eslint-disable-next-line no-unused-vars
function updateButton() {
  const ssid = document.getElementById('ssid').value.trim();
  const button = document.getElementById('generate-button');

  if (ssid === '') {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}

function togglePasswordField() {
  const security = document.getElementById('security').value;
  const passwordGroup = document.getElementById('password-group');

  if (security === 'nopass') {
    passwordGroup.style.display = 'none';
  } else {
    passwordGroup.style.display = 'block';
  }
}

// eslint-disable-next-line no-unused-vars
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.getElementById('password-toggle-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.className = 'fas fa-eye-slash';
  } else {
    passwordInput.type = 'password';
    toggleIcon.className = 'fas fa-eye';
  }
}

// eslint-disable-next-line no-unused-vars
function downloadQR() {
  if (!currentQRCode) {
    showNotification('No QR code to download', 'error');
    return;
  }

  try {
    const canvas = document.querySelector('#qr-code canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `wifi-qr-${document.getElementById('ssid').value}.png`;
      link.href = canvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification('QR code downloaded successfully!', 'success');
    }
  } catch (error) {
    console.error('Error downloading QR code:', error);
    showNotification('Failed to download QR code', 'error');
  }
}

// eslint-disable-next-line no-unused-vars
function shareQR() {
  if (!currentQRCode) {
    showNotification('No QR code to share', 'error');
    return;
  }

  const ssid = document.getElementById('ssid').value;
  const shareText = `Connect to WiFi network "${ssid}" by scanning this QR code`;

  if (navigator.share) {
    try {
      const canvas = document.querySelector('#qr-code canvas');
      if (canvas) {
        canvas.toBlob(blob => {
          const file = new File([blob], `wifi-qr-${ssid}.png`, { type: 'image/png' });
          navigator.share({
            title: 'WiFi QR Code',
            text: shareText,
            files: [file]
          });
        });
      }
    } catch (error) {
      console.error('Error sharing QR code:', error);
      fallbackShare(shareText);
    }
  } else {
    fallbackShare(shareText);
  }
}

function fallbackShare(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Share text copied to clipboard!', 'success');
    }).catch(() => {
      showNotification('Could not copy to clipboard', 'error');
    });
  } else {
    showNotification('Sharing not supported on this device', 'error');
  }
}

// eslint-disable-next-line no-unused-vars
function clearQR() {
  const container = document.getElementById('qr-code');
  const placeholder = document.getElementById('qr-placeholder');
  const actions = document.getElementById('qr-actions');

  // Clear QR code
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  currentQRCode = null;

  // Show placeholder and hide actions
  placeholder.style.display = 'flex';
  actions.style.display = 'none';

  showNotification('QR code cleared', 'success');
}

function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
    max-width: 300px;
  `;

  // Add to document
  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 3000);
}

function getNotificationIcon(type) {
  switch (type) {
  case 'success': return 'fa-check-circle';
  case 'error': return 'fa-exclamation-circle';
  case 'warning': return 'fa-exclamation-triangle';
  default: return 'fa-info-circle';
  }
}

function getNotificationColor(type) {
  switch (type) {
  case 'success': return '#10b981';
  case 'error': return '#ef4444';
  case 'warning': return '#f59e0b';
  default: return '#6366f1';
  }
}

// Add CSS for notifications
const notificationCSS = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  // Set default security type
  togglePasswordField();

  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      const button = document.getElementById('generate-button');
      if (!button.disabled) {
        generateQR();
      }
    }
  });
});
