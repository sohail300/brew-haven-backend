import { Request, Response } from "express";
import { productModel, shopModel } from "../model/schema";
import productType from "../zodTypes/productType";

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

export async function addProduct(req: Request, res: Response) {
  try {
    const parsedInput = productType.safeParse(req.body);

    if (parsedInput.success === false) {
      return res.status(500).json({
        success: false,
        msg: parsedInput.error.issues[0].message,
      });
    }

    const { name, price, rating, reviews, description, category } =
      parsedInput.data;

    const obj = {
      name,
      price,
      rating,
      reviews,
      description,
      category,
    };

    const savedProduct = new productModel(obj);
    await savedProduct.save();

    return res.status(201).json({
      success: true,
      msg: "Product added successfully",
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({
      success: false,
      msg: err,
    });
  }
}

export async function addRestaurant() {
  console.log("route working");
}
