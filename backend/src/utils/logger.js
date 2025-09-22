const disabled = process.env.DISABLE_LOGS === 'true';
export default {
  log: (...args) => { if (!disabled) console.log(...args); },
  info: (...args) => { if (!disabled) console.info(...args); },
  error: (...args) => { if (!disabled) console.error(...args); }
};