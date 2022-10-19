<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateConversationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('conversation_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_device');
            $table->unsignedBigInteger('id_path');
            $table->string('sender_jid');
            $table->timestamps();
            //foreign key
            $table->foreign('id_device')->references('id')->on('device_table')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_path')->references('id')->on('path_table')->onDelete('cascade')->onUpdate('cascade');
            
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
        Schema::dropIfExists('conversation_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
