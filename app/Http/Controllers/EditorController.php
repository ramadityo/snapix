<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

    public function saveImage(Request $request)
    {
        $validated = $request->validate([
            'image_upload' => 'required|string',
            'image_result' => 'required|file|mimes:png,jpg,jpeg',
        ]);

        $userId = Auth::id();

        try {
            $filename = pathinfo($validated['image_upload'], PATHINFO_FILENAME);
            $editedFileName = $filename . '_edited.png';
            $editedPath = 'uploads/' . $editedFileName;

            // Simpan file ke storage/app/public/uploads
            $path = $request->file('image_result')->storeAs('uploads', $editedFileName, 'public');

            // Update database
            $image = DB::table('images')
                ->where('image_upload', 'uploads/' . $validated['image_upload'])
                ->where('id_user', $userId)
                ->first();

            if ($image) {
                DB::table('images')
                    ->where('id_log', $image->id_log)
                    ->update([
                        'image_result' => $editedPath,
                        'created_date' => now(),
                    ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Image saved successfully',
                    'path' => Storage::url($editedPath)
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Image not found for the provided image path.'
                ], 404);
            }

        } catch (\Exception $e) {
            \Log::error('Error in saveImage:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error saving image: ' . $e->getMessage()
            ], 500);
        }
    }


    // public function saveImage(Request $request){
    //     $validated = $request->validate([
    //         'image_upload' => 'required|string',
    //         'image_result' => 'required|string',
    //     ]);
        
    //     $userId = Auth::id();
    
    //     \Log::info('User ID:', [$userId]);
    
    //     try {
    //         $filename = pathinfo($validated['image_upload'], PATHINFO_FILENAME);
    //         $editedPath = 'uploads/' . $filename . '_edited.png';
    //         $decodedImage = base64_decode($validated['image_result']);
            
    //         Storage::disk('public')->put($editedPath, $decodedImage);
    
    //         $image = DB::table('images')
    //             ->where('image_upload', 'uploads/' . $validated['image_upload']) 
    //             ->where('id_user', $userId)
    //             ->first();

    //         if ($image) {
    //             $updatedRows = DB::table('images')
    //                 ->where('id_log', $image->id_log)
    //                 ->update([
    //                     'image_result' => $editedPath,
    //                     'created_date' => now(), 
    //                 ]);
    
    //             return response()->json([
    //                 'success' => true,
    //                 'message' => 'Image saved successfully',
    //                 'path' => Storage::url($editedPath)
    //             ]);
    //         } else {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Image not found for the provided image path.'
    //             ], 404);
    //         }
    
    //     } catch (\Exception $e) {
    //         \Log::error('Error in saveImage:', [
    //             'message' => $e->getMessage(),
    //             'trace' => $e->getTraceAsString()
    //         ]);
    
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Error saving image: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }

    
}