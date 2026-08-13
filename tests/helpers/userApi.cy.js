class UserApiCy {
  getAll() {
    return cy.api("GET", `/`);
  }

  getUserById(id, options = {}) {
    return cy.api({
      method: "GET",
      url: `/${id}`,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  createUser(data, options = {}) {
    return cy.api({
      method: "POST",
      url: "/",
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  updateUser(id, data, options = {}) {
    return cy.api({
      method: "PUT",
      url: `/${id}`,
      body: data,
      failOnStatusCode: options.failOnStatusCode ?? true,
    });
  }

  deleteUser(id) {
    return cy.api({
      method: "DELETE",
      url: `/${id}`,
    });
  }
}

export default new UserApiCy();
