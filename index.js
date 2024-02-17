import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";

const app = express();
const port = 3000;
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const completions = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
});

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  res.json({message: "Hello World"});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
