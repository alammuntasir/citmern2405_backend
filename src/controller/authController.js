const userModel = require("../model/signup.model");
const generateOTP = require("../utils/otp");
const sendEmail = require("../utils/send_email");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const signupController = async (req, res, next) => {
  let { name, email, password, phone, image, role } = req.body;

  let userfind = await userModel.findOne({ email });

  if (userfind) {
    return res
      .status(500)
      .json({ success: false, message: "email already exist" });
  } else {
    let otp = generateOTP();

    let user = new userModel({
      name,
      email,
      password,
      phone,
      image,
      role,
      otp,
    });
    await user
      .save()
      .then(() => {
        sendEmail(email, otp);

        let info = {
          name: user.name,
          email: user.email,
        };

        return res.status(201).json({
          success: true,
          message: "user created successfull",
          data: info,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
};
const verifyOtpController = async (req, res, next) => {
  let { email, otp } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User Not Found" });
  } else {
    if (user.otp === otp) {
      let verify = await userModel
        .findOneAndUpdate({ email }, { verify: true, otp: null }, { new: true })
        .select("-password");

      return res.status(200).json({
        success: true,
        message: "Otp verify successfully",
        data: verify,
      });
    } else {
      return res.status(404).json({ success: false, message: "Otp Not Match" });
    }
  }
};
const loginController = async (req, res, next) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid credential" });
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "2m",
          }
        );

        return res.status(200).json({
          success: true,
          message: "login successfull",
          data: user,
          token,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Invalid credential" });
      }
    });

    // if (password === user.password) {
    //   return res
    //     .status(200)
    //     .json({ success: true, message: "login successfull", data: user });
    // } else {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Invalid credential" });
    // }
  }
};
const alluserController = async (req, res, next) => {
  try {
    let allusers = await userModel.find({}).select("-password");
    return res
      .status(200)
      .json({
        success: true,
        message: "all users fetch successfully",
        data: allusers,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
module.exports = {
  signupController,
  verifyOtpController,
  loginController,
  alluserController,
};

// setTimeout(async () => {
//   let otpremove = await userModel.findOneAndUpdate(
//     { email },
//     { otp: null },
//     { new: true }
//   );
//   await otpremove.save().then(() => {
//     console.log("otp remove");
//   });
// }, 60000);
