const User = require("../database/schemas/users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Invalid username" });
      }

      if (user.password !== password) {
        return done(null, false, { message: "Invalid password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

exports.signIn = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.json({ success: false, message: info.message });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, "token");

    // Send the token back to the client
    return res.json({ success: true, token });
  })(req, res, next);

  // const { username, password } = req.body; // Assuming email and password are sent in the request body

  // User.findOne({ username })
  //   .then((user) => {
  //     if (!user) {
  //       // User not found
  //       return res.status(404).json({
  //         success: false,
  //         message: "Invalid username or password",
  //       });
  //     }

  //     // Check if the provided password matches the user's password
  //     if (password !== user.password) {
  //       // Password doesn't match

  //       return res.status(401).json({
  //         success: false,
  //         message: "Invalid email or password",
  //       });
  //     }

  //     // Successful sign-in
  //     res.json({
  //       success: true,
  //       message: "Sign-in successful",
  //       user: user,
  //     });
  //   })
  //   .catch((error) => {
  //     // Error occurred
  //     res.status(500).json({
  //       success: false,
  //       message: "Something went wrong",
  //       error: error.message,
  //     });
  //   });
};

exports.checkToken = async (req, res) => {
  const { token } = req.body;
  try {
    const userd = jwt.verify(token, "token");

    if (!userd)
      return res.json({ success: false, message: "Invalid User Token!" });

    const user = await User.findOne({ _id: userd.id });

    if (!user)
      return res.json({ success: false, message: "Invalid User in database!" });

    res.json({
      success: true,
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
