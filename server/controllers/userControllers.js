const User = require("../models/User")

exports.fetctAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

exports.fetchUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select("-password"); 
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user." });
    }
  }

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user." });
    }
  }