import express from "express";
import {
  getAllRestaurants,
  getRestaurantDetails,
  // placeOrder,
  // webhookStripe,
} from "../controllers/coffeeRoute";

const router = express.Router();

router.get("/restaurants", getAllRestaurants);

router.get("/restaurant/:id", getRestaurantDetails);

// router.get("/placeOrder", placeOrder);

// router.get("/webhook", webhookStripe);

export default router;
