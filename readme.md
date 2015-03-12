# How to compile the code

## Requeriments

* nodejs >= 0.10
* ruby 2.1.5 (recommended install using rvm)
* bower (installed using npm install -g bower)
* gulp (installed using npm install -g gulp;)

## Steps

* Install ruby dependencies: **bundle install**
* Install node dependencies: **npm install**
* Install bower dependencies: **gulp bower**

### Commands

* To debug the prototype or view the prototype on the browser: **gulp**
* To compile to "dist" folder: **gulp dist**
* To deploy to development: **gulp deploy:dev**
* To deploy to production: **gulp deploy:prod**
