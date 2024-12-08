<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EditorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ImageController;


Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/explore', function () {
    return Inertia::render('Explore');
})->name('explore');


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');


Route::get('/editor', [EditorController::class, 'index'])
    ->middleware('auth')
    ->name('editor');

Route::get('/dashboard/images', function () {
    return view('images'); 
})->middleware('auth');

Route::post('/dashboard/images', [ImageController::class, 'store'])->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/editor', [EditorController::class, 'saveImage'])->middleware('auth');

Route::get('/upload', function () {
    return view('upload');
});

// Route::post('/upload', [FileController::class, 'store'])->name('upload');
// Route::get('/download/{id}', [FileController::class, 'show'])->name('download');

require __DIR__.'/auth.php';

