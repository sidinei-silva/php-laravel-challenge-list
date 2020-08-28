<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->json('image');
            $table->string('ref')->unique();
            $table->string('name');
            $table->json('category');
            $table->decimal('price_ht', 9,2);
            $table->decimal('price_ttc', 9 ,2);
            $table->integer('quantity');
            $table->boolean('is_active')->default(false);
            $table->text('description');
            $table->text('resume');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
