import { expect } from "chai";
import userApi from "../helpers/userApi.js";
import userFactory from "../factories/user.factory.js";

describe("User Integration Tests", () => {

  const fields = [
  "id",
  "email",
  "password",
  "username",
  "nickname",
  "profilePicture",
  "bio",
  "phoneNumber",
  "address",
  "website",
  "socialLinks",
];

const valueTypes = {
  id: "number",
  email: "string",
  password: "string",
  username: "string",
  nickname: "string",
  profilePicture: "string",
  bio: "string",
  phoneNumber: "string",
  address: "object",
  website: "string",
  socialLinks: "array",
};
  
  let userId;

  beforeEach(async () => {
    const userData = userFactory();
    const res = await userApi.create(userData);

    userId = res.body.user.id;
  });

  afterEach(async () => {
    if (userId) {
      await userApi.delete(userId);
    }
  });

  describe("/GET", () => {
    describe("Positive Scenarios", () => {
      it("Should return all user list", async () => {
        const resGetAll = await userApi.getAll();

        expect(resGetAll.status).to.eql(200);
        expect(resGetAll.body).to.have.property("user_total");
        expect(resGetAll.body).to.have.property("users");
        expect(resGetAll.body).to.be.an("object");
        expect(resGetAll.body.users).to.be.an("array");
        for (const user of resGetAll.body.users) {
          fields.forEach((field) => {
            expect(user).to.be.an("object");
            expect(user).have.property(field);
          });
        }

        for (const user of resGetAll.body.users) {
          for (const [key, type] of Object.entries(valueTypes)) {
            expect(user[key]).to.be.an(type);
          }
        }
      });
    });

    describe("Negative Scenarios", () => {});
  });

  describe("/GET/:id", () => {
    describe("Scenarios positive", () => {
      it("Should return a user list", async () => {
        const resGetById = await userApi.getById(userId);
        expect(resGetById.status).to.eql(200);
        expect(resGetById.body).to.be.an("object");
        for (const key of fields) {
          expect(resGetById.body.user).to.have.property(key);
        }

        for (const [key, value] of Object.entries(valueTypes)) {
          expect(resGetById.body.user[key]).to.be.an(value);
        }
      });
    });
    describe("Scenarios negative ", () => {});
  });

  describe("/POST", () => {
    describe("Scenarios positive", () => {
      it("Should create user successfully", async () => {
        const createUser = userFactory();
        const beforeUserList = await userApi.getAll();
        const resCreate = await userApi.create(createUser);
        expect(resCreate.status).to.eql(201);
        expect(resCreate.body).to.be.an("object");
        expect(resCreate.body.user).to.be.an("object");
        for (const key of fields) {
          expect(resCreate.body.user).to.have.property(key);
        }

        for (const [key, value] of Object.entries(valueTypes)) {
          expect(resCreate.body.user[key]).to.be.an(value);
        }

        const afterUserList = await userApi.getAll();
        expect(afterUserList.body.user_total).to.equal(
          beforeUserList.body.user_total + 1,
        );
      });
    });
    describe("Scenarios negative", () => {});
  });

  describe("/PUT/:id", () => {
    describe("Scenario positive", () => {
      it("Should update a user successfully", async () => {
        const dataUpdated = userFactory();
        const resPut = await userApi.update(userId, dataUpdated);
        expect(resPut.status).to.eql(200);
        expect(resPut.body).to.be.an("object");
        expect(resPut.body.user.id).to.be.a("number");
        for (const keyUpdated of fields) {
          expect(resPut.body.user).to.have.property(keyUpdated);
          expect(resPut.body.user[keyUpdated]).to.eql(dataUpdated[keyUpdated]);
        }
      });
    });
    describe("Scenario negative", () => {});
  });

  describe("/DELETE/:id", () => {
    describe("Scenario positive", () => {
      it("Should delete a user successfully", async () => {
        const resDelete = await userApi.delete(userId);
        expect(resDelete.status).to.eql(204);
      });
    });
    describe("Scenario negative", () => {});
  });
});
