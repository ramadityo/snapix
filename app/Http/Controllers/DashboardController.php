<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DashboardController extends Controller{
    public function index()
    {
        $users = User::all(['name']);

        return Inertia::render('Dashboard', [
            'users' => $users,
        ]);
    }

    public function sendImage(Request $request) {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $extension = $request->file('image')->getClientOriginalExtension();
        $filename = preg_replace('/\.[^.]+$/', '', $request->file('image')->hashName());

        $pathCombine = $filename . '.' . $extension;
        $path = $request->file('image')->storeAs('uploads', $pathCombine, 'public');
        // $path = $request->file('image')->store('uploads', 'public');
        

        Image::create([
            'id_user' => Auth::id(),
            'image_upload' => $path,
            'image_result' => null,
            'created_date' => now(),
        ]);

        return Inertia::render('Editor', [
            'imageUrl' => asset('storage/' . $pathCombine),
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
}