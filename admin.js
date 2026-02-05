import { db } from "./firebase.js";
import { ref, push, onChildAdded } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const messagesRef = ref(db, "chats/global/messages");
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
  const text = input.value.trim();
  if (!text) return;

  push(messagesRef, {
    from: "admin",
    name: "Поддержка",
    text,
    time: Date.now()
  });

  input.value = "";
}
