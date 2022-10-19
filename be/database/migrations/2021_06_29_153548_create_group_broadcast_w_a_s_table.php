<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateGroupBroadcastWASTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('groupBroadcastWA_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_device');
            $table->string('jid');
            $table->string('name')->nullable();
            $table->string('unread')->nullable();
            $table->string('last_message_time')->nullable();
            $table->string('is_muted')->nullable();
            $table->string('last_message_id')->nullable();
            $table->string('is_marked_spam')->nullable();
            $table->string('user_id')->nullable();
            $table->boolean('is_group')->nullable();
            $table->boolean('is_broadcast')->nullable();
            $table->string('deleted_at')->nullable();
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
        Schema::dropIfExists('groupBroadcastWA_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
