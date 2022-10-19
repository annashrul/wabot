<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVarStoragesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('varstorage_table', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_contact')->nullable(); // contact new/web
            $table->unsignedBigInteger('id_message')->nullable();
            $table->string('var0')->nullable();
            $table->string('var1')->nullable();
            $table->string('var2')->nullable();
            $table->string('var3')->nullable();
            $table->string('var4')->nullable();
            $table->string('var5')->nullable();
            $table->string('var6')->nullable();
            $table->string('var7')->nullable();
            $table->string('var8')->nullable();
            $table->string('var9')->nullable();
            $table->timestamps();

            
            //foreign key
            $table->foreign('id_contact')->references('id')->on('contact_table')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('id_message')->references('id')->on('message_table')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('varstorage_table');
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
    }
}
