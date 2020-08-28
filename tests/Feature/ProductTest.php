<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Check app is running.
     *
     * @return void
     */
    public function testIsRunning()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * Get all products in API.
     *
     * @return void
     */
    public function testApiGetAllProducts()
    {
        factory(\App\Product::class, 50)->create();

        $response = $this->get('/api/products');

        $response->assertStatus(200)->assertJsonFragment(['total' => 50]);
    }

    /**
     * Get one product in API.
     *
     * @return void
     */
    public function testApiGetOneProduct()
    {
        $product = factory(\App\Product::class)->create();

        $response = $this->get("/api/products/$product->id");

        $response->assertStatus(200)->assertJsonFragment(['name' => $product->name]);
    }

    /**
     * Validation product not found API.
     *
     * @return void
     */
    public function testApiValidationProductNotFound()
    {
        $response = $this->get("/api/products/1");
        $response->assertStatus(404);
    }

    /**
     * Update one product in API.
     *
     * @return void
     */
    public function testApiUpdateProduct()
    {
        $product = factory(\App\Product::class)->create();

        $newName = "editing";

        $response = $this->patch("/api/products/$product->id", ["name" => $newName]);

        $response->assertStatus(200)->assertJsonFragment(['name' => $newName]);
    }

}
