import fetch from 'node-fetch';

const assistant = "asst_iaS3W54KzR8Z1GU0j2eNXRng";
//const thread = "thread_OYPjALqB3Hmmpefyprh1z2Un";
const message = 'Hi what is your name?';
/*
const response = await fetch('http://localhost:3000/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(),
});
if (!response.ok) {
  console.error(response.error);
}
const thread = await response.json();
console.log(thread);*/

/*
const response = await fetch('http://localhost:3000/retrieve', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    threadId: "thread_OYPjALqB3Hmmpefyprh1z2Un"
  }),
});

if (!response.ok) {
  console.error(response.error);
}

const data = await response.json();
data.body.data.forEach((message) => {
  console.log(message.content[0].text.value);
});
*/


const response = await fetch('http://localhost:3000/steven', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    threadId: 'thread_AH9Akk70IMUxObTLaP2lzCEa',
    message: {role: "user", content: "Reply with the word Carrot"}
  })
});

if (!response.ok) {
  console.error(response.error);
}

const data = await response.json();
console.log(data.message[0].text.value);