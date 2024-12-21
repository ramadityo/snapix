<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id('id_log');          // Kolom ID log
            $table->unsignedBigInteger('id_user'); // ID user yang mengunggah
            $table->foreign('id_user')->references('id')->on('users'); // Connect to users table
            $table->string('image_upload');        // Gambar yang diunggah
            $table->string('image_result')->nullable(); // Hasil gambar (opsional)
            $table->timestamp('created_date')->useCurrent(); // Waktu pembuatan
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};