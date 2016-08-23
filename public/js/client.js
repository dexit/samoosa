"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj;};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;})({1:[function(require,module,exports){(function(process,global){ /* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2015 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */ /**
 * bluebird build version 3.4.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/!function(e){if("object"==(typeof exports==="undefined"?"undefined":_typeof(exports))&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else {var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e();}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){var SomePromiseArray=Promise._SomePromiseArray;function any(promises){var ret=new SomePromiseArray(promises);var promise=ret.promise();ret.setHowMany(1);ret.setUnwrap();ret.init();return promise;}Promise.any=function(promises){return any(promises);};Promise.prototype.any=function(){return any(this);};};},{}],2:[function(_dereq_,module,exports){"use strict";var firstLineError;try{throw new Error();}catch(e){firstLineError=e;}var schedule=_dereq_("./schedule");var Queue=_dereq_("./queue");var util=_dereq_("./util");function Async(){this._customScheduler=false;this._isTickUsed=false;this._lateQueue=new Queue(16);this._normalQueue=new Queue(16);this._haveDrainedQueues=false;this._trampolineEnabled=true;var self=this;this.drainQueues=function(){self._drainQueues();};this._schedule=schedule;}Async.prototype.setScheduler=function(fn){var prev=this._schedule;this._schedule=fn;this._customScheduler=true;return prev;};Async.prototype.hasCustomScheduler=function(){return this._customScheduler;};Async.prototype.enableTrampoline=function(){this._trampolineEnabled=true;};Async.prototype.disableTrampolineIfNecessary=function(){if(util.hasDevTools){this._trampolineEnabled=false;}};Async.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues;};Async.prototype.fatalError=function(e,isNode){if(isNode){process.stderr.write("Fatal "+(e instanceof Error?e.stack:e)+"\n");process.exit(2);}else {this.throwLater(e);}};Async.prototype.throwLater=function(fn,arg){if(arguments.length===1){arg=fn;fn=function fn(){throw arg;};}if(typeof setTimeout!=="undefined"){setTimeout(function(){fn(arg);},0);}else try{this._schedule(function(){fn(arg);});}catch(e){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");}};function AsyncInvokeLater(fn,receiver,arg){this._lateQueue.push(fn,receiver,arg);this._queueTick();}function AsyncInvoke(fn,receiver,arg){this._normalQueue.push(fn,receiver,arg);this._queueTick();}function AsyncSettlePromises(promise){this._normalQueue._pushOne(promise);this._queueTick();}if(!util.hasDevTools){Async.prototype.invokeLater=AsyncInvokeLater;Async.prototype.invoke=AsyncInvoke;Async.prototype.settlePromises=AsyncSettlePromises;}else {Async.prototype.invokeLater=function(fn,receiver,arg){if(this._trampolineEnabled){AsyncInvokeLater.call(this,fn,receiver,arg);}else {this._schedule(function(){setTimeout(function(){fn.call(receiver,arg);},100);});}};Async.prototype.invoke=function(fn,receiver,arg){if(this._trampolineEnabled){AsyncInvoke.call(this,fn,receiver,arg);}else {this._schedule(function(){fn.call(receiver,arg);});}};Async.prototype.settlePromises=function(promise){if(this._trampolineEnabled){AsyncSettlePromises.call(this,promise);}else {this._schedule(function(){promise._settlePromises();});}};}Async.prototype.invokeFirst=function(fn,receiver,arg){this._normalQueue.unshift(fn,receiver,arg);this._queueTick();};Async.prototype._drainQueue=function(queue){while(queue.length()>0){var fn=queue.shift();if(typeof fn!=="function"){fn._settlePromises();continue;}var receiver=queue.shift();var arg=queue.shift();fn.call(receiver,arg);}};Async.prototype._drainQueues=function(){this._drainQueue(this._normalQueue);this._reset();this._haveDrainedQueues=true;this._drainQueue(this._lateQueue);};Async.prototype._queueTick=function(){if(!this._isTickUsed){this._isTickUsed=true;this._schedule(this.drainQueues);}};Async.prototype._reset=function(){this._isTickUsed=false;};module.exports=Async;module.exports.firstLineError=firstLineError;},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,debug){var calledBind=false;var rejectThis=function rejectThis(_,e){this._reject(e);};var targetRejected=function targetRejected(e,context){context.promiseRejectionQueued=true;context.bindingPromise._then(rejectThis,rejectThis,null,this,e);};var bindingResolved=function bindingResolved(thisArg,context){if((this._bitField&50397184)===0){this._resolveCallback(context.target);}};var bindingRejected=function bindingRejected(e,context){if(!context.promiseRejectionQueued)this._reject(e);};Promise.prototype.bind=function(thisArg){if(!calledBind){calledBind=true;Promise.prototype._propagateFrom=debug.propagateFromFunction();Promise.prototype._boundValue=debug.boundValueFunction();}var maybePromise=tryConvertToPromise(thisArg);var ret=new Promise(INTERNAL);ret._propagateFrom(this,1);var target=this._target();ret._setBoundTo(maybePromise);if(maybePromise instanceof Promise){var context={promiseRejectionQueued:false,promise:ret,target:target,bindingPromise:maybePromise};target._then(INTERNAL,targetRejected,undefined,ret,context);maybePromise._then(bindingResolved,bindingRejected,undefined,ret,context);ret._setOnCancel(maybePromise);}else {ret._resolveCallback(target);}return ret;};Promise.prototype._setBoundTo=function(obj){if(obj!==undefined){this._bitField=this._bitField|2097152;this._boundTo=obj;}else {this._bitField=this._bitField&~2097152;}};Promise.prototype._isBound=function(){return (this._bitField&2097152)===2097152;};Promise.bind=function(thisArg,value){return Promise.resolve(value).bind(thisArg);};};},{}],4:[function(_dereq_,module,exports){"use strict";var old;if(typeof Promise!=="undefined")old=Promise;function noConflict(){try{if(Promise===bluebird)Promise=old;}catch(e){}return bluebird;}var bluebird=_dereq_("./promise")();bluebird.noConflict=noConflict;module.exports=bluebird;},{"./promise":22}],5:[function(_dereq_,module,exports){"use strict";var cr=Object.create;if(cr){var callerCache=cr(null);var getterCache=cr(null);callerCache[" size"]=getterCache[" size"]=0;}module.exports=function(Promise){var util=_dereq_("./util");var canEvaluate=util.canEvaluate;var isIdentifier=util.isIdentifier;var getMethodCaller;var getGetter;if(!true){var makeMethodCaller=function makeMethodCaller(methodName){return new Function("ensureMethod","                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g,methodName))(ensureMethod);};var makeGetter=function makeGetter(propertyName){return new Function("obj","                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName",propertyName));};var getCompiled=function getCompiled(name,compiler,cache){var ret=cache[name];if(typeof ret!=="function"){if(!isIdentifier(name)){return null;}ret=compiler(name);cache[name]=ret;cache[" size"]++;if(cache[" size"]>512){var keys=Object.keys(cache);for(var i=0;i<256;++i){delete cache[keys[i]];}cache[" size"]=keys.length-256;}}return ret;};getMethodCaller=function getMethodCaller(name){return getCompiled(name,makeMethodCaller,callerCache);};getGetter=function getGetter(name){return getCompiled(name,makeGetter,getterCache);};}function ensureMethod(obj,methodName){var fn;if(obj!=null)fn=obj[methodName];if(typeof fn!=="function"){var message="Object "+util.classString(obj)+" has no method '"+util.toString(methodName)+"'";throw new Promise.TypeError(message);}return fn;}function caller(obj){var methodName=this.pop();var fn=ensureMethod(obj,methodName);return fn.apply(obj,this);}Promise.prototype.call=function(methodName){var args=[].slice.call(arguments,1);;if(!true){if(canEvaluate){var maybeCaller=getMethodCaller(methodName);if(maybeCaller!==null){return this._then(maybeCaller,undefined,undefined,args,undefined);}}}args.push(methodName);return this._then(caller,undefined,undefined,args,undefined);};function namedGetter(obj){return obj[this];}function indexedGetter(obj){var index=+this;if(index<0)index=Math.max(0,index+obj.length);return obj[index];}Promise.prototype.get=function(propertyName){var isIndex=typeof propertyName==="number";var getter;if(!isIndex){if(canEvaluate){var maybeGetter=getGetter(propertyName);getter=maybeGetter!==null?maybeGetter:namedGetter;}else {getter=namedGetter;}}else {getter=indexedGetter;}return this._then(getter,undefined,undefined,propertyName,undefined);};};},{"./util":36}],6:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection,debug){var util=_dereq_("./util");var tryCatch=util.tryCatch;var errorObj=util.errorObj;var async=Promise._async;Promise.prototype["break"]=Promise.prototype.cancel=function(){if(!debug.cancellation())return this._warn("cancellation is disabled");var promise=this;var child=promise;while(promise.isCancellable()){if(!promise._cancelBy(child)){if(child._isFollowing()){child._followee().cancel();}else {child._cancelBranched();}break;}var parent=promise._cancellationParent;if(parent==null||!parent.isCancellable()){if(promise._isFollowing()){promise._followee().cancel();}else {promise._cancelBranched();}break;}else {if(promise._isFollowing())promise._followee().cancel();child=promise;promise=parent;}}};Promise.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--;};Promise.prototype._enoughBranchesHaveCancelled=function(){return this._branchesRemainingToCancel===undefined||this._branchesRemainingToCancel<=0;};Promise.prototype._cancelBy=function(canceller){if(canceller===this){this._branchesRemainingToCancel=0;this._invokeOnCancel();return true;}else {this._branchHasCancelled();if(this._enoughBranchesHaveCancelled()){this._invokeOnCancel();return true;}}return false;};Promise.prototype._cancelBranched=function(){if(this._enoughBranchesHaveCancelled()){this._cancel();}};Promise.prototype._cancel=function(){if(!this.isCancellable())return;this._setCancelled();async.invoke(this._cancelPromises,this,undefined);};Promise.prototype._cancelPromises=function(){if(this._length()>0)this._settlePromises();};Promise.prototype._unsetOnCancel=function(){this._onCancelField=undefined;};Promise.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled();};Promise.prototype._doInvokeOnCancel=function(onCancelCallback,internalOnly){if(util.isArray(onCancelCallback)){for(var i=0;i<onCancelCallback.length;++i){this._doInvokeOnCancel(onCancelCallback[i],internalOnly);}}else if(onCancelCallback!==undefined){if(typeof onCancelCallback==="function"){if(!internalOnly){var e=tryCatch(onCancelCallback).call(this._boundValue());if(e===errorObj){this._attachExtraTrace(e.e);async.throwLater(e.e);}}}else {onCancelCallback._resultCancelled(this);}}};Promise.prototype._invokeOnCancel=function(){var onCancelCallback=this._onCancel();this._unsetOnCancel();async.invoke(this._doInvokeOnCancel,this,onCancelCallback);};Promise.prototype._invokeInternalOnCancel=function(){if(this.isCancellable()){this._doInvokeOnCancel(this._onCancel(),true);this._unsetOnCancel();}};Promise.prototype._resultCancelled=function(){this.cancel();};};},{"./util":36}],7:[function(_dereq_,module,exports){"use strict";module.exports=function(NEXT_FILTER){var util=_dereq_("./util");var getKeys=_dereq_("./es5").keys;var tryCatch=util.tryCatch;var errorObj=util.errorObj;function catchFilter(instances,cb,promise){return function(e){var boundTo=promise._boundValue();predicateLoop: for(var i=0;i<instances.length;++i){var item=instances[i];if(item===Error||item!=null&&item.prototype instanceof Error){if(e instanceof item){return tryCatch(cb).call(boundTo,e);}}else if(typeof item==="function"){var matchesPredicate=tryCatch(item).call(boundTo,e);if(matchesPredicate===errorObj){return matchesPredicate;}else if(matchesPredicate){return tryCatch(cb).call(boundTo,e);}}else if(util.isObject(e)){var keys=getKeys(item);for(var j=0;j<keys.length;++j){var key=keys[j];if(item[key]!=e[key]){continue predicateLoop;}}return tryCatch(cb).call(boundTo,e);}}return NEXT_FILTER;};}return catchFilter;};},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){var longStackTraces=false;var contextStack=[];Promise.prototype._promiseCreated=function(){};Promise.prototype._pushContext=function(){};Promise.prototype._popContext=function(){return null;};Promise._peekContext=Promise.prototype._peekContext=function(){};function Context(){this._trace=new Context.CapturedTrace(peekContext());}Context.prototype._pushContext=function(){if(this._trace!==undefined){this._trace._promiseCreated=null;contextStack.push(this._trace);}};Context.prototype._popContext=function(){if(this._trace!==undefined){var trace=contextStack.pop();var ret=trace._promiseCreated;trace._promiseCreated=null;return ret;}return null;};function createContext(){if(longStackTraces)return new Context();}function peekContext(){var lastIndex=contextStack.length-1;if(lastIndex>=0){return contextStack[lastIndex];}return undefined;}Context.CapturedTrace=null;Context.create=createContext;Context.deactivateLongStackTraces=function(){};Context.activateLongStackTraces=function(){var Promise_pushContext=Promise.prototype._pushContext;var Promise_popContext=Promise.prototype._popContext;var Promise_PeekContext=Promise._peekContext;var Promise_peekContext=Promise.prototype._peekContext;var Promise_promiseCreated=Promise.prototype._promiseCreated;Context.deactivateLongStackTraces=function(){Promise.prototype._pushContext=Promise_pushContext;Promise.prototype._popContext=Promise_popContext;Promise._peekContext=Promise_PeekContext;Promise.prototype._peekContext=Promise_peekContext;Promise.prototype._promiseCreated=Promise_promiseCreated;longStackTraces=false;};longStackTraces=true;Promise.prototype._pushContext=Context.prototype._pushContext;Promise.prototype._popContext=Context.prototype._popContext;Promise._peekContext=Promise.prototype._peekContext=peekContext;Promise.prototype._promiseCreated=function(){var ctx=this._peekContext();if(ctx&&ctx._promiseCreated==null)ctx._promiseCreated=this;};};return Context;};},{}],9:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,Context){var getDomain=Promise._getDomain;var async=Promise._async;var Warning=_dereq_("./errors").Warning;var util=_dereq_("./util");var canAttachTrace=util.canAttachTrace;var unhandledRejectionHandled;var possiblyUnhandledRejection;var bluebirdFramePattern=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;var stackFramePattern=null;var formatStack=null;var indentStackFrames=false;var printWarning;var debugging=!!(util.env("BLUEBIRD_DEBUG")!=0&&(true||util.env("BLUEBIRD_DEBUG")||util.env("NODE_ENV")==="development"));var warnings=!!(util.env("BLUEBIRD_WARNINGS")!=0&&(debugging||util.env("BLUEBIRD_WARNINGS")));var longStackTraces=!!(util.env("BLUEBIRD_LONG_STACK_TRACES")!=0&&(debugging||util.env("BLUEBIRD_LONG_STACK_TRACES")));var wForgottenReturn=util.env("BLUEBIRD_W_FORGOTTEN_RETURN")!=0&&(warnings||!!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));Promise.prototype.suppressUnhandledRejections=function(){var target=this._target();target._bitField=target._bitField&~1048576|524288;};Promise.prototype._ensurePossibleRejectionHandled=function(){if((this._bitField&524288)!==0)return;this._setRejectionIsUnhandled();async.invokeLater(this._notifyUnhandledRejection,this,undefined);};Promise.prototype._notifyUnhandledRejectionIsHandled=function(){fireRejectionEvent("rejectionHandled",unhandledRejectionHandled,undefined,this);};Promise.prototype._setReturnedNonUndefined=function(){this._bitField=this._bitField|268435456;};Promise.prototype._returnedNonUndefined=function(){return (this._bitField&268435456)!==0;};Promise.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var reason=this._settledValue();this._setUnhandledRejectionIsNotified();fireRejectionEvent("unhandledRejection",possiblyUnhandledRejection,reason,this);}};Promise.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=this._bitField|262144;};Promise.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=this._bitField&~262144;};Promise.prototype._isUnhandledRejectionNotified=function(){return (this._bitField&262144)>0;};Promise.prototype._setRejectionIsUnhandled=function(){this._bitField=this._bitField|1048576;};Promise.prototype._unsetRejectionIsUnhandled=function(){this._bitField=this._bitField&~1048576;if(this._isUnhandledRejectionNotified()){this._unsetUnhandledRejectionIsNotified();this._notifyUnhandledRejectionIsHandled();}};Promise.prototype._isRejectionUnhandled=function(){return (this._bitField&1048576)>0;};Promise.prototype._warn=function(message,shouldUseOwnTrace,promise){return warn(message,shouldUseOwnTrace,promise||this);};Promise.onPossiblyUnhandledRejection=function(fn){var domain=getDomain();possiblyUnhandledRejection=typeof fn==="function"?domain===null?fn:domain.bind(fn):undefined;};Promise.onUnhandledRejectionHandled=function(fn){var domain=getDomain();unhandledRejectionHandled=typeof fn==="function"?domain===null?fn:domain.bind(fn):undefined;};var disableLongStackTraces=function disableLongStackTraces(){};Promise.longStackTraces=function(){if(async.haveItemsQueued()&&!config.longStackTraces){throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");}if(!config.longStackTraces&&longStackTracesIsSupported()){var Promise_captureStackTrace=Promise.prototype._captureStackTrace;var Promise_attachExtraTrace=Promise.prototype._attachExtraTrace;config.longStackTraces=true;disableLongStackTraces=function disableLongStackTraces(){if(async.haveItemsQueued()&&!config.longStackTraces){throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");}Promise.prototype._captureStackTrace=Promise_captureStackTrace;Promise.prototype._attachExtraTrace=Promise_attachExtraTrace;Context.deactivateLongStackTraces();async.enableTrampoline();config.longStackTraces=false;};Promise.prototype._captureStackTrace=longStackTracesCaptureStackTrace;Promise.prototype._attachExtraTrace=longStackTracesAttachExtraTrace;Context.activateLongStackTraces();async.disableTrampolineIfNecessary();}};Promise.hasLongStackTraces=function(){return config.longStackTraces&&longStackTracesIsSupported();};var fireDomEvent=function(){try{var event=document.createEvent("CustomEvent");event.initCustomEvent("testingtheevent",false,true,{});util.global.dispatchEvent(event);return function(name,event){var domEvent=document.createEvent("CustomEvent");domEvent.initCustomEvent(name.toLowerCase(),false,true,event);return !util.global.dispatchEvent(domEvent);};}catch(e){}return function(){return false;};}();var fireGlobalEvent=function(){if(util.isNode){return function(){return process.emit.apply(process,arguments);};}else {if(!util.global){return function(){return false;};}return function(name){var methodName="on"+name.toLowerCase();var method=util.global[methodName];if(!method)return false;method.apply(util.global,[].slice.call(arguments,1));return true;};}}();function generatePromiseLifecycleEventObject(name,promise){return {promise:promise};}var eventToObjectGenerator={promiseCreated:generatePromiseLifecycleEventObject,promiseFulfilled:generatePromiseLifecycleEventObject,promiseRejected:generatePromiseLifecycleEventObject,promiseResolved:generatePromiseLifecycleEventObject,promiseCancelled:generatePromiseLifecycleEventObject,promiseChained:function promiseChained(name,promise,child){return {promise:promise,child:child};},warning:function warning(name,_warning){return {warning:_warning};},unhandledRejection:function unhandledRejection(name,reason,promise){return {reason:reason,promise:promise};},rejectionHandled:generatePromiseLifecycleEventObject};var activeFireEvent=function activeFireEvent(name){var globalEventFired=false;try{globalEventFired=fireGlobalEvent.apply(null,arguments);}catch(e){async.throwLater(e);globalEventFired=true;}var domEventFired=false;try{domEventFired=fireDomEvent(name,eventToObjectGenerator[name].apply(null,arguments));}catch(e){async.throwLater(e);domEventFired=true;}return domEventFired||globalEventFired;};Promise.config=function(opts){opts=Object(opts);if("longStackTraces" in opts){if(opts.longStackTraces){Promise.longStackTraces();}else if(!opts.longStackTraces&&Promise.hasLongStackTraces()){disableLongStackTraces();}}if("warnings" in opts){var warningsOption=opts.warnings;config.warnings=!!warningsOption;wForgottenReturn=config.warnings;if(util.isObject(warningsOption)){if("wForgottenReturn" in warningsOption){wForgottenReturn=!!warningsOption.wForgottenReturn;}}}if("cancellation" in opts&&opts.cancellation&&!config.cancellation){if(async.haveItemsQueued()){throw new Error("cannot enable cancellation after promises are in use");}Promise.prototype._clearCancellationData=cancellationClearCancellationData;Promise.prototype._propagateFrom=cancellationPropagateFrom;Promise.prototype._onCancel=cancellationOnCancel;Promise.prototype._setOnCancel=cancellationSetOnCancel;Promise.prototype._attachCancellationCallback=cancellationAttachCancellationCallback;Promise.prototype._execute=cancellationExecute;_propagateFromFunction=cancellationPropagateFrom;config.cancellation=true;}if("monitoring" in opts){if(opts.monitoring&&!config.monitoring){config.monitoring=true;Promise.prototype._fireEvent=activeFireEvent;}else if(!opts.monitoring&&config.monitoring){config.monitoring=false;Promise.prototype._fireEvent=defaultFireEvent;}}};function defaultFireEvent(){return false;}Promise.prototype._fireEvent=defaultFireEvent;Promise.prototype._execute=function(executor,resolve,reject){try{executor(resolve,reject);}catch(e){return e;}};Promise.prototype._onCancel=function(){};Promise.prototype._setOnCancel=function(handler){;};Promise.prototype._attachCancellationCallback=function(onCancel){;};Promise.prototype._captureStackTrace=function(){};Promise.prototype._attachExtraTrace=function(){};Promise.prototype._clearCancellationData=function(){};Promise.prototype._propagateFrom=function(parent,flags){;;};function cancellationExecute(executor,resolve,reject){var promise=this;try{executor(resolve,reject,function(onCancel){if(typeof onCancel!=="function"){throw new TypeError("onCancel must be a function, got: "+util.toString(onCancel));}promise._attachCancellationCallback(onCancel);});}catch(e){return e;}}function cancellationAttachCancellationCallback(onCancel){if(!this.isCancellable())return this;var previousOnCancel=this._onCancel();if(previousOnCancel!==undefined){if(util.isArray(previousOnCancel)){previousOnCancel.push(onCancel);}else {this._setOnCancel([previousOnCancel,onCancel]);}}else {this._setOnCancel(onCancel);}}function cancellationOnCancel(){return this._onCancelField;}function cancellationSetOnCancel(onCancel){this._onCancelField=onCancel;}function cancellationClearCancellationData(){this._cancellationParent=undefined;this._onCancelField=undefined;}function cancellationPropagateFrom(parent,flags){if((flags&1)!==0){this._cancellationParent=parent;var branchesRemainingToCancel=parent._branchesRemainingToCancel;if(branchesRemainingToCancel===undefined){branchesRemainingToCancel=0;}parent._branchesRemainingToCancel=branchesRemainingToCancel+1;}if((flags&2)!==0&&parent._isBound()){this._setBoundTo(parent._boundTo);}}function bindingPropagateFrom(parent,flags){if((flags&2)!==0&&parent._isBound()){this._setBoundTo(parent._boundTo);}}var _propagateFromFunction=bindingPropagateFrom;function _boundValueFunction(){var ret=this._boundTo;if(ret!==undefined){if(ret instanceof Promise){if(ret.isFulfilled()){return ret.value();}else {return undefined;}}}return ret;}function longStackTracesCaptureStackTrace(){this._trace=new CapturedTrace(this._peekContext());}function longStackTracesAttachExtraTrace(error,ignoreSelf){if(canAttachTrace(error)){var trace=this._trace;if(trace!==undefined){if(ignoreSelf)trace=trace._parent;}if(trace!==undefined){trace.attachExtraTrace(error);}else if(!error.__stackCleaned__){var parsed=parseStackAndMessage(error);util.notEnumerableProp(error,"stack",parsed.message+"\n"+parsed.stack.join("\n"));util.notEnumerableProp(error,"__stackCleaned__",true);}}}function checkForgottenReturns(returnValue,promiseCreated,name,promise,parent){if(returnValue===undefined&&promiseCreated!==null&&wForgottenReturn){if(parent!==undefined&&parent._returnedNonUndefined())return;if((promise._bitField&65535)===0)return;if(name)name=name+" ";var msg="a promise was created in a "+name+"handler but was not returned from it";promise._warn(msg,true,promiseCreated);}}function deprecated(name,replacement){var message=name+" is deprecated and will be removed in a future version.";if(replacement)message+=" Use "+replacement+" instead.";return warn(message);}function warn(message,shouldUseOwnTrace,promise){if(!config.warnings)return;var warning=new Warning(message);var ctx;if(shouldUseOwnTrace){promise._attachExtraTrace(warning);}else if(config.longStackTraces&&(ctx=Promise._peekContext())){ctx.attachExtraTrace(warning);}else {var parsed=parseStackAndMessage(warning);warning.stack=parsed.message+"\n"+parsed.stack.join("\n");}if(!activeFireEvent("warning",warning)){formatAndLogError(warning,"",true);}}function reconstructStack(message,stacks){for(var i=0;i<stacks.length-1;++i){stacks[i].push("From previous event:");stacks[i]=stacks[i].join("\n");}if(i<stacks.length){stacks[i]=stacks[i].join("\n");}return message+"\n"+stacks.join("\n");}function removeDuplicateOrEmptyJumps(stacks){for(var i=0;i<stacks.length;++i){if(stacks[i].length===0||i+1<stacks.length&&stacks[i][0]===stacks[i+1][0]){stacks.splice(i,1);i--;}}}function removeCommonRoots(stacks){var current=stacks[0];for(var i=1;i<stacks.length;++i){var prev=stacks[i];var currentLastIndex=current.length-1;var currentLastLine=current[currentLastIndex];var commonRootMeetPoint=-1;for(var j=prev.length-1;j>=0;--j){if(prev[j]===currentLastLine){commonRootMeetPoint=j;break;}}for(var j=commonRootMeetPoint;j>=0;--j){var line=prev[j];if(current[currentLastIndex]===line){current.pop();currentLastIndex--;}else {break;}}current=prev;}}function cleanStack(stack){var ret=[];for(var i=0;i<stack.length;++i){var line=stack[i];var isTraceLine="    (No stack trace)"===line||stackFramePattern.test(line);var isInternalFrame=isTraceLine&&shouldIgnore(line);if(isTraceLine&&!isInternalFrame){if(indentStackFrames&&line.charAt(0)!==" "){line="    "+line;}ret.push(line);}}return ret;}function stackFramesAsArray(error){var stack=error.stack.replace(/\s+$/g,"").split("\n");for(var i=0;i<stack.length;++i){var line=stack[i];if("    (No stack trace)"===line||stackFramePattern.test(line)){break;}}if(i>0){stack=stack.slice(i);}return stack;}function parseStackAndMessage(error){var stack=error.stack;var message=error.toString();stack=typeof stack==="string"&&stack.length>0?stackFramesAsArray(error):["    (No stack trace)"];return {message:message,stack:cleanStack(stack)};}function formatAndLogError(error,title,isSoft){if(typeof console!=="undefined"){var message;if(util.isObject(error)){var stack=error.stack;message=title+formatStack(stack,error);}else {message=title+String(error);}if(typeof printWarning==="function"){printWarning(message,isSoft);}else if(typeof console.log==="function"||_typeof(console.log)==="object"){console.log(message);}}}function fireRejectionEvent(name,localHandler,reason,promise){var localEventFired=false;try{if(typeof localHandler==="function"){localEventFired=true;if(name==="rejectionHandled"){localHandler(promise);}else {localHandler(reason,promise);}}}catch(e){async.throwLater(e);}if(name==="unhandledRejection"){if(!activeFireEvent(name,reason,promise)&&!localEventFired){formatAndLogError(reason,"Unhandled rejection ");}}else {activeFireEvent(name,promise);}}function formatNonError(obj){var str;if(typeof obj==="function"){str="[function "+(obj.name||"anonymous")+"]";}else {str=obj&&typeof obj.toString==="function"?obj.toString():util.toString(obj);var ruselessToString=/\[object [a-zA-Z0-9$_]+\]/;if(ruselessToString.test(str)){try{var newStr=JSON.stringify(obj);str=newStr;}catch(e){}}if(str.length===0){str="(empty array)";}}return "(<"+snip(str)+">, no stack trace)";}function snip(str){var maxChars=41;if(str.length<maxChars){return str;}return str.substr(0,maxChars-3)+"...";}function longStackTracesIsSupported(){return typeof captureStackTrace==="function";}var shouldIgnore=function shouldIgnore(){return false;};var parseLineInfoRegex=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;function parseLineInfo(line){var matches=line.match(parseLineInfoRegex);if(matches){return {fileName:matches[1],line:parseInt(matches[2],10)};}}function setBounds(firstLineError,lastLineError){if(!longStackTracesIsSupported())return;var firstStackLines=firstLineError.stack.split("\n");var lastStackLines=lastLineError.stack.split("\n");var firstIndex=-1;var lastIndex=-1;var firstFileName;var lastFileName;for(var i=0;i<firstStackLines.length;++i){var result=parseLineInfo(firstStackLines[i]);if(result){firstFileName=result.fileName;firstIndex=result.line;break;}}for(var i=0;i<lastStackLines.length;++i){var result=parseLineInfo(lastStackLines[i]);if(result){lastFileName=result.fileName;lastIndex=result.line;break;}}if(firstIndex<0||lastIndex<0||!firstFileName||!lastFileName||firstFileName!==lastFileName||firstIndex>=lastIndex){return;}shouldIgnore=function shouldIgnore(line){if(bluebirdFramePattern.test(line))return true;var info=parseLineInfo(line);if(info){if(info.fileName===firstFileName&&firstIndex<=info.line&&info.line<=lastIndex){return true;}}return false;};}function CapturedTrace(parent){this._parent=parent;this._promisesCreated=0;var length=this._length=1+(parent===undefined?0:parent._length);captureStackTrace(this,CapturedTrace);if(length>32)this.uncycle();}util.inherits(CapturedTrace,Error);Context.CapturedTrace=CapturedTrace;CapturedTrace.prototype.uncycle=function(){var length=this._length;if(length<2)return;var nodes=[];var stackToIndex={};for(var i=0,node=this;node!==undefined;++i){nodes.push(node);node=node._parent;}length=this._length=i;for(var i=length-1;i>=0;--i){var stack=nodes[i].stack;if(stackToIndex[stack]===undefined){stackToIndex[stack]=i;}}for(var i=0;i<length;++i){var currentStack=nodes[i].stack;var index=stackToIndex[currentStack];if(index!==undefined&&index!==i){if(index>0){nodes[index-1]._parent=undefined;nodes[index-1]._length=1;}nodes[i]._parent=undefined;nodes[i]._length=1;var cycleEdgeNode=i>0?nodes[i-1]:this;if(index<length-1){cycleEdgeNode._parent=nodes[index+1];cycleEdgeNode._parent.uncycle();cycleEdgeNode._length=cycleEdgeNode._parent._length+1;}else {cycleEdgeNode._parent=undefined;cycleEdgeNode._length=1;}var currentChildLength=cycleEdgeNode._length+1;for(var j=i-2;j>=0;--j){nodes[j]._length=currentChildLength;currentChildLength++;}return;}}};CapturedTrace.prototype.attachExtraTrace=function(error){if(error.__stackCleaned__)return;this.uncycle();var parsed=parseStackAndMessage(error);var message=parsed.message;var stacks=[parsed.stack];var trace=this;while(trace!==undefined){stacks.push(cleanStack(trace.stack.split("\n")));trace=trace._parent;}removeCommonRoots(stacks);removeDuplicateOrEmptyJumps(stacks);util.notEnumerableProp(error,"stack",reconstructStack(message,stacks));util.notEnumerableProp(error,"__stackCleaned__",true);};var captureStackTrace=function stackDetection(){var v8stackFramePattern=/^\s*at\s*/;var v8stackFormatter=function v8stackFormatter(stack,error){if(typeof stack==="string")return stack;if(error.name!==undefined&&error.message!==undefined){return error.toString();}return formatNonError(error);};if(typeof Error.stackTraceLimit==="number"&&typeof Error.captureStackTrace==="function"){Error.stackTraceLimit+=6;stackFramePattern=v8stackFramePattern;formatStack=v8stackFormatter;var captureStackTrace=Error.captureStackTrace;shouldIgnore=function shouldIgnore(line){return bluebirdFramePattern.test(line);};return function(receiver,ignoreUntil){Error.stackTraceLimit+=6;captureStackTrace(receiver,ignoreUntil);Error.stackTraceLimit-=6;};}var err=new Error();if(typeof err.stack==="string"&&err.stack.split("\n")[0].indexOf("stackDetection@")>=0){stackFramePattern=/@/;formatStack=v8stackFormatter;indentStackFrames=true;return function captureStackTrace(o){o.stack=new Error().stack;};}var hasStackAfterThrow;try{throw new Error();}catch(e){hasStackAfterThrow="stack" in e;}if(!("stack" in err)&&hasStackAfterThrow&&typeof Error.stackTraceLimit==="number"){stackFramePattern=v8stackFramePattern;formatStack=v8stackFormatter;return function captureStackTrace(o){Error.stackTraceLimit+=6;try{throw new Error();}catch(e){o.stack=e.stack;}Error.stackTraceLimit-=6;};}formatStack=function formatStack(stack,error){if(typeof stack==="string")return stack;if(((typeof error==="undefined"?"undefined":_typeof(error))==="object"||typeof error==="function")&&error.name!==undefined&&error.message!==undefined){return error.toString();}return formatNonError(error);};return null;}([]);if(typeof console!=="undefined"&&typeof console.warn!=="undefined"){printWarning=function printWarning(message){console.warn(message);};if(util.isNode&&process.stderr.isTTY){printWarning=function printWarning(message,isSoft){var color=isSoft?"\u001b[33m":"\u001b[31m";console.warn(color+message+"\u001b[0m\n");};}else if(!util.isNode&&typeof new Error().stack==="string"){printWarning=function printWarning(message,isSoft){console.warn("%c"+message,isSoft?"color: darkorange":"color: red");};}}var config={warnings:warnings,longStackTraces:false,cancellation:false,monitoring:false};if(longStackTraces)Promise.longStackTraces();return {longStackTraces:function longStackTraces(){return config.longStackTraces;},warnings:function warnings(){return config.warnings;},cancellation:function cancellation(){return config.cancellation;},monitoring:function monitoring(){return config.monitoring;},propagateFromFunction:function propagateFromFunction(){return _propagateFromFunction;},boundValueFunction:function boundValueFunction(){return _boundValueFunction;},checkForgottenReturns:checkForgottenReturns,setBounds:setBounds,warn:warn,deprecated:deprecated,CapturedTrace:CapturedTrace,fireDomEvent:fireDomEvent,fireGlobalEvent:fireGlobalEvent};};},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){function returner(){return this.value;}function thrower(){throw this.reason;}Promise.prototype["return"]=Promise.prototype.thenReturn=function(value){if(value instanceof Promise)value.suppressUnhandledRejections();return this._then(returner,undefined,undefined,{value:value},undefined);};Promise.prototype["throw"]=Promise.prototype.thenThrow=function(reason){return this._then(thrower,undefined,undefined,{reason:reason},undefined);};Promise.prototype.catchThrow=function(reason){if(arguments.length<=1){return this._then(undefined,thrower,undefined,{reason:reason},undefined);}else {var _reason=arguments[1];var handler=function handler(){throw _reason;};return this.caught(reason,handler);}};Promise.prototype.catchReturn=function(value){if(arguments.length<=1){if(value instanceof Promise)value.suppressUnhandledRejections();return this._then(undefined,returner,undefined,{value:value},undefined);}else {var _value=arguments[1];if(_value instanceof Promise)_value.suppressUnhandledRejections();var handler=function handler(){return _value;};return this.caught(value,handler);}};};},{}],11:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var PromiseReduce=Promise.reduce;var PromiseAll=Promise.all;function promiseAllThis(){return PromiseAll(this);}function PromiseMapSeries(promises,fn){return PromiseReduce(promises,fn,INTERNAL,INTERNAL);}Promise.prototype.each=function(fn){return this.mapSeries(fn)._then(promiseAllThis,undefined,undefined,this,undefined);};Promise.prototype.mapSeries=function(fn){return PromiseReduce(this,fn,INTERNAL,INTERNAL);};Promise.each=function(promises,fn){return PromiseMapSeries(promises,fn)._then(promiseAllThis,undefined,undefined,promises,undefined);};Promise.mapSeries=PromiseMapSeries;};},{}],12:[function(_dereq_,module,exports){"use strict";var es5=_dereq_("./es5");var Objectfreeze=es5.freeze;var util=_dereq_("./util");var inherits=util.inherits;var notEnumerableProp=util.notEnumerableProp;function subError(nameProperty,defaultMessage){function SubError(message){if(!(this instanceof SubError))return new SubError(message);notEnumerableProp(this,"message",typeof message==="string"?message:defaultMessage);notEnumerableProp(this,"name",nameProperty);if(Error.captureStackTrace){Error.captureStackTrace(this,this.constructor);}else {Error.call(this);}}inherits(SubError,Error);return SubError;}var _TypeError,_RangeError;var Warning=subError("Warning","warning");var CancellationError=subError("CancellationError","cancellation error");var TimeoutError=subError("TimeoutError","timeout error");var AggregateError=subError("AggregateError","aggregate error");try{_TypeError=TypeError;_RangeError=RangeError;}catch(e){_TypeError=subError("TypeError","type error");_RangeError=subError("RangeError","range error");}var methods=("join pop push shift unshift slice filter forEach some "+"every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");for(var i=0;i<methods.length;++i){if(typeof Array.prototype[methods[i]]==="function"){AggregateError.prototype[methods[i]]=Array.prototype[methods[i]];}}es5.defineProperty(AggregateError.prototype,"length",{value:0,configurable:false,writable:true,enumerable:true});AggregateError.prototype["isOperational"]=true;var level=0;AggregateError.prototype.toString=function(){var indent=Array(level*4+1).join(" ");var ret="\n"+indent+"AggregateError of:"+"\n";level++;indent=Array(level*4+1).join(" ");for(var i=0;i<this.length;++i){var str=this[i]===this?"[Circular AggregateError]":this[i]+"";var lines=str.split("\n");for(var j=0;j<lines.length;++j){lines[j]=indent+lines[j];}str=lines.join("\n");ret+=str+"\n";}level--;return ret;};function OperationalError(message){if(!(this instanceof OperationalError))return new OperationalError(message);notEnumerableProp(this,"name","OperationalError");notEnumerableProp(this,"message",message);this.cause=message;this["isOperational"]=true;if(message instanceof Error){notEnumerableProp(this,"message",message.message);notEnumerableProp(this,"stack",message.stack);}else if(Error.captureStackTrace){Error.captureStackTrace(this,this.constructor);}}inherits(OperationalError,Error);var errorTypes=Error["__BluebirdErrorTypes__"];if(!errorTypes){errorTypes=Objectfreeze({CancellationError:CancellationError,TimeoutError:TimeoutError,OperationalError:OperationalError,RejectionError:OperationalError,AggregateError:AggregateError});es5.defineProperty(Error,"__BluebirdErrorTypes__",{value:errorTypes,writable:false,enumerable:false,configurable:false});}module.exports={Error:Error,TypeError:_TypeError,RangeError:_RangeError,CancellationError:errorTypes.CancellationError,OperationalError:errorTypes.OperationalError,TimeoutError:errorTypes.TimeoutError,AggregateError:errorTypes.AggregateError,Warning:Warning};},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){var isES5=function(){"use strict";return this===undefined;}();if(isES5){module.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:isES5,propertyIsWritable:function propertyIsWritable(obj,prop){var descriptor=Object.getOwnPropertyDescriptor(obj,prop);return !!(!descriptor||descriptor.writable||descriptor.set);}};}else {var has={}.hasOwnProperty;var str={}.toString;var proto={}.constructor.prototype;var ObjectKeys=function ObjectKeys(o){var ret=[];for(var key in o){if(has.call(o,key)){ret.push(key);}}return ret;};var ObjectGetDescriptor=function ObjectGetDescriptor(o,key){return {value:o[key]};};var ObjectDefineProperty=function ObjectDefineProperty(o,key,desc){o[key]=desc.value;return o;};var ObjectFreeze=function ObjectFreeze(obj){return obj;};var ObjectGetPrototypeOf=function ObjectGetPrototypeOf(obj){try{return Object(obj).constructor.prototype;}catch(e){return proto;}};var ArrayIsArray=function ArrayIsArray(obj){try{return str.call(obj)==="[object Array]";}catch(e){return false;}};module.exports={isArray:ArrayIsArray,keys:ObjectKeys,names:ObjectKeys,defineProperty:ObjectDefineProperty,getDescriptor:ObjectGetDescriptor,freeze:ObjectFreeze,getPrototypeOf:ObjectGetPrototypeOf,isES5:isES5,propertyIsWritable:function propertyIsWritable(){return true;}};}},{}],14:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var PromiseMap=Promise.map;Promise.prototype.filter=function(fn,options){return PromiseMap(this,fn,options,INTERNAL);};Promise.filter=function(promises,fn,options){return PromiseMap(promises,fn,options,INTERNAL);};};},{}],15:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,tryConvertToPromise){var util=_dereq_("./util");var CancellationError=Promise.CancellationError;var errorObj=util.errorObj;function PassThroughHandlerContext(promise,type,handler){this.promise=promise;this.type=type;this.handler=handler;this.called=false;this.cancelPromise=null;}PassThroughHandlerContext.prototype.isFinallyHandler=function(){return this.type===0;};function FinallyHandlerCancelReaction(finallyHandler){this.finallyHandler=finallyHandler;}FinallyHandlerCancelReaction.prototype._resultCancelled=function(){checkCancel(this.finallyHandler);};function checkCancel(ctx,reason){if(ctx.cancelPromise!=null){if(arguments.length>1){ctx.cancelPromise._reject(reason);}else {ctx.cancelPromise._cancel();}ctx.cancelPromise=null;return true;}return false;}function succeed(){return finallyHandler.call(this,this.promise._target()._settledValue());}function fail(reason){if(checkCancel(this,reason))return;errorObj.e=reason;return errorObj;}function finallyHandler(reasonOrValue){var promise=this.promise;var handler=this.handler;if(!this.called){this.called=true;var ret=this.isFinallyHandler()?handler.call(promise._boundValue()):handler.call(promise._boundValue(),reasonOrValue);if(ret!==undefined){promise._setReturnedNonUndefined();var maybePromise=tryConvertToPromise(ret,promise);if(maybePromise instanceof Promise){if(this.cancelPromise!=null){if(maybePromise.isCancelled()){var reason=new CancellationError("late cancellation observer");promise._attachExtraTrace(reason);errorObj.e=reason;return errorObj;}else if(maybePromise.isPending()){maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));}}return maybePromise._then(succeed,fail,undefined,this,undefined);}}}if(promise.isRejected()){checkCancel(this);errorObj.e=reasonOrValue;return errorObj;}else {checkCancel(this);return reasonOrValue;}}Promise.prototype._passThrough=function(handler,type,success,fail){if(typeof handler!=="function")return this.then();return this._then(success,fail,undefined,new PassThroughHandlerContext(this,type,handler),undefined);};Promise.prototype.lastly=Promise.prototype["finally"]=function(handler){return this._passThrough(handler,0,finallyHandler,finallyHandler);};Promise.prototype.tap=function(handler){return this._passThrough(handler,1,finallyHandler);};return PassThroughHandlerContext;};},{"./util":36}],16:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,apiRejection,INTERNAL,tryConvertToPromise,Proxyable,debug){var errors=_dereq_("./errors");var TypeError=errors.TypeError;var util=_dereq_("./util");var errorObj=util.errorObj;var tryCatch=util.tryCatch;var yieldHandlers=[];function promiseFromYieldHandler(value,yieldHandlers,traceParent){for(var i=0;i<yieldHandlers.length;++i){traceParent._pushContext();var result=tryCatch(yieldHandlers[i])(value);traceParent._popContext();if(result===errorObj){traceParent._pushContext();var ret=Promise.reject(errorObj.e);traceParent._popContext();return ret;}var maybePromise=tryConvertToPromise(result,traceParent);if(maybePromise instanceof Promise)return maybePromise;}return null;}function PromiseSpawn(generatorFunction,receiver,yieldHandler,stack){if(debug.cancellation()){var internal=new Promise(INTERNAL);var _finallyPromise=this._finallyPromise=new Promise(INTERNAL);this._promise=internal.lastly(function(){return _finallyPromise;});internal._captureStackTrace();internal._setOnCancel(this);}else {var promise=this._promise=new Promise(INTERNAL);promise._captureStackTrace();}this._stack=stack;this._generatorFunction=generatorFunction;this._receiver=receiver;this._generator=undefined;this._yieldHandlers=typeof yieldHandler==="function"?[yieldHandler].concat(yieldHandlers):yieldHandlers;this._yieldedPromise=null;this._cancellationPhase=false;}util.inherits(PromiseSpawn,Proxyable);PromiseSpawn.prototype._isResolved=function(){return this._promise===null;};PromiseSpawn.prototype._cleanup=function(){this._promise=this._generator=null;if(debug.cancellation()&&this._finallyPromise!==null){this._finallyPromise._fulfill();this._finallyPromise=null;}};PromiseSpawn.prototype._promiseCancelled=function(){if(this._isResolved())return;var implementsReturn=typeof this._generator["return"]!=="undefined";var result;if(!implementsReturn){var reason=new Promise.CancellationError("generator .return() sentinel");Promise.coroutine.returnSentinel=reason;this._promise._attachExtraTrace(reason);this._promise._pushContext();result=tryCatch(this._generator["throw"]).call(this._generator,reason);this._promise._popContext();}else {this._promise._pushContext();result=tryCatch(this._generator["return"]).call(this._generator,undefined);this._promise._popContext();}this._cancellationPhase=true;this._yieldedPromise=null;this._continue(result);};PromiseSpawn.prototype._promiseFulfilled=function(value){this._yieldedPromise=null;this._promise._pushContext();var result=tryCatch(this._generator.next).call(this._generator,value);this._promise._popContext();this._continue(result);};PromiseSpawn.prototype._promiseRejected=function(reason){this._yieldedPromise=null;this._promise._attachExtraTrace(reason);this._promise._pushContext();var result=tryCatch(this._generator["throw"]).call(this._generator,reason);this._promise._popContext();this._continue(result);};PromiseSpawn.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof Promise){var promise=this._yieldedPromise;this._yieldedPromise=null;promise.cancel();}};PromiseSpawn.prototype.promise=function(){return this._promise;};PromiseSpawn.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver);this._receiver=this._generatorFunction=undefined;this._promiseFulfilled(undefined);};PromiseSpawn.prototype._continue=function(result){var promise=this._promise;if(result===errorObj){this._cleanup();if(this._cancellationPhase){return promise.cancel();}else {return promise._rejectCallback(result.e,false);}}var value=result.value;if(result.done===true){this._cleanup();if(this._cancellationPhase){return promise.cancel();}else {return promise._resolveCallback(value);}}else {var maybePromise=tryConvertToPromise(value,this._promise);if(!(maybePromise instanceof Promise)){maybePromise=promiseFromYieldHandler(maybePromise,this._yieldHandlers,this._promise);if(maybePromise===null){this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",value)+"From coroutine:\n"+this._stack.split("\n").slice(1,-7).join("\n")));return;}}maybePromise=maybePromise._target();var bitField=maybePromise._bitField;;if((bitField&50397184)===0){this._yieldedPromise=maybePromise;maybePromise._proxy(this,null);}else if((bitField&33554432)!==0){this._promiseFulfilled(maybePromise._value());}else if((bitField&16777216)!==0){this._promiseRejected(maybePromise._reason());}else {this._promiseCancelled();}}};Promise.coroutine=function(generatorFunction,options){if(typeof generatorFunction!=="function"){throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");}var yieldHandler=Object(options).yieldHandler;var PromiseSpawn$=PromiseSpawn;var stack=new Error().stack;return function(){var generator=generatorFunction.apply(this,arguments);var spawn=new PromiseSpawn$(undefined,undefined,yieldHandler,stack);var ret=spawn.promise();spawn._generator=generator;spawn._promiseFulfilled(undefined);return ret;};};Promise.coroutine.addYieldHandler=function(fn){if(typeof fn!=="function"){throw new TypeError("expecting a function but got "+util.classString(fn));}yieldHandlers.push(fn);};Promise.spawn=function(generatorFunction){debug.deprecated("Promise.spawn()","Promise.coroutine()");if(typeof generatorFunction!=="function"){return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");}var spawn=new PromiseSpawn(generatorFunction,this);var ret=spawn.promise();spawn._run(Promise.spawn);return ret;};};},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,tryConvertToPromise,INTERNAL){var util=_dereq_("./util");var canEvaluate=util.canEvaluate;var tryCatch=util.tryCatch;var errorObj=util.errorObj;var reject;if(!true){if(canEvaluate){var thenCallback=function thenCallback(i){return new Function("value","holder","                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g,i));};var promiseSetter=function promiseSetter(i){return new Function("promise","holder","                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g,i));};var generateHolderClass=function generateHolderClass(total){var props=new Array(total);for(var i=0;i<props.length;++i){props[i]="this.p"+(i+1);}var assignment=props.join(" = ")+" = null;";var cancellationCode="var promise;\n"+props.map(function(prop){return "                                                         \n\
                promise = "+prop+";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";}).join("\n");var passedArguments=props.join(", ");var name="Holder$"+total;var code="return function(tryCatch, errorObj, Promise) {           \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.now = 0;                                                \n\
            }                                                                \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    promise._pushContext();                                  \n\
                    var callback = this.fn;                                  \n\
                    var ret = tryCatch(callback)([ThePassedArguments]);      \n\
                    promise._popContext();                                   \n\
                    if (ret === errorObj) {                                  \n\
                        promise._rejectCallback(ret.e, false);               \n\
                    } else {                                                 \n\
                        promise._resolveCallback(ret);                       \n\
                    }                                                        \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise);                                      \n\
        ";code=code.replace(/\[TheName\]/g,name).replace(/\[TheTotal\]/g,total).replace(/\[ThePassedArguments\]/g,passedArguments).replace(/\[TheProperties\]/g,assignment).replace(/\[CancellationCode\]/g,cancellationCode);return new Function("tryCatch","errorObj","Promise",code)(tryCatch,errorObj,Promise);};var holderClasses=[];var thenCallbacks=[];var promiseSetters=[];for(var i=0;i<8;++i){holderClasses.push(generateHolderClass(i+1));thenCallbacks.push(thenCallback(i+1));promiseSetters.push(promiseSetter(i+1));}reject=function reject(reason){this._reject(reason);};}}Promise.join=function(){var last=arguments.length-1;var fn;if(last>0&&typeof arguments[last]==="function"){fn=arguments[last];if(!true){if(last<=8&&canEvaluate){var ret=new Promise(INTERNAL);ret._captureStackTrace();var HolderClass=holderClasses[last-1];var holder=new HolderClass(fn);var callbacks=thenCallbacks;for(var i=0;i<last;++i){var maybePromise=tryConvertToPromise(arguments[i],ret);if(maybePromise instanceof Promise){maybePromise=maybePromise._target();var bitField=maybePromise._bitField;;if((bitField&50397184)===0){maybePromise._then(callbacks[i],reject,undefined,ret,holder);promiseSetters[i](maybePromise,holder);}else if((bitField&33554432)!==0){callbacks[i].call(ret,maybePromise._value(),holder);}else if((bitField&16777216)!==0){ret._reject(maybePromise._reason());}else {ret._cancel();}}else {callbacks[i].call(ret,maybePromise,holder);}}if(!ret._isFateSealed()){ret._setAsyncGuaranteed();ret._setOnCancel(holder);}return ret;}}}var args=[].slice.call(arguments);;if(fn)args.pop();var ret=new PromiseArray(args).promise();return fn!==undefined?ret.spread(fn):ret;};};},{"./util":36}],18:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug){var getDomain=Promise._getDomain;var util=_dereq_("./util");var tryCatch=util.tryCatch;var errorObj=util.errorObj;var EMPTY_ARRAY=[];function MappingPromiseArray(promises,fn,limit,_filter){this.constructor$(promises);this._promise._captureStackTrace();var domain=getDomain();this._callback=domain===null?fn:domain.bind(fn);this._preservedValues=_filter===INTERNAL?new Array(this.length()):null;this._limit=limit;this._inFlight=0;this._queue=limit>=1?[]:EMPTY_ARRAY;this._init$(undefined,-2);}util.inherits(MappingPromiseArray,PromiseArray);MappingPromiseArray.prototype._init=function(){};MappingPromiseArray.prototype._promiseFulfilled=function(value,index){var values=this._values;var length=this.length();var preservedValues=this._preservedValues;var limit=this._limit;if(index<0){index=index*-1-1;values[index]=value;if(limit>=1){this._inFlight--;this._drainQueue();if(this._isResolved())return true;}}else {if(limit>=1&&this._inFlight>=limit){values[index]=value;this._queue.push(index);return false;}if(preservedValues!==null)preservedValues[index]=value;var promise=this._promise;var callback=this._callback;var receiver=promise._boundValue();promise._pushContext();var ret=tryCatch(callback).call(receiver,value,index,length);var promiseCreated=promise._popContext();debug.checkForgottenReturns(ret,promiseCreated,preservedValues!==null?"Promise.filter":"Promise.map",promise);if(ret===errorObj){this._reject(ret.e);return true;}var maybePromise=tryConvertToPromise(ret,this._promise);if(maybePromise instanceof Promise){maybePromise=maybePromise._target();var bitField=maybePromise._bitField;;if((bitField&50397184)===0){if(limit>=1)this._inFlight++;values[index]=maybePromise;maybePromise._proxy(this,(index+1)*-1);return false;}else if((bitField&33554432)!==0){ret=maybePromise._value();}else if((bitField&16777216)!==0){this._reject(maybePromise._reason());return true;}else {this._cancel();return true;}}values[index]=ret;}var totalResolved=++this._totalResolved;if(totalResolved>=length){if(preservedValues!==null){this._filter(values,preservedValues);}else {this._resolve(values);}return true;}return false;};MappingPromiseArray.prototype._drainQueue=function(){var queue=this._queue;var limit=this._limit;var values=this._values;while(queue.length>0&&this._inFlight<limit){if(this._isResolved())return;var index=queue.pop();this._promiseFulfilled(values[index],index);}};MappingPromiseArray.prototype._filter=function(booleans,values){var len=values.length;var ret=new Array(len);var j=0;for(var i=0;i<len;++i){if(booleans[i])ret[j++]=values[i];}ret.length=j;this._resolve(ret);};MappingPromiseArray.prototype.preservedValues=function(){return this._preservedValues;};function map(promises,fn,options,_filter){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var limit=0;if(options!==undefined){if((typeof options==="undefined"?"undefined":_typeof(options))==="object"&&options!==null){if(typeof options.concurrency!=="number"){return Promise.reject(new TypeError("'concurrency' must be a number but it is "+util.classString(options.concurrency)));}limit=options.concurrency;}else {return Promise.reject(new TypeError("options argument must be an object but it is "+util.classString(options)));}}limit=typeof limit==="number"&&isFinite(limit)&&limit>=1?limit:0;return new MappingPromiseArray(promises,fn,limit,_filter).promise();}Promise.prototype.map=function(fn,options){return map(this,fn,options,null);};Promise.map=function(promises,fn,options,_filter){return map(promises,fn,options,_filter);};};},{"./util":36}],19:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection,debug){var util=_dereq_("./util");var tryCatch=util.tryCatch;Promise.method=function(fn){if(typeof fn!=="function"){throw new Promise.TypeError("expecting a function but got "+util.classString(fn));}return function(){var ret=new Promise(INTERNAL);ret._captureStackTrace();ret._pushContext();var value=tryCatch(fn).apply(this,arguments);var promiseCreated=ret._popContext();debug.checkForgottenReturns(value,promiseCreated,"Promise.method",ret);ret._resolveFromSyncValue(value);return ret;};};Promise.attempt=Promise["try"]=function(fn){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var ret=new Promise(INTERNAL);ret._captureStackTrace();ret._pushContext();var value;if(arguments.length>1){debug.deprecated("calling Promise.try with more than 1 argument");var arg=arguments[1];var ctx=arguments[2];value=util.isArray(arg)?tryCatch(fn).apply(ctx,arg):tryCatch(fn).call(ctx,arg);}else {value=tryCatch(fn)();}var promiseCreated=ret._popContext();debug.checkForgottenReturns(value,promiseCreated,"Promise.try",ret);ret._resolveFromSyncValue(value);return ret;};Promise.prototype._resolveFromSyncValue=function(value){if(value===util.errorObj){this._rejectCallback(value.e,false);}else {this._resolveCallback(value,true);}};};},{"./util":36}],20:[function(_dereq_,module,exports){"use strict";var util=_dereq_("./util");var maybeWrapAsError=util.maybeWrapAsError;var errors=_dereq_("./errors");var OperationalError=errors.OperationalError;var es5=_dereq_("./es5");function isUntypedError(obj){return obj instanceof Error&&es5.getPrototypeOf(obj)===Error.prototype;}var rErrorKey=/^(?:name|message|stack|cause)$/;function wrapAsOperationalError(obj){var ret;if(isUntypedError(obj)){ret=new OperationalError(obj);ret.name=obj.name;ret.message=obj.message;ret.stack=obj.stack;var keys=es5.keys(obj);for(var i=0;i<keys.length;++i){var key=keys[i];if(!rErrorKey.test(key)){ret[key]=obj[key];}}return ret;}util.markAsOriginatingFromRejection(obj);return obj;}function nodebackForPromise(promise,multiArgs){return function(err,value){if(promise===null)return;if(err){var wrapped=wrapAsOperationalError(maybeWrapAsError(err));promise._attachExtraTrace(wrapped);promise._reject(wrapped);}else if(!multiArgs){promise._fulfill(value);}else {var args=[].slice.call(arguments,1);;promise._fulfill(args);}promise=null;};}module.exports=nodebackForPromise;},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){var util=_dereq_("./util");var async=Promise._async;var tryCatch=util.tryCatch;var errorObj=util.errorObj;function spreadAdapter(val,nodeback){var promise=this;if(!util.isArray(val))return successAdapter.call(promise,val,nodeback);var ret=tryCatch(nodeback).apply(promise._boundValue(),[null].concat(val));if(ret===errorObj){async.throwLater(ret.e);}}function successAdapter(val,nodeback){var promise=this;var receiver=promise._boundValue();var ret=val===undefined?tryCatch(nodeback).call(receiver,null):tryCatch(nodeback).call(receiver,null,val);if(ret===errorObj){async.throwLater(ret.e);}}function errorAdapter(reason,nodeback){var promise=this;if(!reason){var newReason=new Error(reason+"");newReason.cause=reason;reason=newReason;}var ret=tryCatch(nodeback).call(promise._boundValue(),reason);if(ret===errorObj){async.throwLater(ret.e);}}Promise.prototype.asCallback=Promise.prototype.nodeify=function(nodeback,options){if(typeof nodeback=="function"){var adapter=successAdapter;if(options!==undefined&&Object(options).spread){adapter=spreadAdapter;}this._then(adapter,errorAdapter,undefined,this,nodeback);}return this;};};},{"./util":36}],22:[function(_dereq_,module,exports){"use strict";module.exports=function(){var makeSelfResolutionError=function makeSelfResolutionError(){return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");};var reflectHandler=function reflectHandler(){return new Promise.PromiseInspection(this._target());};var apiRejection=function apiRejection(msg){return Promise.reject(new TypeError(msg));};function Proxyable(){}var UNDEFINED_BINDING={};var util=_dereq_("./util");var getDomain;if(util.isNode){getDomain=function getDomain(){var ret=process.domain;if(ret===undefined)ret=null;return ret;};}else {getDomain=function getDomain(){return null;};}util.notEnumerableProp(Promise,"_getDomain",getDomain);var es5=_dereq_("./es5");var Async=_dereq_("./async");var async=new Async();es5.defineProperty(Promise,"_async",{value:async});var errors=_dereq_("./errors");var TypeError=Promise.TypeError=errors.TypeError;Promise.RangeError=errors.RangeError;var CancellationError=Promise.CancellationError=errors.CancellationError;Promise.TimeoutError=errors.TimeoutError;Promise.OperationalError=errors.OperationalError;Promise.RejectionError=errors.OperationalError;Promise.AggregateError=errors.AggregateError;var INTERNAL=function INTERNAL(){};var APPLY={};var NEXT_FILTER={};var tryConvertToPromise=_dereq_("./thenables")(Promise,INTERNAL);var PromiseArray=_dereq_("./promise_array")(Promise,INTERNAL,tryConvertToPromise,apiRejection,Proxyable);var Context=_dereq_("./context")(Promise); /*jshint unused:false*/var createContext=Context.create;var debug=_dereq_("./debuggability")(Promise,Context);var CapturedTrace=debug.CapturedTrace;var PassThroughHandlerContext=_dereq_("./finally")(Promise,tryConvertToPromise);var catchFilter=_dereq_("./catch_filter")(NEXT_FILTER);var nodebackForPromise=_dereq_("./nodeback");var errorObj=util.errorObj;var tryCatch=util.tryCatch;function check(self,executor){if(typeof executor!=="function"){throw new TypeError("expecting a function but got "+util.classString(executor));}if(self.constructor!==Promise){throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");}}function Promise(executor){this._bitField=0;this._fulfillmentHandler0=undefined;this._rejectionHandler0=undefined;this._promise0=undefined;this._receiver0=undefined;if(executor!==INTERNAL){check(this,executor);this._resolveFromExecutor(executor);}this._promiseCreated();this._fireEvent("promiseCreated",this);}Promise.prototype.toString=function(){return "[object Promise]";};Promise.prototype.caught=Promise.prototype["catch"]=function(fn){var len=arguments.length;if(len>1){var catchInstances=new Array(len-1),j=0,i;for(i=0;i<len-1;++i){var item=arguments[i];if(util.isObject(item)){catchInstances[j++]=item;}else {return apiRejection("expecting an object but got "+util.classString(item));}}catchInstances.length=j;fn=arguments[i];return this.then(undefined,catchFilter(catchInstances,fn,this));}return this.then(undefined,fn);};Promise.prototype.reflect=function(){return this._then(reflectHandler,reflectHandler,undefined,this,undefined);};Promise.prototype.then=function(didFulfill,didReject){if(debug.warnings()&&arguments.length>0&&typeof didFulfill!=="function"&&typeof didReject!=="function"){var msg=".then() only accepts functions but was passed: "+util.classString(didFulfill);if(arguments.length>1){msg+=", "+util.classString(didReject);}this._warn(msg);}return this._then(didFulfill,didReject,undefined,undefined,undefined);};Promise.prototype.done=function(didFulfill,didReject){var promise=this._then(didFulfill,didReject,undefined,undefined,undefined);promise._setIsFinal();};Promise.prototype.spread=function(fn){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}return this.all()._then(fn,undefined,undefined,APPLY,undefined);};Promise.prototype.toJSON=function(){var ret={isFulfilled:false,isRejected:false,fulfillmentValue:undefined,rejectionReason:undefined};if(this.isFulfilled()){ret.fulfillmentValue=this.value();ret.isFulfilled=true;}else if(this.isRejected()){ret.rejectionReason=this.reason();ret.isRejected=true;}return ret;};Promise.prototype.all=function(){if(arguments.length>0){this._warn(".all() was passed arguments but it does not take any");}return new PromiseArray(this).promise();};Promise.prototype.error=function(fn){return this.caught(util.originatesFromRejection,fn);};Promise.is=function(val){return val instanceof Promise;};Promise.fromNode=Promise.fromCallback=function(fn){var ret=new Promise(INTERNAL);ret._captureStackTrace();var multiArgs=arguments.length>1?!!Object(arguments[1]).multiArgs:false;var result=tryCatch(fn)(nodebackForPromise(ret,multiArgs));if(result===errorObj){ret._rejectCallback(result.e,true);}if(!ret._isFateSealed())ret._setAsyncGuaranteed();return ret;};Promise.all=function(promises){return new PromiseArray(promises).promise();};Promise.cast=function(obj){var ret=tryConvertToPromise(obj);if(!(ret instanceof Promise)){ret=new Promise(INTERNAL);ret._captureStackTrace();ret._setFulfilled();ret._rejectionHandler0=obj;}return ret;};Promise.resolve=Promise.fulfilled=Promise.cast;Promise.reject=Promise.rejected=function(reason){var ret=new Promise(INTERNAL);ret._captureStackTrace();ret._rejectCallback(reason,true);return ret;};Promise.setScheduler=function(fn){if(typeof fn!=="function"){throw new TypeError("expecting a function but got "+util.classString(fn));}return async.setScheduler(fn);};Promise.prototype._then=function(didFulfill,didReject,_,receiver,internalData){var haveInternalData=internalData!==undefined;var promise=haveInternalData?internalData:new Promise(INTERNAL);var target=this._target();var bitField=target._bitField;if(!haveInternalData){promise._propagateFrom(this,3);promise._captureStackTrace();if(receiver===undefined&&(this._bitField&2097152)!==0){if(!((bitField&50397184)===0)){receiver=this._boundValue();}else {receiver=target===this?undefined:this._boundTo;}}this._fireEvent("promiseChained",this,promise);}var domain=getDomain();if(!((bitField&50397184)===0)){var handler,value,settler=target._settlePromiseCtx;if((bitField&33554432)!==0){value=target._rejectionHandler0;handler=didFulfill;}else if((bitField&16777216)!==0){value=target._fulfillmentHandler0;handler=didReject;target._unsetRejectionIsUnhandled();}else {settler=target._settlePromiseLateCancellationObserver;value=new CancellationError("late cancellation observer");target._attachExtraTrace(value);handler=didReject;}async.invoke(settler,target,{handler:domain===null?handler:typeof handler==="function"&&domain.bind(handler),promise:promise,receiver:receiver,value:value});}else {target._addCallbacks(didFulfill,didReject,promise,receiver,domain);}return promise;};Promise.prototype._length=function(){return this._bitField&65535;};Promise.prototype._isFateSealed=function(){return (this._bitField&117506048)!==0;};Promise.prototype._isFollowing=function(){return (this._bitField&67108864)===67108864;};Promise.prototype._setLength=function(len){this._bitField=this._bitField&-65536|len&65535;};Promise.prototype._setFulfilled=function(){this._bitField=this._bitField|33554432;this._fireEvent("promiseFulfilled",this);};Promise.prototype._setRejected=function(){this._bitField=this._bitField|16777216;this._fireEvent("promiseRejected",this);};Promise.prototype._setFollowing=function(){this._bitField=this._bitField|67108864;this._fireEvent("promiseResolved",this);};Promise.prototype._setIsFinal=function(){this._bitField=this._bitField|4194304;};Promise.prototype._isFinal=function(){return (this._bitField&4194304)>0;};Promise.prototype._unsetCancelled=function(){this._bitField=this._bitField&~65536;};Promise.prototype._setCancelled=function(){this._bitField=this._bitField|65536;this._fireEvent("promiseCancelled",this);};Promise.prototype._setAsyncGuaranteed=function(){if(async.hasCustomScheduler())return;this._bitField=this._bitField|134217728;};Promise.prototype._receiverAt=function(index){var ret=index===0?this._receiver0:this[index*4-4+3];if(ret===UNDEFINED_BINDING){return undefined;}else if(ret===undefined&&this._isBound()){return this._boundValue();}return ret;};Promise.prototype._promiseAt=function(index){return this[index*4-4+2];};Promise.prototype._fulfillmentHandlerAt=function(index){return this[index*4-4+0];};Promise.prototype._rejectionHandlerAt=function(index){return this[index*4-4+1];};Promise.prototype._boundValue=function(){};Promise.prototype._migrateCallback0=function(follower){var bitField=follower._bitField;var fulfill=follower._fulfillmentHandler0;var reject=follower._rejectionHandler0;var promise=follower._promise0;var receiver=follower._receiverAt(0);if(receiver===undefined)receiver=UNDEFINED_BINDING;this._addCallbacks(fulfill,reject,promise,receiver,null);};Promise.prototype._migrateCallbackAt=function(follower,index){var fulfill=follower._fulfillmentHandlerAt(index);var reject=follower._rejectionHandlerAt(index);var promise=follower._promiseAt(index);var receiver=follower._receiverAt(index);if(receiver===undefined)receiver=UNDEFINED_BINDING;this._addCallbacks(fulfill,reject,promise,receiver,null);};Promise.prototype._addCallbacks=function(fulfill,reject,promise,receiver,domain){var index=this._length();if(index>=65535-4){index=0;this._setLength(0);}if(index===0){this._promise0=promise;this._receiver0=receiver;if(typeof fulfill==="function"){this._fulfillmentHandler0=domain===null?fulfill:domain.bind(fulfill);}if(typeof reject==="function"){this._rejectionHandler0=domain===null?reject:domain.bind(reject);}}else {var base=index*4-4;this[base+2]=promise;this[base+3]=receiver;if(typeof fulfill==="function"){this[base+0]=domain===null?fulfill:domain.bind(fulfill);}if(typeof reject==="function"){this[base+1]=domain===null?reject:domain.bind(reject);}}this._setLength(index+1);return index;};Promise.prototype._proxy=function(proxyable,arg){this._addCallbacks(undefined,undefined,arg,proxyable,null);};Promise.prototype._resolveCallback=function(value,shouldBind){if((this._bitField&117506048)!==0)return;if(value===this)return this._rejectCallback(makeSelfResolutionError(),false);var maybePromise=tryConvertToPromise(value,this);if(!(maybePromise instanceof Promise))return this._fulfill(value);if(shouldBind)this._propagateFrom(maybePromise,2);var promise=maybePromise._target();if(promise===this){this._reject(makeSelfResolutionError());return;}var bitField=promise._bitField;if((bitField&50397184)===0){var len=this._length();if(len>0)promise._migrateCallback0(this);for(var i=1;i<len;++i){promise._migrateCallbackAt(this,i);}this._setFollowing();this._setLength(0);this._setFollowee(promise);}else if((bitField&33554432)!==0){this._fulfill(promise._value());}else if((bitField&16777216)!==0){this._reject(promise._reason());}else {var reason=new CancellationError("late cancellation observer");promise._attachExtraTrace(reason);this._reject(reason);}};Promise.prototype._rejectCallback=function(reason,synchronous,ignoreNonErrorWarnings){var trace=util.ensureErrorObject(reason);var hasStack=trace===reason;if(!hasStack&&!ignoreNonErrorWarnings&&debug.warnings()){var message="a promise was rejected with a non-error: "+util.classString(reason);this._warn(message,true);}this._attachExtraTrace(trace,synchronous?hasStack:false);this._reject(reason);};Promise.prototype._resolveFromExecutor=function(executor){var promise=this;this._captureStackTrace();this._pushContext();var synchronous=true;var r=this._execute(executor,function(value){promise._resolveCallback(value);},function(reason){promise._rejectCallback(reason,synchronous);});synchronous=false;this._popContext();if(r!==undefined){promise._rejectCallback(r,true);}};Promise.prototype._settlePromiseFromHandler=function(handler,receiver,value,promise){var bitField=promise._bitField;if((bitField&65536)!==0)return;promise._pushContext();var x;if(receiver===APPLY){if(!value||typeof value.length!=="number"){x=errorObj;x.e=new TypeError("cannot .spread() a non-array: "+util.classString(value));}else {x=tryCatch(handler).apply(this._boundValue(),value);}}else {x=tryCatch(handler).call(receiver,value);}var promiseCreated=promise._popContext();bitField=promise._bitField;if((bitField&65536)!==0)return;if(x===NEXT_FILTER){promise._reject(value);}else if(x===errorObj){promise._rejectCallback(x.e,false);}else {debug.checkForgottenReturns(x,promiseCreated,"",promise,this);promise._resolveCallback(x);}};Promise.prototype._target=function(){var ret=this;while(ret._isFollowing()){ret=ret._followee();}return ret;};Promise.prototype._followee=function(){return this._rejectionHandler0;};Promise.prototype._setFollowee=function(promise){this._rejectionHandler0=promise;};Promise.prototype._settlePromise=function(promise,handler,receiver,value){var isPromise=promise instanceof Promise;var bitField=this._bitField;var asyncGuaranteed=(bitField&134217728)!==0;if((bitField&65536)!==0){if(isPromise)promise._invokeInternalOnCancel();if(receiver instanceof PassThroughHandlerContext&&receiver.isFinallyHandler()){receiver.cancelPromise=promise;if(tryCatch(handler).call(receiver,value)===errorObj){promise._reject(errorObj.e);}}else if(handler===reflectHandler){promise._fulfill(reflectHandler.call(receiver));}else if(receiver instanceof Proxyable){receiver._promiseCancelled(promise);}else if(isPromise||promise instanceof PromiseArray){promise._cancel();}else {receiver.cancel();}}else if(typeof handler==="function"){if(!isPromise){handler.call(receiver,value,promise);}else {if(asyncGuaranteed)promise._setAsyncGuaranteed();this._settlePromiseFromHandler(handler,receiver,value,promise);}}else if(receiver instanceof Proxyable){if(!receiver._isResolved()){if((bitField&33554432)!==0){receiver._promiseFulfilled(value,promise);}else {receiver._promiseRejected(value,promise);}}}else if(isPromise){if(asyncGuaranteed)promise._setAsyncGuaranteed();if((bitField&33554432)!==0){promise._fulfill(value);}else {promise._reject(value);}}};Promise.prototype._settlePromiseLateCancellationObserver=function(ctx){var handler=ctx.handler;var promise=ctx.promise;var receiver=ctx.receiver;var value=ctx.value;if(typeof handler==="function"){if(!(promise instanceof Promise)){handler.call(receiver,value,promise);}else {this._settlePromiseFromHandler(handler,receiver,value,promise);}}else if(promise instanceof Promise){promise._reject(value);}};Promise.prototype._settlePromiseCtx=function(ctx){this._settlePromise(ctx.promise,ctx.handler,ctx.receiver,ctx.value);};Promise.prototype._settlePromise0=function(handler,value,bitField){var promise=this._promise0;var receiver=this._receiverAt(0);this._promise0=undefined;this._receiver0=undefined;this._settlePromise(promise,handler,receiver,value);};Promise.prototype._clearCallbackDataAtIndex=function(index){var base=index*4-4;this[base+2]=this[base+3]=this[base+0]=this[base+1]=undefined;};Promise.prototype._fulfill=function(value){var bitField=this._bitField;if((bitField&117506048)>>>16)return;if(value===this){var err=makeSelfResolutionError();this._attachExtraTrace(err);return this._reject(err);}this._setFulfilled();this._rejectionHandler0=value;if((bitField&65535)>0){if((bitField&134217728)!==0){this._settlePromises();}else {async.settlePromises(this);}}};Promise.prototype._reject=function(reason){var bitField=this._bitField;if((bitField&117506048)>>>16)return;this._setRejected();this._fulfillmentHandler0=reason;if(this._isFinal()){return async.fatalError(reason,util.isNode);}if((bitField&65535)>0){async.settlePromises(this);}else {this._ensurePossibleRejectionHandled();}};Promise.prototype._fulfillPromises=function(len,value){for(var i=1;i<len;i++){var handler=this._fulfillmentHandlerAt(i);var promise=this._promiseAt(i);var receiver=this._receiverAt(i);this._clearCallbackDataAtIndex(i);this._settlePromise(promise,handler,receiver,value);}};Promise.prototype._rejectPromises=function(len,reason){for(var i=1;i<len;i++){var handler=this._rejectionHandlerAt(i);var promise=this._promiseAt(i);var receiver=this._receiverAt(i);this._clearCallbackDataAtIndex(i);this._settlePromise(promise,handler,receiver,reason);}};Promise.prototype._settlePromises=function(){var bitField=this._bitField;var len=bitField&65535;if(len>0){if((bitField&16842752)!==0){var reason=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,reason,bitField);this._rejectPromises(len,reason);}else {var value=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,value,bitField);this._fulfillPromises(len,value);}this._setLength(0);}this._clearCancellationData();};Promise.prototype._settledValue=function(){var bitField=this._bitField;if((bitField&33554432)!==0){return this._rejectionHandler0;}else if((bitField&16777216)!==0){return this._fulfillmentHandler0;}};function deferResolve(v){this.promise._resolveCallback(v);}function deferReject(v){this.promise._rejectCallback(v,false);}Promise.defer=Promise.pending=function(){debug.deprecated("Promise.defer","new Promise");var promise=new Promise(INTERNAL);return {promise:promise,resolve:deferResolve,reject:deferReject};};util.notEnumerableProp(Promise,"_makeSelfResolutionError",makeSelfResolutionError);_dereq_("./method")(Promise,INTERNAL,tryConvertToPromise,apiRejection,debug);_dereq_("./bind")(Promise,INTERNAL,tryConvertToPromise,debug);_dereq_("./cancel")(Promise,PromiseArray,apiRejection,debug);_dereq_("./direct_resolve")(Promise);_dereq_("./synchronous_inspection")(Promise);_dereq_("./join")(Promise,PromiseArray,tryConvertToPromise,INTERNAL,debug);Promise.Promise=Promise;Promise.version="3.4.0";_dereq_('./map.js')(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug);_dereq_('./call_get.js')(Promise);_dereq_('./using.js')(Promise,apiRejection,tryConvertToPromise,createContext,INTERNAL,debug);_dereq_('./timers.js')(Promise,INTERNAL,debug);_dereq_('./generators.js')(Promise,apiRejection,INTERNAL,tryConvertToPromise,Proxyable,debug);_dereq_('./nodeify.js')(Promise);_dereq_('./promisify.js')(Promise,INTERNAL);_dereq_('./props.js')(Promise,PromiseArray,tryConvertToPromise,apiRejection);_dereq_('./race.js')(Promise,INTERNAL,tryConvertToPromise,apiRejection);_dereq_('./reduce.js')(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug);_dereq_('./settle.js')(Promise,PromiseArray,debug);_dereq_('./some.js')(Promise,PromiseArray,apiRejection);_dereq_('./filter.js')(Promise,INTERNAL);_dereq_('./each.js')(Promise,INTERNAL);_dereq_('./any.js')(Promise);util.toFastProperties(Promise);util.toFastProperties(Promise.prototype);function fillTypes(value){var p=new Promise(INTERNAL);p._fulfillmentHandler0=value;p._rejectionHandler0=value;p._promise0=value;p._receiver0=value;} // Complete slack tracking, opt out of field-type tracking and           
// stabilize map                                                         
fillTypes({a:1});fillTypes({b:2});fillTypes({c:3});fillTypes(1);fillTypes(function(){});fillTypes(undefined);fillTypes(false);fillTypes(new Promise(INTERNAL));debug.setBounds(Async.firstLineError,util.lastLineError);return Promise;};},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection,Proxyable){var util=_dereq_("./util");var isArray=util.isArray;function toResolutionValue(val){switch(val){case -2:return [];case -3:return {};}}function PromiseArray(values){var promise=this._promise=new Promise(INTERNAL);if(values instanceof Promise){promise._propagateFrom(values,3);}promise._setOnCancel(this);this._values=values;this._length=0;this._totalResolved=0;this._init(undefined,-2);}util.inherits(PromiseArray,Proxyable);PromiseArray.prototype.length=function(){return this._length;};PromiseArray.prototype.promise=function(){return this._promise;};PromiseArray.prototype._init=function init(_,resolveValueIfEmpty){var values=tryConvertToPromise(this._values,this._promise);if(values instanceof Promise){values=values._target();var bitField=values._bitField;;this._values=values;if((bitField&50397184)===0){this._promise._setAsyncGuaranteed();return values._then(init,this._reject,undefined,this,resolveValueIfEmpty);}else if((bitField&33554432)!==0){values=values._value();}else if((bitField&16777216)!==0){return this._reject(values._reason());}else {return this._cancel();}}values=util.asArray(values);if(values===null){var err=apiRejection("expecting an array or an iterable object but got "+util.classString(values)).reason();this._promise._rejectCallback(err,false);return;}if(values.length===0){if(resolveValueIfEmpty===-5){this._resolveEmptyArray();}else {this._resolve(toResolutionValue(resolveValueIfEmpty));}return;}this._iterate(values);};PromiseArray.prototype._iterate=function(values){var len=this.getActualLength(values.length);this._length=len;this._values=this.shouldCopyValues()?new Array(len):this._values;var result=this._promise;var isResolved=false;var bitField=null;for(var i=0;i<len;++i){var maybePromise=tryConvertToPromise(values[i],result);if(maybePromise instanceof Promise){maybePromise=maybePromise._target();bitField=maybePromise._bitField;}else {bitField=null;}if(isResolved){if(bitField!==null){maybePromise.suppressUnhandledRejections();}}else if(bitField!==null){if((bitField&50397184)===0){maybePromise._proxy(this,i);this._values[i]=maybePromise;}else if((bitField&33554432)!==0){isResolved=this._promiseFulfilled(maybePromise._value(),i);}else if((bitField&16777216)!==0){isResolved=this._promiseRejected(maybePromise._reason(),i);}else {isResolved=this._promiseCancelled(i);}}else {isResolved=this._promiseFulfilled(maybePromise,i);}}if(!isResolved)result._setAsyncGuaranteed();};PromiseArray.prototype._isResolved=function(){return this._values===null;};PromiseArray.prototype._resolve=function(value){this._values=null;this._promise._fulfill(value);};PromiseArray.prototype._cancel=function(){if(this._isResolved()||!this._promise.isCancellable())return;this._values=null;this._promise._cancel();};PromiseArray.prototype._reject=function(reason){this._values=null;this._promise._rejectCallback(reason,false);};PromiseArray.prototype._promiseFulfilled=function(value,index){this._values[index]=value;var totalResolved=++this._totalResolved;if(totalResolved>=this._length){this._resolve(this._values);return true;}return false;};PromiseArray.prototype._promiseCancelled=function(){this._cancel();return true;};PromiseArray.prototype._promiseRejected=function(reason){this._totalResolved++;this._reject(reason);return true;};PromiseArray.prototype._resultCancelled=function(){if(this._isResolved())return;var values=this._values;this._cancel();if(values instanceof Promise){values.cancel();}else {for(var i=0;i<values.length;++i){if(values[i] instanceof Promise){values[i].cancel();}}}};PromiseArray.prototype.shouldCopyValues=function(){return true;};PromiseArray.prototype.getActualLength=function(len){return len;};return PromiseArray;};},{"./util":36}],24:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var THIS={};var util=_dereq_("./util");var nodebackForPromise=_dereq_("./nodeback");var withAppended=util.withAppended;var maybeWrapAsError=util.maybeWrapAsError;var canEvaluate=util.canEvaluate;var TypeError=_dereq_("./errors").TypeError;var defaultSuffix="Async";var defaultPromisified={__isPromisified__:true};var noCopyProps=["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"];var noCopyPropsPattern=new RegExp("^(?:"+noCopyProps.join("|")+")$");var defaultFilter=function defaultFilter(name){return util.isIdentifier(name)&&name.charAt(0)!=="_"&&name!=="constructor";};function propsFilter(key){return !noCopyPropsPattern.test(key);}function isPromisified(fn){try{return fn.__isPromisified__===true;}catch(e){return false;}}function hasPromisified(obj,key,suffix){var val=util.getDataPropertyOrDefault(obj,key+suffix,defaultPromisified);return val?isPromisified(val):false;}function checkValid(ret,suffix,suffixRegexp){for(var i=0;i<ret.length;i+=2){var key=ret[i];if(suffixRegexp.test(key)){var keyWithoutAsyncSuffix=key.replace(suffixRegexp,"");for(var j=0;j<ret.length;j+=2){if(ret[j]===keyWithoutAsyncSuffix){throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",suffix));}}}}}function promisifiableMethods(obj,suffix,suffixRegexp,filter){var keys=util.inheritedDataKeys(obj);var ret=[];for(var i=0;i<keys.length;++i){var key=keys[i];var value=obj[key];var passesDefaultFilter=filter===defaultFilter?true:defaultFilter(key,value,obj);if(typeof value==="function"&&!isPromisified(value)&&!hasPromisified(obj,key,suffix)&&filter(key,value,obj,passesDefaultFilter)){ret.push(key,value);}}checkValid(ret,suffix,suffixRegexp);return ret;}var escapeIdentRegex=function escapeIdentRegex(str){return str.replace(/([$])/,"\\$");};var makeNodePromisifiedEval;if(!true){var switchCaseArgumentOrder=function switchCaseArgumentOrder(likelyArgumentCount){var ret=[likelyArgumentCount];var min=Math.max(0,likelyArgumentCount-1-3);for(var i=likelyArgumentCount-1;i>=min;--i){ret.push(i);}for(var i=likelyArgumentCount+1;i<=3;++i){ret.push(i);}return ret;};var argumentSequence=function argumentSequence(argumentCount){return util.filledRange(argumentCount,"_arg","");};var parameterDeclaration=function parameterDeclaration(parameterCount){return util.filledRange(Math.max(parameterCount,3),"_arg","");};var parameterCount=function parameterCount(fn){if(typeof fn.length==="number"){return Math.max(Math.min(fn.length,1023+1),0);}return 0;};makeNodePromisifiedEval=function makeNodePromisifiedEval(callback,receiver,originalName,fn,_,multiArgs){var newParameterCount=Math.max(0,parameterCount(fn)-1);var argumentOrder=switchCaseArgumentOrder(newParameterCount);var shouldProxyThis=typeof callback==="string"||receiver===THIS;function generateCallForArgumentCount(count){var args=argumentSequence(count).join(", ");var comma=count>0?", ":"";var ret;if(shouldProxyThis){ret="ret = callback.call(this, {{args}}, nodeback); break;\n";}else {ret=receiver===undefined?"ret = callback({{args}}, nodeback); break;\n":"ret = callback.call(receiver, {{args}}, nodeback); break;\n";}return ret.replace("{{args}}",args).replace(", ",comma);}function generateArgumentSwitchCase(){var ret="";for(var i=0;i<argumentOrder.length;++i){ret+="case "+argumentOrder[i]+":"+generateCallForArgumentCount(argumentOrder[i]);}ret+="                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]",shouldProxyThis?"ret = callback.apply(this, args);\n":"ret = callback.apply(receiver, args);\n");return ret;}var getFunctionCode=typeof callback==="string"?"this != null ? this['"+callback+"'] : fn":"fn";var body="'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, "+multiArgs+");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]",generateArgumentSwitchCase()).replace("[GetFunctionCode]",getFunctionCode);body=body.replace("Parameters",parameterDeclaration(newParameterCount));return new Function("Promise","fn","receiver","withAppended","maybeWrapAsError","nodebackForPromise","tryCatch","errorObj","notEnumerableProp","INTERNAL",body)(Promise,fn,receiver,withAppended,maybeWrapAsError,nodebackForPromise,util.tryCatch,util.errorObj,util.notEnumerableProp,INTERNAL);};}function makeNodePromisifiedClosure(callback,receiver,_,fn,__,multiArgs){var defaultThis=function(){return this;}();var method=callback;if(typeof method==="string"){callback=fn;}function promisified(){var _receiver=receiver;if(receiver===THIS)_receiver=this;var promise=new Promise(INTERNAL);promise._captureStackTrace();var cb=typeof method==="string"&&this!==defaultThis?this[method]:callback;var fn=nodebackForPromise(promise,multiArgs);try{cb.apply(_receiver,withAppended(arguments,fn));}catch(e){promise._rejectCallback(maybeWrapAsError(e),true,true);}if(!promise._isFateSealed())promise._setAsyncGuaranteed();return promise;}util.notEnumerableProp(promisified,"__isPromisified__",true);return promisified;}var makeNodePromisified=canEvaluate?makeNodePromisifiedEval:makeNodePromisifiedClosure;function promisifyAll(obj,suffix,filter,promisifier,multiArgs){var suffixRegexp=new RegExp(escapeIdentRegex(suffix)+"$");var methods=promisifiableMethods(obj,suffix,suffixRegexp,filter);for(var i=0,len=methods.length;i<len;i+=2){var key=methods[i];var fn=methods[i+1];var promisifiedKey=key+suffix;if(promisifier===makeNodePromisified){obj[promisifiedKey]=makeNodePromisified(key,THIS,key,fn,suffix,multiArgs);}else {var promisified=promisifier(fn,function(){return makeNodePromisified(key,THIS,key,fn,suffix,multiArgs);});util.notEnumerableProp(promisified,"__isPromisified__",true);obj[promisifiedKey]=promisified;}}util.toFastProperties(obj);return obj;}function promisify(callback,receiver,multiArgs){return makeNodePromisified(callback,receiver,undefined,callback,null,multiArgs);}Promise.promisify=function(fn,options){if(typeof fn!=="function"){throw new TypeError("expecting a function but got "+util.classString(fn));}if(isPromisified(fn)){return fn;}options=Object(options);var receiver=options.context===undefined?THIS:options.context;var multiArgs=!!options.multiArgs;var ret=promisify(fn,receiver,multiArgs);util.copyDescriptors(fn,ret,propsFilter);return ret;};Promise.promisifyAll=function(target,options){if(typeof target!=="function"&&(typeof target==="undefined"?"undefined":_typeof(target))!=="object"){throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");}options=Object(options);var multiArgs=!!options.multiArgs;var suffix=options.suffix;if(typeof suffix!=="string")suffix=defaultSuffix;var filter=options.filter;if(typeof filter!=="function")filter=defaultFilter;var promisifier=options.promisifier;if(typeof promisifier!=="function")promisifier=makeNodePromisified;if(!util.isIdentifier(suffix)){throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");}var keys=util.inheritedDataKeys(target);for(var i=0;i<keys.length;++i){var value=target[keys[i]];if(keys[i]!=="constructor"&&util.isClass(value)){promisifyAll(value.prototype,suffix,filter,promisifier,multiArgs);promisifyAll(value,suffix,filter,promisifier,multiArgs);}}return promisifyAll(target,suffix,filter,promisifier,multiArgs);};};},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,tryConvertToPromise,apiRejection){var util=_dereq_("./util");var isObject=util.isObject;var es5=_dereq_("./es5");var Es6Map;if(typeof Map==="function")Es6Map=Map;var mapToEntries=function(){var index=0;var size=0;function extractEntry(value,key){this[index]=value;this[index+size]=key;index++;}return function mapToEntries(map){size=map.size;index=0;var ret=new Array(map.size*2);map.forEach(extractEntry,ret);return ret;};}();var entriesToMap=function entriesToMap(entries){var ret=new Es6Map();var length=entries.length/2|0;for(var i=0;i<length;++i){var key=entries[length+i];var value=entries[i];ret.set(key,value);}return ret;};function PropertiesPromiseArray(obj){var isMap=false;var entries;if(Es6Map!==undefined&&obj instanceof Es6Map){entries=mapToEntries(obj);isMap=true;}else {var keys=es5.keys(obj);var len=keys.length;entries=new Array(len*2);for(var i=0;i<len;++i){var key=keys[i];entries[i]=obj[key];entries[i+len]=key;}}this.constructor$(entries);this._isMap=isMap;this._init$(undefined,-3);}util.inherits(PropertiesPromiseArray,PromiseArray);PropertiesPromiseArray.prototype._init=function(){};PropertiesPromiseArray.prototype._promiseFulfilled=function(value,index){this._values[index]=value;var totalResolved=++this._totalResolved;if(totalResolved>=this._length){var val;if(this._isMap){val=entriesToMap(this._values);}else {val={};var keyOffset=this.length();for(var i=0,len=this.length();i<len;++i){val[this._values[i+keyOffset]]=this._values[i];}}this._resolve(val);return true;}return false;};PropertiesPromiseArray.prototype.shouldCopyValues=function(){return false;};PropertiesPromiseArray.prototype.getActualLength=function(len){return len>>1;};function props(promises){var ret;var castValue=tryConvertToPromise(promises);if(!isObject(castValue)){return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");}else if(castValue instanceof Promise){ret=castValue._then(Promise.props,undefined,undefined,undefined,undefined);}else {ret=new PropertiesPromiseArray(castValue).promise();}if(castValue instanceof Promise){ret._propagateFrom(castValue,2);}return ret;}Promise.prototype.props=function(){return props(this);};Promise.props=function(promises){return props(promises);};};},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){"use strict";function arrayMove(src,srcIndex,dst,dstIndex,len){for(var j=0;j<len;++j){dst[j+dstIndex]=src[j+srcIndex];src[j+srcIndex]=void 0;}}function Queue(capacity){this._capacity=capacity;this._length=0;this._front=0;}Queue.prototype._willBeOverCapacity=function(size){return this._capacity<size;};Queue.prototype._pushOne=function(arg){var length=this.length();this._checkCapacity(length+1);var i=this._front+length&this._capacity-1;this[i]=arg;this._length=length+1;};Queue.prototype._unshiftOne=function(value){var capacity=this._capacity;this._checkCapacity(this.length()+1);var front=this._front;var i=(front-1&capacity-1^capacity)-capacity;this[i]=value;this._front=i;this._length=this.length()+1;};Queue.prototype.unshift=function(fn,receiver,arg){this._unshiftOne(arg);this._unshiftOne(receiver);this._unshiftOne(fn);};Queue.prototype.push=function(fn,receiver,arg){var length=this.length()+3;if(this._willBeOverCapacity(length)){this._pushOne(fn);this._pushOne(receiver);this._pushOne(arg);return;}var j=this._front+length-3;this._checkCapacity(length);var wrapMask=this._capacity-1;this[j+0&wrapMask]=fn;this[j+1&wrapMask]=receiver;this[j+2&wrapMask]=arg;this._length=length;};Queue.prototype.shift=function(){var front=this._front,ret=this[front];this[front]=undefined;this._front=front+1&this._capacity-1;this._length--;return ret;};Queue.prototype.length=function(){return this._length;};Queue.prototype._checkCapacity=function(size){if(this._capacity<size){this._resizeTo(this._capacity<<1);}};Queue.prototype._resizeTo=function(capacity){var oldCapacity=this._capacity;this._capacity=capacity;var front=this._front;var length=this._length;var moveItemsCount=front+length&oldCapacity-1;arrayMove(this,0,this,oldCapacity,moveItemsCount);};module.exports=Queue;},{}],27:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,tryConvertToPromise,apiRejection){var util=_dereq_("./util");var raceLater=function raceLater(promise){return promise.then(function(array){return race(array,promise);});};function race(promises,parent){var maybePromise=tryConvertToPromise(promises);if(maybePromise instanceof Promise){return raceLater(maybePromise);}else {promises=util.asArray(promises);if(promises===null)return apiRejection("expecting an array or an iterable object but got "+util.classString(promises));}var ret=new Promise(INTERNAL);if(parent!==undefined){ret._propagateFrom(parent,3);}var fulfill=ret._fulfill;var reject=ret._reject;for(var i=0,len=promises.length;i<len;++i){var val=promises[i];if(val===undefined&&!(i in promises)){continue;}Promise.cast(val)._then(fulfill,reject,undefined,ret,null);}return ret;}Promise.race=function(promises){return race(promises,undefined);};Promise.prototype.race=function(){return race(this,undefined);};};},{"./util":36}],28:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug){var getDomain=Promise._getDomain;var util=_dereq_("./util");var tryCatch=util.tryCatch;function ReductionPromiseArray(promises,fn,initialValue,_each){this.constructor$(promises);var domain=getDomain();this._fn=domain===null?fn:domain.bind(fn);if(initialValue!==undefined){initialValue=Promise.resolve(initialValue);initialValue._attachCancellationCallback(this);}this._initialValue=initialValue;this._currentCancellable=null;this._eachValues=_each===INTERNAL?[]:undefined;this._promise._captureStackTrace();this._init$(undefined,-5);}util.inherits(ReductionPromiseArray,PromiseArray);ReductionPromiseArray.prototype._gotAccum=function(accum){if(this._eachValues!==undefined&&accum!==INTERNAL){this._eachValues.push(accum);}};ReductionPromiseArray.prototype._eachComplete=function(value){this._eachValues.push(value);return this._eachValues;};ReductionPromiseArray.prototype._init=function(){};ReductionPromiseArray.prototype._resolveEmptyArray=function(){this._resolve(this._eachValues!==undefined?this._eachValues:this._initialValue);};ReductionPromiseArray.prototype.shouldCopyValues=function(){return false;};ReductionPromiseArray.prototype._resolve=function(value){this._promise._resolveCallback(value);this._values=null;};ReductionPromiseArray.prototype._resultCancelled=function(sender){if(sender===this._initialValue)return this._cancel();if(this._isResolved())return;this._resultCancelled$();if(this._currentCancellable instanceof Promise){this._currentCancellable.cancel();}if(this._initialValue instanceof Promise){this._initialValue.cancel();}};ReductionPromiseArray.prototype._iterate=function(values){this._values=values;var value;var i;var length=values.length;if(this._initialValue!==undefined){value=this._initialValue;i=0;}else {value=Promise.resolve(values[0]);i=1;}this._currentCancellable=value;if(!value.isRejected()){for(;i<length;++i){var ctx={accum:null,value:values[i],index:i,length:length,array:this};value=value._then(gotAccum,undefined,undefined,ctx,undefined);}}if(this._eachValues!==undefined){value=value._then(this._eachComplete,undefined,undefined,this,undefined);}value._then(completed,completed,undefined,value,this);};Promise.prototype.reduce=function(fn,initialValue){return reduce(this,fn,initialValue,null);};Promise.reduce=function(promises,fn,initialValue,_each){return reduce(promises,fn,initialValue,_each);};function completed(valueOrReason,array){if(this.isFulfilled()){array._resolve(valueOrReason);}else {array._reject(valueOrReason);}}function reduce(promises,fn,initialValue,_each){if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var array=new ReductionPromiseArray(promises,fn,initialValue,_each);return array.promise();}function gotAccum(accum){this.accum=accum;this.array._gotAccum(accum);var value=tryConvertToPromise(this.value,this.array._promise);if(value instanceof Promise){this.array._currentCancellable=value;return value._then(gotValue,undefined,undefined,this,undefined);}else {return gotValue.call(this,value);}}function gotValue(value){var array=this.array;var promise=array._promise;var fn=tryCatch(array._fn);promise._pushContext();var ret;if(array._eachValues!==undefined){ret=fn.call(promise._boundValue(),value,this.index,this.length);}else {ret=fn.call(promise._boundValue(),this.accum,value,this.index,this.length);}if(ret instanceof Promise){array._currentCancellable=ret;}var promiseCreated=promise._popContext();debug.checkForgottenReturns(ret,promiseCreated,array._eachValues!==undefined?"Promise.each":"Promise.reduce",promise);return ret;}};},{"./util":36}],29:[function(_dereq_,module,exports){"use strict";var util=_dereq_("./util");var schedule;var noAsyncScheduler=function noAsyncScheduler(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");};var NativePromise=util.getNativePromise();if(util.isNode&&typeof MutationObserver==="undefined"){var GlobalSetImmediate=global.setImmediate;var ProcessNextTick=process.nextTick;schedule=util.isRecentNode?function(fn){GlobalSetImmediate.call(global,fn);}:function(fn){ProcessNextTick.call(process,fn);};}else if(typeof NativePromise==="function"){var nativePromise=NativePromise.resolve();schedule=function schedule(fn){nativePromise.then(fn);};}else if(typeof MutationObserver!=="undefined"&&!(typeof window!=="undefined"&&window.navigator&&window.navigator.standalone)){schedule=function(){var div=document.createElement("div");var opts={attributes:true};var toggleScheduled=false;var div2=document.createElement("div");var o2=new MutationObserver(function(){div.classList.toggle("foo");toggleScheduled=false;});o2.observe(div2,opts);var scheduleToggle=function scheduleToggle(){if(toggleScheduled)return;toggleScheduled=true;div2.classList.toggle("foo");};return function schedule(fn){var o=new MutationObserver(function(){o.disconnect();fn();});o.observe(div,opts);scheduleToggle();};}();}else if(typeof setImmediate!=="undefined"){schedule=function schedule(fn){setImmediate(fn);};}else if(typeof setTimeout!=="undefined"){schedule=function schedule(fn){setTimeout(fn,0);};}else {schedule=noAsyncScheduler;}module.exports=schedule;},{"./util":36}],30:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,debug){var PromiseInspection=Promise.PromiseInspection;var util=_dereq_("./util");function SettledPromiseArray(values){this.constructor$(values);}util.inherits(SettledPromiseArray,PromiseArray);SettledPromiseArray.prototype._promiseResolved=function(index,inspection){this._values[index]=inspection;var totalResolved=++this._totalResolved;if(totalResolved>=this._length){this._resolve(this._values);return true;}return false;};SettledPromiseArray.prototype._promiseFulfilled=function(value,index){var ret=new PromiseInspection();ret._bitField=33554432;ret._settledValueField=value;return this._promiseResolved(index,ret);};SettledPromiseArray.prototype._promiseRejected=function(reason,index){var ret=new PromiseInspection();ret._bitField=16777216;ret._settledValueField=reason;return this._promiseResolved(index,ret);};Promise.settle=function(promises){debug.deprecated(".settle()",".reflect()");return new SettledPromiseArray(promises).promise();};Promise.prototype.settle=function(){return Promise.settle(this);};};},{"./util":36}],31:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,PromiseArray,apiRejection){var util=_dereq_("./util");var RangeError=_dereq_("./errors").RangeError;var AggregateError=_dereq_("./errors").AggregateError;var isArray=util.isArray;var CANCELLATION={};function SomePromiseArray(values){this.constructor$(values);this._howMany=0;this._unwrap=false;this._initialized=false;}util.inherits(SomePromiseArray,PromiseArray);SomePromiseArray.prototype._init=function(){if(!this._initialized){return;}if(this._howMany===0){this._resolve([]);return;}this._init$(undefined,-5);var isArrayResolved=isArray(this._values);if(!this._isResolved()&&isArrayResolved&&this._howMany>this._canPossiblyFulfill()){this._reject(this._getRangeError(this.length()));}};SomePromiseArray.prototype.init=function(){this._initialized=true;this._init();};SomePromiseArray.prototype.setUnwrap=function(){this._unwrap=true;};SomePromiseArray.prototype.howMany=function(){return this._howMany;};SomePromiseArray.prototype.setHowMany=function(count){this._howMany=count;};SomePromiseArray.prototype._promiseFulfilled=function(value){this._addFulfilled(value);if(this._fulfilled()===this.howMany()){this._values.length=this.howMany();if(this.howMany()===1&&this._unwrap){this._resolve(this._values[0]);}else {this._resolve(this._values);}return true;}return false;};SomePromiseArray.prototype._promiseRejected=function(reason){this._addRejected(reason);return this._checkOutcome();};SomePromiseArray.prototype._promiseCancelled=function(){if(this._values instanceof Promise||this._values==null){return this._cancel();}this._addRejected(CANCELLATION);return this._checkOutcome();};SomePromiseArray.prototype._checkOutcome=function(){if(this.howMany()>this._canPossiblyFulfill()){var e=new AggregateError();for(var i=this.length();i<this._values.length;++i){if(this._values[i]!==CANCELLATION){e.push(this._values[i]);}}if(e.length>0){this._reject(e);}else {this._cancel();}return true;}return false;};SomePromiseArray.prototype._fulfilled=function(){return this._totalResolved;};SomePromiseArray.prototype._rejected=function(){return this._values.length-this.length();};SomePromiseArray.prototype._addRejected=function(reason){this._values.push(reason);};SomePromiseArray.prototype._addFulfilled=function(value){this._values[this._totalResolved++]=value;};SomePromiseArray.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected();};SomePromiseArray.prototype._getRangeError=function(count){var message="Input array must contain at least "+this._howMany+" items but contains only "+count+" items";return new RangeError(message);};SomePromiseArray.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0));};function some(promises,howMany){if((howMany|0)!==howMany||howMany<0){return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");}var ret=new SomePromiseArray(promises);var promise=ret.promise();ret.setHowMany(howMany);ret.init();return promise;}Promise.some=function(promises,howMany){return some(promises,howMany);};Promise.prototype.some=function(howMany){return some(this,howMany);};Promise._SomePromiseArray=SomePromiseArray;};},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise){function PromiseInspection(promise){if(promise!==undefined){promise=promise._target();this._bitField=promise._bitField;this._settledValueField=promise._isFateSealed()?promise._settledValue():undefined;}else {this._bitField=0;this._settledValueField=undefined;}}PromiseInspection.prototype._settledValue=function(){return this._settledValueField;};var value=PromiseInspection.prototype.value=function(){if(!this.isFulfilled()){throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");}return this._settledValue();};var reason=PromiseInspection.prototype.error=PromiseInspection.prototype.reason=function(){if(!this.isRejected()){throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");}return this._settledValue();};var isFulfilled=PromiseInspection.prototype.isFulfilled=function(){return (this._bitField&33554432)!==0;};var isRejected=PromiseInspection.prototype.isRejected=function(){return (this._bitField&16777216)!==0;};var isPending=PromiseInspection.prototype.isPending=function(){return (this._bitField&50397184)===0;};var isResolved=PromiseInspection.prototype.isResolved=function(){return (this._bitField&50331648)!==0;};PromiseInspection.prototype.isCancelled=Promise.prototype._isCancelled=function(){return (this._bitField&65536)===65536;};Promise.prototype.isCancelled=function(){return this._target()._isCancelled();};Promise.prototype.isPending=function(){return isPending.call(this._target());};Promise.prototype.isRejected=function(){return isRejected.call(this._target());};Promise.prototype.isFulfilled=function(){return isFulfilled.call(this._target());};Promise.prototype.isResolved=function(){return isResolved.call(this._target());};Promise.prototype.value=function(){return value.call(this._target());};Promise.prototype.reason=function(){var target=this._target();target._unsetRejectionIsUnhandled();return reason.call(target);};Promise.prototype._value=function(){return this._settledValue();};Promise.prototype._reason=function(){this._unsetRejectionIsUnhandled();return this._settledValue();};Promise.PromiseInspection=PromiseInspection;};},{}],33:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL){var util=_dereq_("./util");var errorObj=util.errorObj;var isObject=util.isObject;function tryConvertToPromise(obj,context){if(isObject(obj)){if(obj instanceof Promise)return obj;var then=getThen(obj);if(then===errorObj){if(context)context._pushContext();var ret=Promise.reject(then.e);if(context)context._popContext();return ret;}else if(typeof then==="function"){if(isAnyBluebirdPromise(obj)){var ret=new Promise(INTERNAL);obj._then(ret._fulfill,ret._reject,undefined,ret,null);return ret;}return doThenable(obj,then,context);}}return obj;}function doGetThen(obj){return obj.then;}function getThen(obj){try{return doGetThen(obj);}catch(e){errorObj.e=e;return errorObj;}}var hasProp={}.hasOwnProperty;function isAnyBluebirdPromise(obj){try{return hasProp.call(obj,"_promise0");}catch(e){return false;}}function doThenable(x,then,context){var promise=new Promise(INTERNAL);var ret=promise;if(context)context._pushContext();promise._captureStackTrace();if(context)context._popContext();var synchronous=true;var result=util.tryCatch(then).call(x,resolve,reject);synchronous=false;if(promise&&result===errorObj){promise._rejectCallback(result.e,true,true);promise=null;}function resolve(value){if(!promise)return;promise._resolveCallback(value);promise=null;}function reject(reason){if(!promise)return;promise._rejectCallback(reason,synchronous,true);promise=null;}return ret;}return tryConvertToPromise;};},{"./util":36}],34:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,INTERNAL,debug){var util=_dereq_("./util");var TimeoutError=Promise.TimeoutError;function HandleWrapper(handle){this.handle=handle;}HandleWrapper.prototype._resultCancelled=function(){clearTimeout(this.handle);};var afterValue=function afterValue(value){return delay(+this).thenReturn(value);};var delay=Promise.delay=function(ms,value){var ret;var handle;if(value!==undefined){ret=Promise.resolve(value)._then(afterValue,null,null,ms,undefined);if(debug.cancellation()&&value instanceof Promise){ret._setOnCancel(value);}}else {ret=new Promise(INTERNAL);handle=setTimeout(function(){ret._fulfill();},+ms);if(debug.cancellation()){ret._setOnCancel(new HandleWrapper(handle));}}ret._setAsyncGuaranteed();return ret;};Promise.prototype.delay=function(ms){return delay(ms,this);};var afterTimeout=function afterTimeout(promise,message,parent){var err;if(typeof message!=="string"){if(message instanceof Error){err=message;}else {err=new TimeoutError("operation timed out");}}else {err=new TimeoutError(message);}util.markAsOriginatingFromRejection(err);promise._attachExtraTrace(err);promise._reject(err);if(parent!=null){parent.cancel();}};function successClear(value){clearTimeout(this.handle);return value;}function failureClear(reason){clearTimeout(this.handle);throw reason;}Promise.prototype.timeout=function(ms,message){ms=+ms;var ret,parent;var handleWrapper=new HandleWrapper(setTimeout(function timeoutTimeout(){if(ret.isPending()){afterTimeout(ret,message,parent);}},ms));if(debug.cancellation()){parent=this.then();ret=parent._then(successClear,failureClear,undefined,handleWrapper,undefined);ret._setOnCancel(handleWrapper);}else {ret=this._then(successClear,failureClear,undefined,handleWrapper,undefined);}return ret;};};},{"./util":36}],35:[function(_dereq_,module,exports){"use strict";module.exports=function(Promise,apiRejection,tryConvertToPromise,createContext,INTERNAL,debug){var util=_dereq_("./util");var TypeError=_dereq_("./errors").TypeError;var inherits=_dereq_("./util").inherits;var errorObj=util.errorObj;var tryCatch=util.tryCatch;var NULL={};function thrower(e){setTimeout(function(){throw e;},0);}function castPreservingDisposable(thenable){var maybePromise=tryConvertToPromise(thenable);if(maybePromise!==thenable&&typeof thenable._isDisposable==="function"&&typeof thenable._getDisposer==="function"&&thenable._isDisposable()){maybePromise._setDisposable(thenable._getDisposer());}return maybePromise;}function dispose(resources,inspection){var i=0;var len=resources.length;var ret=new Promise(INTERNAL);function iterator(){if(i>=len)return ret._fulfill();var maybePromise=castPreservingDisposable(resources[i++]);if(maybePromise instanceof Promise&&maybePromise._isDisposable()){try{maybePromise=tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection),resources.promise);}catch(e){return thrower(e);}if(maybePromise instanceof Promise){return maybePromise._then(iterator,thrower,null,null,null);}}iterator();}iterator();return ret;}function Disposer(data,promise,context){this._data=data;this._promise=promise;this._context=context;}Disposer.prototype.data=function(){return this._data;};Disposer.prototype.promise=function(){return this._promise;};Disposer.prototype.resource=function(){if(this.promise().isFulfilled()){return this.promise().value();}return NULL;};Disposer.prototype.tryDispose=function(inspection){var resource=this.resource();var context=this._context;if(context!==undefined)context._pushContext();var ret=resource!==NULL?this.doDispose(resource,inspection):null;if(context!==undefined)context._popContext();this._promise._unsetDisposable();this._data=null;return ret;};Disposer.isDisposer=function(d){return d!=null&&typeof d.resource==="function"&&typeof d.tryDispose==="function";};function FunctionDisposer(fn,promise,context){this.constructor$(fn,promise,context);}inherits(FunctionDisposer,Disposer);FunctionDisposer.prototype.doDispose=function(resource,inspection){var fn=this.data();return fn.call(resource,resource,inspection);};function maybeUnwrapDisposer(value){if(Disposer.isDisposer(value)){this.resources[this.index]._setDisposable(value);return value.promise();}return value;}function ResourceList(length){this.length=length;this.promise=null;this[length-1]=null;}ResourceList.prototype._resultCancelled=function(){var len=this.length;for(var i=0;i<len;++i){var item=this[i];if(item instanceof Promise){item.cancel();}}};Promise.using=function(){var len=arguments.length;if(len<2)return apiRejection("you must pass at least 2 arguments to Promise.using");var fn=arguments[len-1];if(typeof fn!=="function"){return apiRejection("expecting a function but got "+util.classString(fn));}var input;var spreadArgs=true;if(len===2&&Array.isArray(arguments[0])){input=arguments[0];len=input.length;spreadArgs=false;}else {input=arguments;len--;}var resources=new ResourceList(len);for(var i=0;i<len;++i){var resource=input[i];if(Disposer.isDisposer(resource)){var disposer=resource;resource=resource.promise();resource._setDisposable(disposer);}else {var maybePromise=tryConvertToPromise(resource);if(maybePromise instanceof Promise){resource=maybePromise._then(maybeUnwrapDisposer,null,null,{resources:resources,index:i},undefined);}}resources[i]=resource;}var reflectedResources=new Array(resources.length);for(var i=0;i<reflectedResources.length;++i){reflectedResources[i]=Promise.resolve(resources[i]).reflect();}var resultPromise=Promise.all(reflectedResources).then(function(inspections){for(var i=0;i<inspections.length;++i){var inspection=inspections[i];if(inspection.isRejected()){errorObj.e=inspection.error();return errorObj;}else if(!inspection.isFulfilled()){resultPromise.cancel();return;}inspections[i]=inspection.value();}promise._pushContext();fn=tryCatch(fn);var ret=spreadArgs?fn.apply(undefined,inspections):fn(inspections);var promiseCreated=promise._popContext();debug.checkForgottenReturns(ret,promiseCreated,"Promise.using",promise);return ret;});var promise=resultPromise.lastly(function(){var inspection=new Promise.PromiseInspection(resultPromise);return dispose(resources,inspection);});resources.promise=promise;promise._setOnCancel(resources);return promise;};Promise.prototype._setDisposable=function(disposer){this._bitField=this._bitField|131072;this._disposer=disposer;};Promise.prototype._isDisposable=function(){return (this._bitField&131072)>0;};Promise.prototype._getDisposer=function(){return this._disposer;};Promise.prototype._unsetDisposable=function(){this._bitField=this._bitField&~131072;this._disposer=undefined;};Promise.prototype.disposer=function(fn){if(typeof fn==="function"){return new FunctionDisposer(fn,this,createContext());}throw new TypeError();};};},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){"use strict";var es5=_dereq_("./es5");var canEvaluate=typeof navigator=="undefined";var errorObj={e:{}};var tryCatchTarget;var globalObject=typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:this!==undefined?this:null;function tryCatcher(){try{var target=tryCatchTarget;tryCatchTarget=null;return target.apply(this,arguments);}catch(e){errorObj.e=e;return errorObj;}}function tryCatch(fn){tryCatchTarget=fn;return tryCatcher;}var inherits=function inherits(Child,Parent){var hasProp={}.hasOwnProperty;function T(){this.constructor=Child;this.constructor$=Parent;for(var propertyName in Parent.prototype){if(hasProp.call(Parent.prototype,propertyName)&&propertyName.charAt(propertyName.length-1)!=="$"){this[propertyName+"$"]=Parent.prototype[propertyName];}}}T.prototype=Parent.prototype;Child.prototype=new T();return Child.prototype;};function isPrimitive(val){return val==null||val===true||val===false||typeof val==="string"||typeof val==="number";}function isObject(value){return typeof value==="function"||(typeof value==="undefined"?"undefined":_typeof(value))==="object"&&value!==null;}function maybeWrapAsError(maybeError){if(!isPrimitive(maybeError))return maybeError;return new Error(safeToString(maybeError));}function withAppended(target,appendee){var len=target.length;var ret=new Array(len+1);var i;for(i=0;i<len;++i){ret[i]=target[i];}ret[i]=appendee;return ret;}function getDataPropertyOrDefault(obj,key,defaultValue){if(es5.isES5){var desc=Object.getOwnPropertyDescriptor(obj,key);if(desc!=null){return desc.get==null&&desc.set==null?desc.value:defaultValue;}}else {return {}.hasOwnProperty.call(obj,key)?obj[key]:undefined;}}function notEnumerableProp(obj,name,value){if(isPrimitive(obj))return obj;var descriptor={value:value,configurable:true,enumerable:false,writable:true};es5.defineProperty(obj,name,descriptor);return obj;}function thrower(r){throw r;}var inheritedDataKeys=function(){var excludedPrototypes=[Array.prototype,Object.prototype,Function.prototype];var isExcludedProto=function isExcludedProto(val){for(var i=0;i<excludedPrototypes.length;++i){if(excludedPrototypes[i]===val){return true;}}return false;};if(es5.isES5){var getKeys=Object.getOwnPropertyNames;return function(obj){var ret=[];var visitedKeys=Object.create(null);while(obj!=null&&!isExcludedProto(obj)){var keys;try{keys=getKeys(obj);}catch(e){return ret;}for(var i=0;i<keys.length;++i){var key=keys[i];if(visitedKeys[key])continue;visitedKeys[key]=true;var desc=Object.getOwnPropertyDescriptor(obj,key);if(desc!=null&&desc.get==null&&desc.set==null){ret.push(key);}}obj=es5.getPrototypeOf(obj);}return ret;};}else {var hasProp={}.hasOwnProperty;return function(obj){if(isExcludedProto(obj))return [];var ret=[]; /*jshint forin:false */enumeration: for(var key in obj){if(hasProp.call(obj,key)){ret.push(key);}else {for(var i=0;i<excludedPrototypes.length;++i){if(hasProp.call(excludedPrototypes[i],key)){continue enumeration;}}ret.push(key);}}return ret;};}}();var thisAssignmentPattern=/this\s*\.\s*\S+\s*=/;function isClass(fn){try{if(typeof fn==="function"){var keys=es5.names(fn.prototype);var hasMethods=es5.isES5&&keys.length>1;var hasMethodsOtherThanConstructor=keys.length>0&&!(keys.length===1&&keys[0]==="constructor");var hasThisAssignmentAndStaticMethods=thisAssignmentPattern.test(fn+"")&&es5.names(fn).length>0;if(hasMethods||hasMethodsOtherThanConstructor||hasThisAssignmentAndStaticMethods){return true;}}return false;}catch(e){return false;}}function toFastProperties(obj){ /*jshint -W027,-W055,-W031*/function FakeConstructor(){}FakeConstructor.prototype=obj;var l=8;while(l--){new FakeConstructor();}return obj;eval(obj);}var rident=/^[a-z$_][a-z$_0-9]*$/i;function isIdentifier(str){return rident.test(str);}function filledRange(count,prefix,suffix){var ret=new Array(count);for(var i=0;i<count;++i){ret[i]=prefix+i+suffix;}return ret;}function safeToString(obj){try{return obj+"";}catch(e){return "[no string representation]";}}function isError(obj){return obj!==null&&(typeof obj==="undefined"?"undefined":_typeof(obj))==="object"&&typeof obj.message==="string"&&typeof obj.name==="string";}function markAsOriginatingFromRejection(e){try{notEnumerableProp(e,"isOperational",true);}catch(ignore){}}function originatesFromRejection(e){if(e==null)return false;return e instanceof Error["__BluebirdErrorTypes__"].OperationalError||e["isOperational"]===true;}function canAttachTrace(obj){return isError(obj)&&es5.propertyIsWritable(obj,"stack");}var ensureErrorObject=function(){if(!("stack" in new Error())){return function(value){if(canAttachTrace(value))return value;try{throw new Error(safeToString(value));}catch(err){return err;}};}else {return function(value){if(canAttachTrace(value))return value;return new Error(safeToString(value));};}}();function classString(obj){return {}.toString.call(obj);}function copyDescriptors(from,to,filter){var keys=es5.names(from);for(var i=0;i<keys.length;++i){var key=keys[i];if(filter(key)){try{es5.defineProperty(to,key,es5.getDescriptor(from,key));}catch(ignore){}}}}var asArray=function asArray(v){if(es5.isArray(v)){return v;}return null;};if(typeof Symbol!=="undefined"&&Symbol.iterator){var ArrayFrom=typeof Array.from==="function"?function(v){return Array.from(v);}:function(v){var ret=[];var it=v[Symbol.iterator]();var itResult;while(!(itResult=it.next()).done){ret.push(itResult.value);}return ret;};asArray=function asArray(v){if(es5.isArray(v)){return v;}else if(v!=null&&typeof v[Symbol.iterator]==="function"){return ArrayFrom(v);}return null;};}var isNode=typeof process!=="undefined"&&classString(process).toLowerCase()==="[object process]";function env(key,def){return isNode?process.env[key]:def;}function getNativePromise(){if(typeof Promise==="function"){try{var promise=new Promise(function(){});if({}.toString.call(promise)==="[object Promise]"){return Promise;}}catch(e){}}}var ret={isClass:isClass,isIdentifier:isIdentifier,inheritedDataKeys:inheritedDataKeys,getDataPropertyOrDefault:getDataPropertyOrDefault,thrower:thrower,isArray:es5.isArray,asArray:asArray,notEnumerableProp:notEnumerableProp,isPrimitive:isPrimitive,isObject:isObject,isError:isError,canEvaluate:canEvaluate,errorObj:errorObj,tryCatch:tryCatch,inherits:inherits,withAppended:withAppended,maybeWrapAsError:maybeWrapAsError,toFastProperties:toFastProperties,filledRange:filledRange,toString:safeToString,canAttachTrace:canAttachTrace,ensureErrorObject:ensureErrorObject,originatesFromRejection:originatesFromRejection,markAsOriginatingFromRejection:markAsOriginatingFromRejection,classString:classString,copyDescriptors:copyDescriptors,hasDevTools:typeof chrome!=="undefined"&&chrome&&typeof chrome.loadTimes==="function",isNode:isNode,env:env,global:globalObject,getNativePromise:getNativePromise};ret.isRecentNode=ret.isNode&&function(){var version=process.versions.node.split(".").map(Number);return version[0]===0&&version[1]>10||version[0]>0;}();if(ret.isNode)ret.toFastProperties(process);try{throw new Error();}catch(e){ret.lastLineError=e;}module.exports=ret;},{"./es5":13}]},{},[4])(4);});;if(typeof window!=='undefined'&&window!==null){window.P=window.Promise;}else if(typeof self!=='undefined'&&self!==null){self.P=self.Promise;}}).call(this,require('_process'),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{"_process":12}],2:[function(require,module,exports){'use strict';var ContextMenu=function(_View){_inherits(ContextMenu,_View);function ContextMenu(params){_classCallCheck(this,ContextMenu); // Recycle other context menus
var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(ContextMenu).call(this,params));if($('.context-menu').length>0){_this.$element=$('.context-menu');}else {_this.$element=_.ul({class:'context-menu dropdown-menu',role:'menu'});}_this.$element.css({position:'absolute','z-index':1200,top:_this.pos.y,left:_this.pos.x,display:'block'});_this.fetch();return _this;}_createClass(ContextMenu,[{key:"render",value:function render(){var view=this;view.$element.html(_.each(view.model,function(label,func){if(func=='---'){return _.li({class:'dropdown-header'},label);}else {return _.li({class:typeof func==='function'?'':'disabled'},_.a({tabindex:'-1',href:'#'},label).click(function(e){e.preventDefault();e.stopPropagation();if(func){func(e);view.remove();}}));}}));$('body').append(view.$element);}}]);return ContextMenu;}(View);if(typeof jQuery!=='undefined'){jQuery.fn.extend({exocontext:function exocontext(menuItems){return this.each(function(){$(this).on('contextmenu',function(e){if(e.ctrlKey){return;}$('.context-menu-target-element').removeClass('context-menu-target-element');e.preventDefault();e.stopPropagation();if(e.which==3){$(this).toggleClass('context-menu-target-element',true);var menu=new ContextMenu({model:menuItems,pos:{x:e.pageX,y:e.pageY}});}});});}}); // Event handling
$('body').click(function(e){if($(e.target).parents('.context-menu').length<1){$('.context-menu-target-element').removeClass('context-menu-target-element');ViewHelper.removeAll('ContextMenu');}});}},{}],3:[function(require,module,exports){'use strict'; // ----------
// Event handlers
// ----------
function hoverDropContainerHandler(e){DragDrop.current.onHoverDropContainer(this,e);}function leaveDropContainerHandler(e){DragDrop.current.onLeaveDropContainer(this,e);}function dragHandler(e){DragDrop.current.onDrag(e);}function releaseHandler(e){DragDrop.current.onReleaseDragHandle(e);} // ----------
// Registered DragDrop instances
// ----------
var instances=[]; /**
 * An instance that allows for elements to be dragged and dropped, using pure JavaScript
 */var DragDrop=function(){_createClass(DragDrop,null,[{key:"getInstances", /**
     * Gets all instances
     *
     * @returns {Array} instances
     */value:function getInstances(){return instances;} /**
     * Destroys a DragDrop instance
     *
     * @param {HTMLelement} element
     */},{key:"destroy",value:function destroy(element){for(var i in instances){var instance=instances[i];if(instance.element==element){instance.removeListeners();instances.splice(i,1);break;}}} /**
     * Constructs a new instance
     *
     * @param {HTMLElement} element
     * @param {Object} config
     */}]);function DragDrop(element,config){_classCallCheck(this,DragDrop);var instance=this; // Register this instance
instances.push(instance); // Init element
this.element=element;this.element.setAttribute('data-dragdrop-enabled','true'); // Init listener array
this.listeners=[]; // Adopt config
config=config||{};this.config={dragThreshold:2,dragScrollSpeed:5,dropContainerClass:'',dropContainers:[],lockY:false,lockX:false,onDrag:function onDrag(){},onBeginDrag:function onBeginDrag(){},onEndDrag:function onEndDrag(){}};for(var k in config){this.config[k]=config[k];} // Detect initial click
function downHandler(mousedownEvent){if(mousedownEvent.which==1){(function(){ // Detect initial move
var moveHandler=function moveHandler(mousemoveEvent){dragFrames++;if(dragFrames>=instance.config.dragThreshold){instance.onMoveDragHandle(mousemoveEvent);instance.off(instance.element,'mousemove',moveHandler);instance.off(document,'mouseup',upHandler);}}; // Detect immediate pointer release
var upHandler=function upHandler(upEvent){instance.off(instance.element,'mousemove',moveHandler);instance.off(document,'mouseup',upHandler);};mousedownEvent.preventDefault();var dragFrames=0;instance.on(instance.element,'mousemove',moveHandler);instance.on(document,'mouseup',upHandler);})();}} // Add pointer event
this.on(this.element,'mousedown',downHandler);} /**
     * Register listener
     *
     * @param {HTMLElement} element
     * @param {String} event
     * @param {Function} handler
     */_createClass(DragDrop,[{key:"on",value:function on(element,event,handler){element.addEventListener(event,handler);this.listeners.push({element:element,event:event,handler:handler});} /**
     * Unregister listener
     *
     * @param {HTMLElement} element
     * @param {String} event
     * @param {Function} handler
     */},{key:"off",value:function off(element,event,handler){element.removeEventListener(event,handler);for(var i in this.listeners){var listener=this.listeners[i];if(listener.element==element&&listener.event==event&&listener.handler==handler){this.listeners.splice(i,1);break;}}} /**
     * Removes all event listeners
     */},{key:"removeListeners",value:function removeListeners(){for(var i in this.listeners){var listener=this.listeners[i];listener.element.removeEventListener(listener.event,listener.handler);}this.listeners=[];} /**
     * Gets all drop containers
     *
     * @returns {Array} containers
     */},{key:"updateDropContainers",value:function updateDropContainers(){DragDrop.currentDropContainers=[]; // An array of elements are specified
if(this.config.dropContainers&&this.config.dropContainers.length>0){DragDrop.currentDropContainers=this.config.dropContainers; // A selector is specified
}else if(this.config.dropContainerClass){DragDrop.currentDropContainers=document.querySelectorAll(this.config.dropContainerClass); // Nothing is specified, look for similar containers
}else {var dragDropItems=document.querySelectorAll('*[data-dragdrop-enabled="true"]')||[];for(var i=0;i<dragDropItems.length;i++){var dragDropItem=dragDropItems[i];var dropContainer=dragDropItem.parentElement;if(DragDrop.currentDropContainers.indexOf(dropContainer)<0){DragDrop.currentDropContainers[DragDrop.currentDropContainers.length]=dropContainer;}}}} /**
     * Event: Move drag handle
     *
     * @param {Event} e
     */},{key:"onMoveDragHandle",value:function onMoveDragHandle(e){e.preventDefault();e.stopPropagation();DragDrop.current=this; // Prevent overlapping mouse interaction on body
document.body.style.userSelect='none';document.body.style.pointerAction='none'; // Find parent element with position set to anything but static
var positionParent=this.element.parentElement;while(window.getComputedStyle(positionParent).position=='static'&&positionParent!=document.body){positionParent=positionParent.parentElement;} // Get rects of element and position parent
var positionParentRect=positionParent.getBoundingClientRect();var elementRect=this.element.getBoundingClientRect(); // Calculate element offset
var elementOffset={top:elementRect.top-positionParentRect.top,left:elementRect.left-positionParentRect.left}; // Get computed style
var computedStyle=window.getComputedStyle(this.element); // Calculate pointer offset
var pointerOffset={top:elementOffset.top-e.pageY,left:elementOffset.left-e.pageX}; // Cache the pointer offset
this.pointerOffset=pointerOffset; // Cache the previous parent element
this.previousParent=this.element.parentElement; // Set temporary styling
this.element.style.position='absolute';this.element.style.top=elementOffset.top;this.element.style.left=elementOffset.left;this.element.style.width=elementRect.width;this.element.style.height=elementRect.height;this.element.style.zIndex=999; // Add events on drop containers
this.updateDropContainers();for(var i=0;i<DragDrop.currentDropContainers.length;i++){var dropContainer=DragDrop.currentDropContainers[i];this.on(dropContainer,'mousemove',hoverDropContainerHandler);this.on(dropContainer,'mouseleave',leaveDropContainerHandler);} // Insert placeholder
var placeholder=document.createElement('DIV');placeholder.id='dragdrop-placeholder';placeholder.style.height=computedStyle.height;placeholder.style.width=computedStyle.width;this.element.parentElement.insertBefore(placeholder,this.element); // Add pointer movement logic
this.on(document,'mousemove',dragHandler); // Add pointer release logic
this.on(document,'mouseup',releaseHandler); // Fire begin drag event
if(typeof this.config.onBeginDrag==='function'){this.config.onBeginDrag(this);}} /**
     * Event: On drag
     *
     * @param {Event} e
     */},{key:"onDrag",value:function onDrag(e){e.preventDefault();e.stopPropagation(); // Apply new styling to element
if(!this.config.lockY){this.element.style.top=e.pageY+this.pointerOffset.top;}if(!this.config.lockX){this.element.style.left=e.pageX+this.pointerOffset.left;} // Calculate viewport
var viewport={x:document.scrollLeft,y:document.scrollTop,w:window.width,h:window.height}; // Scroll page if dragging near the top or bottom
// TODO: Implement for sides too
if(e.pageY>viewport.y+viewport.h-100){ //   scroll(1 * this.dragScrollSpeed);
}else if(e.pageY<viewport.y+100){} //  scroll(-1 * this.dragScrollSpeed);
// Fire drag event
if(typeof this.config.onDrag==='function'){this.config.onDrag(this);}} /**
     * Event: On release drag handle
     *
     * @param {Event} e
     */},{key:"onReleaseDragHandle",value:function onReleaseDragHandle(e){e.preventDefault();e.stopPropagation();DragDrop.current=null; // Remove pointer events
this.off(document,'mousemove',dragHandler);this.off(document,'mouseup',releaseHandler); // Remove drop container events
for(var i=0;i<DragDrop.currentDropContainers.length;i++){var dropContainer=DragDrop.currentDropContainers[i];delete dropContainer.dataset.dragdropHovering;this.off(dropContainer,'mousemove',hoverDropContainerHandler);this.off(dropContainer,'mouseleave',leaveDropContainerHandler);;} // Get placeholder
var placeholder=document.getElementById('dragdrop-placeholder'); // Set new parent
placeholder.parentElement.insertBefore(this.element,placeholder); // Remove placeholder
placeholder.parentElement.removeChild(placeholder); // Remove temporary styling
document.body.removeAttribute('style');this.element.removeAttribute('style'); // Add back the grab cursor style
this.element.style.cursor='grab'; // Remove cached variables
this.pointerOffset=null;this.previousParent=null;this.dragHandler=null; // Fire end drag event
if(typeof this.config.onEndDrag==='function'){this.config.onEndDrag(this);}} /**
     * Event: Hover drop container
     *
     * @param {HTMLElement} dropContainer
     * @param {Event} e
     */},{key:"onHoverDropContainer",value:function onHoverDropContainer(dropContainer,e){dropContainer.dataset.dragdropHovering=true;function intersectRect(r1,r2){return r1.left<r2.right&&r1.right>r2.left&&r1.top<r2.bottom&&r1.bottom>r2.top;}var elementRect=this.element.getBoundingClientRect();var placeholder=document.getElementById('dragdrop-placeholder');var childNodes=dropContainer.querySelectorAll('*[data-dragdrop-enabled="true"]');for(var i=0;i<childNodes.length;i++){var child=childNodes[i];var childRect=child.getBoundingClientRect();childRect.center=childRect.left+childRect.width/2;childRect.middle=childRect.top+childRect.height/2;if(this.config.lockX){if(elementRect.top>childRect.top&&elementRect.top<childRect.bottom){dropContainer.insertBefore(placeholder,child.nextSibling);break;}else if(elementRect.top<childRect.top&&elementRect.bottom>childRect.top){dropContainer.insertBefore(placeholder,child);break;}}else if(this.config.lockY){if(elementRect.left>childRect.left&&elementRect.left<childRect.right){dropContainer.insertBefore(placeholder,child.nextSibling);break;}else if(elementRect.left<childRect.left&&elementRect.right>childRect.left){dropContainer.insertBefore(placeholder,child);break;}}else {if(intersectRect(elementRect,childRect)){dropContainer.insertBefore(placeholder,child.nextSibling);break;}}}} /**
     * Event: Leave drop container
     *
     * @param {HTMLElement} dropContainer
     * @param {Event} e
     */},{key:"onLeaveDropContainer",value:function onLeaveDropContainer(dropContainer,e){dropContainer.dataset.dragdropHovering=true;}}]);return DragDrop;}();window.DragDrop=DragDrop;if(typeof jQuery!=='undefined'){jQuery.fn.extend({exodragdrop:function exodragdrop(config){return this.each(function(){if(config=='destroy'){DragDrop.destroy(this);}else {new DragDrop(this,config);}});}});}},{}],4:[function(require,module,exports){'use strict';var FunctionTemplating={}; /**
 * Appends content to an element
 *
 * @param {HTMLElement} element
 * @param {Object} content
 */function append(element,content){if(Object.prototype.toString.call(content)==='[object Array]'){for(var _i in content){append(element,content[_i]);}}else if(content){ // jQuery logic
if(typeof jQuery!=='undefined'&&element instanceof jQuery){element.append(content); // Native JavaScript logic
}else {element.appendChild(content);}}} /**
 * Assigns event handler shorthands to element
 * This is done to prevent extending the HTMLElement prototype
 *
 * @param {HTMLElement} element
 */function assignEvents(element){ /**
     * Handles the 'addEventListener' method
     *
     * @param {String} type
     * @param {Function} callback
     */element.on=function on(type,callback){element.addEventListener(type,callback);return element;}; /**
     * Handles the 'removeEventListener' method
     *
     * @param {String} type
     * @param {Function} callback
     */element.off=function off(type,callback){element.removeEventListener(type,callback);return element;}; /**
     * Removes an element
     */element.remove=function remove(){element.parentNode.removeChild(element);}; // Define shorthand methods
var shorthands=['blur','change','click','focus','hover','keydown','keypress','keyup','mousedown','mouseenter','mouseleave','mouseout','mouseover','mouseup','select'];var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var shorthand=_step.value;element[shorthand]=function click(callback){return element.on(shorthand,callback);};};for(var _iterator=shorthands[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop();}}catch(err){_didIteratorError=true;_iteratorError=err;}finally {try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}}finally {if(_didIteratorError){throw _iteratorError;}}}} /**
 * Creates an element
 *
 * @param {String} tag
 * @param {Object} attr
 * @param {Object} contents
 *
 * @returns {HTMLElement} element
 */function create(tag,attr,contents){var element=document.createElement(tag.toUpperCase()); // jQuery logic
if(typeof jQuery!=='undefined'){element=$(element); // If the attribute parameter is a jQuery instance, just reassign the parameter values
if(attr instanceof jQuery||typeof attr==='string'){contents=attr;}else {for(var k in attr){element.attr(k,attr[k]);}} // Native JavaScript logic
}else { // Assign custom event functions to element instead of extending the prototype
assignEvents(element); // If the attribute parameter is a HTMLElement instance, just reassign the parameter values
if(attr instanceof HTMLElement||typeof attr==='string'){contents=attr;}else {for(var k in attr){element.setAttribute(k,attr[k]);}}}append(element,contents);return element;} /**
 * Declares a rendering method
 *
 * @param {String} tag
 */function declareMethod(tag){FunctionTemplating[tag]=function(attr){for(var _len=arguments.length,contents=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){contents[_key-1]=arguments[_key];}return create(tag,attr,contents);};} /**
 * Appends content using the function templating rules
 *
 * @params {HTMLElement} parentElement
 * @params {HTMLElement} contents
 */FunctionTemplating.append=function(parentElement){for(var _len2=arguments.length,contents=Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){contents[_key2-1]=arguments[_key2];}append(parentElement,contents);}; /**
 * Renders content based on a condition
 * 
 * @param {Boolean} condition
 * @param {HTMLElement} contents
 *
 * @returns {HTMLElement} contents
 */FunctionTemplating.if=function(condition){if(condition!=false&&condition!=null&&condition!=undefined){for(var _len3=arguments.length,contents=Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){contents[_key3-1]=arguments[_key3];}return contents;}}; /**
 * Loops through an array or object, rendering elements from model data
 *
 * @param {Object} array
 * @param {Function} callback
 *
 * @returns {HTMLElement} elements
 */FunctionTemplating.each=function(array,callback){var elements=[];for(var i in array){var element=callback(i,array[i]);if(element){elements.push(element);}}return elements;}; /**
 * A shorthand for document.querySelector
 *
 * @param {String} query
 *
 * @returns {HTMLElement} element
 */FunctionTemplating.find=function(query){var element=document.querySelector(query);if(element){if(typeof jQuery!=='undefined'){return $(element);}else {assignEvents(element);return element;}}}; /**
 * A shorthand for document.querySelectorAll
 *
 * @param {String} query
 *
 * @returns {HTMLElement[]} element
 */FunctionTemplating.findAll=function(query){var elements=document.querySelectorAll(query);if(elements){if(typeof jQuery!=='undefined'){return $(elements);}else {var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=elements[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var element=_step2.value;assignEvents(element);}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally {try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return();}}finally {if(_didIteratorError2){throw _iteratorError2;}}}return elements;}}}; // ----------
// Init all element types
// ----------
var elementTypes=[ // Block elements
'div','section','nav','hr','label','textarea','audio','video','canvas','iframe', // Inline elements
'img', // Table elements
'table','thead','tbody','th','td','tr', // Select
'select','option','optgroup','input', // Headings
'h1','h2','h3','h4','h5','h6', // Body text
'span','p','strong','b', // Action buttons
'a','button', // SVG
'polygon','svg', // List
'ol','ul','li', // Forms
'form','input'];for(var i in elementTypes){declareMethod(elementTypes[i]);}window._=FunctionTemplating;},{}],5:[function(require,module,exports){'use strict';var elementTags=[ // Block elements
'div','section','nav','hr','label','textarea','audio','video','canvas','iframe', // Inline elements
'img', // Table elements
'table','thead','tbody','th','td','tr', // Select
'select','option','input', // Headings
'h1','h2','h3','h4','h5','h6', // Body text
'span','p','strong','b', // Action buttons
'a','button', // List
'ol','ul','li', // Forms
'form','input'];var ObjectTemplating=function(){function ObjectTemplating(object){_classCallCheck(this,ObjectTemplating);var template=this;var $elements=[];this.$elements={};function getTagName(key){for(var i in elementTags){var elementTagName=elementTags[i];if(key.indexOf(elementTagName)==0){return elementTagName;}}return null;}function createElement(tag){return $('<'+tag+'></'+tag+'>');}function parseObject(obj,$parentElement){if(typeof obj==='string'&&$parentElement){$parentElement.append(obj);}else {for(var k in obj){var v=obj[k]; // ----------
// Function keywords
// ----------
// Each
if(k=='each'){if(Array.isArray(v)){var array=v[0];var iterator=v[1];for(var i in array){var newObject=iterator(i,array[i]);if(newObject){var $newElement=new ObjectTemplating(newObject);if($newElement){if($parentElement){$parentElement.append($newElement);}else {$elements[$elements.length]=$newElement;}}}}}else {console.log('[Exomon] Usage of "each": Array([Array/Object], [Function]). Argument provided was of type "'+(typeof v==="undefined"?"undefined":_typeof(v))+'"');} // Content / HTML
}else if(k=='content'||k=='html'){if($parentElement){$parentElement.append(v);}else {$elements[$elements.length]=v;} // Events / on
}else if(k=='events'||k=='on'){if($parentElement){for(var eventName in v){$parentElement.on(eventName,v[eventName]);}}}else { // ----------
// Create element
// ----------
var keyTagName=getTagName(k);if(keyTagName){var _$newElement=createElement(keyTagName);var elementName=k.replace(keyTagName,'');if(elementName){if(elementName[0]=='_'){elementName=elementName.slice(1);}elementName=elementName.charAt(0).toLowerCase()+elementName.slice(1);template.$elements[elementName]=_$newElement;}parseObject(v,_$newElement);if($parentElement){$parentElement.append(_$newElement);}else {$elements[$elements.length]=_$newElement;} // ----------
// Add attributes to parent element
// ----------
}else {if($parentElement){$parentElement.attr(k,v);}}}}}}parseObject(object);if($elements.length<1){this.html=null;}else if($elements.length==1){this.html=$elements[0];}else {this.html=$elements;}} /**
     * Returns the generated html
     */_createClass(ObjectTemplating,[{key:"html",value:function html(){return this.html;}}]);return ObjectTemplating;}();module.exports=ObjectTemplating;window.Template=ObjectTemplating;},{}],6:[function(require,module,exports){'use strict';var pathToRegexp=require('path-to-regexp');var routes=[];var Router=function(){function Router(){_classCallCheck(this,Router);}_createClass(Router,null,[{key:"route",value:function route(path,controller){routes[path]={controller:controller};}},{key:"go",value:function go(url){location.hash=url;}},{key:"goToBaseDir",value:function goToBaseDir(){var url=this.url||'/';var base=new String(url).substring(0,url.lastIndexOf('/'));this.go(base);}},{key:"query",value:function query(name){var url=window.location.href;name=name.replace(/[\[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)");var results=regex.exec(url);if(!results)return null;if(!results[2])return '';return decodeURIComponent(results[2].replace(/\+/g," "));}},{key:"init",value:function init(){ // Get the url
var url=location.hash.slice(1)||'/';var trimmed=url.substring(0,url.indexOf('?'));Router.params={};if(trimmed){url=trimmed;} // Look for route
var context={};var route=void 0; // Exact match
if(routes[url]){route=routes[url]; // Use path to regexp
}else {for(var path in routes){var keys=[];var re=pathToRegexp(path,keys);var values=re.exec(url); // A match was found
if(re.test(url)){ // Set the route
route=routes[path]; // Add context variables (first result (0) is the entire path,
// so assign that manually and start the counter at 1 instead)
route.url=url;var counter=1;var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=keys[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var key=_step3.value;route[key.name]=values[counter];Router.params[key.name]=values[counter];counter++;}}catch(err){_didIteratorError3=true;_iteratorError3=err;}finally {try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return();}}finally {if(_didIteratorError3){throw _iteratorError3;}}}break;}}}if(route){route.controller();}Router.url=url;}}]);return Router;}();window.addEventListener('hashchange',Router.init);window.Router=Router;},{"path-to-regexp":10}],7:[function(require,module,exports){'use strict'; /**
 * Generates a new GUID
 */function guid(){function s4(){return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();}var instances=[]; /**
 * Helper class for getting instances of Views
 *
 * @class ViewHelper
 */var ViewHelper=function(){function ViewHelper(){_classCallCheck(this,ViewHelper);}_createClass(ViewHelper,null,[{key:"getAll",value:function getAll(type){var results=[];if(type){for(var i in instances){var instance=instances[i];var name=instance.name;if(name==type){results.push(instance);}}}else {results=instances;}return results;}},{key:"get",value:function get(type){var results=ViewHelper.getAll(type);var view=results.length>0?results[0]:null;return view;}},{key:"clear",value:function clear(type){for(var _guid in instances){var instance=instances[_guid];var name=instance.constructor.name;if(!type||name==type){instance.remove();}}}},{key:"removeAll",value:function removeAll(type){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=ViewHelper.getAll(type)[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var view=_step4.value;view.remove();}}catch(err){_didIteratorError4=true;_iteratorError4=err;}finally {try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return();}}finally {if(_didIteratorError4){throw _iteratorError4;}}}}}]);return ViewHelper;}();window.ViewHelper=ViewHelper; /**
 * View class
 *
 * @class View
 *
 * @param {Object} params
 */var View=function(){function View(params){_classCallCheck(this,View);this.name=this.constructor.name;this.guid=guid();this.events={};this.adopt(params);instances[this.guid]=this;} /**
     * Gets the name of this View
     */_createClass(View,[{key:"getName",value:function getName(){var name=this.constructor.toString();name=name.substring('function '.length);name=name.substring(0,name.indexOf('('));return name;} /**
     * Init
     */},{key:"init",value:function init(){var _this2=this;this.prerender();this.render();this.postrender(); // jQuery
if(typeof jQuery!=='undefined'&&this.$element){this.element=this.$element[0];this.$element.on('remove',function(){_this2.remove();}); // Native JavaScript
}else if(this.element){this.addEventListener('DOMNodeRemoved',function(){_this2.remove();});}this.trigger('ready',this);this.isReady=true;} /**
     * Shorthand for .on('ready')
     */},{key:"ready",value:function ready(callback){if(this.isReady){callback(this);}else {this.on('ready',callback);}} /**
     * Adopts values
     *
     * @param {Object} values
     */},{key:"adopt",value:function adopt(params){for(var k in params){this[k]=params[k];}return this;} /**
     * Runs before render
     */},{key:"prerender",value:function prerender(){} /**
     * Renders this view
     */},{key:"render",value:function render(){var output=void 0;if(typeof this.template==='function'){output=this.template.call(this,this);}if(output){ // jQuery
if(typeof jQuery!=='undefined'){if(this.$element){this.$element.html(output.children());}else {this.$element=output;} // Native JavaScript
}else {if(this.element){this.element.innerHTML=output.innerHTML;}else {this.element=output;}}}} /**
     * Runs after render
     */},{key:"postrender",value:function postrender(){} /**
     * Removes the view from DOM and memory
     */},{key:"remove",value:function remove(timeout){var _this3=this;if(!this.destroyed){this.destroyed=true;setTimeout(function(){_this3.trigger('remove'); // jQuery
if(typeof jQuery!=='undefined'&&_this3.$element&&_this3.$element.length>0){_this3.$element.remove(); // Native JavaScript
}else if(_this3.element){_this3.element.parentElement.removeChild(_this3.element);}instances.splice(_this3.guid,1);},timeout||0);}} /**
     * Call an event (for internal use)
     */},{key:"call",value:function call(callback,data,ui){callback(data,ui,this);} /**
     * Trigger an event
     */},{key:"trigger",value:function trigger(e,obj){if(this.events[e]){if(typeof this.events[e]==='function'){this.events[e](obj);}else {for(var i in this.events[e]){if(this.events[e][i]){this.events[e][i](obj);}}}}} /**
     * Bind an event
     */},{key:"on",value:function on(e,callback){var view=this; // No events registered, register this as the only event
if(!this.events[e]){this.events[e]=function(data){view.call(callback,data,this);}; // Events have already been registered, add to callback array
}else { // Only one event is registered, so convert from a single reference to an array
if(!this.events[e].length){this.events[e]=[this.events[e]];} // Insert the event call into the array 
this.events[e].push(function(data){view.call(callback,data,this);});}} /**
     * Check if event exists
     */},{key:"hasEvent",value:function hasEvent(name){for(var k in this.events){if(k==name){return true;}}return false;} /**
     * Fetch model data
     */},{key:"fetch",value:function fetch(){var view=this;function getModel(){ // Get model from URL
if(!view.model&&typeof view.modelUrl==='string'){var request=new XMLHttpRequest();request.open('GET',view.modelUrl,true);request.onload=function(){if(request.status>=200&&request.status<400){ // Success!
var data=JSON.parse(request.responseText);view.model=data;view.init();}else { // We reached our target server, but it returned an error
throw 'Couldn\'t fetch model data';}};request.onerror=function(e){throw e.toString();};request.send(); // Get model with function
}else if(!view.model&&typeof view.modelFunction==='function'){view.modelFunction(function(data){view.model=data;view.init();}); // Just perform the initialisation
}else {view.init();}} // Get the model
getModel();}}]);return View;}();window.View=View;},{}],8:[function(require,module,exports){require('./Router');require('./FunctionTemplating');require('./ObjectTemplating');require('./View');require('./ContextMenu');require('./DragDrop');},{"./ContextMenu":2,"./DragDrop":3,"./FunctionTemplating":4,"./ObjectTemplating":5,"./Router":6,"./View":7}],9:[function(require,module,exports){(function(global){ /**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */;(function(){ /**
 * Block-Level Grammar
 */var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,'gm')(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)('hr','\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')('def','\\n+(?='+block.def.source+')')();block.blockquote=replace(block.blockquote)('def',block.def)();block._tag='(?!(?:'+'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'+'|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'+'|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';block.html=replace(block.html)('comment',/<!--[\s\S]*?-->/)('closed',/<(tag)[\s\S]+?<\/\1>/)('closing',/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)('hr',block.hr)('heading',block.heading)('lheading',block.lheading)('blockquote',block.blockquote)('tag','<'+block._tag)('def',block.def)(); /**
 * Normal Block Grammar
 */block.normal=merge({},block); /**
 * GFM Block Grammar
 */block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)('(?!','(?!'+block.gfm.fences.source.replace('\\1','\\2')+'|'+block.list.source.replace('\\1','\\3')+'|')(); /**
 * GFM + Tables Block Grammar
 */block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}); /**
 * Block Lexer
 */function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables;}else {this.rules=block.gfm;}}} /**
 * Expose Block Rules
 */Lexer.rules=block; /**
 * Static Lex Method
 */Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src);}; /**
 * Preprocessing
 */Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,'\n').replace(/\t/g,'    ').replace(/\u00a0/g,' ').replace(/\u2424/g,'\n');return this.token(src,true);}; /**
 * Lexing
 */Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,''),next,loose,cap,bull,b,item,space,i,l;while(src){ // newline
if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:'space'});}} // code
if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,'');this.tokens.push({type:'code',text:!this.options.pedantic?cap.replace(/\n+$/,''):cap});continue;} // fences (gfm)
if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:'code',lang:cap[2],text:cap[3]||''});continue;} // heading
if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:'heading',depth:cap[1].length,text:cap[2]});continue;} // table no leading pipe (gfm)
if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:'table',header:cap[1].replace(/^ *| *\| *$/g,'').split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,'').split(/ *\| */),cells:cap[3].replace(/\n$/,'').split('\n')};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]='right';}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]='center';}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]='left';}else {item.align[i]=null;}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */);}this.tokens.push(item);continue;} // lheading
if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:'heading',depth:cap[2]==='='?1:2,text:cap[1]});continue;} // hr
if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:'hr'});continue;} // blockquote
if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:'blockquote_start'});cap=cap[0].replace(/^ *> ?/gm,''); // Pass `top` to keep the current
// "toplevel" state. This is exactly
// how markdown.pl works.
this.token(cap,top,true);this.tokens.push({type:'blockquote_end'});continue;} // list
if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:'list_start',ordered:bull.length>1}); // Get each top-level item.
cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i]; // Remove the list item's bullet
// so it is seen as the next token.
space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,''); // Outdent whatever the
// list item contains. Hacky.
if(~item.indexOf('\n ')){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp('^ {1,'+space+'}','gm'),''):item.replace(/^ {1,4}/gm,'');} // Determine whether the next list item belongs here.
// Backpedal if it does not belong in this list.
if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join('\n')+src;i=l-1;}} // Determine whether item is loose or not.
// Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
// for discount behavior.
loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==='\n';if(!loose)loose=next;}this.tokens.push({type:loose?'loose_item_start':'list_item_start'}); // Recurse.
this.token(item,false,bq);this.tokens.push({type:'list_item_end'});}this.tokens.push({type:'list_end'});continue;} // html
if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?'paragraph':'html',pre:!this.options.sanitizer&&(cap[1]==='pre'||cap[1]==='script'||cap[1]==='style'),text:cap[0]});continue;} // def
if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue;} // table (gfm)
if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:'table',header:cap[1].replace(/^ *| *\| *$/g,'').split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,'').split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,'').split('\n')};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]='right';}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]='center';}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]='left';}else {item.align[i]=null;}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,'').split(/ *\| */);}this.tokens.push(item);continue;} // top-level paragraph
if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:'paragraph',text:cap[1].charAt(cap[1].length-1)==='\n'?cap[1].slice(0,-1):cap[1]});continue;} // text
if(cap=this.rules.text.exec(src)){ // Top-level should never reach here.
src=src.substring(cap[0].length);this.tokens.push({type:'text',text:cap[0]});continue;}if(src){throw new Error('Infinite loop on byte: '+src.charCodeAt(0));}}return this.tokens;}; /**
 * Inline-Level Grammar
 */var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)('inside',inline._inside)('href',inline._href)();inline.reflink=replace(inline.reflink)('inside',inline._inside)(); /**
 * Normal Inline Grammar
 */inline.normal=merge({},inline); /**
 * Pedantic Inline Grammar
 */inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}); /**
 * GFM Inline Grammar
 */inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)('])','~|])')(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)(']|','~]|')('|','|https?://|')()}); /**
 * GFM + Line Breaks Inline Grammar
 */inline.breaks=merge({},inline.gfm,{br:replace(inline.br)('{2,}','*')(),text:replace(inline.gfm.text)('{2,}','*')()}); /**
 * Inline Lexer & Compiler
 */function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer();this.renderer.options=this.options;if(!this.links){throw new Error('Tokens array requires a `links` property.');}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks;}else {this.rules=inline.gfm;}}else if(this.options.pedantic){this.rules=inline.pedantic;}} /**
 * Expose Inline Rules
 */InlineLexer.rules=inline; /**
 * Static Lexing/Compiling Method
 */InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src);}; /**
 * Lexing/Compiling
 */InlineLexer.prototype.output=function(src){var out='',link,text,href,cap;while(src){ // escape
if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue;} // autolink
if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==='@'){text=cap[1].charAt(6)===':'?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle('mailto:')+text;}else {text=escape(cap[1]);href=text;}out+=this.renderer.link(href,null,text);continue;} // url (gfm)
if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue;} // tag
if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true;}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false;}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue;} // link
if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue;} // reflink, nolink
if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g,' ');link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue;}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue;} // strong
if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue;} // em
if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue;} // code
if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue;} // br
if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue;} // del (gfm)
if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue;} // text
if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue;}if(src){throw new Error('Infinite loop on byte: '+src.charCodeAt(0));}}return out;}; /**
 * Compile Link
 */InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=='!'?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]));}; /**
 * Smartypants Transformations
 */InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text // em-dashes
.replace(/---/g,"—") // en-dashes
.replace(/--/g,"–") // opening singles
.replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘") // closing singles & apostrophes
.replace(/'/g,"’") // opening doubles
.replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“") // closing doubles
.replace(/"/g,"”") // ellipses
.replace(/\.{3}/g,"…");}; /**
 * Mangle Links
 */InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out='',l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>0.5){ch='x'+ch.toString(16);}out+='&#'+ch+';';}return out;}; /**
 * Renderer
 */function Renderer(options){this.options=options||{};}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out;}}if(!lang){return '<pre><code>'+(escaped?code:escape(code,true))+'\n</code></pre>';}return '<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+'\n</code></pre>\n';};Renderer.prototype.blockquote=function(quote){return '<blockquote>\n'+quote+'</blockquote>\n';};Renderer.prototype.html=function(html){return html;};Renderer.prototype.heading=function(text,level,raw){return '<h'+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,'-')+'">'+text+'</h'+level+'>\n';};Renderer.prototype.hr=function(){return this.options.xhtml?'<hr/>\n':'<hr>\n';};Renderer.prototype.list=function(body,ordered){var type=ordered?'ol':'ul';return '<'+type+'>\n'+body+'</'+type+'>\n';};Renderer.prototype.listitem=function(text){return '<li>'+text+'</li>\n';};Renderer.prototype.paragraph=function(text){return '<p>'+text+'</p>\n';};Renderer.prototype.table=function(header,body){return '<table>\n'+'<thead>\n'+header+'</thead>\n'+'<tbody>\n'+body+'</tbody>\n'+'</table>\n';};Renderer.prototype.tablerow=function(content){return '<tr>\n'+content+'</tr>\n';};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?'th':'td';var tag=flags.align?'<'+type+' style="text-align:'+flags.align+'">':'<'+type+'>';return tag+content+'</'+type+'>\n';}; // span level renderer
Renderer.prototype.strong=function(text){return '<strong>'+text+'</strong>';};Renderer.prototype.em=function(text){return '<em>'+text+'</em>';};Renderer.prototype.codespan=function(text){return '<code>'+text+'</code>';};Renderer.prototype.br=function(){return this.options.xhtml?'<br/>':'<br>';};Renderer.prototype.del=function(text){return '<del>'+text+'</del>';};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,'').toLowerCase();}catch(e){return '';}if(prot.indexOf('javascript:')===0||prot.indexOf('vbscript:')===0){return '';}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"';}out+='>'+text+'</a>';return out;};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"';}out+=this.options.xhtml?'/>':'>';return out;};Renderer.prototype.text=function(text){return text;}; /**
 * Parsing & Compiling
 */function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer();this.renderer=this.options.renderer;this.renderer.options=this.options;} /**
 * Static Parse Method
 */Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src);}; /**
 * Parse Loop
 */Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out='';while(this.next()){out+=this.tok();}return out;}; /**
 * Next Token
 */Parser.prototype.next=function(){return this.token=this.tokens.pop();}; /**
 * Preview Next Token
 */Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0;}; /**
 * Parse Text Tokens
 */Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==='text'){body+='\n'+this.next().text;}return this.inline.output(body);}; /**
 * Parse Current Token
 */Parser.prototype.tok=function(){switch(this.token.type){case 'space':{return '';}case 'hr':{return this.renderer.hr();}case 'heading':{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);}case 'code':{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);}case 'table':{var header='',body='',i,row,cell,flags,j; // header
cell='';for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]});}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell='';for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]});}body+=this.renderer.tablerow(cell);}return this.renderer.table(header,body);}case 'blockquote_start':{var body='';while(this.next().type!=='blockquote_end'){body+=this.tok();}return this.renderer.blockquote(body);}case 'list_start':{var body='',ordered=this.token.ordered;while(this.next().type!=='list_end'){body+=this.tok();}return this.renderer.list(body,ordered);}case 'list_item_start':{var body='';while(this.next().type!=='list_item_end'){body+=this.token.type==='text'?this.parseText():this.tok();}return this.renderer.listitem(body);}case 'loose_item_start':{var body='';while(this.next().type!=='list_item_end'){body+=this.tok();}return this.renderer.listitem(body);}case 'html':{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html);}case 'paragraph':{return this.renderer.paragraph(this.inline.output(this.token.text));}case 'text':{return this.renderer.paragraph(this.parseText());}}}; /**
 * Helpers
 */function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function unescape(html){return html.replace(/&([#\w]+);/g,function(_,n){n=n.toLowerCase();if(n==='colon')return ':';if(n.charAt(0)==='#'){return n.charAt(1)==='x'?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1));}return '';});}function replace(regex,opt){regex=regex.source;opt=opt||'';return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,'$1');regex=regex.replace(name,val);return self;};}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key];}}}return obj;} /**
 * Marked
 */function marked(src,opt,callback){if(callback||typeof opt==='function'){if(!callback){callback=opt;opt=null;}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt);}catch(e){return callback(e);}pending=tokens.length;var done=function done(err){if(err){opt.highlight=highlight;return callback(err);}var out;try{out=Parser.parse(tokens,opt);}catch(e){err=e;}opt.highlight=highlight;return err?callback(err):callback(null,out);};if(!highlight||highlight.length<3){return done();}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=='code'){return --pending||done();}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return --pending||done();}token.text=code;token.escaped=true;--pending||done();});})(tokens[i]);}return;}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt);}catch(e){e.message+='\nPlease report this to https://github.com/chjj/marked.';if((opt||marked.defaults).silent){return '<p>An error occured:</p><pre>'+escape(e.message+'',true)+'</pre>';}throw e;}} /**
 * Options
 */marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked;};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:'lang-',smartypants:false,headerPrefix:'',renderer:new Renderer(),xhtml:false}; /**
 * Expose
 */marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=='undefined'&&(typeof exports==="undefined"?"undefined":_typeof(exports))==='object'){module.exports=marked;}else if(typeof define==='function'&&define.amd){define(function(){return marked;});}else {this.marked=marked;}}).call(function(){return this||(typeof window!=='undefined'?window:global);}());}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});},{}],10:[function(require,module,exports){var isarray=require('isarray'); /**
 * Expose `pathToRegexp`.
 */module.exports=pathToRegexp;module.exports.parse=parse;module.exports.compile=compile;module.exports.tokensToFunction=tokensToFunction;module.exports.tokensToRegExp=tokensToRegExp; /**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */var PATH_REGEXP=new RegExp([ // Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'].join('|'),'g'); /**
 * Parse a string for the raw tokens.
 *
 * @param  {string} str
 * @return {!Array}
 */function parse(str){var tokens=[];var key=0;var index=0;var path='';var res;while((res=PATH_REGEXP.exec(str))!=null){var m=res[0];var escaped=res[1];var offset=res.index;path+=str.slice(index,offset);index=offset+m.length; // Ignore already escaped sequences.
if(escaped){path+=escaped[1];continue;}var next=str[index];var prefix=res[2];var name=res[3];var capture=res[4];var group=res[5];var modifier=res[6];var asterisk=res[7]; // Push the current path onto the tokens.
if(path){tokens.push(path);path='';}var partial=prefix!=null&&next!=null&&next!==prefix;var repeat=modifier==='+'||modifier==='*';var optional=modifier==='?'||modifier==='*';var delimiter=res[2]||'/';var pattern=capture||group||(asterisk?'.*':'[^'+delimiter+']+?');tokens.push({name:name||key++,prefix:prefix||'',delimiter:delimiter,optional:optional,repeat:repeat,partial:partial,asterisk:!!asterisk,pattern:escapeGroup(pattern)});} // Match any characters still remaining.
if(index<str.length){path+=str.substr(index);} // If the path exists, push it onto the end.
if(path){tokens.push(path);}return tokens;} /**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @return {!function(Object=, Object=)}
 */function compile(str){return tokensToFunction(parse(str));} /**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */function encodeURIComponentPretty(str){return encodeURI(str).replace(/[\/?#]/g,function(c){return '%'+c.charCodeAt(0).toString(16).toUpperCase();});} /**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */function encodeAsterisk(str){return encodeURI(str).replace(/[?#]/g,function(c){return '%'+c.charCodeAt(0).toString(16).toUpperCase();});} /**
 * Expose a method for transforming tokens into the path function.
 */function tokensToFunction(tokens){ // Compile all the tokens into regexps.
var matches=new Array(tokens.length); // Compile all the patterns before compilation.
for(var i=0;i<tokens.length;i++){if(_typeof(tokens[i])==='object'){matches[i]=new RegExp('^(?:'+tokens[i].pattern+')$');}}return function(obj,opts){var path='';var data=obj||{};var options=opts||{};var encode=options.pretty?encodeURIComponentPretty:encodeURIComponent;for(var i=0;i<tokens.length;i++){var token=tokens[i];if(typeof token==='string'){path+=token;continue;}var value=data[token.name];var segment;if(value==null){if(token.optional){ // Prepend partial segment prefixes.
if(token.partial){path+=token.prefix;}continue;}else {throw new TypeError('Expected "'+token.name+'" to be defined');}}if(isarray(value)){if(!token.repeat){throw new TypeError('Expected "'+token.name+'" to not repeat, but received `'+JSON.stringify(value)+'`');}if(value.length===0){if(token.optional){continue;}else {throw new TypeError('Expected "'+token.name+'" to not be empty');}}for(var j=0;j<value.length;j++){segment=encode(value[j]);if(!matches[i].test(segment)){throw new TypeError('Expected all "'+token.name+'" to match "'+token.pattern+'", but received `'+JSON.stringify(segment)+'`');}path+=(j===0?token.prefix:token.delimiter)+segment;}continue;}segment=token.asterisk?encodeAsterisk(value):encode(value);if(!matches[i].test(segment)){throw new TypeError('Expected "'+token.name+'" to match "'+token.pattern+'", but received "'+segment+'"');}path+=token.prefix+segment;}return path;};} /**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */function escapeString(str){return str.replace(/([.+*?=^!:${}()[\]|\/])/g,'\\$1');} /**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */function escapeGroup(group){return group.replace(/([=!:$\/()])/g,'\\$1');} /**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */function attachKeys(re,keys){re.keys=keys;return re;} /**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */function flags(options){return options.sensitive?'':'i';} /**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */function regexpToRegexp(path,keys){ // Use a negative lookahead to match only capturing groups.
var groups=path.source.match(/\((?!\?)/g);if(groups){for(var i=0;i<groups.length;i++){keys.push({name:i,prefix:null,delimiter:null,optional:false,repeat:false,partial:false,asterisk:false,pattern:null});}}return attachKeys(path,keys);} /**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */function arrayToRegexp(path,keys,options){var parts=[];for(var i=0;i<path.length;i++){parts.push(pathToRegexp(path[i],keys,options).source);}var regexp=new RegExp('(?:'+parts.join('|')+')',flags(options));return attachKeys(regexp,keys);} /**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */function stringToRegexp(path,keys,options){var tokens=parse(path);var re=tokensToRegExp(tokens,options); // Attach keys back to the regexp.
for(var i=0;i<tokens.length;i++){if(typeof tokens[i]!=='string'){keys.push(tokens[i]);}}return attachKeys(re,keys);} /**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Object=} options
 * @return {!RegExp}
 */function tokensToRegExp(tokens,options){options=options||{};var strict=options.strict;var end=options.end!==false;var route='';var lastToken=tokens[tokens.length-1];var endsWithSlash=typeof lastToken==='string'&&/\/$/.test(lastToken); // Iterate over the tokens and create our regexp string.
for(var i=0;i<tokens.length;i++){var token=tokens[i];if(typeof token==='string'){route+=escapeString(token);}else {var prefix=escapeString(token.prefix);var capture='(?:'+token.pattern+')';if(token.repeat){capture+='(?:'+prefix+capture+')*';}if(token.optional){if(!token.partial){capture='(?:'+prefix+'('+capture+'))?';}else {capture=prefix+'('+capture+')?';}}else {capture=prefix+'('+capture+')';}route+=capture;}} // In non-strict mode we allow a slash at the end of match. If the path to
// match already ends with a slash, we remove it for consistency. The slash
// is valid at the end of a path match, not in the middle. This is important
// in non-ending mode, where "/test/" shouldn't match "/test//route".
if(!strict){route=(endsWithSlash?route.slice(0,-2):route)+'(?:\\/(?=$))?';}if(end){route+='$';}else { // In non-ending mode, we need the capturing groups to match as much as
// possible by using a positive lookahead to the end or next path segment.
route+=strict&&endsWithSlash?'':'(?=\\/|$)';}return new RegExp('^'+route,flags(options));} /**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */function pathToRegexp(path,keys,options){keys=keys||[];if(!isarray(keys)){options= /** @type {!Object} */keys;keys=[];}else if(!options){options={};}if(path instanceof RegExp){return regexpToRegexp(path, /** @type {!Array} */keys);}if(isarray(path)){return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys,options);}return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys,options);}},{"isarray":11}],11:[function(require,module,exports){module.exports=Array.isArray||function(arr){return Object.prototype.toString.call(arr)=='[object Array]';};},{}],12:[function(require,module,exports){ // shim for using process in browser
var process=module.exports={};var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return;}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue);}else {queueIndex=-1;}if(queue.length){drainQueue();}}function drainQueue(){if(draining){return;}var timeout=setTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run();}}queueIndex=-1;len=queue.length;}currentQueue=null;draining=false;clearTimeout(timeout);}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i];}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){setTimeout(drainQueue,0);}}; // v8 likes predictible objects
function Item(fun,array){this.fun=fun;this.array=array;}Item.prototype.run=function(){this.fun.apply(null,this.array);};process.title='browser';process.browser=true;process.env={};process.argv=[];process.version=''; // empty string to avoid regexp issues
process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error('process.binding is not supported');};process.cwd=function(){return '/';};process.chdir=function(dir){throw new Error('process.chdir is not supported');};process.umask=function(){return 0;};},{}],13:[function(require,module,exports){module.exports={"name":"samoosa","version":"0.2.0","description":"","main":"index.html","scripts":{"test":"echo \"Error: no test specified\" && exit 1"},"author":"Putaitu Productions","license":"ISC","dependencies":{"babel-preset-es2015":"^6.3.13","bluebird":"^3.3.3","bootstrap":"^3.3.6","bootstrap-datepicker":"^1.6.0","browserify":"^13.0.0","event-stream":"^3.3.2","exomon":"^1.1.0","gulp":"^3.9.0","gulp-babel":"^6.1.1","gulp-browserify":"^0.5.1","gulp-concat":"^2.6.0","gulp-plumber":"^1.0.1","gulp-sass":"^2.1.0","gulp-sourcemaps":"^1.6.0","jquery":"^2.2.1","marked":"^0.3.5","path-to-regexp":"^1.2.1","sass-material-colors":"0.0.5","vinyl-buffer":"^1.0.0","vinyl-source-stream":"^1.1.0"}};},{}],14:[function(require,module,exports){'use strict';var ApiHelper=require('../../../src/client/js/helpers/ApiHelper');var labelCache=void 0;var GitHubApi=function(_ApiHelper){_inherits(GitHubApi,_ApiHelper);function GitHubApi(){_classCallCheck(this,GitHubApi);return _possibleConstructorReturn(this,Object.getPrototypeOf(GitHubApi).apply(this,arguments));}_createClass(GitHubApi,[{key:"get", // ----------
// Generic API methods
// ----------
/**
     * GET method
     *
     * @param {String} url
     * @param {String} param
     * @param {Boolean} recursePages
     *
     * @returns {Promise} promise
     */value:function get(url,param,recursePages){var self=this;return new Promise(function(resolve,reject){var issues=[];function getPage(page){$.ajax({url:'https://api.github.com'+url+self.getApiTokenString(true)+'per_page=100&page='+page+(param?'&'+param:''),type:'GET',cache:false,success:function success(result){issues=issues.concat(result);if(recursePages&&result.length>0){getPage(page+1);}else {resolve(issues);}},error:function error(e){self.error(e);reject(new Error(e.responseJSON.message));}});}getPage(1);});} /**
     * DELETE method
     *
     * @param {String} url
     * @param {String} param
     *
     * @returns {Promise} promise
     */},{key:"delete",value:function _delete(url,param){var _this5=this;return new Promise(function(reseolve,reject){$.ajax({url:'https://api.github.com'+url+'?'+(param?param+'&':'')+_this5.getApiTokenString(),type:'DELETE',cache:false,success:function success(result){resolve(result);},error:function error(e){_this5.error(e);reject(e);}});});} /**
     * PATCH method
     *
     * @param {String} url
     * @param {Object} data
     *
     * @returns {Promise} promise
     */},{key:"patch",value:function patch(url,data){var _this6=this;if((typeof data==="undefined"?"undefined":_typeof(data))==='object'){data=JSON.stringify(data);}return new Promise(function(resolve,reject){$.ajax({url:'https://api.github.com'+url+_this6.getApiTokenString(),type:'PATCH',data:data,cache:false,success:function success(result){resolve(result);},error:function error(e){_this6.error(e);reject(e);}});});} /**
     * POST method
     *
     * @param {String} url
     * @param {Object} data
     *
     * @returns {Promise} promise
     */},{key:"post",value:function post(url,data){var _this7=this;if((typeof data==="undefined"?"undefined":_typeof(data))==='object'){data=JSON.stringify(data);}return new Promise(function(resolve,reject){$.ajax({url:'https://api.github.com'+url+_this7.getApiTokenString(),type:'POST',data:data,cache:false,success:function success(result){resolve(result);},error:function error(e){_this7.error(e);reject(e);}});});} /**
     * PUT method
     *
     * @param {String} url
     *
     * @returns {Promise} promise
     */},{key:"put",value:function put(url){var _this8=this;return new Promise(function(resolve,reject){$.ajax({url:'https://api.github.com'+url+_this8.getApiTokenString(),type:'PUT',cache:false,success:function success(result){resolve(result);},error:function error(e){_this8.error(e);reject(e);}});});} /**
     * Error message
     *
     * @param {Object} error
     */},{key:"error",value:function error(_error){if(_error){switch(_error.status){ //case 401: case 403:
//    this.resetApiToken();
//    break;
default:if(_error.responseJSON){alert(_error.responseJSON.message);}else {alert(_error.statusText);}break;}}} // ----------
// Session methods
// ----------
/**
     * Gets the API token string
     *
     * @param {Boolean} includeSuffix
     *
     * @returns {String} string
     */},{key:"getApiTokenString",value:function getApiTokenString(includeSuffix){var token=this.getApiToken();if(!token){if(includeSuffix){return '?';}}else {if(includeSuffix){token+='&';}return '?access_token='+token;}} /**
     * Gets the currently logged in user object
     *
     * @returns {Promise} promise
     */},{key:"getUser",value:function getUser(){var _this9=this;return new Promise(function(resolve,reject){_this9.get('/user').then(function(gitHubUser){if(Array.isArray(gitHubUser)){gitHubUser=gitHubUser[0];}var user={name:gitHubUser.login,avatar:gitHubUser.avatar_url};resolve(user);}).catch(function(e){if(_this9.isSpectating()){resolve({name:'',avatar:''});}else {reject(e);}});});} // ----------
// Resource getters
// ----------
/**
     * Gets projects
     *
     * @returns {Promise} promise
     */},{key:"getProjects",value:function getProjects(){var _this10=this;return new Promise(function(resolve,reject){_this10.get('/users/'+_this10.getUserName()+'/repos').then(function(repos){_this10.processProjects(repos);resolve();}).catch(reject);});} /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */},{key:"getCollaborators",value:function getCollaborators(){var _this11=this;return new Promise(function(resolve,reject){_this11.get('/repos/'+_this11.getUserName()+'/'+_this11.getProjectName()+'/collaborators').then(function(collaborators){_this11.processCollaborators(collaborators);resolve();}).catch(function(e){if(_this11.isSpectating()){resolve([]);}else {reject(e);}});});} /**
     * Gets issues
     *
     * @returns {Promise} promise
     */},{key:"getIssues",value:function getIssues(){var _this12=this;return new Promise(function(callback){_this12.get('/repos/'+_this12.getUserName()+'/'+_this12.getProjectName()+'/issues','state=all',true).then(function(issues){_this12.processIssues(issues);callback();});});} /**
     * Gets labels and caches them
     *
     * @returns {Promise} promise
     */},{key:"getLabels",value:function getLabels(){var _this13=this;return new Promise(function(callback){if(!labelCache){_this13.get('/repos/'+_this13.getUserName()+'/'+_this13.getProjectName()+'/labels').then(function(labels){labelCache=labels;callback(labelCache);});}else {callback(labelCache);}});} /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */},{key:"getIssueTypes",value:function getIssueTypes(){var _this14=this;return new Promise(function(callback){_this14.getLabels().then(function(labels){_this14.processIssueTypes(labels);callback();});});} /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */},{key:"getIssueColumns",value:function getIssueColumns(){var _this15=this;return new Promise(function(callback){_this15.getLabels().then(function(labels){_this15.processIssueColumns(labels);callback();});});} /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */},{key:"getIssuePriorities",value:function getIssuePriorities(){var _this16=this;return new Promise(function(callback){_this16.getLabels().then(function(labels){_this16.processIssuePriorities(labels);callback();});});} /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */},{key:"getIssueEstimates",value:function getIssueEstimates(){var _this17=this;return new Promise(function(callback){_this17.getLabels().then(function(labels){_this17.processIssueEstimates(labels);callback();});});} /**
     * Gets versions
     *
     * @returns {Promise} promise
     */},{key:"getVersions",value:function getVersions(){var _this18=this;return new Promise(function(callback){_this18.getLabels().then(function(labels){_this18.processVersions(labels);callback();});});} /**
     * Gets milestones
     *
     * @returns {Promise} promise
     */},{key:"getMilestones",value:function getMilestones(){var _this19=this;return new Promise(function(callback){_this19.get('/repos/'+_this19.getUserName()+'/'+_this19.getProjectName()+'/milestones').then(function(milestones){_this19.processMilestones(milestones);callback();});});} // ----------
// Resource adders
// ----------
/**
     * Adds a new issue
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */},{key:"addIssue",value:function addIssue(issue){var _this20=this;return new Promise(function(callback){_this20.post('/repos/'+_this20.getUserName()+'/'+_this20.getProjectName()+'/issues',_this20.convertIssue(issue)).then(function(){callback(issue);});});} /**
     * Adds collaborator
     *
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */},{key:"addCollaborator",value:function addCollaborator(collaborator){var _this21=this;return new Promise(function(callback){_this21.put('/repos/'+_this21.getUserName()+'/'+_this21.getProjectName()+'/collaborators/'+collaborator).then(function(){callback();});});} /**
     * Adds issue type
     *
     * @param {String} type
     *
     * @returns {Promise} promise
     */},{key:"addIssueType",value:function addIssueType(type){var _this22=this;return new Promise(function(callback){_this22.post('/repos/'+_this22.getUserName()+'/'+_this22.getProjectName()+'/labels',{name:'type:'+type,color:'ffffff'}).then(function(){callback();});});} /**
     * Adds issue priority
     *
     * @param {String} priority
     *
     * @returns {Promise} promise
     */},{key:"addIssuePriority",value:function addIssuePriority(priority){var _this23=this;return new Promise(function(callback){_this23.post('/repos/'+_this23.getUserName()+'/'+_this23.getProjectName()+'/labels',{name:'priority:'+priority,color:'ffffff'}).then(function(){callback();});});} /**
     * Adds issue estimate
     *
     * @param {String} estimate
     *
     * @returns {Promise} promise
     */},{key:"addIssueEstimate",value:function addIssueEstimate(estimate){var _this24=this;return new Promise(function(callback){_this24.post('/repos/'+_this24.getUserName()+'/'+_this24.getProjectName()+'/labels',{name:'estimate:'+estimate,color:'ffffff'}).then(function(){callback();});});} /**
     * Adds issue column
     *
     * @param {String} column
     *
     * @returns {Promise} promise
     */},{key:"addIssueColumn",value:function addIssueColumn(column){var _this25=this;return new Promise(function(callback){_this25.post('/repos/'+_this25.getUserName()+'/'+_this25.getProjectName()+'/labels',{name:'column:'+column,color:'ffffff'}).then(function(){callback();});});} /**
     * Adds milestone 
     *
     * @param {Object} milestone
     *
     * @returns {Promise} promise
     */},{key:"addMilestone",value:function addMilestone(milestone){var _this26=this;return new Promise(function(callback){_this26.post('/repos/'+_this26.getUserName()+'/'+_this26.getProjectName()+'/milestones',_this26.convertMilestone(milestone)).then(function(){callback();});});} /**
     * Adds version
     *
     * @param {String} version
     *
     * @returns {Promise} promise
     */},{key:"addVersion",value:function addVersion(version){var _this27=this;return new Promise(function(callback){_this27.post('/repos/'+_this27.getUserName()+'/'+_this27.getProjectName()+'/labels',{name:'version:'+version,color:'ffffff'}).then(function(){callback();});});} // ----------
// Resource removers
// ----------
/**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeCollaborator",value:function removeCollaborator(index){var _this28=this;return new Promise(function(callback){_this28.delete('/repos/'+_this28.getUserName()+'/'+_this28.getProjectName()+'/collaborators/'+window.resources.collaborators[index]).then(function(){callback();});});} /**
     * Removes issue type
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssueType",value:function removeIssueType(index){var _this29=this;return new Promise(function(callback){_this29.delete('/repos/'+_this29.getUserName()+'/'+_this29.getProjectName()+'/labels/type:'+window.resources.issueTypes[index]).then(function(){callback();});});} /**
     * Removes issue priority
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssuePriority",value:function removeIssuePriority(index){var _this30=this;return new Promise(function(callback){_this30.delete('/repos/'+_this30.getUserName()+'/'+_this30.getProjectName()+'/labels/priority:'+window.resources.issuePriorities[index]).then(function(){callback();});});} /**
     * Removes issue estimate
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssueEstimate",value:function removeIssueEstimate(index){var _this31=this;return new Promise(function(callback){_this31.delete('/repos/'+_this31.getUserName()+'/'+_this31.getProjectName()+'/labels/estimate:'+window.resources.issueEstimates[index]).then(function(){callback();});});} /**
     * Removes issue column
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssueColumn",value:function removeIssueColumn(index){var _this32=this;return new Promise(function(callback){_this32.delete('/repos/'+_this32.getUserName()+'/'+_this32.getProjectName()+'/labels/column:'+window.resources.issueColumns[index]).then(function(){callback();});});} /**
     * Removes milestone 
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeMilestone",value:function removeMilestone(index){var _this33=this;return new Promise(function(callback){_this33.delete('/repos/'+_this33.getUserName()+'/'+_this33.getProjectName()+'/milestones/'+(parseInt(index)+1)).then(function(){callback();});});} /**
     * Removes version
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeVersion",value:function removeVersion(index){var _this34=this;return new Promise(function(callback){_this34.delete('/repos/'+_this34.getUserName()+'/'+_this34.getProjectName()+'/labels/version:'+window.resources.versions[index]).then(function(){callback();});});} // ----------
// Resource updaters
// ----------
/**
     * Update issue
     *
     * @param {Object} issue
     */},{key:"updateIssue",value:function updateIssue(issue){var _this35=this;return new Promise(function(callback){_this35.patch('/repos/'+_this35.getUserName()+'/'+_this35.getProjectName()+'/issues/'+(issue.index+1),_this35.convertIssue(issue)).then(function(){callback();});});} /**
     * Updates milestone 
     *
     * @param {Object} milestone
     *
     * @returns {Promise} promise
     */},{key:"updateMilestone",value:function updateMilestone(milestone){var _this36=this;return new Promise(function(callback){_this36.patch('/repos/'+_this36.getUserName()+'/'+_this36.getProjectName()+'/milestones/'+(parseInt(milestone.index)+1),_this36.convertMilestone(milestone)).then(function(){callback();});});} /**
     * Updates issue type
     *
     * @param {String} type
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */},{key:"updateIssueType",value:function updateIssueType(type,previousName){var _this37=this;return new Promise(function(callback){_this37.patch('/repos/'+_this37.getUserName()+'/'+_this37.getProjectName()+'/labels/type:'+previousName,{name:'type:'+type,color:'ffffff'}).then(function(){callback();});});} /**
     * Updates issue priority
     *
     * @param {String} priority
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */},{key:"updateIssuePriority",value:function updateIssuePriority(priority,previousName){var _this38=this;return new Promise(function(callback){_this38.patch('/repos/'+_this38.getUserName()+'/'+_this38.getProjectName()+'/labels/priority:'+previousName,{name:'priority:'+priority,color:'ffffff'}).then(function(){callback();});});} /**
     * Updates issue estimate
     *
     * @param {String} estimate
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */},{key:"updateIssueEstimate",value:function updateIssueEstimate(estimate,previousName){var _this39=this;return new Promise(function(callback){_this39.patch('/repos/'+_this39.getUserName()+'/'+_this39.getProjectName()+'/labels/estimate:'+previousName,{name:'estimate:'+estimate,color:'ffffff'}).then(function(){callback();});});} /**
     * Updates issue column
     *
     * @param {String} column
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */},{key:"updateIssueColumn",value:function updateIssueColumn(column,previousName){var _this40=this;return new Promise(function(callback){_this40.patch('/repos/'+_this40.getUserName()+'/'+_this40.getProjectName()+'/labels/column:'+previousName,{name:'column:'+column,color:'ffffff'}).then(function(){callback();});});} /**
     * Updates version
     *
     * @param {String} version
     * @param {String} previousName
     *
     * @returns {Promise} promise
     */},{key:"updateVersion",value:function updateVersion(version,previousName){var _this41=this;return new Promise(function(callback){_this41.patch('/repos/'+_this41.getUserName()+'/'+_this41.getProjectName()+'/labels/version:'+previousName,{name:'version:'+version,color:'ffffff'}).then(function(){callback();});});} // ----------
// Resource processing methods
// ----------
/**
     * Process projects
     *
     * @param {Array} projects
     */},{key:"processProjects",value:function processProjects(projects){window.resources.projects=[];for(var i in projects){var project={index:i,title:projects[i].name,description:projects[i].description,cloneUrl:projects[i].clone_url};window.resources.projects[i]=project;}} /**
     * Process milestones
     *
     * @param {Array} milestones
     */},{key:"processMilestones",value:function processMilestones(milestones){window.resources.milestones=[];for(var i in milestones){var index=parseInt(milestones[i].number)-1;var milestone={index:index,title:milestones[i].title,description:milestones[i].description,endDate:milestones[i].due_on};window.resources.milestones[index]=milestone;}} /**
     * Process versions
     *
     * @param {Array} labels
     */},{key:"processVersions",value:function processVersions(labels){window.resources.versions=[];var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=labels[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var label=_step5.value;var versionIndex=label.name.indexOf('version:');if(versionIndex>-1){var versionName=label.name.replace('version:','');window.resources.versions.push(versionName);}}}catch(err){_didIteratorError5=true;_iteratorError5=err;}finally {try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return();}}finally {if(_didIteratorError5){throw _iteratorError5;}}}} /**
     * Process issue priotities
     *
     * @param {Array} labels
     */},{key:"processIssuePriorities",value:function processIssuePriorities(labels){window.resources.issuePriorities=[];var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=labels[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var label=_step6.value;var index=label.name.indexOf('priority:');if(index>-1){var name=label.name.replace('priority:','');window.resources.issuePriorities.push(name);}}}catch(err){_didIteratorError6=true;_iteratorError6=err;}finally {try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return();}}finally {if(_didIteratorError6){throw _iteratorError6;}}}} /**
     * Process issue estimates
     *
     * @param {Array} labels
     */},{key:"processIssueEstimates",value:function processIssueEstimates(labels){window.resources.issueEstimates=[];var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=labels[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var label=_step7.value;var index=label.name.indexOf('estimate:');if(index>-1){var name=label.name.replace('estimate:','');window.resources.issueEstimates.push(name);}}}catch(err){_didIteratorError7=true;_iteratorError7=err;}finally {try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return();}}finally {if(_didIteratorError7){throw _iteratorError7;}}}window.resources.issueEstimates.sort(function(a,b){a=parseFloat(a);b=parseFloat(b);if(a<b){return -1;}if(a>b){return 1;}return 0;});} /**
     * Process issue columns
     *
     * @param {Array} labels
     */},{key:"processIssueColumns",value:function processIssueColumns(labels){window.resources.issueColumns=[];window.resources.issueColumns.push('to do');var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=labels[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var label=_step8.value;var index=label.name.indexOf('column:');if(index>-1){var name=label.name.replace('column:','');window.resources.issueColumns.push(name);}}}catch(err){_didIteratorError8=true;_iteratorError8=err;}finally {try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return();}}finally {if(_didIteratorError8){throw _iteratorError8;}}}window.resources.issueColumns.push('done');} /**
     * Process issue types
     *
     * @param {Array} labels
     */},{key:"processIssueTypes",value:function processIssueTypes(labels){window.resources.issueTypes=[];var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=labels[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var label=_step9.value;var index=label.name.indexOf('type:');if(index>-1){var name=label.name.replace('type:','');window.resources.issueTypes.push(name);}}}catch(err){_didIteratorError9=true;_iteratorError9=err;}finally {try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return();}}finally {if(_didIteratorError9){throw _iteratorError9;}}}} /**
     * Process collaborators
     *
     * @param {Array} collaborators
     */},{key:"processCollaborators",value:function processCollaborators(collaborators){window.resources.collaborators=[];var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=collaborators[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var collaborator=_step10.value;window.resources.collaborators.push({name:collaborator.login,avatar:collaborator.avatar_url});}}catch(err){_didIteratorError10=true;_iteratorError10=err;}finally {try{if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return();}}finally {if(_didIteratorError10){throw _iteratorError10;}}}} /**
     * Process issues
     *
     * @param {Array} issues
     */},{key:"processIssues",value:function processIssues(issues){window.resources.issues=[];var _iteratorNormalCompletion11=true;var _didIteratorError11=false;var _iteratorError11=undefined;try{for(var _iterator11=issues[Symbol.iterator](),_step11;!(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done);_iteratorNormalCompletion11=true){var gitHubIssue=_step11.value;var issue=new Issue();issue.title=gitHubIssue.title;issue.description=gitHubIssue.body;issue.reporter=ResourceHelper.getCollaborator(gitHubIssue.user.login);if(gitHubIssue.assignee){issue.assignee=ResourceHelper.getCollaborator(gitHubIssue.assignee.login);}var _iteratorNormalCompletion12=true;var _didIteratorError12=false;var _iteratorError12=undefined;try{for(var _iterator12=gitHubIssue.labels[Symbol.iterator](),_step12;!(_iteratorNormalCompletion12=(_step12=_iterator12.next()).done);_iteratorNormalCompletion12=true){var label=_step12.value;var typeIndex=label.name.indexOf('type:');var priorityIndex=label.name.indexOf('priority:');var estimateIndex=label.name.indexOf('estimate:');var versionIndex=label.name.indexOf('version:');var columnIndex=label.name.indexOf('column:');if(typeIndex>-1){var name=label.name.replace('type:','');issue.type=ResourceHelper.getIssueType(name);}else if(versionIndex>-1){var _name=label.name.replace('version:','');issue.version=ResourceHelper.getVersion(_name);}else if(estimateIndex>-1){var _name2=label.name.replace('estimate:','');issue.estimate=ResourceHelper.getIssueEstimate(_name2);}else if(priorityIndex>-1){var _name3=label.name.replace('priority:','');issue.priority=ResourceHelper.getIssuePriority(_name3);}else if(columnIndex>-1){var _name4=label.name.replace('column:','');issue.column=ResourceHelper.getIssueColumn(_name4);}else {issue.labels.push(label);}}}catch(err){_didIteratorError12=true;_iteratorError12=err;}finally {try{if(!_iteratorNormalCompletion12&&_iterator12.return){_iterator12.return();}}finally {if(_didIteratorError12){throw _iteratorError12;}}}if(gitHubIssue.state=='closed'){issue.column=resources.issueColumns.length-1;}if(gitHubIssue.milestone){issue.milestone=ResourceHelper.getMilestone(gitHubIssue.milestone.title);}issue.index=parseInt(gitHubIssue.number)-1;window.resources.issues[issue.index]=issue;}}catch(err){_didIteratorError11=true;_iteratorError11=err;}finally {try{if(!_iteratorNormalCompletion11&&_iterator11.return){_iterator11.return();}}finally {if(_didIteratorError11){throw _iteratorError11;}}}} /**
     * Convert milestone model to GitHub schema
     *
     * @param {Object} milestone
     */},{key:"convertMilestone",value:function convertMilestone(milestone){var gitHubMilestone={title:milestone.title,description:milestone.description,due_on:milestone.endDate,state:milestone.closed?'closed':'open'};return gitHubMilestone;} /**
     * Convert issue model to GitHub schema
     *
     * @param {Object} issue
     */},{key:"convertIssue",value:function convertIssue(issue){ // Directly mappable properties
var gitHubIssue={title:issue.title,body:issue.description,labels:[]}; // Assignee
var assignee=resources.collaborators[issue.assignee];if(assignee){gitHubIssue.assignee=assignee.name;}else {gitHubIssue.assignee='';} // State
var issueColumn=resources.issueColumns[issue.column];gitHubIssue.state=issueColumn=='done'?'closed':'open'; // Milestone
// GitHub counts numbers from 1, ' + this.getProjectName() + ' counts from 0
if(issue.milestone>=0){gitHubIssue.milestone=parseInt(issue.milestone)+1;}else {gitHubIssue.milestone=null;} // Type
var issueType=resources.issueTypes[issue.type];if(issueType){gitHubIssue.labels.push('type:'+issueType);} // Version
var version=resources.versions[issue.version];if(version){gitHubIssue.labels.push('version:'+version);} // Estimate
var issueEstimate=resources.issueEstimates[issue.estimate];if(issueEstimate){gitHubIssue.labels.push('estimate:'+issueEstimate);} // Priority
var issuePriority=resources.issuePriorities[issue.priority];if(issuePriority){gitHubIssue.labels.push('priority:'+issuePriority);} // Column
if(issueColumn&&issueColumn!='to do'&&issueColumn!='done'){gitHubIssue.labels.push('column:'+issueColumn);}return gitHubIssue;} /**
     * Add issue comment
     *
     * @param {Issue} issue
     * @param {String} text
     */},{key:"addIssueComment",value:function addIssueComment(issue,text){var _this42=this;return new Promise(function(callback){_this42.post('/repos/'+_this42.getUserName()+'/'+_this42.getProjectName()+'/issues/'+(issue.index+1)+'/comments',{body:text}).then(function(){callback();});});} /**
     * Update issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     */},{key:"updateIssueComment",value:function updateIssueComment(issue,comment){var _this43=this;return new Promise(function(callback){_this43.patch('/repos/'+_this43.getUserName()+'/'+_this43.getProjectName()+'/issues/comments/'+comment.index,{body:comment.text}).then(function(){callback();});});} /**
     * Get issue comments
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */},{key:"getIssueComments",value:function getIssueComments(issue){var _this44=this;return new Promise(function(callback){_this44.get('/repos/'+_this44.getUserName()+'/'+_this44.getProjectName()+'/issues/'+(issue.index+1)+'/comments').then(function(gitHubComments){var comments=[];var _iteratorNormalCompletion13=true;var _didIteratorError13=false;var _iteratorError13=undefined;try{for(var _iterator13=gitHubComments[Symbol.iterator](),_step13;!(_iteratorNormalCompletion13=(_step13=_iterator13.next()).done);_iteratorNormalCompletion13=true){var gitHubComment=_step13.value;var comment={collaborator:ResourceHelper.getCollaborator(gitHubComment.user.login),text:gitHubComment.body,index:gitHubComment.id};comments.push(comment);}}catch(err){_didIteratorError13=true;_iteratorError13=err;}finally {try{if(!_iteratorNormalCompletion13&&_iterator13.return){_iterator13.return();}}finally {if(_didIteratorError13){throw _iteratorError13;}}}callback(comments);});});}}]);return GitHubApi;}(ApiHelper);module.exports=GitHubApi;},{"../../../src/client/js/helpers/ApiHelper":17}],15:[function(require,module,exports){'use strict'; // Package
window.app=require('../../../package.json'); // Libs
require('exomon');window.Promise=require('bluebird');window.marked=require('marked');Promise.onPossiblyUnhandledRejection(function(error,promise){debug.warning(error,Promise);}); // Helpers
window.ResourceHelper=require('./helpers/ResourceHelper');window.SettingsHelper=require('./helpers/SettingsHelper');window.InputHelper=require('./helpers/InputHelper');window.IssueHelper=require('./helpers/IssueHelper');window.DebugHelper=require('./helpers/DebugHelper');window.debug=window.DebugHelper;window.debug.verbosity=1;var GitHubApi=require('../../../plugins/github/js/GitHubApi');window.ApiHelper=new GitHubApi(); // Models
window.Issue=require('./models/Issue'); // Views
window.Navbar=require('./views/Navbar');window.IssueEditor=require('./views/IssueEditor');window.MilestoneEditor=require('./views/MilestoneEditor');window.ResourceEditor=require('./views/ResourceEditor');window.PlanItemEditor=require('./views/PlanItemEditor');window.PlanEditor=require('./views/PlanEditor');window.ProjectEditor=require('./views/ProjectEditor');window.FilterEditor=require('./views/FilterEditor'); // Globals
require('./globals'); // Routes
require('./routes'); // Title
$('head title').html((Router.params.project?Router.params.project+' - ':'')+'Samoosa');},{"../../../package.json":13,"../../../plugins/github/js/GitHubApi":14,"./globals":16,"./helpers/DebugHelper":18,"./helpers/InputHelper":19,"./helpers/IssueHelper":20,"./helpers/ResourceHelper":21,"./helpers/SettingsHelper":22,"./models/Issue":23,"./routes":24,"./views/FilterEditor":33,"./views/IssueEditor":34,"./views/MilestoneEditor":35,"./views/Navbar":36,"./views/PlanEditor":37,"./views/PlanItemEditor":38,"./views/ProjectEditor":39,"./views/ResourceEditor":40,"bluebird":1,"exomon":8,"marked":9}],16:[function(require,module,exports){'use strict'; // Convert to HTML from markdown
window.markdownToHtml=function(string){if(string){try{var html=marked(string);html=html.replace(/\[ \]/g,'<input type="checkbox" disabled readonly>');html=html.replace(/\[x\]/g,'<input type="checkbox" checked="checked" disabled readonly>');return html;}catch(e){console.log(e);}}}; // Simple date string
Date.prototype.getSimpleString=function(){return this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();}; // Floor date extension
Date.prototype.floor=function(){this.setHours(0,0,0,0);return this;}; // Get ISO day
Date.prototype.getISODay=function(){var day=this.getDay()-1;if(day<0){day=6;}return day;}; // Date week number extension
Date.prototype.getWeek=function(){var date=new Date(this.getTime());date.floor();date.setDate(date.getDate()+3-(date.getDay()+6)%7);var week1=new Date(date.getFullYear(),0,4);return 1+Math.round(((date.getTime()-week1.getTime())/86400000-3+(week1.getDay()+6)%7)/7);}; // Date day name extension
Date.prototype.getDayName=function(){var weekday=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];return weekday[this.getDay()];}; // Date month name extension
Date.prototype.getMonthName=function(){var month=['January','February','March','April','May','June','July','August','September','October','November','December'];return month[this.getMonth()];}; // Pretty name
window.prettyName=function(name){var prettyName=name;for(var i in prettyName){if(i==0){prettyName=prettyName.substring(0,1).toUpperCase()+prettyName.substring(1);}else if(prettyName[i]==prettyName[i].toUpperCase()){prettyName=prettyName.substring(0,i)+' '+prettyName.substring(i);}}return prettyName;}; // Pretty date
window.prettyDate=function(date,separator){var prettyDate='';if(date){if(date.constructor===String){date=new Date(date);}date.floor();separator=separator||'.';prettyDate=date.getFullYear()+separator+(date.getMonth()+1)+separator+date.getDate();}return prettyDate;}; // Spinner
window.spinner=function(active){$('.spinner-backdrop').remove();if(active){$('body').append(_.div({class:'spinner-backdrop'},_.div({class:'spinner-container'},_.span({class:'spinner-icon fa fa-refresh'}))));}}; // Scroll on page
window.scroll=function(amount){var current=$(document).scrollTop();$(document).scrollTop(current+amount);}; // Sort array by date
window.sortByDate=function(array,key){return array.concat().sort(function(a,b){a=new Date(a[key]).floor();b=new Date(b[key]).floor();if(a<b){return -1;}if(a>b){return 1;}return 0;});};},{}],17:[function(require,module,exports){'use strict';var ApiHelper=function(){function ApiHelper(){_classCallCheck(this,ApiHelper);}_createClass(ApiHelper,[{key:"isSpectating", // ----------
// Checkers
// ----------
/**
     * Gets whether we're in spectator mode
     */value:function isSpectating(){return Router.query('spectate')=='true';} /**
     * Check whether the connection to the source has been made
     */},{key:"checkConnection",value:function checkConnection(){return new Promise(function(callback){callback();});} // ----------
// Session methods
// ----------
/**
     * Gets the API token and prompts for one if needed
     * 
     * @returns {String} token
     */},{key:"getApiToken",value:function getApiToken(){var queryToken=Router.query('token');if(queryToken){localStorage.setItem('token',queryToken);return queryToken;}else {if(!localStorage.getItem('token')){location='/login';debug.error('No API token found',this);}return localStorage.getItem('token');}} /**
     * Get user name
     */},{key:"getUserName",value:function getUserName(){var user=Router.params&&Router.params.user?Router.params.user:localStorage.getItem('user');;if(!user){location='/login';debug.error('No username found',this);}else {localStorage.setItem('user',user);return user;}} /**
     * Gets project name
     */},{key:"getProjectName",value:function getProjectName(){var project=null;if(Router.params&&Router.params.project){project=Router.params.project;}return project;} /**
     * Resets the API token and reloads
     */},{key:"resetApiToken",value:function resetApiToken(){localStorage.setItem('token','');this.getApiToken();} /**
     * Logs out the currently logged in user and reloads
     */},{key:"logOut",value:function logOut(){localStorage.setItem('token','');location.reload();} // ----------
// Resource getters
// ----------
/**
     * Gets issues
     *
     * @returns {Promise} promise
     */},{key:"getIssues",value:function getIssues(){return new Promise(function(callback){window.resources.issues=[];callback();});} /**
     * Gets collaborators
     *
     * @returns {Promise} promise
     */},{key:"getCollaborators",value:function getCollaborators(){return new Promise(function(callback){window.resources.collaborators=[];callback();});} /**
     * Gets issue types
     *
     * @returns {Promise} promise
     */},{key:"getIssueTypes",value:function getIssueTypes(){return new Promise(function(callback){window.resources.issueTypes=[];callback();});} /**
     * Gets issue priorities
     *
     * @returns {Promise} promise
     */},{key:"getIssuePriorities",value:function getIssuePriorities(){return new Promise(function(callback){window.resources.issuePriorities=[];callback();});} /**
     * Gets issue estimates
     *
     * @returns {Promise} promise
     */},{key:"getIssueEstimates",value:function getIssueEstimates(){return new Promise(function(callback){window.resources.issueEstimates=[];callback();});} /**
     * Gets issue columns
     *
     * @returns {Promise} promise
     */},{key:"getIssueColumns",value:function getIssueColumns(){return new Promise(function(callback){window.resources.issueColumns=[];callback();});} /**
     * Gets milestones 
     *
     * @returns {Promise} promise
     */},{key:"getMilestones",value:function getMilestones(){return new Promise(function(callback){window.resources.milestones=[];callback();});} /**
     * Gets versions 
     *
     * @returns {Promise} promise
     */},{key:"getVersions",value:function getVersions(){return new Promise(function(callback){window.resources.versions=[];callback();});} /**
     * Gets projects
     *
     * @returns {Promise} promise
     */},{key:"getProjects",value:function getProjects(){return new Promise(function(callback){callback();});} // ----------
// Resource adders
// ----------
/**
     * Adds issue
     *
     * @param {Object} issue
     *
     * @returns {Promise} promise
     */},{key:"addIssue",value:function addIssue(issue){return new Promise(function(callback){callback();});} /**
     * Adds collaborator
     *
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */},{key:"addCollaborator",value:function addCollaborator(collaborator){return new Promise(function(callback){callback();});} /**
     * Adds issue type
     *
     * @param {String} type
     *
     * @returns {Promise} promise
     */},{key:"addIssueType",value:function addIssueType(type){return new Promise(function(callback){callback();});} /**
     * Adds issue priority
     *
     * @param {String} priority
     *
     * @returns {Promise} promise
     */},{key:"addIssuePriority",value:function addIssuePriority(priority){return new Promise(function(callback){callback();});} /**
     * Adds issue estimate
     *
     * @param {String} estimate
     *
     * @returns {Promise} promise
     */},{key:"addIssueEstimate",value:function addIssueEstimate(estimate){return new Promise(function(callback){callback();});} /**
     * Adds issue column
     *
     * @param {String} column
     *
     * @returns {Promise} promise
     */},{key:"addIssueColumn",value:function addIssueColumn(column){return new Promise(function(callback){callback();});} /**
     * Adds milestone 
     *
     * @param {String} milestone
     *
     * @returns {Promise} promise
     */},{key:"addMilestone",value:function addMilestone(milestone){return new Promise(function(callback){callback();});} /**
     * Adds version
     *
     * @param {String} version
     *
     * @returns {Promise} promise
     */},{key:"addVersion",value:function addVersion(version){return new Promise(function(callback){callback();});} // ----------
// Resource removers
// ----------
/**
     * Removes issue
     * NOTE: This is usually disabled
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssue",value:function removeIssue(index){return new Promise(function(callback){callback();});} /**
     * Removes collaborator
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeCollaborator",value:function removeCollaborator(index){return new Promise(function(callback){callback();});} /**
     * Removes issue type
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssueType",value:function removeIssueType(index){return new Promise(function(callback){callback();});} /**
     * Removes issue priority
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssuePriority",value:function removeIssuePriority(index){return new Promise(function(callback){callback();});} /**
     * Removes issue estimate
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssueEstimate",value:function removeIssueEstimate(index){return new Promise(function(callback){callback();});} /**
     * Removes issue column
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeIssueColumn",value:function removeIssueColumn(index){return new Promise(function(callback){callback();});} /**
     * Removes milestone 
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeMilestone",value:function removeMilestone(index){return new Promise(function(callback){callback();});} /**
     * Removes version
     *
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeVersion",value:function removeVersion(index){return new Promise(function(callback){callback();});} // ----------
// Resource updaters
// ---------- 
/**
     * Updates issue
     *
     * @param {Object} issue
     *
     * @param {Number} index
     * @returns {Promise} promise
     */},{key:"updateIssue",value:function updateIssue(index,issue){return new Promise(function(callback){callback();});} /**
     * Updates collaborator
     *
     * @param {Number} index
     * @param {String} collaborator
     *
     * @returns {Promise} promise
     */},{key:"updateCollaborator",value:function updateCollaborator(index,collaborator){return new Promise(function(callback){callback();});} /**
     * Updates issue type
     *
     * @param {Number} index
     * @param {String} type
     *
     * @returns {Promise} promise
     */},{key:"updateIssueType",value:function updateIssueType(index,type){return new Promise(function(callback){callback();});} /**
     * Updates issue priority
     *
     * @param {Number} index
     * @param {String} priority
     *
     * @returns {Promise} promise
     */},{key:"updateIssuePriority",value:function updateIssuePriority(index,priority){return new Promise(function(callback){callback();});} /**
     * Updates issue estimate
     *
     * @param {Number} index
     * @param {String} estimate
     *
     * @returns {Promise} promise
     */},{key:"updateIssueEstimate",value:function updateIssueEstimate(index,estimate){return new Promise(function(callback){callback();});} /**
     * Updates issue column
     *
     * @param {Number} index
     * @param {String} column
     *
     * @returns {Promise} promise
     */},{key:"updateIssueColumn",value:function updateIssueColumn(index,column){return new Promise(function(callback){callback();});} /**
     * Updates milestone 
     *
     * @param {Number} index
     * @param {Object} milestone
     *
     * @returns {Promise} promise
     */},{key:"updateMilestone",value:function updateMilestone(index,milestone){return new Promise(function(callback){callback();});} /**
     * Updates version
     *
     * @param {Number} index
     * @param {String} version
     *
     * @returns {Promise} promise
     */},{key:"updateVersion",value:function updateVersion(index,version){return new Promise(function(callback){callback();});} /**
     * Updates project
     *
     * @param {Number} index
     * @param {Object} project
     *
     * @returns {Promise} promise
     */},{key:"updateProject",value:function updateProject(index,project){return new Promise(function(callback){callback();});} // ----------
// Session methods    
// ----------
/**
     * Gets the current user object
     *
     * @returns {Promise}
     */},{key:"getUser",value:function getUser(){return new Promise(function(callback){callback();});} // ----------
// Issue methods
// ---------- 
/** 
     * Gets issue comments
     *
     * @returns {Promise} promise
     */},{key:"getIssueComments",value:function getIssueComments(){return new Promise(function(callback){callback([]);});} /** 
     * Adds issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     *
     * @returns {Promise} promise
     */},{key:"addIssueComment",value:function addIssueComment(issue,comment){return new Promise(function(callback){callback([]);});} /** 
     * Updates issue comment
     *
     * @param {Issue} issue
     * @param {Object} comment
     *
     * @returns {Promise} promise
     */},{key:"updateIssueComment",value:function updateIssueComment(issue,comment){return new Promise(function(callback){callback([]);});} // ----------
// Generic methods
// ----------
/**
     * Removes a resource
     *
     * @param {String} resource
     * @param {Number} index
     *
     * @returns {Promise} promise
     */},{key:"removeResource",value:function removeResource(resource,index){switch(resource){case 'collaborators':return this.removeCollaborator(index);case 'issueTypes':return this.removeIssueType(index);case 'issuePriorities':return this.removeIssuePriority(index);case 'issueEstimates':return this.removeIssueEstimate(index);case 'issueColumns':return this.removeIssueColumn(index);case 'milestones':return this.removeMilestone(index);case 'versions':return this.removeVersion(index);case 'issues':return this.removeIssue(index);case 'projects':return this.removeProject(index);}} /**
     * Adds a resource
     *
     * @param {String} resource
     * @param {Object} item
     *
     * @returns {Promise} promise
     */},{key:"addResource",value:function addResource(resource,item){switch(resource){case 'collaborators':return this.addCollaborator(item);case 'issueTypes':return this.addIssueType(item);case 'issuePriorities':return this.addIssuePriority(item);case 'issueEstimates':return this.addIssueEstimate(item);case 'issueColumns':return this.addIssueColumn(item);case 'milestones':return this.addMilestone(item);case 'versions':return this.addVersion(item);case 'issues':return this.addIssue(item);case 'projects':return this.addProject(item);default:alert('Resource "'+resource+'" is unknown');}} /**
     * Updates a resource
     *
     * @param {String} resource
     * @param {Object} item
     * @param {String} identifier
     *
     * @returns {Promise} promise
     */},{key:"updateResource",value:function updateResource(resource,item,identifier){switch(resource){case 'issueTypes':return this.updateIssueType(item,identifier);case 'issuePriorities':return this.updateIssuePriority(item,identifier);case 'issueEstimates':return this.updateIssueEstimate(item,identifier);case 'issueColumns':return this.updateIssueColumn(item,identifier);case 'versions':return this.updateVersion(item,identifier);case 'milestones':return this.updateMilestone(item);case 'issues':return this.updateIssue(item);case 'projects':return this.updateProject(item);default:alert('Resource "'+resource+'" is unknown');}} /**
     * Gets a resource
     *
     * @param {String} resource
     *
     * @returns {Promise} promise
     */},{key:"getResource",value:function getResource(resource){switch(resource){case 'collaborators':return this.getCollaborators();case 'issueTypes':return this.getIssueTypes();case 'issuePriorities':return this.getIssuePriorities();case 'issueEstimates':return this.getIssueEstimates();case 'issueColumns':return this.getIssueColumns();case 'milestones':return this.getMilestones();case 'versions':return this.getVersions();case 'issues':return this.getIssues();case 'projects':return this.getIssues();}} /**
     * Gets all resources
     *
     * @param {Array} excludeResources
     *
     * @returns {Promise} promise
     */},{key:"getResources",value:function getResources(excludeResources){var helper=this;spinner(true);return new Promise(function(resolve,reject){function get(resource){window.resources[resource]=[];debug.log('Getting '+resource+'...',helper); // If this resource is excluded, just proceed
if(excludeResources&&Array.isArray(excludeResources)&&excludeResources.indexOf(resource)>-1){return new Promise(function(resolve){resolve();}); // If not, fetch it normally
}else {return helper.getResource(resource);}}get('issueTypes').then(function(){return get('issuePriorities');}).then(function(){return get('issueEstimates');}).then(function(){return get('issueColumns');}).then(function(){return get('collaborators');}).then(function(){return get('milestones');}).then(function(){return get('versions');}).then(function(){return get('issues');}).then(function(){spinner(false);resolve();});});}}]);return ApiHelper;}();module.exports=ApiHelper;},{}],18:[function(require,module,exports){'use strict';var lastSenderName='';var DebugHelper=function(){function DebugHelper(){_classCallCheck(this,DebugHelper);}_createClass(DebugHelper,null,[{key:"log", /**
     * Logs a message
     *
     * @param {String} message
     * @param {Object} sender
     * @param {Number} verbosity
     */value:function log(message,sender,verbosity){if(verbosity==0){this.error('Verbosity cannot be set to 0',this);}else if(!verbosity){verbosity=1;}if(this.verbosity>=verbosity){console.log(this.parseSender(sender),this.getDateString(),message);}} /**
     * Gets the date string
     *
     * @returns {String} date
     */},{key:"getDateString",value:function getDateString(){var date=new Date();var output='('+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+'-'+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+')';return output;} /**
     * Parse sender
     *
     * @param {Object} sender
     *
     * @returns {String} name
     */},{key:"parseSender",value:function parseSender(sender){var senderName='';if(sender){if(typeof sender==='function'){senderName+=sender.name;}else if(sender.constructor){senderName+=sender.constructor.name;}else {senderName+=sender.toString();}senderName;}if(senderName==lastSenderName){senderName='';}else {lastSenderName=senderName;senderName='\n'+senderName+'\n----------\n';}return senderName;} /**
     * Throws an error
     *
     * @param {String} message
     * @param {Object} sender
     */},{key:"error",value:function error(message,sender){throw new Error(this.parseSender(sender)+' '+this.getDateString()+' '+message);} /**
     * Shows a warning
     */},{key:"warning",value:function warning(message,sender){console.log(this.parseSender(sender),this.getDateString(),message);console.trace();}}]);return DebugHelper;}();module.exports=DebugHelper;},{}],19:[function(require,module,exports){'use strict'; // The idle timeout is 10 minutes
var IDLE_TIMEOUT=600;var idleTimer=0; /**
 * A helper module for input events
 *
 * @class InputHelper
 */var InputHelper=function(){function InputHelper(){_classCallCheck(this,InputHelper);}_createClass(InputHelper,null,[{key:"init",value:function init(){var _this45=this; // Register keydown events
$(document).keydown(function(e){switch(e.which){case 16:_this45.isShiftDown=true;break;}InputHelper.poke();}); // Register keyup events
$(document).keyup(function(e){switch(e.which){case 16:_this45.isShiftDown=false;break;case 27:IssueEditor.cancelMultiSelect();break;}}); // Register mousedown event
$(document).mousedown(function(e){var $target=$(e.target); // Handle multi-select cancel event
if($target.parents('.issue-editor').length<1&&!$target.hasClass('issue-editor')){IssueEditor.cancelMultiSelect();} // Reset the idle timer
InputHelper.poke();}); // Register idle timer
setInterval(function(){_this45.incrementIdleTimer();},1000);} /**
     * Increments the idle timer
     */},{key:"incrementIdleTimer",value:function incrementIdleTimer(){idleTimer++;if(idleTimer>=IDLE_TIMEOUT){ // Do something after idle timeout
}} /**
     * Resets the idle timer
     */},{key:"poke",value:function poke(){idleTimer=0;} /**
     * Gets the current idle timer
     *
     * @returns {Number} timer
     */},{key:"getIdleTimer",value:function getIdleTimer(){return idleTimer;}}]);return InputHelper;}();InputHelper.init();module.exports=InputHelper;},{}],20:[function(require,module,exports){'use strict'; /**
 * A tool for performing Issue related operations
 */var IssueHelper=function(){function IssueHelper(){_classCallCheck(this,IssueHelper);}_createClass(IssueHelper,null,[{key:"search", /**
     * Find an issue by a query
     *
     * @param {String} query
     * @param {Number} max
     *
     * @returns {Array(Issue)}
     */value:function search(query,max){var results=[];var found=0;for(var i=0;i<resources.issues.length;i++){var string=JSON.stringify(resources.issues[i]).toLowerCase();if(string.search(query.toLowerCase())>-1){results[results.length]=resources.issues[i];found++;if(found>=max){break;}}}return results;}}]);return IssueHelper;}();module.exports=IssueHelper;},{}],21:[function(require,module,exports){'use strict';window.resources={};var ResourceHelper=function(){function ResourceHelper(){_classCallCheck(this,ResourceHelper);}_createClass(ResourceHelper,null,[{key:"getCollaborator",value:function getCollaborator(name){for(var i in window.resources.collaborators){var collaborator=window.resources.collaborators[i];if(collaborator.name==name){return i;}}}},{key:"getIssuePriority",value:function getIssuePriority(name){for(var i in window.resources.issuePriorities){var type=window.resources.issuePriorities[i];if(type==name){return i;}}}},{key:"getIssueEstimate",value:function getIssueEstimate(name){for(var i in window.resources.issueEstimates){var estimate=window.resources.issueEstimates[i];if(estimate==name){return i;}}}},{key:"getIssueColumn",value:function getIssueColumn(name){for(var i in window.resources.issueColumns){var type=window.resources.issueColumns[i];if(type==name){return i;}}return 0;}},{key:"getIssueType",value:function getIssueType(name){for(var i in window.resources.issueTypes){var type=window.resources.issueTypes[i];if(type==name){return i;}}}},{key:"getVersion",value:function getVersion(name){for(var i in window.resources.versions){var version=window.resources.versions[i];if(version==name){return i;}}}},{key:"getMilestone",value:function getMilestone(name){for(var i in window.resources.milestones){var milestone=window.resources.milestones[i];if(milestone.title==name){return i;}}}},{key:"reloadResource",value:function reloadResource(resource){return new Promise(function(callback){window.resources[resource]=[];ApiHelper.getResource(resource).then(function(){callback();});});}},{key:"updateResource",value:function updateResource(resource,item,index,identifier){return new Promise(function(callback){ApiHelper.updateResource(resource,item,identifier).then(function(){if(!index){index=item.index||resources[resource].indexOf(item);}resources[resource][index]=item;callback();});});}},{key:"removeResource",value:function removeResource(resource,index){return new Promise(function(callback){ApiHelper.removeResource(resource,index).then(function(){resources[resource].splice(index,1);callback();});});}},{key:"addResource",value:function addResource(resource,item){return new Promise(function(callback){ApiHelper.addResource(resource,item).then(function(){var index=resources[resource].length;if((typeof item==="undefined"?"undefined":_typeof(item))==='object'){item.index=index;}resources[resource][index]=item;callback();});});}}]);return ResourceHelper;}();module.exports=ResourceHelper;},{}],22:[function(require,module,exports){'use strict'; /**
 * A manager for local storage settings
 */var SettingsHelper=function(){function SettingsHelper(){_classCallCheck(this,SettingsHelper);}_createClass(SettingsHelper,null,[{key:"set", /**
     * Set value
     *
     * @param {String} type
     * @param {String} key
     * @param {String} value
     * @param {Boolean} stringify
     */value:function set(type,key,value,stringify){var prefix='settings'; // Exceptions for types not managed on a project basis
if(type!='projects'){prefix=localStorage.getItem('settings:projects:current')+prefix+':';}if(stringify){value=JSON.stringify(value);}localStorage.setItem(prefix+':'+type+':'+key,value);} /**
     * Get value
     *
     * @param {String} type
     * @param {String} key
     * @param {String} defaultValue
     * @param {Boolean} parse
     *
     * @returns {String} value
     */},{key:"get",value:function get(type,key,defaultValue,parse){var prefix='settings'; // Exceptions for types not managed on a project basis
if(type!='projects'){prefix=localStorage.getItem('settings:projects:current')+prefix+':';}var result=localStorage.getItem(prefix+':'+type+':'+key);if(result==='null'||result===null||result===undefined||result==='undefined'||typeof result==='undefined'){SettingsHelper.set(type,key,defaultValue,parse);result=defaultValue||false;}if(parse){try{result=JSON.parse(result);}catch(e){debug.log(e.message,this);}}return result;}}]);return SettingsHelper;}();module.exports=SettingsHelper;},{}],23:[function(require,module,exports){'use strict'; /**
 * The data model for issues
 */var Issue=function(){_createClass(Issue,null,[{key:"create", /**
     * Create a new issue and push it to the remote source
     */value:function create(properties){return new Promise(function(callback){var issue=new Issue(properties);ResourceHelper.addResource('issues',issue).then(function(){callback(issue);});});}}]);function Issue(properties){_classCallCheck(this,Issue);properties=properties||{}; // Essential properties
this.title=properties.title||'New issue';this.description=properties.description||''; // Optional params
this.column=properties.column||0;this.type=properties.type||0;this.priority=properties.priority||0;this.estimate=properties.estimate||0;this.version=properties.version;this.milestone=properties.milestone;this.comments=properties.comments||[];this.assignee=properties.assignee;} /**
     * Gets an object with all the baked values
     */_createClass(Issue,[{key:"getBakedValues",value:function getBakedValues(){var baked={column:resources.issueColumns[this.column],type:resources.issueTypes[this.type],priority:resources.issuePriorities[this.priority],version:resources.versions[this.version],milestone:resources.milestones[this.milestone],assignee:resources.collaborators[this.assignee]};if(baked.assignee){baked.assignee=baked.assignee.name;}if(baked.milestone){baked.milestone=baked.milestone.title;}return baked;} /**
     * Check if issue is closed
     *
     * @returns {Boolean} closed
     */},{key:"isClosed",value:function isClosed(){return this.column==window.resources.issueColumns.length-1;} /**
     * Get estimated hours
     *
     * @returns {Number} hours
     */},{key:"getEstimatedHours",value:function getEstimatedHours(){var estimate=window.resources.issueEstimates[this.estimate];if(estimate){return parseFloat(estimate);}else {return 0;}}}]);return Issue;}();module.exports=Issue;},{}],24:[function(require,module,exports){'use strict'; // Root
Router.route('/',function(){setTimeout(function(){navbar.toggleAboutPanel(true);},10);}); // User
Router.route('/:user',function(){setTimeout(function(){navbar.toggleProjectsList(true);},10);}); // Project
Router.route('/:user/:project',function(){location.hash='/'+Router.params.user+'/'+Router.params.project+'/board/kanban';}); // Plan
Router.route('/:user/:project/plan/',function(){ApiHelper.checkConnection().then(function(){ApiHelper.getResources().then(function(){$('.workspace').remove();$('.app-container').append(_.div({class:'workspace plan-container'},new PlanEditor().$element));navbar.slideIn();});});}); // Board
Router.route('/:user/:project/board/:mode',function(){ApiHelper.checkConnection().then(function(){ApiHelper.getResources().then(function(){$('.workspace').remove(); // Append all milestones
$('.app-container').append(_.div({class:'workspace board-container '+Router.params.mode},new FilterEditor().$element,_.each(window.resources.milestones,function(i,milestone){return new MilestoneEditor({model:milestone}).$element;}))); // Sort milestones by end date
$('.app-container .board-container .milestone-editor').sort(function(a,b){var aDate=new Date(a.getAttribute('data-end-date'));var bDate=new Date(b.getAttribute('data-end-date'));if(aDate<bDate){return -1;}if(aDate>bDate){return 1;}return 0;}).detach().appendTo('.app-container .board-container'); // Append the unassigned items
$('.app-container .board-container').append(new MilestoneEditor({model:{title:'Unassigned',description:'These issues have yet to be assigned to a milestone'}}).$element);navbar.slideIn();});});}); // Settings
Router.route('/:user/:project/settings/',function(){ApiHelper.checkConnection().then(function(){ApiHelper.getResources().then(function(){$('.workspace').remove();$('.app-container').append(_.div({class:'workspace settings-container'},_.div({class:'tabbed-container vertical'},_.div({class:'tabs'},_.each(window.resources,function(name,resource){if(name!='issues'&&name!='milestones'&&name!='projects'){return _.button({class:'tab'+(name=='issueTypes'?' active':'')},prettyName(name)).click(function(){var index=$(this).index();$(this).parent().children().each(function(i){$(this).toggleClass('active',i==index);});$(this).parents('.tabbed-container').find('.panes .pane').each(function(i){$(this).toggleClass('active',i==index);});});}})),_.div({class:'panes'},_.each(window.resources,function(name,resource){if(name!='issues'&&name!='milestones'&&name!='projects'){return _.div({class:'pane'+(name=='issueTypes'?' active':'')},new ResourceEditor({name:name,model:resource}).$element);}})))));navbar.slideIn();});});}); // Init router
Router.init(); // Navbar
var navbar=new Navbar();$('.app-container').html(navbar.$element);},{}],25:[function(require,module,exports){'use strict';module.exports=function render(){var _this46=this;var issueKeys=Object.keys(new Issue().getBakedValues());return _.div({class:'filter-editor'},_.h4({class:'title'},'Filters'),_.div({class:'filters'},_.each(this.model,function(i,filter){var resourceKey=filter.key; // Change assignee to collaborator
if(resourceKey=='assignee'){resourceKey='collaborator';} // Append 's' for plural
resourceKey+='s'; // Correct grammar
resourceKey=resourceKey.replace('ys','ies');var resource=resources[resourceKey]; // If we didn't find the resource, it's likely that we just need to capitalise it and prepend 'issue'
// For example: 'type' should be 'issueType' when referring to the resource
if(!resource){resourceKey='issue'+resourceKey.substring(0,1).toUpperCase()+resourceKey.substring(1);resource=resources[resourceKey];}var $filter=_.div({class:'filter'},_.div({class:'select-container key'},_.select({},_.each(issueKeys,function(i,key){return _.option({value:key,selected:key==filter.key},key);})).change(function(e){filter.key=$filter.find('.key select').val();filter.value=null;_this46.onChange(i);})),_.div({class:'select-container operator'},_.select({},_.each(_this46.getOperators(),function(i,operator){return _.option({value:operator},operator);})).val(filter.operator||'!=').change(function(e){filter.operator=$filter.find('.operator select').val();_this46.onChange(i);})),_.div({class:'select-container value'},_.select({},_.each(resource,function(i,value){var valueName=value;if(value.title){valueName=value.title;}if(value.name){valueName=value.name;}var isSelected=valueName==filter.value;if(!filter.value&&i==0){isSelected=true;}return _.option({value:valueName,selected:isSelected},valueName);})).change(function(e){filter.value=$filter.find('.value select').val();_this46.onChange(i);})),_.button({class:'btn-remove btn-transparent'},_.span({class:'fa fa-remove'})).click(function(){_this46.onClickRemove(i);}));return $filter;})),_.div({class:'button-container'},_.if(this.model.length<this.MAX_FILTERS,_.button({class:'btn'},'Add filter',_.span({class:'fa fa-plus'})).click(function(){_this46.onClickAdd();}))));};},{}],26:[function(require,module,exports){module.exports=function render(){var _this47=this;return _.div({class:'issue-editor','data-index':this.model.index,'data-type':resources.issueTypes[this.model.type]},_.div({class:'header'},_.div({class:'drag-handle'},_.span({class:'fa fa-bars'})).on('mousedown',function(e){_this47.onClickDragHandle(e);}),_.if(!ApiHelper.isSpectating(),_.div({class:'assignee-avatar'},this.getAssigneeAvatar())),_.button({class:'btn-toggle btn-transparent'},_.span({class:'fa icon-close fa-chevron-down'}),_.span({class:'fa icon-open fa-chevron-right'})).click(function(e){_this47.onClickToggle(e);}),_.div({class:'issue-index'},this.model.index.toString()),this.getPriorityIndicator(),_.h4({},_.span({class:'btn-edit'},this.model.title).click(this.onClickEdit),_.input({type:'text',class:'selectable edit hidden btn-transparent','data-property':'title',value:this.model.title}).change(function(){_this47.onChange();_this47.$element.find('.header .btn-edit').html(_this47.model.title);}).blur(this.onBlur).keyup(function(e){if(e.which==13){_this47.onBlur(e);}}))).click(function(e){_this47.onClickElement(e);}),_.div({class:'meta'},_.div({class:'multi-edit-notification'},'Now editing multiple issues'),_.div({class:'meta-field type'+(window.resources.issueTypes.length<1?' hidden':'')},_.label('Type'),_.select({'data-property':'type',disabled:ApiHelper.isSpectating()},_.each(window.resources.issueTypes,function(i,type){return _.option({value:i},type);})).change(function(){_this47.onChange();}).val(this.model.type),_.input({class:'multi-edit-toggle',type:'checkbox'}).change(function(e){_this47.onChangeCheckbox(e);})),_.div({class:'meta-field priority'+(window.resources.issuePriorities.length<1?' hidden':'')},_.label('Priority'),_.select({'data-property':'priority',disabled:ApiHelper.isSpectating()},_.each(window.resources.issuePriorities,function(i,priority){return _.option({value:i},priority);})).change(function(){_this47.onChange();}).val(this.model.priority),_.input({class:'multi-edit-toggle',type:'checkbox'}).change(function(e){_this47.onChangeCheckbox(e);})),_.if(window.resources.collaborators.length>0,_.div({class:'meta-field assignee'},_.label('Assignee'),_.select({'data-property':'assignee',disabled:ApiHelper.isSpectating()},_.option({value:null},'(unassigned)'),_.each(window.resources.collaborators,function(i,collaborator){return _.option({value:i},collaborator.name);})).change(function(){_this47.onChange();}).val(this.model.assignee),_.input({class:'multi-edit-toggle',type:'checkbox'}).change(function(e){_this47.onChangeCheckbox(e);}))),_.div({class:'meta-field version'+(window.resources.versions.length<1?' hidden':'')},_.label('Version'),_.select({'data-property':'version',disabled:ApiHelper.isSpectating()},_.each(window.resources.versions,function(i,version){return _.option({value:i},version);})).change(function(){_this47.onChange();}).val(this.model.version),_.input({class:'multi-edit-toggle',type:'checkbox'}).change(function(e){_this47.onChangeCheckbox(e);})),_.div({class:'meta-field estimate'+(window.resources.issueEstimates.length<1?' hidden':'')},_.label('Estimate'),_.select({'data-property':'estimate',disabled:ApiHelper.isSpectating()},_.each(window.resources.issueEstimates,function(i,estimate){return _.option({value:i},estimate);})).change(function(){_this47.onChange();}).val(this.model.estimate),_.input({class:'multi-edit-toggle',type:'checkbox'}).change(function(e){_this47.onChangeCheckbox(e);})),_.div({class:'multi-edit-actions'},_.button({class:'btn'},'Cancel').click(function(){_this47.onClickMultiEditCancel();}),_.button({class:'btn'},'Apply').click(function(){_this47.onClickMultiEditApply();}))),_.div({class:'body'},_.div({class:'btn-edit'},markdownToHtml(this.model.description)).click(this.onClickEdit),_.textarea({class:'selectable edit hidden btn-transparent','data-property':'description'},this.model.description).change(function(){_this47.onChange();_this47.$element.find('.body .btn-edit').html(markdownToHtml(_this47.model.description)||'');}).blur(this.onBlur)),_.div({class:'comments'}),_.if(!ApiHelper.isSpectating(),_.div({class:'add-comment'},_.textarea({class:'btn-transparent',placeholder:'Add comment here...'}),_.button({class:'btn'},'Comment').click(function(){_this47.onClickComment();}))));};},{}],27:[function(require,module,exports){'use strict';module.exports=function render(){var _this48=this;var state=SettingsHelper.get('milestone',this.model.index)||'';if(!state&&this.getPercentComplete()>=100){state='collapsed';}return _.div({class:'milestone-editor '+state,'data-index':this.model.index,'data-end-date':this.model.endDate},_.div({class:'header'},_.div({class:'progress-bar',style:'width: '+this.getPercentComplete()+'%'}),_.div({class:'title'},_.button({class:'btn-toggle btn-transparent'},_.span({class:'fa fa-chevron-right'}),_.span({class:'fa fa-chevron-down'}),_.h4(this.model.title),_.p(this.model.description)).click(function(){_this48.onClickToggle();})),_.div({class:'stats'},_.span({class:'progress-amounts'},_.span({class:'fa fa-exclamation-circle'}),_.span({class:'total'}),_.span({class:'remaining'})),_.span({class:'progress-hours'},_.span({class:'fa fa-clock-o'}),_.span({class:'total'}),_.span({class:'remaining'})))),_.div({class:'columns'},_.each(window.resources.issueColumns,function(columnIndex,column){return _.div({class:'column','data-index':columnIndex},_.div({class:'header'},_.h4(column)),_.div({class:'body'},_.each(window.resources.issues,function(issueIndex,issue){if(issue.column==columnIndex&&issue.milestone==_this48.model.index){return new IssueEditor({model:issue}).$element;}}),_.if(columnIndex==0&&!ApiHelper.isSpectating(),_.button({class:'btn btn-new-issue'},'New issue ',_.span({class:'fa fa-plus'})).click(function(){_this48.onClickNewIssue();}))));})));};},{}],28:[function(require,module,exports){'use strict';module.exports=function Navbar(){var _this49=this;return _.div({class:'navbar'},_.div({class:'obscure'},_.div({class:'content'})),_.div({class:'buttons'},_.each(this.getLinks(),function(i,link){if(link.separator){return _.div({class:'separator'});}else {return _.button({'data-url':link.url,class:(link.class||'')+(link.bottom?' bottom':'')+(link.handler?' handler':'')},_.if(link.icon,_.span({class:'fa fa-'+link.icon})),_.if(link.img,_.img({src:link.img}))).click(function(){_this49.cleanUpClasses();if(link.handler){link.handler.call(_this49);}else if(link.url){_this49.onClickLink(link.url);}});}})));};},{}],29:[function(require,module,exports){'use strict';module.exports=function render(){var _this50=this;return _.div({class:'plan-editor'},_.div({class:'tabbed-container'},_.div({class:'tabs years'},_.each(this.getYears(),function(i,year){return _.button({class:'tab year'+(_this50.currentYear==year.number?' active':'')},year.number).click(function(){_this50.onClickYear(year.number);});})),_.div({class:'tabs months'},_.each(this.getMonths(),function(i,month){return _.button({class:'tab month'+(_this50.currentMonth==month.number?' active':'')},month.name).click(function(){_this50.onClickMonth(month.number);});}))),_.div({class:'weekdays'},_.each(this.getWeekDays(),function(i,weekday){return _.div({class:'weekday'},weekday);})),_.div({class:'dates'},this.iterateDates(function(date){if(!date){return _.div({class:'date-placeholder'});}else {return _.div({class:'date','data-date':date.getSimpleString()},_.div({class:'header'},_.span({class:'datenumber'},date.getDate()),_.span({class:'weeknumber'},'w '+date.getWeek())),_.div({class:'body'},_.each(window.resources.milestones,function(i,milestone){if(milestone.endDate){var dueDate=new Date(milestone.endDate);dueDate.setHours(0);dueDate.setMinutes(0);dueDate.setSeconds(0);if(dueDate.getFullYear()==date.getFullYear()&&dueDate.getMonth()==date.getMonth()&&dueDate.getDate()==date.getDate()){return new PlanItemEditor({model:milestone}).$element;}}}),_.button({class:'btn-transparent'},_.span({class:'fa fa-plus'})).click(function(){_this50.onClickAddMilestone(date);})));}})),_.if(this.getUndatedMilestones().length>0,_.div({class:'undated'},_.h4('Undated'),_.each(this.getUndatedMilestones(),function(i,milestone){return new PlanItemEditor({model:milestone}).$element;}))));};},{}],30:[function(require,module,exports){'use strict';module.exports=function render(){var _this51=this;return _.div({class:'plan-item-editor','data-date':this.model.endDate},_.div({class:'drag-handle'},this.model.title).on('mousedown',function(e){_this51.onClickDragHandle(e);}),_.button({class:'btn-close btn-transparent'},_.span({class:'fa fa-remove'})).click(function(){_this51.onClickClose();}),_.div({class:'header'},_.h4('Title'),_.input({class:'selectable edit',placeholder:'Type milestone title here',type:'text',value:this.model.title})),_.div({class:'body'},_.h4('Description'),_.input({class:'selectable',placeholder:'Type milestone description here',type:'text',value:this.model.description})),_.div({class:'footer'},_.button({class:'btn'},'Delete',_.span({class:'fa fa-remove'})).click(function(){_this51.onClickDelete();}),_.button({class:'btn'},'OK',_.span({class:'fa fa-check'})).click(function(){_this51.onClickOK();})));};},{}],31:[function(require,module,exports){'use strict';module.exports=function render(){var _this52=this;return _.div({class:'project-editor'},_.div({class:'content'},_.div({class:'header'},_.h4(this.model.title)),_.div({class:'body'},this.model.description))).click(function(){_this52.onClick();});};},{}],32:[function(require,module,exports){'use strict';module.exports=function render(){var _this53=this;return _.div({class:'resource-editor'},_.div({class:'body'},_.each(this.model,function(i,item){ // Special cases
if(_this53.name=='issueColumns'&&(item=='to do'||item=='done')){return;}return _.div({class:'item'},_.if(typeof item==='string',_.input({class:'selectable',value:item,placeholder:'Input name',type:'text'}).change(function(){_this53.onChange(i,item);})),_.if(typeof item!=='string',_.label(item.title||item.name)),_.button({class:'btn-remove'},_.span({class:'fa fa-remove'})).click(function(){_this53.onClickRemove(i);}));})),_.div({class:'footer'},_.input({type:'text'}),_.button({class:'btn btn-add'},'Add',_.span({class:'fa fa-plus'})).click(function(){_this53.onClickAdd(_this53.$element.find('.footer input').val());})));};},{}],33:[function(require,module,exports){'use strict';var FilterEditor=function(_View2){_inherits(FilterEditor,_View2);function FilterEditor(params){_classCallCheck(this,FilterEditor);var _this54=_possibleConstructorReturn(this,Object.getPrototypeOf(FilterEditor).call(this,params));_this54.MAX_FILTERS=5;_this54.template=require('../templates/FilterEditor');_this54.defaultFilter={key:'column',operator:'!=',value:'done'};_this54.model=SettingsHelper.get('filters','custom',[],true);_this54.fetch();setTimeout(function(){_this54.applyFilters();},2);return _this54;} /**
     * Event: Change
     *
     * @param {Number} index
     */_createClass(FilterEditor,[{key:"onChange",value:function onChange(index){this.render(); // Update value, just in case key was changed
this.model[index].value=this.$element.find('.filter').eq(index).find('.select-container.value select').val(); // Update settings
SettingsHelper.set('filters','custom',this.model,true);this.applyFilters();} /**
     * Event: Click remove button
     *
     * @param {Number} index
     */},{key:"onClickRemove",value:function onClickRemove(index){this.model.splice(index,1); // Update settings
SettingsHelper.set('filters','custom',this.model,true);this.render();this.applyFilters();} /**
     * Event: Click add button
     */},{key:"onClickAdd",value:function onClickAdd(){if(this.model.length<this.MAX_FILTERS){this.model.push({key:this.defaultFilter.key,operator:this.defaultFilter.operator,value:this.defaultFilter.value}); // Update settings
SettingsHelper.set('filters','custom',this.model,true);this.applyFilters();this.render();}} /**
     * Gets all filtering operators
     *
     * @param {Array} operators
     */},{key:"getOperators",value:function getOperators(){return ['!=','=='];} /**
     * Applies selected filters
     */},{key:"applyFilters",value:function applyFilters(){var issueViews=ViewHelper.getAll('IssueEditor');var _iteratorNormalCompletion14=true;var _didIteratorError14=false;var _iteratorError14=undefined;try{for(var _iterator14=issueViews[Symbol.iterator](),_step14;!(_iteratorNormalCompletion14=(_step14=_iterator14.next()).done);_iteratorNormalCompletion14=true){var issueView=_step14.value;issueView.$element.toggle(true);var issue=new Issue(issueView.model).getBakedValues();var _iteratorNormalCompletion15=true;var _didIteratorError15=false;var _iteratorError15=undefined;try{for(var _iterator15=this.model[Symbol.iterator](),_step15;!(_iteratorNormalCompletion15=(_step15=_iterator15.next()).done);_iteratorNormalCompletion15=true){var filter=_step15.value;try{var value=filter.value;if(value&&value.constructor===String){value='\''+value+'\'';}var evalString='issue.'+filter.key+' '+filter.operator+' '+value;var isValid=eval(evalString);if(!isValid){issueView.$element.toggle(false);break;}}catch(e){alert(e);return;}}}catch(err){_didIteratorError15=true;_iteratorError15=err;}finally {try{if(!_iteratorNormalCompletion15&&_iterator15.return){_iterator15.return();}}finally {if(_didIteratorError15){throw _iteratorError15;}}}}}catch(err){_didIteratorError14=true;_iteratorError14=err;}finally {try{if(!_iteratorNormalCompletion14&&_iterator14.return){_iterator14.return();}}finally {if(_didIteratorError14){throw _iteratorError14;}}}}}]);return FilterEditor;}(View);module.exports=FilterEditor;},{"../templates/FilterEditor":25}],34:[function(require,module,exports){'use strict';var IssueEditor=function(_View3){_inherits(IssueEditor,_View3);function IssueEditor(params){_classCallCheck(this,IssueEditor);var _this55=_possibleConstructorReturn(this,Object.getPrototypeOf(IssueEditor).call(this,params));_this55.template=require('../templates/IssueEditor');_this55.fetch();return _this55;} /**
     * Cancels multi select
     */_createClass(IssueEditor,[{key:"onClickToggle", /**
     * Event: Click the toggle button
     */value:function onClickToggle(e){e.preventDefault();e.stopPropagation();if(!this.usingMultiEdit()){IssueEditor.cancelMultiSelect();}var wasExpanded=this.$element.hasClass('expanded');$('.issue-editor').removeClass('expanded');this.$element.toggleClass('expanded',!wasExpanded);if(this.usingMultiEdit()){$('.issue-editor .multi-edit-toggle').each(function(){this.checked=false;});$('.board-container').toggleClass('multi-edit',!wasExpanded);}else {if(!wasExpanded){this.getComments();}}} /**
     * Gets an IMG tag with the avatar of the assigned collaborator
     *
     * @returns {Object} img
     */},{key:"getAssigneeAvatar",value:function getAssigneeAvatar(){var assignee=window.resources.collaborators[this.model.assignee];if(assignee){return _.img({src:assignee.avatar});}else {return _.div({class:'unassigned'},_.span({class:'fa fa-user'}));}} /**
     * Gets a property from the DOM of the editor
     *
     * @param {String} key
     * @param {Boolean} useCheckboxes
     *
     * @returns {String} value
     */},{key:"getProperty",value:function getProperty(key,useCheckboxes){var $property=this.$element.find('*[data-property="'+key+'"]');var value=$property.val()||$property.text();if(useCheckboxes){var $checkbox=this.$element.find('*[data-property="'+key+'"]').siblings('.multi-edit-toggle');if(!$checkbox[0].checked){return null;}}return value;} /**
     * Sets a property to the DOM of the editor
     *
     * @param {String} key
     * @param {String} value
     */},{key:"setProperty",value:function setProperty(key,value){var $property=this.$element.find('*[data-property="'+key+'"]');$property.val(value);} /**
     * Updates the model with properties from the DOM
     */},{key:"updateModel",value:function updateModel(){this.model.title=this.getProperty('title');this.model.type=this.getProperty('type');this.model.priority=this.getProperty('priority');this.model.assignee=this.getProperty('assignee');this.model.version=this.getProperty('version');this.model.description=this.getProperty('description');this.model.estimate=this.getProperty('estimate');} /**
     * Updates the DOM with properties from the model
     */},{key:"updateDOM",value:function updateDOM(){ // Update all fields
this.setProperty('title',this.model.title);this.setProperty('type',this.model.type);this.setProperty('priority',this.model.priority);this.setProperty('assignee',this.model.assignee);this.setProperty('version',this.model.version);this.setProperty('description',this.model.description);this.setProperty('estimate',this.model.estimate); // Update data type attribute
this.$element.attr('data-type',resources.issueTypes[this.model.type]); // Update avatar image
this.$element.find('.header .assignee-avatar').html(this.getAssigneeAvatar()); // Update priority indicator
this.$element.find('.priority-indicator').replaceWith(this.getPriorityIndicator());} /**
     * Check whether or not we're using multi edit
     *
     * @returns {Boolean} active
     */},{key:"usingMultiEdit",value:function usingMultiEdit(){return this.$element.hasClass('selected')&&$('.issue-editor.selected').length>1;} /**
     * Synchronises the model data with the remote backend
     */},{key:"sync",value:function sync(){var _this56=this; // Start loading
this.$element.toggleClass('loading',true); // Update the issue though the API
ApiHelper.updateIssue(this.model).then(function(){_this56.$element.toggleClass('loading',false);});} /**
     * Event: Click the dragging handle
     */},{key:"onClickDragHandle",value:function onClickDragHandle(e){var _this57=this;if(ApiHelper.isSpectating()){return;}if(!InputHelper.isShiftDown){(function(){ // Set class on board container
$('.board-container').toggleClass('dragging',true); // Set element
var $element=_this57.$element;if(_this57.usingMultiEdit()){$element=$('.issue-editor.selected');}else {} //IssueEditor.cancelMultiSelect();
// Apply temporary CSS properties
$element.each(function(i,element){$(element).css({top:_this57.$element.offset().top,left:_this57.$element.offset().left,width:_this57.$element.outerWidth(),height:_this57.$element.outerHeight(),'pointer-events':'none','z-index':999,'margin-top':i*15+'px'});}); // Buffer the offset between mouse cursor and element position
var offset={x:_this57.$element.offset().left-e.pageX,y:_this57.$element.offset().top-e.pageY}; // Add absolute positioning afterwards to allow getting proper offset
$element.css({position:'absolute'}); // Column mouse hover events
$('.milestone-editor .columns .column').on('mouseenter',function(){$(this).toggleClass('hovering',true);}).on('mouseleave',function(){$(this).toggleClass('hovering',false);}); // Document pointer movement logic
$(document).off('mousemove').on('mousemove',function(e){ // Get current pointer location
var current={x:e.pageX,y:e.pageY}; // Get current viewport
var viewport={x:0,y:$(document).scrollTop(),w:$(window).width(),h:$(window).height()}; // Apply new CSS positioning values
$element.css({top:current.y+offset.y,left:current.x+offset.x}); // Scroll page if dragging near the top or bottom
var scrollSpeed=5;if(current.y>viewport.y+viewport.h-100){scroll(1*scrollSpeed);}else if(current.y<viewport.y+100){scroll(-1*scrollSpeed);}}); // Document pointer release mouse button logic
$(document).off('mouseup').on('mouseup',function(e){_this57.onReleaseDragHandle(e);});})();}} /**
     * Event: Release the dragging handle
     */},{key:"onReleaseDragHandle",value:function onReleaseDragHandle(e){if(ApiHelper.isSpectating()){return;} // Unregister mouse events
$(document).off('mouseup').off('mousemove'); // Set element
var $element=this.$element;if(this.usingMultiEdit()){$element=$('.issue-editor.selected');} // Unset temporary classes and styling
$('.board-container').toggleClass('dragging',false);$element.removeAttr('style'); // Place this element into the hovered column
$('.milestone-editor .columns .column.hovering .body').first().prepend($element); // Unregister column mouse events and unset hovering state
$('.milestone-editor .columns .column').off('mouseenter').off('mouseleave').toggleClass('hovering',false); // Update model data with new information based on DOM location
$element.each(function(i){var _iteratorNormalCompletion16=true;var _didIteratorError16=false;var _iteratorError16=undefined;try{for(var _iterator16=ViewHelper.getAll('IssueEditor')[Symbol.iterator](),_step16;!(_iteratorNormalCompletion16=(_step16=_iterator16.next()).done);_iteratorNormalCompletion16=true){var view=_step16.value;if(this==view.$element[0]){view.model.milestone=view.$element.parents('.milestone-editor').attr('data-index');view.model.column=view.$element.parents('.column').attr('data-index'); // Trigger the sync event
view.sync();}}}catch(err){_didIteratorError16=true;_iteratorError16=err;}finally {try{if(!_iteratorNormalCompletion16&&_iterator16.return){_iterator16.return();}}finally {if(_didIteratorError16){throw _iteratorError16;}}}}); // Update filters
ViewHelper.get('FilterEditor').applyFilters(); // Cancel multiselect
IssueEditor.cancelMultiSelect(); // Update milestones progress
var _iteratorNormalCompletion17=true;var _didIteratorError17=false;var _iteratorError17=undefined;try{for(var _iterator17=ViewHelper.getAll('MilestoneEditor')[Symbol.iterator](),_step17;!(_iteratorNormalCompletion17=(_step17=_iterator17.next()).done);_iteratorNormalCompletion17=true){var milestoneEditor=_step17.value;milestoneEditor.updateProgress();}}catch(err){_didIteratorError17=true;_iteratorError17=err;}finally {try{if(!_iteratorNormalCompletion17&&_iterator17.return){_iterator17.return();}}finally {if(_didIteratorError17){throw _iteratorError17;}}}} /**
     * Event: Fires on every change to a property
     */},{key:"onChange",value:function onChange(){if(ApiHelper.isSpectating()){return;} // Only update values if we're not using multi edit
if(!this.usingMultiEdit()){this.updateModel();this.updateDOM();this.sync(); // Update filters
ViewHelper.get('FilterEditor').applyFilters();var _iteratorNormalCompletion18=true;var _didIteratorError18=false;var _iteratorError18=undefined;try{for(var _iterator18=ViewHelper.getAll('MilestoneEditor')[Symbol.iterator](),_step18;!(_iteratorNormalCompletion18=(_step18=_iterator18.next()).done);_iteratorNormalCompletion18=true){var milestoneEditor=_step18.value;if(milestoneEditor.model.index==this.model.milestone){milestoneEditor.updateProgress();break;}}}catch(err){_didIteratorError18=true;_iteratorError18=err;}finally {try{if(!_iteratorNormalCompletion18&&_iterator18.return){_iterator18.return();}}finally {if(_didIteratorError18){throw _iteratorError18;}}}}} /**
     * Event: Click multi edit apply button
     */},{key:"onClickMultiEditApply",value:function onClickMultiEditApply(){if(ApiHelper.isSpectating()){return;}this.updateModel();this.updateDOM();this.sync(); // Look for other IssueEditor views and update them as needed
if(this.usingMultiEdit()){var _iteratorNormalCompletion19=true;var _didIteratorError19=false;var _iteratorError19=undefined;try{for(var _iterator19=ViewHelper.getAll('IssueEditor')[Symbol.iterator](),_step19;!(_iteratorNormalCompletion19=(_step19=_iterator19.next()).done);_iteratorNormalCompletion19=true){var view=_step19.value;if(view!=this&&view.$element.hasClass('selected')){view.model.type=this.getProperty('type',true)||view.model.type;view.model.priority=this.getProperty('priority',true)||view.model.priority;view.model.assignee=this.getProperty('assignee',true)||view.model.assignee;view.model.version=this.getProperty('version',true)||view.model.version;view.model.estimate=this.getProperty('estimate',true)||view.model.estimate;view.updateDOM();view.sync();}}}catch(err){_didIteratorError19=true;_iteratorError19=err;}finally {try{if(!_iteratorNormalCompletion19&&_iterator19.return){_iterator19.return();}}finally {if(_didIteratorError19){throw _iteratorError19;}}}} // Update filters
ViewHelper.get('FilterEditor').applyFilters();} /**
     * Event: Click multi edit cancel button
     */},{key:"onClickMultiEditCancel",value:function onClickMultiEditCancel(){if(ApiHelper.isSpectating()){return;}IssueEditor.cancelMultiSelect();} /**
     * Event: Fires on changing a checkbox
     */},{key:"onChangeCheckbox",value:function onChangeCheckbox(e){if(ApiHelper.isSpectating()){return;}e.preventDefault();e.stopPropagation();if(this.$element.hasClass('selected')){this.$element.find('.multi-edit-toggle').each(function(i){var otherCheckbox=$('.issue-editor.selected .multi-edit-toggle')[i];otherCheckbox.checked=this.checked;});}} /**
     * Event: Click the edit button of a field
     */},{key:"onClickEdit",value:function onClickEdit(e){e.preventDefault();e.stopPropagation();if(ApiHelper.isSpectating()){return;}if(!InputHelper.isShiftDown&&!$(this).parents('.issue-editor').hasClass('selected')){$(this).toggleClass('hidden',true).siblings('.edit').toggleClass('hidden',false).focus().select();}} /**
     * Event: Click the comment button
     */},{key:"onClickComment",value:function onClickComment(){var _this58=this;if(ApiHelper.isSpectating()){return;}var text=this.$element.find('.add-comment textarea').val();this.$element.toggleClass('loading',true);ApiHelper.addIssueComment(this.model,text).then(function(){_this58.getComments();});} /**
     * Event: Remove focus from input fields
     *
     * @param {Event} e
     */},{key:"onBlur",value:function onBlur(e){if(ApiHelper.isSpectating()){return;}$(e.target).toggleClass('hidden',true).siblings('.btn-edit').toggleClass('hidden',false);} /**
     * Event: Click entire container element
     *
     * @param {Object} event
     */},{key:"onClickElement",value:function onClickElement(e){if(ApiHelper.isSpectating()){return;} // Check for shift key
if(InputHelper.isShiftDown){e.preventDefault();e.stopPropagation();this.$element.toggleClass('selected');if(this.$element.hasClass('selected')){this.$element.toggleClass('expanded',false);} // If not trying to edit the title, allow select of one issue
}else {if($(e.target).parents('.btn-edit').length<1){$('.issue-editor.selected').removeClass('selected');this.$element.toggleClass('selected',true);}}} /**
     * Gets priority icon
     *
     * @returns {String} icon
     */},{key:"getPriorityIndicator",value:function getPriorityIndicator(){var priority=resources.issuePriorities[this.model.priority];var icon='';switch(priority){case 'low':case 'trivial':icon='arrow-down';break;case 'medium':case 'minor':icon='arrow-up';break;case 'high':case 'critical':icon='arrow-up';break;case 'blocker':icon='arrow-up';break;}return _.span({class:'priority-indicator fa fa-'+icon+' '+priority});} /**
     * Lazy-load the comments
     */},{key:"getComments",value:function getComments(){var _this59=this;var $comments=this.$element.find('.comments');ApiHelper.getUser().then(function(user){ApiHelper.getIssueComments(_this59.model).then(function(comments){_this59.$element.toggleClass('loading',false);$comments.html(_.each(comments,function(i,comment){var collaborator=window.resources.collaborators[comment.collaborator];var text=markdownToHtml(comment.text);var isUser=collaborator.name==user.name;return _.div({class:'comment','data-index':comment.index},_.div({class:'collaborator'},_.img({src:collaborator.avatar}),_.p(collaborator.name)),_.if(isUser,_.div({class:'btn-edit'},text).click(_this59.onClickEdit),_.textarea({class:'edit selectable hidden text btn-transparent'},comment.text).change(function(){_this59.$element.toggleClass('loading',true);comment.text=_this59.$element.find('.comments .comment[data-index="'+comment.index+'"] textarea').val();_this59.$element.find('.comments .comment[data-index="'+comment.index+'"] .btn-edit').html(markdownToHtml(comment.text)||'');ApiHelper.updateIssueComment(_this59.model,comment).then(function(){_this59.$element.toggleClass('loading',false);});}).blur(_this59.onBlur)),_.if(!isUser,_.div({class:'text'},text)));}));});});}}],[{key:"cancelMultiSelect",value:function cancelMultiSelect(){$('.issue-editor').toggleClass('selected',false);$('.issue-editor .multi-edit-toggle').each(function(){this.checked=false;});$('.board-container').toggleClass('multi-edit',false);}}]);return IssueEditor;}(View);module.exports=IssueEditor;},{"../templates/IssueEditor":26}],35:[function(require,module,exports){'use strict'; /**
 * An editor for milestones, displaying issues in columns or rows
 */var MilestoneEditor=function(_View4){_inherits(MilestoneEditor,_View4);function MilestoneEditor(params){_classCallCheck(this,MilestoneEditor);var _this60=_possibleConstructorReturn(this,Object.getPrototypeOf(MilestoneEditor).call(this,params));_this60.template=require('../templates/MilestoneEditor');_this60.fetch();_this60.updateProgress();return _this60;} /**
     * Event: Click new issue button
     */_createClass(MilestoneEditor,[{key:"onClickNewIssue",value:function onClickNewIssue(){var _this61=this;spinner(true);Issue.create({milestone:this.model.index}).then(function(issue){var editor=new IssueEditor({model:issue});var $issue=editor.$element;$('.milestone-editor[data-index="'+issue.milestone+'"] .column[data-index="'+issue.column+'"] .btn-new-issue').before($issue);$issue.toggleClass('expanded',true);$issue.toggleClass('selected',false);_this61.updateProgress();spinner(false);});if(this.$element.hasClass('collapsed')){this.onClickToggle();}} /**
     * Event: Click toggle button
     */},{key:"onClickToggle",value:function onClickToggle(){this.$element.toggleClass('collapsed');var isCollapsed=this.$element.hasClass('collapsed');var newKey=isCollapsed?'collapsed':'expanded';SettingsHelper.set('milestone',this.model.index,newKey);} /**
     * Gets remaining days
     *
     * @returns {Number} days
     */},{key:"getRemainingDays",value:function getRemainingDays(){var endDate=this.model.endDate;var nowDate=new Date();if(!endDate){return 0;}if(endDate.constructor===String){endDate=new Date(endDate);}return Math.round((endDate-nowDate)/(1000*60*60*24))+1;} /**
     * Get percent complete
     *
     * @returns {Number} percent
     */},{key:"getPercentComplete",value:function getPercentComplete(){var total=this.getIssues();var completed=this.getCompletedIssues();var percentage=0;var totalHours=0;var completedHours=0;for(var i in total){totalHours+=total[i].getEstimatedHours();}for(var _i2 in completed){completedHours+=completed[_i2].getEstimatedHours();}if(total.length>0&&completed.length>0){percentage=completed.length/total.length*100;}return percentage;} /**
     * Update progress indicators
     */},{key:"updateProgress",value:function updateProgress(){var total=this.getIssues();var completed=this.getCompletedIssues();var percentage=0;var totalHours=0;var completedHours=0;var _iteratorNormalCompletion20=true;var _didIteratorError20=false;var _iteratorError20=undefined;try{for(var _iterator20=total[Symbol.iterator](),_step20;!(_iteratorNormalCompletion20=(_step20=_iterator20.next()).done);_iteratorNormalCompletion20=true){var issue=_step20.value;totalHours+=issue.getEstimatedHours();}}catch(err){_didIteratorError20=true;_iteratorError20=err;}finally {try{if(!_iteratorNormalCompletion20&&_iterator20.return){_iterator20.return();}}finally {if(_didIteratorError20){throw _iteratorError20;}}}var _iteratorNormalCompletion21=true;var _didIteratorError21=false;var _iteratorError21=undefined;try{for(var _iterator21=completed[Symbol.iterator](),_step21;!(_iteratorNormalCompletion21=(_step21=_iterator21.next()).done);_iteratorNormalCompletion21=true){var _issue=_step21.value;completedHours+=_issue.getEstimatedHours();}}catch(err){_didIteratorError21=true;_iteratorError21=err;}finally {try{if(!_iteratorNormalCompletion21&&_iterator21.return){_iterator21.return();}}finally {if(_didIteratorError21){throw _iteratorError21;}}}if(total.length>0&&completed.length>0){percentage=completed.length/total.length*100;}this.$element.find('.header .progress-bar').css({width:percentage+'%'});this.$element.find('.header .progress-amounts .total').html(total.length);this.$element.find('.header .progress-hours .total').html(totalHours+'h');this.$element.find('.header .progress-amounts .remaining').html(total.length-completed.length);this.$element.find('.header .progress-hours .remaining').html(totalHours-completedHours+'h'); // Due date
if(this.model.endDate){var $dueDate=this.$element.find('.header .due-date');if($dueDate.length<1){$dueDate=_.span({class:'due-date'}).prependTo(this.$element.find('.header .stats'));}_.append($dueDate.empty(),_.span({class:'fa fa-calendar'}),_.span({class:'date'},prettyDate(this.model.endDate)), // No time left
_.if(this.getRemainingDays()<1&&this.getPercentComplete()<100,_.span({class:'remaining warn-red'},this.getRemainingDays()+'d')), // Little time left
_.if(this.getRemainingDays()>=1&&this.getRemainingDays()<3&&this.getPercentComplete()<100,_.span({class:'remaining warn-yellow'},this.getRemainingDays()+'d')), // More time left
_.if(this.getRemainingDays()>=3&&this.getPercentComplete()<100,_.span({class:'remaining'},this.getRemainingDays()+'d')), // Complete
_.if(this.getPercentComplete()==100,_.span({class:'remaining ok fa fa-check'})));}} /**
     * Gets a list of completed
     */},{key:"getCompletedIssues",value:function getCompletedIssues(){var issues=[];var _iteratorNormalCompletion22=true;var _didIteratorError22=false;var _iteratorError22=undefined;try{for(var _iterator22=window.resources.issues[Symbol.iterator](),_step22;!(_iteratorNormalCompletion22=(_step22=_iterator22.next()).done);_iteratorNormalCompletion22=true){var issue=_step22.value;if(issue.milestone==this.model.index&&issue.isClosed()){issues.push(issue);}}}catch(err){_didIteratorError22=true;_iteratorError22=err;}finally {try{if(!_iteratorNormalCompletion22&&_iterator22.return){_iterator22.return();}}finally {if(_didIteratorError22){throw _iteratorError22;}}}return issues;} /**
     * Gets a list of all issues
     */},{key:"getIssues",value:function getIssues(){var issues=[];var _iteratorNormalCompletion23=true;var _didIteratorError23=false;var _iteratorError23=undefined;try{for(var _iterator23=window.resources.issues[Symbol.iterator](),_step23;!(_iteratorNormalCompletion23=(_step23=_iterator23.next()).done);_iteratorNormalCompletion23=true){var issue=_step23.value;if(issue.milestone==this.model.index){issues.push(issue);}}}catch(err){_didIteratorError23=true;_iteratorError23=err;}finally {try{if(!_iteratorNormalCompletion23&&_iterator23.return){_iterator23.return();}}finally {if(_didIteratorError23){throw _iteratorError23;}}}return issues;}}]);return MilestoneEditor;}(View);module.exports=MilestoneEditor;},{"../templates/MilestoneEditor":27}],36:[function(require,module,exports){'use strict'; /**
 * The navbar view
 *
 * @class View Navbar
 */var Navbar=function(_View5){_inherits(Navbar,_View5);function Navbar(params){_classCallCheck(this,Navbar);var _this62=_possibleConstructorReturn(this,Object.getPrototypeOf(Navbar).call(this,params));_this62.template=require('../templates/Navbar');_this62.fetch();return _this62;} /**
     * Gets a list of links
     */_createClass(Navbar,[{key:"getLinks",value:function getLinks(){var links=[];links.push({url:'/',class:'logo',handler:this.toggleAboutPanel});links.push({url:'/source/',handler:this.toggleSourcePanel,icon:'user'});links.push({url:'/projects/',handler:this.toggleProjectsList,icon:'folder'});links.push({separator:true});links.push({url:'/settings/',icon:'cog'});links.push({url:'/plan/',icon:'calendar'});links.push({url:'/board/kanban/',icon:'columns'});links.push({url:'/board/list/',icon:'list'});return links;} /**
     * Cleans up extra added classes
     */},{key:"cleanUpClasses",value:function cleanUpClasses(){this.$element.toggleClass('project-list',false);this.$element.toggleClass('source-panel',false);this.$element.toggleClass('about-panel',false);} /**
     * Toggles a panel
     */},{key:"togglePanel",value:function togglePanel(url,className,onActive,isActive){var $button=this.$element.find('.buttons button[data-url="'+url+'"]');var $content=this.$element.find('.obscure .content');if(isActive!=true&&isActive!=false){isActive=!$button.hasClass('active');}$content.empty();this.$element.find('.buttons button.handler').toggleClass('active',false);$button.toggleClass('active',isActive);this.$element.toggleClass('out',isActive);this.$element.toggleClass(className,isActive);if(isActive){onActive($content);}else {$content.empty();}} /**
     * Toggles the about panel
     */},{key:"toggleAboutPanel",value:function toggleAboutPanel(isActive){this.togglePanel('/','about-panel',function($content){$.get('/README.md',function(res){$content.append(markdownToHtml(res));});},isActive);} /**
     * Toggles the source panel
     */},{key:"toggleSourcePanel",value:function toggleSourcePanel(isActive){var _this63=this;this.togglePanel('/source/','source-panel',function($content){ApiHelper.getUser().then(function(user){$content.append([_.div({class:'current-user'},_.img({src:user.avatar}),_.p(user.name),_.button({class:'btn'},'Log out').click(function(e){e.preventDefault();ApiHelper.logOut();}))]);}).catch(function(e){debug.error(e,_this63);});},isActive);} /**
     * Toggles the projects list
     */},{key:"toggleProjectsList",value:function toggleProjectsList(isActive,overrideUrl){var _this64=this;this.togglePanel('/projects/','project-list',function($content){ApiHelper.getProjects().then(function(){$content.empty().append(_.each(window.resources.projects,function(i,project){return new ProjectEditor({model:project,overrideUrl:overrideUrl}).$element;}));}).catch(function(e){debug.error(e,_this64);});},isActive);} /**
     * Gets the full router URL
     *
     * @param {String} url
     *
     * @returns {String} url
     */},{key:"getFullUrl",value:function getFullUrl(url){ // Prepend project
url='/'+ApiHelper.getProjectName()+url; // Prepend user
url='/'+ApiHelper.getUserName()+url;return url;} /**
     * Event: Click on a link
     *
     * @param {String} url
     */},{key:"onClickLink",value:function onClickLink(url){this.cleanUpClasses();this.$element.find('.obscure .content').empty();if(!ApiHelper.getProjectName()){ViewHelper.get('Navbar').toggleProjectsList(true,url);}else {url=this.getFullUrl(url);if(url!=Router.url){this.$element.toggleClass('out',true);resources={};setTimeout(function(){location.hash=url;},400);}}} /**
     * Slide navbar in
     */},{key:"slideIn",value:function slideIn(){if(Router.url){var url=Router.url.replace('/'+ApiHelper.getUserName(),'').replace('/'+ApiHelper.getProjectName(),'');this.$element.find('button.active').removeClass('active');this.$element.find('button[data-url*="'+url+'"]').toggleClass('active',true);this.$element.toggleClass('out',false);$('.navbar .obscure .content').empty();}}}]);return Navbar;}(View);module.exports=Navbar;},{"../templates/Navbar":28}],37:[function(require,module,exports){'use strict';var PlanEditor=function(_View6){_inherits(PlanEditor,_View6);function PlanEditor(params){_classCallCheck(this,PlanEditor);var _this65=_possibleConstructorReturn(this,Object.getPrototypeOf(PlanEditor).call(this,params));_this65.currentYear=new Date().getFullYear();_this65.currentMonth=new Date().getMonth()+1;if(_this65.currentMonth.length==1){_this65.currentMonth='0'+_this65.currentMonth;}_this65.template=require('../templates/PlanEditor');_this65.init();return _this65;}_createClass(PlanEditor,[{key:"onClickYear",value:function onClickYear(year){this.currentYear=parseInt(year);this.render();}},{key:"onClickMonth",value:function onClickMonth(month){this.currentMonth=parseInt(month);this.render();}},{key:"updateUndatedBox",value:function updateUndatedBox(){if(this.getUndatedMilestones().length<1){$('.plan-editor .undated').remove();}}},{key:"getUndatedMilestones",value:function getUndatedMilestones(){var milestones=[];var _iteratorNormalCompletion24=true;var _didIteratorError24=false;var _iteratorError24=undefined;try{for(var _iterator24=resources.milestones[Symbol.iterator](),_step24;!(_iteratorNormalCompletion24=(_step24=_iterator24.next()).done);_iteratorNormalCompletion24=true){var milestone=_step24.value;if(!milestone.endDate){milestones.push(milestone);}}}catch(err){_didIteratorError24=true;_iteratorError24=err;}finally {try{if(!_iteratorNormalCompletion24&&_iterator24.return){_iterator24.return();}}finally {if(_didIteratorError24){throw _iteratorError24;}}}return milestones;}},{key:"getYears",value:function getYears(){var years=[];for(var i=new Date().getFullYear()-2;i<new Date().getFullYear()+4;i++){years.push({number:i});}return years;}},{key:"getMonths",value:function getMonths(){var months=[];for(var i=1;i<=12;i++){var num=i.toString();if(num.length==1){num='0'+num;}months.push({name:new Date('2016-'+num+'-01').getMonthName(),number:i});}return months;}},{key:"getWeekDays",value:function getWeekDays(){var weekdays=['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];return weekdays;}},{key:"onClickAddMilestone",value:function onClickAddMilestone(date){var _this66=this;if(ApiHelper.isSpectating()){return;}spinner(true);ResourceHelper.addResource('milestones',{title:'New milestone',endDate:date.toISOString()}).then(function(){_this66.render();spinner(false);});}},{key:"getWeeks",value:function getWeeks(){var weeks=[];var firstDay=new Date(this.currentYear,this.currentMonth,1);var firstWeek=firstDay.getWeek();var _iteratorNormalCompletion25=true;var _didIteratorError25=false;var _iteratorError25=undefined;try{for(var _iterator25=this.getDates()[Symbol.iterator](),_step25;!(_iteratorNormalCompletion25=(_step25=_iterator25.next()).done);_iteratorNormalCompletion25=true){var date=_step25.value;if(weeks.indexOf(date.getWeek())<0){weeks.push(date.getWeek());}}}catch(err){_didIteratorError25=true;_iteratorError25=err;}finally {try{if(!_iteratorNormalCompletion25&&_iterator25.return){_iterator25.return();}}finally {if(_didIteratorError25){throw _iteratorError25;}}}return weeks;}},{key:"getDates",value:function getDates(){var year=this.currentYear;var month=this.currentMonth;var dates=[];for(var i=1;i<=new Date(year,month,0).getDate();i++){var day=i.toString();if(day.length==1){day='0'+day;}if(month.toString().length==1){month='0'+month;}var date=new Date(year+'-'+month+'-'+day).floor();dates.push(date);}return dates;}},{key:"getDate",value:function getDate(week,weekday){var _iteratorNormalCompletion26=true;var _didIteratorError26=false;var _iteratorError26=undefined;try{for(var _iterator26=this.getDates()[Symbol.iterator](),_step26;!(_iteratorNormalCompletion26=(_step26=_iterator26.next()).done);_iteratorNormalCompletion26=true){var date=_step26.value;if(date.getWeek()==week&&date.getISODay()==weekday){return date;}}}catch(err){_didIteratorError26=true;_iteratorError26=err;}finally {try{if(!_iteratorNormalCompletion26&&_iterator26.return){_iterator26.return();}}finally {if(_didIteratorError26){throw _iteratorError26;}}}}},{key:"iterateDates",value:function iterateDates(renderFunction){var weekdays=this.getWeekDays();var weeks=this.getWeeks();var renders=[];for(var y=0;y<6;y++){for(var x=0;x<7;x++){var weekday=weekdays[x];var week=weeks[y];if(week&&weekday){var date=this.getDate(week,x);renders.push(renderFunction(date));}else {renders.push(renderFunction());}}}return renders;}}]);return PlanEditor;}(View);module.exports=PlanEditor;},{"../templates/PlanEditor":29}],38:[function(require,module,exports){'use strict';var PlanItemEditor=function(_View7){_inherits(PlanItemEditor,_View7);function PlanItemEditor(params){_classCallCheck(this,PlanItemEditor);var _this67=_possibleConstructorReturn(this,Object.getPrototypeOf(PlanItemEditor).call(this,params));_this67.template=require('../templates/PlanItemEditor');_this67.fetch();return _this67;} /**
     * Opens this milestone as a dialog
     */_createClass(PlanItemEditor,[{key:"openDialog",value:function openDialog(){var _this68=this;var prev={x:this.$element.offset().left,y:this.$element.offset().top,w:this.$element.width(),h:this.$element.height(),$parent:this.$element.parent()};this.positionBuffer=prev;$('body').append(this.$element);this.$element.css({position:'absolute',left:prev.x,top:prev.y,width:prev.w,height:prev.h,transition:'all 0.5s ease',overflow:'hidden'});setTimeout(function(){_this68.$element.removeAttr('style');_this68.$element.css({position:'absolute',left:'50%',top:'100px',transform:'translateX(-50%)',transition:'all 0.5s ease'});},1);} /**
     * Event: Change
     */},{key:"onChange",value:function onChange(){var _this69=this;var dateString=this.$element.parents('.date').attr('data-date'); // Update model data with new information based on DOM location
this.model.title=this.$element.find('.header input').val();this.model.description=this.$element.find('.body input').val();if(dateString){var date=new Date(dateString);this.model.endDate=date.getSimpleString();} // Update DOM elements to match model
this.$element.find('.drag-handle').text(this.model.title);console.log(dateString,this.model.endDate); // Start loading
this.$element.toggleClass('loading',true);ResourceHelper.updateResource('milestones',this.model).then(function(){_this69.$element.toggleClass('loading',false);});} /**
     * Event: Click delete button
     */},{key:"onClickDelete",value:function onClickDelete(){spinner(true);ResourceHelper.removeResource('milestones',this.model.index).then(function(){ViewHelper.removeAll('PlanItemEditor');ViewHelper.get('PlanEditor').render();spinner(false);});} /**
     * Event: Click close button
     */},{key:"onClickClose",value:function onClickClose(){var _this70=this;var prev=this.positionBuffer;this.$element.removeAttr('style');this.$element.css({position:'absolute',left:prev.x,top:prev.y,width:prev.w,height:prev.h,transition:'all 0.5s ease',overflow:'hidden'});setTimeout(function(){prev.$parent.prepend(_this70.$element);_this70.$element.removeAttr('style');},550);} /**
     * Event: Click OK button
     */},{key:"onClickOK",value:function onClickOK(){this.onChange();this.onClickClose();} /**
     * Event: Release the dragging handle
     */},{key:"onReleaseDragHandle",value:function onReleaseDragHandle(e){ // Unregister mouse events
$(document).off('mouseup').off('mousemove'); // Unset temporary classes and styling
$('.plan-container').toggleClass('dragging',false);this.$element.removeAttr('style');this.$element.find('button, input').removeAttr('style'); // Find new target element
var $target=$('.hovering').first(); // Unregister hover mouse events and unset hovering state
$('.plan-editor .dates .date, .tab.year, .tab.month').off('mouseenter').off('mouseleave').toggleClass('hovering',false); // If the dragging event lasted less than 100 ms, open dialog
if(Date.now()-this.prevClick<100){this.openDialog();}else if($target.length>0){ // If the element was dropped onto a date
if($target.hasClass('date')){ // Place this element into the hovered date container
$target.find('.body').prepend(this.$element); // Trigger the change event
this.onChange(); // Special logic for tabs
}else {var endDate=this.model.endDate; // Init a date from the current tabs if no date is present
if(!endDate){endDate=new Date('1 '+$('.tab.month.active').text()+' '+$('.tab.year.active').text()); // Make sure the date is not a string 
}else if(endDate.constructor===String){endDate=new Date(this.model.endDate);} // If the element was dropped onto a month tab
if($target.hasClass('month')){endDate=new Date('1 '+$target.text()+' '+endDate.getFullYear()); // If the element was dropped onto a year tab
}else if($target.hasClass('year')){endDate=new Date('1 '+$('.tab.month.active').text()+' '+$target.text());} // Convert date to ISO string
this.model.endDate=endDate.floor().toISOString(); // Hide element
this.$element.hide();ResourceHelper.updateResource('milestones',this.model).then(function(){ // Follow the tab destination
$target.click();});} // Update the undated box
ViewHelper.get('PlanEditor').updateUndatedBox();}} /**
     * Event: Click the dragging handle
     */},{key:"onClickDragHandle",value:function onClickDragHandle(e){var _this71=this; // Cache the previous click
this.prevClick=Date.now(); // Set class on board container
$('.plan-container').toggleClass('dragging',true); // Apply temporary CSS properties
this.$element.css({top:this.$element.offset().top,left:this.$element.offset().left,width:this.$element.outerWidth(),height:this.$element.outerHeight(),'pointer-events':'none','z-index':999});this.$element.find('button, input').css({'pointer-events':'none'}); // Find the offset parent
var $offsetParent=this.$element.parents('.dates');var offsetDOM=$offsetParent.offset();if($offsetParent.length<1){$offsetParent=this.$element.parents('.undated');offsetDOM=$offsetParent.offset();offsetDOM.top+=this.$element.height();} // Buffer the offset between mouse cursor and element position
var offset={x:this.$element.offset().left-e.pageX-offsetDOM.left,y:this.$element.offset().top-e.pageY-offsetDOM.top}; // Add absolute positioning afterwards to allow getting proper offset
this.$element.css({position:'absolute'}); // Buffer previous pointer location
var prev={x:e.pageX,y:e.pageY}; // Date mouse hover events
$('.plan-editor .dates .date, .tab.year, .tab.month').on('mouseenter',function(){$(this).toggleClass('hovering',true);}).on('mouseleave',function(){$(this).toggleClass('hovering',false);}); // Document pointer movement logic
$(document).off('mousemove').on('mousemove',function(e){ // Get current pointer location
var current={x:e.pageX,y:e.pageY}; // Apply new CSS positioning values
_this71.$element.css({top:current.y+offset.y,left:current.x+offset.x}); // Replace previous position buffer data
prev=current;}); // Document pointer release mouse button logic
$(document).off('mouseup').on('mouseup',function(e){_this71.onReleaseDragHandle(e);});}}]);return PlanItemEditor;}(View);module.exports=PlanItemEditor;},{"../templates/PlanItemEditor":30}],39:[function(require,module,exports){'use strict';var ProjectEditor=function(_View8){_inherits(ProjectEditor,_View8);function ProjectEditor(params){_classCallCheck(this,ProjectEditor);var _this72=_possibleConstructorReturn(this,Object.getPrototypeOf(ProjectEditor).call(this,params));_this72.template=require('../templates/ProjectEditor');_this72.fetch();return _this72;}_createClass(ProjectEditor,[{key:"onClick",value:function onClick(){if(this.overrideUrl){location.hash='/'+ApiHelper.getUserName()+'/'+this.model.title+this.overrideUrl;}else if(Router.params.project){location.hash=location.hash.replace('#','').replace(Router.params.project,this.model.title);}else {location.hash='/'+ApiHelper.getUserName()+'/'+this.model.title+'/board/kanban/';}}}]);return ProjectEditor;}(View);module.exports=ProjectEditor;},{"../templates/ProjectEditor":31}],40:[function(require,module,exports){'use strict';var ResourceEditor=function(_View9){_inherits(ResourceEditor,_View9);function ResourceEditor(params){_classCallCheck(this,ResourceEditor);var _this73=_possibleConstructorReturn(this,Object.getPrototypeOf(ResourceEditor).call(this,params));_this73.template=require('../templates/ResourceEditor');_this73.fetch();return _this73;}_createClass(ResourceEditor,[{key:"onClickRemove",value:function onClickRemove(index){var _this74=this;ResourceHelper.removeResource(this.name,index).then(function(){_this74.render();});}},{key:"onClickAdd",value:function onClickAdd(name){var _this75=this;if(name){ResourceHelper.addResource(this.name,name).then(function(){_this75.render();});}}},{key:"onChange",value:function onChange(index,identifier){var _this76=this;var value=this.$element.find('.item').eq(index).find('input').val();ResourceHelper.updateResource(this.name,value,index,identifier).then(function(){_this76.render();});}}]);return ResourceEditor;}(View);module.exports=ResourceEditor;},{"../templates/ResourceEditor":32}]},{},[15]);
//# sourceMappingURL=public/js/maps/client.js.map
