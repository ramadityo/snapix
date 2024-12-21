<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class EditorController extends Controller
{
    public function index(Request $request)
    {
        $imagePath = $request->query('imagePath');
        $imageUrl = Storage::url('uploads/' . $imagePath);
    
        return Inertia::render('Editor', [
            'imageUrl' => $imageUrl,
            'auth' => [
                'user' => $request->user(),
            ],
        ]);
    }

}