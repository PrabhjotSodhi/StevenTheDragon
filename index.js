import express from 'express';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";
import 'dotenv/config'

const app = express();
const port = 3000;
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

let prompt = '';

app.use(bodyParser.json());
app.use(cors());

const assistant = await openai.beta.assistants.retrieve("asst_iaS3W54KzR8Z1GU0j2eNXRng");
//const thread = await openai.beta.threads.create();
//const message = await openai.beta.threads.messages.create(thread.id, {role: "user", content: "Hi what is your name?"});
//const run = await openai.beta.threads.runs.create(thread.id, {assistant_id: assistant.id, instructions: "Address the user as FlightFund founder"});

//console.log(run);

try {
  prompt = await fs.readFile('prompt.txt', 'utf8');
} catch (err) {
  console.error(err);
}

app.post('/create', async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    res.json({ threadId: thread.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

app.post('/retrieve', async (req, res) => {
  const { threadId } = req.body;
  try {
    const response = await openai.beta.threads.messages.list(threadId);
    response.body.data.forEach((message) => {
      console.log(message.content);
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

app.post('/steven', async (req, res) => {
  const { threadId, message } = req.body;
  try {
    const addMessage = await openai.beta.threads.messages.create(threadId, message);
    const run = await openai.beta.threads.runs.create(threadId, {assistant_id: assistant.id});
    const status = await openai.beta.threads.runs.retrieve(threadId, run.id);
    const response = await openai.beta.threads.messages.list(threadId);
    res.json({ message: response.body.data[response.body.data.length - 1].content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add message to thread' });
  }
});

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
