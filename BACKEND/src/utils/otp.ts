export const generateOTP = (): string => {
    // Generate a random number between 1000 and 9999 (inclusive) to ensure 4 digits
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    return otp;
};
