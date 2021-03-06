/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3); 


	var radio_handler = __webpack_require__(4);
	var inputmask_handler = __webpack_require__(6);
	var focus_handler = __webpack_require__(7);
	var question_change_handler = __webpack_require__(9);
	var file_handler = __webpack_require__(12);
	var add_input_handler = __webpack_require__(13); 
	var dropdown_select_handler = __webpack_require__(14);
	var nested_dropdown_handler = __webpack_require__(15);
	var submit_handler = __webpack_require__(19);

	var route_handler = __webpack_require__(16); 

	var data_handler = __webpack_require__(17); 
	var json_handler = __webpack_require__(18); 

	window.onload = function () {
	    
	    route_handler.clone_ct();
		route_handler.clone_ct2();
	    var init_flag = false; 
		

	    $('form').attr('tabindex', '-1');
	    $('input').attr('tabindex', '-1');


	    $('form').attr('autocomplete', 'off');
	   
	    $.router.addErrorHandler(function (url) {
	        console.log(url);
	    });

	    $.router.add('/view/:ct', view);

	    function view(data) {
	        
	      
	        $('.form-preview-wrap').fadeOut(500, function () { 

	            $('input[type="radio"]').css({
	                'display': 'none'
	            }); 

	            $('.form-preview-wrap').find('.form-input2').remove();
	            $('.form-wrap').find('.category-wrap[data-category="' + data.ct + '"]').css({ 'display': 'block' });
	            $('.form-wrap').find('.category-wrap[data-category!="' + data.ct + '"]').css({ 'display': 'none' });

	            $('.big-container').fadeIn(500);
	            var max = 3;

	            var step = 100 / max;
	            var w = step * data.ct;

	            $('.meter-top span').animate({
	                width: w + '%'
	            }, {
	                duration: 500,
	                complete: function () {
	                    $('.stats').html(data.ct + '/3');
	                }
	            });
	            $('.form-wrap').fadeIn(300);

	        });

	  

	        if (!init_flag) {

	            init_flag = true; 

	            radio_handler();
	            inputmask_handler();
	            focus_handler();
	            question_change_handler();
	            file_handler();
	            add_input_handler();
	            dropdown_select_handler();
	            nested_dropdown_handler();
	            route_handler.preview_handler(data)

	        }

	        $('.category-wrap[data-category="' + data.ct + '"]').find('.autofocus').trigger('focus');

	    }

	    try {
	        $.router.go('/view/2');
	    } catch (err) {
	        var data = {
	            ct: 2
	        }
	        view(data); 
	    }
	 


	    $.router.add('/done', done)
	    function done() {

	        $('.stats').html('3/3');
	        $('.meter-top span').animate({
	            width: '100%'
	        }, {
	            duration: 500,
	            complete: function () {
	        
	                $('.big-container').fadeOut(500, function () {
	                    $('.thank-you-screen').css({
	                        'height': '100%'
	                    });
	                    $('.thank-you-screen').animate({
	                        opacity: 1
	                    }, 700);
	                });
	            }
	        })

	    }

	    var handler_added = false; 


	    $.router.add('/preview/:category', route_handler.preview) 

	        
	} 


/***/ },
/* 1 */
/***/ function(module, exports) {

	/*

	    plugin name: router
	    jquery plugin to handle routes with both hash and push state
	    why? why another routing plugin? because i couldnt find one that handles both hash and pushstate
	    created by 24hr // camilo.tapia
	    author twitter: camilo.tapia
	  
	    Copyright 2011  camilo tapia // 24hr (email : camilo.tapia@gmail.com)

	    This program is free software; you can redistribute it and/or modify
	    it under the terms of the GNU General Public License, version 2, as 
	    published by the Free Software Foundation.

	    This program is distributed in the hope that it will be useful,
	    but WITHOUT ANY WARRANTY; without even the implied warranty of
	    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	    GNU General Public License for more details.

	    You should have received a copy of the GNU General Public License
	    along with this program; if not, write to the Free Software
	    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

	*/
	 

	(function($){
	    
	    var hasPushState = (history && history.pushState);    
	    var hasHashState = !hasPushState && ("onhashchange" in window) && false;
	    var router = {};
	    var routeList = [];
	    var eventAdded = false;
	    var currentUsedUrl = location.href; //used for ie to hold the current url
	    var firstRoute = true;
	    var errorCallback = function () {};
	    
	    // hold the latest route that was activated
	    router.currentId = "";
	    router.currentParameters = {};
	    
	    // Create a default error handler
	    router.errorCallback = errorCallback;
	    
	    router.capabilities = {
	        hash: hasHashState,
	        pushState: hasPushState,
	        timer: !hasHashState && !hasPushState
	    };
	    
	    // reset all routes
	    router.reset = function()
	    {
	        var router = {};
	        var routeList = [];
	        router.currentId = "";
	        router.currentParameters = {};
	    }
	 
	    router.add = function(route, id, callback)
	    {
	        // if we only get a route and a callback, we switch the arguments
	        if (typeof id == "function")
	        {
	            callback = id;
	            delete id;
	        }
	        
	        var isRegExp = typeof route == "object";
	        
	        if (!isRegExp)
	        {
	            
	            // remove the last slash to unifiy all routes
	            if (route.lastIndexOf("/") == route.length - 1)
	            {
	                route = route.substring(0, route.length - 1);
	            }
	            
	            // if the routes where created with an absolute url ,we have to remove the absolut part anyway, since we cant change that much
	            route = route.replace(location.protocol + "//", "").replace(location.hostname, "");
	        }

	        var routeItem = {
	            route: route,
	            callback: callback,
	            type: isRegExp ? "regexp" : "string",
	            id: id
	        }

	        routeList.push(routeItem);
	        
	        // we add the event listener after the first route is added so that we dont need to listen to events in vain
	        if (!eventAdded)
	        {
	            bindStateEvents();
	        }
	    };
	    
	    router.addErrorHandler = function (callback)
	    {
	        this.errorCallback = callback;
	    };
	    
	    function bindStateEvents()
	    {
	        eventAdded = true;
	        
	        // default value telling router that we havent replaced the url from a hash. yet.
	        router.fromHash = false;

	        
	        if (hasPushState)
	        {
	            // if we get a request with a qualified hash (ie it begins with #!)
	            if (location.hash.indexOf("#!/") === 0)
	            {
	                // replace the state
	                var url = location.pathname + location.hash.replace(/^#!\//gi, "");
	                history.replaceState({}, "", url);
	                
	                // this flag tells router that the url was converted from hash to popstate
	                router.fromHash = true;
	            }
	            
	            $(window).bind("popstate", handleRoutes);
	        }
	        else if (hasHashState)
	        {
	            $(window).bind("hashchange.router", handleRoutes);
	        }
	        else
	        {
	            // if no events are available we use a timer to check periodically for changes in the url
	            setInterval(
	                function()
	                {
	                    if (location.href != currentUsedUrl)
	                    {
	                        handleRoutes();
	                        currentUsedUrl = location.href;
	                    }
	                }, 500
	            );
	        }
	       
	    }
	    
	    bindStateEvents();
	    
	    router.go = function(url, title)
	    {   
	        if (hasPushState)
	        {
	            history.pushState({}, title, url);
	            checkRoutes();
	        }
	        else
	        {
	            // remove part of url that we dont use
	            url = url.replace(location.protocol + "//", "").replace(location.hostname, "");
	            var hash = url.replace(location.pathname, "");
	            
	            if (hash.indexOf("!") < 0)
	            {
	                hash = "!/" + hash;
	            }
	            location.hash = hash;
	        }
	    };
	    
	    // do a check without affecting the history
	    router.check = router.redo = function()
	    {   
	        checkRoutes(true);
	    };
	    
	    // parse and wash the url to process
	    function parseUrl(url)
	    {
	        var currentUrl = url ? url : location.pathname;
	        
	        currentUrl = decodeURI(currentUrl);
	        
	        // if no pushstate is availabe we have to use the hash
	        if (!hasPushState)
	        {   
	            if (location.hash.indexOf("#!/") === 0)
	            {
	                currentUrl += location.hash.substring(3);
	            }
	            else
	            {
	                return '';
	            }
	        }
	        
	        // and if the last character is a slash, we just remove it
	        currentUrl = currentUrl.replace(/\/$/, "");

	        return currentUrl;
	    }
	    
	    // get the current parameters for either a specified url or the current one if parameters is ommited
	    router.parameters = function(url)
	    {
	        // parse the url so that we handle a unified url
	        var currentUrl = parseUrl(url);
	        
	        // get the list of actions for the current url
	        var list = getParameters(currentUrl);
	        
	        // if the list is empty, return an empty object
	        if (list.length == 0)
	        {
	            router.currentParameters = {};
	        }
	        
	        // if we got results, return the first one. at least for now
	        else 
	        {
	            router.currentParameters = list[0].data;
	        }
	        
	        return router.currentParameters;
	    }
	    
	    function getParameters(url)
	    {

	        var dataList = [];
	        
	       // console.log("ROUTES:");

	        for(var i = 0, ii = routeList.length; i < ii; i++)
	        {
	            var route = routeList[i];
	            
	            // check for mathing reg exp
	            if (route.type == "regexp")
	            {
	                var result = url.match(route.route);
	                if (result)
	                {
	                    var data = {};
	                    data.matches = result;
	                    
	                    dataList.push(
	                        {
	                            route: route,
	                            data: data
	                        }
	                    );
	                    
	                    // saves the current route id
	                    router.currentId = route.id;
	                    
	                    // break after first hit
	                    break;
	                }
	            }
	            
	            // check for mathing string routes
	            else
	            {
	                var currentUrlParts = url.split("/");
	                var routeParts = route.route.split("/");
	                
	                //console.log("matchCounter ", matchCounter, url, route.route)

	                // first check so that they have the same amount of elements at least
	                if (routeParts.length == currentUrlParts.length)
	                {
	                    var data = {};
	                    var matched = true;
	                    var matchCounter = 0;

	                    for(var j = 0, jj = routeParts.length; j < jj; j++)
	                    {
	                        var isParam = routeParts[j].indexOf(":") === 0;
	                        if (isParam)
	                        {
	                            data[routeParts[j].substring(1)] = decodeURI(currentUrlParts[j]);
	                            matchCounter++;
	                        }
	                        else
	                        {
	                            if (routeParts[j] == currentUrlParts[j])
	                            {
	                                matchCounter++;
	                            }
	                        }
	                    }

	                    // break after first hit
	                    if (routeParts.length == matchCounter)
	                    {
	                        dataList.push(
	                            {
	                                route: route,
	                                data: data
	                            }
	                        );

	                        // saved the current route id
	                        router.currentId = route.id;
	                        router.currentParameters = data;
	                        
	                        break; 
	                    }
	                    
	                }
	            }
	            
	        }
	        
	        return dataList;
	    }
	    
	    function checkRoutes()
	    {
	        var currentUrl = parseUrl(location.pathname);

	        // check if something is catched
	        var actionList = getParameters(currentUrl);
	        
	        // If no routes have been matched
	        if (actionList.length == 0) {
	            // Invoke error handler
	            return router.errorCallback(currentUrl);
	        }
	        
	        // ietrate trough result (but it will only kick in one)
	        for(var i = 0, ii = actionList.length; i < ii; i++)
	        {
	            actionList[i].route.callback(actionList[i].data);
	        }
	    }
	    

	    function handleRoutes(e)
	    {
	        if (e != null && e.originalEvent && e.originalEvent.state !== undefined)
	        {
	            checkRoutes();
	        }
	        else if (hasHashState)
	        {
	            checkRoutes();
	        }
	        else if (!hasHashState && !hasPushState)
	        {
	            checkRoutes();
	        }
	    }



	    if (!$.router)
	    {
	        $.router = router;
	    }
	    else
	    {
	        if (window.console && window.console.warn)
	        {
	            console.warn("jQuery.status already defined. Something is using the same name.");
	        }
	    }
	        
	})( jQuery );

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*!
	* jquery.inputmask.bundle.js
	* https://github.com/RobinHerbots/jquery.inputmask
	* Copyright (c) 2010 - 2016 Robin Herbots
	* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
	* Version: 3.3.4-60
	*/
	!function($) {
	    function Inputmask(alias, options) {
	        return this instanceof Inputmask ? ($.isPlainObject(alias) ? options = alias : (options = options || {}, 
	        options.alias = alias), this.el = void 0, this.opts = $.extend(!0, {}, this.defaults, options), 
	        this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, 
	        this.events = {}, this.dataAttribute = "data-inputmask", void resolveAlias(this.opts.alias, options, this.opts)) : new Inputmask(alias, options);
	    }
	    function isInputEventSupported(eventName) {
	        var el = document.createElement("input"), evName = "on" + eventName, isSupported = evName in el;
	        return isSupported || (el.setAttribute(evName, "return;"), isSupported = "function" == typeof el[evName]), 
	        el = null, isSupported;
	    }
	    function isElementTypeSupported(input, opts) {
	        var elementType = input.getAttribute("type"), isSupported = "INPUT" === input.tagName && $.inArray(elementType, opts.supportsInputType) !== -1 || input.isContentEditable || "TEXTAREA" === input.tagName;
	        if (!isSupported && "INPUT" === input.tagName) {
	            var el = document.createElement("input");
	            el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
	        }
	        return isSupported;
	    }
	    function resolveAlias(aliasStr, options, opts) {
	        var aliasDefinition = opts.aliases[aliasStr];
	        return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), 
	        $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), 
	        !1);
	    }
	    function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
	        function importOption(option, optionData) {
	            optionData = void 0 !== optionData ? optionData : npt.getAttribute(dataAttribute + "-" + option), 
	            null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), 
	            userOptions[option] = optionData);
	        }
	        var option, dataoptions, optionData, p, attrOptions = npt.getAttribute(dataAttribute);
	        if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(new RegExp("'", "g"), '"'), 
	        dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) {
	            optionData = void 0;
	            for (p in dataoptions) if ("alias" === p.toLowerCase()) {
	                optionData = dataoptions[p];
	                break;
	            }
	        }
	        importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts);
	        for (option in opts) {
	            if (dataoptions) {
	                optionData = void 0;
	                for (p in dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
	                    optionData = dataoptions[p];
	                    break;
	                }
	            }
	            importOption(option, optionData);
	        }
	        return $.extend(!0, opts, userOptions), opts;
	    }
	    function generateMaskSet(opts, nocache) {
	        function generateMask(mask, metadata, opts) {
	            if (null !== mask && "" !== mask) {
	                if (1 === mask.length && opts.greedy === !1 && 0 !== opts.repeat && (opts.placeholder = ""), 
	                opts.repeat > 0 || "*" === opts.repeat || "+" === opts.repeat) {
	                    var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
	                    mask = opts.groupmarker.start + mask + opts.groupmarker.end + opts.quantifiermarker.start + repeatStart + "," + opts.repeat + opts.quantifiermarker.end;
	                }
	                var masksetDefinition;
	                return void 0 === Inputmask.prototype.masksCache[mask] || nocache === !0 ? (masksetDefinition = {
	                    mask: mask,
	                    maskToken: Inputmask.analyseMask(mask, opts),
	                    validPositions: {},
	                    _buffer: void 0,
	                    buffer: void 0,
	                    tests: {},
	                    metadata: metadata,
	                    maskLength: void 0
	                }, nocache !== !0 && (Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask] = masksetDefinition, 
	                masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[opts.numericInput ? mask.split("").reverse().join("") : mask]), 
	                masksetDefinition;
	            }
	        }
	        var ms;
	        if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
	            if (opts.mask.length > 1) {
	                opts.keepStatic = null === opts.keepStatic || opts.keepStatic;
	                var altMask = "(";
	                return $.each(opts.numericInput ? opts.mask.reverse() : opts.mask, function(ndx, msk) {
	                    altMask.length > 1 && (altMask += ")|("), altMask += void 0 === msk.mask || $.isFunction(msk.mask) ? msk : msk.mask;
	                }), altMask += ")", generateMask(altMask, opts.mask, opts);
	            }
	            opts.mask = opts.mask.pop();
	        }
	        return opts.mask && (ms = void 0 === opts.mask.mask || $.isFunction(opts.mask.mask) ? generateMask(opts.mask, opts.mask, opts) : generateMask(opts.mask.mask, opts.mask, opts)), 
	        ms;
	    }
	    function maskScope(actionObj, maskset, opts) {
	        function getMaskTemplate(baseOnInput, minimalPos, includeInput) {
	            minimalPos = minimalPos || 0;
	            var ndxIntlzr, test, testPos, maskTemplate = [], pos = 0, lvp = getLastValidPosition();
	            maxLength = void 0 !== el ? el.maxLength : void 0, maxLength === -1 && (maxLength = void 0);
	            do baseOnInput === !0 && getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], 
	            test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(includeInput === !0 ? testPos.input : getPlaceholder(pos, test))) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
	            test = testPos.match, ndxIntlzr = testPos.locator.slice(), (opts.jitMasking === !1 || pos < lvp || Number.isFinite(opts.jitMasking) && opts.jitMasking > pos) && maskTemplate.push(getPlaceholder(pos, test))), 
	            pos++; while ((void 0 === maxLength || pos < maxLength) && (null !== test.fn || "" !== test.def) || minimalPos > pos);
	            return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), getMaskSet().maskLength = pos + 1, 
	            maskTemplate;
	        }
	        function getMaskSet() {
	            return maskset;
	        }
	        function resetMaskSet(soft) {
	            var maskset = getMaskSet();
	            maskset.buffer = void 0, soft !== !0 && (maskset._buffer = void 0, maskset.validPositions = {}, 
	            maskset.p = 0);
	        }
	        function getLastValidPosition(closestTo, strict, validPositions) {
	            var before = -1, after = -1, valids = validPositions || getMaskSet().validPositions;
	            void 0 === closestTo && (closestTo = -1);
	            for (var posNdx in valids) {
	                var psNdx = parseInt(posNdx);
	                valids[psNdx] && (strict || null !== valids[psNdx].match.fn) && (psNdx <= closestTo && (before = psNdx), 
	                psNdx >= closestTo && (after = psNdx));
	            }
	            return before !== -1 && closestTo - before > 1 || after < closestTo ? before : after;
	        }
	        function stripValidPositions(start, end, nocheck, strict) {
	            function IsEnclosedStatic(pos) {
	                var posMatch = getMaskSet().validPositions[pos];
	                if (void 0 !== posMatch && null === posMatch.match.fn) {
	                    var prevMatch = getMaskSet().validPositions[pos - 1], nextMatch = getMaskSet().validPositions[pos + 1];
	                    return void 0 !== prevMatch && void 0 !== nextMatch;
	                }
	                return !1;
	            }
	            var i, startPos = start, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), needsValidation = !1;
	            for (getMaskSet().p = start, i = end - 1; i >= startPos; i--) void 0 !== getMaskSet().validPositions[i] && (nocheck === !0 || !IsEnclosedStatic(i) && opts.canClearPosition(getMaskSet(), i, getLastValidPosition(), strict, opts) !== !1) && delete getMaskSet().validPositions[i];
	            for (resetMaskSet(!0), i = startPos + 1; i <= getLastValidPosition(); ) {
	                for (;void 0 !== getMaskSet().validPositions[startPos]; ) startPos++;
	                var s = getMaskSet().validPositions[startPos];
	                if (i < startPos && (i = startPos + 1), void 0 === getMaskSet().validPositions[i] && isMask(i) || void 0 !== s) i++; else {
	                    var t = getTestTemplate(i);
	                    needsValidation === !1 && positionsClone[startPos] && positionsClone[startPos].match.def === t.match.def ? (getMaskSet().validPositions[startPos] = $.extend(!0, {}, positionsClone[startPos]), 
	                    getMaskSet().validPositions[startPos].input = t.input, delete getMaskSet().validPositions[i], 
	                    i++) : positionCanMatchDefinition(startPos, t.match.def) ? isValid(startPos, t.input || getPlaceholder(i), !0) !== !1 && (delete getMaskSet().validPositions[i], 
	                    i++, needsValidation = !0) : isMask(i) || (i++, startPos--), startPos++;
	                }
	            }
	            resetMaskSet(!0);
	        }
	        function determineTestTemplate(tests, guessNextBest) {
	            for (var testPos, testPositions = tests, lvp = getLastValidPosition(), lvTest = getMaskSet().validPositions[lvp] || getTests(0)[0], lvTestAltArr = void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation].toString().split(",") : [], ndx = 0; ndx < testPositions.length && (testPos = testPositions[ndx], 
	            !(testPos.match && (opts.greedy && testPos.match.optionalQuantifier !== !0 || (testPos.match.optionality === !1 || testPos.match.newBlockMarker === !1) && testPos.match.optionalQuantifier !== !0) && (void 0 === lvTest.alternation || lvTest.alternation !== testPos.alternation || void 0 !== testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAltArr))) || guessNextBest === !0 && (null !== testPos.match.fn || /[0-9a-bA-Z]/.test(testPos.match.def))); ndx++) ;
	            return testPos;
	        }
	        function getTestTemplate(pos, ndxIntlzr, tstPs) {
	            return getMaskSet().validPositions[pos] || determineTestTemplate(getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
	        }
	        function getTest(pos) {
	            return getMaskSet().validPositions[pos] ? getMaskSet().validPositions[pos] : getTests(pos)[0];
	        }
	        function positionCanMatchDefinition(pos, def) {
	            for (var valid = !1, tests = getTests(pos), tndx = 0; tndx < tests.length; tndx++) if (tests[tndx].match && tests[tndx].match.def === def) {
	                valid = !0;
	                break;
	            }
	            return valid;
	        }
	        function selectBestMatch(pos, alternateNdx) {
	            var bestMatch, indexPos;
	            return (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) && $.each(getMaskSet().tests[pos] || [ getMaskSet().validPositions[pos] ], function(ndx, lmnt) {
	                var ndxPos = lmnt.alternation ? lmnt.locator[lmnt.alternation].toString().indexOf(alternateNdx) : -1;
	                (void 0 === indexPos || ndxPos < indexPos) && ndxPos !== -1 && (bestMatch = lmnt, 
	                indexPos = ndxPos);
	            }), bestMatch;
	        }
	        function getTests(pos, ndxIntlzr, tstPs) {
	            function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
	                function handleMatch(match, loopNdx, quantifierRecurse) {
	                    function isFirstMatch(latestMatch, tokenGroup) {
	                        var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
	                        return firstMatch || $.each(tokenGroup.matches, function(ndx, match) {
	                            if (match.isQuantifier === !0 && (firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]))) return !1;
	                        }), firstMatch;
	                    }
	                    function resolveNdxInitializer(pos, alternateNdx) {
	                        var bestMatch = selectBestMatch(pos, alternateNdx);
	                        return bestMatch ? bestMatch.locator.slice(bestMatch.alternation + 1) : void 0;
	                    }
	                    function staticCanMatchDefinition(source, target) {
	                        return null === source.match.fn && null !== target.match.fn && target.match.fn.test(source.match.def, getMaskSet(), pos, !1, opts, !1);
	                    }
	                    if (testPos > 1e4) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
	                    if (testPos === pos && void 0 === match.matches) return matches.push({
	                        match: match,
	                        locator: loopNdx.reverse(),
	                        cd: cacheDependency
	                    }), !0;
	                    if (void 0 !== match.matches) {
	                        if (match.isGroup && quantifierRecurse !== match) {
	                            if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx)) return !0;
	                        } else if (match.isOptional) {
	                            var optionalToken = match;
	                            if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) {
	                                if (latestMatch = matches[matches.length - 1].match, !isFirstMatch(latestMatch, optionalToken)) return !0;
	                                insertStop = !0, testPos = pos;
	                            }
	                        } else if (match.isAlternator) {
	                            var maltMatches, alternateToken = match, malternateMatches = [], currentMatches = matches.slice(), loopNdxCnt = loopNdx.length, altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;
	                            if (altIndex === -1 || "string" == typeof altIndex) {
	                                var amndx, currentPos = testPos, ndxInitializerClone = ndxInitializer.slice(), altIndexArr = [];
	                                if ("string" == typeof altIndex) altIndexArr = altIndex.split(","); else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx);
	                                for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
	                                    if (amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = resolveNdxInitializer(testPos, amndx) || ndxInitializerClone.slice(), 
	                                    match = handleMatch(alternateToken.matches[amndx] || maskToken.matches[amndx], [ amndx ].concat(loopNdx), quantifierRecurse) || match, 
	                                    match !== !0 && void 0 !== match && altIndexArr[altIndexArr.length - 1] < alternateToken.matches.length) {
	                                        var ntndx = $.inArray(match, maskToken.matches) + 1;
	                                        maskToken.matches.length > ntndx && (match = handleMatch(maskToken.matches[ntndx], [ ntndx ].concat(loopNdx.slice(1, loopNdx.length)), quantifierRecurse), 
	                                        match && (altIndexArr.push(ntndx.toString()), $.each(matches, function(ndx, lmnt) {
	                                            lmnt.alternation = loopNdx.length - 1;
	                                        })));
	                                    }
	                                    maltMatches = matches.slice(), testPos = currentPos, matches = [];
	                                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
	                                        var altMatch = maltMatches[ndx1], hasMatch = !1;
	                                        altMatch.alternation = altMatch.alternation || loopNdxCnt;
	                                        for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
	                                            var altMatch2 = malternateMatches[ndx2];
	                                            if (("string" != typeof altIndex || $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1) && (altMatch.match.def === altMatch2.match.def || staticCanMatchDefinition(altMatch, altMatch2))) {
	                                                hasMatch = altMatch.match.nativeDef === altMatch2.match.nativeDef, altMatch2.locator[altMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) === -1 && (altMatch2.locator[altMatch.alternation] = altMatch2.locator[altMatch.alternation] + "," + altMatch.locator[altMatch.alternation], 
	                                                altMatch2.alternation = altMatch.alternation, null == altMatch.match.fn && (altMatch2.na = altMatch2.na || altMatch.locator[altMatch.alternation].toString(), 
	                                                altMatch2.na.indexOf(altMatch.locator[altMatch.alternation]) === -1 && (altMatch2.na = altMatch2.na + "," + altMatch.locator[altMatch.alternation])));
	                                                break;
	                                            }
	                                        }
	                                        hasMatch || malternateMatches.push(altMatch);
	                                    }
	                                }
	                                "string" == typeof altIndex && (malternateMatches = $.map(malternateMatches, function(lmnt, ndx) {
	                                    if (isFinite(ndx)) {
	                                        var mamatch, alternation = lmnt.alternation, altLocArr = lmnt.locator[alternation].toString().split(",");
	                                        lmnt.locator[alternation] = void 0, lmnt.alternation = void 0;
	                                        for (var alndx = 0; alndx < altLocArr.length; alndx++) mamatch = $.inArray(altLocArr[alndx], altIndexArr) !== -1, 
	                                        mamatch && (void 0 !== lmnt.locator[alternation] ? (lmnt.locator[alternation] += ",", 
	                                        lmnt.locator[alternation] += altLocArr[alndx]) : lmnt.locator[alternation] = parseInt(altLocArr[alndx]), 
	                                        lmnt.alternation = alternation);
	                                        if (void 0 !== lmnt.locator[alternation]) return lmnt;
	                                    }
	                                })), matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = matches.length > 0, 
	                                ndxInitializer = ndxInitializerClone.slice();
	                            } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [ altIndex ].concat(loopNdx), quantifierRecurse);
	                            if (match) return !0;
	                        } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) for (var qt = match, qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
	                            var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
	                            if (match = handleMatch(tokenGroup, [ qndx ].concat(loopNdx), tokenGroup)) {
	                                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx > qt.quantifier.min - 1, 
	                                isFirstMatch(latestMatch, tokenGroup)) {
	                                    if (qndx > qt.quantifier.min - 1) {
	                                        insertStop = !0, testPos = pos;
	                                        break;
	                                    }
	                                    return !0;
	                                }
	                                return !0;
	                            }
	                        } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse)) return !0;
	                    } else testPos++;
	                }
	                for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (maskToken.matches[tndx].isQuantifier !== !0) {
	                    var match = handleMatch(maskToken.matches[tndx], [ tndx ].concat(loopNdx), quantifierRecurse);
	                    if (match && testPos === pos) return match;
	                    if (testPos > pos) break;
	                }
	            }
	            function mergeLocators(tests) {
	                var locator = [];
	                return $.isArray(tests) || (tests = [ tests ]), tests.length > 0 && (void 0 === tests[0].alternation ? (locator = determineTestTemplate(tests.slice()).locator.slice(), 
	                0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function(ndx, tst) {
	                    if ("" !== tst.def) if (0 === locator.length) locator = tst.locator.slice(); else for (var i = 0; i < locator.length; i++) tst.locator[i] && locator[i].toString().indexOf(tst.locator[i]) === -1 && (locator[i] += "," + tst.locator[i]);
	                })), locator;
	            }
	            function filterTests(tests) {
	                return opts.keepStatic && pos > 0 && tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0) && tests[0].match.optionality !== !0 && tests[0].match.optionalQuantifier !== !0 && null === tests[0].match.fn && !/[0-9a-bA-Z]/.test(tests[0].match.def) ? [ determineTestTemplate(tests) ] : tests;
	            }
	            var latestMatch, maskTokens = getMaskSet().maskToken, testPos = ndxIntlzr ? tstPs : 0, ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [ 0 ], matches = [], insertStop = !1, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
	            if (pos > -1) {
	                if (void 0 === ndxIntlzr) {
	                    for (var test, previousPos = pos - 1; void 0 === (test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) && previousPos > -1; ) previousPos--;
	                    void 0 !== test && previousPos > -1 && (ndxInitializer = mergeLocators(test), cacheDependency = ndxInitializer.join(""), 
	                    testPos = previousPos);
	                }
	                if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) return filterTests(getMaskSet().tests[pos]);
	                for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
	                    var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [ mtndx ]);
	                    if (match && testPos === pos || testPos > pos) break;
	                }
	            }
	            return (0 === matches.length || insertStop) && matches.push({
	                match: {
	                    fn: null,
	                    cardinality: 0,
	                    optionality: !0,
	                    casing: null,
	                    def: "",
	                    placeholder: ""
	                },
	                locator: [],
	                cd: cacheDependency
	            }), void 0 !== ndxIntlzr && getMaskSet().tests[pos] ? filterTests($.extend(!0, [], matches)) : (getMaskSet().tests[pos] = $.extend(!0, [], matches), 
	            filterTests(getMaskSet().tests[pos]));
	        }
	        function getBufferTemplate() {
	            return void 0 === getMaskSet()._buffer && (getMaskSet()._buffer = getMaskTemplate(!1, 1), 
	            void 0 === getMaskSet().buffer && getMaskSet()._buffer.slice()), getMaskSet()._buffer;
	        }
	        function getBuffer(noCache) {
	            return void 0 !== getMaskSet().buffer && noCache !== !0 || (getMaskSet().buffer = getMaskTemplate(!0, getLastValidPosition(), !0)), 
	            getMaskSet().buffer;
	        }
	        function refreshFromBuffer(start, end, buffer) {
	            var i;
	            if (start === !0) resetMaskSet(), start = 0, end = buffer.length; else for (i = start; i < end; i++) delete getMaskSet().validPositions[i];
	            for (i = start; i < end; i++) resetMaskSet(!0), buffer[i] !== opts.skipOptionalPartCharacter && isValid(i, buffer[i], !0, !0);
	        }
	        function casing(elem, test, pos) {
	            switch (opts.casing || test.casing) {
	              case "upper":
	                elem = elem.toUpperCase();
	                break;

	              case "lower":
	                elem = elem.toLowerCase();
	                break;

	              case "title":
	                var posBefore = getMaskSet().validPositions[pos - 1];
	                elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
	            }
	            return elem;
	        }
	        function checkAlternationMatch(altArr1, altArr2) {
	            for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, alndx = 0; alndx < altArr1.length; alndx++) if ($.inArray(altArr1[alndx], altArrC) !== -1) {
	                isMatch = !0;
	                break;
	            }
	            return isMatch;
	        }
	        function isValid(pos, c, strict, fromSetValid, fromAlternate) {
	            function isSelection(posObj) {
	                var selection = isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 && opts.insertMode : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1 && opts.insertMode;
	                return selection && 0 === posObj.begin && posObj.end === getMaskSet().maskLength ? "full" : selection;
	            }
	            function _isValid(position, c, strict) {
	                var rslt = !1;
	                return $.each(getTests(position), function(ndx, tst) {
	                    for (var test = tst.match, loopend = c ? 1 : 0, chrs = "", i = test.cardinality; i > loopend; i--) chrs += getBufferElement(position - (i - 1));
	                    if (c && (chrs += c), getBuffer(!0), rslt = null != test.fn ? test.fn.test(chrs, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
	                        c: test.placeholder || test.def,
	                        pos: position
	                    }, rslt !== !1) {
	                        var elem = void 0 !== rslt.c ? rslt.c : c;
	                        elem = elem === opts.skipOptionalPartCharacter && null === test.fn ? test.placeholder || test.def : elem;
	                        var validatedPos = position, possibleModifiedBuffer = getBuffer();
	                        if (void 0 !== rslt.remove && ($.isArray(rslt.remove) || (rslt.remove = [ rslt.remove ]), 
	                        $.each(rslt.remove.sort(function(a, b) {
	                            return b - a;
	                        }), function(ndx, lmnt) {
	                            stripValidPositions(lmnt, lmnt + 1, !0);
	                        })), void 0 !== rslt.insert && ($.isArray(rslt.insert) || (rslt.insert = [ rslt.insert ]), 
	                        $.each(rslt.insert.sort(function(a, b) {
	                            return a - b;
	                        }), function(ndx, lmnt) {
	                            isValid(lmnt.pos, lmnt.c, !0, fromSetValid);
	                        })), rslt.refreshFromBuffer) {
	                            var refresh = rslt.refreshFromBuffer;
	                            if (strict = !0, refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, possibleModifiedBuffer), 
	                            void 0 === rslt.pos && void 0 === rslt.c) return rslt.pos = getLastValidPosition(), 
	                            !1;
	                            if (validatedPos = void 0 !== rslt.pos ? rslt.pos : position, validatedPos !== position) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0, fromSetValid)), 
	                            !1;
	                        } else if (rslt !== !0 && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos, 
	                        refreshFromBuffer(position, validatedPos, getBuffer().slice()), validatedPos !== position)) return rslt = $.extend(rslt, isValid(validatedPos, elem, !0)), 
	                        !1;
	                        return (rslt === !0 || void 0 !== rslt.pos || void 0 !== rslt.c) && (ndx > 0 && resetMaskSet(!0), 
	                        setValidPosition(validatedPos, $.extend({}, tst, {
	                            input: casing(elem, test, validatedPos)
	                        }), fromSetValid, isSelection(pos)) || (rslt = !1), !1);
	                    }
	                }), rslt;
	            }
	            function alternate(pos, c, strict) {
	                var lastAlt, alternation, altPos, prevAltPos, i, validPos, altNdxs, decisionPos, validPsClone = $.extend(!0, {}, getMaskSet().validPositions), isValidRslt = !1, lAltPos = getLastValidPosition();
	                for (prevAltPos = getMaskSet().validPositions[lAltPos]; lAltPos >= 0; lAltPos--) if (altPos = getMaskSet().validPositions[lAltPos], 
	                altPos && void 0 !== altPos.alternation) {
	                    if (lastAlt = lAltPos, alternation = getMaskSet().validPositions[lastAlt].alternation, 
	                    prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
	                    prevAltPos = altPos;
	                }
	                if (void 0 !== alternation) {
	                    decisionPos = parseInt(lastAlt);
	                    var decisionTaker = void 0 !== prevAltPos.locator[prevAltPos.alternation || alternation] ? prevAltPos.locator[prevAltPos.alternation || alternation] : altNdxs[0];
	                    decisionTaker.length > 0 && (decisionTaker = decisionTaker.split(",")[0]);
	                    var possibilityPos = getMaskSet().validPositions[decisionPos], prevPos = getMaskSet().validPositions[decisionPos - 1];
	                    $.each(getTests(decisionPos, prevPos ? prevPos.locator : void 0, decisionPos - 1), function(ndx, test) {
	                        altNdxs = test.locator[alternation] ? test.locator[alternation].toString().split(",") : [];
	                        for (var mndx = 0; mndx < altNdxs.length; mndx++) {
	                            var validInputs = [], staticInputsBeforePos = 0, staticInputsBeforePosAlternate = 0, verifyValidInput = !1;
	                            if (decisionTaker < altNdxs[mndx] && (void 0 === test.na || $.inArray(altNdxs[mndx], test.na.split(",")) === -1)) {
	                                getMaskSet().validPositions[decisionPos] = $.extend(!0, {}, test);
	                                var possibilities = getMaskSet().validPositions[decisionPos].locator;
	                                for (getMaskSet().validPositions[decisionPos].locator[alternation] = parseInt(altNdxs[mndx]), 
	                                null == test.match.fn ? (possibilityPos.input !== test.match.def && (verifyValidInput = !0, 
	                                possibilityPos.generatedInput !== !0 && validInputs.push(possibilityPos.input)), 
	                                staticInputsBeforePosAlternate++, getMaskSet().validPositions[decisionPos].generatedInput = !/[0-9a-bA-Z]/.test(test.match.def), 
	                                getMaskSet().validPositions[decisionPos].input = test.match.def) : getMaskSet().validPositions[decisionPos].input = possibilityPos.input, 
	                                i = decisionPos + 1; i < getLastValidPosition(void 0, !0) + 1; i++) validPos = getMaskSet().validPositions[i], 
	                                validPos && validPos.generatedInput !== !0 && /[0-9a-bA-Z]/.test(validPos.input) ? validInputs.push(validPos.input) : i < pos && staticInputsBeforePos++, 
	                                delete getMaskSet().validPositions[i];
	                                for (verifyValidInput && validInputs[0] === test.match.def && validInputs.shift(), 
	                                resetMaskSet(!0), isValidRslt = !0; validInputs.length > 0; ) {
	                                    var input = validInputs.shift();
	                                    if (input !== opts.skipOptionalPartCharacter && !(isValidRslt = isValid(getLastValidPosition(void 0, !0) + 1, input, !1, fromSetValid, !0))) break;
	                                }
	                                if (isValidRslt) {
	                                    getMaskSet().validPositions[decisionPos].locator = possibilities;
	                                    var targetLvp = getLastValidPosition(pos) + 1;
	                                    for (i = decisionPos + 1; i < getLastValidPosition() + 1; i++) validPos = getMaskSet().validPositions[i], 
	                                    (void 0 === validPos || null == validPos.match.fn) && i < pos + (staticInputsBeforePosAlternate - staticInputsBeforePos) && staticInputsBeforePosAlternate++;
	                                    pos += staticInputsBeforePosAlternate - staticInputsBeforePos, isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid, !0);
	                                }
	                                if (isValidRslt) return !1;
	                                resetMaskSet(), getMaskSet().validPositions = $.extend(!0, {}, validPsClone);
	                            }
	                        }
	                    });
	                }
	                return isValidRslt;
	            }
	            function trackbackAlternations(originalPos, newPos) {
	                var vp = getMaskSet().validPositions[newPos];
	                if (vp) for (var targetLocator = vp.locator, tll = targetLocator.length, ps = originalPos; ps < newPos; ps++) if (void 0 === getMaskSet().validPositions[ps] && !isMask(ps, !0)) {
	                    var tests = getTests(ps), bestMatch = tests[0], equality = -1;
	                    $.each(tests, function(ndx, tst) {
	                        for (var i = 0; i < tll && (void 0 !== tst.locator[i] && checkAlternationMatch(tst.locator[i].toString().split(","), targetLocator[i].toString().split(","))); i++) equality < i && (equality = i, 
	                        bestMatch = tst);
	                    }), setValidPosition(ps, $.extend({}, bestMatch, {
	                        input: bestMatch.match.placeholder || bestMatch.match.def
	                    }), !0);
	                }
	            }
	            function setValidPosition(pos, validTest, fromSetValid, isSelection) {
	                if (isSelection || opts.insertMode && void 0 !== getMaskSet().validPositions[pos] && void 0 === fromSetValid) {
	                    var i, positionsClone = $.extend(!0, {}, getMaskSet().validPositions), lvp = getLastValidPosition(void 0, !0);
	                    for (i = pos; i <= lvp; i++) delete getMaskSet().validPositions[i];
	                    getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
	                    var j, valid = !0, vps = getMaskSet().validPositions, needsValidation = !1, initialLength = getMaskSet().maskLength;
	                    for (i = j = pos; i <= lvp; i++) {
	                        var t = positionsClone[i];
	                        if (void 0 !== t) for (var posMatch = j; posMatch < getMaskSet().maskLength && (null == t.match.fn && vps[i] && (vps[i].match.optionalQuantifier === !0 || vps[i].match.optionality === !0) || null != t.match.fn); ) {
	                            if (posMatch++, needsValidation === !1 && positionsClone[posMatch] && positionsClone[posMatch].match.def === t.match.def) getMaskSet().validPositions[posMatch] = $.extend(!0, {}, positionsClone[posMatch]), 
	                            getMaskSet().validPositions[posMatch].input = t.input, fillMissingNonMask(posMatch), 
	                            j = posMatch, valid = !0; else if (positionCanMatchDefinition(posMatch, t.match.def)) {
	                                var result = isValid(posMatch, t.input, !0, !0);
	                                valid = result !== !1, j = result.caret || result.insert ? getLastValidPosition() : posMatch, 
	                                needsValidation = !0;
	                            } else valid = t.generatedInput === !0;
	                            if (getMaskSet().maskLength < initialLength && (getMaskSet().maskLength = initialLength), 
	                            valid) break;
	                        }
	                        if (!valid) break;
	                    }
	                    if (!valid) return getMaskSet().validPositions = $.extend(!0, {}, positionsClone), 
	                    resetMaskSet(!0), !1;
	                } else getMaskSet().validPositions[pos] = $.extend(!0, {}, validTest);
	                return resetMaskSet(!0), !0;
	            }
	            function fillMissingNonMask(maskPos) {
	                for (var pndx = maskPos - 1; pndx > -1 && !getMaskSet().validPositions[pndx]; pndx--) ;
	                var testTemplate, testsFromPos;
	                for (pndx++; pndx < maskPos; pndx++) void 0 === getMaskSet().validPositions[pndx] && (opts.jitMasking === !1 || opts.jitMasking > pndx) && (testsFromPos = getTests(pndx, getTestTemplate(pndx - 1).locator, pndx - 1).slice(), 
	                "" === testsFromPos[testsFromPos.length - 1].match.def && testsFromPos.pop(), testTemplate = determineTestTemplate(testsFromPos), 
	                testTemplate && (testTemplate.match.def === opts.radixPointDefinitionSymbol || !isMask(pndx, !0) || $.inArray(opts.radixPoint, getBuffer()) < pndx && testTemplate.match.fn && testTemplate.match.fn.test(getPlaceholder(pndx), getMaskSet(), pndx, !1, opts)) && (result = _isValid(pndx, testTemplate.match.placeholder || (null == testTemplate.match.fn ? testTemplate.match.def : "" !== getPlaceholder(pndx) ? getPlaceholder(pndx) : getBuffer()[pndx]), !0), 
	                result !== !1 && (getMaskSet().validPositions[result.pos || pndx].generatedInput = !0)));
	            }
	            strict = strict === !0;
	            var maskPos = pos;
	            void 0 !== pos.begin && (maskPos = isRTL && !isSelection(pos) ? pos.end : pos.begin);
	            var result = !1, positionsClone = $.extend(!0, {}, getMaskSet().validPositions);
	            if (fillMissingNonMask(maskPos), isSelection(pos) && (handleRemove(void 0, Inputmask.keyCode.DELETE, pos), 
	            maskPos = getMaskSet().p), maskPos < getMaskSet().maskLength && (result = _isValid(maskPos, c, strict), 
	            (!strict || fromSetValid === !0) && result === !1)) {
	                var currentPosValid = getMaskSet().validPositions[maskPos];
	                if (!currentPosValid || null !== currentPosValid.match.fn || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
	                    if ((opts.insertMode || void 0 === getMaskSet().validPositions[seekNext(maskPos)]) && !isMask(maskPos, !0)) {
	                        var testsFromPos = getTests(maskPos).slice();
	                        "" === testsFromPos[testsFromPos.length - 1].match.def && testsFromPos.pop();
	                        var staticChar = determineTestTemplate(testsFromPos, !0);
	                        staticChar && null === staticChar.match.fn && (staticChar = staticChar.match.placeholder || staticChar.match.def, 
	                        _isValid(maskPos, staticChar, strict), getMaskSet().validPositions[maskPos].generatedInput = !0);
	                        for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), 
	                        result !== !1) {
	                            trackbackAlternations(maskPos, void 0 !== result.pos ? result.pos : nPos), maskPos = nPos;
	                            break;
	                        }
	                    }
	                } else result = {
	                    caret: seekNext(maskPos)
	                };
	            }
	            return result === !1 && opts.keepStatic && !strict && fromAlternate !== !0 && (result = alternate(maskPos, c, strict)), 
	            result === !0 && (result = {
	                pos: maskPos
	            }), $.isFunction(opts.postValidation) && result !== !1 && !strict && fromSetValid !== !0 && (result = !!opts.postValidation(getBuffer(!0), result, opts) && result), 
	            void 0 === result.pos && (result.pos = maskPos), result === !1 && (resetMaskSet(!0), 
	            getMaskSet().validPositions = $.extend(!0, {}, positionsClone)), result;
	        }
	        function isMask(pos, strict) {
	            var test;
	            if (strict ? (test = getTestTemplate(pos).match, "" === test.def && (test = getTest(pos).match)) : test = getTest(pos).match, 
	            null != test.fn) return test.fn;
	            if (strict !== !0 && pos > -1) {
	                var tests = getTests(pos);
	                return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
	            }
	            return !1;
	        }
	        function seekNext(pos, newBlock) {
	            var maskL = getMaskSet().maskLength;
	            if (pos >= maskL) return maskL;
	            for (var position = pos; ++position < maskL && (newBlock === !0 && (getTest(position).match.newBlockMarker !== !0 || !isMask(position)) || newBlock !== !0 && !isMask(position)); ) ;
	            return position;
	        }
	        function seekPrevious(pos, newBlock) {
	            var tests, position = pos;
	            if (position <= 0) return 0;
	            for (;--position > 0 && (newBlock === !0 && getTest(position).match.newBlockMarker !== !0 || newBlock !== !0 && !isMask(position) && (tests = getTests(position), 
	            tests.length < 2 || 2 === tests.length && "" === tests[1].match.def)); ) ;
	            return position;
	        }
	        function getBufferElement(position) {
	            return void 0 === getMaskSet().validPositions[position] ? getPlaceholder(position) : getMaskSet().validPositions[position].input;
	        }
	        function writeBuffer(input, buffer, caretPos, event, triggerInputEvent) {
	            if (event && $.isFunction(opts.onBeforeWrite)) {
	                var result = opts.onBeforeWrite(event, buffer, caretPos, opts);
	                if (result) {
	                    if (result.refreshFromBuffer) {
	                        var refresh = result.refreshFromBuffer;
	                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer || buffer), 
	                        buffer = getBuffer(!0);
	                    }
	                    void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
	                }
	            }
	            input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type ? renderColorMask(input, buffer, caretPos) : caret(input, caretPos), 
	            triggerInputEvent === !0 && (skipInputEvent = !0, $(input).trigger("input"));
	        }
	        function getPlaceholder(pos, test) {
	            if (test = test || getTest(pos).match, void 0 !== test.placeholder) return test.placeholder;
	            if (null === test.fn) {
	                if (pos > -1 && void 0 === getMaskSet().validPositions[pos]) {
	                    var prevTest, tests = getTests(pos), staticAlternations = [];
	                    if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if (tests[i].match.optionality !== !0 && tests[i].match.optionalQuantifier !== !0 && (null === tests[i].match.fn || void 0 === prevTest || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, !0, opts) !== !1) && (staticAlternations.push(tests[i]), 
	                    null === tests[i].match.fn && (prevTest = tests[i]), staticAlternations.length > 1 && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
	                }
	                return test.def;
	            }
	            return opts.placeholder.charAt(pos % opts.placeholder.length);
	        }
	        function checkVal(input, writeOut, strict, nptvl, initiatingEvent, stickyCaret) {
	            function isTemplateMatch() {
	                var isMatch = !1, charCodeNdx = getBufferTemplate().slice(initialNdx, seekNext(initialNdx)).join("").indexOf(charCodes);
	                if (charCodeNdx !== -1 && !isMask(initialNdx)) {
	                    isMatch = !0;
	                    for (var bufferTemplateArr = getBufferTemplate().slice(initialNdx, initialNdx + charCodeNdx), i = 0; i < bufferTemplateArr.length; i++) if (" " !== bufferTemplateArr[i]) {
	                        isMatch = !1;
	                        break;
	                    }
	                }
	                return isMatch;
	            }
	            var inputValue = nptvl.slice(), charCodes = "", initialNdx = 0, result = void 0;
	            if (resetMaskSet(), getMaskSet().p = seekNext(-1), !strict) if (opts.autoUnmask !== !0) {
	                var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""), matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));
	                matches && matches.length > 0 && (inputValue.splice(0, matches.length * staticInput.length), 
	                initialNdx = seekNext(initialNdx));
	            } else initialNdx = seekNext(initialNdx);
	            if ($.each(inputValue, function(ndx, charCode) {
	                if (void 0 !== charCode) {
	                    var keypress = new $.Event("keypress");
	                    keypress.which = charCode.charCodeAt(0), charCodes += charCode;
	                    var lvp = getLastValidPosition(void 0, !0), lvTest = getMaskSet().validPositions[lvp], nextTest = getTestTemplate(lvp + 1, lvTest ? lvTest.locator.slice() : void 0, lvp);
	                    if (!isTemplateMatch() || strict || opts.autoUnmask) {
	                        var pos = strict ? ndx : null == nextTest.match.fn && nextTest.match.optionality && lvp + 1 < getMaskSet().p ? lvp + 1 : getMaskSet().p;
	                        result = keypressEvent.call(input, keypress, !0, !1, strict, pos), initialNdx = pos + 1, 
	                        charCodes = "";
	                    } else result = keypressEvent.call(input, keypress, !0, !1, !0, lvp + 1);
	                    if (!strict && $.isFunction(opts.onBeforeWrite) && (result = opts.onBeforeWrite(keypress, getBuffer(), result.forwardPosition, opts), 
	                    result && result.refreshFromBuffer)) {
	                        var refresh = result.refreshFromBuffer;
	                        refreshFromBuffer(refresh === !0 ? refresh : refresh.start, refresh.end, result.buffer), 
	                        resetMaskSet(!0), result.caret && (getMaskSet().p = result.caret);
	                    }
	                }
	            }), writeOut) {
	                var caretPos = void 0, lvp = getLastValidPosition();
	                document.activeElement === input && (initiatingEvent || result) && (caretPos = caret(input).begin, 
	                initiatingEvent && result === !1 && (caretPos = seekNext(getLastValidPosition(caretPos))), 
	                result && stickyCaret !== !0 && (caretPos < lvp + 1 || lvp === -1) && (caretPos = opts.numericInput && void 0 === result.caret ? seekPrevious(result.forwardPosition) : result.forwardPosition)), 
	                writeBuffer(input, getBuffer(), caretPos, initiatingEvent || new $.Event("checkval"));
	            }
	        }
	        function unmaskedvalue(input) {
	            if (input && void 0 === input.inputmask) return input.value;
	            var umValue = [], vps = getMaskSet().validPositions;
	            for (var pndx in vps) vps[pndx].match && null != vps[pndx].match.fn && umValue.push(vps[pndx].input);
	            var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
	            if ($.isFunction(opts.onUnMask)) {
	                var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
	                unmaskedValue = opts.onUnMask(bufferValue, unmaskedValue, opts) || unmaskedValue;
	            }
	            return unmaskedValue;
	        }
	        function caret(input, begin, end, notranslate) {
	            function translatePosition(pos) {
	                if (notranslate !== !0 && isRTL && "number" == typeof pos && (!opts.greedy || "" !== opts.placeholder)) {
	                    var bffrLght = getBuffer().join("").length;
	                    pos = bffrLght - pos;
	                }
	                return pos;
	            }
	            var range;
	            if ("number" != typeof begin) return input.setSelectionRange ? (begin = input.selectionStart, 
	            end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), 
	            range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, 
	            end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
	            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), 
	            end = begin + range.text.length), {
	                begin: translatePosition(begin),
	                end: translatePosition(end)
	            };
	            begin = translatePosition(begin), end = translatePosition(end), end = "number" == typeof end ? end : begin;
	            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
	            if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, mobile || opts.insertMode !== !1 || begin !== end || end++, 
	            input.setSelectionRange) input.selectionStart = begin, input.selectionEnd = end; else if (window.getSelection) {
	                if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
	                    var textNode = document.createTextNode("");
	                    input.appendChild(textNode);
	                }
	                range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), 
	                range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), 
	                range.collapse(!0);
	                var sel = window.getSelection();
	                sel.removeAllRanges(), sel.addRange(range);
	            } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), 
	            range.moveEnd("character", end), range.moveStart("character", begin), range.select());
	            renderColorMask(input, void 0, {
	                begin: begin,
	                end: end
	            });
	        }
	        function determineLastRequiredPosition(returnDefinition) {
	            var pos, testPos, buffer = getBuffer(), bl = buffer.length, lvp = getLastValidPosition(), positions = {}, lvTest = getMaskSet().validPositions[lvp], ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0;
	            for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
	            ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
	            var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
	            for (pos = bl - 1; pos > lvp && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && null != testPos.match.fn || null === testPos.match.fn && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
	            return returnDefinition ? {
	                l: bl,
	                def: positions[bl] ? positions[bl].match : void 0
	            } : bl;
	        }
	        function clearOptionalTail(buffer) {
	            for (var rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
	            return buffer.splice(rl, lmib + 1 - rl), buffer;
	        }
	        function isComplete(buffer) {
	            if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
	            if ("*" !== opts.repeat) {
	                var complete = !1, lrp = determineLastRequiredPosition(!0), aml = seekPrevious(lrp.l);
	                if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
	                    complete = !0;
	                    for (var i = 0; i <= aml; i++) {
	                        var test = getTestTemplate(i).match;
	                        if (null !== test.fn && void 0 === getMaskSet().validPositions[i] && test.optionality !== !0 && test.optionalQuantifier !== !0 || null === test.fn && buffer[i] !== getPlaceholder(i, test)) {
	                            complete = !1;
	                            break;
	                        }
	                    }
	                }
	                return complete;
	            }
	        }
	        function patchValueProperty(npt) {
	            function patchValhook(type) {
	                if ($.valHooks && (void 0 === $.valHooks[type] || $.valHooks[type].inputmaskpatch !== !0)) {
	                    var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function(elem) {
	                        return elem.value;
	                    }, valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function(elem, value) {
	                        return elem.value = value, elem;
	                    };
	                    $.valHooks[type] = {
	                        get: function(elem) {
	                            if (elem.inputmask) {
	                                if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
	                                var result = valhookGet(elem);
	                                return getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== !0 ? result : "";
	                            }
	                            return valhookGet(elem);
	                        },
	                        set: function(elem, value) {
	                            var result, $elem = $(elem);
	                            return result = valhookSet(elem, value), elem.inputmask && $elem.trigger("setvalue"), 
	                            result;
	                        },
	                        inputmaskpatch: !0
	                    };
	                }
	            }
	            function getter() {
	                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition() !== -1 || opts.nullable !== !0 ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
	            }
	            function setter(value) {
	                valueSet.call(this, value), this.inputmask && $(this).trigger("setvalue");
	            }
	            function installNativeValueSetFallback(npt) {
	                EventRuler.on(npt, "mouseenter", function(event) {
	                    var $input = $(this), input = this, value = input.inputmask._valueGet();
	                    value !== getBuffer().join("") && $input.trigger("setvalue");
	                });
	            }
	            var valueGet, valueSet;
	            if (!npt.inputmask.__valueGet) {
	                if (opts.noValuePatching !== !0) {
	                    if (Object.getOwnPropertyDescriptor) {
	                        "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" == typeof "test".__proto__ ? function(object) {
	                            return object.__proto__;
	                        } : function(object) {
	                            return object.constructor.prototype;
	                        });
	                        var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
	                        valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, 
	                        valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
	                            get: getter,
	                            set: setter,
	                            configurable: !0
	                        })) : "INPUT" !== npt.tagName && (valueGet = function() {
	                            return this.textContent;
	                        }, valueSet = function(value) {
	                            this.textContent = value;
	                        }, Object.defineProperty(npt, "value", {
	                            get: getter,
	                            set: setter,
	                            configurable: !0
	                        }));
	                    } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), 
	                    valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), 
	                    npt.__defineSetter__("value", setter));
	                    npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
	                }
	                npt.inputmask._valueGet = function(overruleRTL) {
	                    return isRTL && overruleRTL !== !0 ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
	                }, npt.inputmask._valueSet = function(value, overruleRTL) {
	                    valueSet.call(this.el, null === value || void 0 === value ? "" : overruleRTL !== !0 && isRTL ? value.split("").reverse().join("") : value);
	                }, void 0 === valueGet && (valueGet = function() {
	                    return this.value;
	                }, valueSet = function(value) {
	                    this.value = value;
	                }, patchValhook(npt.type), installNativeValueSetFallback(npt));
	            }
	        }
	        function handleRemove(input, k, pos, strict) {
	            function generalize() {
	                if (opts.keepStatic) {
	                    for (var validInputs = [], lastAlt = getLastValidPosition(-1, !0), positionsClone = $.extend(!0, {}, getMaskSet().validPositions), prevAltPos = getMaskSet().validPositions[lastAlt]; lastAlt >= 0; lastAlt--) {
	                        var altPos = getMaskSet().validPositions[lastAlt];
	                        if (altPos) {
	                            if (altPos.generatedInput !== !0 && /[0-9a-bA-Z]/.test(altPos.input) && validInputs.push(altPos.input), 
	                            delete getMaskSet().validPositions[lastAlt], void 0 !== altPos.alternation && altPos.locator[altPos.alternation] !== prevAltPos.locator[altPos.alternation]) break;
	                            prevAltPos = altPos;
	                        }
	                    }
	                    if (lastAlt > -1) for (getMaskSet().p = seekNext(getLastValidPosition(-1, !0)); validInputs.length > 0; ) {
	                        var keypress = new $.Event("keypress");
	                        keypress.which = validInputs.pop().charCodeAt(0), keypressEvent.call(input, keypress, !0, !1, !1, getMaskSet().p);
	                    } else getMaskSet().validPositions = $.extend(!0, {}, positionsClone);
	                }
	            }
	            if ((opts.numericInput || isRTL) && (k === Inputmask.keyCode.BACKSPACE ? k = Inputmask.keyCode.DELETE : k === Inputmask.keyCode.DELETE && (k = Inputmask.keyCode.BACKSPACE), 
	            isRTL)) {
	                var pend = pos.end;
	                pos.end = pos.begin, pos.begin = pend;
	            }
	            k === Inputmask.keyCode.BACKSPACE && (pos.end - pos.begin < 1 || opts.insertMode === !1) ? (pos.begin = seekPrevious(pos.begin), 
	            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.begin--) : k === Inputmask.keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0) ? pos.end + 1 : seekNext(pos.end) + 1, 
	            void 0 === getMaskSet().validPositions[pos.begin] || getMaskSet().validPositions[pos.begin].input !== opts.groupSeparator && getMaskSet().validPositions[pos.begin].input !== opts.radixPoint || pos.end++), 
	            stripValidPositions(pos.begin, pos.end, !1, strict), strict !== !0 && generalize();
	            var lvp = getLastValidPosition(pos.begin, !0);
	            lvp < pos.begin ? getMaskSet().p = seekNext(lvp) : strict !== !0 && (getMaskSet().p = pos.begin);
	        }
	        function keydownEvent(e) {
	            var input = this, $input = $(input), k = e.keyCode, pos = caret(input);
	            if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) e.preventDefault(), 
	            handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join("")), 
	            input.inputmask._valueGet() === getBufferTemplate().join("") ? $input.trigger("cleared") : isComplete(getBuffer()) === !0 && $input.trigger("complete"), 
	            opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask); else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
	                e.preventDefault();
	                var caretPos = seekNext(getLastValidPosition());
	                opts.insertMode || caretPos !== getMaskSet().maskLength || e.shiftKey || caretPos--, 
	                caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
	            } else k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP ? (e.preventDefault(), 
	            caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || 90 === k && e.ctrlKey) && e.altKey !== !0 ? (checkVal(input, !0, !1, undoValue.split("")), 
	            $input.trigger("click")) : k !== Inputmask.keyCode.INSERT || e.shiftKey || e.ctrlKey ? opts.tabThrough === !0 && k === Inputmask.keyCode.TAB ? (e.shiftKey === !0 ? (null === getTest(pos.begin).match.fn && (pos.begin = seekNext(pos.begin)), 
	            pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), 
	            pos.end = seekNext(pos.begin, !0), pos.end < getMaskSet().maskLength && pos.end--), 
	            pos.begin < getMaskSet().maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || (opts.insertMode === !1 ? k === Inputmask.keyCode.RIGHT ? setTimeout(function() {
	                var caretPos = caret(input);
	                caret(input, caretPos.begin);
	            }, 0) : k === Inputmask.keyCode.LEFT && setTimeout(function() {
	                var caretPos = caret(input);
	                caret(input, isRTL ? caretPos.begin + 1 : caretPos.begin - 1);
	            }, 0) : setTimeout(function() {
	                renderColorMask(input);
	            }, 0)) : (opts.insertMode = !opts.insertMode, caret(input, opts.insertMode || pos.begin !== getMaskSet().maskLength ? pos.begin : pos.begin - 1));
	            opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts), ignorable = $.inArray(k, opts.ignorables) !== -1;
	        }
	        function keypressEvent(e, checkval, writeOut, strict, ndx) {
	            var input = this, $input = $(input), k = e.which || e.charCode || e.keyCode;
	            if (!(checkval === !0 || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), 
	            setTimeout(function() {
	                $input.trigger("change");
	            }, 0)), !0;
	            if (k) {
	                46 === k && e.shiftKey === !1 && "," === opts.radixPoint && (k = 44);
	                var forwardPosition, pos = checkval ? {
	                    begin: ndx,
	                    end: ndx
	                } : caret(input), c = String.fromCharCode(k);
	                getMaskSet().writeOutBuffer = !0;
	                var valResult = isValid(pos, c, strict);
	                if (valResult !== !1 && (resetMaskSet(!0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : checkval ? valResult.pos + 1 : seekNext(valResult.pos), 
	                getMaskSet().p = forwardPosition), writeOut !== !1) {
	                    var self = this;
	                    if (setTimeout(function() {
	                        opts.onKeyValidation.call(self, k, valResult, opts);
	                    }, 0), getMaskSet().writeOutBuffer && valResult !== !1) {
	                        var buffer = getBuffer();
	                        writeBuffer(input, buffer, opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, e, checkval !== !0), 
	                        checkval !== !0 && setTimeout(function() {
	                            isComplete(buffer) === !0 && $input.trigger("complete");
	                        }, 0);
	                    }
	                }
	                if (opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask), e.preventDefault(), 
	                checkval) return valResult.forwardPosition = forwardPosition, valResult;
	            }
	        }
	        function pasteEvent(e) {
	            var tempValue, input = this, ev = e.originalEvent || e, $input = $(input), inputValue = input.inputmask._valueGet(!0), caretPos = caret(input);
	            isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
	            var valueBeforeCaret = inputValue.substr(0, caretPos.begin), valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
	            if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), 
	            valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), 
	            isRTL && (tempValue = valueBeforeCaret, valueBeforeCaret = valueAfterCaret, valueAfterCaret = tempValue), 
	            window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret; else {
	                if (!ev.clipboardData || !ev.clipboardData.getData) return !0;
	                inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
	            }
	            var pasteValue = inputValue;
	            if ($.isFunction(opts.onBeforePaste)) {
	                if (pasteValue = opts.onBeforePaste(inputValue, opts), pasteValue === !1) return e.preventDefault();
	                pasteValue || (pasteValue = inputValue);
	            }
	            return checkVal(input, !1, !1, isRTL ? pasteValue.split("").reverse() : pasteValue.toString().split("")), 
	            writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), 
	            isComplete(getBuffer()) === !0 && $input.trigger("complete"), e.preventDefault();
	        }
	        function inputFallBackEvent(e) {
	            var input = this, inputValue = input.inputmask._valueGet();
	            if (getBuffer().join("") !== inputValue) {
	                var caretPos = caret(input);
	                if (inputValue = inputValue.replace(new RegExp("(" + Inputmask.escapeRegex(getBufferTemplate().join("")) + ")*"), ""), 
	                iemobile) {
	                    var inputChar = inputValue.replace(getBuffer().join(""), "");
	                    if (1 === inputChar.length) {
	                        var keypress = new $.Event("keypress");
	                        return keypress.which = inputChar.charCodeAt(0), keypressEvent.call(input, keypress, !0, !0, !1, getMaskSet().validPositions[caretPos.begin - 1] ? caretPos.begin : caretPos.begin - 1), 
	                        !1;
	                    }
	                }
	                if (caretPos.begin > inputValue.length && (caret(input, inputValue.length), caretPos = caret(input)), 
	                getBuffer().length - inputValue.length !== 1 || inputValue.charAt(caretPos.begin) === getBuffer()[caretPos.begin] || inputValue.charAt(caretPos.begin + 1) === getBuffer()[caretPos.begin] || isMask(caretPos.begin)) {
	                    for (var lvp = getLastValidPosition() + 1, bufferTemplate = getBufferTemplate().join(""); null === inputValue.match(Inputmask.escapeRegex(bufferTemplate) + "$"); ) bufferTemplate = bufferTemplate.slice(1);
	                    inputValue = inputValue.replace(bufferTemplate, ""), inputValue = inputValue.split(""), 
	                    checkVal(input, !0, !1, inputValue, e, caretPos.begin < lvp), isComplete(getBuffer()) === !0 && $(input).trigger("complete");
	                } else e.keyCode = Inputmask.keyCode.BACKSPACE, keydownEvent.call(input, e);
	                e.preventDefault();
	            }
	        }
	        function setValueEvent(e) {
	            var input = this, value = input.inputmask._valueGet();
	            checkVal(input, !0, !1, ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(value, opts) || value : value).split("")), 
	            undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && input.inputmask._valueSet("");
	        }
	        function focusEvent(e) {
	            var input = this, nptValue = input.inputmask._valueGet();
	            opts.showMaskOnFocus && (!opts.showMaskOnHover || opts.showMaskOnHover && "" === nptValue) && (input.inputmask._valueGet() !== getBuffer().join("") ? writeBuffer(input, getBuffer(), seekNext(getLastValidPosition())) : mouseEnter === !1 && caret(input, seekNext(getLastValidPosition()))), 
	            opts.positionCaretOnTab === !0 && setTimeout(function() {
	                clickEvent.apply(this, [ e ]);
	            }, 0), undoValue = getBuffer().join("");
	        }
	        function mouseleaveEvent(e) {
	            var input = this;
	            if (mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== input) {
	                var buffer = getBuffer().slice(), nptValue = input.inputmask._valueGet();
	                nptValue !== input.getAttribute("placeholder") && "" !== nptValue && (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer), 
	                writeBuffer(input, buffer));
	            }
	        }
	        function clickEvent(e) {
	            function doRadixFocus(clickPos) {
	                if ("" !== opts.radixPoint) {
	                    var vps = getMaskSet().validPositions;
	                    if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
	                        if (clickPos < seekNext(-1)) return !0;
	                        var radixPos = $.inArray(opts.radixPoint, getBuffer());
	                        if (radixPos !== -1) {
	                            for (var vp in vps) if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
	                            return !0;
	                        }
	                    }
	                }
	                return !1;
	            }
	            var input = this;
	            setTimeout(function() {
	                if (document.activeElement === input) {
	                    var selectedCaret = caret(input);
	                    if (selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
	                      case "none":
	                        break;

	                      case "radixFocus":
	                        if (doRadixFocus(selectedCaret.begin)) {
	                            var radixPos = $.inArray(opts.radixPoint, getBuffer().join(""));
	                            caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
	                            break;
	                        }

	                      default:
	                        var clickPosition = selectedCaret.begin, lvclickPosition = getLastValidPosition(clickPosition, !0), lastPosition = seekNext(lvclickPosition);
	                        if (clickPosition < lastPosition) caret(input, isMask(clickPosition) || isMask(clickPosition - 1) ? clickPosition : seekNext(clickPosition)); else {
	                            var placeholder = getPlaceholder(lastPosition);
	                            ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && getTest(lastPosition).match.optionalQuantifier !== !0 || !isMask(lastPosition, !0) && getTest(lastPosition).match.def === placeholder) && (lastPosition = seekNext(lastPosition)), 
	                            caret(input, lastPosition);
	                        }
	                    }
	                }
	            }, 0);
	        }
	        function dblclickEvent(e) {
	            var input = this;
	            setTimeout(function() {
	                caret(input, 0, seekNext(getLastValidPosition()));
	            }, 0);
	        }
	        function cutEvent(e) {
	            var input = this, $input = $(input), pos = caret(input), ev = e.originalEvent || e, clipboardData = window.clipboardData || ev.clipboardData, clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
	            clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), 
	            document.execCommand && document.execCommand("copy"), handleRemove(input, Inputmask.keyCode.DELETE, pos), 
	            writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join("")), 
	            input.inputmask._valueGet() === getBufferTemplate().join("") && $input.trigger("cleared"), 
	            opts.showTooltip && (input.title = opts.tooltip || getMaskSet().mask);
	        }
	        function blurEvent(e) {
	            var $input = $(this), input = this;
	            if (input.inputmask) {
	                var nptValue = input.inputmask._valueGet(), buffer = getBuffer().slice();
	                undoValue !== buffer.join("") && setTimeout(function() {
	                    $input.trigger("change"), undoValue = buffer.join("");
	                }, 0), "" !== nptValue && (opts.clearMaskOnLostFocus && (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), 
	                isComplete(buffer) === !1 && (setTimeout(function() {
	                    $input.trigger("incomplete");
	                }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), 
	                writeBuffer(input, buffer, void 0, e));
	            }
	        }
	        function mouseenterEvent(e) {
	            var input = this;
	            mouseEnter = !0, document.activeElement !== input && opts.showMaskOnHover && input.inputmask._valueGet() !== getBuffer().join("") && writeBuffer(input, getBuffer());
	        }
	        function submitEvent(e) {
	            undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), 
	            opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), 
	            setTimeout(function() {
	                writeBuffer(el, getBuffer());
	            }, 0));
	        }
	        function resetEvent(e) {
	            setTimeout(function() {
	                $el.trigger("setvalue");
	            }, 0);
	        }
	        function initializeColorMask(input) {
	            function findCaretPos(clientx) {
	                var caretPos, e = document.createElement("span");
	                for (var style in computedStyle) isNaN(style) && style.indexOf("font") !== -1 && (e.style[style] = computedStyle[style]);
	                e.style.textTransform = computedStyle.textTransform, e.style.letterSpacing = computedStyle.letterSpacing, 
	                e.style.position = "absolute", e.style.height = "auto", e.style.width = "auto", 
	                e.style.visibility = "hidden", e.style.whiteSpace = "nowrap", document.body.appendChild(e);
	                var itl, inputText = input.inputmask._valueGet(), previousWidth = 0;
	                for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
	                    if (e.innerHTML += inputText.charAt(caretPos) || "_", e.offsetWidth >= clientx) {
	                        var offset1 = clientx - previousWidth, offset2 = e.offsetWidth - clientx;
	                        e.innerHTML = inputText.charAt(caretPos), offset1 -= e.offsetWidth / 3, caretPos = offset1 < offset2 ? caretPos - 1 : caretPos;
	                        break;
	                    }
	                    previousWidth = e.offsetWidth;
	                }
	                return document.body.removeChild(e), caretPos;
	            }
	            function position() {
	                colorMask.style.position = "absolute", colorMask.style.top = offset.top + "px", 
	                colorMask.style.left = offset.left + "px", colorMask.style.width = parseInt(input.offsetWidth) - parseInt(computedStyle.paddingLeft) - parseInt(computedStyle.paddingRight) - parseInt(computedStyle.borderLeftWidth) - parseInt(computedStyle.borderRightWidth) + "px", 
	                colorMask.style.height = parseInt(input.offsetHeight) - parseInt(computedStyle.paddingTop) - parseInt(computedStyle.paddingBottom) - parseInt(computedStyle.borderTopWidth) - parseInt(computedStyle.borderBottomWidth) + "px", 
	                colorMask.style.lineHeight = colorMask.style.height, colorMask.style.zIndex = isNaN(computedStyle.zIndex) ? -1 : computedStyle.zIndex - 1, 
	                colorMask.style.webkitAppearance = "textfield", colorMask.style.mozAppearance = "textfield", 
	                colorMask.style.Appearance = "textfield";
	            }
	            var offset = $(input).position(), computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);
	            input.parentNode;
	            colorMask = document.createElement("div"), document.body.appendChild(colorMask);
	            for (var style in computedStyle) isNaN(style) && "cssText" !== style && style.indexOf("webkit") == -1 && (colorMask.style[style] = computedStyle[style]);
	            input.style.backgroundColor = "transparent", input.style.color = "transparent", 
	            input.style.webkitAppearance = "caret", input.style.mozAppearance = "caret", input.style.Appearance = "caret", 
	            position(), $(window).on("resize", function(e) {
	                offset = $(input).position(), computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null), 
	                position();
	            }), $(input).on("click", function(e) {
	                return caret(input, findCaretPos(e.clientX)), clickEvent.call(this, [ e ]);
	            });
	        }
	        function renderColorMask(input, buffer, caretPos) {
	            function handleStatic() {
	                static || null !== test.fn && void 0 !== testPos.input ? static && null !== test.fn && void 0 !== testPos.input && (static = !1, 
	                maskTemplate += "</span>") : (static = !0, maskTemplate += "<span class='im-static''>");
	            }
	            if (void 0 !== colorMask) {
	                buffer = buffer || getBuffer(), void 0 === caretPos ? caretPos = caret(input) : void 0 === caretPos.begin && (caretPos = {
	                    begin: caretPos,
	                    end: caretPos
	                });
	                var maskTemplate = "", static = !1;
	                if ("" != buffer) {
	                    var ndxIntlzr, test, testPos, pos = 0, lvp = getLastValidPosition();
	                    do pos === caretPos.begin && document.activeElement === input && (maskTemplate += "<span class='im-caret' style='border-right-width: 1px;border-right-style: solid;'></span>"), 
	                    getMaskSet().validPositions[pos] ? (testPos = getMaskSet().validPositions[pos], 
	                    test = testPos.match, ndxIntlzr = testPos.locator.slice(), handleStatic(), maskTemplate += testPos.input) : (testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), 
	                    test = testPos.match, ndxIntlzr = testPos.locator.slice(), (opts.jitMasking === !1 || pos < lvp || Number.isFinite(opts.jitMasking) && opts.jitMasking > pos) && (handleStatic(), 
	                    maskTemplate += getPlaceholder(pos, test))), pos++; while ((void 0 === maxLength || pos < maxLength) && (null !== test.fn || "" !== test.def) || lvp > pos);
	                }
	                colorMask.innerHTML = maskTemplate;
	            }
	        }
	        function mask(elem) {
	            if (isElementTypeSupported(elem, opts) && (el = elem, $el = $(el), opts.showTooltip && (el.title = opts.tooltip || getMaskSet().mask), 
	            ("rtl" === el.dir || opts.rightAlign) && (el.style.textAlign = "right"), ("rtl" === el.dir || opts.numericInput) && (el.dir = "ltr", 
	            el.removeAttribute("dir"), el.inputmask.isRTL = !0, isRTL = !0), opts.colorMask === !0 && initializeColorMask(el), 
	            android && (el.hasOwnProperty("inputmode") && (el.inputmode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), 
	            "rtfm" === opts.androidHack && (opts.colorMask !== !0 && initializeColorMask(el), 
	            el.type = "password")), EventRuler.off(el), patchValueProperty(el), EventRuler.on(el, "submit", submitEvent), 
	            EventRuler.on(el, "reset", resetEvent), EventRuler.on(el, "mouseenter", mouseenterEvent), 
	            EventRuler.on(el, "blur", blurEvent), EventRuler.on(el, "focus", focusEvent), EventRuler.on(el, "mouseleave", mouseleaveEvent), 
	            opts.colorMask !== !0 && EventRuler.on(el, "click", clickEvent), EventRuler.on(el, "dblclick", dblclickEvent), 
	            EventRuler.on(el, "paste", pasteEvent), EventRuler.on(el, "dragdrop", pasteEvent), 
	            EventRuler.on(el, "drop", pasteEvent), EventRuler.on(el, "cut", cutEvent), EventRuler.on(el, "complete", opts.oncomplete), 
	            EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), 
	            opts.inputEventOnly !== !0 && (EventRuler.on(el, "keydown", keydownEvent), EventRuler.on(el, "keypress", keypressEvent)), 
	            EventRuler.on(el, "compositionstart", $.noop), EventRuler.on(el, "compositionupdate", $.noop), 
	            EventRuler.on(el, "compositionend", $.noop), EventRuler.on(el, "keyup", $.noop), 
	            EventRuler.on(el, "input", inputFallBackEvent), EventRuler.on(el, "setvalue", setValueEvent), 
	            getBufferTemplate(), "" !== el.inputmask._valueGet() || opts.clearMaskOnLostFocus === !1 || document.activeElement === el)) {
	                var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(el.inputmask._valueGet(), opts) || el.inputmask._valueGet() : el.inputmask._valueGet();
	                checkVal(el, !0, !1, initialValue.split(""));
	                var buffer = getBuffer().slice();
	                undoValue = buffer.join(""), isComplete(buffer) === !1 && opts.clearIncomplete && resetMaskSet(), 
	                opts.clearMaskOnLostFocus && document.activeElement !== el && (getLastValidPosition() === -1 ? buffer = [] : clearOptionalTail(buffer)), 
	                writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()));
	            }
	        }
	        var undoValue, el, $el, maxLength, colorMask, valueBuffer, isRTL = !1, skipKeyPressEvent = !1, skipInputEvent = !1, ignorable = !1, mouseEnter = !1, EventRuler = {
	            on: function(input, eventName, eventHandler) {
	                var ev = function(e) {
	                    if (void 0 === this.inputmask && "FORM" !== this.nodeName) {
	                        var imOpts = $.data(this, "_inputmask_opts");
	                        imOpts ? new Inputmask(imOpts).mask(this) : EventRuler.off(this);
	                    } else {
	                        if ("setvalue" === e.type || !(this.disabled || this.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || opts.tabThrough === !1 && e.keyCode === Inputmask.keyCode.TAB))) {
	                            switch (e.type) {
	                              case "input":
	                                if (skipInputEvent === !0) return skipInputEvent = !1, e.preventDefault();
	                                break;

	                              case "keydown":
	                                skipKeyPressEvent = !1, skipInputEvent = !1;
	                                break;

	                              case "keypress":
	                                if (skipKeyPressEvent === !0) return e.preventDefault();
	                                skipKeyPressEvent = !0;
	                                break;

	                              case "click":
	                                if (iemobile || iphone) {
	                                    var that = this, args = arguments;
	                                    return setTimeout(function() {
	                                        eventHandler.apply(that, args);
	                                    }, 0), !1;
	                                }
	                            }
	                            var returnVal = eventHandler.apply(this, arguments);
	                            return returnVal === !1 && (e.preventDefault(), e.stopPropagation()), returnVal;
	                        }
	                        e.preventDefault();
	                    }
	                };
	                input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), 
	                $.inArray(eventName, [ "submit", "reset" ]) !== -1 ? null != input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev);
	            },
	            off: function(input, event) {
	                if (input.inputmask && input.inputmask.events) {
	                    var events;
	                    event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, 
	                    $.each(events, function(eventName, evArr) {
	                        for (;evArr.length > 0; ) {
	                            var ev = evArr.pop();
	                            $.inArray(eventName, [ "submit", "reset" ]) !== -1 ? null != input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
	                        }
	                        delete input.inputmask.events[eventName];
	                    });
	                }
	            }
	        };
	        if (void 0 !== actionObj) switch (actionObj.action) {
	          case "isComplete":
	            return el = actionObj.el, isComplete(getBuffer());

	          case "unmaskedvalue":
	            return el = actionObj.el, void 0 !== el && void 0 !== el.inputmask ? (maskset = el.inputmask.maskset, 
	            opts = el.inputmask.opts, isRTL = el.inputmask.isRTL) : (valueBuffer = actionObj.value, 
	            opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(valueBuffer, opts) || valueBuffer : valueBuffer).split(""), 
	            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite(void 0, getBuffer(), 0, opts)), 
	            unmaskedvalue(el);

	          case "mask":
	            el = actionObj.el, maskset = el.inputmask.maskset, opts = el.inputmask.opts, isRTL = el.inputmask.isRTL, 
	            mask(el);
	            break;

	          case "format":
	            return opts.numericInput && (isRTL = !0), valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(actionObj.value, opts) || actionObj.value : actionObj.value).split(""), 
	            checkVal(void 0, !1, !1, isRTL ? valueBuffer.reverse() : valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite(void 0, getBuffer(), 0, opts), 
	            actionObj.metadata ? {
	                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
	                metadata: maskScope({
	                    action: "getmetadata"
	                }, maskset, opts)
	            } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

	          case "isValid":
	            opts.numericInput && (isRTL = !0), actionObj.value ? (valueBuffer = actionObj.value.split(""), 
	            checkVal(void 0, !1, !0, isRTL ? valueBuffer.reverse() : valueBuffer)) : actionObj.value = getBuffer().join("");
	            for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; lmib > rl && !isMask(lmib); lmib--) ;
	            return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === getBuffer().join("");

	          case "getemptymask":
	            return getBufferTemplate().join("");

	          case "remove":
	            el = actionObj.el, $el = $(el), maskset = el.inputmask.maskset, opts = el.inputmask.opts, 
	            el.inputmask._valueSet(unmaskedvalue(el)), EventRuler.off(el);
	            var valueProperty;
	            Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), 
	            valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
	                get: el.inputmask.__valueGet,
	                set: el.inputmask.__valueSet,
	                configurable: !0
	            })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), 
	            el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0;
	            break;

	          case "getmetadata":
	            if ($.isArray(maskset.metadata)) {
	                for (var alternation, lvp = getLastValidPosition(void 0, !0), firstAlt = lvp; firstAlt >= 0; firstAlt--) if (getMaskSet().validPositions[firstAlt] && void 0 !== getMaskSet().validPositions[firstAlt].alternation) {
	                    alternation = getMaskSet().validPositions[firstAlt].alternation;
	                    break;
	                }
	                return void 0 !== alternation ? maskset.metadata[getMaskSet().validPositions[firstAlt].locator[alternation]] : [];
	            }
	            return maskset.metadata;
	        }
	    }
	    Inputmask.prototype = {
	        defaults: {
	            placeholder: "_",
	            optionalmarker: {
	                start: "[",
	                end: "]"
	            },
	            quantifiermarker: {
	                start: "{",
	                end: "}"
	            },
	            groupmarker: {
	                start: "(",
	                end: ")"
	            },
	            alternatormarker: "|",
	            escapeChar: "\\",
	            mask: null,
	            oncomplete: $.noop,
	            onincomplete: $.noop,
	            oncleared: $.noop,
	            repeat: 0,
	            greedy: !0,
	            autoUnmask: !1,
	            removeMaskOnSubmit: !1,
	            clearMaskOnLostFocus: !0,
	            insertMode: !0,
	            clearIncomplete: !1,
	            aliases: {},
	            alias: null,
	            onKeyDown: $.noop,
	            onBeforeMask: null,
	            onBeforePaste: function(pastedValue, opts) {
	                return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask(pastedValue, opts) : pastedValue;
	            },
	            onBeforeWrite: null,
	            onUnMask: null,
	            showMaskOnFocus: !0,
	            showMaskOnHover: !0,
	            onKeyValidation: $.noop,
	            skipOptionalPartCharacter: " ",
	            showTooltip: !1,
	            tooltip: void 0,
	            numericInput: !1,
	            rightAlign: !1,
	            undoOnEscape: !0,
	            radixPoint: "",
	            radixPointDefinitionSymbol: void 0,
	            groupSeparator: "",
	            keepStatic: null,
	            positionCaretOnTab: !0,
	            tabThrough: !1,
	            supportsInputType: [ "text", "tel", "password" ],
	            definitions: {
	                "9": {
	                    validator: "[0-9]",
	                    cardinality: 1,
	                    definitionSymbol: "*"
	                },
	                a: {
	                    validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
	                    cardinality: 1,
	                    definitionSymbol: "*"
	                },
	                "*": {
	                    validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
	                    cardinality: 1
	                }
	            },
	            ignorables: [ 8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123 ],
	            isComplete: null,
	            canClearPosition: $.noop,
	            postValidation: null,
	            staticDefinitionSymbol: void 0,
	            jitMasking: !1,
	            nullable: !0,
	            inputEventOnly: !1,
	            noValuePatching: !1,
	            positionCaretOnClick: "lvp",
	            casing: null,
	            inputmode: "verbatim",
	            colorMask: !1,
	            androidHack: !1
	        },
	        masksCache: {},
	        mask: function(elems) {
	            var that = this;
	            return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), 
	            elems = elems.nodeName ? [ elems ] : elems, $.each(elems, function(ndx, el) {
	                var scopedOpts = $.extend(!0, {}, that.opts);
	                importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute);
	                var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
	                void 0 !== maskset && (void 0 !== el.inputmask && el.inputmask.remove(), el.inputmask = new Inputmask(), 
	                el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), 
	                el.inputmask.el = el, el.inputmask.maskset = maskset, el.inputmask.isRTL = !1, $.data(el, "_inputmask_opts", scopedOpts), 
	                maskScope({
	                    action: "mask",
	                    el: el
	                }));
	            }), elems && elems[0] ? elems[0].inputmask || this : this;
	        },
	        option: function(options, noremask) {
	            return "string" == typeof options ? this.opts[options] : "object" == typeof options ? ($.extend(this.userOptions, options), 
	            this.el && noremask !== !0 && this.mask(this.el), this) : void 0;
	        },
	        unmaskedvalue: function(value) {
	            return maskScope({
	                action: "unmaskedvalue",
	                el: this.el,
	                value: value
	            }, this.el && this.el.inputmask ? this.el.inputmask.maskset : generateMaskSet(this.opts, this.noMasksCache), this.opts);
	        },
	        remove: function() {
	            if (this.el) return maskScope({
	                action: "remove",
	                el: this.el
	            }), this.el.inputmask = void 0, this.el;
	        },
	        getemptymask: function() {
	            return maskScope({
	                action: "getemptymask"
	            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
	        },
	        hasMaskedValue: function() {
	            return !this.opts.autoUnmask;
	        },
	        isComplete: function() {
	            return maskScope({
	                action: "isComplete",
	                el: this.el
	            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
	        },
	        getmetadata: function() {
	            return maskScope({
	                action: "getmetadata"
	            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
	        },
	        isValid: function(value) {
	            return maskScope({
	                action: "isValid",
	                value: value
	            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
	        },
	        format: function(value, metadata) {
	            return maskScope({
	                action: "format",
	                value: value,
	                metadata: metadata
	            }, this.maskset || generateMaskSet(this.opts, this.noMasksCache), this.opts);
	        }
	    }, Inputmask.extendDefaults = function(options) {
	        $.extend(!0, Inputmask.prototype.defaults, options);
	    }, Inputmask.extendDefinitions = function(definition) {
	        $.extend(!0, Inputmask.prototype.defaults.definitions, definition);
	    }, Inputmask.extendAliases = function(alias) {
	        $.extend(!0, Inputmask.prototype.defaults.aliases, alias);
	    }, Inputmask.format = function(value, options, metadata) {
	        return Inputmask(options).format(value, metadata);
	    }, Inputmask.unmask = function(value, options) {
	        return Inputmask(options).unmaskedvalue(value);
	    }, Inputmask.isValid = function(value, options) {
	        return Inputmask(options).isValid(value);
	    }, Inputmask.remove = function(elems) {
	        $.each(elems, function(ndx, el) {
	            el.inputmask && el.inputmask.remove();
	        });
	    }, Inputmask.escapeRegex = function(str) {
	        var specials = [ "/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^" ];
	        return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
	    }, Inputmask.keyCode = {
	        ALT: 18,
	        BACKSPACE: 8,
	        BACKSPACE_SAFARI: 127,
	        CAPS_LOCK: 20,
	        COMMA: 188,
	        COMMAND: 91,
	        COMMAND_LEFT: 91,
	        COMMAND_RIGHT: 93,
	        CONTROL: 17,
	        DELETE: 46,
	        DOWN: 40,
	        END: 35,
	        ENTER: 13,
	        ESCAPE: 27,
	        HOME: 36,
	        INSERT: 45,
	        LEFT: 37,
	        MENU: 93,
	        NUMPAD_ADD: 107,
	        NUMPAD_DECIMAL: 110,
	        NUMPAD_DIVIDE: 111,
	        NUMPAD_ENTER: 108,
	        NUMPAD_MULTIPLY: 106,
	        NUMPAD_SUBTRACT: 109,
	        PAGE_DOWN: 34,
	        PAGE_UP: 33,
	        PERIOD: 190,
	        RIGHT: 39,
	        SHIFT: 16,
	        SPACE: 32,
	        TAB: 9,
	        UP: 38,
	        WINDOWS: 91,
	        X: 88
	    }, Inputmask.analyseMask = function(mask, opts) {
	        function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
	            this.matches = [], this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, 
	            this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, 
	            this.quantifier = {
	                min: 1,
	                max: 1
	            };
	        }
	        function insertTestDefinition(mtoken, element, position) {
	            var maskdef = opts.definitions[element];
	            position = void 0 !== position ? position : mtoken.matches.length;
	            var prevMatch = mtoken.matches[position - 1];
	            if (maskdef && !escaped) {
	                maskdef.placeholder = $.isFunction(maskdef.placeholder) ? maskdef.placeholder(opts) : maskdef.placeholder;
	                for (var prevalidators = maskdef.prevalidator, prevalidatorsL = prevalidators ? prevalidators.length : 0, i = 1; i < maskdef.cardinality; i++) {
	                    var prevalidator = prevalidatorsL >= i ? prevalidators[i - 1] : [], validator = prevalidator.validator, cardinality = prevalidator.cardinality;
	                    mtoken.matches.splice(position++, 0, {
	                        fn: validator ? "string" == typeof validator ? new RegExp(validator) : new function() {
	                            this.test = validator;
	                        }() : new RegExp("."),
	                        cardinality: cardinality ? cardinality : 1,
	                        optionality: mtoken.isOptional,
	                        newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
	                        casing: maskdef.casing,
	                        def: maskdef.definitionSymbol || element,
	                        placeholder: maskdef.placeholder,
	                        nativeDef: element
	                    }), prevMatch = mtoken.matches[position - 1];
	                }
	                mtoken.matches.splice(position++, 0, {
	                    fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator) : new function() {
	                        this.test = maskdef.validator;
	                    }() : new RegExp("."),
	                    cardinality: maskdef.cardinality,
	                    optionality: mtoken.isOptional,
	                    newBlockMarker: void 0 === prevMatch || prevMatch.def !== (maskdef.definitionSymbol || element),
	                    casing: maskdef.casing,
	                    def: maskdef.definitionSymbol || element,
	                    placeholder: maskdef.placeholder,
	                    nativeDef: element
	                });
	            } else mtoken.matches.splice(position++, 0, {
	                fn: null,
	                cardinality: 0,
	                optionality: mtoken.isOptional,
	                newBlockMarker: void 0 === prevMatch || prevMatch.def !== element,
	                casing: null,
	                def: opts.staticDefinitionSymbol || element,
	                placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
	                nativeDef: element
	            }), escaped = !1;
	        }
	        function verifyGroupMarker(lastMatch, isOpenGroup) {
	            lastMatch.isGroup && (lastMatch.isGroup = !1, insertTestDefinition(lastMatch, opts.groupmarker.start, 0), 
	            isOpenGroup !== !0 && insertTestDefinition(lastMatch, opts.groupmarker.end));
	        }
	        function maskCurrentToken(m, currentToken, lastMatch, extraCondition) {
	            currentToken.matches.length > 0 && (void 0 === extraCondition || extraCondition) && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
	            verifyGroupMarker(lastMatch)), insertTestDefinition(currentToken, m);
	        }
	        function defaultCase() {
	            if (openenings.length > 0) {
	                if (currentOpeningToken = openenings[openenings.length - 1], maskCurrentToken(m, currentOpeningToken, lastMatch, !currentOpeningToken.isAlternator), 
	                currentOpeningToken.isAlternator) {
	                    alternator = openenings.pop();
	                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
	                    openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
	                    currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
	                }
	            } else maskCurrentToken(m, currentToken, lastMatch);
	        }
	        function reverseTokens(maskToken) {
	            function reverseStatic(st) {
	                return st === opts.optionalmarker.start ? st = opts.optionalmarker.end : st === opts.optionalmarker.end ? st = opts.optionalmarker.start : st === opts.groupmarker.start ? st = opts.groupmarker.end : st === opts.groupmarker.end && (st = opts.groupmarker.start), 
	                st;
	            }
	            maskToken.matches = maskToken.matches.reverse();
	            for (var match in maskToken.matches) {
	                var intMatch = parseInt(match);
	                if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
	                    var qt = maskToken.matches[match];
	                    maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
	                }
	                void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
	            }
	            return maskToken;
	        }
	        for (var match, m, openingToken, currentOpeningToken, alternator, lastMatch, groupToken, tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g, escaped = !1, currentToken = new MaskToken(), openenings = [], maskTokens = []; match = tokenizer.exec(mask); ) if (m = match[0], 
	        escaped) defaultCase(); else switch (m.charAt(0)) {
	          case opts.escapeChar:
	            escaped = !0;
	            break;

	          case opts.optionalmarker.end:
	          case opts.groupmarker.end:
	            if (openingToken = openenings.pop(), void 0 !== openingToken) if (openenings.length > 0) {
	                if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), 
	                currentOpeningToken.isAlternator) {
	                    alternator = openenings.pop();
	                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1;
	                    openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
	                    currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
	                }
	            } else currentToken.matches.push(openingToken); else defaultCase();
	            break;

	          case opts.optionalmarker.start:
	            openenings.push(new MaskToken((!1), (!0)));
	            break;

	          case opts.groupmarker.start:
	            openenings.push(new MaskToken((!0)));
	            break;

	          case opts.quantifiermarker.start:
	            var quantifier = new MaskToken((!1), (!1), (!0));
	            m = m.replace(/[{}]/g, "");
	            var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
	            if ("*" !== mq1 && "+" !== mq1 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
	                min: mq0,
	                max: mq1
	            }, openenings.length > 0) {
	                var matches = openenings[openenings.length - 1].matches;
	                match = matches.pop(), match.isGroup || (groupToken = new MaskToken((!0)), groupToken.matches.push(match), 
	                match = groupToken), matches.push(match), matches.push(quantifier);
	            } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new MaskToken((!0)), 
	            groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
	            currentToken.matches.push(quantifier);
	            break;

	          case opts.alternatormarker:
	            openenings.length > 0 ? (currentOpeningToken = openenings[openenings.length - 1], 
	            lastMatch = currentOpeningToken.matches.pop()) : lastMatch = currentToken.matches.pop(), 
	            lastMatch.isAlternator ? openenings.push(lastMatch) : (alternator = new MaskToken((!1), (!1), (!1), (!0)), 
	            alternator.matches.push(lastMatch), openenings.push(alternator));
	            break;

	          default:
	            defaultCase();
	        }
	        for (;openenings.length > 0; ) openingToken = openenings.pop(), verifyGroupMarker(openingToken, !0), 
	        currentToken.matches.push(openingToken);
	        return currentToken.matches.length > 0 && (lastMatch = currentToken.matches[currentToken.matches.length - 1], 
	        verifyGroupMarker(lastMatch), maskTokens.push(currentToken)), opts.numericInput && reverseTokens(maskTokens[0]), 
	        maskTokens;
	    };
	    var ua = navigator.userAgent, mobile = /mobile/i.test(ua), iemobile = /iemobile/i.test(ua), iphone = /iphone/i.test(ua) && !iemobile, android = /android/i.test(ua) && !iemobile;
	    return window.Inputmask = Inputmask, Inputmask;
	}(jQuery), function($, Inputmask) {
	    return void 0 === $.fn.inputmask && ($.fn.inputmask = function(fn, options) {
	        var nptmask, input = this[0];
	        if (void 0 === options && (options = {}), "string" == typeof fn) switch (fn) {
	          case "unmaskedvalue":
	            return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

	          case "remove":
	            return this.each(function() {
	                this.inputmask && this.inputmask.remove();
	            });

	          case "getemptymask":
	            return input && input.inputmask ? input.inputmask.getemptymask() : "";

	          case "hasMaskedValue":
	            return !(!input || !input.inputmask) && input.inputmask.hasMaskedValue();

	          case "isComplete":
	            return !input || !input.inputmask || input.inputmask.isComplete();

	          case "getmetadata":
	            return input && input.inputmask ? input.inputmask.getmetadata() : void 0;

	          case "setvalue":
	            $(input).val(options), input && void 0 === input.inputmask && $(input).triggerHandler("setvalue");
	            break;

	          case "option":
	            if ("string" != typeof options) return this.each(function() {
	                if (void 0 !== this.inputmask) return this.inputmask.option(options);
	            });
	            if (input && void 0 !== input.inputmask) return input.inputmask.option(options);
	            break;

	          default:
	            return options.alias = fn, nptmask = new Inputmask(options), this.each(function() {
	                nptmask.mask(this);
	            });
	        } else {
	            if ("object" == typeof fn) return nptmask = new Inputmask(fn), void 0 === fn.mask && void 0 === fn.alias ? this.each(function() {
	                return void 0 !== this.inputmask ? this.inputmask.option(fn) : void nptmask.mask(this);
	            }) : this.each(function() {
	                nptmask.mask(this);
	            });
	            if (void 0 === fn) return this.each(function() {
	                nptmask = new Inputmask(options), nptmask.mask(this);
	            });
	        }
	    }), $.fn.inputmask;
	}(jQuery, Inputmask), function($, Inputmask) {
	    return Inputmask.extendDefinitions({
	        h: {
	            validator: "[01][0-9]|2[0-3]",
	            cardinality: 2,
	            prevalidator: [ {
	                validator: "[0-2]",
	                cardinality: 1
	            } ]
	        },
	        s: {
	            validator: "[0-5][0-9]",
	            cardinality: 2,
	            prevalidator: [ {
	                validator: "[0-5]",
	                cardinality: 1
	            } ]
	        },
	        d: {
	            validator: "0[1-9]|[12][0-9]|3[01]",
	            cardinality: 2,
	            prevalidator: [ {
	                validator: "[0-3]",
	                cardinality: 1
	            } ]
	        },
	        m: {
	            validator: "0[1-9]|1[012]",
	            cardinality: 2,
	            prevalidator: [ {
	                validator: "[01]",
	                cardinality: 1
	            } ]
	        },
	        y: {
	            validator: "(19|20)\\d{2}",
	            cardinality: 4,
	            prevalidator: [ {
	                validator: "[12]",
	                cardinality: 1
	            }, {
	                validator: "(19|20)",
	                cardinality: 2
	            }, {
	                validator: "(19|20)\\d",
	                cardinality: 3
	            } ]
	        }
	    }), Inputmask.extendAliases({
	        "dd/mm/yyyy": {
	            mask: "1/2/y",
	            placeholder: "dd/mm/yyyy",
	            regex: {
	                val1pre: new RegExp("[0-3]"),
	                val1: new RegExp("0[1-9]|[12][0-9]|3[01]"),
	                val2pre: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[1-9]|[12][0-9]|3[01])" + escapedSeparator + "[01])");
	                },
	                val2: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[1-9]|[12][0-9])" + escapedSeparator + "(0[1-9]|1[012]))|(30" + escapedSeparator + "(0[13-9]|1[012]))|(31" + escapedSeparator + "(0[13578]|1[02]))");
	                }
	            },
	            leapday: "29/02/",
	            separator: "/",
	            yearrange: {
	                minyear: 1900,
	                maxyear: 2099
	            },
	            isInYearRange: function(chrs, minyear, maxyear) {
	                if (isNaN(chrs)) return !1;
	                var enteredyear = parseInt(chrs.concat(minyear.toString().slice(chrs.length))), enteredyear2 = parseInt(chrs.concat(maxyear.toString().slice(chrs.length)));
	                return !isNaN(enteredyear) && (minyear <= enteredyear && enteredyear <= maxyear) || !isNaN(enteredyear2) && (minyear <= enteredyear2 && enteredyear2 <= maxyear);
	            },
	            determinebaseyear: function(minyear, maxyear, hint) {
	                var currentyear = new Date().getFullYear();
	                if (minyear > currentyear) return minyear;
	                if (maxyear < currentyear) {
	                    for (var maxYearPrefix = maxyear.toString().slice(0, 2), maxYearPostfix = maxyear.toString().slice(2, 4); maxyear < maxYearPrefix + hint; ) maxYearPrefix--;
	                    var maxxYear = maxYearPrefix + maxYearPostfix;
	                    return minyear > maxxYear ? minyear : maxxYear;
	                }
	                if (minyear <= currentyear && currentyear <= maxyear) {
	                    for (var currentYearPrefix = currentyear.toString().slice(0, 2); maxyear < currentYearPrefix + hint; ) currentYearPrefix--;
	                    var currentYearAndHint = currentYearPrefix + hint;
	                    return currentYearAndHint < minyear ? minyear : currentYearAndHint;
	                }
	                return currentyear;
	            },
	            onKeyDown: function(e, buffer, caretPos, opts) {
	                var $input = $(this);
	                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
	                    var today = new Date();
	                    $input.val(today.getDate().toString() + (today.getMonth() + 1).toString() + today.getFullYear().toString()), 
	                    $input.trigger("setvalue");
	                }
	            },
	            getFrontValue: function(mask, buffer, opts) {
	                for (var start = 0, length = 0, i = 0; i < mask.length && "2" !== mask.charAt(i); i++) {
	                    var definition = opts.definitions[mask.charAt(i)];
	                    definition ? (start += length, length = definition.cardinality) : length++;
	                }
	                return buffer.join("").substr(start, length);
	            },
	            definitions: {
	                "1": {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        var isValid = opts.regex.val1.test(chrs);
	                        return strict || isValid || chrs.charAt(1) !== opts.separator && "-./".indexOf(chrs.charAt(1)) === -1 || !(isValid = opts.regex.val1.test("0" + chrs.charAt(0))) ? isValid : (maskset.buffer[pos - 1] = "0", 
	                        {
	                            refreshFromBuffer: {
	                                start: pos - 1,
	                                end: pos
	                            },
	                            pos: pos,
	                            c: chrs.charAt(0)
	                        });
	                    },
	                    cardinality: 2,
	                    prevalidator: [ {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            var pchrs = chrs;
	                            isNaN(maskset.buffer[pos + 1]) || (pchrs += maskset.buffer[pos + 1]);
	                            var isValid = 1 === pchrs.length ? opts.regex.val1pre.test(pchrs) : opts.regex.val1.test(pchrs);
	                            if (!strict && !isValid) {
	                                if (isValid = opts.regex.val1.test(chrs + "0")) return maskset.buffer[pos] = chrs, 
	                                maskset.buffer[++pos] = "0", {
	                                    pos: pos,
	                                    c: "0"
	                                };
	                                if (isValid = opts.regex.val1.test("0" + chrs)) return maskset.buffer[pos] = "0", 
	                                pos++, {
	                                    pos: pos
	                                };
	                            }
	                            return isValid;
	                        },
	                        cardinality: 1
	                    } ]
	                },
	                "2": {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
	                        frontValue.indexOf(opts.placeholder[0]) !== -1 && (frontValue = "01" + opts.separator);
	                        var isValid = opts.regex.val2(opts.separator).test(frontValue + chrs);
	                        if (!strict && !isValid && (chrs.charAt(1) === opts.separator || "-./".indexOf(chrs.charAt(1)) !== -1) && (isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
	                        {
	                            refreshFromBuffer: {
	                                start: pos - 1,
	                                end: pos
	                            },
	                            pos: pos,
	                            c: chrs.charAt(0)
	                        };
	                        if (opts.mask.indexOf("2") === opts.mask.length - 1 && isValid) {
	                            var dayMonthValue = maskset.buffer.join("").substr(4, 4) + chrs;
	                            if (dayMonthValue !== opts.leapday) return !0;
	                            var year = parseInt(maskset.buffer.join("").substr(0, 4), 10);
	                            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	                        }
	                        return isValid;
	                    },
	                    cardinality: 2,
	                    prevalidator: [ {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            isNaN(maskset.buffer[pos + 1]) || (chrs += maskset.buffer[pos + 1]);
	                            var frontValue = opts.getFrontValue(maskset.mask, maskset.buffer, opts);
	                            frontValue.indexOf(opts.placeholder[0]) !== -1 && (frontValue = "01" + opts.separator);
	                            var isValid = 1 === chrs.length ? opts.regex.val2pre(opts.separator).test(frontValue + chrs) : opts.regex.val2(opts.separator).test(frontValue + chrs);
	                            return strict || isValid || !(isValid = opts.regex.val2(opts.separator).test(frontValue + "0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
	                            pos++, {
	                                pos: pos
	                            });
	                        },
	                        cardinality: 1
	                    } ]
	                },
	                y: {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        if (opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
	                            var dayMonthValue = maskset.buffer.join("").substr(0, 6);
	                            if (dayMonthValue !== opts.leapday) return !0;
	                            var year = parseInt(chrs, 10);
	                            return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	                        }
	                        return !1;
	                    },
	                    cardinality: 4,
	                    prevalidator: [ {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
	                            if (!strict && !isValid) {
	                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 1);
	                                if (isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
	                                {
	                                    pos: pos
	                                };
	                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs + "0").toString().slice(0, 2), 
	                                isValid = opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(0), 
	                                maskset.buffer[pos++] = yearPrefix.charAt(1), {
	                                    pos: pos
	                                };
	                            }
	                            return isValid;
	                        },
	                        cardinality: 1
	                    }, {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            var isValid = opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
	                            if (!strict && !isValid) {
	                                var yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2);
	                                if (isValid = opts.isInYearRange(chrs[0] + yearPrefix[1] + chrs[1], opts.yearrange.minyear, opts.yearrange.maxyear)) return maskset.buffer[pos++] = yearPrefix.charAt(1), 
	                                {
	                                    pos: pos
	                                };
	                                if (yearPrefix = opts.determinebaseyear(opts.yearrange.minyear, opts.yearrange.maxyear, chrs).toString().slice(0, 2), 
	                                opts.isInYearRange(yearPrefix + chrs, opts.yearrange.minyear, opts.yearrange.maxyear)) {
	                                    var dayMonthValue = maskset.buffer.join("").substr(0, 6);
	                                    if (dayMonthValue !== opts.leapday) isValid = !0; else {
	                                        var year = parseInt(chrs, 10);
	                                        isValid = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
	                                    }
	                                } else isValid = !1;
	                                if (isValid) return maskset.buffer[pos - 1] = yearPrefix.charAt(0), maskset.buffer[pos++] = yearPrefix.charAt(1), 
	                                maskset.buffer[pos++] = chrs.charAt(0), {
	                                    refreshFromBuffer: {
	                                        start: pos - 3,
	                                        end: pos
	                                    },
	                                    pos: pos
	                                };
	                            }
	                            return isValid;
	                        },
	                        cardinality: 2
	                    }, {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            return opts.isInYearRange(chrs, opts.yearrange.minyear, opts.yearrange.maxyear);
	                        },
	                        cardinality: 3
	                    } ]
	                }
	            },
	            insertMode: !1,
	            autoUnmask: !1
	        },
	        "mm/dd/yyyy": {
	            placeholder: "mm/dd/yyyy",
	            alias: "dd/mm/yyyy",
	            regex: {
	                val2pre: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
	                },
	                val2: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
	                },
	                val1pre: new RegExp("[01]"),
	                val1: new RegExp("0[1-9]|1[012]")
	            },
	            leapday: "02/29/",
	            onKeyDown: function(e, buffer, caretPos, opts) {
	                var $input = $(this);
	                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
	                    var today = new Date();
	                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
	                    $input.trigger("setvalue");
	                }
	            }
	        },
	        "yyyy/mm/dd": {
	            mask: "y/1/2",
	            placeholder: "yyyy/mm/dd",
	            alias: "mm/dd/yyyy",
	            leapday: "/02/29",
	            onKeyDown: function(e, buffer, caretPos, opts) {
	                var $input = $(this);
	                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
	                    var today = new Date();
	                    $input.val(today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString()), 
	                    $input.trigger("setvalue");
	                }
	            }
	        },
	        "dd.mm.yyyy": {
	            mask: "1.2.y",
	            placeholder: "dd.mm.yyyy",
	            leapday: "29.02.",
	            separator: ".",
	            alias: "dd/mm/yyyy"
	        },
	        "dd-mm-yyyy": {
	            mask: "1-2-y",
	            placeholder: "dd-mm-yyyy",
	            leapday: "29-02-",
	            separator: "-",
	            alias: "dd/mm/yyyy"
	        },
	        "mm.dd.yyyy": {
	            mask: "1.2.y",
	            placeholder: "mm.dd.yyyy",
	            leapday: "02.29.",
	            separator: ".",
	            alias: "mm/dd/yyyy"
	        },
	        "mm-dd-yyyy": {
	            mask: "1-2-y",
	            placeholder: "mm-dd-yyyy",
	            leapday: "02-29-",
	            separator: "-",
	            alias: "mm/dd/yyyy"
	        },
	        "yyyy.mm.dd": {
	            mask: "y.1.2",
	            placeholder: "yyyy.mm.dd",
	            leapday: ".02.29",
	            separator: ".",
	            alias: "yyyy/mm/dd"
	        },
	        "yyyy-mm-dd": {
	            mask: "y-1-2",
	            placeholder: "yyyy-mm-dd",
	            leapday: "-02-29",
	            separator: "-",
	            alias: "yyyy/mm/dd"
	        },
	        datetime: {
	            mask: "1/2/y h:s",
	            placeholder: "dd/mm/yyyy hh:mm",
	            alias: "dd/mm/yyyy",
	            regex: {
	                hrspre: new RegExp("[012]"),
	                hrs24: new RegExp("2[0-4]|1[3-9]"),
	                hrs: new RegExp("[01][0-9]|2[0-4]"),
	                ampm: new RegExp("^[a|p|A|P][m|M]"),
	                mspre: new RegExp("[0-5]"),
	                ms: new RegExp("[0-5][0-9]")
	            },
	            timeseparator: ":",
	            hourFormat: "24",
	            definitions: {
	                h: {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        if ("24" === opts.hourFormat && 24 === parseInt(chrs, 10)) return maskset.buffer[pos - 1] = "0", 
	                        maskset.buffer[pos] = "0", {
	                            refreshFromBuffer: {
	                                start: pos - 1,
	                                end: pos
	                            },
	                            c: "0"
	                        };
	                        var isValid = opts.regex.hrs.test(chrs);
	                        if (!strict && !isValid && (chrs.charAt(1) === opts.timeseparator || "-.:".indexOf(chrs.charAt(1)) !== -1) && (isValid = opts.regex.hrs.test("0" + chrs.charAt(0)))) return maskset.buffer[pos - 1] = "0", 
	                        maskset.buffer[pos] = chrs.charAt(0), pos++, {
	                            refreshFromBuffer: {
	                                start: pos - 2,
	                                end: pos
	                            },
	                            pos: pos,
	                            c: opts.timeseparator
	                        };
	                        if (isValid && "24" !== opts.hourFormat && opts.regex.hrs24.test(chrs)) {
	                            var tmp = parseInt(chrs, 10);
	                            return 24 === tmp ? (maskset.buffer[pos + 5] = "a", maskset.buffer[pos + 6] = "m") : (maskset.buffer[pos + 5] = "p", 
	                            maskset.buffer[pos + 6] = "m"), tmp -= 12, tmp < 10 ? (maskset.buffer[pos] = tmp.toString(), 
	                            maskset.buffer[pos - 1] = "0") : (maskset.buffer[pos] = tmp.toString().charAt(1), 
	                            maskset.buffer[pos - 1] = tmp.toString().charAt(0)), {
	                                refreshFromBuffer: {
	                                    start: pos - 1,
	                                    end: pos + 6
	                                },
	                                c: maskset.buffer[pos]
	                            };
	                        }
	                        return isValid;
	                    },
	                    cardinality: 2,
	                    prevalidator: [ {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            var isValid = opts.regex.hrspre.test(chrs);
	                            return strict || isValid || !(isValid = opts.regex.hrs.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
	                            pos++, {
	                                pos: pos
	                            });
	                        },
	                        cardinality: 1
	                    } ]
	                },
	                s: {
	                    validator: "[0-5][0-9]",
	                    cardinality: 2,
	                    prevalidator: [ {
	                        validator: function(chrs, maskset, pos, strict, opts) {
	                            var isValid = opts.regex.mspre.test(chrs);
	                            return strict || isValid || !(isValid = opts.regex.ms.test("0" + chrs)) ? isValid : (maskset.buffer[pos] = "0", 
	                            pos++, {
	                                pos: pos
	                            });
	                        },
	                        cardinality: 1
	                    } ]
	                },
	                t: {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        return opts.regex.ampm.test(chrs + "m");
	                    },
	                    casing: "lower",
	                    cardinality: 1
	                }
	            },
	            insertMode: !1,
	            autoUnmask: !1
	        },
	        datetime12: {
	            mask: "1/2/y h:s t\\m",
	            placeholder: "dd/mm/yyyy hh:mm xm",
	            alias: "datetime",
	            hourFormat: "12"
	        },
	        "mm/dd/yyyy hh:mm xm": {
	            mask: "1/2/y h:s t\\m",
	            placeholder: "mm/dd/yyyy hh:mm xm",
	            alias: "datetime12",
	            regex: {
	                val2pre: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[13-9]|1[012])" + escapedSeparator + "[0-3])|(02" + escapedSeparator + "[0-2])");
	                },
	                val2: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[13-9]|1[012])" + escapedSeparator + "30)|((0[13578]|1[02])" + escapedSeparator + "31)");
	                },
	                val1pre: new RegExp("[01]"),
	                val1: new RegExp("0[1-9]|1[012]")
	            },
	            leapday: "02/29/",
	            onKeyDown: function(e, buffer, caretPos, opts) {
	                var $input = $(this);
	                if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
	                    var today = new Date();
	                    $input.val((today.getMonth() + 1).toString() + today.getDate().toString() + today.getFullYear().toString()), 
	                    $input.trigger("setvalue");
	                }
	            }
	        },
	        "hh:mm t": {
	            mask: "h:s t\\m",
	            placeholder: "hh:mm xm",
	            alias: "datetime",
	            hourFormat: "12"
	        },
	        "h:s t": {
	            mask: "h:s t\\m",
	            placeholder: "hh:mm xm",
	            alias: "datetime",
	            hourFormat: "12"
	        },
	        "hh:mm:ss": {
	            mask: "h:s:s",
	            placeholder: "hh:mm:ss",
	            alias: "datetime",
	            autoUnmask: !1
	        },
	        "hh:mm": {
	            mask: "h:s",
	            placeholder: "hh:mm",
	            alias: "datetime",
	            autoUnmask: !1
	        },
	        date: {
	            alias: "dd/mm/yyyy"
	        },
	        "mm/yyyy": {
	            mask: "1/y",
	            placeholder: "mm/yyyy",
	            leapday: "donotuse",
	            separator: "/",
	            alias: "mm/dd/yyyy"
	        },
	        shamsi: {
	            regex: {
	                val2pre: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "[0-3])");
	                },
	                val2: function(separator) {
	                    var escapedSeparator = Inputmask.escapeRegex.call(this, separator);
	                    return new RegExp("((0[1-9]|1[012])" + escapedSeparator + "(0[1-9]|[12][0-9]))|((0[1-9]|1[012])" + escapedSeparator + "30)|((0[1-6])" + escapedSeparator + "31)");
	                },
	                val1pre: new RegExp("[01]"),
	                val1: new RegExp("0[1-9]|1[012]")
	            },
	            yearrange: {
	                minyear: 1300,
	                maxyear: 1499
	            },
	            mask: "y/1/2",
	            leapday: "/12/30",
	            placeholder: "yyyy/mm/dd",
	            alias: "mm/dd/yyyy",
	            clearIncomplete: !0
	        }
	    }), Inputmask;
	}(jQuery, Inputmask), function($, Inputmask) {
	    return Inputmask.extendDefinitions({
	        A: {
	            validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
	            cardinality: 1,
	            casing: "upper"
	        },
	        "&": {
	            validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
	            cardinality: 1,
	            casing: "upper"
	        },
	        "#": {
	            validator: "[0-9A-Fa-f]",
	            cardinality: 1,
	            casing: "upper"
	        }
	    }), Inputmask.extendAliases({
	        url: {
	            definitions: {
	                i: {
	                    validator: ".",
	                    cardinality: 1
	                }
	            },
	            mask: "(\\http://)|(\\http\\s://)|(ftp://)|(ftp\\s://)i{+}",
	            insertMode: !1,
	            autoUnmask: !1,
	            inputmode: "url"
	        },
	        ip: {
	            mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
	            definitions: {
	                i: {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        return pos - 1 > -1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, 
	                        chrs = pos - 2 > -1 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : chrs = "00" + chrs, 
	                        new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
	                    },
	                    cardinality: 1
	                }
	            },
	            onUnMask: function(maskedValue, unmaskedValue, opts) {
	                return maskedValue;
	            },
	            inputmode: "numeric"
	        },
	        email: {
	            mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
	            greedy: !1,
	            onBeforePaste: function(pastedValue, opts) {
	                return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
	            },
	            definitions: {
	                "*": {
	                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
	                    cardinality: 1,
	                    casing: "lower"
	                },
	                "-": {
	                    validator: "[0-9A-Za-z-]",
	                    cardinality: 1,
	                    casing: "lower"
	                }
	            },
	            onUnMask: function(maskedValue, unmaskedValue, opts) {
	                return maskedValue;
	            },
	            inputmode: "email"
	        },
	        mac: {
	            mask: "##:##:##:##:##:##"
	        },
	        vin: {
	            mask: "V{13}9{4}",
	            definitions: {
	                V: {
	                    validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
	                    cardinality: 1,
	                    casing: "upper"
	                }
	            },
	            clearIncomplete: !0,
	            autoUnmask: !0
	        }
	    }), Inputmask;
	}(jQuery, Inputmask), function($, Inputmask) {
	    return Inputmask.extendAliases({
	        numeric: {
	            mask: function(opts) {
	                function autoEscape(txt) {
	                    for (var escapedTxt = "", i = 0; i < txt.length; i++) escapedTxt += opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? "\\" + txt.charAt(i) : txt.charAt(i);
	                    return escapedTxt;
	                }
	                if (0 !== opts.repeat && isNaN(opts.integerDigits) && (opts.integerDigits = opts.repeat), 
	                opts.repeat = 0, opts.groupSeparator === opts.radixPoint && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), 
	                " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), opts.autoGroup = opts.autoGroup && "" !== opts.groupSeparator, 
	                opts.autoGroup && ("string" == typeof opts.groupSize && isFinite(opts.groupSize) && (opts.groupSize = parseInt(opts.groupSize)), 
	                isFinite(opts.integerDigits))) {
	                    var seps = Math.floor(opts.integerDigits / opts.groupSize), mod = opts.integerDigits % opts.groupSize;
	                    opts.integerDigits = parseInt(opts.integerDigits) + (0 === mod ? seps - 1 : seps), 
	                    opts.integerDigits < 1 && (opts.integerDigits = "*");
	                }
	                opts.placeholder.length > 1 && (opts.placeholder = opts.placeholder.charAt(0)), 
	                "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && opts.integerOptional === !1 && (opts.positionCaretOnClick = "lvp"), 
	                opts.definitions[";"] = opts.definitions["~"], opts.definitions[";"].definitionSymbol = "~", 
	                opts.numericInput === !0 && (opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, 
	                opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts.decimalProtect = !1);
	                var mask = "[+]";
	                if (mask += autoEscape(opts.prefix), mask += opts.integerOptional === !0 ? "~{1," + opts.integerDigits + "}" : "~{" + opts.integerDigits + "}", 
	                void 0 !== opts.digits) {
	                    opts.decimalProtect && (opts.radixPointDefinitionSymbol = ":");
	                    var dq = opts.digits.toString().split(",");
	                    isFinite(dq[0] && dq[1] && isFinite(dq[1])) ? mask += (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}" : (isNaN(opts.digits) || parseInt(opts.digits) > 0) && (mask += opts.digitsOptional ? "[" + (opts.decimalProtect ? ":" : opts.radixPoint) + ";{1," + opts.digits + "}]" : (opts.decimalProtect ? ":" : opts.radixPoint) + ";{" + opts.digits + "}");
	                }
	                return mask += autoEscape(opts.suffix), mask += "[-]", opts.greedy = !1, null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
	                "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, "."))), 
	                null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
	                "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, "."))), 
	                mask;
	            },
	            placeholder: "",
	            greedy: !1,
	            digits: "*",
	            digitsOptional: !0,
	            radixPoint: ".",
	            positionCaretOnClick: "radixFocus",
	            groupSize: 3,
	            groupSeparator: "",
	            autoGroup: !1,
	            allowPlus: !0,
	            allowMinus: !0,
	            negationSymbol: {
	                front: "-",
	                back: ""
	            },
	            integerDigits: "+",
	            integerOptional: !0,
	            prefix: "",
	            suffix: "",
	            rightAlign: !0,
	            decimalProtect: !0,
	            min: null,
	            max: null,
	            step: 1,
	            insertMode: !0,
	            autoUnmask: !1,
	            unmaskAsNumber: !1,
	            inputmode: "numeric",
	            postFormat: function(buffer, pos, opts) {
	                opts.numericInput === !0 && (buffer = buffer.reverse(), isFinite(pos) && (pos = buffer.join("").length - pos - 1));
	                var i, l;
	                pos = pos >= buffer.length ? buffer.length - 1 : pos < 0 ? 0 : pos;
	                var charAtPos = buffer[pos], cbuf = buffer.slice();
	                charAtPos === opts.groupSeparator && (cbuf.splice(pos--, 1), charAtPos = cbuf[pos]);
	                var isNegative = cbuf.join("").match(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)));
	                isNegative = null !== isNegative && 1 === isNegative.length, pos > (isNegative ? opts.negationSymbol.front.length : 0) + opts.prefix.length && pos < cbuf.length - opts.suffix.length && (cbuf[pos] = "!");
	                var bufVal = cbuf.join(""), bufValOrigin = cbuf.join();
	                if (isNegative && (bufVal = bufVal.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), ""), 
	                bufVal = bufVal.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "")), 
	                bufVal = bufVal.replace(new RegExp(Inputmask.escapeRegex(opts.suffix) + "$"), ""), 
	                bufVal = bufVal.replace(new RegExp("^" + Inputmask.escapeRegex(opts.prefix)), ""), 
	                bufVal.length > 0 && opts.autoGroup || bufVal.indexOf(opts.groupSeparator) !== -1) {
	                    var escapedGroupSeparator = Inputmask.escapeRegex(opts.groupSeparator);
	                    bufVal = bufVal.replace(new RegExp(escapedGroupSeparator, "g"), "");
	                    var radixSplit = bufVal.split(charAtPos === opts.radixPoint ? "!" : opts.radixPoint);
	                    if (bufVal = "" === opts.radixPoint ? bufVal : radixSplit[0], charAtPos !== opts.negationSymbol.front && (bufVal = bufVal.replace("!", "?")), 
	                    bufVal.length > opts.groupSize) for (var reg = new RegExp("([-+]?[\\d?]+)([\\d?]{" + opts.groupSize + "})"); reg.test(bufVal) && "" !== opts.groupSeparator; ) bufVal = bufVal.replace(reg, "$1" + opts.groupSeparator + "$2"), 
	                    bufVal = bufVal.replace(opts.groupSeparator + opts.groupSeparator, opts.groupSeparator);
	                    bufVal = bufVal.replace("?", "!"), "" !== opts.radixPoint && radixSplit.length > 1 && (bufVal += (charAtPos === opts.radixPoint ? "!" : opts.radixPoint) + radixSplit[1]);
	                }
	                bufVal = opts.prefix + bufVal + opts.suffix, isNegative && (bufVal = opts.negationSymbol.front + bufVal + opts.negationSymbol.back);
	                var needsRefresh = bufValOrigin !== bufVal.split("").join(), newPos = $.inArray("!", bufVal);
	                if (newPos === -1 && (newPos = pos), needsRefresh) {
	                    for (buffer.length = bufVal.length, i = 0, l = bufVal.length; i < l; i++) buffer[i] = bufVal.charAt(i);
	                    buffer[newPos] = charAtPos;
	                }
	                return newPos = opts.numericInput && isFinite(pos) ? buffer.join("").length - newPos - 1 : newPos, 
	                opts.numericInput && (buffer = buffer.reverse(), $.inArray(opts.radixPoint, buffer) < newPos && buffer.join("").length - opts.suffix.length !== newPos && (newPos -= 1)), 
	                {
	                    pos: newPos,
	                    refreshFromBuffer: needsRefresh,
	                    buffer: buffer,
	                    isNegative: isNegative
	                };
	            },
	            onBeforeWrite: function(e, buffer, caretPos, opts) {
	                var rslt;
	                if (e && ("blur" === e.type || "checkval" === e.type || "keydown" === e.type)) {
	                    var maskedValue = opts.numericInput ? buffer.slice().reverse().join("") : buffer.join(""), processValue = maskedValue.replace(opts.prefix, "");
	                    processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
	                    "," === opts.radixPoint && (processValue = processValue.replace(opts.radixPoint, "."));
	                    var isNegative = processValue.match(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"));
	                    if (isNegative = null !== isNegative && 1 === isNegative.length, processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), ""), 
	                    processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), 
	                    isNaN(opts.placeholder) && (processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "")), 
	                    processValue = processValue === opts.negationSymbol.front ? processValue + "0" : processValue, 
	                    "" !== processValue && isFinite(processValue)) {
	                        var floatValue = parseFloat(processValue), signedFloatValue = isNegative ? floatValue * -1 : floatValue;
	                        if (null !== opts.min && isFinite(opts.min) && signedFloatValue < parseFloat(opts.min) ? (floatValue = Math.abs(opts.min), 
	                        isNegative = opts.min < 0, maskedValue = void 0) : null !== opts.max && isFinite(opts.max) && signedFloatValue > parseFloat(opts.max) && (floatValue = Math.abs(opts.max), 
	                        isNegative = opts.max < 0, maskedValue = void 0), processValue = floatValue.toString().replace(".", opts.radixPoint).split(""), 
	                        isFinite(opts.digits)) {
	                            var radixPosition = $.inArray(opts.radixPoint, processValue), rpb = $.inArray(opts.radixPoint, maskedValue);
	                            radixPosition === -1 && (processValue.push(opts.radixPoint), radixPosition = processValue.length - 1);
	                            for (var i = 1; i <= opts.digits; i++) opts.digitsOptional || void 0 !== processValue[radixPosition + i] && processValue[radixPosition + i] !== opts.placeholder.charAt(0) ? rpb !== -1 && void 0 !== maskedValue[rpb + i] && (processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i]) : processValue[radixPosition + i] = "0";
	                            processValue[processValue.length - 1] === opts.radixPoint && delete processValue[processValue.length - 1];
	                        }
	                        if (floatValue.toString() !== processValue && floatValue.toString() + "." !== processValue || isNegative) return processValue = (opts.prefix + processValue.join("")).split(""), 
	                        !isNegative || 0 === floatValue && "blur" === e.type || (processValue.unshift(opts.negationSymbol.front), 
	                        processValue.push(opts.negationSymbol.back)), opts.numericInput && (processValue = processValue.reverse()), 
	                        rslt = opts.postFormat(processValue, opts.numericInput ? caretPos : caretPos - 1, opts), 
	                        rslt.buffer && (rslt.refreshFromBuffer = rslt.buffer.join("") !== buffer.join("")), 
	                        rslt;
	                    }
	                }
	                if (opts.autoGroup) return rslt = opts.postFormat(buffer, opts.numericInput ? caretPos : caretPos - 1, opts), 
	                rslt.caret = caretPos < (rslt.isNegative ? opts.negationSymbol.front.length : 0) + opts.prefix.length || caretPos > rslt.buffer.length - (rslt.isNegative ? opts.negationSymbol.back.length : 0) ? rslt.pos : rslt.pos + 1, 
	                rslt;
	            },
	            regex: {
	                integerPart: function(opts) {
	                    return new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
	                },
	                integerNPart: function(opts) {
	                    return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
	                }
	            },
	            signHandler: function(chrs, maskset, pos, strict, opts) {
	                if (!strict && opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) {
	                    var matchRslt = maskset.buffer.join("").match(opts.regex.integerPart(opts));
	                    if (matchRslt && matchRslt[0].length > 0) return maskset.buffer[matchRslt.index] === ("-" === chrs ? "+" : opts.negationSymbol.front) ? "-" === chrs ? "" !== opts.negationSymbol.back ? {
	                        pos: 0,
	                        c: opts.negationSymbol.front,
	                        remove: 0,
	                        caret: pos,
	                        insert: {
	                            pos: maskset.buffer.length - 1,
	                            c: opts.negationSymbol.back
	                        }
	                    } : {
	                        pos: 0,
	                        c: opts.negationSymbol.front,
	                        remove: 0,
	                        caret: pos
	                    } : "" !== opts.negationSymbol.back ? {
	                        pos: 0,
	                        c: "+",
	                        remove: [ 0, maskset.buffer.length - 1 ],
	                        caret: pos
	                    } : {
	                        pos: 0,
	                        c: "+",
	                        remove: 0,
	                        caret: pos
	                    } : maskset.buffer[0] === ("-" === chrs ? opts.negationSymbol.front : "+") ? "-" === chrs && "" !== opts.negationSymbol.back ? {
	                        remove: [ 0, maskset.buffer.length - 1 ],
	                        caret: pos - 1
	                    } : {
	                        remove: 0,
	                        caret: pos - 1
	                    } : "-" === chrs ? "" !== opts.negationSymbol.back ? {
	                        pos: 0,
	                        c: opts.negationSymbol.front,
	                        caret: pos + 1,
	                        insert: {
	                            pos: maskset.buffer.length,
	                            c: opts.negationSymbol.back
	                        }
	                    } : {
	                        pos: 0,
	                        c: opts.negationSymbol.front,
	                        caret: pos + 1
	                    } : {
	                        pos: 0,
	                        c: chrs,
	                        caret: pos + 1
	                    };
	                }
	                return !1;
	            },
	            radixHandler: function(chrs, maskset, pos, strict, opts) {
	                if (!strict && opts.numericInput !== !0 && chrs === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
	                    var radixPos = $.inArray(opts.radixPoint, maskset.buffer), integerValue = maskset.buffer.join("").match(opts.regex.integerPart(opts));
	                    if (radixPos !== -1 && maskset.validPositions[radixPos]) return maskset.validPositions[radixPos - 1] ? {
	                        caret: radixPos + 1
	                    } : {
	                        pos: integerValue.index,
	                        c: integerValue[0],
	                        caret: radixPos + 1
	                    };
	                    if (!integerValue || "0" === integerValue[0] && integerValue.index + 1 !== pos) return maskset.buffer[integerValue ? integerValue.index : pos] = "0", 
	                    {
	                        pos: (integerValue ? integerValue.index : pos) + 1,
	                        c: opts.radixPoint
	                    };
	                }
	                return !1;
	            },
	            leadingZeroHandler: function(chrs, maskset, pos, strict, opts, isSelection) {
	                if (!strict) {
	                    var buffer = maskset.buffer.slice("");
	                    if (buffer.splice(0, opts.prefix.length), buffer.splice(buffer.length - opts.suffix.length, opts.suffix.length), 
	                    opts.numericInput === !0) {
	                        var buffer = buffer.reverse(), bufferChar = buffer[0];
	                        if ("0" === bufferChar && void 0 === maskset.validPositions[pos - 1]) return {
	                            pos: pos,
	                            remove: buffer.length - 1
	                        };
	                    } else {
	                        pos -= opts.prefix.length;
	                        var radixPosition = $.inArray(opts.radixPoint, buffer), matchRslt = buffer.slice(0, radixPosition !== -1 ? radixPosition : void 0).join("").match(opts.regex.integerNPart(opts));
	                        if (matchRslt && (radixPosition === -1 || pos <= radixPosition)) {
	                            var decimalPart = radixPosition === -1 ? 0 : parseInt(buffer.slice(radixPosition + 1).join(""));
	                            if (0 === matchRslt[0].indexOf("" !== opts.placeholder ? opts.placeholder.charAt(0) : "0") && (matchRslt.index + 1 === pos || isSelection !== !0 && 0 === decimalPart)) return maskset.buffer.splice(matchRslt.index + opts.prefix.length, 1), 
	                            {
	                                pos: matchRslt.index + opts.prefix.length,
	                                remove: matchRslt.index + opts.prefix.length
	                            };
	                            if ("0" === chrs && pos <= matchRslt.index && matchRslt[0] !== opts.groupSeparator) return !1;
	                        }
	                    }
	                }
	                return !0;
	            },
	            definitions: {
	                "~": {
	                    validator: function(chrs, maskset, pos, strict, opts, isSelection) {
	                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
	                        if (!isValid && (isValid = opts.radixHandler(chrs, maskset, pos, strict, opts), 
	                        !isValid && (isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs), 
	                        isValid === !0 && (isValid = opts.leadingZeroHandler(chrs, maskset, pos, strict, opts, isSelection), 
	                        isValid === !0)))) {
	                            var radixPosition = $.inArray(opts.radixPoint, maskset.buffer);
	                            isValid = radixPosition !== -1 && (opts.digitsOptional === !1 || maskset.validPositions[pos]) && opts.numericInput !== !0 && pos > radixPosition && !strict ? {
	                                pos: pos,
	                                remove: pos
	                            } : {
	                                pos: pos
	                            };
	                        }
	                        return isValid;
	                    },
	                    cardinality: 1
	                },
	                "+": {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
	                        return !isValid && (strict && opts.allowMinus && chrs === opts.negationSymbol.front || opts.allowMinus && "-" === chrs || opts.allowPlus && "+" === chrs) && (isValid = !(!strict && "-" === chrs) || ("" !== opts.negationSymbol.back ? {
	                            pos: pos,
	                            c: "-" === chrs ? opts.negationSymbol.front : "+",
	                            caret: pos + 1,
	                            insert: {
	                                pos: maskset.buffer.length,
	                                c: opts.negationSymbol.back
	                            }
	                        } : {
	                            pos: pos,
	                            c: "-" === chrs ? opts.negationSymbol.front : "+",
	                            caret: pos + 1
	                        })), isValid;
	                    },
	                    cardinality: 1,
	                    placeholder: ""
	                },
	                "-": {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
	                        return !isValid && strict && opts.allowMinus && chrs === opts.negationSymbol.back && (isValid = !0), 
	                        isValid;
	                    },
	                    cardinality: 1,
	                    placeholder: ""
	                },
	                ":": {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        var isValid = opts.signHandler(chrs, maskset, pos, strict, opts);
	                        if (!isValid) {
	                            var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
	                            isValid = new RegExp(radix).test(chrs), isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint && (isValid = {
	                                caret: pos + 1
	                            });
	                        }
	                        return isValid;
	                    },
	                    cardinality: 1,
	                    placeholder: function(opts) {
	                        return opts.radixPoint;
	                    }
	                }
	            },
	            onUnMask: function(maskedValue, unmaskedValue, opts) {
	                if ("" === unmaskedValue && opts.nullable === !0) return unmaskedValue;
	                var processValue = maskedValue.replace(opts.prefix, "");
	                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
	                opts.unmaskAsNumber ? ("" !== opts.radixPoint && processValue.indexOf(opts.radixPoint) !== -1 && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), 
	                Number(processValue)) : processValue;
	            },
	            isComplete: function(buffer, opts) {
	                var maskedValue = buffer.join(""), bufClone = buffer.slice();
	                if (opts.postFormat(bufClone, 0, opts), bufClone.join("") !== maskedValue) return !1;
	                var processValue = maskedValue.replace(opts.prefix, "");
	                return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), 
	                "," === opts.radixPoint && (processValue = processValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), 
	                isFinite(processValue);
	            },
	            onBeforeMask: function(initialValue, opts) {
	                if (opts.numericInput === !0 && (initialValue = initialValue.split("").reverse().join("")), 
	                "" !== opts.radixPoint && isFinite(initialValue)) initialValue = initialValue.toString().replace(".", opts.radixPoint); else {
	                    var kommaMatches = initialValue.match(/,/g), dotMatches = initialValue.match(/\./g);
	                    dotMatches && kommaMatches ? dotMatches.length > kommaMatches.length ? (initialValue = initialValue.replace(/\./g, ""), 
	                    initialValue = initialValue.replace(",", opts.radixPoint)) : kommaMatches.length > dotMatches.length ? (initialValue = initialValue.replace(/,/g, ""), 
	                    initialValue = initialValue.replace(".", opts.radixPoint)) : initialValue = initialValue.indexOf(".") < initialValue.indexOf(",") ? initialValue.replace(/\./g, "") : initialValue = initialValue.replace(/,/g, "") : initialValue = initialValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
	                }
	                if (0 === opts.digits && (initialValue.indexOf(".") !== -1 ? initialValue = initialValue.substring(0, initialValue.indexOf(".")) : initialValue.indexOf(",") !== -1 && (initialValue = initialValue.substring(0, initialValue.indexOf(",")))), 
	                "" !== opts.radixPoint && isFinite(opts.digits) && initialValue.indexOf(opts.radixPoint) !== -1) {
	                    var valueParts = initialValue.split(opts.radixPoint), decPart = valueParts[1].match(new RegExp("\\d*"))[0];
	                    if (parseInt(opts.digits) < decPart.toString().length) {
	                        var digitsFactor = Math.pow(10, parseInt(opts.digits));
	                        initialValue = initialValue.replace(Inputmask.escapeRegex(opts.radixPoint), "."), 
	                        initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor, 
	                        initialValue = initialValue.toString().replace(".", opts.radixPoint);
	                    }
	                }
	                return opts.numericInput === !0 && (initialValue = initialValue.split("").reverse().join("")), 
	                initialValue.toString();
	            },
	            canClearPosition: function(maskset, position, lvp, strict, opts) {
	                var positionInput = maskset.validPositions[position].input, canClear = positionInput !== opts.radixPoint || null !== maskset.validPositions[position].match.fn && opts.decimalProtect === !1 || isFinite(positionInput) || position === lvp || positionInput === opts.groupSeparator || positionInput === opts.negationSymbol.front || positionInput === opts.negationSymbol.back;
	                return canClear;
	            },
	            onKeyDown: function(e, buffer, caretPos, opts) {
	                var $input = $(this);
	                if (e.ctrlKey) switch (e.keyCode) {
	                  case Inputmask.keyCode.UP:
	                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue");
	                    break;

	                  case Inputmask.keyCode.DOWN:
	                    $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue");
	                }
	            }
	        },
	        currency: {
	            prefix: "$ ",
	            groupSeparator: ",",
	            alias: "numeric",
	            placeholder: "0",
	            autoGroup: !0,
	            digits: 2,
	            digitsOptional: !1,
	            clearMaskOnLostFocus: !1
	        },
	        decimal: {
	            alias: "numeric"
	        },
	        integer: {
	            alias: "numeric",
	            digits: 0,
	            radixPoint: ""
	        },
	        percentage: {
	            alias: "numeric",
	            digits: 2,
	            radixPoint: ".",
	            placeholder: "0",
	            autoGroup: !1,
	            min: 0,
	            max: 100,
	            suffix: " %",
	            allowPlus: !1,
	            allowMinus: !1
	        }
	    }), Inputmask;
	}(jQuery, Inputmask), function($, Inputmask) {
	    return Inputmask.extendAliases({
	        abstractphone: {
	            countrycode: "",
	            phoneCodes: [],
	            mask: function(opts) {
	                opts.definitions = {
	                    "#": opts.definitions[9]
	                };
	                var masks = opts.phoneCodes.sort(function(a, b) {
	                    var maska = (a.mask || a).replace(/#/g, "9").replace(/[\)]/, "9").replace(/[\+\(\)#-]/g, ""), maskb = (b.mask || b).replace(/#/g, "9").replace(/[\)]/, "9").replace(/[\+\(\)#-]/g, ""), maskas = (a.mask || a).split("#")[0], maskbs = (b.mask || b).split("#")[0];
	                    return 0 === maskbs.indexOf(maskas) ? -1 : 0 === maskas.indexOf(maskbs) ? 1 : maska.localeCompare(maskb);
	                });
	                return masks;
	            },
	            keepStatic: !0,
	            onBeforeMask: function(value, opts) {
	                var processedValue = value.replace(/^0{1,2}/, "").replace(/[\s]/g, "");
	                return (processedValue.indexOf(opts.countrycode) > 1 || processedValue.indexOf(opts.countrycode) === -1) && (processedValue = "+" + opts.countrycode + processedValue), 
	                processedValue;
	            },
	            onUnMask: function(maskedValue, unmaskedValue, opts) {
	                return unmaskedValue;
	            },
	            inputmode: "tel"
	        }
	    }), Inputmask;
	}(jQuery, Inputmask), function($, Inputmask) {
	    return Inputmask.extendAliases({
	        Regex: {
	            mask: "r",
	            greedy: !1,
	            repeat: "*",
	            regex: null,
	            regexTokens: null,
	            tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
	            quantifierFilter: /[0-9]+[^,]/,
	            isComplete: function(buffer, opts) {
	                return new RegExp(opts.regex).test(buffer.join(""));
	            },
	            definitions: {
	                r: {
	                    validator: function(chrs, maskset, pos, strict, opts) {
	                        function RegexToken(isGroup, isQuantifier) {
	                            this.matches = [], this.isGroup = isGroup || !1, this.isQuantifier = isQuantifier || !1, 
	                            this.quantifier = {
	                                min: 1,
	                                max: 1
	                            }, this.repeaterPart = void 0;
	                        }
	                        function analyseRegex() {
	                            var match, m, currentToken = new RegexToken(), opengroups = [];
	                            for (opts.regexTokens = []; match = opts.tokenizer.exec(opts.regex); ) switch (m = match[0], 
	                            m.charAt(0)) {
	                              case "(":
	                                opengroups.push(new RegexToken((!0)));
	                                break;

	                              case ")":
	                                groupToken = opengroups.pop(), opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(groupToken) : currentToken.matches.push(groupToken);
	                                break;

	                              case "{":
	                              case "+":
	                              case "*":
	                                var quantifierToken = new RegexToken((!1), (!0));
	                                m = m.replace(/[{}]/g, "");
	                                var mq = m.split(","), mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]), mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
	                                if (quantifierToken.quantifier = {
	                                    min: mq0,
	                                    max: mq1
	                                }, opengroups.length > 0) {
	                                    var matches = opengroups[opengroups.length - 1].matches;
	                                    match = matches.pop(), match.isGroup || (groupToken = new RegexToken((!0)), groupToken.matches.push(match), 
	                                    match = groupToken), matches.push(match), matches.push(quantifierToken);
	                                } else match = currentToken.matches.pop(), match.isGroup || (groupToken = new RegexToken((!0)), 
	                                groupToken.matches.push(match), match = groupToken), currentToken.matches.push(match), 
	                                currentToken.matches.push(quantifierToken);
	                                break;

	                              default:
	                                opengroups.length > 0 ? opengroups[opengroups.length - 1].matches.push(m) : currentToken.matches.push(m);
	                            }
	                            currentToken.matches.length > 0 && opts.regexTokens.push(currentToken);
	                        }
	                        function validateRegexToken(token, fromGroup) {
	                            var isvalid = !1;
	                            fromGroup && (regexPart += "(", openGroupCount++);
	                            for (var mndx = 0; mndx < token.matches.length; mndx++) {
	                                var matchToken = token.matches[mndx];
	                                if (matchToken.isGroup === !0) isvalid = validateRegexToken(matchToken, !0); else if (matchToken.isQuantifier === !0) {
	                                    var crrntndx = $.inArray(matchToken, token.matches), matchGroup = token.matches[crrntndx - 1], regexPartBak = regexPart;
	                                    if (isNaN(matchToken.quantifier.max)) {
	                                        for (;matchToken.repeaterPart && matchToken.repeaterPart !== regexPart && matchToken.repeaterPart.length > regexPart.length && !(isvalid = validateRegexToken(matchGroup, !0)); ) ;
	                                        isvalid = isvalid || validateRegexToken(matchGroup, !0), isvalid && (matchToken.repeaterPart = regexPart), 
	                                        regexPart = regexPartBak + matchToken.quantifier.max;
	                                    } else {
	                                        for (var i = 0, qm = matchToken.quantifier.max - 1; i < qm && !(isvalid = validateRegexToken(matchGroup, !0)); i++) ;
	                                        regexPart = regexPartBak + "{" + matchToken.quantifier.min + "," + matchToken.quantifier.max + "}";
	                                    }
	                                } else if (void 0 !== matchToken.matches) for (var k = 0; k < matchToken.length && !(isvalid = validateRegexToken(matchToken[k], fromGroup)); k++) ; else {
	                                    var testExp;
	                                    if ("[" == matchToken.charAt(0)) {
	                                        testExp = regexPart, testExp += matchToken;
	                                        for (var j = 0; j < openGroupCount; j++) testExp += ")";
	                                        var exp = new RegExp("^(" + testExp + ")$");
	                                        isvalid = exp.test(bufferStr);
	                                    } else for (var l = 0, tl = matchToken.length; l < tl; l++) if ("\\" !== matchToken.charAt(l)) {
	                                        testExp = regexPart, testExp += matchToken.substr(0, l + 1), testExp = testExp.replace(/\|$/, "");
	                                        for (var j = 0; j < openGroupCount; j++) testExp += ")";
	                                        var exp = new RegExp("^(" + testExp + ")$");
	                                        if (isvalid = exp.test(bufferStr)) break;
	                                    }
	                                    regexPart += matchToken;
	                                }
	                                if (isvalid) break;
	                            }
	                            return fromGroup && (regexPart += ")", openGroupCount--), isvalid;
	                        }
	                        var bufferStr, groupToken, cbuffer = maskset.buffer.slice(), regexPart = "", isValid = !1, openGroupCount = 0;
	                        null === opts.regexTokens && analyseRegex(), cbuffer.splice(pos, 0, chrs), bufferStr = cbuffer.join("");
	                        for (var i = 0; i < opts.regexTokens.length; i++) {
	                            var regexToken = opts.regexTokens[i];
	                            if (isValid = validateRegexToken(regexToken, regexToken.isGroup)) break;
	                        }
	                        return isValid;
	                    },
	                    cardinality: 1
	                }
	            }
	        }
	    }), Inputmask;
	}(jQuery, Inputmask);

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	 *  jquery-maskmoney - v3.0.2
	 *  jQuery plugin to mask data entry in the input text in the form of money (currency)
	 *  https://github.com/plentz/jquery-maskmoney
	 *
	 *  Made by Diego Plentz
	 *  Under MIT License (https://raw.github.com/plentz/jquery-maskmoney/master/LICENSE)
	 */
	(function ($) {
	    "use strict";
	    if (!$.browser) {
	        $.browser = {};
	        $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	        $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	        $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	        $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	    }

	    var methods = {
	        destroy : function () {
	            $(this).unbind(".maskMoney");

	            if ($.browser.msie) {
	                this.onpaste = null;
	            }
	            return this;
	        },

	        mask : function (value) {
	            return this.each(function () {
	                var $this = $(this),
	                    decimalSize;
	                if (typeof value === "number") {
	                    $this.trigger("mask");
	                    decimalSize = $($this.val().split(/\D/)).last()[0].length;
	                    value = value.toFixed(decimalSize);
	                    $this.val(value);
	                }
	                return $this.trigger("mask");
	            });
	        },

	        unmasked : function () {
	            return this.map(function () {
	                var value = ($(this).val() || "0"),
	                    isNegative = value.indexOf("-") !== -1,
	                    decimalPart;
	                // get the last position of the array that is a number(coercion makes "" to be evaluated as false)
	                $(value.split(/\D/).reverse()).each(function (index, element) {
	                    if(element) {
	                        decimalPart = element;
	                        return false;
	                   }
	                });
	                value = value.replace(/\D/g, "");
	                value = value.replace(new RegExp(decimalPart + "$"), "." + decimalPart);
	                if (isNegative) {
	                    value = "-" + value;
	                }
	                return parseFloat(value);
	            });
	        },

	        init : function (settings) {
	            settings = $.extend({
	                prefix: "",
	                suffix: "",
	                affixesStay: true,
	                thousands: ",",
	                decimal: ".",
	                precision: 2,
	                allowZero: false,
	                allowNegative: false
	            }, settings);

	            return this.each(function () {
	                var $input = $(this),
	                    onFocusValue;

	                // data-* api
	                settings = $.extend(settings, $input.data());

	                function getInputSelection() {
	                    var el = $input.get(0),
	                        start = 0,
	                        end = 0,
	                        normalizedValue,
	                        range,
	                        textInputRange,
	                        len,
	                        endRange;

	                    if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
	                        start = el.selectionStart;
	                        end = el.selectionEnd;
	                    } else {
	                        range = document.selection.createRange();

	                        if (range && range.parentElement() === el) {
	                            len = el.value.length;
	                            normalizedValue = el.value.replace(/\r\n/g, "\n");

	                            // Create a working TextRange that lives only in the input
	                            textInputRange = el.createTextRange();
	                            textInputRange.moveToBookmark(range.getBookmark());

	                            // Check if the start and end of the selection are at the very end
	                            // of the input, since moveStart/moveEnd doesn't return what we want
	                            // in those cases
	                            endRange = el.createTextRange();
	                            endRange.collapse(false);

	                            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
	                                start = end = len;
	                            } else {
	                                start = -textInputRange.moveStart("character", -len);
	                                start += normalizedValue.slice(0, start).split("\n").length - 1;

	                                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
	                                    end = len;
	                                } else {
	                                    end = -textInputRange.moveEnd("character", -len);
	                                    end += normalizedValue.slice(0, end).split("\n").length - 1;
	                                }
	                            }
	                        }
	                    }

	                    return {
	                        start: start,
	                        end: end
	                    };
	                } // getInputSelection

	                function canInputMoreNumbers() {
	                    var haventReachedMaxLength = !($input.val().length >= $input.attr("maxlength") && $input.attr("maxlength") >= 0),
	                        selection = getInputSelection(),
	                        start = selection.start,
	                        end = selection.end,
	                        haveNumberSelected = (selection.start !== selection.end && $input.val().substring(start, end).match(/\d/)) ? true : false,
	                        startWithZero = ($input.val().substring(0, 1) === "0");
	                    return haventReachedMaxLength || haveNumberSelected || startWithZero;
	                }

	                function setCursorPosition(pos) {
	                    $input.each(function (index, elem) {
	                        if (elem.setSelectionRange) {
	                            elem.focus();
	                            elem.setSelectionRange(pos, pos);
	                        } else if (elem.createTextRange) {
	                            var range = elem.createTextRange();
	                            range.collapse(true);
	                            range.moveEnd("character", pos);
	                            range.moveStart("character", pos);
	                            range.select();
	                        }
	                    });
	                }

	                function setSymbol(value) {
	                    var operator = "";
	                    if (value.indexOf("-") > -1) {
	                        value = value.replace("-", "");
	                        operator = "-";
	                    }
	                    return operator + settings.prefix + value + settings.suffix;
	                }

	                function maskValue(value) {
	                    var negative = (value.indexOf("-") > -1 && settings.allowNegative) ? "-" : "",
	                        onlyNumbers = value.replace(/[^0-9]/g, ""),
	                        integerPart = onlyNumbers.slice(0, onlyNumbers.length - settings.precision),
	                        newValue,
	                        decimalPart,
	                        leadingZeros;

	                    // remove initial zeros
	                    integerPart = integerPart.replace(/^0*/g, "");
	                    // put settings.thousands every 3 chars
	                    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, settings.thousands);
	                    if (integerPart === "") {
	                        integerPart = "0";
	                    }
	                    newValue = negative + integerPart;

	                    if (settings.precision > 0) {
	                        decimalPart = onlyNumbers.slice(onlyNumbers.length - settings.precision);
	                        leadingZeros = new Array((settings.precision + 1) - decimalPart.length).join(0);
	                        newValue += settings.decimal + leadingZeros + decimalPart;
	                    }
	                    return setSymbol(newValue);
	                }

	                function maskAndPosition(startPos) {
	                    var originalLen = $input.val().length,
	                        newLen;
	                    $input.val(maskValue($input.val()));
	                    newLen = $input.val().length;
	                    startPos = startPos - (originalLen - newLen);
	                    setCursorPosition(startPos);
	                }

	                function mask() {
	                    var value = $input.val();
	                    $input.val(maskValue(value));
	                }

	                function changeSign() {
	                    var inputValue = $input.val();
	                    if (settings.allowNegative) {
	                        if (inputValue !== "" && inputValue.charAt(0) === "-") {
	                            return inputValue.replace("-", "");
	                        } else {
	                            return "-" + inputValue;
	                        }
	                    } else {
	                        return inputValue;
	                    }
	                }

	                function preventDefault(e) {
	                    if (e.preventDefault) { //standard browsers
	                        e.preventDefault();
	                    } else { // old internet explorer
	                        e.returnValue = false;
	                    }
	                }

	                function keypressEvent(e) {
	                    e = e || window.event;
	                    var key = e.which || e.charCode || e.keyCode,
	                        keyPressedChar,
	                        selection,
	                        startPos,
	                        endPos,
	                        value;
	                    //added to handle an IE "special" event
	                    if (key === undefined) {
	                        return false;
	                    }

	                    // any key except the numbers 0-9
	                    if (key < 48 || key > 57) {
	                        // -(minus) key
	                        if (key === 45) {
	                            $input.val(changeSign());
	                            return false;
	                        // +(plus) key
	                        } else if (key === 43) {
	                            $input.val($input.val().replace("-", ""));
	                            return false;
	                        // enter key or tab key
	                        } else if (key === 13 || key === 9) {
	                            return true;
	                        } else if ($.browser.mozilla && (key === 37 || key === 39) && e.charCode === 0) {
	                            // needed for left arrow key or right arrow key with firefox
	                            // the charCode part is to avoid allowing "%"(e.charCode 0, e.keyCode 37)
	                            return true;
	                        } else { // any other key with keycode less than 48 and greater than 57
	                            preventDefault(e);
	                            return true;
	                        }
	                    } else if (!canInputMoreNumbers()) {
	                        return false;
	                    } else {
	                        preventDefault(e);

	                        keyPressedChar = String.fromCharCode(key);
	                        selection = getInputSelection();
	                        startPos = selection.start;
	                        endPos = selection.end;
	                        value = $input.val();
	                        $input.val(value.substring(0, startPos) + keyPressedChar + value.substring(endPos, value.length));
	                        maskAndPosition(startPos + 1);
	                        return false;
	                    }
	                }

	                function keydownEvent(e) {
	                    e = e || window.event;
	                    var key = e.which || e.charCode || e.keyCode,
	                        selection,
	                        startPos,
	                        endPos,
	                        value,
	                        lastNumber;
	                    //needed to handle an IE "special" event
	                    if (key === undefined) {
	                        return false;
	                    }

	                    selection = getInputSelection();
	                    startPos = selection.start;
	                    endPos = selection.end;

	                    if (key === 8 || key === 46 || key === 63272) { // backspace or delete key (with special case for safari)
	                        preventDefault(e);

	                        value = $input.val();
	                        // not a selection
	                        if (startPos === endPos) {
	                            // backspace
	                            if (key === 8) {
	                                if (settings.suffix === "") {
	                                    startPos -= 1;
	                                } else {
	                                    // needed to find the position of the last number to be erased
	                                    lastNumber = value.split("").reverse().join("").search(/\d/);
	                                    startPos = value.length - lastNumber - 1;
	                                    endPos = startPos + 1;
	                                }
	                            //delete
	                            } else {
	                                endPos += 1;
	                            }
	                        }

	                        $input.val(value.substring(0, startPos) + value.substring(endPos, value.length));

	                        maskAndPosition(startPos);
	                        return false;
	                    } else if (key === 9) { // tab key
	                        return true;
	                    } else { // any other key
	                        return true;
	                    }
	                }

	                function focusEvent() {
	                    onFocusValue = $input.val();
	                    mask();
	                    var input = $input.get(0),
	                        textRange;
	                    if (input.createTextRange) {
	                        textRange = input.createTextRange();
	                        textRange.collapse(false); // set the cursor at the end of the input
	                        textRange.select();
	                    }
	                }

	                function cutPasteEvent() {
	                    setTimeout(function() {
	                        mask();
	                    }, 0);
	                }

	                function getDefaultMask() {
	                    var n = parseFloat("0") / Math.pow(10, settings.precision);
	                    return (n.toFixed(settings.precision)).replace(new RegExp("\\.", "g"), settings.decimal);
	                }

	                function blurEvent(e) {
	                    if ($.browser.msie) {
	                        keypressEvent(e);
	                    }

	                    if ($input.val() === "" || $input.val() === setSymbol(getDefaultMask())) {
	                        if (!settings.allowZero) {
	                            $input.val("");
	                        } else if (!settings.affixesStay) {
	                            $input.val(getDefaultMask());
	                        } else {
	                            $input.val(setSymbol(getDefaultMask()));
	                        }
	                    } else {
	                        if (!settings.affixesStay) {
	                            var newValue = $input.val().replace(settings.prefix, "").replace(settings.suffix, "");
	                            $input.val(newValue);
	                        }
	                    }
	                    if ($input.val() !== onFocusValue) {
	                        $input.change();
	                    }
	                }

	                function clickEvent() {
	                    var input = $input.get(0),
	                        length;
	                    if (input.setSelectionRange) {
	                        length = $input.val().length;
	                        input.setSelectionRange(length, length);
	                    } else {
	                        $input.val($input.val());
	                    }
	                }

	                $input.unbind(".maskMoney");
	                $input.bind("keypress.maskMoney", keypressEvent);
	                $input.bind("keydown.maskMoney", keydownEvent);
	                $input.bind("blur.maskMoney", blurEvent);
	                $input.bind("focus.maskMoney", focusEvent);
	                $input.bind("click.maskMoney", clickEvent);
	                $input.bind("cut.maskMoney", cutPasteEvent);
	                $input.bind("paste.maskMoney", cutPasteEvent);
	                $input.bind("mask.maskMoney", mask);
	            });
	        }
	    };

	    $.fn.maskMoney = function (method) {
	        if (methods[method]) {
	            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	        } else if (typeof method === "object" || ! method) {
	            return methods.init.apply(this, arguments);
	        } else {
	            $.error("Method " +  method + " does not exist on jQuery.maskMoney");
	        }
	    };
	})(window.jQuery || window.Zepto);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var prompt_handler = __webpack_require__(5); 

	module.exports = function () {

	    $('.rad.y').on('click', function () {
	        $(this).prev('input').removeClass('unchecked');
	        $(this).prev('input').addClass('checked');
	        $(this).prev('input').attr('checked', true); 

			var id = $(this).attr('id'); 
			console.log($('#' + id + 'n').prev('input'))
			$('#' + id + 'n').prev('input').removeClass('checked'); 
			$('#' + id + 'n').prev('input').addClass('unchecked');
			$('#' + id + 'n').prev('input').removeAttr('checked');


		}); 
		
	    $('.rad.n').on('click', function () {
	        $(this).prev('input').removeClass('unchecked');
	        $(this).prev('input').addClass('checked');
	        $(this).prev('input').attr('checked', true);
				
			var id = $(this).attr('id'); 
			var new_id = id.replace('n', ''); 
			

			$('#' + new_id).prev('input').removeClass('checked');
			$('#' + new_id).prev('input').addClass('unchecked');
			$('#' + new_id).prev('input').removeAttr('checked');

		});

		$('.radio-inp').on('click', function () {
		    var r = $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.right');
		    var w = $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.wrong');

		    prompt_handler($(this), true); 
		})
		
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function (elem, flag) {

	    if (elem.hasClass('prompt_shown') && !elem.hasClass('multiprompt')) return false;

	    var wrap = elem.parent('form').parent('.active-wrap').parent('.input-wrap');
	    var container = elem.parent('form').parent('.active-wrap'); 
	    var q = container.attr('data-q'); 
	    var p = wrap.find('.prompt[data-q="' + q + '"]');

	    if (elem.hasClass('multiprompt')) {
	        p.find('span').html(elem.attr('data-prompt')); 
	    }

	    if (p.hasClass('radioprompt')) {
	        p.find('.y').trigger('click'); 
	    }

	    var ln = 200;
	    if (flag) {
	        ln = 400;
	    }

	        p.slideDown(ln, function () {
	            $(this).css({
	                'display': 'table'
	            });

	            $(this).find('span').animate({
	                opacity: 1
	            }, 200);
	        });
	    

	    
	    container.addClass('prompt_shown'); 

	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function () {

	    $('.addmask[data-maskval="cash"]').on('focus', function () {
	        $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true });
	    });

	    $('.addmask[data-maskval="nums"]').on('keydown', function (e) {
	        if (isNaN(parseInt(e.key)) &&  e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 13 && e.keyCode != 9 && !$(this).hasClass('mask2')) {
	            return false;
	        } else if (e.keyCode != 9 && $(this).hasClass('mask2')) {
	            $(this).removeClass('mask2'); 
	        } 
	    });

	    $('.addmask').on('input', function (e) {
	        

	        if ($(this).attr('data-masked') == '1') {
	            if ($(this).inputmask("isComplete")) {
	                $(this).removeClass('invalid')
	            } else {
	                    
	                if (!$(this).hasClass('invalid')) {
	                    
	                    $(this).addClass('invalid')
	                }
	            }
	            return false;
	        } 

	        var self = $(this);
	        e.preventDefault();
	        
	        if (self.attr('data-maskval') != 'nums' && self.val != '' && !self.hasClass('mask2')) {
	            self.addClass('invalid');
	        }

	        var maskval = $(this).attr('data-maskval');
	        var ct = $(this).parent('.form-input2').attr('data-category');

	        $(this).attr('data-masked', '1');

	        if (maskval != 'cash') {

	            if (maskval != '99/99/9999' && maskval != 'nums') {
	                $(this).inputmask({
	                    mask: maskval,
	                    showMaskOnHover: false,
	                    showMaskOnFocus: false,
	                    greedy: false,
	                    onincomplete: invalidMask,
	                    oncomplete: validMask
	                });
	            }
	            else if (maskval != 'nums') {
	                $(this).inputmask({
	                    mask: maskval,
	                    showMaskOnHover: false,
	                    showMaskOnFocus: false,
	                    greedy: false,
	                    placeholder: 'dd/mm/yyyy',
	                    onincomplete: invalidMask,
	                    oncomplete: validMask
	                });
	            }


	            function invalidMask() {
	                self.addClass('invalid')
	            }
	            function validMask() {

	                if (!self.hasClass('multi-zip')) {
	                    self.removeClass('invalid');
	                    if (typeof ct != 'undefined') {
	                        var err_p = $('.error[data-ct="' + ct + '"]');
	                        err_p.html('');
	                    }
	                }
	            }


	        } else {
	            $(this).maskMoney({ prefix: '$ ', allowNegative: true, thousands: ',', decimal: '.', affixesStay: true });
	        }

	       
	    });

	    $('.multi-zip').on('input', function () {
	        if ($(this).hasClass('mask2')) {
	            $(this).removeClass('mask2');
	            
	            $(this).removeClass('invalid'); 
	            return false; 
	        }
	        var v = $(this).val().split(' ');

	        var ct = $(this).parent('.form-input2').attr('data-category');

	        var isInvalid = false; 
	        for (var i = 0; i < v.length; i++) {
	            if (v[i].search('_') != -1) {
	                $(this).addClass('invalid');
	                isInvalid = true; 
	            } else if (v[i].length < 5) {
	                isInvalid = true;
	                $(this).addClass('invalid');
	            } 
	        }

	        var err_p = $('.error[data-ct="' + ct + '"]');
	        if (!isInvalid) {
	            $(this).removeClass('invalid');
	            err_p.html('')
	        } else {
	            err_p.html('form contains invalid data')
	        }
	    })
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var dropdown_handler = __webpack_require__(8); 
	var prompt_handler = __webpack_require__(5);


	module.exports = function () {
	    $('.form-input').on('focus', handle_input);

	    $('.form-input').on('input', handle_input);

	    $('.form-textarea').on('focus', handle_textarea);

	    $('.form-textarea').on('input', handle_textarea); 

	  
	 
	    $('*').attr('tabindex', -1); 
	    $('form').on('click', function () {

	        var id = $(this).attr('id'); 
	        $(this).find('.map-input').attr('tabindex', 1);

	        if (typeof id != 'undefined') {
	            $('form[id != "'+ id +'"]').attr('tabindex', -1); 
	        }
	    }) 

	    $('.name-wrap').find('input').attr('tabindex', '1');



	    function add_input() {

	        if (!$(this).hasClass('addshown') && $(this).hasClass('show-add')) {


	            var wrap = $(this).parent('.mock-input').parent('.input-wrap');
	            if (wrap.length == 0) {
	                wrap = $(this).parent('form').parent('.active-wrap').parent('.input-wrap');
	            }

	            var index = wrap.find('.hideadd').find('.add-btn').attr('data-index'); 
	            var lim = wrap.find('.hideadd').find('.add-btn').attr('data-lim'); 
	            if (typeof lim != 'undefined' && parseInt(index) < parseInt(lim)) {
	                wrap.find('.hideadd').slideDown(300);
	            } else if (typeof lim == 'undefined') {
	                wrap.find('.hideadd').slideDown(300);
	            } 
	            isAnimating = false;

	            $(this).addClass('addshown');
	            if ($(this).hasClass('drop')) {

	                dropdown_handler($(this));
	                isAnimating = false;
	                return true;
	            }
	        }
	    }

	    var handler_added = false;
	    if (!handler_added) {
	        handler_added = true; 
	        $('.rad').on('click', function () {
	            
	            var sub = $(this).attr('data-sub');
	            var cat = $(this).attr('data-category');

	            var wrap = $('.category-wrap[data-category="' + cat + '"]').find('.input-wrap[data-sub="' + sub + '"]');

	            var r = wrap.find('.right');

	            show(r);
	        });
	    } 


	    var isAnimating = false; 


	    function handle_input(e) {

	        var wrap = $(this).parent('form').parent('.active-wrap');
	        if (wrap.length == 0) {
	            wrap = $(this).parent('div').parent('form').parent('.active-wrap');
	        }

	        var sub = $(this).attr('data-sub');

	        var r = wrap.parent('.input-wrap').find('.right');
	        var w = wrap.parent('.input-wrap').find('.wrong');

	        if ($(this).hasClass('auto')) {
	            isAnimating2 = false;
	            $(this).removeClass('auto'); 
	        }

	        $(this).css({
	            'color': '#1f467d'
	        })

	        if (e.target.classList.contains('exp-drop')) {
	            dropdown_handler($(this));
	            return true;
	        }

	        if ($(this).hasClass('showprompt')) {
	            if (!$(this).hasClass('multiprompt')) {
	                $(this).removeClass('showprompt');
	            }
	            prompt_handler($(this));
	        } else if ($(this).parent('.name-wrap').hasClass('showprompt')) {
	            prompt_handler($(this).parent('.name-wrap'));
	        }

	        if ($(this).hasClass('exp-name')) {
	            isAnimating = false; 
	        }
	        if ($(this).hasClass('invalid')) {
	            isAnimating = false;
	        }

	        if (isAnimating) {
	            setTimeout(function() {
	                isAnimating = false; 
	            }, 100)
	            return true; 
	        }
	        else isAnimating = true; 


	        if ($(this).hasClass('input-cell')) {
	            isAnimating = false;
	            return true; 
	        }

	        add_input.call(this); 

	        if ($(this).hasClass('exp-name')) {
	            var w = $(this).parent('div').parent('.input-wrap').find('.wrong');
	            var r = $(this).parent('div').parent('.input-wrap').find('.right');

	            if (w.length == 0) {
	                w = $(this).parent('div').parent('form').parent('.active-wrap').parent('.input-wrap').find('.wrong');
	                r = $(this).parent('div').parent('form').parent('.active-wrap').parent('.input-wrap').find('.right');
	            }

	            var self = $(this);


	            var next = $(this).parent('.mock-input').next('.exp');
	            if (next.length == 0) {
	                next = $(this).parent('.mock-input').parent('form').find('.fullname');
	                next.css({
	                    'display': 'none'
	                })
	                next.slideDown(300, function () {

	                    next.find('input').eq(0).trigger('focus');
	                    self.css({ 'opacity': '0' })

	                    isAnimating = false;


	                });

	                self.parent('.mock-input').animate({
	                    height: '0px'
	                    
	                }, {
	                    duration: 300,
	                    complete: function () {
	                        w.animate({
	                            marginTop: '-200px',
	                            height: '200px'
	                        }, 300)
	                        r.animate({
	                            marginTop: '-200px',
	                            height: '200px'
	                        }, 300)
	                    }
	                })

	            

	            }
	            else {

	                next.css({
	                    'margin-top': '-100px',
	                    'height': '200px'
	                });

	                next.slideDown(400, function () {

	                    next.find('input').eq(0).trigger('focus');
	                    self.css({ 'opacity': '0' })

	                    isAnimating = false;


	                });

	                w.animate({
	                    marginTop: '-200px',
	                    height: '200px'
	                }, 300)
	                r.animate({
	                    marginTop: '-200px',
	                    height: '200px'
	                }, 300)
	            }




	            $(this).removeClass('exp-name'); 
	        }

	        if (!$(this).hasClass('expanded') && $(this).parent('.name-wrap').hasClass('fullname')) {
	             
	            var self = $(this); 

	            $(this).parent('.name-wrap').parent('form').parent('.active-wrap').animate({
	                height: '200px'
	            }, 300);

	            $('.input-overlay[data-sub="' + sub + '"]').animate({
	                height: '200px',
	                marginTop: '-200px'
	            }, 300)

	            $(this).parent('.name-wrap').next('.submit').css({
	                'height': '200px',
	                'margin-top': '-200px'
	            }, 300)
	            w.animate({
	                marginTop: '-200px',
	                height: '200px'
	            })
	            r.animate({
	                marginTop: '-200px',
	                height: '200px'
	            }, {
	                duration: 300,
	                complete: function () {
	                    isAnimating = false; 
	                    self.addClass('expanded');
	                }
	            })


	        }


	        if ($(this).parent('form').parent('.active-wrap').hasClass('exp1') && !$(this).hasClass('expanded')) {
	         
	            var self = $(this);
	            var expheight = $(this).parent('form').parent('.active-wrap').attr('data-expheight');
	            $('.input-overlay[data-sub="' + sub + '"]').css({
	                'display': 'block'
	            })
	            $('.input-overlay[data-sub="' + sub + '"]').animate({
	                height: expheight + 'px',
	                marginTop: '-' + expheight +'px'
	            }, 300)

	            $(this).parent('form').find('.submit').css({
	                height: expheight + 'px',
	                marginTop: '-' + expheight + 'px'
	            }, 300)

	            $(this).parent('form').parent('.active-wrap').animate({
	                height: expheight + 'px',
	            }, 300)

	            w.animate({
	                height: expheight + 'px',
	                marginTop: '-' + expheight + 'px'
	            })

	            r.animate({
	                height: expheight + 'px',
	                marginTop: '-' + expheight + 'px'
	            }, {
	                duration: 300,
	                complete: function () {
	                    isAnimating = false;
	                    self.addClass('expanded');
	                }
	            })

	        }

	        if (!$(this).hasClass('req')) {
	            if (r.width() == 0) {

	                show(r);
	            }
	        } else {
	            if (e.type == 'input') {
	                if ($(this).val() == '') {
	                    hide(r);
	                    show(w);
	                } else if ($(this).hasClass('invalid')) {
	                    hide(r);
	                    show(w);
	                } else {
	                    if (r.width() == 0) {
	                       show(r);
	                    } 
	                }
	            }
	            else {
	                if ($(this).hasClass('addmask')) {
	                    if ($(this).inputmask('unmaskedvalue') != '' && !$(this).hasClass('invalid')) {
	                        show(r);
	                    } else {
	                        hide(r, null, show, w, null);
	                    } 
	                }

	                if (!$(this).hasClass('req') && (!$(this).hasClass('invalid'))) {
	                    show(r); 
	                } else {
	                    show(w);
	                }
	            }
	        }

	    }

	    var right_shown = false;
	    var wrong_shown = false;

	    var flag1 = false;

	    function handle_textarea(e) {

	        if ($(this).hasClass('auto')) {
	            isAnimating2 = false;
	            $(this).removeClass('auto');
	        }

	        var sub = $(this).attr('data-sub');
	        var wrap = $(this).parent('form').parent('.active-wrap');
	        var all_wrap = wrap.parent('.input-wrap'); 
	        var q = wrap.attr('data-q');

	        var r = wrap.parent('.input-wrap').find('.right');
	        var w = wrap.parent('.input-wrap').find('.wrong');

	        add_input.call(this);

	        if ($(this).hasClass('showprompt')) {
	            $(this).removeClass('showprompt');
	            prompt_handler($(this));
	        }

	        if (!$(this).hasClass('expanded') && !$(this).hasClass('huge') && !$(this).hasClass('noexp')) {

	            var self = $(this);


	            $(this).parent('form').parent('.active-wrap').animate({
	                height: '200px'
	            }, 300);
	            $(this).animate({
	                'height': '156px'
	            }, 300)

	            $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.input-overlay').animate({
	                height: '200px',
	                marginTop: '-200px'
	            }, 300)

	            $(this).next('.submit').css({
	                'height': '200px',
	                'margin-top': '0px'
	            }, 300) 

	            w.animate({
	                marginTop: '-200px',
	                height: '200px'
	            })

	            r.animate({
	                marginTop: '-200px',
	                height: '200px'
	            }, {
	                duration: 300,
	                complete: function () {
	                    isAnimating = false;
	                    self.addClass('expanded'); 
	                }
	            })
	        }
	        if (!$(this).hasClass('expanded') && $(this).hasClass('huge') && !$(this).hasClass('noexp')) {
	            var self = $(this);

	   
	            $(this).parent('form').parent('.active-wrap').animate({
	                height: '500px'
	            }, 300);
	            $(this).animate({
	                'height': '456px'
	            }, 300)

	            $(this).parent('form').parent('.active-wrap').parent('.input-wrap').find('.input-overlay').animate({
	                height: '500px',
	                marginTop: '-500px'
	            }, 300)

	            $(this).next('.submit').css({
	                'height': '500px',
	                'margin-top': '0px'
	            }, 300)

	            w.animate({
	                marginTop: '-500px',
	                height: '500px'
	            })

	            r.animate({
	                marginTop: '-500px',
	                height: '500px'
	            }, {
	                duration: 300,
	                complete: function () {
	                    isAnimating = false;
	                    self.addClass('expanded');
	                }
	            })
	        }
	  
	    if (e.type == 'input') {

	     
	        $(this).css({
	            'color': '#1f467d'
	        })
	        count_w.call(this);
	     

	        if (isAnimating) {
	            setTimeout(function () {
	                isAnimating = false;
	            }, 100);
	            return true; 
	        }
	        else isAnimating = true;


	        if (!$(this).hasClass('req') && !flag1 ) {
	         
	            show(r, true);
	        } else {
	            if (!flag1) {
	                if ($(this).val() == '' || $(this).hasClass('invalid')) {
	               
	                    hide(r, true, show, w, true);


	                } else {
	                    hide(w);
	                    show(r, true);
	                }
	            }
	        }
	    } else {

	        count_w.call(this);
	    }

	    function count_w() {

	        if (typeof $(this).attr('data-wordcount') != 'undefined') {

	            flag1 = true;
	            var prompt = all_wrap.find('.prompt[data-q="' + q + '"]');

	            var text = $(this).val();
	            text = text.replace(/[^a-zA-Z\s]/g, '');

	            var words = text.split(/[\s]+/);

	            if (prompt.find('span').find('span').length == 0) {
	                prompt.find('span').append('<span></span>');
	            }
	            prompt.find('span').find('span').html(' ' + words.length + ' words out out of ' + $(this).attr('data-wordcount') + ' used. Click arrow to go to next field.');

	            if (words.length >= parseInt($(this).attr('data-wordcount'))) {

	              

	                if (w.width() == 0) {
	                 
	                    w.css({
	                        'z-index': '100000'
	                    })

	                    r.css({
	                        'z-index': '99999',
	                        'width': '0px'
	                    });
	                    r.find('.icon').css({
	                        'display': 'none'
	                    }); 

	                    show(w);
	                }
	               
	                return true;

	            }
	            else {
	              
	                if (r.width() == 0) {
	                    w.css({
	                        'z-index': '99999',
	                        'width': '0px'
	                    })
	                    w.find('.icon').css({
	                        'display': 'none'
	                    })
	                    r.css({
	                        'z-index': '100000'
	                    });

	                    show(r);
	                }

	                return true;

	            }
	        } else {
	            if (!$(this).hasClass('req') && !$(this).hasClass('invalid')) {
	                show(r);
	            } else if ($(this).hasClass('req') && !$(this).hasClass('invalid') && $(this).val() != '') { 
	                hide(w, true, show, r, true);
	            } else {
	                    show(w); 
	                }
	            }
	        }
	    }   

	    var isAnimating2 = false;
	    function show(elem, isBig, cb, isAuto) {
	        if (isAnimating2) {
	            setTimeout(function () {
	                isAnimating2 = false; 
	            }, 100)
	            return true }
	        else isAnimating2 = true; 

	        elem.animate({
	            width: 100 + 'px',
	            complete: function () {
	                if (isBig) return '200px';
	                else {
	                    isAnimating = false;
	                    isAnimating2 = false; 
	                    return true
	                };
	            }
	        }, {
	            duration: 200,
	            complete: function () {
	                elem.find('.icon').fadeIn(100, function () {
	                    isAnimating = false;
	                    isAnimating2 = false;
	                    if (cb) cb();
	                });
	            }
	        })
	    }

	    function hide(elem, isBig, cb, w, isBig2) {
	        if (isAnimating2) return true;
	        else isAnimating2 = true;


	        
	        elem.find('.icon').css({
	            'display': 'none'
	        })
	        elem.animate({
	            width: '0px',
	            height: function () {
	                if (isBig) return '200px';
	                else {

	                    return true
	                };
	            }
	        }, {
	            duration: 200,
	            complete: function () {
	                isAnimating = false;
	                isAnimating2 = false;
	                //if (cb) cb(w, isBig2);
	            }
	        });

	        isAnimating = false;
	        isAnimating2 = false;
	        if (cb) cb(w, isBig2);
	        
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function (elem, wrap) {

	    elem.attr('disabled', 'disabled');
	    
	    if (elem.hasClass('form-input') || elem.hasClass('form-textarea')) { 
	            drop(elem);
	    } 

	    function drop(elem) {

	        var wrap = elem.parent('div').parent('.input-wrap');

	        var down = wrap.find('.down');
	        if (down.length == 0) {
	            var wrap = elem.parent('div'); 
	            down = wrap.find('.down');
	  
	        } else if (down.length > 1) {
	            var wrap = elem.parent('div');
	            down = wrap.find('.down');
	        }


	        elem.css({
	            'background-color': 'rgb(172, 185, 218)',
	            'color': 'rgb(22, 42, 99)'
	        });
	        elem.val(elem.attr('placeholder')); 

	        down.animate({
	            width: '100px'
	        }, {
	            duration: 200,
	            complete: function () {
	                $(this).find('.icon').fadeIn(300); 
	            }
	        })
	    }
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var end_form = __webpack_require__(10); 
	var small_progress = __webpack_require__(11); 

	module.exports = function (flag) {

	    $('.right').on('click', function () {
	        var q = parseInt($(this).attr('data-q'));
	        var max = parseInt($(this).attr('data-max'));
	        if ((q+1) > max) {
	            $(this).parent('.input-wrap').find('.active-wrap').find('.map-input2').attr('tabindex', '-1');

	        }

	        if ($(this).parent('.input-wrap').find('.active-wrap').find('.input-form').find('input[type="email"]').length == 0) {
	            var f = $(this).parent('.input-wrap').find('.active-wrap').find('.input-form').trigger('submit');
	        } else {
	            $(this).parent('.input-wrap').find('.active-wrap').find('.input-form').find('.submit').trigger('click'); 
	        }
	    })

	    var input_forms = document.forms;

	    for (var i = 0; i < input_forms.length; i++) {
	        input_forms[i].onsubmit = function (e) {

	            if ($('#' + e.target.id).find('.multi-zip').length > 0) {
	                if ($('#' + e.target.id).find('.multi-zip').val().search('_') != -1) {
	                    return false; 
	                }
	            }

	            if ($('#' + e.target.id).find('input[data-maskval="(999) 999-9999"]').length > 0) {
	                var phoneinput = $('#' + e.target.id).find('input[data-maskval="(999) 999-9999"]');
	                if (phoneinput.inputmask('unmaskedvalue').length < 10) {
	                    return false; 
	                }
	            }

	            if ($('#' + e.target.id).find('input[data-maskval="(999) 999-9999 ext [9999]"]').length > 0) {
	                var phoneinput = $('#' + e.target.id).find('input[data-maskval="(999) 999-9999 ext [9999]"]');
	                if (phoneinput.inputmask('unmaskedvalue').length < 10) {
	                    return false;
	                }
	            }

	            if (($('#' + e.target.id).find('.req').length > 0)) {
	                if ($('#' + e.target.id).find('.req.invalid').length > 0) {
	                    return false;
	                }
	                for (var i = 0; i < $('#' + e.target.id).find('.req').length; i++) {
	                    if ($('#' + e.target.id).find('.req').eq(i).val() == '') {
	                        return false;
	                    }
	                }
	            }

	            e.preventDefault();

	            var curr_q = e.target.dataset.q;
	            if (typeof curr_q == 'undefined') {
	                curr_q = e.target.parentElement.dataset.q; 
	            }

	            var cat = e.target.dataset.category; 
	            var sub = e.target.dataset.sub;
	            var max = e.target.dataset.max; 

	            try {
	                if (e.target.id == cat.toString() + sub.toString() + curr_q.toString() && parseInt(curr_q) <= parseInt(max)) {

	                   
	                        change_q.call($('#' + e.target.id).parent('.active-wrap').parent('.input-wrap').find('.right'));
	                    
	                } 
	            } catch (err) {

	            }
	        }
	    }

	    if (!flag) {
	        $('.expanded').css({
	            'height': '156px'
	        });

	        $('.noexp').css({
	            'height': '100px'
	        });

	        $('.expanded1').css({
	            'height': '200px'
	        });

	        $('.exp-wrap').css({
	            'height': '200px'
	        })
	    }


	    function change_q() {

	        var r = $(this);

	        var w = $(this).parents('.input-wrap').find('.wrong');

	        var curr = $(this).parents('.input-wrap').find('.active-wrap');
	        var q = parseInt(curr.attr('data-q')) + 1; 
	        var sub = parseInt(curr.attr('data-sub'));
	        var max = parseInt(r.attr('data-max'));

	        if (q > max) {

	            curr.parent('.input-wrap').find('.map-input').attr('tabindex', '-1');
	        }

	        var next = $(this).parent('.input-wrap').find('.hidden-wrap[data-q="' + q + '"][data-sub="' + sub + '"]');

	        next.css({
	            'z-index': q + 1
	        });

	        curr.find('textarea').css({
	            'color': '#c3cbe1',
	            'background-color': '#c3cbe1'
	        });
	        curr.find('input').css({
	            'color': '#c3cbe1',
	            'background-color': '#c3cbe1'
	        });

	        if (curr.hasClass('final') && curr.find('.drop').length > 0) {
	            curr.slideUp(400, function () {
	                curr.parent('.input-wrap').find('.down').animate({
	                    opacity: 0,
	                    marginRight: '200px'
	                }, 400); 
	            });
	        }

	        if (curr.hasClass('prompt_shown')) {

	            var n_q = parseInt(q) - 1; 
	            var pr = curr.parent('.input-wrap').find('.prompt[data-q="' + n_q + '"]');
	           
	            pr.find('span').css({
	                'display': 'none'
	            });
	            if (!curr.hasClass('showradio')) {
	                counter = 0;
	  
	                    pr.slideUp({
	                        duration: 300,
	                        start: function () {

	                            animate_q();

	                        }
	                    })
	              


	            } else {
	    
	                var counter = 0; 
	                pr.find('span').fadeOut(100, function () {
	                    pr.slideUp({
	                        
	                        duration: 400,
	                        complete: function () {
	                            if (counter == 0) {
	                                counter++;
	                                animate_q(); 
	                            } else {
	                                $(this).stop(true, true); 
	                            }
	                        }
	                    })
	                })
	            }


	        } else {
	         
	            animate_q();
	        }
	        
	        function animate_q() {
	            if (q > max) {
	                var n_q = parseInt(q) - 1;
	                var pr1 = curr.parent('.input-wrap').find('.prompt');
	                pr1.slideUp(100);


	            }

	            if (curr.hasClass('collapse')) {
	 
	            
	                curr.parent('.input-wrap').find('.input-overlay').css({
	                    display: 'block'
	                })

	                r.animate({
	                    height: '100px',
	                    marginTop: '-100px'
	                }, {
	                    duration: 300,
	                    start: function () {

	                        curr.parent('.input-wrap').find('.input-overlay').animate({
	                            height: '100px',
	                            marginTop: '-100px'
	                        }, 300);
	                        curr.animate({
	                            'height': '100px'
	                        }, 300) 
	                         
	                        if (curr.attr('data-type') == 't') {

	                            curr.find('textarea').animate({
	                                'height': '100px'
	                            }, {
	                                duration: 300,
	                                complete: function () {
	                                    animate_transition();
	                                }
	                            })
	                        } else {
	                            animate_transition();
	                        }

	                    }
	                });

	                w.css({
	                    'width': '0px',
	                    'height': '100px',
	                    'margin-top': '-100px'
	                });
	                w.find('.icon').css({
	                    'display': 'none'
	                });


	            } else {
	                animate_transition();
	            }
	        }

	        function animate_transition() {
	            w.fadeOut(100, function () {
	                
	                r.animate({
	                    marginRight: '170px',
	                    opacity: 0
	                }, {
	                    duration: 500,
	                    complete: function () {
	                        if (curr.attr('data-type') == 'file') {
	                            curr.find('.label-wrap').css({
	                                'display': 'none'
	                            })
	                        }

	                        cb();

	                        function cb() {

	                            var stats = curr.parent('.input-wrap').find('.small-stats');
	                            var bar = curr.parent('.input-wrap').find('.input-meter').find('.meter-span');


	                            if (q > max) {

	                                small_progress(q, max, bar, stats, end_form, curr);
	                                return false;
	                            }
	                            curr.fadeOut({
	                                duration: 300,
	                                complete: function () {


	                                    curr.prev('.mock-input').css({ 'display': 'none' });

	                                    r.css({
	                                        'margin-right': '0px',
	                                        'width': '0px',
	                                        'opacity': 1
	                                    });

	                                    w.css({
	                                        'margin-right': '0px',
	                                        'width': '0px',
	                                        'opacity': 1,
	                                        'display': 'block'
	                                    });

	                                    r.find('.icon').css({ 'display': 'none' });
	                                    w.find('.icon').css({ 'display': 'none' });

	                                    next.addClass('active-wrap');
	                                    next.removeClass('hidden-wrap');
	                                    next.css({ 'opacity': '0' })
	                                  

	                                    next.animate({
	                                        opacity: 1
	                                    }, {
	                                        duration: 200,
	                                        complete: function () {
	                                            r.attr('data-q', q); 
	                                            curr.removeClass('active-wrap');

	                                            if (!next.hasClass('nameexp')) {
	                                                next.find('input').first().attr('required');
	                                                next.find('textarea').attr('required');

	                                                next.find('input').first().addClass('auto').trigger('focus');
	                                                next.find('textarea').addClass('auto').trigger('focus');

	                                                if (!next.find('input').first().hasClass('req')) {
	                                                    next.find('input').removeAttr('required');
	                                                }

	                                                if (!next.find('textarea').hasClass('req')) {
	                                                    next.find('textarea').removeAttr('required');
	                                                }
	                                            }

	                                            next.find('.map-input').attr('tabindex', 1);

	                                            small_progress(q, max, bar, stats);

	                                            if (next.hasClass('showradio')) {
	                                                next.find('.radio-inp').trigger('click'); 
	                                            }
	                                        }
	                                    })
	                                }
	                            })
	                        }
	                    }
	                })
	            })
	        }
	    }
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function (elem, flag) {

	    var thanx = elem.parent('.input-wrap').find('.thanx');
	    if (thanx.hasClass('done')) return false;

	    thanx.addClass('done'); 

	    var id = thanx.find('svg').attr('id');

	        thanx.find('.big-input-meter').css({ 'margin-top': '-100px' });
	        cb(); 
	    

	        function cb () {
	        thanx.fadeIn(200, function () {

	            thanx.find('.big-input-meter').animate({
	                width: '100%'
	            }, {
	                duration: 700,
	                complete: function () {

	                    thanx.find('.big-input-meter').css({ 'margin-top': '-108px' });
	              
	                    var cool_check = new Vivus(id, {

	                        duration: 50,
	                        type: 'async',
	                        start: 'autostart',
	                        onReady: function () {
	                            thanx.find('svg').fadeIn(100);
	                        }
	                    });

	                    thanx.find('.thanx-p').fadeIn(200);
	                }
	            })
	        })
	    }
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function (q, max, bar, s, cb, elem) {

	    q--;

	    var step = 100 / max;
	    var width = step * q + '%';

	    bar.animate({
	        width: width
	    }, {
	        duration: 400,
	        complete: function () {
	            if (cb) cb(elem);
	        }
	    });

	    s.html(q + '/' + max);

	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function () {


	    $('input[type=file]').on('click', function () {
	        $(this).on('change', function () {

	            var self = $(this);

	            $(this).parent('.label-wrap').prev('.skip-container').find('span').fadeOut(100, function () {
	                self.parent('.label-wrap').prev('.skip-container').animate({
	                    width: '0px',
	                    padding: '0px',
	                    margin: '0px'
	                }, {
	                    duration: 300,
	                    complete: function () {
	                        self.parent('.label-wrap').css({ 'z-index': '90999999' });
	                        self.parent('.label-wrap').animate({
	                            'width': '100%'
	                        }, {
	                            duration: 700,
	                            complete: function () {
	                               
	                                $(this).find('span').animate({ opacity: 0 }, 100);
	                                $(this).fadeOut(500);
	                                var id = '#' + $(this).attr('data-category') + $(this).attr('data-sub') + $(this).attr('data-q');
	                                $(id).submit();
	                                
	                            }
	                        })
	                    }
	                })
	             })
	        })
	    });

	    $('.skip-container').on('click', function () {
	        var self = $(this); 
	        $(this).find('span').fadeOut(100, function () {
	            self.animate({
	                width: '0px',
	                padding: '0px',
	                margin: '0px'
	            }, {
	                duration: 300,
	                complete: function () {
	                    self.next('.label-wrap').find('span').animate({ opacity: 0 }, 100);
	                    self.next('.label-wrap').animate({
	                        width: 100 + '%'
	                    }, {
	                        duration: 500,
	                        complete: function () {
	                            self.parent('form').fadeOut(500, function () {
	                                var id = '#' + self.attr('data-category') + self.attr('data-sub') + self.attr('data-q');
	                                $(id).submit();
	                            })
	                        }
	                    })
	                }
	            })
	        })
	    })
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var radio_handler = __webpack_require__(4);
	var inputmask_handler = __webpack_require__(6);
	var focus_handler = __webpack_require__(7);
	var question_change_handler = __webpack_require__(9);
	var file_handler = __webpack_require__(12);
	var dropdown_select_handler = __webpack_require__(14);
	var nested_dropdown_handler = __webpack_require__(15);
	var route_handler = __webpack_require__(16); 

	var counter = 0;


	module.exports = function () {
	    var all_clones = $('.form-wrap').clone();
	    var clone_subs = all_clones.find('.clonable').clone();
	   

	    $('.add-btn').on('click', add_inp_handler); 

	    function add_inp_handler(e) {

	        var index = parseInt($(this).attr('data-index'));

	        index++;

	        $(this).attr('data-index', index); 

	        var ct_clone = all_clones.find('.category-wrap[data-category="'+ $(this).attr('data-category') + '"]'); 
	        var ct = parseInt($(this).attr('data-category'));

	        var wrap = $(this).parent('div').parent('.input-wrap'); 
	        if (wrap.length == 0) {
	            wrap = $(this).parent('div').parent('div').parent('.input-wrap');
	        }

	        var clonename = ct_clone.find('.input-wrap[data-sub="' + $(this).attr('data-sub') + '"]').attr('data-clonename');
	        var sub = ct_clone.find('.input-wrap[data-sub="' + $(this).attr('data-sub') + '"]');

	        for (var i = 0; i < clone_subs.length; i++) {
	            if (clonename == clone_subs.eq(i).attr('data-clonename')) {
	                sub = clone_subs.eq(i).clone(); 
	            }
	        }

	        sub.css({
	            'display': 'none'
	        });
	        sub.find('.add-btn').attr('data-index', index); 

	        var curr_sub = parseInt(wrap.attr('data-sub')); 
	        var new_sub = parseInt(wrap.attr('data-sub')) + 1;

	      
	        sub.attr('data-sub', new_sub);
	        sub.children().attr('data-sub', new_sub);
	        sub.find('input').attr('data-sub', new_sub);
	        sub.find('textarea').attr('data-sub', new_sub);
	        sub.find('div').attr('data-sub', new_sub);
	        sub.find('.map-input').attr('data-index', index);
	        sub.find('.drop').attr('data-index', index);
	        sub.find('.rad').attr('data-sub', new_sub);
	        sub.find('.label-wrap').attr('data-sub', new_sub);
	        sub.find('.radioli').attr('data-sub', new_sub);
	        sub.find('.radioprompt .switch').attr('id', 'check' + Math.random().toString().substr(2)); 

	        for (var k = 0; k < sub.find('svg').length; k++) {
	            var old_id = sub.find('svg').eq(k).attr('id');
	            sub.find('svg').eq(k).attr('id', old_id + 'add' + counter); 
	        }
	        var sub_arr = sub.find('.input-form');

	        var rads = sub.find('input[type="radio"]');
	        var r2 = sub.find('.rad'); 

	       
	        for (var i = 0; i < rads.length; i++) {

	            var oldname = rads.eq(i).attr('name');
	            var oldindex = parseInt(oldname.substr(oldname.length - 1));
	            if (!isNaN(oldindex)) {
	                oldindex++;
	                var new_name = oldname.substr(0, oldname.length - 1) + oldindex;
	            } else {
	                var new_name = oldname.substr(0, oldname.length - 1) + index;
	            }
	        
	            var n_id = index.toString() + new_name; 
	            if (rads.eq(i).hasClass('yes')) {

	                r2.eq(i).attr('id', 'check' + n_id); 
	            } else {
	                r2.eq(i).attr('id', 'check' + n_id + 'n');
	            }
	            rads.eq(i).attr('name', new_name);

	        }

	        var category = wrap.parent('.category-wrap');
	        if (category.length == 0) {
	            category = wrap.parent('div').parent('.category-wrap');
	        }

	        var subs = category.find('.input-wrap[data-sub!="' + curr_sub + '"]');
	        counter++;
	    
	        for (var i = 0; i < subs.length; i++) {
	            if (parseInt(subs.eq(i).attr('data-sub')) >= new_sub) {
	                
	                subs.eq(i).find('drop').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1); 
	                subs.eq(i).find('input[type="radio"]').attr('name', n2); 
	                subs.eq(i).children().attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                subs.eq(i).find('input').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                subs.eq(i).find('textarea').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                subs.eq(i).find('div').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                subs.eq(i).find('.switch').attr('id', subs.eq(i).find('.switch').attr('id') + 'n' + index); 
	                subs.eq(i).find('.rad').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                subs.eq(i).find('.label-wrap').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                sub.find('.radioli').attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                subs.eq(i).attr('data-sub', parseInt(subs.eq(i).attr('data-sub')) + 1);
	                
	                var radios = subs.eq(i).find('.rad');
	                
	                if (radios.length > 0) {
	                    for (var x = 0; x < radios.length; x++) {
	                        if (typeof radios.eq(x).attr('name') != 'undefined') {
	                            var name1 = radios.eq(x).attr('name').substr(0, radios.eq(x).attr('name').length - 1);
	                            var n2 = name1 + index.toString();

	                            radios.eq(x).attr('name', n2);
	                            var id = Math.random();
	                            if (radios.eq(i).hasClass('y')) {
	                                radios.eq(i).attr('id', id);

	                            } else {
	                                radios.eq(i).attr('id', id + 'n');
	                            }
	                        }
	                    }
	                }

	                var old_sub_arr = subs.eq(i).find('.input-form');

	                for (var x = 0; x < old_sub_arr.length; x++) {
	                    var n_s = parseInt(old_sub_arr.eq(x).attr('data-sub')) + 1;
	                    old_sub_arr.eq(x).attr('id', ct_clone.attr('data-category') + n_s + old_sub_arr.eq(x).attr('data-q'));
	                    old_sub_arr.eq(x).attr('data-sub', n_s); 
	                }
	            }
	        } 

	        for (var j = 0; j < sub_arr.length; j++) {


	            sub_arr.eq(j).attr('id', ct_clone.attr('data-category') + sub.attr('data-sub') + sub_arr.eq(j).attr('data-q'));
	            sub_arr.eq(j).attr('data-sub', new_sub);

	           
	        }



	        var statstext = sub.find('.stats-wrap').find('.form-label').html();
	        var show_index = index + 1;
	        //if (index > 1 && clonename == 'programOutcomes1') {
	        //    statstext = statstext.substr(0, statstext.length - 2);
	           
	        //}
	        statstext = statstext + ' ' + show_index.toString();
	        
	        
	        sub.find('.stats-wrap').find('.form-label').html(statstext); 


	        wrap.after(sub);
	        sb = sub; 
	        $('*').unbind(); 

	        radio_handler();
	        inputmask_handler();
	        focus_handler();
	        question_change_handler(true);
	        file_handler();
	        dropdown_select_handler();
	        nested_dropdown_handler();
	        $('.add-btn').on('click', add_inp_handler);
	        route_handler.preview_handler();
	        refresh_clones(ct);

	        var self = $(this);
	        self.parent('.add-inp').find('span').fadeOut(100, function () {
	            self.parent('.add-inp').slideUp(300, function () {
	                sub.slideDown(300);
	            })
	        })

	    }

	    function refresh_clones(ct) {
	        var clone_counter = parseInt($('.category-wrap[data-category="'+ ct + '"]').attr('data-subs'));
	        clone_counter++; 
	        $('.category-wrap').attr('data-subs', clone_counter); 
	        all_clones = $('.form-wrap').clone();
	        all_clones.find('input').val('');
	        all_clones.find('textarea').val('');
	    }
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var end_form = __webpack_require__(10);
	var dropdown_handler = __webpack_require__(8); 
	var small_progress = __webpack_require__(11); 

	module.exports = function () {
	    $('.down').on('click', function () {

	        var flag = false; 
	        var dropwrap = $(this).parent('.input-wrap').find('.active-wrap');
	        if (dropwrap.length == 0) {
	            dropwrap = $(this).parent('.active-wrap');
	            flag = true; 
	        }

	        if (!$(this).hasClass('colorchange')) {

	            dropwrap.parent('.input-wrap').find('.input-overlay').css({
	                'display': 'none'
	            })

	            var h = dropwrap.attr('data-dropheight');
	            if (!flag) {
	                dropwrap.css({
	                    'height': h + 'px'
	                });

	                dropwrap.slideDown(500);
	            } else {

	                dropwrap.find('.input-form').fadeIn(300); 
	                dropwrap.animate({
	                    height: h + 'px'
	                }, {
	                    duration: 500 
	                })
	            }
	        } else {

	            var self = $(this);

	            var form = self.parent('.input-wrap').find('form');

	            if (form.length > 0) {
	                form.trigger('submit');
	            } else {

	                if (!flag) {
	                    dropwrap.slideUp(500, cb1);
	                } else {
	                    dropwrap.parent('.input-wrap').find('.input-overlay').css({
	                        'display': 'block'
	                    });
	                    dropwrap.css({
	                        'overflow': 'hidden'
	                    });
	                    dropwrap.animate({
	                        height: '100px'
	                    }, {
	                        duration: 500,
	                        complete: function () {
	                            var down = dropwrap.find('.down');
	                            down.animate({
	                                marginRight: '200px',
	                                opacity: 0
	                            }, {
	                                duration: 300,
	                                complete: function () {

	                                    var s = dropwrap.find('form').trigger('submit');
	                                }
	                            })
	                        }
	                    })
	                }
	            }

	            function cb1() {

	                    self.animate({
	                        marginRight: '200px',
	                        opacity: '0'
	                    }, {
	                        duration: 500,
	                        complete: function () {
	                         
	                            var s = dropwrap.parent('.input-wrap').find('.small-stats')
	                            var bar = dropwrap.parent('.input-wrap').find('.meter-span');

	                     
	                            if (dropwrap.hasClass('final')) {
	                                bar.animate({
	                                    width: '100%'
	                                }, {
	                                    dutration: 300,
	                                    complete: function () {
	                                        end_form(dropwrap, true); 
	                                    }
	                                });

	                                s.html(s.attr('data-max') + '/' + s.attr('data-max'));

	                            } else {

	                                var q = parseInt($(this).attr('data-q'));
	                                q++;

	                                $(this).attr('data-q', q); 

	                                small_progress(q, parseInt(s.attr('data-max')), bar, s);

	                                $(this).removeClass('colorchange');
	                                $(this).find('.icon').css({ 'display': 'none' }); 
	                                $(this).find('.icon').removeClass('rotate'); 
	                                $(this).css({
	                                    'margin-right': '0px',
	                                    'width': '0px',
	                                    'opacity': '1'
	                                });

	                                var mock = dropwrap.parent('.input-wrap').find('.mock-input');

	                                var n = dropwrap.next('.hidden-wrap');

	                                mock.css({
	                                    'z-index': '-1'
	                                })
	                                dropwrap.removeClass('active-wrap');
	                                n.addClass('active-wrap'); 
	                                n.css({
	                                    'display': 'none'
	                                });

	                                dropwrap.parent('.input-wrap').find('.input-overlay').css({
	                                    'display': 'block'
	                                })
	                                mock.find('input').fadeOut(300, function () {
	                                    var c = mock.find('.curr-inp');
	                                    c.removeClass('curr-inp');
	                                    c.next('input').addClass('curr-inp').fadeIn(300, function () {
	                                        dropwrap.parent('.input-wrap').find('.input-overlay').css({
	                                            'display': 'none'
	                                        })
	                                    });
	                                })
	                            }
	                        }
	                    })
	                }
	           }
	     })

	    $('.big-option').on('click', function () {
	        if (!$(this).hasClass('selected')) {

	            var wrap = $(this).parent('div').parent('.active-wrap').parent('.input-wrap');
	            var d = wrap.find('.down');
	            if (d.length == 0) {
	                d = $(this).parent('div').parent('form').parent('.active-wrap').find('.down'); 
	            }

	            if (!d.hasClass('colorchange')) {
	                d.addClass('colorchange');
	                d.find('.icon').addClass('rotate');
	            }

	            $(this).css({
	                'background-color': 'rgb(157, 171, 208)',
	                'color': 'rgb(22, 42, 99)'
	            })

	            var id = $(this).find('svg').attr('id');
	            var sm_check = new Vivus(id, {

	                duration: 30,
	                type: 'async',
	                start: 'autostart',
	                onReady: function () {
	                    $('#' + id).fadeIn(100);
	                }
	            });


	            $(this).addClass('selected');
	        } else {


	            $(this).find('svg').fadeOut(200);
	            $(this).css({
	                'background-color': '#c3cbe1',
	                'color': '#8a97bb'
	            })
	            $(this).removeClass('selected');
	        }
	    })

	    $('.input-cell').on('click', function () {
	        var wrap = $(this).parent('div').parent('form').parent('.active-wrap').parent('.input-wrap');
	        var d = wrap.find('.down');

	        if (!d.hasClass('colorchange')) {
	            d.addClass('colorchange');
	            d.find('.icon').addClass('rotate');
	        }
	    })

	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function () {

	    $('.exp-cell').on('click', function (e) {

	        if ($(this).hasClass('selected')) return false; 

	        var wrap = $(this).parent('div');

	        var all_wrap = wrap.parent('form').parent('.active-wrap');
	        var all_wrap2; 
	        if (all_wrap.length == 0) {
	            all_wrap2 = wrap.parent('.active-wrap');
	        }

	        var curr = $(this).attr('data-cell'); 

	        if (!$(this).hasClass('selected')) {
	            $(this).css({
	                'background-color': 'rgb(157, 171, 208)',
	                'color': 'rgb(22, 42, 99)'
	            })

	            $(this).addClass('selected');
	            $(this).find('.down-sm').animate({
	                width: '100px'
	            }, {
	                duration: 200,
	                complete: function () {
	                    $(this).find('.icon').fadeIn(200); 
	                }
	            })

	            var n_cells = wrap.find('.exp-cell[data-cell!="' + curr + '"]');
	            n_cells.removeClass('selected');
	            n_cells.css({
	                'background-color': '#c3cbe1',
	                'color': '#8a97bb'
	            });


	            if (all_wrap.length > 0) {
	                all_wrap.animate({
	                    height: '300px'
	                }, 200);

	            } else {
	                if (typeof all_wrap2 != 'undefined') {
	                    all_wrap2.animate({
	                        height: '200px'
	                    }, 200);
	                }
	            }
	            n_cells.find('.multi-drop').slideUp(200, function () {

	                

	                n_cells.find('.down-sm .icon').removeClass('rotate2'); 
	                n_cells.find('.down-sm .icon').css({ 'display': 'none' });
	                n_cells.find('.down-sm').fadeOut(100, function () {
	                    n_cells.find('.down-sm').css({
	                        'width': '0px',
	                        'display': 'block'
	                    });
	                });
	            })
	 

	        } else {
	            if (e.target.classList.contains('exp-cell')) {
	                $(this).css({
	                    'background-color': '#c3cbe1',
	                    'color': '#8a97bb'
	                })

	                $(this).removeClass('selected');
	            }
	        }
	    })


	    $('.down-sm').on('click', function () {

	        var flag = false; 
	        var wrap = $(this).parent('div').parent('div').parent('.active-wrap');
	        var d = parseInt($(this).attr('data-dropheight')); 
	        var m = $(this).next('.multi-drop');
	        var h = parseInt(m.attr('data-dropheight')); 

	        if (wrap.length == 0) {
	            wrap = $(this).parent('div').parent('div').parent('form').parent('.active-wrap');
	            flag = true;
	            var h = parseInt(m.attr('data-dropheight')) + 100;
	        }

	        if (!$(this).find('.icon').hasClass('rotate2')) {
	            $(this).find('.icon').addClass('rotate2');
	            wrap.animate({
	                height: 100 + h + 'px'
	            }, {
	                duration: 300,
	                start: function () {
	                    m.slideDown(300);
	                }
	            });


	        } else {
	            $(this).find('.icon').removeClass('rotate2');
	            wrap.animate({
	                height: d + 'px'
	            }, {
	                duration: 300,
	                start: function () {
	                    m.slideUp(300);
	                }
	            });
	        }
	    })

	    $('.small-cell').on('click', function () {
	        if (!$(this).hasClass('selected')) {

	            var wrap = $(this).parent('div').parent('.exp-cell');
	            
	            var all_wrap = wrap.parent('div').parent('.active-wrap').parent('.input-wrap');
	            if (all_wrap.length == 0) {
	                all_wrap = wrap.parent('div').parent('form').parent('.active-wrap'); 
	            }

	            var down = all_wrap.find('.down');


	            if (!down.hasClass('colorchange')) {
	                down.addClass('colorchange');
	                down.find('.icon').addClass('rotate');
	            }

	            var d = wrap.find('.down-sm .icon');


	            $(this).css({
	                'background-color': 'rgb(157, 171, 208)',
	                'color': 'rgb(22, 42, 99)'
	            })

	            var id = $(this).find('svg').attr('id');
	            var sm_check1 = new Vivus(id, {

	                duration: 30,
	                type: 'async',
	                start: 'autostart',
	                onReady: function () {
	                    $('#' + id).fadeIn(100);
	                }
	            });

	            $(this).addClass('selected');

	        } else {

	            $(this).find('svg').fadeOut(200);
	            $(this).css({
	                'background-color': '#b1bddc',
	                'color': '#6c7ca7'
	            })
	            $(this).removeClass('selected');
	        }
	    }); 

	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var data_handler = __webpack_require__(17);
	var json_handler = __webpack_require__(18);
	var submit_handler = __webpack_require__(19);
	var inputmask_handler = __webpack_require__(6); 

	module.exports = { 

	    ct: '', 
	    ct2: '',
	    clone_ct: function () {
	        var ct = $('.category-wrap[data-category="1"]').clone();
	 
	        this.ct = ct;
	   
	        return ct; 

	    },
	    clone_ct2: function() {
	        var ct = $('.category-wrap[data-category="2"]').clone();
	 
	        this.ct2 = ct;
	   
	        return ct; 
	    }, 
	    preview_handler: function (data) {
	        var self = this; 
	        $('.view-preview').on('click', function (e) {
	        var ct = e.target.dataset.category;
	        try {
	            $.router.go('/preview/' + ct);
	        } catch (err) {

	            var data = {
	                category: ct
	            }
	            self.preview(data);
	        }
	    });
	    },


	    preview: function(data) {

	        $('.map-input').removeAttr('data-masked');
	        data_handler.set_category(data.category);

	        $('.big-container').fadeIn(500);


	        $('.thank-you-screen').css({
	            'height': '0px',
	            'opacity': '0'
	        });

	        var max = 3;

	        var step = 100 / max;
	        var w = step * data.category;

	        $('.meter-top span').animate({
	            width: w + '%'
	        }, {
	            duration: 500,
	            complete: function () {
	                $('.stats').html(data.category + '/3');
	            }
	        });

	        submit_handler.remove_submit_handlers();
	        submit_handler.add_submit_handlers();

	        var btn = $('#continue-btn' + data.category);

	        var preview = $('.form-preview-wrap');
	        preview.find('#ct' + data.category).find('.form-sub').remove();
	        map_inputs.call(btn);

	        $('.form-wrap').fadeOut(500, function () {
	            preview.fadeIn(500);
	        });

	        $('input[type="radio"]').css({
	            'display': 'block',
	            'opacity': '0'
	        });


	        
	        function map_inputs() {


	            var cat = parseInt($(this).attr('data-view'));
	            var max = parseInt($(this).attr('data-max'));


	            $('.form-wrap').fadeOut(500, function () {

	                var wrap = $('.category-wrap[data-category="' + data.category + '"]');

	                var all_subs = parseInt(wrap.attr('data-subs'));
	                var sub_arr = new Array(all_subs);

	                for (var i = 0; i < sub_arr.length; i++) {
	                    var wr = wrap.find('.input-wrap[data-sub="'+ i + '"]'); 

	                    var htext = wr.find('.stats-wrap').find('.form-label').html();
	                    var subtext = wr.find('.stats-wrap').find('p.sub').html(); 

	                    if (typeof htext != 'undefined') {
	                        if (htext.toLowerCase() != 'mock') {
	                            sub_arr[i] = '<div data-sub="' + i + '" class="form-sub">' +
	                               '<h2>' + htext + '</h2>' +
	                               '<p>' + subtext + '</p>' + '</div>';
	                        } else {
	                            sub_arr[i] = '<div data-sub="' + i + '" class="form-sub"></div>';
	                        }
	                    } else {
	                        sub_arr[i] = '<div data-sub="' + i + '" class="form-sub"></div>';
	                    }


	                }

	                var sub_html = sub_arr.join(' ');
	                $('.ct-form[data-category="' + data.category + '"]').find('.inner-form').append(sub_html); 

	                var inputs = wrap.find('.map-input');
	                var fl_inputs = wrap.find('input[type="file"]');

	                inputs.css({
	                    'color': '#1f467d'
	                })
	                var new_inputs = inputs.clone();


	                new_inputs.removeAttr('disabled');

	                var preview = $('.form-preview-wrap');
	                preview.find('form[data-category!="' + data.category + '"]').css({
	                    'display': 'none'
	                });

	                var ln = new_inputs.length;

	                for (var i = 0; i < ln; i++) {

	                    if (!new_inputs.eq(i).hasClass('mock')) {

	                        var sub = new_inputs.eq(i).attr('data-sub');
	                        var placeholder = new_inputs.eq(i).attr('placeholder');
	                        var prompt = new_inputs.eq(i).attr('data-prompt');
	                        
	                 
	                        if (new_inputs.eq(i).hasClass('huge')) {
	                            new_inputs.eq(i).removeClass('form-textarea');
	                            new_inputs.eq(i).addClass('form-textarea-huge'); 
	                        }

	                        var html = '<div class="form-input2" data-category="' + data.category + '" data-q="' + (i + 1) + '">' +
	                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
	                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>'
	                          + '</div> '

	                        if (new_inputs.eq(i).attr('data-type') == 'radio') {

	                            new_inputs.eq(i).addClass('rad2');
	             
	                            if (new_inputs.eq(i).hasClass('checked')) {
	                                new_inputs.eq(i).attr('checked', true); 
	                            }
	                            if (new_inputs.eq(i).hasClass('unchecked')) {
	                                new_inputs.eq(i).removeAttr('checked');
	                            }

	                            var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
	                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
	                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>' +
	                            '<label class="radioli radiowrap">' + new_inputs.eq(i).prop('outerHTML')
	                            + '<div></div><span>' + new_inputs.eq(i).attr('data-caption') + '</span></label>'
	                            '</div> '


	                        } else if (new_inputs.eq(i).attr('data-type') == 'file') {

	                            var filename = inputs.eq(i).prop('files').length > 0 ? inputs.eq(i).prop('files')[0].name : '';

	                            var html = '<div class="form-input2" data-q="' + (i + 1) + '">' +
	                            '<h3>' + (typeof placeholder == "undefined" ? '' : placeholder) + '</h3>' +
	                            '<p>' + (typeof prompt == "undefined" ? '' : prompt) + '</p>' +
	                            '<label class="add-file plus">'
	                            + '<div class="icon-plus plus-fin"></div></label>' + '<span class="file-span">' + filename + '</span>'
	                            '</div> '

	                        }

	                        if (typeof new_inputs.eq(i) != 'undefined') {
	                            preview.find('div[data-sub="' + sub + '"]').append(html);
	                        }
	                    

	                        if (new_inputs.eq(i).attr('data-type') == 'file') {

	                            var span_id = 'span' + new_inputs.eq(i).attr('id');
	                            new_inputs.eq(i).removeAttr('id');

	                            preview.find('div[data-sub="' + sub + '"]').find('.add-file').append(new_inputs.eq(i));

	                        } else if (new_inputs.eq(i).attr('data-type') != 'radio') {
	                            preview.find('div[data-sub="' + sub + '"]').find('.form-input2[data-q="' + (i + 1) + '"]').append(new_inputs.eq(i));
	                        } 
	                    }

	                    $('.add-file').on('click', function (e) {

	                        var id = e.target.id;
	                        var self = $(this);

	                        e.target.onchange = function (e) {

	                            self.next('span').html(e.target.files[0].name);

	                        }
	                    });


	                    if (preview.find('.hidden[data-sub="' + sub + '"]').find('.shown').length == 0) {

	                        preview.find('.hidden[data-sub="' + sub + '"]').css({ 'display': 'none' });
	                    } else {
	                        preview.find('.hidden[data-sub="' + sub + '"]').css({ 'display': 'block' });
	                    }
	                }


	                map_dropdowns(preview)

	                function map_dropdowns(wrap) {
	                    var bigwrap = $('.category-wrap[data-category="' + data.category + '"]');
	                    var drops = bigwrap.find('.drop');
	                    var mapped_drops = [];

	                    for (var i = 0; i < drops.length; i++) {

	                        if (drops.eq(i).hasClass('mock')) continue;

	                        var cells = [];
	                        for (var j = 0; j < drops.eq(i).find('.cell').length; j++) {


	                            var inner_cells = [];
	                            if (drops.eq(i).find('.exp-cell').eq(j).length > 0) {

	                                for (var k = 0; k < drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').length; k++) {

	                                    if (drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).hasClass('selected')) {
	                                        inner_cells.push('<option selected>' + drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).attr('data-text') + '</option>')
	                                    } else {
	                                        inner_cells.push('<option data-cat="' + drops.eq(i).find('.cell').eq(j).attr('data-text')
	                                            + '" value="' + drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).attr('data-text')
	                                            + '">' + drops.eq(i).find('.exp-cell').eq(j).find('.small-cell').eq(k).attr('data-text') + '</option>')
	                                    }
	                                }

	                                cells.push('<optgroup label="' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '">' +
	                                   inner_cells.join('') + '</optgroup>')

	                            } else {
	                                if (drops.eq(i).find('.cell').eq(j).hasClass('selected')) {
	                                    cells.push('<option selected>' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '</option>')
	                                } else {
	                                    cells.push('<option value="' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '">' + drops.eq(i).find('.cell').eq(j).attr('data-text') + '</option>')
	                                }

	                            }

	                        }

	                        mapped_drops[i] = '<div class="form-input2 clear"><h3>' + drops.eq(i).attr('data-placeholder') + '</h3>'
	                            + '<select data-index="' + drops.eq(i).attr('data-index') + '" data-name="' + drops.eq(i).attr('data-name')
	                            + '" class="form-control map-input sel ' + (drops.eq(i).hasClass('one-dimension') ? 'one-dimension' : '') + (drops.eq(i).hasClass('p') ? 'p' : '')
	                            + (drops.eq(i).hasClass('o') ? 'o' : '') + '" multiple style="height: ' + drops.eq(i).attr('data-height') + '">' + cells.join('') + '</select></div>';

	                        var sub = drops.eq(i).attr('data-sub');
	                        var curr = wrap.find('.form-sub[data-sub="' + sub + '"]');
	                        var q = drops.eq(i).attr('data-q');
	                        var p = curr.find('.drop-follow'); 
	                            
	                        if (p.length > 0) {
	                            p.after(mapped_drops[i]); 
	                        } else {
	                            if (typeof drops.eq(i).attr('data-placeholder') != 'undefined' && !drops.eq(i).hasClass('first-drop')) {
	                                curr.append(mapped_drops[i])
	                            } else if (drops.eq(i).hasClass('first-drop')) {
	                                wrap.find('#ct2').find('.form-sub[data-sub="' + sub + '"]').find('.form-input2').first().before(mapped_drops[i]); 
	                            }
	                        }
	                        

	                    }
	                }
	                preview.find('form[data-category!="' + data.category + '"]').css({
	                    'display': 'none'
	                })
	                preview.find('form[data-category="' + data.category + '"]').css({
	                    'display': 'block'
	                })
	                preview.fadeIn(500, function () {
	                    inputmask_handler();
	                    $('.form-input2').find('.addmask[data-maskval!="cash"]').addClass('mask2'); 
	                    $('.form-input2').find('.addmask[data-maskval!="cash"]').trigger('input'); 
	                });
	            });
	        }
	    }

	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = {

	    data2: {
	        eventCategory: "",
	        eventName: "",
	        eventType: "",
	        eventDescription: "",
	        duties: "",
	        serviceArea: [],
	        populationServed: [], 
	        volunteersRequired: "",
	        eventStartDate: "",
	        eventEndDate: "",
	        eventTime: "",
	        eventAddress: {
	            street : "",
	            suite : "",
	            city : "",
	            state : "",
	            zip : "",
	            country : "",
	        }, 
	        eventContact: {
	            firstName: "",
	            lastName: "",
	            email: ""
	        }
	    }, 
	 
	    set_category: function(ct) {
	        this.data = this["data" + ct];
	    }, 
	    data: {}, 
	    set_ext: function (elem, index) {
	        var phone_ext = elem.inputmask('unmaskedvalue'); 

	        this.data.leadership[index].extension = phone_ext.substr(phone_ext.length - 4);
	        this.data.leadership[index].phone = phone_ext.substr(0, phone_ext.length - 4);
	     
	    },
	    set_regions: function (elem, flag, index) {
	        var r = elem.val().split(' ');

	        if (!flag) {
	            this.data.regions = r.map(function (item) {
	                return {
	                    zipcode: item,
	                    latlng: "",
	                    formattedAddress: "",
	                    region: "",
	                    state: ""
	                }
	            })
	        } else {
	            this.data.programs[index].regions = r.map(function (item) {
	                return {
	                    zipcode: item,
	                    latlng: "",
	                    formattedAddress: "",
	                    region: "",
	                    state: ""
	                }
	            })
	        }

	    },

	    set_field: function (elem, propname, nested_prop, old_elem) {
	        if (elem.attr('data-type') == 'file') {
	            if (!old_elem.prop('files')) return false; 

	            if (elem.prop('files').length > 0) {
	                if (typeof elem.prop('files')[0] != 'undefined') {
	                    this.data[propname] = elem.prop('files')[0].name;
	                } else {
	                    this.data[propname] = ''; 
	                }
	   
	            } else if (old_elem.prop('files').length > 0) {
	                if (typeof old_elem.prop('files')[0] != 'undefined') {
	                    this.data[propname] = old_elem.prop('files')[0].name;
	                } else {
	                    this.data[propname] = '';
	                }
	            }

	        } else {
	            if (!nested_prop) {
	             
	                if (Object.prototype.toString.call(this.data[propname]) === '[object Array]') {
	                    this.data[propname].push(elem.val())
	                }
	                else {
	                    if (elem.attr('data-maskval') == 'cash') {
	                        var v = elem.val().replace('$ ', '');
	                        v = v.replace(',', '');
	                        v = parseFloat(v);
	                        if (isNaN(v)) { v = 0 }
	                        this.data[propname] = v;

	                    } else if (elem.attr('data-maskval') == '(999) 999-9999') {
	                        var v = elem.inputmask('unmaskedvalue');
	                        this.data[propname] = v;

	                    } else if (elem.attr('data-maskval') == '9999') {
	                        var v = elem.inputmask('unmaskedvalue');
	                        v = parseInt(v);

	                        if (isNaN(v)) { v = 0 }
	                        this.data[propname] = v;
	                    } else if (elem.attr('data-maskval') == 'nums') {
	                        v = parseInt(elem.val()); 
	                        if (isNaN(v)) { v = 0 }

	                        this.data[propname] = v;
	                    }
	                    else if (propname == 'numberOfStaff') {
	                        var v = parseInt(elem.val());
	                        if (isNaN(v)) { v = 0 }
	                        this.data[propname] = v;
	                    }
	                    else if (elem.hasClass('rad2')) {
	                        if (elem.prop('checked')) {
	                            if (elem.val() == 'true') {
	                                var v = true;
	                            } else {
	                                var v = false;
	                            }

	                            this.data[propname] = v;
	                        }
	                    } else {
	                        this.data[propname] = elem.val();
	                    }
	                }
	            }
	            else {
	       
	                this.data[propname][nested_prop] = elem.val(); 
	            }
	        }
	 
	    },
	    
	    isSet: false, 
	    set_multi: function (elem, catname, propname, index, flag) {

	        var obj = {};

	        if (typeof this.data[catname][index] == 'undefined') {

	            this.data[catname].push(obj);

	            map_vals.call(this);

	        } else {

	            map_vals.call(this); 
	        }

	        function map_vals() {
	            if (elem.attr('data-type') != 'file') {
	                if (propname != 'phoneExt') {
	                 
	                    if (elem.hasClass('rad2')) {
	                        if (!isNaN(parseInt(propname.substr(propname.length - 1)))) {
	                            propname = propname.substr(0, propname.length - 1);
	                        }

	                        if (flag && !this.isSet) {
	                            this.data[catname][index][propname] = true
	                            this.isSet = true;
	                            return false; 
	                        };
	                        if (!flag && !this.isSet) {
	                            this.data[catname][index][propname] = false;
	                            this.isSet = true;
	                            return false;
	                        };
	                        if (!flag && this.isSet) {
	                            this.isSet = false;
	                            return false;
	                        }
	                        if (flag && this.isSet) {
	                            this.isSet = false;
	                            return false;
	                        }
	                    } else {

	                        if (elem.attr('data-maskval') == 'cash') {
	                            var v = elem.val().replace('$ ', '');
	                            v = v.replace(',', '');
	                            v = parseFloat(v);
	                            if (isNaN(v)) { v = 0 }
	                            this.data[catname][index][propname] = v;

	                        } else if (elem.attr('data-maskval') == 'nums') {
	                            v = parseInt(elem.val());
	                            if (isNaN(v)) { v = 0 }

	                            this.data[catname][index][propname] = v;
	                        }
	                        else {
	                            this.data[catname][index][propname] = elem.val();
	                        }
	                       
	                    }
	                }
	  
	                else {
	                    this.set_ext(elem, index);
	                }
	            }
	            else {
	                try {
	                    if (typeof elem.prop('files') != 'undefined') {
	                        if (typeof elem.prop('files')[0] != 'undefined') {
	                            this.data[catname][index][propname] = elem.prop('files')[0].name;
	                        } else {
	                            this.data[catname][index][propname] = '';
	                        }
	                    }
	                } catch (err) {
	                    this.data[catname][index][propname] = '';
	                }
	            }

	        }

	    },


	    set_drop: function (drop, propname, flag, index) {

	        var opts = drop.find(":selected");

	        if (opts.length == 0) return false; 

	        if (!flag) {
	            var data = this.data; 
	        } else {
	            if (drop.hasClass('p')) {
	                var data = this.data.programs[index];
	            } else if (drop.hasClass('o')) {
	                var data = this.data.outcomes[index];
	            }
	        }

	        if (typeof data[propname] != 'undefined') {
	            if (data[propname].length > 0) {
	                data[propname] = [];
	            }
	            if (Object.prototype.toString.call(data[propname]) !== '[object Array]') {
	                data[propname] = [];
	            }
	        } else {
	            data[propname] = [];
	        }

	            if (drop.find('optgroup').length > 0) {

	                var optgroups= drop.find('optgroup'); 

	                for (var i = 0; i < optgroups.length; i++) {

	                    data[propname].push({});
	                    data[propname][i][optgroups.eq(i).attr('label')] = [];

	                    var cells = optgroups.eq(i).find(':selected');

	                    for (var j = 0; j < cells.length; j++) {
	                        data[propname][i][optgroups.eq(i).attr('label')].push(cells.eq(j).val());
	                    }
	                }

	             

	            } else {
	                for (var i = 0; i < opts.length; i++) {
	                    data[propname].push(opts.eq(i).val()); 
	                }
	            }

	            if (drop.hasClass('one-dimension')) {
	                var v = data[propname][0];
	                data[propname] = v; 
	            }

	            if (propname == 'populationServed' && data[propname].length > 0) {
	                var v = data[propname].join(', ');
	                data[propname] = v; 
	            }
	         
	    },

	    get_data: function (ct) {
	        return this.data; 
	    },

	    get_json_data: function () {
	        return JSON.stringify(this.data); 
	    },
	    refresh_data: function () {
	        for (prop in this.data) {
	            
	            if (Object.prototype.toString.call(this.data[prop]) === '[object Array]') {
	                this.data[prop] = new Array(); 
	         
	            } else if (Object.prototype.toString.call(this.data[prop]) === '[object Object]') {
	                for (prop1 in this.data[prop]) {
	                    this.data[prop][prop1] = {}
	                }
	            }
	            else if (typeof this.data[prop] == 'number') {
	                this.data[prop] = 0; 
	            } 
	            else {
	            this.data[prop] = ''; 
	            }
	        }
	    }

	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var data_handler = __webpack_require__(17); 

	module.exports = {

	    send_data: function() {
	        // get form data in json format
	        var data = data_handler.get_json_data();
	        console.log('-------form data json------');
	        console.log(data);

	        // send data
	        try {
	            var xhr = new XMLHttpRequest();
	            xhr.open('POST', '/');

	            xhr.send(data);
	            xhr.onload = function () {
	                console.log('request successful');
	            }
	            xhr.onerror = function () {
	                console.log('request error');
	            }
	        } catch (err) {
	            console.log('request error'); 
	        }
	    }

	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var data_handler = __webpack_require__(17);
	var json_handler = __webpack_require__(18); 
	var radio_handler = __webpack_require__(4);
	var inputmask_handler = __webpack_require__(6);
	var focus_handler = __webpack_require__(7);
	var question_change_handler = __webpack_require__(9);
	var file_handler = __webpack_require__(12);
	var add_input_handler = __webpack_require__(13);
	var dropdown_select_handler = __webpack_require__(14);
	var nested_dropdown_handler = __webpack_require__(15);
	var route_handler = __webpack_require__(16);

	module.exports = {

	    add_submit_handlers: function () {
	        var self = this; 
	        $('#ct0').on('submit', function (e) {

	            e.preventDefault();
	            self.handle_submit.call($('#ct0'), e, '0');
	        });
	        $('#ct1').on('submit', function (e) {
	           
	            if ($('.add-program-btn').hasClass('clicked')) {
	                $('.add-program-btn').removeClass('clicked');
	                e.preventDefault();
	                self.handle_submit.call($('#ct1'), e, '1', true);
	            } else {
	                e.preventDefault();
	                self.handle_submit.call($('#ct1'), e, '1');
	            }

	        });
	        $('#ct2').on('submit', function (e) {

	            if ($('.add-event-btn').hasClass('clicked')) {
	                $('.add-event-btn').removeClass('clicked');
	                e.preventDefault();
	                self.handle_submit.call($('#ct2'), e, '2', true);
	            } else {

	                e.preventDefault();
	                self.handle_submit.call($('#ct2'), e, '2');
	            }

	        });

	        $('.add-program-btn').on('click', function () {
	            $(this).addClass('clicked');
	        });

	        $('.add-event-btn').on('click', function () {
	            $(this).addClass('clicked'); 
	        })
	    }, 
	    remove_submit_handlers: function() {
	        $('#ct0').unbind();
	        $('#ct1').unbind();
	        $('#ct2').unbind();
	        $('.add-program-btn').unbind(); 
	    },
	    handle_submit: function (e, ct, flag) {

	        if ($(this).find('.invalid').length > 0) {
	            $(this).find('.error').html('form contains invalid data');
	            return false; 
	        } else {
	            $(this).find('.error').html('');
	        }        

	        var txts = $(this).find('textarea');
	        for (var i = 0; i < txts.length; i++) {
	            if (typeof txts.eq(i).attr('data-wordcount') != 'undefined') {
	                var textval = txts.eq(i).val();
	                textval = textval.replace(/[^a-zA-Z\s]/g, '');

	                var words = textval.split(/[\s]+/);

	                if (words.length > parseInt(txts.eq(i).attr('data-wordcount'))) {
	                    var err_container = $(this).find('.error').html('word limit exceeded'); 
	                    return false;
	                } else {
	                    $(this).find('.error').html('');
	                }
	            }
	        }

	        data_handler.refresh_data();

	        var wrap = $('.category-wrap[data-category="' + ct + '"]');
	        var inputs = wrap.find('.map-input').not('.hidden-addition').not('.l').not('.a').not('.sel');

	        var form_inputs = $(this).find('.map-input').not('.hidden-addition').not('.l').not('.a').not('.sel');

	        var leadership_inputs = $(this).find('.map-input.l').not('.hidden-addition');
	        var address_inputs = $(this).find('.map-input.a').not('.hidden-addition');
	        var dropdowns = $(this).find('.map-input.sel').not('.hidden-addition');

	        if (ct == "2") {
	            for (var i = 0; i < form_inputs.length; i++) {
	                var propname = form_inputs.eq(i).attr('name');
	                if (typeof propname != 'undefined') {
	                    if (propname.split('.').length > 1) {
	                        var nested_prop = propname.split('.')[1];
	                        var propname = propname.split('.')[0];
	                      
	                        data_handler.set_field(form_inputs.eq(i), propname, nested_prop);
	                    } else {
	                        data_handler.set_field(form_inputs.eq(i), propname, null, inputs.eq(i));
	                    }
	                }
	            }

	            for (var i = 0; i < dropdowns.length; i++) {
	                var ind = form_inputs.eq(i).attr('data-index');
	                data_handler.set_drop(dropdowns.eq(i), dropdowns.eq(i).attr('data-name'));
	            }
	        }


	        console.log('-------form data---------');
	        console.log(data_handler.get_data());

	        // send form data
	        json_handler.send_data(); 
			
	        function view (data, init_flag, add_flag) {

	           
	            $('.form-preview-wrap').fadeOut(500, function () {

	                $('input[type="radio"]').css({
	                    'display': 'none'
	                });

	                $('.form-preview-wrap').find('.form-input2').remove();
	                $('.form-wrap').find('.category-wrap[data-category="' + data.ct + '"]').css({ 'display': 'block' });
	                $('.form-wrap').find('.category-wrap[data-category!="' + data.ct + '"]').css({ 'display': 'none' });

	                $('.big-container').fadeIn(500);
	                var max = 3;

	                var step = 100 / max;
	                var w = step * data.ct;

	                $('.meter-top span').animate({
	                    width: w + '%'
	                }, {
	                    duration: 500,
	                    complete: function () {
	                        $('.stats').html(data.ct + '/3');
	                    }
	                });
	                $('.form-wrap').fadeIn(300);

	            });

	            if (add_flag) {
	                var data_handler = __webpack_require__(17);
	                var json_handler = __webpack_require__(18);
	                var radio_handler = __webpack_require__(4);
	                var inputmask_handler = __webpack_require__(6);
	                var focus_handler = __webpack_require__(7);
	                var question_change_handler = __webpack_require__(9);
	                var file_handler = __webpack_require__(12);
	                var add_input_handler = __webpack_require__(13);
	                var dropdown_select_handler = __webpack_require__(14);
	                var nested_dropdown_handler = __webpack_require__(15);
	                var route_handler = __webpack_require__(16);;

	                if (data.ct == '1') {
	                    var ct1 = route_handler.ct;
	                    ct2 = ct1.clone();
	                    $('.form-wrap').find('.category-wrap[data-category="1"]').remove();
	                    if ($('.form-wrap').find('.category-wrap[data-category="0"]').length > 0) {
	                        $('.form-wrap').find('.category-wrap[data-category="0"]').after(ct2);
	                    } else {
	                        $('.form-wrap').append(ct2);
	                    }

	                   
	                } else if (data.ct == '2') {
	                    var ct1 = route_handler.ct2;
	                    ct2 = ct1.clone();
	                    $('.form-wrap').find('.category-wrap[data-category="2"]').remove();
	                    if ($('.form-wrap').find('.category-wrap[data-category="1"]').length > 0) {
	                        $('.form-wrap').find('.category-wrap[data-category="1"]').after(ct2);
	                    } else {
	                        $('.form-wrap').append(ct2);
	                    }
	                }
	                init_flag = false; 
	            }

	            if (!init_flag) {

	                init_flag = true;

	                radio_handler();
	                inputmask_handler();
	                focus_handler();
	                question_change_handler();
	                file_handler();
	                add_input_handler();
	                dropdown_select_handler();
	                nested_dropdown_handler();
	                route_handler.preview_handler(data)

	            }



	            $('.category-wrap[data-category="' + data.ct + '"]').find('.autofocus').trigger('focus');

	        }
			
	        if (!flag) {
	            if (ct < 2) {
	                var next_cat = parseInt(ct) + 1;
	                try {
	                    $.router.go('/view/' + next_cat);
	                } catch (err) {
	                    var dt = {
	                        ct: next_cat
	                    }
	                    view(dt);
	                }
	            } else {
	                try {
	                    $.router.go('/done');
	                } catch (err) {
	                    done();
	                }


	                function done() {

	                    $('.stats').html('3/3');
	                    $('.meter-top span').animate({
	                        width: '100%'
	                    }, {
	                        duration: 500,
	                        complete: function () {

	                            $('.big-container').fadeOut(500, function () {
	                                $('.thank-you-screen').css({
	                                    'height': '100%'
	                                });
	                                $('.thank-you-screen').animate({
	                                    opacity: 1
	                                }, 700);
	                            });
	                        }
	                    })

	                }
	            }
	        } else {
	         
	            $('#ct0').unbind();
	            $('#ct1').unbind();
	            $('#ct2').unbind();
	            $('.add-program-btn').unbind();

	            $('*').unbind();
	        
	            view({ ct: parseInt(ct) }, true, true);
	           


	            
	        }
	    }

	}

/***/ }
/******/ ]);