'use strict';



const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);

  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
});

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);

  if(replyText == '') replyText = '(No answer...)';
  outputBot.textContent = replyText;
});




/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'vibhorvoicebot-cjvqeb') { 
  const sessionId = uuid.v4();

var config = {
  credentials: {
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5sL53SnSs3dfl\nZns85Wu+UchbweRTw5Yslh+AaM1qDlcdiB+yvf9kKigGH2/noOX9PejkoX4XSsAx\nXJGIOLrfFmcs+SD3QY1NCjT08HXxoWprL8O59XJzwps/3KTtfdDyJq2HTjl/W0DD\nUpKngihB7+L57kvvN6XaJ086oL9Do9HyZlcEQWvR/oiyE2LW5oMDVcAMVKdVGtYg\niGnbCjF+LudIjqQn5hrAgwhHNUBR+UrsC9faM9jHa4OeJ9SOLizSwJD/CsSo0XEt\njmhdZ2ZqPijeXjj61GhmkeVqtR1EnQP+m5TKgXQELdTRhtJQIJWtBaCJFy22efy/\nvAlG72bBAgMBAAECggEAAM7TfC31Cbbvq0Bq5WvKHe8C35WdhdjrbuvxbyUFlqJB\nVsb7sy4/TaVoKpoU/Ea5y7shzEYAvwN7rN/ghIIRiYE7ctTuFhMIFTZMcUIYSmsh\n8a+68bTBZZVBdoY9hgi30bp4NaukUPj3hpjjqVEzqDXJRVCKZS5XFmR40g/o+/wQ\nAzFziK9zIJ0lwN+ntbJPyqTfjQedrepP8YiDJbLFrml+WGhh7Ef0iIWx2ApwiIpT\nwtA9N9HPk/n2eAPrp52DZ0KCIhNWx9HrJ7AcZ8eB5+0+c69BGEJU+1AnWhqrXcbJ\nLB+WvUzmfk/ISG7foYQv+vvGufnQBJ591FY4wvjNUQKBgQDnpu0QUQruqrCKIHFh\nrqunC2cG2sbMELAi0r5UuZR2ZCP9cdeYfSrnBfpkx84OcYCkemdq3YwuLmxWPeDm\nEgQ6BS3XyBwq6FFon74Wv356wMJkb0SQU7v8tfrMSfCqpJwgikb4sfhN/Dm3tdvs\nMR3OHVlGcz+KXiQBw2BZwkryzwKBgQDNNSAgW18voSh4ZMLT0sq1qNe3/4M3Q2X0\nFXXZLI/wa1Qb8ojVNBM5dNBj3QhIVvos29asjKk7t+8hVvMXbkofxKyp0Af/D2Q5\nY2Doi4ToENoUqJEB19Wjq/rMMvXqySpce1euyuEPpwAmJiwfvjZHBeM/4xTzPv8i\nAGqacEGxbwKBgDFXLbFHAcQaGSYiiOPcd3VKCXS9TpCSkWGpb57ONGAPLldCU0CI\nkIXKkS28HRiYdmUSKUrqy3veqXapEWkPt1TAW6ZVWiKNfyGAvNVNjlwJCJ6p0HnJ\nTAYkoLm4mglOrG6F5V39Uj0SFx0ZIDGruIR5XdWSoJsROCwj+DbGGn6jAoGBAJuw\n8eX6zTY65JSrhjHmXUwEhV6hqrF0HldZLOeP6sly9QabNfvkna1bFnyeB5my++6r\nAK47rm6TuAeoi5k8YVrHAmV4Y4i96cGsx6rHqBfWKU/BMPugAQRECG2DQJdY9x3h\nqv4ACU+x2egX0CRpUY8DRY6EQLHpGvN2M2tnPkBbAoGBAMXBsJvVPkwEdcQaffT0\nwQ/0z2bb6EKXS+4WyJMHsiynZmxwFeDa8aVK3tnZJPjiiiKhOjvZdYsIi5bU1t/O\nqs6BiwRiOxe3N/nCPqwSdvDL3NT3pAGHzV3x5M2mU/mZepcJawRC/h5c6G5Ieea6\no79mkNvsbmwXXHdYa7v8lMNS\n-----END PRIVATE KEY-----\n",
    client_email: "dialogflow-yuctth@vibhorvoicebot-cjvqeb.iam.gserviceaccount.com"
  }
}  
  
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hello',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
}

runSample(...args).catch(console.error);
