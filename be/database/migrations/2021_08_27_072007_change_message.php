<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeMessage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('recipient_table', function (Blueprint $table) {
            $table->dropColumn('message');         
        });

        Schema::table('message_table', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('type');
            $table->dropColumn('total');  
            $table->string('message', 16384)->change(); 
            $table->unsignedBigInteger('recipient')->nullable();
            $table->string('time')->nullable();    
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('recipient_table', function (Blueprint $table) {
            $table->string('message');         
        });

        Schema::table('message_table', function (Blueprint $table) {
            $table->string('status');
            $table->string('type');
            $table->string('total');  
            $table->dropColumn('recipient'); 
            $table->dropColumn('time');      
        });
    }
}
