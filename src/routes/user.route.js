import { Router } from "express";
import jwt from "jsonwebtoken"
import userModel from "../database/user.model.js";

const userRouter = Router()

function authorize(request, response, next) {
    const authorization = request.headers.authorization

    try {
        if (authorization === null || authorization === undefined) {
            throw new Error("Invalid access token")
        }

        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        request.user = payload

        next()
    } catch (error) {
        console.error(error)
        return response.status(403)
            .json({ error: true, message: error.message })
    }
}

// Protected route, meaning you need a valid JWT to interact with it.
userRouter.use(authorize)

userRouter.get("/profile", async (request, response) => {
    const userId = request.user.id

    try {
        const user = await userModel.findOne({
            attributes: { exclude: ["password"] },
            where: { id: userId },
        })

        return response.status(200)
            .json(user)
    } catch (error) {
        console.error(error)
        return response.status(400)
            .json({ error: true, message: error.message })
    }
})

export default userRouter