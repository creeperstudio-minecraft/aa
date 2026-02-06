import { db } from "./firebase.js";
import {
  ref, push, onChildAdded, get
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const ADMIN_CMD = "/admin.pref = 288M2P00K720";

let userId = localStorage.userId;
if (!userId) {
  userId = Math.floor(1000 + Math.random() * 9000);
  localStorage.userId = userId;
}

const chatId = `user_${userId}`;
const chatRef = ref(db, `chats/${chatId}`);
const messagesRef = ref(db, `chats/${chatId}/messages`);

const messages = document.getElementById("messages");
const input = document.getElementById("text");

onChildAdded(messagesRef, snap => {
  const m = snap.val();
  const div = document.createElement("div");
  div.className = "msg " + m.from;
  div.innerHTML = `<span class="name">${m.name}</span>${m.text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});

document.getElementById("send").onclick = send;
input.addEventListener("keydown", e => e.key === "Enter" && send());

async function send() {
  let text = input.value.trim();
  if (!text) return;

  if (text === ADMIN_CMD) {
    sessionStorage.setItem("isAdmin", "true");
    location.href = "admin.html";
    return;
  }

  // проверка — не закрыт ли чат
  const snap = await get(chatRef);
  if (snap.exists() && snap.val().closed) {
    alert("Чат закрыт поддержкой");
    input.value = "";
    return;
  }

  push(messagesRef, {
    from: "user",
    name: `Пользователь #${userId}`,
    text,
    time: Date.now()
  });

  input.value = "";
}
