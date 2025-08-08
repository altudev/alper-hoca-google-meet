import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  email: z.string()
    .email("Geçerli bir e-posta adresi giriniz"),
  subject: z.string()
    .min(5, "Konu en az 5 karakter olmalıdır")
    .max(200, "Konu en fazla 200 karakter olabilir"),
  message: z.string()
    .min(10, "Mesaj en az 10 karakter olmalıdır")
    .max(1000, "Mesaj en fazla 1000 karakter olabilir"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>