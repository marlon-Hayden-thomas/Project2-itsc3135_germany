
import OpenAI from "openai";

// Replace with your real key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await openai.responses.create({
  model: "gpt-5-nano",
  input: "write a haiku about ai",
  store: true,
});

console.log(response.output_text);
