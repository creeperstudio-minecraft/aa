import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaxE-MsBKlpUZEkmAi3hazohQS0So-yaM",
  databaseURL: "https://bikeservices-6c049-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const messagesRef = ref(db, "chats/global-chat/messages");
const messages = document.getElementById("messages");

onChildAdded(messagesRef, snap => {
  const m = snap.val();
  const div = document.createElement("div");
  div.className = "msg " + m.from;
  div.innerHTML = `<b>${m.name}</b><br>${m.text}`;
  messages.appendChild(div);
});

document.getElementById("send").onclick = () => {
  const text = document.getElementById("text").value.trim();
  if (!text) return;

  push(messagesRef, {
    from: "admin",
    name: "Поддержка",
    text,
    time: Date.now()
  });

  document.getElementById("text").value = "";
};
