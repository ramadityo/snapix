<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Image</title>
</head>
<body>
    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <form action="/dashboard/images" method="POST" enctype="multipart/form-data">
        @csrf
        <label for="image_upload">Upload Image:</label>
        <input type="file" name="image_upload" required><br>

        <label for="image_result">Result Image:</label>
        <input type="file" name="image_result" required><br>

        <button type="submit">Save Images</button>
    </form>
</body>
</html>
