import { db } from "./firebase.js";
import {
  ref, push, onChildAdded, update
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const usersDiv = document.getElementById("users");
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("text");
const title = document.getElementById("chatTitle");

let currentChat = null;
let messagesRef = null;

// 🔥 слушаем НОВЫЕ чаты
onChildAdded(ref(db, "chats"), snap => {
  const chat = snap.val();
  if (chat.closed) return;

  const div = document.createElement("div");
  div.className = "user";
  div.textContent = snap.key;
  div.onclick = () => openChat(snap.key);
  usersDiv.appendChild(div);
});

function openChat(chatId) {
  currentChat = chatId;
  title.textContent = chatId;
  messagesDiv.innerHTML = "";

  messagesRef = ref(db, `chats/${chatId}/messages`);

  onChildAdded(messagesRef, snap => {
    const m = snap.val();
    const div = document.createElement("div");
    div.className = "msg " + m.from;
    div.innerHTML = `<span class="name">${m.name}</span>${m.text}`;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

document.getElementById("send").onclick = () => {
  if (!currentChat) return;

  const text = input.value.trim();
  if (!text) return;

  push(messagesRef, {
    from: "admin",
    name: "Поддержка",
    text,
    time: Date.now()
  });

  input.value = "";
};

document.getElementById("closeChat").onclick = () => {
  if (!currentChat) return;

  update(ref(db, `chats/${currentChat}`), { closed: true });
  location.reload();
};
