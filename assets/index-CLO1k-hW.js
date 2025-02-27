import{d as F,b as A,e as d,g as t,a2 as n,u as o,a3 as h,a4 as a,B as g,a5 as v,r as B,c as Z,a6 as I,a7 as E,J as D,Y as J}from"./@vue-BGm6lEuq.js";import{Q,V as X}from"./@tanstack-BhKubEP-.js";import{d as Y,c as q}from"./pinia-Cn09yGJU.js";import{u as ee}from"./@vueuse-CN9FJsg0.js";import{L as oe,a as te,b as ne,G as se,U as re,W as S}from"./@vicons-CidxD9Hl.js";import{N as f,_ as O,a as R,b as ae,u as le,c as ce,B as ie,d as ue,e as pe,f as de,g as me,h as fe,i as _e,n as ge}from"./naive-ui-Bip5ixlP.js";import{u as he,a as ye,b as Ce,d as xe,e as be,f as ve,g as Fe,W as we}from"./@wagmi-b8sFAqOD.js";import{z as W}from"./zksync-sso-B6JNLO04.js";import{Y as ke,Z as T,_ as N,V as L,P,$ as Ee}from"./viem-G-KiPdge.js";import{c as Se,a as Le}from"./vue-router-DVj02rF8.js";import"./seemly-CXtgmfu1.js";import"./vooks-BMjMHNmJ.js";import"./evtd-CI_DDEu_.js";import"./lodash-es-XQnpVOIm.js";import"./vueuc-Bqgq-H32.js";import"./@css-render-BTNXHBWI.js";import"./vdirs-DRH9Xvnd.js";import"./@juggle-C8OzoCMD.js";import"./@emotion-WldOFDRm.js";import"./treemate-BD4Oer00.js";import"./async-validator-9PlIezaS.js";import"./zustand-YPADddZo.js";import"./eventemitter3-DVaOc9f-.js";import"./base64-js-CqkleIqs.js";import"./mipd-CIcDX0W7.js";import"./abitype-kHAD-mPk.js";import"./ox-CcAxFH5_.js";import"./@noble-C5A8J5eD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))p(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&p(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function p(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const ze={class:"footer-w display-flex align-items-center"},Ae={class:"container display-grid grid-cols-3 align-items-center"},$e={class:"display-flex flex-row gap-4 justify-end"},Be={class:"social-footer pointer",title:"Join our community in X"},De={class:"social-footer pointer",title:"Join our Discord community"},Te={class:"social-footer pointer",title:"Lets go check our videos"},Ne=F({__name:"FooterComponent",setup(u){return(s,l)=>(d(),A("footer",ze,[t("div",Ae,[l[0]||(l[0]=t("p",null,"© Super Game",-1)),l[1]||(l[1]=t("nav",{class:"footer-nav-w justify-center"},[t("ul",{class:"footer-nav-holder display-flex flex-row gap-40 width-full justify-center"},[t("li",null,[t("a",null,"Newsletter")]),t("li",null,[t("a",null,"Whitepaper")]),t("li",null,[t("a",null,"Terms")]),t("li",null,[t("a",null,"Privacy")])])],-1)),t("ul",$e,[t("li",null,[t("a",Be,[n(o(f),{component:o(oe),depth:1,size:"40",color:"#92FE75"},null,8,["component"])])]),t("li",null,[t("a",De,[n(o(f),{component:o(te),depth:1,size:"40",color:"#92FE75"},null,8,["component"])])]),t("li",null,[t("a",Te,[n(o(f),{component:o(ne),depth:1,size:"40",color:"#92FE75"},null,8,["component"])])])])])]))}}),Pe=F({__name:"Balance",props:{address:{}},setup(u){const s=u,{data:l,isPending:p}=he({address:s.address,scopeKey:"use-balance"});return(e,r)=>{const i=R,_=ae,w=O;return d(),h(w,null,{default:a(()=>[n(_,{show:o(p)},{default:a(()=>[n(i,{type:"success"},{default:a(()=>{var C,x;return[g("Balance: "+v((C=o(l))==null?void 0:C.symbol)+" "+v((x=o(l))==null?void 0:x.value),1)]}),_:1})]),_:1},8,["show"])]),_:1})}}}),Ie="Xsolla ZK Sepolia Testnet",z=ke({...Ee,id:555272,name:Ie,nativeCurrency:{name:"XSOLLAZK",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://zkrpc-anvil.xsollazk.com"]}},blockExplorers:{default:{name:"xla explorer",url:"https://x.la/explorer"}},contracts:{multicall3:{address:"0x511322aB41bC456D2ed5b9e7Af1eEd9C7e5Bf4Ae"}},testnet:!0}),Oe=z.id,Re=W({metadata:{name:"Super Game"},authServerUrl:"https://xsollazk.com/wallet-demo/login",session:{feeLimit:T("0.1"),transfers:[{to:"0x55bE1B079b53962746B2e86d12f158a41DF294A6",valueLimit:T("0.1")}]}}),H=W({metadata:{name:"Super Game"},authServerUrl:"https://xsollazk.com/wallet-demo/login"}),We=ye({chains:[z,N,P],transports:{[z.id]:L("https://zkrpc-anvil.xsollazk.com"),[P.id]:L(),[N.id]:L()},connectors:[H],ssr:!1,syncConnectedChain:!1,storage:Ce({storage:xe})}),He=Y("main",()=>{const u=B(void 0),s=B(void 0),l=()=>{const{isConnected:e,address:r,chain:i}=be();return u.value=r.value,s.value=i.value,{isConnected:e,address:r,chain:i}};function p(e){return e?`${e.substring(0,6)}...${e.substring(e.length-4)}`:""}return{addressUser:u,chainUser:s,getAccount:l,shortenAddress:p}}),Ve={class:"nav-bar"},Me={class:"container display-flex flex-row justify-between align-items-center"},Ue={class:"navbar-wallets-btns display-flex gap-8"},je={class:"nav-bar-wallet-btn-w display-flex flex-row align-items-center gap-16"},Ge={class:"display-flex flex-column"},Ke={class:"display-flex gap-8"},Ze=F({__name:"NavBar",setup(u){const s=He(),{connect:l,connectors:p,isPending:e}=ve(),{disconnect:r}=Fe(),{isConnected:i,address:_,chain:w}=s.getAccount(),C=le(),x=async m=>{try{l({connector:m?Re:H,chainId:Oe}),C.success("Connect to wallet.")}catch(c){C.warning("Connect failed, see console for more info."),console.error("Connection failed:",c)}},M=m=>m?()=>D(pe,{size:"small",color:"#151518",round:!0,style:"margin: 4px; width: 24px; height: 24px;",src:m}):()=>D(f,{component:S});return Z(()=>p.map(m=>({label:m.name,key:m.name,icon:M(m.icon)}))),(m,c)=>{const U=ce,$=O,j=I("RouterLink"),k=ie,G=R,K=ue;return d(),A("header",Ve,[t("nav",Me,[n(j,{class:"brand-logo",to:"/"},{default:a(()=>[n($,{justify:"center",align:"center"},{default:a(()=>[n(o(f),{component:o(se),depth:1,size:"40",color:"#92FE75"},null,8,["component"]),n(U,{class:"m-auto"},{default:a(()=>c[3]||(c[3]=[g("Super Game")])),_:1})]),_:1})]),_:1}),t("div",Ue,[t("div",je,[o(i)?(d(),h(k,{key:0,loading:o(e),class:"connect-wallet-green",onClick:c[0]||(c[0]=b=>o(r)())},{icon:a(()=>[n(o(f),{component:o(re),depth:1,color:"#92FE75"},null,8,["component"])]),default:a(()=>[c[4]||(c[4]=g(" Disconnect Wallet "))]),_:1},8,["loading"])):(d(),h($,{key:1,justify:"center",align:"center"},{default:a(()=>[n(k,{loading:o(e),class:"connect-wallet-green",onClick:c[1]||(c[1]=b=>x(!1)),round:""},{icon:a(()=>[n(o(f),{component:o(S),depth:1,color:"#92FE75"},null,8,["component"])]),default:a(()=>[c[5]||(c[5]=g(" Connect wallet "))]),_:1},8,["loading"]),n(k,{loading:o(e),class:"connect-wallet-green",onClick:c[2]||(c[2]=b=>x(!0)),round:""},{icon:a(()=>[n(o(f),{component:o(S),depth:1,color:"#92FE75"},null,8,["component"])]),default:a(()=>[c[6]||(c[6]=g(" Connect wallet with the session "))]),_:1},8,["loading"])]),_:1})),t("div",Ge,[o(i)?(d(),h(G,{key:0,style:{color:"#92fe75"},type:"success"},{default:a(()=>{var b;return[g(" Chain: "+v((b=o(w))==null?void 0:b.name),1)]}),_:1})):E("",!0),t("div",Ke,[o(i)?(d(),h(K,{key:0,tooltip:!0,style:{"max-width":"100px",color:"white"}},{default:a(()=>[g(v(o(s).shortenAddress(o(_))),1)]),_:1})):E("",!0),o(_)?(d(),h(Pe,{key:1,address:o(_)},null,8,["address"])):E("",!0)])])])])])])}}}),Je={class:"main-content"},Qe=F({__name:"App",setup(u){ee("Rev Share Party");const s={common:{baseColor:"#fff",primaryColor:"#92FE75",primaryColorHover:"#92FE75",bodyColor:"#0F0F0F",borderColor:"#92FE75",textColor1:"#fff",textColor2:"#fff",textColor3:"#fff"},Button:{color:"#151518",textColor:"#92FE75",borderHover:"#8F75FE",borderFocus:"#8F75FE"},Dropdown:{color:"#151518",optionTextColor:"#FFF",optionColorHover:"#92FE75"},Tabs:{tabTextColorHoverSegment:"#fff",tabTextColorActiveBar:"#fff",tabTextColorLine:"rgba(255, 255, 255, 0.6)",tabFontSizeLarge:"16px",tabTextColorActiveLine:"#fff",barColor:"#fff",tabBorderColor:"rgba(233, 234, 236, 0.2)"},Table:{tdColor:"#0F0F0F",tdColorModal:"#C41E1EFF",tdColorPopover:"#fff",tdColorStriped:"#151518",thColor:"#151518",borderColor:"transparent"},Avatar:{borderRadius:"12px",border:"1px solid rgba(255, 255, 255, 0.2)"},Tag:{colorInfo:"rgba(233, 234, 236, 0.1)",textColorInfo:"#fff",borderRadius:"8px"},Modal:{color:"#151518"},Message:{color:"#151518",colorInfo:"#3D3D41",colorSuccess:"#3D3D41",colorLoading:"#3D3D41",iconColorSuccess:"#92FE75",colorError:"#3D3D41",colorWarning:"#3D3D41",textColor:"#fff",borderRadius:"12px",fontSize:"16px"},Input:{border:"1px solid #404042",placeholderColor:"#A1A1A3",textColor:"#92FE75",color:"#151518",colorFocus:"#151518",borderRadius:"12px",heightLarge:"52px"}};return(l,p)=>{const e=I("RouterView"),r=_e,i=fe,_=me;return d(),h(o(de),null,{default:a(()=>[n(_,{"theme-overrides":s},{default:a(()=>[n(i,null,{default:a(()=>[n(Ze),t("main",Je,[n(e)]),n(Ne),n(r)]),_:1})]),_:1})]),_:1})}}}),V=(u,s)=>{const l=u.__vccOpts||u;for(const[p,e]of s)l[p]=e;return l},Xe=V(Qe,[["__scopeId","data-v-4d7a6136"]]),Ye={};function qe(u,s){return d(),A("section",null,s[0]||(s[0]=[t("div",{class:"container main-container-padding"},[t("p",null,"Home")],-1)]))}const eo=V(Ye,[["render",qe]]),oo=Se({history:Le("/game-demo/"),routes:[{path:"/",name:"home",component:eo}]}),to=new Q,y=J(Xe);y.use(we,{config:We});y.use(X,{queryClient:to});y.use(q());y.use(oo);y.use(ge);y.mount("#app");
