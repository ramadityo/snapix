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
            'imagePath' => $imagePath, // Pass imagePath to the front-end
            'auth' => [
                'user' => $request->user(),
            ],
        ]);
    }

    public function saveImage(Request $request)
    {   
        $validated = $request->validate([
            'image_upload' => 'required|string',
            'image_result' => 'required|string',
        ]);
        
        // Get the current authenticated user's ID
        $userId = Auth::id();
    
        // Log for debugging
        \Log::info('User ID:', [$userId]);
    
        try {
            // Extract the image filename without the extension
            $filename = pathinfo($validated['image_upload'], PATHINFO_FILENAME);
            $editedPath = 'uploads/' . $filename . '_edited.png';
            $decodedImage = base64_decode($validated['image_result']);
            
            // Save the edited image
            Storage::disk('public')->put($editedPath, $decodedImage);
    
            // Find the existing image record by the image_upload (which contains the original imagePath)
            $image = DB::table('images')
                ->where('image_upload', 'uploads/' . $validated['image_upload'])  // Add 'upload/' prefix here
                ->where('id_user', $userId)
                ->first();

            // If the image exists, update the image_result
            if ($image) {
                $updatedRows = DB::table('images')
                    ->where('id_log', $image->id_log)
                    ->update([
                        'image_result' => $editedPath,  // Update the image result
                        'created_date' => now(),  // Optionally update the created_date (or use updated_at if preferred)
                    ]);
    
                return response()->json([
                    'success' => true,
                    'message' => 'Image saved successfully',
                    'path' => Storage::url($editedPath)
                ]);
            } else {
                // If the image doesn't exist, return an error response
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

    
    public function deleteImage(Request $request)
    {
        $userId = Auth::id();

        // Temukan gambar dengan image_result null dan milik pengguna yang terautentikasi
        $deletedRows = DB::table('images')
            ->where('image_result', null)
            ->where('id_user', $userId)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => $deletedRows . ' baris berhasil dihapus.',
        ]);
    }
}