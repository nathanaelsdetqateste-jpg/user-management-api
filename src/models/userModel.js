import mockUsers from "../data/usersMock.js";

class UserModel {
  constructor() {
    this.users = mockUsers.map((u) => ({ ...u }));
  }

  async getAllUsers() {
    return this.users;
  }

  async getById(id) {
    return this.users.find((u) => u.id === id);
  }

  async createUser(userData) {
    const newId = this.users.length + 1;

    const newUser = { id: newId, ...userData };

    this.users.push(newUser);

    return new Promise((resolve) => setTimeout(() => resolve(newUser), 300));
  }

  async updateUser(id, updateData) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) return null;

    const updatedUser = {
      ...this.users[index],
      ...updateData,
    };

    this.users[index] = updatedUser;

    return updatedUser;
  }

  async deleteUser(id) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) return null;

    const deletedUser = this.users.splice(index, 1)[0];

    return deletedUser;
  }
}

export default new UserModel();
