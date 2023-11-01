const db = require('../config/connection');
const { User, Product } = require('../models');
const userData = require('./users');
const productsData = require('./products');

const bcrypt = require('bcrypt');

async function hashPasswords(users) {
  const hashedUsers = [];
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    hashedUsers.push({ ...user, password: hashedPassword });
  }
  return hashedUsers;
}

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});

    const hashedUsers = await hashPasswords(userData);
    await User.insertMany(hashedUsers);
    await Product.insertMany(productsData);

    console.log('Users and products seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users and products', error);
    process.exit(1);
  }
});


// db.once('open', async () => {
//   try {
//     // Clear existing users and products
//     await User.deleteMany({});
//     await Product.deleteMany({});

//     // Bulk insert users and products
//     await User.insertMany(userData);
//     await Product.insertMany(productsData);

//     console.log('Users and products seeded successfully');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding users and products', error);
//     process.exit(1);
//   }
// }); 