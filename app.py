from flask import Flask, render_template

# Inisialisasi aplikasi Flask
app = Flask(__name__)

# Route utama untuk membuka halaman tunggal (Single Page Application)
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    print("Server 'PILIH JALANMU' sedang berjalan...")
    # Tambahkan host='0.0.0.0' agar Flask mau menerima data dari Pinggy/HP
    app.run(host='0.0.0.0', port=5000, debug=True)