'use strict';

//const socket = io();

var socket = io.connect('https://testvoicebotconsole.herokuapp.com');

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

//  socket.on('connection', function(socket) {
  socket.emit('chat message', text);
 // });


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

//var moduleName2 = 'socket.io';
//require([moduleName2], function(io){
//socket.on('connection', function(socket) {
socket.on('bot reply', function(replyText) {
  synthVoice(replyText);

  console.log('replyText: ' + replyText);
  
  if(replyText == '') replyText = '(No answer...)';
  outputBot.textContent = replyText;
});
//});


//});



