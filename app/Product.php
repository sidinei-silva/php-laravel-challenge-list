<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $table = 'products';

    /*
     * image json format:
     *
     * "image":{
     *    "uid": string,
     *    "link": string,
     *    "is_default": boolean,
     *
     * }
     */

    /*
     * category json format:
     *
     * category: {
     *  uid: string
     *  name: string
     *  children_of: category|null
     * }
     *
     */

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
