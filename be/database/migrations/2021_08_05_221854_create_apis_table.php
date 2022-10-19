<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


class CreateApisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('api_table', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('method');
            $table->unsignedBigInteger('id_user');
            $table->unsignedBigInteger('id_device');
            $table->string('var0')->nullable();
            $table->string('var1')->nullable();
            $table->string('var2')->nullable();
            $table->string('var3')->nullable();
            $table->string('var4')->nullable();
            $table->string('var5')->nullable();
            $table->string('var6')->nullable();
            $table->string('var7')->nullable();
            $table->string('var8')->nullable();
            $table->string('var9')->nullable();

             //foreign key
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_device')->references('id')->on('device_table')->onDelete('cascade')->onUpdate('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('api_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
        
    }
}
