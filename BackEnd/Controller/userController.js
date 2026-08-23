import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secrty);
};

// Route for user login
const LoggingUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Authentication LoggingUser
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "inavalid credentials" });
    }
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  // res.json({ msg: "Register API working" });

  try {
    const { name, email, password } = req.body;
    //checking user already

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exist" });
    }
    //valiadation email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }
    //hashing userr password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log("USER SAVED:", user);
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const AdminLogin = async (req, res) => {
  try {
    const{email,password}=req.body
    if(email===process.env.Admin_Email && password === process.env.AdminPassword ){
      const token=jwt.sign(email+password,process.env.JWT_Secrty);

      res.json({success:true,token})
    }
    else{
      res.json({success:false,message:"inavalid credentials"})
    }
    
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: error.message });
  
    
  }
};

export default {
  LoggingUser,
  registerUser,
  AdminLogin,
};
