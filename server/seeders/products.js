// consting images for Casual Dress Slacks
const pantsNavy = '../assets/images/pants-navy.jpg';
const pantsKhaki = '../assets/images/pants-khaki.jpg';
const pantsGrey = '../assets/images/pants-grey.jpg';
const pantsBlack = '../assets/images/pants-black.jpg';

// consting images for Casual Dress Shorts
const shortsNavy = '../assets/images/shorts-navy.jpg';
const shortsRed = '../assets/images/shorts-red.jpg';
const shortsKhaki = '../assets/images/shorts-khaki.jpg';
const shortsBrown = '../assets/images/shorts-brown.jpg';

// consting images for Crested Polo Shirt
const poloRed = '../assets/images/polo-red.jpg';
const poloOrange = '../assets/images/polo-orange.jpg';
const poloYellow = '../assets/images/polo-yellow.jpg';
const poloBlue = '../assets/images/polo-blue.jpg';
const poloGreen = '../assets/images/polo-green.jpg';
const poloWhite = '../assets/images/polo-white.jpg';
const poloGrey = '../assets/images/polo-grey.jpg';
const poloBlack = '../assets/images/polo-black.jpg';

// consting images for Crested T-shirt
const tshirtRed = '../assets/images/tshirt-red.jpg';
const tshirtOrange = '../assets/images/tshirt-orange.jpg';
const tshirtYellow = '../assets/images/tshirt-yellow.jpg';
const tshirtBlue = '../assets/images/tshirt-blue.jpg';
const tshirtGreen = '../assets/images/tshirt-green.jpg';
const tshirtWhite = '../assets/images/tshirt-white.jpg';
const tshirtGrey = '../assets/images/tshirt-grey.jpg';
const tshirtBlack = '../assets/images/tshirt-black.jpg';

const products = [
    {
      name: "Casual Dress Slacks",
      description: "Dress to Kill. Our dress slacks are DNA and stain resistant. They are flexible enough to get you into trouble, but tough enough to handle the punishment.",
      price: 59.99,
      size: ["6-8", "8-10", "10-12" ],
      colors: ["Navy", "Khaki", "Grey", "Black"],
      imageUrl: [pantsNavy, pantsKhaki, pantsGrey, pantsBlack],
    },
    {
      name: "Casual Dress Shorts",
      description: "Life is Shorts, Play Hard. These shorts are so comfortable and stylish you might not want to take them off. And given the antimocrobial stain resistant fabric, you don't have to.",
      price: 39.99,
      colors: ["Navy", "Red", "Khaki", "Brown"],
      imageUrl: [shortsNavy, shortsRed, shortsKhaki, shortsBrown],
    },
    {
      name: "Crested Polo Shirt",
      description: "You're not pouting, you're modeling a dramatically stoic expression. This polo looks so good your mother won't even realize you're not smiling for the family photo. You won't even realize it's a polo.",
      price: 49.99,
      colors: ["Red", "Orange", "Yellow", "Blue", "Green", "White", "Grey", "Black"],
      imageUrl: [poloRed, poloOrange, poloYellow, poloBlue, poloGreen, poloWhite, poloGrey, poloBlack],
    },
    {
      name: "Crested T-shirt",
      description: "The only tshirt mom will let you wear to formal events. The only tshirt you ever want to wear. Why isn't it flashy? Because in this shirt, you're the star.",
      price: 29.99,
      colors: ["Red", "Orange", "Yellow", "Blue", "Green", "White", "Grey", "Black"],
      imageUrl: [tshirtRed, tshirtOrange, tshirtYellow, tshirtBlue, tshirtGreen, tshirtWhite, tshirtGrey, tshirtBlack],
    }
];

module.exports = products;
