"use strict";var precacheConfig=[["/eco/index.html","dd19e8984389b77bd920dba25a36a47f"],["/eco/static/css/main.d5f31395.css","a094a40d38d0f8904625457773b2ca62"],["/eco/static/js/main.42ce6d43.js","1941e90737191d1bff811679f2331e8a"],["/eco/static/media/bank.b1ee7ffe.svg","b1ee7ffe9705e7c7dff1e72a3da04ad0"],["/eco/static/media/circle.5d64416f.svg","5d64416fbd89691fb2d773a9e30c60f9"],["/eco/static/media/cross.ca3cb1e8.svg","ca3cb1e8181e7e24c84fa2fdd471b26b"],["/eco/static/media/game.51cb987c.svg","51cb987cde77e6c3795368eb49a649ab"],["/eco/static/media/home.7852d2a2.png","7852d2a201d3aea0d6a647ee9c769e30"],["/eco/static/media/home.e1b5570a.svg","e1b5570ae0f558e15d1b0b854e171bb5"],["/eco/static/media/job.66bb2d01.svg","66bb2d019e7a886541a7a5b1fc9c3ba9"],["/eco/static/media/left.1d352a15.svg","1d352a15502b2888d596542c29a1a06a"],["/eco/static/media/right.64a9e5ff.svg","64a9e5fffd50d138f05b79c9e50ed49f"],["/eco/static/media/s.0955caab.png","0955caab9d5796325900f0c0a0f1f37b"],["/eco/static/media/shop.ba249130.svg","ba249130a43fa836436cd03023ea5732"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/eco/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});