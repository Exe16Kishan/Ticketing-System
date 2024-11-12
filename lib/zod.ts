import z from "zod"

export const signInSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})


export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  detailDescription: z.string().min(50, {
    message: 'Description must be at least 50 characters.',
  }).max(500, { message: 'Description must be at least 500 characters.' }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  date: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'Date must be in YYYY-MM-DD format.',
  }),
  time: z.string().refine((val) => /^\d{2}:\d{2}$/.test(val), {
    message: 'Time must be in HH:MM format.',
  }),
  seats: z.preprocess(
    (value) => (value ? Number(value) : undefined),  // Convert to number
    z.number()
      .min(1, "Seats must be at least 1")
      .max(100, "Seats can't exceed 100")
      .int("Seats must be an integer")
  ),
  price: z.preprocess(
    (value) => (value ? Number(value) : undefined),  // Convert to number
    z.number()
      .int("price must be an integer")
  ),
  type: z.enum(["MUSIC", "CONCERT", "ART", "CULTURE", "HACKATHON", "SEMINAR"]),
  organizerId: z.string({ message: "Organizer ID not found" }),

  performers: z
    .array(z.object({
      performName: z.string(),
      occupation: z.string(),
      image: z.string().optional().default("")
    }))
    .min(1, "At least one performer is required."),

});
