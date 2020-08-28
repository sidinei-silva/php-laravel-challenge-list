## PHP Laravel Challenge List 

Product listing application with laravel and react in a single application.

![](app.gif)

### Url staging
[https://php-laravel-challenge-list.herokuapp.com/](https://php-laravel-challenge-list.herokuapp.com/)


## Getting started

### Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.4/installation#installation)


Clone the repository

    git clone git@github.com:sidinei-silva/php-laravel-challenge-list.git

Switch to the repo folder

    cd php-laravel-challenge-list

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate


Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve
    
Install dependencies for reactJS

    npm install
    
Start the local development server

    npm run watch
    
You can now access the server at http://localhost:8000

**TL;DR command list**

    git clone git@github.com:gothinkster/laravel-realworld-example-app.git
    cd laravel-realworld-example-app
    composer install
    cp .env.example .env
    php artisan key:generate
    php artisan jwt:generate 
    
**Make sure you set the correct database connection information before running the migrations** [Environment variables](#environment-variables)

    php artisan migrate
    php artisan serve
    npm install
    npm run watch

## Database seeding

**Populate the database with seed data to products. This can help you to quickly start testing the api or couple a
 frontend and start using it with ready content.**

Open the ProductSeeder and set the property values as per your requirement

    database/seeds/ProductSeeder.php

Run the database seeder and you're done

    php artisan db:seed

***Note*** : It's recommended to have a clean database before seeding. You can refresh your migrations at any point to clean the database by running the following command

    php artisan migrate:refresh
