<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateContactWASTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contactWA_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_device');
            $table->string('jid');
            $table->string('name');
            $table->string('notify_name')->nullable();
            $table->string('short_name')->nullable();
            $table->string('profile_url')->nullable();
            $table->timestamps();
        
        //foreign key
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
        Schema::dropIfExists('contactWA_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
