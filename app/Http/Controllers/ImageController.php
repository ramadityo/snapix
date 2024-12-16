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
        $request->validate([
            'image_upload' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $imageUpload = file_get_contents($request->file('image_upload')->getRealPath());
        $imageResult = $imageUpload;  

        Image::create([
            'id_user' => Auth::id(), 
            'image_upload' => $imageUpload, 
            'image_result' => $imageResult,
            'created_date' => now(),
        ]);

        // return response()->json(['message' => 'Gambar berhasil disimpan']);
    }

    public function showEditor($id_log)
    {
        $image = Image::where('id_log', $id_log)->first();

        if (!$image) {
            abort(404, 'Image not found');
        }
    
        $imagePath = $image->image_upload; // Assuming this is the path to the image file
    
        // Construct the full URL to the image
        $imageUrl = asset('storage/' . $imagePath);
    
        return Inertia::render('Editor', [
            'imageUrl' => $imageUrl,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    


}