<?php

namespace App\Http\Controllers;

use App\Models\User; // Import the User model
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch users from the database
        $users = User::all(['id', 'name', 'email']); // Adjust columns as needed

        // Pass data to the Inertia view
        return Inertia::render('Dashboard', [
            'users' => $users,
        ]);
    }
}