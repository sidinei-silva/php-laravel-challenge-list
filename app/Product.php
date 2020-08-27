<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $table = 'products';

    protected $fillable = [
        "image",
        "ref",
        "name",
        "category",
        "price_ht",
        "price_ttc",
        "quantity",
        "is_active",
        "resume",
        "description",
    ];

    protected $primaryKey = 'id';

    protected $guarded = ['created_at', 'updated_at'];
}
