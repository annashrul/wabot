<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateEFormQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eform_question_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_eform');
            $table->string('question');
            $table->unsignedBigInteger('question_number');
            
            //foreign key
            $table->foreign('id_eform')->references('id')->on('eform_table')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('eform_question_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}