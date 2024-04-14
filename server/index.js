import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import OpenAI from "openai";
import fetch from 'node-fetch';
import FormData from 'form-data';
import 'dotenv/config'

const app = express();
const port = 3000;
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

let prompt = '';

app.use(bodyParser.json());
app.use(cors());

const assistant = await openai.beta.assistants.retrieve("asst_iaS3W54KzR8Z1GU0j2eNXRng");

app.post('/create', async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    res.json({ threadId: thread.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create thread' });
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
        "model_id": "eleven_turbo_v2"
      })
    });
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve voice' });
  }
});

app.post('/whisper', async (req, res) => {
  const audioData = Buffer.from(req.body.file, 'base64');
  try {
    const file = await fs.promises.open('./audio.m4a', 'w');
    await file.write(audioData);
    await file.datasync();
    await file.close();
    const form = new FormData();
    form.append("file", fs.createReadStream('./audio.m4a'));
    form.append("model", "whisper-1");
    form.append("language", "en");
    form.append("prompt", "Please transcribe this audio, including filler words and pauses.");
    form.append("response_format", "text");
    const transcription  = await fetch("https://api.openai.com/v1/audio/translations", {
      method: "POST",
      headers: { ...form.getHeaders(), Authorization: `Bearer ${OPENAI_API_KEY}` },
      body: form,
    });
    const data = await transcription.text();
    console.log(data);
    res.json({ message: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the audio data.' });
  }
});

app.use("/", (req, res) => {
  res.send("Server is running");
})

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
