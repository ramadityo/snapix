<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="font-sans antialiased">
    <div class="container mx-auto mt-10">
        <!-- Form Upload Gambar -->
        <form action="{{ route('images.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div>
                <label for="image_upload" class="block text-lg">Pilih Gambar:</label>
                <input type="file" name="image_upload" id="image_upload" accept="image/*" required class="border p-2 rounded-md">
            </div>
            <button type="submit" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Unggah Gambar</button>
        </form>

        <!-- Menampilkan pesan sukses -->
        @if (session('success'))
            <div class="mt-4 text-green-600">
                {{ session('success') }}
            </div>
        @endif

        <!-- Menampilkan Gambar yang Sudah Diupload -->
        <div class="mt-10 grid grid-cols-3 gap-4">
            @foreach ($images as $image)
                <div class="border p-4 rounded-md">
                    <div class="mb-4">
                        <strong>Gambar Asli:</strong>
                        <img src="{{ asset('storage/' . $image->image_upload) }}" alt="Image" class="w-full h-auto">
                    </div>
                    @if ($image->image_result)
                        <div>
                            <strong>Hasil Enhance:</strong>
                            <img src="{{ asset('storage/' . $image->image_result) }}" alt="Enhanced Image" class="w-full h-auto">
                        </div>
                    @else
                        <p class="mt-2 text-yellow-600">Gambar ini belum di-enhance.</p>
                    @endif
                </div>
            @endforeach
        </div>
    </div>
</body>
</html>
