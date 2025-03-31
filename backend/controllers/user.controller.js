import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  //getting the username from params
  const { username } = req.params;
  try {
    //getting the user from database
    const user = await User.findOne({ username }).select("-password");

    //handling if user does not exist
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    //returning the response
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    //getting the user to modify id from DB
    const userToModify = await User.findById(id);

    //getting the current user id
    const currentUser = await User.findById(req.user._id); //will get this _id from protected route middleware

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow/unfollow yourself" });
    }

    //handling the user not found scenario
    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      //TODO return the id of the user as a response

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      //follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      //send notification
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await newNotification.save();

      //TODO return the id of the user as a response
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {}
};

export const getSuggestedUsers = async (req, res) => {
  try {
    //Extract the logged-in user’s ID:
    const userId = req.user._id;
    //Fetch the list of users the logged-in user is following:
    const usersFollowedByMe = await User.findById(userId).select("following");
    //Get 10 random users (excluding the logged-in user):
    const users = await User.aggregate([
      {
        //Ensures the logged-in user is excluded from the list.
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        //Randomly selects 10 users.
        $sample: { size: 10 },
      },
    ]);
    //Filter out users that are already followed by the logged-in user:
    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    //Pick the first 4 suggested users:
    const suggestedUsers = filteredUsers.slice(0, 4);
    //Ensure passwords are not exposed:
    suggestedUsers.forEach((user) => (user.password = null));
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Error in getSuggestedUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
