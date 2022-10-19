<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeSendMessage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('send_message_table', function (Blueprint $table) {
            $table->dropColumn('id_device');
            $table->dropColumn('jid');
            $table->dropColumn('status');
            $table->string('type')->nullable();
            $table->string('phone')->nullable();         
        });

        Schema::rename("send_message_table", "recipient_table");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename("recipient_table", "send_message_table");
        Schema::table('send_message_table', function (Blueprint $table) {
            $table->string('id_device')->nullable();
            $table->string('jid')->nullable();
            $table->string('status')->nullable();
            $table->dropColumn('type');
            $table->dropColumn('phone');         
        });
    }
}
