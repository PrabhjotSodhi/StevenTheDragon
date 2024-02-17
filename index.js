import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";

const app = express();
const port = 3000;
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(completion.choices[0]);
  res.json({message: completion.choices[0]})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
