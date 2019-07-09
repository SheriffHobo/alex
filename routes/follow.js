const auth = require("../middleware/auth");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.put("/", auth, async (req, resp) => {
  try {
    const followUser = req.body.userID;
    const loggedInUser = req.user._id;
    const findFollowUser = await User.findById(followUser).select("-password");
    findFollowUser.followers.unshift(loggedInUser);
    const savedFollower = await findFollowUser.save();

    const findLoggedInUser = await User.findById(loggedInUser).select(
      "-password"
    );
    findLoggedInUser.following.unshift(followUser);
    const savedFollowing = await findLoggedInUser.save();

    resp.json({ savedFollower, savedFollowing });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
