import express from "express"
import userController from "../modules/user/UserController"

const { signin, createUser } = userController

const authRouter = express.Router()

authRouter.route("/signin").post(signin)
authRouter.route("/signup").post(createUser)

export default authRouter
