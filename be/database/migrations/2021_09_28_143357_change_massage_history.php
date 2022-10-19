<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeMassageHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('message_table', function (Blueprint $table) {
            $table->string('type')->nullable();   
        });

        Schema::table('varstorage_table', function (Blueprint $table) { 
             $table->string('name')->nullable(); 
             
        });
    
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('message_table', function (Blueprint $table) {
             $table->dropColumn('type');     
        });

        Schema::table('varstorage_table', function (Blueprint $table) { 
             $table->dropColumn('name'); 
             
        });
    }
}
