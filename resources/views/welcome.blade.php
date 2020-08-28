<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel Challenge</title>

        <script src="https://kit.fontawesome.com/71b2e7e28c.js" crossorigin="anonymous"></script>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    </head>
    <body>

        <div class="container">
            <div class="content py-4">
                <div class="header">
                    <h1 class="text-secondary">Products list</h1>
                    <button class="btn btn-primary my-3">
                        <span class="mr-3">
                            <i class="fas fa-plus"></i>
                        </span> Add a product
                    </button>
                </div>
                <div id="products-table"></div>
            </div>
        </div>
    </body>
    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</html>
