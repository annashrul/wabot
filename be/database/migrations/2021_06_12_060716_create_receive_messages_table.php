<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateReceiveMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('receive_message_table', function (Blueprint $table) {
            $table->id();
            $table->string('message');
            $table->string('sender_jid');
            $table->unsignedBigInteger('id_device');

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
        Schema::dropIfExists('receive_message_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
