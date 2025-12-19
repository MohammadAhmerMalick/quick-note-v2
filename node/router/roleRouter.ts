import express from "express"
import roleController from "../modules/role/RoleController"

const {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
  forceDeleteRole,
  getAllDeletedRoles,
} = roleController

const roleRouter = express.Router()

roleRouter.route("/roles").get(getAllRoles)
roleRouter.route("/roles/deleted").get(getAllDeletedRoles)

roleRouter.route("/role/").post(createRole)

roleRouter
  .route("/role/:id")
  .get(getRoleById)
  .delete(deleteRole)
  .put(updateRole)

roleRouter.route("/role/:id/force").delete(forceDeleteRole)

export default roleRouter
