/<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('device_table', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number');
            $table->string('uid')->nullable();
            $table->string('name')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('id_callback');
            $table->unsignedBigInteger('id_user');
            //foreign key
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('device_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
