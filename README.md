# grunt-livereload
Simple, generic, connect driven livereload https server using grunt.

Contains SSL/TLS certificates for serving HTTPS over a local network IP.

Ideal for developing Progressive Web Apps and web apis that required HTTPS context.

Eg: network devices can livereload using https://192.168.0.1 (instead of being limited to http://localhost on a single host)

Works on Chrome 60+


## Getting Started

Ensure [Grunt](https://gruntjs.com/) is installed

```bash
git clone https://github.com/christurnbull/grunt-livereload.git
cd grunt-livereload && npm install
npm start
```

## Setting up HTTPS

A Certificate Authority .crt needs to be installed on each devices that you view the served site on.

You then need to create a multi-domain certificate for the livereload server to use, which has a Subject Alternative Name that includes the local network IP of the HTTPS server.


#### Create CA certificate & key (or skip this and use the files provided in cert folder):
```bash
cd cert/
openssl genrsa -des3 -out localDevCA.key 2048
openssl rsa -in localDevCA.key -out localDevCA.key
openssl req -x509 -new -nodes -key localDevCA.key -sha256 -days 1825 -out localDevCA.crt
```
(CN can be localDevCA or any other value)

#### Import localDevCA.crt onto all devices you need:
```bash
ubuntu: chrome settings -> manage certificates -> authorities
android: phone settings -> security -> credential storage -> install from...
```

#### Create Site certifcate & key using CA:

Add or edit the local network IP of the server to the config file cert/localDevSite.ext

```bash
cd cert/
openssl genrsa -out localDevSite.key 2048
openssl req -new -key localDevSite.key -out localDevSite.csr
openssl x509 -req -in localDevSite.csr -CA localDevCA.crt -CAkey localDevCA.key -CAcreateserial -out localDevSite.crt -days 1825 -sha256 -extfile localDevSite.ext
```

Change connect.options.hostname in Gruntfile.js to the local network IP.

Done.


## License

MIT license. Copyright [Chris Turnbull](https://github.com/christurnbull).
