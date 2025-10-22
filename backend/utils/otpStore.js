// otpStore.js
const otpStore = new Map(); // { email: { otp, expiresAt, userData } }

export const setOTP = (email, otp, userData) => {
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000, userData }); // 5 min
};

export const verifyOTP = (email, otp) => {
  const record = otpStore.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  if (record.otp !== otp) return false;
  otpStore.delete(email);
  return record.userData;
};
