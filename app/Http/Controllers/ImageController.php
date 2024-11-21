<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index()
    {
        return inertia('Dashboard', [
            'image' => Image::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image_upload' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Menyimpan gambar yang diupload
        $path = $request->file('image_upload')->store('uploads', 'public');

        $image = new Image();
        $image->id_user = auth()->id(); // Asumsikan user sudah login
        $image->image_upload = $path;
        $image->image_result = null; // Hasil enhance bisa ditambahkan nanti
        $image->save();

        return redirect()->route('dashboard')->with('success', 'Gambar berhasil diunggah!');
    }
}

