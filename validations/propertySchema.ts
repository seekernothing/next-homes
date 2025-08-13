import { z } from "zod";

export const propertyDataSchema = z.object({
  address1: z.string().min(1, "Address line 1 must contain a value"),
  address2: z.string().optional(),
  city: z.string().min(3, "City must contain at least 3 characters"),
  postcode: z.string().refine((postcode) => {
    // India PIN code: 6 digits, starting with 1-9
    const pinCodeRegex = /^[1-9][0-9]{5}$/;
    return pinCodeRegex.test(postcode);
  }, "Invalid Indian PIN code"),
  price: z.number().positive("Price must be greater than 0"),
  description: z
    .string()
    .min(40, "Description must contain at least 40 characters"),
  bedrooms: z.number().min(0, "Bedrooms must be at least 0"),
  bathrooms: z.number().min(0, "Bathrooms must be at least 0"),
  status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
});


export const propertyImagesSchema = z.object({
  images:z.array(z.object({
    id:z.string(),
    url:z.string(),
    file:z.instanceof(File).optional()
  }))
})


export const propertySchema = propertyDataSchema.and(propertyImagesSchema)