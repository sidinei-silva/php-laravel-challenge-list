<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Product;
use http\Env\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ProductCollection
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        $products = Product::where('name', 'like', "%$search%")
                            ->orWhere('ref', 'like', "%$search%")
                            ->orderBy('created_at', 'desc')
                            ->paginate($request->query('limit') ?: 10);

        return new ProductCollection($products);
    }


    /**
     * Display the specified resource.
     *
     * @param  $id_product
     * @return ProductCollection
     */
    public function show($id_product)
    {
        return Product::findOrFail($id_product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  $id_product
     * @return ProductCollection|\Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id_product)
    {
        $request->validate([
            'name' => 'max:255',
            'quantity' => 'integer',
            'price_ht' => "regex:/^\d*(\.\d{1,2})?$/",
            'price_ttc' => "regex:/^\d*(\.\d{1,2})?$/",
            'is_active' => 'boolean',
        ]);

        $updateResult = Product::where('id', $id_product)->update($request->only([
            'name',
            'ref',
            'category',
            'quantity',
            'description',
            'price_ht',
            'price_ttc',
            'is_active',
        ]));

        if($updateResult == 0){
            return response()->json(["message" => "update error"], 500);
        }

        return Product::findOrFail($id_product);
    }

}
