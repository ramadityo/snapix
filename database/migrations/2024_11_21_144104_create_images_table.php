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
            $table->id('id_log');  
            $table->unsignedBigInteger('id_user'); 
            $table->foreign('id_user')->references('id')->on('users');
            $table->string('image_upload');    
            $table->string('image_result')->nullable(); 
            $table->timestamp('created_date')->useCurrent();
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