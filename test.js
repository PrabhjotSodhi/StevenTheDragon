import fetch from 'node-fetch';

const assistant = "asst_iaS3W54KzR8Z1GU0j2eNXRng";
const thread = "thread_kgNVz4ee1CleTtArBNgt6JFF";
const message = 'Hi what is your name?';

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
});

fetch('http://localhost:3000/steven', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    threadId: 'thread_kgNVz4ee1CleTtArBNgt6JFF',
    message: 'Hi what is your name?'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
