import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import morgan from "morgan"
import sequelize from "./database/db_config.js"

// import * as path from "path"
// import * as url from "url"
// const __filename = url.fileURLToPath(import.meta.url)
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

const expressApp = express()

expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(morgan("dev"))

expressApp.get("/", (request, response) => {
    return response.status(200).send("CMS Demo API is up and running")
})

const PORT = process.env.PORT || 3001

expressApp.use("/auth", authRouter)

// /user is a protected route, meaning you need a valid JWT to interact with it.
expressApp.use("/user", userRouter)

try {
    await sequelize.sync({force: true})
    await sequelize.authenticate()

    expressApp.listen(PORT, () => console.log("Express server up and running on", PORT))
} catch (error) {
    console.log("Connection to database failed with ", error)
}