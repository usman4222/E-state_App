const { User } = require("../Models/UserModel");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../utils/Error");
const jwt = require("jsonwebtoken")

//user register
exports.register = async (req, res, next) => {
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


//user login

exports.login = async (req, res, next) => {

    const { email, password } = req.body

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return (
                errorHandler(404, "User Not Found!")
            )
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return (
                errorHandler(404, "User Not Found!")
            )
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 3);

        res.cookie('access_token', token, {
            httpOnly: true,
            expirationDate
        })
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }
}