<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ImageController extends Controller
{
    public function index(Request $request)
    {

        return Inertia::render('Editor', [
            'auth' => [
                'user' => $request->user(),
            ],
        ]);
    }
    

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'image_upload' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Ambil data gambar dari form
        $imageUpload = file_get_contents($request->file('image_upload')->getRealPath());
        $imageResult = $imageUpload;  // Bisa diubah sesuai kebutuhan

        // Simpan ke database
        Image::create([
            'id_user' => Auth::id(),  // Menggunakan user yang sedang login
            'image_upload' => $imageUpload,  // Foto asli
            'image_result' => $imageResult,  // Foto hasil edit (bisa disesuaikan)
            'created_date' => now(),
        ]);

        return response()->json(['message' => 'Gambar berhasil disimpan']);
    }

    


}