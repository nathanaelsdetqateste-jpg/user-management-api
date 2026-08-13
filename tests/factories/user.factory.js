import { faker } from "@faker-js/faker";

export default function userFactory(override = {}) {
  return {
    email: faker.internet.email(),
    password: `A${faker.internet.password({ length: 6 })}1`,

    username: faker.internet.username(),
    nickname: faker.internet.username(),

    profilePicture: faker.image.avatar(),
    bio: faker.lorem.sentence(),

    phoneNumber: "11999999999",
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: "SP",
      zipCode: faker.location.zipCode(),
    },

    website: faker.internet.url(),

    socialLinks: [
      faker.internet.url(),
      faker.internet.url(),
      faker.internet.url(),
    ],
    ...override,
  };
}
