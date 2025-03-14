import { isValidObjectId, set } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MyMail } from "../utils/sendMail.js";
import crypto from "crypto";
import { VerifyEmailToken } from "../models/verifyEmailToken.model.js";

export const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, lastName } = req.body;

  [name, email, password, lastName].forEach((item, index) => {
    if (!item) throw new ApiError(422, `Please provide required fields`);
  });

  const user = await User.findOne({ email });

  if (user) {
    throw new ApiError(422, `user is already registered with same emailId`);
  }

  const createduser = await User.create({
    name,
    email,
    password,
    lastName,
  });

  const token = crypto.randomBytes(32).toString("hex");
  const link = `${process.env.BASEURL}/verify?id=${createduser._id}&token=${token}`;

  await VerifyEmailToken.create({ owner: createduser._id, token });

  const mail = new MyMail(email);
  mail.sendEmail(
    `Your Account has been created.Please <a href=${link}>click here</a> to verify email`
  );

  return res.status(201).json(
    new ApiResponse("Please Check your Inbox to verify email.", {
      profile: { id: createduser._id, name, email, lastName },
    })
  );
});

export const getLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  [email, password].forEach((item) => {
    if (!item) throw new ApiError(422, "Please provide email and password");
  });

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isMatched = await user.comparePassword(password);

  if (!isMatched) throw new ApiError(403, "Password is wrong");

  if (!user.isVerified)
    throw new ApiError(
      403,
      "Your Email is not verified. Please check your email to verify"
    );

  const accessToken = await user.getAccessToken();
  const refreshToken = await user.getRefreshToken();

  if (!accessToken || !refreshToken)
    throw new ApiError(500, "Something went wrong while generating tokens");

  user.refreshToken = refreshToken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse("User logged in successfully", {
        profile: {
          id: user._id,
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          isVerified: user.isVerified,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    );
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) throw new ApiError(401, "user not found");

  res.status(200).json(
    new ApiResponse("user profile fetched", {
      profile: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      },
    })
  );
});

export const getLogout = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId || !isValidObjectId(userId))
    throw new ApiError(403, "unAuthorized request");

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  if (!user) throw new ApiError(403, "user not found");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse("User logged out successfully"));
});

export const verifyEmailLink = asyncHandler(async (req, res) => {
  const { id, token } = req.body;

  const dbToken = await VerifyEmailToken.findOneAndDelete({ owner: id, token });

  if (!dbToken) throw new ApiError(422, "Invalid Token");

  const user = await User.findOne({ _id: id });
  if (!user) throw new ApiError(404, "user not found");

  if (user.isVerified) throw new ApiError(404, "user already verified");

  user.isVerified = true;
  await user.save();

  const mail = new MyMail(user.email);
  mail.sendEmail("Your email is now verified. Now you can login in.");

  return res
    .status(200)
    .json(new ApiResponse("Email is verified successfully."));
});
