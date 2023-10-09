const USERS = [
  {
    name: "Alice Wonderland",
    email: "alice@wonderland.com",
    password: "12345678",
  },
  {
    name: "Bob Country",
    email: "bob@country.com",
    password: "12345678",
  },
];
const ACTIVITIES = [
  [
    {
      name: "Snorkeling",
      description: "Swim with the fishes",
      price: 100,
      quorum: 1,
      capacity: 20,
    },
    {
      name: "Stand-up Paddleboard",
      description: "Stand on a board and paddle",
      price: 200,
      quorum: 2,
      capacity: 10,
    },
  ],
  [
    {
      name: "Diving'",
      description: "Dive deep into the ocean",
      price: 300,
      quorum: 3,
      capacity: 6,
    },
  ],
];

const input = {
  USERS,
  ACTIVITIES,
};

module.exports = input;
