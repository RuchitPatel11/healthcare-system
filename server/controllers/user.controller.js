const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  validateRegister,
  validatePassword,
  validateLogin,
  validateUpdateUser,
} = require("../Models/user.model");
const { Token } = require("../Models/token.model");
const { randomBytes } = require("node:crypto");
const generateToken = () => {
  const token = randomBytes(18).toString("hex");
  return token;
};

// Add new User
const addUser = async (req, res, next) => {
  const { error, value } = validateRegister(req.body);
  if (error) return res.status(404).send(error);
  try {
    let user = await User.findOne({
      email: value.email,
    });
    if (user) return res.status(403).send("User Already Exists!!");

    const newUser = new User(value);
    await newUser.save();

    res.status(200).send("User Inserted Successfully !!");

    // Generate and save token
    const token = await generateToken();
    const verify = new Token({
      token,
      user: newUser._id,
    });
    await verify.save();
    return;
  } catch (error) {
    return next({ error });
  }
};

//Get all Users
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    if (!user) return res.status(404).send("User Does Not exist");
    res.send(user);
    return;
  } catch (error) {
    return next({ error });
  }
};

// Get User By ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(400).send("User Does Not Exist");
    res.send(user);
    return;
  } catch (error) {
    return next({ error });
  }
};

//Update User By ID
const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = validateUpdateUser(req.body);
  if (error) return res.status(404).send(error.message);
  try {
    const user = await User.findByIdAndUpdate(id, value);
    if (!user) return res.status(400).send("User Does Not Exist");

    return res.send("User Updated Successfully!!");
  } catch (error) {
    return next({ error });
  }
};

//Delete User
const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(400).send("User Does Not Exist");
    res.send("User Deleted");
    return;
  } catch (error) {
    return next({ error });
  }
};

// Create Password
const createPassword = async (req, res, next) => {
  const { token } = req.query;
  const { error, value } = validatePassword(req.body);
  if (error) return res.status(404).send(error);
  try {
    const { user } = await Token.findOne({ token }, { user: 1 });

    // Encrypt Password
    const hash = await bcrypt.hash(value.password, 10);
    await User.findByIdAndUpdate(user, { password: hash });

    // Delete token
    await Token.findOneAndDelete({ token });
    return next();
  } catch (error) {
    return next({ error });
  }
};

// Generate Password Reset Token
const passwordResetToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    // Check whether user exists or not
    if (!user) return res.status(401).send("User Does Not Exist!");

    const token = generateToken();

    await Token.findOneAndUpdate(
      { user: user._id },
      { token },
      { upsert: true }
    );
    return next();
  } catch (error) {
    return next({ error });
  }
};

//Verify User
const login = async (req, res, next) => {
  const { error, value } = validateLogin(req.body);

  if (error) return res.status(404).send(error);
  try {
    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).send("User Does Not Exist");

    // Check account is verified or not
    // if (!user.isVerified) return res.status(403).send("Account Not Verified");

    // Check password is valid or not
    const passwordValid = await bcrypt.compare(value.password, user.password);

    if (!passwordValid)
      return res.status(401).send("Invalid Username or password");

    res.locals.user = user;
    next();
  } catch (error) {
    return next({ error });
  }
};

// const accessTokenValidity = () => {
//   let dt = new Date();
//   dt.setHours(dt.getHours() + 72);
//   let ut = dt.toLocaleString();
//   return ut;
// };

//Generate Access Token
const accessToken = (req, res, next) => {
  const { user } = res.locals;
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
  res.locals.token = token;
  return next();
};

// const logout = async (req, res, next) => {
//   const { user } = res.locals;

//   try {
//     await JTI.findOneAndDelete({ token: user.jti });

//     return res.send();
//   } catch (error) {
//     return next({ error });
//   }
// };
//-------------------------------------------------------------
// const approveUser = async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);

//     // Check if user exists
//     if (!user) {
//       return next({ status: 400, error: { message: "User does not exist." } });
//     }

//     // Check if email is verified
//     if (!user.verified) {
//       return next({
//         status: 400,
//         error: { message: "User's email is not verified." },
//       });
//     }

//     user.approved = true;
//     await user.save();

//     return res.send();
//   } catch (error) {
//     return next({ error });
//   }
// };
// -------------------------------------------------------------------
// const createUser = async (req, res, next) => {
//   try {
//     const existing = await User.findOne({ email: req.body.email });
//     if (existing) {
//       return next({
//         status: 403,
//         error: [
//           {
//             message: "An account with this email already exists.",
//             type: "any.invalid",
//             context: {
//               key: "email",
//             },
//           },
//         ],
//         message: "An account with this email already exists.",
//       });
//     }

//     const user = new User({
//       ...req.body,
//       approved: true,
//     });
//     await user.save();

//     res.locals.user = user;

//     return next();
//   } catch (error) {
//     return next({ error });
//   }
// };


// ----------------------------------------------------------------------
// const createPassword = async (req, res, next) => {
//   const { token } = req.query;

//   try {
//     const { user } = await Token.findOne({ token }, { user: 1 });
//     const { password } = req.body;

//     // Check new password is not same as old if user is not new
//     const oldPassword = (await User.findById(user, "password")).password;
//     if (oldPassword && bcrypt.compareSync(password, oldPassword)) {
//       return next({
//         status: 400,
//         error: { message: "New password can't be same as old password." },
//       });
//     }

//     // Generate hash and update user document
//     const hash = await bcrypt.hash(password, 10);
//     await User.findByIdAndUpdate(user, {
//       password: hash,
//       verified: true,
//     });

//     // Delete token
//     await Token.findOneAndDelete({ token });

//     // Delete jti claims
//     await JTI.deleteMany({ user });

//     return res.send();
//   } catch (error) {
//     return next({ error });
//   }
// };

module.exports = {
  passwordResetToken,
  addUser,
  getUsers,
  getUserById,
  createPassword,
  login,
  accessToken,
  updateUserById,
  deleteUserById,
};
