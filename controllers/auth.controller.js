const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyRegistrationOtp(email, otp);

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(
      req.body.email,
      req.body.password,
    );

    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const result = await authService.verifyOtp(req.body.email, req.body.otp);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const result = await authService.resetPassword(
      req.body.email,
      req.body.newPassword,
    );
    res.send("Password reset successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  verifyRegistrationOtp,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
