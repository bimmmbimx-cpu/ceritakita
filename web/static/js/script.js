// script.js

// 1. --- LOGIKA LOGIN (ID & PASSWORD ANDA) ---
const correctUsername = "nanandut" 
const correctPassword = "nanagendutbanget"

function checkLogin() {
    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;
    const loginMessage = document.getElementById("login-message");

    if (inputUsername === correctUsername && inputPassword === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.body.style.overflow = "auto"; // Aktifkan scroll
        
        // --- PERBAIKAN: Tampilkan SEMUA konten setelah login ---
        document.getElementById("hero").style.display = "block"; 
        document.querySelector("header").style.display = "block";
        document.getElementById("timeline").style.display = "block";
        document.getElementById("gallery").style.display = "block";
        document.querySelector("footer").style.display = "block";
        // --------------------------------------------------------

        updateDuration(); // Mulai hitungan durasi setelah login berhasil
    } else {
        loginMessage.textContent = "ID atau Password salah. Coba lagi!";
        loginMessage.style.color = "red";
    }
}

// 2. --- LOGIKA DURASI BULAN (GANTI TANGGAL INI) ---
// Ganti "YYYY-MM" dengan TAHUN dan BULAN awal hubungan Anda (misal: "2023-11-01")
const startDate = new Date("2022-05-01T00:00:00"); // <--- GANTI TANGGAL INI jika bukan Mei 2022!

function updateDuration() {
    const now = new Date();
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    
    // Perhitungan total bulan penuh yang sudah dilewati
    const totalMonths = (years * 12) + months;
    
    // Perhitungan persentase bulan ini berjalan
    const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const currentDay = now.getDate();
    const percentage = Math.round((currentDay / daysInCurrentMonth) * 100);

    document.getElementById("countdown-title").textContent = "Sudah Berapa Lama Kita Bersama:";
    document.getElementById("countdown").innerHTML = 
        `<div class="time-box">${totalMonths}<span>Bulan Penuh</span></div>` +
        `<div class="time-box">${percentage}%<span>Bulan Ini Berjalan</span></div>`;
}

// Interval untuk menjalankan updateDuration (akan berjalan setelah login)
const x = setInterval(updateDuration, 86400000); // Update sekali sehari