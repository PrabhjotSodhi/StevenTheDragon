import express from 'express';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";
import 'dotenv/config'

const app = express();
const port = 3000;
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const assistant = await openai.beta.assistants.retrieve("asst_iaS3W54KzR8Z1GU0j2eNXRng");
//const thread = await openai.beta.threads.create();
//const message = await openai.beta.threads.messages.create(thread.id, {role: "user", content: "Hi what is your name?"});
//const run = await openai.beta.threads.runs.create(thread.id, {assistant_id: assistant.id, instructions: "Address the user as FlightFund founder"});

//console.log(run);

let prompt = '';

app.use(bodyParser.json());
app.use(cors());

try {
  prompt = await fs.readFile('prompt.txt', 'utf8');
} catch (err) {
  console.error(err);
}

app.post('/', async (req, res) => {
  const { messages } = req.body
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }, ...messages],
    model: "gpt-3.5-turbo",
    max_tokens: 128,
    temperature: 0.7,
  });
  console.log(completion.choices[0]);
  if(completion.choices[0].message.content) {
    res.json({message: completion.choices[0].message.content})
  }
});

app.post('/title', async (req, res) => {
  const { messages } = req.body
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Write an title under 5 words for this conversation" },messages],
    model: "gpt-3.5-turbo",
    max_tokens: 10,
    temperature: 0,
  });
  console.log(completion.choices[0]);
  if(completion.choices[0].message.content) {
    res.json({message: completion.choices[0].message.content})
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
