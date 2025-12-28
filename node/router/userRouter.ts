import express from "express"
import userController from "../modules/user/UserController"

const {
  signin,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  forceDeleteUser,
  getAllDeletedUsers,
} = userController

const userRouter = express.Router()

userRouter.route("/users").get(getAllUsers)
userRouter.route("/users/deleted").get(getAllDeletedUsers)

userRouter.route("/user/").post(createUser)

userRouter
  .route("/user/:id")
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser)

userRouter.route("/user/:id/force").delete(forceDeleteUser)

export default userRouter
