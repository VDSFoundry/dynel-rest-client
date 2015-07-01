// Copyright (c) Visual Data Solutions, Inc. All rights reserved. This source code is distributed under the terms of the MIT license. See LICENSE file in the project root for complete license information.

var DynObject = require('dynel-core').DynObject;
var CoreObject = require('dynel-core').CoreObject;
var EventSource = require('dynel-core').EventSource;
var request = require('superagent');


module.exports = CoreObject.extend({
    className: 'IdentityClient',

   mixins: [
        EventSource
    ],

    init: function(data) {
        this.baseUrl = data.baseUrl;
    },

    get: function(options) {

        if (!options.url)
            throw 'url is required';

        var url = this.baseUrl + '/' + options.url;

        var data = null;
        if (options.data) {
            data = options.data;
        }

        var req = request
            .get(url)
            .send(data)
            .set('Accept', 'application/json');

        if (options.token) {
            req.set('Authorization', 'Bearer ' + options.token);
        }
        req.end(function (error, res) {

                if (error) {
                    var e = error;
                    if (options.error) {
                        options.error.call(options.context, e);
                    }
                }
                else if (options.success) {
                    options.success.call(options.context, res.body);
                }
            });
    },
});


