(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = {
    multipleSlots: true,
    addGlobalClass: true };


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 14:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 29:
/*!****************************************************!*\
  !*** X:/毕业设计/MilkBusiness/components/mqtt/mqtt.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function (f) {if (true) {module.exports = f();} else { var g; }})(function () {var define, module, exports;return function () {function r(e, n, t) {function o(i, f) {if (!n[i]) {if (!e[i]) {var c = "function" == typeof require && require;if (!f && c) return require(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;}var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {var n = e[i][1][r];return o(n || r);}, p, p.exports, r, e, n, t);}return n[i].exports;}for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {o(t[i]);}return o;}return r;}()({ 1: [function (require, module, exports) {(function (process, global) {"use strict";var events = require("events");var Store = require("./store");var mqttPacket = require("mqtt-packet");var Writable = require("readable-stream").Writable;var inherits = require("inherits");var reInterval = require("reinterval");var validations = require("./validations");var xtend = require("xtend");var setImmediate = global.setImmediate || function (callback) {process.nextTick(callback);};var defaultConnectOptions = { keepalive: 60, reschedulePings: true, protocolId: "MQTT", protocolVersion: 4, reconnectPeriod: 1e3, connectTimeout: 30 * 1e3, clean: true, resubscribe: true };var errors = { 0: "", 1: "Unacceptable protocol version", 2: "Identifier rejected", 3: "Server unavailable", 4: "Bad username or password", 5: "Not authorized", 16: "No matching subscribers", 17: "No subscription existed", 128: "Unspecified error", 129: "Malformed Packet", 130: "Protocol Error", 131: "Implementation specific error", 132: "Unsupported Protocol Version", 133: "Client Identifier not valid", 134: "Bad User Name or Password", 135: "Not authorized", 136: "Server unavailable", 137: "Server busy", 138: "Banned", 139: "Server shutting down", 140: "Bad authentication method", 141: "Keep Alive timeout", 142: "Session taken over", 143: "Topic Filter invalid", 144: "Topic Name invalid", 145: "Packet identifier in use", 146: "Packet Identifier not found", 147: "Receive Maximum exceeded", 148: "Topic Alias invalid", 149: "Packet too large", 150: "Message rate too high", 151: "Quota exceeded", 152: "Administrative action", 153: "Payload format invalid", 154: "Retain not supported", 155: "QoS not supported", 156: "Use another server", 157: "Server moved", 158: "Shared Subscriptions not supported", 159: "Connection rate exceeded", 160: "Maximum connect time", 161: "Subscription Identifiers not supported", 162: "Wildcard Subscriptions not supported" };function defaultId() {return "mqttjs_" + Math.random().toString(16).substr(2, 8);}function sendPacket(client, packet, cb) {client.emit("packetsend", packet);var result = mqttPacket.writeToStream(packet, client.stream, client.options);if (!result && cb) {client.stream.once("drain", cb);} else if (cb) {cb();}}function flush(queue) {if (queue) {Object.keys(queue).forEach(function (messageId) {if (typeof queue[messageId].cb === "function") {queue[messageId].cb(new Error("Connection closed"));delete queue[messageId];}});}}function flushVolatile(queue) {if (queue) {Object.keys(queue).forEach(function (messageId) {if (queue[messageId].volatile && typeof queue[messageId].cb === "function") {queue[messageId].cb(new Error("Connection closed"));delete queue[messageId];}});}}function storeAndSend(client, packet, cb, cbStorePut) {client.outgoingStore.put(packet, function storedPacket(err) {if (err) {return cb && cb(err);}cbStorePut();sendPacket(client, packet, cb);});}function nop() {}function MqttClient(streamBuilder, options) {var k;var that = this;if (!(this instanceof MqttClient)) {return new MqttClient(streamBuilder, options);}this.options = options || {};for (k in defaultConnectOptions) {if (typeof this.options[k] === "undefined") {this.options[k] = defaultConnectOptions[k];} else {this.options[k] = options[k];}}this.options.clientId = typeof options.clientId === "string" ? options.clientId : defaultId();this.options.customHandleAcks = options.protocolVersion === 5 && options.customHandleAcks ? options.customHandleAcks : function () {arguments[3](0);};this.streamBuilder = streamBuilder;this.outgoingStore = options.outgoingStore || new Store();this.incomingStore = options.incomingStore || new Store();this.queueQoSZero = options.queueQoSZero === undefined ? true : options.queueQoSZero;this._resubscribeTopics = {};this.messageIdToTopic = {};this.pingTimer = null;this.connected = false;this.disconnecting = false;this.queue = [];this.connackTimer = null;this.reconnectTimer = null;this._storeProcessing = false;this._packetIdsDuringStoreProcessing = {};this.nextId = Math.max(1, Math.floor(Math.random() * 65535));this.outgoing = {};this._firstConnection = true;this.on("close", function () {this.connected = false;clearTimeout(this.connackTimer);});this.on("connect", function () {var queue = this.queue;function deliver() {var entry = queue.shift();var packet = null;if (!entry) {return;}packet = entry.packet;that._sendPacket(packet, function (err) {if (entry.cb) {entry.cb(err);}deliver();});}deliver();});this.on("close", function () {if (that.pingTimer !== null) {that.pingTimer.clear();that.pingTimer = null;}});this.on("close", this._setupReconnect);events.EventEmitter.call(this);this._setupStream();}inherits(MqttClient, events.EventEmitter);MqttClient.prototype._setupStream = function () {var connectPacket;var that = this;var writable = new Writable();var parser = mqttPacket.parser(this.options);var completeParse = null;var packets = [];this._clearReconnect();this.stream = this.streamBuilder(this);parser.on("packet", function (packet) {packets.push(packet);});function nextTickWork() {if (packets.length) {process.nextTick(work);} else {var done = completeParse;completeParse = null;done();}}function work() {var packet = packets.shift();if (packet) {that._handlePacket(packet, nextTickWork);} else {var done = completeParse;completeParse = null;if (done) done();}}writable._write = function (buf, enc, done) {completeParse = done;parser.parse(buf);work();};this.stream.pipe(writable);this.stream.on("error", nop);this.stream.on("close", function () {flushVolatile(that.outgoing);that.emit("close");});connectPacket = Object.create(this.options);connectPacket.cmd = "connect";sendPacket(this, connectPacket);parser.on("error", this.emit.bind(this, "error"));if (this.options.properties) {if (!this.options.properties.authenticationMethod && this.options.properties.authenticationData) {this.emit("error", new Error("Packet has no Authentication Method"));return this;}if (this.options.properties.authenticationMethod && this.options.authPacket && typeof this.options.authPacket === "object") {var authPacket = xtend({ cmd: "auth", reasonCode: 0 }, this.options.authPacket);sendPacket(this, authPacket);}}this.stream.setMaxListeners(1e3);clearTimeout(this.connackTimer);this.connackTimer = setTimeout(function () {that._cleanUp(true);}, this.options.connectTimeout);};MqttClient.prototype._handlePacket = function (packet, done) {var options = this.options;if (options.protocolVersion === 5 && options.properties && options.properties.maximumPacketSize && options.properties.maximumPacketSize < packet.length) {this.emit("error", new Error("exceeding packets size " + packet.cmd));this.end({ reasonCode: 149, properties: { reasonString: "Maximum packet size was exceeded" } });return this;}this.emit("packetreceive", packet);switch (packet.cmd) {case "publish":this._handlePublish(packet, done);break;case "puback":case "pubrec":case "pubcomp":case "suback":case "unsuback":this._handleAck(packet);done();break;case "pubrel":this._handlePubrel(packet, done);break;case "connack":this._handleConnack(packet);done();break;case "pingresp":this._handlePingresp(packet);done();break;case "disconnect":this._handleDisconnect(packet);done();break;default:break;}};MqttClient.prototype._checkDisconnecting = function (callback) {if (this.disconnecting) {if (callback) {callback(new Error("client disconnecting"));} else {this.emit("error", new Error("client disconnecting"));}}return this.disconnecting;};MqttClient.prototype.publish = function (topic, message, opts, callback) {var packet;var options = this.options;if (typeof opts === "function") {callback = opts;opts = null;}var defaultOpts = { qos: 0, retain: false, dup: false };opts = xtend(defaultOpts, opts);if (this._checkDisconnecting(callback)) {return this;}packet = { cmd: "publish", topic: topic, payload: message, qos: opts.qos, retain: opts.retain, messageId: this._nextId(), dup: opts.dup };if (options.protocolVersion === 5) {packet.properties = opts.properties;if (!options.properties && packet.properties && packet.properties.topicAlias || opts.properties && options.properties && (opts.properties.topicAlias && options.properties.topicAliasMaximum && opts.properties.topicAlias > options.properties.topicAliasMaximum || !options.properties.topicAliasMaximum && opts.properties.topicAlias)) {delete packet.properties.topicAlias;}}switch (opts.qos) {case 1:case 2:this.outgoing[packet.messageId] = { volatile: false, cb: callback || nop };if (this._storeProcessing) {this._packetIdsDuringStoreProcessing[packet.messageId] = false;this._storePacket(packet, undefined, opts.cbStorePut);} else {this._sendPacket(packet, undefined, opts.cbStorePut);}break;default:if (this._storeProcessing) {this._storePacket(packet, callback, opts.cbStorePut);} else {this._sendPacket(packet, callback, opts.cbStorePut);}break;}return this;};MqttClient.prototype.subscribe = function () {var packet;var args = new Array(arguments.length);for (var i = 0; i < arguments.length; i++) {args[i] = arguments[i];}var subs = [];var obj = args.shift();var resubscribe = obj.resubscribe;var callback = args.pop() || nop;var opts = args.pop();var invalidTopic;var that = this;var version = this.options.protocolVersion;delete obj.resubscribe;if (typeof obj === "string") {obj = [obj];}if (typeof callback !== "function") {opts = callback;callback = nop;}invalidTopic = validations.validateTopics(obj);if (invalidTopic !== null) {setImmediate(callback, new Error("Invalid topic " + invalidTopic));return this;}if (this._checkDisconnecting(callback)) {return this;}var defaultOpts = { qos: 0 };if (version === 5) {defaultOpts.nl = false;defaultOpts.rap = false;defaultOpts.rh = 0;}opts = xtend(defaultOpts, opts);if (Array.isArray(obj)) {obj.forEach(function (topic) {if (!that._resubscribeTopics.hasOwnProperty(topic) || that._resubscribeTopics[topic].qos < opts.qos || resubscribe) {var currentOpts = { topic: topic, qos: opts.qos };if (version === 5) {currentOpts.nl = opts.nl;currentOpts.rap = opts.rap;currentOpts.rh = opts.rh;currentOpts.properties = opts.properties;}subs.push(currentOpts);}});} else {Object.keys(obj).forEach(function (k) {if (!that._resubscribeTopics.hasOwnProperty(k) || that._resubscribeTopics[k].qos < obj[k].qos || resubscribe) {var currentOpts = { topic: k, qos: obj[k].qos };if (version === 5) {currentOpts.nl = obj[k].nl;currentOpts.rap = obj[k].rap;currentOpts.rh = obj[k].rh;currentOpts.properties = opts.properties;}subs.push(currentOpts);}});}packet = { cmd: "subscribe", subscriptions: subs, qos: 1, retain: false, dup: false, messageId: this._nextId() };if (opts.properties) {packet.properties = opts.properties;}if (!subs.length) {callback(null, []);return;}if (this.options.resubscribe) {var topics = [];subs.forEach(function (sub) {if (that.options.reconnectPeriod > 0) {var topic = { qos: sub.qos };if (version === 5) {topic.nl = sub.nl || false;topic.rap = sub.rap || false;topic.rh = sub.rh || 0;topic.properties = sub.properties;}that._resubscribeTopics[sub.topic] = topic;topics.push(sub.topic);}});that.messageIdToTopic[packet.messageId] = topics;}this.outgoing[packet.messageId] = { volatile: true, cb: function cb(err, packet) {if (!err) {var granted = packet.granted;for (var i = 0; i < granted.length; i += 1) {subs[i].qos = granted[i];}}callback(err, subs);} };this._sendPacket(packet);return this;};MqttClient.prototype.unsubscribe = function () {var packet = { cmd: "unsubscribe", qos: 1, messageId: this._nextId() };var that = this;var args = new Array(arguments.length);for (var i = 0; i < arguments.length; i++) {args[i] = arguments[i];}var topic = args.shift();var callback = args.pop() || nop;var opts = args.pop();if (typeof topic === "string") {topic = [topic];}if (typeof callback !== "function") {opts = callback;callback = nop;}if (this._checkDisconnecting(callback)) {return this;}if (typeof topic === "string") {packet.unsubscriptions = [topic];} else if (typeof topic === "object" && topic.length) {packet.unsubscriptions = topic;}if (this.options.resubscribe) {packet.unsubscriptions.forEach(function (topic) {delete that._resubscribeTopics[topic];});}if (typeof opts === "object" && opts.properties) {packet.properties = opts.properties;}this.outgoing[packet.messageId] = { volatile: true, cb: callback };this._sendPacket(packet);return this;};MqttClient.prototype.end = function () {var that = this;var force = arguments[0];var opts = arguments[1];var cb = arguments[2];if (force == null || typeof force !== "boolean") {cb = opts || nop;opts = force;force = false;if (typeof opts !== "object") {cb = opts;opts = null;if (typeof cb !== "function") {cb = nop;}}}if (typeof opts !== "object") {cb = opts;opts = null;}cb = cb || nop;function closeStores() {that.disconnected = true;that.incomingStore.close(function () {that.outgoingStore.close(function () {if (cb) {cb.apply(null, arguments);}that.emit("end");});});if (that._deferredReconnect) {that._deferredReconnect();}}function finish() {that._cleanUp(force, setImmediate.bind(null, closeStores), opts);}if (this.disconnecting) {return this;}this._clearReconnect();this.disconnecting = true;if (!force && Object.keys(this.outgoing).length > 0) {this.once("outgoingEmpty", setTimeout.bind(null, finish, 10));} else {finish();}return this;};MqttClient.prototype.removeOutgoingMessage = function (mid) {var cb = this.outgoing[mid] ? this.outgoing[mid].cb : null;delete this.outgoing[mid];this.outgoingStore.del({ messageId: mid }, function () {cb(new Error("Message removed"));});return this;};MqttClient.prototype.reconnect = function (opts) {var that = this;var f = function f() {if (opts) {that.options.incomingStore = opts.incomingStore;that.options.outgoingStore = opts.outgoingStore;} else {that.options.incomingStore = null;that.options.outgoingStore = null;}that.incomingStore = that.options.incomingStore || new Store();that.outgoingStore = that.options.outgoingStore || new Store();that.disconnecting = false;that.disconnected = false;that._deferredReconnect = null;that._reconnect();};if (this.disconnecting && !this.disconnected) {this._deferredReconnect = f;} else {f();}return this;};MqttClient.prototype._reconnect = function () {this.emit("reconnect");this._setupStream();};MqttClient.prototype._setupReconnect = function () {var that = this;if (!that.disconnecting && !that.reconnectTimer && that.options.reconnectPeriod > 0) {if (!this.reconnecting) {this.emit("offline");this.reconnecting = true;}that.reconnectTimer = setInterval(function () {that._reconnect();}, that.options.reconnectPeriod);}};MqttClient.prototype._clearReconnect = function () {if (this.reconnectTimer) {clearInterval(this.reconnectTimer);this.reconnectTimer = null;}};MqttClient.prototype._cleanUp = function (forced, done) {var opts = arguments[2];if (done) {this.stream.on("close", done);}if (forced) {if (this.options.reconnectPeriod === 0 && this.options.clean) {flush(this.outgoing);}this.stream.destroy();} else {var packet = xtend({ cmd: "disconnect" }, opts);this._sendPacket(packet, setImmediate.bind(null, this.stream.end.bind(this.stream)));}if (!this.disconnecting) {this._clearReconnect();this._setupReconnect();}if (this.pingTimer !== null) {this.pingTimer.clear();this.pingTimer = null;}if (done && !this.connected) {this.stream.removeListener("close", done);done();}};MqttClient.prototype._sendPacket = function (packet, cb, cbStorePut) {cbStorePut = cbStorePut || nop;if (!this.connected) {this._storePacket(packet, cb, cbStorePut);return;}this._shiftPingInterval();switch (packet.cmd) {case "publish":break;case "pubrel":storeAndSend(this, packet, cb, cbStorePut);return;default:sendPacket(this, packet, cb);return;}switch (packet.qos) {case 2:case 1:storeAndSend(this, packet, cb, cbStorePut);break;case 0:default:sendPacket(this, packet, cb);break;}};MqttClient.prototype._storePacket = function (packet, cb, cbStorePut) {cbStorePut = cbStorePut || nop;if ((packet.qos || 0) === 0 && this.queueQoSZero || packet.cmd !== "publish") {this.queue.push({ packet: packet, cb: cb });} else if (packet.qos > 0) {cb = this.outgoing[packet.messageId] ? this.outgoing[packet.messageId].cb : null;this.outgoingStore.put(packet, function (err) {if (err) {return cb && cb(err);}cbStorePut();});} else if (cb) {cb(new Error("No connection to broker"));}};MqttClient.prototype._setupPingTimer = function () {var that = this;if (!this.pingTimer && this.options.keepalive) {this.pingResp = true;this.pingTimer = reInterval(function () {that._checkPing();}, this.options.keepalive * 1e3);}};MqttClient.prototype._shiftPingInterval = function () {if (this.pingTimer && this.options.keepalive && this.options.reschedulePings) {this.pingTimer.reschedule(this.options.keepalive * 1e3);}};MqttClient.prototype._checkPing = function () {if (this.pingResp) {this.pingResp = false;this._sendPacket({ cmd: "pingreq" });} else {this._cleanUp(true);}};MqttClient.prototype._handlePingresp = function () {this.pingResp = true;};MqttClient.prototype._handleConnack = function (packet) {var options = this.options;var version = options.protocolVersion;var rc = version === 5 ? packet.reasonCode : packet.returnCode;clearTimeout(this.connackTimer);if (packet.properties) {if (packet.properties.topicAliasMaximum) {if (!options.properties) {options.properties = {};}options.properties.topicAliasMaximum = packet.properties.topicAliasMaximum;}if (packet.properties.serverKeepAlive && options.keepalive) {options.keepalive = packet.properties.serverKeepAlive;this._shiftPingInterval();}if (packet.properties.maximumPacketSize) {if (!options.properties) {options.properties = {};}options.properties.maximumPacketSize = packet.properties.maximumPacketSize;}}if (rc === 0) {this.reconnecting = false;this._onConnect(packet);} else if (rc > 0) {var err = new Error("Connection refused: " + errors[rc]);err.code = rc;this.emit("error", err);}};MqttClient.prototype._handlePublish = function (packet, done) {done = typeof done !== "undefined" ? done : nop;var topic = packet.topic.toString();var message = packet.payload;var qos = packet.qos;var mid = packet.messageId;var that = this;var options = this.options;var validReasonCodes = [0, 16, 128, 131, 135, 144, 145, 151, 153];switch (qos) {case 2:{options.customHandleAcks(topic, message, packet, function (error, code) {if (!(error instanceof Error)) {code = error;error = null;}if (error) {return that.emit("error", error);}if (validReasonCodes.indexOf(code) === -1) {return that.emit("error", new Error("Wrong reason code for pubrec"));}if (code) {that._sendPacket({ cmd: "pubrec", messageId: mid, reasonCode: code }, done);} else {that.incomingStore.put(packet, function () {that._sendPacket({ cmd: "pubrec", messageId: mid }, done);});}});break;}case 1:{options.customHandleAcks(topic, message, packet, function (error, code) {if (!(error instanceof Error)) {code = error;error = null;}if (error) {return that.emit("error", error);}if (validReasonCodes.indexOf(code) === -1) {return that.emit("error", new Error("Wrong reason code for puback"));}if (!code) {that.emit("message", topic, message, packet);}that.handleMessage(packet, function (err) {if (err) {return done && done(err);}that._sendPacket({ cmd: "puback", messageId: mid, reasonCode: code }, done);});});break;}case 0:this.emit("message", topic, message, packet);this.handleMessage(packet, done);break;default:break;}};MqttClient.prototype.handleMessage = function (packet, callback) {callback();};MqttClient.prototype._handleAck = function (packet) {var mid = packet.messageId;var type = packet.cmd;var response = null;var cb = this.outgoing[mid] ? this.outgoing[mid].cb : null;var that = this;var err;if (!cb) {return;}switch (type) {case "pubcomp":case "puback":var pubackRC = packet.reasonCode;if (pubackRC && pubackRC > 0 && pubackRC !== 16) {err = new Error("Publish error: " + errors[pubackRC]);err.code = pubackRC;cb(err, packet);}delete this.outgoing[mid];this.outgoingStore.del(packet, cb);break;case "pubrec":response = { cmd: "pubrel", qos: 2, messageId: mid };var pubrecRC = packet.reasonCode;if (pubrecRC && pubrecRC > 0 && pubrecRC !== 16) {err = new Error("Publish error: " + errors[pubrecRC]);err.code = pubrecRC;cb(err, packet);} else {this._sendPacket(response);}break;case "suback":delete this.outgoing[mid];for (var grantedI = 0; grantedI < packet.granted.length; grantedI++) {if ((packet.granted[grantedI] & 128) !== 0) {var topics = this.messageIdToTopic[mid];if (topics) {topics.forEach(function (topic) {delete that._resubscribeTopics[topic];});}}}cb(null, packet);break;case "unsuback":delete this.outgoing[mid];cb(null);break;default:that.emit("error", new Error("unrecognized packet type"));}if (this.disconnecting && Object.keys(this.outgoing).length === 0) {this.emit("outgoingEmpty");}};MqttClient.prototype._handlePubrel = function (packet, callback) {callback = typeof callback !== "undefined" ? callback : nop;var mid = packet.messageId;var that = this;var comp = { cmd: "pubcomp", messageId: mid };that.incomingStore.get(packet, function (err, pub) {if (!err) {that.emit("message", pub.topic, pub.payload, pub);that.handleMessage(pub, function (err) {if (err) {return callback(err);}that.incomingStore.del(pub, nop);that._sendPacket(comp, callback);});} else {that._sendPacket(comp, callback);}});};MqttClient.prototype._handleDisconnect = function (packet) {this.emit("disconnect", packet);};MqttClient.prototype._nextId = function () {var id = this.nextId++;if (this.nextId === 65536) {this.nextId = 1;}return id;};MqttClient.prototype.getLastMessageId = function () {return this.nextId === 1 ? 65535 : this.nextId - 1;};MqttClient.prototype._resubscribe = function (connack) {var _resubscribeTopicsKeys = Object.keys(this._resubscribeTopics);if (!this._firstConnection && (this.options.clean || this.options.protocolVersion === 5 && !connack.sessionPresent) && _resubscribeTopicsKeys.length > 0) {if (this.options.resubscribe) {if (this.options.protocolVersion === 5) {for (var topicI = 0; topicI < _resubscribeTopicsKeys.length; topicI++) {var resubscribeTopic = {};resubscribeTopic[_resubscribeTopicsKeys[topicI]] = this._resubscribeTopics[_resubscribeTopicsKeys[topicI]];resubscribeTopic.resubscribe = true;this.subscribe(resubscribeTopic, { properties: resubscribeTopic[_resubscribeTopicsKeys[topicI]].properties });}} else {this._resubscribeTopics.resubscribe = true;this.subscribe(this._resubscribeTopics);}} else {this._resubscribeTopics = {};}}this._firstConnection = false;};MqttClient.prototype._onConnect = function (packet) {if (this.disconnected) {this.emit("connect", packet);return;}var that = this;this._setupPingTimer();this._resubscribe(packet);this.connected = true;function startStreamProcess() {var outStore = that.outgoingStore.createStream();function clearStoreProcessing() {that._storeProcessing = false;that._packetIdsDuringStoreProcessing = {};}that.once("close", remove);outStore.on("error", function (err) {clearStoreProcessing();that.removeListener("close", remove);that.emit("error", err);});function remove() {outStore.destroy();outStore = null;clearStoreProcessing();}function storeDeliver() {if (!outStore) {return;}that._storeProcessing = true;var packet = outStore.read(1);var _cb;if (!packet) {outStore.once("readable", storeDeliver);return;}if (that._packetIdsDuringStoreProcessing[packet.messageId]) {storeDeliver();return;}if (!that.disconnecting && !that.reconnectTimer) {_cb = that.outgoing[packet.messageId] ? that.outgoing[packet.messageId].cb : null;that.outgoing[packet.messageId] = { volatile: false, cb: function cb(err, status) {if (_cb) {_cb(err, status);}storeDeliver();} };that._packetIdsDuringStoreProcessing[packet.messageId] = true;that._sendPacket(packet);} else if (outStore.destroy) {outStore.destroy();}}outStore.on("end", function () {var allProcessed = true;for (var id in that._packetIdsDuringStoreProcessing) {if (!that._packetIdsDuringStoreProcessing[id]) {allProcessed = false;break;}}if (allProcessed) {clearStoreProcessing();that.removeListener("close", remove);that.emit("connect", packet);} else {startStreamProcess();}});storeDeliver();}startStreamProcess();};module.exports = MqttClient;}).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});}, { "./store": 7, "./validations": 8, _process: 92, events: 13, inherits: 80, "mqtt-packet": 84, "readable-stream": 108, reinterval: 109, xtend: 121 }], 2: [function (require, module, exports) {(function (Buffer) {"use strict";var Transform = require("readable-stream").Transform;var duplexify = require("duplexify");var base64 = require("base64-js");var my;var proxy;var stream;var isInitialized = false;function buildProxy() {var proxy = new Transform();proxy._write = function (chunk, encoding, next) {my.sendSocketMessage({ data: chunk.buffer, success: function success() {next();}, fail: function fail() {next(new Error());} });};proxy._flush = function socketEnd(done) {my.closeSocket({ success: function success() {done();} });};return proxy;}function setDefaultOpts(opts) {if (!opts.hostname) {opts.hostname = "localhost";}if (!opts.path) {opts.path = "/";}if (!opts.wsOptions) {opts.wsOptions = {};}}function buildUrl(opts, client) {var protocol = opts.protocol === "alis" ? "wss" : "ws";var url = protocol + "://" + opts.hostname + opts.path;if (opts.port && opts.port !== 80 && opts.port !== 443) {url = protocol + "://" + opts.hostname + ":" + opts.port + opts.path;}if (typeof opts.transformWsUrl === "function") {url = opts.transformWsUrl(url, opts, client);}return url;}function bindEventHandler() {if (isInitialized) return;isInitialized = true;my.onSocketOpen(function () {stream.setReadable(proxy);stream.setWritable(proxy);stream.emit("connect");});my.onSocketMessage(function (res) {if (typeof res.data === "string") {var array = base64.toByteArray(res.data);var buffer = Buffer.from(array);proxy.push(buffer);} else {var reader = new FileReader();reader.addEventListener("load", function () {var data = reader.result;if (data instanceof ArrayBuffer) data = Buffer.from(data);else data = Buffer.from(data, "utf8");proxy.push(data);});reader.readAsArrayBuffer(res.data);}});my.onSocketClose(function () {stream.end();stream.destroy();});my.onSocketError(function (res) {stream.destroy(res);});}function buildStream(client, opts) {opts.hostname = opts.hostname || opts.host;if (!opts.hostname) {throw new Error("Could not determine host. Specify host manually.");}var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";setDefaultOpts(opts);var url = buildUrl(opts, client);my = opts.my;my.connectSocket({ url: url, protocols: websocketSubProtocol });proxy = buildProxy();stream = duplexify.obj();bindEventHandler();return stream;}module.exports = buildStream;}).call(this, require("buffer").Buffer);}, { "base64-js": 10, buffer: 12, duplexify: 17, "readable-stream": 108 }], 3: [function (require, module, exports) {"use strict";var net = require("net");function buildBuilder(client, opts) {var port, host;opts.port = opts.port || 1883;opts.hostname = opts.hostname || opts.host || "localhost";port = opts.port;host = opts.hostname;return net.createConnection(port, host);}module.exports = buildBuilder;}, { net: 11 }], 4: [function (require, module, exports) {"use strict";var tls = require("tls");function buildBuilder(mqttClient, opts) {var connection;opts.port = opts.port || 8883;opts.host = opts.hostname || opts.host || "localhost";opts.rejectUnauthorized = opts.rejectUnauthorized !== false;delete opts.path;connection = tls.connect(opts);connection.on("secureConnect", function () {if (opts.rejectUnauthorized && !connection.authorized) {connection.emit("error", new Error("TLS not authorized"));} else {connection.removeListener("error", handleTLSerrors);}});function handleTLSerrors(err) {if (opts.rejectUnauthorized) {mqttClient.emit("error", err);}connection.end();}connection.on("error", handleTLSerrors);return connection;}module.exports = buildBuilder;}, { tls: 11 }], 5: [function (require, module, exports) {(function (process) {"use strict";var websocket = require("websocket-stream");var urlModule = require("url");var WSS_OPTIONS = ["rejectUnauthorized", "ca", "cert", "key", "pfx", "passphrase"];var IS_BROWSER = process.title === "browser";function buildUrl(opts, client) {var url = opts.protocol + "://" + opts.hostname + ":" + opts.port + opts.path;if (typeof opts.transformWsUrl === "function") {url = opts.transformWsUrl(url, opts, client);}return url;}function setDefaultOpts(opts) {if (!opts.hostname) {opts.hostname = "localhost";}if (!opts.port) {if (opts.protocol === "wss") {opts.port = 443;} else {opts.port = 80;}}if (!opts.path) {opts.path = "/";}if (!opts.wsOptions) {opts.wsOptions = {};}if (!IS_BROWSER && opts.protocol === "wss") {WSS_OPTIONS.forEach(function (prop) {if (opts.hasOwnProperty(prop) && !opts.wsOptions.hasOwnProperty(prop)) {opts.wsOptions[prop] = opts[prop];}});}}function createWebSocket(client, opts) {var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";setDefaultOpts(opts);var url = buildUrl(opts, client);return websocket(url, [websocketSubProtocol], opts.wsOptions);}function buildBuilder(client, opts) {return createWebSocket(client, opts);}function buildBuilderBrowser(client, opts) {if (!opts.hostname) {opts.hostname = opts.host;}if (!opts.hostname) {if (typeof document === "undefined") {throw new Error("Could not determine host. Specify host manually.");}var parsed = urlModule.parse(document.URL);opts.hostname = parsed.hostname;if (!opts.port) {opts.port = parsed.port;}}return createWebSocket(client, opts);}if (IS_BROWSER) {module.exports = buildBuilderBrowser;} else {module.exports = buildBuilder;}}).call(this, require("_process"));}, { _process: 92, url: 113, "websocket-stream": 118 }], 6: [function (require, module, exports) {(function (process, Buffer) {"use strict";var Transform = require("readable-stream").Transform;var duplexify = require("duplexify");var socketTask;var proxy;var stream;function buildProxy() {var proxy = new Transform();proxy._write = function (chunk, encoding, next) {socketTask.send({ data: chunk.buffer, success: function success() {next();}, fail: function fail(errMsg) {next(new Error(errMsg));} });};proxy._flush = function socketEnd(done) {socketTask.close({ success: function success() {done();} });};return proxy;}function setDefaultOpts(opts) {if (!opts.hostname) {opts.hostname = "localhost";}if (!opts.path) {opts.path = "/";}if (!opts.wsOptions) {opts.wsOptions = {};}}function buildUrl(opts, client) {var protocol = opts.protocol === "wxs" ? "wss" : "ws";var url = protocol + "://" + opts.hostname + opts.path;if (opts.port && opts.port !== 80 && opts.port !== 443) {url = protocol + "://" + opts.hostname + ":" + opts.port + opts.path;}if (typeof opts.transformWsUrl === "function") {url = opts.transformWsUrl(url, opts, client);}return url;}function bindEventHandler() {socketTask.onOpen(function () {stream.setReadable(proxy);stream.setWritable(proxy);stream.emit("connect");});socketTask.onMessage(function (res) {var data = res.data;if (data instanceof ArrayBuffer) data = Buffer.from(data);else data = Buffer.from(data, "utf8");proxy.push(data);});socketTask.onClose(function () {stream.end();stream.destroy();});socketTask.onError(function (res) {stream.destroy(new Error(res.errMsg));});}function buildStream(client, opts) {opts.hostname = opts.hostname || opts.host;if (!opts.hostname) {throw new Error("Could not determine host. Specify host manually.");}var websocketSubProtocol = opts.protocolId === "MQIsdp" && opts.protocolVersion === 3 ? "mqttv3.1" : "mqtt";setDefaultOpts(opts);var url = buildUrl(opts, client);socketTask = wx.connectSocket({ url: url, protocols: websocketSubProtocol });proxy = buildProxy();stream = duplexify.obj();stream._destroy = function (err, cb) {socketTask.close({ success: function success() {cb && cb(err);} });};var destroyRef = stream.destroy;stream.destroy = function () {stream.destroy = destroyRef;var self = this;process.nextTick(function () {socketTask.close({ fail: function fail() {self._destroy(new Error());} });});}.bind(stream);bindEventHandler();return stream;}module.exports = buildStream;}).call(this, require("_process"), require("buffer").Buffer);}, { _process: 92, buffer: 12, duplexify: 17, "readable-stream": 108 }], 7: [function (require, module, exports) {(function (process) {"use strict";var xtend = require("xtend");var Readable = require("readable-stream").Readable;var streamsOpts = { objectMode: true };var defaultStoreOptions = { clean: true };var Map = require("es6-map");function Store(options) {if (!(this instanceof Store)) {return new Store(options);}this.options = options || {};this.options = xtend(defaultStoreOptions, options);this._inflights = new Map();}Store.prototype.put = function (packet, cb) {this._inflights.set(packet.messageId, packet);if (cb) {cb();}return this;};Store.prototype.createStream = function () {var stream = new Readable(streamsOpts);var destroyed = false;var values = [];var i = 0;this._inflights.forEach(function (value, key) {values.push(value);});stream._read = function () {if (!destroyed && i < values.length) {this.push(values[i++]);} else {this.push(null);}};stream.destroy = function () {if (destroyed) {return;}var self = this;destroyed = true;process.nextTick(function () {self.emit("close");});};return stream;};Store.prototype.del = function (packet, cb) {packet = this._inflights.get(packet.messageId);if (packet) {this._inflights.delete(packet.messageId);cb(null, packet);} else if (cb) {cb(new Error("missing packet"));}return this;};Store.prototype.get = function (packet, cb) {packet = this._inflights.get(packet.messageId);if (packet) {cb(null, packet);} else if (cb) {cb(new Error("missing packet"));}return this;};Store.prototype.close = function (cb) {if (this.options.clean) {this._inflights = null;}if (cb) {cb();}};module.exports = Store;}).call(this, require("_process"));}, { _process: 92, "es6-map": 67, "readable-stream": 108, xtend: 121 }], 8: [function (require, module, exports) {"use strict";function validateTopic(topic) {var parts = topic.split("/");for (var i = 0; i < parts.length; i++) {if (parts[i] === "+") {continue;}if (parts[i] === "#") {return i === parts.length - 1;}if (parts[i].indexOf("+") !== -1 || parts[i].indexOf("#") !== -1) {return false;}}return true;}function validateTopics(topics) {if (topics.length === 0) {return "empty_topic_list";}for (var i = 0; i < topics.length; i++) {if (!validateTopic(topics[i])) {return topics[i];}}return null;}module.exports = { validateTopics: validateTopics };}, {}], 9: [function (require, module, exports) {(function (process) {"use strict";var MqttClient = require("../client");var Store = require("../store");var url = require("url");var xtend = require("xtend");var protocols = {};if (process.title !== "browser") {protocols.mqtt = require("./tcp");protocols.tcp = require("./tcp");protocols.ssl = require("./tls");protocols.tls = require("./tls");protocols.mqtts = require("./tls");} else {protocols.wx = require("./wx");protocols.wxs = require("./wx");protocols.ali = require("./ali");protocols.alis = require("./ali");}protocols.ws = require("./ws");protocols.wss = require("./ws");function parseAuthOptions(opts) {var matches;if (opts.auth) {matches = opts.auth.match(/^(.+):(.+)$/);if (matches) {opts.username = matches[1];opts.password = matches[2];} else {opts.username = opts.auth;}}}function connect(brokerUrl, opts) {if (typeof brokerUrl === "object" && !opts) {opts = brokerUrl;brokerUrl = null;}opts = opts || {};if (brokerUrl) {var parsed = url.parse(brokerUrl, true);if (parsed.port != null) {parsed.port = Number(parsed.port);}opts = xtend(parsed, opts);if (opts.protocol === null) {throw new Error("Missing protocol");}opts.protocol = opts.protocol.replace(/:$/, "");}parseAuthOptions(opts);if (opts.query && typeof opts.query.clientId === "string") {opts.clientId = opts.query.clientId;}if (opts.cert && opts.key) {if (opts.protocol) {if (["mqtts", "wss", "wxs", "alis"].indexOf(opts.protocol) === -1) {switch (opts.protocol) {case "mqtt":opts.protocol = "mqtts";break;case "ws":opts.protocol = "wss";break;case "wx":opts.protocol = "wxs";break;case "ali":opts.protocol = "alis";break;default:throw new Error('Unknown protocol for secure connection: "' + opts.protocol + '"!');}}} else {throw new Error("Missing secure protocol key");}}if (!protocols[opts.protocol]) {var isSecure = ["mqtts", "wss"].indexOf(opts.protocol) !== -1;opts.protocol = ["mqtt", "mqtts", "ws", "wss", "wx", "wxs", "ali", "alis"].filter(function (key, index) {if (isSecure && index % 2 === 0) {return false;}return typeof protocols[key] === "function";})[0];}if (opts.clean === false && !opts.clientId) {throw new Error("Missing clientId for unclean clients");}if (opts.protocol) {opts.defaultProtocol = opts.protocol;}function wrapper(client) {if (opts.servers) {if (!client._reconnectCount || client._reconnectCount === opts.servers.length) {client._reconnectCount = 0;}opts.host = opts.servers[client._reconnectCount].host;opts.port = opts.servers[client._reconnectCount].port;opts.protocol = !opts.servers[client._reconnectCount].protocol ? opts.defaultProtocol : opts.servers[client._reconnectCount].protocol;opts.hostname = opts.host;client._reconnectCount++;}return protocols[opts.protocol](client, opts);}return new MqttClient(wrapper, opts);}module.exports = connect;module.exports.connect = connect;module.exports.MqttClient = MqttClient;module.exports.Store = Store;}).call(this, require("_process"));}, { "../client": 1, "../store": 7, "./ali": 2, "./tcp": 3, "./tls": 4, "./ws": 5, "./wx": 6, _process: 92, url: 113, xtend: 121 }], 10: [function (require, module, exports) {"use strict";exports.byteLength = byteLength;exports.toByteArray = toByteArray;exports.fromByteArray = fromByteArray;var lookup = [];var revLookup = [];var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for (var i = 0, len = code.length; i < len; ++i) {lookup[i] = code[i];revLookup[code.charCodeAt(i)] = i;}revLookup["-".charCodeAt(0)] = 62;revLookup["_".charCodeAt(0)] = 63;function getLens(b64) {var len = b64.length;if (len % 4 > 0) {throw new Error("Invalid string. Length must be a multiple of 4");}var validLen = b64.indexOf("=");if (validLen === -1) validLen = len;var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;return [validLen, placeHoldersLen];}function byteLength(b64) {var lens = getLens(b64);var validLen = lens[0];var placeHoldersLen = lens[1];return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;}function _byteLength(b64, validLen, placeHoldersLen) {return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;}function toByteArray(b64) {var tmp;var lens = getLens(b64);var validLen = lens[0];var placeHoldersLen = lens[1];var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));var curByte = 0;var len = placeHoldersLen > 0 ? validLen - 4 : validLen;for (var i = 0; i < len; i += 4) {tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];arr[curByte++] = tmp >> 16 & 255;arr[curByte++] = tmp >> 8 & 255;arr[curByte++] = tmp & 255;}if (placeHoldersLen === 2) {tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;arr[curByte++] = tmp & 255;}if (placeHoldersLen === 1) {tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;arr[curByte++] = tmp >> 8 & 255;arr[curByte++] = tmp & 255;}return arr;}function tripletToBase64(num) {return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];}function encodeChunk(uint8, start, end) {var tmp;var output = [];for (var i = start; i < end; i += 3) {tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);output.push(tripletToBase64(tmp));}return output.join("");}function fromByteArray(uint8) {var tmp;var len = uint8.length;var extraBytes = len % 3;var parts = [];var maxChunkLength = 16383;for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));}if (extraBytes === 1) {tmp = uint8[len - 1];parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");} else if (extraBytes === 2) {tmp = (uint8[len - 2] << 8) + uint8[len - 1];parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");}return parts.join("");}}, {}], 11: [function (require, module, exports) {}, {}], 12: [function (require, module, exports) {"use strict";var base64 = require("base64-js");var ieee754 = require("ieee754");exports.Buffer = Buffer;exports.SlowBuffer = SlowBuffer;exports.INSPECT_MAX_BYTES = 50;var K_MAX_LENGTH = 2147483647;exports.kMaxLength = K_MAX_LENGTH;Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");}function typedArraySupport() {try {var arr = new Uint8Array(1);arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {return 42;} };return arr.foo() === 42;} catch (e) {return false;}}Object.defineProperty(Buffer.prototype, "parent", { enumerable: true, get: function get() {if (!Buffer.isBuffer(this)) return undefined;return this.buffer;} });Object.defineProperty(Buffer.prototype, "offset", { enumerable: true, get: function get() {if (!Buffer.isBuffer(this)) return undefined;return this.byteOffset;} });function createBuffer(length) {if (length > K_MAX_LENGTH) {throw new RangeError('The value "' + length + '" is invalid for option "size"');}var buf = new Uint8Array(length);buf.__proto__ = Buffer.prototype;return buf;}function Buffer(arg, encodingOrOffset, length) {if (typeof arg === "number") {if (typeof encodingOrOffset === "string") {throw new TypeError('The "string" argument must be of type string. Received type number');}return allocUnsafe(arg);}return from(arg, encodingOrOffset, length);}if (typeof Symbol !== "undefined" && Symbol.species != null && Buffer[Symbol.species] === Buffer) {Object.defineProperty(Buffer, Symbol.species, { value: null, configurable: true, enumerable: false, writable: false });}Buffer.poolSize = 8192;function from(value, encodingOrOffset, length) {if (typeof value === "string") {return fromString(value, encodingOrOffset);}if (ArrayBuffer.isView(value)) {return fromArrayLike(value);}if (value == null) {throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof value);}if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {return fromArrayBuffer(value, encodingOrOffset, length);}if (typeof value === "number") {throw new TypeError('The "value" argument must not be of type number. Received type number');}var valueOf = value.valueOf && value.valueOf();if (valueOf != null && valueOf !== value) {return Buffer.from(valueOf, encodingOrOffset, length);}var b = fromObject(value);if (b) return b;if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);}throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, " + "or Array-like Object. Received type " + typeof value);}Buffer.from = function (value, encodingOrOffset, length) {return from(value, encodingOrOffset, length);};Buffer.prototype.__proto__ = Uint8Array.prototype;Buffer.__proto__ = Uint8Array;function assertSize(size) {if (typeof size !== "number") {throw new TypeError('"size" argument must be of type number');} else if (size < 0) {throw new RangeError('The value "' + size + '" is invalid for option "size"');}}function alloc(size, fill, encoding) {assertSize(size);if (size <= 0) {return createBuffer(size);}if (fill !== undefined) {return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);}return createBuffer(size);}Buffer.alloc = function (size, fill, encoding) {return alloc(size, fill, encoding);};function allocUnsafe(size) {assertSize(size);return createBuffer(size < 0 ? 0 : checked(size) | 0);}Buffer.allocUnsafe = function (size) {return allocUnsafe(size);};Buffer.allocUnsafeSlow = function (size) {return allocUnsafe(size);};function fromString(string, encoding) {if (typeof encoding !== "string" || encoding === "") {encoding = "utf8";}if (!Buffer.isEncoding(encoding)) {throw new TypeError("Unknown encoding: " + encoding);}var length = byteLength(string, encoding) | 0;var buf = createBuffer(length);var actual = buf.write(string, encoding);if (actual !== length) {buf = buf.slice(0, actual);}return buf;}function fromArrayLike(array) {var length = array.length < 0 ? 0 : checked(array.length) | 0;var buf = createBuffer(length);for (var i = 0; i < length; i += 1) {buf[i] = array[i] & 255;}return buf;}function fromArrayBuffer(array, byteOffset, length) {if (byteOffset < 0 || array.byteLength < byteOffset) {throw new RangeError('"offset" is outside of buffer bounds');}if (array.byteLength < byteOffset + (length || 0)) {throw new RangeError('"length" is outside of buffer bounds');}var buf;if (byteOffset === undefined && length === undefined) {buf = new Uint8Array(array);} else if (length === undefined) {buf = new Uint8Array(array, byteOffset);} else {buf = new Uint8Array(array, byteOffset, length);}buf.__proto__ = Buffer.prototype;return buf;}function fromObject(obj) {if (Buffer.isBuffer(obj)) {var len = checked(obj.length) | 0;var buf = createBuffer(len);if (buf.length === 0) {return buf;}obj.copy(buf, 0, 0, len);return buf;}if (obj.length !== undefined) {if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {return createBuffer(0);}return fromArrayLike(obj);}if (obj.type === "Buffer" && Array.isArray(obj.data)) {return fromArrayLike(obj.data);}}function checked(length) {if (length >= K_MAX_LENGTH) {throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");}return length | 0;}function SlowBuffer(length) {if (+length != length) {length = 0;}return Buffer.alloc(+length);}Buffer.isBuffer = function isBuffer(b) {return b != null && b._isBuffer === true && b !== Buffer.prototype;};Buffer.compare = function compare(a, b) {if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');}if (a === b) return 0;var x = a.length;var y = b.length;for (var i = 0, len = Math.min(x, y); i < len; ++i) {if (a[i] !== b[i]) {x = a[i];y = b[i];break;}}if (x < y) return -1;if (y < x) return 1;return 0;};Buffer.isEncoding = function isEncoding(encoding) {switch (String(encoding).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return true;default:return false;}};Buffer.concat = function concat(list, length) {if (!Array.isArray(list)) {throw new TypeError('"list" argument must be an Array of Buffers');}if (list.length === 0) {return Buffer.alloc(0);}var i;if (length === undefined) {length = 0;for (i = 0; i < list.length; ++i) {length += list[i].length;}}var buffer = Buffer.allocUnsafe(length);var pos = 0;for (i = 0; i < list.length; ++i) {var buf = list[i];if (isInstance(buf, Uint8Array)) {buf = Buffer.from(buf);}if (!Buffer.isBuffer(buf)) {throw new TypeError('"list" argument must be an Array of Buffers');}buf.copy(buffer, pos);pos += buf.length;}return buffer;};function byteLength(string, encoding) {if (Buffer.isBuffer(string)) {return string.length;}if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {return string.byteLength;}if (typeof string !== "string") {throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + "Received type " + typeof string);}var len = string.length;var mustMatch = arguments.length > 2 && arguments[2] === true;if (!mustMatch && len === 0) return 0;var loweredCase = false;for (;;) {switch (encoding) {case "ascii":case "latin1":case "binary":return len;case "utf8":case "utf-8":return utf8ToBytes(string).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return len * 2;case "hex":return len >>> 1;case "base64":return base64ToBytes(string).length;default:if (loweredCase) {return mustMatch ? -1 : utf8ToBytes(string).length;}encoding = ("" + encoding).toLowerCase();loweredCase = true;}}}Buffer.byteLength = byteLength;function slowToString(encoding, start, end) {var loweredCase = false;if (start === undefined || start < 0) {start = 0;}if (start > this.length) {return "";}if (end === undefined || end > this.length) {end = this.length;}if (end <= 0) {return "";}end >>>= 0;start >>>= 0;if (end <= start) {return "";}if (!encoding) encoding = "utf8";while (true) {switch (encoding) {case "hex":return hexSlice(this, start, end);case "utf8":case "utf-8":return utf8Slice(this, start, end);case "ascii":return asciiSlice(this, start, end);case "latin1":case "binary":return latin1Slice(this, start, end);case "base64":return base64Slice(this, start, end);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return utf16leSlice(this, start, end);default:if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);encoding = (encoding + "").toLowerCase();loweredCase = true;}}}Buffer.prototype._isBuffer = true;function swap(b, n, m) {var i = b[n];b[n] = b[m];b[m] = i;}Buffer.prototype.swap16 = function swap16() {var len = this.length;if (len % 2 !== 0) {throw new RangeError("Buffer size must be a multiple of 16-bits");}for (var i = 0; i < len; i += 2) {swap(this, i, i + 1);}return this;};Buffer.prototype.swap32 = function swap32() {var len = this.length;if (len % 4 !== 0) {throw new RangeError("Buffer size must be a multiple of 32-bits");}for (var i = 0; i < len; i += 4) {swap(this, i, i + 3);swap(this, i + 1, i + 2);}return this;};Buffer.prototype.swap64 = function swap64() {var len = this.length;if (len % 8 !== 0) {throw new RangeError("Buffer size must be a multiple of 64-bits");}for (var i = 0; i < len; i += 8) {swap(this, i, i + 7);swap(this, i + 1, i + 6);swap(this, i + 2, i + 5);swap(this, i + 3, i + 4);}return this;};Buffer.prototype.toString = function toString() {var length = this.length;if (length === 0) return "";if (arguments.length === 0) return utf8Slice(this, 0, length);return slowToString.apply(this, arguments);};Buffer.prototype.toLocaleString = Buffer.prototype.toString;Buffer.prototype.equals = function equals(b) {if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");if (this === b) return true;return Buffer.compare(this, b) === 0;};Buffer.prototype.inspect = function inspect() {var str = "";var max = exports.INSPECT_MAX_BYTES;str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();if (this.length > max) str += " ... ";return "<Buffer " + str + ">";};Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {if (isInstance(target, Uint8Array)) {target = Buffer.from(target, target.offset, target.byteLength);}if (!Buffer.isBuffer(target)) {throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + "Received type " + typeof target);}if (start === undefined) {start = 0;}if (end === undefined) {end = target ? target.length : 0;}if (thisStart === undefined) {thisStart = 0;}if (thisEnd === undefined) {thisEnd = this.length;}if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {throw new RangeError("out of range index");}if (thisStart >= thisEnd && start >= end) {return 0;}if (thisStart >= thisEnd) {return -1;}if (start >= end) {return 1;}start >>>= 0;end >>>= 0;thisStart >>>= 0;thisEnd >>>= 0;if (this === target) return 0;var x = thisEnd - thisStart;var y = end - start;var len = Math.min(x, y);var thisCopy = this.slice(thisStart, thisEnd);var targetCopy = target.slice(start, end);for (var i = 0; i < len; ++i) {if (thisCopy[i] !== targetCopy[i]) {x = thisCopy[i];y = targetCopy[i];break;}}if (x < y) return -1;if (y < x) return 1;return 0;};function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {if (buffer.length === 0) return -1;if (typeof byteOffset === "string") {encoding = byteOffset;byteOffset = 0;} else if (byteOffset > 2147483647) {byteOffset = 2147483647;} else if (byteOffset < -2147483648) {byteOffset = -2147483648;}byteOffset = +byteOffset;if (numberIsNaN(byteOffset)) {byteOffset = dir ? 0 : buffer.length - 1;}if (byteOffset < 0) byteOffset = buffer.length + byteOffset;if (byteOffset >= buffer.length) {if (dir) return -1;else byteOffset = buffer.length - 1;} else if (byteOffset < 0) {if (dir) byteOffset = 0;else return -1;}if (typeof val === "string") {val = Buffer.from(val, encoding);}if (Buffer.isBuffer(val)) {if (val.length === 0) {return -1;}return arrayIndexOf(buffer, val, byteOffset, encoding, dir);} else if (typeof val === "number") {val = val & 255;if (typeof Uint8Array.prototype.indexOf === "function") {if (dir) {return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);} else {return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);}}return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);}throw new TypeError("val must be string, number or Buffer");}function arrayIndexOf(arr, val, byteOffset, encoding, dir) {var indexSize = 1;var arrLength = arr.length;var valLength = val.length;if (encoding !== undefined) {encoding = String(encoding).toLowerCase();if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {if (arr.length < 2 || val.length < 2) {return -1;}indexSize = 2;arrLength /= 2;valLength /= 2;byteOffset /= 2;}}function read(buf, i) {if (indexSize === 1) {return buf[i];} else {return buf.readUInt16BE(i * indexSize);}}var i;if (dir) {var foundIndex = -1;for (i = byteOffset; i < arrLength; i++) {if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {if (foundIndex === -1) foundIndex = i;if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;} else {if (foundIndex !== -1) i -= i - foundIndex;foundIndex = -1;}}} else {if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;for (i = byteOffset; i >= 0; i--) {var found = true;for (var j = 0; j < valLength; j++) {if (read(arr, i + j) !== read(val, j)) {found = false;break;}}if (found) return i;}}return -1;}Buffer.prototype.includes = function includes(val, byteOffset, encoding) {return this.indexOf(val, byteOffset, encoding) !== -1;};Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {return bidirectionalIndexOf(this, val, byteOffset, encoding, true);};Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {return bidirectionalIndexOf(this, val, byteOffset, encoding, false);};function hexWrite(buf, string, offset, length) {offset = Number(offset) || 0;var remaining = buf.length - offset;if (!length) {length = remaining;} else {length = Number(length);if (length > remaining) {length = remaining;}}var strLen = string.length;if (length > strLen / 2) {length = strLen / 2;}for (var i = 0; i < length; ++i) {var parsed = parseInt(string.substr(i * 2, 2), 16);if (numberIsNaN(parsed)) return i;buf[offset + i] = parsed;}return i;}function utf8Write(buf, string, offset, length) {return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);}function asciiWrite(buf, string, offset, length) {return blitBuffer(asciiToBytes(string), buf, offset, length);}function latin1Write(buf, string, offset, length) {return asciiWrite(buf, string, offset, length);}function base64Write(buf, string, offset, length) {return blitBuffer(base64ToBytes(string), buf, offset, length);}function ucs2Write(buf, string, offset, length) {return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);}Buffer.prototype.write = function write(string, offset, length, encoding) {if (offset === undefined) {encoding = "utf8";length = this.length;offset = 0;} else if (length === undefined && typeof offset === "string") {encoding = offset;length = this.length;offset = 0;} else if (isFinite(offset)) {offset = offset >>> 0;if (isFinite(length)) {length = length >>> 0;if (encoding === undefined) encoding = "utf8";} else {encoding = length;length = undefined;}} else {throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");}var remaining = this.length - offset;if (length === undefined || length > remaining) length = remaining;if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {throw new RangeError("Attempt to write outside buffer bounds");}if (!encoding) encoding = "utf8";var loweredCase = false;for (;;) {switch (encoding) {case "hex":return hexWrite(this, string, offset, length);case "utf8":case "utf-8":return utf8Write(this, string, offset, length);case "ascii":return asciiWrite(this, string, offset, length);case "latin1":case "binary":return latin1Write(this, string, offset, length);case "base64":return base64Write(this, string, offset, length);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return ucs2Write(this, string, offset, length);default:if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);encoding = ("" + encoding).toLowerCase();loweredCase = true;}}};Buffer.prototype.toJSON = function toJSON() {return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };};function base64Slice(buf, start, end) {if (start === 0 && end === buf.length) {return base64.fromByteArray(buf);} else {return base64.fromByteArray(buf.slice(start, end));}}function utf8Slice(buf, start, end) {end = Math.min(buf.length, end);var res = [];var i = start;while (i < end) {var firstByte = buf[i];var codePoint = null;var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;if (i + bytesPerSequence <= end) {var secondByte, thirdByte, fourthByte, tempCodePoint;switch (bytesPerSequence) {case 1:if (firstByte < 128) {codePoint = firstByte;}break;case 2:secondByte = buf[i + 1];if ((secondByte & 192) === 128) {tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;if (tempCodePoint > 127) {codePoint = tempCodePoint;}}break;case 3:secondByte = buf[i + 1];thirdByte = buf[i + 2];if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {codePoint = tempCodePoint;}}break;case 4:secondByte = buf[i + 1];thirdByte = buf[i + 2];fourthByte = buf[i + 3];if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;if (tempCodePoint > 65535 && tempCodePoint < 1114112) {codePoint = tempCodePoint;}}}}if (codePoint === null) {codePoint = 65533;bytesPerSequence = 1;} else if (codePoint > 65535) {codePoint -= 65536;res.push(codePoint >>> 10 & 1023 | 55296);codePoint = 56320 | codePoint & 1023;}res.push(codePoint);i += bytesPerSequence;}return decodeCodePointsArray(res);}var MAX_ARGUMENTS_LENGTH = 4096;function decodeCodePointsArray(codePoints) {var len = codePoints.length;if (len <= MAX_ARGUMENTS_LENGTH) {return String.fromCharCode.apply(String, codePoints);}var res = "";var i = 0;while (i < len) {res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));}return res;}function asciiSlice(buf, start, end) {var ret = "";end = Math.min(buf.length, end);for (var i = start; i < end; ++i) {ret += String.fromCharCode(buf[i] & 127);}return ret;}function latin1Slice(buf, start, end) {var ret = "";end = Math.min(buf.length, end);for (var i = start; i < end; ++i) {ret += String.fromCharCode(buf[i]);}return ret;}function hexSlice(buf, start, end) {var len = buf.length;if (!start || start < 0) start = 0;if (!end || end < 0 || end > len) end = len;var out = "";for (var i = start; i < end; ++i) {out += toHex(buf[i]);}return out;}function utf16leSlice(buf, start, end) {var bytes = buf.slice(start, end);var res = "";for (var i = 0; i < bytes.length; i += 2) {res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);}return res;}Buffer.prototype.slice = function slice(start, end) {var len = this.length;start = ~~start;end = end === undefined ? len : ~~end;if (start < 0) {start += len;if (start < 0) start = 0;} else if (start > len) {start = len;}if (end < 0) {end += len;if (end < 0) end = 0;} else if (end > len) {end = len;}if (end < start) end = start;var newBuf = this.subarray(start, end);newBuf.__proto__ = Buffer.prototype;return newBuf;};function checkOffset(offset, ext, length) {if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");}Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {offset = offset >>> 0;byteLength = byteLength >>> 0;if (!noAssert) checkOffset(offset, byteLength, this.length);var val = this[offset];var mul = 1;var i = 0;while (++i < byteLength && (mul *= 256)) {val += this[offset + i] * mul;}return val;};Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {offset = offset >>> 0;byteLength = byteLength >>> 0;if (!noAssert) {checkOffset(offset, byteLength, this.length);}var val = this[offset + --byteLength];var mul = 1;while (byteLength > 0 && (mul *= 256)) {val += this[offset + --byteLength] * mul;}return val;};Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 1, this.length);return this[offset];};Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 2, this.length);return this[offset] | this[offset + 1] << 8;};Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 2, this.length);return this[offset] << 8 | this[offset + 1];};Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 4, this.length);return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;};Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 4, this.length);return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);};Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {offset = offset >>> 0;byteLength = byteLength >>> 0;if (!noAssert) checkOffset(offset, byteLength, this.length);var val = this[offset];var mul = 1;var i = 0;while (++i < byteLength && (mul *= 256)) {val += this[offset + i] * mul;}mul *= 128;if (val >= mul) val -= Math.pow(2, 8 * byteLength);return val;};Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {offset = offset >>> 0;byteLength = byteLength >>> 0;if (!noAssert) checkOffset(offset, byteLength, this.length);var i = byteLength;var mul = 1;var val = this[offset + --i];while (i > 0 && (mul *= 256)) {val += this[offset + --i] * mul;}mul *= 128;if (val >= mul) val -= Math.pow(2, 8 * byteLength);return val;};Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 1, this.length);if (!(this[offset] & 128)) return this[offset];return (255 - this[offset] + 1) * -1;};Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 2, this.length);var val = this[offset] | this[offset + 1] << 8;return val & 32768 ? val | 4294901760 : val;};Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 2, this.length);var val = this[offset + 1] | this[offset] << 8;return val & 32768 ? val | 4294901760 : val;};Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 4, this.length);return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;};Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 4, this.length);return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];};Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 4, this.length);return ieee754.read(this, offset, true, 23, 4);};Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 4, this.length);return ieee754.read(this, offset, false, 23, 4);};Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 8, this.length);return ieee754.read(this, offset, true, 52, 8);};Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {offset = offset >>> 0;if (!noAssert) checkOffset(offset, 8, this.length);return ieee754.read(this, offset, false, 52, 8);};function checkInt(buf, value, offset, ext, max, min) {if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');if (offset + ext > buf.length) throw new RangeError("Index out of range");}Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {value = +value;offset = offset >>> 0;byteLength = byteLength >>> 0;if (!noAssert) {var maxBytes = Math.pow(2, 8 * byteLength) - 1;checkInt(this, value, offset, byteLength, maxBytes, 0);}var mul = 1;var i = 0;this[offset] = value & 255;while (++i < byteLength && (mul *= 256)) {this[offset + i] = value / mul & 255;}return offset + byteLength;};Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {value = +value;offset = offset >>> 0;byteLength = byteLength >>> 0;if (!noAssert) {var maxBytes = Math.pow(2, 8 * byteLength) - 1;checkInt(this, value, offset, byteLength, maxBytes, 0);}var i = byteLength - 1;var mul = 1;this[offset + i] = value & 255;while (--i >= 0 && (mul *= 256)) {this[offset + i] = value / mul & 255;}return offset + byteLength;};Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 1, 255, 0);this[offset] = value & 255;return offset + 1;};Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);this[offset] = value & 255;this[offset + 1] = value >>> 8;return offset + 2;};Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);this[offset] = value >>> 8;this[offset + 1] = value & 255;return offset + 2;};Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);this[offset + 3] = value >>> 24;this[offset + 2] = value >>> 16;this[offset + 1] = value >>> 8;this[offset] = value & 255;return offset + 4;};Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);this[offset] = value >>> 24;this[offset + 1] = value >>> 16;this[offset + 2] = value >>> 8;this[offset + 3] = value & 255;return offset + 4;};Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) {var limit = Math.pow(2, 8 * byteLength - 1);checkInt(this, value, offset, byteLength, limit - 1, -limit);}var i = 0;var mul = 1;var sub = 0;this[offset] = value & 255;while (++i < byteLength && (mul *= 256)) {if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {sub = 1;}this[offset + i] = (value / mul >> 0) - sub & 255;}return offset + byteLength;};Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) {var limit = Math.pow(2, 8 * byteLength - 1);checkInt(this, value, offset, byteLength, limit - 1, -limit);}var i = byteLength - 1;var mul = 1;var sub = 0;this[offset + i] = value & 255;while (--i >= 0 && (mul *= 256)) {if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {sub = 1;}this[offset + i] = (value / mul >> 0) - sub & 255;}return offset + byteLength;};Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 1, 127, -128);if (value < 0) value = 255 + value + 1;this[offset] = value & 255;return offset + 1;};Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);this[offset] = value & 255;this[offset + 1] = value >>> 8;return offset + 2;};Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);this[offset] = value >>> 8;this[offset + 1] = value & 255;return offset + 2;};Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);this[offset] = value & 255;this[offset + 1] = value >>> 8;this[offset + 2] = value >>> 16;this[offset + 3] = value >>> 24;return offset + 4;};Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);if (value < 0) value = 4294967295 + value + 1;this[offset] = value >>> 24;this[offset + 1] = value >>> 16;this[offset + 2] = value >>> 8;this[offset + 3] = value & 255;return offset + 4;};function checkIEEE754(buf, value, offset, ext, max, min) {if (offset + ext > buf.length) throw new RangeError("Index out of range");if (offset < 0) throw new RangeError("Index out of range");}function writeFloat(buf, value, offset, littleEndian, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) {checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);}ieee754.write(buf, value, offset, littleEndian, 23, 4);return offset + 4;}Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {return writeFloat(this, value, offset, true, noAssert);};Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {return writeFloat(this, value, offset, false, noAssert);};function writeDouble(buf, value, offset, littleEndian, noAssert) {value = +value;offset = offset >>> 0;if (!noAssert) {checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);}ieee754.write(buf, value, offset, littleEndian, 52, 8);return offset + 8;}Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {return writeDouble(this, value, offset, true, noAssert);};Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {return writeDouble(this, value, offset, false, noAssert);};Buffer.prototype.copy = function copy(target, targetStart, start, end) {if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");if (!start) start = 0;if (!end && end !== 0) end = this.length;if (targetStart >= target.length) targetStart = target.length;if (!targetStart) targetStart = 0;if (end > 0 && end < start) end = start;if (end === start) return 0;if (target.length === 0 || this.length === 0) return 0;if (targetStart < 0) {throw new RangeError("targetStart out of bounds");}if (start < 0 || start >= this.length) throw new RangeError("Index out of range");if (end < 0) throw new RangeError("sourceEnd out of bounds");if (end > this.length) end = this.length;if (target.length - targetStart < end - start) {end = target.length - targetStart + start;}var len = end - start;if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {this.copyWithin(targetStart, start, end);} else if (this === target && start < targetStart && targetStart < end) {for (var i = len - 1; i >= 0; --i) {target[i + targetStart] = this[i + start];}} else {Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);}return len;};Buffer.prototype.fill = function fill(val, start, end, encoding) {if (typeof val === "string") {if (typeof start === "string") {encoding = start;start = 0;end = this.length;} else if (typeof end === "string") {encoding = end;end = this.length;}if (encoding !== undefined && typeof encoding !== "string") {throw new TypeError("encoding must be a string");}if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {throw new TypeError("Unknown encoding: " + encoding);}if (val.length === 1) {var code = val.charCodeAt(0);if (encoding === "utf8" && code < 128 || encoding === "latin1") {val = code;}}} else if (typeof val === "number") {val = val & 255;}if (start < 0 || this.length < start || this.length < end) {throw new RangeError("Out of range index");}if (end <= start) {return this;}start = start >>> 0;end = end === undefined ? this.length : end >>> 0;if (!val) val = 0;var i;if (typeof val === "number") {for (i = start; i < end; ++i) {this[i] = val;}} else {var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);var len = bytes.length;if (len === 0) {throw new TypeError('The value "' + val + '" is invalid for argument "value"');}for (i = 0; i < end - start; ++i) {this[i + start] = bytes[i % len];}}return this;};var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;function base64clean(str) {str = str.split("=")[0];str = str.trim().replace(INVALID_BASE64_RE, "");if (str.length < 2) return "";while (str.length % 4 !== 0) {str = str + "=";}return str;}function toHex(n) {if (n < 16) return "0" + n.toString(16);return n.toString(16);}function utf8ToBytes(string, units) {units = units || Infinity;var codePoint;var length = string.length;var leadSurrogate = null;var bytes = [];for (var i = 0; i < length; ++i) {codePoint = string.charCodeAt(i);if (codePoint > 55295 && codePoint < 57344) {if (!leadSurrogate) {if (codePoint > 56319) {if ((units -= 3) > -1) bytes.push(239, 191, 189);continue;} else if (i + 1 === length) {if ((units -= 3) > -1) bytes.push(239, 191, 189);continue;}leadSurrogate = codePoint;continue;}if (codePoint < 56320) {if ((units -= 3) > -1) bytes.push(239, 191, 189);leadSurrogate = codePoint;continue;}codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;} else if (leadSurrogate) {if ((units -= 3) > -1) bytes.push(239, 191, 189);}leadSurrogate = null;if (codePoint < 128) {if ((units -= 1) < 0) break;bytes.push(codePoint);} else if (codePoint < 2048) {if ((units -= 2) < 0) break;bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);} else if (codePoint < 65536) {if ((units -= 3) < 0) break;bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);} else if (codePoint < 1114112) {if ((units -= 4) < 0) break;bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);} else {throw new Error("Invalid code point");}}return bytes;}function asciiToBytes(str) {var byteArray = [];for (var i = 0; i < str.length; ++i) {byteArray.push(str.charCodeAt(i) & 255);}return byteArray;}function utf16leToBytes(str, units) {var c, hi, lo;var byteArray = [];for (var i = 0; i < str.length; ++i) {if ((units -= 2) < 0) break;c = str.charCodeAt(i);hi = c >> 8;lo = c % 256;byteArray.push(lo);byteArray.push(hi);}return byteArray;}function base64ToBytes(str) {return base64.toByteArray(base64clean(str));}function blitBuffer(src, dst, offset, length) {for (var i = 0; i < length; ++i) {if (i + offset >= dst.length || i >= src.length) break;dst[i + offset] = src[i];}return i;}function isInstance(obj, type) {return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;}function numberIsNaN(obj) {return obj !== obj;}}, { "base64-js": 10, ieee754: 79 }], 13: [function (require, module, exports) {var objectCreate = Object.create || objectCreatePolyfill;var objectKeys = Object.keys || objectKeysPolyfill;var bind = Function.prototype.bind || functionBindPolyfill;function EventEmitter() {if (!this._events || !Object.prototype.hasOwnProperty.call(this, "_events")) {this._events = objectCreate(null);this._eventsCount = 0;}this._maxListeners = this._maxListeners || undefined;}module.exports = EventEmitter;EventEmitter.EventEmitter = EventEmitter;EventEmitter.prototype._events = undefined;EventEmitter.prototype._maxListeners = undefined;var defaultMaxListeners = 10;var hasDefineProperty;try {var o = {};if (Object.defineProperty) Object.defineProperty(o, "x", { value: 0 });hasDefineProperty = o.x === 0;} catch (err) {hasDefineProperty = false;}if (hasDefineProperty) {Object.defineProperty(EventEmitter, "defaultMaxListeners", { enumerable: true, get: function get() {return defaultMaxListeners;}, set: function set(arg) {if (typeof arg !== "number" || arg < 0 || arg !== arg) throw new TypeError('"defaultMaxListeners" must be a positive number');defaultMaxListeners = arg;} });} else {EventEmitter.defaultMaxListeners = defaultMaxListeners;}EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {if (typeof n !== "number" || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');this._maxListeners = n;return this;};function $getMaxListeners(that) {if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;return that._maxListeners;}EventEmitter.prototype.getMaxListeners = function getMaxListeners() {return $getMaxListeners(this);};function emitNone(handler, isFn, self) {if (isFn) handler.call(self);else {var len = handler.length;var listeners = arrayClone(handler, len);for (var i = 0; i < len; ++i) {listeners[i].call(self);}}}function emitOne(handler, isFn, self, arg1) {if (isFn) handler.call(self, arg1);else {var len = handler.length;var listeners = arrayClone(handler, len);for (var i = 0; i < len; ++i) {listeners[i].call(self, arg1);}}}function emitTwo(handler, isFn, self, arg1, arg2) {if (isFn) handler.call(self, arg1, arg2);else {var len = handler.length;var listeners = arrayClone(handler, len);for (var i = 0; i < len; ++i) {listeners[i].call(self, arg1, arg2);}}}function emitThree(handler, isFn, self, arg1, arg2, arg3) {if (isFn) handler.call(self, arg1, arg2, arg3);else {var len = handler.length;var listeners = arrayClone(handler, len);for (var i = 0; i < len; ++i) {listeners[i].call(self, arg1, arg2, arg3);}}}function emitMany(handler, isFn, self, args) {if (isFn) handler.apply(self, args);else {var len = handler.length;var listeners = arrayClone(handler, len);for (var i = 0; i < len; ++i) {listeners[i].apply(self, args);}}}EventEmitter.prototype.emit = function emit(type) {var er, handler, len, args, i, events;var doError = type === "error";events = this._events;if (events) doError = doError && events.error == null;else if (!doError) return false;if (doError) {if (arguments.length > 1) er = arguments[1];if (er instanceof Error) {throw er;} else {var err = new Error('Unhandled "error" event. (' + er + ")");err.context = er;throw err;}return false;}handler = events[type];if (!handler) return false;var isFn = typeof handler === "function";len = arguments.length;switch (len) {case 1:emitNone(handler, isFn, this);break;case 2:emitOne(handler, isFn, this, arguments[1]);break;case 3:emitTwo(handler, isFn, this, arguments[1], arguments[2]);break;case 4:emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);break;default:args = new Array(len - 1);for (i = 1; i < len; i++) {args[i - 1] = arguments[i];}emitMany(handler, isFn, this, args);}return true;};function _addListener(target, type, listener, prepend) {var m;var events;var existing;if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');events = target._events;if (!events) {events = target._events = objectCreate(null);target._eventsCount = 0;} else {if (events.newListener) {target.emit("newListener", type, listener.listener ? listener.listener : listener);events = target._events;}existing = events[type];}if (!existing) {existing = events[type] = listener;++target._eventsCount;} else {if (typeof existing === "function") {existing = events[type] = prepend ? [listener, existing] : [existing, listener];} else {if (prepend) {existing.unshift(listener);} else {existing.push(listener);}}if (!existing.warned) {m = $getMaxListeners(target);if (m && m > 0 && existing.length > m) {existing.warned = true;var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + ' "' + String(type) + '" listeners ' + "added. Use emitter.setMaxListeners() to " + "increase limit.");w.name = "MaxListenersExceededWarning";w.emitter = target;w.type = type;w.count = existing.length;if (typeof console === "object" && console.warn) {console.warn("%s: %s", w.name, w.message);}}}}return target;}EventEmitter.prototype.addListener = function addListener(type, listener) {return _addListener(this, type, listener, false);};EventEmitter.prototype.on = EventEmitter.prototype.addListener;EventEmitter.prototype.prependListener = function prependListener(type, listener) {return _addListener(this, type, listener, true);};function onceWrapper() {if (!this.fired) {this.target.removeListener(this.type, this.wrapFn);this.fired = true;switch (arguments.length) {case 0:return this.listener.call(this.target);case 1:return this.listener.call(this.target, arguments[0]);case 2:return this.listener.call(this.target, arguments[0], arguments[1]);case 3:return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);default:var args = new Array(arguments.length);for (var i = 0; i < args.length; ++i) {args[i] = arguments[i];}this.listener.apply(this.target, args);}}}function _onceWrap(target, type, listener) {var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };var wrapped = bind.call(onceWrapper, state);wrapped.listener = listener;state.wrapFn = wrapped;return wrapped;}EventEmitter.prototype.once = function once(type, listener) {if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');this.on(type, _onceWrap(this, type, listener));return this;};EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');this.prependListener(type, _onceWrap(this, type, listener));return this;};EventEmitter.prototype.removeListener = function removeListener(type, listener) {var list, events, position, i, originalListener;if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');events = this._events;if (!events) return this;list = events[type];if (!list) return this;if (list === listener || list.listener === listener) {if (--this._eventsCount === 0) this._events = objectCreate(null);else {delete events[type];if (events.removeListener) this.emit("removeListener", type, list.listener || listener);}} else if (typeof list !== "function") {position = -1;for (i = list.length - 1; i >= 0; i--) {if (list[i] === listener || list[i].listener === listener) {originalListener = list[i].listener;position = i;break;}}if (position < 0) return this;if (position === 0) list.shift();else spliceOne(list, position);if (list.length === 1) events[type] = list[0];if (events.removeListener) this.emit("removeListener", type, originalListener || listener);}return this;};EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {var listeners, events, i;events = this._events;if (!events) return this;if (!events.removeListener) {if (arguments.length === 0) {this._events = objectCreate(null);this._eventsCount = 0;} else if (events[type]) {if (--this._eventsCount === 0) this._events = objectCreate(null);else delete events[type];}return this;}if (arguments.length === 0) {var keys = objectKeys(events);var key;for (i = 0; i < keys.length; ++i) {key = keys[i];if (key === "removeListener") continue;this.removeAllListeners(key);}this.removeAllListeners("removeListener");this._events = objectCreate(null);this._eventsCount = 0;return this;}listeners = events[type];if (typeof listeners === "function") {this.removeListener(type, listeners);} else if (listeners) {for (i = listeners.length - 1; i >= 0; i--) {this.removeListener(type, listeners[i]);}}return this;};function _listeners(target, type, unwrap) {var events = target._events;if (!events) return [];var evlistener = events[type];if (!evlistener) return [];if (typeof evlistener === "function") return unwrap ? [evlistener.listener || evlistener] : [evlistener];return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);}EventEmitter.prototype.listeners = function listeners(type) {return _listeners(this, type, true);};EventEmitter.prototype.rawListeners = function rawListeners(type) {return _listeners(this, type, false);};EventEmitter.listenerCount = function (emitter, type) {if (typeof emitter.listenerCount === "function") {return emitter.listenerCount(type);} else {return listenerCount.call(emitter, type);}};EventEmitter.prototype.listenerCount = listenerCount;function listenerCount(type) {var events = this._events;if (events) {var evlistener = events[type];if (typeof evlistener === "function") {return 1;} else if (evlistener) {return evlistener.length;}}return 0;}EventEmitter.prototype.eventNames = function eventNames() {return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];};function spliceOne(list, index) {for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {list[i] = list[k];}list.pop();}function arrayClone(arr, n) {var copy = new Array(n);for (var i = 0; i < n; ++i) {copy[i] = arr[i];}return copy;}function unwrapListeners(arr) {var ret = new Array(arr.length);for (var i = 0; i < ret.length; ++i) {ret[i] = arr[i].listener || arr[i];}return ret;}function objectCreatePolyfill(proto) {var F = function F() {};F.prototype = proto;return new F();}function objectKeysPolyfill(obj) {var keys = [];for (var k in obj) {if (Object.prototype.hasOwnProperty.call(obj, k)) {keys.push(k);}}return k;}function functionBindPolyfill(context) {var fn = this;return function () {return fn.apply(context, arguments);};}}, {}], 14: [function (require, module, exports) {(function (Buffer) {function isArray(arg) {if (Array.isArray) {return Array.isArray(arg);}return objectToString(arg) === "[object Array]";}exports.isArray = isArray;function isBoolean(arg) {return typeof arg === "boolean";}exports.isBoolean = isBoolean;function isNull(arg) {return arg === null;}exports.isNull = isNull;function isNullOrUndefined(arg) {return arg == null;}exports.isNullOrUndefined = isNullOrUndefined;function isNumber(arg) {return typeof arg === "number";}exports.isNumber = isNumber;function isString(arg) {return typeof arg === "string";}exports.isString = isString;function isSymbol(arg) {return typeof arg === "symbol";}exports.isSymbol = isSymbol;function isUndefined(arg) {return arg === void 0;}exports.isUndefined = isUndefined;function isRegExp(re) {return objectToString(re) === "[object RegExp]";}exports.isRegExp = isRegExp;function isObject(arg) {return typeof arg === "object" && arg !== null;}exports.isObject = isObject;function isDate(d) {return objectToString(d) === "[object Date]";}exports.isDate = isDate;function isError(e) {return objectToString(e) === "[object Error]" || e instanceof Error;}exports.isError = isError;function isFunction(arg) {return typeof arg === "function";}exports.isFunction = isFunction;function isPrimitive(arg) {return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";}exports.isPrimitive = isPrimitive;exports.isBuffer = Buffer.isBuffer;function objectToString(o) {return Object.prototype.toString.call(o);}}).call(this, { isBuffer: require("../../is-buffer/index.js") });}, { "../../is-buffer/index.js": 81 }], 15: [function (require, module, exports) {"use strict";var copy = require("es5-ext/object/copy"),normalizeOptions = require("es5-ext/object/normalize-options"),ensureCallable = require("es5-ext/object/valid-callable"),map = require("es5-ext/object/map"),callable = require("es5-ext/object/valid-callable"),validValue = require("es5-ext/object/valid-value"),bind = Function.prototype.bind,defineProperty = Object.defineProperty,hasOwnProperty = Object.prototype.hasOwnProperty,define;define = function define(name, desc, options) {var value = validValue(desc) && callable(desc.value),dgs;dgs = copy(desc);delete dgs.writable;delete dgs.value;dgs.get = function () {if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);defineProperty(this, name, desc);return this[name];};return dgs;};module.exports = function (props) {var options = normalizeOptions(arguments[1]);if (options.resolveContext != null) ensureCallable(options.resolveContext);return map(props, function (desc, name) {return define(name, desc, options);});};}, { "es5-ext/object/copy": 39, "es5-ext/object/map": 48, "es5-ext/object/normalize-options": 49, "es5-ext/object/valid-callable": 54, "es5-ext/object/valid-value": 55 }], 16: [function (require, module, exports) {"use strict";var assign = require("es5-ext/object/assign"),normalizeOpts = require("es5-ext/object/normalize-options"),isCallable = require("es5-ext/object/is-callable"),contains = require("es5-ext/string/#/contains"),d;d = module.exports = function (dscr, value) {var c, e, w, options, desc;if (arguments.length < 2 || typeof dscr !== "string") {options = value;value = dscr;dscr = null;} else {options = arguments[2];}if (dscr == null) {c = w = true;e = false;} else {c = contains.call(dscr, "c");e = contains.call(dscr, "e");w = contains.call(dscr, "w");}desc = { value: value, configurable: c, enumerable: e, writable: w };return !options ? desc : assign(normalizeOpts(options), desc);};d.gs = function (dscr, get, set) {var c, e, options, desc;if (typeof dscr !== "string") {options = set;set = get;get = dscr;dscr = null;} else {options = arguments[3];}if (get == null) {get = undefined;} else if (!isCallable(get)) {options = get;get = set = undefined;} else if (set == null) {set = undefined;} else if (!isCallable(set)) {options = set;set = undefined;}if (dscr == null) {c = true;e = false;} else {c = contains.call(dscr, "c");e = contains.call(dscr, "e");}desc = { get: get, set: set, configurable: c, enumerable: e };return !options ? desc : assign(normalizeOpts(options), desc);};}, { "es5-ext/object/assign": 36, "es5-ext/object/is-callable": 42, "es5-ext/object/normalize-options": 49, "es5-ext/string/#/contains": 56 }], 17: [function (require, module, exports) {(function (process, Buffer) {var stream = require("readable-stream");var eos = require("end-of-stream");var inherits = require("inherits");var shift = require("stream-shift");var SIGNAL_FLUSH = Buffer.from && Buffer.from !== Uint8Array.from ? Buffer.from([0]) : new Buffer([0]);var onuncork = function onuncork(self, fn) {if (self._corked) self.once("uncork", fn);else fn();};var autoDestroy = function autoDestroy(self, err) {if (self._autoDestroy) self.destroy(err);};var destroyer = function destroyer(self, end) {return function (err) {if (err) autoDestroy(self, err.message === "premature close" ? null : err);else if (end && !self._ended) self.end();};};var end = function end(ws, fn) {if (!ws) return fn();if (ws._writableState && ws._writableState.finished) return fn();if (ws._writableState) return ws.end(fn);ws.end();fn();};var toStreams2 = function toStreams2(rs) {return new stream.Readable({ objectMode: true, highWaterMark: 16 }).wrap(rs);};var Duplexify = function Duplexify(writable, readable, opts) {if (!(this instanceof Duplexify)) return new Duplexify(writable, readable, opts);stream.Duplex.call(this, opts);this._writable = null;this._readable = null;this._readable2 = null;this._autoDestroy = !opts || opts.autoDestroy !== false;this._forwardDestroy = !opts || opts.destroy !== false;this._forwardEnd = !opts || opts.end !== false;this._corked = 1;this._ondrain = null;this._drained = false;this._forwarding = false;this._unwrite = null;this._unread = null;this._ended = false;this.destroyed = false;if (writable) this.setWritable(writable);if (readable) this.setReadable(readable);};inherits(Duplexify, stream.Duplex);Duplexify.obj = function (writable, readable, opts) {if (!opts) opts = {};opts.objectMode = true;opts.highWaterMark = 16;return new Duplexify(writable, readable, opts);};Duplexify.prototype.cork = function () {if (++this._corked === 1) this.emit("cork");};Duplexify.prototype.uncork = function () {if (this._corked && --this._corked === 0) this.emit("uncork");};Duplexify.prototype.setWritable = function (writable) {if (this._unwrite) this._unwrite();if (this.destroyed) {if (writable && writable.destroy) writable.destroy();return;}if (writable === null || writable === false) {this.end();return;}var self = this;var unend = eos(writable, { writable: true, readable: false }, destroyer(this, this._forwardEnd));var ondrain = function ondrain() {var ondrain = self._ondrain;self._ondrain = null;if (ondrain) ondrain();};var clear = function clear() {self._writable.removeListener("drain", ondrain);unend();};if (this._unwrite) process.nextTick(ondrain);this._writable = writable;this._writable.on("drain", ondrain);this._unwrite = clear;this.uncork();};Duplexify.prototype.setReadable = function (readable) {if (this._unread) this._unread();if (this.destroyed) {if (readable && readable.destroy) readable.destroy();return;}if (readable === null || readable === false) {this.push(null);this.resume();return;}var self = this;var unend = eos(readable, { writable: false, readable: true }, destroyer(this));var onreadable = function onreadable() {self._forward();};var onend = function onend() {self.push(null);};var clear = function clear() {self._readable2.removeListener("readable", onreadable);self._readable2.removeListener("end", onend);unend();};this._drained = true;this._readable = readable;this._readable2 = readable._readableState ? readable : toStreams2(readable);this._readable2.on("readable", onreadable);this._readable2.on("end", onend);this._unread = clear;this._forward();};Duplexify.prototype._read = function () {this._drained = true;this._forward();};Duplexify.prototype._forward = function () {if (this._forwarding || !this._readable2 || !this._drained) return;this._forwarding = true;var data;while (this._drained && (data = shift(this._readable2)) !== null) {if (this.destroyed) continue;this._drained = this.push(data);}this._forwarding = false;};Duplexify.prototype.destroy = function (err) {if (this.destroyed) return;this.destroyed = true;var self = this;process.nextTick(function () {self._destroy(err);});};Duplexify.prototype._destroy = function (err) {if (err) {var ondrain = this._ondrain;this._ondrain = null;if (ondrain) ondrain(err);else this.emit("error", err);}if (this._forwardDestroy) {if (this._readable && this._readable.destroy) this._readable.destroy();if (this._writable && this._writable.destroy) this._writable.destroy();}this.emit("close");};Duplexify.prototype._write = function (data, enc, cb) {if (this.destroyed) return cb();if (this._corked) return onuncork(this, this._write.bind(this, data, enc, cb));if (data === SIGNAL_FLUSH) return this._finish(cb);if (!this._writable) return cb();if (this._writable.write(data) === false) this._ondrain = cb;else cb();};Duplexify.prototype._finish = function (cb) {var self = this;this.emit("preend");onuncork(this, function () {end(self._forwardEnd && self._writable, function () {if (self._writableState.prefinished === false) self._writableState.prefinished = true;self.emit("prefinish");onuncork(self, cb);});});};Duplexify.prototype.end = function (data, enc, cb) {if (typeof data === "function") return this.end(null, null, data);if (typeof enc === "function") return this.end(data, null, enc);this._ended = true;if (data) this.write(data);if (!this._writableState.ending) this.write(SIGNAL_FLUSH);return stream.Writable.prototype.end.call(this, cb);};module.exports = Duplexify;}).call(this, require("_process"), require("buffer").Buffer);}, { _process: 92, buffer: 12, "end-of-stream": 18, inherits: 80, "readable-stream": 108, "stream-shift": 111 }], 18: [function (require, module, exports) {var once = require("once");var noop = function noop() {};var isRequest = function isRequest(stream) {return stream.setHeader && typeof stream.abort === "function";};var isChildProcess = function isChildProcess(stream) {return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;};var eos = function eos(stream, opts, callback) {if (typeof opts === "function") return eos(stream, null, opts);if (!opts) opts = {};callback = once(callback || noop);var ws = stream._writableState;var rs = stream._readableState;var readable = opts.readable || opts.readable !== false && stream.readable;var writable = opts.writable || opts.writable !== false && stream.writable;var onlegacyfinish = function onlegacyfinish() {if (!stream.writable) onfinish();};var onfinish = function onfinish() {writable = false;if (!readable) callback.call(stream);};var onend = function onend() {readable = false;if (!writable) callback.call(stream);};var onexit = function onexit(exitCode) {callback.call(stream, exitCode ? new Error("exited with error code: " + exitCode) : null);};var onerror = function onerror(err) {callback.call(stream, err);};var onclose = function onclose() {if (readable && !(rs && rs.ended)) return callback.call(stream, new Error("premature close"));if (writable && !(ws && ws.ended)) return callback.call(stream, new Error("premature close"));};var onrequest = function onrequest() {stream.req.on("finish", onfinish);};if (isRequest(stream)) {stream.on("complete", onfinish);stream.on("abort", onclose);if (stream.req) onrequest();else stream.on("request", onrequest);} else if (writable && !ws) {stream.on("end", onlegacyfinish);stream.on("close", onlegacyfinish);}if (isChildProcess(stream)) stream.on("exit", onexit);stream.on("end", onend);stream.on("finish", onfinish);if (opts.error !== false) stream.on("error", onerror);stream.on("close", onclose);return function () {stream.removeListener("complete", onfinish);stream.removeListener("abort", onclose);stream.removeListener("request", onrequest);if (stream.req) stream.req.removeListener("finish", onfinish);stream.removeListener("end", onlegacyfinish);stream.removeListener("close", onlegacyfinish);stream.removeListener("finish", onfinish);stream.removeListener("exit", onexit);stream.removeListener("end", onend);stream.removeListener("error", onerror);stream.removeListener("close", onclose);};};module.exports = eos;}, { once: 90 }], 19: [function (require, module, exports) {"use strict";var value = require("../../object/valid-value");module.exports = function () {value(this).length = 0;return this;};}, { "../../object/valid-value": 55 }], 20: [function (require, module, exports) {"use strict";var numberIsNaN = require("../../number/is-nan"),toPosInt = require("../../number/to-pos-integer"),value = require("../../object/valid-value"),indexOf = Array.prototype.indexOf,objHasOwnProperty = Object.prototype.hasOwnProperty,abs = Math.abs,floor = Math.floor;module.exports = function (searchElement) {var i, length, fromIndex, val;if (!numberIsNaN(searchElement)) return indexOf.apply(this, arguments);length = toPosInt(value(this).length);fromIndex = arguments[1];if (isNaN(fromIndex)) fromIndex = 0;else if (fromIndex >= 0) fromIndex = floor(fromIndex);else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));for (i = fromIndex; i < length; ++i) {if (objHasOwnProperty.call(this, i)) {val = this[i];if (numberIsNaN(val)) return i;}}return -1;};}, { "../../number/is-nan": 30, "../../number/to-pos-integer": 34, "../../object/valid-value": 55 }], 21: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Array.from : require("./shim");}, { "./is-implemented": 22, "./shim": 23 }], 22: [function (require, module, exports) {"use strict";module.exports = function () {var from = Array.from,arr,result;if (typeof from !== "function") return false;arr = ["raz", "dwa"];result = from(arr);return Boolean(result && result !== arr && result[1] === "dwa");};}, {}], 23: [function (require, module, exports) {"use strict";var iteratorSymbol = require("es6-symbol").iterator,isArguments = require("../../function/is-arguments"),isFunction = require("../../function/is-function"),toPosInt = require("../../number/to-pos-integer"),callable = require("../../object/valid-callable"),validValue = require("../../object/valid-value"),isValue = require("../../object/is-value"),isString = require("../../string/is-string"),isArray = Array.isArray,call = Function.prototype.call,desc = { configurable: true, enumerable: true, writable: true, value: null },defineProperty = Object.defineProperty;module.exports = function (arrayLike) {var mapFn = arguments[1],thisArg = arguments[2],Context,i,j,arr,length,code,iterator,result,getIterator,value;arrayLike = Object(validValue(arrayLike));if (isValue(mapFn)) callable(mapFn);if (!this || this === Array || !isFunction(this)) {if (!mapFn) {if (isArguments(arrayLike)) {length = arrayLike.length;if (length !== 1) return Array.apply(null, arrayLike);arr = new Array(1);arr[0] = arrayLike[0];return arr;}if (isArray(arrayLike)) {arr = new Array(length = arrayLike.length);for (i = 0; i < length; ++i) {arr[i] = arrayLike[i];}return arr;}}arr = [];} else {Context = this;}if (!isArray(arrayLike)) {if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {iterator = callable(getIterator).call(arrayLike);if (Context) arr = new Context();result = iterator.next();i = 0;while (!result.done) {value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;if (Context) {desc.value = value;defineProperty(arr, i, desc);} else {arr[i] = value;}result = iterator.next();++i;}length = i;} else if (isString(arrayLike)) {length = arrayLike.length;if (Context) arr = new Context();for (i = 0, j = 0; i < length; ++i) {value = arrayLike[i];if (i + 1 < length) {code = value.charCodeAt(0);if (code >= 55296 && code <= 56319) value += arrayLike[++i];}value = mapFn ? call.call(mapFn, thisArg, value, j) : value;if (Context) {desc.value = value;defineProperty(arr, j, desc);} else {arr[j] = value;}++j;}length = j;}}if (length === undefined) {length = toPosInt(arrayLike.length);if (Context) arr = new Context(length);for (i = 0; i < length; ++i) {value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];if (Context) {desc.value = value;defineProperty(arr, i, desc);} else {arr[i] = value;}}}if (Context) {desc.value = null;arr.length = length;}return arr;};}, { "../../function/is-arguments": 24, "../../function/is-function": 25, "../../number/to-pos-integer": 34, "../../object/is-value": 44, "../../object/valid-callable": 54, "../../object/valid-value": 55, "../../string/is-string": 59, "es6-symbol": 73 }], 24: [function (require, module, exports) {"use strict";var objToString = Object.prototype.toString,id = objToString.call(function () {return arguments;}());module.exports = function (value) {return objToString.call(value) === id;};}, {}], 25: [function (require, module, exports) {"use strict";var objToString = Object.prototype.toString,id = objToString.call(require("./noop"));module.exports = function (value) {return typeof value === "function" && objToString.call(value) === id;};}, { "./noop": 26 }], 26: [function (require, module, exports) {"use strict";module.exports = function () {};}, {}], 27: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Math.sign : require("./shim");}, { "./is-implemented": 28, "./shim": 29 }], 28: [function (require, module, exports) {"use strict";module.exports = function () {var sign = Math.sign;if (typeof sign !== "function") return false;return sign(10) === 1 && sign(-20) === -1;};}, {}], 29: [function (require, module, exports) {"use strict";module.exports = function (value) {value = Number(value);if (isNaN(value) || value === 0) return value;return value > 0 ? 1 : -1;};}, {}], 30: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Number.isNaN : require("./shim");}, { "./is-implemented": 31, "./shim": 32 }], 31: [function (require, module, exports) {"use strict";module.exports = function () {var numberIsNaN = Number.isNaN;if (typeof numberIsNaN !== "function") return false;return !numberIsNaN({}) && numberIsNaN(NaN) && !numberIsNaN(34);};}, {}], 32: [function (require, module, exports) {"use strict";module.exports = function (value) {return value !== value;};}, {}], 33: [function (require, module, exports) {"use strict";var sign = require("../math/sign"),abs = Math.abs,floor = Math.floor;module.exports = function (value) {if (isNaN(value)) return 0;value = Number(value);if (value === 0 || !isFinite(value)) return value;return sign(value) * floor(abs(value));};}, { "../math/sign": 27 }], 34: [function (require, module, exports) {"use strict";var toInteger = require("./to-integer"),max = Math.max;module.exports = function (value) {return max(0, toInteger(value));};}, { "./to-integer": 33 }], 35: [function (require, module, exports) {"use strict";var callable = require("./valid-callable"),value = require("./valid-value"),bind = Function.prototype.bind,call = Function.prototype.call,keys = Object.keys,objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;module.exports = function (method, defVal) {return function (obj, cb) {var list,thisArg = arguments[2],compareFn = arguments[3];obj = Object(value(obj));callable(cb);list = keys(obj);if (compareFn) {list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);}if (typeof method !== "function") method = list[method];return call.call(method, list, function (key, index) {if (!objPropertyIsEnumerable.call(obj, key)) return defVal;return call.call(cb, thisArg, obj[key], key, obj, index);});};};}, { "./valid-callable": 54, "./valid-value": 55 }], 36: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Object.assign : require("./shim");}, { "./is-implemented": 37, "./shim": 38 }], 37: [function (require, module, exports) {"use strict";module.exports = function () {var assign = Object.assign,obj;if (typeof assign !== "function") return false;obj = { foo: "raz" };assign(obj, { bar: "dwa" }, { trzy: "trzy" });return obj.foo + obj.bar + obj.trzy === "razdwatrzy";};}, {}], 38: [function (require, module, exports) {"use strict";var keys = require("../keys"),value = require("../valid-value"),max = Math.max;module.exports = function (dest, src) {var error,i,length = max(arguments.length, 2),assign;dest = Object(value(dest));assign = function assign(key) {try {dest[key] = src[key];} catch (e) {if (!error) error = e;}};for (i = 1; i < length; ++i) {src = arguments[i];keys(src).forEach(assign);}if (error !== undefined) throw error;return dest;};}, { "../keys": 45, "../valid-value": 55 }], 39: [function (require, module, exports) {"use strict";var aFrom = require("../array/from"),assign = require("./assign"),value = require("./valid-value");module.exports = function (obj) {var copy = Object(value(obj)),propertyNames = arguments[1],options = Object(arguments[2]);if (copy !== obj && !propertyNames) return copy;var result = {};if (propertyNames) {aFrom(propertyNames, function (propertyName) {if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];});} else {assign(result, obj);}return result;};}, { "../array/from": 21, "./assign": 36, "./valid-value": 55 }], 40: [function (require, module, exports) {"use strict";var create = Object.create,shim;if (!require("./set-prototype-of/is-implemented")()) {shim = require("./set-prototype-of/shim");}module.exports = function () {var nullObject, polyProps, desc;if (!shim) return create;if (shim.level !== 1) return create;nullObject = {};polyProps = {};desc = { configurable: false, enumerable: false, writable: true, value: undefined };Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {if (name === "__proto__") {polyProps[name] = { configurable: true, enumerable: false, writable: true, value: undefined };return;}polyProps[name] = desc;});Object.defineProperties(nullObject, polyProps);Object.defineProperty(shim, "nullPolyfill", { configurable: false, enumerable: false, writable: false, value: nullObject });return function (prototype, props) {return create(prototype === null ? nullObject : prototype, props);};}();}, { "./set-prototype-of/is-implemented": 52, "./set-prototype-of/shim": 53 }], 41: [function (require, module, exports) {"use strict";module.exports = require("./_iterate")("forEach");}, { "./_iterate": 35 }], 42: [function (require, module, exports) {"use strict";module.exports = function (obj) {return typeof obj === "function";};}, {}], 43: [function (require, module, exports) {"use strict";var isValue = require("./is-value");var map = { function: true, object: true };module.exports = function (value) {return isValue(value) && map[typeof value] || false;};}, { "./is-value": 44 }], 44: [function (require, module, exports) {"use strict";var _undefined = require("../function/noop")();module.exports = function (val) {return val !== _undefined && val !== null;};}, { "../function/noop": 26 }], 45: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Object.keys : require("./shim");}, { "./is-implemented": 46, "./shim": 47 }], 46: [function (require, module, exports) {"use strict";module.exports = function () {try {Object.keys("primitive");return true;} catch (e) {return false;}};}, {}], 47: [function (require, module, exports) {"use strict";var isValue = require("../is-value");var keys = Object.keys;module.exports = function (object) {return keys(isValue(object) ? Object(object) : object);};}, { "../is-value": 44 }], 48: [function (require, module, exports) {"use strict";var callable = require("./valid-callable"),forEach = require("./for-each"),call = Function.prototype.call;module.exports = function (obj, cb) {var result = {},thisArg = arguments[2];callable(cb);forEach(obj, function (value, key, targetObj, index) {result[key] = call.call(cb, thisArg, value, key, targetObj, index);});return result;};}, { "./for-each": 41, "./valid-callable": 54 }], 49: [function (require, module, exports) {"use strict";var isValue = require("./is-value");var forEach = Array.prototype.forEach,create = Object.create;var process = function process(src, obj) {var key;for (key in src) {obj[key] = src[key];}};module.exports = function (opts1) {var result = create(null);forEach.call(arguments, function (options) {if (!isValue(options)) return;process(Object(options), result);});return result;};}, { "./is-value": 44 }], 50: [function (require, module, exports) {"use strict";var forEach = Array.prototype.forEach,create = Object.create;module.exports = function (arg) {var set = create(null);forEach.call(arguments, function (name) {set[name] = true;});return set;};}, {}], 51: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Object.setPrototypeOf : require("./shim");}, { "./is-implemented": 52, "./shim": 53 }], 52: [function (require, module, exports) {"use strict";var create = Object.create,getPrototypeOf = Object.getPrototypeOf,plainObject = {};module.exports = function () {var setPrototypeOf = Object.setPrototypeOf,customCreate = arguments[0] || create;if (typeof setPrototypeOf !== "function") return false;return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;};}, {}], 53: [function (require, module, exports) {"use strict";var isObject = require("../is-object"),value = require("../valid-value"),objIsPrototypeOf = Object.prototype.isPrototypeOf,defineProperty = Object.defineProperty,nullDesc = { configurable: true, enumerable: false, writable: true, value: undefined },validate;validate = function validate(obj, prototype) {value(obj);if (prototype === null || isObject(prototype)) return obj;throw new TypeError("Prototype must be null or an object");};module.exports = function (status) {var fn, set;if (!status) return null;if (status.level === 2) {if (status.set) {set = status.set;fn = function fn(obj, prototype) {set.call(validate(obj, prototype), prototype);return obj;};} else {fn = function fn(obj, prototype) {validate(obj, prototype).__proto__ = prototype;return obj;};}} else {fn = function self(obj, prototype) {var isNullBase;validate(obj, prototype);isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);if (isNullBase) delete self.nullPolyfill.__proto__;if (prototype === null) prototype = self.nullPolyfill;obj.__proto__ = prototype;if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);return obj;};}return Object.defineProperty(fn, "level", { configurable: false, enumerable: false, writable: false, value: status.level });}(function () {var tmpObj1 = Object.create(null),tmpObj2 = {},set,desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");if (desc) {try {set = desc.set;set.call(tmpObj1, tmpObj2);} catch (ignore) {}if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };}tmpObj1.__proto__ = tmpObj2;if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };tmpObj1 = {};tmpObj1.__proto__ = tmpObj2;if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };return false;}());require("../create");}, { "../create": 40, "../is-object": 43, "../valid-value": 55 }], 54: [function (require, module, exports) {"use strict";module.exports = function (fn) {if (typeof fn !== "function") throw new TypeError(fn + " is not a function");return fn;};}, {}], 55: [function (require, module, exports) {"use strict";var isValue = require("./is-value");module.exports = function (value) {if (!isValue(value)) throw new TypeError("Cannot use null or undefined");return value;};}, { "./is-value": 44 }], 56: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");}, { "./is-implemented": 57, "./shim": 58 }], 57: [function (require, module, exports) {"use strict";var str = "razdwatrzy";module.exports = function () {if (typeof str.contains !== "function") return false;return str.contains("dwa") === true && str.contains("foo") === false;};}, {}], 58: [function (require, module, exports) {"use strict";var indexOf = String.prototype.indexOf;module.exports = function (searchString) {return indexOf.call(this, searchString, arguments[1]) > -1;};}, {}], 59: [function (require, module, exports) {"use strict";var objToString = Object.prototype.toString,id = objToString.call("");module.exports = function (value) {return typeof value === "string" || value && typeof value === "object" && (value instanceof String || objToString.call(value) === id) || false;};}, {}], 60: [function (require, module, exports) {"use strict";var setPrototypeOf = require("es5-ext/object/set-prototype-of"),contains = require("es5-ext/string/#/contains"),d = require("d"),Symbol = require("es6-symbol"),Iterator = require("./");var defineProperty = Object.defineProperty,ArrayIterator;ArrayIterator = module.exports = function (arr, kind) {if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");Iterator.call(this, arr);if (!kind) kind = "value";else if (contains.call(kind, "key+value")) kind = "key+value";else if (contains.call(kind, "key")) kind = "key";else kind = "value";defineProperty(this, "__kind__", d("", kind));};if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);delete ArrayIterator.prototype.constructor;ArrayIterator.prototype = Object.create(Iterator.prototype, { _resolve: d(function (i) {if (this.__kind__ === "value") return this.__list__[i];if (this.__kind__ === "key+value") return [i, this.__list__[i]];return i;}) });defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));}, { "./": 63, d: 16, "es5-ext/object/set-prototype-of": 51, "es5-ext/string/#/contains": 56, "es6-symbol": 73 }], 61: [function (require, module, exports) {"use strict";var isArguments = require("es5-ext/function/is-arguments"),callable = require("es5-ext/object/valid-callable"),isString = require("es5-ext/string/is-string"),get = require("./get");var isArray = Array.isArray,call = Function.prototype.call,some = Array.prototype.some;module.exports = function (iterable, cb) {var mode,thisArg = arguments[2],result,doBreak,broken,i,length,char,code;if (isArray(iterable) || isArguments(iterable)) mode = "array";else if (isString(iterable)) mode = "string";else iterable = get(iterable);callable(cb);doBreak = function doBreak() {broken = true;};if (mode === "array") {some.call(iterable, function (value) {call.call(cb, thisArg, value, doBreak);return broken;});return;}if (mode === "string") {length = iterable.length;for (i = 0; i < length; ++i) {char = iterable[i];if (i + 1 < length) {code = char.charCodeAt(0);if (code >= 55296 && code <= 56319) char += iterable[++i];}call.call(cb, thisArg, char, doBreak);if (broken) break;}return;}result = iterable.next();while (!result.done) {call.call(cb, thisArg, result.value, doBreak);if (broken) return;result = iterable.next();}};}, { "./get": 62, "es5-ext/function/is-arguments": 24, "es5-ext/object/valid-callable": 54, "es5-ext/string/is-string": 59 }], 62: [function (require, module, exports) {"use strict";var isArguments = require("es5-ext/function/is-arguments"),isString = require("es5-ext/string/is-string"),ArrayIterator = require("./array"),StringIterator = require("./string"),iterable = require("./valid-iterable"),iteratorSymbol = require("es6-symbol").iterator;module.exports = function (obj) {if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();if (isArguments(obj)) return new ArrayIterator(obj);if (isString(obj)) return new StringIterator(obj);return new ArrayIterator(obj);};}, { "./array": 60, "./string": 65, "./valid-iterable": 66, "es5-ext/function/is-arguments": 24, "es5-ext/string/is-string": 59, "es6-symbol": 73 }], 63: [function (require, module, exports) {"use strict";var clear = require("es5-ext/array/#/clear"),assign = require("es5-ext/object/assign"),callable = require("es5-ext/object/valid-callable"),value = require("es5-ext/object/valid-value"),d = require("d"),autoBind = require("d/auto-bind"),Symbol = require("es6-symbol");var defineProperty = Object.defineProperty,defineProperties = Object.defineProperties,_Iterator;module.exports = _Iterator = function Iterator(list, context) {if (!(this instanceof _Iterator)) throw new TypeError("Constructor requires 'new'");defineProperties(this, { __list__: d("w", value(list)), __context__: d("w", context), __nextIndex__: d("w", 0) });if (!context) return;callable(context.on);context.on("_add", this._onAdd);context.on("_delete", this._onDelete);context.on("_clear", this._onClear);};delete _Iterator.prototype.constructor;defineProperties(_Iterator.prototype, assign({ _next: d(function () {var i;if (!this.__list__) return undefined;if (this.__redo__) {i = this.__redo__.shift();if (i !== undefined) return i;}if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;this._unBind();return undefined;}), next: d(function () {return this._createResult(this._next());}), _createResult: d(function (i) {if (i === undefined) return { done: true, value: undefined };return { done: false, value: this._resolve(i) };}), _resolve: d(function (i) {return this.__list__[i];}), _unBind: d(function () {this.__list__ = null;delete this.__redo__;if (!this.__context__) return;this.__context__.off("_add", this._onAdd);this.__context__.off("_delete", this._onDelete);this.__context__.off("_clear", this._onClear);this.__context__ = null;}), toString: d(function () {return "[object " + (this[Symbol.toStringTag] || "Object") + "]";}) }, autoBind({ _onAdd: d(function (index) {if (index >= this.__nextIndex__) return;++this.__nextIndex__;if (!this.__redo__) {defineProperty(this, "__redo__", d("c", [index]));return;}this.__redo__.forEach(function (redo, i) {if (redo >= index) this.__redo__[i] = ++redo;}, this);this.__redo__.push(index);}), _onDelete: d(function (index) {var i;if (index >= this.__nextIndex__) return;--this.__nextIndex__;if (!this.__redo__) return;i = this.__redo__.indexOf(index);if (i !== -1) this.__redo__.splice(i, 1);this.__redo__.forEach(function (redo, j) {if (redo > index) this.__redo__[j] = --redo;}, this);}), _onClear: d(function () {if (this.__redo__) clear.call(this.__redo__);this.__nextIndex__ = 0;}) })));defineProperty(_Iterator.prototype, Symbol.iterator, d(function () {return this;}));}, { d: 16, "d/auto-bind": 15, "es5-ext/array/#/clear": 19, "es5-ext/object/assign": 36, "es5-ext/object/valid-callable": 54, "es5-ext/object/valid-value": 55, "es6-symbol": 73 }], 64: [function (require, module, exports) {"use strict";var isArguments = require("es5-ext/function/is-arguments"),isValue = require("es5-ext/object/is-value"),isString = require("es5-ext/string/is-string");var iteratorSymbol = require("es6-symbol").iterator,isArray = Array.isArray;module.exports = function (value) {if (!isValue(value)) return false;if (isArray(value)) return true;if (isString(value)) return true;if (isArguments(value)) return true;return typeof value[iteratorSymbol] === "function";};}, { "es5-ext/function/is-arguments": 24, "es5-ext/object/is-value": 44, "es5-ext/string/is-string": 59, "es6-symbol": 73 }], 65: [function (require, module, exports) {"use strict";var setPrototypeOf = require("es5-ext/object/set-prototype-of"),d = require("d"),Symbol = require("es6-symbol"),Iterator = require("./");var defineProperty = Object.defineProperty,StringIterator;StringIterator = module.exports = function (str) {if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");str = String(str);Iterator.call(this, str);defineProperty(this, "__length__", d("", str.length));};if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);delete StringIterator.prototype.constructor;StringIterator.prototype = Object.create(Iterator.prototype, { _next: d(function () {if (!this.__list__) return undefined;if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;this._unBind();return undefined;}), _resolve: d(function (i) {var char = this.__list__[i],code;if (this.__nextIndex__ === this.__length__) return char;code = char.charCodeAt(0);if (code >= 55296 && code <= 56319) return char + this.__list__[this.__nextIndex__++];return char;}) });defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));}, { "./": 63, d: 16, "es5-ext/object/set-prototype-of": 51, "es6-symbol": 73 }], 66: [function (require, module, exports) {"use strict";var isIterable = require("./is-iterable");module.exports = function (value) {if (!isIterable(value)) throw new TypeError(value + " is not iterable");return value;};}, { "./is-iterable": 64 }], 67: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Map : require("./polyfill");}, { "./is-implemented": 68, "./polyfill": 72 }], 68: [function (require, module, exports) {"use strict";module.exports = function () {var map, iterator, result;if (typeof Map !== "function") return false;try {map = new Map([["raz", "one"], ["dwa", "two"], ["trzy", "three"]]);} catch (e) {return false;}if (String(map) !== "[object Map]") return false;if (map.size !== 3) return false;if (typeof map.clear !== "function") return false;if (typeof map.delete !== "function") return false;if (typeof map.entries !== "function") return false;if (typeof map.forEach !== "function") return false;if (typeof map.get !== "function") return false;if (typeof map.has !== "function") return false;if (typeof map.keys !== "function") return false;if (typeof map.set !== "function") return false;if (typeof map.values !== "function") return false;iterator = map.entries();result = iterator.next();if (result.done !== false) return false;if (!result.value) return false;if (result.value[0] !== "raz") return false;if (result.value[1] !== "one") return false;return true;};}, {}], 69: [function (require, module, exports) {"use strict";module.exports = function () {if (typeof Map === "undefined") return false;return Object.prototype.toString.call(new Map()) === "[object Map]";}();}, {}], 70: [function (require, module, exports) {"use strict";module.exports = require("es5-ext/object/primitive-set")("key", "value", "key+value");}, { "es5-ext/object/primitive-set": 50 }], 71: [function (require, module, exports) {"use strict";var setPrototypeOf = require("es5-ext/object/set-prototype-of"),d = require("d"),Iterator = require("es6-iterator"),toStringTagSymbol = require("es6-symbol").toStringTag,kinds = require("./iterator-kinds"),defineProperties = Object.defineProperties,unBind = Iterator.prototype._unBind,MapIterator;MapIterator = module.exports = function (map, kind) {if (!(this instanceof MapIterator)) return new MapIterator(map, kind);Iterator.call(this, map.__mapKeysData__, map);if (!kind || !kinds[kind]) kind = "key+value";defineProperties(this, { __kind__: d("", kind), __values__: d("w", map.__mapValuesData__) });};if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);MapIterator.prototype = Object.create(Iterator.prototype, { constructor: d(MapIterator), _resolve: d(function (i) {if (this.__kind__ === "value") return this.__values__[i];if (this.__kind__ === "key") return this.__list__[i];return [this.__list__[i], this.__values__[i]];}), _unBind: d(function () {this.__values__ = null;unBind.call(this);}), toString: d(function () {return "[object Map Iterator]";}) });Object.defineProperty(MapIterator.prototype, toStringTagSymbol, d("c", "Map Iterator"));}, { "./iterator-kinds": 70, d: 16, "es5-ext/object/set-prototype-of": 51, "es6-iterator": 63, "es6-symbol": 73 }], 72: [function (require, module, exports) {"use strict";var clear = require("es5-ext/array/#/clear"),eIndexOf = require("es5-ext/array/#/e-index-of"),setPrototypeOf = require("es5-ext/object/set-prototype-of"),callable = require("es5-ext/object/valid-callable"),validValue = require("es5-ext/object/valid-value"),d = require("d"),ee = require("event-emitter"),Symbol = require("es6-symbol"),iterator = require("es6-iterator/valid-iterable"),forOf = require("es6-iterator/for-of"),Iterator = require("./lib/iterator"),isNative = require("./is-native-implemented"),call = Function.prototype.call,defineProperties = Object.defineProperties,getPrototypeOf = Object.getPrototypeOf,_MapPoly;module.exports = _MapPoly = function MapPoly() {var iterable = arguments[0],keys,values,self;if (!(this instanceof _MapPoly)) throw new TypeError("Constructor requires 'new'");if (isNative && setPrototypeOf && Map !== _MapPoly) {self = setPrototypeOf(new Map(), getPrototypeOf(this));} else {self = this;}if (iterable != null) iterator(iterable);defineProperties(self, { __mapKeysData__: d("c", keys = []), __mapValuesData__: d("c", values = []) });if (!iterable) return self;forOf(iterable, function (value) {var key = validValue(value)[0];value = value[1];if (eIndexOf.call(keys, key) !== -1) return;keys.push(key);values.push(value);}, self);return self;};if (isNative) {if (setPrototypeOf) setPrototypeOf(_MapPoly, Map);_MapPoly.prototype = Object.create(Map.prototype, { constructor: d(_MapPoly) });}ee(defineProperties(_MapPoly.prototype, { clear: d(function () {if (!this.__mapKeysData__.length) return;clear.call(this.__mapKeysData__);clear.call(this.__mapValuesData__);this.emit("_clear");}), delete: d(function (key) {var index = eIndexOf.call(this.__mapKeysData__, key);if (index === -1) return false;this.__mapKeysData__.splice(index, 1);this.__mapValuesData__.splice(index, 1);this.emit("_delete", index, key);return true;}), entries: d(function () {return new Iterator(this, "key+value");}), forEach: d(function (cb) {var thisArg = arguments[1],iterator,result;callable(cb);iterator = this.entries();result = iterator._next();while (result !== undefined) {call.call(cb, thisArg, this.__mapValuesData__[result], this.__mapKeysData__[result], this);result = iterator._next();}}), get: d(function (key) {var index = eIndexOf.call(this.__mapKeysData__, key);if (index === -1) return;return this.__mapValuesData__[index];}), has: d(function (key) {return eIndexOf.call(this.__mapKeysData__, key) !== -1;}), keys: d(function () {return new Iterator(this, "key");}), set: d(function (key, value) {var index = eIndexOf.call(this.__mapKeysData__, key),emit;if (index === -1) {index = this.__mapKeysData__.push(key) - 1;emit = true;}this.__mapValuesData__[index] = value;if (emit) this.emit("_add", index, key);return this;}), size: d.gs(function () {return this.__mapKeysData__.length;}), values: d(function () {return new Iterator(this, "value");}), toString: d(function () {return "[object Map]";}) }));Object.defineProperty(_MapPoly.prototype, Symbol.iterator, d(function () {return this.entries();}));Object.defineProperty(_MapPoly.prototype, Symbol.toStringTag, d("c", "Map"));}, { "./is-native-implemented": 69, "./lib/iterator": 71, d: 16, "es5-ext/array/#/clear": 19, "es5-ext/array/#/e-index-of": 20, "es5-ext/object/set-prototype-of": 51, "es5-ext/object/valid-callable": 54, "es5-ext/object/valid-value": 55, "es6-iterator/for-of": 61, "es6-iterator/valid-iterable": 66, "es6-symbol": 73, "event-emitter": 78 }], 73: [function (require, module, exports) {"use strict";module.exports = require("./is-implemented")() ? Symbol : require("./polyfill");}, { "./is-implemented": 74, "./polyfill": 76 }], 74: [function (require, module, exports) {"use strict";var validTypes = { object: true, symbol: true };module.exports = function () {var symbol;if (typeof Symbol !== "function") return false;symbol = Symbol("test symbol");try {String(symbol);} catch (e) {return false;}if (!validTypes[typeof Symbol.iterator]) return false;if (!validTypes[typeof Symbol.toPrimitive]) return false;if (!validTypes[typeof Symbol.toStringTag]) return false;return true;};}, {}], 75: [function (require, module, exports) {"use strict";module.exports = function (x) {if (!x) return false;if (typeof x === "symbol") return true;if (!x.constructor) return false;if (x.constructor.name !== "Symbol") return false;return x[x.constructor.toStringTag] === "Symbol";};}, {}], 76: [function (require, module, exports) {"use strict";var d = require("d"),validateSymbol = require("./validate-symbol"),create = Object.create,defineProperties = Object.defineProperties,defineProperty = Object.defineProperty,objPrototype = Object.prototype,NativeSymbol,SymbolPolyfill,HiddenSymbol,globalSymbols = create(null),isNativeSafe;if (typeof Symbol === "function") {NativeSymbol = Symbol;try {String(NativeSymbol());isNativeSafe = true;} catch (ignore) {}}var generateName = function () {var created = create(null);return function (desc) {var postfix = 0,name,ie11BugWorkaround;while (created[desc + (postfix || "")]) {++postfix;}desc += postfix || "";created[desc] = true;name = "@@" + desc;defineProperty(objPrototype, name, d.gs(null, function (value) {if (ie11BugWorkaround) return;ie11BugWorkaround = true;defineProperty(this, name, d(value));ie11BugWorkaround = false;}));return name;};}();HiddenSymbol = function Symbol(description) {if (this instanceof HiddenSymbol) throw new TypeError("Symbol is not a constructor");return SymbolPolyfill(description);};module.exports = SymbolPolyfill = function Symbol(description) {var symbol;if (this instanceof Symbol) throw new TypeError("Symbol is not a constructor");if (isNativeSafe) return NativeSymbol(description);symbol = create(HiddenSymbol.prototype);description = description === undefined ? "" : String(description);return defineProperties(symbol, { __description__: d("", description), __name__: d("", generateName(description)) });};defineProperties(SymbolPolyfill, { for: d(function (key) {if (globalSymbols[key]) return globalSymbols[key];return globalSymbols[key] = SymbolPolyfill(String(key));}), keyFor: d(function (s) {var key;validateSymbol(s);for (key in globalSymbols) {if (globalSymbols[key] === s) return key;}}), hasInstance: d("", NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill("hasInstance")), isConcatSpreadable: d("", NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill("isConcatSpreadable")), iterator: d("", NativeSymbol && NativeSymbol.iterator || SymbolPolyfill("iterator")), match: d("", NativeSymbol && NativeSymbol.match || SymbolPolyfill("match")), replace: d("", NativeSymbol && NativeSymbol.replace || SymbolPolyfill("replace")), search: d("", NativeSymbol && NativeSymbol.search || SymbolPolyfill("search")), species: d("", NativeSymbol && NativeSymbol.species || SymbolPolyfill("species")), split: d("", NativeSymbol && NativeSymbol.split || SymbolPolyfill("split")), toPrimitive: d("", NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill("toPrimitive")), toStringTag: d("", NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill("toStringTag")), unscopables: d("", NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill("unscopables")) });defineProperties(HiddenSymbol.prototype, { constructor: d(SymbolPolyfill), toString: d("", function () {return this.__name__;}) });defineProperties(SymbolPolyfill.prototype, { toString: d(function () {return "Symbol (" + validateSymbol(this).__description__ + ")";}), valueOf: d(function () {return validateSymbol(this);}) });defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d("", function () {var symbol = validateSymbol(this);if (typeof symbol === "symbol") return symbol;return symbol.toString();}));defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d("c", "Symbol"));defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d("c", SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));}, { "./validate-symbol": 77, d: 16 }], 77: [function (require, module, exports) {"use strict";var isSymbol = require("./is-symbol");module.exports = function (value) {if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");return value;};}, { "./is-symbol": 75 }], 78: [function (require, module, exports) {"use strict";var d = require("d"),callable = require("es5-ext/object/valid-callable"),apply = Function.prototype.apply,call = Function.prototype.call,create = Object.create,defineProperty = Object.defineProperty,defineProperties = Object.defineProperties,hasOwnProperty = Object.prototype.hasOwnProperty,descriptor = { configurable: true, enumerable: false, writable: true },on,_once2,off,emit,methods,descriptors,base;on = function on(type, listener) {var data;callable(listener);if (!hasOwnProperty.call(this, "__ee__")) {data = descriptor.value = create(null);defineProperty(this, "__ee__", descriptor);descriptor.value = null;} else {data = this.__ee__;}if (!data[type]) data[type] = listener;else if (typeof data[type] === "object") data[type].push(listener);else data[type] = [data[type], listener];return this;};_once2 = function once(type, listener) {var _once, self;callable(listener);self = this;on.call(this, type, _once = function once() {off.call(self, type, _once);apply.call(listener, this, arguments);});_once.__eeOnceListener__ = listener;return this;};off = function off(type, listener) {var data, listeners, candidate, i;callable(listener);if (!hasOwnProperty.call(this, "__ee__")) return this;data = this.__ee__;if (!data[type]) return this;listeners = data[type];if (typeof listeners === "object") {for (i = 0; candidate = listeners[i]; ++i) {if (candidate === listener || candidate.__eeOnceListener__ === listener) {if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);}}} else {if (listeners === listener || listeners.__eeOnceListener__ === listener) {delete data[type];}}return this;};emit = function emit(type) {var i, l, listener, listeners, args;if (!hasOwnProperty.call(this, "__ee__")) return;listeners = this.__ee__[type];if (!listeners) return;if (typeof listeners === "object") {l = arguments.length;args = new Array(l - 1);for (i = 1; i < l; ++i) {args[i - 1] = arguments[i];}listeners = listeners.slice();for (i = 0; listener = listeners[i]; ++i) {apply.call(listener, this, args);}} else {switch (arguments.length) {case 1:call.call(listeners, this);break;case 2:call.call(listeners, this, arguments[1]);break;case 3:call.call(listeners, this, arguments[1], arguments[2]);break;default:l = arguments.length;args = new Array(l - 1);for (i = 1; i < l; ++i) {args[i - 1] = arguments[i];}apply.call(listeners, this, args);}}};methods = { on: on, once: _once2, off: off, emit: emit };descriptors = { on: d(on), once: d(_once2), off: d(off), emit: d(emit) };base = defineProperties({}, descriptors);module.exports = exports = function exports(o) {return o == null ? create(base) : defineProperties(Object(o), descriptors);};exports.methods = methods;}, { d: 16, "es5-ext/object/valid-callable": 54 }], 79: [function (require, module, exports) {exports.read = function (buffer, offset, isLE, mLen, nBytes) {var e, m;var eLen = nBytes * 8 - mLen - 1;var eMax = (1 << eLen) - 1;var eBias = eMax >> 1;var nBits = -7;var i = isLE ? nBytes - 1 : 0;var d = isLE ? -1 : 1;var s = buffer[offset + i];i += d;e = s & (1 << -nBits) - 1;s >>= -nBits;nBits += eLen;for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}m = e & (1 << -nBits) - 1;e >>= -nBits;nBits += mLen;for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}if (e === 0) {e = 1 - eBias;} else if (e === eMax) {return m ? NaN : (s ? -1 : 1) * Infinity;} else {m = m + Math.pow(2, mLen);e = e - eBias;}return (s ? -1 : 1) * m * Math.pow(2, e - mLen);};exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {var e, m, c;var eLen = nBytes * 8 - mLen - 1;var eMax = (1 << eLen) - 1;var eBias = eMax >> 1;var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;var i = isLE ? 0 : nBytes - 1;var d = isLE ? 1 : -1;var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;value = Math.abs(value);if (isNaN(value) || value === Infinity) {m = isNaN(value) ? 1 : 0;e = eMax;} else {e = Math.floor(Math.log(value) / Math.LN2);if (value * (c = Math.pow(2, -e)) < 1) {e--;c *= 2;}if (e + eBias >= 1) {value += rt / c;} else {value += rt * Math.pow(2, 1 - eBias);}if (value * c >= 2) {e++;c /= 2;}if (e + eBias >= eMax) {m = 0;e = eMax;} else if (e + eBias >= 1) {m = (value * c - 1) * Math.pow(2, mLen);e = e + eBias;} else {m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);e = 0;}}for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {}e = e << mLen | m;eLen += mLen;for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {}buffer[offset + i - d] |= s * 128;};}, {}], 80: [function (require, module, exports) {if (typeof Object.create === "function") {module.exports = function inherits(ctor, superCtor) {ctor.super_ = superCtor;ctor.prototype = Object.create(superCtor.prototype, { constructor: { value: ctor, enumerable: false, writable: true, configurable: true } });};} else {module.exports = function inherits(ctor, superCtor) {ctor.super_ = superCtor;var TempCtor = function TempCtor() {};TempCtor.prototype = superCtor.prototype;ctor.prototype = new TempCtor();ctor.prototype.constructor = ctor;};}}, {}], 81: [function (require, module, exports) {module.exports = function (obj) {return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);};function isBuffer(obj) {return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);}function isSlowBuffer(obj) {return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));}}, {}], 82: [function (require, module, exports) {"use strict";var Buffer = require("safe-buffer").Buffer;var protocol = module.exports;protocol.types = { 0: "reserved", 1: "connect", 2: "connack", 3: "publish", 4: "puback", 5: "pubrec", 6: "pubrel", 7: "pubcomp", 8: "subscribe", 9: "suback", 10: "unsubscribe", 11: "unsuback", 12: "pingreq", 13: "pingresp", 14: "disconnect", 15: "auth" };protocol.codes = {};for (var k in protocol.types) {var v = protocol.types[k];protocol.codes[v] = k;}protocol.CMD_SHIFT = 4;protocol.CMD_MASK = 240;protocol.DUP_MASK = 8;protocol.QOS_MASK = 3;protocol.QOS_SHIFT = 1;protocol.RETAIN_MASK = 1;protocol.LENGTH_MASK = 127;protocol.LENGTH_FIN_MASK = 128;protocol.SESSIONPRESENT_MASK = 1;protocol.SESSIONPRESENT_HEADER = Buffer.from([protocol.SESSIONPRESENT_MASK]);protocol.CONNACK_HEADER = Buffer.from([protocol.codes["connack"] << protocol.CMD_SHIFT]);protocol.USERNAME_MASK = 128;protocol.PASSWORD_MASK = 64;protocol.WILL_RETAIN_MASK = 32;protocol.WILL_QOS_MASK = 24;protocol.WILL_QOS_SHIFT = 3;protocol.WILL_FLAG_MASK = 4;protocol.CLEAN_SESSION_MASK = 2;protocol.CONNECT_HEADER = Buffer.from([protocol.codes["connect"] << protocol.CMD_SHIFT]);protocol.properties = { sessionExpiryInterval: 17, willDelayInterval: 24, receiveMaximum: 33, maximumPacketSize: 39, topicAliasMaximum: 34, requestResponseInformation: 25, requestProblemInformation: 23, userProperties: 38, authenticationMethod: 21, authenticationData: 22, payloadFormatIndicator: 1, messageExpiryInterval: 2, contentType: 3, responseTopic: 8, correlationData: 9, maximumQoS: 36, retainAvailable: 37, assignedClientIdentifier: 18, reasonString: 31, wildcardSubscriptionAvailable: 40, subscriptionIdentifiersAvailable: 41, sharedSubscriptionAvailable: 42, serverKeepAlive: 19, responseInformation: 26, serverReference: 28, topicAlias: 35, subscriptionIdentifier: 11 };protocol.propertiesCodes = {};for (var prop in protocol.properties) {var id = protocol.properties[prop];protocol.propertiesCodes[id] = prop;}protocol.propertiesTypes = { sessionExpiryInterval: "int32", willDelayInterval: "int32", receiveMaximum: "int16", maximumPacketSize: "int32", topicAliasMaximum: "int16", requestResponseInformation: "byte", requestProblemInformation: "byte", userProperties: "pair", authenticationMethod: "string", authenticationData: "binary", payloadFormatIndicator: "byte", messageExpiryInterval: "int32", contentType: "string", responseTopic: "string", correlationData: "binary", maximumQoS: "int8", retainAvailable: "byte", assignedClientIdentifier: "string", reasonString: "string", wildcardSubscriptionAvailable: "byte", subscriptionIdentifiersAvailable: "byte", sharedSubscriptionAvailable: "byte", serverKeepAlive: "int32", responseInformation: "string", serverReference: "string", topicAlias: "int16", subscriptionIdentifier: "var" };function genHeader(type) {return [0, 1, 2].map(function (qos) {return [0, 1].map(function (dup) {return [0, 1].map(function (retain) {var buf = new Buffer(1);buf.writeUInt8(protocol.codes[type] << protocol.CMD_SHIFT | (dup ? protocol.DUP_MASK : 0) | qos << protocol.QOS_SHIFT | retain, 0, true);return buf;});});});}protocol.PUBLISH_HEADER = genHeader("publish");protocol.SUBSCRIBE_HEADER = genHeader("subscribe");protocol.SUBSCRIBE_OPTIONS_QOS_MASK = 3;protocol.SUBSCRIBE_OPTIONS_NL_MASK = 1;protocol.SUBSCRIBE_OPTIONS_NL_SHIFT = 2;protocol.SUBSCRIBE_OPTIONS_RAP_MASK = 1;protocol.SUBSCRIBE_OPTIONS_RAP_SHIFT = 3;protocol.SUBSCRIBE_OPTIONS_RH_MASK = 3;protocol.SUBSCRIBE_OPTIONS_RH_SHIFT = 4;protocol.SUBSCRIBE_OPTIONS_RH = [0, 16, 32];protocol.SUBSCRIBE_OPTIONS_NL = 4;protocol.SUBSCRIBE_OPTIONS_RAP = 8;protocol.SUBSCRIBE_OPTIONS_QOS = [0, 1, 2];protocol.UNSUBSCRIBE_HEADER = genHeader("unsubscribe");protocol.ACKS = { unsuback: genHeader("unsuback"), puback: genHeader("puback"), pubcomp: genHeader("pubcomp"), pubrel: genHeader("pubrel"), pubrec: genHeader("pubrec") };protocol.SUBACK_HEADER = Buffer.from([protocol.codes["suback"] << protocol.CMD_SHIFT]);protocol.VERSION3 = Buffer.from([3]);protocol.VERSION4 = Buffer.from([4]);protocol.VERSION5 = Buffer.from([5]);protocol.QOS = [0, 1, 2].map(function (qos) {return Buffer.from([qos]);});protocol.EMPTY = { pingreq: Buffer.from([protocol.codes["pingreq"] << 4, 0]), pingresp: Buffer.from([protocol.codes["pingresp"] << 4, 0]), disconnect: Buffer.from([protocol.codes["disconnect"] << 4, 0]) };}, { "safe-buffer": 110 }], 83: [function (require, module, exports) {"use strict";var Buffer = require("safe-buffer").Buffer;var writeToStream = require("./writeToStream");var EE = require("events").EventEmitter;var inherits = require("inherits");function generate(packet, opts) {var stream = new Accumulator();writeToStream(packet, stream, opts);return stream.concat();}function Accumulator() {this._array = new Array(20);this._i = 0;}inherits(Accumulator, EE);Accumulator.prototype.write = function (chunk) {this._array[this._i++] = chunk;return true;};Accumulator.prototype.concat = function () {var length = 0;var lengths = new Array(this._array.length);var list = this._array;var pos = 0;var i;var result;for (i = 0; i < list.length && list[i] !== undefined; i++) {if (typeof list[i] !== "string") lengths[i] = list[i].length;else lengths[i] = Buffer.byteLength(list[i]);length += lengths[i];}result = Buffer.allocUnsafe(length);for (i = 0; i < list.length && list[i] !== undefined; i++) {if (typeof list[i] !== "string") {list[i].copy(result, pos);pos += lengths[i];} else {result.write(list[i], pos);pos += lengths[i];}}return result;};module.exports = generate;}, { "./writeToStream": 89, events: 13, inherits: 80, "safe-buffer": 110 }], 84: [function (require, module, exports) {"use strict";exports.parser = require("./parser");exports.generate = require("./generate");exports.writeToStream = require("./writeToStream");}, { "./generate": 83, "./parser": 88, "./writeToStream": 89 }], 85: [function (require, module, exports) {var DuplexStream = require("readable-stream/duplex"),util = require("util"),Buffer = require("safe-buffer").Buffer;function BufferList(callback) {if (!(this instanceof BufferList)) return new BufferList(callback);this._bufs = [];this.length = 0;if (typeof callback == "function") {this._callback = callback;var piper = function piper(err) {if (this._callback) {this._callback(err);this._callback = null;}}.bind(this);this.on("pipe", function onPipe(src) {src.on("error", piper);});this.on("unpipe", function onUnpipe(src) {src.removeListener("error", piper);});} else {this.append(callback);}DuplexStream.call(this);}util.inherits(BufferList, DuplexStream);BufferList.prototype._offset = function _offset(offset) {var tot = 0,i = 0,_t;if (offset === 0) return [0, 0];for (; i < this._bufs.length; i++) {_t = tot + this._bufs[i].length;if (offset < _t || i == this._bufs.length - 1) return [i, offset - tot];tot = _t;}};BufferList.prototype.append = function append(buf) {var i = 0;if (Buffer.isBuffer(buf)) {this._appendBuffer(buf);} else if (Array.isArray(buf)) {for (; i < buf.length; i++) {this.append(buf[i]);}} else if (buf instanceof BufferList) {for (; i < buf._bufs.length; i++) {this.append(buf._bufs[i]);}} else if (buf != null) {if (typeof buf == "number") buf = buf.toString();this._appendBuffer(Buffer.from(buf));}return this;};BufferList.prototype._appendBuffer = function appendBuffer(buf) {this._bufs.push(buf);this.length += buf.length;};BufferList.prototype._write = function _write(buf, encoding, callback) {this._appendBuffer(buf);if (typeof callback == "function") callback();};BufferList.prototype._read = function _read(size) {if (!this.length) return this.push(null);size = Math.min(size, this.length);this.push(this.slice(0, size));this.consume(size);};BufferList.prototype.end = function end(chunk) {DuplexStream.prototype.end.call(this, chunk);if (this._callback) {this._callback(null, this.slice());this._callback = null;}};BufferList.prototype.get = function get(index) {return this.slice(index, index + 1)[0];};BufferList.prototype.slice = function slice(start, end) {if (typeof start == "number" && start < 0) start += this.length;if (typeof end == "number" && end < 0) end += this.length;return this.copy(null, 0, start, end);};BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {if (typeof srcStart != "number" || srcStart < 0) srcStart = 0;if (typeof srcEnd != "number" || srcEnd > this.length) srcEnd = this.length;if (srcStart >= this.length) return dst || Buffer.alloc(0);if (srcEnd <= 0) return dst || Buffer.alloc(0);var copy = !!dst,off = this._offset(srcStart),len = srcEnd - srcStart,bytes = len,bufoff = copy && dstStart || 0,start = off[1],l,i;if (srcStart === 0 && srcEnd == this.length) {if (!copy) {return this._bufs.length === 1 ? this._bufs[0] : Buffer.concat(this._bufs, this.length);}for (i = 0; i < this._bufs.length; i++) {this._bufs[i].copy(dst, bufoff);bufoff += this._bufs[i].length;}return dst;}if (bytes <= this._bufs[off[0]].length - start) {return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);}if (!copy) dst = Buffer.allocUnsafe(len);for (i = off[0]; i < this._bufs.length; i++) {l = this._bufs[i].length - start;if (bytes > l) {this._bufs[i].copy(dst, bufoff, start);} else {this._bufs[i].copy(dst, bufoff, start, start + bytes);break;}bufoff += l;bytes -= l;if (start) start = 0;}return dst;};BufferList.prototype.shallowSlice = function shallowSlice(start, end) {start = start || 0;end = end || this.length;if (start < 0) start += this.length;if (end < 0) end += this.length;var startOffset = this._offset(start),endOffset = this._offset(end),buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);if (endOffset[1] == 0) buffers.pop();else buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);if (startOffset[1] != 0) buffers[0] = buffers[0].slice(startOffset[1]);return new BufferList(buffers);};BufferList.prototype.toString = function toString(encoding, start, end) {return this.slice(start, end).toString(encoding);};BufferList.prototype.consume = function consume(bytes) {while (this._bufs.length) {if (bytes >= this._bufs[0].length) {bytes -= this._bufs[0].length;this.length -= this._bufs[0].length;this._bufs.shift();} else {this._bufs[0] = this._bufs[0].slice(bytes);this.length -= bytes;break;}}return this;};BufferList.prototype.duplicate = function duplicate() {var i = 0,copy = new BufferList();for (; i < this._bufs.length; i++) {copy.append(this._bufs[i]);}return copy;};BufferList.prototype.destroy = function destroy() {this._bufs.length = 0;this.length = 0;this.push(null);};(function () {var methods = { readDoubleBE: 8, readDoubleLE: 8, readFloatBE: 4, readFloatLE: 4, readInt32BE: 4, readInt32LE: 4, readUInt32BE: 4, readUInt32LE: 4, readInt16BE: 2, readInt16LE: 2, readUInt16BE: 2, readUInt16LE: 2, readInt8: 1, readUInt8: 1 };for (var m in methods) {(function (m) {BufferList.prototype[m] = function (offset) {return this.slice(offset, offset + methods[m])[m](0);};})(m);}})();module.exports = BufferList;}, { "readable-stream/duplex": 97, "safe-buffer": 110, util: 117 }], 86: [function (require, module, exports) {"use strict";var Buffer = require("safe-buffer").Buffer;var max = 65536;var cache = {};function generateBuffer(i) {var buffer = Buffer.allocUnsafe(2);buffer.writeUInt8(i >> 8, 0);buffer.writeUInt8(i & 255, 0 + 1);return buffer;}function generateCache() {for (var i = 0; i < max; i++) {cache[i] = generateBuffer(i);}}function calcVariableByteIntLength(length) {if (length >= 0 && length < 128) return 1;else if (length >= 128 && length < 16384) return 2;else if (length >= 16384 && length < 2097152) return 3;else if (length >= 2097152 && length < 268435456) return 4;else return 0;}function genBufVariableByteInt(num) {var digit = 0;var pos = 0;var length = calcVariableByteIntLength(num);var buffer = Buffer.allocUnsafe(length);do {digit = num % 128 | 0;num = num / 128 | 0;if (num > 0) digit = digit | 128;buffer.writeUInt8(digit, pos++);} while (num > 0);return { data: buffer, length: length };}function generate4ByteBuffer(num) {var buffer = Buffer.allocUnsafe(4);buffer.writeUInt32BE(num, 0);return buffer;}module.exports = { cache: cache, generateCache: generateCache, generateNumber: generateBuffer, genBufVariableByteInt: genBufVariableByteInt, generate4ByteBuffer: generate4ByteBuffer };}, { "safe-buffer": 110 }], 87: [function (require, module, exports) {function Packet() {this.cmd = null;this.retain = false;this.qos = 0;this.dup = false;this.length = -1;this.topic = null;this.payload = null;}module.exports = Packet;}, {}], 88: [function (require, module, exports) {"use strict";var bl = require("bl");var inherits = require("inherits");var EE = require("events").EventEmitter;var Packet = require("./packet");var constants = require("./constants");function Parser(opt) {if (!(this instanceof Parser)) return new Parser(opt);this.settings = opt || {};this._states = ["_parseHeader", "_parseLength", "_parsePayload", "_newPacket"];this._resetState();}inherits(Parser, EE);Parser.prototype._resetState = function () {this.packet = new Packet();this.error = null;this._list = bl();this._stateCounter = 0;};Parser.prototype.parse = function (buf) {if (this.error) this._resetState();this._list.append(buf);while ((this.packet.length !== -1 || this._list.length > 0) && this[this._states[this._stateCounter]]() && !this.error) {this._stateCounter++;if (this._stateCounter >= this._states.length) this._stateCounter = 0;}return this._list.length;};Parser.prototype._parseHeader = function () {var zero = this._list.readUInt8(0);this.packet.cmd = constants.types[zero >> constants.CMD_SHIFT];this.packet.retain = (zero & constants.RETAIN_MASK) !== 0;this.packet.qos = zero >> constants.QOS_SHIFT & constants.QOS_MASK;this.packet.dup = (zero & constants.DUP_MASK) !== 0;this._list.consume(1);return true;};Parser.prototype._parseLength = function () {var result = this._parseVarByteNum(true);if (result) {this.packet.length = result.value;this._list.consume(result.bytes);}return !!result;};Parser.prototype._parsePayload = function () {var result = false;if (this.packet.length === 0 || this._list.length >= this.packet.length) {this._pos = 0;switch (this.packet.cmd) {case "connect":this._parseConnect();break;case "connack":this._parseConnack();break;case "publish":this._parsePublish();break;case "puback":case "pubrec":case "pubrel":case "pubcomp":this._parseConfirmation();break;case "subscribe":this._parseSubscribe();break;case "suback":this._parseSuback();break;case "unsubscribe":this._parseUnsubscribe();break;case "unsuback":this._parseUnsuback();break;case "pingreq":case "pingresp":break;case "disconnect":this._parseDisconnect();break;case "auth":this._parseAuth();break;default:this._emitError(new Error("Not supported"));}result = true;}return result;};Parser.prototype._parseConnect = function () {var protocolId;var clientId;var topic;var payload;var password;var username;var flags = {};var packet = this.packet;protocolId = this._parseString();if (protocolId === null) return this._emitError(new Error("Cannot parse protocolId"));if (protocolId !== "MQTT" && protocolId !== "MQIsdp") {return this._emitError(new Error("Invalid protocolId"));}packet.protocolId = protocolId;if (this._pos >= this._list.length) return this._emitError(new Error("Packet too short"));packet.protocolVersion = this._list.readUInt8(this._pos);if (packet.protocolVersion !== 3 && packet.protocolVersion !== 4 && packet.protocolVersion !== 5) {return this._emitError(new Error("Invalid protocol version"));}this._pos++;if (this._pos >= this._list.length) {return this._emitError(new Error("Packet too short"));}flags.username = this._list.readUInt8(this._pos) & constants.USERNAME_MASK;flags.password = this._list.readUInt8(this._pos) & constants.PASSWORD_MASK;flags.will = this._list.readUInt8(this._pos) & constants.WILL_FLAG_MASK;if (flags.will) {packet.will = {};packet.will.retain = (this._list.readUInt8(this._pos) & constants.WILL_RETAIN_MASK) !== 0;packet.will.qos = (this._list.readUInt8(this._pos) & constants.WILL_QOS_MASK) >> constants.WILL_QOS_SHIFT;}packet.clean = (this._list.readUInt8(this._pos) & constants.CLEAN_SESSION_MASK) !== 0;this._pos++;packet.keepalive = this._parseNum();if (packet.keepalive === -1) return this._emitError(new Error("Packet too short"));if (packet.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}clientId = this._parseString();if (clientId === null) return this._emitError(new Error("Packet too short"));packet.clientId = clientId;if (flags.will) {if (packet.protocolVersion === 5) {var willProperties = this._parseProperties();if (Object.getOwnPropertyNames(willProperties).length) {packet.will.properties = willProperties;}}topic = this._parseString();if (topic === null) return this._emitError(new Error("Cannot parse will topic"));packet.will.topic = topic;payload = this._parseBuffer();if (payload === null) return this._emitError(new Error("Cannot parse will payload"));packet.will.payload = payload;}if (flags.username) {username = this._parseString();if (username === null) return this._emitError(new Error("Cannot parse username"));packet.username = username;}if (flags.password) {password = this._parseBuffer();if (password === null) return this._emitError(new Error("Cannot parse password"));packet.password = password;}this.settings = packet;return packet;};Parser.prototype._parseConnack = function () {var packet = this.packet;if (this._list.length < 2) return null;packet.sessionPresent = !!(this._list.readUInt8(this._pos++) & constants.SESSIONPRESENT_MASK);if (this.settings.protocolVersion === 5) {packet.reasonCode = this._list.readUInt8(this._pos++);} else {packet.returnCode = this._list.readUInt8(this._pos++);}if (packet.returnCode === -1 || packet.reasonCode === -1) return this._emitError(new Error("Cannot parse return code"));if (this.settings.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}};Parser.prototype._parsePublish = function () {var packet = this.packet;packet.topic = this._parseString();if (packet.topic === null) return this._emitError(new Error("Cannot parse topic"));if (packet.qos > 0) if (!this._parseMessageId()) {return;}if (this.settings.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}packet.payload = this._list.slice(this._pos, packet.length);};Parser.prototype._parseSubscribe = function () {var packet = this.packet;var topic;var options;var qos;var rh;var rap;var nl;var subscription;if (packet.qos !== 1) {return this._emitError(new Error("Wrong subscribe header"));}packet.subscriptions = [];if (!this._parseMessageId()) {return;}if (this.settings.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}while (this._pos < packet.length) {topic = this._parseString();if (topic === null) return this._emitError(new Error("Cannot parse topic"));options = this._parseByte();qos = options & constants.SUBSCRIBE_OPTIONS_QOS_MASK;nl = (options >> constants.SUBSCRIBE_OPTIONS_NL_SHIFT & constants.SUBSCRIBE_OPTIONS_NL_MASK) !== 0;rap = (options >> constants.SUBSCRIBE_OPTIONS_RAP_SHIFT & constants.SUBSCRIBE_OPTIONS_RAP_MASK) !== 0;rh = options >> constants.SUBSCRIBE_OPTIONS_RH_SHIFT & constants.SUBSCRIBE_OPTIONS_RH_MASK;subscription = { topic: topic, qos: qos };if (this.settings.protocolVersion === 5) {subscription.nl = nl;subscription.rap = rap;subscription.rh = rh;}packet.subscriptions.push(subscription);}};Parser.prototype._parseSuback = function () {var packet = this.packet;this.packet.granted = [];if (!this._parseMessageId()) {return;}if (this.settings.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}while (this._pos < this.packet.length) {this.packet.granted.push(this._list.readUInt8(this._pos++));}};Parser.prototype._parseUnsubscribe = function () {var packet = this.packet;packet.unsubscriptions = [];if (!this._parseMessageId()) {return;}if (this.settings.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}while (this._pos < packet.length) {var topic;topic = this._parseString();if (topic === null) return this._emitError(new Error("Cannot parse topic"));packet.unsubscriptions.push(topic);}};Parser.prototype._parseUnsuback = function () {var packet = this.packet;if (!this._parseMessageId()) return this._emitError(new Error("Cannot parse messageId"));if (this.settings.protocolVersion === 5) {var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}packet.granted = [];while (this._pos < this.packet.length) {this.packet.granted.push(this._list.readUInt8(this._pos++));}}};Parser.prototype._parseConfirmation = function () {var packet = this.packet;this._parseMessageId();if (this.settings.protocolVersion === 5) {if (packet.length > 2) {packet.reasonCode = this._parseByte();var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}}return true;};Parser.prototype._parseDisconnect = function () {var packet = this.packet;if (this.settings.protocolVersion === 5) {packet.reasonCode = this._parseByte();var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}}return true;};Parser.prototype._parseAuth = function () {var packet = this.packet;if (this.settings.protocolVersion !== 5) {return this._emitError(new Error("Not supported auth packet for this version MQTT"));}packet.reasonCode = this._parseByte();var properties = this._parseProperties();if (Object.getOwnPropertyNames(properties).length) {packet.properties = properties;}return true;};Parser.prototype._parseMessageId = function () {var packet = this.packet;packet.messageId = this._parseNum();if (packet.messageId === null) {this._emitError(new Error("Cannot parse messageId"));return false;}return true;};Parser.prototype._parseString = function (maybeBuffer) {var length = this._parseNum();var result;var end = length + this._pos;if (length === -1 || end > this._list.length || end > this.packet.length) return null;result = this._list.toString("utf8", this._pos, end);this._pos += length;return result;};Parser.prototype._parseStringPair = function () {return { name: this._parseString(), value: this._parseString() };};Parser.prototype._parseBuffer = function () {var length = this._parseNum();var result;var end = length + this._pos;if (length === -1 || end > this._list.length || end > this.packet.length) return null;result = this._list.slice(this._pos, end);this._pos += length;return result;};Parser.prototype._parseNum = function () {if (this._list.length - this._pos < 2) return -1;var result = this._list.readUInt16BE(this._pos);this._pos += 2;return result;};Parser.prototype._parse4ByteNum = function () {if (this._list.length - this._pos < 4) return -1;var result = this._list.readUInt32BE(this._pos);this._pos += 4;return result;};Parser.prototype._parseVarByteNum = function (fullInfoFlag) {var bytes = 0;var mul = 1;var length = 0;var result = true;var current;var padding = this._pos ? this._pos : 0;while (bytes < 5) {current = this._list.readUInt8(padding + bytes++);length += mul * (current & constants.LENGTH_MASK);mul *= 128;if ((current & constants.LENGTH_FIN_MASK) === 0) break;if (this._list.length <= bytes) {result = false;break;}}if (padding) {this._pos += bytes;}result = result ? fullInfoFlag ? { bytes: bytes, value: length } : length : false;return result;};Parser.prototype._parseByte = function () {var result = this._list.readUInt8(this._pos);this._pos++;return result;};Parser.prototype._parseByType = function (type) {switch (type) {case "byte":{return this._parseByte() !== 0;}case "int8":{return this._parseByte();}case "int16":{return this._parseNum();}case "int32":{return this._parse4ByteNum();}case "var":{return this._parseVarByteNum();}case "string":{return this._parseString();}case "pair":{return this._parseStringPair();}case "binary":{return this._parseBuffer();}}};Parser.prototype._parseProperties = function () {var length = this._parseVarByteNum();var start = this._pos;var end = start + length;var result = {};while (this._pos < end) {var type = this._parseByte();var name = constants.propertiesCodes[type];if (!name) {this._emitError(new Error("Unknown property"));return false;}if (name === "userProperties") {if (!result[name]) {result[name] = {};}var currentUserProperty = this._parseByType(constants.propertiesTypes[name]);result[name][currentUserProperty.name] = currentUserProperty.value;continue;}result[name] = this._parseByType(constants.propertiesTypes[name]);}return result;};Parser.prototype._newPacket = function () {if (this.packet) {this._list.consume(this.packet.length);this.emit("packet", this.packet);}this.packet = new Packet();this._pos = 0;return true;};Parser.prototype._emitError = function (err) {this.error = err;this.emit("error", err);};module.exports = Parser;}, { "./constants": 82, "./packet": 87, bl: 85, events: 13, inherits: 80 }], 89: [function (require, module, exports) {"use strict";var protocol = require("./constants");var Buffer = require("safe-buffer").Buffer;var empty = Buffer.allocUnsafe(0);var zeroBuf = Buffer.from([0]);var numbers = require("./numbers");var nextTick = require("process-nextick-args").nextTick;var numCache = numbers.cache;var generateNumber = numbers.generateNumber;var generateCache = numbers.generateCache;var genBufVariableByteInt = numbers.genBufVariableByteInt;var generate4ByteBuffer = numbers.generate4ByteBuffer;var writeNumber = writeNumberCached;var toGenerate = true;function generate(packet, stream, opts) {if (stream.cork) {stream.cork();nextTick(uncork, stream);}if (toGenerate) {toGenerate = false;generateCache();}switch (packet.cmd) {case "connect":return connect(packet, stream, opts);case "connack":return connack(packet, stream, opts);case "publish":return publish(packet, stream, opts);case "puback":case "pubrec":case "pubrel":case "pubcomp":return confirmation(packet, stream, opts);case "subscribe":return subscribe(packet, stream, opts);case "suback":return suback(packet, stream, opts);case "unsubscribe":return unsubscribe(packet, stream, opts);case "unsuback":return unsuback(packet, stream, opts);case "pingreq":case "pingresp":return emptyPacket(packet, stream, opts);case "disconnect":return disconnect(packet, stream, opts);case "auth":return auth(packet, stream, opts);default:stream.emit("error", new Error("Unknown command"));return false;}}Object.defineProperty(generate, "cacheNumbers", { get: function get() {return writeNumber === writeNumberCached;}, set: function set(value) {if (value) {if (!numCache || Object.keys(numCache).length === 0) toGenerate = true;writeNumber = writeNumberCached;} else {toGenerate = false;writeNumber = writeNumberGenerated;}} });function uncork(stream) {stream.uncork();}function connect(packet, stream, opts) {var settings = packet || {};var protocolId = settings.protocolId || "MQTT";var protocolVersion = settings.protocolVersion || 4;var will = settings.will;var clean = settings.clean;var keepalive = settings.keepalive || 0;var clientId = settings.clientId || "";var username = settings.username;var password = settings.password;var properties = settings.properties;if (clean === undefined) clean = true;var length = 0;if (!protocolId || typeof protocolId !== "string" && !Buffer.isBuffer(protocolId)) {stream.emit("error", new Error("Invalid protocolId"));return false;} else length += protocolId.length + 2;if (protocolVersion !== 3 && protocolVersion !== 4 && protocolVersion !== 5) {stream.emit("error", new Error("Invalid protocol version"));return false;} else length += 1;if ((typeof clientId === "string" || Buffer.isBuffer(clientId)) && (clientId || protocolVersion === 4) && (clientId || clean)) {length += clientId.length + 2;} else {if (protocolVersion < 4) {stream.emit("error", new Error("clientId must be supplied before 3.1.1"));return false;}if (clean * 1 === 0) {stream.emit("error", new Error("clientId must be given if cleanSession set to 0"));return false;}}if (typeof keepalive !== "number" || keepalive < 0 || keepalive > 65535 || keepalive % 1 !== 0) {stream.emit("error", new Error("Invalid keepalive"));return false;} else length += 2;length += 1;if (protocolVersion === 5) {var propertiesData = getProperties(stream, properties);length += propertiesData.length;}if (will) {if (typeof will !== "object") {stream.emit("error", new Error("Invalid will"));return false;}if (!will.topic || typeof will.topic !== "string") {stream.emit("error", new Error("Invalid will topic"));return false;} else {length += Buffer.byteLength(will.topic) + 2;}if (will.payload) {if (will.payload.length >= 0) {if (typeof will.payload === "string") {length += Buffer.byteLength(will.payload) + 2;} else {length += will.payload.length + 2;}} else {stream.emit("error", new Error("Invalid will payload"));return false;}var willProperties = {};if (protocolVersion === 5) {willProperties = getProperties(stream, will.properties);length += willProperties.length;}}}var providedUsername = false;if (username != null) {if (isStringOrBuffer(username)) {providedUsername = true;length += Buffer.byteLength(username) + 2;} else {stream.emit("error", new Error("Invalid username"));return false;}}if (password != null) {if (!providedUsername) {stream.emit("error", new Error("Username is required to use password"));return false;}if (isStringOrBuffer(password)) {length += byteLength(password) + 2;} else {stream.emit("error", new Error("Invalid password"));return false;}}stream.write(protocol.CONNECT_HEADER);writeVarByteInt(stream, length);writeStringOrBuffer(stream, protocolId);stream.write(protocolVersion === 4 ? protocol.VERSION4 : protocolVersion === 5 ? protocol.VERSION5 : protocol.VERSION3);var flags = 0;flags |= username != null ? protocol.USERNAME_MASK : 0;flags |= password != null ? protocol.PASSWORD_MASK : 0;flags |= will && will.retain ? protocol.WILL_RETAIN_MASK : 0;flags |= will && will.qos ? will.qos << protocol.WILL_QOS_SHIFT : 0;flags |= will ? protocol.WILL_FLAG_MASK : 0;flags |= clean ? protocol.CLEAN_SESSION_MASK : 0;stream.write(Buffer.from([flags]));writeNumber(stream, keepalive);if (protocolVersion === 5) {propertiesData.write();}writeStringOrBuffer(stream, clientId);if (will) {if (protocolVersion === 5) {willProperties.write();}writeString(stream, will.topic);writeStringOrBuffer(stream, will.payload);}if (username != null) {writeStringOrBuffer(stream, username);}if (password != null) {writeStringOrBuffer(stream, password);}return true;}function connack(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var rc = version === 5 ? settings.reasonCode : settings.returnCode;var properties = settings.properties;var length = 2;if (typeof rc !== "number") {stream.emit("error", new Error("Invalid return code"));return false;}var propertiesData = null;if (version === 5) {propertiesData = getProperties(stream, properties);length += propertiesData.length;}stream.write(protocol.CONNACK_HEADER);writeVarByteInt(stream, length);stream.write(settings.sessionPresent ? protocol.SESSIONPRESENT_HEADER : zeroBuf);stream.write(Buffer.from([rc]));if (propertiesData != null) {propertiesData.write();}return true;}function publish(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var qos = settings.qos || 0;var retain = settings.retain ? protocol.RETAIN_MASK : 0;var topic = settings.topic;var payload = settings.payload || empty;var id = settings.messageId;var properties = settings.properties;var length = 0;if (typeof topic === "string") length += Buffer.byteLength(topic) + 2;else if (Buffer.isBuffer(topic)) length += topic.length + 2;else {stream.emit("error", new Error("Invalid topic"));return false;}if (!Buffer.isBuffer(payload)) length += Buffer.byteLength(payload);else length += payload.length;if (qos && typeof id !== "number") {stream.emit("error", new Error("Invalid messageId"));return false;} else if (qos) length += 2;var propertiesData = null;if (version === 5) {propertiesData = getProperties(stream, properties);length += propertiesData.length;}stream.write(protocol.PUBLISH_HEADER[qos][settings.dup ? 1 : 0][retain ? 1 : 0]);writeVarByteInt(stream, length);writeNumber(stream, byteLength(topic));stream.write(topic);if (qos > 0) writeNumber(stream, id);if (propertiesData != null) {propertiesData.write();}return stream.write(payload);}function confirmation(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var type = settings.cmd || "puback";var id = settings.messageId;var dup = settings.dup && type === "pubrel" ? protocol.DUP_MASK : 0;var qos = 0;var reasonCode = settings.reasonCode;var properties = settings.properties;var length = version === 5 ? 3 : 2;if (type === "pubrel") qos = 1;if (typeof id !== "number") {stream.emit("error", new Error("Invalid messageId"));return false;}var propertiesData = null;if (version === 5) {propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);if (!propertiesData) {return false;}length += propertiesData.length;}stream.write(protocol.ACKS[type][qos][dup][0]);writeVarByteInt(stream, length);writeNumber(stream, id);if (version === 5) {stream.write(Buffer.from([reasonCode]));}if (propertiesData !== null) {propertiesData.write();}return true;}function subscribe(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var dup = settings.dup ? protocol.DUP_MASK : 0;var id = settings.messageId;var subs = settings.subscriptions;var properties = settings.properties;var length = 0;if (typeof id !== "number") {stream.emit("error", new Error("Invalid messageId"));return false;} else length += 2;var propertiesData = null;if (version === 5) {propertiesData = getProperties(stream, properties);length += propertiesData.length;}if (typeof subs === "object" && subs.length) {for (var i = 0; i < subs.length; i += 1) {var itopic = subs[i].topic;var iqos = subs[i].qos;if (typeof itopic !== "string") {stream.emit("error", new Error("Invalid subscriptions - invalid topic"));return false;}if (typeof iqos !== "number") {stream.emit("error", new Error("Invalid subscriptions - invalid qos"));return false;}if (version === 5) {var nl = subs[i].nl || false;if (typeof nl !== "boolean") {stream.emit("error", new Error("Invalid subscriptions - invalid No Local"));return false;}var rap = subs[i].rap || false;if (typeof rap !== "boolean") {stream.emit("error", new Error("Invalid subscriptions - invalid Retain as Published"));return false;}var rh = subs[i].rh || 0;if (typeof rh !== "number" || rh > 2) {stream.emit("error", new Error("Invalid subscriptions - invalid Retain Handling"));return false;}}length += Buffer.byteLength(itopic) + 2 + 1;}} else {stream.emit("error", new Error("Invalid subscriptions"));return false;}stream.write(protocol.SUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);writeVarByteInt(stream, length);writeNumber(stream, id);if (propertiesData !== null) {propertiesData.write();}var result = true;for (var j = 0; j < subs.length; j++) {var sub = subs[j];var jtopic = sub.topic;var jqos = sub.qos;var jnl = +sub.nl;var jrap = +sub.rap;var jrh = sub.rh;var joptions;writeString(stream, jtopic);joptions = protocol.SUBSCRIBE_OPTIONS_QOS[jqos];if (version === 5) {joptions |= jnl ? protocol.SUBSCRIBE_OPTIONS_NL : 0;joptions |= jrap ? protocol.SUBSCRIBE_OPTIONS_RAP : 0;joptions |= jrh ? protocol.SUBSCRIBE_OPTIONS_RH[jrh] : 0;}result = stream.write(Buffer.from([joptions]));}return result;}function suback(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var id = settings.messageId;var granted = settings.granted;var properties = settings.properties;var length = 0;if (typeof id !== "number") {stream.emit("error", new Error("Invalid messageId"));return false;} else length += 2;if (typeof granted === "object" && granted.length) {for (var i = 0; i < granted.length; i += 1) {if (typeof granted[i] !== "number") {stream.emit("error", new Error("Invalid qos vector"));return false;}length += 1;}} else {stream.emit("error", new Error("Invalid qos vector"));return false;}var propertiesData = null;if (version === 5) {propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);if (!propertiesData) {return false;}length += propertiesData.length;}stream.write(protocol.SUBACK_HEADER);writeVarByteInt(stream, length);writeNumber(stream, id);if (propertiesData !== null) {propertiesData.write();}return stream.write(Buffer.from(granted));}function unsubscribe(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var id = settings.messageId;var dup = settings.dup ? protocol.DUP_MASK : 0;var unsubs = settings.unsubscriptions;var properties = settings.properties;var length = 0;if (typeof id !== "number") {stream.emit("error", new Error("Invalid messageId"));return false;} else {length += 2;}if (typeof unsubs === "object" && unsubs.length) {for (var i = 0; i < unsubs.length; i += 1) {if (typeof unsubs[i] !== "string") {stream.emit("error", new Error("Invalid unsubscriptions"));return false;}length += Buffer.byteLength(unsubs[i]) + 2;}} else {stream.emit("error", new Error("Invalid unsubscriptions"));return false;}var propertiesData = null;if (version === 5) {propertiesData = getProperties(stream, properties);length += propertiesData.length;}stream.write(protocol.UNSUBSCRIBE_HEADER[1][dup ? 1 : 0][0]);writeVarByteInt(stream, length);writeNumber(stream, id);if (propertiesData !== null) {propertiesData.write();}var result = true;for (var j = 0; j < unsubs.length; j++) {result = writeString(stream, unsubs[j]);}return result;}function unsuback(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var id = settings.messageId;var dup = settings.dup ? protocol.DUP_MASK : 0;var granted = settings.granted;var properties = settings.properties;var type = settings.cmd;var qos = 0;var length = 2;if (typeof id !== "number") {stream.emit("error", new Error("Invalid messageId"));return false;}if (version === 5) {if (typeof granted === "object" && granted.length) {for (var i = 0; i < granted.length; i += 1) {if (typeof granted[i] !== "number") {stream.emit("error", new Error("Invalid qos vector"));return false;}length += 1;}} else {stream.emit("error", new Error("Invalid qos vector"));return false;}}var propertiesData = null;if (version === 5) {propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);if (!propertiesData) {return false;}length += propertiesData.length;}stream.write(protocol.ACKS[type][qos][dup][0]);writeVarByteInt(stream, length);writeNumber(stream, id);if (propertiesData !== null) {propertiesData.write();}if (version === 5) {stream.write(Buffer.from(granted));}return true;}function emptyPacket(packet, stream, opts) {return stream.write(protocol.EMPTY[packet.cmd]);}function disconnect(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var reasonCode = settings.reasonCode;var properties = settings.properties;var length = version === 5 ? 1 : 0;var propertiesData = null;if (version === 5) {propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);if (!propertiesData) {return false;}length += propertiesData.length;}stream.write(Buffer.from([protocol.codes["disconnect"] << 4]));writeVarByteInt(stream, length);if (version === 5) {stream.write(Buffer.from([reasonCode]));}if (propertiesData !== null) {propertiesData.write();}return true;}function auth(packet, stream, opts) {var version = opts ? opts.protocolVersion : 4;var settings = packet || {};var reasonCode = settings.reasonCode;var properties = settings.properties;var length = version === 5 ? 1 : 0;if (version !== 5) stream.emit("error", new Error("Invalid mqtt version for auth packet"));var propertiesData = getPropertiesByMaximumPacketSize(stream, properties, opts, length);if (!propertiesData) {return false;}length += propertiesData.length;stream.write(Buffer.from([protocol.codes["auth"] << 4]));writeVarByteInt(stream, length);stream.write(Buffer.from([reasonCode]));if (propertiesData !== null) {propertiesData.write();}return true;}var varByteIntCache = {};function writeVarByteInt(stream, num) {var buffer = varByteIntCache[num];if (!buffer) {buffer = genBufVariableByteInt(num).data;if (num < 16384) varByteIntCache[num] = buffer;}stream.write(buffer);}function writeString(stream, string) {var strlen = Buffer.byteLength(string);writeNumber(stream, strlen);stream.write(string, "utf8");}function writeStringPair(stream, name, value) {writeString(stream, name);writeString(stream, value);}function writeNumberCached(stream, number) {return stream.write(numCache[number]);}function writeNumberGenerated(stream, number) {return stream.write(generateNumber(number));}function write4ByteNumber(stream, number) {return stream.write(generate4ByteBuffer(number));}function writeStringOrBuffer(stream, toWrite) {if (typeof toWrite === "string") {writeString(stream, toWrite);} else if (toWrite) {writeNumber(stream, toWrite.length);stream.write(toWrite);} else writeNumber(stream, 0);}function getProperties(stream, properties) {if (typeof properties !== "object" || properties.length != null) {return { length: 1, write: function write() {writeProperties(stream, {}, 0);} };}var propertiesLength = 0;function getLengthProperty(name) {var type = protocol.propertiesTypes[name];var value = properties[name];var length = 0;switch (type) {case "byte":{if (typeof value !== "boolean") {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + 1;break;}case "int8":{if (typeof value !== "number") {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + 1;break;}case "binary":{if (value && value === null) {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + Buffer.byteLength(value) + 2;break;}case "int16":{if (typeof value !== "number") {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + 2;break;}case "int32":{if (typeof value !== "number") {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + 4;break;}case "var":{if (typeof value !== "number") {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + genBufVariableByteInt(value).length;break;}case "string":{if (typeof value !== "string") {stream.emit("error", new Error("Invalid " + name));return false;}length += 1 + 2 + Buffer.byteLength(value.toString());break;}case "pair":{if (typeof value !== "object") {stream.emit("error", new Error("Invalid " + name));return false;}length += Object.getOwnPropertyNames(value).reduce(function (result, name) {result += 1 + 2 + Buffer.byteLength(name.toString()) + 2 + Buffer.byteLength(value[name].toString());return result;}, 0);break;}default:{stream.emit("error", new Error("Invalid property " + name));return false;}}return length;}if (properties) {for (var propName in properties) {var propLength = getLengthProperty(propName);if (!propLength) return false;propertiesLength += propLength;}}var propertiesLengthLength = genBufVariableByteInt(propertiesLength).length;return { length: propertiesLengthLength + propertiesLength, write: function write() {writeProperties(stream, properties, propertiesLength);} };}function getPropertiesByMaximumPacketSize(stream, properties, opts, length) {var mayEmptyProps = ["reasonString", "userProperties"];var maximumPacketSize = opts && opts.properties && opts.properties.maximumPacketSize ? opts.properties.maximumPacketSize : 0;var propertiesData = getProperties(stream, properties);if (maximumPacketSize) {while (length + propertiesData.length > maximumPacketSize) {var currentMayEmptyProp = mayEmptyProps.shift();if (currentMayEmptyProp && properties[currentMayEmptyProp]) {delete properties[currentMayEmptyProp];propertiesData = getProperties(stream, properties);} else {return false;}}}return propertiesData;}function writeProperties(stream, properties, propertiesLength) {writeVarByteInt(stream, propertiesLength);for (var propName in properties) {if (properties.hasOwnProperty(propName) && properties[propName] !== null) {var value = properties[propName];var type = protocol.propertiesTypes[propName];switch (type) {case "byte":{stream.write(Buffer.from([protocol.properties[propName]]));stream.write(Buffer.from([+value]));break;}case "int8":{stream.write(Buffer.from([protocol.properties[propName]]));stream.write(Buffer.from([value]));break;}case "binary":{stream.write(Buffer.from([protocol.properties[propName]]));writeStringOrBuffer(stream, value);break;}case "int16":{stream.write(Buffer.from([protocol.properties[propName]]));writeNumber(stream, value);break;}case "int32":{stream.write(Buffer.from([protocol.properties[propName]]));write4ByteNumber(stream, value);break;}case "var":{stream.write(Buffer.from([protocol.properties[propName]]));writeVarByteInt(stream, value);break;}case "string":{stream.write(Buffer.from([protocol.properties[propName]]));writeString(stream, value);break;}case "pair":{Object.getOwnPropertyNames(value).forEach(function (name) {stream.write(Buffer.from([protocol.properties[propName]]));writeStringPair(stream, name.toString(), value[name].toString());});break;}default:{stream.emit("error", new Error("Invalid property " + propName));return false;}}}}}function byteLength(bufOrString) {if (!bufOrString) return 0;else if (bufOrString instanceof Buffer) return bufOrString.length;else return Buffer.byteLength(bufOrString);}function isStringOrBuffer(field) {return typeof field === "string" || field instanceof Buffer;}module.exports = generate;}, { "./constants": 82, "./numbers": 86, "process-nextick-args": 91, "safe-buffer": 110 }], 90: [function (require, module, exports) {var wrappy = require("wrappy");module.exports = wrappy(once);module.exports.strict = wrappy(onceStrict);once.proto = once(function () {Object.defineProperty(Function.prototype, "once", { value: function value() {return once(this);}, configurable: true });Object.defineProperty(Function.prototype, "onceStrict", { value: function value() {return onceStrict(this);}, configurable: true });});function once(fn) {var f = function f() {if (f.called) return f.value;f.called = true;return f.value = fn.apply(this, arguments);};f.called = false;return f;}function onceStrict(fn) {var f = function f() {if (f.called) throw new Error(f.onceError);f.called = true;return f.value = fn.apply(this, arguments);};var name = fn.name || "Function wrapped with `once`";f.onceError = name + " shouldn't be called more than once";f.called = false;return f;}}, { wrappy: 120 }], 91: [function (require, module, exports) {(function (process) {"use strict";if (!process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {module.exports = { nextTick: nextTick };} else {module.exports = process;}function nextTick(fn, arg1, arg2, arg3) {if (typeof fn !== "function") {throw new TypeError('"callback" argument must be a function');}var len = arguments.length;var args, i;switch (len) {case 0:case 1:return process.nextTick(fn);case 2:return process.nextTick(function afterTickOne() {fn.call(null, arg1);});case 3:return process.nextTick(function afterTickTwo() {fn.call(null, arg1, arg2);});case 4:return process.nextTick(function afterTickThree() {fn.call(null, arg1, arg2, arg3);});default:args = new Array(len - 1);i = 0;while (i < args.length) {args[i++] = arguments[i];}return process.nextTick(function afterTick() {fn.apply(null, args);});}}}).call(this, require("_process"));}, { _process: 92 }], 92: [function (require, module, exports) {var process = module.exports = {};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout() {throw new Error("setTimeout has not been defined");}function defaultClearTimeout() {throw new Error("clearTimeout has not been defined");}(function () {try {if (typeof setTimeout === "function") {cachedSetTimeout = setTimeout;} else {cachedSetTimeout = defaultSetTimout;}} catch (e) {cachedSetTimeout = defaultSetTimout;}try {if (typeof clearTimeout === "function") {cachedClearTimeout = clearTimeout;} else {cachedClearTimeout = defaultClearTimeout;}} catch (e) {cachedClearTimeout = defaultClearTimeout;}})();function runTimeout(fun) {if (cachedSetTimeout === setTimeout) {return setTimeout(fun, 0);}if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {cachedSetTimeout = setTimeout;return setTimeout(fun, 0);}try {return cachedSetTimeout(fun, 0);} catch (e) {try {return cachedSetTimeout.call(null, fun, 0);} catch (e) {return cachedSetTimeout.call(this, fun, 0);}}}function runClearTimeout(marker) {if (cachedClearTimeout === clearTimeout) {return clearTimeout(marker);}if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {cachedClearTimeout = clearTimeout;return clearTimeout(marker);}try {return cachedClearTimeout(marker);} catch (e) {try {return cachedClearTimeout.call(null, marker);} catch (e) {return cachedClearTimeout.call(this, marker);}}}var queue = [];var draining = false;var currentQueue;var queueIndex = -1;function cleanUpNextTick() {if (!draining || !currentQueue) {return;}draining = false;if (currentQueue.length) {queue = currentQueue.concat(queue);} else {queueIndex = -1;}if (queue.length) {drainQueue();}}function drainQueue() {if (draining) {return;}var timeout = runTimeout(cleanUpNextTick);draining = true;var len = queue.length;while (len) {currentQueue = queue;queue = [];while (++queueIndex < len) {if (currentQueue) {currentQueue[queueIndex].run();}}queueIndex = -1;len = queue.length;}currentQueue = null;draining = false;runClearTimeout(timeout);}process.nextTick = function (fun) {var args = new Array(arguments.length - 1);if (arguments.length > 1) {for (var i = 1; i < arguments.length; i++) {args[i - 1] = arguments[i];}}queue.push(new Item(fun, args));if (queue.length === 1 && !draining) {runTimeout(drainQueue);}};function Item(fun, array) {this.fun = fun;this.array = array;}Item.prototype.run = function () {this.fun.apply(null, this.array);};process.title = "browser";process.browser = true;process.env = {};process.argv = [];process.version = "";process.versions = {};function noop() {}process.on = noop;process.addListener = noop;process.once = noop;process.off = noop;process.removeListener = noop;process.removeAllListeners = noop;process.emit = noop;process.prependListener = noop;process.prependOnceListener = noop;process.listeners = function (name) {return [];};process.binding = function (name) {throw new Error("process.binding is not supported");};process.cwd = function () {return "/";};process.chdir = function (dir) {throw new Error("process.chdir is not supported");};process.umask = function () {return 0;};}, {}], 93: [function (require, module, exports) {(function (global) {(function (root) {var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;var freeModule = typeof module == "object" && module && !module.nodeType && module;var freeGlobal = typeof global == "object" && global;if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {root = freeGlobal;}var punycode,maxInt = 2147483647,base = 36,tMin = 1,tMax = 26,skew = 38,damp = 700,initialBias = 72,initialN = 128,delimiter = "-",regexPunycode = /^xn--/,regexNonASCII = /[^\x20-\x7E]/,regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,errors = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },baseMinusTMin = base - tMin,floor = Math.floor,stringFromCharCode = String.fromCharCode,key;function error(type) {throw new RangeError(errors[type]);}function map(array, fn) {var length = array.length;var result = [];while (length--) {result[length] = fn(array[length]);}return result;}function mapDomain(string, fn) {var parts = string.split("@");var result = "";if (parts.length > 1) {result = parts[0] + "@";string = parts[1];}string = string.replace(regexSeparators, ".");var labels = string.split(".");var encoded = map(labels, fn).join(".");return result + encoded;}function ucs2decode(string) {var output = [],counter = 0,length = string.length,value,extra;while (counter < length) {value = string.charCodeAt(counter++);if (value >= 55296 && value <= 56319 && counter < length) {extra = string.charCodeAt(counter++);if ((extra & 64512) == 56320) {output.push(((value & 1023) << 10) + (extra & 1023) + 65536);} else {output.push(value);counter--;}} else {output.push(value);}}return output;}function ucs2encode(array) {return map(array, function (value) {var output = "";if (value > 65535) {value -= 65536;output += stringFromCharCode(value >>> 10 & 1023 | 55296);value = 56320 | value & 1023;}output += stringFromCharCode(value);return output;}).join("");}function basicToDigit(codePoint) {if (codePoint - 48 < 10) {return codePoint - 22;}if (codePoint - 65 < 26) {return codePoint - 65;}if (codePoint - 97 < 26) {return codePoint - 97;}return base;}function digitToBasic(digit, flag) {return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);}function adapt(delta, numPoints, firstTime) {var k = 0;delta = firstTime ? floor(delta / damp) : delta >> 1;delta += floor(delta / numPoints);for (; delta > baseMinusTMin * tMax >> 1; k += base) {delta = floor(delta / baseMinusTMin);}return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));}function decode(input) {var output = [],inputLength = input.length,out,i = 0,n = initialN,bias = initialBias,basic,j,index,oldi,w,k,digit,t,baseMinusT;basic = input.lastIndexOf(delimiter);if (basic < 0) {basic = 0;}for (j = 0; j < basic; ++j) {if (input.charCodeAt(j) >= 128) {error("not-basic");}output.push(input.charCodeAt(j));}for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) {for (oldi = i, w = 1, k = base;; k += base) {if (index >= inputLength) {error("invalid-input");}digit = basicToDigit(input.charCodeAt(index++));if (digit >= base || digit > floor((maxInt - i) / w)) {error("overflow");}i += digit * w;t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;if (digit < t) {break;}baseMinusT = base - t;if (w > floor(maxInt / baseMinusT)) {error("overflow");}w *= baseMinusT;}out = output.length + 1;bias = adapt(i - oldi, out, oldi == 0);if (floor(i / out) > maxInt - n) {error("overflow");}n += floor(i / out);i %= out;output.splice(i++, 0, n);}return ucs2encode(output);}function encode(input) {var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output = [],inputLength,handledCPCountPlusOne,baseMinusT,qMinusT;input = ucs2decode(input);inputLength = input.length;n = initialN;delta = 0;bias = initialBias;for (j = 0; j < inputLength; ++j) {currentValue = input[j];if (currentValue < 128) {output.push(stringFromCharCode(currentValue));}}handledCPCount = basicLength = output.length;if (basicLength) {output.push(delimiter);}while (handledCPCount < inputLength) {for (m = maxInt, j = 0; j < inputLength; ++j) {currentValue = input[j];if (currentValue >= n && currentValue < m) {m = currentValue;}}handledCPCountPlusOne = handledCPCount + 1;if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {error("overflow");}delta += (m - n) * handledCPCountPlusOne;n = m;for (j = 0; j < inputLength; ++j) {currentValue = input[j];if (currentValue < n && ++delta > maxInt) {error("overflow");}if (currentValue == n) {for (q = delta, k = base;; k += base) {t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;if (q < t) {break;}qMinusT = q - t;baseMinusT = base - t;output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));q = floor(qMinusT / baseMinusT);}output.push(stringFromCharCode(digitToBasic(q, 0)));bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);delta = 0;++handledCPCount;}}++delta;++n;}return output.join("");}function toUnicode(input) {return mapDomain(input, function (string) {return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;});}function toASCII(input) {return mapDomain(input, function (string) {return regexNonASCII.test(string) ? "xn--" + encode(string) : string;});}punycode = { version: "1.4.1", ucs2: { decode: ucs2decode, encode: ucs2encode }, decode: decode, encode: encode, toASCII: toASCII, toUnicode: toUnicode };if (typeof define == "function" && typeof define.amd == "object" && define.amd) {define("punycode", function () {return punycode;});} else if (freeExports && freeModule) {if (module.exports == freeExports) {freeModule.exports = punycode;} else {for (key in punycode) {punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);}}} else {root.punycode = punycode;}})(this);}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});}, {}], 94: [function (require, module, exports) {"use strict";function hasOwnProperty(obj, prop) {return Object.prototype.hasOwnProperty.call(obj, prop);}module.exports = function (qs, sep, eq, options) {sep = sep || "&";eq = eq || "=";var obj = {};if (typeof qs !== "string" || qs.length === 0) {return obj;}var regexp = /\+/g;qs = qs.split(sep);var maxKeys = 1e3;if (options && typeof options.maxKeys === "number") {maxKeys = options.maxKeys;}var len = qs.length;if (maxKeys > 0 && len > maxKeys) {len = maxKeys;}for (var i = 0; i < len; ++i) {var x = qs[i].replace(regexp, "%20"),idx = x.indexOf(eq),kstr,vstr,k,v;if (idx >= 0) {kstr = x.substr(0, idx);vstr = x.substr(idx + 1);} else {kstr = x;vstr = "";}k = decodeURIComponent(kstr);v = decodeURIComponent(vstr);if (!hasOwnProperty(obj, k)) {obj[k] = v;} else if (isArray(obj[k])) {obj[k].push(v);} else {obj[k] = [obj[k], v];}}return obj;};var isArray = Array.isArray || function (xs) {return Object.prototype.toString.call(xs) === "[object Array]";};}, {}], 95: [function (require, module, exports) {"use strict";var stringifyPrimitive = function stringifyPrimitive(v) {switch (typeof v) {case "string":return v;case "boolean":return v ? "true" : "false";case "number":return isFinite(v) ? v : "";default:return "";}};module.exports = function (obj, sep, eq, name) {sep = sep || "&";eq = eq || "=";if (obj === null) {obj = undefined;}if (typeof obj === "object") {return map(objectKeys(obj), function (k) {var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;if (isArray(obj[k])) {return map(obj[k], function (v) {return ks + encodeURIComponent(stringifyPrimitive(v));}).join(sep);} else {return ks + encodeURIComponent(stringifyPrimitive(obj[k]));}}).join(sep);}if (!name) return "";return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));};var isArray = Array.isArray || function (xs) {return Object.prototype.toString.call(xs) === "[object Array]";};function map(xs, f) {if (xs.map) return xs.map(f);var res = [];for (var i = 0; i < xs.length; i++) {res.push(f(xs[i], i));}return res;}var objectKeys = Object.keys || function (obj) {var res = [];for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);}return res;};}, {}], 96: [function (require, module, exports) {"use strict";exports.decode = exports.parse = require("./decode");exports.encode = exports.stringify = require("./encode");}, { "./decode": 94, "./encode": 95 }], 97: [function (require, module, exports) {module.exports = require("./lib/_stream_duplex.js");}, { "./lib/_stream_duplex.js": 98 }], 98: [function (require, module, exports) {"use strict";var pna = require("process-nextick-args");var objectKeys = Object.keys || function (obj) {var keys = [];for (var key in obj) {keys.push(key);}return keys;};module.exports = Duplex;var util = require("core-util-is");util.inherits = require("inherits");var Readable = require("./_stream_readable");var Writable = require("./_stream_writable");util.inherits(Duplex, Readable);{var keys = objectKeys(Writable.prototype);for (var v = 0; v < keys.length; v++) {var method = keys[v];if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];}}function Duplex(options) {if (!(this instanceof Duplex)) return new Duplex(options);Readable.call(this, options);Writable.call(this, options);if (options && options.readable === false) this.readable = false;if (options && options.writable === false) this.writable = false;this.allowHalfOpen = true;if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;this.once("end", onend);}Object.defineProperty(Duplex.prototype, "writableHighWaterMark", { enumerable: false, get: function get() {return this._writableState.highWaterMark;} });function onend() {if (this.allowHalfOpen || this._writableState.ended) return;pna.nextTick(onEndNT, this);}function onEndNT(self) {self.end();}Object.defineProperty(Duplex.prototype, "destroyed", { get: function get() {if (this._readableState === undefined || this._writableState === undefined) {return false;}return this._readableState.destroyed && this._writableState.destroyed;}, set: function set(value) {if (this._readableState === undefined || this._writableState === undefined) {return;}this._readableState.destroyed = value;this._writableState.destroyed = value;} });Duplex.prototype._destroy = function (err, cb) {this.push(null);this.end();pna.nextTick(cb, err);};}, { "./_stream_readable": 100, "./_stream_writable": 102, "core-util-is": 14, inherits: 80, "process-nextick-args": 91 }], 99: [function (require, module, exports) {"use strict";module.exports = PassThrough;var Transform = require("./_stream_transform");var util = require("core-util-is");util.inherits = require("inherits");util.inherits(PassThrough, Transform);function PassThrough(options) {if (!(this instanceof PassThrough)) return new PassThrough(options);Transform.call(this, options);}PassThrough.prototype._transform = function (chunk, encoding, cb) {cb(null, chunk);};}, { "./_stream_transform": 101, "core-util-is": 14, inherits: 80 }], 100: [function (require, module, exports) {(function (process, global) {"use strict";var pna = require("process-nextick-args");module.exports = Readable;var isArray = require("isarray");var Duplex;Readable.ReadableState = ReadableState;var EE = require("events").EventEmitter;var EElistenerCount = function EElistenerCount(emitter, type) {return emitter.listeners(type).length;};var Stream = require("./internal/streams/stream");var Buffer = require("safe-buffer").Buffer;var OurUint8Array = global.Uint8Array || function () {};function _uint8ArrayToBuffer(chunk) {return Buffer.from(chunk);}function _isUint8Array(obj) {return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;}var util = require("core-util-is");util.inherits = require("inherits");var debugUtil = require("util");var debug = void 0;if (debugUtil && debugUtil.debuglog) {debug = debugUtil.debuglog("stream");} else {debug = function debug() {};}var BufferList = require("./internal/streams/BufferList");var destroyImpl = require("./internal/streams/destroy");var StringDecoder;util.inherits(Readable, Stream);var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];function prependListener(emitter, event, fn) {if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];}function ReadableState(options, stream) {Duplex = Duplex || require("./_stream_duplex");options = options || {};var isDuplex = stream instanceof Duplex;this.objectMode = !!options.objectMode;if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;var hwm = options.highWaterMark;var readableHwm = options.readableHighWaterMark;var defaultHwm = this.objectMode ? 16 : 16 * 1024;if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;this.highWaterMark = Math.floor(this.highWaterMark);this.buffer = new BufferList();this.length = 0;this.pipes = null;this.pipesCount = 0;this.flowing = null;this.ended = false;this.endEmitted = false;this.reading = false;this.sync = true;this.needReadable = false;this.emittedReadable = false;this.readableListening = false;this.resumeScheduled = false;this.destroyed = false;this.defaultEncoding = options.defaultEncoding || "utf8";this.awaitDrain = 0;this.readingMore = false;this.decoder = null;this.encoding = null;if (options.encoding) {if (!StringDecoder) StringDecoder = require("string_decoder/").StringDecoder;this.decoder = new StringDecoder(options.encoding);this.encoding = options.encoding;}}function Readable(options) {Duplex = Duplex || require("./_stream_duplex");if (!(this instanceof Readable)) return new Readable(options);this._readableState = new ReadableState(options, this);this.readable = true;if (options) {if (typeof options.read === "function") this._read = options.read;if (typeof options.destroy === "function") this._destroy = options.destroy;}Stream.call(this);}Object.defineProperty(Readable.prototype, "destroyed", { get: function get() {if (this._readableState === undefined) {return false;}return this._readableState.destroyed;}, set: function set(value) {if (!this._readableState) {return;}this._readableState.destroyed = value;} });Readable.prototype.destroy = destroyImpl.destroy;Readable.prototype._undestroy = destroyImpl.undestroy;Readable.prototype._destroy = function (err, cb) {this.push(null);cb(err);};Readable.prototype.push = function (chunk, encoding) {var state = this._readableState;var skipChunkCheck;if (!state.objectMode) {if (typeof chunk === "string") {encoding = encoding || state.defaultEncoding;if (encoding !== state.encoding) {chunk = Buffer.from(chunk, encoding);encoding = "";}skipChunkCheck = true;}} else {skipChunkCheck = true;}return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);};Readable.prototype.unshift = function (chunk) {return readableAddChunk(this, chunk, null, true, false);};function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {var state = stream._readableState;if (chunk === null) {state.reading = false;onEofChunk(stream, state);} else {var er;if (!skipChunkCheck) er = chunkInvalid(state, chunk);if (er) {stream.emit("error", er);} else if (state.objectMode || chunk && chunk.length > 0) {if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {chunk = _uint8ArrayToBuffer(chunk);}if (addToFront) {if (state.endEmitted) stream.emit("error", new Error("stream.unshift() after end event"));else addChunk(stream, state, chunk, true);} else if (state.ended) {stream.emit("error", new Error("stream.push() after EOF"));} else {state.reading = false;if (state.decoder && !encoding) {chunk = state.decoder.write(chunk);if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);} else {addChunk(stream, state, chunk, false);}}} else if (!addToFront) {state.reading = false;}}return needMoreData(state);}function addChunk(stream, state, chunk, addToFront) {if (state.flowing && state.length === 0 && !state.sync) {stream.emit("data", chunk);stream.read(0);} else {state.length += state.objectMode ? 1 : chunk.length;if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);if (state.needReadable) emitReadable(stream);}maybeReadMore(stream, state);}function chunkInvalid(state, chunk) {var er;if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {er = new TypeError("Invalid non-string/buffer chunk");}return er;}function needMoreData(state) {return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);}Readable.prototype.isPaused = function () {return this._readableState.flowing === false;};Readable.prototype.setEncoding = function (enc) {if (!StringDecoder) StringDecoder = require("string_decoder/").StringDecoder;this._readableState.decoder = new StringDecoder(enc);this._readableState.encoding = enc;return this;};var MAX_HWM = 8388608;function computeNewHighWaterMark(n) {if (n >= MAX_HWM) {n = MAX_HWM;} else {n--;n |= n >>> 1;n |= n >>> 2;n |= n >>> 4;n |= n >>> 8;n |= n >>> 16;n++;}return n;}function howMuchToRead(n, state) {if (n <= 0 || state.length === 0 && state.ended) return 0;if (state.objectMode) return 1;if (n !== n) {if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;}if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);if (n <= state.length) return n;if (!state.ended) {state.needReadable = true;return 0;}return state.length;}Readable.prototype.read = function (n) {debug("read", n);n = parseInt(n, 10);var state = this._readableState;var nOrig = n;if (n !== 0) state.emittedReadable = false;if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {debug("read: emitReadable", state.length, state.ended);if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);return null;}n = howMuchToRead(n, state);if (n === 0 && state.ended) {if (state.length === 0) endReadable(this);return null;}var doRead = state.needReadable;debug("need readable", doRead);if (state.length === 0 || state.length - n < state.highWaterMark) {doRead = true;debug("length less than watermark", doRead);}if (state.ended || state.reading) {doRead = false;debug("reading or ended", doRead);} else if (doRead) {debug("do read");state.reading = true;state.sync = true;if (state.length === 0) state.needReadable = true;this._read(state.highWaterMark);state.sync = false;if (!state.reading) n = howMuchToRead(nOrig, state);}var ret;if (n > 0) ret = fromList(n, state);else ret = null;if (ret === null) {state.needReadable = true;n = 0;} else {state.length -= n;}if (state.length === 0) {if (!state.ended) state.needReadable = true;if (nOrig !== n && state.ended) endReadable(this);}if (ret !== null) this.emit("data", ret);return ret;};function onEofChunk(stream, state) {if (state.ended) return;if (state.decoder) {var chunk = state.decoder.end();if (chunk && chunk.length) {state.buffer.push(chunk);state.length += state.objectMode ? 1 : chunk.length;}}state.ended = true;emitReadable(stream);}function emitReadable(stream) {var state = stream._readableState;state.needReadable = false;if (!state.emittedReadable) {debug("emitReadable", state.flowing);state.emittedReadable = true;if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);}}function emitReadable_(stream) {debug("emit readable");stream.emit("readable");flow(stream);}function maybeReadMore(stream, state) {if (!state.readingMore) {state.readingMore = true;pna.nextTick(maybeReadMore_, stream, state);}}function maybeReadMore_(stream, state) {var len = state.length;while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {debug("maybeReadMore read 0");stream.read(0);if (len === state.length) break;else len = state.length;}state.readingMore = false;}Readable.prototype._read = function (n) {this.emit("error", new Error("_read() is not implemented"));};Readable.prototype.pipe = function (dest, pipeOpts) {var src = this;var state = this._readableState;switch (state.pipesCount) {case 0:state.pipes = dest;break;case 1:state.pipes = [state.pipes, dest];break;default:state.pipes.push(dest);break;}state.pipesCount += 1;debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;var endFn = doEnd ? onend : unpipe;if (state.endEmitted) pna.nextTick(endFn);else src.once("end", endFn);dest.on("unpipe", onunpipe);function onunpipe(readable, unpipeInfo) {debug("onunpipe");if (readable === src) {if (unpipeInfo && unpipeInfo.hasUnpiped === false) {unpipeInfo.hasUnpiped = true;cleanup();}}}function onend() {debug("onend");dest.end();}var ondrain = pipeOnDrain(src);dest.on("drain", ondrain);var cleanedUp = false;function cleanup() {debug("cleanup");dest.removeListener("close", onclose);dest.removeListener("finish", onfinish);dest.removeListener("drain", ondrain);dest.removeListener("error", onerror);dest.removeListener("unpipe", onunpipe);src.removeListener("end", onend);src.removeListener("end", unpipe);src.removeListener("data", ondata);cleanedUp = true;if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();}var increasedAwaitDrain = false;src.on("data", ondata);function ondata(chunk) {debug("ondata");increasedAwaitDrain = false;var ret = dest.write(chunk);if (false === ret && !increasedAwaitDrain) {if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {debug("false write response, pause", src._readableState.awaitDrain);src._readableState.awaitDrain++;increasedAwaitDrain = true;}src.pause();}}function onerror(er) {debug("onerror", er);unpipe();dest.removeListener("error", onerror);if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);}prependListener(dest, "error", onerror);function onclose() {dest.removeListener("finish", onfinish);unpipe();}dest.once("close", onclose);function onfinish() {debug("onfinish");dest.removeListener("close", onclose);unpipe();}dest.once("finish", onfinish);function unpipe() {debug("unpipe");src.unpipe(dest);}dest.emit("pipe", src);if (!state.flowing) {debug("pipe resume");src.resume();}return dest;};function pipeOnDrain(src) {return function () {var state = src._readableState;debug("pipeOnDrain", state.awaitDrain);if (state.awaitDrain) state.awaitDrain--;if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {state.flowing = true;flow(src);}};}Readable.prototype.unpipe = function (dest) {var state = this._readableState;var unpipeInfo = { hasUnpiped: false };if (state.pipesCount === 0) return this;if (state.pipesCount === 1) {if (dest && dest !== state.pipes) return this;if (!dest) dest = state.pipes;state.pipes = null;state.pipesCount = 0;state.flowing = false;if (dest) dest.emit("unpipe", this, unpipeInfo);return this;}if (!dest) {var dests = state.pipes;var len = state.pipesCount;state.pipes = null;state.pipesCount = 0;state.flowing = false;for (var i = 0; i < len; i++) {dests[i].emit("unpipe", this, unpipeInfo);}return this;}var index = indexOf(state.pipes, dest);if (index === -1) return this;state.pipes.splice(index, 1);state.pipesCount -= 1;if (state.pipesCount === 1) state.pipes = state.pipes[0];dest.emit("unpipe", this, unpipeInfo);return this;};Readable.prototype.on = function (ev, fn) {var res = Stream.prototype.on.call(this, ev, fn);if (ev === "data") {if (this._readableState.flowing !== false) this.resume();} else if (ev === "readable") {var state = this._readableState;if (!state.endEmitted && !state.readableListening) {state.readableListening = state.needReadable = true;state.emittedReadable = false;if (!state.reading) {pna.nextTick(nReadingNextTick, this);} else if (state.length) {emitReadable(this);}}}return res;};Readable.prototype.addListener = Readable.prototype.on;function nReadingNextTick(self) {debug("readable nexttick read 0");self.read(0);}Readable.prototype.resume = function () {var state = this._readableState;if (!state.flowing) {debug("resume");state.flowing = true;resume(this, state);}return this;};function resume(stream, state) {if (!state.resumeScheduled) {state.resumeScheduled = true;pna.nextTick(resume_, stream, state);}}function resume_(stream, state) {if (!state.reading) {debug("resume read 0");stream.read(0);}state.resumeScheduled = false;state.awaitDrain = 0;stream.emit("resume");flow(stream);if (state.flowing && !state.reading) stream.read(0);}Readable.prototype.pause = function () {debug("call pause flowing=%j", this._readableState.flowing);if (false !== this._readableState.flowing) {debug("pause");this._readableState.flowing = false;this.emit("pause");}return this;};function flow(stream) {var state = stream._readableState;debug("flow", state.flowing);while (state.flowing && stream.read() !== null) {}}Readable.prototype.wrap = function (stream) {var _this = this;var state = this._readableState;var paused = false;stream.on("end", function () {debug("wrapped end");if (state.decoder && !state.ended) {var chunk = state.decoder.end();if (chunk && chunk.length) _this.push(chunk);}_this.push(null);});stream.on("data", function (chunk) {debug("wrapped data");if (state.decoder) chunk = state.decoder.write(chunk);if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;var ret = _this.push(chunk);if (!ret) {paused = true;stream.pause();}});for (var i in stream) {if (this[i] === undefined && typeof stream[i] === "function") {this[i] = function (method) {return function () {return stream[method].apply(stream, arguments);};}(i);}}for (var n = 0; n < kProxyEvents.length; n++) {stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));}this._read = function (n) {debug("wrapped _read", n);if (paused) {paused = false;stream.resume();}};return this;};Object.defineProperty(Readable.prototype, "readableHighWaterMark", { enumerable: false, get: function get() {return this._readableState.highWaterMark;} });Readable._fromList = fromList;function fromList(n, state) {if (state.length === 0) return null;var ret;if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {if (state.decoder) ret = state.buffer.join("");else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);state.buffer.clear();} else {ret = fromListPartial(n, state.buffer, state.decoder);}return ret;}function fromListPartial(n, list, hasStrings) {var ret;if (n < list.head.data.length) {ret = list.head.data.slice(0, n);list.head.data = list.head.data.slice(n);} else if (n === list.head.data.length) {ret = list.shift();} else {ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);}return ret;}function copyFromBufferString(n, list) {var p = list.head;var c = 1;var ret = p.data;n -= ret.length;while (p = p.next) {var str = p.data;var nb = n > str.length ? str.length : n;if (nb === str.length) ret += str;else ret += str.slice(0, n);n -= nb;if (n === 0) {if (nb === str.length) {++c;if (p.next) list.head = p.next;else list.head = list.tail = null;} else {list.head = p;p.data = str.slice(nb);}break;}++c;}list.length -= c;return ret;}function copyFromBuffer(n, list) {var ret = Buffer.allocUnsafe(n);var p = list.head;var c = 1;p.data.copy(ret);n -= p.data.length;while (p = p.next) {var buf = p.data;var nb = n > buf.length ? buf.length : n;buf.copy(ret, ret.length - n, 0, nb);n -= nb;if (n === 0) {if (nb === buf.length) {++c;if (p.next) list.head = p.next;else list.head = list.tail = null;} else {list.head = p;p.data = buf.slice(nb);}break;}++c;}list.length -= c;return ret;}function endReadable(stream) {var state = stream._readableState;if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');if (!state.endEmitted) {state.ended = true;pna.nextTick(endReadableNT, state, stream);}}function endReadableNT(state, stream) {if (!state.endEmitted && state.length === 0) {state.endEmitted = true;stream.readable = false;stream.emit("end");}}function indexOf(xs, x) {for (var i = 0, l = xs.length; i < l; i++) {if (xs[i] === x) return i;}return -1;}}).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});}, { "./_stream_duplex": 98, "./internal/streams/BufferList": 103, "./internal/streams/destroy": 104, "./internal/streams/stream": 105, _process: 92, "core-util-is": 14, events: 13, inherits: 80, isarray: 106, "process-nextick-args": 91, "safe-buffer": 110, "string_decoder/": 107, util: 11 }], 101: [function (require, module, exports) {"use strict";module.exports = Transform;var Duplex = require("./_stream_duplex");var util = require("core-util-is");util.inherits = require("inherits");util.inherits(Transform, Duplex);function afterTransform(er, data) {var ts = this._transformState;ts.transforming = false;var cb = ts.writecb;if (!cb) {return this.emit("error", new Error("write callback called multiple times"));}ts.writechunk = null;ts.writecb = null;if (data != null) this.push(data);cb(er);var rs = this._readableState;rs.reading = false;if (rs.needReadable || rs.length < rs.highWaterMark) {this._read(rs.highWaterMark);}}function Transform(options) {if (!(this instanceof Transform)) return new Transform(options);Duplex.call(this, options);this._transformState = { afterTransform: afterTransform.bind(this), needTransform: false, transforming: false, writecb: null, writechunk: null, writeencoding: null };this._readableState.needReadable = true;this._readableState.sync = false;if (options) {if (typeof options.transform === "function") this._transform = options.transform;if (typeof options.flush === "function") this._flush = options.flush;}this.on("prefinish", prefinish);}function prefinish() {var _this = this;if (typeof this._flush === "function") {this._flush(function (er, data) {done(_this, er, data);});} else {done(this, null, null);}}Transform.prototype.push = function (chunk, encoding) {this._transformState.needTransform = false;return Duplex.prototype.push.call(this, chunk, encoding);};Transform.prototype._transform = function (chunk, encoding, cb) {throw new Error("_transform() is not implemented");};Transform.prototype._write = function (chunk, encoding, cb) {var ts = this._transformState;ts.writecb = cb;ts.writechunk = chunk;ts.writeencoding = encoding;if (!ts.transforming) {var rs = this._readableState;if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);}};Transform.prototype._read = function (n) {var ts = this._transformState;if (ts.writechunk !== null && ts.writecb && !ts.transforming) {ts.transforming = true;this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);} else {ts.needTransform = true;}};Transform.prototype._destroy = function (err, cb) {var _this2 = this;Duplex.prototype._destroy.call(this, err, function (err2) {cb(err2);_this2.emit("close");});};function done(stream, er, data) {if (er) return stream.emit("error", er);if (data != null) stream.push(data);if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");return stream.push(null);}}, { "./_stream_duplex": 98, "core-util-is": 14, inherits: 80 }], 102: [function (require, module, exports) {(function (process, global, setImmediate) {"use strict";var pna = require("process-nextick-args");module.exports = Writable;function WriteReq(chunk, encoding, cb) {this.chunk = chunk;this.encoding = encoding;this.callback = cb;this.next = null;}function CorkedRequest(state) {var _this = this;this.next = null;this.entry = null;this.finish = function () {onCorkedFinish(_this, state);};}var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;var Duplex;Writable.WritableState = WritableState;var util = require("core-util-is");util.inherits = require("inherits");var internalUtil = { deprecate: require("util-deprecate") };var Stream = require("./internal/streams/stream");var Buffer = require("safe-buffer").Buffer;var OurUint8Array = global.Uint8Array || function () {};function _uint8ArrayToBuffer(chunk) {return Buffer.from(chunk);}function _isUint8Array(obj) {return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;}var destroyImpl = require("./internal/streams/destroy");util.inherits(Writable, Stream);function nop() {}function WritableState(options, stream) {Duplex = Duplex || require("./_stream_duplex");options = options || {};var isDuplex = stream instanceof Duplex;this.objectMode = !!options.objectMode;if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;var hwm = options.highWaterMark;var writableHwm = options.writableHighWaterMark;var defaultHwm = this.objectMode ? 16 : 16 * 1024;if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;this.highWaterMark = Math.floor(this.highWaterMark);this.finalCalled = false;this.needDrain = false;this.ending = false;this.ended = false;this.finished = false;this.destroyed = false;var noDecode = options.decodeStrings === false;this.decodeStrings = !noDecode;this.defaultEncoding = options.defaultEncoding || "utf8";this.length = 0;this.writing = false;this.corked = 0;this.sync = true;this.bufferProcessing = false;this.onwrite = function (er) {onwrite(stream, er);};this.writecb = null;this.writelen = 0;this.bufferedRequest = null;this.lastBufferedRequest = null;this.pendingcb = 0;this.prefinished = false;this.errorEmitted = false;this.bufferedRequestCount = 0;this.corkedRequestsFree = new CorkedRequest(this);}WritableState.prototype.getBuffer = function getBuffer() {var current = this.bufferedRequest;var out = [];while (current) {out.push(current);current = current.next;}return out;};(function () {try {Object.defineProperty(WritableState.prototype, "buffer", { get: internalUtil.deprecate(function () {return this.getBuffer();}, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.", "DEP0003") });} catch (_) {}})();var realHasInstance;if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {realHasInstance = Function.prototype[Symbol.hasInstance];Object.defineProperty(Writable, Symbol.hasInstance, { value: function value(object) {if (realHasInstance.call(this, object)) return true;if (this !== Writable) return false;return object && object._writableState instanceof WritableState;} });} else {realHasInstance = function realHasInstance(object) {return object instanceof this;};}function Writable(options) {Duplex = Duplex || require("./_stream_duplex");if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {return new Writable(options);}this._writableState = new WritableState(options, this);this.writable = true;if (options) {if (typeof options.write === "function") this._write = options.write;if (typeof options.writev === "function") this._writev = options.writev;if (typeof options.destroy === "function") this._destroy = options.destroy;if (typeof options.final === "function") this._final = options.final;}Stream.call(this);}Writable.prototype.pipe = function () {this.emit("error", new Error("Cannot pipe, not readable"));};function writeAfterEnd(stream, cb) {var er = new Error("write after end");stream.emit("error", er);pna.nextTick(cb, er);}function validChunk(stream, state, chunk, cb) {var valid = true;var er = false;if (chunk === null) {er = new TypeError("May not write null values to stream");} else if (typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {er = new TypeError("Invalid non-string/buffer chunk");}if (er) {stream.emit("error", er);pna.nextTick(cb, er);valid = false;}return valid;}Writable.prototype.write = function (chunk, encoding, cb) {var state = this._writableState;var ret = false;var isBuf = !state.objectMode && _isUint8Array(chunk);if (isBuf && !Buffer.isBuffer(chunk)) {chunk = _uint8ArrayToBuffer(chunk);}if (typeof encoding === "function") {cb = encoding;encoding = null;}if (isBuf) encoding = "buffer";else if (!encoding) encoding = state.defaultEncoding;if (typeof cb !== "function") cb = nop;if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {state.pendingcb++;ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);}return ret;};Writable.prototype.cork = function () {var state = this._writableState;state.corked++;};Writable.prototype.uncork = function () {var state = this._writableState;if (state.corked) {state.corked--;if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);}};Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {if (typeof encoding === "string") encoding = encoding.toLowerCase();if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);this._writableState.defaultEncoding = encoding;return this;};function decodeChunk(state, chunk, encoding) {if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {chunk = Buffer.from(chunk, encoding);}return chunk;}Object.defineProperty(Writable.prototype, "writableHighWaterMark", { enumerable: false, get: function get() {return this._writableState.highWaterMark;} });function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {if (!isBuf) {var newChunk = decodeChunk(state, chunk, encoding);if (chunk !== newChunk) {isBuf = true;encoding = "buffer";chunk = newChunk;}}var len = state.objectMode ? 1 : chunk.length;state.length += len;var ret = state.length < state.highWaterMark;if (!ret) state.needDrain = true;if (state.writing || state.corked) {var last = state.lastBufferedRequest;state.lastBufferedRequest = { chunk: chunk, encoding: encoding, isBuf: isBuf, callback: cb, next: null };if (last) {last.next = state.lastBufferedRequest;} else {state.bufferedRequest = state.lastBufferedRequest;}state.bufferedRequestCount += 1;} else {doWrite(stream, state, false, len, chunk, encoding, cb);}return ret;}function doWrite(stream, state, writev, len, chunk, encoding, cb) {state.writelen = len;state.writecb = cb;state.writing = true;state.sync = true;if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);state.sync = false;}function onwriteError(stream, state, sync, er, cb) {--state.pendingcb;if (sync) {pna.nextTick(cb, er);pna.nextTick(finishMaybe, stream, state);stream._writableState.errorEmitted = true;stream.emit("error", er);} else {cb(er);stream._writableState.errorEmitted = true;stream.emit("error", er);finishMaybe(stream, state);}}function onwriteStateUpdate(state) {state.writing = false;state.writecb = null;state.length -= state.writelen;state.writelen = 0;}function onwrite(stream, er) {var state = stream._writableState;var sync = state.sync;var cb = state.writecb;onwriteStateUpdate(state);if (er) onwriteError(stream, state, sync, er, cb);else {var finished = needFinish(state);if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {clearBuffer(stream, state);}if (sync) {asyncWrite(afterWrite, stream, state, finished, cb);} else {afterWrite(stream, state, finished, cb);}}}function afterWrite(stream, state, finished, cb) {if (!finished) onwriteDrain(stream, state);state.pendingcb--;cb();finishMaybe(stream, state);}function onwriteDrain(stream, state) {if (state.length === 0 && state.needDrain) {state.needDrain = false;stream.emit("drain");}}function clearBuffer(stream, state) {state.bufferProcessing = true;var entry = state.bufferedRequest;if (stream._writev && entry && entry.next) {var l = state.bufferedRequestCount;var buffer = new Array(l);var holder = state.corkedRequestsFree;holder.entry = entry;var count = 0;var allBuffers = true;while (entry) {buffer[count] = entry;if (!entry.isBuf) allBuffers = false;entry = entry.next;count += 1;}buffer.allBuffers = allBuffers;doWrite(stream, state, true, state.length, buffer, "", holder.finish);state.pendingcb++;state.lastBufferedRequest = null;if (holder.next) {state.corkedRequestsFree = holder.next;holder.next = null;} else {state.corkedRequestsFree = new CorkedRequest(state);}state.bufferedRequestCount = 0;} else {while (entry) {var chunk = entry.chunk;var encoding = entry.encoding;var cb = entry.callback;var len = state.objectMode ? 1 : chunk.length;doWrite(stream, state, false, len, chunk, encoding, cb);entry = entry.next;state.bufferedRequestCount--;if (state.writing) {break;}}if (entry === null) state.lastBufferedRequest = null;}state.bufferedRequest = entry;state.bufferProcessing = false;}Writable.prototype._write = function (chunk, encoding, cb) {cb(new Error("_write() is not implemented"));};Writable.prototype._writev = null;Writable.prototype.end = function (chunk, encoding, cb) {var state = this._writableState;if (typeof chunk === "function") {cb = chunk;chunk = null;encoding = null;} else if (typeof encoding === "function") {cb = encoding;encoding = null;}if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);if (state.corked) {state.corked = 1;this.uncork();}if (!state.ending && !state.finished) endWritable(this, state, cb);};function needFinish(state) {return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;}function callFinal(stream, state) {stream._final(function (err) {state.pendingcb--;if (err) {stream.emit("error", err);}state.prefinished = true;stream.emit("prefinish");finishMaybe(stream, state);});}function prefinish(stream, state) {if (!state.prefinished && !state.finalCalled) {if (typeof stream._final === "function") {state.pendingcb++;state.finalCalled = true;pna.nextTick(callFinal, stream, state);} else {state.prefinished = true;stream.emit("prefinish");}}}function finishMaybe(stream, state) {var need = needFinish(state);if (need) {prefinish(stream, state);if (state.pendingcb === 0) {state.finished = true;stream.emit("finish");}}return need;}function endWritable(stream, state, cb) {state.ending = true;finishMaybe(stream, state);if (cb) {if (state.finished) pna.nextTick(cb);else stream.once("finish", cb);}state.ended = true;stream.writable = false;}function onCorkedFinish(corkReq, state, err) {var entry = corkReq.entry;corkReq.entry = null;while (entry) {var cb = entry.callback;state.pendingcb--;cb(err);entry = entry.next;}if (state.corkedRequestsFree) {state.corkedRequestsFree.next = corkReq;} else {state.corkedRequestsFree = corkReq;}}Object.defineProperty(Writable.prototype, "destroyed", { get: function get() {if (this._writableState === undefined) {return false;}return this._writableState.destroyed;}, set: function set(value) {if (!this._writableState) {return;}this._writableState.destroyed = value;} });Writable.prototype.destroy = destroyImpl.destroy;Writable.prototype._undestroy = destroyImpl.undestroy;Writable.prototype._destroy = function (err, cb) {this.end();cb(err);};}).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("timers").setImmediate);}, { "./_stream_duplex": 98, "./internal/streams/destroy": 104, "./internal/streams/stream": 105, _process: 92, "core-util-is": 14, inherits: 80, "process-nextick-args": 91, "safe-buffer": 110, timers: 112, "util-deprecate": 115 }], 103: [function (require, module, exports) {"use strict";function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Buffer = require("safe-buffer").Buffer;var util = require("util");function copyBuffer(src, target, offset) {src.copy(target, offset);}module.exports = function () {function BufferList() {_classCallCheck(this, BufferList);this.head = null;this.tail = null;this.length = 0;}BufferList.prototype.push = function push(v) {var entry = { data: v, next: null };if (this.length > 0) this.tail.next = entry;else this.head = entry;this.tail = entry;++this.length;};BufferList.prototype.unshift = function unshift(v) {var entry = { data: v, next: this.head };if (this.length === 0) this.tail = entry;this.head = entry;++this.length;};BufferList.prototype.shift = function shift() {if (this.length === 0) return;var ret = this.head.data;if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;--this.length;return ret;};BufferList.prototype.clear = function clear() {this.head = this.tail = null;this.length = 0;};BufferList.prototype.join = function join(s) {if (this.length === 0) return "";var p = this.head;var ret = "" + p.data;while (p = p.next) {ret += s + p.data;}return ret;};BufferList.prototype.concat = function concat(n) {if (this.length === 0) return Buffer.alloc(0);if (this.length === 1) return this.head.data;var ret = Buffer.allocUnsafe(n >>> 0);var p = this.head;var i = 0;while (p) {copyBuffer(p.data, ret, i);i += p.data.length;p = p.next;}return ret;};return BufferList;}();if (util && util.inspect && util.inspect.custom) {module.exports.prototype[util.inspect.custom] = function () {var obj = util.inspect({ length: this.length });return this.constructor.name + " " + obj;};}}, { "safe-buffer": 110, util: 11 }], 104: [function (require, module, exports) {"use strict";var pna = require("process-nextick-args");function destroy(err, cb) {var _this = this;var readableDestroyed = this._readableState && this._readableState.destroyed;var writableDestroyed = this._writableState && this._writableState.destroyed;if (readableDestroyed || writableDestroyed) {if (cb) {cb(err);} else if (err && (!this._writableState || !this._writableState.errorEmitted)) {pna.nextTick(emitErrorNT, this, err);}return this;}if (this._readableState) {this._readableState.destroyed = true;}if (this._writableState) {this._writableState.destroyed = true;}this._destroy(err || null, function (err) {if (!cb && err) {pna.nextTick(emitErrorNT, _this, err);if (_this._writableState) {_this._writableState.errorEmitted = true;}} else if (cb) {cb(err);}});return this;}function undestroy() {if (this._readableState) {this._readableState.destroyed = false;this._readableState.reading = false;this._readableState.ended = false;this._readableState.endEmitted = false;}if (this._writableState) {this._writableState.destroyed = false;this._writableState.ended = false;this._writableState.ending = false;this._writableState.finished = false;this._writableState.errorEmitted = false;}}function emitErrorNT(self, err) {self.emit("error", err);}module.exports = { destroy: destroy, undestroy: undestroy };}, { "process-nextick-args": 91 }], 105: [function (require, module, exports) {module.exports = require("events").EventEmitter;}, { events: 13 }], 106: [function (require, module, exports) {var toString = {}.toString;module.exports = Array.isArray || function (arr) {return toString.call(arr) == "[object Array]";};}, {}], 107: [function (require, module, exports) {"use strict";var Buffer = require("safe-buffer").Buffer;var isEncoding = Buffer.isEncoding || function (encoding) {encoding = "" + encoding;switch (encoding && encoding.toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":case "raw":return true;default:return false;}};function _normalizeEncoding(enc) {if (!enc) return "utf8";var retried;while (true) {switch (enc) {case "utf8":case "utf-8":return "utf8";case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return "utf16le";case "latin1":case "binary":return "latin1";case "base64":case "ascii":case "hex":return enc;default:if (retried) return;enc = ("" + enc).toLowerCase();retried = true;}}}function normalizeEncoding(enc) {var nenc = _normalizeEncoding(enc);if (typeof nenc !== "string" && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);return nenc || enc;}exports.StringDecoder = StringDecoder;function StringDecoder(encoding) {this.encoding = normalizeEncoding(encoding);var nb;switch (this.encoding) {case "utf16le":this.text = utf16Text;this.end = utf16End;nb = 4;break;case "utf8":this.fillLast = utf8FillLast;nb = 4;break;case "base64":this.text = base64Text;this.end = base64End;nb = 3;break;default:this.write = simpleWrite;this.end = simpleEnd;return;}this.lastNeed = 0;this.lastTotal = 0;this.lastChar = Buffer.allocUnsafe(nb);}StringDecoder.prototype.write = function (buf) {if (buf.length === 0) return "";var r;var i;if (this.lastNeed) {r = this.fillLast(buf);if (r === undefined) return "";i = this.lastNeed;this.lastNeed = 0;} else {i = 0;}if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);return r || "";};StringDecoder.prototype.end = utf8End;StringDecoder.prototype.text = utf8Text;StringDecoder.prototype.fillLast = function (buf) {if (this.lastNeed <= buf.length) {buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);return this.lastChar.toString(this.encoding, 0, this.lastTotal);}buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);this.lastNeed -= buf.length;};function utf8CheckByte(byte) {if (byte <= 127) return 0;else if (byte >> 5 === 6) return 2;else if (byte >> 4 === 14) return 3;else if (byte >> 3 === 30) return 4;return byte >> 6 === 2 ? -1 : -2;}function utf8CheckIncomplete(self, buf, i) {var j = buf.length - 1;if (j < i) return 0;var nb = utf8CheckByte(buf[j]);if (nb >= 0) {if (nb > 0) self.lastNeed = nb - 1;return nb;}if (--j < i || nb === -2) return 0;nb = utf8CheckByte(buf[j]);if (nb >= 0) {if (nb > 0) self.lastNeed = nb - 2;return nb;}if (--j < i || nb === -2) return 0;nb = utf8CheckByte(buf[j]);if (nb >= 0) {if (nb > 0) {if (nb === 2) nb = 0;else self.lastNeed = nb - 3;}return nb;}return 0;}function utf8CheckExtraBytes(self, buf, p) {if ((buf[0] & 192) !== 128) {self.lastNeed = 0;return "�";}if (self.lastNeed > 1 && buf.length > 1) {if ((buf[1] & 192) !== 128) {self.lastNeed = 1;return "�";}if (self.lastNeed > 2 && buf.length > 2) {if ((buf[2] & 192) !== 128) {self.lastNeed = 2;return "�";}}}}function utf8FillLast(buf) {var p = this.lastTotal - this.lastNeed;var r = utf8CheckExtraBytes(this, buf, p);if (r !== undefined) return r;if (this.lastNeed <= buf.length) {buf.copy(this.lastChar, p, 0, this.lastNeed);return this.lastChar.toString(this.encoding, 0, this.lastTotal);}buf.copy(this.lastChar, p, 0, buf.length);this.lastNeed -= buf.length;}function utf8Text(buf, i) {var total = utf8CheckIncomplete(this, buf, i);if (!this.lastNeed) return buf.toString("utf8", i);this.lastTotal = total;var end = buf.length - (total - this.lastNeed);buf.copy(this.lastChar, 0, end);return buf.toString("utf8", i, end);}function utf8End(buf) {var r = buf && buf.length ? this.write(buf) : "";if (this.lastNeed) return r + "�";return r;}function utf16Text(buf, i) {if ((buf.length - i) % 2 === 0) {var r = buf.toString("utf16le", i);if (r) {var c = r.charCodeAt(r.length - 1);if (c >= 55296 && c <= 56319) {this.lastNeed = 2;this.lastTotal = 4;this.lastChar[0] = buf[buf.length - 2];this.lastChar[1] = buf[buf.length - 1];return r.slice(0, -1);}}return r;}this.lastNeed = 1;this.lastTotal = 2;this.lastChar[0] = buf[buf.length - 1];return buf.toString("utf16le", i, buf.length - 1);}function utf16End(buf) {var r = buf && buf.length ? this.write(buf) : "";if (this.lastNeed) {var end = this.lastTotal - this.lastNeed;return r + this.lastChar.toString("utf16le", 0, end);}return r;}function base64Text(buf, i) {var n = (buf.length - i) % 3;if (n === 0) return buf.toString("base64", i);this.lastNeed = 3 - n;this.lastTotal = 3;if (n === 1) {this.lastChar[0] = buf[buf.length - 1];} else {this.lastChar[0] = buf[buf.length - 2];this.lastChar[1] = buf[buf.length - 1];}return buf.toString("base64", i, buf.length - n);}function base64End(buf) {var r = buf && buf.length ? this.write(buf) : "";if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);return r;}function simpleWrite(buf) {return buf.toString(this.encoding);}function simpleEnd(buf) {return buf && buf.length ? this.write(buf) : "";}}, { "safe-buffer": 110 }], 108: [function (require, module, exports) {exports = module.exports = require("./lib/_stream_readable.js");exports.Stream = exports;exports.Readable = exports;exports.Writable = require("./lib/_stream_writable.js");exports.Duplex = require("./lib/_stream_duplex.js");exports.Transform = require("./lib/_stream_transform.js");exports.PassThrough = require("./lib/_stream_passthrough.js");}, { "./lib/_stream_duplex.js": 98, "./lib/_stream_passthrough.js": 99, "./lib/_stream_readable.js": 100, "./lib/_stream_transform.js": 101, "./lib/_stream_writable.js": 102 }], 109: [function (require, module, exports) {"use strict";function ReInterval(callback, interval, args) {var self = this;this._callback = callback;this._args = args;this._interval = setInterval(callback, interval, this._args);this.reschedule = function (interval) {if (!interval) interval = self._interval;if (self._interval) clearInterval(self._interval);self._interval = setInterval(self._callback, interval, self._args);};this.clear = function () {if (self._interval) {clearInterval(self._interval);self._interval = undefined;}};this.destroy = function () {if (self._interval) {clearInterval(self._interval);}self._callback = undefined;self._interval = undefined;self._args = undefined;};}function reInterval() {if (typeof arguments[0] !== "function") throw new Error("callback needed");if (typeof arguments[1] !== "number") throw new Error("interval needed");var args;if (arguments.length > 0) {args = new Array(arguments.length - 2);for (var i = 0; i < args.length; i++) {args[i] = arguments[i + 2];}}return new ReInterval(arguments[0], arguments[1], args);}module.exports = reInterval;}, {}], 110: [function (require, module, exports) {var buffer = require("buffer");var Buffer = buffer.Buffer;function copyProps(src, dst) {for (var key in src) {dst[key] = src[key];}}if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {module.exports = buffer;} else {copyProps(buffer, exports);exports.Buffer = SafeBuffer;}function SafeBuffer(arg, encodingOrOffset, length) {return Buffer(arg, encodingOrOffset, length);}copyProps(Buffer, SafeBuffer);SafeBuffer.from = function (arg, encodingOrOffset, length) {if (typeof arg === "number") {throw new TypeError("Argument must not be a number");}return Buffer(arg, encodingOrOffset, length);};SafeBuffer.alloc = function (size, fill, encoding) {if (typeof size !== "number") {throw new TypeError("Argument must be a number");}var buf = Buffer(size);if (fill !== undefined) {if (typeof encoding === "string") {buf.fill(fill, encoding);} else {buf.fill(fill);}} else {buf.fill(0);}return buf;};SafeBuffer.allocUnsafe = function (size) {if (typeof size !== "number") {throw new TypeError("Argument must be a number");}return Buffer(size);};SafeBuffer.allocUnsafeSlow = function (size) {if (typeof size !== "number") {throw new TypeError("Argument must be a number");}return buffer.SlowBuffer(size);};}, { buffer: 12 }], 111: [function (require, module, exports) {module.exports = shift;function shift(stream) {var rs = stream._readableState;if (!rs) return null;return rs.objectMode ? stream.read() : stream.read(getStateLength(rs));}function getStateLength(state) {if (state.buffer.length) {if (state.buffer.head) {return state.buffer.head.data.length;}return state.buffer[0].length;}return state.length;}}, {}], 112: [function (require, module, exports) {(function (setImmediate, clearImmediate) {var nextTick = require("process/browser.js").nextTick;var apply = Function.prototype.apply;var slice = Array.prototype.slice;var immediateIds = {};var nextImmediateId = 0;exports.setTimeout = function () {return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);};exports.setInterval = function () {return new Timeout(apply.call(setInterval, window, arguments), clearInterval);};exports.clearTimeout = exports.clearInterval = function (timeout) {timeout.close();};function Timeout(id, clearFn) {this._id = id;this._clearFn = clearFn;}Timeout.prototype.unref = Timeout.prototype.ref = function () {};Timeout.prototype.close = function () {this._clearFn.call(window, this._id);};exports.enroll = function (item, msecs) {clearTimeout(item._idleTimeoutId);item._idleTimeout = msecs;};exports.unenroll = function (item) {clearTimeout(item._idleTimeoutId);item._idleTimeout = -1;};exports._unrefActive = exports.active = function (item) {clearTimeout(item._idleTimeoutId);var msecs = item._idleTimeout;if (msecs >= 0) {item._idleTimeoutId = setTimeout(function onTimeout() {if (item._onTimeout) item._onTimeout();}, msecs);}};exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {var id = nextImmediateId++;var args = arguments.length < 2 ? false : slice.call(arguments, 1);immediateIds[id] = true;nextTick(function onNextTick() {if (immediateIds[id]) {if (args) {fn.apply(null, args);} else {fn.call(null);}exports.clearImmediate(id);}});return id;};exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {delete immediateIds[id];};}).call(this, require("timers").setImmediate, require("timers").clearImmediate);}, { "process/browser.js": 92, timers: 112 }], 113: [function (require, module, exports) {"use strict";var punycode = require("punycode");var util = require("./util");exports.parse = urlParse;exports.resolve = urlResolve;exports.resolveObject = urlResolveObject;exports.format = urlFormat;exports.Url = Url;function Url() {this.protocol = null;this.slashes = null;this.auth = null;this.host = null;this.port = null;this.hostname = null;this.hash = null;this.search = null;this.query = null;this.pathname = null;this.path = null;this.href = null;}var protocolPattern = /^([a-z0-9.+-]+:)/i,portPattern = /:[0-9]*$/,simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,delims = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims),autoEscape = ["'"].concat(unwise),nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape),hostEndingChars = ["/", "?", "#"],hostnameMaxLen = 255,hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,unsafeProtocol = { javascript: true, "javascript:": true },hostlessProtocol = { javascript: true, "javascript:": true },slashedProtocol = { http: true, https: true, ftp: true, gopher: true, file: true, "http:": true, "https:": true, "ftp:": true, "gopher:": true, "file:": true },querystring = require("querystring");function urlParse(url, parseQueryString, slashesDenoteHost) {if (url && util.isObject(url) && url instanceof Url) return url;var u = new Url();u.parse(url, parseQueryString, slashesDenoteHost);return u;}Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {if (!util.isString(url)) {throw new TypeError("Parameter 'url' must be a string, not " + typeof url);}var queryIndex = url.indexOf("?"),splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#",uSplit = url.split(splitter),slashRegex = /\\/g;uSplit[0] = uSplit[0].replace(slashRegex, "/");url = uSplit.join(splitter);var rest = url;rest = rest.trim();if (!slashesDenoteHost && url.split("#").length === 1) {var simplePath = simplePathPattern.exec(rest);if (simplePath) {this.path = rest;this.href = rest;this.pathname = simplePath[1];if (simplePath[2]) {this.search = simplePath[2];if (parseQueryString) {this.query = querystring.parse(this.search.substr(1));} else {this.query = this.search.substr(1);}} else if (parseQueryString) {this.search = "";this.query = {};}return this;}}var proto = protocolPattern.exec(rest);if (proto) {proto = proto[0];var lowerProto = proto.toLowerCase();this.protocol = lowerProto;rest = rest.substr(proto.length);}if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {var slashes = rest.substr(0, 2) === "//";if (slashes && !(proto && hostlessProtocol[proto])) {rest = rest.substr(2);this.slashes = true;}}if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {var hostEnd = -1;for (var i = 0; i < hostEndingChars.length; i++) {var hec = rest.indexOf(hostEndingChars[i]);if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;}var auth, atSign;if (hostEnd === -1) {atSign = rest.lastIndexOf("@");} else {atSign = rest.lastIndexOf("@", hostEnd);}if (atSign !== -1) {auth = rest.slice(0, atSign);rest = rest.slice(atSign + 1);this.auth = decodeURIComponent(auth);}hostEnd = -1;for (var i = 0; i < nonHostChars.length; i++) {var hec = rest.indexOf(nonHostChars[i]);if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;}if (hostEnd === -1) hostEnd = rest.length;this.host = rest.slice(0, hostEnd);rest = rest.slice(hostEnd);this.parseHost();this.hostname = this.hostname || "";var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";if (!ipv6Hostname) {var hostparts = this.hostname.split(/\./);for (var i = 0, l = hostparts.length; i < l; i++) {var part = hostparts[i];if (!part) continue;if (!part.match(hostnamePartPattern)) {var newpart = "";for (var j = 0, k = part.length; j < k; j++) {if (part.charCodeAt(j) > 127) {newpart += "x";} else {newpart += part[j];}}if (!newpart.match(hostnamePartPattern)) {var validParts = hostparts.slice(0, i);var notHost = hostparts.slice(i + 1);var bit = part.match(hostnamePartStart);if (bit) {validParts.push(bit[1]);notHost.unshift(bit[2]);}if (notHost.length) {rest = "/" + notHost.join(".") + rest;}this.hostname = validParts.join(".");break;}}}}if (this.hostname.length > hostnameMaxLen) {this.hostname = "";} else {this.hostname = this.hostname.toLowerCase();}if (!ipv6Hostname) {this.hostname = punycode.toASCII(this.hostname);}var p = this.port ? ":" + this.port : "";var h = this.hostname || "";this.host = h + p;this.href += this.host;if (ipv6Hostname) {this.hostname = this.hostname.substr(1, this.hostname.length - 2);if (rest[0] !== "/") {rest = "/" + rest;}}}if (!unsafeProtocol[lowerProto]) {for (var i = 0, l = autoEscape.length; i < l; i++) {var ae = autoEscape[i];if (rest.indexOf(ae) === -1) continue;var esc = encodeURIComponent(ae);if (esc === ae) {esc = escape(ae);}rest = rest.split(ae).join(esc);}}var hash = rest.indexOf("#");if (hash !== -1) {this.hash = rest.substr(hash);rest = rest.slice(0, hash);}var qm = rest.indexOf("?");if (qm !== -1) {this.search = rest.substr(qm);this.query = rest.substr(qm + 1);if (parseQueryString) {this.query = querystring.parse(this.query);}rest = rest.slice(0, qm);} else if (parseQueryString) {this.search = "";this.query = {};}if (rest) this.pathname = rest;if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {this.pathname = "/";}if (this.pathname || this.search) {var p = this.pathname || "";var s = this.search || "";this.path = p + s;}this.href = this.format();return this;};function urlFormat(obj) {if (util.isString(obj)) obj = urlParse(obj);if (!(obj instanceof Url)) return Url.prototype.format.call(obj);return obj.format();}Url.prototype.format = function () {var auth = this.auth || "";if (auth) {auth = encodeURIComponent(auth);auth = auth.replace(/%3A/i, ":");auth += "@";}var protocol = this.protocol || "",pathname = this.pathname || "",hash = this.hash || "",host = false,query = "";if (this.host) {host = auth + this.host;} else if (this.hostname) {host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");if (this.port) {host += ":" + this.port;}}if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {query = querystring.stringify(this.query);}var search = this.search || query && "?" + query || "";if (protocol && protocol.substr(-1) !== ":") protocol += ":";if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {host = "//" + (host || "");if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname;} else if (!host) {host = "";}if (hash && hash.charAt(0) !== "#") hash = "#" + hash;if (search && search.charAt(0) !== "?") search = "?" + search;pathname = pathname.replace(/[?#]/g, function (match) {return encodeURIComponent(match);});search = search.replace("#", "%23");return protocol + host + pathname + search + hash;};function urlResolve(source, relative) {return urlParse(source, false, true).resolve(relative);}Url.prototype.resolve = function (relative) {return this.resolveObject(urlParse(relative, false, true)).format();};function urlResolveObject(source, relative) {if (!source) return relative;return urlParse(source, false, true).resolveObject(relative);}Url.prototype.resolveObject = function (relative) {if (util.isString(relative)) {var rel = new Url();rel.parse(relative, false, true);relative = rel;}var result = new Url();var tkeys = Object.keys(this);for (var tk = 0; tk < tkeys.length; tk++) {var tkey = tkeys[tk];result[tkey] = this[tkey];}result.hash = relative.hash;if (relative.href === "") {result.href = result.format();return result;}if (relative.slashes && !relative.protocol) {var rkeys = Object.keys(relative);for (var rk = 0; rk < rkeys.length; rk++) {var rkey = rkeys[rk];if (rkey !== "protocol") result[rkey] = relative[rkey];}if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {result.path = result.pathname = "/";}result.href = result.format();return result;}if (relative.protocol && relative.protocol !== result.protocol) {if (!slashedProtocol[relative.protocol]) {var keys = Object.keys(relative);for (var v = 0; v < keys.length; v++) {var k = keys[v];result[k] = relative[k];}result.href = result.format();return result;}result.protocol = relative.protocol;if (!relative.host && !hostlessProtocol[relative.protocol]) {var relPath = (relative.pathname || "").split("/");while (relPath.length && !(relative.host = relPath.shift())) {;}if (!relative.host) relative.host = "";if (!relative.hostname) relative.hostname = "";if (relPath[0] !== "") relPath.unshift("");if (relPath.length < 2) relPath.unshift("");result.pathname = relPath.join("/");} else {result.pathname = relative.pathname;}result.search = relative.search;result.query = relative.query;result.host = relative.host || "";result.auth = relative.auth;result.hostname = relative.hostname || relative.host;result.port = relative.port;if (result.pathname || result.search) {var p = result.pathname || "";var s = result.search || "";result.path = p + s;}result.slashes = result.slashes || relative.slashes;result.href = result.format();return result;}var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/",isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/",mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,removeAllDots = mustEndAbs,srcPath = result.pathname && result.pathname.split("/") || [],relPath = relative.pathname && relative.pathname.split("/") || [],psychotic = result.protocol && !slashedProtocol[result.protocol];if (psychotic) {result.hostname = "";result.port = null;if (result.host) {if (srcPath[0] === "") srcPath[0] = result.host;else srcPath.unshift(result.host);}result.host = "";if (relative.protocol) {relative.hostname = null;relative.port = null;if (relative.host) {if (relPath[0] === "") relPath[0] = relative.host;else relPath.unshift(relative.host);}relative.host = null;}mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");}if (isRelAbs) {result.host = relative.host || relative.host === "" ? relative.host : result.host;result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;result.search = relative.search;result.query = relative.query;srcPath = relPath;} else if (relPath.length) {if (!srcPath) srcPath = [];srcPath.pop();srcPath = srcPath.concat(relPath);result.search = relative.search;result.query = relative.query;} else if (!util.isNullOrUndefined(relative.search)) {if (psychotic) {result.hostname = result.host = srcPath.shift();var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;if (authInHost) {result.auth = authInHost.shift();result.host = result.hostname = authInHost.shift();}}result.search = relative.search;result.query = relative.query;if (!util.isNull(result.pathname) || !util.isNull(result.search)) {result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");}result.href = result.format();return result;}if (!srcPath.length) {result.pathname = null;if (result.search) {result.path = "/" + result.search;} else {result.path = null;}result.href = result.format();return result;}var last = srcPath.slice(-1)[0];var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";var up = 0;for (var i = srcPath.length; i >= 0; i--) {last = srcPath[i];if (last === ".") {srcPath.splice(i, 1);} else if (last === "..") {srcPath.splice(i, 1);up++;} else if (up) {srcPath.splice(i, 1);up--;}}if (!mustEndAbs && !removeAllDots) {for (; up--; up) {srcPath.unshift("..");}}if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {srcPath.unshift("");}if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {srcPath.push("");}var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";if (psychotic) {result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;if (authInHost) {result.auth = authInHost.shift();result.host = result.hostname = authInHost.shift();}}mustEndAbs = mustEndAbs || result.host && srcPath.length;if (mustEndAbs && !isAbsolute) {srcPath.unshift("");}if (!srcPath.length) {result.pathname = null;result.path = null;} else {result.pathname = srcPath.join("/");}if (!util.isNull(result.pathname) || !util.isNull(result.search)) {result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");}result.auth = relative.auth || result.auth;result.slashes = result.slashes || relative.slashes;result.href = result.format();return result;};Url.prototype.parseHost = function () {var host = this.host;var port = portPattern.exec(host);if (port) {port = port[0];if (port !== ":") {this.port = port.substr(1);}host = host.substr(0, host.length - port.length);}if (host) this.hostname = host;};}, { "./util": 114, punycode: 93, querystring: 96 }], 114: [function (require, module, exports) {"use strict";module.exports = { isString: function isString(arg) {return typeof arg === "string";}, isObject: function isObject(arg) {return typeof arg === "object" && arg !== null;}, isNull: function isNull(arg) {return arg === null;}, isNullOrUndefined: function isNullOrUndefined(arg) {return arg == null;} };}, {}], 115: [function (require, module, exports) {(function (global) {module.exports = deprecate;function deprecate(fn, msg) {if (config("noDeprecation")) {return fn;}var warned = false;function deprecated() {if (!warned) {if (config("throwDeprecation")) {throw new Error(msg);} else if (config("traceDeprecation")) {console.trace(msg);} else {console.warn(msg);}warned = true;}return fn.apply(this, arguments);}return deprecated;}function config(name) {try {if (!global.localStorage) return false;} catch (_) {return false;}var val = global.localStorage[name];if (null == val) return false;return String(val).toLowerCase() === "true";}}).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});}, {}], 116: [function (require, module, exports) {module.exports = function isBuffer(arg) {return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";};}, {}], 117: [function (require, module, exports) {(function (process, global) {var formatRegExp = /%[sdj%]/g;exports.format = function (f) {if (!isString(f)) {var objects = [];for (var i = 0; i < arguments.length; i++) {objects.push(inspect(arguments[i]));}return objects.join(" ");}var i = 1;var args = arguments;var len = args.length;var str = String(f).replace(formatRegExp, function (x) {if (x === "%%") return "%";if (i >= len) return x;switch (x) {case "%s":return String(args[i++]);case "%d":return Number(args[i++]);case "%j":try {return JSON.stringify(args[i++]);} catch (_) {return "[Circular]";}default:return x;}});for (var x = args[i]; i < len; x = args[++i]) {if (isNull(x) || !isObject(x)) {str += " " + x;} else {str += " " + inspect(x);}}return str;};exports.deprecate = function (fn, msg) {if (isUndefined(global.process)) {return function () {return exports.deprecate(fn, msg).apply(this, arguments);};}if (process.noDeprecation === true) {return fn;}var warned = false;function deprecated() {if (!warned) {if (process.throwDeprecation) {throw new Error(msg);} else if (process.traceDeprecation) {console.trace(msg);} else {console.error(msg);}warned = true;}return fn.apply(this, arguments);}return deprecated;};var debugs = {};var debugEnviron;exports.debuglog = function (set) {if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || "";set = set.toUpperCase();if (!debugs[set]) {if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {var pid = process.pid;debugs[set] = function () {var msg = exports.format.apply(exports, arguments);console.error("%s %d: %s", set, pid, msg);};} else {debugs[set] = function () {};}}return debugs[set];};function inspect(obj, opts) {var ctx = { seen: [], stylize: stylizeNoColor };if (arguments.length >= 3) ctx.depth = arguments[2];if (arguments.length >= 4) ctx.colors = arguments[3];if (isBoolean(opts)) {ctx.showHidden = opts;} else if (opts) {exports._extend(ctx, opts);}if (isUndefined(ctx.showHidden)) ctx.showHidden = false;if (isUndefined(ctx.depth)) ctx.depth = 2;if (isUndefined(ctx.colors)) ctx.colors = false;if (isUndefined(ctx.customInspect)) ctx.customInspect = true;if (ctx.colors) ctx.stylize = stylizeWithColor;return formatValue(ctx, obj, ctx.depth);}exports.inspect = inspect;inspect.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] };inspect.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" };function stylizeWithColor(str, styleType) {var style = inspect.styles[styleType];if (style) {return "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m";} else {return str;}}function stylizeNoColor(str, styleType) {return str;}function arrayToHash(array) {var hash = {};array.forEach(function (val, idx) {hash[val] = true;});return hash;}function formatValue(ctx, value, recurseTimes) {if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {var ret = value.inspect(recurseTimes, ctx);if (!isString(ret)) {ret = formatValue(ctx, ret, recurseTimes);}return ret;}var primitive = formatPrimitive(ctx, value);if (primitive) {return primitive;}var keys = Object.keys(value);var visibleKeys = arrayToHash(keys);if (ctx.showHidden) {keys = Object.getOwnPropertyNames(value);}if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {return formatError(value);}if (keys.length === 0) {if (isFunction(value)) {var name = value.name ? ": " + value.name : "";return ctx.stylize("[Function" + name + "]", "special");}if (isRegExp(value)) {return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");}if (isDate(value)) {return ctx.stylize(Date.prototype.toString.call(value), "date");}if (isError(value)) {return formatError(value);}}var base = "",array = false,braces = ["{", "}"];if (isArray(value)) {array = true;braces = ["[", "]"];}if (isFunction(value)) {var n = value.name ? ": " + value.name : "";base = " [Function" + n + "]";}if (isRegExp(value)) {base = " " + RegExp.prototype.toString.call(value);}if (isDate(value)) {base = " " + Date.prototype.toUTCString.call(value);}if (isError(value)) {base = " " + formatError(value);}if (keys.length === 0 && (!array || value.length == 0)) {return braces[0] + base + braces[1];}if (recurseTimes < 0) {if (isRegExp(value)) {return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");} else {return ctx.stylize("[Object]", "special");}}ctx.seen.push(value);var output;if (array) {output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);} else {output = keys.map(function (key) {return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);});}ctx.seen.pop();return reduceToSingleString(output, base, braces);}function formatPrimitive(ctx, value) {if (isUndefined(value)) return ctx.stylize("undefined", "undefined");if (isString(value)) {var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";return ctx.stylize(simple, "string");}if (isNumber(value)) return ctx.stylize("" + value, "number");if (isBoolean(value)) return ctx.stylize("" + value, "boolean");if (isNull(value)) return ctx.stylize("null", "null");}function formatError(value) {return "[" + Error.prototype.toString.call(value) + "]";}function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {var output = [];for (var i = 0, l = value.length; i < l; ++i) {if (hasOwnProperty(value, String(i))) {output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));} else {output.push("");}}keys.forEach(function (key) {if (!key.match(/^\d+$/)) {output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));}});return output;}function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {var name, str, desc;desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };if (desc.get) {if (desc.set) {str = ctx.stylize("[Getter/Setter]", "special");} else {str = ctx.stylize("[Getter]", "special");}} else {if (desc.set) {str = ctx.stylize("[Setter]", "special");}}if (!hasOwnProperty(visibleKeys, key)) {name = "[" + key + "]";}if (!str) {if (ctx.seen.indexOf(desc.value) < 0) {if (isNull(recurseTimes)) {str = formatValue(ctx, desc.value, null);} else {str = formatValue(ctx, desc.value, recurseTimes - 1);}if (str.indexOf("\n") > -1) {if (array) {str = str.split("\n").map(function (line) {return "  " + line;}).join("\n").substr(2);} else {str = "\n" + str.split("\n").map(function (line) {return "   " + line;}).join("\n");}}} else {str = ctx.stylize("[Circular]", "special");}}if (isUndefined(name)) {if (array && key.match(/^\d+$/)) {return str;}name = JSON.stringify("" + key);if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {name = name.substr(1, name.length - 2);name = ctx.stylize(name, "name");} else {name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");name = ctx.stylize(name, "string");}}return name + ": " + str;}function reduceToSingleString(output, base, braces) {var numLinesEst = 0;var length = output.reduce(function (prev, cur) {numLinesEst++;if (cur.indexOf("\n") >= 0) numLinesEst++;return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;}, 0);if (length > 60) {return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];}return braces[0] + base + " " + output.join(", ") + " " + braces[1];}function isArray(ar) {return Array.isArray(ar);}exports.isArray = isArray;function isBoolean(arg) {return typeof arg === "boolean";}exports.isBoolean = isBoolean;function isNull(arg) {return arg === null;}exports.isNull = isNull;function isNullOrUndefined(arg) {return arg == null;}exports.isNullOrUndefined = isNullOrUndefined;function isNumber(arg) {return typeof arg === "number";}exports.isNumber = isNumber;function isString(arg) {return typeof arg === "string";}exports.isString = isString;function isSymbol(arg) {return typeof arg === "symbol";}exports.isSymbol = isSymbol;function isUndefined(arg) {return arg === void 0;}exports.isUndefined = isUndefined;function isRegExp(re) {return isObject(re) && objectToString(re) === "[object RegExp]";}exports.isRegExp = isRegExp;function isObject(arg) {return typeof arg === "object" && arg !== null;}exports.isObject = isObject;function isDate(d) {return isObject(d) && objectToString(d) === "[object Date]";}exports.isDate = isDate;function isError(e) {return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);}exports.isError = isError;function isFunction(arg) {return typeof arg === "function";}exports.isFunction = isFunction;function isPrimitive(arg) {return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";}exports.isPrimitive = isPrimitive;exports.isBuffer = require("./support/isBuffer");function objectToString(o) {return Object.prototype.toString.call(o);}function pad(n) {return n < 10 ? "0" + n.toString(10) : n.toString(10);}var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];function timestamp() {var d = new Date();var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");return [d.getDate(), months[d.getMonth()], time].join(" ");}exports.log = function () {console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments));};exports.inherits = require("inherits");exports._extend = function (origin, add) {if (!add || !isObject(add)) return origin;var keys = Object.keys(add);var i = keys.length;while (i--) {origin[keys[i]] = add[keys[i]];}return origin;};function hasOwnProperty(obj, prop) {return Object.prototype.hasOwnProperty.call(obj, prop);}}).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});}, { "./support/isBuffer": 116, _process: 92, inherits: 80 }], 118: [function (require, module, exports) {(function (process, global) {"use strict";var Transform = require("readable-stream").Transform;var duplexify = require("duplexify");var WS = require("ws");var Buffer = require("safe-buffer").Buffer;module.exports = WebSocketStream;function buildProxy(options, socketWrite, socketEnd) {var proxy = new Transform({ objectMode: options.objectMode });proxy._write = socketWrite;proxy._flush = socketEnd;return proxy;}function WebSocketStream(target, protocols, options) {var stream, socket;var isBrowser = process.title === "browser";var isNative = !!global.WebSocket;var socketWrite = isBrowser ? socketWriteBrowser : socketWriteNode;if (protocols && !Array.isArray(protocols) && "object" === typeof protocols) {options = protocols;protocols = null;if (typeof options.protocol === "string" || Array.isArray(options.protocol)) {protocols = options.protocol;}}if (!options) options = {};if (options.objectMode === undefined) {options.objectMode = !(options.binary === true || options.binary === undefined);}var proxy = buildProxy(options, socketWrite, socketEnd);if (!options.objectMode) {proxy._writev = writev;}var bufferSize = options.browserBufferSize || 1024 * 512;var bufferTimeout = options.browserBufferTimeout || 1e3;if (typeof target === "object") {socket = target;} else {if (isNative && isBrowser) {socket = new WS(target, protocols);} else {socket = new WS(target, protocols, options);}socket.binaryType = "arraybuffer";}if (socket.readyState === socket.OPEN) {stream = proxy;} else {stream = duplexify.obj();socket.onopen = onopen;}stream.socket = socket;socket.onclose = onclose;socket.onerror = onerror;socket.onmessage = onmessage;proxy.on("close", destroy);var coerceToBuffer = !options.objectMode;function socketWriteNode(chunk, enc, next) {if (socket.readyState !== socket.OPEN) {next();return;}if (coerceToBuffer && typeof chunk === "string") {chunk = Buffer.from(chunk, "utf8");}socket.send(chunk, next);}function socketWriteBrowser(chunk, enc, next) {if (socket.bufferedAmount > bufferSize) {setTimeout(socketWriteBrowser, bufferTimeout, chunk, enc, next);return;}if (coerceToBuffer && typeof chunk === "string") {chunk = Buffer.from(chunk, "utf8");}try {socket.send(chunk);} catch (err) {return next(err);}next();}function socketEnd(done) {socket.close();done();}function onopen() {stream.setReadable(proxy);stream.setWritable(proxy);stream.emit("connect");}function onclose() {stream.end();stream.destroy();}function onerror(err) {stream.destroy(err);}function onmessage(event) {var data = event.data;if (data instanceof ArrayBuffer) data = Buffer.from(data);else data = Buffer.from(data, "utf8");proxy.push(data);}function destroy() {socket.close();}function writev(chunks, cb) {var buffers = new Array(chunks.length);for (var i = 0; i < chunks.length; i++) {if (typeof chunks[i].chunk === "string") {buffers[i] = Buffer.from(chunks[i], "utf8");} else {buffers[i] = chunks[i].chunk;}}this._write(Buffer.concat(buffers), "binary", cb);}return stream;}}).call(this, require("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});}, { _process: 92, duplexify: 17, "readable-stream": 108, "safe-buffer": 110, ws: 119 }], 119: [function (require, module, exports) {var ws = null;if (typeof WebSocket !== "undefined") {ws = WebSocket;} else if (typeof MozWebSocket !== "undefined") {ws = MozWebSocket;} else if (typeof window !== "undefined") {ws = window.WebSocket || window.MozWebSocket;}module.exports = ws;}, {}], 120: [function (require, module, exports) {module.exports = wrappy;function wrappy(fn, cb) {if (fn && cb) return wrappy(fn)(cb);if (typeof fn !== "function") throw new TypeError("need wrapper function");Object.keys(fn).forEach(function (k) {wrapper[k] = fn[k];});return wrapper;function wrapper() {var args = new Array(arguments.length);for (var i = 0; i < args.length; i++) {args[i] = arguments[i];}var ret = fn.apply(this, args);var cb = args[args.length - 1];if (typeof ret === "function" && ret !== cb) {Object.keys(cb).forEach(function (k) {ret[k] = cb[k];});}return ret;}}}, {}], 121: [function (require, module, exports) {module.exports = extend;var hasOwnProperty = Object.prototype.hasOwnProperty;function extend() {var target = {};for (var i = 0; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;}}, {}] }, {}, [9])(9);});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! (webpack)/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 38:
/*!************************************************************!*\
  !*** X:/毕业设计/MilkBusiness/components/u-charts/u-charts.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {/*
 * uCharts v1.9.3.20190922
 * uni-app平台高性能跨全端图表，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）
 * Copyright (c) 2019 QIUN秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 
 * uCharts官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */



var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: [10, 10, 10, 10],
  pixelRatio: 1,
  rotate: false,
  columePadding: 3,
  fontSize: 13,
  //dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
  dataPointShape: ['circle', 'circle', 'circle', 'circle'],
  colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
  pieChartLinePadding: 15,
  pieChartTextPadding: 5,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 20,
  radarLabelTextMargin: 15,
  gaugeLabelTextMargin: 15 };


var assign = function assign(target) {for (var _len2 = arguments.length, varArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {varArgs[_key2 - 1] = arguments[_key2];}
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  if (!varArgs || varArgs.length <= 0) {
    return target;
  }
  // 深度合并对象
  function deepAssign(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj1[key] && obj1[key].toString() === "[object Object]" ?
      deepAssign(obj1[key], obj2[key]) : obj1[key] = obj2[key];
    }
    return obj1;
  }

  varArgs.forEach(function (val) {
    target = deepAssign(target, val);
  });
  return target;
};

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;
    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }
    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;
    return !flag;
  } };


//兼容H5点击事件
function getH5Offset(e) {
  e.mp = {
    changedTouches: [] };

  e.mp.changedTouches.push({
    x: e.offsetX,
    y: e.offsetY });

  return e;
}

// hex 转 rgba
function hexToRgb(hexValue, opc) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opc + ')';
}

function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[uCharts] unvalid series data!');
  }
  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;
  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }
  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }
  while (num % limit !== 0) {
    if (type === 'upper') {
      num++;
    } else {
      num--;
    }
  }
  return num / multiple;
}

function calCandleMA(dayArr, nameArr, colorArr, kdata) {
  var seriesTemp = [];
  for (var k = 0; k < dayArr.length; k++) {
    var seriesItem = {
      data: [],
      name: nameArr[k],
      color: colorArr[k] };

    for (var i = 0, len = kdata.length; i < len; i++) {
      if (i < dayArr[k]) {
        seriesItem.data.push(null);
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayArr[k]; j++) {
        sum += kdata[i - j][1];
      }
      seriesItem.data.push(+(sum / dayArr[k]).toFixed(3));
    }
    seriesTemp.push(seriesItem);
  }
  return seriesTemp;
}

function calValidDistance(self, distance, chartData, config, opts) {
  var dataChartAreaWidth = opts.width - opts.area[1] - opts.area[3];
  var dataChartWidth = chartData.eachSpacing * (opts.chartData.xAxisData.xAxisPoints.length - 1);
  var validDistance = distance;
  if (distance >= 0) {
    validDistance = 0;
    self.event.trigger('scrollLeft');
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
    self.event.trigger('scrollRight');
  }
  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }
    return angle;
  }
  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);
  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;
    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }
  return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
  var xv = x;
  var yv = h - y;
  var transX = xv + (h - yv - xv) / Math.sqrt(2);
  transX *= -1;
  var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);
  return {
    transX: transX,
    transY: transY };

}

function createCurveControlPoints(points, i) {

  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y,
      points[
      i + 1].y);
    } else {
      return false;
    }
  }
  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;
  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  }
  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }
  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }
  if (pAy >= Math.max(points[i].y, points[i + 1].y) || pAy <= Math.min(points[i].y, points[i + 1].y)) {
    pAy = points[i].y;
  }
  if (pBy >= Math.max(points[i].y, points[i + 1].y) || pBy <= Math.min(points[i].y, points[i + 1].y)) {
    pBy = points[i + 1].y;
  }
  return {
    ctrA: {
      x: pAx,
      y: pAy },

    ctrB: {
      x: pBx,
      y: pBy } };


}

function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y };

}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }
  return obj;
}

function fillSeries(series, opts, config) {
  var index = 0;
  return series.map(function (item) {
    if (!item.color) {
      item.color = config.colors[index];
      index = (index + 1) % config.colors.length;
    }
    if (!item.index) {
      item.index = 0;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (typeof item.show == "undefined") {
      item.show = true;
    }
    if (!item.type) {
      item.type = opts.type;
    }
    if (!item.pointShape) {
      item.pointShape = "circle";
    }
    if (!item.legendShape) {
      switch (item.type) {
        case 'line':
          item.legendShape = "line";
          break;
        case 'column':
          item.legendShape = "rect";
          break;
        case 'area':
          item.legendShape = "triangle";
          break;
        default:
          item.legendShape = "circle";}

    }
    return item;
  });
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;
  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else if (range >= 0.01) {
    limit = 0.01;
  } else if (range >= 0.001) {
    limit = 0.001;
  } else if (range >= 0.0001) {
    limit = 0.0001;
  } else if (range >= 0.00001) {
    limit = 0.00001;
  } else {
    limit = 0.000001;
  }
  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit) };

}

function measureText(text) {
  var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : config.fontSize;
  text = String(text);
  var text = text.split('');
  var width = 0;
  for (var i = 0; i < text.length; i++) {
    var item = text[i];
    if (/[a-zA-Z]/.test(item)) {
      width += 7;
    } else if (/[0-9]/.test(item)) {
      width += 5.5;
    } else if (/\./.test(item)) {
      width += 2.7;
    } else if (/-/.test(item)) {
      width += 3.25;
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10;
    } else if (/\(|\)/.test(item)) {
      width += 3.73;
    } else if (/\s/.test(item)) {
      width += 2.5;
    } else if (/%/.test(item)) {
      width += 8;
    } else {
      width += 10;
    }
  }
  return width * fontSize / 10;
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function dataCombineStack(series, len) {
  var sum = new Array(len);
  for (var j = 0; j < sum.length; j++) {
    sum[j] = 0;
  }
  for (var i = 0; i < series.length; i++) {
    for (var j = 0; j < sum.length; j++) {
      sum[j] += series[i].data[j];
    }
  }
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data).concat(sum);
  }, []);
}

function getTouches(touches, opts, e) {
  var x, y;
  if (touches.clientX) {
    if (opts.rotate) {
      y = opts.height - touches.clientX * opts.pixelRatio;
      x = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pixelRatio / 2 * (opts.pixelRatio - 1)) *
      opts.pixelRatio;
    } else {
      x = touches.clientX * opts.pixelRatio;
      y = (touches.pageY - e.currentTarget.offsetTop - opts.height / opts.pixelRatio / 2 * (opts.pixelRatio - 1)) *
      opts.pixelRatio;
    }
  } else {
    if (opts.rotate) {
      y = opts.height - touches.x * opts.pixelRatio;
      x = touches.y * opts.pixelRatio;
    } else {
      x = touches.x * opts.pixelRatio;
      y = touches.y * opts.pixelRatio;
    }
  }
  return {
    x: x,
    y: y };

}

function getSeriesDataItem(series, index) {
  var data = [];
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    if (item.data[index] !== null && typeof item.data[index] !== 'undefined' && item.show) {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.type = item.type;
      seriesItem.style = item.style;
      seriesItem.pointShape = item.pointShape;
      seriesItem.disableLegend = item.disableLegend;
      seriesItem.name = item.name;
      seriesItem.show = item.show;
      seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
      data.push(seriesItem);
    }
  }
  return data;
}

function getMaxTextListLength(list) {
  var lengthList = list.map(function (item) {
    return measureText(item);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];
  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }

  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var textList = seriesData.map(function (item) {
    var titleText = [];
    if (categories) {
      titleText = categories;
    } else {
      titleText = item.data;
    }
    return {
      text: option.format ? option.format(item, titleText[index]) : item.name + ': ' + item.data,
      color: item.color };

  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  for (var _i = 0; _i < validCalPoints.length; _i++) {
    var item = validCalPoints[_i];
    offset.x = Math.round(item.x);
    offset.y += item.y;
  }
  offset.y /= validCalPoints.length;
  return {
    textList: textList,
    offset: offset };

}

function getMixToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color,
      disableLegend: item.disableLegend ? true : false };

  });
  textList = textList.filter(function (item) {
    if (item.disableLegend !== true) {
      return item;
    }
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  for (var _i2 = 0; _i2 < validCalPoints.length; _i2++) {
    var item = validCalPoints[_i2];
    offset.x = Math.round(item.x);
    offset.y += item.y;
  }
  offset.y /= validCalPoints.length;
  return {
    textList: textList,
    offset: offset };

}

function getCandleToolTipData(series, seriesData, calPoints, index, categories, extra) {
  var option = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var upColor = extra.color.upFill;
  var downColor = extra.color.downFill;
  //颜色顺序为开盘，收盘，最低，最高
  var color = [upColor, upColor, downColor, upColor];
  var textList = [];
  var text0 = {
    text: categories[index],
    color: null };

  textList.push(text0);
  seriesData.map(function (item) {
    if (index == 0 && item.data[1] - item.data[0] < 0) {
      color[1] = downColor;
    } else {
      if (item.data[0] < series[index - 1][1]) {
        color[0] = downColor;
      }
      if (item.data[1] < item.data[0]) {
        color[1] = downColor;
      }
      if (item.data[2] > series[index - 1][1]) {
        color[2] = upColor;
      }
      if (item.data[3] < series[index - 1][1]) {
        color[3] = downColor;
      }
    }
    var text1 = {
      text: '开盘：' + item.data[0],
      color: color[0] };

    var text2 = {
      text: '收盘：' + item.data[1],
      color: color[1] };

    var text3 = {
      text: '最低：' + item.data[2],
      color: color[2] };

    var text4 = {
      text: '最高：' + item.data[3],
      color: color[3] };

    textList.push(text1, text2, text3, text4);
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0 };

  for (var i = 0; i < calPoints.length; i++) {
    var points = calPoints[i];
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  }
  offset.x = Math.round(validCalPoints[0][0].x);
  return {
    textList: textList,
    offset: offset };

}

function filterSeries(series) {
  var tempSeries = [];
  for (var i = 0; i < series.length; i++) {
    if (series[i].show == true) {
      tempSeries.push(series[i]);
    }
  }
  return tempSeries;
}

function findCurrentIndex(currentPoints, calPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var currentIndex = -1;
  var spacing = 0;
  var xAxisPoints = [];
  for (var i = 0; i < calPoints[0].length; i++) {
    xAxisPoints.push(calPoints[0][i].x);
  }
  if ((opts.type == 'line' || opts.type == 'area') && opts.xAxis.boundaryGap == 'justify') {
    spacing = opts.chartData.eachSpacing / 2;
  }
  if (!opts.categories) {
    spacing = 0;
  }
  if (isInExactChartArea(currentPoints, opts, config)) {
    xAxisPoints.forEach(function (item, index) {
      if (currentPoints.x + offset + spacing > item) {
        currentIndex = index;
      }
    });
  }
  return currentIndex;
}

function findLegendIndex(currentPoints, legendData, opts) {
  var currentIndex = -1;
  if (isInExactLegendArea(currentPoints, legendData.area)) {
    var points = legendData.points;
    var index = -1;
    for (var i = 0, len = points.length; i < len; i++) {
      var item = points[i];
      for (var j = 0; j < item.length; j++) {
        index += 1;
        var area = item[j]['area'];
        if (currentPoints.x > area[0] && currentPoints.x < area[2] && currentPoints.y > area[1] && currentPoints.y < area[3]) {
          currentIndex = index;
          break;
        }
      }
    }
    return currentIndex;
  }
  return currentIndex;
}

function isInExactLegendArea(currentPoints, area) {
  return currentPoints.x > area.start.x && currentPoints.x < area.end.x && currentPoints.y > area.start.y &&
  currentPoints.y < area.end.y;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x <= opts.width - opts.area[1] + 10 && currentPoints.x >= opts.area[3] - 10 && currentPoints.y >= opts.area[0] && currentPoints.y <= opts.height - opts.area[2];
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }
      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }
      return angle;
    };

    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);

      return item;
    });

    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);
      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }
      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <=
      rangeEnd) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function findFunnelChartCurrentIndex(currentPoints, funnelData) {
  var currentIndex = -1;
  for (var i = 0, len = funnelData.series.length; i < len; i++) {
    var item = funnelData.series[i];
    if (currentPoints.x > item.funnelArea[0] && currentPoints.x < item.funnelArea[2] && currentPoints.y > item.funnelArea[1] && currentPoints.y < item.funnelArea[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findWordChartCurrentIndex(currentPoints, wordData) {
  var currentIndex = -1;
  for (var i = 0, len = wordData.length; i < len; i++) {
    var item = wordData[i];
    if (currentPoints.x > item.area[0] && currentPoints.x < item.area[2] && currentPoints.y > item.area[1] && currentPoints.y < item.area[3]) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findMapChartCurrentIndex(currentPoints, opts) {
  var currentIndex = -1;
  var cData = opts.chartData.mapData;
  var data = opts.series;
  var tmp = pointToCoordinate(currentPoints.y, currentPoints.x, cData.bounds, cData.scale, cData.xoffset, cData.yoffset);
  var poi = [tmp.x, tmp.y];
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i].geometry.coordinates;
    if (isPoiWithinPoly(poi, item)) {
      currentIndex = i;
      break;
    }
  }
  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData) {
  var currentIndex = -1;
  if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;
    for (var i = 0, len = pieData.series.length; i < len; i++) {
      var item = pieData.series[i];
      if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }

  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (item !== null) {
      items.push(item);
    } else {
      if (items.length) {
        newPoints.push(items);
      }
      items = [];
    }
  });
  if (items.length) {
    newPoints.push(items);
  }

  return newPoints;
}

function calLegendData(series, opts, config, chartData) {
  var legendData = {
    area: {
      start: {
        x: 0,
        y: 0 },

      end: {
        x: 0,
        y: 0 },

      width: 0,
      height: 0,
      wholeWidth: 0,
      wholeHeight: 0 },

    points: [],
    widthArr: [],
    heightArr: [] };

  if (opts.legend.show === false) {
    chartData.legendData = legendData;
    return legendData;
  }

  var padding = opts.legend.padding;
  var margin = opts.legend.margin;
  var fontSize = opts.legend.fontSize;
  var shapeWidth = 15 * opts.pixelRatio;
  var shapeRight = 5 * opts.pixelRatio;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pixelRatio, fontSize);
  if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
    var legendList = [];
    var widthCount = 0;
    var widthCountArr = [];
    var currentRow = [];
    for (var i = 0; i < series.length; i++) {
      var item = series[i];
      var itemWidth = shapeWidth + shapeRight + measureText(item.name || 'undefined', fontSize) + opts.legend.itemGap;
      if (widthCount + itemWidth > opts.width - opts.padding[1] - opts.padding[3]) {
        legendList.push(currentRow);
        widthCountArr.push(widthCount - opts.legend.itemGap);
        widthCount = itemWidth;
        currentRow = [item];
      } else {
        widthCount += itemWidth;
        currentRow.push(item);
      }
    }
    if (currentRow.length) {
      legendList.push(currentRow);
      widthCountArr.push(widthCount - opts.legend.itemGap);
      legendData.widthArr = widthCountArr;
      var legendWidth = Math.max.apply(null, widthCountArr);
      switch (opts.legend.float) {
        case 'left':
          legendData.area.start.x = opts.padding[3];
          legendData.area.end.x = opts.padding[3] + 2 * padding;
          break;
        case 'right':
          legendData.area.start.x = opts.width - opts.padding[1] - legendWidth - 2 * padding;
          legendData.area.end.x = opts.width - opts.padding[1];
          break;
        default:
          legendData.area.start.x = (opts.width - legendWidth) / 2 - padding;
          legendData.area.end.x = (opts.width + legendWidth) / 2 + padding;}

      legendData.area.width = legendWidth + 2 * padding;
      legendData.area.wholeWidth = legendWidth + 2 * padding;
      legendData.area.height = legendList.length * lineHeight + 2 * padding;
      legendData.area.wholeHeight = legendList.length * lineHeight + 2 * padding + 2 * margin;
      legendData.points = legendList;
    }
  } else {
    var len = series.length;
    var maxHeight = opts.height - opts.padding[0] - opts.padding[2] - 2 * margin - 2 * padding;
    var maxLength = Math.min(Math.floor(maxHeight / lineHeight), len);
    legendData.area.height = maxLength * lineHeight + padding * 2;
    legendData.area.wholeHeight = maxLength * lineHeight + padding * 2;
    switch (opts.legend.float) {
      case 'top':
        legendData.area.start.y = opts.padding[0] + margin;
        legendData.area.end.y = opts.padding[0] + margin + legendData.area.height;
        break;
      case 'bottom':
        legendData.area.start.y = opts.height - opts.padding[2] - margin - legendData.area.height;
        legendData.area.end.y = opts.height - opts.padding[2] - margin;
        break;
      default:
        legendData.area.start.y = (opts.height - legendData.area.height) / 2;
        legendData.area.end.y = (opts.height + legendData.area.height) / 2;}

    var lineNum = len % maxLength === 0 ? len / maxLength : Math.floor(len / maxLength + 1);
    var _currentRow = [];
    for (var _i3 = 0; _i3 < lineNum; _i3++) {
      var temp = series.slice(_i3 * maxLength, _i3 * maxLength + maxLength);
      _currentRow.push(temp);
    }

    legendData.points = _currentRow;

    if (_currentRow.length) {
      for (var _i4 = 0; _i4 < _currentRow.length; _i4++) {
        var _item = _currentRow[_i4];
        var maxWidth = 0;
        for (var j = 0; j < _item.length; j++) {
          var _itemWidth = shapeWidth + shapeRight + measureText(_item[j].name || 'undefined', fontSize) + opts.legend.itemGap;
          if (_itemWidth > maxWidth) {
            maxWidth = _itemWidth;
          }
        }
        legendData.widthArr.push(maxWidth);
        legendData.heightArr.push(_item.length * lineHeight + padding * 2);
      }
      var _legendWidth = 0;
      for (var _i5 = 0; _i5 < legendData.widthArr.length; _i5++) {
        _legendWidth += legendData.widthArr[_i5];
      }
      legendData.area.width = _legendWidth - opts.legend.itemGap + 2 * padding;
      legendData.area.wholeWidth = legendData.area.width + padding;
    }
  }

  switch (opts.legend.position) {
    case 'top':
      legendData.area.start.y = opts.padding[0] + margin;
      legendData.area.end.y = opts.padding[0] + margin + legendData.area.height;
      break;
    case 'bottom':
      legendData.area.start.y = opts.height - opts.padding[2] - legendData.area.height - margin;
      legendData.area.end.y = opts.height - opts.padding[2] - margin;
      break;
    case 'left':
      legendData.area.start.x = opts.padding[3];
      legendData.area.end.x = opts.padding[3] + legendData.area.width;
      break;
    case 'right':
      legendData.area.start.x = opts.width - opts.padding[1] - legendData.area.width;
      legendData.area.end.x = opts.width - opts.padding[1];
      break;}

  chartData.legendData = legendData;
  return legendData;
}

function calCategoriesData(categories, opts, config, eachSpacing) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };

  var categoriesTextLenth = categories.map(function (item) {
    return measureText(item, opts.xAxis.fontSize || config.fontSize);
  });
  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (opts.xAxis.rotateLabel == true && maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }
  return result;
}

function getXAxisTextList(series, opts, config) {
  var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
  var data = dataCombine(series);
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (item.constructor == Array) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor == Array) {
        if (opts.type == 'candle') {
          item.map(function (subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[0]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });

  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  //为了兼容v1.9.0之前的项目
  if (index > -1) {
    if (typeof opts.xAxis.data[index].min === 'number') {
      minData = Math.min(opts.xAxis.data[index].min, minData);
    }
    if (typeof opts.xAxis.data[index].max === 'number') {
      maxData = Math.max(opts.xAxis.data[index].max, maxData);
    }
  } else {
    if (typeof opts.xAxis.min === 'number') {
      minData = Math.min(opts.xAxis.min, minData);
    }
    if (typeof opts.xAxis.max === 'number') {
      maxData = Math.max(opts.xAxis.max, maxData);
    }
  }


  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;

  var range = [];
  var eachRange = (maxRange - minRange) / opts.xAxis.splitNumber;

  for (var i = 0; i <= opts.xAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range;
}

function calXAxisData(series, opts, config) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight };


  result.ranges = getXAxisTextList(series, opts, config);
  result.rangesFormat = result.ranges.map(function (item) {
    item = opts.xAxis.format ? opts.xAxis.format(item) : util.toFixed(item, 2);
    return item;
  });
  var xAxisScaleValues = result.ranges.map(function (item) {
    // 如果刻度值是浮点数,则保留两位小数
    item = util.toFixed(item, 2);
    // 若有自定义格式则调用自定义的格式化函数
    item = opts.xAxis.format ? opts.xAxis.format(Number(item)) : item;
    return item;
  });

  result = Object.assign(result, getXAxisPoints(xAxisScaleValues, opts, config));
  // 计算X轴刻度的属性譬如每个刻度的间隔,刻度的起始点\结束点以及总长
  var eachSpacing = result.eachSpacing;

  var textLength = xAxisScaleValues.map(function (item) {
    return measureText(item);
  });

  // get max length of categories text
  var maxTextLength = Math.max.apply(this, textLength);

  // 如果刻度值文本内容过长,则将其逆时针旋转45°
  if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }

  if (opts.xAxis.disabled === true) {
    result.xAxisHeight = 0;
  }

  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));

  var data = [];var _loop2 = function _loop2(
  i) {
    var each = series[i];
    var listItem = {};
    listItem.color = each.color;
    listItem.legendShape = each.legendShape;
    listItem.pointShape = each.pointShape;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];

      tmp.proportion = item / maxData;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion *
      process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });

    data.push(listItem);};for (var i = 0; i < series.length; i++) {_loop2(i);
  }

  return data;
}

function getPieDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  var count = 0;
  var _start_ = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  }
  for (var _i6 = 0; _i6 < series.length; _i6++) {
    var _item2 = series[_i6];
    _item2.data = _item2.data === null ? 0 : _item2.data;
    if (count === 0) {
      _item2._proportion_ = 1 / series.length * process;
    } else {
      _item2._proportion_ = _item2.data / count * process;
    }
    _item2._radius_ = radius;
  }
  for (var _i7 = 0; _i7 < series.length; _i7++) {
    var _item3 = series[_i7];
    _item3._start_ = _start_;
    _start_ += 2 * _item3._proportion_ * Math.PI;
  }

  return series;
}

function getFunnelDataPoints(series, radius) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  series = series.sort(function (a, b) {return parseInt(b.data) - parseInt(a.data);});
  for (var i = 0; i < series.length; i++) {
    series[i].radius = series[i].data / series[0].data * radius * process;
    series[i]._proportion_ = series[i].data / series[0].data;
  }
  return series.reverse();
}

function getRoseDataPoints(series, type, minRadius, radius) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var count = 0;
  var _start_ = 0;

  var dataArr = [];
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
    dataArr.push(item.data);
  }

  var minData = Math.min.apply(null, dataArr);
  var maxData = Math.max.apply(null, dataArr);
  var radiusLength = radius - minRadius;

  for (var _i8 = 0; _i8 < series.length; _i8++) {
    var _item4 = series[_i8];
    _item4.data = _item4.data === null ? 0 : _item4.data;
    if (count === 0 || type == 'area') {
      _item4._proportion_ = _item4.data / count * process;
      _item4._rose_proportion_ = 1 / series.length * process;
    } else {
      _item4._proportion_ = _item4.data / count * process;
      _item4._rose_proportion_ = _item4.data / count * process;
    }
    _item4._radius_ = minRadius + radiusLength * ((_item4.data - minData) / (maxData - minData));
  }
  for (var _i9 = 0; _i9 < series.length; _i9++) {
    var _item5 = series[_i9];
    _item5._start_ = _start_;
    _start_ += 2 * _item5._rose_proportion_ * Math.PI;
  }

  return series;
}

function getArcbarDataPoints(series, arcbarOption) {
  var process = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (process == 1) {
    process = 0.999999;
  }
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    var totalAngle = void 0;
    if (arcbarOption.type == 'circle') {
      totalAngle = 2;
    } else {
      if (arcbarOption.endAngle < arcbarOption.startAngle) {
        totalAngle = 2 + arcbarOption.endAngle - arcbarOption.startAngle;
      } else {
        totalAngle = arcbarOption.startAngle - arcbarOption.endAngle;
      }
    }
    item._proportion_ = totalAngle * item.data * process + arcbarOption.startAngle;
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getGaugeAxisPoints(categories, startAngle, endAngle) {
  var totalAngle = startAngle - endAngle + 1;
  var tempStartAngle = startAngle;
  for (var i = 0; i < categories.length; i++) {
    categories[i].value = categories[i].value === null ? 0 : categories[i].value;
    categories[i]._startAngle_ = tempStartAngle;
    categories[i]._endAngle_ = totalAngle * categories[i].value + startAngle;
    if (categories[i]._endAngle_ >= 2) {
      categories[i]._endAngle_ = categories[i]._endAngle_ % 2;
    }
    tempStartAngle = categories[i]._endAngle_;
  }
  return categories;
}

function getGaugeDataPoints(series, categories, gaugeOption) {
  var process = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    item.data = item.data === null ? 0 : item.data;
    if (gaugeOption.pointer.color == 'auto') {
      for (var _i10 = 0; _i10 < categories.length; _i10++) {
        if (item.data <= categories[_i10].value) {
          item.color = categories[_i10].color;
          break;
        }
      }
    } else {
      item.color = gaugeOption.pointer.color;
    }
    var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    item._endAngle_ = totalAngle * item.data + gaugeOption.startAngle;
    item._oldAngle_ = gaugeOption.oldAngle;
    if (gaugeOption.oldAngle < gaugeOption.endAngle) {
      item._oldAngle_ += 2;
    }
    if (item.data >= gaugeOption.oldData) {
      item._proportion_ = (item._endAngle_ - item._oldAngle_) * process + gaugeOption.oldAngle;
    } else {
      item._proportion_ = item._oldAngle_ - (item._oldAngle_ - item._endAngle_) * process;
    }
    if (item._proportion_ >= 2) {
      item._proportion_ = item._proportion_ % 2;
    }
  }
  return series;
}

function getPieTextMaxLength(series) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text));
  }

  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil((eachSpacing - 2 * config.columePadding) / columnLen);

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    }
    if (item.width <= 0) {
      item.width = 1;
    }
    item.x += (index + 0.5 - columnLen / 2) * item.width;
    return item;
  });
}

function fixColumeMeterData(points, eachSpacing, columnLen, index, config, opts, border) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }
    item.width = Math.ceil((eachSpacing - 2 * config.columePadding) / 2);

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    }

    if (index > 0) {
      item.width -= 2 * border;
    }
    return item;
  });
}

function fixColumeStackData(points, eachSpacing, columnLen, index, config, opts, series) {

  return points.map(function (item, indexn) {

    if (item === null) {
      return null;
    }
    item.width = Math.ceil((eachSpacing - 2 * config.columePadding) / 2);

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      item.width = Math.min(item.width, +opts.extra.column.width);
    }
    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var spacingValid = opts.width - opts.area[1] - opts.area[3];
  var dataCount = opts.enableScroll ? Math.min(opts.xAxis.itemCount, categories.length) : categories.length;
  if ((opts.type == 'line' || opts.type == 'area') && dataCount > 1 && opts.xAxis.boundaryGap == 'justify') {
    dataCount -= 1;
  }
  var eachSpacing = spacingValid / dataCount;

  var xAxisPoints = [];
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + index * eachSpacing);
  });
  if (opts.xAxis.boundaryGap !== 'justify') {
    if (opts.enableScroll === true) {
      xAxisPoints.push(startX + categories.length * eachSpacing);
    } else {
      xAxisPoints.push(endX);
    }
  }
  return {
    xAxisPoints: xAxisPoints,
    startX: startX,
    endX: endX,
    eachSpacing: eachSpacing };

}

function getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var cPoints = [];
      item.forEach(function (items, indexs) {
        var point = {};
        point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
        var value = items.value || items;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        height *= process;
        point.y = opts.height - Math.round(height) - opts.area[2];
        cPoints.push(point);
      });
      points.push(cPoints);
    }
  });

  return points;
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var boundaryGap = 'center';
  if (opts.type == 'line' || opts.type == 'area') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];
  var validWidth = opts.width - opts.area[1] - opts.area[3];
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index];
      var value = item;
      if (typeof item === 'object' && item !== null) {
        if (item.constructor == Array) {
          var xranges, xminRange, xmaxRange;
          xranges = [].concat(opts.chartData.xAxisData.ranges);

          xminRange = xranges.shift();
          xmaxRange = xranges.pop();
          value = item[1];
          point.x = opts.area[3] + validWidth * (item[0] - xminRange) / (xmaxRange - xminRange);
        } else {
          value = item.value;
        }
      }
      if (boundaryGap == 'center') {
        point.x += Math.round(eachSpacing / 2);
      }
      var height = validHeight * (value - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      points.push(point);
    }
  });

  return points;
}

function getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, stackSeries) {
  var process = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 1;
  var points = [];
  var validHeight = opts.height - opts.area[0] - opts.area[2];

  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.color = item.color;
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);

      if (seriesIndex > 0) {
        var value = 0;
        for (var i = 0; i <= seriesIndex; i++) {
          value += stackSeries[i].data[index];
        }
        var value0 = value - item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = validHeight * (value0 - minRange) / (maxRange - minRange);
      } else {
        var value = item;
        var height = validHeight * (value - minRange) / (maxRange - minRange);
        var height0 = 0;
      }
      var heightc = height0;
      height *= process;
      heightc *= process;
      point.y = opts.height - Math.round(height) - opts.area[2];
      point.y0 = opts.height - Math.round(heightc) - opts.area[2];
      points.push(point);
    }
  });

  return points;
}

function getYAxisTextList(series, opts, config, stack) {
  var index = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
  var data;
  if (stack == 'stack') {
    data = dataCombineStack(series, opts.categories.length);
  } else {
    data = dataCombine(series);
  }
  var sorted = [];
  // remove null from data
  data = data.filter(function (item) {
    //return item !== null;
    if (typeof item === 'object' && item !== null) {
      if (item.constructor == Array) {
        return item !== null;
      } else {
        return item.value !== null;
      }
    } else {
      return item !== null;
    }
  });
  data.map(function (item) {
    if (typeof item === 'object') {
      if (item.constructor == Array) {
        if (opts.type == 'candle') {
          item.map(function (subitem) {
            sorted.push(subitem);
          });
        } else {
          sorted.push(item[1]);
        }
      } else {
        sorted.push(item.value);
      }
    } else {
      sorted.push(item);
    }
  });

  var minData = 0;
  var maxData = 0;
  if (sorted.length > 0) {
    minData = Math.min.apply(this, sorted);
    maxData = Math.max.apply(this, sorted);
  }
  //为了兼容v1.9.0之前的项目
  if (index > -1) {
    if (typeof opts.yAxis.data[index].min === 'number') {
      minData = Math.min(opts.yAxis.data[index].min, minData);
    }
    if (typeof opts.yAxis.data[index].max === 'number') {
      maxData = Math.max(opts.yAxis.data[index].max, maxData);
    }
  } else {
    if (typeof opts.yAxis.min === 'number') {
      minData = Math.min(opts.yAxis.min, minData);
    }
    if (typeof opts.yAxis.max === 'number') {
      maxData = Math.max(opts.yAxis.max, maxData);
    }
  }


  if (minData === maxData) {
    var rangeSpan = maxData || 10;
    maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;

  var range = [];
  var eachRange = (maxRange - minRange) / opts.yAxis.splitNumber;

  for (var i = 0; i <= opts.yAxis.splitNumber; i++) {
    range.push(minRange + eachRange * i);
  }
  return range.reverse();
}

function calYAxisData(series, opts, config) {
  //堆叠图重算Y轴
  var columnstyle = assign({}, {
    type: "" },
  opts.extra.column);
  //如果是多Y轴，重新计算
  var YLength = opts.yAxis.data.length;
  var newSeries = new Array(YLength);
  if (YLength > 0) {
    for (var i = 0; i < YLength; i++) {
      newSeries[i] = [];
      for (var j = 0; j < series.length; j++) {
        if (series[j].index == i) {
          newSeries[i].push(series[j]);
        }
      }
    }
    var rangesArr = new Array(YLength);
    var rangesFormatArr = new Array(YLength);
    var yAxisWidthArr = new Array(YLength);var _loop3 = function _loop3(

    _i11) {
      var yData = opts.yAxis.data[_i11];
      //如果总开关不显示，强制每个Y轴为不显示
      if (opts.yAxis.disabled == true) {
        yData.disabled = true;
      }
      rangesArr[_i11] = getYAxisTextList(newSeries[_i11], opts, config, columnstyle.type, _i11);
      var yAxisFontSizes = yData.fontSize || config.fontSize;
      yAxisWidthArr[_i11] = { position: yData.position ? yData.position : 'left', width: 0 };
      rangesFormatArr[_i11] = rangesArr[_i11].map(function (items) {
        items = util.toFixed(items, 6);
        items = yData.format ? yData.format(Number(items)) : items;
        yAxisWidthArr[_i11].width = Math.max(yAxisWidthArr[_i11].width, measureText(items, yAxisFontSizes) + 5);
        return items;
      });
      var calibration = yData.calibration ? 4 * opts.pixelRatio : 0;
      yAxisWidthArr[_i11].width += calibration + 3 * opts.pixelRatio;
      if (yData.disabled === true) {
        yAxisWidthArr[_i11].width = 0;
      }};for (var _i11 = 0; _i11 < YLength; _i11++) {_loop3(_i11);
    }

  } else {
    var rangesArr = new Array(1);
    var rangesFormatArr = new Array(1);
    var yAxisWidthArr = new Array(1);
    rangesArr[0] = getYAxisTextList(series, opts, config, columnstyle.type);
    yAxisWidthArr[0] = { position: 'left', width: 0 };
    var yAxisFontSize = opts.yAxis.fontSize || config.fontSize;
    rangesFormatArr[0] = rangesArr[0].map(function (item) {
      item = util.toFixed(item, 6);
      item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
      yAxisWidthArr[0].width = Math.max(yAxisWidthArr[0].width, measureText(item, yAxisFontSize) + 5);
      return item;
    });
    yAxisWidthArr[0].width += 3 * opts.pixelRatio;
    if (opts.yAxis.disabled === true) {
      yAxisWidthArr[0] = { position: 'left', width: 0 };
      opts.yAxis.data[0] = { disabled: true };
    } else {
      opts.yAxis.data[0] = { disabled: false, position: 'left', max: opts.yAxis.max, min: opts.yAxis.min, format: opts.yAxis.format };
    }

  }

  return {
    rangesFormat: rangesFormatArr,
    ranges: rangesArr,
    yAxisWidth: yAxisWidthArr };


}

function calTooltipYAxisData(point, series, opts, config, eachSpacing) {
  var ranges = [].concat(opts.chartData.yAxisData.ranges);
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var minAxis = opts.area[0];
  var items = [];
  for (var i = 0; i < ranges.length; i++) {
    var maxVal = ranges[i].shift();
    var minVal = ranges[i].pop();
    var item = maxVal - (maxVal - minVal) * (point - minAxis) / spacingValid;
    item = opts.yAxis.data[i].format ? opts.yAxis.data[i].format(Number(item)) : item.toFixed(0);
    items.push(String(item));
  }
  return items;
}

function calMarkLineData(points, opts) {
  var minRange, maxRange;
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  for (var i = 0; i < points.length; i++) {
    points[i].yAxisIndex = points[i].yAxisIndex ? points[i].yAxisIndex : 0;
    var range = [].concat(opts.chartData.yAxisData.ranges[points[i].yAxisIndex]);
    minRange = range.pop();
    maxRange = range.shift();
    var height = spacingValid * (points[i].value - minRange) / (maxRange - minRange);
    points[i].y = opts.height - Math.round(height) - opts.area[2];
  }
  return points;
}

function contextRotate(context, opts) {
  if (opts.rotateLock !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
  } else if (opts._rotate_ !== true) {
    context.translate(opts.height, 0);
    context.rotate(90 * Math.PI / 180);
    opts._rotate_ = true;
  }
}

function drawPointShape(points, color, shape, context, opts) {
  context.beginPath();
  if (opts.dataPointShapeType == 'hollow') {
    context.setStrokeStyle(color);
    context.setFillStyle(opts.background);
    context.setLineWidth(2 * opts.pixelRatio);
  } else {
    context.setStrokeStyle("#ffffff");
    context.setFillStyle(color);
    context.setLineWidth(1 * opts.pixelRatio);
  }
  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 2.5 * opts.pixelRatio, item.y);
        context.arc(item.x, item.y, 3 * opts.pixelRatio, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'rect') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  }
  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context, center) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || config.titleColor;
  var subtitleFontColor = opts.subtitle.color || config.subtitleColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;

  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize);
    var startX = center.x - textWidth / 2 + (opts.subtitle.offsetX || 0);
    var startY = center.y + subtitlefontSize / 2 + (opts.subtitle.offsetY || 0);
    if (title) {
      startY += (titleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(subtitlefontSize);
    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.closePath();
    context.stroke();
  }
  if (title) {
    var _textWidth = measureText(title, titlefontSize);
    var _startX = center.x - _textWidth / 2 + (opts.title.offsetX || 0);
    var _startY = center.y + titlefontSize / 2 + (opts.title.offsetY || 0);
    if (subtitle) {
      _startY -= (subtitleHeight + margin) / 2;
    }
    context.beginPath();
    context.setFontSize(titlefontSize);
    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.closePath();
    context.stroke();
  }
}

function drawPointText(points, series, config, context) {
  // 绘制数据文案
  var data = series.data;
  points.forEach(function (item, index) {
    if (item !== null) {
      //var formatVal = series.format ? series.format(data[index]) : data[index];
      context.beginPath();
      context.setFontSize(series.textSize || config.fontSize);
      context.setFillStyle(series.textColor || '#666666');
      var value = data[index];
      if (typeof data[index] === 'object' && data[index] !== null) {
        if (data[index].constructor == Array) {
          value = data[index][1];
        } else {
          value = data[index].value;
        }
      }
      var formatVal = series.format ? series.format(value) : value;
      context.fillText(String(formatVal), item.x - measureText(formatVal, series.textSize || config.fontSize) / 2, item.y - 4);
      context.closePath();
      context.stroke();
    }
  });

}

function drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context) {
  radius -= gaugeOption.width / 2 + config.gaugeLabelTextMargin;

  var totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
  var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
  var totalNumber = gaugeOption.endNumber - gaugeOption.startNumber;
  var splitNumber = totalNumber / gaugeOption.splitLine.splitNumber;
  var nowAngle = gaugeOption.startAngle;
  var nowNumber = gaugeOption.startNumber;
  for (var i = 0; i < gaugeOption.splitLine.splitNumber + 1; i++) {
    var pos = {
      x: radius * Math.cos(nowAngle * Math.PI),
      y: radius * Math.sin(nowAngle * Math.PI) };

    var labelText = gaugeOption.labelFormat ? gaugeOption.labelFormat(nowNumber) : nowNumber;
    pos.x += centerPosition.x - measureText(labelText) / 2;
    pos.y += centerPosition.y;
    var startX = pos.x;
    var startY = pos.y;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(gaugeOption.labelColor || '#666666');
    context.fillText(labelText, startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();

    nowAngle += splitAngle;
    if (nowAngle >= 2) {
      nowAngle = nowAngle % 2;
    }
    nowNumber += splitNumber;
  }

}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  radius += config.radarLabelTextMargin;

  angleList.forEach(function (angle, index) {
    var pos = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle) };

    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;
    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '') / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '');
    }
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(radarOption.labelColor || '#666666');
    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
    context.closePath();
    context.stroke();
  });

}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;

  var seriesConvert = series.map(function (item) {
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_.toFixed(4) * 100) + '%';
    if (item._rose_proportion_) item._proportion_ = item._rose_proportion_;
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    var color = item.color;
    var radius = item._radius_;
    return {
      arc: arc,
      text: text,
      color: color,
      radius: radius,
      textColor: item.textColor,
      textSize: item.textSize };

  });
  for (var i = 0; i < seriesConvert.length; i++) {
    var item = seriesConvert[i];
    // line end
    var orginX1 = Math.cos(item.arc) * (item.radius + lineRadius);
    var orginY1 = Math.sin(item.arc) * (item.radius + lineRadius);

    // line start
    var orginX2 = Math.cos(item.arc) * item.radius;
    var orginY2 = Math.sin(item.arc) * item.radius;

    // text start
    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;
    var textWidth = measureText(item.text, item.textSize || config.fontSize);
    var startY = orginY3;

    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, {
      x: orginX3 }))
    {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }
    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }

    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2 },

      lineEnd: {
        x: orginX1,
        y: orginY1 },

      start: {
        x: orginX3,
        y: startY },

      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color,
      textColor: item.textColor,
      textSize: item.textSize };

    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  }

  for (var _i12 = 0; _i12 < textObjectCollection.length; _i12++) {
    var _item6 = textObjectCollection[_i12];
    var lineStartPoistion = convertCoordinateOrigin(_item6.lineStart.x, _item6.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(_item6.lineEnd.x, _item6.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(_item6.start.x, _item6.start.y, center);
    context.setLineWidth(1 * opts.pixelRatio);
    context.setFontSize(config.fontSize);
    context.beginPath();
    context.setStrokeStyle(_item6.color);
    context.setFillStyle(_item6.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = _item6.start.x < 0 ? textPosition.x + _item6.width : textPosition.x;
    var textStartX = _item6.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + _item6.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFontSize(_item6.textSize || config.fontSize);
    context.setFillStyle(_item6.textColor || '#666666');
    context.fillText(_item6.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  }
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var toolTipOption = opts.extra.tooltip || {};
  toolTipOption.gridType = toolTipOption.gridType == undefined ? 'solid' : toolTipOption.gridType;
  toolTipOption.dashLength = toolTipOption.dashLength == undefined ? 4 : toolTipOption.dashLength;
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];

  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.beginPath();
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.setLineDash([]);

  if (toolTipOption.xAxisLabel) {
    var labelText = opts.categories[opts.tooltip.index];
    context.setFontSize(config.fontSize);
    var textWidth = measureText(labelText, config.fontSize);

    var textX = offsetX - 0.5 * textWidth;
    var textY = endY;
    context.beginPath();
    context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
    context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
    context.setLineWidth(1 * opts.pixelRatio);
    context.rect(textX - config.toolTipPadding, textY, textWidth + 2 * config.toolTipPadding, config.fontSize + 2 * config.toolTipPadding);
    context.closePath();
    context.stroke();
    context.fill();

    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.labelFontColor || config.fontColor);
    context.fillText(String(labelText), textX, textY + config.toolTipPadding + config.fontSize);
    context.closePath();
    context.stroke();
  }
}

function drawMarkLine(opts, config, context) {
  var markLineOption = assign({}, {
    type: 'solid',
    dashLength: 4,
    data: [] },
  opts.extra.markLine);
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var points = calMarkLineData(markLineOption.data, opts);

  for (var i = 0; i < points.length; i++) {
    var item = assign({}, {
      lineColor: '#DE4A42',
      showLabel: false,
      labelFontColor: '#666666',
      labelBgColor: '#DFE8FF',
      labelBgOpacity: 0.8,
      yAxisIndex: 0 },
    points[i]);

    if (markLineOption.type == 'dash') {
      context.setLineDash([markLineOption.dashLength, markLineOption.dashLength]);
    }
    context.setStrokeStyle(item.lineColor);
    context.setLineWidth(1 * opts.pixelRatio);
    context.beginPath();
    context.moveTo(startX, item.y);
    context.lineTo(endX, item.y);
    context.stroke();
    context.setLineDash([]);
    if (item.showLabel) {
      var labelText = opts.yAxis.format ? opts.yAxis.format(Number(item.value)) : item.value;
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText, config.fontSize);
      var bgStartX = opts.padding[3] + config.yAxisTitleWidth - config.toolTipPadding;
      var bgEndX = Math.max(opts.area[3], textWidth + config.toolTipPadding * 2);
      var bgWidth = bgEndX - bgStartX;

      var textX = bgStartX + (bgWidth - textWidth) / 2;
      var textY = item.y;
      context.setFillStyle(hexToRgb(item.labelBgColor, item.labelBgOpacity));
      context.setStrokeStyle(item.labelBgColor);
      context.setLineWidth(1 * opts.pixelRatio);
      context.beginPath();
      context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 * config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();

      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(item.labelFontColor);
      context.fillText(String(labelText), textX, textY + 0.5 * config.fontSize);
      context.stroke();
    }
  }
}

function drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    gridType: 'solid',
    dashLength: 4 },
  opts.extra.tooltip);

  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];

  if (toolTipOption.gridType == 'dash') {
    context.setLineDash([toolTipOption.dashLength, toolTipOption.dashLength]);
  }
  context.setStrokeStyle(toolTipOption.gridColor || '#cccccc');
  context.setLineWidth(1 * opts.pixelRatio);
  context.beginPath();
  context.moveTo(startX, opts.tooltip.offset.y);
  context.lineTo(endX, opts.tooltip.offset.y);
  context.stroke();
  context.setLineDash([]);

  if (toolTipOption.yAxisLabel) {
    var labelText = calTooltipYAxisData(opts.tooltip.offset.y, opts.series, opts, config, eachSpacing);
    var widthArr = opts.chartData.yAxisData.yAxisWidth;
    var tStartLeft = opts.area[3];
    var tStartRight = opts.width - opts.area[1];
    for (var i = 0; i < labelText.length; i++) {
      context.setFontSize(config.fontSize);
      var textWidth = measureText(labelText[i], config.fontSize);
      var bgStartX = void 0,bgEndX = void 0,bgWidth = void 0;
      if (widthArr[i].position == 'left') {
        bgStartX = tStartLeft - widthArr[i].width;
        bgEndX = Math.max(bgStartX, bgStartX + textWidth + config.toolTipPadding * 2);
      } else {
        bgStartX = tStartRight;
        bgEndX = Math.max(bgStartX + widthArr[i].width, bgStartX + textWidth + config.toolTipPadding * 2);
      }
      bgWidth = bgEndX - bgStartX;

      var textX = bgStartX + (bgWidth - textWidth) / 2;
      var textY = opts.tooltip.offset.y;
      context.beginPath();
      context.setFillStyle(hexToRgb(toolTipOption.labelBgColor || config.toolTipBackground, toolTipOption.labelBgOpacity || config.toolTipOpacity));
      context.setStrokeStyle(toolTipOption.labelBgColor || config.toolTipBackground);
      context.setLineWidth(1 * opts.pixelRatio);
      context.rect(bgStartX, textY - 0.5 * config.fontSize - config.toolTipPadding, bgWidth, config.fontSize + 2 * config.toolTipPadding);
      context.closePath();
      context.stroke();
      context.fill();

      context.beginPath();
      context.setFontSize(config.fontSize);
      context.setFillStyle(toolTipOption.labelFontColor || config.fontColor);
      context.fillText(labelText[i], textX, textY + 0.5 * config.fontSize);
      context.closePath();
      context.stroke();
      if (widthArr[i].position == 'left') {
        tStartLeft -= widthArr[i].width + opts.yAxis.padding;
      } else {
        tStartRight += widthArr[i].width + opts.yAxis.padding;
      }
    }
  }
}

function drawToolTipSplitArea(offsetX, opts, config, context, eachSpacing) {
  var toolTipOption = assign({}, {
    activeBgColor: '#000000',
    activeBgOpacity: 0.08 },
  opts.extra.tooltip);
  var startY = opts.area[0];
  var endY = opts.height - opts.area[2];
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.activeBgColor, toolTipOption.activeBgOpacity));
  context.rect(offsetX - eachSpacing / 2, startY, eachSpacing, endY - startY);
  context.closePath();
  context.fill();
}

function drawToolTip(textList, offset, opts, config, context, eachSpacing, xAxisPoints) {
  var toolTipOption = assign({}, {
    showBox: true,
    bgColor: '#000000',
    bgOpacity: 0.7,
    fontColor: '#FFFFFF' },
  opts.extra.tooltip);
  var legendWidth = 4 * opts.pixelRatio;
  var legendMarginRight = 5 * opts.pixelRatio;
  var arrowWidth = 8 * opts.pixelRatio;
  var isOverRightBorder = false;
  if (opts.type == 'line' || opts.type == 'area' || opts.type == 'candle' || opts.type == 'mix') {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  offset = assign({
    x: 0,
    y: 0 },
  offset);
  offset.y -= 8 * opts.pixelRatio;
  var textWidth = textList.map(function (item) {
    return measureText(item.text, config.fontSize);
  });
  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight;

  if (toolTipOption.showBox == false) {return;}
  // if beyond the right border
  if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  }
  if (toolTipHeight + offset.y > opts.height) {
    offset.y = opts.height - toolTipHeight;
  }
  // draw background rect
  context.beginPath();
  context.setFillStyle(hexToRgb(toolTipOption.bgColor || config.toolTipBackground, toolTipOption.bgOpacity || config.toolTipOpacity));
  if (isOverRightBorder) {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x - arrowWidth, offset.y);
    context.lineTo(offset.x - arrowWidth - Math.round(toolTipWidth), offset.y);
    context.lineTo(offset.x - arrowWidth - Math.round(toolTipWidth), offset.y + toolTipHeight);
    context.lineTo(offset.x - arrowWidth, offset.y + toolTipHeight);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.lineTo(offset.x, offset.y + 10 * opts.pixelRatio);
  } else {
    context.moveTo(offset.x, offset.y + 10 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio - 5 * opts.pixelRatio);
    context.lineTo(offset.x + arrowWidth, offset.y);
    context.lineTo(offset.x + arrowWidth + Math.round(toolTipWidth), offset.y);
    context.lineTo(offset.x + arrowWidth + Math.round(toolTipWidth), offset.y + toolTipHeight);
    context.lineTo(offset.x + arrowWidth, offset.y + toolTipHeight);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 * opts.pixelRatio + 5 * opts.pixelRatio);
    context.lineTo(offset.x, offset.y + 10 * opts.pixelRatio);
  }

  context.closePath();
  context.fill();

  // draw legend
  textList.forEach(function (item, index) {
    if (item.color !== null) {
      context.beginPath();
      context.setFillStyle(item.color);
      var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
      var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index +
      config.toolTipPadding + 1;
      if (isOverRightBorder) {
        startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
      }
      context.fillRect(startX, startY, legendWidth, config.fontSize);
      context.closePath();
    }
  });

  // draw text list

  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;
    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index +
    config.toolTipPadding;
    context.beginPath();
    context.setFontSize(config.fontSize);
    context.setFillStyle(toolTipOption.fontColor);
    context.fillText(item.text, startX, startY + config.fontSize);
    context.closePath();
    context.stroke();
  });
}

function drawYAxisTitle(title, opts, config, context) {
  var startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
  context.save();
  context.beginPath();
  context.setFontSize(config.fontSize);
  context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
  context.translate(0, opts.height);
  context.rotate(-90 * Math.PI / 180);
  context.fillText(title, startX, opts.padding[3] + 0.5 * config.fontSize);
  context.closePath();
  context.stroke();
  context.restore();
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var columnOption = assign({}, {
    type: 'group',
    width: eachSpacing / 2,
    meter: {
      border: 4,
      fillColor: '#FFFFFF' } },

  opts.extra.column);

  var calPoints = [];
  context.save();

  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitArea(opts.tooltip.offset.x, opts, config, context, eachSpacing);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();

    var data = eachSeries.data;
    switch (columnOption.type) {
      case 'group':
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        var tooltipPoints = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(tooltipPoints);
        points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
        for (var i = 0; i < points.length; i++) {
          var item = points[i];
          if (item !== null && i > leftNum && i < rightNum) {
            context.beginPath();
            context.setStrokeStyle(item.color || eachSeries.color);
            context.setLineWidth(1);
            context.setFillStyle(item.color || eachSeries.color);
            var startX = item.x - item.width / 2;
            var height = opts.height - item.y - opts.area[2];
            context.moveTo(startX - 1, item.y);
            context.lineTo(startX + item.width - 2, item.y);
            context.lineTo(startX + item.width - 2, opts.height - opts.area[2]);
            context.lineTo(startX, opts.height - opts.area[2]);
            context.lineTo(startX, item.y);
            context.closePath();
            context.stroke();
            context.fill();
          }
        };
        break;
      case 'stack':
        // 绘制堆叠数据图
        var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
        calPoints.push(points);
        points = fixColumeStackData(points, eachSpacing, series.length, seriesIndex, config, opts, series);

        for (var _i13 = 0; _i13 < points.length; _i13++) {
          var _item7 = points[_i13];
          if (_item7 !== null && _i13 > leftNum && _i13 < rightNum) {
            context.beginPath();
            context.setFillStyle(_item7.color || eachSeries.color);
            var startX = _item7.x - _item7.width / 2 + 1;
            var height = opts.height - _item7.y - opts.area[2];
            var height0 = opts.height - _item7.y0 - opts.area[2];
            if (seriesIndex > 0) {
              height -= height0;
            }
            context.moveTo(startX, _item7.y);
            context.fillRect(startX, _item7.y, _item7.width - 2, height);
            context.closePath();
            context.fill();
          }
        };
        break;
      case 'meter':
        // 绘制温度计数据图
        var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
        calPoints.push(points);
        points = fixColumeMeterData(points, eachSpacing, series.length, seriesIndex, config, opts, columnOption.meter.border);
        if (seriesIndex == 0) {
          for (var _i14 = 0; _i14 < points.length; _i14++) {
            var _item8 = points[_i14];
            if (_item8 !== null && _i14 > leftNum && _i14 < rightNum) {
              //画背景颜色
              context.beginPath();
              context.setFillStyle(columnOption.meter.fillColor);
              var startX = _item8.x - _item8.width / 2;
              var height = opts.height - _item8.y - opts.area[2];
              context.moveTo(startX, _item8.y);
              context.fillRect(startX, _item8.y, _item8.width, height);
              context.closePath();
              context.fill();
              //画边框线
              if (columnOption.meter.border > 0) {
                context.beginPath();
                context.setStrokeStyle(eachSeries.color);
                context.setLineWidth(columnOption.meter.border * opts.pixelRatio);
                context.moveTo(startX + columnOption.meter.border * 0.5, _item8.y + height);
                context.lineTo(startX + columnOption.meter.border * 0.5, _item8.y + columnOption.meter.border * 0.5);
                context.lineTo(startX + _item8.width - columnOption.meter.border * 0.5, _item8.y + columnOption.meter.border * 0.5);
                context.lineTo(startX + _item8.width - columnOption.meter.border * 0.5, _item8.y + height);
                context.stroke();
              }
            }
          };
        } else {
          for (var _i15 = 0; _i15 < points.length; _i15++) {
            var _item9 = points[_i15];
            if (_item9 !== null && _i15 > leftNum && _i15 < rightNum) {
              context.beginPath();
              context.setFillStyle(_item9.color || eachSeries.color);
              var startX = _item9.x - _item9.width / 2;
              var height = opts.height - _item9.y - opts.area[2];
              context.moveTo(startX, _item9.y);
              context.fillRect(startX, _item9.y, _item9.width, height);
              context.closePath();
              context.fill();
            }
          };
        }
        break;}

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      switch (columnOption.type) {
        case 'group':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);
          drawPointText(points, eachSeries, config, context);
          break;
        case 'stack':
          var points = getStackDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, seriesIndex, series, process);
          drawPointText(points, eachSeries, config, context);
          break;
        case 'meter':
          var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
          drawPointText(points, eachSeries, config, context);
          break;}

    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawCandleDataPoints(series, seriesMA, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var candleOption = assign({}, {
    color: {},
    average: {} },
  opts.extra.candle);
  candleOption.color = assign({}, {
    upLine: '#f04864',
    upFill: '#f04864',
    downLine: '#2fc25b',
    downFill: '#2fc25b' },
  candleOption.color);
  candleOption.average = assign({}, {
    show: false,
    name: [],
    day: [],
    color: config.colors },
  candleOption.average);
  opts.extra.candle = candleOption;

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var calPoints = [];

  context.save();

  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }

  //画均线
  if (candleOption.average.show) {
    seriesMA.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();

      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      var splitPointList = splitPoints(points);

      for (var i = 0; i < splitPointList.length; i++) {
        var _points = splitPointList[i];
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(1);
        if (_points.length === 1) {
          context.moveTo(_points[0].x, _points[0].y);
          context.arc(_points[0].x, _points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(_points[0].x, _points[0].y);
          var startPoint = 0;
          for (var j = 0; j < _points.length; j++) {
            var item = _points[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(_points, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          }
          context.moveTo(_points[0].x, _points[0].y);
        }
        context.closePath();
        context.stroke();
      }
    });
  }
  //画K线
  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getCandleDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);

    for (var i = 0; i < splitPointList[0].length; i++) {
      if (i > leftNum && i < rightNum) {
        var item = splitPointList[0][i];
        context.beginPath();
        //如果上涨
        if (data[i][1] - data[i][0] > 0) {
          context.setStrokeStyle(candleOption.color.upLine);
          context.setFillStyle(candleOption.color.upFill);
          context.setLineWidth(1 * opts.pixelRatio);
          context.moveTo(item[3].x, item[3].y); //顶点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y); //收盘左侧点
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y); //开盘左侧点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.lineTo(item[2].x, item[2].y); //底点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y); //开盘右侧点
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y); //收盘右侧点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.moveTo(item[3].x, item[3].y); //顶点
        } else {
          context.setStrokeStyle(candleOption.color.downLine);
          context.setFillStyle(candleOption.color.downFill);
          context.setLineWidth(1 * opts.pixelRatio);
          context.moveTo(item[3].x, item[3].y); //顶点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.lineTo(item[0].x - eachSpacing / 4, item[0].y); //开盘左侧点
          context.lineTo(item[1].x - eachSpacing / 4, item[1].y); //收盘左侧点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.lineTo(item[2].x, item[2].y); //底点
          context.lineTo(item[1].x, item[1].y); //收盘中间点
          context.lineTo(item[1].x + eachSpacing / 4, item[1].y); //收盘右侧点
          context.lineTo(item[0].x + eachSpacing / 4, item[0].y); //开盘右侧点
          context.lineTo(item[0].x, item[0].y); //开盘中间点
          context.moveTo(item[3].x, item[3].y); //顶点
        }
        context.closePath();
        context.fill();
        context.stroke();
      }
    }
  });

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var areaOption = assign({}, {
    type: 'straight',
    opacity: 0.2,
    addLine: false,
    width: 2,
    gradient: false },
  opts.extra.area);

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var endY = opts.height - opts.area[2];
  var calPoints = [];

  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    var splitPointList = splitPoints(points);
    for (var i = 0; i < splitPointList.length; i++) {
      var _points2 = splitPointList[i];
      // 绘制区域数
      context.beginPath();
      context.setStrokeStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      if (areaOption.gradient) {
        var gradient = context.createLinearGradient(0, opts.area[0], 0, opts.height - opts.area[2]);
        gradient.addColorStop('0', hexToRgb(eachSeries.color, areaOption.opacity));
        gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
        context.setFillStyle(gradient);
      } else {
        context.setFillStyle(hexToRgb(eachSeries.color, areaOption.opacity));
      }
      context.setLineWidth(areaOption.width * opts.pixelRatio);
      if (_points2.length > 1) {
        var firstPoint = _points2[0];
        var lastPoint = _points2[_points2.length - 1];
        context.moveTo(firstPoint.x, firstPoint.y);
        var startPoint = 0;
        if (areaOption.type === 'curve') {
          for (var j = 0; j < _points2.length; j++) {
            var item = _points2[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(_points2, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          };
        } else {
          for (var _j = 0; _j < _points2.length; _j++) {
            var _item10 = _points2[_j];
            if (startPoint == 0 && _item10.x > leftSpace) {
              context.moveTo(_item10.x, _item10.y);
              startPoint = 1;
            }
            if (_j > 0 && _item10.x > leftSpace && _item10.x < rightSpace) {
              context.lineTo(_item10.x, _item10.y);
            }
          };
        }

        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var _item11 = _points2[0];
        context.moveTo(_item11.x - eachSpacing / 2, _item11.y);
        context.lineTo(_item11.x + eachSpacing / 2, _item11.y);
        context.lineTo(_item11.x + eachSpacing / 2, endY);
        context.lineTo(_item11.x - eachSpacing / 2, endY);
        context.moveTo(_item11.x - eachSpacing / 2, _item11.y);
      }
      context.closePath();
      context.fill();

      //画连线
      if (areaOption.addLine) {
        if (eachSeries.lineType == 'dash') {
          var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pixelRatio;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(areaOption.width * opts.pixelRatio);
        if (_points2.length === 1) {
          context.moveTo(_points2[0].x, _points2[0].y);
          context.arc(_points2[0].x, _points2[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(_points2[0].x, _points2[0].y);
          var _startPoint = 0;
          if (areaOption.type === 'curve') {
            for (var _j2 = 0; _j2 < _points2.length; _j2++) {
              var _item12 = _points2[_j2];
              if (_startPoint == 0 && _item12.x > leftSpace) {
                context.moveTo(_item12.x, _item12.y);
                _startPoint = 1;
              }
              if (_j2 > 0 && _item12.x > leftSpace && _item12.x < rightSpace) {
                var _ctrlPoint = createCurveControlPoints(_points2, _j2 - 1);
                context.bezierCurveTo(_ctrlPoint.ctrA.x, _ctrlPoint.ctrA.y, _ctrlPoint.ctrB.x, _ctrlPoint.ctrB.y, _item12.x, _item12.y);
              }
            };
          } else {
            for (var _j3 = 0; _j3 < _points2.length; _j3++) {
              var _item13 = _points2[_j3];
              if (_startPoint == 0 && _item13.x > leftSpace) {
                context.moveTo(_item13.x, _item13.y);
                _startPoint = 1;
              }
              if (_j3 > 0 && _item13.x > leftSpace && _item13.x < rightSpace) {
                context.lineTo(_item13.x, _item13.y);
              }
            };
          }
          context.moveTo(_points2[0].x, _points2[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      }
    }

    //画点
    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }

  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var lineOption = assign({}, {
    type: 'straight',
    width: 2 },
  opts.extra.line);
  lineOption.width *= opts.pixelRatio;

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;
  var calPoints = [];

  context.save();
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftSpace = -opts._scrollDistance_ - eachSpacing + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;
    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);

    if (eachSeries.lineType == 'dash') {
      var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
      dashLength *= opts.pixelRatio;
      context.setLineDash([dashLength, dashLength]);
    }
    context.beginPath();
    context.setStrokeStyle(eachSeries.color);
    context.setLineWidth(lineOption.width);

    splitPointList.forEach(function (points, index) {

      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);
        var startPoint = 0;
        if (lineOption.type === 'curve') {
          for (var j = 0; j < points.length; j++) {
            var item = points[j];
            if (startPoint == 0 && item.x > leftSpace) {
              context.moveTo(item.x, item.y);
              startPoint = 1;
            }
            if (j > 0 && item.x > leftSpace && item.x < rightSpace) {
              var ctrlPoint = createCurveControlPoints(points, j - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          };
        } else {
          for (var _j4 = 0; _j4 < points.length; _j4++) {
            var _item14 = points[_j4];
            if (startPoint == 0 && _item14.x > leftSpace) {
              context.moveTo(_item14.x, _item14.y);
              startPoint = 1;
            }
            if (_j4 > 0 && _item14.x > leftSpace && _item14.x < rightSpace) {
              context.lineTo(_item14.x, _item14.y);
            }
          };
        }
        context.moveTo(points[0].x, points[0].y);
      }

    });

    context.stroke();
    context.setLineDash([]);

    if (opts.dataPointShape !== false) {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;
      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawMixDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  eachSpacing = xAxisData.eachSpacing;

  var endY = opts.height - opts.area[2];
  var calPoints = [];

  var columnIndex = 0;
  var columnLength = 0;
  series.forEach(function (eachSeries, seriesIndex) {
    if (eachSeries.type == 'column') {
      columnLength += 1;
    }
  });
  context.save();
  var leftNum = -2;
  var rightNum = xAxisPoints.length + 2;
  var leftSpace = 0;
  var rightSpace = opts.width + eachSpacing;
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
    leftNum = Math.floor(-opts._scrollDistance_ / eachSpacing) - 2;
    rightNum = leftNum + opts.xAxis.itemCount + 4;
    leftSpace = -opts._scrollDistance_ - eachSpacing + opts.area[3];
    rightSpace = leftSpace + (opts.xAxis.itemCount + 4) * eachSpacing;
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var ranges, minRange, maxRange;

    ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
    minRange = ranges.pop();
    maxRange = ranges.shift();

    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);

    // 绘制柱状数据图
    if (eachSeries.type == 'column') {
      points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
      for (var i = 0; i < points.length; i++) {
        var item = points[i];
        if (item !== null && i > leftNum && i < rightNum) {
          context.beginPath();
          context.setStrokeStyle(item.color || eachSeries.color);
          context.setLineWidth(1);
          context.setFillStyle(item.color || eachSeries.color);
          var startX = item.x - item.width / 2;
          var height = opts.height - item.y - opts.area[2];
          context.moveTo(startX, item.y);
          context.moveTo(startX - 1, item.y);
          context.lineTo(startX + item.width - 2, item.y);
          context.lineTo(startX + item.width - 2, opts.height - opts.area[2]);
          context.lineTo(startX, opts.height - opts.area[2]);
          context.lineTo(startX, item.y);
          context.closePath();
          context.stroke();
          context.fill();
          context.closePath();
          context.fill();
        }
      }
      columnIndex += 1;
    }

    //绘制区域图数据

    if (eachSeries.type == 'area') {
      var _splitPointList = splitPoints(points);
      for (var _i16 = 0; _i16 < _splitPointList.length; _i16++) {
        var _points3 = _splitPointList[_i16];
        // 绘制区域数据
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setFillStyle(hexToRgb(eachSeries.color, 0.2));
        context.setLineWidth(2 * opts.pixelRatio);
        if (_points3.length > 1) {
          var firstPoint = _points3[0];
          var lastPoint = _points3[_points3.length - 1];
          context.moveTo(firstPoint.x, firstPoint.y);
          var startPoint = 0;
          if (eachSeries.style === 'curve') {
            for (var j = 0; j < _points3.length; j++) {
              var _item15 = _points3[j];
              if (startPoint == 0 && _item15.x > leftSpace) {
                context.moveTo(_item15.x, _item15.y);
                startPoint = 1;
              }
              if (j > 0 && _item15.x > leftSpace && _item15.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(_points3, j - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, _item15.x, _item15.y);
              }
            };
          } else {
            for (var _j5 = 0; _j5 < _points3.length; _j5++) {
              var _item16 = _points3[_j5];
              if (startPoint == 0 && _item16.x > leftSpace) {
                context.moveTo(_item16.x, _item16.y);
                startPoint = 1;
              }
              if (_j5 > 0 && _item16.x > leftSpace && _item16.x < rightSpace) {
                context.lineTo(_item16.x, _item16.y);
              }
            };
          }
          context.lineTo(lastPoint.x, endY);
          context.lineTo(firstPoint.x, endY);
          context.lineTo(firstPoint.x, firstPoint.y);
        } else {
          var _item17 = _points3[0];
          context.moveTo(_item17.x - eachSpacing / 2, _item17.y);
          context.lineTo(_item17.x + eachSpacing / 2, _item17.y);
          context.lineTo(_item17.x + eachSpacing / 2, endY);
          context.lineTo(_item17.x - eachSpacing / 2, endY);
          context.moveTo(_item17.x - eachSpacing / 2, _item17.y);
        }
        context.closePath();
        context.fill();
      }
    }

    // 绘制折线数据图
    if (eachSeries.type == 'line') {
      var splitPointList = splitPoints(points);
      splitPointList.forEach(function (points, index) {
        if (eachSeries.lineType == 'dash') {
          var dashLength = eachSeries.dashLength ? eachSeries.dashLength : 8;
          dashLength *= opts.pixelRatio;
          context.setLineDash([dashLength, dashLength]);
        }
        context.beginPath();
        context.setStrokeStyle(eachSeries.color);
        context.setLineWidth(2 * opts.pixelRatio);
        if (points.length === 1) {
          context.moveTo(points[0].x, points[0].y);
          context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
        } else {
          context.moveTo(points[0].x, points[0].y);
          var _startPoint2 = 0;
          if (eachSeries.style == 'curve') {
            for (var _j6 = 0; _j6 < points.length; _j6++) {
              var _item18 = points[_j6];
              if (_startPoint2 == 0 && _item18.x > leftSpace) {
                context.moveTo(_item18.x, _item18.y);
                _startPoint2 = 1;
              }
              if (_j6 > 0 && _item18.x > leftSpace && _item18.x < rightSpace) {
                var ctrlPoint = createCurveControlPoints(points, _j6 - 1);
                context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, _item18.x, _item18.y);
              }
            }
          } else {
            for (var _j7 = 0; _j7 < points.length; _j7++) {
              var _item19 = points[_j7];
              if (_startPoint2 == 0 && _item19.x > leftSpace) {
                context.moveTo(_item19.x, _item19.y);
                _startPoint2 = 1;
              }
              if (_j7 > 0 && _item19.x > leftSpace && _item19.x < rightSpace) {
                context.lineTo(_item19.x, _item19.y);
              }
            }
          }
          context.moveTo(points[0].x, points[0].y);
        }
        context.stroke();
        context.setLineDash([]);
      });
    }

    // 绘制点数据图
    if (eachSeries.type == 'point') {
      eachSeries.addPoint = true;
    }

    if (eachSeries.addPoint == true && eachSeries.type !== 'column') {
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  if (opts.dataLabel !== false && process === 1) {
    var columnIndex = 0;
    series.forEach(function (eachSeries, seriesIndex) {
      var ranges, minRange, maxRange;

      ranges = [].concat(opts.chartData.yAxisData.ranges[eachSeries.index]);
      minRange = ranges.pop();
      maxRange = ranges.shift();

      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      if (eachSeries.type !== 'column') {
        drawPointText(points, eachSeries, config, context);
      } else {
        points = fixColumeData(points, eachSpacing, columnLength, columnIndex, config, opts);
        drawPointText(points, eachSeries, config, context);
        columnIndex += 1;
      }

    });
  }

  context.restore();

  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing };

}

function drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints) {
  var toolTipOption = opts.extra.tooltip || {};
  if (toolTipOption.horizentalLine && opts.tooltip && process === 1 && (opts.type == 'line' || opts.type == 'area' || opts.type == 'column' || opts.type == 'candle' || opts.type == 'mix')) {
    drawToolTipHorizentalLine(opts, config, context, eachSpacing, xAxisPoints);
  }
  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }
  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context, eachSpacing, xAxisPoints);
  }
  context.restore();

}

function drawXAxis(categories, opts, config, context) {

  var xAxisData = opts.chartData.xAxisData,
  xAxisPoints = xAxisData.xAxisPoints,
  startX = xAxisData.startX,
  endX = xAxisData.endX,
  eachSpacing = xAxisData.eachSpacing;
  var boundaryGap = 'center';
  if (opts.type == 'line' || opts.type == 'area') {
    boundaryGap = opts.xAxis.boundaryGap;
  }
  var startY = opts.height - opts.area[2];
  var endY = opts.area[0];

  //绘制滚动条
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    var scrollY = opts.height - opts.area[2] + config.xAxisHeight;
    var scrollScreenWidth = endX - startX;
    var scrollTotalWidth = eachSpacing * (xAxisPoints.length - 1);
    var scrollWidth = scrollScreenWidth * scrollScreenWidth / scrollTotalWidth;
    var scrollLeft = 0;
    if (opts._scrollDistance_) {
      scrollLeft = -opts._scrollDistance_ * scrollScreenWidth / scrollTotalWidth;
    }
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollBackgroundColor || "#EFEBEF");
    context.moveTo(startX, scrollY);
    context.lineTo(endX, scrollY);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.setLineCap('round');
    context.setLineWidth(6 * opts.pixelRatio);
    context.setStrokeStyle(opts.xAxis.scrollColor || "#A6A6A6");
    context.moveTo(startX + scrollLeft, scrollY);
    context.lineTo(startX + scrollLeft + scrollWidth, scrollY);
    context.stroke();
    context.closePath();
    context.setLineCap('butt');
  }

  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  //绘制X轴刻度线
  if (opts.xAxis.calibration === true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pixelRatio);
    xAxisPoints.forEach(function (item, index) {
      if (index > 0) {
        context.beginPath();
        context.moveTo(item - eachSpacing / 2, startY);
        context.lineTo(item - eachSpacing / 2, startY + 3 * opts.pixelRatio);
        context.closePath();
        context.stroke();
      }
    });
  }
  //绘制X轴网格
  if (opts.xAxis.disableGrid !== true) {
    context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");
    context.setLineCap('butt');
    context.setLineWidth(1 * opts.pixelRatio);
    if (opts.xAxis.gridType == 'dash') {
      context.setLineDash([opts.xAxis.dashLength, opts.xAxis.dashLength]);
    }
    opts.xAxis.gridEval = opts.xAxis.gridEval || 1;
    xAxisPoints.forEach(function (item, index) {
      if (index % opts.xAxis.gridEval == 0) {
        context.beginPath();
        context.moveTo(item, startY);
        context.lineTo(item, endY);
        context.stroke();
      }
    });
    context.setLineDash([]);
  }


  //绘制X轴文案
  if (opts.xAxis.disabled !== true) {
    // 对X轴列表做抽稀处理
    //默认全部显示X轴标签
    var maxXAxisListLength = categories.length;
    //如果设置了X轴单屏数量
    if (opts.xAxis.labelCount) {
      //如果设置X轴密度
      if (opts.xAxis.itemCount) {
        maxXAxisListLength = Math.ceil(categories.length / opts.xAxis.itemCount * opts.xAxis.labelCount);
      } else {
        maxXAxisListLength = opts.xAxis.labelCount;
      }
      maxXAxisListLength -= 1;
    }

    var ratio = Math.ceil(categories.length / maxXAxisListLength);

    var newCategories = [];
    var cgLength = categories.length;
    for (var i = 0; i < cgLength; i++) {
      if (i % ratio !== 0) {
        newCategories.push("");
      } else {
        newCategories.push(categories[i]);
      }
    }
    newCategories[cgLength - 1] = categories[cgLength - 1];

    var xAxisFontSize = opts.xAxis.fontSize || config.fontSize;
    if (config._xAxisTextAngle_ === 0) {
      newCategories.forEach(function (item, index) {
        var offset = -measureText(String(item), xAxisFontSize) / 2;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        var scrollHeight = 0;
        if (opts.xAxis.scrollShow) {
          scrollHeight = 6 * opts.pixelRatio;
        }
        context.beginPath();
        context.setFontSize(xAxisFontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        context.fillText(String(item), xAxisPoints[index] + offset, startY + xAxisFontSize + (config.xAxisHeight - scrollHeight - xAxisFontSize) / 2);
        context.closePath();
        context.stroke();
      });

    } else {
      newCategories.forEach(function (item, index) {
        context.save();
        context.beginPath();
        context.setFontSize(xAxisFontSize);
        context.setFillStyle(opts.xAxis.fontColor || '#666666');
        var textWidth = measureText(String(item), xAxisFontSize);
        var offset = -textWidth;
        if (boundaryGap == 'center') {
          offset += eachSpacing / 2;
        }
        var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + xAxisFontSize / 2 + 5, opts.height),
        transX = _calRotateTranslate.transX,
        transY = _calRotateTranslate.transY;

        context.rotate(-1 * config._xAxisTextAngle_);
        context.translate(transX, transY);
        context.fillText(String(item), xAxisPoints[index] + offset, startY + xAxisFontSize + 5);
        context.closePath();
        context.stroke();
        context.restore();
      });
    }
  }
  context.restore();

  //绘制X轴轴线
  if (opts.xAxis.axisLine) {
    context.beginPath();
    context.setStrokeStyle(opts.xAxis.axisLineColor);
    context.setLineWidth(1 * opts.pixelRatio);
    context.moveTo(startX, opts.height - opts.area[2]);
    context.lineTo(endX, opts.height - opts.area[2]);
    context.stroke();
  }
}

function drawYAxisGrid(categories, opts, config, context) {
  if (opts.yAxis.disableGrid === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
  xAxiseachSpacing = opts.chartData.xAxisData.eachSpacing;
  var TotalWidth = xAxiseachSpacing * (xAxisPoints.length - 1);
  var endX = startX + TotalWidth;

  var points = [];
  for (var i = 0; i < opts.yAxis.splitNumber + 1; i++) {
    points.push(opts.height - opts.area[2] - eachSpacing * i);
  }

  context.save();
  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.yAxis.gridType == 'dash') {
    context.setLineDash([opts.yAxis.dashLength, opts.yAxis.dashLength]);
  }
  context.setStrokeStyle(opts.yAxis.gridColor);
  context.setLineWidth(1 * opts.pixelRatio);
  points.forEach(function (item, index) {
    context.beginPath();
    context.moveTo(startX, item);
    context.lineTo(endX, item);
    context.stroke();
  });
  context.setLineDash([]);

  context.restore();
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }
  var spacingValid = opts.height - opts.area[0] - opts.area[2];
  var eachSpacing = spacingValid / opts.yAxis.splitNumber;
  var startX = opts.area[3];
  var endX = opts.width - opts.area[1];
  var endY = opts.height - opts.area[2];
  var fillEndY = endY + config.xAxisHeight;
  if (opts.xAxis.scrollShow) {
    fillEndY -= 3 * opts.pixelRatio;
  }
  if (opts.xAxis.rotateLabel) {
    fillEndY = opts.height - opts.area[2] + 3;
  }
  // set YAxis background
  context.beginPath();
  context.setFillStyle(opts.background || '#ffffff');
  if (opts._scrollDistance_ < 0) {
    context.fillRect(0, 0, startX, fillEndY);
  }
  if (opts.enableScroll == true) {
    context.fillRect(endX, 0, opts.width, fillEndY);
  }
  context.closePath();
  context.stroke();

  var points = [];
  for (var i = 0; i <= opts.yAxis.splitNumber; i++) {
    points.push(opts.area[0] + eachSpacing * i);
  }

  var tStartLeft = opts.area[3];
  var tStartRight = opts.width - opts.area[1];var _loop4 = function _loop4(

  _i17) {
    var yData = opts.yAxis.data[_i17];
    if (yData.disabled !== true) {
      var rangesFormat = opts.chartData.yAxisData.rangesFormat[_i17];
      var yAxisFontSize = yData.fontSize || config.fontSize;
      var yAxisWidth = opts.chartData.yAxisData.yAxisWidth[_i17];
      //画Y轴刻度及文案
      rangesFormat.forEach(function (item, index) {
        var pos = points[index] ? points[index] : endY;
        context.beginPath();
        context.setFontSize(yAxisFontSize);
        context.setLineWidth(1 * opts.pixelRatio);
        context.setStrokeStyle(yData.axisLineColor || '#cccccc');
        context.setFillStyle(yData.fontColor || '#666666');
        if (yAxisWidth.position == 'left') {
          context.fillText(String(item), tStartLeft - yAxisWidth.width, pos + yAxisFontSize / 2);
          //画刻度线
          if (yData.calibration == true) {
            context.moveTo(tStartLeft, pos);
            context.lineTo(tStartLeft - 3 * opts.pixelRatio, pos);
          }
        } else {
          context.fillText(String(item), tStartRight + 4 * opts.pixelRatio, pos + yAxisFontSize / 2);
          //画刻度线
          if (yData.calibration == true) {
            context.moveTo(tStartRight, pos);
            context.lineTo(tStartRight + 3 * opts.pixelRatio, pos);
          }
        }
        context.closePath();
        context.stroke();
      });
      //画Y轴轴线
      if (yData.axisLine !== false) {
        context.beginPath();
        context.setStrokeStyle(yData.axisLineColor || '#cccccc');
        context.setLineWidth(1 * opts.pixelRatio);
        if (yAxisWidth.position == 'left') {
          context.moveTo(tStartLeft, opts.height - opts.area[2]);
          context.lineTo(tStartLeft, opts.area[0]);
        } else {
          context.moveTo(tStartRight, opts.height - opts.area[2]);
          context.lineTo(tStartRight, opts.area[0]);
        }
        context.stroke();
      }

      //画Y轴标题
      if (opts.yAxis.showTitle) {

        var titleFontSize = yData.titleFontSize || config.fontSize;
        var title = yData.title;
        context.beginPath();
        context.setFontSize(titleFontSize);
        context.setFillStyle(yData.titleFontColor || '#666666');
        if (yAxisWidth.position == 'left') {
          context.fillText(title, tStartLeft - measureText(title, titleFontSize) / 2, opts.area[0] - 10 * opts.pixelRatio);
        } else {
          context.fillText(title, tStartRight - measureText(title, titleFontSize) / 2, opts.area[0] - 10 * opts.pixelRatio);
        }
        context.closePath();
        context.stroke();
      }
      if (yAxisWidth.position == 'left') {
        tStartLeft -= yAxisWidth.width + opts.yAxis.padding;
      } else {
        tStartRight += yAxisWidth.width + opts.yAxis.padding;
      }
    }};for (var _i17 = 0; _i17 < opts.yAxis.data.length; _i17++) {_loop4(_i17);
  }
}

function drawLegend(series, opts, config, context, chartData) {
  if (opts.legend.show === false) {
    return;
  }
  var legendData = chartData.legendData;
  var legendList = legendData.points;
  var legendArea = legendData.area;
  var padding = opts.legend.padding;
  var fontSize = opts.legend.fontSize;
  var shapeWidth = 15 * opts.pixelRatio;
  var shapeRight = 5 * opts.pixelRatio;
  var itemGap = opts.legend.itemGap;
  var lineHeight = Math.max(opts.legend.lineHeight * opts.pixelRatio, fontSize);

  //画背景及边框
  context.beginPath();
  context.setLineWidth(opts.legend.borderWidth);
  context.setStrokeStyle(opts.legend.borderColor);
  context.setFillStyle(opts.legend.backgroundColor);
  context.moveTo(legendArea.start.x, legendArea.start.y);
  context.rect(legendArea.start.x, legendArea.start.y, legendArea.width, legendArea.height);
  context.closePath();
  context.fill();
  context.stroke();

  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    var height = 0;
    width = legendData.widthArr[listIndex];
    height = legendData.heightArr[listIndex];
    var startX = 0;
    var startY = 0;
    if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
      startX = legendArea.start.x + (legendArea.width - width) / 2;
      startY = legendArea.start.y + padding + listIndex * lineHeight;
    } else {
      if (listIndex == 0) {
        width = 0;
      } else {
        width = legendData.widthArr[listIndex - 1];
      }
      startX = legendArea.start.x + padding + width;
      startY = legendArea.start.y + padding + (legendArea.height - height) / 2;
    }

    context.setFontSize(config.fontSize);
    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      item.area = [0, 0, 0, 0];
      item.area[0] = startX;
      item.area[1] = startY;
      item.area[3] = startY + lineHeight;
      context.beginPath();
      context.setLineWidth(1 * opts.pixelRatio);
      context.setStrokeStyle(item.show ? item.color : opts.legend.hiddenColor);
      context.setFillStyle(item.show ? item.color : opts.legend.hiddenColor);
      switch (item.legendShape) {
        case 'line':
          context.moveTo(startX, startY + 0.5 * lineHeight - 2 * opts.pixelRatio);
          context.fillRect(startX, startY + 0.5 * lineHeight - 2 * opts.pixelRatio, 15 * opts.pixelRatio, 4 * opts.pixelRatio);
          break;
        case 'triangle':
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.lineTo(startX + 2.5 * opts.pixelRatio, startY + 0.5 * lineHeight + 5 * opts.pixelRatio);
          context.lineTo(startX + 12.5 * opts.pixelRatio, startY + 0.5 * lineHeight + 5 * opts.pixelRatio);
          context.lineTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          break;
        case 'diamond':
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.lineTo(startX + 2.5 * opts.pixelRatio, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight + 5 * opts.pixelRatio);
          context.lineTo(startX + 12.5 * opts.pixelRatio, startY + 0.5 * lineHeight);
          context.lineTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          break;
        case 'circle':
          context.moveTo(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight);
          context.arc(startX + 7.5 * opts.pixelRatio, startY + 0.5 * lineHeight, 5 * opts.pixelRatio, 0, 2 * Math.PI);
          break;
        case 'rect':
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio, 15 * opts.pixelRatio, 10 * opts.pixelRatio);
          break;
        default:
          context.moveTo(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio);
          context.fillRect(startX, startY + 0.5 * lineHeight - 5 * opts.pixelRatio, 15 * opts.pixelRatio, 10 * opts.pixelRatio);}

      context.closePath();
      context.fill();
      context.stroke();

      startX += shapeWidth + shapeRight;
      var fontTrans = 0.5 * lineHeight + 0.5 * fontSize - 2;
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.show ? opts.legend.fontColor : opts.legend.hiddenColor);
      context.fillText(item.name, startX, startY + fontTrans);
      context.closePath();
      context.stroke();
      if (opts.legend.position == 'top' || opts.legend.position == 'bottom') {
        startX += measureText(item.name, fontSize) + itemGap;
        item.area[2] = startX;
      } else {
        item.area[2] = startX + measureText(item.name, fontSize) + itemGap;;
        startX -= shapeWidth + shapeRight;
        startY += lineHeight;
      }
    }
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var pieOption = assign({}, {
    activeOpacity: 0.5,
    activeRadius: 10 * opts.pixelRatio,
    offsetAngle: 0,
    labelWidth: 15 * opts.pixelRatio,
    ringWidth: 0,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF' },
  opts.extra.pie);
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = pieOption.activeRadius;
  }

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);

  series = getPieDataPoints(series, radius, process);

  var activeRadius = pieOption.activeRadius;

  series = series.map(function (eachSeries) {
    eachSeries._start_ += pieOption.offsetAngle * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, opts.extra.pie.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_ + activeRadius, eachSeries._start_,
        eachSeries._start_ + 2 *
        eachSeries._proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(pieOption.borderWidth * opts.pixelRatio);
    context.lineJoin = "round";
    context.setStrokeStyle(pieOption.borderColor);
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (pieOption.border == true) {
      context.stroke();
    }
  });

  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;
    if (typeof opts.extra.pie.ringWidth === 'number' && opts.extra.pie.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - opts.extra.pie.ringWidth);
    }
    context.beginPath();
    context.setFillStyle(opts.background || '#ffffff');
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  if (opts.dataLabel !== false && process === 1) {
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context, centerPosition);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawRoseDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var roseOption = assign({}, {
    type: 'area',
    activeOpacity: 0.5,
    activeRadius: 10 * opts.pixelRatio,
    offsetAngle: 0,
    labelWidth: 15 * opts.pixelRatio,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF' },
  opts.extra.rose);
  if (config.pieChartLinePadding == 0) {
    config.pieChartLinePadding = roseOption.activeRadius;
  }
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };

  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, (opts.height - opts.area[0] - opts.area[2]) / 2 - config.pieChartLinePadding - config.pieChartTextPadding);
  var minRadius = roseOption.minRadius || radius * 0.5;

  series = getRoseDataPoints(series, roseOption.type, minRadius, radius, process);

  var activeRadius = roseOption.activeRadius;

  series = series.map(function (eachSeries) {
    eachSeries._start_ += (roseOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });

  series.forEach(function (eachSeries, seriesIndex) {
    if (opts.tooltip) {
      if (opts.tooltip.index == seriesIndex) {
        context.beginPath();
        context.setFillStyle(hexToRgb(eachSeries.color, roseOption.activeOpacity || 0.5));
        context.moveTo(centerPosition.x, centerPosition.y);
        context.arc(centerPosition.x, centerPosition.y, activeRadius + eachSeries._radius_, eachSeries._start_,
        eachSeries._start_ + 2 * eachSeries._rose_proportion_ * Math.PI);
        context.closePath();
        context.fill();
      }
    }
    context.beginPath();
    context.setLineWidth(roseOption.borderWidth * opts.pixelRatio);
    context.lineJoin = "round";
    context.setStrokeStyle(roseOption.borderColor);
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, eachSeries._radius_, eachSeries._start_, eachSeries._start_ + 2 *
    eachSeries._rose_proportion_ * Math.PI);
    context.closePath();
    context.fill();
    if (roseOption.border == true) {
      context.stroke();
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    var valid = false;
    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawArcbarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var arcbarOption = assign({}, {
    startAngle: 0.75,
    endAngle: 0.25,
    type: 'default',
    width: 12 * opts.pixelRatio,
    gap: 2 * opts.pixelRatio },
  opts.extra.arcbar);

  series = getArcbarDataPoints(series, arcbarOption, process);

  var centerPosition;
  if (arcbarOption.center) {
    centerPosition = arcbarOption.center;
  } else {
    centerPosition = {
      x: opts.width / 2,
      y: opts.height / 2 };

  }

  var radius;
  if (arcbarOption.radius) {
    radius = arcbarOption.radius;
  } else {
    radius = Math.min(centerPosition.x, centerPosition.y);
    radius -= 5 * opts.pixelRatio;
    radius -= arcbarOption.width / 2;
  }

  for (var i = 0; i < series.length; i++) {
    var eachSeries = series[i];
    //背景颜色
    context.setLineWidth(arcbarOption.width);
    context.setStrokeStyle(arcbarOption.backgroundColor || '#E9E9E9');
    context.setLineCap('round');
    context.beginPath();
    if (arcbarOption.type == 'default') {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width + arcbarOption.gap) * i, arcbarOption.startAngle * Math.PI, arcbarOption.endAngle * Math.PI, false);
    } else {
      context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width + arcbarOption.gap) * i, 0, 2 * Math.PI, false);
    }
    context.stroke();
    //进度条
    context.setLineWidth(arcbarOption.width);
    context.setStrokeStyle(eachSeries.color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, radius - (arcbarOption.width + arcbarOption.gap) * i, arcbarOption.startAngle * Math.PI, eachSeries._proportion_ * Math.PI, false);
    context.stroke();
  }

  drawRingTitle(opts, config, context, centerPosition);

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawGaugeDataPoints(categories, series, opts, config, context) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var gaugeOption = assign({}, {
    type: 'default',
    startAngle: 0.75,
    endAngle: 0.25,
    width: 15,
    splitLine: {
      fixRadius: 0,
      splitNumber: 10,
      width: 15,
      color: '#FFFFFF',
      childNumber: 5,
      childWidth: 5 },

    pointer: {
      width: 15,
      color: 'auto' } },

  opts.extra.gauge);

  if (gaugeOption.oldAngle == undefined) {
    gaugeOption.oldAngle = gaugeOption.startAngle;
  }
  if (gaugeOption.oldData == undefined) {
    gaugeOption.oldData = 0;
  }
  categories = getGaugeAxisPoints(categories, gaugeOption.startAngle, gaugeOption.endAngle);

  var centerPosition = {
    x: opts.width / 2,
    y: opts.height / 2 };

  var radius = Math.min(centerPosition.x, centerPosition.y);
  radius -= 5 * opts.pixelRatio;
  radius -= gaugeOption.width / 2;
  var innerRadius = radius - gaugeOption.width;
  var totalAngle = 0;

  //判断仪表盘的样式：default百度样式，progress新样式
  if (gaugeOption.type == 'progress') {

    //## 第一步画中心圆形背景和进度条背景
    //中心圆形背景
    var pieRadius = radius - gaugeOption.width * 3;
    context.beginPath();
    var gradient = context.createLinearGradient(centerPosition.x, centerPosition.y - pieRadius, centerPosition.x, centerPosition.y + pieRadius);
    //配置渐变填充（起点：中心点向上减半径；结束点中心点向下加半径）
    gradient.addColorStop('0', hexToRgb(series[0].color, 0.3));
    gradient.addColorStop('1.0', hexToRgb("#FFFFFF", 0.1));
    context.setFillStyle(gradient);
    context.arc(centerPosition.x, centerPosition.y, pieRadius, 0, 2 * Math.PI, false);
    context.fill();
    //画进度条背景
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, gaugeOption.endAngle * Math.PI, false);
    context.stroke();

    //## 第二步画刻度线
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    var splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    var childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    var startX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    var endX = -radius - gaugeOption.width - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);
    var len = gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1;
    var proc = series[0].data * process;
    for (var i = 0; i < len; i++) {
      context.beginPath();
      //刻度线随进度变色
      if (proc > i / len) {
        context.setStrokeStyle(hexToRgb(series[0].color, 1));
      } else {
        context.setStrokeStyle(hexToRgb(series[0].color, 0.3));
      }
      context.setLineWidth(3 * opts.pixelRatio);
      context.moveTo(startX, 0);
      context.lineTo(endX, 0);
      context.stroke();
      context.rotate(childAngle * Math.PI);
    }
    context.restore();

    //## 第三步画进度条
    series = getArcbarDataPoints(series, gaugeOption, process);
    context.setLineWidth(gaugeOption.width);
    context.setStrokeStyle(series[0].color);
    context.setLineCap('round');
    context.beginPath();
    context.arc(centerPosition.x, centerPosition.y, innerRadius, gaugeOption.startAngle * Math.PI, series[0]._proportion_ * Math.PI, false);
    context.stroke();

    //## 第四步画指针
    var pointerRadius = radius - gaugeOption.width * 2.5;
    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((series[0]._proportion_ - 1) * Math.PI);
    context.beginPath();
    context.setLineWidth(gaugeOption.width / 3);
    var gradient3 = context.createLinearGradient(0, -pointerRadius * 0.6, 0, pointerRadius * 0.6);
    gradient3.addColorStop('0', hexToRgb('#FFFFFF', 0));
    gradient3.addColorStop('0.5', hexToRgb(series[0].color, 1));
    gradient3.addColorStop('1.0', hexToRgb('#FFFFFF', 0));
    context.setStrokeStyle(gradient3);
    context.arc(0, 0, pointerRadius, 0.85 * Math.PI, 1.15 * Math.PI, false);
    context.stroke();
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(series[0].color);
    context.setFillStyle(series[0].color);
    context.moveTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2 - 4, 0);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, 4);
    context.lineTo(-pointerRadius - gaugeOption.width / 3 / 2, -4);
    context.stroke();
    context.fill();
    context.restore();

    //default百度样式
  } else {
    //画背景
    context.setLineWidth(gaugeOption.width);
    context.setLineCap('butt');
    for (var _i18 = 0; _i18 < categories.length; _i18++) {
      var eachCategories = categories[_i18];
      context.beginPath();
      context.setStrokeStyle(eachCategories.color);
      context.arc(centerPosition.x, centerPosition.y, radius, eachCategories._startAngle_ * Math.PI, eachCategories._endAngle_ * Math.PI, false);
      context.stroke();
    }
    context.save();

    //画刻度线
    totalAngle = gaugeOption.startAngle - gaugeOption.endAngle + 1;
    var _splitAngle = totalAngle / gaugeOption.splitLine.splitNumber;
    var _childAngle = totalAngle / gaugeOption.splitLine.splitNumber / gaugeOption.splitLine.childNumber;
    var _startX2 = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius;
    var _endX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.width;
    var childendX = -radius - gaugeOption.width * 0.5 - gaugeOption.splitLine.fixRadius + gaugeOption.splitLine.childWidth;

    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);

    for (var _i19 = 0; _i19 < gaugeOption.splitLine.splitNumber + 1; _i19++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(2 * opts.pixelRatio);
      context.moveTo(_startX2, 0);
      context.lineTo(_endX, 0);
      context.stroke();
      context.rotate(_splitAngle * Math.PI);
    }
    context.restore();

    context.save();
    context.translate(centerPosition.x, centerPosition.y);
    context.rotate((gaugeOption.startAngle - 1) * Math.PI);

    for (var _i20 = 0; _i20 < gaugeOption.splitLine.splitNumber * gaugeOption.splitLine.childNumber + 1; _i20++) {
      context.beginPath();
      context.setStrokeStyle(gaugeOption.splitLine.color);
      context.setLineWidth(1 * opts.pixelRatio);
      context.moveTo(_startX2, 0);
      context.lineTo(childendX, 0);
      context.stroke();
      context.rotate(_childAngle * Math.PI);
    }
    context.restore();

    //画指针
    series = getGaugeDataPoints(series, categories, gaugeOption, process);

    for (var _i21 = 0; _i21 < series.length; _i21++) {
      var eachSeries = series[_i21];
      context.save();
      context.translate(centerPosition.x, centerPosition.y);
      context.rotate((eachSeries._proportion_ - 1) * Math.PI);
      context.beginPath();
      context.setFillStyle(eachSeries.color);
      context.moveTo(gaugeOption.pointer.width, 0);
      context.lineTo(0, -gaugeOption.pointer.width / 2);
      context.lineTo(-innerRadius, 0);
      context.lineTo(0, gaugeOption.pointer.width / 2);
      context.lineTo(gaugeOption.pointer.width, 0);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFillStyle('#FFFFFF');
      context.arc(0, 0, gaugeOption.pointer.width / 6, 0, 2 * Math.PI, false);
      context.fill();
      context.restore();
    }

    if (opts.dataLabel !== false) {
      drawGaugeLabel(gaugeOption, radius, centerPosition, opts, config, context);
    }
  }

  //画仪表盘标题，副标题
  drawRingTitle(opts, config, context, centerPosition);

  if (process === 1 && opts.type === 'gauge') {
    opts.extra.gauge.oldAngle = series[0]._proportion_;
    opts.extra.gauge.oldData = series[0].data;
  }
  return {
    center: centerPosition,
    radius: radius,
    innerRadius: innerRadius,
    categories: categories,
    totalAngle: totalAngle };

}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var radarOption = assign({}, {
    gridColor: '#cccccc',
    labelColor: '#666666',
    opacity: 0.2,
    gridCount: 3 },
  opts.extra.radar);

  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);

  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.area[0] + (opts.height - opts.area[0] - opts.area[2]) / 2 };


  var radius = Math.min(centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin),
  centerPosition.y - config.radarLabelTextMargin);
  //TODO逻辑不对
  radius -= opts.padding[1];

  // draw grid
  context.beginPath();
  context.setLineWidth(1 * opts.pixelRatio);
  context.setStrokeStyle(radarOption.gridColor);
  coordinateAngle.forEach(function (angle) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.lineTo(pos.x, pos.y);
  });
  context.stroke();
  context.closePath();
  // draw split line grid

  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1 * opts.pixelRatio);
    context.setStrokeStyle(radarOption.gridColor);
    coordinateAngle.forEach(function (angle, index) {
      var pos = convertCoordinateOrigin(radius / radarOption.gridCount * i * Math.cos(angle), radius / radarOption.gridCount * i * Math.sin(angle), centerPosition);
      if (index === 0) {
        startPos = pos;
        context.moveTo(pos.x, pos.y);
      } else {
        context.lineTo(pos.x, pos.y);
      }
    });
    context.lineTo(startPos.x, startPos.y);
    context.stroke();
    context.closePath();
  };

  for (var i = 1; i <= radarOption.gridCount; i++) {
    _loop(i);
  }

  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);

  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // 绘制区域数据
    context.beginPath();
    context.setFillStyle(hexToRgb(eachSeries.color, radarOption.opacity));
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();

    if (opts.dataPointShape !== false) {
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, eachSeries.pointShape, context, opts);
    }
  });
  // draw label text
  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);

  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle };

}

function normalInt(min, max, iter) {
  iter = iter == 0 ? 1 : iter;
  var arr = [];
  for (var i = 0; i < iter; i++) {
    arr[i] = Math.random();
  };
  return Math.floor(arr.reduce(function (i, j) {return i + j;}) / iter * (max - min)) + min;
};

function collisionNew(area, points, width, height) {
  var isIn = false;
  for (var i = 0; i < points.length; i++) {
    if (points[i].area) {
      if (area[3] < points[i].area[1] || area[0] > points[i].area[2] || area[1] > points[i].area[3] || area[2] < points[i].area[0]) {
        if (area[0] < 0 || area[1] < 0 || area[2] > width || area[3] > height) {
          isIn = true;
          break;
        } else {
          isIn = false;
        }
      } else {
        isIn = true;
        break;
      }
    }
  }
  return isIn;
};

function getBoundingBox(data) {
  var bounds = {},coords;
  bounds.xMin = 180;
  bounds.xMax = 0;
  bounds.yMin = 90;
  bounds.yMax = 0;
  for (var i = 0; i < data.length; i++) {
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        var longitude = coords[j][0];
        var latitude = coords[j][1];
        var point = {
          x: longitude,
          y: latitude };

        bounds.xMin = bounds.xMin < point.x ? bounds.xMin : point.x;
        bounds.xMax = bounds.xMax > point.x ? bounds.xMax : point.x;
        bounds.yMin = bounds.yMin < point.y ? bounds.yMin : point.y;
        bounds.yMax = bounds.yMax > point.y ? bounds.yMax : point.y;
      }
    }
  }
  return bounds;
}

function coordinateToPoint(latitude, longitude, bounds, scale, xoffset, yoffset) {
  return {
    x: (longitude - bounds.xMin) * scale + xoffset,
    y: (bounds.yMax - latitude) * scale + yoffset };

}

function pointToCoordinate(pointY, pointX, bounds, scale, xoffset, yoffset) {
  return {
    x: (pointX - xoffset) / scale + bounds.xMin,
    y: bounds.yMax - (pointY - yoffset) / scale };

}

function isRayIntersectsSegment(poi, s_poi, e_poi) {
  if (s_poi[1] == e_poi[1]) {return false;}
  if (s_poi[1] > poi[1] && e_poi[1] > poi[1]) {return false;}
  if (s_poi[1] < poi[1] && e_poi[1] < poi[1]) {return false;}
  if (s_poi[1] == poi[1] && e_poi[1] > poi[1]) {return false;}
  if (e_poi[1] == poi[1] && s_poi[1] > poi[1]) {return false;}
  if (s_poi[0] < poi[0] && e_poi[1] < poi[1]) {return false;}
  var xseg = e_poi[0] - (e_poi[0] - s_poi[0]) * (e_poi[1] - poi[1]) / (e_poi[1] - s_poi[1]);
  if (xseg < poi[0]) {
    return false;
  } else {
    return true;
  }
}

function isPoiWithinPoly(poi, poly) {
  var sinsc = 0;
  for (var i = 0; i < poly.length; i++) {
    var epoly = poly[i][0];
    if (poly.length == 1) {
      epoly = poly[i][0];
    }
    for (var j = 0; j < epoly.length - 1; j++) {
      var s_poi = epoly[j];
      var e_poi = epoly[j + 1];
      if (isRayIntersectsSegment(poi, s_poi, e_poi)) {
        sinsc += 1;
      }
    }
  }

  if (sinsc % 2 == 1) {
    return true;
  } else {
    return false;
  }
}


function drawMapDataPoints(series, opts, config, context) {
  var mapOption = assign({}, {
    border: true,
    borderWidth: 1,
    borderColor: '#666666',
    fillOpacity: 0.6,
    activeBorderColor: '#f04864',
    activeFillColor: '#facc14',
    activeFillOpacity: 1 },
  opts.extra.map);
  var coords, point;
  var data = series;
  var bounds = getBoundingBox(data);
  var xScale = opts.width / Math.abs(bounds.xMax - bounds.xMin);
  var yScale = opts.height / Math.abs(bounds.yMax - bounds.yMin);
  var scale = xScale < yScale ? xScale : yScale;
  var xoffset = opts.width / 2 - Math.abs(bounds.xMax - bounds.xMin) / 2 * scale;
  var yoffset = opts.height / 2 - Math.abs(bounds.yMax - bounds.yMin) / 2 * scale;
  context.beginPath();
  context.clearRect(0, 0, opts.width, opts.height);
  context.setFillStyle(opts.background || '#FFFFFF');
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  for (var i = 0; i < data.length; i++) {
    context.beginPath();
    context.setLineWidth(mapOption.borderWidth * opts.pixelRatio);
    context.setStrokeStyle(mapOption.borderColor);
    context.setFillStyle(hexToRgb(series[i].color, mapOption.fillOpacity));
    if (opts.tooltip) {
      if (opts.tooltip.index == i) {
        context.setStrokeStyle(mapOption.activeBorderColor);
        context.setFillStyle(hexToRgb(mapOption.activeFillColor, mapOption.activeFillOpacity));
      }
    }
    var coorda = data[i].geometry.coordinates;
    for (var k = 0; k < coorda.length; k++) {
      coords = coorda[k];
      if (coords.length == 1) {
        coords = coords[0];
      }
      for (var j = 0; j < coords.length; j++) {
        point = coordinateToPoint(coords[j][1], coords[j][0], bounds, scale, xoffset, yoffset);
        if (j === 0) {
          context.beginPath();
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }
      context.fill();
      if (mapOption.border == true) {
        context.stroke();
      }
    }
    if (opts.dataLabel == true) {
      var centerPoint = data[i].properties.centroid;
      if (centerPoint) {
        point = coordinateToPoint(centerPoint[1], centerPoint[0], bounds, scale, xoffset, yoffset);
        var fontSize = data[i].textSize || config.fontSize;
        var text = data[i].properties.name;
        context.beginPath();
        context.setFontSize(fontSize);
        context.setFillStyle(data[i].textColor || '#666666');
        context.fillText(text, point.x - measureText(text, fontSize) / 2, point.y + fontSize / 2);
        context.closePath();
        context.stroke();
      }
    }
  }
  opts.chartData.mapData = {
    bounds: bounds,
    scale: scale,
    xoffset: xoffset,
    yoffset: yoffset };

  drawToolTipBridge(opts, config, context, 1);
  context.draw();
}

function getWordCloudPoint(opts, type) {
  var points = opts.series.sort(function (a, b) {return parseInt(b.textSize) - parseInt(a.textSize);});
  switch (type) {
    case 'normal':
      for (var i = 0; i < points.length; i++) {
        var text = points[i].name;
        var tHeight = points[i].textSize;
        var tWidth = measureText(text, tHeight);
        var x = void 0,y = void 0;
        var area = void 0;
        var breaknum = 0;
        while (true) {
          breaknum++;
          x = normalInt(-opts.width / 2, opts.width / 2, 5) - tWidth / 2;
          y = normalInt(-opts.height / 2, opts.height / 2, 5) + tHeight / 2;
          area = [x - 5 + opts.width / 2, y - 5 - tHeight + opts.height / 2, x + tWidth + 5 + opts.width / 2, y + 5 + opts.height / 2];
          var isCollision = collisionNew(area, points, opts.width, opts.height);
          if (!isCollision) break;
          if (breaknum == 1000) {
            area = [-100, -100, -100, -100];
            break;
          }
        };
        points[i].area = area;
      }
      break;
    case 'vertical':var
      Spin = function Spin() {
        //获取均匀随机值，是否旋转，旋转的概率为（1-0.5）
        if (Math.random() > 0.7) {
          return true;
        } else {return false;};
      };;
      for (var _i22 = 0; _i22 < points.length; _i22++) {
        var _text = points[_i22].name;
        var _tHeight = points[_i22].textSize;
        var _tWidth = measureText(_text, _tHeight);
        var isSpin = Spin();
        var _x = void 0,_y = void 0,_area = void 0,areav = void 0;
        var _breaknum = 0;
        while (true) {
          _breaknum++;
          var _isCollision = void 0;
          if (isSpin) {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_y - 5 - _tWidth + opts.width / 2, -_x - 5 + opts.height / 2, _y + 5 + opts.width / 2, -_x + _tHeight + 5 + opts.height / 2];
            areav = [opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) - 5, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) - 5, opts.width - (opts.width / 2 - opts.height / 2) - (-_x + _tHeight + 5 + opts.height / 2) + _tHeight, opts.height / 2 - opts.width / 2 + (_y - 5 - _tWidth + opts.width / 2) + _tWidth + 5];
            _isCollision = collisionNew(areav, points, opts.height, opts.width);
          } else {
            _x = normalInt(-opts.width / 2, opts.width / 2, 5) - _tWidth / 2;
            _y = normalInt(-opts.height / 2, opts.height / 2, 5) + _tHeight / 2;
            _area = [_x - 5 + opts.width / 2, _y - 5 - _tHeight + opts.height / 2, _x + _tWidth + 5 + opts.width / 2, _y + 5 + opts.height / 2];
            _isCollision = collisionNew(_area, points, opts.width, opts.height);
          }
          if (!_isCollision) break;
          if (_breaknum == 1000) {
            _area = [-1000, -1000, -1000, -1000];
            break;
          }
        };
        if (isSpin) {
          points[_i22].area = areav;
          points[_i22].areav = _area;
        } else {
          points[_i22].area = _area;
        }
        points[_i22].rotate = isSpin;
      };
      break;}

  return points;
}


function drawWordCloudDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var wordOption = assign({}, {
    type: 'normal',
    autoColors: true },
  opts.extra.word);

  context.beginPath();
  context.setFillStyle(opts.background || '#FFFFFF');
  context.rect(0, 0, opts.width, opts.height);
  context.fill();
  context.save();
  var points = opts.chartData.wordCloudData;
  context.translate(opts.width / 2, opts.height / 2);

  for (var i = 0; i < points.length; i++) {
    context.save();
    if (points[i].rotate) {
      context.rotate(90 * Math.PI / 180);
    }
    var text = points[i].name;
    var tHeight = points[i].textSize;
    var tWidth = measureText(text, tHeight);
    context.beginPath();
    context.setStrokeStyle(points[i].color);
    context.setFillStyle(points[i].color);
    context.setFontSize(tHeight);
    if (points[i].rotate) {
      if (points[i].areav[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].areav[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].areav[1] + 5 + tHeight - opts.height / 2) * process);
        }
      }
    } else {
      if (points[i].area[0] > 0) {
        if (opts.tooltip) {
          if (opts.tooltip.index == i) {
            context.strokeText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          } else {
            context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
          }
        } else {
          context.fillText(text, (points[i].area[0] + 5 - opts.width / 2) * process - tWidth * (1 - process) / 2, (points[i].area[1] + 5 + tHeight - opts.height / 2) * process);
        }

      }
    }

    context.stroke();
    context.restore();
  }
  context.restore();
}

function drawFunnelDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var funnelOption = assign({}, {
    activeWidth: 10,
    activeOpacity: 0.3,
    border: false,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    fillOpacity: 1,
    labelAlign: 'right' },
  opts.extra.funnel);
  var eachSpacing = (opts.height - opts.area[0] - opts.area[2]) / series.length;
  var centerPosition = {
    x: opts.area[3] + (opts.width - opts.area[1] - opts.area[3]) / 2,
    y: opts.height - opts.area[2] };

  var activeWidth = funnelOption.activeWidth;
  var radius = Math.min((opts.width - opts.area[1] - opts.area[3]) / 2 - activeWidth, (opts.height - opts.area[0] - opts.area[2]) / 2 - activeWidth);
  series = getFunnelDataPoints(series, radius, process);
  context.save();
  context.translate(centerPosition.x, centerPosition.y);
  for (var i = 0; i < series.length; i++) {
    if (i == 0) {
      if (opts.tooltip) {
        if (opts.tooltip.index == i) {
          context.beginPath();
          context.setFillStyle(hexToRgb(series[i].color, funnelOption.activeOpacity));
          context.moveTo(-activeWidth, 0);
          context.lineTo(-series[i].radius - activeWidth, -eachSpacing);
          context.lineTo(series[i].radius + activeWidth, -eachSpacing);
          context.lineTo(activeWidth, 0);
          context.lineTo(-activeWidth, 0);
          context.closePath();
          context.fill();
        }
      }
      series[i].funnelArea = [centerPosition.x - series[i].radius, centerPosition.y - eachSpacing, centerPosition.x + series[i].radius, centerPosition.y];
      context.beginPath();
      context.setLineWidth(funnelOption.borderWidth * opts.pixelRatio);
      context.setStrokeStyle(funnelOption.borderColor);
      context.setFillStyle(hexToRgb(series[i].color, funnelOption.fillOpacity));
      context.moveTo(0, 0);
      context.lineTo(-series[i].radius, -eachSpacing);
      context.lineTo(series[i].radius, -eachSpacing);
      context.lineTo(0, 0);
      context.closePath();
      context.fill();
      if (funnelOption.border == true) {
        context.stroke();
      }
    } else {
      if (opts.tooltip) {
        if (opts.tooltip.index == i) {
          context.beginPath();
          context.setFillStyle(hexToRgb(series[i].color, funnelOption.activeOpacity));
          context.moveTo(0, 0);
          context.lineTo(-series[i - 1].radius - activeWidth, 0);
          context.lineTo(-series[i].radius - activeWidth, -eachSpacing);
          context.lineTo(series[i].radius + activeWidth, -eachSpacing);
          context.lineTo(series[i - 1].radius + activeWidth, 0);
          context.lineTo(0, 0);
          context.closePath();
          context.fill();
        }
      }
      series[i].funnelArea = [centerPosition.x - series[i].radius, centerPosition.y - eachSpacing * (i + 1), centerPosition.x + series[i].radius, centerPosition.y - eachSpacing * i];
      context.beginPath();
      context.setLineWidth(funnelOption.borderWidth * opts.pixelRatio);
      context.setStrokeStyle(funnelOption.borderColor);
      context.setFillStyle(hexToRgb(series[i].color, funnelOption.fillOpacity));
      context.moveTo(0, 0);
      context.lineTo(-series[i - 1].radius, 0);
      context.lineTo(-series[i].radius, -eachSpacing);
      context.lineTo(series[i].radius, -eachSpacing);
      context.lineTo(series[i - 1].radius, 0);
      context.lineTo(0, 0);
      context.closePath();
      context.fill();
      if (funnelOption.border == true) {
        context.stroke();
      }
    }
    context.translate(0, -eachSpacing);
  }
  context.restore();

  if (opts.dataLabel !== false && process === 1) {
    drawFunnelText(series, opts, context, eachSpacing, funnelOption.labelAlign, activeWidth, centerPosition);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series };

}

function drawFunnelText(series, opts, context, eachSpacing, labelAlign, activeWidth, centerPosition) {
  for (var i = 0; i < series.length; i++) {
    var item = series[i];
    var startX = void 0,endX = void 0,startY = void 0,fontSize = void 0;
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    if (labelAlign == 'right') {
      if (i == 0) {
        startX = (item.funnelArea[2] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[2] + series[i - 1].funnelArea[2]) / 2;
      }
      endX = startX + activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize || opts.fontSize;
      context.setLineWidth(1 * opts.pixelRatio);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || '#666666');
      context.fillText(text, endX + 5, startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    } else {
      if (i == 0) {
        startX = (item.funnelArea[0] + centerPosition.x) / 2;
      } else {
        startX = (item.funnelArea[0] + series[i - 1].funnelArea[0]) / 2;
      }
      endX = startX - activeWidth * 2;
      startY = item.funnelArea[1] + eachSpacing / 2;
      fontSize = item.textSize || opts.fontSize;
      context.setLineWidth(1 * opts.pixelRatio);
      context.setStrokeStyle(item.color);
      context.setFillStyle(item.color);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, startY);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(endX, startY);
      context.arc(endX, startY, 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
      context.beginPath();
      context.setFontSize(fontSize);
      context.setFillStyle(item.textColor || '#666666');
      context.fillText(text, endX - 5 - measureText(text), startY + fontSize / 2 - 2);
      context.closePath();
      context.stroke();
      context.closePath();
    }

  }
}


function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },
  linear: function linear(pos) {
    return pos;
  } };


function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'linear';
  var delay = 17;

  function createAnimationFrame() {
    if (typeof setTimeout !== 'undefined') {
      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else {
      return function (step) {
        step(null);
      };
    }
  };
  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;
  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }
    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }
    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);

      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };
  _step = _step.bind(this);
  animationFrame(_step, delay);
}

// stop animation immediately
// and tigger onAnimationFinish
Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;
  var series = opts.series;
  var categories = opts.categories;
  series = fillSeries(series, opts, config);
  var duration = opts.animation ? opts.duration : 0;
  _this.animationInstance && _this.animationInstance.stop();
  var seriesMA = null;
  if (type == 'candle') {
    var average = assign({}, opts.extra.candle.average);
    if (average.show) {
      seriesMA = calCandleMA(average.day, average.name, average.color, series[0].data);
      seriesMA = fillSeries(seriesMA, opts, config);
      opts.seriesMA = seriesMA;
    } else if (opts.seriesMA) {
      seriesMA = opts.seriesMA = fillSeries(opts.seriesMA, opts, config);
    } else {
      seriesMA = series;
    }
  } else {
    seriesMA = series;
  }

  /* 过滤掉show=false的series */
  opts._series_ = series = filterSeries(series);

  //重新计算图表区域

  opts.area = new Array(4);
  //复位绘图区域
  for (var j = 0; j < 4; j++) {
    opts.area[j] = opts.padding[j];
  }

  //通过计算三大区域：图例、X轴、Y轴的大小，确定绘图区域
  var _calLegendData = calLegendData(seriesMA, opts, config, opts.chartData),
  legendHeight = _calLegendData.area.wholeHeight,
  legendWidth = _calLegendData.area.wholeWidth;

  switch (opts.legend.position) {
    case 'top':
      opts.area[0] += legendHeight;
      break;
    case 'bottom':
      opts.area[2] += legendHeight;
      break;
    case 'left':
      opts.area[3] += legendWidth;
      break;
    case 'right':
      opts.area[1] += legendWidth;
      break;}


  var _calYAxisData = {},yAxisWidth = 0;
  if (opts.type === 'line' || opts.type === 'column' || opts.type === 'area' || opts.type === 'mix' || opts.type === 'candle') {
    _calYAxisData = calYAxisData(series, opts, config);
    yAxisWidth = _calYAxisData.yAxisWidth;
    //如果显示Y轴标题
    if (opts.yAxis.showTitle) {
      var maxTitleHeight = 0;
      for (var i = 0; i < opts.yAxis.data.length; i++) {
        maxTitleHeight = Math.max(maxTitleHeight, opts.yAxis.data[i].titleFontSize ? opts.yAxis.data[i].titleFontSize : config.fontSize);
      }
      opts.area[0] += (maxTitleHeight + 6) * opts.pixelRatio;
    }
    var rightIndex = 0,leftIndex = 0;
    //计算主绘图区域左右位置
    for (var _i23 = 0; _i23 < yAxisWidth.length; _i23++) {
      if (yAxisWidth[_i23].position == 'left') {
        if (leftIndex > 0) {
          opts.area[3] += yAxisWidth[_i23].width + opts.yAxis.padding;
        } else {
          opts.area[3] += yAxisWidth[_i23].width;
        }
        leftIndex += 1;
      } else {
        if (rightIndex > 0) {
          opts.area[1] += yAxisWidth[_i23].width + opts.yAxis.padding;
        } else {
          opts.area[1] += yAxisWidth[_i23].width;
        }
        rightIndex += 1;
      }
    }
  } else {
    config.yAxisWidth = yAxisWidth;
  }
  opts.chartData.yAxisData = _calYAxisData;

  if (opts.categories && opts.categories.length) {
    opts.chartData.xAxisData = getXAxisPoints(opts.categories, opts, config);
    var _calCategoriesData = calCategoriesData(opts.categories, opts, config, opts.chartData.xAxisData.eachSpacing),
    xAxisHeight = _calCategoriesData.xAxisHeight,
    angle = _calCategoriesData.angle;
    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
    opts.area[2] += xAxisHeight;
    opts.chartData.categoriesData = _calCategoriesData;
  } else {
    if (opts.type === 'line' || opts.type === 'area' || opts.type === 'points') {
      opts.chartData.xAxisData = calXAxisData(series, opts, config);
      categories = opts.chartData.xAxisData.rangesFormat;
      var _calCategoriesData2 = calCategoriesData(categories, opts, config, opts.chartData.xAxisData.eachSpacing),
      _xAxisHeight = _calCategoriesData2.xAxisHeight,
      _angle = _calCategoriesData2.angle;
      config.xAxisHeight = _xAxisHeight;
      config._xAxisTextAngle_ = _angle;
      opts.area[2] += _xAxisHeight;
      opts.chartData.categoriesData = _calCategoriesData2;
    } else {
      opts.chartData.xAxisData = {
        xAxisPoints: [] };

    }
  }
  //计算右对齐偏移距离
  if (opts.enableScroll && opts.xAxis.scrollAlign == 'right' && opts._scrollDistance_ === undefined) {
    var offsetLeft = 0,
    xAxisPoints = opts.chartData.xAxisData.xAxisPoints,
    startX = opts.chartData.xAxisData.startX,
    endX = opts.chartData.xAxisData.endX,
    eachSpacing = opts.chartData.xAxisData.eachSpacing;
    var totalWidth = eachSpacing * (xAxisPoints.length - 1);
    var screenWidth = endX - startX;
    offsetLeft = screenWidth - totalWidth;
    _this.scrollOption = {
      currentOffset: offsetLeft,
      startTouchX: offsetLeft,
      distance: 0,
      lastMoveTime: 0 };

    opts._scrollDistance_ = offsetLeft;
  }

  if (type === 'pie' || type === 'ring' || type === 'rose') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(seriesMA);
  }

  switch (type) {
    case 'word':
      var wordOption = assign({}, {
        type: 'normal',
        autoColors: true },
      opts.extra.word);
      if (opts.updateData == true || opts.updateData == undefined) {
        opts.chartData.wordCloudData = getWordCloudPoint(opts, wordOption.type);
      }
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawWordCloudDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'map':
      context.clearRect(0, 0, opts.width, opts.height);
      drawMapDataPoints(series, opts, config, context);
      break;
    case 'funnel':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.funnelData = drawFunnelDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'line':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawLineDataPoints.xAxisPoints,
          calPoints = _drawLineDataPoints.calPoints,
          eachSpacing = _drawLineDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);

        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'mix':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawMixDataPoints = drawMixDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawMixDataPoints.xAxisPoints,
          calPoints = _drawMixDataPoints.calPoints,
          eachSpacing = _drawMixDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'column':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawColumnDataPoints.xAxisPoints,
          calPoints = _drawColumnDataPoints.calPoints,
          eachSpacing = _drawColumnDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'area':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
          xAxisPoints = _drawAreaDataPoints.xAxisPoints,
          calPoints = _drawAreaDataPoints.calPoints,
          eachSpacing = _drawAreaDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'ring':
    case 'pie':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'rose':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.pieData = drawRoseDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'radar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context, opts.chartData);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'arcbar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.arcbarData = drawArcbarDataPoints(series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'gauge':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          opts.chartData.gaugeData = drawGaugeDataPoints(categories, series, opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;
    case 'candle':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          context.clearRect(0, 0, opts.width, opts.height);
          if (opts.rotate) {
            contextRotate(context, opts);
          }
          drawYAxisGrid(categories, opts, config, context);
          drawXAxis(categories, opts, config, context);
          var _drawCandleDataPoints = drawCandleDataPoints(series, seriesMA, opts, config, context, process),
          xAxisPoints = _drawCandleDataPoints.xAxisPoints,
          calPoints = _drawCandleDataPoints.calPoints,
          eachSpacing = _drawCandleDataPoints.eachSpacing;
          opts.chartData.xAxisPoints = xAxisPoints;
          opts.chartData.calPoints = calPoints;
          opts.chartData.eachSpacing = eachSpacing;
          drawYAxis(series, opts, config, context);
          if (opts.enableMarkLine !== false && process === 1) {
            drawMarkLine(opts, config, context);
          }
          if (seriesMA) {
            drawLegend(seriesMA, opts, config, context, opts.chartData);
          } else {
            drawLegend(opts.series, opts, config, context, opts.chartData);
          }
          drawToolTipBridge(opts, config, context, process, eachSpacing, xAxisPoints);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        } });

      break;}

}

// simple event implement

function Event() {
  this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Event.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0];
  var params = args.slice(1);
  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        console.error(e);
      }
    });
  }
};

var Charts = function Charts(opts) {
  opts.pixelRatio = opts.pixelRatio ? opts.pixelRatio : 1;
  opts.fontSize = opts.fontSize ? opts.fontSize * opts.pixelRatio : 13 * opts.pixelRatio;
  opts.title = assign({}, opts.title);
  opts.subtitle = assign({}, opts.subtitle);
  opts.duration = opts.duration ? opts.duration : 1000;
  opts.yAxis = assign({}, {
    data: [],
    showTitle: false,
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    gridType: 'solid',
    dashLength: 4 * opts.pixelRatio,
    gridColor: '#cccccc',
    padding: 10,
    fontColor: '#666666' },
  opts.yAxis);
  opts.yAxis.dashLength *= opts.pixelRatio;
  opts.yAxis.padding *= opts.pixelRatio;
  opts.xAxis = assign({}, {
    rotateLabel: false,
    type: 'calibration',
    gridType: 'solid',
    dashLength: 4,
    scrollAlign: 'left',
    boundaryGap: 'center',
    axisLine: true,
    axisLineColor: '#cccccc' },
  opts.xAxis);
  opts.xAxis.dashLength *= opts.pixelRatio;
  opts.legend = assign({}, {
    show: true,
    position: 'bottom',
    float: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    padding: 5,
    margin: 5,
    itemGap: 10,
    fontSize: opts.fontSize,
    lineHeight: opts.fontSize,
    fontColor: '#333333',
    format: {},
    hiddenColor: '#CECECE' },
  opts.legend);
  opts.legend.borderWidth = opts.legend.borderWidth * opts.pixelRatio;
  opts.legend.itemGap = opts.legend.itemGap * opts.pixelRatio;
  opts.legend.padding = opts.legend.padding * opts.pixelRatio;
  opts.legend.margin = opts.legend.margin * opts.pixelRatio;
  opts.extra = assign({}, opts.extra);
  opts.rotate = opts.rotate ? true : false;
  opts.animation = opts.animation ? true : false;
  opts.rotate = opts.rotate ? true : false;

  var config$$1 = JSON.parse(JSON.stringify(config));
  config$$1.colors = opts.colors ? opts.colors : config$$1.colors;
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  if (opts.type == 'pie' || opts.type == 'ring') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.pie.labelWidth * opts.pixelRatio || config$$1.pieChartLinePadding * opts.pixelRatio;
  }
  if (opts.type == 'rose') {
    config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : opts.extra.rose.labelWidth * opts.pixelRatio || config$$1.pieChartLinePadding * opts.pixelRatio;
  }
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding * opts.pixelRatio;
  config$$1.yAxisSplit = opts.yAxis.splitNumber ? opts.yAxis.splitNumber : config.yAxisSplit;

  //屏幕旋转
  config$$1.rotate = opts.rotate;
  if (opts.rotate) {
    var tempWidth = opts.width;
    var tempHeight = opts.height;
    opts.width = tempHeight;
    opts.height = tempWidth;
  }

  //适配高分屏
  opts.padding = opts.padding ? opts.padding : config$$1.padding;
  for (var i = 0; i < 4; i++) {
    opts.padding[i] *= opts.pixelRatio;
  }
  config$$1.yAxisWidth = config.yAxisWidth * opts.pixelRatio;
  config$$1.xAxisHeight = config.xAxisHeight * opts.pixelRatio;
  if (opts.enableScroll && opts.xAxis.scrollShow) {
    config$$1.xAxisHeight += 6 * opts.pixelRatio;
  }
  config$$1.xAxisLineHeight = config.xAxisLineHeight * opts.pixelRatio;
  config$$1.fontSize = opts.fontSize;
  config$$1.titleFontSize = config.titleFontSize * opts.pixelRatio;
  config$$1.subtitleFontSize = config.subtitleFontSize * opts.pixelRatio;
  config$$1.toolTipPadding = config.toolTipPadding * opts.pixelRatio;
  config$$1.toolTipLineHeight = config.toolTipLineHeight * opts.pixelRatio;
  config$$1.columePadding = config.columePadding * opts.pixelRatio;
  opts.$this = opts.$this ? opts.$this : this;

  this.context = uni.createCanvasContext(opts.canvasId, opts.$this);
  /* 兼容原生H5
                                                                     this.context = document.getElementById(opts.canvasId).getContext("2d");
                                                                     this.context.setStrokeStyle = function(e){ return this.strokeStyle=e; }
                                                                     this.context.setLineWidth = function(e){ return this.lineWidth=e; }
                                                                     this.context.setLineCap = function(e){ return this.lineCap=e; }
                                                                     this.context.setFontSize = function(e){ return this.font=e+"px sans-serif"; }
                                                                     this.context.setFillStyle = function(e){ return this.fillStyle=e; }
                                                                     this.context.draw = function(){ }
                                                                     */

  opts.chartData = {};
  this.event = new Event();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0,
    lastMoveTime: 0 };


  this.opts = opts;
  this.config = config$$1;

  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

Charts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts = assign({}, this.opts, data);
  this.opts.updateData = true;
  var scrollPosition = data.scrollPosition || 'current';
  switch (scrollPosition) {
    case 'current':
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      break;
    case 'left':
      this.opts._scrollDistance_ = 0;
      this.scrollOption = {
        currentOffset: 0,
        startTouchX: 0,
        distance: 0,
        lastMoveTime: 0 };

      break;
    case 'right':
      var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config),
      yAxisWidth = _calYAxisData.yAxisWidth;
      this.config.yAxisWidth = yAxisWidth;
      var offsetLeft = 0;
      var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
      xAxisPoints = _getXAxisPoints0.xAxisPoints,
      startX = _getXAxisPoints0.startX,
      endX = _getXAxisPoints0.endX,
      eachSpacing = _getXAxisPoints0.eachSpacing;
      var totalWidth = eachSpacing * (xAxisPoints.length - 1);
      var screenWidth = endX - startX;
      offsetLeft = screenWidth - totalWidth;
      this.scrollOption = {
        currentOffset: offsetLeft,
        startTouchX: offsetLeft,
        distance: 0,
        lastMoveTime: 0 };

      this.opts._scrollDistance_ = offsetLeft;
      break;}

  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.zoom = function () {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opts.xAxis.itemCount;
  if (this.opts.enableScroll !== true) {
    console.log('请启用滚动条后使用！');
    return;
  }
  //当前屏幕中间点
  var centerPoint = Math.round(Math.abs(this.scrollOption.currentOffset) / this.opts.chartData.eachSpacing) + Math.round(
  this.opts.xAxis.itemCount / 2);
  this.opts.animation = false;
  this.opts.xAxis.itemCount = val.itemCount;
  //重新计算x轴偏移距离
  var _calYAxisData = calYAxisData(this.opts.series, this.opts, this.config),
  yAxisWidth = _calYAxisData.yAxisWidth;
  this.config.yAxisWidth = yAxisWidth;
  var offsetLeft = 0;
  var _getXAxisPoints0 = getXAxisPoints(this.opts.categories, this.opts, this.config),
  xAxisPoints = _getXAxisPoints0.xAxisPoints,
  startX = _getXAxisPoints0.startX,
  endX = _getXAxisPoints0.endX,
  eachSpacing = _getXAxisPoints0.eachSpacing;
  var centerLeft = eachSpacing * centerPoint;
  var screenWidth = endX - startX;
  var MaxLeft = screenWidth - eachSpacing * (xAxisPoints.length - 1);
  offsetLeft = screenWidth / 2 - centerLeft;
  if (offsetLeft > 0) {
    offsetLeft = 0;
  }
  if (offsetLeft < MaxLeft) {
    offsetLeft = MaxLeft;
  }
  this.scrollOption = {
    currentOffset: offsetLeft,
    startTouchX: offsetLeft,
    distance: 0,
    lastMoveTime: 0 };

  this.opts._scrollDistance_ = offsetLeft;
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose') {
      return findPieChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.pieData);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.radarData, this.opts.categories.length);
    } else if (this.opts.type === 'funnel') {
      return findFunnelChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.funnelData);
    } else if (this.opts.type === 'map') {
      return findMapChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts);
    } else if (this.opts.type === 'word') {
      return findWordChartCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.wordCloudData);
    } else {
      return findCurrentIndex({
        x: _touches$.x,
        y: _touches$.y },
      this.opts.chartData.calPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }
  return -1;
};

Charts.prototype.getLegendDataIndex = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    return findLegendIndex({
      x: _touches$.x,
      y: _touches$.y },
    this.opts.chartData.legendData);
  }
  return -1;
};

Charts.prototype.touchLegend = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches) {
    var _touches$ = getTouches(touches, this.opts, e);
    var index = this.getLegendDataIndex(e);
    if (index >= 0) {
      this.opts.series[index].show = !this.opts.series[index].show;
      this.opts.animation = option.animation ? true : false;
      this.opts._scrollDistance_ = this.scrollOption.currentOffset;
      drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
    }
  }

};

Charts.prototype.showToolTip = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (!touches) {
    console.log("touchError");
  }
  var _touches$ = getTouches(touches, this.opts, e);
  var currentOffset = this.scrollOption.currentOffset;
  var opts = assign({}, this.opts, {
    _scrollDistance_: currentOffset,
    animation: false });

  if (this.opts.type === 'line' || this.opts.type === 'area' || this.opts.type === 'column') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.opts.chartData.calPoints, index, this.opts.categories, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'mix') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getMixToolTipData = getMixToolTipData(seriesData, this.opts.chartData.calPoints, index, this.opts.categories, option),
        textList = _getMixToolTipData.textList,
        offset = _getMixToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'candle') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var _getToolTipData = getCandleToolTipData(this.opts.series[0].data, seriesData, this.opts.chartData.calPoints,
        index, this.opts.categories, this.opts.extra.candle, option),
        textList = _getToolTipData.textList,
        offset = _getToolTipData.offset;
        offset.y = _touches$.y;
        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'pie' || this.opts.type === 'ring' || this.opts.type === 'rose' || this.opts.type === 'funnel') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = this.opts._series_[index];
      var textList = [{
        text: option.format ? option.format(seriesData) : seriesData.name + ': ' + seriesData.data,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: textList,
        offset: offset,
        option: option,
        index: index };

    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'map' || this.opts.type === 'word') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = this.opts._series_[index];
      var textList = [{
        text: option.format ? option.format(seriesData) : seriesData.properties.name,
        color: seriesData.color }];

      var offset = {
        x: _touches$.x,
        y: _touches$.y };

      opts.tooltip = {
        textList: textList,
        offset: offset,
        option: option,
        index: index };

    }
    opts.updateData = false;
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
  if (this.opts.type === 'radar') {
    var index = this.getCurrentDataIndex(e);
    if (index > -1) {
      var currentOffset = this.scrollOption.currentOffset;
      var opts = assign({}, this.opts, {
        _scrollDistance_: currentOffset,
        animation: false });

      var seriesData = getSeriesDataItem(this.opts.series, index);
      if (seriesData.length !== 0) {
        var textList = seriesData.map(function (item) {
          return {
            text: option.format ? option.format(item) : item.name + ': ' + item.data,
            color: item.color };

        });
        var offset = {
          x: _touches$.x,
          y: _touches$.y };

        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option,
          index: index };

      }
    }
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.translate = function (distance) {
  this.scrollOption = {
    currentOffset: distance,
    startTouchX: distance,
    distance: 0,
    lastMoveTime: 0 };

  var opts = assign({}, this.opts, {
    _scrollDistance_: distance,
    animation: false });

  drawCharts.call(this, this.opts.type, opts, this.config, this.context);
};

Charts.prototype.scrollStart = function (e) {
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  var _touches$ = getTouches(touches, this.opts, e);
  if (touches && this.opts.enableScroll === true) {
    this.scrollOption.startTouchX = _touches$.x;
  }
};

Charts.prototype.scroll = function (e) {
  if (this.scrollOption.lastMoveTime === 0) {
    this.scrollOption.lastMoveTime = Date.now();
  }
  var Limit = this.opts.extra.touchMoveLimit || 20;
  var currMoveTime = Date.now();
  var duration = currMoveTime - this.scrollOption.lastMoveTime;
  if (duration < Math.floor(1000 / Limit)) return;
  this.scrollOption.lastMoveTime = currMoveTime;
  var touches = null;
  if (e.changedTouches) {
    touches = e.changedTouches[0];
  } else {
    touches = e.mp.changedTouches[0];
  }
  if (touches && this.opts.enableScroll === true) {
    var _touches$ = getTouches(touches, this.opts, e);
    var _distance;
    _distance = _touches$.x - this.scrollOption.startTouchX;
    var currentOffset = this.scrollOption.currentOffset;
    var validDistance = calValidDistance(this, currentOffset + _distance, this.opts.chartData, this.config, this.opts);
    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false });

    drawCharts.call(this, opts.type, opts, this.config, this.context);
    return currentOffset + _distance;
  }
};

Charts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
    currentOffset = _scrollOption.currentOffset,
    distance = _scrollOption.distance;
    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
  }
};
if ( true && typeof module.exports === "object") {
  module.exports = Charts;
  //export default Charts;//建议使用nodejs的module导出方式，如报错请使用export方式导出
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!***************************************!*\
  !*** X:/毕业设计/MilkBusiness/pages.json ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001","_id":"@dcloudio/uni-stat@2.0.0-v3-24020191018001","_inBundle":false,"_integrity":"sha512-nYBm5pRrYzrj2dKMqucWSF2PwInUMnn3MLHM/ik3gnLUEKSW61rzcY1RPlUwaH7c+Snm6N+bAJzmj3GvlrlVXA==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"^2.0.0-alpha-24420191128001","saveSpec":null,"fetchSpec":"^2.0.0-alpha-24420191128001"},"_requiredBy":["/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-v3-24020191018001.tgz","_shasum":"6ef04326cc0b945726413eebe442ab8f47c7536c","_spec":"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"197e8df53cc9d4c3f6eb722b918ccf51672b5cfe","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-v3-24020191018001"};

/***/ }),

/***/ 7:
/*!********************************************************!*\
  !*** X:/毕业设计/MilkBusiness/pages.json?{"type":"style"} ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/booth/booth": { "navigationBarTitleText": "奶位监测" }, "pages/environment/environment": { "navigationBarTitleText": "环境监测" }, "pages/member/member": { "navigationBarTitleText": "会员分析" }, "pages/count/count": { "navigationBarTitleText": "账单分析" }, "pages/other/detail": {}, "pages/other/memberdetail": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "毕业设计-智能鲜奶贩卖机", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!*******************************************************!*\
  !*** X:/毕业设计/MilkBusiness/pages.json?{"type":"stat"} ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__F311A02" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map