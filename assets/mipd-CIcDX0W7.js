function o(n){const e=d=>n(d.detail);return window.addEventListener("eip6963:announceProvider",e),window.dispatchEvent(new CustomEvent("eip6963:requestProvider")),()=>window.removeEventListener("eip6963:announceProvider",e)}function s(){const n=new Set;let e=[];const d=()=>o(r=>{e.some(({info:t})=>t.uuid===r.info.uuid)||(e=[...e,r],n.forEach(t=>t(e,{added:[r]})))});let i=d();return{_listeners(){return n},clear(){n.forEach(r=>r([],{removed:[...e]})),e=[]},destroy(){this.clear(),n.clear(),i()},findProvider({rdns:r}){return e.find(t=>t.info.rdns===r)},getProviders(){return e},reset(){this.clear(),i(),i=d()},subscribe(r,{emitImmediately:t}={}){return n.add(r),t&&r(e,{added:e}),()=>n.delete(r)}}}export{s as c};
