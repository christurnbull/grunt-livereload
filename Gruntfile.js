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
              'src/*.html',
              'src/css/*.css',
              'src/js/*.js',
            ]
        }
    },
    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            hostname: '192.168.1.217',
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
    concat: {
      options:{
        separator: ';'
      },
      js:{
        dest: 'src/js/vendor.js',
        src: [
          'node_modules/ismobilejs/isMobile.min.js',
          'node_modules/qrious/dist/qrious.min.js',
        ]
      }
    }
});
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.registerTask('serve', function (target) {
    grunt.task.run([
        'concat:js',
        'connect:livereload',
        'watch'
        ]);
    });
};
