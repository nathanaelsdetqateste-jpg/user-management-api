#  Users API - SDET Project

RESTful API developed to practice **SDET (Software Development Engineer in Test)** concepts, including endpoint creation and automated testing.

---

##  Objective

This project focuses on:

* Building a REST API using Node.js
* Applying unit and integration tests
* Simulating real-world backend scenarios
* Practicing architecture (models, controllers, routes)
* Preparing for CI/CD (future)

---

##  Technologies

* Node.js
* Express
* Faker
* Zod
* Mocha
* Chai
* Sinon
* Cypress
* SuperTest

---

##  Project Structure

```bash
USER-MANAGEMENT-API/
│
├── .github/
│   └── workflows/
│       ├── cypress.yml
│       └── integration-test.yml
│
├── cypress/
│   └── reports/
│       └── index.html
│
├── node_modules/
│
├── src/
│   ├── controllers/
│   │   └── userControllers.js
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── schema/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── E2E/
│   │   └── cypress/
│   │       ├── e2e/
│   │       │   └── e2e.spec.cy.js
│   │       ├── fixtures/
│   │       └── support/
│   │
│   ├── factories/
│   ├── helpers/
│   │   ├── userApi.cy.js
│   │   └── userApi.js
│   │
│   ├── Integration_tests/
│   │   └── user.integration.spec.js
│   │
│   └── Unitary_tests/
│       ├── unitary_ModelUser.spec.js
│       └── unitary_ServiceUser.spec.js
│
├── .gitignore
├── cypress.config.js
├── package-lock.json
├── package.json
└── README.md
```

##  Endpoints 

* GET /users
* GET /users/:id
* POST /users
* PUT /users/:id
* DELETE /users/:id

---

##  Tests

To run the tests:

```
npx mocha
```

---

##  Next Steps

* Implement integration tests
* Add validations
* Implement CI/CD
* Create unitary tests
* Create integrations tests
* Create E2E tests

---

##  Author

**Nathanael Henrique**
QA Engineer / SDET
