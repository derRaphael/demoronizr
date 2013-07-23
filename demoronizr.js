/*
 * demoronizr.js
 *
 * Copyright 2013 derRaphael <software@itholic.org>
 *
 * A script for phantomjs which hooks eval, document.write, and
 * document.writeln in order to dump their proper output before execution
 * This script is usefull for deobfuscating classical moron approaches
 * which use some string mumbo jumbo in order to disguise plain text
 * sniffs.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * * Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 * * Redistributions in binary form must reproduce the above
 *   copyright notice, this list of conditions and the following disclaimer
 *   in the documentation and/or other materials provided with the
 *   distribution.
 * * Neither the name of the  nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

var page = require('webpage').create(), system = require('system');

if (system.args.length === 1 || ! /^https?:\/\/.+/.test(system.args[1]) ) {
    console.log('Usage: '+system.args[0]+' <some URL>');
    phantom.exit(1);
}

page.settings.userAgent = "Demoronizr/0.2 " + page.settings.userAgent ;

page.onResourceRequested = function (req) {
    // console.log('requested: ' + JSON.stringify(req, undefined, 4));
    // console.log('requested: ' + req['url']);
};

page.onResourceReceived = function (res) {
    // console.log('received: ' + JSON.stringify(res, undefined, 4));
    // console.log('received: ' + res['url']);
};

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onInitialized = function() {
    // console.log("page.onInitialized");
    page.evaluate(function() {

        try {
            window['document']['orgWrite'] = window['document']['write'];
            window.document.write = function(){
                for( var i=0; i < arguments.length; i++ )
                {
                    the_line_to_write = arguments[i];
                    the_line_to_write = the_line_to_write.replace(/([\r\n]){2,}/g, "$1");
                    console.log( the_line_to_write );
                }
                document.orgWrite.apply( document, arguments );
            }
        } catch (e) {
            console.log( "Error. Substituting document.write. ");
            console.log( e );
        }

        try {
            window['document']['orgWriteLn'] = window['document']['writeln'];
            window.document.writeln = function(){
                for( var i=0; i < arguments.length; i++ )
                {
                    the_line_to_write = arguments[i];
                    the_line_to_write = the_line_to_write.replace(/([\r\n]){2,}/g, "$1");
                    console.log( the_line_to_write );
                }
                document.orgWriteLn.apply( document, arguments );
            }

        } catch (e) {
            console.log( "Error. Substituting document.writeln. ");
            console.log( e );
        }

        try {

            window['orgEval'] = window['eval'];
            window['eval'] = function(){
                for( var i=0; i < arguments.length; i++ )
                {
                    console.log( "EVAL:" + arguments[i] );
                }
                window['orgEval'].apply( window, arguments );
            }

        } catch (e) {
            console.log( "Error. Substituting window.eval. ");
            console.log( e );
        }
    });
};
page.onLoadStarted = function() {
    // console.log("page.onLoadStarted");
};
page.onLoadFinished = function() {
    // console.log("page.onLoadFinished");
};
page.onUrlChanged = function() {
    // console.log("page.onUrlChanged");
};
page.onNavigationRequested = function() {
    // console.log("page.onNavigationRequested");
};
page.onAlert = function( msg ) {
    // console.log("page.onAlert");
    console.log("Alert: " + msg );
};

page.open( system.args[1], function(status) {
    if ( status === "success" ) {
        phantom.exit();
    }
});