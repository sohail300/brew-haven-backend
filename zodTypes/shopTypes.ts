import { z } from "zod";

const shopType = z.object({
  name: z.string().min(1, "Name should not be empty"),
  address: z.string().min(1, "Name should not be empty"),
  distance: z.string().min(1, "Name should not be empty"),
  rating: z
    .number()
    .min(1, "Rating should be between 1 to 5")
    .max(5, "Rating should be between 1 to 5"),
  reviews: z.number(),
  description: z.string().min(1, "Description should not be empty"),
});

export default shopType;
