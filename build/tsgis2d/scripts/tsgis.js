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
/******/ 	var hotCurrentHash = "c2b34882b9d468582a8b"; // eslint-disable-line no-unused-vars
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
/******/ 			var chunkId = 0;
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
/******/ 	return hotCreateRequire(13)(__webpack_require__.s = 13);
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
    g2.maps.Globeliufeng = Globe;
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function (gis, OlMap) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.maps = g2.maps || {};
    g2.maps.Map = OlMap;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
/**
 * @class OlMap: OpenLayer地图类型
 * Created by ligang on 2014/9/17.
 */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ClassUtil, Map) {
  console.log(window.jQuery);
  var olmap = function olmap(opts) {
    var optss = opts || {};
    Map.call(this, optss);
  };
  ClassUtil.extend2(olmap, Map);
  return olmap;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (gis, CMGlobe) {
    window.g2 = window.g2 || {};
    var g2 = window.g2;
    g2.maps = g2.maps || {};
    g2.maps.Globe = CMGlobe;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 10 */
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
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Created by liufeng on 2017/11/2.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(7), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })
/******/ ])});;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzJiMzQ4ODJiOWQ0Njg1ODJhOGIiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZzIvbGFuZy9jbGFzc1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL21hcC9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnl0eXBlLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvZ2xvYmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy90c2dpcy9nMi9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2dlb21ldHJpZXMvZ2VvbWV0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2V4cG9ydDJkLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvb2wvb2xtYXAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NjcmlwdHMvdHNnaXMvZ2lzL2V4cG9ydDNkLmpzIiwid2VicGFjazovLy8uL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvY20vY21nbG9iZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2NyaXB0cy90c2dpcy90c2dpcy5qcyJdLCJuYW1lcyI6WyJpZCIsInV0aWwiLCJleHRlbmQiLCJjaGlsZCIsInBhcmVudCIsIkYiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInViZXIiLCJleHRlbmQyIiwicCIsImMiLCJpIiwiaXNBcnJheSIsIm9iaiIsIkFycmF5IiwibmV3SWQiLCJleHRlbmRDb3B5IiwiZGVlcENvcHkiLCJvYmplY3RQbHVzIiwibyIsInN0dWZmIiwibiIsImV4dGVuZE11bHRpIiwiaiIsImxlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNyZWF0ZUV2ZW50cyIsImV2ZW50cyIsImNsaWNrIiwibW91c2Vtb3ZlIiwibW91c2VvdXQiLCJtb3VzZWRvd24iLCJtb3VzZXVwIiwiZGJsY2xpY2siLCJleHRlbnRjaGFuZ2VkIiwicmVzaXplIiwibWFwIiwibGF5ZXJzIiwidG9vbCIsImN1cnNvciIsImluaXQiLCJvcHRzIiwiYWRkTGF5ZXIiLCJsYXllciIsInB1c2giLCJnZXRFeHRlbnQiLCJyZW1vdmVMYXllciIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInNldEN1cnNvciIsImdldFZpZXdTaXplIiwiZ2V0TGF5ZXJDb3VudCIsImdldExheWVyIiwiZ2V0TGF5ZXJzIiwiZ2V0Wm9vbUxldmVsIiwiZ2V0UmVzb2x1dGlvbiIsImdldE9yaWdpbiIsImZpbmRMYXllciIsIm5hbWUiLCJvbiIsImZ1bmMiLCJ1biIsImV2ZW50IiwiZnVsbEV4dGVuZCIsInpvb21PdXQiLCJ6b29tSW4iLCJwYW4iLCJnZW9tZXRyeSIsInNldENlbnRlciIsImNlbnRlciIsImdldFBpeGVsRnJvbUNvb3JkaW5hdGUiLCJjb29yZGluYXRlIiwiZ2V0Q29vcmRpbmF0ZUZyb21QaXhlbCIsInBpeGVsIiwiZXhwb3J0Iiwic3RvcERyYWdQYW4iLCJyZXN1bWVEcmFncGFuIiwic3RvcERiQ2xpY2siLCJyZXN1bWVEYkNsaWNrIiwiYWRkQ29udHJvbCIsImN0bCIsImN1cnJlbnRUb29sIiwiZGVhY3RpdmF0ZSIsIm9uTW91c2VDbGljayIsImJ1dHRvbiIsInNoaWZ0Iiwic2NyZWVuWCIsInNjcmVlblkiLCJtYXBYIiwibWFwWSIsImhhbmRsZSIsIm9uTW91c2VPdmVyIiwiZSIsIm9uTW91c2VEb3duIiwib25Nb3VzZVVwIiwib25Nb3VzZU1vdmUiLCJvbkV4dGVudENoYW5nZWQiLCJsZWZ0IiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJvbkRibGNsaWNrIiwib25SZXNpemUiLCJ3aWR0aCIsImhlaWdodCIsIm9uRm9jdXMiLCJyZW1vdmVJbnRlcmFjdGlvbnMiLCJyZXN1bWVJbnRlcmFjdGlvbnMiLCJHZW9tZXRyeSIsIlBvaW50IiwiQ3VydmUiLCJTZWdtZW50IiwiRW52ZWxvcGUiLCJMaW5lIiwiUmVjdGFuZ2xlIiwiU3F1YXJlIiwiQ2lyY2xlIiwiRWxsaXBzZSIsIlBhdGgiLCJSaW5nIiwiUG9seUN1cnZlIiwiUG9seWxpbmUiLCJQb2x5Z29uIiwiTXVsdGlQb2ludCIsIk11bHRpUG9seWdvbiIsImdsb2JlIiwiR2VvbWV0cnlUeXBlIiwiTWFwIiwiR2xvYmUiLCJ3aW5kb3ciLCJnMiIsImdlb20iLCJtYXBzIiwiSU1hcCIsIklHbG9iZSIsIkdsb2JlbGl1ZmVuZyIsIkNsYXNzVXRpbCIsImxhbmciLCIkdHlwZSIsIm9wdHNzIiwic3BhdGlhbFJlZmVyZW5jZSIsInRvbGVyYXRlIiwic2V0U3BhdGlhbFJlZmVyZW5jZSIsInNyIiwiZ2V0U3BhdGlhbFJlZmVyZW5jZSIsImdldEdlb21ldHJ5VHlwZSIsImVxdWFscyIsIm5vcm1hbGl6ZSIsIm9mZnNldCIsInBvaW50IiwiY29weSIsImVudmVsb3BlIiwiZ2lzIiwiT2xNYXAiLCJjb25zb2xlIiwibG9nIiwialF1ZXJ5Iiwib2xtYXAiLCJjYWxsIiwiQ01HbG9iZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBMkQ7QUFDM0Q7QUFDQTtBQUNBLFdBQUc7O0FBRUgsb0RBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOzs7O0FBSUE7QUFDQSxzREFBOEM7QUFDOUM7QUFDQTtBQUNBLG9DQUE0QjtBQUM1QixxQ0FBNkI7QUFDN0IseUNBQWlDOztBQUVqQywrQ0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxhQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBLDREQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBbUIsMkJBQTJCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFhLDRCQUE0QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzQkFBYyw0QkFBNEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyw0QkFBNEI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLHVDQUF1QztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QixFQUF3QkUsR0FBeEI7QUFDQSxXQUFPRixLQUFQO0FBQ0gsQ0FYRDtBQUFBLHFHOzs7Ozs7Ozs7OztBQ0hBOzs7QUFHQSxpQ0FBTyxDQUFDLHNCQUFELEVBQWUsc0JBQWYsRUFBZ0Msc0JBQWhDLENBQVAsa0NBQXlELFlBQVUsQ0FFbEUsQ0FGRDtBQUFBLHFHIiwiZmlsZSI6InRzZ2lzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0dGhpc1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSBcclxuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdFx0aWYocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcclxuIFx0fSA7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xyXG4gXHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcclxuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcclxuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xyXG4gXHRcdDtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XHJcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gXHRcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcclxuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XHJcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xyXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImMyYjM0ODgyYjlkNDY4NTgyYThiXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH07XHJcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xyXG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdHRocm93IGVycjtcclxuIFx0XHRcdH0pO1xyXG4gXHRcclxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xyXG4gXHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxyXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxyXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3REZWZlcnJlZDtcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XHJcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbiBcdFxyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xyXG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXHJcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHR2YXIgY2h1bmtJZCA9IDA7XHJcbiBcdFx0XHR7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcclxuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cclxuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xyXG4gXHRcdH0pO1xyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcclxuIFx0XHRcdHJldHVybjtcclxuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xyXG4gXHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcdGlmKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcclxuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcclxuIFx0XHRpZighaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcclxuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xyXG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XHJcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XHJcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XHJcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xyXG4gXHRcdGlmKCFkZWZlcnJlZCkgcmV0dXJuO1xyXG4gXHRcdGlmKGhvdEFwcGx5T25VcGRhdGUpIHtcclxuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXHJcbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cclxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcclxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcclxuIFx0XHRcdH0pLnRoZW4oXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcclxuIFx0XHRcdFx0fSxcclxuIFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XHJcbiBcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdCk7XHJcbiBcdFx0fSBlbHNlIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdH1cclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xyXG4gXHRcdGlmKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XHJcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiBcdFxyXG4gXHRcdHZhciBjYjtcclxuIFx0XHR2YXIgaTtcclxuIFx0XHR2YXIgajtcclxuIFx0XHR2YXIgbW9kdWxlO1xyXG4gXHRcdHZhciBtb2R1bGVJZDtcclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcclxuIFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcclxuIFx0XHRcdFx0XHRpZDogaWRcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcclxuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYobW9kdWxlLmhvdC5fbWFpbikge1xyXG4gXHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XHJcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdGlmKCFwYXJlbnQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdFx0fTtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0aWYob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdGlmKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xyXG4gXHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcclxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XHJcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0Y29udGludWU7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XHJcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xyXG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xyXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxyXG4gXHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFxyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxyXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXHJcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxyXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcclxuIFx0XHRcdH07XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XHJcbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XHJcbiBcdFx0XHRcdGlmKGEuaW5kZXhPZihpdGVtKSA8IDApXHJcbiBcdFx0XHRcdFx0YS5wdXNoKGl0ZW0pO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcclxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xyXG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XHJcbiBcdFxyXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XHJcbiBcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCIpO1xyXG4gXHRcdH07XHJcbiBcdFxyXG4gXHRcdGZvcih2YXIgaWQgaW4gaG90VXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcclxuIFx0XHRcdFx0dmFyIHJlc3VsdDtcclxuIFx0XHRcdFx0aWYoaG90VXBkYXRlW2lkXSkge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcclxuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcclxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxyXG4gXHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xyXG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcclxuIFx0XHRcdFx0aWYocmVzdWx0LmNoYWluKSB7XHJcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHN3aXRjaChyZXN1bHQudHlwZSkge1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25EZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcclxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiIGluIFwiICsgcmVzdWx0LnBhcmVudElkICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uVW5hY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvKTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGlzcG9zZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGRlZmF1bHQ6XHJcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGFib3J0RXJyb3IpIHtcclxuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcclxuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9BcHBseSkge1xyXG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xyXG4gXHRcdFx0XHRcdGZvcihtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxyXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihkb0Rpc3Bvc2UpIHtcclxuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxyXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHRmb3IoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xyXG4gXHRcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiYgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWQpXHJcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcclxuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcclxuIFx0XHRcdFx0fSk7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xyXG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcclxuIFx0XHRcdGlmKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xyXG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0fSk7XHJcbiBcdFxyXG4gXHRcdHZhciBpZHg7XHJcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XHJcbiBcdFx0d2hpbGUocXVldWUubGVuZ3RoID4gMCkge1xyXG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcclxuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0aWYoIW1vZHVsZSkgY29udGludWU7XHJcbiBcdFxyXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcclxuIFx0XHJcbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcclxuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XHJcbiBcdFx0XHRcdGNiKGRhdGEpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcclxuIFx0XHJcbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxyXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcclxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXHJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcclxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXHJcbiBcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xyXG4gXHRcdFx0XHRpZighY2hpbGQpIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRpZihpZHggPj0gMCkge1xyXG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXHJcbiBcdFx0dmFyIGRlcGVuZGVuY3k7XHJcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKG1vZHVsZSkge1xyXG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRcdGZvcihqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XHJcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcclxuIFx0XHRcdFx0XHRcdGlmKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XHJcbiBcdFxyXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcclxuIFx0XHJcbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXHJcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcclxuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XHJcbiBcdFx0XHRcdFx0XHRpZihjYikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihjYWxsYmFja3MuaW5kZXhPZihjYikgPj0gMCkgY29udGludWU7XHJcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0Zm9yKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcclxuIFx0XHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcclxuIFx0XHRcdFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XHJcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiBcdFx0XHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlcnIyKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0b3JnaW5hbEVycm9yOiBlcnIsIC8vIFRPRE8gcmVtb3ZlIGluIHdlYnBhY2sgNFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyMjtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGlmKG9wdGlvbnMub25FcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxyXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcclxuIFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XHJcbiBcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcclxuIFx0XHRpZihlcnJvcikge1xyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcclxuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XHJcbiBcdFx0fSk7XHJcbiBcdH1cclxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIGhvdENyZWF0ZVJlcXVpcmUoMTMpKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMmIzNDg4MmI5ZDQ2ODU4MmE4YiIsIi8qKlxyXG4gKiBAY2xhc3MgY2xhc3NVdGlsOiDlrprkuYnnsbvlnovlt6XlhbfvvIzlrp7njrDnsbvlnovnu6fmib9cclxuICogIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOC8xMy5cclxuICogIEBtb2RpZnkgfXt5ZWxsb3cgXHJcbiAqL1xyXG5cclxuZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgaWQgPSAxMDAwMDtcclxuXHJcbiAgICB2YXIgdXRpbCA9IGZ1bmN0aW9uKCkge31cclxuXHJcbiAgICB1dGlsLmV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHtcclxuICAgICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgICAgRi5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgICAgIGNoaWxkLnByb3RvdHlwZSA9IG5ldyBGKCk7XHJcbiAgICAgICAgY2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY2hpbGQ7XHJcbiAgICAgICAgY2hpbGQudWJlciA9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5leHRlbmQyID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkge1xyXG4gICAgICAgIHZhciBwID0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgICAgICB2YXIgYyA9IGNoaWxkLnByb3RvdHlwZTtcclxuICAgICAgICBmb3IgKCB2YXIgaSBpbiBwKSB7XHJcbiAgICAgICAgICAgIGNbaV0gPSBwW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLnViZXIgPSBwO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICByZXR1cm4gKCEhb2JqICYmIG9iai5jb25zdHJ1Y3RvciA9PSBBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5uZXdJZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gaWQrKztcclxuICAgIH1cclxuXHJcbiAgICB1dGlsLmV4dGVuZENvcHk9IGZ1bmN0aW9uKHApIHtcclxuICAgICAgICB2YXIgYyA9IHt9O1xyXG4gICAgICAgIGZvciAoIHZhciBpIGluIHAgKSB7XHJcbiAgICAgICAgICAgIGNbaV0gPSBwW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjLnViZXIgPSBwO1xyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG5cclxuICAgIHV0aWwuZGVlcENvcHkgPSBkZWVwQ29weTtcclxuXHJcbiAgICB1dGlsLm9iamVjdFBsdXMgPSBmdW5jdGlvbihvLCBzdHVmZikge1xyXG4gICAgICAgIHZhciBuO1xyXG4gICAgICAgIGZ1bmN0aW9uIEYoKSB7fTtcclxuICAgICAgICBGLnByb3RvdHlwZSA9IG87XHJcbiAgICAgICAgbiA9IG5ldyBGKCk7XHJcbiAgICAgICAgbi51YmVyID0gbztcclxuXHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gc3R1ZmYpIHtcclxuICAgICAgICAgICAgbltpXSA9IHN0dWZmW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG47XHJcbiAgICB9XHJcblxyXG4gICAgdXRpbC5leHRlbmRNdWx0aSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBuID0ge30sIHN0dWZmLCBqID0gMCwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKCBqID0gMDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICAgIHN0dWZmID0gYXJndW1lbnRzW2pdO1xyXG4gICAgICAgICAgICBmb3IgKCB2YXIgaSBpbiBzdHVmZikge1xyXG4gICAgICAgICAgICAgICAgbltpXSA9IHN0dWZmW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZXBDb3B5KHAsIGMpIHtcclxuICAgICAgICB2YXIgYyA9IGMgfHwge307XHJcbiAgICAgICAgZm9yICggdmFyIGkgaW4gcCApIHtcclxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgcFtpXSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNbaV0gPSAocFtpXS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpID8gW10gOiB7fTtcclxuICAgICAgICAgICAgICAgIGRlZXBDb3B5KHBbaV0sIGNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY1tpXSA9IHBbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHV0aWw7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvdHNnaXMvZzIvbGFuZy9jbGFzc1V0aWwuanMiLCIvKipcclxuICogQGNsYXNzIE1hcDog5Zyw5Zu+57G75Z6L77yM5Z+657G7XHJcbiAqIENyZWF0ZWQgYnkgbGlnYW5nIG9uIDIwMTQvOS8xNi5cclxuICovXHJcblxyXG5kZWZpbmUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKioqXHJcbiAgICAgKiDlrprkuYnlnLDlm77opoHlpITnkIbnmoTkuovku7bliJfooahcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnuS6i+S7tuWIl+ihqFxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmVudHMoKSB7XHJcbiAgICAgICAgdmFyIGV2ZW50cyA9IHt9O1xyXG4gICAgICAgIGV2ZW50cy5jbGljayA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5tb3VzZW1vdmUgPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2VvdXQgPSBbXTtcclxuICAgICAgICBldmVudHMubW91c2Vkb3duID0gW107XHJcbiAgICAgICAgZXZlbnRzLm1vdXNldXAgPSBbXTtcclxuICAgICAgICBldmVudHMuZGJsY2xpY2sgPSBbXTtcclxuICAgICAgICBldmVudHMuZXh0ZW50Y2hhbmdlZCA9IFtdO1xyXG4gICAgICAgIGV2ZW50cy5yZXNpemUgPSBbXTtcclxuICAgICAgICByZXR1cm4gZXZlbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBtYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLnRvb2wgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY3Vyc29yID0gbnVsbDtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IGNyZWF0ZUV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qLyEqKioq5a6a5LmJ5Zyw5Zu+5Zu+5bGC5YiX6KGoKiEvXHJcbiAgICBtYXAucHJvdG90eXBlLmxheWVycyA9IFtdO1xyXG5cclxuICAgIC8hKioqKuWumuS5ieWcsOWbvuW3peWFt+WvueixoSohL1xyXG4gICAgbWFwLnByb3RvdHlwZS50b29sID0gbnVsbDtcclxuXHJcbiAgICAvISoqKirlrprkuYnlnLDlm77pvKDmoIfnmoTlm77moIcqIS9cclxuICAgIG1hcC5wcm90b3R5cGUuY3Vyc29yID0gbnVsbDtcclxuXHJcbiAgICAvISoqKuWumuS5ieWcsOWbvuS6i+S7tuWIl+ihqCohL1xyXG4gICAgbWFwLnByb3RvdHlwZS5ldmVudHMgPSBjcmVhdGVFdmVudHMoKTsqL1xyXG4gICAgLyoqKlxyXG4gICAgICog5a6a5LmJ5bim5Y+C5pWw55qE5Zyw5Zu+5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gQW5vbnltb3VzIG9wdHMg5YyF5ZCr5Yid5aeL5YyW5Y+C5pWw55qE5aSN5p2C5a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5a6a5LmJ5re75Yqg5Zu+5bGC5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gbGF5ZXIg5re75Yqg55qE5Zu+5bGCXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuYWRkTGF5ZXIgPSBmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgICAgICB0aGlzLmxheWVycy5wdXNoKGxheWVyKTtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWPr+inhuiMg+i9rFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldEV4dGVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOWIoOmZpOWbvuWxglxyXG4gICAgICogQHBhcmFtIGxheWVyIOimgeWIoOmZpOeahOWbvuWxglxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlbW92ZUxheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5sYXllcnMuaW5kZXhPZihsYXllcik7XHJcbiAgICAgICAgaWYoaW5kZXg+MCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKipcclxuICAgICAqIOiuvue9rum8oOagh+agt+W8j1xyXG4gICAgICogQHBhcmFtIGN1cnNvciDpvKDmoIfmoLflvI9cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5zZXRDdXJzb3IgPSBmdW5jdGlvbiAoY3Vyc29yKSB7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog6L+U5Zue5Zyw5Zu+56qX5Y+j5bC65a+4IHB45Y2V5L2NXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZ2V0Vmlld1NpemUgPSBmdW5jdGlvbigpe1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Zu+5bGC5pWw6YePXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lm77lsYLmlbDph49cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRMYXllckNvdW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVycy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5oyH5a6a57Si5byV5L2N572u55qE5Zu+5bGCXHJcbiAgICAgKiBAcGFyYW0gaW5kZXgg57Si5byVXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lm77lsYJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyc1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5omA5pyJ5Zu+5bGCXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57lm77lsYLmlbDnu4RcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5nZXRMYXllcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWcsOWbvue8qeaUvue6p+WIq1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFpvb21MZXZlbCA9IGZ1bmN0aW9uKCl7fVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWIhui+qOeOh1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFJlc29sdXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWdkOagh+WOn+eCuVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOafpeaJvuWbvuWxglxyXG4gICAgICogQHBhcmFtIFN0cmluZyBuYW1lIOWbvuWxguWQjeensFxyXG4gICAgICogQHJldHVybnMgeyp9XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuZmluZExheWVyID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXllciA9IHRoaXMubGF5ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAobGF5ZXIubmFtZSA9PSBuYW1lIHx8IGxheWVyLmlkID09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYXllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDnm5HlkKzmjIflrprlkI3np7DnmoTpvKDmoIfkuovku7blubborr7nva7lhbPogZTnmoTkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbmFtZSDkuovku7blkI3np7BcclxuICAgICAqIEBwYXJhbSBGdW5jdGlvbiBmdW5jIOWkhOeQhuaWueazleWQjeensFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgICBpZiAobmFtZSBpbiB0aGlzLmV2ZW50cykge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGV2ZW50cy5wdXNoKGZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlj5bmtojnm5HlkKzmjIflrprlkI3np7DnmoTpvKDmoIfkuovku7blubblj5bmtojkuovku7blpITnkIbmlrnms5XnmoTlhbPogZRcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbmFtZSDkuovku7blkI3np7BcclxuICAgICAqIEBwYXJhbSBGdW5jdGlvbiBmdW5jIOWkhOeQhuaWueazleWQjeensFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnVuID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcclxuICAgICAgICBpZiAobmFtZSBpbiAgdGhpcy5ldmVudHMpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZlbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZihldmVudCA9PT0gZnVuYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4tLTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77nvKnmlL7liLDnqbrpl7TmlbDmja7lrprkuYnnmoTlhajlm77ojIPlm7RcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5mdWxsRXh0ZW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvue8qeWwj1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnpvb21PdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5Zyw5Zu+5pS+5aSnXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOW5s+enu+WHoOS9leWbvuW9ouWvueixoVxyXG4gICAgICogQHBhcmFtIGdlb21ldHJ5XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucGFuID0gZnVuY3Rpb24gKGdlb21ldHJ5KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6K6+5a6a5oyH5a6a55qE5Z2Q5qCH54K55Li65Zyw5Zu+5Lit5b+D54K5XHJcbiAgICAgKiBAcGFyYW0gUG9pbnQgY2VudGVyIOWcsOeQhuWdkOagh+eCuVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnNldENlbnRlciA9IGZ1bmN0aW9uIChjZW50ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5bmjIflrprnmoTlnLDnkIblnZDmoIfngrnmmL7npLrlnKjlsY/luZXkuIrnmoTkvY3nva5cclxuICAgICAqIEBwYXJhbSBQb2ludCBjb29yZGluYXRlIOWcsOeQhuWdkOagh+eCuVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldFBpeGVsRnJvbUNvb3JkaW5hdGUgPSBmdW5jdGlvbiAoY29vcmRpbmF0ZSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOiOt+WPluWxj+W5leS4iuaMh+WumuWDj+e0oOeCueWvueW6lOeahOWcsOeQhuWdkOagh+eCuVxyXG4gICAgICogQHBhcmFtIFBvaW50IHBpeGVsIOWxj+W5leWDj+e0oOeCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmdldENvb3JkaW5hdGVGcm9tUGl4ZWwgPSBmdW5jdGlvbiAocGl4ZWwpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlr7zlh7pcclxuICAgICAqIEBwYXJhbSBuYW1lIOWvvOWHuuWQjeensFxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmV4cG9ydCA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5YGc55uu5ouW5ou9XHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuc3RvcERyYWdQYW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu6fnu63mi5bmi71cclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZXN1bWVEcmFncGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWBnOatouWPjOWHu1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnN0b3BEYkNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOe7p+e7reWPjOWHu1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLnJlc3VtZURiQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAqIOa3u+WKoOWcsOWbvuebuOWFs+aOp+S7tlxyXG4gICAgKiBAcGFyYW0gb2wuY29udHJvbC5Db250cm9sXHJcbiAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLmFkZENvbnRyb2wgPSBmdW5jdGlvbiAoY3RsKSB7XHJcbiAgICB9XHJcbiAgICAvKioqXHJcbiAgICAgKiDlvZPliY3mraPlnKjkvb/nlKjnmoTlnLDlm77lt6XlhbdcclxuICAgICAqIEBwYXJhbSBUb29sQmFzZSB0b29sXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUuY3VycmVudFRvb2wgPSBmdW5jdGlvbiAodG9vbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvb2wgIT0gdG9vbCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9vbC5kZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50b29sID0gdG9vbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudG9vbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvciA9IHRoaXMudG9vbC5jdXJzb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH5Y2V5Ye75LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlQ2xpY2sgPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlQ2xpY2soYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOm8oOagh+aCrOWBnOS6i+S7tlxyXG4gICAgICogQHBhcmFtIEV2ZW50IGUg5LqL5Lu25a+56LGhXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZU92ZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvb2wgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZU92ZXIoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOm8oOagh+aMiemUruaMieS4i+aXtueahOS6i+S7tuWkhOeQhuaWueazlVxyXG4gICAgICogQHBhcmFtIE51bWJlciBidXR0b24g5oyJ5LiL55qE6byg5qCH5oyJ6ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNoaWZ0IOaYr+WQpuWQjOaXtuaMieS4i+eahOmUruebmOS4iueahHNoaWZ06ZSuXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblgg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5ZIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWCDpvKDmoIflnKjlnLDlm77kuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFkg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBoYW5kbGUg6K+l5LqL5Lu25piv5ZCm5bey57uP5LiN6ZyA6KaB5YaN5aSE55CGXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUub25Nb3VzZURvd24gPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlRG93bihidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5tb3VzZWRvd24ubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMubW91c2Vkb3duW2ldO1xyXG4gICAgICAgICAgICBldmVudChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqKlxyXG4gICAgICog6byg5qCH5oyJ6ZSu5oyJ5LiL5ZCO5oqs6LW355qE5LqL5Lu255qE5aSE55CG5pa55rOVXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGJ1dHRvbiDmjInkuIvnmoTpvKDmoIfmjInplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2hpZnQg5piv5ZCm5ZCM5pe25oyJ5LiL55qE6ZSu55uY5LiK55qEc2hpZnTplK5cclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWCDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRY5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIHNjcmVlblkg5LqL5Lu25Y+R55Sf5pe26byg5qCH5Zyo5bGP5bmV5LiK55qEWeWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBYIOm8oOagh+WcqOWcsOWbvuS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgbWFwWSDpvKDmoIflnKjlnLDlm77kuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIGhhbmRsZSDor6Xkuovku7bmmK/lkKblt7Lnu4/kuI3pnIDopoHlho3lpITnkIZcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbk1vdXNlVXAgPSBmdW5jdGlvbiAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSB7XHJcbiAgICAgICAgaWYgKCEhdGhpcy50b29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9vbC5vbk1vdXNlVXAoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubW91c2V1cC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50cy5tb3VzZXVwW2ldO1xyXG4gICAgICAgICAgICBldmVudChidXR0b24sIHNoaWZ0LCBzY3JlZW5YLCBzY3JlZW5ZLCBtYXBYLCBtYXBZLCBoYW5kbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDpvKDmoIfnp7vliqjkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgYnV0dG9uIOaMieS4i+eahOm8oOagh+aMiemUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzaGlmdCDmmK/lkKblkIzml7bmjInkuIvnmoTplK7nm5jkuIrnmoRzaGlmdOmUrlxyXG4gICAgICogQHBhcmFtIE51bWJlciBzY3JlZW5YIOS6i+S7tuWPkeeUn+aXtum8oOagh+WcqOWxj+W5leS4iueahFjlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc2NyZWVuWSDkuovku7blj5HnlJ/ml7bpvKDmoIflnKjlsY/luZXkuIrnmoRZ5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gTnVtYmVyIG1hcFgg6byg5qCH5Zyo5Zyw5Zu+5LiK55qEWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBtYXBZIOm8oOagh+WcqOWcsOWbvuS4iueahFnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGFuZGxlIOivpeS6i+S7tuaYr+WQpuW3sue7j+S4jemcgOimgeWGjeWkhOeQhlxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24gKGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSkge1xyXG4gICAgICAgIGlmICghIXRoaXMudG9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvb2wub25Nb3VzZU1vdmUgPyB0aGlzLnRvb2wub25Nb3VzZU1vdmUoYnV0dG9uLCBzaGlmdCwgc2NyZWVuWCwgc2NyZWVuWSwgbWFwWCwgbWFwWSwgaGFuZGxlKSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLm1vdXNlbW92ZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0aGlzLmV2ZW50cy5tb3VzZW1vdmVbaV07XHJcbiAgICAgICAgICAgIGV2ZW50KGJ1dHRvbiwgc2hpZnQsIHNjcmVlblgsIHNjcmVlblksIG1hcFgsIG1hcFksIGhhbmRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOWcsOWbvuWPr+inhuiMg+WbtOaUueWPmOS6i+S7tlxyXG4gICAgICogQHBhcmFtIE51bWJlciBsZWZ0IOW3puS4iuinkljlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgdG9wIOW3puS4iuinklnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgcmlnaHQg5Y+z5LiL6KeSWOWdkOagh1xyXG4gICAgICogQHBhcmFtIE51bWJlciBib3R0b20g5Y+z5LiL6KeSWeWdkOagh1xyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uRXh0ZW50Q2hhbmdlZCA9IGZ1bmN0aW9uIChsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b20pIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uRXh0ZW50Q2hhbmdlZCA/IHRoaXMudG9vbC5vbkV4dGVudENoYW5nZWQobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLmV4dGVudGNoYW5nZWQubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdGhpcy5ldmVudHMuZXh0ZW50Y2hhbmdlZFtpXTtcclxuICAgICAgICAgICAgZXZlbnQobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6byg5qCH5Y+M5Ye75LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gRXZlbnQgZSDkuovku7blr7nosaFcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5vbkRibGNsaWNrID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAodGhpcy50b29sICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50b29sLm9uRGJsY2xpY2soZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKipcclxuICAgICAqIOa1j+iniOWZqOeql+WPo+Wkp+Wwj+aUueWPmOS6i+S7tlxyXG4gICAgICogQHBhcmFtIE51bWJlciB3aWR0aCDmlrDnmoTnqpflj6Plrr3luqZcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgaGVpZ2h0IOaWsOeahOeql+WPo+mrmOW6plxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uUmVzaXplID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDlnLDlm77ojrflvpfnhKbngrnnmoTkuovku7ZcclxuICAgICAqIEBwYXJhbSBFdmVudCBlIOS6i+S7tuWvueixoVxyXG4gICAgICovXHJcbiAgICBtYXAucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgfVxyXG4gICAgLyoqKlxyXG4gICAgICog56e76Zmk5Zyw5Zu+55u45YWz55qE5Lqk5LqSXHJcbiAgICAgKi9cclxuICAgIG1hcC5wcm90b3R5cGUucmVtb3ZlSW50ZXJhY3Rpb25zID0gZnVuY3Rpb24oKXt9XHJcbiAgICAvKioqXHJcbiAgICAgKiDph43nva7lnLDlm77nm7jlhbPnmoTkuqTkupJcclxuICAgICAqL1xyXG4gICAgbWFwLnByb3RvdHlwZS5yZXN1bWVJbnRlcmFjdGlvbnMgPSBmdW5jdGlvbigpe31cclxuICAgIFxyXG4gICAgcmV0dXJuIG1hcDtcclxuXHJcbn0pXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvbWFwLmpzIiwiLyoqXHJcbiAqIEBjbGFzcyBHZW9tZXRyeVR5cGU6IOWHoOS9leWbvuW9ouexu+Wei+aemuS4vlxyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzkvMTUuXHJcbiAqL1xyXG5cclxuZGVmaW5lKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIC8qKirkuI3mjIflrprlhbfkvZPlvaLnirbnsbvliKvnmoTlm77lvaIqL1xyXG4gICAgICAgIEdlb21ldHJ5OiAwLFxyXG4gICAgICAgIC8qKirngrnnirblm77lvaIqL1xyXG4gICAgICAgIFBvaW50OiAxLFxyXG4gICAgICAgIC8qKirlnIblvKfnirblm77lvaIqL1xyXG4gICAgICAgIEN1cnZlOiAyLFxyXG4gICAgICAgIC8qKirmrrXnirblm77lvaIqL1xyXG4gICAgICAgIFNlZ21lbnQ6IDMsXHJcbiAgICAgICAgLyoqKuefqeW9oiovXHJcbiAgICAgICAgRW52ZWxvcGU6IDQsXHJcbiAgICAgICAgLyoqKue6v+W9oiovXHJcbiAgICAgICAgTGluZTogNSxcclxuICAgICAgICAvKioq5pa55b2iKi9cclxuICAgICAgICBSZWN0YW5nbGU6IDYsXHJcbiAgICAgICAgLyoqKuato+aWueW9oiovXHJcbiAgICAgICAgU3F1YXJlOiA3LFxyXG4gICAgICAgIC8qKirlnIblvaIqL1xyXG4gICAgICAgIENpcmNsZTogOCxcclxuICAgICAgICAvKioq5qSt5ZyG5b2iKi9cclxuICAgICAgICBFbGxpcHNlOiA5LFxyXG4gICAgICAgIC8qKirlpJrkuKrngrnooajnpLrnmoTot6/lvoQqL1xyXG4gICAgICAgIFBhdGg6IDEwLFxyXG4gICAgICAgIC8qKirnlLHkuIDns7vliJfnmoTngrnmnoTmiJDnmoTnjq/nirbpl63lkIjlm77lvaIqL1xyXG4gICAgICAgIFJpbmc6IDExLFxyXG4gICAgICAgIC8qKirlpJrlnIblvKflm77lvaIqL1xyXG4gICAgICAgIFBvbHlDdXJ2ZTogMTIsXHJcbiAgICAgICAgLyoqKuS4gOS4quaIluWkmuS4qui3r+W+hOeKtuWbvuW9ouihqOekuueahOepuumXtOWHoOS9leWbvuW9oiovXHJcbiAgICAgICAgUG9seWxpbmU6IDEzLFxyXG4gICAgICAgIC8qKirkuIDkuKrmiJbogIXlpJrkuKrnjq/nirblm77lvaLooajnpLrnmoTnqbrpl7Tlh6DkvZXlm77lvaIqL1xyXG4gICAgICAgIFBvbHlnb246IDE0LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWkmueCuVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE11bHRpUG9pbnQ6IDE1LFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWkmumdolxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIE11bHRpUG9seWdvbjogMTZcclxuICAgIH1cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9nZW9tZXRyaWVzL2dlb21ldHJ5dHlwZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtdLGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZ2xvYmUgPSBmdW5jdGlvbigpe1xyXG5cclxuICAgIH1cclxuICAgIHJldHVybiBnbG9iZTtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvbWFwL2dsb2JlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5cclxuZGVmaW5lKFsnLi9nZW9tZXRyaWVzL2dlb21ldHJ5dHlwZScsJy4vZ2VvbWV0cmllcy9nZW9tZXRyeScsXCIuL21hcC9tYXBcIixcIi4vbWFwL2dsb2JlXCJdLCBmdW5jdGlvbiAoR2VvbWV0cnlUeXBlLEdlb21ldHJ5LE1hcCxHbG9iZSkge1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIuZ2VvbSA9IGcyLmdlb20gfHx7fTtcclxuICAgIGcyLm1hcHMgPWcyLm1hcHMgfHwge307XHJcbiAgICBnMi5nZW9tLkdlb21ldHJ5VHlwZT1HZW9tZXRyeVR5cGU7XHJcbiAgICBnMi5nZW9tLkdlb21ldHJ5ID1HZW9tZXRyeTtcclxuICAgIGcyLm1hcHMuSU1hcD1NYXA7XHJcbiAgICBnMi5tYXBzLklHbG9iZSA9IEdsb2JlO1xyXG4gICAgZzIubWFwcy5HbG9iZWxpdWZlbmcgPSBHbG9iZTtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvZXhwb3J0LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoWycuL2xhbmcvY2xhc3NVdGlsJ10sIGZ1bmN0aW9uIChDbGFzc1V0aWwpIHtcclxuICAgIHdpbmRvdy5nMiA9IHdpbmRvdy5nMiB8fCB7fTtcclxuICAgIHZhciBnMiA9IHdpbmRvdy5nMjtcclxuICAgIGcyLmxhbmc9ZzIubGFuZyB8fCB7fTtcclxuICAgIGcyLmxhbmcuQ2xhc3NVdGlsID0gQ2xhc3NVdGlsO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2cyL2V4cG9ydC5qcyIsIi8qKlxyXG4gKiBAY2xhc3MgR2VvbWV0cnk6IOaJgOacieepuumXtOWHoOS9leWbvuW9oueahOWfuuexu+Wei1xyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzgvMjEuXHJcbiAqL1xyXG5cclxuZGVmaW5lKFsnLi9nZW9tZXRyeXR5cGUnXSwgZnVuY3Rpb24gKEdlb21ldHJ5VHlwZSkge1xyXG4gICAgdmFyIGdlb21ldHJ5ID0gZnVuY3Rpb24gKG9wdHMpIHtcclxuICAgICAgICB0aGlzLiR0eXBlID0gJ0dlb21ldHJ5LGh0dHA6Ly93d3cuR3MuY29tJztcclxuICAgICAgICB2YXIgb3B0c3MgPSBvcHRzIHx8IHt9O1xyXG4gICAgICAgIC8qKirnqbrpl7TmlbDmja7lj4LogIPvvIzlpoLopoHmn6XnnIvmm7TlpJrotYTmlpnvvIzor7flj4Lop4FlbnVtU3BhdGlhbFJlZmVyZW5jZeaemuS4vuOAgiovXHJcbiAgICAgICAgdGhpcy5zcGF0aWFsUmVmZXJlbmNlID0gb3B0c3Muc3BhdGlhbFJlZmVyZW5jZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqKua1rueCueaVsOexu+Wei+iuoeeul+eyvuW6pu+8jOS/neeVmTTkvY3lsI/mlbAqL1xyXG4gICAgZ2VvbWV0cnkudG9sZXJhdGUgPSAwLjAwMDAwMDAwMDAwMTtcclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDorr7nva7nqbrpl7TmlbDmja7lj4LogINcclxuICAgICAqIEBwYXJhbSBOdW1iZXIgc3Ig5paw55qE56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5zZXRTcGF0aWFsUmVmZXJlbmNlID0gZnVuY3Rpb24gKHNyKSB7XHJcbiAgICAgICAgdGhpcy5zcGF0aWFsUmVmZXJlbmNlID0gc3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKipcclxuICAgICAqIOiOt+WPluepuumXtOaVsOaNruWPguiAg1xyXG4gICAgICogQHJldHVybnMg6L+U5Zue5pW05pWw5b2i5byP6KGo56S655qE56m66Ze05pWw5o2u5Y+C6ICDXHJcbiAgICAgKi9cclxuICAgIGdlb21ldHJ5LnByb3RvdHlwZS5nZXRTcGF0aWFsUmVmZXJlbmNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwYXRpYWxSZWZlcmVuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog6I635Y+W5Yeg5L2V5Zu+5b2i57G75Z6L77yM5aaC6KaB5p+l55yL5pu05aSa6LWE5paZ77yM6K+35Y+C6KeBR2VvbWV0cnlUeXBl5p6a5Li+44CCXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm55HZW9tZXRyeVR5cGXmnprkuL5cclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmdldEdlb21ldHJ5VHlwZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gR2VvbWV0cnlUeXBlLkdlb21ldHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKirnqbrpl7TmlbDmja7lj4LogIPlgLwqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLnNwYXRpYWxSZWZlcmVuY2UgPSAwO1xyXG5cclxuICAgIC8qKipcclxuICAgICAqIOavlOi+g+S4pOS4quWHoOS9leWbvuW9ouWvueixoeaYr+WQpuebuOWQjFxyXG4gICAgICogQHBhcmFtIEdlb21ldHJ5IG9iaiDmr5TovoPnmoTlh6DkvZXlm77lvaLlr7nosaFcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnnRydWXooajnpLrnm7jlkIzvvIzov5Tlm55mYWxzZeihqOekuuS4jeWQjFxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDkvb/lh6DkvZXlm77lvaLmraPluLjljJbjgIHop4TojIPljJbjgIJcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDnp7vliqjlh6DkvZXlm77lvaLlr7nosaFcclxuICAgICAqIEBwYXJhbSBQb2ludCBwb2ludCBHZW9tZXRyeeWvueixoeWBj+enu+mHj1xyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUub2Zmc2V0ID0gZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICog5YWL6ZqG5a+56LGhXHJcbiAgICAgKiBAcmV0dXJucyDov5Tlm57kuIDkuKrmlrDnmoRHZW9tZXRyeeWvueixoVxyXG4gICAgICovXHJcbiAgICBnZW9tZXRyeS5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGdlb21ldHJ5KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiDojrflj5blvZPliY1HSVPlvaLnirbnmoTlpJbmjqXnn6nlvaJcclxuICAgICAqL1xyXG4gICAgZ2VvbWV0cnkucHJvdG90eXBlLmVudmVsb3BlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBnZW9tZXRyeTtcclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvZ2VvbWV0cmllcy9nZW9tZXRyeS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtcIi4vZXhwb3J0XCIsXCIuL21hcC9vbC9vbG1hcFwiXSxmdW5jdGlvbihnaXMsT2xNYXApe1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIubWFwcz1nMi5tYXBzIHx8IHt9O1xyXG4gICAgZzIubWFwcy5NYXAgPSBPbE1hcDtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvZXhwb3J0MmQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXVmZW5nIG9uIDIwMTcvMTEvMi5cclxuICovXHJcbi8qKlxyXG4gKiBAY2xhc3MgT2xNYXA6IE9wZW5MYXllcuWcsOWbvuexu+Wei1xyXG4gKiBDcmVhdGVkIGJ5IGxpZ2FuZyBvbiAyMDE0LzkvMTcuXHJcbiAqL1xyXG5cclxuZGVmaW5lKFsnLi4vLi4vLi4vZzIvbGFuZy9jbGFzc1V0aWwnLCAnLi4vbWFwJ10sIGZ1bmN0aW9uIChDbGFzc1V0aWwsIE1hcCkge1xyXG4gICBjb25zb2xlLmxvZyh3aW5kb3cualF1ZXJ5KTtcclxuICAgdmFyIG9sbWFwID0gZnVuY3Rpb24ob3B0cyl7XHJcbiAgICAgICB2YXIgb3B0c3MgPSBvcHRzIHx8e307XHJcbiAgICAgICBNYXAuY2FsbCh0aGlzLG9wdHNzKTtcclxuICAgfVxyXG4gICAgQ2xhc3NVdGlsLmV4dGVuZDIob2xtYXAsIE1hcCk7XHJcbiAgIHJldHVybiBvbG1hcDtcclxufSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hcHAvc2NyaXB0cy90c2dpcy9naXMvbWFwL29sL29sbWFwLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl1ZmVuZyBvbiAyMDE3LzExLzIuXHJcbiAqL1xyXG5kZWZpbmUoW1wiLi9leHBvcnRcIixcIi4vbWFwL2NtL2NtZ2xvYmVcIl0sZnVuY3Rpb24oZ2lzLENNR2xvYmUpe1xyXG4gICAgd2luZG93LmcyID0gd2luZG93LmcyIHx8IHt9O1xyXG4gICAgdmFyIGcyID0gd2luZG93LmcyO1xyXG4gICAgZzIubWFwcz1nMi5tYXBzIHx8IHt9XHJcbiAgICBnMi5tYXBzLkdsb2JlPUNNR2xvYmU7XHJcblxyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9leHBvcnQzZC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFsnLi4vLi4vLi4vZzIvbGFuZy9jbGFzc1V0aWwnLCAnLi4vbWFwJywgJy4uL2dsb2JlJ10sIGZ1bmN0aW9uIChDbGFzc1V0aWwsIE1hcCxHbG9iZSkge1xyXG5cclxuICAgIHZhciBnbG9iZSA9IGZ1bmN0aW9uKG9wdHMpe1xyXG4gICAgICAgIHZhciBvcHRzcyA9IG9wdHMgfHwge307XHJcbiAgICAgICAgR2xvYmUuY2FsbCh0aGlzLG9wdHNzKTtcclxuICAgICAgICBNYXAuY2FsbCh0aGlzLG9wdHNzKTtcclxuICAgIH1cclxuXHJcbiAgICBDbGFzc1V0aWwuZXh0ZW5kMihnbG9iZSxHbG9iZSk7XHJcbiAgICBDbGFzc1V0aWwuZXh0ZW5kMihnbG9iZSxNYXApO1xyXG4gICAgcmV0dXJuIGdsb2JlO1xyXG59KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9zY3JpcHRzL3RzZ2lzL2dpcy9tYXAvY20vY21nbG9iZS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpdWZlbmcgb24gMjAxNy8xMS8yLlxyXG4gKi9cclxuZGVmaW5lKFtcIi4vZzIvZXhwb3J0XCIsXCIuL2dpcy9leHBvcnQyZFwiLFwiLi9naXMvZXhwb3J0M2RcIl0sZnVuY3Rpb24oKXtcclxuXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL3NjcmlwdHMvdHNnaXMvdHNnaXMuanMiXSwic291cmNlUm9vdCI6IiJ9