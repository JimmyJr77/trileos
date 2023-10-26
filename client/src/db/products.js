// Importing images for Casual Dress Slacks
import pantsNavy from '../assets/images/pants-navy.jpg';
import pantsKhaki from '../assets/images/pants-khaki.jpg';
import pantsGrey from '../assets/images/pants-grey.jpg';
import pantsBlack from '../assets/images/pants-black.jpg';

// Importing images for Casual Dress Shorts
import shortsNavy from '../assets/images/shorts-navy.jpg';
import shortsRed from '../assets/images/shorts-red.jpg';
import shortsKhaki from '../assets/images/shorts-khaki.jpg';
import shortsBrown from '../assets/images/shorts-brown.jpg';

// Importing images for Crested Polo Shirt
import poloRed from '../assets/images/polo-red.jpg';
import poloOrange from '../assets/images/polo-orange.jpg';
import poloYellow from '../assets/images/polo-yellow.jpg';
import poloBlue from '../assets/images/polo-blue.jpg';
import poloGreen from '../assets/images/polo-green.jpg';
import poloWhite from '../assets/images/polo-white.jpg';
import poloGrey from '../assets/images/polo-grey.jpg';
import poloBlack from '../assets/images/polo-black.jpg';

// Importing images for Crested T-shirt
import tshirtRed from '../assets/images/tshirt-red.jpg';
import tshirtOrange from '../assets/images/tshirt-orange.jpg';
import tshirtYellow from '../assets/images/tshirt-yellow.jpg';
import tshirtBlue from '../assets/images/tshirt-blue.jpg';
import tshirtGreen from '../assets/images/tshirt-green.jpg';
import tshirtWhite from '../assets/images/tshirt-white.jpg';
import tshirtGrey from '../assets/images/tshirt-grey.jpg';
import tshirtBlack from '../assets/images/tshirt-black.jpg';

const products = [
    {
      id: 1,
      name: "Casual Dress Slacks",
      description: "Dress to Kill. Our dress slacks are DNA and stain resistant. They are flexible enough to get you into trouble, but tough enough to handle the punishment.",
      price: 59.99,
      colors: ["Navy", "Khaki", "Grey", "Black"],
      imageUrl: [pantsNavy, pantsKhaki, pantsGrey, pantsBlack],
    },
    {
      id: 2,
      name: "Casual Dress Shorts",
      description: "Life is Shorts, Play Hard. These shorts are so comfortable and stylish you might not want to take them off. And given the antimocrobial stain resistant fabric, you don't have to.",
      price: 39.99,
      colors: ["Navy", "Red", "Khaki", "Brown"],
      imageUrl: [shortsNavy, shortsRed, shortsKhaki, shortsBrown],
    },
    {
      id: 3,
      name: "Crested Polo Shirt",
      description: "You're not pouting, you're modeling a dramatically stoic expression. This polo looks so good your mother won't even realize you're not smiling for the family photo. You won't even realize it's a polo.",
      price: 49.99,
      colors: ["Red", "Orange", "Yellow", "Blue", "Green", "White", "Grey", "Black"],
      imageUrl: [poloRed, poloOrange, poloYellow, poloBlue, poloGreen, poloWhite, poloGrey, poloBlack],
    },
    {
      id: 4,
      name: "Crested T-shirt",
      description: "The only tshirt mom will let you wear to formal events. The only tshirt you ever want to wear. Why isn't it flashy? Because in this shirt, you're the star.",
      price: 29.99,
      colors: ["Red", "Orange", "Yellow", "Blue", "Green", "White", "Grey", "Black"],
      imageUrl: [tshirtRed, tshirtOrange, tshirtYellow, tshirtBlue, tshirtGreen, tshirtWhite, tshirtGrey, tshirtBlack],
    }
];

export default products;
