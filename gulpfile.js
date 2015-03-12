'use strict';
var path = require('path');

/*
  Para disfrutar de la recarga automática del navegador, 
  instalar el plugin de livereload
  http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-
*/

/********************************************
  VARIABLES A CONFIGURAR
********************************************/

// directorios principales
var distPath            = "_site";
var sourcesPath         = "src";
var webPath             = "src/web";

// ubicación donde se copian las librerías de terceros
var vendorPath          = "_vendor";

var sassResourcesPath   = "_sass";

// directorios temporales
var bowerComponentsPath = '.bower_components';

/********************************************/

var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var nn = require('node-notifier');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;
var del = require('del');
var mainBowerFiles = require('main-bower-files');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload')


// ****************************************************
// Actualiza los componentes de bower
// ****************************************************
gulp.task('bower', function(done) {
  runSequence('bower:update', 'bower:clean', ['bower:sync'], ['bower:copy'], done);
});

// Copia los ficheros de bower necesarios a la carpeta vendor (revisar bower.json)
gulp.task('bower:sync', function() {
  return gulp
    .src(mainBowerFiles(), {
      base: bowerComponentsPath
    })
    .pipe(gulp.dest(vendorPath));
});

// Borra la carpeta vendor
gulp.task('bower:clean', function(done) {
  del([
    vendorPath + "/**"
  ], done);
});

// Actualiza bower (ejecuta 'bower install')
gulp.task('bower:update', function() {
  return $.bower();
});

gulp.task('bower:copy', function(done) {
  return gulp
    .src(path.join(bowerComponentsPath, "/bootstrap-sass-official/assets/stylesheets/**/*"),
         { base: "bootstrap-sass-official/assets/stylesheets"})
    .pipe(gulp.dest(path.join(sassResourcesPath, "/bootstrap")))
});


// ****************************************************
// Compila la documentación de la hoja de estilos
// ****************************************************
gulp.task('hologram', function(done) {
    var hologram = spawn('hologram', [], { stdio: 'inherit' });

    hologram.on('close', function(code) {
        if (code > 0) return done('Exited with error code ' + code);
        return done();
    });
});


// Sirve los ficheros del prototipo en un servidor web
gulp.task('http', function() {
  $.connect.server({
    root: [jekyllSitePath, tmpPath]
  });
});


// ****************************************************
// Espía cambios en ficheros para lanzar tareas automáticamente
// ****************************************************
gulp.task('watch', function() {
  $.livereload.listen();

  gulp.watch([
    path.join(sourcesPath, 'doc_assets/**/*'), 
    path.join(sourcesPath, 'index.md'),
    path.join(sassBasePath, '**/*')
  ], ['hologram']);

  gulp.watch([path.join(sassBasePath, "/**/*")], ['sass']);
});


// ****************************************************
// Borrar carpetas temporales
// ****************************************************
gulp.task('clean', function(done) {
  del([
    tmpPath + "/**",
    distPath + "/**"
  ], done);
});


// ****************************************************
// Copia los ficheros necesarios de la versión distribuible
// ****************************************************
gulp.task('dist:copy', function(done) {
  return gulp.src([tmpPath + "/**/*", webPath + "/**/*"])
             .pipe(gulp.dest(distPath));
});


// ****************************************************
// Despliega el prototipo
// ****************************************************

gulp.task('deploy:sync:dev', function (done) {
  spawn('divshot', ['deploy', 'development'], { stdio: 'inherit' })
    .on('close', function(code) {
      return done();
    });
});

gulp.task('deploy:sync:prod', function (done) {
  spawn('divshot', ['deploy', 'production'], { stdio: 'inherit' })
    .on('close', function(code) {
      return done();
    });
});


// ****************************************************
// Helpers functions
// ****************************************************
function isLivereloadLaunched() {
  return $.livereload.servers[$.livereload.options.port] !== undefined;
}

function errorHandler(error, error_type) {
  reportAnError(error.message);
  this.emit('end');
}

function reportAnError(message) {
  var notifier = new nn();
  notifier.notify({
    title: "¡¡ERROR!!",
    message: message,
    icon: path.join(__dirname, 'error.png')
  });
  console.error("\n" + message + "\n");
}

function showMessage(message) {
  var notifier = new nn();
  notifier.notify({
    message: message
  });
}

if (argv.debug) {
  console.log("*** DEBUG MODE *********************************");
}

// ****************************************************
// Tareas principales
// ****************************************************

// Compila todo el código
gulp.task('build', function(done) {
  runSequence(['clean', 'bower'], 
              ['styles', 'hologram'], 
              done);
});

// Tarea para trabajar en el prototipo
gulp.task('default', function (done) {
  runSequence('build', 'watch', 'http', done);
});

// Compila la versión de distribución
gulp.task('dist', function(done) {
  runSequence('build', 'dist:copy', done);
});

// Despliega la versión de distribución
gulp.task('deploy:dev', function(done) {
  runSequence('dist', 'deploy:sync:dev', done);
});

// Despliega la versión de distribución
gulp.task('deploy:prod', function(done) {
  runSequence('dist', 'deploy:sync:prod', done);
});