// 1. Impor module yang diperlukan dari firebase dan firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    deleteDoc,
    increment
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

// 2. Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6I1Tvw61wzc6-2MVmcWXfZ17IwDYj7u4",
    authDomain: "rpl25-b6db4.firebaseapp.com",
    projectId: "rpl25-b6db4",
    storageBucket: "rpl25-b6db4.firebasestorage.app",
    messagingSenderId: "643920833293",
    appId: "1:643920833293:web:f5ac7fdc746e4e410d5e44"
}

// 3. Inisialisasi Firebase dan Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const messagesCollection = collection(db, "messages")

// Menentukan elemen-elemen DOM yang diperlukan
const chatForm = document.getElementById("chat-form")
const usernameInput = document.getElementById("username")
const messageInput = document.getElementById("message")
const chatBox = document.getElementById("chat-box")

// Fitur kirim pesan
chatForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const username = usernameInput.value.trim()
    const message = messageInput.value.trim()

    if (username && message) {
        // kirim ke Firestore
        try {
            await addDoc(messagesCollection, {
                username: username,
                message: message,
                waktu: serverTimestamp()
            })
            // bersihkan input setelah mengirim pesan
            messageInput.value = ""
        } catch (error) {
            console.log("Gagal mengirim pesan:", error)
        }
    }
})

// Fitur Pesan listener (Realtime)
 const queryPesan = query(messagesCollection, orderBy("waktu", "asc"))
 
 onSnapshot(queryPesan, (cuplikan)
 => {
     // Bersihkan chatBox sebelum menampilkan pesan baru
     chatBox,innerHTMl = ""
     
     // tampilkan pesan baru di chatBox
    cuplikan.forEach((doc) => {
        // ambil data dari dokumen
        const data = doc.data()
        
        // membuat tqmpilan waktu
        const waktu = data.waktu.toDate().toLocaleTimeString([],
            {hour: '2-digit', minute: '2-digit' }
        )
        
        // render pesan (mengambil fungsi renderPesan)
        renderPesan(data.username, data.message, waktu)
    })
})

function renderPesan(username, message, waktu) {
  // buat elemenbuntuk menampilkan pesan
  const messageDiv = document.createElement("div")
    
    // menambahkan nama class message-card ke elemen message
    messageDiv.classList.add("message-card")
    
    // menampilkan konten pesan ke messageDiv
    messageDiv.innerHTML = `
        <div class="message-content">
            <strong>${username}</strong>
            <span>${message}</span>
        </div>
        <span class="time">${waktu}</span>
    ` // backtick
    
    // menambahkan messageDiv ke chatBox
    chatBox.appendChild(messageDiv)
}b