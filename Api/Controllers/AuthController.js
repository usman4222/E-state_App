const { User } = require("../Models/UserModel");
const bcryptjs = require("bcryptjs")


//user sign-Up
exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //convert password into hash
        const hashPassword = bcryptjs.hashSync(password, 10)

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        next(error)
    }
};


