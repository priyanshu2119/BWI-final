// This adds the 'module' object to the window when it's not defined
if (typeof window !== 'undefined' && !window.module) {
  window.module = { exports: {} };
}