<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Haloo Saya Ini images</h1>

    <form action="{{ route('image_upload.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="hidden" name="id_user" value="4"> <!-- Ganti sesuai ID user aktif -->

    <label for="image_upload">Upload Image:</label>
    <input type="file" name="image_upload" id="image_upload" accept="image/*" required>

    <button type="submit">Upload</button>
    </form>




</body>
</html>