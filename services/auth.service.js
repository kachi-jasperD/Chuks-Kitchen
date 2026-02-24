const bcrypt = require("bcryptjs");
const userRepo = require("../repositories/user.repository");
const generateToken = require("../utils/generateToken");

// ================= REGISTER =================

const register = async (data) => {
  const existing = await userRepo.findByEmail(data.email);
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const verificationOtp = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  const user = await userRepo.createUser({
    ...data,
    password: hashedPassword,
    isVerified: false,
    verificationOtp,
    verificationOtpExpires: new Date(Date.now() + 10 * 60 * 1000),
  });

  console.log("Verification OTP:", verificationOtp);

  return {
    message: "User registered. Please verify OTP.",
  };
};

// ================= VERIFY REGISTRATION OTP =================
const verifyRegistrationOtp = async (email, otp) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");

  if (user.isVerified) {
    throw new Error("User already verified");
  }

  if (user.verificationOtp !== otp.toString()) {
    throw new Error("Invalid OTP");
  }

  if (user.verificationOtpExpires < Date.now()) {
    throw new Error("OTP expired");
  }

  await userRepo.updateUser(user._id, {
    isVerified: true,
    verificationOtp: null,
    verificationOtpExpires: null,
  });

  return { message: "Account verified successfully" };
};

// ================= LOGIN =================
const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  if (!user.isVerified) {
    throw new Error("Please verify your account first");
  }

  const token = generateToken(user);

  return { user, token };
};

// ================= FORGOT PASSWORD =================
const forgotPassword = async (email) => {
  if (!email) throw new Error("Email is required");

  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  await userRepo.updateUser(user.id, {
    otp,
    otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
  });

  // Here you would send email (nodemailer etc.)
  console.log("OTP:", otp);

  return { message: "OTP sent to email" };
};

// ================= VERIFY OTP =================
const verifyOtp = async (email, otp) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");

  if (!user.otp || user.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.otpExpires < Date.now()) {
    throw new Error("OTP expired");
  }

  return { message: "OTP verified successfully" };
};

// ================= RESET PASSWORD =================
const resetPassword = async (email, newPassword) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userRepo.updateUser(user.id, {
    password: hashedPassword,
    otp: null,
    otpExpires: null,
  });

  return { message: "Password reset successful" };
};

module.exports = {
  register,
  verifyRegistrationOtp,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
