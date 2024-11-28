import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ images }) {
    const { flash } = usePage().props; // Untuk menampilkan pesan success
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image_upload', file);

        Inertia.post(route('dashboard.store'), formData);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            
            {/* Pesan Success */}
            {flash.success && <p style={{ color: 'green' }}>{flash.success}</p>}

            {/* Form Upload */}
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">Upload</button>
            </form>

            {/* Tampilkan Gambar */}
            <h2>Daftar Gambar</h2>
            <ul>
                {images.map((image) => (
                    <li key={image.id_log}>
                        <img
                            src={`/uploads/${image.image_upload}`}
                            alt="Gambar"
                            width="100"
                        />
                        <p>Uploaded by User ID: {image.id_user}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
