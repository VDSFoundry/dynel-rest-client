    // Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

/*jshint expr: true*/

var chai = require('chai');
var expect = chai.expect;
var Model = require('dynel-data').Model;
var DT = require('dynel-data').DataTypes;
var RESTClient = require('../lib/restClient.js');
var IdentityClient = require('dynel-oauth-client').IdentityClient;

    var baseUrl = 'http://dynel-node.azurewebsites.net';


describe('RESTClient', function() {
    this.timeout(15000);

    it('should fire success on successful get', function(done) {

        var client = new RESTClient({baseUrl: baseUrl});
        client.get({
            url: 'test/users',
            context: this,
            success: function(data) {
                if (data.length != 2)
                    throw 'data.length should be 2...';

                done();
            },
            error: function(err) {
                console.log('error: ' + err);
                throw err;
            }
        });
    });

    it('should fire success on successful get with jwt login', function(done) {

        var identity = new IdentityClient(baseUrl);


        var client = new RESTClient({baseUrl: baseUrl});


        identity.authenticate({
            username: 'admin',
            password: 'password',
            context: null,
            success: function(token) {
                client.get({
                    url: 'test/users',
                    context: this,
                    token: token,
                    success: function(data) {
                        if (data.length != 2)
                            throw 'data.length should be 2...';

                        done();
                    },
                    error: function(err) {
                        console.log('error: ' + err);
                        throw err;
                    }
                });
            },
            error: function(err) {
                console.log('error: ' + err.message);
                done();
            }
        });
    });
});

