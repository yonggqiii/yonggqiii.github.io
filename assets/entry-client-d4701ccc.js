const h={context:void 0,registry:void 0};function I(e){h.context=e}function At(){return{...h.context,id:`${h.context.id}${h.context.count++}-`,count:0}}const Ct=(e,t)=>e===t,pe=Symbol("solid-proxy"),we={equals:Ct};let ue=null,et=ot;const R=1,ae=2,tt={owned:null,cleanups:null,context:null,owner:null},Ae={};var m=null;let f=null,v=null,$=null,C=null,ve=0;const[gr,He]=T(!1);function ke(e,t){const n=v,s=m,r=e.length===0,i=r?tt:{owned:null,cleanups:null,context:null,owner:t===void 0?s:t},o=r?e:()=>e(()=>O(()=>U(i)));m=i,v=null;try{return L(o,!0)}finally{v=n,m=s}}function T(e,t){t=t?Object.assign({},we,t):we;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=r=>(typeof r=="function"&&(f&&f.running&&f.sources.has(n)?r=r(n.tValue):r=r(n.value)),it(n,r));return[st.bind(n),s]}function Be(e,t,n){const s=he(e,t,!0,R);ne(s)}function M(e,t,n){const s=he(e,t,!1,R);ne(s)}function $t(e,t,n){et=jt;const s=he(e,t,!1,R),r=Y&&ge(m,Y.id);r&&(s.suspense=r),(!n||!n.render)&&(s.user=!0),C?C.push(s):ne(s)}function E(e,t,n){n=n?Object.assign({},we,n):we;const s=he(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,ne(s),st.bind(s)}function _t(e,t,n){let s,r,i;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,r=e,i=t||{}):(s=e,r=t,i=n||{});let o=null,l=Ae,c=null,a=!1,u=!1,d="initialValue"in i,g=typeof s=="function"&&E(s);const w=new Set,[S,x]=(i.storage||T)(i.initialValue),[_,N]=T(void 0),[k,H]=T(void 0,{equals:!1}),[B,V]=T(d?"ready":"unresolved");if(h.context){c=`${h.context.id}${h.context.count++}`;let y;i.ssrLoadFrom==="initial"?l=i.initialValue:h.load&&(y=h.load(c))&&(l=y[0])}function K(y,b,A,j){return o===y&&(o=null,j!==void 0&&(d=!0),(y===l||b===l)&&i.onHydrated&&queueMicrotask(()=>i.onHydrated(j,{value:b})),l=Ae,f&&y&&a?(f.promises.delete(y),a=!1,L(()=>{f.running=!0,re(b,A)},!1)):re(b,A)),b}function re(y,b){L(()=>{b===void 0&&x(()=>y),V(b!==void 0?"errored":d?"ready":"unresolved"),N(b);for(const A of w.keys())A.decrement();w.clear()},!1)}function se(){const y=Y&&ge(m,Y.id),b=S(),A=_();if(A!==void 0&&!o)throw A;return v&&!v.user&&y&&Be(()=>{k(),o&&(y.resolved&&f&&a?f.promises.add(o):w.has(y)||(y.increment(),w.add(y)))}),b}function P(y=!0){if(y!==!1&&u)return;u=!1;const b=g?g():s;if(a=f&&f.running,b==null||b===!1){K(o,O(S));return}f&&o&&f.promises.delete(o);const A=l!==Ae?l:O(()=>r(b,{value:S(),refetching:y}));return typeof A!="object"||!(A&&"then"in A)?(K(o,A,void 0,b),A):(o=A,u=!0,queueMicrotask(()=>u=!1),L(()=>{V(d?"refreshing":"pending"),H()},!1),A.then(j=>K(A,j,void 0,b),j=>K(A,void 0,ut(j),b)))}return Object.defineProperties(se,{state:{get:()=>B()},error:{get:()=>_()},loading:{get(){const y=B();return y==="pending"||y==="refreshing"}},latest:{get(){if(!d)return se();const y=_();if(y&&!o)throw y;return S()}}}),g?Be(()=>P(!1)):P(!1),[se,{refetch:P,mutate:x}]}function O(e){if(v===null)return e();const t=v;v=null;try{return e()}finally{v=t}}function nt(e,t,n){const s=Array.isArray(e);let r,i=n&&n.defer;return o=>{let l;if(s){l=Array(e.length);for(let a=0;a<e.length;a++)l[a]=e[a]()}else l=e();if(i){i=!1;return}const c=O(()=>t(l,r,o));return r=l,c}}function de(e){return m===null||(m.cleanups===null?m.cleanups=[e]:m.cleanups.push(e)),e}function Ot(e,t){ue||(ue=Symbol("error")),m=he(void 0,void 0,!0),m.context={[ue]:[t]},f&&f.running&&f.sources.add(m);try{return e()}catch(n){Se(n)}finally{m=m.owner}}function rt(){return m}function Tt(e,t){const n=m,s=v;m=e,v=null;try{return L(t,!0)}catch(r){Se(r)}finally{m=n,v=s}}function Nt(e){if(f&&f.running)return e(),f.done;const t=v,n=m;return Promise.resolve().then(()=>{v=t,m=n;let s;return Y&&(s=f||(f={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0}),s.done||(s.done=new Promise(r=>s.resolve=r)),s.running=!0),L(e,!1),v=m=null,s?s.done:void 0})}function kt(e){C.push.apply(C,e),e.length=0}function te(e,t){const n=Symbol("context");return{id:n,Provider:It(n),defaultValue:e}}function X(e){let t;return(t=ge(m,e.id))!==void 0?t:e.defaultValue}function Le(e){const t=E(e),n=E(()=>_e(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let Y;function Lt(){return Y||(Y=te({}))}function st(){const e=f&&f.running;if(this.sources&&(e?this.tState:this.state))if((e?this.tState:this.state)===R)ne(this);else{const t=$;$=null,L(()=>xe(this),!1),$=t}if(v){const t=this.observers?this.observers.length:0;v.sources?(v.sources.push(this),v.sourceSlots.push(t)):(v.sources=[this],v.sourceSlots=[t]),this.observers?(this.observers.push(v),this.observerSlots.push(v.sources.length-1)):(this.observers=[v],this.observerSlots=[v.sources.length-1])}return e&&f.sources.has(this)?this.tValue:this.value}function it(e,t,n){let s=f&&f.running&&f.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(s,t)){if(f){const r=f.running;(r||!n&&f.sources.has(e))&&(f.sources.add(e),e.tValue=t),r||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&L(()=>{for(let r=0;r<e.observers.length;r+=1){const i=e.observers[r],o=f&&f.running;o&&f.disposed.has(i)||((o?!i.tState:!i.state)&&(i.pure?$.push(i):C.push(i),i.observers&&lt(i)),o?i.tState=R:i.state=R)}if($.length>1e6)throw $=[],new Error},!1)}return t}function ne(e){if(!e.fn)return;U(e);const t=m,n=v,s=ve;v=m=e,De(e,f&&f.running&&f.sources.has(e)?e.tValue:e.value,s),f&&!f.running&&f.sources.has(e)&&queueMicrotask(()=>{L(()=>{f&&(f.running=!0),v=m=e,De(e,e.tValue,s),v=m=null},!1)}),v=n,m=t}function De(e,t,n){let s;try{s=e.fn(t)}catch(r){return e.pure&&(f&&f.running?(e.tState=R,e.tOwned&&e.tOwned.forEach(U),e.tOwned=void 0):(e.state=R,e.owned&&e.owned.forEach(U),e.owned=null)),e.updatedAt=n+1,Se(r)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?it(e,s,!0):f&&f.running&&e.pure?(f.sources.add(e),e.tValue=s):e.value=s,e.updatedAt=n)}function he(e,t,n,s=R,r){const i={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:m,context:null,pure:n};return f&&f.running&&(i.state=0,i.tState=s),m===null||m!==tt&&(f&&f.running&&m.pure?m.tOwned?m.tOwned.push(i):m.tOwned=[i]:m.owned?m.owned.push(i):m.owned=[i]),i}function be(e){const t=f&&f.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===ae)return xe(e);if(e.suspense&&O(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ve);){if(t&&f.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let s=n.length-1;s>=0;s--){if(e=n[s],t){let r=e,i=n[s+1];for(;(r=r.owner)&&r!==i;)if(f.disposed.has(r))return}if((t?e.tState:e.state)===R)ne(e);else if((t?e.tState:e.state)===ae){const r=$;$=null,L(()=>xe(e,n[0]),!1),$=r}}}function L(e,t){if($)return e();let n=!1;t||($=[]),C?n=!0:C=[],ve++;try{const s=e();return Rt(n),s}catch(s){n||(C=null),$=null,Se(s)}}function Rt(e){if($&&(ot($),$=null),e)return;let t;if(f){if(!f.promises.size&&!f.queue.size){const s=f.sources,r=f.disposed;C.push.apply(C,f.effects),t=f.resolve;for(const i of C)"tState"in i&&(i.state=i.tState),delete i.tState;f=null,L(()=>{for(const i of r)U(i);for(const i of s){if(i.value=i.tValue,i.owned)for(let o=0,l=i.owned.length;o<l;o++)U(i.owned[o]);i.tOwned&&(i.owned=i.tOwned),delete i.tValue,delete i.tOwned,i.tState=0}He(!1)},!1)}else if(f.running){f.running=!1,f.effects.push.apply(f.effects,C),C=null,He(!0);return}}const n=C;C=null,n.length&&L(()=>et(n),!1),t&&t()}function ot(e){for(let t=0;t<e.length;t++)be(e[t])}function jt(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:be(s)}for(h.context&&I(),t=0;t<n;t++)be(e[t])}function xe(e,t){const n=f&&f.running;n?e.tState=0:e.state=0;for(let s=0;s<e.sources.length;s+=1){const r=e.sources[s];if(r.sources){const i=n?r.tState:r.state;i===R?r!==t&&(!r.updatedAt||r.updatedAt<ve)&&be(r):i===ae&&xe(r,t)}}}function lt(e){const t=f&&f.running;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(t?!s.tState:!s.state)&&(t?s.tState=ae:s.state=ae,s.pure?$.push(s):C.push(s),s.observers&&lt(s))}}function U(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const i=r.pop(),o=n.observerSlots.pop();s<r.length&&(i.sourceSlots[o]=s,r[s]=i,n.observerSlots[s]=o)}}if(f&&f.running&&e.pure){if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)U(e.tOwned[t]);delete e.tOwned}ct(e,!0)}else if(e.owned){for(t=e.owned.length-1;t>=0;t--)U(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}f&&f.running?e.tState=0:e.state=0,e.context=null}function ct(e,t){if(t||(e.tState=0,f.disposed.add(e)),e.owned)for(let n=0;n<e.owned.length;n++)ct(e.owned[n])}function ut(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Fe(e,t){for(const n of e)n(t)}function Se(e){const t=ue&&ge(m,ue);if(!t)throw e;const n=ut(e);C?C.push({fn(){Fe(t,n)},state:R}):Fe(t,n)}function ge(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:ge(e.owner,t):void 0}function _e(e){if(typeof e=="function"&&!e.length)return _e(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=_e(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function It(e,t){return function(s){let r;return M(()=>r=O(()=>(m.context={[e]:s.value},Le(()=>s.children))),void 0),r}}let at=!1;function Vt(){at=!0}function p(e,t){if(at&&h.context){const n=h.context;I(At());const s=O(()=>e(t||{}));return I(n),s}return O(()=>e(t||{}))}function ye(){return!0}const Oe={get(e,t,n){return t===pe?n:e.get(t)},has(e,t){return t===pe?!0:e.has(t)},set:ye,deleteProperty:ye,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:ye,deleteProperty:ye}},ownKeys(e){return e.keys()}};function Ce(e){return(e=typeof e=="function"?e():e)?e:{}}function qt(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Ue(...e){let t=!1;for(let i=0;i<e.length;i++){const o=e[i];t=t||!!o&&pe in o,e[i]=typeof o=="function"?(t=!0,E(o)):o}if(t)return new Proxy({get(i){for(let o=e.length-1;o>=0;o--){const l=Ce(e[o])[i];if(l!==void 0)return l}},has(i){for(let o=e.length-1;o>=0;o--)if(i in Ce(e[o]))return!0;return!1},keys(){const i=[];for(let o=0;o<e.length;o++)i.push(...Object.keys(Ce(e[o])));return[...new Set(i)]}},Oe);const n={},s={};let r=!1;for(let i=e.length-1;i>=0;i--){const o=e[i];if(!o)continue;const l=Object.getOwnPropertyNames(o);r=r||i!==0&&!!l.length;for(let c=0,a=l.length;c<a;c++){const u=l[c];if(!(u==="__proto__"||u==="constructor"))if(u in n){const d=s[u],g=Object.getOwnPropertyDescriptor(o,u);d?g.get?d.push(g.get.bind(o)):g.value!==void 0&&d.push(()=>g.value):n[u]===void 0&&(n[u]=g.value)}else{const d=Object.getOwnPropertyDescriptor(o,u);d.get?Object.defineProperty(n,u,{enumerable:!0,configurable:!0,get:qt.bind(s[u]=[d.get.bind(o)])}):n[u]=d.value}}}return n}function Mt(e,...t){if(pe in e){const r=new Set(t.length>1?t.flat():t[0]),i=t.map(o=>new Proxy({get(l){return o.includes(l)?e[l]:void 0},has(l){return o.includes(l)&&l in e},keys(){return o.filter(l=>l in e)}},Oe));return i.push(new Proxy({get(o){return r.has(o)?void 0:e[o]},has(o){return r.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!r.has(o))}},Oe)),i}const n={},s=t.map(()=>({}));for(const r of Object.getOwnPropertyNames(e)){const i=Object.getOwnPropertyDescriptor(e,r),o=!i.get&&!i.set&&i.enumerable&&i.writable&&i.configurable;let l=!1,c=0;for(const a of t)a.includes(r)&&(l=!0,o?s[c][r]=i.value:Object.defineProperty(s[c],r,i)),++c;l||(o?n[r]=i.value:Object.defineProperty(n,r,i))}return[...s,n]}function z(e){let t,n;const s=r=>{const i=h.context;if(i){const[l,c]=T();(n||(n=e())).then(a=>{I(i),c(()=>a.default),I()}),t=l}else if(!t){const[l]=_t(()=>(n||(n=e())).then(c=>c.default));t=l}let o;return E(()=>(o=t())&&O(()=>{if(!i)return o(r);const l=h.context;I(i);const c=o(r);return I(l),c}))};return s.preload=()=>n||((n=e()).then(r=>t=()=>r.default),n),s}let Ht=0;function Bt(){const e=h.context;return e?`${e.id}${e.count++}`:`cl-${Ht++}`}const Dt=e=>`Stale read from <${e}>.`;function Re(e){const t=e.keyed,n=E(()=>e.when,void 0,{equals:(s,r)=>t?s===r:!s==!r});return E(()=>{const s=n();if(s){const r=e.children;return typeof r=="function"&&r.length>0?O(()=>r(t?s:()=>{if(!O(n))throw Dt("Show");return e.when})):r}return e.fallback},void 0,void 0)}let Q;function ft(){Q&&[...Q].forEach(e=>e())}function Ft(e){let t,n;h.context&&h.load&&(n=h.load(h.context.id+h.context.count))&&(t=n[0]);const[s,r]=T(t,void 0);return Q||(Q=new Set),Q.add(r),de(()=>Q.delete(r)),E(()=>{let i;if(i=s()){const o=e.fallback;return typeof o=="function"&&o.length?O(()=>o(i,()=>r())):o}return Ot(()=>e.children,r)},void 0,void 0)}const Ut=te();function Kt(e){let t=0,n,s,r,i,o;const[l,c]=T(!1),a=Lt(),u={increment:()=>{++t===1&&c(!0)},decrement:()=>{--t===0&&c(!1)},inFallback:l,effects:[],resolved:!1},d=rt();if(h.context&&h.load){const S=h.context.id+h.context.count;let x=h.load(S);if(x&&(r=x[0])&&r!=="$$f"){(typeof r!="object"||!("then"in r))&&(r=Promise.resolve(r));const[_,N]=T(void 0,{equals:!1});i=_,r.then(k=>{if(k||h.done)return k&&(o=k),N();h.gather(S),I(s),N(),I()})}}const g=X(Ut);g&&(n=g.register(u.inFallback));let w;return de(()=>w&&w()),p(a.Provider,{value:u,get children(){return E(()=>{if(o)throw o;if(s=h.context,i)return i(),i=void 0;s&&r==="$$f"&&I();const S=E(()=>e.children);return E(x=>{const _=u.inFallback(),{showContent:N=!0,showFallback:k=!0}=n?n():{};if((!_||r&&r!=="$$f")&&N)return u.resolved=!0,w&&w(),w=s=r=void 0,kt(u.effects),S();if(k)return w?x:ke(H=>(w=H,s&&(I({id:s.id+"f",count:0}),s=void 0),e.fallback),d)})})}})}const Wt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],Yt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...Wt]),Xt=new Set(["innerHTML","textContent","innerText","children"]),zt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),Gt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function Jt(e,t){const n=Gt[e];return typeof n=="object"?n[t]?n.$:void 0:n}const Qt=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),Zt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function en(e,t,n){let s=n.length,r=t.length,i=s,o=0,l=0,c=t[r-1].nextSibling,a=null;for(;o<r||l<i;){if(t[o]===n[l]){o++,l++;continue}for(;t[r-1]===n[i-1];)r--,i--;if(r===o){const u=i<s?l?n[l-1].nextSibling:n[i-l]:c;for(;l<i;)e.insertBefore(n[l++],u)}else if(i===l)for(;o<r;)(!a||!a.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[i-1]&&n[l]===t[r-1]){const u=t[--r].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--i],u),t[r]=n[i]}else{if(!a){a=new Map;let d=l;for(;d<i;)a.set(n[d],d++)}const u=a.get(t[o]);if(u!=null)if(l<u&&u<i){let d=o,g=1,w;for(;++d<r&&d<i&&!((w=a.get(t[d]))==null||w!==u+g);)g++;if(g>u-l){const S=t[o];for(;l<u;)e.insertBefore(n[l++],S)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const Ke="_$DX_DELEGATE";function tn(e,t,n,s={}){let r;return ke(i=>{r=i,t===document?e():q(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{r(),t.textContent=""}}function je(e,t,n){let s;const r=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},i=t?()=>O(()=>document.importNode(s||(s=r()),!0)):()=>(s||(s=r())).cloneNode(!0);return i.cloneNode=i,i}function Ie(e,t=window.document){const n=t[Ke]||(t[Ke]=new Set);for(let s=0,r=e.length;s<r;s++){const i=e[s];n.has(i)||(n.add(i),t.addEventListener(i,gt))}}function Te(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function nn(e,t,n,s){s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s)}function rn(e,t){t==null?e.removeAttribute("class"):e.className=t}function dt(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=i=>r.call(e,n[1],i))}else e.addEventListener(t,n)}function sn(e,t,n={}){const s=Object.keys(t||{}),r=Object.keys(n);let i,o;for(i=0,o=r.length;i<o;i++){const l=r[i];!l||l==="undefined"||t[l]||(We(e,l,!1),delete n[l])}for(i=0,o=s.length;i<o;i++){const l=s[i],c=!!t[l];!l||l==="undefined"||n[l]===c||!c||(We(e,l,!0),n[l]=c)}return n}function on(e,t,n){if(!t)return n?Te(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let r,i;for(i in n)t[i]==null&&s.removeProperty(i),delete n[i];for(i in t)r=t[i],r!==n[i]&&(s.setProperty(i,r),n[i]=r);return n}function Z(e,t={},n,s){const r={};return s||M(()=>r.children=ee(e,t.children,r.children)),M(()=>t.ref&&t.ref(e)),M(()=>ln(e,t,n,!0,r,!0)),r}function q(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return ee(e,t,s,n);M(r=>ee(e,t(),r,n),s)}function ln(e,t,n,s,r={},i=!1){t||(t={});for(const o in r)if(!(o in t)){if(o==="children")continue;r[o]=Ye(e,o,null,r[o],n,i)}for(const o in t){if(o==="children"){s||ee(e,t.children);continue}const l=t[o];r[o]=Ye(e,o,l,r[o],n,i)}}function cn(e,t,n={}){h.completed=globalThis._$HY.completed,h.events=globalThis._$HY.events,h.load=globalThis._$HY.load,h.gather=r=>ze(t,r),h.registry=new Map,h.context={id:n.renderId||"",count:0},ze(t,n.renderId);const s=tn(e,t,[...t.childNodes],n);return h.context=null,s}function Ve(e){let t,n;if(!h.context||!(t=h.registry.get(n=an()))){if(h.context&&console.warn("Unable to find DOM nodes for hydration key:",n),!e)throw new Error("Unrecoverable Hydration Mismatch. No template for key: "+n);return e()}return h.completed&&h.completed.add(t),h.registry.delete(n),t}function le(e){let t=e,n=0,s=[];if(h.context)for(;t;){if(t.nodeType===8){const r=t.nodeValue;if(r==="#")n++;else if(r==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function ht(){h.events&&!h.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=h;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;gt(s),t.shift()}}),h.events.queued=!0)}function un(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function We(e,t,n){const s=t.trim().split(/\s+/);for(let r=0,i=s.length;r<i;r++)e.classList.toggle(s[r],n)}function Ye(e,t,n,s,r,i){let o,l,c,a,u;if(t==="style")return on(e,n,s);if(t==="classList")return sn(e,n,s);if(n===s)return s;if(t==="ref")i||n(e);else if(t.slice(0,3)==="on:"){const d=t.slice(3);s&&e.removeEventListener(d,s),n&&e.addEventListener(d,n)}else if(t.slice(0,10)==="oncapture:"){const d=t.slice(10);s&&e.removeEventListener(d,s,!0),n&&e.addEventListener(d,n,!0)}else if(t.slice(0,2)==="on"){const d=t.slice(2).toLowerCase(),g=Qt.has(d);if(!g&&s){const w=Array.isArray(s)?s[0]:s;e.removeEventListener(d,w)}(g||n)&&(dt(e,d,n,g),g&&Ie([d]))}else if(t.slice(0,5)==="attr:")Te(e,t.slice(5),n);else if((u=t.slice(0,5)==="prop:")||(c=Xt.has(t))||!r&&((a=Jt(t,e.tagName))||(l=Yt.has(t)))||(o=e.nodeName.includes("-")))u&&(t=t.slice(5),l=!0),t==="class"||t==="className"?rn(e,n):o&&!l&&!c?e[un(t)]=n:e[a||t]=n;else{const d=r&&t.indexOf(":")>-1&&Zt[t.split(":")[0]];d?nn(e,d,t,n):Te(e,zt[t]||t,n)}return n}function gt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),h.registry&&!h.done&&(h.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?s.call(n,r,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function ee(e,t,n,s,r){if(h.context){!n&&(n=[...e.childNodes]);let l=[];for(let c=0;c<n.length;c++){const a=n[c];a.nodeType===8&&a.data.slice(0,2)==="!$"?a.remove():l.push(a)}n=l}for(;typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,i==="string"||i==="number"){if(h.context)return n;if(i==="number"&&(t=t.toString()),o){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=G(e,n,s,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||i==="boolean"){if(h.context)return n;n=G(e,n,s)}else{if(i==="function")return M(()=>{let l=t();for(;typeof l=="function";)l=l();n=ee(e,l,n,s)}),()=>n;if(Array.isArray(t)){const l=[],c=n&&Array.isArray(n);if(Ne(l,t,n,r))return M(()=>n=ee(e,l,n,s,!0)),()=>n;if(h.context){if(!l.length)return n;for(let a=0;a<l.length;a++)if(l[a].parentNode)return n=l}if(l.length===0){if(n=G(e,n,s),o)return n}else c?n.length===0?Xe(e,l,s):en(e,n,l):(n&&G(e),Xe(e,l));n=l}else if(t.nodeType){if(h.context&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=G(e,n,s,t);G(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function Ne(e,t,n,s){let r=!1;for(let i=0,o=t.length;i<o;i++){let l=t[i],c=n&&n[i],a;if(!(l==null||l===!0||l===!1))if((a=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))r=Ne(e,l,c)||r;else if(a==="function")if(s){for(;typeof l=="function";)l=l();r=Ne(e,Array.isArray(l)?l:[l],Array.isArray(c)?c:[c])||r}else e.push(l),r=!0;else{const u=String(l);c&&c.nodeType===3&&c.data===u?e.push(c):e.push(document.createTextNode(u))}}return r}function Xe(e,t,n=null){for(let s=0,r=t.length;s<r;s++)e.insertBefore(t[s],n)}function G(e,t,n,s){if(n===void 0)return e.textContent="";const r=s||document.createTextNode("");if(t.length){let i=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(r!==l){const c=l.parentNode===e;!i&&!o?c?e.replaceChild(r,l):e.insertBefore(r,n):c&&l.remove()}else i=!0}}else e.insertBefore(r,n);return[r]}function ze(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const r=n[s],i=r.getAttribute("data-hk");(!t||i.startsWith(t))&&!h.registry.has(i)&&h.registry.set(i,r)}}function an(){const e=h.context;return`${e.id}${e.count++}`}function fn(e){return h.context?void 0:e.children}function dn(){}const yt=!1,hn=(...e)=>(Vt(),cn(...e)),gn="modulepreload",yn=function(e){return"/"+e},Ge={},J=function(t,n,s){if(!n||n.length===0)return t();const r=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=yn(i),i in Ge)return;Ge[i]=!0;const o=i.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!s)for(let u=r.length-1;u>=0;u--){const d=r[u];if(d.href===i&&(!o||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${l}`))return;const a=document.createElement("link");if(a.rel=o?"stylesheet":gn,o||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),o)return new Promise((u,d)=>{a.addEventListener("load",u),a.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())};function mn(e,t){e&&t&&hn(e,t)}const qe=te(),pn=["title","meta"],Je=e=>e.tag+(e.name?`.${e.name}"`:""),wn=e=>{if(!h.context){const r=document.head.querySelectorAll("[data-sm]");Array.prototype.forEach.call(r,i=>i.parentNode.removeChild(i))}const t=new Map;function n(r){if(r.ref)return r.ref;let i=document.querySelector(`[data-sm="${r.id}"]`);return i?(i.tagName.toLowerCase()!==r.tag&&(i.parentNode&&i.parentNode.removeChild(i),i=document.createElement(r.tag)),i.removeAttribute("data-sm")):i=document.createElement(r.tag),i}const s={addClientTag:r=>{let i=Je(r);if(pn.indexOf(r.tag)!==-1){t.has(i)||t.set(i,[]);let l=t.get(i),c=l.length;l=[...l,r],t.set(i,l);{let a=n(r);r.ref=a,Z(a,r.props);let u=null;for(var o=c-1;o>=0;o--)if(l[o]!=null){u=l[o];break}a.parentNode!=document.head&&document.head.appendChild(a),u&&u.ref&&document.head.removeChild(u.ref)}return c}{let l=n(r);r.ref=l,Z(l,r.props),l.parentNode!=document.head&&document.head.appendChild(l)}return-1},removeClientTag:(r,i)=>{const o=Je(r);if(r.ref){const l=t.get(o);if(l){if(r.ref.parentNode){r.ref.parentNode.removeChild(r.ref);for(let c=i-1;c>=0;c--)l[c]!=null&&document.head.appendChild(l[c].ref)}l[i]=null,t.set(o,l)}else r.ref.parentNode&&r.ref.parentNode.removeChild(r.ref)}}};return p(qe.Provider,{value:s,get children(){return e.children}})},mt=(e,t,n)=>{const s=Bt();if(!X(qe))throw new Error("<MetaProvider /> should be in the tree");return bn({tag:e,props:t,setting:n,id:s,get name(){return t.name||t.property}}),null};function bn(e){const{addClientTag:t,removeClientTag:n,addServerTag:s}=X(qe);M(()=>{{let r=t(e);de(()=>n(e,r))}})}const xn=e=>mt("title",e,{escape:!0}),Qe=e=>mt("meta",e,{escape:!0});function vn(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Sn([e,t],n,s){return[n?()=>n(e()):e,s?r=>t(s(r)):t]}function Pn(e){try{return document.querySelector(e)}catch{return null}}function En(e,t){const n=Pn(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}function An(e,t,n,s){let r=!1;const i=l=>typeof l=="string"?{value:l}:l,o=Sn(T(i(e()),{equals:(l,c)=>l.value===c.value}),void 0,l=>(!r&&t(l),l));return n&&de(n((l=e())=>{r=!0,o[1](i(l)),r=!1})),{signal:o,utils:s}}function Cn(e){if(e){if(Array.isArray(e))return{signal:e}}else return{signal:T({value:""})};return e}function $n(){return An(()=>({value:window.location.pathname+window.location.search+window.location.hash,state:history.state}),({value:e,replace:t,scroll:n,state:s})=>{t?window.history.replaceState(s,"",e):window.history.pushState(s,"",e),En(window.location.hash.slice(1),n)},e=>vn(window,"popstate",()=>e()),{go:e=>window.history.go(e)})}function _n(){let e=new Set;function t(r){return e.add(r),()=>e.delete(r)}let n=!1;function s(r,i){if(n)return!(n=!1);const o={to:r,options:i,defaultPrevented:!1,preventDefault:()=>o.defaultPrevented=!0};for(const l of e)l.listener({...o,from:l.location,retry:c=>{c&&(n=!0),l.navigate(r,i)}});return!o.defaultPrevented}return{subscribe:t,confirm:s}}const On=/^(?:[a-z0-9]+:)?\/\//i,Tn=/^\/+|(\/)\/+$/g;function W(e,t=!1){const n=e.replace(Tn,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function me(e,t,n){if(On.test(t))return;const s=W(e),r=n&&W(n);let i="";return!r||t.startsWith("/")?i=s:r.toLowerCase().indexOf(s.toLowerCase())!==0?i=s+r:i=r,(i||"/")+W(t,!i)}function Nn(e,t){if(e==null)throw new Error(t);return e}function pt(e,t){return W(e).replace(/\/*(\*.*)?$/g,"")+W(t)}function kn(e){const t={};return e.searchParams.forEach((n,s)=>{t[s]=n}),t}function Ln(e,t,n){const[s,r]=e.split("/*",2),i=s.split("/").filter(Boolean),o=i.length;return l=>{const c=l.split("/").filter(Boolean),a=c.length-o;if(a<0||a>0&&r===void 0&&!t)return null;const u={path:o?"":"/",params:{}},d=g=>n===void 0?void 0:n[g];for(let g=0;g<o;g++){const w=i[g],S=c[g],x=w[0]===":",_=x?w.slice(1):w;if(x&&$e(S,d(_)))u.params[_]=S;else if(x||!$e(S,w))return null;u.path+=`/${S}`}if(r){const g=a?c.slice(-a).join("/"):"";if($e(g,d(r)))u.params[r]=g;else return null}return u}}function $e(e,t){const n=s=>s.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function Rn(e){const[t,n]=e.pattern.split("/*",2),s=t.split("/").filter(Boolean);return s.reduce((r,i)=>r+(i.startsWith(":")?2:3),s.length-(n===void 0?0:1))}function wt(e){const t=new Map,n=rt();return new Proxy({},{get(s,r){return t.has(r)||Tt(n,()=>t.set(r,E(()=>e()[r]))),t.get(r)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function bt(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),s=e.slice(t.index+t[0].length);const r=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(s);)r.push(n+=t[1]),s=s.slice(t[0].length);return bt(s).reduce((i,o)=>[...i,...r.map(l=>l+o)],[])}const jn=100,xt=te(),Pe=te(),Ee=()=>Nn(X(xt),"Make sure your app is wrapped in a <Router />");let fe;const Me=()=>fe||X(Pe)||Ee().base,In=e=>{const t=Me();return E(()=>t.resolvePath(e()))},Vn=e=>{const t=Ee();return E(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},qn=()=>Ee().location;function Mn(e,t="",n){const{component:s,data:r,children:i}=e,o=!i||Array.isArray(i)&&!i.length,l={key:e,element:s?()=>p(s,{}):()=>{const{element:c}=e;return c===void 0&&n?p(n,{}):c},preload:e.component?s.preload:e.preload,data:r};return vt(e.path).reduce((c,a)=>{for(const u of bt(a)){const d=pt(t,u),g=o?d:d.split("/*",1)[0];c.push({...l,originalPath:u,pattern:g,matcher:Ln(g,!o,e.matchFilters)})}return c},[])}function Hn(e,t=0){return{routes:e,score:Rn(e[e.length-1])*1e4-t,matcher(n){const s=[];for(let r=e.length-1;r>=0;r--){const i=e[r],o=i.matcher(n);if(!o)return null;s.unshift({...o,route:i})}return s}}}function vt(e){return Array.isArray(e)?e:[e]}function St(e,t="",n,s=[],r=[]){const i=vt(e);for(let o=0,l=i.length;o<l;o++){const c=i[o];if(c&&typeof c=="object"&&c.hasOwnProperty("path")){const a=Mn(c,t,n);for(const u of a){s.push(u);const d=Array.isArray(c.children)&&c.children.length===0;if(c.children&&!d)St(c.children,u.pattern,n,s,r);else{const g=Hn([...s],r.length);r.push(g)}s.pop()}}}return s.length?r:r.sort((o,l)=>l.score-o.score)}function Bn(e,t){for(let n=0,s=e.length;n<s;n++){const r=e[n].matcher(t);if(r)return r}return[]}function Dn(e,t){const n=new URL("http://sar"),s=E(c=>{const a=e();try{return new URL(a,n)}catch{return console.error(`Invalid path ${a}`),c}},n,{equals:(c,a)=>c.href===a.href}),r=E(()=>s().pathname),i=E(()=>s().search,!0),o=E(()=>s().hash),l=E(()=>"");return{get pathname(){return r()},get search(){return i()},get hash(){return o()},get state(){return t()},get key(){return l()},query:wt(nt(i,()=>kn(s())))}}function Fn(e,t="",n,s){const{signal:[r,i],utils:o={}}=Cn(e),l=o.parsePath||(P=>P),c=o.renderPath||(P=>P),a=o.beforeLeave||_n(),u=me("",t),d=void 0;if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!r().value&&i({value:u,replace:!0,scroll:!1});const[g,w]=T(!1),S=async P=>{w(!0);try{await Nt(P)}finally{w(!1)}},[x,_]=T(r().value),[N,k]=T(r().state),H=Dn(x,N),B=[],V={pattern:u,params:{},path:()=>u,outlet:()=>null,resolvePath(P){return me(u,P)}};if(n)try{fe=V,V.data=n({data:void 0,params:{},location:H,navigate:re(V)})}finally{fe=void 0}function K(P,y,b){O(()=>{if(typeof y=="number"){y&&(o.go?a.confirm(y,b)&&o.go(y):console.warn("Router integration does not support relative routing"));return}const{replace:A,resolve:j,scroll:D,state:ie}={replace:!1,resolve:!0,scroll:!0,...b},F=j?P.resolvePath(y):me("",y);if(F===void 0)throw new Error(`Path '${y}' is not a routable path`);if(B.length>=jn)throw new Error("Too many redirects");const oe=x();if((F!==oe||ie!==N())&&!yt){if(a.confirm(F,b)){const Et=B.push({value:oe,replace:A,scroll:D,state:N()});S(()=>{_(F),k(ie),ft()}).then(()=>{B.length===Et&&se({value:F,state:ie})})}}})}function re(P){return P=P||X(Pe)||V,(y,b)=>K(P,y,b)}function se(P){const y=B[0];y&&((P.value!==y.value||P.state!==y.state)&&i({...P,replace:y.replace,scroll:y.scroll}),B.length=0)}M(()=>{const{value:P,state:y}=r();O(()=>{P!==x()&&S(()=>{_(P),k(y)})})});{let P=function(y){if(y.defaultPrevented||y.button!==0||y.metaKey||y.altKey||y.ctrlKey||y.shiftKey)return;const b=y.composedPath().find(oe=>oe instanceof Node&&oe.nodeName.toUpperCase()==="A");if(!b||!b.hasAttribute("link"))return;const A=b.href;if(b.target||!A&&!b.hasAttribute("state"))return;const j=(b.getAttribute("rel")||"").split(/\s+/);if(b.hasAttribute("download")||j&&j.includes("external"))return;const D=new URL(A);if(D.origin!==window.location.origin||u&&D.pathname&&!D.pathname.toLowerCase().startsWith(u.toLowerCase()))return;const ie=l(D.pathname+D.search+D.hash),F=b.getAttribute("state");y.preventDefault(),K(V,ie,{resolve:!1,replace:b.hasAttribute("replace"),scroll:!b.hasAttribute("noscroll"),state:F&&JSON.parse(F)})};Ie(["click"]),document.addEventListener("click",P),de(()=>document.removeEventListener("click",P))}return{base:V,out:d,location:H,isRouting:g,renderPath:c,parsePath:l,navigatorFactory:re,beforeLeave:a}}function Un(e,t,n,s,r){const{base:i,location:o,navigatorFactory:l}=e,{pattern:c,element:a,preload:u,data:d}=s().route,g=E(()=>s().path);u&&u();const w={parent:t,pattern:c,get child(){return n()},path:g,params:r,data:t.data,outlet:a,resolvePath(S){return me(i.path(),S,g())}};if(d)try{fe=w,w.data=d({data:t.data,params:r,location:o,navigate:l(w)})}finally{fe=void 0}return w}const Kn=je("<a link>"),Wn=e=>{const{source:t,url:n,base:s,data:r,out:i}=e,o=t||$n(),l=Fn(o,s,r);return p(xt.Provider,{value:l,get children(){return e.children}})},Yn=e=>{const t=Ee(),n=Me(),s=Le(()=>e.children),r=E(()=>St(s(),pt(n.pattern,e.base||""),Xn)),i=E(()=>Bn(r(),t.location.pathname)),o=wt(()=>{const u=i(),d={};for(let g=0;g<u.length;g++)Object.assign(d,u[g].params);return d});t.out&&t.out.matches.push(i().map(({route:u,path:d,params:g})=>({originalPath:u.originalPath,pattern:u.pattern,path:d,params:g})));const l=[];let c;const a=E(nt(i,(u,d,g)=>{let w=d&&u.length===d.length;const S=[];for(let x=0,_=u.length;x<_;x++){const N=d&&d[x],k=u[x];g&&N&&k.route.key===N.route.key?S[x]=g[x]:(w=!1,l[x]&&l[x](),ke(H=>{l[x]=H,S[x]=Un(t,S[x-1]||n,()=>a()[x+1],()=>i()[x],o)}))}return l.splice(u.length).forEach(x=>x()),g&&w?g:(c=S[0],S)}));return p(Re,{get when(){return a()&&c},keyed:!0,children:u=>p(Pe.Provider,{value:u,get children(){return u.outlet()}})})},Xn=()=>{const e=Me();return p(Re,{get when(){return e.child},keyed:!0,children:t=>p(Pe.Provider,{value:t,get children(){return t.outlet()}})})};function zn(e){e=Ue({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=Mt(e,["href","state","class","activeClass","inactiveClass","end"]),n=In(()=>e.href),s=Vn(n),r=qn(),i=E(()=>{const o=n();if(o===void 0)return!1;const l=W(o.split(/[?#]/,1)[0]).toLowerCase(),c=W(r.pathname).toLowerCase();return e.end?l===c:c.startsWith(l)});return(()=>{const o=Ve(Kn);return Z(o,Ue(t,{get href(){return s()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!i(),[e.activeClass]:i(),...t.classList}},get["aria-current"](){return i()?"page":void 0}}),!1,!1),ht(),o})()}const Gn=[{component:z(()=>J(()=>import("./_...404_-0edd0d82.js"),["assets/_...404_-0edd0d82.js","assets/HttpStatusCode-6c198899.js"])),path:"/*404"},{component:z(()=>J(()=>import("./fun-c597658b.js"),["assets/fun-c597658b.js","assets/HttpStatusCode-6c198899.js"])),path:"/fun"},{component:z(()=>J(()=>import("./index-4588935a.js"),["assets/index-4588935a.js","assets/Card-69aa90f9.js","assets/Card-73b0cb51.css"])),path:"/"},{component:z(()=>J(()=>import("./research-0b1f6881.js"),["assets/research-0b1f6881.js","assets/Card-69aa90f9.js","assets/Card-73b0cb51.css"])),path:"/research"},{component:z(()=>J(()=>import("./teaching-e5090b9a.js"),["assets/teaching-e5090b9a.js","assets/Card-69aa90f9.js","assets/Card-73b0cb51.css"])),path:"/teaching"},{component:z(()=>J(()=>import("./index-87b97c52.js"),["assets/index-87b97c52.js","assets/Card-69aa90f9.js","assets/Card-73b0cb51.css","assets/index-bfe03ba4.css"])),path:"/cv/"}],Jn=()=>Gn,Pt=te({}),ce=zn,Qn=Yn,Zn="$FETCH",er=je('<div><div><p id="error-message"></p><button id="reset-errors">Clear errors and retry</button><pre>');function tr(e){return p(Ft,{fallback:(t,n)=>p(Re,{get when(){return!e.fallback},get fallback(){return E(()=>!!e.fallback)()&&e.fallback(t,n)},get children(){return p(nr,{error:t})}}),get children(){return e.children}})}function nr(e){return $t(()=>console.error(e.error)),(()=>{const t=Ve(er),n=t.firstChild,s=n.firstChild,r=s.nextSibling,i=r.nextSibling;return t.style.setProperty("padding","16px"),n.style.setProperty("background-color","rgba(252, 165, 165)"),n.style.setProperty("color","rgb(153, 27, 27)"),n.style.setProperty("border-radius","5px"),n.style.setProperty("overflow","scroll"),n.style.setProperty("padding","16px"),n.style.setProperty("margin-bottom","8px"),s.style.setProperty("font-weight","bold"),q(s,()=>e.error.message),dt(r,"click",ft,!0),r.style.setProperty("color","rgba(252, 165, 165)"),r.style.setProperty("background-color","rgb(153, 27, 27)"),r.style.setProperty("border-radius","5px"),r.style.setProperty("padding","4px 8px"),i.style.setProperty("margin-top","8px"),i.style.setProperty("width","100%"),q(i,()=>e.error.stack),ht(),t})()}Ie(["click"]);const rr=!1,sr=!1;function ir(){return X(Pt),[p(dn,{}),sr,p(fn,{get children(){return yt}}),rr]}function or(e){return Z(document.documentElement,e,!1,!0),e.children}function lr(e){return Z(document.head,e,!1,!0),e.children}function cr(e){{let t=Le(()=>e.children);return Z(document.body,e,!1,!0),q(document.body,()=>{let n=t();if(n){if(Array.isArray(n)){let s=n.filter(r=>!!r);return s.length?s:null}return n}return null},null,[...document.body.childNodes]),document.body}}const ur=je("<nav><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/>");function ar(){return(()=>{const e=Ve(ur),t=e.firstChild,[n,s]=le(t.nextSibling),r=n.nextSibling,[i,o]=le(r.nextSibling),l=i.nextSibling,[c,a]=le(l.nextSibling),u=c.nextSibling,[d,g]=le(u.nextSibling),w=d.nextSibling,[S,x]=le(w.nextSibling);return q(e,p(ce,{class:"navitem",href:"/",children:"Home"}),n,s),q(e,p(ce,{class:"navitem",href:"/cv",children:"CV"}),i,o),q(e,p(ce,{class:"navitem",href:"/teaching",children:"Teaching"}),c,a),q(e,p(ce,{class:"navitem",href:"/research",children:"Research"}),d,g),q(e,p(ce,{class:"navitem",href:"/fun",children:"Fun"}),S,x),e})()}function fr(){return p(or,{lang:"en",get children(){return[p(lr,{get children(){return[p(xn,{children:"Foo Yong Qi"}),p(Qe,{charset:"utf-8"}),p(Qe,{name:"viewport",content:"width=device-width, initial-scale=1"})]}}),p(cr,{get children(){return[p(Kt,{get children(){return p(tr,{get children(){return[p(ar,{}),p(Qn,{get children(){return p(Jn,{})}})]}})}}),p(ir,{})]}})]}})}const Ze=Object.values(Object.assign({}))[0],dr=Ze?Ze.default:void 0,hr=()=>{let e={get request(){},get clientAddress(){},get locals(){},get prevUrl(){},get responseHeaders(){},get tags(){},get env(){},get routerContext(){},setStatusCode(n){},getStatusCode(){},$type:Zn,fetch};function t(n){return p(Wn,n)}return p(Pt.Provider,{value:e,get children(){return p(wn,{get children(){return p(t,{get base(){return"/"},data:dr,get children(){return p(fr,{})}})}})}})};mn(()=>p(hr,{}),document);export{Pt as S,xn as T,le as a,M as b,p as c,rn as d,Ve as g,q as i,de as o,je as t,X as u};
