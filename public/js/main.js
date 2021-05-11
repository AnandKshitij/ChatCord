const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// get username and room name from the url using qs library
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

console.log(username + " " + room);

const socket = io();

// Join chatroom 
socket.emit('joinRoom', {username, room});

// Get room and users info
socket.on('roomUsers', ({room, users}) =>{
  outputRoomName(room);
  outputUsers(users);
})

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

// add room name to DOM
function outputRoomName(room){
  roomName.innerText = room;
}

function outputUsers(users){
  userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}