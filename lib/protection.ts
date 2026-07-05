/**
 * OnyxUi Security & Code Protection Layer
 * Protects the source code from simple inspect-element, keyboard snooping, and developer tools.
 */

export function initProtection() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  }, false);

  // 2. Disable Common DevTools and View-Source Keyboard Shortcuts
  document.addEventListener('keydown', (event) => {
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

  // 3. Infinite Debugger Loop to Pause Execution if DevTools is Opened
  const blockInspectors = () => {
    const emitDebugger = () => {
      try {
        // Construct and execute a debugger statement dynamically to trigger pauses
        (function () {
          return true;
        })
          .constructor('debugger')
          .call('action');
      } catch {
        // Fail-silent
      }
    };

    // Run the debugger check periodically
    setInterval(emitDebugger, 150);
  };

  blockInspectors();
}
