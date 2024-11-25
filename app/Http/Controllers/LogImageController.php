<?php

namespace App\Http\Controllers;

use App\Models\LogImage;
use Illuminate\Http\Request;

class LogImageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user' => 'required|integer',
            'image_upload' => 'required|image|max:2048', // Validasi untuk file gambar
        ]);

        $imageData = file_get_contents($request->file('image_upload'));

        LogImage::create([
            'user' => $request->user,
            'image_upload' => $imageData,
            'image_result' => 'some default value', // Menyisipkan nilai default untuk image_result
            'created_date' => now(),
        ]);

        return back()->with('success', 'Image uploaded successfully!');
    }

    public function show($id)
    {
        $logImage = LogImage::findOrFail($id);

        return response($logImage->image_upload)->header('Content-Type', 'image/jpeg'); // Sesuaikan MIME type
    }

}

