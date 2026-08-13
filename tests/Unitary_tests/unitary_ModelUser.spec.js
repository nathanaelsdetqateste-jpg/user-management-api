import { expect } from "chai";
import userModel from "../../src/models/userModel.js";
import userFactory from "../factories/user.factory.js";
import mockUsers from "../../src/data/usersMock.js";

describe("User Model", () => {
  beforeEach(() => {
    userModel.users = [...mockUsers];
  });

  describe("getAllUsers()", () => {
    describe("positive scenarios", () => {
      it("should return all users with correct structure", async () => {
        const users = await userModel.getAllUsers();

        expect(users).to.be.an("array");
        expect(users).to.have.lengthOf(mockUsers.length);

        users.forEach((user) => {
          expect(user).to.be.an("object");
          expect(user).to.have.property("id");
          expect(user).to.have.property("email");
          expect(user).to.have.property("username");
          expect(user).to.have.property("nickname");
        });
      });
    });

    describe("negative scenarios", () => {
      it("should return an empty array when no users exist", async () => {
        userModel.users = [];

        const users = await userModel.getAllUsers();

        expect(users).to.be.an("array");
        expect(users).to.have.lengthOf(0);
      });
    });
  });

  describe("getById()", () => {
    describe("positive scenarios", () => {
      it("should return a user when a valid ID is provided", async () => {
        const user = await userModel.getById(1);

        expect(user).to.be.an("object");
        expect(user).to.have.property("id", 1);
        expect(user).to.have.property("email");
        expect(user).to.have.property("username");
        expect(user).to.have.property("nickname");
      });
    });

    describe("negative scenarios", () => {
      it("should return undefined when user is not found", async () => {
        const user = await userModel.getById(999);
        expect(user).to.be.undefined;
      });

      it("should return undefined when ID is invalid", async () => {
        const user = await userModel.getById(null);
        expect(user).to.be.undefined;
      });
    });
  });

  describe("createUser()", () => {
    describe("positive scenarios", () => {
      it("should create a new user and return it with an id", async () => {
        const userData = userFactory();
        const initialLength = userModel.users.length;

        const newUser = await userModel.createUser(userData);

        expect(newUser).to.be.an("object");
        expect(newUser).to.have.property("id");
        expect(newUser).to.include({
          email: userData.email,
          username: userData.username,
          nickname: userData.nickname,
        });

        expect(userModel.users.length).to.equal(initialLength + 1);
      });

      it("should add the new user to the users list", async () => {
        const userData = userFactory();

        const newUser = await userModel.createUser(userData);

        const foundUser = userModel.users.find((u) => u.id === newUser.id);

        expect(foundUser).to.exist;
        expect(foundUser.email).to.equal(userData.email);
      });
    });
  });

  describe("updateUser()", () => {
    describe("positive scenarios", () => {
      it("should update a user with valid data", async () => {
        const userData = userFactory();

        const updatedUser = await userModel.updateUser(1, {
          email: userData.email,
          password: userData.password,
          username: userData.username,
          nickname: userData.nickname,
        });

        expect(updatedUser).to.be.an("object");
        expect(updatedUser).to.have.property("id", 1);

        expect(updatedUser.email).to.equal(userData.email);
        expect(updatedUser.password).to.equal(userData.password);
        expect(updatedUser.username).to.equal(userData.username);
        expect(updatedUser.nickname).to.equal(userData.nickname);
      });

      it("should update only provided fields (partial update)", async () => {
        const updatedUser = await userModel.updateUser(1, {
          email: "novo@email.com",
        });

        expect(updatedUser).to.have.property("id", 1);
        expect(updatedUser.email).to.equal("novo@email.com");

        expect(updatedUser.username).to.exist;
        expect(updatedUser.nickname).to.exist;
      });

      it("should actually update the user in the array", async () => {
        const newEmail = "updated@email.com";

        await userModel.updateUser(1, { email: newEmail });

        const user = await userModel.getById(1);

        expect(user.email).to.equal(newEmail);
      });
    });

    describe("negative scenarios", () => {
      it("should return null when user does not exist", async () => {
        const updatedUser = await userModel.updateUser(999, {
          email: "teste@email.com",
        });

        expect(updatedUser).to.be.null;
      });
    });
  });

  describe("deleteUser()", () => {
    describe("positive scenarios", () => {
      it("should delete a user and remove it from the array", async () => {
        const initialLength = userModel.users.length;

        const deletedUser = await userModel.deleteUser(1);

        expect(deletedUser).to.be.an("object");
        expect(deletedUser).to.have.property("id", 1);

        expect(userModel.users.length).to.equal(initialLength - 1);

        const user = await userModel.getById(1);
        expect(user).to.be.undefined;
      });
    });

    describe("negative scenarios", () => {
      it("should return null when user does not exist", async () => {
        const deletedUser = await userModel.deleteUser(999);
        expect(deletedUser).to.be.null;
      });
    });
  });
});
