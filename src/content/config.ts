import { defineCollection } from "astro:content";
import { inquirerSchema } from "~/schemas/inquirer";

const inquirers = defineCollection({
  type: "data",
  schema: inquirerSchema,
});

export const collections = { inquirers };
