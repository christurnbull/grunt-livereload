module.exports = function (grunt) {
// Load grunt tasks automatically
require('load-grunt-tasks')(grunt);

// Define the configuration for all the tasks
grunt.initConfig({
    // Project settings
    config: {
        // Configurable paths
        app: 'app'
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
        livereload: {
            options: {
			  livereload: {
				key: '<%= connect.options.key %>',
				cert: '<%= connect.options.cert %>'
			  }
            },
            files: [
              __dirname+'/*.html',
              __dirname+'/css/*.css',
              __dirname+'/js/*.js',
            ]
        }
    },
    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            hostname: '192.168.0.1',
			protocol: 'https',
			key: grunt.file.read('cert/localDevSite.key').toString(),
			cert: grunt.file.read('cert/localDevSite.crt').toString(),
        },
        livereload: {
            options: {
                open: true,
                base: ['src']
            }
        },
    },
});
grunt.registerTask('serve', function (target) {
    grunt.task.run([
        'connect:livereload',
        'watch'
        ]);
    });
};
