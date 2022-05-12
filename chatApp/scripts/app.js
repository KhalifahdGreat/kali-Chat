//dom query
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
// add event listener

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
//update username

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newNameForm.name.value.trim();
  chatroom.updateName(name);
  //   reset form
  newNameForm.reset();
  // show message after name update
  updateMessage.innerText = `Your name has been updated to ${name}`;
  setTimeout(() => {
    updateMessage.innerHTML = ``;
  }, 3000);
});
// update chat room
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUi.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((forEachchat) => {
      chatUi.render(forEachchat);
    });
  }
});
//check local storage for a name

const username = localStorage.name ? localStorage.name : "anonymous";

//class instances
const chatUi = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

//get chats and render
chatroom.getChats((data) => {
  chatUi.render(data);
});
