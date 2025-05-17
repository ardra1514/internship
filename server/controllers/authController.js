import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../Models/User.js"

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Wrong password" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
const verify=(req, res)=>{
  return res.status(200).json({success:true, user:req.user})
}

export { login, verify}
