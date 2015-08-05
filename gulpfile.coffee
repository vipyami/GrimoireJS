gulp = require 'gulp'
tsc = require 'gulp-typescript'
merge = require 'merge2'
coffee = require 'gulp-coffee'
webpack = require 'gulp-webpack'
wpcore = require 'webpack'
connect = require 'gulp-connect'
path = require 'path'
util = require 'util'
rimraf = require 'rimraf'
typedoc = require 'gulp-typedoc'
mocha = require 'gulp-mocha'
args = require 'yargs'
  .argv


branch = args.branch||'unknown';
### compilation configuration for typescript ###
tscConfig = tsc.createProject
  target: "ES6"
  module: "commonjs"
  declarationFiles: true
  sourceRoot: "jThree/src"
  noExternalResolve: false
  noEmitOnError: true
  noLib: false

srcFolder = 'jThree/src/'
destJs = 'jThree/bin/js/'

webpack_src_root = srcFolder;
webpack_files = ['**/*.json', '**/*.ts']
webpack_exculde =['jThree.js']
bower_files=['jquery/dist/jquery.js', 'jQuery/dist/jquery.js'];
tsSource = ['jThree/src/**/*.ts']
watch_build_file=['**/*.ts', '**/*.glsl']
watch_reload_file=['jThree/wwwroot/**/*.js', 'jThree/wwwroot/**/*.html', 'jThree/wwwroot/**/*.goml']
bower_prefix = 'bower_components/'

moveFromSrc = (s, d)->
  gulp.src srcFolder+s
  .pipe gulp.dest destJs+d

combinePrefix = (prefix, array)->
  prefix+item for item in array


###
Build order

compile    : The step for compiling typescript source code.
move       : The step for move files used by webpack
webpack    : The step to pack jthree modules.
###

gulp.task 'default', ['build']

gulp.task 'build', ['webpack'], ->

### pack all jthree modules into one j3.js file.###
gulp.task 'webpack', ->
  webpack_src=[]
  webpack_src.push webpack_src_root+file for file in webpack_files
  webpack_src.push '!'+webpack_src_root+file for file in webpack_exculde
  gulp
    .src webpack_src
    .pipe webpack
      watch: watching
      entry:
        jThree: path.join __dirname, 'jThree/src/jThree.ts'
      output:
        filename: 'j3.js'
      resolve:
        alias:
          'jquery': path.join __dirname, 'jquery.js'
          'superagent': path.join __dirname, 'superagent.js'
          'emitter': path.join __dirname, 'emitter.js'
          'reduce': path.join __dirname, 'reduce.js'
          'glm': path.join __dirname, 'gl-matrix-min.js'
          'binary': path.join __dirname, 'binaryReader.js'
        extensions: ['', '.ts']
        root: [
          webpack_src_root
          path.join __dirname, bower_prefix
        ]
        unsafeCache: true
      module:
        loaders: [
            test: /\.json$/
            loader: 'json'
          ,
            test: /\.glsl$/
            loader: 'shader'
          ,
            test: /\.ts$/
            loader: 'ts-loader'
            configFileName: 'jThree/tsconfig.json'
        ]
      glsl:
        chunkPath: "./Chunk"
      cache: true
      plugins: [
        new wpcore.ResolverPlugin(new wpcore.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]))
      ]
    .pipe gulp.dest('jThree/bin/product')
    .pipe gulp.dest('jThree/wwwroot')


gulp.task 'compile', ->
  console.log 'typescript compile task'
  tsResult = gulp.src tsSource
    .pipe tsc tscConfig
  merge [tsResult.dts.pipe gulp.dest 'jThree/bin/def'
  tsResult.js.pipe gulp.dest 'jThree/bin/js']

gulp.task 'move-bower', ->
  ###bower files###
  inputs=combinePrefix bower_prefix, bower_files
  gulp.src inputs
    .pipe gulp.dest destJs
    .pipe gulp.dest 'jThree/wwwroot'

gulp.task 'move-static', ->
  moveFromSrc 'static/**/*.*', 'static/'

gulp.task 'move-shader', ->
  moveFromSrc 'Core/Shaders/**/*.*', 'Core/Shaders/'

gulp.task 'move', ->
  gulp.start [
    'move-bower', 'move-static', 'move-shader'
  ]

###
watch task
###
watching = false
gulp.task 'enable-watch-mode', -> watching = true

gulp.task 'watch', ['server', 'watch-reload', 'enable-watch-mode', 'webpack']

gulp.task 'watch-reload', ->
  gulp.watch watch_reload_file, ['reload']

###
reload task
###
gulp.task 'reload', ->
  gulp
    .src "jThree/wwwroot/**/*.*"
    .pipe connect.reload()

###
server task
###
gulp.task 'server', ->
  connect.server
    root: './jThree/wwwroot'
    livereload: true

###
travis task
###
gulp.task 'travis', ['webpack'], ->


###
document generation task
###
gulp.task 'doc', (cb) ->
  gulp
    .src ['jThree/src/**/*.ts']
    .pipe typedoc
      module: 'commonjs'
      target: 'es5'
      out: "ci/docs/#{branch}"
      name: 'jThree'
      json: "ci/docs/#{branch}.json"

###
the task for editing gulpfile.coffee
###
gulp.task 'gulp-edit', ->
  gulp.watch 'gulpfile.coffee', ['gulp-compile']

gulp.task 'gulp-compile', ->
  gulp
    .src 'gulpfile.coffee'
    .pipe coffee bare: true
    .pipe gulp.dest './'

###
test task
###
gulp.task 'test', ->
  gulp
    .src './jThree/test/**/*test.coffee'
    .pipe mocha()
