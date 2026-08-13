import userService from "../services/userService.js";

class UserController {
  async getAllUsers(req, res) {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      user_total: users.length,
      users,
    });
  }

  async getUserById(req, res) {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    return res.status(200).json({ user: user });
  }

  async createUser(req, res) {
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const user = await userService.updateUser(id, updateData);
    return res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    await userService.deleteUser(id);
    return res.status(204).send();
  }
}

export default new UserController();
