import{a0 as H,r as M,V as B,i as G,h as $,x as T,a as g,U as D,_ as tt,m as et,o as st,w as nt,n as ot,t as ct,c as rt}from"./@vue-BGm6lEuq.js";/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let J;const E=t=>J=t,K=Symbol();function k(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var x;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(x||(x={}));function yt(){const t=H(!0),c=t.run(()=>M({}));let s=[],e=[];const r=B({install(u){E(r),r._a=u,u.provide(K,r),u.config.globalProperties.$pinia=r,e.forEach(f=>s.push(f)),e=[]},use(u){return this._a?s.push(u):e.push(u),this},_p:s,_a:null,_e:t,_s:new Map,state:c});return r}const U=()=>{};function V(t,c,s,e=U){t.push(c);const r=()=>{const u=t.indexOf(c);u>-1&&(t.splice(u,1),e())};return!s&&et()&&st(r),r}function P(t,...c){t.slice().forEach(s=>{s(...c)})}const ut=t=>t(),A=Symbol(),I=Symbol();function L(t,c){t instanceof Map&&c instanceof Map?c.forEach((s,e)=>t.set(e,s)):t instanceof Set&&c instanceof Set&&c.forEach(t.add,t);for(const s in c){if(!c.hasOwnProperty(s))continue;const e=c[s],r=t[s];k(r)&&k(e)&&t.hasOwnProperty(s)&&!g(e)&&!D(e)?t[s]=L(r,e):t[s]=e}return t}const at=Symbol();function ft(t){return!k(t)||!t.hasOwnProperty(at)}const{assign:y}=Object;function it(t){return!!(g(t)&&t.effect)}function lt(t,c,s,e){const{state:r,actions:u,getters:f}=c,a=s.state.value[t];let C;function b(){a||(s.state.value[t]=r?r():{});const S=ct(s.state.value[t]);return y(S,u,Object.keys(f||{}).reduce((v,_)=>(v[_]=B(rt(()=>{E(s);const d=s._s.get(t);return f[_].call(d,d)})),v),{}))}return C=q(t,b,c,s,e,!0),C}function q(t,c,s={},e,r,u){let f;const a=y({actions:{}},s),C={deep:!0};let b,S,v=[],_=[],d;const m=e.state.value[t];!u&&!m&&(e.state.value[t]={}),M({});let W;function N(o){let n;b=S=!1,typeof o=="function"?(o(e.state.value[t]),n={type:x.patchFunction,storeId:t,events:d}):(L(e.state.value[t],o),n={type:x.patchObject,payload:o,storeId:t,events:d});const i=W=Symbol();ot().then(()=>{W===i&&(b=!0)}),S=!0,P(v,n,e.state.value[t])}const z=u?function(){const{state:n}=s,i=n?n():{};this.$patch(j=>{y(j,i)})}:U;function Q(){f.stop(),v=[],_=[],e._s.delete(t)}const F=(o,n="")=>{if(A in o)return o[I]=n,o;const i=function(){E(e);const j=Array.from(arguments),p=[],R=[];function Y(l){p.push(l)}function Z(l){R.push(l)}P(_,{args:j,name:i[I],store:h,after:Y,onError:Z});let w;try{w=o.apply(this&&this.$id===t?this:h,j)}catch(l){throw P(R,l),l}return w instanceof Promise?w.then(l=>(P(p,l),l)).catch(l=>(P(R,l),Promise.reject(l))):(P(p,w),w)};return i[A]=!0,i[I]=n,i},X={_p:e,$id:t,$onAction:V.bind(null,_),$patch:N,$reset:z,$subscribe(o,n={}){const i=V(v,o,n.detached,()=>j()),j=f.run(()=>nt(()=>e.state.value[t],p=>{(n.flush==="sync"?S:b)&&o({storeId:t,type:x.direct,events:d},p)},y({},C,n)));return i},$dispose:Q},h=T(X);e._s.set(t,h);const O=(e._a&&e._a.runWithContext||ut)(()=>e._e.run(()=>(f=H()).run(()=>c({action:F}))));for(const o in O){const n=O[o];if(g(n)&&!it(n)||D(n))u||(m&&ft(n)&&(g(n)?n.value=m[o]:L(n,m[o])),e.state.value[t][o]=n);else if(typeof n=="function"){const i=F(n,o);O[o]=i,a.actions[o]=n}}return y(h,O),y(tt(h),O),Object.defineProperty(h,"$state",{get:()=>e.state.value[t],set:o=>{N(n=>{y(n,o)})}}),e._p.forEach(o=>{y(h,f.run(()=>o({store:h,app:e._a,pinia:e,options:a})))}),m&&u&&s.hydrate&&s.hydrate(h.$state,m),b=!0,S=!0,h}/*! #__NO_SIDE_EFFECTS__ */function St(t,c,s){let e,r;const u=typeof c=="function";e=t,r=u?s:c;function f(a,C){const b=$();return a=a||(b?G(K,null):null),a&&E(a),a=J,a._s.has(e)||(u?q(e,c,r,a):lt(e,r,a)),a._s.get(e)}return f.$id=e,f}export{yt as c,St as d};
