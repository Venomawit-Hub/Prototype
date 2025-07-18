import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase project config:
const firebaseConfig = {
  apiKey: "AIzaSyAmkK3gMFAzCVvabeyh8gdEE4HlztGJ6Sw",
  authDomain: "smartscan-prototype.firebaseapp.com",
  projectId: "smartscan-prototype",
  storageBucket: "smartscan-prototype.appspot.com",
  messagingSenderId: "415669595384",
  appId: "1:415669595384:web:20d8c3f1dd32cbf1bd5f0d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const video = document.getElementById('scanner');
const resultText = document.getElementById('result');

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    resultText.textContent = "Camera error: " + err;
  });

video.addEventListener("click", async () => {
  const studentId = prompt("Simulated Scan: Enter student ID (e.g., 2024101234)");

  if (studentId) {
    const timestamp = new Date();
    await setDoc(doc(db, "attendance", studentId), {
      timestamp: timestamp.toISOString()
    });

    resultText.textContent = `✅ Attendance marked for: ${studentId}`;
  }
});
