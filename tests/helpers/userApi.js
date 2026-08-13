import request from "supertest";
import app from "../../src/app.js";

class UserApi {
  getAll() {
    return request(app).get("/users");
  }

  getById(id) {
    return request(app).get(`/users/${id}`);
  }

  create(data) {
    return request(app).post("/users").send(data);
  }

  update(id, data) {
    return request(app).put(`/users/${id}`).send(data);
  }

  delete(id) {
    return request(app).delete(`/users/${id}`);
  }
}

export default new UserApi();
