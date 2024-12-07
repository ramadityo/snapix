<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EditorController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Editor', [
            'auth' => [
                'user' => $request->user(),
            ],
        ]);
    }
    
    public function saveImage(Request $request)
    {
        $imageUploadBase64 = $request->input('image_upload'); // Base64 image from the upload
        $imageResultBase64 = $request->input('image_result'); // Base64 image from the edit result
    
        // Decode the images
        $imageUploadData = base64_decode($imageUploadBase64);
        $imageResultData = base64_decode($imageResultBase64);
    
        // Store the images as BLOBs in the database
        Image::create([
            'id_user' => Auth::id(), // Use the currently logged-in user
            'image_upload' => $imageUploadData,
            'image_result' => $imageResultData,
            'created_date' => now(),
        ]);
    
        return response()->json(['success' => true]);
    }
}