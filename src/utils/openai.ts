import OpenAI from "openai";
require('dotenv').config()

export const openai = new OpenAI({apiKey: process.env.AI_KEY});