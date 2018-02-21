# Crypto REST API

[![Build Status](https://travis-ci.org/jamiemjennings/crypto-rest-api.svg?branch=master)](https://travis-ci.org/jamiemjennings/crypto-rest-api) [![Greenkeeper badge](https://badges.greenkeeper.io/jamiemjennings/crypto-rest-api.svg)](https://greenkeeper.io/)

This project is a work-in-progress. The intention is to build a multi-tenanted REST API for encryption/decryption of data, while learning some new technologies.
## To Run the Service Locally (outside Docker)
```
node index.js
```
or you can use [nodemon](https://nodemon.io/) to test the service during development.

## To Build a Docker Image for the Service

```
docker build -t jamiemjennings/crypto-rest-api .
```

## To Run the Service in Docker

First build the service image using the instructions above, then:

```
docker run -p 8888:8080 -d jamiemjennings/crypto-rest-api
```
Change `8888` to your preferred port on which to access the service on localhost.

## Test Service API

You may submit test requests to the API using `cURL` as follows:

**Encrypt Endpoint**
```
✗ curl -X POST -H "content-type: application/json" -d '{}' -i localhost:8080/v1/encrypt
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Response-Time: 3ms
Content-Length: 55
Date: Wed, 21 Feb 2018 02:32:22 GMT
Connection: keep-alive

{"keyName":"testKeyName","cipherText":"encrypted_data"}
```

**Decrypt endpoint**
```
✗ curl -X POST -H "content-type: application/json" -d '{}' -i localhost:8080/v1/decrypt
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
X-Response-Time: 2ms
Content-Length: 54
Date: Wed, 21 Feb 2018 02:42:34 GMT
Connection: keep-alive

{"keyName":"testKeyName","plaintext":"decrypted_data"}
```
