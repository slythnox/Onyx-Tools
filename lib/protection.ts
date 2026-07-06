/**
 * ONYX Security & Code Protection Layer
 * Protects the source code from simple inspect-element, keyboard snooping, and developer tools.
 */

let warningOverlay: HTMLDivElement | null = null;
let isDevToolsOpen = false;

function showDevToolsWarning() {
  if (warningOverlay) {
    warningOverlay.style.display = 'flex';
    return;
  }

  warningOverlay = document.createElement('div');
  warningOverlay.id = 'onyx-devtools-warning';
  warningOverlay.setAttribute('style', `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    background-color: #000000 !important;
    color: #ffffff !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    font-family: 'JetBrains Mono', monospace !important;
    text-align: center !important;
    padding: 24px !important;
    box-sizing: border-box !important;
  `);

  warningOverlay.innerHTML = `
    <div style="max-width: 500px; border: 1px solid #ef4444; border-radius: 8px; padding: 32px; background: #0a0a0a; box-shadow: 0 10px 40px rgba(0,0,0,0.85); font-family: sans-serif;">
      <div style="font-size: 40px; margin-bottom: 20px; color: #ef4444;">⚠️</div>
      <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #ffffff; letter-spacing: -0.02em;">Developer Tools Detected</h1>
      <p style="font-size: 13px; color: #a1a1aa; line-height: 1.6; margin-bottom: 24px;">
        To protect source code integrity and ensure system security, developer tools are disabled in production.
      </p>
      <div style="font-size: 11px; font-family: monospace; color: #ef4444; border: 1px dashed rgba(239,68,68,0.3); background: rgba(239,68,68,0.05); padding: 10px; border-radius: 4px; display: inline-block;">
        Please close Developer Tools to continue using ONYX.
      </div>
    </div>
  `;

  document.body.appendChild(warningOverlay);
  document.body.style.overflow = 'hidden';
}

function hideDevToolsWarning() {
  if (warningOverlay) {
    warningOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

export function initProtection() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  }, false);

  // 2. Disable Common DevTools and View-Source Keyboard Shortcuts
  document.addEventListener('keydown', (event) => {
    if (isDevToolsOpen) {
      event.preventDefault();
      return false;
    }

    // Disable F12
    if (event.key === 'F12' || event.keyCode === 123) {
      event.preventDefault();
      return false;
    }

    // Disable Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Inspector)
    if (
      event.ctrlKey &&
      event.shiftKey &&
      (event.key === 'I' ||
        event.key === 'i' ||
        event.key === 'J' ||
        event.key === 'j' ||
        event.key === 'C' ||
        event.key === 'c')
    ) {
      event.preventDefault();
      return false;
    }

    // Disable Ctrl+U (View Source)
    if (event.ctrlKey && (event.key === 'U' || event.key === 'u')) {
      event.preventDefault();
      return false;
    }

    // Disable Ctrl+S (Save Page)
    if (event.ctrlKey && (event.key === 'S' || event.key === 's')) {
      event.preventDefault();
      return false;
    }
  }, false);

  // 3. DevTools Detection Loop
  const checkDevTools = () => {
    const threshold = 160;
    
    // Check sizing differences (detect docked panels)
    const widthDev = (window.outerWidth - window.innerWidth) > threshold;
    const heightDev = (window.outerHeight - window.innerHeight) > threshold;

    // Check debugger timing execution (detect undocked panels)
    let debugDetected = false;
    const t1 = performance.now();
    debugger;
    const t2 = performance.now();
    if ((t2 - t1) > 100) {
      debugDetected = true;
    }

    if (widthDev || heightDev || debugDetected) {
      isDevToolsOpen = true;
      showDevToolsWarning();
    } else {
      isDevToolsOpen = false;
      hideDevToolsWarning();
    }
  };

  // Run initial check and start loop
  checkDevTools();
  setInterval(checkDevTools, 500);
}
