import * as chai from "chai";
import { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { faker } from "@faker-js/faker";
chai.use(chaiAsPromised);

import userService from "../../src/services/userService.js";
import userModel from "../../src/models/userModel.js";
import mockUsers from "../../src/data/usersMock.js";
import userFactory from "../factories/user.factory.js";

describe("User Service", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("getAllUsers()", () => {
    describe("Positive Scenarios", () => {
      it("Should return users list", async () => {
        const users = await userService.getAllUsers();
        const expectedProps = Object.keys(mockUsers[0]);
        expect(users).to.be.an("array");

        for (const user of users) {
          for (const prop of expectedProps) {
            expect(user).to.have.property(prop);
          }
        }
      });
    });

    describe("Negative Scenarios", () => {
      it("Shoult not return users list", async () => {
        sinon.stub(userModel, "getAllUsers").resolves([]);

        const users = await userService.getAllUsers();

        expect(users).to.be.an("array");
        expect(users).to.have.lengthOf(0);
      });
    });
  });

  describe("getById()", () => {
    describe("Positive Scenarios", () => {
      it("Should return a user by id", async () => {
        const user = await userService.getUserById(1);
        const mockUser = mockUsers[0];
        const expectedProps = Object.keys(mockUser);
        sinon.stub(userModel, "getById").resolves(mockUser);

        expect(user).to.be.an("object");
        for (const prop of expectedProps) {
          expect(user).to.have.property(prop);
        }
      });
    });

    describe("Negative Scenarios", () => {
      it("Should return a error when the user not exist", async () => {
        sinon.stub(userModel, "getById").resolves(null);
        const number = faker.number.int({ min: 30000 });

        await expect(userService.getUserById(number)).to.be.rejectedWith(
          "User not found",
        );
      });
    });
  });

  describe("createUser()", () => {
    describe("Positive Scenarios", () => {
      it("Should create a user successfully", async () => {
        const userData = userFactory();

        const mockUser = {
          id: faker.number.int({ min: 30000 }),
          ...userData,
        };

        sinon.stub(userModel, "createUser").resolves(mockUser);

        const user = await userService.createUser(userData);

        const fieldsRequired = {
          email: "string",
          password: "string",
          username: "string",
        };

        for (const [field, type] of Object.entries(fieldsRequired)) {
          expect(user).to.be.an("object");
          expect(user).to.have.property(field);
          expect(user[field]).to.be.an(type);
        }
      });
    });

    describe("Negative Scenarios", () => {
      const requiredField = ["email", "password", "username"];
      const expectedErrors = {
        email: "Invalid email",
        password: "Password must be at least 6 characters",
        username: "Username must be at least 3 characters",
      };
      for (const key of requiredField) {
        it(`Should fail when ${key} is empty`, async () => {
          sinon.stub(userModel, "createUser").resolves(mockUsers);
          try {
            const userData = userFactory({ [key]: "" });
            await userService.createUser(userData);
            throw new Error("Should not reach here");
          } catch (err) {
            expect(err).to.have.property("message");
            expect(err.issues[0].message).to.equal(expectedErrors[key]);
          }
        });
      }

      const uniqueFields = ["email", "username"];
      for (const key of uniqueFields) {
        it(`Should not allow creating a user with duplicate ${key} `, async () => {
          const userData = userFactory();

          await userService.createUser(userData);

          const duplicatedUser = userFactory();
          duplicatedUser[key] = userData[key];
          try {
            await userService.createUser(duplicatedUser);
            throw new Error(`Test failed: duplicate ${key} was allowed`);
          } catch (err) {
            await expect(userService.createUser(userData)).to.be.rejectedWith(
              "User already exist",
            );
          }
        });
      }
    });
  });

  describe("updateUser()", () => {
    describe("Positive Scenarios", () => {
      it("Should update user data successfully", async () => {
        const userData = {
          email: userFactory().email,
          username: userFactory().username,
        };

        sinon.stub(userModel, "updateUser").resolves({
          id: 1,
          email: userData.email,
          username: userData.username,
        });

        const user = await userService.getUserById(1);
        expect(user).to.be.an("object");
        expect(user).to.have.property("email", "nathan2300@example.com");
        expect(user).to.have.property("username", "nathan2300");

        const userUpdated = await userService.updateUser(1, {
          email: userData.email,
          username: userData.username,
        });

        expect(userUpdated).to.be.an("object");
        expect(userUpdated).to.have.property("email", userData.email);
        expect(userUpdated).to.have.property("username", userData.username);
      });
    });

    describe("Negative Scenarios", () => {
      it(`Should not update email if already used by another user`, async () => {
        const userEmail = userFactory().email;

        await userService.updateUser(1, {
          email: userEmail,
        });

        await expect(
          userService.updateUser(2, { email: userEmail }),
        ).to.be.rejectedWith("Email already in use");
      });
    });
  });

  describe("deleteUser()", () => {
    describe("Positive Scenarios", () => {
      it("Should delete user successfully", async () => {
        const mockUser = mockUsers[0];

        const deleteStub = sinon
          .stub(userModel, "deleteUser")
          .resolves(mockUser);

        const result = await userService.deleteUser(1);

        expect(result).to.be.an("object");
        expect(result).to.have.property("id", 1);
        expect(result).to.have.property("email", mockUser.email);
        expect(result).to.have.property("username", mockUser.username);
      });
    });

    describe("Negative Scenarios", () => {
      it("Should not delete user when user id is invalid", async () => {
        sinon.stub(userModel, "deleteUser").resolves(null);
        const number = faker.number.int({ min: 30000 });

        await expect(userService.deleteUser(number)).to.be.rejectedWith(
          "User not found",
        );
      });
    });
  });
});
