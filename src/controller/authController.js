const userModel = require("../model/signup.model");
const generateOTP = require("../utils/otp");
const sendEmail = require("../utils/send_email");
const signupController = async (req, res, next) => {
  let { name, email, password, phone, image, role } = req.body;

  let otp = generateOTP();


  let user = new userModel({ name, email, password, phone, image, role });
  await user
    .save()
    .then(() => {
      sendEmail(email, otp);
      return res.status(201).json({
        success: true,
        message: "user created successfull",
        data: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { signupController };
