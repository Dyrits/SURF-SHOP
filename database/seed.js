import { faker } from "npm:@faker-js/faker";

import Post from "#/models/Post.js";
import User from "#/models/User.js";

export default async () => {
  const user = await User.findOne({ username: "dyrits" }) || await User.register(new User({ username: "dyrits" }), "PASSWORD");
  await Post.deleteMany({})
  const posts = Array.from({ length: 50 }, () => {
    return new Post({
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      author: user,
      price: faker.commerce.price(),
      location: `${faker.location.city()}, ${faker.location.state()}`,
      coordinates: [faker.location.latitude(), faker.location.longitude()],
      images: [
        { url: "https://picsum.photos/200/300", filename: "Surf Shop" }
      ],
    });
  });
  await Post.insertMany(posts);
}