<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name') }}</title>

        <!-- Fonts -->
        <!-- <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        <!-- @vite(['resources/js/app.jsx']) -->
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
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

            <!-- Menampilkan pesan sukses setelah mengunggah gambar -->
            @if (session('success'))
                <div class="mt-4 text-green-600">
                    {{ session('success') }}
                </div>
            @endif

            <!-- Menampilkan Gambar Setelah Diupload -->
            @if(!empty($image))
                <div class="mt-10">
                    <h2>Gambar yang Diupload:</h2>
                    <img src="{{ asset('storage/' . $image->image_upload) }}" alt="Uploaded Image" class="w-full h-auto">
                </div>
            @endif
        </div>
    </body>
    <!-- <body class="font-sans antialiased">
        @inertia
    </body> -->
</html>
