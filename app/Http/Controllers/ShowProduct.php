<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ShowProduct extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param $id_product
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Http\Response|\Illuminate\View\View
     */
    public function __invoke($id_product)
    {
        return view('product/show', ['product' => Product::findOrFail($id_product)]);
    }
}
