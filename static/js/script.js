// Variabel global untuk menyimpan data inputan pengguna sementara
let formData = {
    kategori: "",
    masalah: "",
    pilihanA: { nama: "", kelebihan: "", kekurangan: "", perasaan: "", risiko: "" },
    pilihanB: { nama: "", kelebihan: "", kekurangan: "", perasaan: "", risiko: "" },
    refleksi: { keinginan: "", kondisi: "", risikoReady: "", penting: "" }
};

// Fungsi Navigasi Pindah Step/Halaman
function nextStep(stepNumber) {
    // Sembunyikan semua step
    const steps = document.querySelectorAll('.step-card');
    steps.forEach(step => step.classList.remove('active'));

    // Tampilkan step yang dituju
    document.getElementById(`step-${stepNumber}`).classList.add('active');

    // Update Progress Bar
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    if (stepNumber === 1) {
        progressContainer.style.display = 'none';
    } else {
        progressContainer.style.display = 'block';
        const percentage = ((stepNumber - 1) / 4) * 100;
        progressBar.style.width = percentage + '%';
    }

    // Scroll ke atas halaman
    window.scrollTo(0, 0);
}

// Validasi Step 2 (Identifikasi Masalah)
function validateStep2() {
    const kategori = document.getElementById('kategoriMasalah').value;
    const deskripsi = document.getElementById('deskripsiMasalah').value;

    if (!kategori || !deskripsi.trim()) {
        alert("Silakan pilih kategori dan isi deskripsi masalah terlebih dahulu.");
        return;
    }

    formData.kategori = kategori;
    formData.masalah = deskripsi;

    nextStep(3);
}

// Validasi Step 3 (Membandingkan Pilihan)
function validateStep3() {
    const namaA = document.getElementById('namaA').value.trim();
    const namaB = document.getElementById('namaB').value.trim();

    if (!namaA || !namaB) {
        alert("Harap berikan nama untuk Pilihan A dan Pilihan B.");
        return;
    }

    // Simpan data Pilihan A
    formData.pilihanA = {
        nama: namaA,
        kelebihan: document.getElementById('kelebihanA').value || "-",
        kekurangan: document.getElementById('kekuranganA').value || "-",
        perasaan: document.getElementById('perasaanA').value || "-",
        risiko: document.getElementById('risikoA').value || "-"
    };

    // Simpan data Pilihan B
    formData.pilihanB = {
        nama: namaB,
        kelebihan: document.getElementById('kelebihanB').value || "-",
        kekurangan: document.getElementById('kekuranganB').value || "-",
        perasaan: document.getElementById('perasaanB').value || "-",
        risiko: document.getElementById('risikoB').value || "-"
    };

    // Update dropdown opsi pada Step 4 secara dinamis sesuai nama yang diinput
    populateRefleksiOptions();

    nextStep(4);
}

// Mengisi pilihan dropdown di halaman refleksi berdasarkan input nama pilihan A & B
function populateRefleksiOptions() {
    const selects = ['refleksiKeinginan', 'refleksiKondisi', 'refleksiRisiko'];
    
    selects.forEach(id => {
        const select = document.getElementById(id);
        select.innerHTML = `
            <option value="${formData.pilihanA.nama}">${formData.pilihanA.nama} (Pilihan A)</option>
            <option value="${formData.pilihanB.nama}">${formData.pilihanB.nama} (Pilihan B)</option>
        `;
    });
}

// Generate Hasil Akhir pada Step 5
function generateResult() {
    formData.refleksi.keinginan = document.getElementById('refleksiKeinginan').value;
    formData.refleksi.kondisi = document.getElementById('refleksiKondisi').value;
    formData.refleksi.risikoReady = document.getElementById('refleksiRisiko').value;
    formData.refleksi.penting = document.getElementById('refleksiPenting').value || "-";

    // Isi Konten ke Halaman Hasil
    document.getElementById('resKategori').innerText = formData.kategori;
    document.getElementById('resMasalah').innerText = formData.masalah;

    // Render Grid Hasil
    const resultGrid = document.getElementById('resultGrid');
    resultGrid.innerHTML = `
        <div class="option-card card-a">
            <h3>Pilihan A: ${formData.pilihanA.nama}</h3>
            <p><strong>Kelebihan:</strong> ${formData.pilihanA.kelebihan}</p>
            <p><strong>Kekurangan:</strong> ${formData.pilihanA.kekurangan}</p>
            <p><strong>Perasaan:</strong> ${formData.pilihanA.perasaan}</p>
            <p><strong>Risiko:</strong> ${formData.pilihanA.risiko}</p>
        </div>
        <div class="option-card card-b">
            <h3>Pilihan B: ${formData.pilihanB.nama}</h3>
            <p><strong>Kelebihan:</strong> ${formData.pilihanB.kelebihan}</p>
            <p><strong>Kekurangan:</strong> ${formData.pilihanB.kekurangan}</p>
            <p><strong>Perasaan:</strong> ${formData.pilihanB.perasaan}</p>
            <p><strong>Risiko:</strong> ${formData.pilihanB.risiko}</p>
        </div>
    `;

    document.getElementById('resKeinginan').innerText = formData.refleksi.keinginan;
    document.getElementById('resKondisi').innerText = formData.refleksi.kondisi;
    document.getElementById('resRisikoReady').innerText = formData.refleksi.risikoReady;
    document.getElementById('resPenting').innerText = formData.refleksi.penting;

    nextStep(5);
}

// Reset Aplikasi ke Awal
function restart() {
    document.querySelectorAll('input, textarea').forEach(input => input.value = '');
    document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);
    nextStep(1);
}