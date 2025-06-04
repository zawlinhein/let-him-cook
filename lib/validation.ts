import z from "zod";

const instructionBlock = z.object({
  _type: z.literal("block"),
  _key: z.string(),
  style: z.literal("normal"),
  markDefs: z.array(z.any()),
  children: z.array(
    z.object({
      _type: z.literal("span"),
      _key: z.string(),
      text: z.string(),
      marks: z.array(z.any()),
    })
  ),
});

const imageSchema = z
  .custom<File>((file) => file instanceof File, {
    message: "Image is required",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "Image must be smaller than 5MB",
  });

export const recipeValidation = z.object({
  title: z.string().min(5).max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must be at most 300 characters"),
  image: imageSchema,
  ingredients: z.array(z.string()).min(1, "Add at least one ingredient"),
  instructions: z
    .array(instructionBlock) // Use specific schema if your portable text blocks have a shape
    .min(1, "Add at least one instruction step"),
  time: z
    .number()
    .min(1, "Time must be at least 1 minute")
    .max(1440, "Time must be at most 1440 minutes"),
  difficulty: z.enum(["Easy", "Medium", "Hard"], {
    errorMap: () => ({ message: "Difficulty is required" }),
  }),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  tags: z.array(z.string()).min(1, "Add at least one tag"),
  servings: z.number().min(1, "Servings should be at least 1"),
});
