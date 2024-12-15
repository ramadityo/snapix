<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index()
    {
        $images = Image::all('id_user', 'image_result', 'created_date');

        return Inertia::render('Explore', [
            'images' => $images,
        ]);

    }
}
