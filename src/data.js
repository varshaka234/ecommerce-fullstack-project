// Menu links in the navbar
export const categories = [
  { id: "all", label: "Everything" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
  { id: "accessories", label: "Accessories" },
];

// Filters on the Shop page
export const genders = [
  { id: "all", label: "All" },
  { id: "women", label: "Women" },
  { id: "men", label: "Men" },
];

export const types = [
  { id: "all", label: "All types" },
  { id: "tanktops", label: "Tank tops" },
  { id: "eyewear", label: "Eyewear" },
  { id: "jackets", label: "Jackets" },
  { id: "sneakers", label: "Sneakers" },
  { id: "jeans", label: "Jeans" },
];

// for: who it is for. featured: shown on the home page.
export const products = [
  // Tank tops
  { id: 1, name: "Classic White Tank", price: 19, type: "tanktops", for: ["women"], image: "/TankWhite.jpeg" },
  { id: 2, name: "Ribbed Crop Tank", price: 22, type: "tanktops", for: ["women"], image: "/TankCrop.jpeg" },
  { id: 3, name: "Summer Print Tank", price: 25, type: "tanktops", for: ["women"], image: "/Tank.jpeg", sale: true, featured: true },
  { id: 4, name: "Gym Tank Top", price: 21, type: "tanktops", for: ["men"], image: "/TankGym.jpeg" },
  { id: 5, name: "Basic Black Tank", price: 18, type: "tanktops", for: ["men"], image: "/TankBlack.jpeg" },

  // Eyewear
  { id: 6, name: "Aviator Sunglasses", price: 35, type: "eyewear", for: ["women", "men"], image: "/Eyewear.jpeg", featured: true },
  { id: 7, name: "Round Retro Sunglasses", price: 29, type: "eyewear", for: ["women"], image: "/EyewearRound.jpeg" },
  { id: 8, name: "Sport Shades", price: 39, type: "eyewear", for: ["men"], image: "/EyewearSport.jpeg" },
  { id: 9, name: "Cat-Eye Sunglasses", price: 33, type: "eyewear", for: ["women"], image: "/EyewearCateye.jpeg", sale: true },
  { id: 10, name: "Classic Wayfarer", price: 31, type: "eyewear", for: ["women", "men"], image: "/EyewearWayfarer.jpeg" },

  // Jackets
  { id: 11, name: "Denim Jacket", price: 79, type: "jackets", for: ["women", "men"], image: "/Jacket.jpeg", featured: true },
  { id: 12, name: "Leather Biker Jacket", price: 129, type: "jackets", for: ["men"], image: "/JacketLeather.jpeg" },
  { id: 13, name: "Bomber Jacket", price: 89, type: "jackets", for: ["men"], image: "/JacketBomber.jpeg" },
  { id: 14, name: "Light Windbreaker", price: 59, type: "jackets", for: ["women", "men"], image: "/JacketWind.jpeg" },
  { id: 15, name: "Cropped Jacket", price: 69, type: "jackets", for: ["women"], image: "/JacketCropped.jpeg", sale: true },

  // Sneakers
  { id: 16, name: "Green Sneakers", price: 59, type: "sneakers", for: ["women", "men"], image: "/Greensneaker.jpeg", sale: true, featured: true },
  { id: 17, name: "Blue Sneakers", price: 64, type: "sneakers", for: ["women", "men"], image: "/Bluesneaker.jpeg" },
  { id: 18, name: "Street Runner", price: 72, type: "sneakers", for: ["men"], image: "/SneakerRunner.jpeg" },
  { id: 19, name: "Everyday Trainers", price: 55, type: "sneakers", for: ["women"], image: "/SneakerWhite.jpeg" },

  // Jeans
  { id: 20, name: "Black Jeans", price: 45, type: "jeans", for: ["men"], image: "/Black.jpeg" },
  { id: 21, name: "Blue Jeans", price: 49, type: "jeans", for: ["women"], image: "/Bluejeans.jpeg", featured: true },
  { id: 22, name: "Grey Jeans", price: 52, type: "jeans", for: ["women"], image: "/Greyjeans.jpeg" },
  { id: 23, name: "Slim Fit Jeans", price: 54, type: "jeans", for: ["men"], image: "/JeansSlim.jpeg" },
  { id: 24, name: "Straight Jeans", price: 47, type: "jeans", for: ["women", "men"], image: "/JeansStraight.jpeg" },
];