// Mock data for SB Foods app

import breakfastImg from "@/assets/cat-breakfast.jpg";
import biryaniImg from "@/assets/cat-biryani.jpg";
import pizzaImg from "@/assets/cat-pizza.jpg";
import noodlesImg from "@/assets/cat-noodles.jpg";
import burgerImg from "@/assets/cat-burger.jpg";
import sushiImg from "@/assets/cat-sushi.jpg";
import rest1 from "@/assets/rest-andhra.jpg";
import rest2 from "@/assets/rest-fastfood.jpg";
import rest3 from "@/assets/rest-hotel.jpg";
import foodBiryani from "@/assets/food-chicken-biryani.jpg";
import foodButter from "@/assets/food-butter-chicken.jpg";
import foodTandoori from "@/assets/food-tandoori.jpg";
import foodLassi from "@/assets/food-lassi.jpg";
import foodFries from "@/assets/food-fries.jpg";

export const categories = [
  { id: "breakfast", name: "Breakfast", image: breakfastImg },
  { id: "biryani", name: "Biryani", image: biryaniImg },
  { id: "pizza", name: "Pizza", image: pizzaImg },
  { id: "noodles", name: "Noodles", image: noodlesImg },
  { id: "burger", name: "Burger", image: burgerImg },
  { id: "sushi", name: "Sushi", image: sushiImg },
];

export const restaurants = [
  {
    id: "1",
    name: "Andhra Spice",
    location: "Madhapur, Hyderabad",
    image: rest1,
    rating: 4.5,
    deliveryTime: "25-35 min",
    minOrder: 150,
    cuisine: ["Biryani", "Curry", "Breakfast"],
    popular: true,
    approved: true,
  },
  {
    id: "2",
    name: "Burger Junction",
    location: "Manikonda, Hyderabad",
    image: rest2,
    rating: 4.2,
    deliveryTime: "20-30 min",
    minOrder: 100,
    cuisine: ["Burger", "Fries", "Beverages"],
    popular: true,
    approved: true,
  },
  {
    id: "3",
    name: "Paradise Grand",
    location: "Hitech City, Hyderabad",
    image: rest3,
    rating: 4.7,
    deliveryTime: "30-45 min",
    minOrder: 200,
    cuisine: ["Biryani", "Curry", "Noodles", "Pizza"],
    popular: false,
    approved: true,
  },
  {
    id: "4",
    name: "Minerva Grand",
    location: "Kukutpally, Hyderabad",
    image: rest1,
    rating: 4.3,
    deliveryTime: "35-50 min",
    minOrder: 180,
    cuisine: ["Biryani", "Curry"],
    popular: false,
    approved: false,
  },
];

export const menuItems = [
  {
    id: "m1",
    restaurantId: "1",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken pieces, slow cooked with authentic spices",
    price: 262,
    mrp: 309,
    image: foodBiryani,
    category: "Biryani",
    type: "Non Veg",
    rating: 4.6,
    reviews: 234,
  },
  {
    id: "m2",
    restaurantId: "1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with succulent chicken pieces",
    price: 229,
    mrp: 249,
    image: foodButter,
    category: "Curry",
    type: "Non Veg",
    rating: 4.8,
    reviews: 189,
  },
  {
    id: "m3",
    restaurantId: "1",
    name: "Tandoori Chicken",
    description: "Juicy chicken marinated in yogurt and spices, grilled to perfection",
    price: 320,
    mrp: 380,
    image: foodTandoori,
    category: "Curry",
    type: "Non Veg",
    rating: 4.7,
    reviews: 312,
  },
  {
    id: "m4",
    restaurantId: "1",
    name: "Vanilla Lassi",
    description: "Cool and refreshing yogurt-based drink with vanilla flavor",
    price: 89,
    mrp: 99,
    image: foodLassi,
    category: "Beverages",
    type: "Veg",
    rating: 4.4,
    reviews: 145,
  },
  {
    id: "m5",
    restaurantId: "2",
    name: "Classic Burger",
    description: "Juicy beef patty with fresh vegetables in a sesame bun",
    price: 175,
    mrp: 209,
    image: rest2,
    category: "Burger",
    type: "Non Veg",
    rating: 4.3,
    reviews: 98,
  },
  {
    id: "m6",
    restaurantId: "2",
    name: "French Fries",
    description: "Golden crispy fries seasoned with our special spice blend",
    price: 99,
    mrp: 120,
    image: foodFries,
    category: "Fries",
    type: "Veg",
    rating: 4.5,
    reviews: 201,
  },
];

export const orders = [
  {
    id: "o1",
    userId: "user1",
    item: menuItems[3],
    restaurantName: "Andhra Spice",
    quantity: 1,
    totalPrice: 89,
    mrp: 99,
    paymentMode: "cod",
    orderedOn: "2024-09-01",
    time: "14:18",
    status: "delivered",
  },
  {
    id: "o2",
    userId: "user1",
    item: menuItems[2],
    restaurantName: "Andhra Spice",
    quantity: 1,
    totalPrice: 320,
    mrp: 380,
    paymentMode: "cod",
    orderedOn: "2024-09-01",
    time: "14:18",
    status: "order placed",
  },
];

export type Restaurant = typeof restaurants[0];
export type MenuItem = typeof menuItems[0];
export type Order = typeof orders[0];
export type Category = typeof categories[0];
