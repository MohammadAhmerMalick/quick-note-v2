import roleModel from "../../modules/role/RoleModel"
import userModel from "../../modules/user/UserModel"

class Seed {
  // add admin user and role
  init = async () => {
    const adminUser = {
      role: "admin",
      name: "Malick",
      password: "malick",
      email: "malick@gmail.com",
    }

    const [role] = await roleModel.getRoleByName(adminUser.role)
    if (!role) {
      await roleModel.createRole({ name: adminUser.role }) // create admin role
      await userModel.createUser(adminUser) // create admin user
      console.info("✅ Admin role and user created.")
    }
  }
}

const seed = new Seed()

export default seed
