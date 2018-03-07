var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

//defining gulp watch tasks
gulp.task('watch', function(){
	//initialize browsersync server
	browserSync.init({
		//makes browsersync notifications dissappear
		notify: false,
		server:{
			baseDir:"app"
		}
	});

	//reload browser on changes
	watch('./app/index.html', function(){
		browserSync.reload();
	});
	
	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});

	watch('./app/assets/scripts/**/*.js', function(){
		gulp.start('scriptsRefresh');
	});
});

//new task for browsersync inject css - with styles task dependency
gulp.task('cssInject',['styles'], function(){
	gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});

//new task for browsersync to refresh after webpack repacks JS
gulp.task('scriptsRefresh', ['scripts'], function(){
	browserSync.reload();
})