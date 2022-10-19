<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCategorycontactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categorycontact_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_contact');
            $table->unsignedBigInteger('id_category');
            
            //foreign key
            $table->foreign('id_contact')->references('id')->on('contact_table')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_category')->references('id')->on('category_table')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('categorycontact_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
