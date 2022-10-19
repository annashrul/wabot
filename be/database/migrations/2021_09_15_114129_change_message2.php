<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeMessage2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('message_table', function (Blueprint $table) {
            $table->unsignedBigInteger('id_media')->nullable();
            $table->boolean('varStorage');
            
            //foreign key
            $table->foreign('id_media')->references('id')->on('media_table')->onDelete('cascade')->onUpdate('cascade'); 
             
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
        Schema::table('message_table', function (Blueprint $table) {
             $table->dropColumn('varStorage');   
             $table->dropForeign(['id_media']); 
             $table->dropColumn('id_media'); 
             
        });
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
