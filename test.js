import fetch from 'node-fetch';

const assistant = "asst_iaS3W54KzR8Z1GU0j2eNXRng";
const thread = "thread_kgNVz4ee1CleTtArBNgt6JFF";
const message = 'Hi what is your name?';
/*
fetch('http://localhost:3000/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ assistant, thread, message }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
});*/

const response = await fetch('http://localhost:3000/retrieve', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    threadId: "thread_kgNVz4ee1CleTtArBNgt6JFF"
  }),
});

if (!response.ok) {
  console.error(response.error);
}

const data = await response.json();
data.body.data.forEach((message) => {
  console.log(message.content[0].text.value);
});


/*
const response = await fetch('http://localhost:3000/steven', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    threadId: 'thread_kgNVz4ee1CleTtArBNgt6JFF',
    message: {role: "user", content: "Hi is your name steven bartlett?"}
  })
});

if (!response.ok) {
  console.error(response.error);
}

const data = await response.json();
console.log(data.message[0].text.value);*/