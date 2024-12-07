<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EditorController extends Controller
{
    // Buat get data dari URL parameter (ngambil blob)
    public function index(Request $request){
        return Inertia::render('Editor', [
            'auth' => [
                'user' => $request->user(),
            ],
            'image_file' => $request->input('image_file'),
        ]);
    }

}
