import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaxE-MsBKlpUZEkmAi3hazohQS0So-yaM",
  authDomain: "bikeservices-6c049.firebaseapp.com",
  databaseURL: "https://bikeservices-6c049-default-rtdb.firebaseio.com",
  projectId: "bikeservices-6c049",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
