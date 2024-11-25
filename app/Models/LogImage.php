<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogImage extends Model
{
    use HasFactory;

    protected $table = 'images'; // Nama tabel
    protected $primaryKey = 'id_log'; // Primary key

    protected $fillable = [
        'image_upload',
        'image_result',
        'created_date',
    ];

    public $timestamps = false; // Tidak menggunakan kolom `created_at` dan `updated_at`
}

