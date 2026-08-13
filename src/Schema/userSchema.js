import { z } from "zod";

export const getUserSchemaById = z.object({
  id: z.coerce
    .number({
      invalid_type_error: "Id invalid",
    })
    .int()
    .positive(),
});

export const createUserSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email",
    })
    .trim(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" }),

  username: z
    .string()

    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .trim(),

  nickname: z
    .string()
    .min(3, {
      message: "Nickname must be at least 3 characters",
    })
    .trim()
    .optional(),

  profilePicture: z
    .string()
    .url({
      message: "Profile picture must be a valid URL",
    })
    .trim()
    .optional(),

  bio: z
    .string()
    .max(200, {
      message: "Bio must be at most 200 characters",
    })
    .trim()
    .optional(),

  phoneNumber: z
    .string()
    .regex(/^\d{11}$/, {
      message: "Phone must have 11 digits",
    })
    .optional(),

  address: z
    .object({
      street: z.string().trim().min(1, {
        message: "Street is required",
      }),

      city: z.string().trim().min(1, {
        message: "City is required",
      }),

      state: z.string().length(2, {
        message: "State must be 2 characters (e.g. SP)",
      }),

      zipCode: z.string().trim().min(1, {
        message: "Zip code is required",
      }),
    })
    .optional(),

  website: z
    .string()
    .url({
      message: "Website must be a valid URL",
    })
    .trim()
    .optional(),

  socialLinks: z.array(z.string().url().trim()).max(5).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export const userDeleteSchema = z.object({
  id: z.coerce
    .number({
      invalid_type_error: "Id invalid",
    })
    .int()
    .positive(),
});
