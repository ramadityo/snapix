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

    public function store(Request $request){
        // // Validasi input
        $request->validate([
            'image_upload' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'image_result' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // // Ambil data gambar dari form
        $imageUpload = file_get_contents($request->file('image_upload')->getRealPath());
        $imageResult = file_get_contents($request->file('image_result')->getRealPath());

        // // Simpan ke database
        Image::create([
            'id_user' => Auth::id(), // Menggunakan user yang sedang login
            'image_upload' => $imageUpload,
            'image_result' => $imageResult,
            'created_date' => now(),
        ]);
    }

}
