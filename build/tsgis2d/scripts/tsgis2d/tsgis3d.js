define(function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "4748b727c3c5072eaada"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 2;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(15)(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @class classUtil: 定义类型工具，实现类型继承
 *  Created by ligang on 2014/8/13.
 *  @modify }{yellow 
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

    var id = 10000;

    var util = function util() {};

    util.extend = function (child, parent) {
        var F = function F() {};
        F.prototype = parent.prototype;
        child.prototype = new F();
        child.prototype.constructor = child;
        child.uber = parent.prototype;
    };

    util.extend2 = function (child, parent) {
        var p = parent.prototype;
        var c = child.prototype;
        for (var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
    };

    util.isArray = function (obj) {
        return !!obj && obj.constructor == Array;
    };

    util.newId = function () {
        return id++;
    };

    util.extendCopy = function (p) {
        var c = {};
        for (var i in p) {
            c[i] = p[i];
        }
        c.uber = p;
        return c;
    };

    util.deepCopy = deepCopy;

    util.objectPlus = function (o, stuff) {
        var n;
        function F() {};
        F.prototype = o;
        n = new F();
        n.uber = o;

        for (var i in stuff) {
            n[i] = stuff[i];
        }

        return n;
    };

    util.extendMulti = function () {
        var n = {},
            stuff,
            j = 0,
            len = arguments.length;
        for (j = 0; j < len; j++) {
            stuff = arguments[j];
            for (var i in stuff) {
                n[i] = stuff[i];
            }
        }
        return n;
    };

    function deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (_typeof(p[i]) === 'object') {
                c[i] = p[i].constructor === Array ? [] : {};
                deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }

    return util;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class Map: 地图类型，基类
 * Created by ligang on 2014/9/16.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

    /****
     * 定义地图要处理的事件列表
     * @returns 返回事件列表
     */
    function createEvents() {
        var events = {};
        events.click = [];
        events.mousemove = [];
        events.mouseout = [];
        events.mousedown = [];
        events.mouseup = [];
        events.dblclick = [];
        events.extentchanged = [];
        events.resize = [];
        return events;
    }

    var map = function map() {
        this.layers = [];
        this.tool = null;
        this.cursor = null;
        this.events = createEvents();
    };

    /*/!****定义地图图层列表*!/
    map.prototype.layers = [];
      /!****定义地图工具对象*!/
    map.prototype.tool = null;
      /!****定义地图鼠标的图标*!/
    map.prototype.cursor = null;
      /!***定义地图事件列表*!/
    map.prototype.events = createEvents();*/
    /***
     * 定义带参数的地图初始化
     * @param Anonymous opts 包含初始化参数的复杂对象
     */
    map.prototype.init = function (opts) {};

    /***
     * 定义添加图层方法
     * @param layer 添加的图层
     */
    map.prototype.addLayer = function (layer) {
        this.layers.push(layer);
    };
    /***
     * 获取可视范转
     */
    map.prototype.getExtent = function () {};
    /***
     * 删除图层
     * @param layer 要删除的图层
     */
    map.prototype.removeLayer = function (layer) {
        var index = this.layers.indexOf(layer);
        if (index > 0) {
            this.layers.splice(index, 1);
        }
    };
    /***
     * 设置鼠标样式
     * @param cursor 鼠标样式
     */
    map.prototype.setCursor = function (cursor) {};
    /***
     * 返回地图窗口尺寸 px单位
     */
    map.prototype.getViewSize = function () {};
    /***
     * 获取图层数量
     * @returns 返回图层数量
     */
    map.prototype.getLayerCount = function () {
        return this.layers.length;
    };

    /***
     * 获取指定索引位置的图层
     * @param index 索引
     * @returns 返回图层
     */
    map.prototype.getLayer = function (index) {
        return this.layers[index];
    };

    /***
     * 获取所有图层
     * @returns 返回图层数组
     */
    map.prototype.getLayers = function () {
        return this.layers;
    };

    /***
     * 获取地图缩放级别
     */
    map.prototype.getZoomLevel = function () {};

    /***
     * 获取分辨率
     */
    map.prototype.getResolution = function () {};

    /***
     * 获取坐标原点
     */
    map.prototype.getOrigin = function () {};

    /***
     * 查找图层
     * @param String name 图层名称
     * @returns {*}
     */
    map.prototype.findLayer = function (name) {
        for (var i = 0; i < this.layers.length; ++i) {
            var layer = this.layers[i];
            if (layer.name == name || layer.id == name) {
                return layer;
            }
        }
        return null;
    };

    /***
     * 监听指定名称的鼠标事件并设置关联的事件处理方法
     * @param String name 事件名称
     * @param Function func 处理方法名称
     */
    map.prototype.on = function (name, func) {
        if (name in this.events) {
            var events = this.events[name];
            events.push(func);
        }
    };

    /***
     * 取消监听指定名称的鼠标事件并取消事件处理方法的关联
     * @param String name 事件名称
     * @param Function func 处理方法名称
     */
    map.prototype.un = function (name, func) {
        if (name in this.events) {
            var events = this.events[name];
            for (var i = 0, len = events.length; i < len; ++i) {
                var event = events[i];
                if (event === func) {
                    events.splice(i, 1);
                    i--;
                    len--;
                }
            }
        }
    };

    /***
     * 地图缩放到空间数据定义的全图范围
     */
    map.prototype.fullExtend = function () {};

    /***
     * 地图缩小
     */
    map.prototype.zoomOut = function () {};

    /***
     * 地图放大
     */
    map.prototype.zoomIn = function () {};

    /***
     * 平移几何图形对象
     * @param geometry
     */
    map.prototype.pan = function (geometry) {};

    /***
     * 设定指定的坐标点为地图中心点
     * @param Point center 地理坐标点
     */
    map.prototype.setCenter = function (center) {};

    /***
     * 获取指定的地理坐标点显示在屏幕上的位置
     * @param Point coordinate 地理坐标点
     */
    map.prototype.getPixelFromCoordinate = function (coordinate) {};

    /***
     * 获取屏幕上指定像素点对应的地理坐标点
     * @param Point pixel 屏幕像素点坐标
     */
    map.prototype.getCoordinateFromPixel = function (pixel) {};

    /***
     * 导出
     * @param name 导出名称
     */
    map.prototype.export = function (name) {};

    /***
     * 停目拖拽
     */
    map.prototype.stopDragPan = function () {};

    /**
     * 继续拖拽
     */
    map.prototype.resumeDragpan = function () {};

    /***
     * 停止双击
     */
    map.prototype.stopDbClick = function () {};

    /***
     * 继续双击
     */
    map.prototype.resumeDbClick = function () {};

    /***
    * 添加地图相关控件
    * @param ol.control.Control
    */
    map.prototype.addControl = function (ctl) {};
    /***
     * 当前正在使用的地图工具
     * @param ToolBase tool
     */
    map.prototype.currentTool = function (tool) {
        if (this.tool != tool) {
            if (this.tool != null) {
                this.tool.deactivate();
            }
            this.tool = tool;
            if (this.tool != null) {
                this.cursor = this.tool.cursor;
            }
        }
    };

    /***
     * 鼠标单击事件
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseClick = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseClick(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /****
     * 鼠标悬停事件
     * @param Event e 事件对象
     */
    map.prototype.onMouseOver = function (e) {
        if (this.tool != null) {
            this.tool.onMouseOver(e);
        }
    };

    /***
     * 鼠标按键按下时的事件处理方法
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseDown = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseDown(button, shift, screenX, screenY, mapX, mapY, handle);
        }

        for (var i = 0; i < this.events.mousedown.length; ++i) {
            var event = this.events.mousedown[i];
            event(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /****
     * 鼠标按键按下后抬起的事件的处理方法
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseUp = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseUp(button, shift, screenX, screenY, mapX, mapY, handle);
        }

        for (var i = 0; i < this.events.mouseup.length; ++i) {
            var event = this.events.mouseup[i];
            event(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /***
     * 鼠标移动事件处理方法
     * @param Number button 按下的鼠标按键
     * @param Number shift 是否同时按下的键盘上的shift键
     * @param Number screenX 事件发生时鼠标在屏幕上的X坐标
     * @param Number screenY 事件发生时鼠标在屏幕上的Y坐标
     * @param Number mapX 鼠标在地图上的X坐标
     * @param Number mapY 鼠标在地图上的Y坐标
     * @param Number handle 该事件是否已经不需要再处理
     */
    map.prototype.onMouseMove = function (button, shift, screenX, screenY, mapX, mapY, handle) {
        if (!!this.tool) {
            this.tool.onMouseMove ? this.tool.onMouseMove(button, shift, screenX, screenY, mapX, mapY, handle) : null;
        }

        for (var i = 0; i < this.events.mousemove.length; ++i) {
            var event = this.events.mousemove[i];
            event(button, shift, screenX, screenY, mapX, mapY, handle);
        }
    };

    /***
     * 地图可视范围改变事件
     * @param Number left 左上角X坐标
     * @param Number top 左上角Y坐标
     * @param Number right 右下角X坐标
     * @param Number bottom 右下角Y坐标
     */
    map.prototype.onExtentChanged = function (left, top, right, bottom) {
        if (!!this.tool) {
            this.tool.onExtentChanged ? this.tool.onExtentChanged(left, top, right, bottom) : null;
        }

        for (var i = 0; i < this.events.extentchanged.length; ++i) {
            var event = this.events.extentchanged[i];
            event(left, top, right, bottom);
        }
    };

    /***
     * 鼠标双击事件
     * @param Event e 事件对象
     */
    map.prototype.onDblclick = function (e) {
        if (this.tool != null) {
            this.tool.onDblclick(e);
        }
    };

    /***
     * 浏览器窗口大小改变事件
     * @param Number width 新的窗口宽度
     * @param Number height 新的窗口高度
     */
    map.prototype.onResize = function (width, height) {};

    /***
     * 地图获得焦点的事件
     * @param Event e 事件对象
     */
    map.prototype.onFocus = function (e) {};
    /***
     * 移除地图相关的交互
     */
    map.prototype.removeInteractions = function () {};
    /***
     * 重置地图相关的交互
     */
    map.prototype.resumeInteractions = function () {};

    return map;
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class GeometryType: 几何图形类型枚举
 * Created by ligang on 2014/9/15.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

  return {
    /***不指定具体形状类别的图形*/
    Geometry: 0,
    /***点状图形*/
    Point: 1,
    /***圆弧状图形*/
    Curve: 2,
    /***段状图形*/
    Segment: 3,
    /***矩形*/
    Envelope: 4,
    /***线形*/
    Line: 5,
    /***方形*/
    Rectangle: 6,
    /***正方形*/
    Square: 7,
    /***圆形*/
    Circle: 8,
    /***椭圆形*/
    Ellipse: 9,
    /***多个点表示的路径*/
    Path: 10,
    /***由一系列的点构成的环状闭合图形*/
    Ring: 11,
    /***多圆弧图形*/
    PolyCurve: 12,
    /***一个或多个路径状图形表示的空间几何图形*/
    Polyline: 13,
    /***一个或者多个环状图形表示的空间几何图形*/
    Polygon: 14,
    /**
     * 多点
     */
    MultiPoint: 15,
    /**
     * 多面
     */
    MultiPolygon: 16
  };
}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    var globe = function globe() {};
    return globe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(6), __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GeometryType, Geometry, Map, Globe) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.geom = g2.geom || {};
    g2.maps = g2.maps || {};
    g2.geom.GeometryType = GeometryType;
    g2.geom.Geometry = Geometry;
    g2.maps.IMap = Map;
    g2.maps.IGlobe = Globe;
    g2.maps.Globeddd55 = Globe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ClassUtil) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.lang = g2.lang || {};
    g2.lang.ClassUtil = ClassUtil;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * @class Geometry: 所有空间几何图形的基类型
 * Created by ligang on 2014/8/21.
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (GeometryType) {
    var geometry = function geometry(opts) {
        this.$type = 'Geometry,http://www.Gs.com';
        var optss = opts || {};
        /***空间数据参考，如要查看更多资料，请参见enumSpatialReference枚举。*/
        this.spatialReference = optss.spatialReference;
    };

    /***浮点数类型计算精度，保留4位小数*/
    geometry.tolerate = 0.000000000001;

    /***
     * 设置空间数据参考
     * @param Number sr 新的空间数据参考
     */
    geometry.prototype.setSpatialReference = function (sr) {
        this.spatialReference = sr;
    };

    /****
     * 获取空间数据参考
     * @returns 返回整数形式表示的空间数据参考
     */
    geometry.prototype.getSpatialReference = function () {
        return this.spatialReference;
    };

    /***
     * 获取几何图形类型，如要查看更多资料，请参见GeometryType枚举。
     * @returns 返回GeometryType枚举
     */
    geometry.prototype.getGeometryType = function () {
        return GeometryType.Geometry;
    };

    /***空间数据参考值*/
    geometry.prototype.spatialReference = 0;

    /***
     * 比较两个几何图形对象是否相同
     * @param Geometry obj 比较的几何图形对象
     * @returns 返回true表示相同，返回false表示不同
     */
    geometry.prototype.equals = function (obj) {
        return false;
    };

    /***
     * 使几何图形正常化、规范化。
     */
    geometry.prototype.normalize = function () {};

    /***
     * 移动几何图形对象
     * @param Point point Geometry对象偏移量
     */
    geometry.prototype.offset = function (point) {};

    /***
     * 克隆对象
     * @returns 返回一个新的Geometry对象
     */
    geometry.prototype.copy = function () {
        return new geometry(this);
    };

    /***
     * 获取当前GIS形状的外接矩形
     */
    geometry.prototype.envelope = function () {};

    return geometry;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function (gis, CMGlobe) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.maps = g2.maps || {};
    g2.maps.Globe = CMGlobe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ClassUtil, Map, Globe) {

    var globe = function globe(opts) {
        var optss = opts || {};
        Globe.call(this, optss);
        Map.call(this, optss);
    };

    ClassUtil.extend2(globe, Globe);
    ClassUtil.extend2(globe, Map);
    return globe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDc0OGI3MjdjM2M1MDcyZWFhZGEiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZzIvbGFuZy9jbGFzc1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL21hcC9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvZ2xvYmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy90c2dpcy9nMi9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2V4cG9ydDNkLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvY20vY21nbG9iZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy90c2dpcy90c2dpczNkLmpzIl0sIm5hbWVzIjpbImlkIiwidXRpbCIsImV4dGVuZCIsImNoaWxkIiwicGFyZW50IiwiRiIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwidWJlciIsImV4dGVuZDIiLCJwIiwiYyIsImkiLCJpc0FycmF5Iiwib2JqIiwiQXJyYXkiLCJuZXdJZCIsImV4dGVuZENvcHkiLCJkZWVwQ29weSIsIm9iamVjdFBsdXMiLCJvIiwic3R1ZmYiLCJuIiwiZXh0ZW5kTXVsdGkiLCJqIiwibGVuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY3JlYXRlRXZlbnRzIiwiZXZlbnRzIiwiY2xpY2siLCJtb3VzZW1vdmUiLCJtb3VzZW91dCIsIm1vdXNlZG93biIsIm1vdXNldXAiLCJkYmxjbGljayIsImV4dGVudGNoYW5nZWQiLCJyZXNpemUiLCJtYXAiLCJsYXllcnMiLCJ0b29sIiwiY3Vyc29yIiwiaW5pdCIsIm9wdHMiLCJhZGRMYXllciIsImxheWVyIiwicHVzaCIsImdldEV4dGVudCIsInJlbW92ZUxheWVyIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwic2V0Q3Vyc29yIiwiZ2V0Vmlld1NpemUiLCJnZXRMYXllckNvdW50IiwiZ2V0TGF5ZXIiLCJnZXRMYXllcnMiLCJnZXRab29tTGV2ZWwiLCJnZXRSZXNvbHV0aW9uIiwiZ2V0T3JpZ2luIiwiZmluZExheWVyIiwibmFtZSIsIm9uIiwiZnVuYyIsInVuIiwiZXZlbnQiLCJmdWxsRXh0ZW5kIiwiem9vbU91dCIsInpvb21JbiIsInBhbiIsImdlb21ldHJ5Iiwic2V0Q2VudGVyIiwiY2VudGVyIiwiZ2V0UGl4ZWxGcm9tQ29vcmRpbmF0ZSIsImNvb3JkaW5hdGUiLCJnZXRDb29yZGluYXRlRnJvbVBpeGVsIiwicGl4ZWwiLCJleHBvcnQiLCJzdG9wRHJhZ1BhbiIsInJlc3VtZURyYWdwYW4iLCJzdG9wRGJDbGljayIsInJlc3VtZURiQ2xpY2siLCJhZGRDb250cm9sIiwiY3RsIiwiY3VycmVudFRvb2wiLCJkZWFjdGl2YXRlIiwib25Nb3VzZUNsaWNrIiwiYnV0dG9uIiwic2hpZnQiLCJzY3JlZW5YIiwic2NyZWVuWSIsIm1hcFgiLCJtYXBZIiwiaGFuZGxlIiwib25Nb3VzZU92ZXIiLCJlIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJvbk1vdXNlTW92ZSIsIm9uRXh0ZW50Q2hhbmdlZCIsImxlZnQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsIm9uRGJsY2xpY2siLCJvblJlc2l6ZSIsIndpZHRoIiwiaGVpZ2h0Iiwib25Gb2N1cyIsInJlbW92ZUludGVyYWN0aW9ucyIsInJlc3VtZUludGVyYWN0aW9ucyIsIkdlb21ldHJ5IiwiUG9pbnQiLCJDdXJ2ZSIsIlNlZ21lbnQiLCJFbnZlbG9wZSIsIkxpbmUiLCJSZWN0YW5nbGUiLCJTcXVhcmUiLCJDaXJjbGUiLCJFbGxpcHNlIiwiUGF0aCIsIlJpbmciLCJQb2x5Q3VydmUiLCJQb2x5bGluZSIsIlBvbHlnb24iLCJNdWx0aVBvaW50IiwiTXVsdGlQb2x5Z29uIiwiZ2xvYmUiLCJHZW9tZXRyeVR5cGUiLCJNYXAiLCJHbG9iZSIsIndpbmRvdyIsImcyIiwiZ2VvbSIsIm1hcHMiLCJJTWFwIiwiSUdsb2JlIiwiR2xvYmVkZGQ1NSIsIkNsYXNzVXRpbCIsImxhbmciLCIkdHlwZSIsIm9wdHNzIiwic3BhdGlhbFJlZmVyZW5jZSIsInRvbGVyYXRlIiwic2V0U3BhdGlhbFJlZmVyZW5jZSIsInNyIiwiZ2V0U3BhdGlhbFJlZmVyZW5jZSIsImdldEdlb21ldHJ5VHlwZSIsImVxdWFscyIsIm5vcm1hbGl6ZSIsIm9mZnNldCIsInBvaW50IiwiY29weSIsImVudmVsb3BlIiwiZ2lzIiwiQ01HbG9iZSIsImNhbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQTJEO0FBQzNEO0FBQ0E7QUFDQSxXQUFHOztBQUVILG9EQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7OztBQUlBO0FBQ0Esc0RBQThDO0FBQzlDO0FBQ0E7QUFDQSxvQ0FBNEI7QUFDNUIscUNBQTZCO0FBQzdCLHlDQUFpQzs7QUFFakMsK0NBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUFzQztBQUN0QztBQUNBO0FBQ0EscUNBQTZCO0FBQzdCLHFDQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQW9CLGdCQUFnQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQSw0REFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQW1CLDJCQUEyQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBa0IsY0FBYztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFD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VyxJQUFYLEVBQWdCZixLQUFoQjtBQUNBWixZQUFJMkIsSUFBSixDQUFTLElBQVQsRUFBY2YsS0FBZDtBQUNILEtBSkQ7O0FBTUFILGNBQVVsSSxPQUFWLENBQWtCdUgsS0FBbEIsRUFBd0JHLEtBQXhCO0FBQ0FRLGNBQVVsSSxPQUFWLENBQWtCdUgsS0FBbEIsRUFBd0JFLEdBQXhCO0FBQ0EsV0FBT0YsS0FBUDtBQUNILENBWEQ7QUFBQSxxRzs7Ozs7Ozs7OztBQ0hBOzs7QUFHQSxpQ0FBTyxDQUFDLHNCQUFELEVBQWUsdUJBQWYsQ0FBUCxrQ0FBd0MsWUFBVSxDQUVqRCxDQUZEO0FBQUEscUciLCJmaWxlIjoidHNnaXMzZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH0gO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHQ7XHJcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRyZXF1ZXN0VGltZW91dCA9IHJlcXVlc3RUaW1lb3V0IHx8IDEwMDAwO1xyXG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuIFx0XHRcdGlmKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0cmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnRcIikpO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0dmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XHJcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XHJcbiBcdFx0XHRcdHJlcXVlc3QudGltZW91dCA9IHJlcXVlc3RUaW1lb3V0O1xyXG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRpZihyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcclxuIFx0XHRcdFx0aWYocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcclxuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XHJcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIHRpbWVkIG91dC5cIikpO1xyXG4gXHRcdFx0XHR9IGVsc2UgaWYocmVxdWVzdC5zdGF0dXMgPT09IDQwNCkge1xyXG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcclxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcbiBcdFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcclxuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXHJcbiBcdFx0XHRcdFx0cmVqZWN0KG5ldyBFcnJvcihcIk1hbmlmZXN0IHJlcXVlc3QgdG8gXCIgKyByZXF1ZXN0UGF0aCArIFwiIGZhaWxlZC5cIikpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcclxuIFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZSkge1xyXG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH07XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuXG4gXHRcclxuIFx0XHJcbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcclxuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI0NzQ4YjcyN2MzYzUwNzJlYWFkYVwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RSZXF1ZXN0VGltZW91dCA9IDEwMDAwO1xyXG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcclxuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdGlmKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XHJcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xyXG4gXHRcdFx0aWYobWUuaG90LmFjdGl2ZSkge1xyXG4gXHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XHJcbiBcdFx0XHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpIDwgMClcclxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpIDwgMClcclxuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xyXG4gXHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVxdWVzdCArIFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArIG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xyXG4gXHRcdH07XHJcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9O1xyXG4gXHRcdGZvcih2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiYgbmFtZSAhPT0gXCJlXCIpIHtcclxuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKVxyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xyXG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xyXG4gXHRcdFx0XHR0aHJvdyBlcnI7XHJcbiBcdFx0XHR9KTtcclxuIFx0XHJcbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XHJcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcclxuIFx0XHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xyXG4gXHRcdFx0XHRcdGlmKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZihob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH07XHJcbiBcdFx0cmV0dXJuIGZuO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBob3QgPSB7XHJcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXHJcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcclxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxyXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXHJcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcclxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxyXG4gXHRcclxuIFx0XHRcdC8vIE1vZHVsZSBBUElcclxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcclxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRcdGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXHJcbiBcdFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcclxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2VcclxuIFx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcclxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXHJcbiBcdFx0XHRjaGVjazogaG90Q2hlY2ssXHJcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXHJcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0aWYoIWwpIHJldHVybiBob3RTdGF0dXM7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcclxuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXHJcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cclxuIFx0XHR9O1xyXG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcclxuIFx0XHRyZXR1cm4gaG90O1xyXG4gXHR9XHJcbiBcdFxyXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcclxuIFx0dmFyIGhvdFN0YXR1cyA9IFwiaWRsZVwiO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xyXG4gXHRcdGhvdFN0YXR1cyA9IG5ld1N0YXR1cztcclxuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRob3RTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdC8vIHdoaWxlIGRvd25sb2FkaW5nXHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xyXG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XHJcbiBcdHZhciBob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90RGVmZXJyZWQ7XHJcbiBcdFxyXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cclxuIFx0dmFyIGhvdFVwZGF0ZSwgaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcclxuIFx0XHR2YXIgaXNOdW1iZXIgPSAoK2lkKSArIFwiXCIgPT09IGlkO1xyXG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xyXG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJjaGVja1wiKTtcclxuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcclxuIFx0XHRcdGlmKCF1cGRhdGUpIHtcclxuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRcdFx0cmV0dXJuIG51bGw7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xyXG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RBdmFpbGFibGVGaWxlc01hcCA9IHVwZGF0ZS5jO1xyXG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xyXG4gXHRcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcclxuIFx0XHRcdFx0XHRyZXNvbHZlOiByZXNvbHZlLFxyXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xyXG4gXHRcdFx0dmFyIGNodW5rSWQgPSAyO1xyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xyXG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcclxuIFx0XHRpZighZGVmZXJyZWQpIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xyXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXHJcbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XHJcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XHJcbiBcdFx0XHR9KS50aGVuKFxyXG4gXHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHQpO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgY2I7XHJcbiBcdFx0dmFyIGk7XHJcbiBcdFx0dmFyIGo7XHJcbiBcdFx0dmFyIG1vZHVsZTtcclxuIFx0XHR2YXIgbW9kdWxlSWQ7XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFxyXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XHJcbiBcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXHJcbiBcdFx0XHRcdFx0aWQ6IGlkXHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XHJcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX21haW4pIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZighcGFyZW50KSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxyXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcclxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xyXG4gXHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiKTtcclxuIFx0XHR9O1xyXG4gXHRcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQ7XHJcbiBcdFx0XHRcdGlmKGhvdFVwZGF0ZVtpZF0pIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XHJcbiBcdFx0XHRcdGlmKHJlc3VsdC5jaGFpbikge1xyXG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRzd2l0Y2gocmVzdWx0LnR5cGUpIHtcclxuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIiBpbiBcIiArIHJlc3VsdC5wYXJlbnRJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vblVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25BY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRpc3Bvc2VkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRkZWZhdWx0OlxyXG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihhYm9ydEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGRvQXBwbHkpIHtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHRcdFx0XHRmb3IobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcclxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9EaXNwb3NlKSB7XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcclxuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH0pO1xyXG4gXHRcclxuIFx0XHR2YXIgaWR4O1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4gXHRcdFx0XHRjYihkYXRhKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcclxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXHJcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xyXG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYobW9kdWxlKSB7XHJcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdFx0aWYoY2IpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XHJcbiBcdFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcihpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyMikge1xyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yZ2luYWxFcnJvcjogZXJyLCAvLyBUT0RPIHJlbW92ZSBpbiB3ZWJwYWNrIDRcclxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjI7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXHJcbiBcdFx0aWYoZXJyb3IpIHtcclxuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XHJcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcclxuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDE1KShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDc0OGI3MjdjM2M1MDcyZWFhZGEiLCIvKipcclxuICogQGNsYXNzIGNsYXNzVXRpbDog5a6a5LmJ57G75Z6L5bel5YW377yM5a6e546w57G75Z6L57un5om/XHJcbiAqICBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzgvMTMuXHJcbiAqICBAbW9kaWZ5IH17eWVsbG93IFxyXG4gKi9cclxuXHJcbmRlZmluZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGlkID0gMTAwMDA7XHJcblxyXG4gICAgdmFyIHV0aWwgPSBmdW5jdGlvbigpIHt9XHJcblxyXG4gICAgdXRpbC5leHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7XHJcbiAgICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIEYucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgICBjaGlsZC5wcm90b3R5cGUgPSBuZXcgRigpO1xyXG4gICAgICAgIGNoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNoaWxkO1xyXG4gICAgICAgIGNoaWxkLnViZXIgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZXh0ZW5kMiA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHtcclxuICAgICAgICB2YXIgcCA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICAgICAgdmFyIGMgPSBjaGlsZC5wcm90b3R5cGU7XHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcCkge1xyXG4gICAgICAgICAgICBjW2ldID0gcFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy51YmVyID0gcDtcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmlzQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuICghIW9iaiAmJiBvYmouY29uc3RydWN0b3IgPT0gQXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwubmV3SWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGlkKys7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5leHRlbmRDb3B5PSBmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgdmFyIGMgPSB7fTtcclxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwICkge1xyXG4gICAgICAgICAgICBjW2ldID0gcFtpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYy51YmVyID0gcDtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmRlZXBDb3B5ID0gZGVlcENvcHk7XHJcblxyXG4gICAgdXRpbC5vYmplY3RQbHVzID0gZnVuY3Rpb24obywgc3R1ZmYpIHtcclxuICAgICAgICB2YXIgbjtcclxuICAgICAgICBmdW5jdGlvbiBGKCkge307XHJcbiAgICAgICAgRi5wcm90b3R5cGUgPSBvO1xyXG4gICAgICAgIG4gPSBuZXcgRigpO1xyXG4gICAgICAgIG4udWJlciA9IG87XHJcblxyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHN0dWZmKSB7XHJcbiAgICAgICAgICAgIG5baV0gPSBzdHVmZltpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZXh0ZW5kTXVsdGkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbiA9IHt9LCBzdHVmZiwgaiA9IDAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICggaiA9IDA7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICBzdHVmZiA9IGFyZ3VtZW50c1tqXTtcclxuICAgICAgICAgICAgZm9yICggdmFyIGkgaW4gc3R1ZmYpIHtcclxuICAgICAgICAgICAgICAgIG5baV0gPSBzdHVmZltpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWVwQ29weShwLCBjKSB7XHJcbiAgICAgICAgdmFyIGMgPSBjIHx8IHt9O1xyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHAgKSB7XHJcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHBbaV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBjW2ldID0gKHBbaV0uY29uc3RydWN0b3IgPT09IEFycmF5KSA/IFtdIDoge307XHJcbiAgICAgICAgICAgICAgICBkZWVwQ29weShwW2ldLCBjW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNbaV0gPSBwW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB1dGlsO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2cyL2xhbmcvY2xhc3NVdGlsLmpzIiwiLyoqXHJcbiAqIEBjbGFzcyBNYXA6IOWcsOWbvuexu+Wei++8jOWfuuexu1xyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzkvMTYuXHJcbiAqL1xyXG5cclxuZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog5a6a5LmJ5Zyw5Zu+6KaB5aSE55CG55qE5LqL5Lu25YiX6KGoXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuovku7bliJfooahcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZlbnRzKCkge1xyXG4gICAgICAgIHZhciBldmVudHMgPSB7fTtcclxuICAgICAgICBldmVudHMuY2xpY2sgPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2Vtb3ZlID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNlb3V0ID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNlZG93biA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5tb3VzZXVwID0gW107XHJcbiAgICAgICAgZXZlbnRzLmRibGNsaWNrID0gW107XHJcbiAgICAgICAgZXZlbnRzLmV4dGVudGNoYW5nZWQgPSBbXTtcclxuICAgICAgICBldmVudHMucmVzaXplID0gW107XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy50b29sID0gbnVsbDtcclxuICAgICAgICB0aGlzLmN1cnNvciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBjcmVhdGVFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKi8hKioqKuWumuS5ieWcsOWbvuWbvuWxguWIl+ihqCohL1xyXG4gICAgbWFwLnByb3RvdHlwZS5sYXllcnMgPSBbXTtcclxuXHJcbiAgICAvISoqKirlrprkuYnlnLDlm77lt6Xlhbflr7nosaEqIS9cclxuICAgIG1hcC5wcm90b3R5cGUudG9vbCA9IG51bGw7XHJcblxyXG4gICAgLyEqKioq5a6a5LmJ5Zyw5Zu+6byg5qCH55qE5Zu+5qCHKiEvXHJcbiAgICBtYXAucHJvdG90eXBlLmN1cnNvciA9IG51bGw7XHJcblxyXG4gICAgLyEqKirlrprkuYnlnLDlm77kuovku7bliJfooagqIS9cclxuICAgIG1hcC5wcm90b3R5cGUuZXZlbnRzID0gY3JlYXRlRXZlbnRzKCk7Ki9cclxuICAgIC8qKipcclxuICAgICAqIOWumuS5ieW4puWPguaVsOeahOWcsOWbvuWIneWni+WMllxyXG4gICAgICogQHBhcmFtIEFub255bW91cyBvcHRzIOWMheWQq+WIneWni+WMluWPguaVsOeahOWkjeadguWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWumuS5iea3u+WKoOWbvuWxguaWueazlVxyXG4gICAgICogQHBhcmFtIGxheWVyIOa3u+WKoOeahOWbvuWxglxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blj6/op4bojIPovaxcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRFeHRlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDliKDpmaTlm77lsYJcclxuICAgICAqIEBwYXJhbSBsYXllciDopoHliKDpmaTnmoTlm77lsYJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZW1vdmVMYXllciA9IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMubGF5ZXJzLmluZGV4T2YobGF5ZXIpO1xyXG4gICAgICAgIGlmKGluZGV4PjApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllcnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDorr7nva7pvKDmoIfmoLflvI9cclxuICAgICAqIEBwYXJhbSBjdXJzb3Ig6byg5qCH5qC35byPXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuc2V0Q3Vyc29yID0gZnVuY3Rpb24gKGN1cnNvcikge1xyXG5cclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOi/lOWbnuWcsOWbvueql+WPo+WwuuWvuCBweOWNleS9jVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFZpZXdTaXplID0gZnVuY3Rpb24oKXtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWbvuWxguaVsOmHj1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5Zu+5bGC5pWw6YePXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0TGF5ZXJDb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluaMh+Wumue0ouW8leS9jee9rueahOWbvuWxglxyXG4gICAgICogQHBhcmFtIGluZGV4IOe0ouW8lVxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5Zu+5bGCXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0TGF5ZXIgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllcnNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluaJgOacieWbvuWxglxyXG4gICAgICogQHJldHVybnMg6L+U5Zue5Zu+5bGC5pWw57uEXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0TGF5ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycztcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blnLDlm77nvKnmlL7nuqfliKtcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRab29tTGV2ZWwgPSBmdW5jdGlvbigpe31cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5bliIbovqjnjodcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRSZXNvbHV0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blnZDmoIfljp/ngrlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDmn6Xmib7lm77lsYJcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbmFtZSDlm77lsYLlkI3np7BcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmZpbmRMYXllciA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmxheWVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxheWVyLm5hbWUgPT0gbmFtZSB8fCBsYXllci5pZCA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGF5ZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog55uR5ZCs5oyH5a6a5ZCN56ew55qE6byg5qCH5LqL5Lu25bm26K6+572u5YWz6IGU55qE5LqL5Lu25aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIG5hbWUg5LqL5Lu25ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gRnVuY3Rpb24gZnVuYyDlpITnkIbmlrnms5XlkI3np7BcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgaW4gdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBldmVudHMucHVzaChmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Y+W5raI55uR5ZCs5oyH5a6a5ZCN56ew55qE6byg5qCH5LqL5Lu25bm25Y+W5raI5LqL5Lu25aSE55CG5pa55rOV55qE5YWz6IGUXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIG5hbWUg5LqL5Lu25ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gRnVuY3Rpb24gZnVuYyDlpITnkIbmlrnms5XlkI3np7BcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS51biA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XHJcbiAgICAgICAgaWYgKG5hbWUgaW4gIHRoaXMuZXZlbnRzKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudHMgPSB0aGlzLmV2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQgPT09IGZ1bmMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+57yp5pS+5Yiw56m66Ze05pWw5o2u5a6a5LmJ55qE5YWo5Zu+6IyD5Zu0XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZnVsbEV4dGVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77nvKnlsI9cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS56b29tT3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvuaUvuWkp1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnpvb21JbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlubPnp7vlh6DkvZXlm77lvaLlr7nosaFcclxuICAgICAqIEBwYXJhbSBnZW9tZXRyeVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnBhbiA9IGZ1bmN0aW9uIChnZW9tZXRyeSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiuvuWumuaMh+WumueahOWdkOagh+eCueS4uuWcsOWbvuS4reW/g+eCuVxyXG4gICAgICogQHBhcmFtIFBvaW50IGNlbnRlciDlnLDnkIblnZDmoIfngrlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zZXRDZW50ZXIgPSBmdW5jdGlvbiAoY2VudGVyKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5oyH5a6a55qE5Zyw55CG5Z2Q5qCH54K55pi+56S65Zyo5bGP5bmV5LiK55qE5L2N572uXHJcbiAgICAgKiBAcGFyYW0gUG9pbnQgY29vcmRpbmF0ZSDlnLDnkIblnZDmoIfngrlcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRQaXhlbEZyb21Db29yZGluYXRlID0gZnVuY3Rpb24gKGNvb3JkaW5hdGUpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blsY/luZXkuIrmjIflrprlg4/ntKDngrnlr7nlupTnmoTlnLDnkIblnZDmoIfngrlcclxuICAgICAqIEBwYXJhbSBQb2ludCBwaXhlbCDlsY/luZXlg4/ntKDngrnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRDb29yZGluYXRlRnJvbVBpeGVsID0gZnVuY3Rpb24gKHBpeGVsKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5a+85Ye6XHJcbiAgICAgKiBAcGFyYW0gbmFtZSDlr7zlh7rlkI3np7BcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5leHBvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWBnOebruaLluaLvVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnN0b3BEcmFnUGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57un57ut5ouW5ou9XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVzdW1lRHJhZ3BhbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlgZzmraLlj4zlh7tcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zdG9wRGJDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDnu6fnu63lj4zlh7tcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZXN1bWVEYkNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgKiDmt7vliqDlnLDlm77nm7jlhbPmjqfku7ZcclxuICAgICogQHBhcmFtIG9sLmNvbnRyb2wuQ29udHJvbFxyXG4gICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5hZGRDb250cm9sID0gZnVuY3Rpb24gKGN0bCkge1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog5b2T5YmN5q2j5Zyo5L2/55So55qE5Zyw5Zu+5bel5YW3XHJcbiAgICAgKiBAcGFyYW0gVG9vbEJhc2UgdG9vbFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmN1cnJlbnRUb29sID0gZnVuY3Rpb24gKHRvb2wpIHtcclxuICAgICAgICBpZiAodGhpcy50b29sICE9IHRvb2wpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2wuZGVhY3RpdmF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudG9vbCA9IHRvb2w7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvb2wgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJzb3IgPSB0aGlzLnRvb2wuY3Vyc29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+WNleWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZUNsaWNrID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZUNsaWNrKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqXHJcbiAgICAgKiDpvKDmoIfmgqzlgZzkuovku7ZcclxuICAgICAqIEBwYXJhbSBFdmVudCBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VPdmVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VPdmVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDpvKDmoIfmjInplK7mjInkuIvml7bnmoTkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYnV0dG9uIOaMieS4i+eahOm8oOagh+aMiemUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzaGlmdCDmmK/lkKblkIzml7bmjInkuIvnmoTplK7nm5jkuIrnmoRzaGlmdOmUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5YIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWSDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFgg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBZIOm8oOagh+WcqOWcsOWbvuS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGFuZGxlIOivpeS6i+S7tuaYr+WQpuW3sue7j+S4jemcgOimgeWGjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZURvd24oYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubW91c2Vkb3duLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRzLm1vdXNlZG93bltpXTtcclxuICAgICAgICAgICAgZXZlbnQoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOm8oOagh+aMiemUruaMieS4i+WQjuaKrOi1t+eahOS6i+S7tueahOWkhOeQhuaWueazlVxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZVVwKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLm1vdXNldXAubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMubW91c2V1cFtpXTtcclxuICAgICAgICAgICAgZXZlbnQoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH56e75Yqo5LqL5Lu25aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uIChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uTW91c2VNb3ZlID8gdGhpcy50b29sLm9uTW91c2VNb3ZlKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5tb3VzZW1vdmUubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMubW91c2Vtb3ZlW2ldO1xyXG4gICAgICAgICAgICBldmVudChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77lj6/op4bojIPlm7TmlLnlj5jkuovku7ZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbGVmdCDlt6bkuIrop5JY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHRvcCDlt6bkuIrop5JZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHJpZ2h0IOWPs+S4i+inkljlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYm90dG9tIOWPs+S4i+inklnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbkV4dGVudENoYW5nZWQgPSBmdW5jdGlvbiAobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbkV4dGVudENoYW5nZWQgPyB0aGlzLnRvb2wub25FeHRlbnRDaGFuZ2VkKGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSkgOiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5leHRlbnRjaGFuZ2VkLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnRzLmV4dGVudGNoYW5nZWRbaV07XHJcbiAgICAgICAgICAgIGV2ZW50KGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+WPjOWHu+S6i+S7tlxyXG4gICAgICogQHBhcmFtIEV2ZW50IGUg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25EYmxjbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbkRibGNsaWNrKGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDmtY/op4jlmajnqpflj6PlpKflsI/mlLnlj5jkuovku7ZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgd2lkdGgg5paw55qE56qX5Y+j5a695bqmXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhlaWdodCDmlrDnmoTnqpflj6Ppq5jluqZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vblJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+6I635b6X54Sm54K555qE5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gRXZlbnQgZSDkuovku7blr7nosaFcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOenu+mZpOWcsOWbvuebuOWFs+eahOS6pOS6klxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlbW92ZUludGVyYWN0aW9ucyA9IGZ1bmN0aW9uKCl7fVxyXG4gICAgLyoqKlxyXG4gICAgICog6YeN572u5Zyw5Zu+55u45YWz55qE5Lqk5LqSXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVzdW1lSW50ZXJhY3Rpb25zID0gZnVuY3Rpb24oKXt9XHJcbiAgICBcclxuICAgIHJldHVybiBtYXA7XHJcblxyXG59KVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvbWFwL21hcC5qcyIsIi8qKlxyXG4gKiBAY2xhc3MgR2VvbWV0cnlUeXBlOiDlh6DkvZXlm77lvaLnsbvlnovmnprkuL5cclxuICogQ3JlYXRlZCBieSBsaWdhbmcgb24gMjAxNC85LzE1LlxyXG4gKi9cclxuXHJcbmRlZmluZShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAvKioq5LiN5oyH5a6a5YW35L2T5b2i54q257G75Yir55qE5Zu+5b2iKi9cclxuICAgICAgICBHZW9tZXRyeTogMCxcclxuICAgICAgICAvKioq54K554q25Zu+5b2iKi9cclxuICAgICAgICBQb2ludDogMSxcclxuICAgICAgICAvKioq5ZyG5byn54q25Zu+5b2iKi9cclxuICAgICAgICBDdXJ2ZTogMixcclxuICAgICAgICAvKioq5q6154q25Zu+5b2iKi9cclxuICAgICAgICBTZWdtZW50OiAzLFxyXG4gICAgICAgIC8qKirnn6nlvaIqL1xyXG4gICAgICAgIEVudmVsb3BlOiA0LFxyXG4gICAgICAgIC8qKirnur/lvaIqL1xyXG4gICAgICAgIExpbmU6IDUsXHJcbiAgICAgICAgLyoqKuaWueW9oiovXHJcbiAgICAgICAgUmVjdGFuZ2xlOiA2LFxyXG4gICAgICAgIC8qKirmraPmlrnlvaIqL1xyXG4gICAgICAgIFNxdWFyZTogNyxcclxuICAgICAgICAvKioq5ZyG5b2iKi9cclxuICAgICAgICBDaXJjbGU6IDgsXHJcbiAgICAgICAgLyoqKuakreWchuW9oiovXHJcbiAgICAgICAgRWxsaXBzZTogOSxcclxuICAgICAgICAvKioq5aSa5Liq54K56KGo56S655qE6Lev5b6EKi9cclxuICAgICAgICBQYXRoOiAxMCxcclxuICAgICAgICAvKioq55Sx5LiA57O75YiX55qE54K55p6E5oiQ55qE546v54q26Zet5ZCI5Zu+5b2iKi9cclxuICAgICAgICBSaW5nOiAxMSxcclxuICAgICAgICAvKioq5aSa5ZyG5byn5Zu+5b2iKi9cclxuICAgICAgICBQb2x5Q3VydmU6IDEyLFxyXG4gICAgICAgIC8qKirkuIDkuKrmiJblpJrkuKrot6/lvoTnirblm77lvaLooajnpLrnmoTnqbrpl7Tlh6DkvZXlm77lvaIqL1xyXG4gICAgICAgIFBvbHlsaW5lOiAxMyxcclxuICAgICAgICAvKioq5LiA5Liq5oiW6ICF5aSa5Liq546v54q25Zu+5b2i6KGo56S655qE56m66Ze05Yeg5L2V5Zu+5b2iKi9cclxuICAgICAgICBQb2x5Z29uOiAxNCxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlpJrngrlcclxuICAgICAgICAgKi9cclxuICAgICAgICBNdWx0aVBvaW50OiAxNSxcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDlpJrpnaJcclxuICAgICAgICAgKi9cclxuICAgICAgICBNdWx0aVBvbHlnb246IDE2XHJcbiAgICB9XHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvZ2VvbWV0cmllcy9nZW9tZXRyeXR5cGUuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbmRlZmluZShbXSxmdW5jdGlvbigpe1xyXG4gICAgdmFyIGdsb2JlID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZ2xvYmU7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL21hcC9nbG9iZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuXHJcbmRlZmluZShbJy4vZ2VvbWV0cmllcy9nZW9tZXRyeXR5cGUnLCcuL2dlb21ldHJpZXMvZ2VvbWV0cnknLFwiLi9tYXAvbWFwXCIsXCIuL21hcC9nbG9iZVwiXSwgZnVuY3Rpb24gKEdlb21ldHJ5VHlwZSxHZW9tZXRyeSxNYXAsR2xvYmUpIHtcclxuICAgIHdpbmRvdy5nMiA9IHdpbmRvdy5nMiB8fCB7fTtcclxuICAgIHZhciBnMiA9IHdpbmRvdy5nMjtcclxuICAgIGcyLmdlb20gPSBnMi5nZW9tIHx8e307XHJcbiAgICBnMi5tYXBzID1nMi5tYXBzIHx8IHt9O1xyXG4gICAgZzIuZ2VvbS5HZW9tZXRyeVR5cGU9R2VvbWV0cnlUeXBlO1xyXG4gICAgZzIuZ2VvbS5HZW9tZXRyeSA9R2VvbWV0cnk7XHJcbiAgICBnMi5tYXBzLklNYXA9TWFwO1xyXG4gICAgZzIubWFwcy5JR2xvYmUgPSBHbG9iZTtcclxuICAgIGcyLm1hcHMuR2xvYmVkZGQ1NSA9IEdsb2JlO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9leHBvcnQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbmRlZmluZShbJy4vbGFuZy9jbGFzc1V0aWwnXSwgZnVuY3Rpb24gKENsYXNzVXRpbCkge1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIubGFuZz1nMi5sYW5nIHx8IHt9O1xyXG4gICAgZzIubGFuZy5DbGFzc1V0aWwgPSBDbGFzc1V0aWw7XHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvdHNnaXMvZzIvZXhwb3J0LmpzIiwiLyoqXHJcbiAqIEBjbGFzcyBHZW9tZXRyeTog5omA5pyJ56m66Ze05Yeg5L2V5Zu+5b2i55qE5Z+657G75Z6LXHJcbiAqIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOC8yMS5cclxuICovXHJcblxyXG5kZWZpbmUoWycuL2dlb21ldHJ5dHlwZSddLCBmdW5jdGlvbiAoR2VvbWV0cnlUeXBlKSB7XHJcbiAgICB2YXIgZ2VvbWV0cnkgPSBmdW5jdGlvbiAob3B0cykge1xyXG4gICAgICAgIHRoaXMuJHR5cGUgPSAnR2VvbWV0cnksaHR0cDovL3d3dy5Hcy5jb20nO1xyXG4gICAgICAgIHZhciBvcHRzcyA9IG9wdHMgfHwge307XHJcbiAgICAgICAgLyoqKuepuumXtOaVsOaNruWPguiAg++8jOWmguimgeafpeeci+abtOWkmui1hOaWme+8jOivt+WPguingWVudW1TcGF0aWFsUmVmZXJlbmNl5p6a5Li+44CCKi9cclxuICAgICAgICB0aGlzLnNwYXRpYWxSZWZlcmVuY2UgPSBvcHRzcy5zcGF0aWFsUmVmZXJlbmNlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKioq5rWu54K55pWw57G75Z6L6K6h566X57K+5bqm77yM5L+d55WZNOS9jeWwj+aVsCovXHJcbiAgICBnZW9tZXRyeS50b2xlcmF0ZSA9IDAuMDAwMDAwMDAwMDAxO1xyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiuvue9ruepuumXtOaVsOaNruWPguiAg1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzciDmlrDnmoTnqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLnNldFNwYXRpYWxSZWZlcmVuY2UgPSBmdW5jdGlvbiAoc3IpIHtcclxuICAgICAgICB0aGlzLnNwYXRpYWxSZWZlcmVuY2UgPSBzcjtcclxuICAgIH1cclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog6I635Y+W56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57mlbTmlbDlvaLlvI/ooajnpLrnmoTnqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmdldFNwYXRpYWxSZWZlcmVuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blh6DkvZXlm77lvaLnsbvlnovvvIzlpoLopoHmn6XnnIvmm7TlpJrotYTmlpnvvIzor7flj4Lop4FHZW9tZXRyeVR5cGXmnprkuL7jgIJcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnkdlb21ldHJ5VHlwZeaemuS4vlxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZ2V0R2VvbWV0cnlUeXBlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBHZW9tZXRyeVR5cGUuR2VvbWV0cnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKuepuumXtOaVsOaNruWPguiAg+WAvCovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuc3BhdGlhbFJlZmVyZW5jZSA9IDA7XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5q+U6L6D5Lik5Liq5Yeg5L2V5Zu+5b2i5a+56LGh5piv5ZCm55u45ZCMXHJcbiAgICAgKiBAcGFyYW0gR2VvbWV0cnkgb2JqIOavlOi+g+eahOWHoOS9leWbvuW9ouWvueixoVxyXG4gICAgICogQHJldHVybnMg6L+U5ZuedHJ1ZeihqOekuuebuOWQjO+8jOi/lOWbnmZhbHNl6KGo56S65LiN5ZCMXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOS9v+WHoOS9leWbvuW9ouato+W4uOWMluOAgeinhOiMg+WMluOAglxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOenu+WKqOWHoOS9leWbvuW9ouWvueixoVxyXG4gICAgICogQHBhcmFtIFBvaW50IHBvaW50IEdlb21ldHJ55a+56LGh5YGP56e76YePXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlhYvpmoblr7nosaFcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS4gOS4quaWsOeahEdlb21ldHJ55a+56LGhXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgZ2VvbWV0cnkodGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluW9k+WJjUdJU+W9oueKtueahOWkluaOpeefqeW9olxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZW52ZWxvcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdlb21ldHJ5O1xyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoW1wiLi9leHBvcnRcIixcIi4vbWFwL2NtL2NtZ2xvYmVcIl0sZnVuY3Rpb24oZ2lzLENNR2xvYmUpe1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIubWFwcz1nMi5tYXBzIHx8IHt9XHJcbiAgICBnMi5tYXBzLkdsb2JlPUNNR2xvYmU7XHJcblxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9leHBvcnQzZC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFsnLi4vLi4vLi4vZzIvbGFuZy9jbGFzc1V0aWwnLCAnLi4vbWFwJywgJy4uL2dsb2JlJ10sIGZ1bmN0aW9uIChDbGFzc1V0aWwsIE1hcCxHbG9iZSkge1xyXG5cclxuICAgIHZhciBnbG9iZSA9IGZ1bmN0aW9uKG9wdHMpe1xyXG4gICAgICAgIHZhciBvcHRzcyA9IG9wdHMgfHwge307XHJcbiAgICAgICAgR2xvYmUuY2FsbCh0aGlzLG9wdHNzKTtcclxuICAgICAgICBNYXAuY2FsbCh0aGlzLG9wdHNzKTtcclxuICAgIH1cclxuXHJcbiAgICBDbGFzc1V0aWwuZXh0ZW5kMihnbG9iZSxHbG9iZSk7XHJcbiAgICBDbGFzc1V0aWwuZXh0ZW5kMihnbG9iZSxNYXApO1xyXG4gICAgcmV0dXJuIGdsb2JlO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvY20vY21nbG9iZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtcIi4vZzIvZXhwb3J0XCIsXCIuL2dpcy9leHBvcnQzZFwiXSxmdW5jdGlvbigpe1xyXG5cclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy90c2dpczNkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==