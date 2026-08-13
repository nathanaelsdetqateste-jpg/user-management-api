import "cypress-mochawesome-reporter/register";
import userFactory from "../../../factories/user.factory";
import userApiCy from "../../../helpers/userApi.cy";

describe("E2E Testing", () => {
  describe("Scenarios positive", () => {
    it("should create, read, update and delete a user", () => {
      const userData = userFactory();

      userApiCy.createUser(userData).then((resCreate) => {
        expect(resCreate.status).to.eql(201);

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

        expect(resCreate.body.user).to.be.an("object");

        expect(resCreate.body).to.have.property(
          "message",
          "User created successfully",
        );

        for (const key of fields) {
          expect(resCreate.body.user).to.have.property(key);
        }

        for (const [key, value] of Object.entries(valueTypes)) {
          expect(resCreate.body.user[key]).to.be.an(value);
        }

        const userId = resCreate.body.user.id;

        return userApiCy.getUserById(userId).then((resGetById) => {
          expect(resGetById.status).to.eql(200);
          expect(resGetById.body.user).to.be.an("object");
          expect(resGetById.body.user.id).to.eql(userId);

          const fieldsRequired = ["id", "email", "username", "nickname"];

          for (const key of fieldsRequired) {
            expect(resGetById.body.user).to.have.property(key);
          }

          const dataUpdated = userFactory();

          return userApiCy
            .updateUser(userId, dataUpdated)
            .then((resPut) => {
              expect(resPut.status).to.eql(200);
              expect(resPut.body.user).to.be.an("object");

              for (const key of fieldsRequired) {
                expect(resPut.body.user).to.have.property(key);
              }

              expect(resPut.body.user.email).to.eql(dataUpdated.email);
              expect(resPut.body.user.username).to.eql(dataUpdated.username);

              return userApiCy.deleteUser(userId);
            })
            .then((resDelete) => {
              expect(resDelete.status).to.eql(204);

              return userApiCy.getUserById(userId, {
                failOnStatusCode: false,
              });
            })
            .then((resGetDeleted) => {
              expect(resGetDeleted.status).to.eql(404);
              expect(resGetDeleted.body).to.have.property(
                "error",
                "User not found",
              );
            });
        });
      });
    });
  });
  describe("Scenarios negative", () => {});
});
