import { Router } from "express";
import jwt from "jsonwebtoken"
import userModel from "../database/user.model.js";
import { loginValidations, registerValidations } from "../validations/auth.js";
import bcrypt from "bcryptjs"

const authRouter = Router()

authRouter.post("/register", async (request, response) => {
    const authData = request.body

    try {
        await registerValidations.validate(authData)

        const existCheck = await userModel.findOne({ where: { email: authData.email } })

        if (existCheck !== null) {
            throw new Error("There is already an account associated with this email")
        }

        // TODO: Temporarily hashing passwords on backend
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(authData.password, salt)

        const newUser = await userModel.create({ email: authData.email, password: hashedPassword })

        const userResponse = {
            id: newUser.get("id"),
            name: newUser.get("name"),
            email: newUser.get("email")
        }

        const accessToken = jwt.sign(userResponse, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
        const refreshToken = jwt.sign(userResponse, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })

        return response.status(200)
            .json({
                user: userResponse,
                accessToken,
                refreshToken
            })
    } catch (error) {
        console.error(error)
        return response.status(400)
            .json({ error: true, message: error.message })
    }
})

authRouter.post("/login", async (request, response) => {
    const authData = request.body

    try {
        await loginValidations.validate(authData)

        const user = await userModel.findOne({ where: { email: authData.email } })

        if (user === null) {
            throw new Error("There is no account associated with this email")
        }

        const passwordMatch = bcrypt.compare(authData.password, user.get("password"))

        if (!passwordMatch) {
            throw new Error("Your password is incorrect")
        }

        const userResponse = {
            id: user.get("id"),
            name: user.get("name"),
            email: user.get("email"),
        }

        const accessToken = jwt.sign(userResponse, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME })
        const refreshToken = jwt.sign(userResponse, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME })

        return response.status(200)
            .json({
                user: userResponse,
                accessToken,
                refreshToken
            })
    } catch (error) {
        console.error(error)
        return response.status(400)
            .json({ error: true, message: error.message })
    }
})

export default authRouter