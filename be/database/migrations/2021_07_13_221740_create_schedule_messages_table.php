<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateScheduleMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_message_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_device');
            $table->unsignedBigInteger('id_message');
            $table->dateTime('send_time');
            $table->dateTime('limit_time')->nullable();
            $table->string('recurrent');
            $table->string('specific_date')->nullable();
            $table->string('message');
            $table->unsignedBigInteger('sent_count')->nullable();
            $table->unsignedBigInteger('max_count')->nullable();
            $table->string('type');
            $table->string('jid');
            $table->string('status');

            //foreign key
            $table->foreign('id_message')->references('id')->on('message_table')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('schedule_message_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
