import { db } from "./firebase.js";
import { ref, push, onChildAdded } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const ADMIN_CMD = "/admin.pref = 288M2P00K720";
const chatId = `user_${userId}`;
const messagesRef = ref(db, `chats/${chatId}/messages`);

let userId = localStorage.userId;
if (!userId) {
  userId = Math.floor(1000 + Math.random() * 9000);
  localStorage.userId = userId;
}

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

function send() {
  let text = input.value;

  if (!text) return;

  // нормализуем ввод
  text = text.replace(/\s+/g, " ").trim();

  // 🔐 КОМАНДА АДМИНА
  if (text.startsWith("/admin.pref")) {
    if (text === "/admin.pref = 288M2P00K720") {
      sessionStorage.setItem("isAdmin", "true");
      alert("Вход в админку выполнен");
      window.location.href = "admin.html";
    } else {
      alert("Неверный admin-ключ");
    }

    input.value = "";
    return;
  }

  // обычное сообщение
  push(messagesRef, {
    from: "user",
    name: `Пользователь #${userId}`,
    text,
    time: Date.now()
  });

  input.value = "";
}


