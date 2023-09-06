var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json",{declaration:true});
var sourcemaps = require('gulp-sourcemaps');

var paths = {   
    src: 'src',
    dist: 'dist'
};

function copyResources() {   
    return gulp.src('src/windowsZones.json', { base: 'src' })
        .pipe(gulp.dest('dist'));
}


gulp.task("default", gulp.series(
    copyResources,
    () => {
        return tsProject
            .src()
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.dist));
    })
);