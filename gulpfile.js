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
var jekyllSitePath      = "_site";
var tmpPath             = ".tmp";
var vendorPath          = "vendor";
var sassResourcesPath   = "_sass";
var cssPath             = "css";
var bowerComponentsPath = '.bower_components';

/********************************************/

var argv = require('yargs').argv;
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var nn = require('node-notifier');
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
  runSequence(['bower:copy:bootstrap', 'bower:copy:bourbon'], done);
});

gulp.task('bower:copy:bootstrap', function(done) {
  return gulp
    .src(path.join(bowerComponentsPath, "/bootstrap-sass-official/assets/stylesheets/**/*"))
    .pipe(gulp.dest(path.join(sassResourcesPath, "/bootstrap")));
});

gulp.task('bower:copy:bourbon', function(done) {
  return gulp
    .src(path.join(bowerComponentsPath, "/bourbon/app/assets/stylesheets/**/*"))
    .pipe(gulp.dest(path.join(sassResourcesPath, "/bourbon")));
});


// ****************************************************
// Compila site de plantillas de Jekyll
// ****************************************************
gulp.task('jekyll', function(done) {
  var stdout = "",
  hasErrors = false,
  jekyll = spawn('jekyll', 
                 ['build'],
                 { stdio: [process.stdin, process.stdout, 'pipe']});

  jekyll.stderr.on('data', function(data) {
    hasErrors = true
    process.stdout.write(data);
  });

  jekyll.on('close', function(code) {
    if (hasErrors) {
      reportAnError("Error compilando Jekyll, revisa la consola");
    } else {
      showMessage('Compilación de JEKYLL terminada');
      if (isLivereloadLaunched()) $.livereload.changed("*.html");
    }
    return done();
  });
});

// ****************************************************
// Compila la documentación de la hoja de estilos
// ****************************************************
gulp.task('hologram', function(done) {
    var hologram = spawn('hologram', [], { stdio: 'inherit' });

    hologram.on('close', function(code) {
        if (code > 0) return done('Exited with error code ' + code);
        else {
          //if (isLivereloadLaunched()) $.livereload.changed("*.html");
        }
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
    '_doc_assets/**/*', 
    path.join(cssPath, '**/*'), 
    path.join(sassResourcesPath, '**/*')], ['hologram']);

  gulp.watch([
    "**/*", 
    "!.*/**", 
    "!_site/**", 
    "!_doc_assets/**", 
    "!node_modules/**"], ['jekyll']);
});


// ****************************************************
// Borrar carpetas temporales
// ****************************************************
gulp.task('clean', function(done) {
  del([
    tmpPath + "/**"
  ], done);
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
  runSequence('clean', 'bower', ['jekyll', 'hologram'], done);
});

// Tarea para trabajar en el prototipo
gulp.task('default', function (done) {
  runSequence('build', 'watch', 'http', done);
});