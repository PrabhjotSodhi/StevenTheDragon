import express from 'express';
import fs from 'fs/promises';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";
import fetch from 'node-fetch';
import 'dotenv/config'

const app = express();
const port = 3000;
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

let prompt = '';

app.use(bodyParser.json());
app.use(cors());

const assistant = await openai.beta.assistants.retrieve("asst_iaS3W54KzR8Z1GU0j2eNXRng");

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

    let status = await openai.beta.threads.runs.retrieve(threadId, run.id);
    while (status.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      status = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    if(["failed", "cancelled", "expired"].includes(status.status)) {
      console.error(status.status.status)
      res.status(500).json({ error: status.status.status });
    }

    const messages = await openai.beta.threads.messages.list(threadId);
    const response = messages.data.filter((message) => message.run_id === run.id && message.role === "assistant").pop();

    if (response) {
      console.log(response);
      res.json({ message: response.content[0].text.value });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add message to thread' });
  }
});

app.post('/voice', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}/stream`, {
      method: 'POST',
      headers: {'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json'},
      body: JSON.stringify({
        "text": message,
      })
    });
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve voice' });
  }
});

app.post('/old', async (req, res) => {
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

app.use("/", (req, res) => {
  res.send("Server is running");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
