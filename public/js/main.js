const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

const socket = io();

// message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  // when we submit a form it automatically submits to a file
  // we want to stop this default behaviour from happening
  e.preventDefault();

  // we need to get the text input
  // we will be getting that with the element id which is msg
  const msg = e.target.elements.msg.value;

  // emitting the message to the server
  socket.emit("chatMessage", msg);

  // clear the input and focus on the empty message typing box
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
