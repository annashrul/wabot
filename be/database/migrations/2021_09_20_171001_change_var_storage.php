<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeVarStorage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('varstorage_table', function (Blueprint $table) { 
            $table->dropForeign(['id_contact']); 
             $table->dropColumn('id_contact');
             //$table->string('phone')->nullable(); 
             
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
        Schema::table('varstorage_table', function (Blueprint $table) {
             $table->dropColumn('phone');
             $table->unsignedBigInteger('id_contact');

             //foreign key
            $table->foreign('id_contact')->references('id')->on('contact_table')->onDelete('cascade')->onUpdate('cascade');
             
        });
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
