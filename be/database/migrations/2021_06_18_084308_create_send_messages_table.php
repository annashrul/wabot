<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateSendMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('send_message_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_device');
            $table->unsignedBigInteger('id_message');
            $table->string('message');
            $table->string('jid');
            $table->string('name')->nullable();
            $table->string('status');

            //foreign key
            $table->foreign('id_message')->references('id')->on('message_table')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('send_message_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
