var __wxAppData = {};
var __wxRoute;
var __wxRouteBegin;
var __wxAppCode__ = {};
var global = {};
var __wxAppCurrentFile__;
if(typeof __WXML_GLOBAL__ !== 'undefined'){
  delete __WXML_GLOBAL__.ops_cached//remove ops_cached(v8 下会有 cache)
}
// var Component = Component || function() {};
// var definePlugin = definePlugin || function() {};
// var requirePlugin = requirePlugin || function() {};
// var Behavior = Behavior || function() {};
var $gwx;
  
/*v0.5vv_20190703_syb_scopedata*/global.__wcc_version__='v0.5vv_20190703_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, r, c){
p.extraAttr = {"t_action": a, "t_rawid": r };
if ( typeof(c) != 'undefined' ) p.extraAttr.t_cid = c;
}

function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^getCode']],[[4],[[5],[[4],[[5],[1,'getScanCode']]]]]]]]])
Z([3,'1'])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
function gz$gwx_10(){
if( __WXML_GLOBAL__.ops_cached.$gwx_10)return __WXML_GLOBAL__.ops_cached.$gwx_10
__WXML_GLOBAL__.ops_cached.$gwx_10=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_10);return __WXML_GLOBAL__.ops_cached.$gwx_10
}
function gz$gwx_11(){
if( __WXML_GLOBAL__.ops_cached.$gwx_11)return __WXML_GLOBAL__.ops_cached.$gwx_11
__WXML_GLOBAL__.ops_cached.$gwx_11=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_11);return __WXML_GLOBAL__.ops_cached.$gwx_11
}
function gz$gwx_12(){
if( __WXML_GLOBAL__.ops_cached.$gwx_12)return __WXML_GLOBAL__.ops_cached.$gwx_12
__WXML_GLOBAL__.ops_cached.$gwx_12=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_12);return __WXML_GLOBAL__.ops_cached.$gwx_12
}
function gz$gwx_13(){
if( __WXML_GLOBAL__.ops_cached.$gwx_13)return __WXML_GLOBAL__.ops_cached.$gwx_13
__WXML_GLOBAL__.ops_cached.$gwx_13=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_13);return __WXML_GLOBAL__.ops_cached.$gwx_13
}
function gz$gwx_14(){
if( __WXML_GLOBAL__.ops_cached.$gwx_14)return __WXML_GLOBAL__.ops_cached.$gwx_14
__WXML_GLOBAL__.ops_cached.$gwx_14=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_14);return __WXML_GLOBAL__.ops_cached.$gwx_14
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./components/p-scan/scan.wxml','./pages/QRcode/QRcode.wxml','./pages/QRcode/detail.wxml','./pages/guide/guide.wxml','./pages/guide/index.wxml','./pages/login/index.wxml','./pages/login/login.wxml','./pages/login/register.wxml','./pages/me/about.wxml','./pages/me/bill.wxml','./pages/me/help.wxml','./pages/me/me.wxml','./pages/me/rfid.wxml','./pages/me/wealth.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
var xC=_mz(z,'scan',['bind:__l',0,'bind:getCode',1,'data-event-opts',1,'vueId',2],[],e,s,gg)
_(r,xC)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
d_[x[9]]={}
var m9=function(e,s,r,gg){
var z=gz$gwx_10()
return r
}
e_[x[9]]={f:m9,j:[],i:[],ti:[],ic:[]}
d_[x[10]]={}
var m10=function(e,s,r,gg){
var z=gz$gwx_11()
return r
}
e_[x[10]]={f:m10,j:[],i:[],ti:[],ic:[]}
d_[x[11]]={}
var m11=function(e,s,r,gg){
var z=gz$gwx_12()
return r
}
e_[x[11]]={f:m11,j:[],i:[],ti:[],ic:[]}
d_[x[12]]={}
var m12=function(e,s,r,gg){
var z=gz$gwx_13()
return r
}
e_[x[12]]={f:m12,j:[],i:[],ti:[],ic:[]}
d_[x[13]]={}
var m13=function(e,s,r,gg){
var z=gz$gwx_14()
return r
}
e_[x[13]]={f:m13,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(err)
}
return root;
}
}
}



__wxAppCode__['app.json']={"pages":["pages/guide/index","pages/guide/guide","pages/login/login","pages/login/register","pages/me/me","pages/QRcode/QRcode","pages/me/bill","pages/me/rfid","pages/me/wealth","pages/me/help","pages/me/about","pages/QRcode/detail","pages/login/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"毕业设计-智能鲜奶贩卖机","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#bbbbbb","borderStyle":"white","selectedColor":"#4191ea","backgroundColor":"#FFFFFF","position":"bottom","list":[{"pagePath":"pages/QRcode/QRcode","iconPath":"static/tab/scan_n.png","selectedIconPath":"static/tab/scan_h.png","text":"溯源"},{"pagePath":"pages/me/me","iconPath":"static/tab/me_n.png","selectedIconPath":"static/tab/me_h.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"智能鲜奶机","compilerVersion":"2.4.6","usingComponents":{"scan":"/components/p-scan/scan"}};
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['components/p-scan/scan.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/p-scan/scan.wxml']=$gwx('./components/p-scan/scan.wxml');

__wxAppCode__['pages/guide/guide.json']={"navigationBarTitleText":"启动介绍页","navigationStyle":"custom","titleNView":false,"bounce":"none","usingComponents":{}};
__wxAppCode__['pages/guide/guide.wxml']=$gwx('./pages/guide/guide.wxml');

__wxAppCode__['pages/guide/index.json']={"navigationBarTitleText":"启动页","navigationStyle":"custom","titleNView":false,"usingComponents":{}};
__wxAppCode__['pages/guide/index.wxml']=$gwx('./pages/guide/index.wxml');

__wxAppCode__['pages/login/index.json']={"usingComponents":{}};
__wxAppCode__['pages/login/index.wxml']=$gwx('./pages/login/index.wxml');

__wxAppCode__['pages/login/login.json']={"navigationBarTitleText":"登录","navigationStyle":"custom","usingComponents":{}};
__wxAppCode__['pages/login/login.wxml']=$gwx('./pages/login/login.wxml');

__wxAppCode__['pages/login/register.json']={"navigationBarTitleText":"注册","navigationStyle":"custom","usingComponents":{}};
__wxAppCode__['pages/login/register.wxml']=$gwx('./pages/login/register.wxml');

__wxAppCode__['pages/me/about.json']={"navigationBarTitleText":"关于我们","usingComponents":{}};
__wxAppCode__['pages/me/about.wxml']=$gwx('./pages/me/about.wxml');

__wxAppCode__['pages/me/bill.json']={"navigationBarTitleText":"消费记录","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"22px"}]},"usingComponents":{}};
__wxAppCode__['pages/me/bill.wxml']=$gwx('./pages/me/bill.wxml');

__wxAppCode__['pages/me/help.json']={"navigationBarTitleText":"帮助中心","usingComponents":{}};
__wxAppCode__['pages/me/help.wxml']=$gwx('./pages/me/help.wxml');

__wxAppCode__['pages/me/me.json']={"navigationBarTitleText":"毕业设计-智能鲜奶贩卖机","titleNView":{"buttons":[{"text":"","fontSrc":"/static/iconfont.ttf","fontSize":"22px"}]},"usingComponents":{}};
__wxAppCode__['pages/me/me.wxml']=$gwx('./pages/me/me.wxml');

__wxAppCode__['pages/me/rfid.json']={"navigationBarTitleText":"卡片绑定","usingComponents":{}};
__wxAppCode__['pages/me/rfid.wxml']=$gwx('./pages/me/rfid.wxml');

__wxAppCode__['pages/me/wealth.json']={"navigationBarTitleText":"余额充值","usingComponents":{}};
__wxAppCode__['pages/me/wealth.wxml']=$gwx('./pages/me/wealth.wxml');

__wxAppCode__['pages/QRcode/detail.json']={"usingComponents":{}};
__wxAppCode__['pages/QRcode/detail.wxml']=$gwx('./pages/QRcode/detail.wxml');

__wxAppCode__['pages/QRcode/QRcode.json']={"navigationBarTitleText":"二维码扫描溯源","usingComponents":{"scan":"/components/p-scan/scan"}};
__wxAppCode__['pages/QRcode/QRcode.wxml']=$gwx('./pages/QRcode/QRcode.wxml');



define('common/main.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0ae2":function(n,e,t){"use strict";t.r(e);var o=t("800b"),u=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,function(){return o[n]})}(a);e["default"]=u.a},"1e74":function(n,e,t){"use strict";t.r(e);var o=t("0ae2");for(var u in o)"default"!==u&&function(n){t.d(e,n,function(){return o[n]})}(u);t("a7f5");var a,r,c=t("2877"),f=Object(c["a"])(o["default"],a,r,!1,null,null,null);e["default"]=f.exports},"800b":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={onLaunch:function(){console.log(n("App Launch"," at App.vue:4"))},onShow:function(){console.log(n("App Show"," at App.vue:7"))},onHide:function(){console.log(n("App Hide"," at App.vue:10"))}};e.default=t}).call(this,t("0de9")["default"])},a7f5:function(n,e,t){"use strict";var o=t("baf5"),u=t.n(o);u.a},baf5:function(n,e,t){},e314:function(n,e,t){"use strict";(function(n){t("8460"),t("921b");var e=u(t("66fd")),o=u(t("1e74"));function u(n){return n&&n.__esModule?n:{default:n}}function a(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),o.forEach(function(e){r(n,e,t[e])})}return n}function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var c=function(){return t.e("components/p-scan/scan").then(t.bind(null,"2260"))};e.default.component("scan",c),e.default.prototype.$url="http://106.54.76.24",e.default.config.productionTip=!1,o.default.mpType="app";var f=new e.default(a({},o.default));n(f).$mount()}).call(this,t("6e42")["createApp"])}},[["e314","common/runtime","common/vendor"]]]);
});
define('common/runtime.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(function (e) {
  function r(r) {
    for (var n, i, a = r[0], l = r[1], c = r[2], f = 0, s = []; f < a.length; f++) {
      i = a[f], o[i] && s.push(o[i][0]), o[i] = 0;
    }

    for (n in l) {
      Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
    }

    p && p(r);

    while (s.length) {
      s.shift()();
    }

    return u.push.apply(u, c || []), t();
  }

  function t() {
    for (var e, r = 0; r < u.length; r++) {
      for (var t = u[r], n = !0, i = 1; i < t.length; i++) {
        var l = t[i];
        0 !== o[l] && (n = !1);
      }

      n && (u.splice(r--, 1), e = a(a.s = t[0]));
    }

    return e;
  }

  var n = {},
      o = {
    "common/runtime": 0
  },
      u = [];

  function i(e) {
    return a.p + "" + e + ".js";
  }

  function a(r) {
    if (n[r]) return n[r].exports;
    var t = n[r] = {
      i: r,
      l: !1,
      exports: {}
    };
    return e[r].call(t.exports, t, t.exports, a), t.l = !0, t.exports;
  }

  a.e = function (e) {
    var r = [],
        t = o[e];
    if (0 !== t) if (t) r.push(t[2]);else {
      var n = new Promise(function (r, n) {
        t = o[e] = [r, n];
      });
      r.push(t[2] = n);
      var u,
          l = document.createElement("script");
      l.charset = "utf-8", l.timeout = 120, a.nc && l.setAttribute("nonce", a.nc), l.src = i(e), u = function u(r) {
        l.onerror = l.onload = null, clearTimeout(c);
        var t = o[e];

        if (0 !== t) {
          if (t) {
            var n = r && ("load" === r.type ? "missing" : r.type),
                u = r && r.target && r.target.src,
                i = new Error("Loading chunk " + e + " failed.\n(" + n + ": " + u + ")");
            i.type = n, i.request = u, t[1](i);
          }

          o[e] = void 0;
        }
      };
      var c = setTimeout(function () {
        u({
          type: "timeout",
          target: l
        });
      }, 12e4);
      l.onerror = l.onload = u, document.head.appendChild(l);
    }
    return Promise.all(r);
  }, a.m = e, a.c = n, a.d = function (e, r, t) {
    a.o(e, r) || Object.defineProperty(e, r, {
      enumerable: !0,
      get: t
    });
  }, a.r = function (e) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, a.t = function (e, r) {
    if (1 & r && (e = a(e)), 8 & r) return e;
    if (4 & r && "object" === typeof e && e && e.__esModule) return e;
    var t = Object.create(null);
    if (a.r(t), Object.defineProperty(t, "default", {
      enumerable: !0,
      value: e
    }), 2 & r && "string" != typeof e) for (var n in e) {
      a.d(t, n, function (r) {
        return e[r];
      }.bind(null, n));
    }
    return t;
  }, a.n = function (e) {
    var r = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return a.d(r, "a", r), r;
  }, a.o = function (e, r) {
    return Object.prototype.hasOwnProperty.call(e, r);
  }, a.p = "/", a.oe = function (e) {
    throw console.error(e), e;
  };
  var l = global["webpackJsonp"] = global["webpackJsonp"] || [],
      c = l.push.bind(l);
  l.push = r, l = l.slice();

  for (var f = 0; f < l.length; f++) {
    r(l[f]);
  }

  var p = c;
  t();
})([]);
});
define('common/vendor.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/vendor"],{"0de9":function(t,e,n){"use strict";function i(t){var e=Object.prototype.toString.call(t);return e.substring(8,e.length-1)}function r(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=e.map(function(t){var e=Object.prototype.toString.call(t);if("[object object]"===e.toLowerCase())try{t="---BEGIN:JSON---"+JSON.stringify(t)+"---END:JSON---"}catch(r){t="[object object]"}else if(null===t)t="---NULL---";else if(void 0===t)t="---UNDEFINED---";else{var n=i(t).toUpperCase();t="NUMBER"===n||"BOOLEAN"===n?"---BEGIN:"+n+"---"+t+"---END:"+n+"---":String(t)}return t}),a="";if(r.length>1){var o=r.pop();a=r.join("---COMMA---"),0===o.indexOf(" at ")?a+=o:a+="---COMMA---"+o}else a=r[0];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},"13f7":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={pages:{"pages/guide/index":{navigationBarTitleText:"启动页",navigationStyle:"custom",titleNView:!1},"pages/guide/guide":{navigationBarTitleText:"启动介绍页",navigationStyle:"custom",titleNView:!1,bounce:"none"},"pages/login/login":{navigationBarTitleText:"登录",navigationStyle:"custom"},"pages/login/register":{navigationBarTitleText:"注册",navigationStyle:"custom"},"pages/me/me":{navigationBarTitleText:"毕业设计-智能鲜奶贩卖机",titleNView:{buttons:[{text:"",fontSrc:"/static/iconfont.ttf",fontSize:"22px"}]}},"pages/QRcode/QRcode":{navigationBarTitleText:"二维码扫描溯源"},"pages/me/bill":{navigationBarTitleText:"消费记录",titleNView:{buttons:[{text:"",fontSrc:"/static/iconfont.ttf",fontSize:"22px"}]}},"pages/me/rfid":{navigationBarTitleText:"卡片绑定"},"pages/me/wealth":{navigationBarTitleText:"余额充值"},"pages/me/help":{navigationBarTitleText:"帮助中心"},"pages/me/about":{navigationBarTitleText:"关于我们"},"pages/QRcode/detail":{},"pages/login/index":{}},globalStyle:{navigationBarTextStyle:"black",navigationBarTitleText:"毕业设计-智能鲜奶贩卖机",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8"}};e.default=i},"16b7":function(t,e){t.exports="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMZaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA1OEYzNDYxMkM3NjExRUE4QTk3QTkzN0Q2NjdCRDBCIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1OEYzNDYwMkM3NjExRUE4QTk3QTkzN0Q2NjdCRDBCIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSI3NkM3RjdBNjNBODUyMDk3NTk1RDc0REMxRUZDNzkxOCIgc3RSZWY6ZG9jdW1lbnRJRD0iNzZDN0Y3QTYzQTg1MjA5NzU5NUQ3NERDMUVGQzc5MTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAM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"},2877:function(t,e,n){"use strict";function i(t,e,n,i,r,a,o,s){var l,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),i&&(c.functional=!0),a&&(c._scopeId="data-v-"+a),o?(l=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=l):r&&(l=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),l)if(c.functional){c._injectStyles=l;var u=c.render;c.render=function(t,e){return l.call(e),u(t,e)}}else{var h=c.beforeCreate;c.beforeCreate=h?[].concat(h,l):[l]}return{exports:t,options:c}}n.d(e,"a",function(){return i})},"66fd":function(t,e,n){"use strict";n.r(e),function(t){
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
var n=Object.freeze({});function i(t){return void 0===t||null===t}function r(t){return void 0!==t&&null!==t}function a(t){return!0===t}function o(t){return!1===t}function s(t){return"string"===typeof t||"number"===typeof t||"symbol"===typeof t||"boolean"===typeof t}function l(t){return null!==t&&"object"===typeof t}var c=Object.prototype.toString;function u(t){return"[object Object]"===c.call(t)}function h(t){return"[object RegExp]"===c.call(t)}function p(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function f(t){return r(t)&&"function"===typeof t.then&&"function"===typeof t.catch}function d(t){return null==t?"":Array.isArray(t)||u(t)&&t.toString===c?JSON.stringify(t,null,2):String(t)}function g(t){var e=parseFloat(t);return isNaN(e)?t:e}function v(t,e){for(var n=Object.create(null),i=t.split(","),r=0;r<i.length;r++)n[i[r]]=!0;return e?function(t){return n[t.toLowerCase()]}:function(t){return n[t]}}v("slot,component",!0);var A=v("key,ref,slot,slot-scope,is");function y(t,e){if(t.length){var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}var x=Object.prototype.hasOwnProperty;function m(t,e){return x.call(t,e)}function b(t){var e=Object.create(null);return function(n){var i=e[n];return i||(e[n]=t(n))}}var S=/-(\w)/g,w=b(function(t){return t.replace(S,function(t,e){return e?e.toUpperCase():""})}),P=b(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),T=/\B([A-Z])/g,I=b(function(t){return t.replace(T,"-$1").toLowerCase()});function C(t,e){function n(n){var i=arguments.length;return i?i>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n}function k(t,e){return t.bind(e)}var j=Function.prototype.bind?k:C;function D(t,e){e=e||0;var n=t.length-e,i=new Array(n);while(n--)i[n]=t[n+e];return i}function O(t,e){for(var n in e)t[n]=e[n];return t}function L(t){for(var e={},n=0;n<t.length;n++)t[n]&&O(e,t[n]);return e}function E(t,e,n){}var M=function(t,e,n){return!1},R=function(t){return t};function _(t,e){if(t===e)return!0;var n=l(t),i=l(e);if(!n||!i)return!n&&!i&&String(t)===String(e);try{var r=Array.isArray(t),a=Array.isArray(e);if(r&&a)return t.length===e.length&&t.every(function(t,n){return _(t,e[n])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(r||a)return!1;var o=Object.keys(t),s=Object.keys(e);return o.length===s.length&&o.every(function(n){return _(t[n],e[n])})}catch(c){return!1}}function B(t,e){for(var n=0;n<t.length;n++)if(_(t[n],e))return n;return-1}function z(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}var F=["component","directive","filter"],N=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],H={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:M,isReservedAttr:M,isUnknownElement:M,getTagNamespace:E,parsePlatformTagName:R,mustUseProp:M,async:!0,_lifecycleHooks:N},W=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function Q(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function V(t,e,n,i){Object.defineProperty(t,e,{value:n,enumerable:!!i,writable:!0,configurable:!0})}var X=new RegExp("[^"+W.source+".$_\\d]");function q(t){if(!X.test(t)){var e=t.split(".");return function(t){for(var n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}}var G,Z="__proto__"in{},Y="undefined"!==typeof window,J="undefined"!==typeof WXEnvironment&&!!WXEnvironment.platform,U=J&&WXEnvironment.platform.toLowerCase(),K=Y&&window.navigator.userAgent.toLowerCase(),$=K&&/msie|trident/.test(K),tt=(K&&K.indexOf("msie 9.0"),K&&K.indexOf("edge/")>0),et=(K&&K.indexOf("android"),K&&/iphone|ipad|ipod|ios/.test(K)||"ios"===U),nt=(K&&/chrome\/\d+/.test(K),K&&/phantomjs/.test(K),K&&K.match(/firefox\/(\d+)/),{}.watch);if(Y)try{var it={};Object.defineProperty(it,"passive",{get:function(){}}),window.addEventListener("test-passive",null,it)}catch(er){}var rt=function(){return void 0===G&&(G=!Y&&!J&&"undefined"!==typeof t&&(t["process"]&&"server"===t["process"].env.VUE_ENV)),G},at=Y&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function ot(t){return"function"===typeof t&&/native code/.test(t.toString())}var st,lt="undefined"!==typeof Symbol&&ot(Symbol)&&"undefined"!==typeof Reflect&&ot(Reflect.ownKeys);st="undefined"!==typeof Set&&ot(Set)?Set:function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(t){return!0===this.set[t]},t.prototype.add=function(t){this.set[t]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var ct=E,ut=0,ht=function(){this.id=ut++,this.subs=[]};function pt(t){ht.SharedObject.targetStack.push(t),ht.SharedObject.target=t}function ft(){ht.SharedObject.targetStack.pop(),ht.SharedObject.target=ht.SharedObject.targetStack[ht.SharedObject.targetStack.length-1]}ht.prototype.addSub=function(t){this.subs.push(t)},ht.prototype.removeSub=function(t){y(this.subs,t)},ht.prototype.depend=function(){ht.SharedObject.target&&ht.SharedObject.target.addDep(this)},ht.prototype.notify=function(){var t=this.subs.slice();for(var e=0,n=t.length;e<n;e++)t[e].update()},ht.SharedObject="undefined"!==typeof SharedObject?SharedObject:{},ht.SharedObject.target=null,ht.SharedObject.targetStack=[];var dt=function(t,e,n,i,r,a,o,s){this.tag=t,this.data=e,this.children=n,this.text=i,this.elm=r,this.ns=void 0,this.context=a,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=e&&e.key,this.componentOptions=o,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},gt={child:{configurable:!0}};gt.child.get=function(){return this.componentInstance},Object.defineProperties(dt.prototype,gt);var vt=function(t){void 0===t&&(t="");var e=new dt;return e.text=t,e.isComment=!0,e};function At(t){return new dt(void 0,void 0,void 0,String(t))}function yt(t){var e=new dt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var xt=Array.prototype,mt=Object.create(xt),bt=["push","pop","shift","unshift","splice","sort","reverse"];bt.forEach(function(t){var e=xt[t];V(mt,t,function(){var n=[],i=arguments.length;while(i--)n[i]=arguments[i];var r,a=e.apply(this,n),o=this.__ob__;switch(t){case"push":case"unshift":r=n;break;case"splice":r=n.slice(2);break}return r&&o.observeArray(r),o.dep.notify(),a})});var St=Object.getOwnPropertyNames(mt),wt=!0;function Pt(t){wt=t}var Tt=function(t){this.value=t,this.dep=new ht,this.vmCount=0,V(t,"__ob__",this),Array.isArray(t)?(Z?t.push!==t.__proto__.push?Ct(t,mt,St):It(t,mt):Ct(t,mt,St),this.observeArray(t)):this.walk(t)};function It(t,e){t.__proto__=e}function Ct(t,e,n){for(var i=0,r=n.length;i<r;i++){var a=n[i];V(t,a,e[a])}}function kt(t,e){var n;if(l(t)&&!(t instanceof dt))return m(t,"__ob__")&&t.__ob__ instanceof Tt?n=t.__ob__:wt&&!rt()&&(Array.isArray(t)||u(t))&&Object.isExtensible(t)&&!t._isVue&&(n=new Tt(t)),e&&n&&n.vmCount++,n}function jt(t,e,n,i,r){var a=new ht,o=Object.getOwnPropertyDescriptor(t,e);if(!o||!1!==o.configurable){var s=o&&o.get,l=o&&o.set;s&&!l||2!==arguments.length||(n=t[e]);var c=!r&&kt(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=s?s.call(t):n;return ht.SharedObject.target&&(a.depend(),c&&(c.dep.depend(),Array.isArray(e)&&Lt(e))),e},set:function(e){var i=s?s.call(t):n;e===i||e!==e&&i!==i||s&&!l||(l?l.call(t,e):n=e,c=!r&&kt(e),a.notify())}})}}function Dt(t,e,n){if(Array.isArray(t)&&p(e))return t.length=Math.max(t.length,e),t.splice(e,1,n),n;if(e in t&&!(e in Object.prototype))return t[e]=n,n;var i=t.__ob__;return t._isVue||i&&i.vmCount?n:i?(jt(i.value,e,n),i.dep.notify(),n):(t[e]=n,n)}function Ot(t,e){if(Array.isArray(t)&&p(e))t.splice(e,1);else{var n=t.__ob__;t._isVue||n&&n.vmCount||m(t,e)&&(delete t[e],n&&n.dep.notify())}}function Lt(t){for(var e=void 0,n=0,i=t.length;n<i;n++)e=t[n],e&&e.__ob__&&e.__ob__.dep.depend(),Array.isArray(e)&&Lt(e)}Tt.prototype.walk=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)jt(t,e[n])},Tt.prototype.observeArray=function(t){for(var e=0,n=t.length;e<n;e++)kt(t[e])};var Et=H.optionMergeStrategies;function Mt(t,e){if(!e)return t;for(var n,i,r,a=lt?Reflect.ownKeys(e):Object.keys(e),o=0;o<a.length;o++)n=a[o],"__ob__"!==n&&(i=t[n],r=e[n],m(t,n)?i!==r&&u(i)&&u(r)&&Mt(i,r):Dt(t,n,r));return t}function Rt(t,e,n){return n?function(){var i="function"===typeof e?e.call(n,n):e,r="function"===typeof t?t.call(n,n):t;return i?Mt(i,r):r}:e?t?function(){return Mt("function"===typeof e?e.call(this,this):e,"function"===typeof t?t.call(this,this):t)}:e:t}function _t(t,e){var n=e?t?t.concat(e):Array.isArray(e)?e:[e]:t;return n?Bt(n):n}function Bt(t){for(var e=[],n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}function zt(t,e,n,i){var r=Object.create(t||null);return e?O(r,e):r}Et.data=function(t,e,n){return n?Rt(t,e,n):e&&"function"!==typeof e?t:Rt(t,e)},N.forEach(function(t){Et[t]=_t}),F.forEach(function(t){Et[t+"s"]=zt}),Et.watch=function(t,e,n,i){if(t===nt&&(t=void 0),e===nt&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var r={};for(var a in O(r,t),e){var o=r[a],s=e[a];o&&!Array.isArray(o)&&(o=[o]),r[a]=o?o.concat(s):Array.isArray(s)?s:[s]}return r},Et.props=Et.methods=Et.inject=Et.computed=function(t,e,n,i){if(!t)return e;var r=Object.create(null);return O(r,t),e&&O(r,e),r},Et.provide=Rt;var Ft=function(t,e){return void 0===e?t:e};function Nt(t,e){var n=t.props;if(n){var i,r,a,o={};if(Array.isArray(n)){i=n.length;while(i--)r=n[i],"string"===typeof r&&(a=w(r),o[a]={type:null})}else if(u(n))for(var s in n)r=n[s],a=w(s),o[a]=u(r)?r:{type:r};else 0;t.props=o}}function Ht(t,e){var n=t.inject;if(n){var i=t.inject={};if(Array.isArray(n))for(var r=0;r<n.length;r++)i[n[r]]={from:n[r]};else if(u(n))for(var a in n){var o=n[a];i[a]=u(o)?O({from:a},o):{from:o}}else 0}}function Wt(t){var e=t.directives;if(e)for(var n in e){var i=e[n];"function"===typeof i&&(e[n]={bind:i,update:i})}}function Qt(t,e,n){if("function"===typeof e&&(e=e.options),Nt(e,n),Ht(e,n),Wt(e),!e._base&&(e.extends&&(t=Qt(t,e.extends,n)),e.mixins))for(var i=0,r=e.mixins.length;i<r;i++)t=Qt(t,e.mixins[i],n);var a,o={};for(a in t)s(a);for(a in e)m(t,a)||s(a);function s(i){var r=Et[i]||Ft;o[i]=r(t[i],e[i],n,i)}return o}function Vt(t,e,n,i){if("string"===typeof n){var r=t[e];if(m(r,n))return r[n];var a=w(n);if(m(r,a))return r[a];var o=P(a);if(m(r,o))return r[o];var s=r[n]||r[a]||r[o];return s}}function Xt(t,e,n,i){var r=e[t],a=!m(n,t),o=n[t],s=Yt(Boolean,r.type);if(s>-1)if(a&&!m(r,"default"))o=!1;else if(""===o||o===I(t)){var l=Yt(String,r.type);(l<0||s<l)&&(o=!0)}if(void 0===o){o=qt(i,r,t);var c=wt;Pt(!0),kt(o),Pt(c)}return o}function qt(t,e,n){if(m(e,"default")){var i=e.default;return t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n]?t._props[n]:"function"===typeof i&&"Function"!==Gt(e.type)?i.call(t):i}}function Gt(t){var e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:""}function Zt(t,e){return Gt(t)===Gt(e)}function Yt(t,e){if(!Array.isArray(e))return Zt(e,t)?0:-1;for(var n=0,i=e.length;n<i;n++)if(Zt(e[n],t))return n;return-1}function Jt(t,e,n){pt();try{if(e){var i=e;while(i=i.$parent){var r=i.$options.errorCaptured;if(r)for(var a=0;a<r.length;a++)try{var o=!1===r[a].call(i,t,e,n);if(o)return}catch(er){Kt(er,i,"errorCaptured hook")}}}Kt(t,e,n)}finally{ft()}}function Ut(t,e,n,i,r){var a;try{a=n?t.apply(e,n):t.call(e),a&&!a._isVue&&f(a)&&!a._handled&&(a.catch(function(t){return Jt(t,i,r+" (Promise/async)")}),a._handled=!0)}catch(er){Jt(er,i,r)}return a}function Kt(t,e,n){if(H.errorHandler)try{return H.errorHandler.call(null,t,e,n)}catch(er){er!==t&&$t(er,null,"config.errorHandler")}$t(t,e,n)}function $t(t,e,n){if(!Y&&!J||"undefined"===typeof console)throw t;console.error(t)}var te,ee=[],ne=!1;function ie(){ne=!1;var t=ee.slice(0);ee.length=0;for(var e=0;e<t.length;e++)t[e]()}if("undefined"!==typeof Promise&&ot(Promise)){var re=Promise.resolve();te=function(){re.then(ie),et&&setTimeout(E)}}else if($||"undefined"===typeof MutationObserver||!ot(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())te="undefined"!==typeof setImmediate&&ot(setImmediate)?function(){setImmediate(ie)}:function(){setTimeout(ie,0)};else{var ae=1,oe=new MutationObserver(ie),se=document.createTextNode(String(ae));oe.observe(se,{characterData:!0}),te=function(){ae=(ae+1)%2,se.data=String(ae)}}function le(t,e){var n;if(ee.push(function(){if(t)try{t.call(e)}catch(er){Jt(er,e,"nextTick")}else n&&n(e)}),ne||(ne=!0,te()),!t&&"undefined"!==typeof Promise)return new Promise(function(t){n=t})}var ce=new st;function ue(t){he(t,ce),ce.clear()}function he(t,e){var n,i,r=Array.isArray(t);if(!(!r&&!l(t)||Object.isFrozen(t)||t instanceof dt)){if(t.__ob__){var a=t.__ob__.dep.id;if(e.has(a))return;e.add(a)}if(r){n=t.length;while(n--)he(t[n],e)}else{i=Object.keys(t),n=i.length;while(n--)he(t[i[n]],e)}}}var pe=b(function(t){var e="&"===t.charAt(0);t=e?t.slice(1):t;var n="~"===t.charAt(0);t=n?t.slice(1):t;var i="!"===t.charAt(0);return t=i?t.slice(1):t,{name:t,once:n,capture:i,passive:e}});function fe(t,e){function n(){var t=arguments,i=n.fns;if(!Array.isArray(i))return Ut(i,null,arguments,e,"v-on handler");for(var r=i.slice(),a=0;a<r.length;a++)Ut(r[a],null,t,e,"v-on handler")}return n.fns=t,n}function de(t,e,n,r,o,s){var l,c,u,h;for(l in t)c=t[l],u=e[l],h=pe(l),i(c)||(i(u)?(i(c.fns)&&(c=t[l]=fe(c,s)),a(h.once)&&(c=t[l]=o(h.name,c,h.capture)),n(h.name,c,h.capture,h.passive,h.params)):c!==u&&(u.fns=c,t[l]=u));for(l in e)i(t[l])&&(h=pe(l),r(h.name,e[l],h.capture))}function ge(t,e,n){var a=e.options.props;if(!i(a)){var o={},s=t.attrs,l=t.props;if(r(s)||r(l))for(var c in a){var u=I(c);ve(o,l,c,u,!0)||ve(o,s,c,u,!1)}return o}}function ve(t,e,n,i,a){if(r(e)){if(m(e,n))return t[n]=e[n],a||delete e[n],!0;if(m(e,i))return t[n]=e[i],a||delete e[i],!0}return!1}function Ae(t){for(var e=0;e<t.length;e++)if(Array.isArray(t[e]))return Array.prototype.concat.apply([],t);return t}function ye(t){return s(t)?[At(t)]:Array.isArray(t)?me(t):void 0}function xe(t){return r(t)&&r(t.text)&&o(t.isComment)}function me(t,e){var n,o,l,c,u=[];for(n=0;n<t.length;n++)o=t[n],i(o)||"boolean"===typeof o||(l=u.length-1,c=u[l],Array.isArray(o)?o.length>0&&(o=me(o,(e||"")+"_"+n),xe(o[0])&&xe(c)&&(u[l]=At(c.text+o[0].text),o.shift()),u.push.apply(u,o)):s(o)?xe(c)?u[l]=At(c.text+o):""!==o&&u.push(At(o)):xe(o)&&xe(c)?u[l]=At(c.text+o.text):(a(t._isVList)&&r(o.tag)&&i(o.key)&&r(e)&&(o.key="__vlist"+e+"_"+n+"__"),u.push(o)));return u}function be(t){var e=t.$options.provide;e&&(t._provided="function"===typeof e?e.call(t):e)}function Se(t){var e=we(t.$options.inject,t);e&&(Pt(!1),Object.keys(e).forEach(function(n){jt(t,n,e[n])}),Pt(!0))}function we(t,e){if(t){for(var n=Object.create(null),i=lt?Reflect.ownKeys(t):Object.keys(t),r=0;r<i.length;r++){var a=i[r];if("__ob__"!==a){var o=t[a].from,s=e;while(s){if(s._provided&&m(s._provided,o)){n[a]=s._provided[o];break}s=s.$parent}if(!s)if("default"in t[a]){var l=t[a].default;n[a]="function"===typeof l?l.call(e):l}else 0}}return n}}function Pe(t,e){if(!t||!t.length)return{};for(var n={},i=0,r=t.length;i<r;i++){var a=t[i],o=a.data;if(o&&o.attrs&&o.attrs.slot&&delete o.attrs.slot,a.context!==e&&a.fnContext!==e||!o||null==o.slot)a.asyncMeta&&a.asyncMeta.data&&"page"===a.asyncMeta.data.slot?(n["page"]||(n["page"]=[])).push(a):(n.default||(n.default=[])).push(a);else{var s=o.slot,l=n[s]||(n[s]=[]);"template"===a.tag?l.push.apply(l,a.children||[]):l.push(a)}}for(var c in n)n[c].every(Te)&&delete n[c];return n}function Te(t){return t.isComment&&!t.asyncFactory||" "===t.text}function Ie(t,e,i){var r,a=Object.keys(e).length>0,o=t?!!t.$stable:!a,s=t&&t.$key;if(t){if(t._normalized)return t._normalized;if(o&&i&&i!==n&&s===i.$key&&!a&&!i.$hasNormal)return i;for(var l in r={},t)t[l]&&"$"!==l[0]&&(r[l]=Ce(e,l,t[l]))}else r={};for(var c in e)c in r||(r[c]=ke(e,c));return t&&Object.isExtensible(t)&&(t._normalized=r),V(r,"$stable",o),V(r,"$key",s),V(r,"$hasNormal",a),r}function Ce(t,e,n){var i=function(){var t=arguments.length?n.apply(null,arguments):n({});return t=t&&"object"===typeof t&&!Array.isArray(t)?[t]:ye(t),t&&(0===t.length||1===t.length&&t[0].isComment)?void 0:t};return n.proxy&&Object.defineProperty(t,e,{get:i,enumerable:!0,configurable:!0}),i}function ke(t,e){return function(){return t[e]}}function je(t,e){var n,i,a,o,s;if(Array.isArray(t)||"string"===typeof t)for(n=new Array(t.length),i=0,a=t.length;i<a;i++)n[i]=e(t[i],i);else if("number"===typeof t)for(n=new Array(t),i=0;i<t;i++)n[i]=e(i+1,i);else if(l(t))if(lt&&t[Symbol.iterator]){n=[];var c=t[Symbol.iterator](),u=c.next();while(!u.done)n.push(e(u.value,n.length)),u=c.next()}else for(o=Object.keys(t),n=new Array(o.length),i=0,a=o.length;i<a;i++)s=o[i],n[i]=e(t[s],s,i);return r(n)||(n=[]),n._isVList=!0,n}function De(t,e,n,i){var r,a=this.$scopedSlots[t];a?(n=n||{},i&&(n=O(O({},i),n)),r=a(n)||e):r=this.$slots[t]||e;var o=n&&n.slot;return o?this.$createElement("template",{slot:o},r):r}function Oe(t){return Vt(this.$options,"filters",t,!0)||R}function Le(t,e){return Array.isArray(t)?-1===t.indexOf(e):t!==e}function Ee(t,e,n,i,r){var a=H.keyCodes[e]||n;return r&&i&&!H.keyCodes[e]?Le(r,i):a?Le(a,t):i?I(i)!==e:void 0}function Me(t,e,n,i,r){if(n)if(l(n)){var a;Array.isArray(n)&&(n=L(n));var o=function(o){if("class"===o||"style"===o||A(o))a=t;else{var s=t.attrs&&t.attrs.type;a=i||H.mustUseProp(e,s,o)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var l=w(o),c=I(o);if(!(l in a)&&!(c in a)&&(a[o]=n[o],r)){var u=t.on||(t.on={});u["update:"+o]=function(t){n[o]=t}}};for(var s in n)o(s)}else;return t}function Re(t,e){var n=this._staticTrees||(this._staticTrees=[]),i=n[t];return i&&!e?i:(i=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,null,this),Be(i,"__static__"+t,!1),i)}function _e(t,e,n){return Be(t,"__once__"+e+(n?"_"+n:""),!0),t}function Be(t,e,n){if(Array.isArray(t))for(var i=0;i<t.length;i++)t[i]&&"string"!==typeof t[i]&&ze(t[i],e+"_"+i,n);else ze(t,e,n)}function ze(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function Fe(t,e){if(e)if(u(e)){var n=t.on=t.on?O({},t.on):{};for(var i in e){var r=n[i],a=e[i];n[i]=r?[].concat(r,a):a}}else;return t}function Ne(t,e,n,i){e=e||{$stable:!n};for(var r=0;r<t.length;r++){var a=t[r];Array.isArray(a)?Ne(a,e,n):a&&(a.proxy&&(a.fn.proxy=!0),e[a.key]=a.fn)}return i&&(e.$key=i),e}function He(t,e){for(var n=0;n<e.length;n+=2){var i=e[n];"string"===typeof i&&i&&(t[e[n]]=e[n+1])}return t}function We(t,e){return"string"===typeof t?e+t:t}function Qe(t){t._o=_e,t._n=g,t._s=d,t._l=je,t._t=De,t._q=_,t._i=B,t._m=Re,t._f=Oe,t._k=Ee,t._b=Me,t._v=At,t._e=vt,t._u=Ne,t._g=Fe,t._d=He,t._p=We}function Ve(t,e,i,r,o){var s,l=this,c=o.options;m(r,"_uid")?(s=Object.create(r),s._original=r):(s=r,r=r._original);var u=a(c._compiled),h=!u;this.data=t,this.props=e,this.children=i,this.parent=r,this.listeners=t.on||n,this.injections=we(c.inject,r),this.slots=function(){return l.$slots||Ie(t.scopedSlots,l.$slots=Pe(i,r)),l.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return Ie(t.scopedSlots,this.slots())}}),u&&(this.$options=c,this.$slots=this.slots(),this.$scopedSlots=Ie(t.scopedSlots,this.$slots)),c._scopeId?this._c=function(t,e,n,i){var a=rn(s,t,e,n,i,h);return a&&!Array.isArray(a)&&(a.fnScopeId=c._scopeId,a.fnContext=r),a}:this._c=function(t,e,n,i){return rn(s,t,e,n,i,h)}}function Xe(t,e,i,a,o){var s=t.options,l={},c=s.props;if(r(c))for(var u in c)l[u]=Xt(u,c,e||n);else r(i.attrs)&&Ge(l,i.attrs),r(i.props)&&Ge(l,i.props);var h=new Ve(i,l,o,a,t),p=s.render.call(null,h._c,h);if(p instanceof dt)return qe(p,i,h.parent,s,h);if(Array.isArray(p)){for(var f=ye(p)||[],d=new Array(f.length),g=0;g<f.length;g++)d[g]=qe(f[g],i,h.parent,s,h);return d}}function qe(t,e,n,i,r){var a=yt(t);return a.fnContext=n,a.fnOptions=i,e.slot&&((a.data||(a.data={})).slot=e.slot),a}function Ge(t,e){for(var n in e)t[w(n)]=e[n]}Qe(Ve.prototype);var Ze={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var n=t;Ze.prepatch(n,n)}else{var i=t.componentInstance=Ue(t,wn);i.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var n=e.componentOptions,i=e.componentInstance=t.componentInstance;Cn(i,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,On(n,"mounted")),t.data.keepAlive&&(e._isMounted?Qn(n):jn(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?Dn(e,!0):e.$destroy())}},Ye=Object.keys(Ze);function Je(t,e,n,o,s){if(!i(t)){var c=n.$options._base;if(l(t)&&(t=c.extend(t)),"function"===typeof t){var u;if(i(t.cid)&&(u=t,t=dn(u,c),void 0===t))return fn(u,e,n,o,s);e=e||{},pi(t),r(e.model)&&tn(t.options,e);var h=ge(e,t,s);if(a(t.options.functional))return Xe(t,h,e,n,o);var p=e.on;if(e.on=e.nativeOn,a(t.options.abstract)){var f=e.slot;e={},f&&(e.slot=f)}Ke(e);var d=t.options.name||s,g=new dt("vue-component-"+t.cid+(d?"-"+d:""),e,void 0,void 0,void 0,n,{Ctor:t,propsData:h,listeners:p,tag:s,children:o},u);return g}}}function Ue(t,e){var n={_isComponent:!0,_parentVnode:t,parent:e},i=t.data.inlineTemplate;return r(i)&&(n.render=i.render,n.staticRenderFns=i.staticRenderFns),new t.componentOptions.Ctor(n)}function Ke(t){for(var e=t.hook||(t.hook={}),n=0;n<Ye.length;n++){var i=Ye[n],r=e[i],a=Ze[i];r===a||r&&r._merged||(e[i]=r?$e(a,r):a)}}function $e(t,e){var n=function(n,i){t(n,i),e(n,i)};return n._merged=!0,n}function tn(t,e){var n=t.model&&t.model.prop||"value",i=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[n]=e.model.value;var a=e.on||(e.on={}),o=a[i],s=e.model.callback;r(o)?(Array.isArray(o)?-1===o.indexOf(s):o!==s)&&(a[i]=[s].concat(o)):a[i]=s}var en=1,nn=2;function rn(t,e,n,i,r,o){return(Array.isArray(n)||s(n))&&(r=i,i=n,n=void 0),a(o)&&(r=nn),an(t,e,n,i,r)}function an(t,e,n,i,a){if(r(n)&&r(n.__ob__))return vt();if(r(n)&&r(n.is)&&(e=n.is),!e)return vt();var o,s,l;(Array.isArray(i)&&"function"===typeof i[0]&&(n=n||{},n.scopedSlots={default:i[0]},i.length=0),a===nn?i=ye(i):a===en&&(i=Ae(i)),"string"===typeof e)?(s=t.$vnode&&t.$vnode.ns||H.getTagNamespace(e),o=H.isReservedTag(e)?new dt(H.parsePlatformTagName(e),n,i,void 0,void 0,t):n&&n.pre||!r(l=Vt(t.$options,"components",e))?new dt(e,n,i,void 0,void 0,t):Je(l,n,t,i,e)):o=Je(e,n,t,i);return Array.isArray(o)?o:r(o)?(r(s)&&on(o,s),r(n)&&sn(n),o):vt()}function on(t,e,n){if(t.ns=e,"foreignObject"===t.tag&&(e=void 0,n=!0),r(t.children))for(var o=0,s=t.children.length;o<s;o++){var l=t.children[o];r(l.tag)&&(i(l.ns)||a(n)&&"svg"!==l.tag)&&on(l,e,n)}}function sn(t){l(t.style)&&ue(t.style),l(t.class)&&ue(t.class)}function ln(t){t._vnode=null,t._staticTrees=null;var e=t.$options,i=t.$vnode=e._parentVnode,r=i&&i.context;t.$slots=Pe(e._renderChildren,r),t.$scopedSlots=n,t._c=function(e,n,i,r){return rn(t,e,n,i,r,!1)},t.$createElement=function(e,n,i,r){return rn(t,e,n,i,r,!0)};var a=i&&i.data;jt(t,"$attrs",a&&a.attrs||n,null,!0),jt(t,"$listeners",e._parentListeners||n,null,!0)}var cn,un=null;function hn(t){Qe(t.prototype),t.prototype.$nextTick=function(t){return le(t,this)},t.prototype._render=function(){var t,e=this,n=e.$options,i=n.render,r=n._parentVnode;r&&(e.$scopedSlots=Ie(r.data.scopedSlots,e.$slots,e.$scopedSlots)),e.$vnode=r;try{un=e,t=i.call(e._renderProxy,e.$createElement)}catch(er){Jt(er,e,"render"),t=e._vnode}finally{un=null}return Array.isArray(t)&&1===t.length&&(t=t[0]),t instanceof dt||(t=vt()),t.parent=r,t}}function pn(t,e){return(t.__esModule||lt&&"Module"===t[Symbol.toStringTag])&&(t=t.default),l(t)?e.extend(t):t}function fn(t,e,n,i,r){var a=vt();return a.asyncFactory=t,a.asyncMeta={data:e,context:n,children:i,tag:r},a}function dn(t,e){if(a(t.error)&&r(t.errorComp))return t.errorComp;if(r(t.resolved))return t.resolved;var n=un;if(n&&r(t.owners)&&-1===t.owners.indexOf(n)&&t.owners.push(n),a(t.loading)&&r(t.loadingComp))return t.loadingComp;if(n&&!r(t.owners)){var o=t.owners=[n],s=!0,c=null,u=null;n.$on("hook:destroyed",function(){return y(o,n)});var h=function(t){for(var e=0,n=o.length;e<n;e++)o[e].$forceUpdate();t&&(o.length=0,null!==c&&(clearTimeout(c),c=null),null!==u&&(clearTimeout(u),u=null))},p=z(function(n){t.resolved=pn(n,e),s?o.length=0:h(!0)}),d=z(function(e){r(t.errorComp)&&(t.error=!0,h(!0))}),g=t(p,d);return l(g)&&(f(g)?i(t.resolved)&&g.then(p,d):f(g.component)&&(g.component.then(p,d),r(g.error)&&(t.errorComp=pn(g.error,e)),r(g.loading)&&(t.loadingComp=pn(g.loading,e),0===g.delay?t.loading=!0:c=setTimeout(function(){c=null,i(t.resolved)&&i(t.error)&&(t.loading=!0,h(!1))},g.delay||200)),r(g.timeout)&&(u=setTimeout(function(){u=null,i(t.resolved)&&d(null)},g.timeout)))),s=!1,t.loading?t.loadingComp:t.resolved}}function gn(t){return t.isComment&&t.asyncFactory}function vn(t){if(Array.isArray(t))for(var e=0;e<t.length;e++){var n=t[e];if(r(n)&&(r(n.componentOptions)||gn(n)))return n}}function An(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&bn(t,e)}function yn(t,e){cn.$on(t,e)}function xn(t,e){cn.$off(t,e)}function mn(t,e){var n=cn;return function i(){var r=e.apply(null,arguments);null!==r&&n.$off(t,i)}}function bn(t,e,n){cn=t,de(e,n||{},yn,xn,mn,t),cn=void 0}function Sn(t){var e=/^hook:/;t.prototype.$on=function(t,n){var i=this;if(Array.isArray(t))for(var r=0,a=t.length;r<a;r++)i.$on(t[r],n);else(i._events[t]||(i._events[t]=[])).push(n),e.test(t)&&(i._hasHookEvent=!0);return i},t.prototype.$once=function(t,e){var n=this;function i(){n.$off(t,i),e.apply(n,arguments)}return i.fn=e,n.$on(t,i),n},t.prototype.$off=function(t,e){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(t)){for(var i=0,r=t.length;i<r;i++)n.$off(t[i],e);return n}var a,o=n._events[t];if(!o)return n;if(!e)return n._events[t]=null,n;var s=o.length;while(s--)if(a=o[s],a===e||a.fn===e){o.splice(s,1);break}return n},t.prototype.$emit=function(t){var e=this,n=e._events[t];if(n){n=n.length>1?D(n):n;for(var i=D(arguments,1),r='event handler for "'+t+'"',a=0,o=n.length;a<o;a++)Ut(n[a],e,i,e,r)}return e}}var wn=null;function Pn(t){var e=wn;return wn=t,function(){wn=e}}function Tn(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){while(n.$options.abstract&&n.$parent)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function In(t){t.prototype._update=function(t,e){var n=this,i=n.$el,r=n._vnode,a=Pn(n);n._vnode=t,n.$el=r?n.__patch__(r,t):n.__patch__(n.$el,t,e,!1),a(),i&&(i.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},t.prototype.$forceUpdate=function(){var t=this;t._watcher&&t._watcher.update()},t.prototype.$destroy=function(){var t=this;if(!t._isBeingDestroyed){On(t,"beforeDestroy"),t._isBeingDestroyed=!0;var e=t.$parent;!e||e._isBeingDestroyed||t.$options.abstract||y(e.$children,t),t._watcher&&t._watcher.teardown();var n=t._watchers.length;while(n--)t._watchers[n].teardown();t._data.__ob__&&t._data.__ob__.vmCount--,t._isDestroyed=!0,t.__patch__(t._vnode,null),On(t,"destroyed"),t.$off(),t.$el&&(t.$el.__vue__=null),t.$vnode&&(t.$vnode.parent=null)}}}function Cn(t,e,i,r,a){var o=r.data.scopedSlots,s=t.$scopedSlots,l=!!(o&&!o.$stable||s!==n&&!s.$stable||o&&t.$scopedSlots.$key!==o.$key),c=!!(a||t.$options._renderChildren||l);if(t.$options._parentVnode=r,t.$vnode=r,t._vnode&&(t._vnode.parent=r),t.$options._renderChildren=a,t.$attrs=r.data.attrs||n,t.$listeners=i||n,e&&t.$options.props){Pt(!1);for(var u=t._props,h=t.$options._propKeys||[],p=0;p<h.length;p++){var f=h[p],d=t.$options.props;u[f]=Xt(f,d,e,t)}Pt(!0),t.$options.propsData=e}i=i||n;var g=t.$options._parentListeners;t.$options._parentListeners=i,bn(t,i,g),c&&(t.$slots=Pe(a,r.context),t.$forceUpdate())}function kn(t){while(t&&(t=t.$parent))if(t._inactive)return!0;return!1}function jn(t,e){if(e){if(t._directInactive=!1,kn(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(var n=0;n<t.$children.length;n++)jn(t.$children[n]);On(t,"activated")}}function Dn(t,e){if((!e||(t._directInactive=!0,!kn(t)))&&!t._inactive){t._inactive=!0;for(var n=0;n<t.$children.length;n++)Dn(t.$children[n]);On(t,"deactivated")}}function On(t,e){pt();var n=t.$options[e],i=e+" hook";if(n)for(var r=0,a=n.length;r<a;r++)Ut(n[r],t,null,t,i);t._hasHookEvent&&t.$emit("hook:"+e),ft()}var Ln=[],En=[],Mn={},Rn=!1,_n=!1,Bn=0;function zn(){Bn=Ln.length=En.length=0,Mn={},Rn=_n=!1}var Fn=Date.now;if(Y&&!$){var Nn=window.performance;Nn&&"function"===typeof Nn.now&&Fn()>document.createEvent("Event").timeStamp&&(Fn=function(){return Nn.now()})}function Hn(){var t,e;for(Fn(),_n=!0,Ln.sort(function(t,e){return t.id-e.id}),Bn=0;Bn<Ln.length;Bn++)t=Ln[Bn],t.before&&t.before(),e=t.id,Mn[e]=null,t.run();var n=En.slice(),i=Ln.slice();zn(),Vn(n),Wn(i),at&&H.devtools&&at.emit("flush")}function Wn(t){var e=t.length;while(e--){var n=t[e],i=n.vm;i._watcher===n&&i._isMounted&&!i._isDestroyed&&On(i,"updated")}}function Qn(t){t._inactive=!1,En.push(t)}function Vn(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,jn(t[e],!0)}function Xn(t){var e=t.id;if(null==Mn[e]){if(Mn[e]=!0,_n){var n=Ln.length-1;while(n>Bn&&Ln[n].id>t.id)n--;Ln.splice(n+1,0,t)}else Ln.push(t);Rn||(Rn=!0,le(Hn))}}var qn=0,Gn=function(t,e,n,i,r){this.vm=t,r&&(t._watcher=this),t._watchers.push(this),i?(this.deep=!!i.deep,this.user=!!i.user,this.lazy=!!i.lazy,this.sync=!!i.sync,this.before=i.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++qn,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new st,this.newDepIds=new st,this.expression="","function"===typeof e?this.getter=e:(this.getter=q(e),this.getter||(this.getter=E)),this.value=this.lazy?void 0:this.get()};Gn.prototype.get=function(){var t;pt(this);var e=this.vm;try{t=this.getter.call(e,e)}catch(er){if(!this.user)throw er;Jt(er,e,'getter for watcher "'+this.expression+'"')}finally{this.deep&&ue(t),ft(),this.cleanupDeps()}return t},Gn.prototype.addDep=function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))},Gn.prototype.cleanupDeps=function(){var t=this.deps.length;while(t--){var e=this.deps[t];this.newDepIds.has(e.id)||e.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},Gn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Xn(this)},Gn.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||l(t)||this.deep){var e=this.value;if(this.value=t,this.user)try{this.cb.call(this.vm,t,e)}catch(er){Jt(er,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,t,e)}}},Gn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Gn.prototype.depend=function(){var t=this.deps.length;while(t--)this.deps[t].depend()},Gn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||y(this.vm._watchers,this);var t=this.deps.length;while(t--)this.deps[t].removeSub(this);this.active=!1}};var Zn={enumerable:!0,configurable:!0,get:E,set:E};function Yn(t,e,n){Zn.get=function(){return this[e][n]},Zn.set=function(t){this[e][n]=t},Object.defineProperty(t,n,Zn)}function Jn(t){t._watchers=[];var e=t.$options;e.props&&Un(t,e.props),e.methods&&ai(t,e.methods),e.data?Kn(t):kt(t._data={},!0),e.computed&&ei(t,e.computed),e.watch&&e.watch!==nt&&oi(t,e.watch)}function Un(t,e){var n=t.$options.propsData||{},i=t._props={},r=t.$options._propKeys=[],a=!t.$parent;a||Pt(!1);var o=function(a){r.push(a);var o=Xt(a,e,n,t);jt(i,a,o),a in t||Yn(t,"_props",a)};for(var s in e)o(s);Pt(!0)}function Kn(t){var e=t.$options.data;e=t._data="function"===typeof e?$n(e,t):e||{},u(e)||(e={});var n=Object.keys(e),i=t.$options.props,r=(t.$options.methods,n.length);while(r--){var a=n[r];0,i&&m(i,a)||Q(a)||Yn(t,"_data",a)}kt(e,!0)}function $n(t,e){pt();try{return t.call(e,e)}catch(er){return Jt(er,e,"data()"),{}}finally{ft()}}var ti={lazy:!0};function ei(t,e){var n=t._computedWatchers=Object.create(null),i=rt();for(var r in e){var a=e[r],o="function"===typeof a?a:a.get;0,i||(n[r]=new Gn(t,o||E,E,ti)),r in t||ni(t,r,a)}}function ni(t,e,n){var i=!rt();"function"===typeof n?(Zn.get=i?ii(e):ri(n),Zn.set=E):(Zn.get=n.get?i&&!1!==n.cache?ii(e):ri(n.get):E,Zn.set=n.set||E),Object.defineProperty(t,e,Zn)}function ii(t){return function(){var e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),ht.SharedObject.target&&e.depend(),e.value}}function ri(t){return function(){return t.call(this,this)}}function ai(t,e){t.$options.props;for(var n in e)t[n]="function"!==typeof e[n]?E:j(e[n],t)}function oi(t,e){for(var n in e){var i=e[n];if(Array.isArray(i))for(var r=0;r<i.length;r++)si(t,n,i[r]);else si(t,n,i)}}function si(t,e,n,i){return u(n)&&(i=n,n=n.handler),"string"===typeof n&&(n=t[n]),t.$watch(e,n,i)}function li(t){var e={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=Dt,t.prototype.$delete=Ot,t.prototype.$watch=function(t,e,n){var i=this;if(u(e))return si(i,t,e,n);n=n||{},n.user=!0;var r=new Gn(i,t,e,n);if(n.immediate)try{e.call(i,r.value)}catch(a){Jt(a,i,'callback for immediate watcher "'+r.expression+'"')}return function(){r.teardown()}}}var ci=0;function ui(t){t.prototype._init=function(t){var e=this;e._uid=ci++,e._isVue=!0,t&&t._isComponent?hi(e,t):e.$options=Qt(pi(e.constructor),t||{},e),e._renderProxy=e,e._self=e,Tn(e),An(e),ln(e),On(e,"beforeCreate"),"mp-toutiao"!==e.mpHost&&Se(e),Jn(e),"mp-toutiao"!==e.mpHost&&be(e),"mp-toutiao"!==e.mpHost&&On(e,"created"),e.$options.el&&e.$mount(e.$options.el)}}function hi(t,e){var n=t.$options=Object.create(t.constructor.options),i=e._parentVnode;n.parent=e.parent,n._parentVnode=i;var r=i.componentOptions;n.propsData=r.propsData,n._parentListeners=r.listeners,n._renderChildren=r.children,n._componentTag=r.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}function pi(t){var e=t.options;if(t.super){var n=pi(t.super),i=t.superOptions;if(n!==i){t.superOptions=n;var r=fi(t);r&&O(t.extendOptions,r),e=t.options=Qt(n,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function fi(t){var e,n=t.options,i=t.sealedOptions;for(var r in n)n[r]!==i[r]&&(e||(e={}),e[r]=n[r]);return e}function di(t){this._init(t)}function gi(t){t.use=function(t){var e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;var n=D(arguments,1);return n.unshift(this),"function"===typeof t.install?t.install.apply(t,n):"function"===typeof t&&t.apply(null,n),e.push(t),this}}function vi(t){t.mixin=function(t){return this.options=Qt(this.options,t),this}}function Ai(t){t.cid=0;var e=1;t.extend=function(t){t=t||{};var n=this,i=n.cid,r=t._Ctor||(t._Ctor={});if(r[i])return r[i];var a=t.name||n.options.name;var o=function(t){this._init(t)};return o.prototype=Object.create(n.prototype),o.prototype.constructor=o,o.cid=e++,o.options=Qt(n.options,t),o["super"]=n,o.options.props&&yi(o),o.options.computed&&xi(o),o.extend=n.extend,o.mixin=n.mixin,o.use=n.use,F.forEach(function(t){o[t]=n[t]}),a&&(o.options.components[a]=o),o.superOptions=n.options,o.extendOptions=t,o.sealedOptions=O({},o.options),r[i]=o,o}}function yi(t){var e=t.options.props;for(var n in e)Yn(t.prototype,"_props",n)}function xi(t){var e=t.options.computed;for(var n in e)ni(t.prototype,n,e[n])}function mi(t){F.forEach(function(e){t[e]=function(t,n){return n?("component"===e&&u(n)&&(n.name=n.name||t,n=this.options._base.extend(n)),"directive"===e&&"function"===typeof n&&(n={bind:n,update:n}),this.options[e+"s"][t]=n,n):this.options[e+"s"][t]}})}function bi(t){return t&&(t.Ctor.options.name||t.tag)}function Si(t,e){return Array.isArray(t)?t.indexOf(e)>-1:"string"===typeof t?t.split(",").indexOf(e)>-1:!!h(t)&&t.test(e)}function wi(t,e){var n=t.cache,i=t.keys,r=t._vnode;for(var a in n){var o=n[a];if(o){var s=bi(o.componentOptions);s&&!e(s)&&Pi(n,a,i,r)}}}function Pi(t,e,n,i){var r=t[e];!r||i&&r.tag===i.tag||r.componentInstance.$destroy(),t[e]=null,y(n,e)}ui(di),li(di),Sn(di),In(di),hn(di);var Ti=[String,RegExp,Array],Ii={name:"keep-alive",abstract:!0,props:{include:Ti,exclude:Ti,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Pi(this.cache,t,this.keys)},mounted:function(){var t=this;this.$watch("include",function(e){wi(t,function(t){return Si(e,t)})}),this.$watch("exclude",function(e){wi(t,function(t){return!Si(e,t)})})},render:function(){var t=this.$slots.default,e=vn(t),n=e&&e.componentOptions;if(n){var i=bi(n),r=this,a=r.include,o=r.exclude;if(a&&(!i||!Si(a,i))||o&&i&&Si(o,i))return e;var s=this,l=s.cache,c=s.keys,u=null==e.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):e.key;l[u]?(e.componentInstance=l[u].componentInstance,y(c,u),c.push(u)):(l[u]=e,c.push(u),this.max&&c.length>parseInt(this.max)&&Pi(l,c[0],c,this._vnode)),e.data.keepAlive=!0}return e||t&&t[0]}},Ci={KeepAlive:Ii};function ki(t){var e={get:function(){return H}};Object.defineProperty(t,"config",e),t.util={warn:ct,extend:O,mergeOptions:Qt,defineReactive:jt},t.set=Dt,t.delete=Ot,t.nextTick=le,t.observable=function(t){return kt(t),t},t.options=Object.create(null),F.forEach(function(e){t.options[e+"s"]=Object.create(null)}),t.options._base=t,O(t.options.components,Ci),gi(t),vi(t),Ai(t),mi(t)}ki(di),Object.defineProperty(di.prototype,"$isServer",{get:rt}),Object.defineProperty(di.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(di,"FunctionalRenderContext",{value:Ve}),di.version="2.6.10";var ji="[object Array]",Di="[object Object]";function Oi(t,e){var n={};return Li(t,e),Ei(t,e,"",n),n}function Li(t,e){if(t!==e){var n=Ri(t),i=Ri(e);if(n==Di&&i==Di){if(Object.keys(t).length>=Object.keys(e).length)for(var r in e){var a=t[r];void 0===a?t[r]=null:Li(a,e[r])}}else n==ji&&i==ji&&t.length>=e.length&&e.forEach(function(e,n){Li(t[n],e)})}}function Ei(t,e,n,i){if(t!==e){var r=Ri(t),a=Ri(e);if(r==Di)if(a!=Di||Object.keys(t).length<Object.keys(e).length)Mi(i,n,t);else{var o=function(r){var a=t[r],o=e[r],s=Ri(a),l=Ri(o);if(s!=ji&&s!=Di)a!=e[r]&&Mi(i,(""==n?"":n+".")+r,a);else if(s==ji)l!=ji?Mi(i,(""==n?"":n+".")+r,a):a.length<o.length?Mi(i,(""==n?"":n+".")+r,a):a.forEach(function(t,e){Ei(t,o[e],(""==n?"":n+".")+r+"["+e+"]",i)});else if(s==Di)if(l!=Di||Object.keys(a).length<Object.keys(o).length)Mi(i,(""==n?"":n+".")+r,a);else for(var c in a)Ei(a[c],o[c],(""==n?"":n+".")+r+"."+c,i)};for(var s in t)o(s)}else r==ji?a!=ji?Mi(i,n,t):t.length<e.length?Mi(i,n,t):t.forEach(function(t,r){Ei(t,e[r],n+"["+r+"]",i)}):Mi(i,n,t)}}function Mi(t,e,n){t[e]=n}function Ri(t){return Object.prototype.toString.call(t)}function _i(t){if(t.__next_tick_callbacks&&t.__next_tick_callbacks.length){if(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG){var e=t.$scope;console.log("["+ +new Date+"]["+(e.is||e.route)+"]["+t._uid+"]:flushCallbacks["+t.__next_tick_callbacks.length+"]")}var n=t.__next_tick_callbacks.slice(0);t.__next_tick_callbacks.length=0;for(var i=0;i<n.length;i++)n[i]()}}function Bi(t){return Ln.find(function(e){return t._watcher===e})}function zi(t,e){if(!t.__next_tick_pending&&!Bi(t)){if(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG){var n=t.$scope;console.log("["+ +new Date+"]["+(n.is||n.route)+"]["+t._uid+"]:nextVueTick")}return le(e,t)}if(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG){var i=t.$scope;console.log("["+ +new Date+"]["+(i.is||i.route)+"]["+t._uid+"]:nextMPTick")}var r;if(t.__next_tick_callbacks||(t.__next_tick_callbacks=[]),t.__next_tick_callbacks.push(function(){if(e)try{e.call(t)}catch(er){Jt(er,t,"nextTick")}else r&&r(t)}),!e&&"undefined"!==typeof Promise)return new Promise(function(t){r=t})}function Fi(t){var e=Object.create(null),n=[].concat(Object.keys(t._data||{}),Object.keys(t._computedWatchers||{}));return n.reduce(function(e,n){return e[n]=t[n],e},e),Object.assign(e,t.$mp.data||{}),Array.isArray(t.$options.behaviors)&&-1!==t.$options.behaviors.indexOf("uni://form-field")&&(e["name"]=t.name,e["value"]=t.value),JSON.parse(JSON.stringify(e))}var Ni=function(t,e){var n=this;if(null!==e&&("page"===this.mpType||"component"===this.mpType)){var i=this.$scope,r=Object.create(null);try{r=Fi(this)}catch(s){console.error(s)}r.__webviewId__=i.data.__webviewId__;var a=Object.create(null);Object.keys(r).forEach(function(t){a[t]=i.data[t]});var o=Oi(r,a);Object.keys(o).length?(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG&&console.log("["+ +new Date+"]["+(i.is||i.route)+"]["+this._uid+"]差量更新",JSON.stringify(o)),this.__next_tick_pending=!0,i.setData(o,function(){n.__next_tick_pending=!1,_i(n)})):_i(this)}};function Hi(){}function Wi(t,e,n){if(!t.mpType)return t;"app"===t.mpType&&(t.$options.render=Hi),t.$options.render||(t.$options.render=Hi),"mp-toutiao"!==t.mpHost&&On(t,"beforeMount");var i=function(){t._update(t._render(),n)};return new Gn(t,i,E,{before:function(){t._isMounted&&!t._isDestroyed&&On(t,"beforeUpdate")}},!0),n=!1,t}function Qi(t,e){return r(t)||r(e)?Vi(t,Xi(e)):""}function Vi(t,e){return t?e?t+" "+e:t:e||""}function Xi(t){return Array.isArray(t)?qi(t):l(t)?Gi(t):"string"===typeof t?t:""}function qi(t){for(var e,n="",i=0,a=t.length;i<a;i++)r(e=Xi(t[i]))&&""!==e&&(n&&(n+=" "),n+=e);return n}function Gi(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}var Zi=b(function(t){var e={},n=/;(?![^(]*\))/g,i=/:(.+)/;return t.split(n).forEach(function(t){if(t){var n=t.split(i);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e});function Yi(t){return Array.isArray(t)?L(t):"string"===typeof t?Zi(t):t}var Ji=["createSelectorQuery","createIntersectionObserver","selectAllComponents","selectComponent"];function Ui(t,e){var n=e.split("."),i=n[0];return 0===i.indexOf("__$n")&&(i=parseInt(i.replace("__$n",""))),1===n.length?t[i]:Ui(t[i],n.slice(1).join("."))}function Ki(t){t.config.errorHandler=function(t){console.error(t)};var e=t.prototype.$emit;t.prototype.$emit=function(t){return this.$scope&&t&&this.$scope["triggerEvent"](t,{__args__:D(arguments,1)}),e.apply(this,arguments)},t.prototype.$nextTick=function(t){return zi(this,t)},Ji.forEach(function(e){t.prototype[e]=function(t){if(this.$scope)return this.$scope[e](t)}}),t.prototype.__init_provide=be,t.prototype.__init_injections=Se,t.prototype.__call_hook=function(t,e){var n=this;pt();var i,r=n.$options[t],a=t+" hook";if(r)for(var o=0,s=r.length;o<s;o++)i=Ut(r[o],n,e?[e]:null,n,a);return n._hasHookEvent&&n.$emit("hook:"+t),ft(),i},t.prototype.__set_model=function(t,e,n,i){Array.isArray(i)&&(-1!==i.indexOf("trim")&&(n=n.trim()),-1!==i.indexOf("number")&&(n=this._n(n))),t||(t=this),t[e]=n},t.prototype.__set_sync=function(t,e,n){t||(t=this),t[e]=n},t.prototype.__get_orig=function(t){return u(t)&&t["$orig"]||t},t.prototype.__get_value=function(t,e){return Ui(e||this,t)},t.prototype.__get_class=function(t,e){return Qi(e,t)},t.prototype.__get_style=function(t,e){if(!t&&!e)return"";var n=Yi(t),i=e?O(e,n):n;return Object.keys(i).map(function(t){return I(t)+":"+i[t]}).join(";")},t.prototype.__map=function(t,e){var n,i,r,a,o;if(Array.isArray(t)){for(n=new Array(t.length),i=0,r=t.length;i<r;i++)n[i]=e(t[i],i);return n}if(l(t)){for(a=Object.keys(t),n=Object.create(null),i=0,r=a.length;i<r;i++)o=a[i],n[o]=e(t[o],o,i);return n}return[]}}var $i=["onLaunch","onShow","onHide","onUniNViewMessage","onError","onLoad","onReady","onUnload","onPullDownRefresh","onReachBottom","onTabItemTap","onShareAppMessage","onResize","onPageScroll","onNavigationBarButtonTap","onBackPress","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked","onPageShow","onPageHide","onPageResize"];function tr(t){var e=t.extend;t.extend=function(t){t=t||{};var n=t.methods;return n&&Object.keys(n).forEach(function(e){-1!==$i.indexOf(e)&&(t[e]=n[e],delete n[e])}),e.call(this,t)};var n=t.config.optionMergeStrategies,i=n.created;$i.forEach(function(t){n[t]=i}),t.prototype.__lifecycle_hooks__=$i}di.prototype.__patch__=Ni,di.prototype.$mount=function(t,e){return Wi(this,t,e)},tr(di),Ki(di),e["default"]=di}.call(this,n("c8ba"))},"6e42":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.createApp=de,e.createComponent=Pe,e.createPage=we,e.default=void 0;var i=r(n("66fd"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e){return l(t)||s(t,e)||o()}function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function s(t,e){var n=[],i=!0,r=!1,a=void 0;try{for(var o,s=t[Symbol.iterator]();!(i=(o=s.next()).done);i=!0)if(n.push(o.value),e&&n.length===e)break}catch(l){r=!0,a=l}finally{try{i||null==s["return"]||s["return"]()}finally{if(r)throw a}}return n}function l(t){if(Array.isArray(t))return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t){return f(t)||p(t)||h()}function h(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function p(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function f(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var d=Object.prototype.toString,g=Object.prototype.hasOwnProperty;function v(t){return"function"===typeof t}function A(t){return"string"===typeof t}function y(t){return"[object Object]"===d.call(t)}function x(t,e){return g.call(t,e)}function m(){}function b(t){var e=Object.create(null);return function(n){var i=e[n];return i||(e[n]=t(n))}}var S=/-(\w)/g,w=b(function(t){return t.replace(S,function(t,e){return e?e.toUpperCase():""})}),P=["invoke","success","fail","complete","returnValue"],T={},I={};function C(t,e){var n=e?t?t.concat(e):Array.isArray(e)?e:[e]:t;return n?k(n):n}function k(t){for(var e=[],n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}function j(t,e){var n=t.indexOf(e);-1!==n&&t.splice(n,1)}function D(t,e){Object.keys(e).forEach(function(n){-1!==P.indexOf(n)&&v(e[n])&&(t[n]=C(t[n],e[n]))})}function O(t,e){t&&e&&Object.keys(e).forEach(function(n){-1!==P.indexOf(n)&&v(e[n])&&j(t[n],e[n])})}function L(t,e){"string"===typeof t&&y(e)?D(I[t]||(I[t]={}),e):y(t)&&D(T,t)}function E(t,e){"string"===typeof t?y(e)?O(I[t],e):delete I[t]:y(t)&&O(T,t)}function M(t){return function(e){return t(e)||e}}function R(t){return!!t&&("object"===typeof t||"function"===typeof t)&&"function"===typeof t.then}function _(t,e){for(var n=!1,i=0;i<t.length;i++){var r=t[i];if(n)n=Promise.then(M(r));else{var a=r(e);if(R(a)&&(n=Promise.resolve(a)),!1===a)return{then:function(){}}}}return n||{then:function(t){return t(e)}}}function B(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return["success","fail","complete"].forEach(function(n){if(Array.isArray(t[n])){var i=e[n];e[n]=function(e){_(t[n],e).then(function(t){return v(i)&&i(t)||t})}}}),e}function z(t,e){var n=[];Array.isArray(T.returnValue)&&n.push.apply(n,u(T.returnValue));var i=I[t];return i&&Array.isArray(i.returnValue)&&n.push.apply(n,u(i.returnValue)),n.forEach(function(t){e=t(e)||e}),e}function F(t){var e=Object.create(null);Object.keys(T).forEach(function(t){"returnValue"!==t&&(e[t]=T[t].slice())});var n=I[t];return n&&Object.keys(n).forEach(function(t){"returnValue"!==t&&(e[t]=(e[t]||[]).concat(n[t]))}),e}function N(t,e,n){for(var i=arguments.length,r=new Array(i>3?i-3:0),a=3;a<i;a++)r[a-3]=arguments[a];var o=F(t);if(o&&Object.keys(o).length){if(Array.isArray(o.invoke)){var s=_(o.invoke,n);return s.then(function(t){return e.apply(void 0,[B(o,t)].concat(r))})}return e.apply(void 0,[B(o,n)].concat(r))}return e.apply(void 0,[n].concat(r))}var H={returnValue:function(t){return R(t)?t.then(function(t){return t[1]}).catch(function(t){return t[0]}):t}},W=/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/,Q=/^create|Manager$/,V=/^on/;function X(t){return Q.test(t)}function q(t){return W.test(t)}function G(t){return V.test(t)&&"onPush"!==t}function Z(t){return t.then(function(t){return[null,t]}).catch(function(t){return[t]})}function Y(t){return!(X(t)||q(t)||G(t))}function J(t,e){return Y(t)?function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length,r=new Array(i>1?i-1:0),a=1;a<i;a++)r[a-1]=arguments[a];return v(n.success)||v(n.fail)||v(n.complete)?z(t,N.apply(void 0,[t,e,n].concat(r))):z(t,Z(new Promise(function(i,a){N.apply(void 0,[t,e,Object.assign({},n,{success:i,fail:a})].concat(r)),Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then(function(n){return e.resolve(t()).then(function(){return n})},function(n){return e.resolve(t()).then(function(){throw n})})})})))}:e}var U=1e-4,K=750,$=!1,tt=0,et=0;function nt(){var t=wx.getSystemInfoSync(),e=t.platform,n=t.pixelRatio,i=t.windowWidth;tt=i,et=n,$="ios"===e}function it(t,e){if(0===tt&&nt(),t=Number(t),0===t)return 0;var n=t/K*(e||tt);return n<0&&(n=-n),n=Math.floor(n+U),0===n?1!==et&&$?.5:1:t<0?-n:n}var rt={promiseInterceptor:H},at=Object.freeze({upx2px:it,interceptors:rt,addInterceptor:L,removeInterceptor:E}),ot={},st=[],lt=[],ct=["success","fail","cancel","complete"];function ut(t,e,n){return function(i){return e(pt(t,i,n))}}function ht(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},r=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(y(e)){var a=!0===r?e:{};for(var o in v(n)&&(n=n(e,a)||{}),e)if(x(n,o)){var s=n[o];v(s)&&(s=s(e[o],e,a)),s?A(s)?a[s]=e[o]:y(s)&&(a[s.name?s.name:o]=s.value):console.warn("app-plus ".concat(t,"暂不支持").concat(o))}else-1!==ct.indexOf(o)?a[o]=ut(t,e[o],i):r||(a[o]=e[o]);return a}return v(e)&&(e=ut(t,e,i)),e}function pt(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return v(ot.returnValue)&&(e=ot.returnValue(t,e)),ht(t,e,n,{},i)}function ft(t,e){if(x(ot,t)){var n=ot[t];return n?function(e,i){var r=n;v(n)&&(r=n(e)),e=ht(t,e,r.args,r.returnValue);var a=[e];"undefined"!==typeof i&&a.push(i);var o=wx[r.name||t].apply(wx,a);return q(t)?pt(t,o,r.returnValue,X(t)):o}:function(){console.error("app-plus 暂不支持".concat(t))}}return e}var dt=Object.create(null),gt=["onTabBarMidButtonTap","subscribePush","unsubscribePush","onPush","offPush","share"];function vt(t){return function(e){var n=e.fail,i=e.complete,r={errMsg:"".concat(t,":fail:暂不支持 ").concat(t," 方法")};v(n)&&n(r),v(i)&&i(r)}}gt.forEach(function(t){dt[t]=vt(t)});var At=function(){return"function"===typeof getUniEmitter?getUniEmitter:function(){return t||(t=new i.default),t};var t}();function yt(t,e,n){return t[e].apply(t,n)}function xt(){return yt(At(),"$on",Array.prototype.slice.call(arguments))}function mt(){return yt(At(),"$off",Array.prototype.slice.call(arguments))}function bt(){return yt(At(),"$once",Array.prototype.slice.call(arguments))}function St(){return yt(At(),"$emit",Array.prototype.slice.call(arguments))}var wt=Object.freeze({$on:xt,$off:mt,$once:bt,$emit:St});function Pt(t){return"undefined"!==typeof weex?weex.requireModule(t):__requireNativePlugin__(t)}function Tt(t){t.$processed=!0,t.postMessage=function(e){plus.webview.postMessageToUniNView({type:"UniAppSubNVue",data:e},t.id)};var e=[];if(t.onMessage=function(t){e.push(t)},t.$consumeMessage=function(t){e.forEach(function(e){return e(t)})},t.__uniapp_mask_id){var n=t.__uniapp_mask,i="0"===t.__uniapp_mask_id?{setStyle:function(t){var e=t.mask;Pt("uni-tabview").setMask({color:e})}}:plus.webview.getWebviewById(t.__uniapp_mask_id),r=t.show,a=t.hide,o=t.close,s=function(){i.setStyle({mask:n})},l=function(){i.setStyle({mask:"none"})};t.show=function(){s();for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return r.apply(t,n)},t.hide=function(){l();for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return a.apply(t,n)},t.close=function(){l(),e=[];for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return o.apply(t,i)}}}function It(t){var e=plus.webview.getWebviewById(t);return e&&!e.$processed&&Tt(e),e}var Ct=Object.freeze({getSubNVueById:It,requireNativePlugin:Pt}),kt=Page,jt=Component,Dt=/:/g,Ot=b(function(t){return w(t.replace(Dt,"-"))});function Lt(t){if(wx.canIUse("nextTick")){var e=t.triggerEvent;t.triggerEvent=function(n){for(var i=arguments.length,r=new Array(i>1?i-1:0),a=1;a<i;a++)r[a-1]=arguments[a];return e.apply(t,[Ot(n)].concat(r))}}}function Et(t,e){var n=e[t];e[t]=n?function(){Lt(this);for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return n.apply(this,e)}:function(){Lt(this)}}Page=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Et("onLoad",t),kt(t)},Component=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Et("created",t),jt(t)};var Mt=["onPullDownRefresh","onReachBottom","onShareAppMessage","onPageScroll","onResize","onTabItemTap"];function Rt(t,e){var n=t.$mp[t.mpType];e.forEach(function(e){x(n,e)&&(t[e]=n[e])})}function _t(t,e){if(!e)return!0;if(i.default.options&&Array.isArray(i.default.options[t]))return!0;if(e=e.default||e,v(e))return!!v(e.extendOptions[t])||!!(e.super&&e.super.options&&Array.isArray(e.super.options[t]));if(v(e[t]))return!0;var n=e.mixins;return Array.isArray(n)?!!n.find(function(e){return _t(t,e)}):void 0}function Bt(t,e,n){e.forEach(function(e){_t(e,n)&&(t[e]=function(t){return this.$vm&&this.$vm.__call_hook(e,t)})})}function zt(t,e){var n;return e=e.default||e,v(e)?(n=e,e=n.extendOptions):n=t.extend(e),[n,e]}function Ft(t,e){if(Array.isArray(e)&&e.length){var n=Object.create(null);e.forEach(function(t){n[t]=!0}),t.$scopedSlots=t.$slots=n}}function Nt(t,e){t=(t||"").split(",");var n=t.length;1===n?e._$vueId=t[0]:2===n&&(e._$vueId=t[0],e._$vuePid=t[1])}function Ht(t,e){var n=t.data||{},i=t.methods||{};if("function"===typeof n)try{n=n.call(e)}catch(r){Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG&&console.warn("根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。",n)}else try{n=JSON.parse(JSON.stringify(n))}catch(r){}return y(n)||(n={}),Object.keys(i).forEach(function(t){-1!==e.__lifecycle_hooks__.indexOf(t)||x(n,t)||(n[t]=i[t])}),n}var Wt=[String,Number,Boolean,Object,Array,null];function Qt(t){return function(e,n){this.$vm&&(this.$vm[t]=e)}}function Vt(t,e){var n=t["behaviors"],i=t["extends"],r=t["mixins"],a=t["props"];a||(t["props"]=a=[]);var o=[];return Array.isArray(n)&&n.forEach(function(t){o.push(t.replace("uni://","wx".concat("://"))),"uni://form-field"===t&&(Array.isArray(a)?(a.push("name"),a.push("value")):(a["name"]={type:String,default:""},a["value"]={type:[String,Number,Boolean,Array,Object,Date],default:""}))}),y(i)&&i.props&&o.push(e({properties:qt(i.props,!0)})),Array.isArray(r)&&r.forEach(function(t){y(t)&&t.props&&o.push(e({properties:qt(t.props,!0)}))}),o}function Xt(t,e,n,i){return Array.isArray(e)&&1===e.length?e[0]:e}function qt(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=(arguments.length>2&&void 0!==arguments[2]&&arguments[2],{});return e||(n.vueId={type:String,value:""},n.vueSlots={type:null,value:[],observer:function(t,e){var n=Object.create(null);t.forEach(function(t){n[t]=!0}),this.setData({$slots:n})}}),Array.isArray(t)?t.forEach(function(t){n[t]={type:null,observer:Qt(t)}}):y(t)&&Object.keys(t).forEach(function(e){var i=t[e];if(y(i)){var r=i["default"];v(r)&&(r=r()),i.type=Xt(e,i.type),n[e]={type:-1!==Wt.indexOf(i.type)?i.type:null,value:r,observer:Qt(e)}}else{var a=Xt(e,i);n[e]={type:-1!==Wt.indexOf(a)?a:null,observer:Qt(e)}}}),n}function Gt(t){try{t.mp=JSON.parse(JSON.stringify(t))}catch(e){}return t.stopPropagation=m,t.preventDefault=m,t.target=t.target||{},x(t,"detail")||(t.detail={}),y(t.detail)&&(t.target=Object.assign({},t.target,t.detail)),t}function Zt(t,e){var n=t;return e.forEach(function(e){var i=e[0],r=e[2];if(i||"undefined"!==typeof r){var a=e[1],o=e[3],s=i?t.__get_value(i,n):n;Number.isInteger(s)?n=r:a?Array.isArray(s)?n=s.find(function(e){return t.__get_value(a,e)===r}):y(s)?n=Object.keys(s).find(function(e){return t.__get_value(a,s[e])===r}):console.error("v-for 暂不支持循环数据：",s):n=s[r],o&&(n=t.__get_value(o,n))}}),n}function Yt(t,e,n){var i={};return Array.isArray(e)&&e.length&&e.forEach(function(e,r){"string"===typeof e?e?"$event"===e?i["$"+r]=n:0===e.indexOf("$event.")?i["$"+r]=t.__get_value(e.replace("$event.",""),n):i["$"+r]=t.__get_value(e):i["$"+r]=t:i["$"+r]=Zt(t,e)}),i}function Jt(t){for(var e={},n=1;n<t.length;n++){var i=t[n];e[i[0]]=i[1]}return e}function Ut(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],r=arguments.length>4?arguments[4]:void 0,a=arguments.length>5?arguments[5]:void 0,o=!1;if(r&&(o=e.currentTarget&&e.currentTarget.dataset&&"wx"===e.currentTarget.dataset.comType,!n.length))return o?[e]:e.detail.__args__||e.detail;var s=Yt(t,i,e),l=[];return n.forEach(function(t){"$event"===t?"__set_model"!==a||r?r&&!o?l.push(e.detail.__args__[0]):l.push(e):l.push(e.target.value):Array.isArray(t)&&"o"===t[0]?l.push(Jt(t)):"string"===typeof t&&x(s,t)?l.push(s[t]):l.push(t)}),l}var Kt="~",$t="^";function te(t,e){return t===e||"regionchange"===e&&("begin"===t||"end"===t)}function ee(t){var e=this;t=Gt(t);var n=(t.currentTarget||t.target).dataset;if(!n)return console.warn("事件信息不存在");var i=n.eventOpts||n["event-opts"];if(!i)return console.warn("事件信息不存在");var r=t.type,a=[];return i.forEach(function(n){var i=n[0],o=n[1],s=i.charAt(0)===$t;i=s?i.slice(1):i;var l=i.charAt(0)===Kt;i=l?i.slice(1):i,o&&te(r,i)&&o.forEach(function(n){var i=n[0];if(i){var r=e.$vm;if(r.$options.generic&&r.$parent&&r.$parent.$parent&&(r=r.$parent.$parent),"$emit"===i)return void r.$emit.apply(r,Ut(e.$vm,t,n[1],n[2],s,i));var o=r[i];if(!v(o))throw new Error(" _vm.".concat(i," is not a function"));if(l){if(o.once)return;o.once=!0}a.push(o.apply(r,Ut(e.$vm,t,n[1],n[2],s,i)))}})}),"input"===r&&1===a.length&&"undefined"!==typeof a[0]?a[0]:void 0}var ne=["onShow","onHide","onError","onPageNotFound"];function ie(t,e){var n=e.mocks,r=e.initRefs;t.$options.store&&(i.default.prototype.$store=t.$options.store),i.default.prototype.mpHost="app-plus",i.default.mixin({beforeCreate:function(){this.$options.mpType&&(this.mpType=this.$options.mpType,this.$mp=c({data:{}},this.mpType,this.$options.mpInstance),this.$scope=this.$options.mpInstance,delete this.$options.mpType,delete this.$options.mpInstance,"app"!==this.mpType&&(r(this),Rt(this,n)))}});var a={onLaunch:function(e){this.$vm||(this.$vm=t,this.$vm.$mp={app:this},this.$vm.$scope=this,this.$vm.globalData=this.globalData,this.$vm._isMounted=!0,this.$vm.__call_hook("mounted",e),this.$vm.__call_hook("onLaunch",e))}};a.globalData=t.$options.globalData||{};var o=t.$options.methods;return o&&Object.keys(o).forEach(function(t){a[t]=o[t]}),Bt(a,ne),a}var re=["__route__","__wxExparserNodeId__","__wxWebviewId__"];function ae(t,e){var n=t.$children,i=n.find(function(t){return t.$scope._$vueId===e});if(i)return i;for(var r=n.length-1;r>=0;r--)if(i=ae(n[r],e),i)return i}function oe(t){return Behavior(t)}function se(){return!!this.route}function le(t){this.triggerEvent("__l",t)}function ce(t){var e=t.$scope;Object.defineProperty(t,"$refs",{get:function(){var t={},n=e.selectAllComponents(".vue-ref");n.forEach(function(e){var n=e.dataset.ref;t[n]=e.$vm||e});var i=e.selectAllComponents(".vue-ref-in-for");return i.forEach(function(e){var n=e.dataset.ref;t[n]||(t[n]=[]),t[n].push(e.$vm||e)}),t}})}function ue(t){var e,n=t.detail||t.value,i=n.vuePid,r=n.vueOptions;i&&(e=ae(this.$vm,i)),e||(e=this.$vm),r.parent=e}function he(t){return ie(t,{mocks:re,initRefs:ce})}var pe=["onUniNViewMessage"];function fe(t){var e=he(t);return Bt(e,pe),e}function de(t){return App(fe(t)),t}function ge(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.isPage,r=e.initRelation,o=zt(i.default,t),s=a(o,2),l=s[0],c=s[1],u={multipleSlots:!0,addGlobalClass:!0},h={options:u,data:Ht(c,i.default.prototype),behaviors:Vt(c,oe),properties:qt(c.props,!1,c.__file),lifetimes:{attached:function(){var t=this.properties,e={mpType:n.call(this)?"page":"component",mpInstance:this,propsData:t};Nt(t.vueId,this),r.call(this,{vuePid:this._$vuePid,vueOptions:e}),this.$vm=new l(e),Ft(this.$vm,t.vueSlots),this.$vm.$mount()},ready:function(){this.$vm&&(this.$vm._isMounted=!0,this.$vm.__call_hook("mounted"),this.$vm.__call_hook("onReady"))},detached:function(){this.$vm.$destroy()}},pageLifetimes:{show:function(t){this.$vm&&this.$vm.__call_hook("onPageShow",t)},hide:function(){this.$vm&&this.$vm.__call_hook("onPageHide")},resize:function(t){this.$vm&&this.$vm.__call_hook("onPageResize",t)}},methods:{__l:ue,__e:ee}};return Array.isArray(c.wxsCallMethods)&&c.wxsCallMethods.forEach(function(t){h.methods[t]=function(e){return this.$vm[t](e)}}),n?h:[h,l]}function ve(t){return ge(t,{isPage:se,initRelation:le})}function Ae(t){var e=ve(t);return e.methods.$getAppWebview=function(){return plus.webview.getWebviewById("".concat(this.__wxWebviewId__))},e}var ye=["onShow","onHide","onUnload"];function xe(t,e){e.isPage,e.initRelation;var n=Ae(t);return Bt(n.methods,ye,t),n.methods.onLoad=function(t){this.$vm.$mp.query=t,this.$vm.__call_hook("onLoad",t)},n}function me(t){return xe(t,{isPage:se,initRelation:le})}ye.push.apply(ye,Mt);var be=["onBackPress","onNavigationBarButtonTap","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked"];function Se(t){var e=me(t);return Bt(e.methods,be),e}function we(t){return Component(Se(t))}function Pe(t){return Component(Ae(t))}st.forEach(function(t){ot[t]=!1}),lt.forEach(function(t){var e=ot[t]&&ot[t].name?ot[t].name:t;wx.canIUse(e)||(ot[t]=!1)});var Te={};Object.keys(at).forEach(function(t){Te[t]=at[t]}),Object.keys(wt).forEach(function(t){Te[t]=wt[t]}),Object.keys(Ct).forEach(function(t){Te[t]=J(t,Ct[t])}),Object.keys(wx).forEach(function(t){(x(wx,t)||x(ot,t))&&(Te[t]=J(t,ft(t,wx[t])))}),"undefined"!==typeof t&&(t.uni=Te,t.UniEmitter=wt),wx.createApp=de,wx.createPage=we,wx.createComponent=Pe;var Ie=Te,Ce=Ie;e.default=Ce}).call(this,n("c8ba"))},8189:function(t){t.exports={_from:"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001",_id:"@dcloudio/uni-stat@2.0.0-v3-24020191018001",_inBundle:!1,_integrity:"sha512-nYBm5pRrYzrj2dKMqucWSF2PwInUMnn3MLHM/ik3gnLUEKSW61rzcY1RPlUwaH7c+Snm6N+bAJzmj3GvlrlVXA==",_location:"/@dcloudio/uni-stat",_phantomChildren:{},_requested:{type:"range",registry:!0,raw:"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001",name:"@dcloudio/uni-stat",escapedName:"@dcloudio%2funi-stat",scope:"@dcloudio",rawSpec:"^2.0.0-alpha-24420191128001",saveSpec:null,fetchSpec:"^2.0.0-alpha-24420191128001"},_requiredBy:["/","/@dcloudio/vue-cli-plugin-uni"],_resolved:"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-v3-24020191018001.tgz",_shasum:"6ef04326cc0b945726413eebe442ab8f47c7536c",_spec:"@dcloudio/uni-stat@^2.0.0-alpha-24420191128001",_where:"/Users/guoshengqiang/Documents/dcloud-plugins/alpha/uniapp-cli",author:"",bugs:{url:"https://github.com/dcloudio/uni-app/issues"},bundleDependencies:!1,deprecated:!1,description:"",devDependencies:{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5",eslint:"^6.1.0",rollup:"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},files:["dist","package.json","LICENSE"],gitHead:"197e8df53cc9d4c3f6eb722b918ccf51672b5cfe",homepage:"https://github.com/dcloudio/uni-app#readme",license:"Apache-2.0",main:"dist/index.js",name:"@dcloudio/uni-stat",repository:{type:"git",url:"git+https://github.com/dcloudio/uni-app.git",directory:"packages/uni-stat"},scripts:{build:"NODE_ENV=production rollup -c rollup.config.js",dev:"NODE_ENV=development rollup -w -c rollup.config.js"},version:"2.0.0-v3-24020191018001"}},8460:function(t,e,n){},"921b":function(t,e,n){"use strict";(function(t){var e=n("8189");function i(t,e){return!e||"object"!==typeof e&&"function"!==typeof e?r(t):e}function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}function o(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}function s(t,e){return s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},s(t,e)}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function u(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}var h=e.version,p="https://tongji.dcloud.io/uni/stat",f="https://tongji.dcloud.io/uni/stat.gif",d=1800,g=300,v=10,A="__DC_STAT_UUID",y="__DC_UUID_VALUE";function x(){var e="";if("n"===w()){try{e=plus.runtime.getDCloudId()}catch(n){e=""}return e}try{e=t.getStorageSync(A)}catch(n){e=y}if(!e){e=Date.now()+""+Math.floor(1e7*Math.random());try{t.setStorageSync(A,e)}catch(n){t.setStorageSync(A,y)}}return e}var m=function(t){var e=Object.keys(t),n=e.sort(),i={},r="";for(var a in n)i[n[a]]=t[n[a]],r+=n[a]+"="+t[n[a]]+"&";return{sign:"",options:r.substr(0,r.length-1)}},b=function(t){var e="";for(var n in t)e+=n+"="+t[n]+"&";return e.substr(0,e.length-1)},S=function(){return parseInt((new Date).getTime()/1e3)},w=function(){var t={"app-plus":"n",h5:"h5","mp-weixin":"wx","mp-alipay":"ali","mp-baidu":"bd","mp-toutiao":"tt","mp-qq":"qq"};return t["app-plus"]},P=function(){var e="";return"wx"!==w()&&"qq"!==w()||t.canIUse("getAccountInfoSync")&&(e=t.getAccountInfoSync().miniProgram.appId||""),e},T=function(){return"n"===w()?plus.runtime.version:""},I=function(){var t=w(),e="";return"n"===t&&(e=plus.runtime.channel),e},C=function(e){var n=w(),i="";return e||("wx"===n&&(i=t.getLaunchOptionsSync().scene),i)},k="First__Visit__Time",j="Last__Visit__Time",D=function(){var e=t.getStorageSync(k),n=0;return e?n=e:(n=S(),t.setStorageSync(k,n),t.removeStorageSync(j)),n},O=function(){var e=t.getStorageSync(j),n=0;return n=e||"",t.setStorageSync(j,S()),n},L="__page__residence__time",E=0,M=0,R=function(){return E=S(),"n"===w()&&t.setStorageSync(L,S()),E},_=function(){return M=S(),"n"===w()&&(E=t.getStorageSync(L)),M-E},B="Total__Visit__Count",z=function(){var e=t.getStorageSync(B),n=1;return e&&(n=e,n++),t.setStorageSync(B,n),n},F=function(t){var e={};for(var n in t)e[n]=encodeURIComponent(t[n]);return e},N=0,H=0,W=function(){var t=(new Date).getTime();return N=t,H=0,t},Q=function(){var t=(new Date).getTime();return H=t,t},V=function(t){var e=0;if(0!==N&&(e=H-N),e=parseInt(e/1e3),e=e<1?1:e,"app"===t){var n=e>g;return{residenceTime:e,overtime:n}}if("page"===t){var i=e>d;return{residenceTime:e,overtime:i}}return{residenceTime:e}},X=function(){var t=getCurrentPages(),e=t[t.length-1],n=e.$vm;return"bd"===w()?n.$mp&&n.$mp.page.is:n.$scope&&n.$scope.route||n.$mp&&n.$mp.page.route},q=function(t){var e=getCurrentPages(),n=e[e.length-1],i=n.$vm,r=t._query,a=r&&"{}"!==JSON.stringify(r)?"?"+JSON.stringify(r):"";return t._query="","bd"===w()?i.$mp&&i.$mp.page.is+a:i.$scope&&i.$scope.route+a||i.$mp&&i.$mp.page.route+a},G=function(t){return!!("page"===t.mpType||t.$mp&&"page"===t.$mp.mpType||"page"===t.$options.mpType)},Z=function(t,e){return t?"string"!==typeof t?(console.error("uni.report [eventName] 参数类型错误,只能为 String 类型"),!0):t.length>255?(console.error("uni.report [eventName] 参数长度不能大于 255"),!0):"string"!==typeof e&&"object"!==typeof e?(console.error("uni.report [options] 参数类型错误,只能为 String 或 Object 类型"),!0):"string"===typeof e&&e.length>255?(console.error("uni.report [options] 参数长度不能大于 255"),!0):"title"===t&&"string"!==typeof e?(console.error("uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型"),!0):void 0:(console.error("uni.report 缺少 [eventName] 参数"),!0)},Y=n("13f7").default,J=n("bf0f").default||n("bf0f"),U=t.getSystemInfoSync(),K=function(){function e(){l(this,e),this.self="",this._retry=0,this._platform="",this._query={},this._navigationBarTitle={config:"",page:"",report:"",lt:""},this._operatingTime=0,this._reportingRequestData={1:[],11:[]},this.__prevent_triggering=!1,this.__licationHide=!1,this.__licationShow=!1,this._lastPageRoute="",this.statData={uuid:x(),ut:w(),mpn:P(),ak:J.appid,usv:h,v:T(),ch:I(),cn:"",pn:"",ct:"",t:S(),tt:"",p:"android"===U.platform?"a":"i",brand:U.brand||"",md:U.model,sv:U.system.replace(/(Android|iOS)\s/,""),mpsdk:U.SDKVersion||"",mpv:U.version||"",lang:U.language,pr:U.pixelRatio,ww:U.windowWidth,wh:U.windowHeight,sw:U.screenWidth,sh:U.screenHeight}}return u(e,[{key:"_applicationShow",value:function(){if(this.__licationHide){Q();var t=V("app");if(t.overtime){var e={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(e)}this.__licationHide=!1}}},{key:"_applicationHide",value:function(t,e){this.__licationHide=!0,Q();var n=V();W();var i=q(this);this._sendHideRequest({urlref:i,urlref_ts:n.residenceTime},e)}},{key:"_pageShow",value:function(){var t=q(this),e=X();if(this._navigationBarTitle.config=Y&&Y.pages[e]&&Y.pages[e].titleNView&&Y.pages[e].titleNView.titleText||Y&&Y.pages[e]&&Y.pages[e].navigationBarTitleText||"",this.__licationShow)return W(),this.__licationShow=!1,void(this._lastPageRoute=t);Q(),this._lastPageRoute=t;var n=V("page");if(n.overtime){var i={path:this._lastPageRoute,scene:this.statData.sc};this._sendReportRequest(i)}W()}},{key:"_pageHide",value:function(){if(!this.__licationHide){Q();var t=V("page");return this._sendPageRequest({url:this._lastPageRoute,urlref:this._lastPageRoute,urlref_ts:t.residenceTime}),void(this._navigationBarTitle={config:"",page:"",report:"",lt:""})}}},{key:"_login",value:function(){this._sendEventRequest({key:"login"},0)}},{key:"_share",value:function(){this._sendEventRequest({key:"share"},0)}},{key:"_payment",value:function(t){this._sendEventRequest({key:t},0)}},{key:"_sendReportRequest",value:function(t){this._navigationBarTitle.lt="1";var e=t.query&&"{}"!==JSON.stringify(t.query)?"?"+JSON.stringify(t.query):"";this.statData.lt="1",this.statData.url=t.path+e||"",this.statData.t=S(),this.statData.sc=C(t.scene),this.statData.fvts=D(),this.statData.lvts=O(),this.statData.tvc=z(),"n"===w()?this.getProperty():this.getNetworkInfo()}},{key:"_sendPageRequest",value:function(t){var e=t.url,n=t.urlref,i=t.urlref_ts;this._navigationBarTitle.lt="11";var r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"11",ut:this.statData.ut,url:e,tt:this.statData.tt,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:S(),p:this.statData.p};this.request(r)}},{key:"_sendHideRequest",value:function(t,e){var n=t.urlref,i=t.urlref_ts,r={ak:this.statData.ak,uuid:this.statData.uuid,lt:"3",ut:this.statData.ut,urlref:n,urlref_ts:i,ch:this.statData.ch,usv:this.statData.usv,t:S(),p:this.statData.p};this.request(r,e)}},{key:"_sendEventRequest",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.key,n=void 0===e?"":e,i=t.value,r=void 0===i?"":i,a=this._lastPageRoute,o={ak:this.statData.ak,uuid:this.statData.uuid,lt:"21",ut:this.statData.ut,url:a,ch:this.statData.ch,e_n:n,e_v:"object"===typeof r?JSON.stringify(r):r.toString(),usv:this.statData.usv,t:S(),p:this.statData.p};this.request(o)}},{key:"getNetworkInfo",value:function(){var e=this;t.getNetworkType({success:function(t){e.statData.net=t.networkType,e.getLocation()}})}},{key:"getProperty",value:function(){var t=this;plus.runtime.getProperty(plus.runtime.appid,function(e){t.statData.v=e.version||"",t.getNetworkInfo()})}},{key:"getLocation",value:function(){var e=this;J.getLocation?t.getLocation({type:"wgs84",geocode:!0,success:function(t){t.address&&(e.statData.cn=t.address.country,e.statData.pn=t.address.province,e.statData.ct=t.address.city),e.statData.lat=t.latitude,e.statData.lng=t.longitude,e.request(e.statData)}}):(this.statData.lat=0,this.statData.lng=0,this.request(this.statData))}},{key:"request",value:function(e,n){var i=this,r=S(),a=this._navigationBarTitle;e.ttn=a.page,e.ttpj=a.config,e.ttc=a.report;var o=this._reportingRequestData;if("n"===w()&&(o=t.getStorageSync("__UNI__STAT__DATA")||{}),o[e.lt]||(o[e.lt]=[]),o[e.lt].push(e),"n"===w()&&t.setStorageSync("__UNI__STAT__DATA",o),!(_()<v)||n){var s=this._reportingRequestData;"n"===w()&&(s=t.getStorageSync("__UNI__STAT__DATA")),R();var l=[],c=[],u=[],p=function(t){var e=s[t];e.forEach(function(e){var n=b(e);0===t?l.push(n):3===t?u.push(n):c.push(n)})};for(var f in s)p(f);l.push.apply(l,c.concat(u));var d={usv:h,t:r,requests:JSON.stringify(l)};this._reportingRequestData={},"n"===w()&&t.removeStorageSync("__UNI__STAT__DATA"),"h5"!==e.ut?"n"!==w()||"a"!==this.statData.p?this._sendRequest(d):setTimeout(function(){i._sendRequest(d)},200):this.imageRequest(d)}}},{key:"_sendRequest",value:function(e){var n=this;t.request({url:p,method:"POST",data:e,success:function(){},fail:function(t){++n._retry<3&&setTimeout(function(){n._sendRequest(e)},1e3)}})}},{key:"imageRequest",value:function(t){var e=new Image,n=m(F(t)).options;e.src=f+"?"+n}},{key:"sendEvent",value:function(t,e){Z(t,e)||("title"!==t?this._sendEventRequest({key:t,value:"object"===typeof e?JSON.stringify(e):e},1):this._navigationBarTitle.report=e)}}]),e}(),$=function(e){function n(){var e;return l(this,n),e=i(this,a(n).call(this)),e.instance=null,"function"===typeof t.addInterceptor&&(e.addInterceptorInit(),e.interceptLogin(),e.interceptShare(!0),e.interceptRequestPayment()),e}return o(n,e),u(n,null,[{key:"getInstance",value:function(){return this.instance||(this.instance=new n),this.instance}}]),u(n,[{key:"addInterceptorInit",value:function(){var e=this;t.addInterceptor("setNavigationBarTitle",{invoke:function(t){e._navigationBarTitle.page=t.title}})}},{key:"interceptLogin",value:function(){var e=this;t.addInterceptor("login",{complete:function(){e._login()}})}},{key:"interceptShare",value:function(e){var n=this;e?t.addInterceptor("share",{success:function(){n._share()},fail:function(){n._share()}}):n._share()}},{key:"interceptRequestPayment",value:function(){var e=this;t.addInterceptor("requestPayment",{success:function(){e._payment("pay_success")},fail:function(){e._payment("pay_fail")}})}},{key:"report",value:function(t,e){this.self=e,R(),this.__licationShow=!0,this._sendReportRequest(t,!0)}},{key:"load",value:function(t,e){if(!e.$scope&&!e.$mp){var n=getCurrentPages();e.$scope=n[n.length-1]}this.self=e,this._query=t}},{key:"show",value:function(t){this.self=t,G(t)?this._pageShow(t):this._applicationShow(t)}},{key:"ready",value:function(t){}},{key:"hide",value:function(t){this.self=t,G(t)?this._pageHide(t):this._applicationHide(t,!0)}},{key:"error",value:function(t){this._platform;var e="";e=t.message?t.stack:JSON.stringify(t);var n={ak:this.statData.ak,uuid:this.statData.uuid,lt:"31",ut:this.statData.ut,ch:this.statData.ch,mpsdk:this.statData.mpsdk,mpv:this.statData.mpv,v:this.statData.v,em:e,usv:this.statData.usv,t:S(),p:this.statData.p};this.request(n)}}]),n}(K),tt=$.getInstance(),et=!1,nt={onLaunch:function(t){tt.report(t,this)},onReady:function(){tt.ready(this)},onLoad:function(t){if(tt.load(t,this),this.$scope&&this.$scope.onShareAppMessage){var e=this.$scope.onShareAppMessage;this.$scope.onShareAppMessage=function(t){return tt.interceptShare(!1),e.call(this,t)}}},onShow:function(){et=!1,tt.show(this)},onHide:function(){et=!0,tt.hide(this)},onUnload:function(){et?et=!1:tt.hide(this)},onError:function(t){tt.error(t)}};function it(){var e=n("66fd");(e.default||e).mixin(nt),t.report=function(t,e){tt.sendEvent(t,e)}}it()}).call(this,n("6e42")["default"])},be51:function(t,e,n){"use strict";(function(e,n){var i={yAxisWidth:15,yAxisSplit:5,xAxisHeight:15,xAxisLineHeight:15,legendHeight:15,yAxisTitleWidth:15,padding:[10,10,10,10],pixelRatio:1,rotate:!1,columePadding:3,fontSize:13,dataPointShape:["circle","circle","circle","circle"],colors:["#1890ff","#2fc25b","#facc14","#f04864","#8543e0","#90ed7d"],pieChartLinePadding:15,pieChartTextPadding:5,xAxisTextPadding:3,titleColor:"#333333",titleFontSize:20,subtitleColor:"#999999",subtitleFontSize:15,toolTipPadding:3,toolTipBackground:"#000000",toolTipOpacity:.7,toolTipLineHeight:20,radarLabelTextMargin:15,gaugeLabelTextMargin:15},r=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];if(null==t)throw new TypeError("Cannot convert undefined or null to object");if(!n||n.length<=0)return t;function r(t,e){for(var n in e)t[n]=t[n]&&"[object Object]"===t[n].toString()?r(t[n],e[n]):t[n]=e[n];return t}return n.forEach(function(e){t=r(t,e)}),t},a={toFixed:function(t,e){return e=e||2,this.isFloat(t)&&(t=t.toFixed(e)),t},isFloat:function(t){return t%1!==0},approximatelyEqual:function(t,e){return Math.abs(t-e)<1e-10},isSameSign:function(t,e){return Math.abs(t)===t&&Math.abs(e)===e||Math.abs(t)!==t&&Math.abs(e)!==e},isSameXCoordinateArea:function(t,e){return this.isSameSign(t.x,e.x)},isCollision:function(t,e){t.end={},t.end.x=t.start.x+t.width,t.end.y=t.start.y-t.height,e.end={},e.end.x=e.start.x+e.width,e.end.y=e.start.y-e.height;var n=e.start.x>t.end.x||e.end.x<t.start.x||e.end.y>t.start.y||e.start.y<t.end.y;return!n}};function o(t,e){var n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,i=t.replace(n,function(t,e,n,i){return e+e+n+n+i+i}),r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i),a=parseInt(r[1],16),o=parseInt(r[2],16),s=parseInt(r[3],16);return"rgba("+a+","+o+","+s+","+e+")"}function s(t,e,n){if(isNaN(t))throw new Error("[uCharts] unvalid series data!");n=n||10,e=e||"upper";var i=1;while(n<1)n*=10,i*=10;t="upper"===e?Math.ceil(t*i):Math.floor(t*i);while(t%n!==0)"upper"===e?t++:t--;return t/i}function l(t,e,n,i){for(var r=[],a=0;a<t.length;a++){for(var o={data:[],name:e[a],color:n[a]},s=0,l=i.length;s<l;s++)if(s<t[a])o.data.push(null);else{for(var c=0,u=0;u<t[a];u++)c+=i[s-u][1];o.data.push(+(c/t[a]).toFixed(3))}r.push(o)}return r}function c(t,e,n,i,r){var a=r.width-r.area[1]-r.area[3],o=n.eachSpacing*(r.chartData.xAxisData.xAxisPoints.length-1),s=e;return e>=0?(s=0,t.event.trigger("scrollLeft")):Math.abs(e)>=o-a&&(s=a-o,t.event.trigger("scrollRight")),s}function u(t,e,n){function i(t){while(t<0)t+=2*Math.PI;while(t>2*Math.PI)t-=2*Math.PI;return t}return t=i(t),e=i(e),n=i(n),e>n&&(n+=2*Math.PI,t<e&&(t+=2*Math.PI)),t>=e&&t<=n}function h(t,e,n){var i=t,r=n-e,a=i+(n-r-i)/Math.sqrt(2);a*=-1;var o=(n-r)*(Math.sqrt(2)-1)-(n-r-i)/Math.sqrt(2);return{transX:a,transY:o}}function p(t,e){function n(t,e){return!(!t[e-1]||!t[e+1])&&(t[e].y>=Math.max(t[e-1].y,t[e+1].y)||t[e].y<=Math.min(t[e-1].y,t[e+1].y))}var i=.2,r=.2,a=null,o=null,s=null,l=null;if(e<1?(a=t[0].x+(t[1].x-t[0].x)*i,o=t[0].y+(t[1].y-t[0].y)*i):(a=t[e].x+(t[e+1].x-t[e-1].x)*i,o=t[e].y+(t[e+1].y-t[e-1].y)*i),e>t.length-3){var c=t.length-1;s=t[c].x-(t[c].x-t[c-1].x)*r,l=t[c].y-(t[c].y-t[c-1].y)*r}else s=t[e+1].x-(t[e+2].x-t[e].x)*r,l=t[e+1].y-(t[e+2].y-t[e].y)*r;return n(t,e+1)&&(l=t[e+1].y),n(t,e)&&(o=t[e].y),(o>=Math.max(t[e].y,t[e+1].y)||o<=Math.min(t[e].y,t[e+1].y))&&(o=t[e].y),(l>=Math.max(t[e].y,t[e+1].y)||l<=Math.min(t[e].y,t[e+1].y))&&(l=t[e+1].y),{ctrA:{x:a,y:o},ctrB:{x:s,y:l}}}function f(t,e,n){return{x:n.x+t,y:n.y-e}}function d(t,e){if(e)while(a.isCollision(t,e))t.start.x>0?t.start.y--:t.start.x<0?t.start.y++:t.start.y>0?t.start.y++:t.start.y--;return t}function g(t,e,n){var i=0;return t.map(function(t){if(t.color||(t.color=n.colors[i],i=(i+1)%n.colors.length),t.index||(t.index=0),t.type||(t.type=e.type),"undefined"==typeof t.show&&(t.show=!0),t.type||(t.type=e.type),t.pointShape||(t.pointShape="circle"),!t.legendShape)switch(t.type){case"line":t.legendShape="line";break;case"column":t.legendShape="rect";break;case"area":t.legendShape="triangle";break;default:t.legendShape="circle"}return t})}function v(t,e){var n=0,i=e-t;return n=i>=1e4?1e3:i>=1e3?100:i>=100?10:i>=10?5:i>=1?1:i>=.1?.1:i>=.01?.01:i>=.001?.001:i>=1e-4?1e-4:i>=1e-5?1e-5:1e-6,{minRange:s(t,"lower",n),maxRange:s(e,"upper",n)}}function A(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.fontSize;t=String(t);t=t.split("");for(var n=0,r=0;r<t.length;r++){var a=t[r];/[a-zA-Z]/.test(a)?n+=7:/[0-9]/.test(a)?n+=5.5:/\./.test(a)?n+=2.7:/-/.test(a)?n+=3.25:/[\u4e00-\u9fa5]/.test(a)?n+=10:/\(|\)/.test(a)?n+=3.73:/\s/.test(a)?n+=2.5:/%/.test(a)?n+=8:n+=10}return n*e/10}function y(t){return t.reduce(function(t,e){return(t.data?t.data:t).concat(e.data)},[])}function x(t,e){for(var n=new Array(e),i=0;i<n.length;i++)n[i]=0;for(var r=0;r<t.length;r++)for(i=0;i<n.length;i++)n[i]+=t[r].data[i];return t.reduce(function(t,e){return(t.data?t.data:t).concat(e.data).concat(n)},[])}function m(t,e,n){var i,r;return t.clientX?e.rotate?(r=e.height-t.clientX*e.pixelRatio,i=(t.pageY-n.currentTarget.offsetTop-e.height/e.pixelRatio/2*(e.pixelRatio-1))*e.pixelRatio):(i=t.clientX*e.pixelRatio,r=(t.pageY-n.currentTarget.offsetTop-e.height/e.pixelRatio/2*(e.pixelRatio-1))*e.pixelRatio):e.rotate?(r=e.height-t.x*e.pixelRatio,i=t.y*e.pixelRatio):(i=t.x*e.pixelRatio,r=t.y*e.pixelRatio),{x:i,y:r}}function b(t,e){for(var n=[],i=0;i<t.length;i++){var r=t[i];if(null!==r.data[e]&&"undefined"!==typeof r.data[e]&&r.show){var a={};a.color=r.color,a.type=r.type,a.style=r.style,a.pointShape=r.pointShape,a.disableLegend=r.disableLegend,a.name=r.name,a.show=r.show,a.data=r.format?r.format(r.data[e]):r.data[e],n.push(a)}}return n}function S(t){var e=t.map(function(t){return A(t)});return Math.max.apply(null,e)}function w(t){for(var e=2*Math.PI/t,n=[],i=0;i<t;i++)n.push(e*i);return n.map(function(t){return-1*t+Math.PI/2})}function P(t,e,n,i){for(var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=t.map(function(t){var e=[];return e=i||t.data,{text:r.format?r.format(t,e[n]):t.name+": "+t.data,color:t.color}}),o=[],s={x:0,y:0},l=0;l<e.length;l++){var c=e[l];"undefined"!==typeof c[n]&&null!==c[n]&&o.push(c[n])}for(var u=0;u<o.length;u++){var h=o[u];s.x=Math.round(h.x),s.y+=h.y}return s.y/=o.length,{textList:a,offset:s}}function T(t,e,n,i){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},a=t.map(function(t){return{text:r.format?r.format(t,i[n]):t.name+": "+t.data,color:t.color,disableLegend:!!t.disableLegend}});a=a.filter(function(t){if(!0!==t.disableLegend)return t});for(var o=[],s={x:0,y:0},l=0;l<e.length;l++){var c=e[l];"undefined"!==typeof c[n]&&null!==c[n]&&o.push(c[n])}for(var u=0;u<o.length;u++){var h=o[u];s.x=Math.round(h.x),s.y+=h.y}return s.y/=o.length,{textList:a,offset:s}}function I(t,e,n,i,r,a){arguments.length>6&&void 0!==arguments[6]&&arguments[6];var o=a.color.upFill,s=a.color.downFill,l=[o,o,s,o],c=[],u={text:r[i],color:null};c.push(u),e.map(function(e){0==i&&e.data[1]-e.data[0]<0?l[1]=s:(e.data[0]<t[i-1][1]&&(l[0]=s),e.data[1]<e.data[0]&&(l[1]=s),e.data[2]>t[i-1][1]&&(l[2]=o),e.data[3]<t[i-1][1]&&(l[3]=s));var n={text:"开盘："+e.data[0],color:l[0]},r={text:"收盘："+e.data[1],color:l[1]},a={text:"最低："+e.data[2],color:l[2]},u={text:"最高："+e.data[3],color:l[3]};c.push(n,r,a,u)});for(var h=[],p={x:0,y:0},f=0;f<n.length;f++){var d=n[f];"undefined"!==typeof d[i]&&null!==d[i]&&h.push(d[i])}return p.x=Math.round(h[0][0].x),{textList:c,offset:p}}function C(t){for(var e=[],n=0;n<t.length;n++)1==t[n].show&&e.push(t[n]);return e}function k(t,e,n,i){for(var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=-1,o=0,s=[],l=0;l<e[0].length;l++)s.push(e[0][l].x);return"line"!=n.type&&"area"!=n.type||"justify"!=n.xAxis.boundaryGap||(o=n.chartData.eachSpacing/2),n.categories||(o=0),O(t,n,i)&&s.forEach(function(e,n){t.x+r+o>e&&(a=n)}),a}function j(t,e,n){var i=-1;if(D(t,e.area)){for(var r=e.points,a=-1,o=0,s=r.length;o<s;o++)for(var l=r[o],c=0;c<l.length;c++){a+=1;var u=l[c]["area"];if(t.x>u[0]&&t.x<u[2]&&t.y>u[1]&&t.y<u[3]){i=a;break}}return i}return i}function D(t,e){return t.x>e.start.x&&t.x<e.end.x&&t.y>e.start.y&&t.y<e.end.y}function O(t,e,n){return t.x<=e.width-e.area[1]+10&&t.x>=e.area[3]-10&&t.y>=e.area[0]&&t.y<=e.height-e.area[2]}function L(t,e,n){var i=2*Math.PI/n,r=-1;if(B(t,e.center,e.radius)){var a=function(t){return t<0&&(t+=2*Math.PI),t>2*Math.PI&&(t-=2*Math.PI),t},o=Math.atan2(e.center.y-t.y,t.x-e.center.x);o*=-1,o<0&&(o+=2*Math.PI);var s=e.angleList.map(function(t){return t=a(-1*t),t});s.forEach(function(t,e){var n=a(t-i/2),s=a(t+i/2);s<n&&(s+=2*Math.PI),(o>=n&&o<=s||o+2*Math.PI>=n&&o+2*Math.PI<=s)&&(r=e)})}return r}function E(t,e){for(var n=-1,i=0,r=e.series.length;i<r;i++){var a=e.series[i];if(t.x>a.funnelArea[0]&&t.x<a.funnelArea[2]&&t.y>a.funnelArea[1]&&t.y<a.funnelArea[3]){n=i;break}}return n}function M(t,e){for(var n=-1,i=0,r=e.length;i<r;i++){var a=e[i];if(t.x>a.area[0]&&t.x<a.area[2]&&t.y>a.area[1]&&t.y<a.area[3]){n=i;break}}return n}function R(t,e){for(var n=-1,i=e.chartData.mapData,r=e.series,a=Ft(t.y,t.x,i.bounds,i.scale,i.xoffset,i.yoffset),o=[a.x,a.y],s=0,l=r.length;s<l;s++){var c=r[s].geometry.coordinates;if(Ht(o,c)){n=s;break}}return n}function _(t,e){var n=-1;if(B(t,e.center,e.radius)){var i=Math.atan2(e.center.y-t.y,t.x-e.center.x);i=-i;for(var r=0,a=e.series.length;r<a;r++){var o=e.series[r];if(u(i,o._start_,o._start_+2*o._proportion_*Math.PI)){n=r;break}}}return n}function B(t,e,n){return Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)<=Math.pow(n,2)}function z(t){var e=[],n=[];return t.forEach(function(t,i){null!==t?n.push(t):(n.length&&e.push(n),n=[])}),n.length&&e.push(n),e}function F(t,e,n,i){var r={area:{start:{x:0,y:0},end:{x:0,y:0},width:0,height:0,wholeWidth:0,wholeHeight:0},points:[],widthArr:[],heightArr:[]};if(!1===e.legend.show)return i.legendData=r,r;var a=e.legend.padding,o=e.legend.margin,s=e.legend.fontSize,l=15*e.pixelRatio,c=5*e.pixelRatio,u=Math.max(e.legend.lineHeight*e.pixelRatio,s);if("top"==e.legend.position||"bottom"==e.legend.position){for(var h=[],p=0,f=[],d=[],g=0;g<t.length;g++){var v=t[g],y=l+c+A(v.name||"undefined",s)+e.legend.itemGap;p+y>e.width-e.padding[1]-e.padding[3]?(h.push(d),f.push(p-e.legend.itemGap),p=y,d=[v]):(p+=y,d.push(v))}if(d.length){h.push(d),f.push(p-e.legend.itemGap),r.widthArr=f;var x=Math.max.apply(null,f);switch(e.legend.float){case"left":r.area.start.x=e.padding[3],r.area.end.x=e.padding[3]+2*a;break;case"right":r.area.start.x=e.width-e.padding[1]-x-2*a,r.area.end.x=e.width-e.padding[1];break;default:r.area.start.x=(e.width-x)/2-a,r.area.end.x=(e.width+x)/2+a}r.area.width=x+2*a,r.area.wholeWidth=x+2*a,r.area.height=h.length*u+2*a,r.area.wholeHeight=h.length*u+2*a+2*o,r.points=h}}else{var m=t.length,b=e.height-e.padding[0]-e.padding[2]-2*o-2*a,S=Math.min(Math.floor(b/u),m);switch(r.area.height=S*u+2*a,r.area.wholeHeight=S*u+2*a,e.legend.float){case"top":r.area.start.y=e.padding[0]+o,r.area.end.y=e.padding[0]+o+r.area.height;break;case"bottom":r.area.start.y=e.height-e.padding[2]-o-r.area.height,r.area.end.y=e.height-e.padding[2]-o;break;default:r.area.start.y=(e.height-r.area.height)/2,r.area.end.y=(e.height+r.area.height)/2}for(var w=m%S===0?m/S:Math.floor(m/S+1),P=[],T=0;T<w;T++){var I=t.slice(T*S,T*S+S);P.push(I)}if(r.points=P,P.length){for(var C=0;C<P.length;C++){for(var k=P[C],j=0,D=0;D<k.length;D++){var O=l+c+A(k[D].name||"undefined",s)+e.legend.itemGap;O>j&&(j=O)}r.widthArr.push(j),r.heightArr.push(k.length*u+2*a)}for(var L=0,E=0;E<r.widthArr.length;E++)L+=r.widthArr[E];r.area.width=L-e.legend.itemGap+2*a,r.area.wholeWidth=r.area.width+a}}switch(e.legend.position){case"top":r.area.start.y=e.padding[0]+o,r.area.end.y=e.padding[0]+o+r.area.height;break;case"bottom":r.area.start.y=e.height-e.padding[2]-r.area.height-o,r.area.end.y=e.height-e.padding[2]-o;break;case"left":r.area.start.x=e.padding[3],r.area.end.x=e.padding[3]+r.area.width;break;case"right":r.area.start.x=e.width-e.padding[1]-r.area.width,r.area.end.x=e.width-e.padding[1];break}return i.legendData=r,r}function N(t,e,n,i){var r={angle:0,xAxisHeight:n.xAxisHeight},a=t.map(function(t){return A(t,e.xAxis.fontSize||n.fontSize)}),o=Math.max.apply(this,a);return 1==e.xAxis.rotateLabel&&o+2*n.xAxisTextPadding>i&&(r.angle=45*Math.PI/180,r.xAxisHeight=2*n.xAxisTextPadding+o*Math.sin(r.angle)),r}function H(t,e,n){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1,r=y(t),a=[];r=r.filter(function(t){return"object"===typeof t&&null!==t?t.constructor==Array?null!==t:null!==t.value:null!==t}),r.map(function(t){"object"===typeof t?t.constructor==Array?"candle"==e.type?t.map(function(t){a.push(t)}):a.push(t[0]):a.push(t.value):a.push(t)});var o=0,s=0;if(a.length>0&&(o=Math.min.apply(this,a),s=Math.max.apply(this,a)),i>-1?("number"===typeof e.xAxis.data[i].min&&(o=Math.min(e.xAxis.data[i].min,o)),"number"===typeof e.xAxis.data[i].max&&(s=Math.max(e.xAxis.data[i].max,s))):("number"===typeof e.xAxis.min&&(o=Math.min(e.xAxis.min,o)),"number"===typeof e.xAxis.max&&(s=Math.max(e.xAxis.max,s))),o===s){var l=s||10;s+=l}for(var c=v(o,s),u=c.minRange,h=c.maxRange,p=[],f=(h-u)/e.xAxis.splitNumber,d=0;d<=e.xAxis.splitNumber;d++)p.push(u+f*d);return p}function W(t,e,n){var i={angle:0,xAxisHeight:n.xAxisHeight};i.ranges=H(t,e,n),i.rangesFormat=i.ranges.map(function(t){return t=e.xAxis.format?e.xAxis.format(t):a.toFixed(t,2),t});var r=i.ranges.map(function(t){return t=a.toFixed(t,2),t=e.xAxis.format?e.xAxis.format(Number(t)):t,t});i=Object.assign(i,tt(r,e,n));var o=i.eachSpacing,s=r.map(function(t){return A(t)}),l=Math.max.apply(this,s);return l+2*n.xAxisTextPadding>o&&(i.angle=45*Math.PI/180,i.xAxisHeight=2*n.xAxisTextPadding+l*Math.sin(i.angle)),!0===e.xAxis.disabled&&(i.xAxisHeight=0),i}function Q(t,e,n,i,r){var a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,o=r.extra.radar||{};o.max=o.max||0;for(var s=Math.max(o.max,Math.max.apply(null,y(i))),l=[],c=function(r){var o=i[r],c={};c.color=o.color,c.legendShape=o.legendShape,c.pointShape=o.pointShape,c.data=[],o.data.forEach(function(i,r){var o={};o.angle=t[r],o.proportion=i/s,o.position=f(n*o.proportion*a*Math.cos(o.angle),n*o.proportion*a*Math.sin(o.angle),e),c.data.push(o)}),l.push(c)},u=0;u<i.length;u++)c(u);return l}function V(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=0,r=0,a=0;a<t.length;a++){var o=t[a];o.data=null===o.data?0:o.data,i+=o.data}for(var s=0;s<t.length;s++){var l=t[s];l.data=null===l.data?0:l.data,l._proportion_=0===i?1/t.length*n:l.data/i*n,l._radius_=e}for(var c=0;c<t.length;c++){var u=t[c];u._start_=r,r+=2*u._proportion_*Math.PI}return t}function X(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;t=t.sort(function(t,e){return parseInt(e.data)-parseInt(t.data)});for(var i=0;i<t.length;i++)t[i].radius=t[i].data/t[0].data*e*n,t[i]._proportion_=t[i].data/t[0].data;return t.reverse()}function q(t,e,n,i){for(var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,a=0,o=0,s=[],l=0;l<t.length;l++){var c=t[l];c.data=null===c.data?0:c.data,a+=c.data,s.push(c.data)}for(var u=Math.min.apply(null,s),h=Math.max.apply(null,s),p=i-n,f=0;f<t.length;f++){var d=t[f];d.data=null===d.data?0:d.data,0===a||"area"==e?(d._proportion_=d.data/a*r,d._rose_proportion_=1/t.length*r):(d._proportion_=d.data/a*r,d._rose_proportion_=d.data/a*r),d._radius_=n+p*((d.data-u)/(h-u))}for(var g=0;g<t.length;g++){var v=t[g];v._start_=o,o+=2*v._rose_proportion_*Math.PI}return t}function G(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;1==n&&(n=.999999);for(var i=0;i<t.length;i++){var r=t[i];r.data=null===r.data?0:r.data;var a=void 0;a="circle"==e.type?2:e.endAngle<e.startAngle?2+e.endAngle-e.startAngle:e.startAngle-e.endAngle,r._proportion_=a*r.data*n+e.startAngle,r._proportion_>=2&&(r._proportion_=r._proportion_%2)}return t}function Z(t,e,n){for(var i=e-n+1,r=e,a=0;a<t.length;a++)t[a].value=null===t[a].value?0:t[a].value,t[a]._startAngle_=r,t[a]._endAngle_=i*t[a].value+e,t[a]._endAngle_>=2&&(t[a]._endAngle_=t[a]._endAngle_%2),r=t[a]._endAngle_;return t}function Y(t,e,n){for(var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,r=0;r<t.length;r++){var a=t[r];if(a.data=null===a.data?0:a.data,"auto"==n.pointer.color){for(var o=0;o<e.length;o++)if(a.data<=e[o].value){a.color=e[o].color;break}}else a.color=n.pointer.color;var s=n.startAngle-n.endAngle+1;a._endAngle_=s*a.data+n.startAngle,a._oldAngle_=n.oldAngle,n.oldAngle<n.endAngle&&(a._oldAngle_+=2),a.data>=n.oldData?a._proportion_=(a._endAngle_-a._oldAngle_)*i+n.oldAngle:a._proportion_=a._oldAngle_-(a._oldAngle_-a._endAngle_)*i,a._proportion_>=2&&(a._proportion_=a._proportion_%2)}return t}function J(t){t=V(t);for(var e=0,n=0;n<t.length;n++){var i=t[n],r=i.format?i.format(+i._proportion_.toFixed(2)):a.toFixed(100*i._proportion_)+"%";e=Math.max(e,A(r))}return e}function U(t,e,n,i,r,a){return t.map(function(t){return null===t?null:(t.width=Math.ceil((e-2*r.columePadding)/n),a.extra.column&&a.extra.column.width&&+a.extra.column.width>0&&(t.width=Math.min(t.width,+a.extra.column.width)),t.width<=0&&(t.width=1),t.x+=(i+.5-n/2)*t.width,t)})}function K(t,e,n,i,r,a,o){return t.map(function(t){return null===t?null:(t.width=Math.ceil((e-2*r.columePadding)/2),a.extra.column&&a.extra.column.width&&+a.extra.column.width>0&&(t.width=Math.min(t.width,+a.extra.column.width)),i>0&&(t.width-=2*o),t)})}function $(t,e,n,i,r,a,o){return t.map(function(t,n){return null===t?null:(t.width=Math.ceil((e-2*r.columePadding)/2),a.extra.column&&a.extra.column.width&&+a.extra.column.width>0&&(t.width=Math.min(t.width,+a.extra.column.width)),t)})}function tt(t,e,n){var i=e.width-e.area[1]-e.area[3],r=e.enableScroll?Math.min(e.xAxis.itemCount,t.length):t.length;("line"==e.type||"area"==e.type)&&r>1&&"justify"==e.xAxis.boundaryGap&&(r-=1);var a=i/r,o=[],s=e.area[3],l=e.width-e.area[1];return t.forEach(function(t,e){o.push(s+e*a)}),"justify"!==e.xAxis.boundaryGap&&(!0===e.enableScroll?o.push(s+t.length*a):o.push(l)),{xAxisPoints:o,startX:s,endX:l,eachSpacing:a}}function et(t,e,n,i,r,a,o){var s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,l=[],c=a.height-a.area[0]-a.area[2];return t.forEach(function(t,o){if(null===t)l.push(null);else{var u=[];t.forEach(function(t,l){var h={};h.x=i[o]+Math.round(r/2);var p=t.value||t,f=c*(p-e)/(n-e);f*=s,h.y=a.height-Math.round(f)-a.area[2],u.push(h)}),l.push(u)}}),l}function nt(t,e,n,i,r,a,o){var s=arguments.length>7&&void 0!==arguments[7]?arguments[7]:1,l="center";"line"!=a.type&&"area"!=a.type||(l=a.xAxis.boundaryGap);var c=[],u=a.height-a.area[0]-a.area[2],h=a.width-a.area[1]-a.area[3];return t.forEach(function(t,o){if(null===t)c.push(null);else{var p={};p.color=t.color,p.x=i[o];var f,d,g,v=t;if("object"===typeof t&&null!==t)if(t.constructor==Array)f=[].concat(a.chartData.xAxisData.ranges),d=f.shift(),g=f.pop(),v=t[1],p.x=a.area[3]+h*(t[0]-d)/(g-d);else v=t.value;"center"==l&&(p.x+=Math.round(r/2));var A=u*(v-e)/(n-e);A*=s,p.y=a.height-Math.round(A)-a.area[2],c.push(p)}}),c}function it(t,e,n,i,r,a,o,s,l){var c=arguments.length>9&&void 0!==arguments[9]?arguments[9]:1,u=[],h=a.height-a.area[0]-a.area[2];return t.forEach(function(t,o){if(null===t)u.push(null);else{var p={};if(p.color=t.color,p.x=i[o]+Math.round(r/2),s>0){for(var f=0,d=0;d<=s;d++)f+=l[d].data[o];var g=f-t,v=h*(f-e)/(n-e),A=h*(g-e)/(n-e)}else f=t,v=h*(f-e)/(n-e),A=0;var y=A;v*=c,y*=c,p.y=a.height-Math.round(v)-a.area[2],p.y0=a.height-Math.round(y)-a.area[2],u.push(p)}}),u}function rt(t,e,n,i){var r,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:-1;r="stack"==i?x(t,e.categories.length):y(t);var o=[];r=r.filter(function(t){return"object"===typeof t&&null!==t?t.constructor==Array?null!==t:null!==t.value:null!==t}),r.map(function(t){"object"===typeof t?t.constructor==Array?"candle"==e.type?t.map(function(t){o.push(t)}):o.push(t[1]):o.push(t.value):o.push(t)});var s=0,l=0;if(o.length>0&&(s=Math.min.apply(this,o),l=Math.max.apply(this,o)),a>-1?("number"===typeof e.yAxis.data[a].min&&(s=Math.min(e.yAxis.data[a].min,s)),"number"===typeof e.yAxis.data[a].max&&(l=Math.max(e.yAxis.data[a].max,l))):("number"===typeof e.yAxis.min&&(s=Math.min(e.yAxis.min,s)),"number"===typeof e.yAxis.max&&(l=Math.max(e.yAxis.max,l))),s===l){var c=l||10;l+=c}for(var u=v(s,l),h=u.minRange,p=u.maxRange,f=[],d=(p-h)/e.yAxis.splitNumber,g=0;g<=e.yAxis.splitNumber;g++)f.push(h+d*g);return f.reverse()}function at(t,e,n){var i=r({},{type:""},e.extra.column),o=e.yAxis.data.length,s=new Array(o);if(o>0){for(var l=0;l<o;l++){s[l]=[];for(var c=0;c<t.length;c++)t[c].index==l&&s[l].push(t[c])}for(var u=new Array(o),h=new Array(o),p=new Array(o),f=function(t){var r=e.yAxis.data[t];1==e.yAxis.disabled&&(r.disabled=!0),u[t]=rt(s[t],e,n,i.type,t);var o=r.fontSize||n.fontSize;p[t]={position:r.position?r.position:"left",width:0},h[t]=u[t].map(function(e){return e=a.toFixed(e,6),e=r.format?r.format(Number(e)):e,p[t].width=Math.max(p[t].width,A(e,o)+5),e});var l=r.calibration?4*e.pixelRatio:0;p[t].width+=l+3*e.pixelRatio,!0===r.disabled&&(p[t].width=0)},d=0;d<o;d++)f(d)}else{u=new Array(1),h=new Array(1),p=new Array(1);u[0]=rt(t,e,n,i.type),p[0]={position:"left",width:0};var g=e.yAxis.fontSize||n.fontSize;h[0]=u[0].map(function(t){return t=a.toFixed(t,6),t=e.yAxis.format?e.yAxis.format(Number(t)):t,p[0].width=Math.max(p[0].width,A(t,g)+5),t}),p[0].width+=3*e.pixelRatio,!0===e.yAxis.disabled?(p[0]={position:"left",width:0},e.yAxis.data[0]={disabled:!0}):e.yAxis.data[0]={disabled:!1,position:"left",max:e.yAxis.max,min:e.yAxis.min,format:e.yAxis.format}}return{rangesFormat:h,ranges:u,yAxisWidth:p}}function ot(t,e,n,i,r){for(var a=[].concat(n.chartData.yAxisData.ranges),o=n.height-n.area[0]-n.area[2],s=n.area[0],l=[],c=0;c<a.length;c++){var u=a[c].shift(),h=a[c].pop(),p=u-(u-h)*(t-s)/o;p=n.yAxis.data[c].format?n.yAxis.data[c].format(Number(p)):p.toFixed(0),l.push(String(p))}return l}function st(t,e){for(var n,i,r=e.height-e.area[0]-e.area[2],a=0;a<t.length;a++){t[a].yAxisIndex=t[a].yAxisIndex?t[a].yAxisIndex:0;var o=[].concat(e.chartData.yAxisData.ranges[t[a].yAxisIndex]);n=o.pop(),i=o.shift();var s=r*(t[a].value-n)/(i-n);t[a].y=e.height-Math.round(s)-e.area[2]}return t}function lt(t,e){!0!==e.rotateLock?(t.translate(e.height,0),t.rotate(90*Math.PI/180)):!0!==e._rotate_&&(t.translate(e.height,0),t.rotate(90*Math.PI/180),e._rotate_=!0)}function ct(t,e,n,i,r){i.beginPath(),"hollow"==r.dataPointShapeType?(i.setStrokeStyle(e),i.setFillStyle(r.background),i.setLineWidth(2*r.pixelRatio)):(i.setStrokeStyle("#ffffff"),i.setFillStyle(e),i.setLineWidth(1*r.pixelRatio)),"diamond"===n?t.forEach(function(t,e){null!==t&&(i.moveTo(t.x,t.y-4.5),i.lineTo(t.x-4.5,t.y),i.lineTo(t.x,t.y+4.5),i.lineTo(t.x+4.5,t.y),i.lineTo(t.x,t.y-4.5))}):"circle"===n?t.forEach(function(t,e){null!==t&&(i.moveTo(t.x+2.5*r.pixelRatio,t.y),i.arc(t.x,t.y,3*r.pixelRatio,0,2*Math.PI,!1))}):"rect"===n?t.forEach(function(t,e){null!==t&&(i.moveTo(t.x-3.5,t.y-3.5),i.rect(t.x-3.5,t.y-3.5,7,7))}):"triangle"===n&&t.forEach(function(t,e){null!==t&&(i.moveTo(t.x,t.y-4.5),i.lineTo(t.x-4.5,t.y+4.5),i.lineTo(t.x+4.5,t.y+4.5),i.lineTo(t.x,t.y-4.5))}),i.closePath(),i.fill(),i.stroke()}function ut(t,e,n,i){var r=t.title.fontSize||e.titleFontSize,a=t.subtitle.fontSize||e.subtitleFontSize,o=t.title.name||"",s=t.subtitle.name||"",l=t.title.color||e.titleColor,c=t.subtitle.color||e.subtitleColor,u=o?r:0,h=s?a:0,p=5;if(s){var f=A(s,a),d=i.x-f/2+(t.subtitle.offsetX||0),g=i.y+a/2+(t.subtitle.offsetY||0);o&&(g+=(u+p)/2),n.beginPath(),n.setFontSize(a),n.setFillStyle(c),n.fillText(s,d,g),n.closePath(),n.stroke()}if(o){var v=A(o,r),y=i.x-v/2+(t.title.offsetX||0),x=i.y+r/2+(t.title.offsetY||0);s&&(x-=(h+p)/2),n.beginPath(),n.setFontSize(r),n.setFillStyle(l),n.fillText(o,y,x),n.closePath(),n.stroke()}}function ht(t,e,n,i){var r=e.data;t.forEach(function(t,a){if(null!==t){i.beginPath(),i.setFontSize(e.textSize||n.fontSize),i.setFillStyle(e.textColor||"#666666");var o=r[a];"object"===typeof r[a]&&null!==r[a]&&(o=r[a].constructor==Array?r[a][1]:r[a].value);var s=e.format?e.format(o):o;i.fillText(String(s),t.x-A(s,e.textSize||n.fontSize)/2,t.y-4),i.closePath(),i.stroke()}})}function pt(t,e,n,i,r,a){e-=t.width/2+r.gaugeLabelTextMargin;for(var o=t.startAngle-t.endAngle+1,s=o/t.splitLine.splitNumber,l=t.endNumber-t.startNumber,c=l/t.splitLine.splitNumber,u=t.startAngle,h=t.startNumber,p=0;p<t.splitLine.splitNumber+1;p++){var f={x:e*Math.cos(u*Math.PI),y:e*Math.sin(u*Math.PI)},d=t.labelFormat?t.labelFormat(h):h;f.x+=n.x-A(d)/2,f.y+=n.y;var g=f.x,v=f.y;a.beginPath(),a.setFontSize(r.fontSize),a.setFillStyle(t.labelColor||"#666666"),a.fillText(d,g,v+r.fontSize/2),a.closePath(),a.stroke(),u+=s,u>=2&&(u%=2),h+=c}}function ft(t,e,n,i,r,o){var s=i.extra.radar||{};e+=r.radarLabelTextMargin,t.forEach(function(t,l){var c={x:e*Math.cos(t),y:e*Math.sin(t)},u=f(c.x,c.y,n),h=u.x,p=u.y;a.approximatelyEqual(c.x,0)?h-=A(i.categories[l]||"")/2:c.x<0&&(h-=A(i.categories[l]||"")),o.beginPath(),o.setFontSize(r.fontSize),o.setFillStyle(s.labelColor||"#666666"),o.fillText(i.categories[l]||"",h,p+r.fontSize/2),o.closePath(),o.stroke()})}function dt(t,e,n,i,r,o){for(var s=n.pieChartLinePadding,l=[],c=null,u=t.map(function(t){var e=t.format?t.format(+t._proportion_.toFixed(2)):a.toFixed(100*t._proportion_.toFixed(4))+"%";t._rose_proportion_&&(t._proportion_=t._rose_proportion_);var n=2*Math.PI-(t._start_+2*Math.PI*t._proportion_/2),i=t.color,r=t._radius_;return{arc:n,text:e,color:i,radius:r,textColor:t.textColor,textSize:t.textSize}}),h=0;h<u.length;h++){var p=u[h],g=Math.cos(p.arc)*(p.radius+s),v=Math.sin(p.arc)*(p.radius+s),y=Math.cos(p.arc)*p.radius,x=Math.sin(p.arc)*p.radius,m=g>=0?g+n.pieChartTextPadding:g-n.pieChartTextPadding,b=v,S=A(p.text,p.textSize||n.fontSize),w=b;c&&a.isSameXCoordinateArea(c.start,{x:m})&&(w=m>0?Math.min(b,c.start.y):g<0?Math.max(b,c.start.y):b>0?Math.max(b,c.start.y):Math.min(b,c.start.y)),m<0&&(m-=S);var P={lineStart:{x:y,y:x},lineEnd:{x:g,y:v},start:{x:m,y:w},width:S,height:n.fontSize,text:p.text,color:p.color,textColor:p.textColor,textSize:p.textSize};c=d(P,c),l.push(c)}for(var T=0;T<l.length;T++){var I=l[T],C=f(I.lineStart.x,I.lineStart.y,o),k=f(I.lineEnd.x,I.lineEnd.y,o),j=f(I.start.x,I.start.y,o);i.setLineWidth(1*e.pixelRatio),i.setFontSize(n.fontSize),i.beginPath(),i.setStrokeStyle(I.color),i.setFillStyle(I.color),i.moveTo(C.x,C.y);var D=I.start.x<0?j.x+I.width:j.x,O=I.start.x<0?j.x-5:j.x+5;i.quadraticCurveTo(k.x,k.y,D,j.y),i.moveTo(C.x,C.y),i.stroke(),i.closePath(),i.beginPath(),i.moveTo(j.x+I.width,j.y),i.arc(D,j.y,2,0,2*Math.PI),i.closePath(),i.fill(),i.beginPath(),i.setFontSize(I.textSize||n.fontSize),i.setFillStyle(I.textColor||"#666666"),i.fillText(I.text,O,j.y+3),i.closePath(),i.stroke(),i.closePath()}}function gt(t,e,n,i){var r=e.extra.tooltip||{};r.gridType=void 0==r.gridType?"solid":r.gridType,r.dashLength=void 0==r.dashLength?4:r.dashLength;var a=e.area[0],s=e.height-e.area[2];if("dash"==r.gridType&&i.setLineDash([r.dashLength,r.dashLength]),i.setStrokeStyle(r.gridColor||"#cccccc"),i.setLineWidth(1*e.pixelRatio),i.beginPath(),i.moveTo(t,a),i.lineTo(t,s),i.stroke(),i.setLineDash([]),r.xAxisLabel){var l=e.categories[e.tooltip.index];i.setFontSize(n.fontSize);var c=A(l,n.fontSize),u=t-.5*c,h=s;i.beginPath(),i.setFillStyle(o(r.labelBgColor||n.toolTipBackground,r.labelBgOpacity||n.toolTipOpacity)),i.setStrokeStyle(r.labelBgColor||n.toolTipBackground),i.setLineWidth(1*e.pixelRatio),i.rect(u-n.toolTipPadding,h,c+2*n.toolTipPadding,n.fontSize+2*n.toolTipPadding),i.closePath(),i.stroke(),i.fill(),i.beginPath(),i.setFontSize(n.fontSize),i.setFillStyle(r.labelFontColor||n.fontColor),i.fillText(String(l),u,h+n.toolTipPadding+n.fontSize),i.closePath(),i.stroke()}}function vt(t,e,n){for(var i=r({},{type:"solid",dashLength:4,data:[]},t.extra.markLine),a=t.area[3],s=t.width-t.area[1],l=st(i.data,t),c=0;c<l.length;c++){var u=r({},{lineColor:"#DE4A42",showLabel:!1,labelFontColor:"#666666",labelBgColor:"#DFE8FF",labelBgOpacity:.8,yAxisIndex:0},l[c]);if("dash"==i.type&&n.setLineDash([i.dashLength,i.dashLength]),n.setStrokeStyle(u.lineColor),n.setLineWidth(1*t.pixelRatio),n.beginPath(),n.moveTo(a,u.y),n.lineTo(s,u.y),n.stroke(),n.setLineDash([]),u.showLabel){var h=t.yAxis.format?t.yAxis.format(Number(u.value)):u.value;n.setFontSize(e.fontSize);var p=A(h,e.fontSize),f=t.padding[3]+e.yAxisTitleWidth-e.toolTipPadding,d=Math.max(t.area[3],p+2*e.toolTipPadding),g=d-f,v=f+(g-p)/2,y=u.y;n.setFillStyle(o(u.labelBgColor,u.labelBgOpacity)),n.setStrokeStyle(u.labelBgColor),n.setLineWidth(1*t.pixelRatio),n.beginPath(),n.rect(f,y-.5*e.fontSize-e.toolTipPadding,g,e.fontSize+2*e.toolTipPadding),n.closePath(),n.stroke(),n.fill(),n.beginPath(),n.setFontSize(e.fontSize),n.setFillStyle(u.labelFontColor),n.fillText(String(h),v,y+.5*e.fontSize),n.stroke()}}}function At(t,e,n,i,a){var s=r({},{gridType:"solid",dashLength:4},t.extra.tooltip),l=t.area[3],c=t.width-t.area[1];if("dash"==s.gridType&&n.setLineDash([s.dashLength,s.dashLength]),n.setStrokeStyle(s.gridColor||"#cccccc"),n.setLineWidth(1*t.pixelRatio),n.beginPath(),n.moveTo(l,t.tooltip.offset.y),n.lineTo(c,t.tooltip.offset.y),n.stroke(),n.setLineDash([]),s.yAxisLabel)for(var u=ot(t.tooltip.offset.y,t.series,t,e,i),h=t.chartData.yAxisData.yAxisWidth,p=t.area[3],f=t.width-t.area[1],d=0;d<u.length;d++){n.setFontSize(e.fontSize);var g=A(u[d],e.fontSize),v=void 0,y=void 0,x=void 0;"left"==h[d].position?(v=p-h[d].width,y=Math.max(v,v+g+2*e.toolTipPadding)):(v=f,y=Math.max(v+h[d].width,v+g+2*e.toolTipPadding)),x=y-v;var m=v+(x-g)/2,b=t.tooltip.offset.y;n.beginPath(),n.setFillStyle(o(s.labelBgColor||e.toolTipBackground,s.labelBgOpacity||e.toolTipOpacity)),n.setStrokeStyle(s.labelBgColor||e.toolTipBackground),n.setLineWidth(1*t.pixelRatio),n.rect(v,b-.5*e.fontSize-e.toolTipPadding,x,e.fontSize+2*e.toolTipPadding),n.closePath(),n.stroke(),n.fill(),n.beginPath(),n.setFontSize(e.fontSize),n.setFillStyle(s.labelFontColor||e.fontColor),n.fillText(u[d],m,b+.5*e.fontSize),n.closePath(),n.stroke(),"left"==h[d].position?p-=h[d].width+t.yAxis.padding:f+=h[d].width+t.yAxis.padding}}function yt(t,e,n,i,a){var s=r({},{activeBgColor:"#000000",activeBgOpacity:.08},e.extra.tooltip),l=e.area[0],c=e.height-e.area[2];i.beginPath(),i.setFillStyle(o(s.activeBgColor,s.activeBgOpacity)),i.rect(t-a/2,l,a,c-l),i.closePath(),i.fill()}function xt(t,e,n,i,a,s,l){var c=r({},{showBox:!0,bgColor:"#000000",bgOpacity:.7,fontColor:"#FFFFFF"},n.extra.tooltip),u=4*n.pixelRatio,h=5*n.pixelRatio,p=8*n.pixelRatio,f=!1;"line"!=n.type&&"area"!=n.type&&"candle"!=n.type&&"mix"!=n.type||gt(n.tooltip.offset.x,n,i,a),e=r({x:0,y:0},e),e.y-=8*n.pixelRatio;var d=t.map(function(t){return A(t.text,i.fontSize)}),g=u+h+4*i.toolTipPadding+Math.max.apply(null,d),v=2*i.toolTipPadding+t.length*i.toolTipLineHeight;0!=c.showBox&&(e.x-Math.abs(n._scrollDistance_)+p+g>n.width&&(f=!0),v+e.y>n.height&&(e.y=n.height-v),a.beginPath(),a.setFillStyle(o(c.bgColor||i.toolTipBackground,c.bgOpacity||i.toolTipOpacity)),f?(a.moveTo(e.x,e.y+10*n.pixelRatio),a.lineTo(e.x-p,e.y+10*n.pixelRatio-5*n.pixelRatio),a.lineTo(e.x-p,e.y),a.lineTo(e.x-p-Math.round(g),e.y),a.lineTo(e.x-p-Math.round(g),e.y+v),a.lineTo(e.x-p,e.y+v),a.lineTo(e.x-p,e.y+10*n.pixelRatio+5*n.pixelRatio),a.lineTo(e.x,e.y+10*n.pixelRatio)):(a.moveTo(e.x,e.y+10*n.pixelRatio),a.lineTo(e.x+p,e.y+10*n.pixelRatio-5*n.pixelRatio),a.lineTo(e.x+p,e.y),a.lineTo(e.x+p+Math.round(g),e.y),a.lineTo(e.x+p+Math.round(g),e.y+v),a.lineTo(e.x+p,e.y+v),a.lineTo(e.x+p,e.y+10*n.pixelRatio+5*n.pixelRatio),a.lineTo(e.x,e.y+10*n.pixelRatio)),a.closePath(),a.fill(),t.forEach(function(t,n){if(null!==t.color){a.beginPath(),a.setFillStyle(t.color);var r=e.x+p+2*i.toolTipPadding,o=e.y+(i.toolTipLineHeight-i.fontSize)/2+i.toolTipLineHeight*n+i.toolTipPadding+1;f&&(r=e.x-g-p+2*i.toolTipPadding),a.fillRect(r,o,u,i.fontSize),a.closePath()}}),t.forEach(function(t,n){var r=e.x+p+2*i.toolTipPadding+u+h;f&&(r=e.x-g-p+2*i.toolTipPadding+ +u+h);var o=e.y+(i.toolTipLineHeight-i.fontSize)/2+i.toolTipLineHeight*n+i.toolTipPadding;a.beginPath(),a.setFontSize(i.fontSize),a.setFillStyle(c.fontColor),a.fillText(t.text,r,o+i.fontSize),a.closePath(),a.stroke()}))}function mt(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=e.chartData.xAxisData,s=o.xAxisPoints,l=o.eachSpacing,c=r({},{type:"group",width:l/2,meter:{border:4,fillColor:"#FFFFFF"}},e.extra.column),u=[];i.save();var h=-2,p=s.length+2;return e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&(i.translate(e._scrollDistance_,0),h=Math.floor(-e._scrollDistance_/l)-2,p=h+e.xAxis.itemCount+4),e.tooltip&&e.tooltip.textList&&e.tooltip.textList.length&&1===a&&yt(e.tooltip.offset.x,e,n,i,l),t.forEach(function(r,o){var f,d,g;f=[].concat(e.chartData.yAxisData.ranges[r.index]),d=f.pop(),g=f.shift();var v=r.data;switch(c.type){case"group":var A=nt(v,d,g,s,l,e,n,a),y=it(v,d,g,s,l,e,n,o,t,a);u.push(y),A=U(A,l,t.length,o,n,e);for(var x=0;x<A.length;x++){var m=A[x];if(null!==m&&x>h&&x<p){i.beginPath(),i.setStrokeStyle(m.color||r.color),i.setLineWidth(1),i.setFillStyle(m.color||r.color);var b=m.x-m.width/2,S=e.height-m.y-e.area[2];i.moveTo(b-1,m.y),i.lineTo(b+m.width-2,m.y),i.lineTo(b+m.width-2,e.height-e.area[2]),i.lineTo(b,e.height-e.area[2]),i.lineTo(b,m.y),i.closePath(),i.stroke(),i.fill()}}break;case"stack":A=it(v,d,g,s,l,e,n,o,t,a);u.push(A),A=$(A,l,t.length,o,n,e,t);for(var w=0;w<A.length;w++){var P=A[w];if(null!==P&&w>h&&w<p){i.beginPath(),i.setFillStyle(P.color||r.color);b=P.x-P.width/2+1,S=e.height-P.y-e.area[2];var T=e.height-P.y0-e.area[2];o>0&&(S-=T),i.moveTo(b,P.y),i.fillRect(b,P.y,P.width-2,S),i.closePath(),i.fill()}}break;case"meter":A=nt(v,d,g,s,l,e,n,a);if(u.push(A),A=K(A,l,t.length,o,n,e,c.meter.border),0==o)for(var I=0;I<A.length;I++){var C=A[I];if(null!==C&&I>h&&I<p){i.beginPath(),i.setFillStyle(c.meter.fillColor);b=C.x-C.width/2,S=e.height-C.y-e.area[2];i.moveTo(b,C.y),i.fillRect(b,C.y,C.width,S),i.closePath(),i.fill(),c.meter.border>0&&(i.beginPath(),i.setStrokeStyle(r.color),i.setLineWidth(c.meter.border*e.pixelRatio),i.moveTo(b+.5*c.meter.border,C.y+S),i.lineTo(b+.5*c.meter.border,C.y+.5*c.meter.border),i.lineTo(b+C.width-.5*c.meter.border,C.y+.5*c.meter.border),i.lineTo(b+C.width-.5*c.meter.border,C.y+S),i.stroke())}}else for(var k=0;k<A.length;k++){var j=A[k];if(null!==j&&k>h&&k<p){i.beginPath(),i.setFillStyle(j.color||r.color);b=j.x-j.width/2,S=e.height-j.y-e.area[2];i.moveTo(b,j.y),i.fillRect(b,j.y,j.width,S),i.closePath(),i.fill()}}break}}),!1!==e.dataLabel&&1===a&&t.forEach(function(r,o){var u,h,p;u=[].concat(e.chartData.yAxisData.ranges[r.index]),h=u.pop(),p=u.shift();var f=r.data;switch(c.type){case"group":var d=nt(f,h,p,s,l,e,n,a);d=U(d,l,t.length,o,n,e),ht(d,r,n,i);break;case"stack":d=it(f,h,p,s,l,e,n,o,t,a);ht(d,r,n,i);break;case"meter":d=nt(f,h,p,s,l,e,n,a);ht(d,r,n,i);break}}),i.restore(),{xAxisPoints:s,calPoints:u,eachSpacing:l}}function bt(t,e,n,i,a){var o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,s=r({},{color:{},average:{}},n.extra.candle);s.color=r({},{upLine:"#f04864",upFill:"#f04864",downLine:"#2fc25b",downFill:"#2fc25b"},s.color),s.average=r({},{show:!1,name:[],day:[],color:i.colors},s.average),n.extra.candle=s;var l=n.chartData.xAxisData,c=l.xAxisPoints,u=l.eachSpacing,h=[];a.save();var f=-2,d=c.length+2,g=0,v=n.width+u;return n._scrollDistance_&&0!==n._scrollDistance_&&!0===n.enableScroll&&(a.translate(n._scrollDistance_,0),f=Math.floor(-n._scrollDistance_/u)-2,d=f+n.xAxis.itemCount+4,g=-n._scrollDistance_-u+n.area[3],v=g+(n.xAxis.itemCount+4)*u),s.average.show&&e.forEach(function(t,e){var r,s,l;r=[].concat(n.chartData.yAxisData.ranges[t.index]),s=r.pop(),l=r.shift();for(var h=t.data,f=nt(h,s,l,c,u,n,i,o),d=z(f),A=0;A<d.length;A++){var y=d[A];if(a.beginPath(),a.setStrokeStyle(t.color),a.setLineWidth(1),1===y.length)a.moveTo(y[0].x,y[0].y),a.arc(y[0].x,y[0].y,1,0,2*Math.PI);else{a.moveTo(y[0].x,y[0].y);for(var x=0,m=0;m<y.length;m++){var b=y[m];if(0==x&&b.x>g&&(a.moveTo(b.x,b.y),x=1),m>0&&b.x>g&&b.x<v){var S=p(y,m-1);a.bezierCurveTo(S.ctrA.x,S.ctrA.y,S.ctrB.x,S.ctrB.y,b.x,b.y)}}a.moveTo(y[0].x,y[0].y)}a.closePath(),a.stroke()}}),t.forEach(function(t,e){var r,l,p;r=[].concat(n.chartData.yAxisData.ranges[t.index]),l=r.pop(),p=r.shift();var g=t.data,v=et(g,l,p,c,u,n,i,o);h.push(v);for(var A=z(v),y=0;y<A[0].length;y++)if(y>f&&y<d){var x=A[0][y];a.beginPath(),g[y][1]-g[y][0]>0?(a.setStrokeStyle(s.color.upLine),a.setFillStyle(s.color.upFill),a.setLineWidth(1*n.pixelRatio),a.moveTo(x[3].x,x[3].y),a.lineTo(x[1].x,x[1].y),a.lineTo(x[1].x-u/4,x[1].y),a.lineTo(x[0].x-u/4,x[0].y),a.lineTo(x[0].x,x[0].y),a.lineTo(x[2].x,x[2].y),a.lineTo(x[0].x,x[0].y),a.lineTo(x[0].x+u/4,x[0].y),a.lineTo(x[1].x+u/4,x[1].y),a.lineTo(x[1].x,x[1].y),a.moveTo(x[3].x,x[3].y)):(a.setStrokeStyle(s.color.downLine),a.setFillStyle(s.color.downFill),a.setLineWidth(1*n.pixelRatio),a.moveTo(x[3].x,x[3].y),a.lineTo(x[0].x,x[0].y),a.lineTo(x[0].x-u/4,x[0].y),a.lineTo(x[1].x-u/4,x[1].y),a.lineTo(x[1].x,x[1].y),a.lineTo(x[2].x,x[2].y),a.lineTo(x[1].x,x[1].y),a.lineTo(x[1].x+u/4,x[1].y),a.lineTo(x[0].x+u/4,x[0].y),a.lineTo(x[0].x,x[0].y),a.moveTo(x[3].x,x[3].y)),a.closePath(),a.fill(),a.stroke()}}),a.restore(),{xAxisPoints:c,calPoints:h,eachSpacing:u}}function St(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=r({},{type:"straight",opacity:.2,addLine:!1,width:2,gradient:!1},e.extra.area),l=e.chartData.xAxisData,c=l.xAxisPoints,u=l.eachSpacing,h=e.height-e.area[2],f=[];i.save();var d=0,g=e.width+u;return e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&(i.translate(e._scrollDistance_,0),d=-e._scrollDistance_-u+e.area[3],g=d+(e.xAxis.itemCount+4)*u),t.forEach(function(t,r){var l,v,A;l=[].concat(e.chartData.yAxisData.ranges[t.index]),v=l.pop(),A=l.shift();var y=t.data,x=nt(y,v,A,c,u,e,n,a);f.push(x);for(var m=z(x),b=0;b<m.length;b++){var S=m[b];if(i.beginPath(),i.setStrokeStyle(o(t.color,s.opacity)),s.gradient){var w=i.createLinearGradient(0,e.area[0],0,e.height-e.area[2]);w.addColorStop("0",o(t.color,s.opacity)),w.addColorStop("1.0",o("#FFFFFF",.1)),i.setFillStyle(w)}else i.setFillStyle(o(t.color,s.opacity));if(i.setLineWidth(s.width*e.pixelRatio),S.length>1){var P=S[0],T=S[S.length-1];i.moveTo(P.x,P.y);var I=0;if("curve"===s.type)for(var C=0;C<S.length;C++){var k=S[C];if(0==I&&k.x>d&&(i.moveTo(k.x,k.y),I=1),C>0&&k.x>d&&k.x<g){var j=p(S,C-1);i.bezierCurveTo(j.ctrA.x,j.ctrA.y,j.ctrB.x,j.ctrB.y,k.x,k.y)}}else for(var D=0;D<S.length;D++){var O=S[D];0==I&&O.x>d&&(i.moveTo(O.x,O.y),I=1),D>0&&O.x>d&&O.x<g&&i.lineTo(O.x,O.y)}i.lineTo(T.x,h),i.lineTo(P.x,h),i.lineTo(P.x,P.y)}else{var L=S[0];i.moveTo(L.x-u/2,L.y),i.lineTo(L.x+u/2,L.y),i.lineTo(L.x+u/2,h),i.lineTo(L.x-u/2,h),i.moveTo(L.x-u/2,L.y)}if(i.closePath(),i.fill(),s.addLine){if("dash"==t.lineType){var E=t.dashLength?t.dashLength:8;E*=e.pixelRatio,i.setLineDash([E,E])}if(i.beginPath(),i.setStrokeStyle(t.color),i.setLineWidth(s.width*e.pixelRatio),1===S.length)i.moveTo(S[0].x,S[0].y),i.arc(S[0].x,S[0].y,1,0,2*Math.PI);else{i.moveTo(S[0].x,S[0].y);var M=0;if("curve"===s.type)for(var R=0;R<S.length;R++){var _=S[R];if(0==M&&_.x>d&&(i.moveTo(_.x,_.y),M=1),R>0&&_.x>d&&_.x<g){var B=p(S,R-1);i.bezierCurveTo(B.ctrA.x,B.ctrA.y,B.ctrB.x,B.ctrB.y,_.x,_.y)}}else for(var F=0;F<S.length;F++){var N=S[F];0==M&&N.x>d&&(i.moveTo(N.x,N.y),M=1),F>0&&N.x>d&&N.x<g&&i.lineTo(N.x,N.y)}i.moveTo(S[0].x,S[0].y)}i.stroke(),i.setLineDash([])}}!1!==e.dataPointShape&&ct(x,t.color,t.pointShape,i,e)}),!1!==e.dataLabel&&1===a&&t.forEach(function(t,r){var o,s,l;o=[].concat(e.chartData.yAxisData.ranges[t.index]),s=o.pop(),l=o.shift();var h=t.data,p=nt(h,s,l,c,u,e,n,a);ht(p,t,n,i)}),i.restore(),{xAxisPoints:c,calPoints:f,eachSpacing:u}}function wt(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,o=r({},{type:"straight",width:2},e.extra.line);o.width*=e.pixelRatio;var s=e.chartData.xAxisData,l=s.xAxisPoints,c=s.eachSpacing,u=[];i.save();var h=0,f=e.width+c;return e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&(i.translate(e._scrollDistance_,0),h=-e._scrollDistance_-c+e.area[3],f=h+(e.xAxis.itemCount+4)*c),t.forEach(function(t,r){var s,d,g;s=[].concat(e.chartData.yAxisData.ranges[t.index]),d=s.pop(),g=s.shift();var v=t.data,A=nt(v,d,g,l,c,e,n,a);u.push(A);var y=z(A);if("dash"==t.lineType){var x=t.dashLength?t.dashLength:8;x*=e.pixelRatio,i.setLineDash([x,x])}i.beginPath(),i.setStrokeStyle(t.color),i.setLineWidth(o.width),y.forEach(function(t,e){if(1===t.length)i.moveTo(t[0].x,t[0].y),i.arc(t[0].x,t[0].y,1,0,2*Math.PI);else{i.moveTo(t[0].x,t[0].y);var n=0;if("curve"===o.type)for(var r=0;r<t.length;r++){var a=t[r];if(0==n&&a.x>h&&(i.moveTo(a.x,a.y),n=1),r>0&&a.x>h&&a.x<f){var s=p(t,r-1);i.bezierCurveTo(s.ctrA.x,s.ctrA.y,s.ctrB.x,s.ctrB.y,a.x,a.y)}}else for(var l=0;l<t.length;l++){var c=t[l];0==n&&c.x>h&&(i.moveTo(c.x,c.y),n=1),l>0&&c.x>h&&c.x<f&&i.lineTo(c.x,c.y)}i.moveTo(t[0].x,t[0].y)}}),i.stroke(),i.setLineDash([]),!1!==e.dataPointShape&&ct(A,t.color,t.pointShape,i,e)}),!1!==e.dataLabel&&1===a&&t.forEach(function(t,r){var o,s,u;o=[].concat(e.chartData.yAxisData.ranges[t.index]),s=o.pop(),u=o.shift();var h=t.data,p=nt(h,s,u,l,c,e,n,a);ht(p,t,n,i)}),i.restore(),{xAxisPoints:l,calPoints:u,eachSpacing:c}}function Pt(t,e,n,i){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,a=e.chartData.xAxisData,s=a.xAxisPoints,l=a.eachSpacing,c=e.height-e.area[2],u=[],h=0,f=0;t.forEach(function(t,e){"column"==t.type&&(f+=1)}),i.save();var d=-2,g=s.length+2,v=0,A=e.width+l;if(e._scrollDistance_&&0!==e._scrollDistance_&&!0===e.enableScroll&&(i.translate(e._scrollDistance_,0),d=Math.floor(-e._scrollDistance_/l)-2,g=d+e.xAxis.itemCount+4,v=-e._scrollDistance_-l+e.area[3],A=v+(e.xAxis.itemCount+4)*l),t.forEach(function(t,a){var y,x,m;y=[].concat(e.chartData.yAxisData.ranges[t.index]),x=y.pop(),m=y.shift();var b=t.data,S=nt(b,x,m,s,l,e,n,r);if(u.push(S),"column"==t.type){S=U(S,l,f,h,n,e);for(var w=0;w<S.length;w++){var P=S[w];if(null!==P&&w>d&&w<g){i.beginPath(),i.setStrokeStyle(P.color||t.color),i.setLineWidth(1),i.setFillStyle(P.color||t.color);var T=P.x-P.width/2;e.height,P.y,e.area[2];i.moveTo(T,P.y),i.moveTo(T-1,P.y),i.lineTo(T+P.width-2,P.y),i.lineTo(T+P.width-2,e.height-e.area[2]),i.lineTo(T,e.height-e.area[2]),i.lineTo(T,P.y),i.closePath(),i.stroke(),i.fill(),i.closePath(),i.fill()}}h+=1}if("area"==t.type)for(var I=z(S),C=0;C<I.length;C++){var k=I[C];if(i.beginPath(),i.setStrokeStyle(t.color),i.setFillStyle(o(t.color,.2)),i.setLineWidth(2*e.pixelRatio),k.length>1){var j=k[0],D=k[k.length-1];i.moveTo(j.x,j.y);var O=0;if("curve"===t.style)for(var L=0;L<k.length;L++){var E=k[L];if(0==O&&E.x>v&&(i.moveTo(E.x,E.y),O=1),L>0&&E.x>v&&E.x<A){var M=p(k,L-1);i.bezierCurveTo(M.ctrA.x,M.ctrA.y,M.ctrB.x,M.ctrB.y,E.x,E.y)}}else for(var R=0;R<k.length;R++){var _=k[R];0==O&&_.x>v&&(i.moveTo(_.x,_.y),O=1),R>0&&_.x>v&&_.x<A&&i.lineTo(_.x,_.y)}i.lineTo(D.x,c),i.lineTo(j.x,c),i.lineTo(j.x,j.y)}else{var B=k[0];i.moveTo(B.x-l/2,B.y),i.lineTo(B.x+l/2,B.y),i.lineTo(B.x+l/2,c),i.lineTo(B.x-l/2,c),i.moveTo(B.x-l/2,B.y)}i.closePath(),i.fill()}if("line"==t.type){var F=z(S);F.forEach(function(n,r){if("dash"==t.lineType){var a=t.dashLength?t.dashLength:8;a*=e.pixelRatio,i.setLineDash([a,a])}if(i.beginPath(),i.setStrokeStyle(t.color),i.setLineWidth(2*e.pixelRatio),1===n.length)i.moveTo(n[0].x,n[0].y),i.arc(n[0].x,n[0].y,1,0,2*Math.PI);else{i.moveTo(n[0].x,n[0].y);var o=0;if("curve"==t.style)for(var s=0;s<n.length;s++){var l=n[s];if(0==o&&l.x>v&&(i.moveTo(l.x,l.y),o=1),s>0&&l.x>v&&l.x<A){var c=p(n,s-1);i.bezierCurveTo(c.ctrA.x,c.ctrA.y,c.ctrB.x,c.ctrB.y,l.x,l.y)}}else for(var u=0;u<n.length;u++){var h=n[u];0==o&&h.x>v&&(i.moveTo(h.x,h.y),o=1),u>0&&h.x>v&&h.x<A&&i.lineTo(h.x,h.y)}i.moveTo(n[0].x,n[0].y)}i.stroke(),i.setLineDash([])})}"point"==t.type&&(t.addPoint=!0),1==t.addPoint&&"column"!==t.type&&ct(S,t.color,t.pointShape,i,e)}),!1!==e.dataLabel&&1===r){h=0;t.forEach(function(t,a){var o,c,u;o=[].concat(e.chartData.yAxisData.ranges[t.index]),c=o.pop(),u=o.shift();var p=t.data,d=nt(p,c,u,s,l,e,n,r);"column"!==t.type?ht(d,t,n,i):(d=U(d,l,f,h,n,e),ht(d,t,n,i),h+=1)})}return i.restore(),{xAxisPoints:s,calPoints:u,eachSpacing:l}}function Tt(t,e,n,i,r,a){var o=t.extra.tooltip||{};o.horizentalLine&&t.tooltip&&1===i&&("line"==t.type||"area"==t.type||"column"==t.type||"candle"==t.type||"mix"==t.type)&&At(t,e,n,r,a),n.save(),t._scrollDistance_&&0!==t._scrollDistance_&&!0===t.enableScroll&&n.translate(t._scrollDistance_,0),t.tooltip&&t.tooltip.textList&&t.tooltip.textList.length&&1===i&&xt(t.tooltip.textList,t.tooltip.offset,t,e,n,r,a),n.restore()}function It(t,e,n,i){var r=e.chartData.xAxisData,a=r.xAxisPoints,o=r.startX,s=r.endX,l=r.eachSpacing,c="center";"line"!=e.type&&"area"!=e.type||(c=e.xAxis.boundaryGap);var u=e.height-e.area[2],p=e.area[0];if(e.enableScroll&&e.xAxis.scrollShow){var f=e.height-e.area[2]+n.xAxisHeight,d=s-o,g=l*(a.length-1),v=d*d/g,y=0;e._scrollDistance_&&(y=-e._scrollDistance_*d/g),i.beginPath(),i.setLineCap("round"),i.setLineWidth(6*e.pixelRatio),i.setStrokeStyle(e.xAxis.scrollBackgroundColor||"#EFEBEF"),i.moveTo(o,f),i.lineTo(s,f),i.stroke(),i.closePath(),i.beginPath(),i.setLineCap("round"),i.setLineWidth(6*e.pixelRatio),i.setStrokeStyle(e.xAxis.scrollColor||"#A6A6A6"),i.moveTo(o+y,f),i.lineTo(o+y+v,f),i.stroke(),i.closePath(),i.setLineCap("butt")}if(i.save(),e._scrollDistance_&&0!==e._scrollDistance_&&i.translate(e._scrollDistance_,0),!0===e.xAxis.calibration&&(i.setStrokeStyle(e.xAxis.gridColor||"#cccccc"),i.setLineCap("butt"),i.setLineWidth(1*e.pixelRatio),a.forEach(function(t,n){n>0&&(i.beginPath(),i.moveTo(t-l/2,u),i.lineTo(t-l/2,u+3*e.pixelRatio),i.closePath(),i.stroke())})),!0!==e.xAxis.disableGrid&&(i.setStrokeStyle(e.xAxis.gridColor||"#cccccc"),i.setLineCap("butt"),i.setLineWidth(1*e.pixelRatio),"dash"==e.xAxis.gridType&&i.setLineDash([e.xAxis.dashLength,e.xAxis.dashLength]),e.xAxis.gridEval=e.xAxis.gridEval||1,a.forEach(function(t,n){n%e.xAxis.gridEval==0&&(i.beginPath(),i.moveTo(t,u),i.lineTo(t,p),i.stroke())}),i.setLineDash([])),!0!==e.xAxis.disabled){var x=t.length;e.xAxis.labelCount&&(x=e.xAxis.itemCount?Math.ceil(t.length/e.xAxis.itemCount*e.xAxis.labelCount):e.xAxis.labelCount,x-=1);for(var m=Math.ceil(t.length/x),b=[],S=t.length,w=0;w<S;w++)w%m!==0?b.push(""):b.push(t[w]);b[S-1]=t[S-1];var P=e.xAxis.fontSize||n.fontSize;0===n._xAxisTextAngle_?b.forEach(function(t,r){var o=-A(String(t),P)/2;"center"==c&&(o+=l/2);var s=0;e.xAxis.scrollShow&&(s=6*e.pixelRatio),i.beginPath(),i.setFontSize(P),i.setFillStyle(e.xAxis.fontColor||"#666666"),i.fillText(String(t),a[r]+o,u+P+(n.xAxisHeight-s-P)/2),i.closePath(),i.stroke()}):b.forEach(function(t,r){i.save(),i.beginPath(),i.setFontSize(P),i.setFillStyle(e.xAxis.fontColor||"#666666");var o=A(String(t),P),s=-o;"center"==c&&(s+=l/2);var p=h(a[r]+l/2,u+P/2+5,e.height),f=p.transX,d=p.transY;i.rotate(-1*n._xAxisTextAngle_),i.translate(f,d),i.fillText(String(t),a[r]+s,u+P+5),i.closePath(),i.stroke(),i.restore()})}i.restore(),e.xAxis.axisLine&&(i.beginPath(),i.setStrokeStyle(e.xAxis.axisLineColor),i.setLineWidth(1*e.pixelRatio),i.moveTo(o,e.height-e.area[2]),i.lineTo(s,e.height-e.area[2]),i.stroke())}function Ct(t,e,n,i){if(!0!==e.yAxis.disableGrid){for(var r=e.height-e.area[0]-e.area[2],a=r/e.yAxis.splitNumber,o=e.area[3],s=e.chartData.xAxisData.xAxisPoints,l=e.chartData.xAxisData.eachSpacing,c=l*(s.length-1),u=o+c,h=[],p=0;p<e.yAxis.splitNumber+1;p++)h.push(e.height-e.area[2]-a*p);i.save(),e._scrollDistance_&&0!==e._scrollDistance_&&i.translate(e._scrollDistance_,0),"dash"==e.yAxis.gridType&&i.setLineDash([e.yAxis.dashLength,e.yAxis.dashLength]),i.setStrokeStyle(e.yAxis.gridColor),i.setLineWidth(1*e.pixelRatio),h.forEach(function(t,e){i.beginPath(),i.moveTo(o,t),i.lineTo(u,t),i.stroke()}),i.setLineDash([]),i.restore()}}function kt(t,e,n,i){if(!0!==e.yAxis.disabled){var r=e.height-e.area[0]-e.area[2],a=r/e.yAxis.splitNumber,o=e.area[3],s=e.width-e.area[1],l=e.height-e.area[2],c=l+n.xAxisHeight;e.xAxis.scrollShow&&(c-=3*e.pixelRatio),e.xAxis.rotateLabel&&(c=e.height-e.area[2]+3),i.beginPath(),i.setFillStyle(e.background||"#ffffff"),e._scrollDistance_<0&&i.fillRect(0,0,o,c),1==e.enableScroll&&i.fillRect(s,0,e.width,c),i.closePath(),i.stroke();for(var u=[],h=0;h<=e.yAxis.splitNumber;h++)u.push(e.area[0]+a*h);for(var p=e.area[3],f=e.width-e.area[1],d=function(t){var r=e.yAxis.data[t];if(!0!==r.disabled){var a=e.chartData.yAxisData.rangesFormat[t],o=r.fontSize||n.fontSize,s=e.chartData.yAxisData.yAxisWidth[t];if(a.forEach(function(t,n){var a=u[n]?u[n]:l;i.beginPath(),i.setFontSize(o),i.setLineWidth(1*e.pixelRatio),i.setStrokeStyle(r.axisLineColor||"#cccccc"),i.setFillStyle(r.fontColor||"#666666"),"left"==s.position?(i.fillText(String(t),p-s.width,a+o/2),1==r.calibration&&(i.moveTo(p,a),i.lineTo(p-3*e.pixelRatio,a))):(i.fillText(String(t),f+4*e.pixelRatio,a+o/2),1==r.calibration&&(i.moveTo(f,a),i.lineTo(f+3*e.pixelRatio,a))),i.closePath(),i.stroke()}),!1!==r.axisLine&&(i.beginPath(),i.setStrokeStyle(r.axisLineColor||"#cccccc"),i.setLineWidth(1*e.pixelRatio),"left"==s.position?(i.moveTo(p,e.height-e.area[2]),i.lineTo(p,e.area[0])):(i.moveTo(f,e.height-e.area[2]),i.lineTo(f,e.area[0])),i.stroke()),e.yAxis.showTitle){var c=r.titleFontSize||n.fontSize,h=r.title;i.beginPath(),i.setFontSize(c),i.setFillStyle(r.titleFontColor||"#666666"),"left"==s.position?i.fillText(h,p-A(h,c)/2,e.area[0]-10*e.pixelRatio):i.fillText(h,f-A(h,c)/2,e.area[0]-10*e.pixelRatio),i.closePath(),i.stroke()}"left"==s.position?p-=s.width+e.yAxis.padding:f+=s.width+e.yAxis.padding}},g=0;g<e.yAxis.data.length;g++)d(g)}}function jt(t,e,n,i,r){if(!1!==e.legend.show){var a=r.legendData,o=a.points,s=a.area,l=e.legend.padding,c=e.legend.fontSize,u=15*e.pixelRatio,h=5*e.pixelRatio,p=e.legend.itemGap,f=Math.max(e.legend.lineHeight*e.pixelRatio,c);i.beginPath(),i.setLineWidth(e.legend.borderWidth),i.setStrokeStyle(e.legend.borderColor),i.setFillStyle(e.legend.backgroundColor),i.moveTo(s.start.x,s.start.y),i.rect(s.start.x,s.start.y,s.width,s.height),i.closePath(),i.fill(),i.stroke(),o.forEach(function(t,r){var o=0,d=0;o=a.widthArr[r],d=a.heightArr[r];var g=0,v=0;"top"==e.legend.position||"bottom"==e.legend.position?(g=s.start.x+(s.width-o)/2,v=s.start.y+l+r*f):(o=0==r?0:a.widthArr[r-1],g=s.start.x+l+o,v=s.start.y+l+(s.height-d)/2),i.setFontSize(n.fontSize);for(var y=0;y<t.length;y++){var x=t[y];switch(x.area=[0,0,0,0],x.area[0]=g,x.area[1]=v,x.area[3]=v+f,i.beginPath(),i.setLineWidth(1*e.pixelRatio),i.setStrokeStyle(x.show?x.color:e.legend.hiddenColor),i.setFillStyle(x.show?x.color:e.legend.hiddenColor),x.legendShape){case"line":i.moveTo(g,v+.5*f-2*e.pixelRatio),i.fillRect(g,v+.5*f-2*e.pixelRatio,15*e.pixelRatio,4*e.pixelRatio);break;case"triangle":i.moveTo(g+7.5*e.pixelRatio,v+.5*f-5*e.pixelRatio),i.lineTo(g+2.5*e.pixelRatio,v+.5*f+5*e.pixelRatio),i.lineTo(g+12.5*e.pixelRatio,v+.5*f+5*e.pixelRatio),i.lineTo(g+7.5*e.pixelRatio,v+.5*f-5*e.pixelRatio);break;case"diamond":i.moveTo(g+7.5*e.pixelRatio,v+.5*f-5*e.pixelRatio),i.lineTo(g+2.5*e.pixelRatio,v+.5*f),i.lineTo(g+7.5*e.pixelRatio,v+.5*f+5*e.pixelRatio),i.lineTo(g+12.5*e.pixelRatio,v+.5*f),i.lineTo(g+7.5*e.pixelRatio,v+.5*f-5*e.pixelRatio);break;case"circle":i.moveTo(g+7.5*e.pixelRatio,v+.5*f),i.arc(g+7.5*e.pixelRatio,v+.5*f,5*e.pixelRatio,0,2*Math.PI);break;case"rect":i.moveTo(g,v+.5*f-5*e.pixelRatio),i.fillRect(g,v+.5*f-5*e.pixelRatio,15*e.pixelRatio,10*e.pixelRatio);break;default:i.moveTo(g,v+.5*f-5*e.pixelRatio),i.fillRect(g,v+.5*f-5*e.pixelRatio,15*e.pixelRatio,10*e.pixelRatio)}i.closePath(),i.fill(),i.stroke(),g+=u+h;var m=.5*f+.5*c-2;i.beginPath(),i.setFontSize(c),i.setFillStyle(x.show?e.legend.fontColor:e.legend.hiddenColor),i.fillText(x.name,g,v+m),i.closePath(),i.stroke(),"top"==e.legend.position||"bottom"==e.legend.position?(g+=A(x.name,c)+p,x.area[2]=g):(x.area[2]=g+A(x.name,c)+p,g-=u+h,v+=f)}})}}function Dt(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=r({},{activeOpacity:.5,activeRadius:10*e.pixelRatio,offsetAngle:0,labelWidth:15*e.pixelRatio,ringWidth:0,border:!1,borderWidth:2,borderColor:"#FFFFFF"},e.extra.pie),l={x:e.area[3]+(e.width-e.area[1]-e.area[3])/2,y:e.area[0]+(e.height-e.area[0]-e.area[2])/2};0==n.pieChartLinePadding&&(n.pieChartLinePadding=s.activeRadius);var c=Math.min((e.width-e.area[1]-e.area[3])/2-n.pieChartLinePadding-n.pieChartTextPadding-n._pieTextMaxLength_,(e.height-e.area[0]-e.area[2])/2-n.pieChartLinePadding-n.pieChartTextPadding);t=V(t,c,a);var u=s.activeRadius;if(t=t.map(function(t){return t._start_+=s.offsetAngle*Math.PI/180,t}),t.forEach(function(t,n){e.tooltip&&e.tooltip.index==n&&(i.beginPath(),i.setFillStyle(o(t.color,e.extra.pie.activeOpacity||.5)),i.moveTo(l.x,l.y),i.arc(l.x,l.y,t._radius_+u,t._start_,t._start_+2*t._proportion_*Math.PI),i.closePath(),i.fill()),i.beginPath(),i.setLineWidth(s.borderWidth*e.pixelRatio),i.lineJoin="round",i.setStrokeStyle(s.borderColor),i.setFillStyle(t.color),i.moveTo(l.x,l.y),i.arc(l.x,l.y,t._radius_,t._start_,t._start_+2*t._proportion_*Math.PI),i.closePath(),i.fill(),1==s.border&&i.stroke()}),"ring"===e.type){var h=.6*c;"number"===typeof e.extra.pie.ringWidth&&e.extra.pie.ringWidth>0&&(h=Math.max(0,c-e.extra.pie.ringWidth)),i.beginPath(),i.setFillStyle(e.background||"#ffffff"),i.moveTo(l.x,l.y),i.arc(l.x,l.y,h,0,2*Math.PI),i.closePath(),i.fill()}if(!1!==e.dataLabel&&1===a){for(var p=!1,f=0,d=t.length;f<d;f++)if(t[f].data>0){p=!0;break}p&&dt(t,e,n,i,c,l)}return 1===a&&"ring"===e.type&&ut(e,n,i,l),{center:l,radius:c,series:t}}function Ot(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=r({},{type:"area",activeOpacity:.5,activeRadius:10*e.pixelRatio,offsetAngle:0,labelWidth:15*e.pixelRatio,border:!1,borderWidth:2,borderColor:"#FFFFFF"},e.extra.rose);0==n.pieChartLinePadding&&(n.pieChartLinePadding=s.activeRadius);var l={x:e.area[3]+(e.width-e.area[1]-e.area[3])/2,y:e.area[0]+(e.height-e.area[0]-e.area[2])/2},c=Math.min((e.width-e.area[1]-e.area[3])/2-n.pieChartLinePadding-n.pieChartTextPadding-n._pieTextMaxLength_,(e.height-e.area[0]-e.area[2])/2-n.pieChartLinePadding-n.pieChartTextPadding),u=s.minRadius||.5*c;t=q(t,s.type,u,c,a);var h=s.activeRadius;if(t=t.map(function(t){return t._start_+=(s.offsetAngle||0)*Math.PI/180,t}),t.forEach(function(t,n){e.tooltip&&e.tooltip.index==n&&(i.beginPath(),i.setFillStyle(o(t.color,s.activeOpacity||.5)),i.moveTo(l.x,l.y),i.arc(l.x,l.y,h+t._radius_,t._start_,t._start_+2*t._rose_proportion_*Math.PI),i.closePath(),i.fill()),i.beginPath(),i.setLineWidth(s.borderWidth*e.pixelRatio),i.lineJoin="round",i.setStrokeStyle(s.borderColor),i.setFillStyle(t.color),i.moveTo(l.x,l.y),i.arc(l.x,l.y,t._radius_,t._start_,t._start_+2*t._rose_proportion_*Math.PI),i.closePath(),i.fill(),1==s.border&&i.stroke()}),!1!==e.dataLabel&&1===a){for(var p=!1,f=0,d=t.length;f<d;f++)if(t[f].data>0){p=!0;break}p&&dt(t,e,n,i,c,l)}return{center:l,radius:c,series:t}}function Lt(t,e,n,i){var a,o,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,l=r({},{startAngle:.75,endAngle:.25,type:"default",width:12*e.pixelRatio,gap:2*e.pixelRatio},e.extra.arcbar);t=G(t,l,s),a=l.center?l.center:{x:e.width/2,y:e.height/2},l.radius?o=l.radius:(o=Math.min(a.x,a.y),o-=5*e.pixelRatio,o-=l.width/2);for(var c=0;c<t.length;c++){var u=t[c];i.setLineWidth(l.width),i.setStrokeStyle(l.backgroundColor||"#E9E9E9"),i.setLineCap("round"),i.beginPath(),"default"==l.type?i.arc(a.x,a.y,o-(l.width+l.gap)*c,l.startAngle*Math.PI,l.endAngle*Math.PI,!1):i.arc(a.x,a.y,o-(l.width+l.gap)*c,0,2*Math.PI,!1),i.stroke(),i.setLineWidth(l.width),i.setStrokeStyle(u.color),i.setLineCap("round"),i.beginPath(),i.arc(a.x,a.y,o-(l.width+l.gap)*c,l.startAngle*Math.PI,u._proportion_*Math.PI,!1),i.stroke()}return ut(e,n,i,a),{center:a,radius:o,series:t}}function Et(t,e,n,i,a){var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:1,l=r({},{type:"default",startAngle:.75,endAngle:.25,width:15,splitLine:{fixRadius:0,splitNumber:10,width:15,color:"#FFFFFF",childNumber:5,childWidth:5},pointer:{width:15,color:"auto"}},n.extra.gauge);void 0==l.oldAngle&&(l.oldAngle=l.startAngle),void 0==l.oldData&&(l.oldData=0),t=Z(t,l.startAngle,l.endAngle);var c={x:n.width/2,y:n.height/2},u=Math.min(c.x,c.y);u-=5*n.pixelRatio,u-=l.width/2;var h=u-l.width,p=0;if("progress"==l.type){var f=u-3*l.width;a.beginPath();var d=a.createLinearGradient(c.x,c.y-f,c.x,c.y+f);d.addColorStop("0",o(e[0].color,.3)),d.addColorStop("1.0",o("#FFFFFF",.1)),a.setFillStyle(d),a.arc(c.x,c.y,f,0,2*Math.PI,!1),a.fill(),a.setLineWidth(l.width),a.setStrokeStyle(o(e[0].color,.3)),a.setLineCap("round"),a.beginPath(),a.arc(c.x,c.y,h,l.startAngle*Math.PI,l.endAngle*Math.PI,!1),a.stroke(),p=l.startAngle-l.endAngle+1;l.splitLine.splitNumber;var g=p/l.splitLine.splitNumber/l.splitLine.childNumber,v=-u-.5*l.width-l.splitLine.fixRadius,A=-u-l.width-l.splitLine.fixRadius+l.splitLine.width;a.save(),a.translate(c.x,c.y),a.rotate((l.startAngle-1)*Math.PI);for(var y=l.splitLine.splitNumber*l.splitLine.childNumber+1,x=e[0].data*s,m=0;m<y;m++)a.beginPath(),x>m/y?a.setStrokeStyle(o(e[0].color,1)):a.setStrokeStyle(o(e[0].color,.3)),a.setLineWidth(3*n.pixelRatio),a.moveTo(v,0),a.lineTo(A,0),a.stroke(),a.rotate(g*Math.PI);a.restore(),e=G(e,l,s),a.setLineWidth(l.width),a.setStrokeStyle(e[0].color),a.setLineCap("round"),a.beginPath(),a.arc(c.x,c.y,h,l.startAngle*Math.PI,e[0]._proportion_*Math.PI,!1),a.stroke();var b=u-2.5*l.width;a.save(),a.translate(c.x,c.y),a.rotate((e[0]._proportion_-1)*Math.PI),a.beginPath(),a.setLineWidth(l.width/3);var S=a.createLinearGradient(0,.6*-b,0,.6*b);S.addColorStop("0",o("#FFFFFF",0)),S.addColorStop("0.5",o(e[0].color,1)),S.addColorStop("1.0",o("#FFFFFF",0)),a.setStrokeStyle(S),a.arc(0,0,b,.85*Math.PI,1.15*Math.PI,!1),a.stroke(),a.beginPath(),a.setLineWidth(1),a.setStrokeStyle(e[0].color),a.setFillStyle(e[0].color),a.moveTo(-b-l.width/3/2,-4),a.lineTo(-b-l.width/3/2-4,0),a.lineTo(-b-l.width/3/2,4),a.lineTo(-b-l.width/3/2,-4),a.stroke(),a.fill(),a.restore()}else{a.setLineWidth(l.width),a.setLineCap("butt");for(var w=0;w<t.length;w++){var P=t[w];a.beginPath(),a.setStrokeStyle(P.color),a.arc(c.x,c.y,u,P._startAngle_*Math.PI,P._endAngle_*Math.PI,!1),a.stroke()}a.save(),p=l.startAngle-l.endAngle+1;var T=p/l.splitLine.splitNumber,I=p/l.splitLine.splitNumber/l.splitLine.childNumber,C=-u-.5*l.width-l.splitLine.fixRadius,k=-u-.5*l.width-l.splitLine.fixRadius+l.splitLine.width,j=-u-.5*l.width-l.splitLine.fixRadius+l.splitLine.childWidth;a.translate(c.x,c.y),a.rotate((l.startAngle-1)*Math.PI);for(var D=0;D<l.splitLine.splitNumber+1;D++)a.beginPath(),a.setStrokeStyle(l.splitLine.color),a.setLineWidth(2*n.pixelRatio),a.moveTo(C,0),a.lineTo(k,0),a.stroke(),a.rotate(T*Math.PI);a.restore(),a.save(),a.translate(c.x,c.y),a.rotate((l.startAngle-1)*Math.PI);for(var O=0;O<l.splitLine.splitNumber*l.splitLine.childNumber+1;O++)a.beginPath(),a.setStrokeStyle(l.splitLine.color),a.setLineWidth(1*n.pixelRatio),a.moveTo(C,0),a.lineTo(j,0),a.stroke(),a.rotate(I*Math.PI);a.restore(),e=Y(e,t,l,s);for(var L=0;L<e.length;L++){var E=e[L];a.save(),a.translate(c.x,c.y),a.rotate((E._proportion_-1)*Math.PI),a.beginPath(),a.setFillStyle(E.color),a.moveTo(l.pointer.width,0),a.lineTo(0,-l.pointer.width/2),a.lineTo(-h,0),a.lineTo(0,l.pointer.width/2),a.lineTo(l.pointer.width,0),a.closePath(),a.fill(),a.beginPath(),a.setFillStyle("#FFFFFF"),a.arc(0,0,l.pointer.width/6,0,2*Math.PI,!1),a.fill(),a.restore()}!1!==n.dataLabel&&pt(l,u,c,n,i,a)}return ut(n,i,a,c),1===s&&"gauge"===n.type&&(n.extra.gauge.oldAngle=e[0]._proportion_,n.extra.gauge.oldData=e[0].data),{center:c,radius:u,innerRadius:h,categories:t,totalAngle:p}}function Mt(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=r({},{gridColor:"#cccccc",labelColor:"#666666",opacity:.2,gridCount:3},e.extra.radar),l=w(e.categories.length),c={x:e.area[3]+(e.width-e.area[1]-e.area[3])/2,y:e.area[0]+(e.height-e.area[0]-e.area[2])/2},u=Math.min(c.x-(S(e.categories)+n.radarLabelTextMargin),c.y-n.radarLabelTextMargin);u-=e.padding[1],i.beginPath(),i.setLineWidth(1*e.pixelRatio),i.setStrokeStyle(s.gridColor),l.forEach(function(t){var e=f(u*Math.cos(t),u*Math.sin(t),c);i.moveTo(c.x,c.y),i.lineTo(e.x,e.y)}),i.stroke(),i.closePath();for(var h=function(t){var n={};i.beginPath(),i.setLineWidth(1*e.pixelRatio),i.setStrokeStyle(s.gridColor),l.forEach(function(e,r){var a=f(u/s.gridCount*t*Math.cos(e),u/s.gridCount*t*Math.sin(e),c);0===r?(n=a,i.moveTo(a.x,a.y)):i.lineTo(a.x,a.y)}),i.lineTo(n.x,n.y),i.stroke(),i.closePath()},p=1;p<=s.gridCount;p++)h(p);var d=Q(l,c,u,t,e,a);return d.forEach(function(t,n){if(i.beginPath(),i.setFillStyle(o(t.color,s.opacity)),t.data.forEach(function(t,e){0===e?i.moveTo(t.position.x,t.position.y):i.lineTo(t.position.x,t.position.y)}),i.closePath(),i.fill(),!1!==e.dataPointShape){var r=t.data.map(function(t){return t.position});ct(r,t.color,t.pointShape,i,e)}}),ft(l,u,c,e,n,i),{center:c,radius:u,angleList:l}}function Rt(t,e,n){n=0==n?1:n;for(var i=[],r=0;r<n;r++)i[r]=Math.random();return Math.floor(i.reduce(function(t,e){return t+e})/n*(e-t))+t}function _t(t,e,n,i){for(var r=!1,a=0;a<e.length;a++)if(e[a].area){if(!(t[3]<e[a].area[1]||t[0]>e[a].area[2]||t[1]>e[a].area[3]||t[2]<e[a].area[0])){r=!0;break}if(t[0]<0||t[1]<0||t[2]>n||t[3]>i){r=!0;break}r=!1}return r}function Bt(t){var e,n={};n.xMin=180,n.xMax=0,n.yMin=90,n.yMax=0;for(var i=0;i<t.length;i++)for(var r=t[i].geometry.coordinates,a=0;a<r.length;a++){e=r[a],1==e.length&&(e=e[0]);for(var o=0;o<e.length;o++){var s=e[o][0],l=e[o][1],c={x:s,y:l};n.xMin=n.xMin<c.x?n.xMin:c.x,n.xMax=n.xMax>c.x?n.xMax:c.x,n.yMin=n.yMin<c.y?n.yMin:c.y,n.yMax=n.yMax>c.y?n.yMax:c.y}}return n}function zt(t,e,n,i,r,a){return{x:(e-n.xMin)*i+r,y:(n.yMax-t)*i+a}}function Ft(t,e,n,i,r,a){return{x:(e-r)/i+n.xMin,y:n.yMax-(t-a)/i}}function Nt(t,e,n){if(e[1]==n[1])return!1;if(e[1]>t[1]&&n[1]>t[1])return!1;if(e[1]<t[1]&&n[1]<t[1])return!1;if(e[1]==t[1]&&n[1]>t[1])return!1;if(n[1]==t[1]&&e[1]>t[1])return!1;if(e[0]<t[0]&&n[1]<t[1])return!1;var i=n[0]-(n[0]-e[0])*(n[1]-t[1])/(n[1]-e[1]);return!(i<t[0])}function Ht(t,e){for(var n=0,i=0;i<e.length;i++){var r=e[i][0];1==e.length&&(r=e[i][0]);for(var a=0;a<r.length-1;a++){var o=r[a],s=r[a+1];Nt(t,o,s)&&(n+=1)}}return n%2==1}function Wt(t,e,n,i){var a,s,l=r({},{border:!0,borderWidth:1,borderColor:"#666666",fillOpacity:.6,activeBorderColor:"#f04864",activeFillColor:"#facc14",activeFillOpacity:1},e.extra.map),c=t,u=Bt(c),h=e.width/Math.abs(u.xMax-u.xMin),p=e.height/Math.abs(u.yMax-u.yMin),f=h<p?h:p,d=e.width/2-Math.abs(u.xMax-u.xMin)/2*f,g=e.height/2-Math.abs(u.yMax-u.yMin)/2*f;i.beginPath(),i.clearRect(0,0,e.width,e.height),i.setFillStyle(e.background||"#FFFFFF"),i.rect(0,0,e.width,e.height),i.fill();for(var v=0;v<c.length;v++){i.beginPath(),i.setLineWidth(l.borderWidth*e.pixelRatio),i.setStrokeStyle(l.borderColor),i.setFillStyle(o(t[v].color,l.fillOpacity)),e.tooltip&&e.tooltip.index==v&&(i.setStrokeStyle(l.activeBorderColor),i.setFillStyle(o(l.activeFillColor,l.activeFillOpacity)));for(var y=c[v].geometry.coordinates,x=0;x<y.length;x++){a=y[x],1==a.length&&(a=a[0]);for(var m=0;m<a.length;m++)s=zt(a[m][1],a[m][0],u,f,d,g),0===m?(i.beginPath(),i.moveTo(s.x,s.y)):i.lineTo(s.x,s.y);i.fill(),1==l.border&&i.stroke()}if(1==e.dataLabel){var b=c[v].properties.centroid;if(b){s=zt(b[1],b[0],u,f,d,g);var S=c[v].textSize||n.fontSize,w=c[v].properties.name;i.beginPath(),i.setFontSize(S),i.setFillStyle(c[v].textColor||"#666666"),i.fillText(w,s.x-A(w,S)/2,s.y+S/2),i.closePath(),i.stroke()}}}e.chartData.mapData={bounds:u,scale:f,xoffset:d,yoffset:g},Tt(e,n,i,1),i.draw()}function Qt(t,e){var n=t.series.sort(function(t,e){return parseInt(e.textSize)-parseInt(t.textSize)});switch(e){case"normal":for(var i=0;i<n.length;i++){var r=n[i].name,a=n[i].textSize,o=A(r,a),s=void 0,l=void 0,c=void 0,u=0;while(1){u++,s=Rt(-t.width/2,t.width/2,5)-o/2,l=Rt(-t.height/2,t.height/2,5)+a/2,c=[s-5+t.width/2,l-5-a+t.height/2,s+o+5+t.width/2,l+5+t.height/2];var h=_t(c,n,t.width,t.height);if(!h)break;if(1e3==u){c=[-100,-100,-100,-100];break}}n[i].area=c}break;case"vertical":for(var p=function(){return Math.random()>.7},f=0;f<n.length;f++){var d=n[f].name,g=n[f].textSize,v=A(d,g),y=p(),x=void 0,m=void 0,b=void 0,S=void 0,w=0;while(1){w++;var P=void 0;if(y?(x=Rt(-t.width/2,t.width/2,5)-v/2,m=Rt(-t.height/2,t.height/2,5)+g/2,b=[m-5-v+t.width/2,-x-5+t.height/2,m+5+t.width/2,-x+g+5+t.height/2],S=[t.width-(t.width/2-t.height/2)-(-x+g+5+t.height/2)-5,t.height/2-t.width/2+(m-5-v+t.width/2)-5,t.width-(t.width/2-t.height/2)-(-x+g+5+t.height/2)+g,t.height/2-t.width/2+(m-5-v+t.width/2)+v+5],P=_t(S,n,t.height,t.width)):(x=Rt(-t.width/2,t.width/2,5)-v/2,m=Rt(-t.height/2,t.height/2,5)+g/2,b=[x-5+t.width/2,m-5-g+t.height/2,x+v+5+t.width/2,m+5+t.height/2],P=_t(b,n,t.width,t.height)),!P)break;if(1e3==w){b=[-1e3,-1e3,-1e3,-1e3];break}}y?(n[f].area=S,n[f].areav=b):n[f].area=b,n[f].rotate=y}break}return n}function Vt(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;r({},{type:"normal",autoColors:!0},e.extra.word);i.beginPath(),i.setFillStyle(e.background||"#FFFFFF"),i.rect(0,0,e.width,e.height),i.fill(),i.save();var o=e.chartData.wordCloudData;i.translate(e.width/2,e.height/2);for(var s=0;s<o.length;s++){i.save(),o[s].rotate&&i.rotate(90*Math.PI/180);var l=o[s].name,c=o[s].textSize,u=A(l,c);i.beginPath(),i.setStrokeStyle(o[s].color),i.setFillStyle(o[s].color),i.setFontSize(c),o[s].rotate?o[s].areav[0]>0&&(e.tooltip&&e.tooltip.index==s?i.strokeText(l,(o[s].areav[0]+5-e.width/2)*a-u*(1-a)/2,(o[s].areav[1]+5+c-e.height/2)*a):i.fillText(l,(o[s].areav[0]+5-e.width/2)*a-u*(1-a)/2,(o[s].areav[1]+5+c-e.height/2)*a)):o[s].area[0]>0&&(e.tooltip&&e.tooltip.index==s?i.strokeText(l,(o[s].area[0]+5-e.width/2)*a-u*(1-a)/2,(o[s].area[1]+5+c-e.height/2)*a):i.fillText(l,(o[s].area[0]+5-e.width/2)*a-u*(1-a)/2,(o[s].area[1]+5+c-e.height/2)*a)),i.stroke(),i.restore()}i.restore()}function Xt(t,e,n,i){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,s=r({},{activeWidth:10,activeOpacity:.3,border:!1,borderWidth:2,borderColor:"#FFFFFF",fillOpacity:1,labelAlign:"right"},e.extra.funnel),l=(e.height-e.area[0]-e.area[2])/t.length,c={x:e.area[3]+(e.width-e.area[1]-e.area[3])/2,y:e.height-e.area[2]},u=s.activeWidth,h=Math.min((e.width-e.area[1]-e.area[3])/2-u,(e.height-e.area[0]-e.area[2])/2-u);t=X(t,h,a),i.save(),i.translate(c.x,c.y);for(var p=0;p<t.length;p++)0==p?(e.tooltip&&e.tooltip.index==p&&(i.beginPath(),i.setFillStyle(o(t[p].color,s.activeOpacity)),i.moveTo(-u,0),i.lineTo(-t[p].radius-u,-l),i.lineTo(t[p].radius+u,-l),i.lineTo(u,0),i.lineTo(-u,0),i.closePath(),i.fill()),t[p].funnelArea=[c.x-t[p].radius,c.y-l,c.x+t[p].radius,c.y],i.beginPath(),i.setLineWidth(s.borderWidth*e.pixelRatio),i.setStrokeStyle(s.borderColor),i.setFillStyle(o(t[p].color,s.fillOpacity)),i.moveTo(0,0),i.lineTo(-t[p].radius,-l),i.lineTo(t[p].radius,-l),i.lineTo(0,0),i.closePath(),i.fill(),1==s.border&&i.stroke()):(e.tooltip&&e.tooltip.index==p&&(i.beginPath(),i.setFillStyle(o(t[p].color,s.activeOpacity)),i.moveTo(0,0),i.lineTo(-t[p-1].radius-u,0),i.lineTo(-t[p].radius-u,-l),i.lineTo(t[p].radius+u,-l),i.lineTo(t[p-1].radius+u,0),i.lineTo(0,0),i.closePath(),i.fill()),t[p].funnelArea=[c.x-t[p].radius,c.y-l*(p+1),c.x+t[p].radius,c.y-l*p],i.beginPath(),i.setLineWidth(s.borderWidth*e.pixelRatio),i.setStrokeStyle(s.borderColor),i.setFillStyle(o(t[p].color,s.fillOpacity)),i.moveTo(0,0),i.lineTo(-t[p-1].radius,0),i.lineTo(-t[p].radius,-l),i.lineTo(t[p].radius,-l),i.lineTo(t[p-1].radius,0),i.lineTo(0,0),i.closePath(),i.fill(),1==s.border&&i.stroke()),i.translate(0,-l);return i.restore(),!1!==e.dataLabel&&1===a&&qt(t,e,i,l,s.labelAlign,u,c),{center:c,radius:h,series:t}}function qt(t,e,n,i,r,o,s){for(var l=0;l<t.length;l++){var c=t[l],u=void 0,h=void 0,p=void 0,f=void 0,d=c.format?c.format(+c._proportion_.toFixed(2)):a.toFixed(100*c._proportion_)+"%";"right"==r?(u=0==l?(c.funnelArea[2]+s.x)/2:(c.funnelArea[2]+t[l-1].funnelArea[2])/2,h=u+2*o,p=c.funnelArea[1]+i/2,f=c.textSize||e.fontSize,n.setLineWidth(1*e.pixelRatio),n.setStrokeStyle(c.color),n.setFillStyle(c.color),n.beginPath(),n.moveTo(u,p),n.lineTo(h,p),n.stroke(),n.closePath(),n.beginPath(),n.moveTo(h,p),n.arc(h,p,2,0,2*Math.PI),n.closePath(),n.fill(),n.beginPath(),n.setFontSize(f),n.setFillStyle(c.textColor||"#666666"),n.fillText(d,h+5,p+f/2-2),n.closePath(),n.stroke(),n.closePath()):(u=0==l?(c.funnelArea[0]+s.x)/2:(c.funnelArea[0]+t[l-1].funnelArea[0])/2,h=u-2*o,p=c.funnelArea[1]+i/2,f=c.textSize||e.fontSize,n.setLineWidth(1*e.pixelRatio),n.setStrokeStyle(c.color),n.setFillStyle(c.color),n.beginPath(),n.moveTo(u,p),n.lineTo(h,p),n.stroke(),n.closePath(),n.beginPath(),n.moveTo(h,p),n.arc(h,p,2,0,2*Math.PI),n.closePath(),n.fill(),n.beginPath(),n.setFontSize(f),n.setFillStyle(c.textColor||"#666666"),n.fillText(d,h-5-A(d),p+f/2-2),n.closePath(),n.stroke(),n.closePath())}}function Gt(t,e){e.draw()}var Zt={easeIn:function(t){return Math.pow(t,3)},easeOut:function(t){return Math.pow(t-1,3)+1},easeInOut:function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},linear:function(t){return t}};function Yt(t){this.isStop=!1,t.duration="undefined"===typeof t.duration?1e3:t.duration,t.timing=t.timing||"linear";var e=17;function n(){return"undefined"!==typeof setTimeout?function(t,e){setTimeout(function(){var e=+new Date;t(e)},e)}:"undefined"!==typeof requestAnimationFrame?requestAnimationFrame:function(t){t(null)}}var i=n(),r=null,a=function(n){if(null===n||!0===this.isStop)return t.onProcess&&t.onProcess(1),void(t.onAnimationFinish&&t.onAnimationFinish());if(null===r&&(r=n),n-r<t.duration){var o=(n-r)/t.duration,s=Zt[t.timing];o=s(o),t.onProcess&&t.onProcess(o),i(a,e)}else t.onProcess&&t.onProcess(1),t.onAnimationFinish&&t.onAnimationFinish()};a=a.bind(this),i(a,e)}function Jt(t,e,n,i){var a=this,o=e.series,s=e.categories;o=g(o,e,n);var c=e.animation?e.duration:0;a.animationInstance&&a.animationInstance.stop();var u=null;if("candle"==t){var h=r({},e.extra.candle.average);h.show?(u=l(h.day,h.name,h.color,o[0].data),u=g(u,e,n),e.seriesMA=u):u=e.seriesMA?e.seriesMA=g(e.seriesMA,e,n):o}else u=o;e._series_=o=C(o),e.area=new Array(4);for(var p=0;p<4;p++)e.area[p]=e.padding[p];var f=F(u,e,n,e.chartData),d=f.area.wholeHeight,v=f.area.wholeWidth;switch(e.legend.position){case"top":e.area[0]+=d;break;case"bottom":e.area[2]+=d;break;case"left":e.area[3]+=v;break;case"right":e.area[1]+=v;break}var A={},y=0;if("line"===e.type||"column"===e.type||"area"===e.type||"mix"===e.type||"candle"===e.type){if(A=at(o,e,n),y=A.yAxisWidth,e.yAxis.showTitle){for(var x=0,m=0;m<e.yAxis.data.length;m++)x=Math.max(x,e.yAxis.data[m].titleFontSize?e.yAxis.data[m].titleFontSize:n.fontSize);e.area[0]+=(x+6)*e.pixelRatio}for(var b=0,S=0,w=0;w<y.length;w++)"left"==y[w].position?(e.area[3]+=S>0?y[w].width+e.yAxis.padding:y[w].width,S+=1):(e.area[1]+=b>0?y[w].width+e.yAxis.padding:y[w].width,b+=1)}else n.yAxisWidth=y;if(e.chartData.yAxisData=A,e.categories&&e.categories.length){e.chartData.xAxisData=tt(e.categories,e,n);var P=N(e.categories,e,n,e.chartData.xAxisData.eachSpacing),T=P.xAxisHeight,I=P.angle;n.xAxisHeight=T,n._xAxisTextAngle_=I,e.area[2]+=T,e.chartData.categoriesData=P}else if("line"===e.type||"area"===e.type||"points"===e.type){e.chartData.xAxisData=W(o,e,n),s=e.chartData.xAxisData.rangesFormat;var k=N(s,e,n,e.chartData.xAxisData.eachSpacing),j=k.xAxisHeight,D=k.angle;n.xAxisHeight=j,n._xAxisTextAngle_=D,e.area[2]+=j,e.chartData.categoriesData=k}else e.chartData.xAxisData={xAxisPoints:[]};if(e.enableScroll&&"right"==e.xAxis.scrollAlign&&void 0===e._scrollDistance_){var O=0,L=e.chartData.xAxisData.xAxisPoints,E=e.chartData.xAxisData.startX,M=e.chartData.xAxisData.endX,R=e.chartData.xAxisData.eachSpacing,_=R*(L.length-1),B=M-E;O=B-_,a.scrollOption={currentOffset:O,startTouchX:O,distance:0,lastMoveTime:0},e._scrollDistance_=O}switch("pie"!==t&&"ring"!==t&&"rose"!==t||(n._pieTextMaxLength_=!1===e.dataLabel?0:J(u)),t){case"word":var z=r({},{type:"normal",autoColors:!0},e.extra.word);1!=e.updateData&&void 0!=e.updateData||(e.chartData.wordCloudData=Qt(e,z.type)),this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),Vt(o,e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"map":i.clearRect(0,0,e.width,e.height),Wt(o,e,n,i);break;case"funnel":this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),e.chartData.funnelData=Xt(o,e,n,i,t),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"line":this.animationInstance=new Yt({timing:"easeIn",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),Ct(s,e,n,i),It(s,e,n,i);var r=wt(o,e,n,i,t),a=r.xAxisPoints,l=r.calPoints,c=r.eachSpacing;e.chartData.xAxisPoints=a,e.chartData.calPoints=l,e.chartData.eachSpacing=c,kt(o,e,n,i),!1!==e.enableMarkLine&&1===t&&vt(e,n,i),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t,c,a),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"mix":this.animationInstance=new Yt({timing:"easeIn",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),Ct(s,e,n,i),It(s,e,n,i);var r=Pt(o,e,n,i,t),a=r.xAxisPoints,l=r.calPoints,c=r.eachSpacing;e.chartData.xAxisPoints=a,e.chartData.calPoints=l,e.chartData.eachSpacing=c,kt(o,e,n,i),!1!==e.enableMarkLine&&1===t&&vt(e,n,i),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t,c,a),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"column":this.animationInstance=new Yt({timing:"easeIn",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),Ct(s,e,n,i),It(s,e,n,i);var r=mt(o,e,n,i,t),a=r.xAxisPoints,l=r.calPoints,c=r.eachSpacing;e.chartData.xAxisPoints=a,e.chartData.calPoints=l,e.chartData.eachSpacing=c,kt(o,e,n,i),!1!==e.enableMarkLine&&1===t&&vt(e,n,i),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t,c,a),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"area":this.animationInstance=new Yt({timing:"easeIn",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),Ct(s,e,n,i),It(s,e,n,i);var r=St(o,e,n,i,t),a=r.xAxisPoints,l=r.calPoints,c=r.eachSpacing;e.chartData.xAxisPoints=a,e.chartData.calPoints=l,e.chartData.eachSpacing=c,kt(o,e,n,i),!1!==e.enableMarkLine&&1===t&&vt(e,n,i),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t,c,a),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"ring":case"pie":this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),e.chartData.pieData=Dt(o,e,n,i,t),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"rose":this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),e.chartData.pieData=Ot(o,e,n,i,t),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"radar":this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),e.chartData.radarData=Mt(o,e,n,i,t),jt(e.series,e,n,i,e.chartData),Tt(e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"arcbar":this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),e.chartData.arcbarData=Lt(o,e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"gauge":this.animationInstance=new Yt({timing:"easeInOut",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),e.chartData.gaugeData=Et(s,o,e,n,i,t),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break;case"candle":this.animationInstance=new Yt({timing:"easeIn",duration:c,onProcess:function(t){i.clearRect(0,0,e.width,e.height),e.rotate&&lt(i,e),Ct(s,e,n,i),It(s,e,n,i);var r=bt(o,u,e,n,i,t),a=r.xAxisPoints,l=r.calPoints,c=r.eachSpacing;e.chartData.xAxisPoints=a,e.chartData.calPoints=l,e.chartData.eachSpacing=c,kt(o,e,n,i),!1!==e.enableMarkLine&&1===t&&vt(e,n,i),jt(u||e.series,e,n,i,e.chartData),Tt(e,n,i,t,c,a),Gt(e,i)},onAnimationFinish:function(){a.event.trigger("renderComplete")}});break}}function Ut(){this.events={}}Yt.prototype.stop=function(){this.isStop=!0},Ut.prototype.addEventListener=function(t,e){this.events[t]=this.events[t]||[],this.events[t].push(e)},Ut.prototype.trigger=function(){for(var t=arguments.length,n=Array(t),i=0;i<t;i++)n[i]=arguments[i];var r=n[0],a=n.slice(1);this.events[r]&&this.events[r].forEach(function(t){try{t.apply(null,a)}catch(n){console.error(e(n," at components\\u-charts\\u-charts.js:5091"))}})};var Kt=function(t){t.pixelRatio=t.pixelRatio?t.pixelRatio:1,t.fontSize=t.fontSize?t.fontSize*t.pixelRatio:13*t.pixelRatio,t.title=r({},t.title),t.subtitle=r({},t.subtitle),t.duration=t.duration?t.duration:1e3,t.yAxis=r({},{data:[],showTitle:!1,disabled:!1,disableGrid:!1,splitNumber:5,gridType:"solid",dashLength:4*t.pixelRatio,gridColor:"#cccccc",padding:10,fontColor:"#666666"},t.yAxis),t.yAxis.dashLength*=t.pixelRatio,t.yAxis.padding*=t.pixelRatio,t.xAxis=r({},{rotateLabel:!1,type:"calibration",gridType:"solid",dashLength:4,scrollAlign:"left",boundaryGap:"center",axisLine:!0,axisLineColor:"#cccccc"},t.xAxis),t.xAxis.dashLength*=t.pixelRatio,t.legend=r({},{show:!0,position:"bottom",float:"center",backgroundColor:"rgba(0,0,0,0)",borderColor:"rgba(0,0,0,0)",borderWidth:0,padding:5,margin:5,itemGap:10,fontSize:t.fontSize,lineHeight:t.fontSize,fontColor:"#333333",format:{},hiddenColor:"#CECECE"},t.legend),t.legend.borderWidth=t.legend.borderWidth*t.pixelRatio,t.legend.itemGap=t.legend.itemGap*t.pixelRatio,t.legend.padding=t.legend.padding*t.pixelRatio,t.legend.margin=t.legend.margin*t.pixelRatio,t.extra=r({},t.extra),t.rotate=!!t.rotate,t.animation=!!t.animation,t.rotate=!!t.rotate;var e=JSON.parse(JSON.stringify(i));if(e.colors=t.colors?t.colors:e.colors,e.yAxisTitleWidth=!0!==t.yAxis.disabled&&t.yAxis.title?e.yAxisTitleWidth:0,"pie"!=t.type&&"ring"!=t.type||(e.pieChartLinePadding=!1===t.dataLabel?0:t.extra.pie.labelWidth*t.pixelRatio||e.pieChartLinePadding*t.pixelRatio),"rose"==t.type&&(e.pieChartLinePadding=!1===t.dataLabel?0:t.extra.rose.labelWidth*t.pixelRatio||e.pieChartLinePadding*t.pixelRatio),e.pieChartTextPadding=!1===t.dataLabel?0:e.pieChartTextPadding*t.pixelRatio,e.yAxisSplit=t.yAxis.splitNumber?t.yAxis.splitNumber:i.yAxisSplit,e.rotate=t.rotate,t.rotate){var a=t.width,o=t.height;t.width=o,t.height=a}t.padding=t.padding?t.padding:e.padding;for(var s=0;s<4;s++)t.padding[s]*=t.pixelRatio;e.yAxisWidth=i.yAxisWidth*t.pixelRatio,e.xAxisHeight=i.xAxisHeight*t.pixelRatio,t.enableScroll&&t.xAxis.scrollShow&&(e.xAxisHeight+=6*t.pixelRatio),e.xAxisLineHeight=i.xAxisLineHeight*t.pixelRatio,e.fontSize=t.fontSize,e.titleFontSize=i.titleFontSize*t.pixelRatio,e.subtitleFontSize=i.subtitleFontSize*t.pixelRatio,e.toolTipPadding=i.toolTipPadding*t.pixelRatio,e.toolTipLineHeight=i.toolTipLineHeight*t.pixelRatio,e.columePadding=i.columePadding*t.pixelRatio,t.$this=t.$this?t.$this:this,this.context=n.createCanvasContext(t.canvasId,t.$this),t.chartData={},this.event=new Ut,this.scrollOption={currentOffset:0,startTouchX:0,distance:0,lastMoveTime:0},this.opts=t,this.config=e,Jt.call(this,t.type,t,e,this.context)};Kt.prototype.updateData=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.opts=r({},this.opts,t),this.opts.updateData=!0;var e=t.scrollPosition||"current";switch(e){case"current":this.opts._scrollDistance_=this.scrollOption.currentOffset;break;case"left":this.opts._scrollDistance_=0,this.scrollOption={currentOffset:0,startTouchX:0,distance:0,lastMoveTime:0};break;case"right":var n=at(this.opts.series,this.opts,this.config),i=n.yAxisWidth;this.config.yAxisWidth=i;var a=0,o=tt(this.opts.categories,this.opts,this.config),s=o.xAxisPoints,l=o.startX,c=o.endX,u=o.eachSpacing,h=u*(s.length-1),p=c-l;a=p-h,this.scrollOption={currentOffset:a,startTouchX:a,distance:0,lastMoveTime:0},this.opts._scrollDistance_=a;break}Jt.call(this,this.opts.type,this.opts,this.config,this.context)},Kt.prototype.zoom=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.opts.xAxis.itemCount;if(!0===this.opts.enableScroll){var n=Math.round(Math.abs(this.scrollOption.currentOffset)/this.opts.chartData.eachSpacing)+Math.round(this.opts.xAxis.itemCount/2);this.opts.animation=!1,this.opts.xAxis.itemCount=t.itemCount;var i=at(this.opts.series,this.opts,this.config),r=i.yAxisWidth;this.config.yAxisWidth=r;var a=0,o=tt(this.opts.categories,this.opts,this.config),s=o.xAxisPoints,l=o.startX,c=o.endX,u=o.eachSpacing,h=u*n,p=c-l,f=p-u*(s.length-1);a=p/2-h,a>0&&(a=0),a<f&&(a=f),this.scrollOption={currentOffset:a,startTouchX:a,distance:0,lastMoveTime:0},this.opts._scrollDistance_=a,Jt.call(this,this.opts.type,this.opts,this.config,this.context)}else console.log(e("请启用滚动条后使用！"," at components\\u-charts\\u-charts.js:5265"))},Kt.prototype.stopAnimation=function(){this.animationInstance&&this.animationInstance.stop()},Kt.prototype.addEventListener=function(t,e){this.event.addEventListener(t,e)},Kt.prototype.getCurrentDataIndex=function(t){var e=null;if(e=t.changedTouches?t.changedTouches[0]:t.mp.changedTouches[0],e){var n=m(e,this.opts,t);return"pie"===this.opts.type||"ring"===this.opts.type||"rose"===this.opts.type?_({x:n.x,y:n.y},this.opts.chartData.pieData):"radar"===this.opts.type?L({x:n.x,y:n.y},this.opts.chartData.radarData,this.opts.categories.length):"funnel"===this.opts.type?E({x:n.x,y:n.y},this.opts.chartData.funnelData):"map"===this.opts.type?R({x:n.x,y:n.y},this.opts):"word"===this.opts.type?M({x:n.x,y:n.y},this.opts.chartData.wordCloudData):k({x:n.x,y:n.y},this.opts.chartData.calPoints,this.opts,this.config,Math.abs(this.scrollOption.currentOffset))}return-1},Kt.prototype.getLegendDataIndex=function(t){var e=null;if(e=t.changedTouches?t.changedTouches[0]:t.mp.changedTouches[0],e){var n=m(e,this.opts,t);return j({x:n.x,y:n.y},this.opts.chartData.legendData)}return-1},Kt.prototype.touchLegend=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=null;if(n=t.changedTouches?t.changedTouches[0]:t.mp.changedTouches[0],n){m(n,this.opts,t);var i=this.getLegendDataIndex(t);i>=0&&(this.opts.series[i].show=!this.opts.series[i].show,this.opts.animation=!!e.animation,this.opts._scrollDistance_=this.scrollOption.currentOffset,Jt.call(this,this.opts.type,this.opts,this.config,this.context))}},Kt.prototype.showToolTip=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=null;i=t.changedTouches?t.changedTouches[0]:t.mp.changedTouches[0],i||console.log(e("touchError"," at components\\u-charts\\u-charts.js:5402"));var a=m(i,this.opts,t),o=this.scrollOption.currentOffset,s=r({},this.opts,{_scrollDistance_:o,animation:!1});if("line"===this.opts.type||"area"===this.opts.type||"column"===this.opts.type){var l=this.getCurrentDataIndex(t);if(l>-1){var c=b(this.opts.series,l);if(0!==c.length){var u=P(c,this.opts.chartData.calPoints,l,this.opts.categories,n),h=u.textList,p=u.offset;p.y=a.y,s.tooltip={textList:h,offset:p,option:n,index:l}}}Jt.call(this,s.type,s,this.config,this.context)}if("mix"===this.opts.type){l=this.getCurrentDataIndex(t);if(l>-1){o=this.scrollOption.currentOffset,s=r({},this.opts,{_scrollDistance_:o,animation:!1}),c=b(this.opts.series,l);if(0!==c.length){var f=T(c,this.opts.chartData.calPoints,l,this.opts.categories,n);h=f.textList,p=f.offset;p.y=a.y,s.tooltip={textList:h,offset:p,option:n,index:l}}}Jt.call(this,s.type,s,this.config,this.context)}if("candle"===this.opts.type){l=this.getCurrentDataIndex(t);if(l>-1){o=this.scrollOption.currentOffset,s=r({},this.opts,{_scrollDistance_:o,animation:!1}),c=b(this.opts.series,l);if(0!==c.length){u=I(this.opts.series[0].data,c,this.opts.chartData.calPoints,l,this.opts.categories,this.opts.extra.candle,n),h=u.textList,p=u.offset;p.y=a.y,s.tooltip={textList:h,offset:p,option:n,index:l}}}Jt.call(this,s.type,s,this.config,this.context)}if("pie"===this.opts.type||"ring"===this.opts.type||"rose"===this.opts.type||"funnel"===this.opts.type){l=this.getCurrentDataIndex(t);if(l>-1){o=this.scrollOption.currentOffset,s=r({},this.opts,{_scrollDistance_:o,animation:!1}),c=this.opts._series_[l],h=[{text:n.format?n.format(c):c.name+": "+c.data,color:c.color}],p={x:a.x,y:a.y};s.tooltip={textList:h,offset:p,option:n,index:l}}Jt.call(this,s.type,s,this.config,this.context)}if("map"===this.opts.type||"word"===this.opts.type){l=this.getCurrentDataIndex(t);if(l>-1){o=this.scrollOption.currentOffset,s=r({},this.opts,{_scrollDistance_:o,animation:!1}),c=this.opts._series_[l],h=[{text:n.format?n.format(c):c.properties.name,color:c.color}],p={x:a.x,y:a.y};s.tooltip={textList:h,offset:p,option:n,index:l}}s.updateData=!1,Jt.call(this,s.type,s,this.config,this.context)}if("radar"===this.opts.type){l=this.getCurrentDataIndex(t);if(l>-1){o=this.scrollOption.currentOffset,s=r({},this.opts,{_scrollDistance_:o,animation:!1}),c=b(this.opts.series,l);if(0!==c.length){h=c.map(function(t){return{text:n.format?n.format(t):t.name+": "+t.data,color:t.color}}),p={x:a.x,y:a.y};s.tooltip={textList:h,offset:p,option:n,index:l}}}Jt.call(this,s.type,s,this.config,this.context)}},Kt.prototype.translate=function(t){this.scrollOption={currentOffset:t,startTouchX:t,distance:0,lastMoveTime:0};var e=r({},this.opts,{_scrollDistance_:t,animation:!1});Jt.call(this,this.opts.type,e,this.config,this.context)},Kt.prototype.scrollStart=function(t){var e=null;e=t.changedTouches?t.changedTouches[0]:t.mp.changedTouches[0];var n=m(e,this.opts,t);e&&!0===this.opts.enableScroll&&(this.scrollOption.startTouchX=n.x)},Kt.prototype.scroll=function(t){0===this.scrollOption.lastMoveTime&&(this.scrollOption.lastMoveTime=Date.now());var e=this.opts.extra.touchMoveLimit||20,n=Date.now(),i=n-this.scrollOption.lastMoveTime;if(!(i<Math.floor(1e3/e))){this.scrollOption.lastMoveTime=n;var a=null;if(a=t.changedTouches?t.changedTouches[0]:t.mp.changedTouches[0],a&&!0===this.opts.enableScroll){var o,s=m(a,this.opts,t);o=s.x-this.scrollOption.startTouchX;var l=this.scrollOption.currentOffset,u=c(this,l+o,this.opts.chartData,this.config,this.opts);this.scrollOption.distance=o=u-l;var h=r({},this.opts,{_scrollDistance_:l+o,animation:!1});return Jt.call(this,h.type,h,this.config,this.context),l+o}}},Kt.prototype.scrollEnd=function(t){if(!0===this.opts.enableScroll){var e=this.scrollOption,n=e.currentOffset,i=e.distance;this.scrollOption.currentOffset=n+i,this.scrollOption.distance=0}},"object"===typeof t.exports&&(t.exports=Kt)}).call(this,n("0de9")["default"],n("6e42")["default"])},bf0f:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={appid:"__UNI__1EA9548"};e.default=i},c8ba:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(i){"object"===typeof window&&(n=window)}t.exports=n},ef3b:function(t,e){t.exports="data:image/png;base64,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"}}]);
});

define('app.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){

require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')
});
require('app.js');

__wxRoute = 'components/p-scan/scan';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/p-scan/scan.js';

define('components/p-scan/scan.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/p-scan/scan"], {
  2260: function _(t, e, a) {
    "use strict";

    a.r(e);
    var n = a("23b9"),
        r = a("9001");

    for (var o in r) {
      "default" !== o && function (t) {
        a.d(e, t, function () {
          return r[t];
        });
      }(o);
    }

    var c = a("2877"),
        u = Object(c["a"])(r["default"], n["a"], n["b"], !1, null, null, null);
    e["default"] = u.exports;
  },
  "23b9": function b9(t, e, a) {
    "use strict";

    var n = function n() {
      var t = this,
          e = t.$createElement;
      t._self._c;
    },
        r = [];

    a.d(e, "a", function () {
      return n;
    }), a.d(e, "b", function () {
      return r;
    });
  },
  "76ac": function ac(t, e, a) {
    "use strict";

    (function (t) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      }), e.default = void 0;
      var a = {
        data: function data() {
          return {
            barcode: [plus.barcode.QR, plus.barcode.EAN13, plus.barcode.EAN8, plus.barcode.UPCA, plus.barcode.UPCE, plus.barcode.CODABAR, plus.barcode.CODE39, plus.barcode.CODE93, plus.barcode.CODE128, plus.barcode.ITF]
          };
        },
        created: function created() {
          t.getSystemInfoSync().statusBarHeight;
          var e = getCurrentPages(),
              a = e[e.length - 1],
              n = a.$getAppWebview();
          this.barcode = plus.barcode.create("barcode", this.barcode, {
            top: "0",
            left: "0px",
            width: "100%",
            height: "100%",
            position: "static"
          }), this.barcode.onmarked = this.onmarked, n.append(this.barcode);
          var r = t.getSystemInfoSync();
          "android" == r.platform && this.barcode.start();
        },
        onUnload: function onUnload() {
          clearTimeout(this.t);
        },
        methods: {
          onmarked: function onmarked(t, e) {
            var a = this;
            this.$emit("getCode", e), this.t = setTimeout(function () {
              a.barcode.start();
            }, 1e3);
          }
        }
      };
      e.default = a;
    }).call(this, a("6e42")["default"]);
  },
  9001: function _(t, e, a) {
    "use strict";

    a.r(e);
    var n = a("76ac"),
        r = a.n(n);

    for (var o in n) {
      "default" !== o && function (t) {
        a.d(e, t, function () {
          return n[t];
        });
      }(o);
    }

    e["default"] = r.a;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/p-scan/scan-create-component', {
  'components/p-scan/scan-create-component': function componentsPScanScanCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("2260"));
  }
}, [['components/p-scan/scan-create-component']]]);
});
require('components/p-scan/scan.js');

__wxRoute = 'pages/guide/index';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/guide/index.js';

define('pages/guide/index.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/guide/index"],{4178:function(e,n,t){"use strict";var u=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return u}),t.d(n,"b",function(){return a})},"6e90":function(e,n,t){"use strict";(function(e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={onLoad:function(){this.checkGuide(),console.log(e("onLoad"," at pages\\guide\\index.vue:9"))},methods:{checkGuide:function(){var n=t.getStorageSync("launchFlag");n?t.reLaunch({url:"../login/index"}):(console.log(e("去启动介绍页"," at pages\\guide\\index.vue:21")),t.reLaunch({url:"guide"}))}}};n.default=u}).call(this,t("0de9")["default"],t("6e42")["default"])},8089:function(e,n,t){"use strict";(function(e){t("8460"),t("921b");u(t("66fd"));var n=u(t("aef4"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},aef4:function(e,n,t){"use strict";t.r(n);var u=t("4178"),a=t("cf71");for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);var c=t("2877"),i=Object(c["a"])(a["default"],u["a"],u["b"],!1,null,null,null);n["default"]=i.exports},cf71:function(e,n,t){"use strict";t.r(n);var u=t("6e90"),a=t.n(u);for(var o in u)"default"!==o&&function(e){t.d(n,e,function(){return u[e]})}(o);n["default"]=a.a}},[["8089","common/runtime","common/vendor"]]]);
});
require('pages/guide/index.js');
__wxRoute = 'pages/guide/guide';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/guide/guide.js';

define('pages/guide/guide.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/guide/guide"],{1732:function(e,n,t){},"43ed":function(e,n,t){"use strict";var u=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return u}),t.d(n,"b",function(){return a})},"5eda":function(e,n,t){"use strict";t.r(n);var u=t("e808"),a=t.n(u);for(var o in u)"default"!==o&&function(e){t.d(n,e,function(){return u[e]})}(o);n["default"]=a.a},"729e":function(e,n,t){"use strict";t.r(n);var u=t("43ed"),a=t("5eda");for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);t("9d39");var r=t("2877"),c=Object(r["a"])(a["default"],u["a"],u["b"],!1,null,null,null);n["default"]=c.exports},"9d39":function(e,n,t){"use strict";var u=t("1732"),a=t.n(u);a.a},dafc:function(e,n,t){"use strict";(function(e){t("8460"),t("921b");u(t("66fd"));var n=u(t("729e"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},e808:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{background:["color1","color2","color3"],autoplay:!1,duration:500,jumpover:"跳过",experience:"立即体验"}},methods:{launchFlag:function(){e.setStorage({key:"launchFlag",data:!0}),e.reLaunch({url:"/pages/login/login"})}}};n.default=t}).call(this,t("6e42")["default"])}},[["dafc","common/runtime","common/vendor"]]]);
});
require('pages/guide/guide.js');
__wxRoute = 'pages/login/login';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login/login.js';

define('pages/login/login.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"00b3":function(e,n,t){"use strict";t.r(n);var o=t("4967"),a=t("920d");for(var i in a)"default"!==i&&function(e){t.d(n,e,function(){return a[e]})}(i);t("4b91");var r=t("2877"),s=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},"1a63":function(e,n,t){"use strict";(function(e){t("8460"),t("921b");o(t("66fd"));var n=o(t("00b3"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},4967:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return a})},"4b91":function(e,n,t){"use strict";var o=t("9f46"),a=t.n(o);a.a},"920d":function(e,n,t){"use strict";t.r(n);var o=t("bca5"),a=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);n["default"]=a.a},"9f46":function(e,n,t){},bca5:function(e,n,t){"use strict";(function(e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{loginPhone:"",loginPassword:"",message:""}},onLoad:function(){console.log(e("login页面onLoad"," at pages\\login\\login.vue:27"))},methods:{goLogin:function(){var n=this,o=this.loginPhone,a=this.loginPassword;if(!/^1(3|4|5|7|8|9)\d{9}$/.test(o))return this.message="手机号码有误，请重填",!1;if(!a)return this.message="密码为空",!1;t.showLoading({title:"登录中。。。",mask:!1});var i={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},r=t.getStorageSync("PHPSESSID");r&&(i["cookie"]="PHPSESSID="+r),t.request({url:this.$url+"/php/login.php",method:"POST",header:i,data:{phone:this.loginPhone,password:this.loginPassword},success:function(o){console.log(e(o," at pages\\login\\login.vue:60"));var a=o.cookies;if(a)for(var i=0;i<a.length;i++)if("PHPSESSID"==a[i].name){t.setStorageSync("PHPSESSID",a[i].value);break}var r=o.data;0===r.ec?(t.setStorageSync("userinfo",r.user),t.hideLoading(),t.reLaunch({url:"../me/me"})):(t.removeStorageSync("userinfo"),n.message=r.msg,t.hideLoading())},fail:function(){t.hideLoading(),n.message="网络连接失败"},complete:function(){}})}}};n.default=o}).call(this,t("0de9")["default"],t("6e42")["default"])}},[["1a63","common/runtime","common/vendor"]]]);
});
require('pages/login/login.js');
__wxRoute = 'pages/login/register';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login/register.js';

define('pages/login/register.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/register"],{"1d77":function(e,t,r){"use strict";r.r(t);var n=r("8cb3"),s=r("5f8f");for(var i in s)"default"!==i&&function(e){r.d(t,e,function(){return s[e]})}(i);r("4c75");var a=r("2877"),o=Object(a["a"])(s["default"],n["a"],n["b"],!1,null,null,null);t["default"]=o.exports},4510:function(e,t,r){},"4c75":function(e,t,r){"use strict";var n=r("4510"),s=r.n(n);s.a},"5f8f":function(e,t,r){"use strict";r.r(t);var n=r("61b3"),s=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,function(){return n[e]})}(i);t["default"]=s.a},"61b3":function(e,t,r){"use strict";(function(e,r){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{registerPhone:"",registerPassword:"",confirmPassword:"",registerName:"",message:""}},onLoad:function(){},methods:{goRegister:function(){var t=this,n=this.registerName,s=this.registerPhone,i=this.registerPassword,a=this.confirmPassword;if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(s))return this.message="手机号码有误，请重填",!1;if(!i)return this.message="密码为空",!1;if(!n)return this.message="用户名为空",!1;if(a!=i)return this.message="两次密码不同",!1;e.showLoading({title:"加载中。。。",mask:!1});var o={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},u=e.getStorageSync("PHPSESSID");u&&(o["cookie"]="PHPSESSID="+u),e.request({url:this.$url+"/php/register.php",method:"POST",header:o,data:{name:this.registerName,phone:this.registerPhone,password:this.registerPassword},success:function(n){console.log(r(n," at pages\\login\\register.vue:75"));var s=n.cookies;if(s)for(var i=0;i<s.length;i++)if("PHPSESSID"==s[i].name){e.setStorageSync("PHPSESSID",s[i].value);break}var a=n.data;0===a.ec?(e.setStorageSync("userinfo",a.user),e.hideLoading(),e.reLaunch({url:"../me/me"})):(e.removeStorageSync("userinfo"),t.message=a.msg,e.hideLoading())},fail:function(){e.hideLoading(),t.message="网络连接失败"},complete:function(){}})}}};t.default=n}).call(this,r("6e42")["default"],r("0de9")["default"])},"8cb3":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},s=[];r.d(t,"a",function(){return n}),r.d(t,"b",function(){return s})},d605:function(e,t,r){"use strict";(function(e){r("8460"),r("921b");n(r("66fd"));var t=n(r("1d77"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,r("6e42")["createPage"])}},[["d605","common/runtime","common/vendor"]]]);
});
require('pages/login/register.js');
__wxRoute = 'pages/me/me';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/me/me.js';

define('pages/me/me.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/me"],{"0508":function(e,t,n){"use strict";(function(e){n("8460"),n("921b");a(n("66fd"));var t=a(n("9019"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},1208:function(e,t,n){"use strict";var a=n("58c9"),r=n.n(a);r.a},"457b":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,a=(e._self._c,n("16b7")),r=n("ef3b");e.$mp.data=Object.assign({},{$root:{m0:a,m1:r}})},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})},"58c9":function(e,t,n){},"6d9b":function(e,t,n){"use strict";(function(e,n){var a;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{name:"",wealth:"",rfid:""}},onLoad:function(){a=this},onReady:function(){this.getServerData()},onNavigationBarButtonTap:function(e){this.getServerData()},methods:{getServerData:function(){var t=this,r=e.getStorageSync("userinfo"),o=r.member_id,u={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},i=e.getStorageSync("PHPSESSID");i&&(u["cookie"]="PHPSESSID="+i),e.request({url:this.$url+"/php/me.php",method:"POST",header:u,data:{id:o},success:function(t){console.log(n(t," at pages\\me\\me.vue:100"));var o=t.cookies;if(o)for(var u=0;u<o.length;u++)if("PHPSESSID"==o[u].name){e.setStorageSync("PHPSESSID",o[u].value);break}var i=t.data;0===i.ec?(e.setStorageSync("userinfo",i.user),a.name=r.member_name,a.wealth=r.member_wealth,r.member_rfid?a.rfid="我的卡号:"+r.member_rfid:a.rfid="未绑定卡片"):e.reLaunch({url:"../login/login"})},fail:function(){e.hideLoading(),t.message="网络连接失败"},complete:function(){}})},mejumprfid:function(){e.navigateTo({url:"rfid"})},mejumpwealth:function(){e.navigateTo({url:"wealth"})},mejumpbill:function(){e.navigateTo({url:"bill"})},mejumphelp:function(){e.navigateTo({url:"help"})},mejumpabout:function(){e.navigateTo({url:"about"})},mejumpexit:function(){e.removeStorageSync("userinfo"),e.reLaunch({url:"../login/login"})}}};t.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"7f71":function(e,t,n){"use strict";n.r(t);var a=n("6d9b"),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=r.a},9019:function(e,t,n){"use strict";n.r(t);var a=n("457b"),r=n("7f71");for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);n("1208");var u=n("2877"),i=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=i.exports}},[["0508","common/runtime","common/vendor"]]]);
});
require('pages/me/me.js');
__wxRoute = 'pages/QRcode/QRcode';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/QRcode/QRcode.js';

define('pages/QRcode/QRcode.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/QRcode/QRcode"],{"3ed1":function(e,t,n){"use strict";var u=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return u}),n.d(t,"b",function(){return a})},4830:function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={data:function(){return{}},methods:{getScanCode:function(t){e.navigateTo({url:"detail?rfid="+t}),console.log(n(t," at pages\\QRcode\\QRcode.vue:20"))}}};t.default=u}).call(this,n("6e42")["default"],n("0de9")["default"])},8977:function(e,t,n){"use strict";(function(e){n("8460"),n("921b");u(n("66fd"));var t=u(n("e958"));function u(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},d307:function(e,t,n){"use strict";n.r(t);var u=n("4830"),a=n.n(u);for(var o in u)"default"!==o&&function(e){n.d(t,e,function(){return u[e]})}(o);t["default"]=a.a},e958:function(e,t,n){"use strict";n.r(t);var u=n("3ed1"),a=n("d307");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var c=n("2877"),r=Object(c["a"])(a["default"],u["a"],u["b"],!1,null,null,null);t["default"]=r.exports}},[["8977","common/runtime","common/vendor"]]]);
});
require('pages/QRcode/QRcode.js');
__wxRoute = 'pages/me/bill';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/me/bill.js';

define('pages/me/bill.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/bill"],{"0399":function(e,t,n){"use strict";var i=n("e878"),a=n.n(i);a.a},2045:function(e,t,n){"use strict";(function(e,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,o=r(n("be51"));function r(e){return e&&e.__esModule?e:{default:e}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u={},c={data:function(){return{cWidth:"",cHeight:"",pixelRatio:1,serverData:"",itemCount:30,sliderMax:50,billList:[],newuser:""}},onLoad:function(t){a=this,this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(500)},onReady:function(){this.getServerData()},onNavigationBarButtonTap:function(e){this.getServerData()},methods:{getServerData:function(){var t=e.getStorageSync("userinfo"),n=t.member_id;e.showLoading({title:"正在加载数据..."});var i={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"};e.request({url:this.$url+"/php/bill.php",method:"POST",header:i,data:{id:n},success:function(e){var t=e.data;0===t.ec?(a.billList=t.user,a.fillData(t)):a.newuser="暂无数据"},fail:function(){e.showToast({title:"网络错误"})},complete:function(){e.hideLoading()}})},fillData:function(e){this.serverData=e;var t={categories:[],series:[]};t.categories=e.LineA.categories,t.series=e.LineA.series,this.showLineA("canvasLineA",t)},showLineA:function(e,t){var n;u[e]=new o.default((n={$this:a,canvasId:e,type:"line",fontSize:11,padding:[15,15,0,15],legend:{show:!0,padding:5,lineHeight:11,margin:5},dataLabel:!1,dataPointShape:!1,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!1,enableScroll:!0,xAxis:{disableGrid:!1,type:"grid",gridType:"dash",itemCount:5,scrollShow:!1,scrollAlign:"left",scrollBackgroundColor:"#F7F7FF",scrollColor:"#4191ea"},yAxis:{gridType:"dash",splitNumber:5,min:0,max:50,format:function(e){return e.toFixed(0)+"瓶"}},width:a.cWidth*a.pixelRatio,height:a.cHeight*a.pixelRatio},l(n,"dataLabel",!0),l(n,"dataPointShape",!0),l(n,"extra",{lineStyle:"straight"}),n))},touchLineA:function(e){u["canvasLineA"].scrollStart(e)},moveLineA:function(e){u["canvasLineA"].scroll(e)},touchEndLineA:function(e){u["canvasLineA"].scrollEnd(e),u["canvasLineA"].showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},godetail:function(t){e.navigateTo({url:"../QRcode/detail?rfid="+t}),console.log(i(t," at pages\\me\\bill.vue:190"))}}};t.default=c}).call(this,n("6e42")["default"],n("0de9")["default"])},"44e8":function(e,t,n){"use strict";n.r(t);var i=n("f443"),a=n("c2d6");for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);n("0399");var r=n("2877"),l=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,null,null);t["default"]=l.exports},"76a9":function(e,t,n){"use strict";(function(e){n("8460"),n("921b");i(n("66fd"));var t=i(n("44e8"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},c2d6:function(e,t,n){"use strict";n.r(t);var i=n("2045"),a=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=a.a},e878:function(e,t,n){},f443:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return a})}},[["76a9","common/runtime","common/vendor"]]]);
});
require('pages/me/bill.js');
__wxRoute = 'pages/me/rfid';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/me/rfid.js';

define('pages/me/rfid.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/rfid"],{"04ad":function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{btntext:"",placeholder:""}},onLoad:function(){},onReady:function(){var t=e.getStorageSync("userinfo");t.member_rfid?(this.placeholder=t.member_rfid,this.btntext="解绑卡片"):(this.placeholder="请输入卡号",this.btntext="绑定卡片")},methods:{gorfid:function(){var t=e.getStorageSync("userinfo"),r=t.member_id,o="";o=t.member_rfid?"":this.rfidvalue,e.showLoading({title:"正在加载数据..."});var a={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"},i=e.getStorageSync("PHPSESSID");i&&(a["cookie"]="PHPSESSID="+i),e.request({url:this.$url+"/php/rfid.php",method:"POST",header:a,data:{id:r,rfid:o},success:function(t){console.log(n(t," at pages\\me\\rfid.vue:63"));var r=t.cookies;if(r)for(var o=0;o<r.length;o++)if("PHPSESSID"==r[o].name){e.setStorageSync("PHPSESSID",r[o].value);break}var a=t.data;0===a.ec?(e.setStorageSync("userinfo",a.user),e.hideLoading(),e.redirectTo({url:"rfid"})):(e.removeStorageSync("userinfo"),e.showLoading({title:a.msg,mask:!1}),e.hideLoading())},fail:function(){e.hideLoading(),e.showLoading({title:"网络连接失败",mask:!1})},complete:function(){}})}}};t.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},"27f1":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o})},3568:function(e,t,n){"use strict";n.r(t);var r=n("27f1"),o=n("6f7f");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("8eb3");var i=n("2877"),u=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=u.exports},"57c7":function(e,t,n){},"6f7f":function(e,t,n){"use strict";n.r(t);var r=n("04ad"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=o.a},"8eb3":function(e,t,n){"use strict";var r=n("57c7"),o=n.n(r);o.a},"8fde":function(e,t,n){"use strict";(function(e){n("8460"),n("921b");r(n("66fd"));var t=r(n("3568"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["8fde","common/runtime","common/vendor"]]]);
});
require('pages/me/rfid.js');
__wxRoute = 'pages/me/wealth';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/me/wealth.js';

define('pages/me/wealth.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/wealth"],{"094c":function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{wealth:""}},onLoad:function(){var t=e.getStorageSync("userinfo");this.wealth=t.member_wealth},methods:{gorecharge:function(){var t=e.getStorageSync("userinfo"),a=t.member_id,r=(parseInt(this.rechargevalue)+parseInt(t.member_wealth)).toString(),o={};e.showLoading({title:"正在加载数据..."}),o["content-type"]="application/x-www-form-urlencoded; charset=UTF-8";var u=e.getStorageSync("PHPSESSID");u&&(o["cookie"]="PHPSESSID="+u),e.request({url:this.$url+"/php/wealth.php",method:"POST",header:o,data:{id:a,recharge:r},success:function(t){console.log(n(t," at pages\\me\\wealth.vue:52"));var a=t.cookies;if(a)for(var r=0;r<a.length;r++)if("PHPSESSID"==a[r].name){e.setStorageSync("PHPSESSID",a[r].value);break}var o=t.data;0===o.ec?(e.setStorageSync("userinfo",o.user),e.hideLoading(),e.reLaunch({url:"me"})):(e.removeStorageSync("userinfo"),e.showLoading({title:o.msg,mask:!1}),e.hideLoading())},fail:function(){e.hideLoading(),e.showLoading({title:"网络连接失败",mask:!1})},complete:function(){}})}}};t.default=a}).call(this,n("6e42")["default"],n("0de9")["default"])},"6fe9":function(e,t,n){"use strict";n.r(t);var a=n("094c"),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=r.a},7049:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})},"73a8":function(e,t,n){"use strict";var a=n("e0a2"),r=n.n(a);r.a},bfbf:function(e,t,n){"use strict";(function(e){n("8460"),n("921b");a(n("66fd"));var t=a(n("ed78"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},e0a2:function(e,t,n){},ed78:function(e,t,n){"use strict";n.r(t);var a=n("7049"),r=n("6fe9");for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);n("73a8");var u=n("2877"),i=Object(u["a"])(r["default"],a["a"],a["b"],!1,null,null,null);t["default"]=i.exports}},[["bfbf","common/runtime","common/vendor"]]]);
});
require('pages/me/wealth.js');
__wxRoute = 'pages/me/help';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/me/help.js';

define('pages/me/help.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/help"],{"316d":function(n,t,e){"use strict";var u=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return u}),e.d(t,"b",function(){return a})},"6a24":function(n,t,e){},"8fa0":function(n,t,e){"use strict";e.r(t);var u=e("316d"),a=e("f422");for(var f in a)"default"!==f&&function(n){e.d(t,n,function(){return a[n]})}(f);e("f66b");var r=e("2877"),c=Object(r["a"])(a["default"],u["a"],u["b"],!1,null,null,null);t["default"]=c.exports},cd14:function(n,t,e){},e9ab:function(n,t,e){"use strict";(function(n){e("8460"),e("921b");u(e("66fd"));var t=u(e("8fa0"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},f422:function(n,t,e){"use strict";e.r(t);var u=e("cd14"),a=e.n(u);for(var f in u)"default"!==f&&function(n){e.d(t,n,function(){return u[n]})}(f);t["default"]=a.a},f66b:function(n,t,e){"use strict";var u=e("6a24"),a=e.n(u);a.a}},[["e9ab","common/runtime","common/vendor"]]]);
});
require('pages/me/help.js');
__wxRoute = 'pages/me/about';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/me/about.js';

define('pages/me/about.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/me/about"],{"1bcc":function(n,t,e){"use strict";var u=function(){var n=this,t=n.$createElement;n._self._c},c=[];e.d(t,"a",function(){return u}),e.d(t,"b",function(){return c})},"2dcd":function(n,t,e){"use strict";e.r(t);var u=e("797f"),c=e.n(u);for(var a in u)"default"!==a&&function(n){e.d(t,n,function(){return u[n]})}(a);t["default"]=c.a},"423c":function(n,t,e){},"797f":function(n,t,e){},9405:function(n,t,e){"use strict";var u=e("423c"),c=e.n(u);c.a},e5d5:function(n,t,e){"use strict";(function(n){e("8460"),e("921b");u(e("66fd"));var t=u(e("fdea"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("6e42")["createPage"])},fdea:function(n,t,e){"use strict";e.r(t);var u=e("1bcc"),c=e("2dcd");for(var a in c)"default"!==a&&function(n){e.d(t,n,function(){return c[n]})}(a);e("9405");var r=e("2877"),f=Object(r["a"])(c["default"],u["a"],u["b"],!1,null,null,null);t["default"]=f.exports}},[["e5d5","common/runtime","common/vendor"]]]);
});
require('pages/me/about.js');
__wxRoute = 'pages/QRcode/detail';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/QRcode/detail.js';

define('pages/QRcode/detail.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/QRcode/detail"],{"4fce":function(t,e,n){"use strict";(function(t){n("8460"),n("921b");a(n("66fd"));var e=a(n("65ff"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"563e":function(t,e,n){},"65ff":function(t,e,n){"use strict";n.r(e);var a=n("a76d"),o=n("fb03");for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);n("70c9");var i=n("2877"),r=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},6835:function(t,e,n){"use strict";(function(t,n){var a;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{rfidList:""}},onLoad:function(t){a=this,this.getServerData(t)},onReady:function(){},methods:{getServerData:function(e){var o=e.rfid;console.log(t(o," at pages\\QRcode\\detail.vue:64")),n.showLoading({title:"正在加载数据..."});var u={"content-type":"application/x-www-form-urlencoded; charset=UTF-8"};n.request({url:this.$url+"/php/detail.php",method:"POST",header:u,data:{rfid:o},success:function(t){var e=t.data;0===e.ec?a.rfidList=e.user:n.showToast({title:e.msg})},fail:function(){n.showToast({title:"网络错误"})},complete:function(){n.hideLoading()}})}}};e.default=o}).call(this,n("0de9")["default"],n("6e42")["default"])},"70c9":function(t,e,n){"use strict";var a=n("563e"),o=n.n(a);o.a},a76d:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},fb03:function(t,e,n){"use strict";n.r(e);var a=n("6835"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=o.a}},[["4fce","common/runtime","common/vendor"]]]);
});
require('pages/QRcode/detail.js');
__wxRoute = 'pages/login/index';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login/index.js';

define('pages/login/index.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/index"],{"511a":function(e,n,t){"use strict";(function(e){t("8460"),t("921b");u(t("66fd"));var n=u(t("c849"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("6e42")["createPage"])},a083:function(e,n,t){"use strict";t.r(n);var u=t("dec1"),o=t.n(u);for(var a in u)"default"!==a&&function(e){t.d(n,e,function(){return u[e]})}(a);n["default"]=o.a},c849:function(e,n,t){"use strict";t.r(n);var u=t("ed34"),o=t("a083");for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);var c=t("2877"),r=Object(c["a"])(o["default"],u["a"],u["b"],!1,null,null,null);n["default"]=r.exports},dec1:function(e,n,t){"use strict";(function(e,t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={onLoad:function(){this.checkLogin(),console.log(e("onLoad"," at pages\\login\\index.vue:9"))},methods:{checkLogin:function(){var n=t.getStorageSync("userinfo");n?t.reLaunch({url:"../me/me"}):(console.log(e("去登录页"," at pages\\login\\index.vue:21")),t.reLaunch({url:"login"}))}}};n.default=u}).call(this,t("0de9")["default"],t("6e42")["default"])},ed34:function(e,n,t){"use strict";var u=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return u}),t.d(n,"b",function(){return o})}},[["511a","common/runtime","common/vendor"]]]);
});
require('pages/login/index.js');
;(function(global) {
    __uni_launch_ready(function() {
        var entryPagePath = __wxConfig.entryPagePath.replace('.html', '')
        if (entryPagePath.indexOf('/') !== 0) {
            entryPagePath = '/' + entryPagePath
        }
        wx.navigateTo({
            url: entryPagePath,
            query: {},
            openType: 'appLaunch',
            webviewId: 1
        })
        __wxConfig.__ready__ = true
    })
})(this);

