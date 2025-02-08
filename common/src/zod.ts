import { title } from "process";
import { PassThrough } from "stream";
import z from "zod";
export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
export type SignupInput = z.infer<typeof signupInput>;
export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});
export type signininput = z.infer<typeof signinInput>;
export const createblogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type createblogInput = z.infer<typeof createblogInput>;
