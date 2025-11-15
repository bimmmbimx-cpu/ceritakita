# app.py - Server Flask untuk Upload Foto

import os
from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename

# --- KONFIGURASI ---
app = Flask(__name__)
# Tentukan folder tempat file akan di-upload
UPLOAD_FOLDER = os.path.join(app.root_path, 'static', 'images')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Tentukan jenis file yang diizinkan
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Fungsi untuk memeriksa ekstensi file
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# --- HALAMAN UTAMA (INDEX) ---
@app.route('/')
def index():
    # Ambil semua foto yang sudah ada di folder static/images
    # (Ini akan menampilkan foto di Galeri Anda)
    image_files = [f for f in os.listdir(UPLOAD_FOLDER) if f.lower().endswith(tuple(ALLOWED_EXTENSIONS))]
    
    # Render halaman HTML dan kirim daftar foto ke template
    return render_template('index.html', images=image_files)

# --- FUNGSI UPLOAD FOTO ---
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(url_for('index'))
    
    file = request.files['file']
    
    if file.filename == '' or not allowed_file(file.filename):
        return redirect(url_for('index'))
    
    if file:
        filename = secure_filename(file.filename)
        # Simpan file di folder static/images/
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        return redirect(url_for('index'))

# --- JALANKAN APLIKASI ---
if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)