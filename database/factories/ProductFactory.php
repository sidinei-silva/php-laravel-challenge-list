<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    $price_ht =  random_int(1000, 100000)/100;
    $ttc = $price_ht * random_int(5, 20)/100;
    $price_ttc = $price_ht + $ttc;

    $allCategories = [
        ["uid" => md5(uniqid("")), "name" => "e-shop", "children_of" => null],
        ["uid" => md5(uniqid("")), "name" => "clothes", "children_of" => "e-shop"],
        ["uid" => md5(uniqid("")), "name" => "t-shirt", "children_of" => "clothes"],
        ["uid" => md5(uniqid("")), "name" => "tops", "children_of" => "clothes"],
        ["uid" => md5(uniqid("")), "name" => "shoes", "children_of" => "clothes"],
        ["uid" => md5(uniqid("")), "name" => "accessory", "children_of" => "e-shop"],
        ["uid" => md5(uniqid("")), "name" => "bags", "children_of" => "accessory"],
    ];

    $getCategory = $allCategories[array_rand($allCategories)];

    $selectedCategories = [$getCategory];

    while($getCategory["children_of"] != null){
        foreach($allCategories as $category){
            if($category['name'] == $getCategory["children_of"]){
                array_push($selectedCategories, $category);
                $getCategory = $category;
            }
        }
    }

    $images = [
        ["uid" => md5(uniqid("")), "link" => "https://picsum.photos/200", "is_default" => true],
        ["uid" => md5(uniqid("")), "link" => "https://picsum.photos/200", "is_default" => false],
        ["uid" => md5(uniqid("")), "link" => "https://picsum.photos/200", "is_default" => false]
    ];


    return [
        "ref" => $faker->unique()->ean8,
        "name" => $faker->city,
        "category" => json_encode($selectedCategories),
        "image" => json_encode($images),
        "price_ht" => $price_ht,
        "price_ttc" => $price_ttc,
        "quantity" =>  random_int(1, 8),
        "is_active" => random_int(0, 1),
        "resume" => $faker->text(550),
        "description" => $faker->text(550),
    ];
});
