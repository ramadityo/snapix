<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('log_images', function (Blueprint $table) {
            $table->id('id_log');          // Kolom ID log
            $table->unsignedBigInteger('id_user'); // ID user yang mengunggah
            $table->foreign('id_user')->references('id')->on('users'); // Connect to users table
            $table->binary('image_upload');        // Gambar yang diunggah
            $table->binary('image_result')->nullable(); // Hasil gambar (opsional)
            $table->timestamp('created_date')->useCurrent(); // Waktu pembuatan
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_images');
    }
};