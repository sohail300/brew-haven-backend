import express from "express";
import {
  addProduct,
  addRestaurant,
  getAllRestaurants,
  getRestaurantDetails,
} from "../controllers/coffeeRoute";

const router = express.Router();

router.get("/restaurants", getAllRestaurants);

router.get("/restaurant/:id", getRestaurantDetails);

router.post("/product/add", addProduct);

router.post("/restaurant/add", addRestaurant);

export default router;
