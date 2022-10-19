<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePathsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('path_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_rule');
            $table->unsignedBigInteger('id_currentNode');
            $table->unsignedBigInteger('id_nextNode');
            $table->string('type');
            $table->string('key')->nullable();
            //foreign key
            $table->foreign('id_rule')->references('id')->on('rule_table')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_currentNode')->references('id')->on('node_table')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_nextNode')->references('id')->on('node_table')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('path_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

    }
}
