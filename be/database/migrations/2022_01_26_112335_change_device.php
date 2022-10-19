<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeDevice extends Migration
{
    public function up()
    {
        Schema::table('device_table', function (Blueprint $table) {
            $table->string('type');
        
        });
    }

    public function down()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        Schema::table('device_table', function (Blueprint $table) {
            $table->dropColumn('type');
        });
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
