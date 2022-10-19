<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::table('schedule_message_table', function (Blueprint $table) {
            $table->dropColumn('jid');
            $table->dropColumn('type');
            $table->dropColumn('message');    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('schedule_message_table', function (Blueprint $table) {
            $table->string('jid');
            $table->string('type');    
            $table->dropColumn('message');
        });
    }
}
