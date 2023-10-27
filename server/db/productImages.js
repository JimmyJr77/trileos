const host = process.env.NODE_ENV === 'production' ? 'your_production_host_url' : 'http://localhost:3001';

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

const productImages = {
  pantsNavy,
  pantsKhaki,
  pantsGrey,
  pantsBlack,
  shortsNavy,
  shortsRed,
  shortsKhaki,
  shortsBrown,
  poloRed,
  poloOrange,
  poloYellow,
  poloBlue,
  poloGreen,
  poloWhite,
  poloGrey,
  poloBlack,
  tshirtRed,
  tshirtOrange,
  tshirtYellow,
  tshirtBlue,
  tshirtGreen,
  tshirtWhite,
  tshirtGrey,
  tshirtBlack,
};

module.exports = productImages;
