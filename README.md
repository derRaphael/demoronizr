demoronizr.js
=============

demoronizr is a small script for [phantomjs](http://phantomjs.org) 
which aims to show what is happening on a particular page. It does so, 
by hooking eval, document.write, and document.writeln and dumps their 
content when they're being called from within a given page.

Particular usefull for sites which use some obscure eval and string 
modifications to make their homepage sourcecode unreadable.

demoronizr.js is released as open source under the 3-clause bsd 
licence.

Disclaimer
---------

Demoronizr neither claims to successfully decrypt stuff, nor does the 
author claims that encrypting software is useless. Especially the here 
mentioned.

To put it clear: This software worked for me. If it works for you, 
too, be lucky, otherwise if you suffer any loss of whatever nature, 
for example financial or because your wife left you, or get in trouble 
because of using demoronizr, this is clearly your problem.
It might happen, that the 'decrypted' page remains encrypted or stops 
working or even that the operator starts some legal action upon the 
user. As said before, this software has been written for educational 
purposes only. So use it at your very own risc.

Techically spoken
-----------------

This script is intended to show how phantomjs may be used to intercept 
javascript core functionalities and redirect output. The deobfuscation 
is a sideeffect only. There are however better approaches, but they 
need a more complex setup and even these are not 100% secure nor 
failsafe.

Software which scrambles html or javascript needs to be executable in
the browser itself, and there are not many approaches how this can be
achieved. However these types of software only help to lockout 
copycats with little or no experience, and hence might be called snake 
oil products, as the promised security is only of a short temporary 
nature and won't help with people who know what they're doing.

Most "obfuscators" use some string modifications and eval() which 
interprets it in the browser. This is where the demoronizr kicks is 
and shows nice plain text of the "encrypted" webpage.

This only works, because the functions are "redirected" before the 
page's script sources are interpreted. It won't work in a browser 
without some specialized addons or a modified javascript engine. 
Because the browser "resets" the js engine on a fresh page load.

Tests
-----

Tested successfully on the following pages and products:

ProtWare's HTML Guardian

 * http://www.protware.com/e_demo.htm

mtop's Encrypt HTML Pro

 * http://www.mtopsoft.com/encryptpro/example1.htm
 
AEVITA Software's Advanced HTML Encrypt & Password Protect

 * http://www.aevita.com/web/lock/samples/google_simple.htm
 * http://www.aevita.com/web/lock/samples/google_medium.htm
 * http://www.aevita.com/web/lock/samples/google_strong.htm

Usage
------

Usage is fairly simple. Just do this from commandline. Any output will
go to stdout. The snipped below assumes, phantomjs is found in your 
path. If using windows, you might need to use a fullpath to phantomjs.

```
phantomjs demoronizr.js http://url.to/crypted/site.html
```

Licence
=======

 demoronizr.js
 
 Copyright 2013 derRaphael <software@itholic.org>
 
 A script for phantomjs which hooks eval, document.write, and
 document.writeln in order to dump their proper output before 
 execution.
 This script is usefull for deobfuscating classical moron approaches
 which use some string mumbo jumbo in order to disguise plain text
 sniffs.
 
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions 
 are met:
 
 * Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above
   copyright notice, this list of conditions and the following 
   disclaimer in the documentation and/or other materials provided 
   with the distribution.
 * Neither the name of the  nor the names of its
   contributors may be used to endorse or promote products derived 
   from this software without specific prior written permission.
 
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 