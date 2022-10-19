<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateNodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('node_table', function (Blueprint $table) {
            $table->id();
            $table->string('response');
        });

        DB::table('node_table')->insert(
        array(
            'response' => 'Start',
        )
    );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::dropIfExists('node_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
