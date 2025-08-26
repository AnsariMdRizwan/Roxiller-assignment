const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//register
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser)
            return res.json({
                success: false,
                message: "User Already exists ",
            });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};


const loginUser = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        console.log(checkUser.password);


        if (!checkUser)
            return res.json({
                success: false,
                message: "User Does't Exist ",
            });

        const checkpassword = await bcrypt.compare(password, checkUser.password)

        if (!checkpassword) {
            return res.json({
                success: false,
                message: "Invalid Credential!! Try Again "
            })
        }


        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                firstName: checkUser.firstName
            }, process.env.JWT_SECRET, { expiresIn: '1d' })
        console.log(process.env.JWT_SECRET);


        res.cookie('token', token, { httpOnly: true, secure: false }).status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                firstName: checkUser.firstName
            }
        })


    } catch (e) {
        console.log(e.message);
        res.status(500).json({
            success: false,
            message: "Some error occured" + e,
        });
    }
};



// logoutUser

const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out Successfully"
    })
}


// auth middleware 

const authmiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User "
        })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized User"
        })
    }
}





module.exports = { registerUser, loginUser, logoutUser, authmiddleware };


