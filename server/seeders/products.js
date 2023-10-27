const host = 'http://localhost:3001'; // change to your production host if needed

// Casual Dress Slacks
const pantsNavy = `${host}/images/pants-navy.jpg`;
const pantsKhaki = `${host}/images/pants-khaki.jpg`;
const pantsGrey = `${host}/images/pants-grey.jpg`;
const pantsBlack = `${host}/images/pants-black.jpg`;

// Casual Dress Shorts
const shortsNavy = `${host}/images/shorts-navy.jpg`;
const shortsRed = `${host}/images/shorts-red.jpg`;
const shortsKhaki = `${host}/images/shorts-khaki.jpg`;
const shortsBrown = `${host}/images/shorts-brown.jpg`;

// Crested Polo Shirt
const poloRed = `${host}/images/polo-red.jpg`;
const poloOrange = `${host}/images/polo-orange.jpg`;
const poloYellow = `${host}/images/polo-yellow.jpg`;
const poloBlue = `${host}/images/polo-blue.jpg`;
const poloGreen = `${host}/images/polo-green.jpg`;
const poloWhite = `${host}/images/polo-white.jpg`;
const poloGrey = `${host}/images/polo-grey.jpg`;
const poloBlack = `${host}/images/polo-black.jpg`;

// Crested T-shirt
const tshirtRed = `${host}/images/tshirt-red.jpg`;
const tshirtOrange = `${host}/images/tshirt-orange.jpg`;
const tshirtYellow = `${host}/images/tshirt-yellow.jpg`;
const tshirtBlue = `${host}/images/tshirt-blue.jpg`;
const tshirtGreen = `${host}/images/tshirt-green.jpg`;
const tshirtWhite = `${host}/images/tshirt-white.jpg`;
const tshirtGrey = `${host}/images/tshirt-grey.jpg`;
const tshirtBlack = `${host}/images/tshirt-black.jpg`;

const products = [
  {
    name: "Casual Dress Slacks",
    description: "Dress to Kill. Our dress slacks are DNA and stain resistant. They are flexible enough to get you into trouble, but tough enough to handle the punishment.",
    price: 59.99,
    size: ["6-8", "8-10", "10-12" ],
    colors: ["Navy", "Khaki", "Grey", "Black"],
    imageUrl: [pantsNavy, pantsKhaki, pantsGrey, pantsBlack],
    stockCount: 100
  },
  {
    name: "Casual Dress Shorts",
    description: "Life is Shorts, Play Hard. These shorts are so comfortable and stylish you might not want to take them off. And given the antimocrobial stain resistant fabric, you don't have to.",
    price: 39.99,
    colors: ["Navy", "Red", "Khaki", "Brown"],
    imageUrl: [shortsNavy, shortsRed, shortsKhaki, shortsBrown],
    stockCount: 100
  },
  {
    name: "Crested Polo Shirt",
    description: "You're not pouting, you're modeling a dramatically stoic expression. This polo looks so good your mother won't even realize you're not smiling for the family photo. You won't even realize it's a polo.",
    price: 49.99,
    colors: ["Red", "Orange", "Yellow", "Blue", "Green", "White", "Grey", "Black"],
    imageUrl: [poloRed, poloOrange, poloYellow, poloBlue, poloGreen, poloWhite, poloGrey, poloBlack],
    stockCount: 100
  },
  {
    name: "Crested T-shirt",
    description: "The only tshirt mom will let you wear to formal events. The only tshirt you ever want to wear. Why isn't it flashy? Because in this shirt, you're the star.",
    price: 29.99,
    colors: ["Red", "Orange", "Yellow", "Blue", "Green", "White", "Grey", "Black"],
    imageUrl: [tshirtRed, tshirtOrange, tshirtYellow, tshirtBlue, tshirtGreen, tshirtWhite, tshirtGrey, tshirtBlack],
    stockCount: 100
  }
];

module.exports = products;

