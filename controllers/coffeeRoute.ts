import { Request, Response } from "express";
import { productModel, shopModel } from "../model/schema";
import productType from "../zodTypes/productType";
import dotenv from "dotenv";
import Stripe from "stripe";
import { mailer } from "../utils/mailer";

dotenv.config();

export async function getAllRestaurants(req: Request, res: Response) {
  try {
    const shops = await shopModel.find().select("-products");
    console.log(shops);

    return res.status(200).json({
      success: true,
      shops,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({
      success: false,
      msg: err,
    });
  }
}

export async function getRestaurantDetails(req: Request, res: Response) {
  try {
    console.log("1");
    const restaurantId = req.params.id;
    const shopDetails = await shopModel
      .findById(restaurantId)
      .populate("products");
    console.log(shopDetails);

    return res.status(200).json({
      success: true,
      shopDetails,
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({
      success: false,
      msg: err,
    });
  }
}

const stripeInstance = new Stripe(process.env.STRIPE_API_KEY);

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email);

    const customer = await stripeInstance.customers.create({
      metadata: {
        email,
      },
    });

    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price: "price_1PT2tNSCAuIpRV0EPPyvCg0x",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer: customer.id,
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/canceled`,
    });

    console.log(session.url);
    return res.json({ url: session.url });

    // res.redirect(303, session.url);
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};

export const webhookStripe = async (req: Request, res: Response) => {
  try {
    const event = req.body;

    // Handle the event
    switch (event.type) {
      case "payment_intent.requires_action":
        console.log("requires_action");
        break;

      case "charge.created":
        console.log("created");
        break;

      case "payment_intent.succeeded":
        console.log("succeeded");
        break;

      case "charge.succeeded":
        console.log("charge succeeded");
        break;

      case "customer.created":
        console.log("customerCreated");
        break;

      case "customer.updated":
        console.log("customerUpdated");
        const customerUpdated = event.data.object;

        const { email } = customerUpdated.metadata;
        mailer(email);

      case "checkout.session.completed":
        console.log("completed");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return res.json({ received: true });
  } catch (err) {
    console.log("Error occured:", err);
    return res
      .status(500)
      .json({ msg: "Internal server error", success: false });
  }
};
