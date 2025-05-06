<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index()
    {
        $images = Image::select('images.id_user', 'images.image_result', 'images.created_date', 'users.name')
            ->join('users', 'images.id_user', '=', 'users.id')
            ->get();

        return Inertia::render('Explore', [
            'images' => $images,
        ]);

    }
}
