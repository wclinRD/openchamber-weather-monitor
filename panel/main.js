(()=>{var E="openchamber.sdk",_=1;var dt=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function lo(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(T)=>{let p=T.target===e?r:T.target;if(!(p instanceof Element))return;if(!p.hasAttribute("data-oc-scrolling"))p.setAttribute("data-oc-scrolling","");let S=n.get(p);if(S!==void 0)clearTimeout(S);n.set(p,setTimeout(()=>{n.delete(p),p.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var _r=`(${lo.toString()})(document);`;var pt=128,ut=65536;var be=128;var ge=65536;var _o=/^[a-z][a-z0-9-]{0,39}$/;var po=(e)=>Object(e)===e&&!Array.isArray(e),Et=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),uo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Eo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,To=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!po(n)||!_o.test(n.id)||!uo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!Et(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Et(n,["kind","id","label","value","options","disabled"]))return!1;if(!Eo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let T=new Set;for(let p of n.options){if(!po(p)||!Et(p,["value","label"])||!Eo(p.value)||!uo(p.label)||T.has(p.value))return!1;T.add(p.value)}if(!T.has(n.value))return!1}return!0};var So=["{id}","{segment}","{segments+}"];var en=new Set(So);var fo=["turn-finished","turn-failed","permission-asked","question-asked"];var on=new Set(fo);var ye=20000000,ke=256;var _t=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,mo=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var ho=/^[A-Za-z0-9_-]{1,80}$/;var xo=["left","right","top","bottom"];var Oo=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let T=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let p of T)if(!Oo(p,r+1,n))return!1;return!0},Tt=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(Tt);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(Tt)}return String(e)===e||Number.isFinite(e)},St=(e)=>{try{if(String(e.id)!==e.id||!ho.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!xo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Oo(e.data)||!Tt(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ro=["file","directory","other","missing"],mt=(e)=>Boolean(e&&"sessionId"in e),ht=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var bo=/^[0-9a-f]{7,64}$/i,xt=(e)=>bo.test(e),Ie=500,ve=32000,go=16000,yo=128,ko=200,Io=2000,vo=16000,Co=80,Uo=200,No=16000;var wo=2000;var Ot=20000,Ce=1024,Ue=2000000;var Ne=64000,we=8000,At=4000;var Rt=960000;var Mo=999,Lo=1e4,he=500,Po=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Go=["stopped","starting","ready","failed"],Sr=new Set(Po),Do=(e)=>Sr.has(e),$o=(e)=>e&&Do(e)?e:"HOST_REJECTED",de=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(de);if(Object(e)===e)return Object.values(e).every(de);return!1},Ho=(e)=>de(e)&&JSON.stringify(e).length<=No,Ao=(e)=>e?.trim().slice(0,Uo)??"",pe=(e)=>{let r=e.id.trim().slice(0,yo),n=e.title.trim().slice(0,ko),T=e.url.trim().slice(0,Io),p=e.text?.trim().slice(0,vo),S=e.author?.trim().slice(0,Co),L=e.kind==="pull"?"pull":"issue",v={providerId:e.providerId.trim(),id:r,title:n||r,url:T,kind:L};if(p)v.text=p;if(S)v.author=S;if(L==="pull"){let f=Ao(e.branches?.head),k=Ao(e.branches?.base);if(f&&k)v.branches={head:f,base:k}}if(Ho(e.data))v.data=e.data;return v},bt=(e)=>{let r=pe(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},gt=(e)=>{let r={text:e.text.trim().slice(0,go)};if(e.send)r.send=!0;return r},yt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Mo,Math.max(0,Math.round(e)))},kt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Lo,Math.max(0,Math.ceil(e)))};var ue=(e)=>e.length>0&&e.length<=Ce&&!e.includes("\x00")&&!e.includes("\\");var Me=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>wo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},fr=new Set(Go),It=(e)=>Boolean(e&&"status"in e&&fr.has(String(e.status))&&!("body"in e)),Le=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ct=(e)=>Boolean(e&&"written"in e&&e.written===!0),Ut=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),mr=new Set(Ro),Nt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&mr.has(String(e.kind))&&Number.isFinite(e.size)),wt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),hr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),xr=(e)=>Object(e)===e?e:null,ft=(e)=>String(e)===e&&e.length>0,Or=(e)=>{if(!ft(e.id))return null;if(e.ok===!0){let r={channel:E,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&ft(e.error))return{channel:E,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:$o(ft(e.code)?e.code:void 0)};return null},Mt=(e)=>{let r=xr(e);if(!r||r.channel!==E||r.v!==_)return null;if(r.type==="result")return Or(r);if(!hr.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Xo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Ar=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class d extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Fo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Pe=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Ce} characters without NUL or backslash.`)),Ge=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},u=(e)=>(e.value+=1,`oc-${e.value}`),Lt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),T=e.requestTimeoutMs??Ot,p=new Set,S=new Set,L=new Set,v=new Set,f=new Set,k=new Set,K=new Set,W=new Set,H=new Set,A=new Set,j=[],w=null,P=null,X=new Set,ee=new Set,Q=null,z=null,te=!1,h=new Map,R=new Map,b=new Map,M=!1,l={value:0},i=null,Z=null,ie=!1,me=!1,Qt=null,Zt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},J=(t)=>{r.parent.postMessage(t,"*")},qt=()=>{if(M||r.parent===r||A.size===0||i?.features?.lateGenerateResults!==!0)return;J({channel:E,v:_,type:"generate-late-listen"})},I=(t,o)=>{for(let s of t)try{s(o)}catch(c){console.error(c)}},eo=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Mt(t.data);if(!o)return;if(o.type==="workspace"){let c=R.get(o.payload.subscriptionId);if(c)I([c],o.payload.snapshot);return}if(o.type==="shells"){let c=b.get(o.payload.subscriptionId);if(c)I([c],o.payload.snapshot);return}if(o.type==="ready"){if(i=o.payload,Z=Zt(o.payload.session),I(p,o.payload),I(S,o.payload.directory),I(L,o.payload.session),Z)I(v,Z);I(f,o.payload.connection),I(k,o.payload.settings),I(K,o.payload.item),qt();return}if(o.type==="generate-late"){if(A.size===0)j.push(o.payload);else I(A,o.payload);return}if(o.type==="directory"){if(i)i={...i,directory:o.payload.directory};I(S,o.payload.directory);return}if(o.type==="session"){if(i)i={...i,session:o.payload.session};if(!o.payload.session)Z=null;else if(Z?.sessionId!==o.payload.session.id)Z=Zt(o.payload.session);I(L,o.payload.session);return}if(o.type==="session-lifecycle"){Z=o.payload,I(v,o.payload);return}if(o.type==="connection"){if(i)i={...i,connection:o.payload.connection};I(f,o.payload.connection);return}if(o.type==="settings"){if(i)i={...i,settings:o.payload.settings};I(k,o.payload.settings);return}if(o.type==="item"){if(i)i={...i,item:o.payload.item};I(K,o.payload.item);return}if(o.type==="status-control-event"){I(W,o.payload);return}if(o.type==="popover-closed"){I(H,o.payload);return}if(o.type==="action"){let c=(m)=>{if(!M)J({channel:E,v:_,type:"action-result",id:o.id,payload:m})},x=P;if(!x){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>x(o.payload)).then(()=>c({ok:!0}),(m)=>{let N=(m instanceof Error?m.message:String(m)).trim();c({ok:!1,error:(N||"Action failed.").slice(0,he)})});return}if(o.type==="file-open"){let c=o.payload;if(z&&mo(z,c))return;z=c,I(X,o.payload);return}if(o.type==="file-saved"){I(ee,o.payload.version);return}if(o.type==="file-snapshot"){let c=(N)=>{if(!M)J({channel:E,v:_,type:"file-snapshot-result",id:o.id,payload:N})},x=(N)=>c({error:(N.trim()||"Could not read the edited file.").slice(0,he)}),m=Q;if(!m){x("This extension does not edit files.");return}Promise.resolve().then(()=>m(o.payload.purpose)).then((N)=>{if(_t(N)>ye){x(`The file is over ${ye} ${"bytes"in N?"bytes":"characters"}.`);return}if(N.version.length>ke){x(`The snapshot version is over ${ke} characters.`);return}c({snapshot:"bytes"in N?{bytes:N.bytes,version:N.version}:{content:N.content,version:N.version}})},(N)=>x(N instanceof Error?N.message:String(N)));return}if(o.type==="resolve"){let c=(m)=>{J({channel:E,v:_,type:"resolve-result",id:o.id,payload:m})},x=w;if(!x){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>x(o.payload)).then((m)=>c({item:m?pe(m):null}),(m)=>{let N=(m instanceof Error?m.message:String(m)).trim();c({error:(N||"Command failed.").slice(0,he)})});return}let s=h.get(o.id);if(!s)return;if(clearTimeout(s.timer),h.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new d(o.code,o.error))};r.addEventListener("message",eo),J({channel:E,v:_,type:"hello"});let G=(t,o=T)=>{if(M||r.parent===r)return Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,c)=>{let x=setTimeout(()=>{h.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},o);h.set(t.id,{resolve:s,reject:c,timer:x}),J(t)})},C=(t)=>G(t).then(()=>{return}),U={channel:E,v:_},at=(t)=>{if(!M&&r.parent!==r)J(t)},to=()=>at({...U,type:"file-save"}),oo=(t)=>{if(!Xo(t)||!Ar(t))return;t.preventDefault(),to()},ro=(t)=>{if(!Xo(t)||t.key!=="Escape"||i?.surface!=="popover"||!i.popover)return;t.preventDefault(),ao(i.popover.id,"escape").catch(()=>{return})},Oe=()=>{let t=i?.surface==="popover"?i.popover:void 0;if(!t)return;let o=ie||me;if(Qt===o)return;Qt=o,co(t.id,o).catch(()=>{return})},Ae=()=>{if(i?.surface!=="popover"||ie)return;ie=!0,Oe()},no=(t)=>{if(i?.surface!=="popover"||t.relatedTarget!==null||!ie)return;ie=!1,Oe()},so=()=>{if(i?.surface!=="popover"||me)return;me=!0,Oe()},io=()=>{if(i?.surface!=="popover"||!me)return;me=!1,Oe()},q=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new d("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},ct=async(t)=>{if(t.kind!=="projects")q(t.projectId);let o=await G({...U,type:"workspace-read",id:u(l),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return o},lt=async(t,o)=>{if(t.kind!=="projects")q(t.projectId);let s=u(l);R.set(s,o);try{await C({...U,type:"workspace-subscribe",id:u(l),payload:{subscriptionId:s,query:t}})}catch(c){if(R.delete(s),!M)J({...U,type:"workspace-unsubscribe",id:u(l),payload:{subscriptionId:s}});throw c}return()=>{if(!R.delete(s)||M)return;J({...U,type:"workspace-unsubscribe",id:u(l),payload:{subscriptionId:s}})}},Er=async(t,o)=>{if(t.kind==="session")q(t.sessionId);if(t.kind==="project")q(t.projectId);let s=u(l);b.set(s,o);try{await C({...U,type:"shells-subscribe",id:u(l),payload:{subscriptionId:s,scope:t}})}catch(c){if(b.delete(s),!M)J({...U,type:"shells-unsubscribe",id:u(l),payload:{subscriptionId:s}});throw c}return()=>{if(!b.delete(s)||M)return;J({...U,type:"shells-unsubscribe",id:u(l),payload:{subscriptionId:s}})}},Re=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>pt))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!de(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ut)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&i?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let o=await G({...U,type:"storage",id:u(l),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return o},ao=(t,o)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):C({...U,type:"popover-close",id:u(l),payload:o?{id:t,reason:o}:{id:t}}),co=(t,o)=>i?.features?.popovers!==!0&&!(i?.surface==="popover"&&i.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):C({...U,type:"popover-anchor",id:u(l),payload:{id:t,active:o}});return r.addEventListener("keydown",ro,!0),r.addEventListener("pointerover",Ae),r.addEventListener("pointermove",Ae),r.addEventListener("pointerout",no),r.addEventListener("focus",so),r.addEventListener("blur",io),{onAction:(t)=>(P=t,()=>{if(P===t)P=null}),listProjects:async()=>{let t=await ct({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await ct({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await ct({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>lt({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>lt({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>lt({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>Er(t,o),readShellOutput:async(t,o)=>{q(t,be);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=o?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>ge))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${ge}.`);let m=await G({...U,type:"shell-output",id:u(l),payload:{shellId:t,cursor:s,tailBytes:c}});if(!m||typeof m.output!=="string"||!Number.isFinite(m.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return m},stopShell:async(t)=>{if(q(t,be),(await G({...U,type:"shell-stop",id:u(l),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{q(t),await C({...U,type:"open-session",id:u(l),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Ge(o),c={op:"get",key:t};if(s)c.scope=s;let x=await Re(c);return x.op==="get"&&x.found?x.value:void 0},set:async(t,o,s)=>{let c=Ge(s),x={op:"set",key:t,value:o};if(c)x.scope=c;await Re(x)},delete:async(t,o)=>{let s=Ge(o),c={op:"delete",key:t};if(s)c.scope=s;await Re(c)},keys:async(t)=>{let o=Ge(t),s={op:"keys"};if(o)s.scope=o;let c=await Re(s);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:(t)=>{if(p.add(t),i)t(i);return()=>{p.delete(t)}},onDirectory:(t)=>{if(S.add(t),i)t(i.directory);return()=>{S.delete(t)}},onSession:(t)=>{if(L.add(t),i)t(i.session);return()=>{L.delete(t)}},onSessionLifecycle:(t)=>{if(v.add(t),Z)t(Z);return()=>{v.delete(t)}},onConnection:(t)=>{if(f.add(t),i)t(i.connection);return()=>{f.delete(t)}},onSettings:(t)=>{if(k.add(t),i)t(i.settings);return()=>{k.delete(t)}},onItem:(t)=>{if(K.add(t),i)t(i.item);return()=>{K.delete(t)}},onStatusControl:(t)=>(W.add(t),()=>{W.delete(t)}),onPopoverClosed:(t)=>(H.add(t),()=>{H.delete(t)}),setStatusControls:(t)=>{if(i?.features?.statusControls!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support status controls."));if(!To(t))return Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return C({...U,type:"status-controls",id:u(l),payload:{controls:t}})},openPopover:(t)=>{if(i?.features?.popovers!==!0)return Promise.reject(new d("UNSUPPORTED","This host does not support popovers."));if(!St(t))return Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return C({...U,type:"popover-open",id:u(l),payload:t})},closePopover:ao,setPopoverAnchorActive:co,onResolve:(t)=>(w=t,()=>{if(w===t)w=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>Ie)return Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Ie} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ve))return Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${ve} characters.`));return C({channel:E,v:_,type:"toast",id:u(l),payload:{...t,message:o}})},openUrl:(t)=>C({channel:E,v:_,type:"open-url",id:u(l),payload:{url:t}}),openCommit:(t)=>xt(t)?C({channel:E,v:_,type:"open-commit",id:u(l),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>C({channel:E,v:_,type:"open-surface",id:u(l),payload:{surfaceId:t}}),writeClipboard:(t)=>C({channel:E,v:_,type:"clipboard-write",id:u(l),payload:{text:t}}),compose:(t)=>C({channel:E,v:_,type:"compose",id:u(l),payload:t}),attach:(t)=>C({channel:E,v:_,type:"attach",id:u(l),payload:pe(t)}),startSession:async(t)=>{if(t.projectId!==void 0)q(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")q(o.directory);else{if(o.name!==void 0)q(o.name,200);if(o.baseBranch!==void 0)q(o.baseBranch,200)}let s=await G({channel:E,v:_,type:"start-session",id:u(l),payload:bt(t)},e.requestTimeoutMs??180000);if(!mt(s))throw new d("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>G({channel:E,v:_,type:"prompt",id:u(l),payload:gt(t)}).then((o)=>{if(!ht(o))throw new d("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>C({channel:E,v:_,type:"session-link",id:u(l),payload:pe(t)}),close:()=>C({channel:E,v:_,type:"close",id:u(l)}),oauthStart:()=>C({channel:E,v:_,type:"oauth-start",id:u(l)}),oauthDisconnect:()=>C({channel:E,v:_,type:"oauth-disconnect",id:u(l)}),request:(t)=>(Me(t.path)?G({channel:E,v:_,type:"request",id:u(l),payload:t}):Fo()).then((o)=>{if(!Le(o))throw new d("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Me(t.path)?G({channel:E,v:_,type:"service-request",id:u(l),payload:t}):Fo()).then((o)=>{if(!Le(o))throw new d("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>G({channel:E,v:_,type:"service-status",id:u(l)}).then((t)=>{if(!It(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(ue(t)?G({channel:E,v:_,type:"file-read",id:u(l),payload:{path:t}}):Pe()).then((o)=>{if(!vt(o))throw new d("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!ue(t))return Pe();if(o.length>Ue)return Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Ue} characters.`));return G({channel:E,v:_,type:"file-write",id:u(l),payload:{path:t,content:o}}).then((s)=>{if(!Ct(s))throw new d("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(ue(t)?G({channel:E,v:_,type:"file-list",id:u(l),payload:{path:t}}):Pe()).then((o)=>{if(!Ut(o))throw new d("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(ue(t)?G({channel:E,v:_,type:"file-stat",id:u(l),payload:{path:t}}):Pe()).then((o)=>{if(!Nt(o))throw new d("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>Ne)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Ne} characters.`));if(s!==void 0&&(s.length===0||s.length>we))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${we} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(At,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let x={prompt:o};if(s!==void 0)x.system=s;if(c!==void 0)x.maxOutputTokens=c;return G({channel:E,v:_,type:"generate",id:u(l),payload:x},e.requestTimeoutMs??Rt).then((m)=>{if(!wt(m))throw new d("HOST_REJECTED","Host did not return generated text.");return m})},onLateGenerateResult:(t)=>{A.add(t);for(let o of j.splice(0))I([t],o);return qt(),()=>{A.delete(t)}},setBadge:(t)=>C({channel:E,v:_,type:"badge",id:u(l),payload:{count:yt(t)}}),setHeight:(t)=>C({channel:E,v:_,type:"resize",id:u(l),payload:{height:kt(t)}}),onFileOpen:(t)=>{if(X.add(t),!te)te=!0,r.addEventListener("keydown",oo,!0);if(z)t(z);return()=>{X.delete(t)}},onFileSnapshot:(t)=>(Q=t,()=>{if(Q===t)Q=null}),onFileSaved:(t)=>(ee.add(t),()=>{ee.delete(t)}),reportFileChange:(t)=>at({...U,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:to,reportFileUnsupported:()=>at({...U,type:"file-unsupported"}),dispose:()=>{for(let t of R.keys())J({...U,type:"workspace-unsubscribe",id:u(l),payload:{subscriptionId:t}});R.clear();for(let t of b.keys())J({...U,type:"shells-unsubscribe",id:u(l),payload:{subscriptionId:t}});if(b.clear(),M=!0,w=null,P=null,Q=null,X.clear(),ee.clear(),te)r.removeEventListener("keydown",oo,!0);r.removeEventListener("message",eo),r.removeEventListener("keydown",ro,!0),r.removeEventListener("pointerover",Ae),r.removeEventListener("pointermove",Ae),r.removeEventListener("pointerout",no),r.removeEventListener("focus",so),r.removeEventListener("blur",io);for(let t of h.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));h.clear(),p.clear(),S.clear(),L.clear(),v.clear(),f.clear(),k.clear(),K.clear(),W.clear(),H.clear(),A.clear(),j.length=0}}};var Vo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var fn=new Set(Vo);var Bo=["none","agent","user"];var hn=new Set(Bo);var Rr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],br=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Ko=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,T]of Rr)r.style.setProperty(n,e.tokens[T]);for(let[n,T,p]of br){let S=e.tokens[p]??"";r.style.setProperty(n,S),r.style.setProperty(T,S)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},Pt=(e,r)=>{if(Ko(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var gr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},O=(e,r)=>`var(--${e}, var(--oc-${gr[e]}, ${r}))`,re=O("surface-background","transparent"),$e=O("surface-elevated","transparent"),Ee=O("surface-elevated-foreground","inherit"),Y=O("surface-foreground","inherit"),g=O("surface-muted-foreground","gray"),yr=O("surface-muted","transparent"),ae=O("interactive-border","currentColor"),F=O("interactive-hover","transparent"),ce=O("interactive-active","transparent"),Gt=O("interactive-selection","transparent"),Dt=O("interactive-selection-foreground","inherit"),oe=O("primary","currentColor"),$t=O("primary-text","inherit"),Ht=O("error-text","inherit"),kr=O("font-sans","inherit"),Xt=O("font-mono","monospace"),Jo=O("radius","9px"),Ft=`calc(${Jo} - 2px)`,Wo=`calc(${Jo} - 4px)`,y=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,jo=`background-image: linear-gradient(${F}, ${F});`,Vt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,Bt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",zo="box-shadow: var(--oc-sdk-lit);",Kt=`inset 0 0.5px 0 0 ${y(Y,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Ir=`
:root {
  --oc-sdk-edge: ${y(Y,16)};
  --oc-sdk-field-bg: ${$e};
  --oc-sdk-raised-bg: ${re};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${y(Y,14)};
  --oc-sdk-field-bg: ${y(re,50,$e)};
  --oc-sdk-raised-bg: ${$e};
  --oc-sdk-field-lift: ${Kt};
  --oc-sdk-raised-lift: ${Kt};
  --oc-sdk-lit: ${Kt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,De=(e)=>{let r=O(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${O(`${e}-text`,"inherit")}; }`},vr=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Yo=`${Ir}
.oc-sdk { color: ${Y}; font-family: ${kr}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${jo} }
.oc-sdk-mono { font-family: ${Xt}; }
.oc-sdk-muted { color: ${g}; }
${De("success")}${De("warning")}${De("error")}${De("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${oe}; --oc-sdk-tone-text: ${$t}; }

.oc-sdk-btn { border-radius: ${Ft}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Wo}; }
.oc-sdk-btn[data-variant="default"] { color: ${$t}; background: ${y(oe,10,re)}; border-color: ${y(oe,12)}; ${zo} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${y(oe,16,re)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${y(oe,22,re)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${yr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${F}, ${F}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ee}; ${Bt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${F}, ${F}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ce}, ${ce}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${F}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ce}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${O("status-error","red")}; color: ${Ht}; background: ${y("var(--oc-sdk-tone)",7,re)}; border-color: ${y("var(--oc-sdk-tone)",12)}; ${zo} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${y("var(--oc-sdk-tone)",9,re)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${y("var(--oc-sdk-tone)",11,re)}; box-shadow: none; }

.oc-sdk-field-note { color: ${g}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Ht}; }
.oc-sdk-input { border-radius: ${Ft}; background: var(--oc-sdk-field-bg); color: ${Ee}; ${Vt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${g}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${F}, ${F}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Vt(y(Y,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Vt(O("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Xt}; }

.oc-sdk-search-icon { color: ${g}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search-clear { border-radius: ${Wo}; color: ${g}; }
.oc-sdk-search-clear:hover { background: ${F}; color: ${Y}; }

.oc-sdk-trigger { border-radius: ${Ft}; background: var(--oc-sdk-raised-bg); color: ${Ee}; ${Bt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${F}, ${F}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${g}; }
.oc-sdk-trigger-chevron { color: ${g}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ee}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${$e}; background-clip: padding-box; color: ${Ee}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${F}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Gt}; color: ${Dt}; }
.oc-sdk-option-check { color: ${Y}; }
.oc-sdk-option[data-destructive="true"] { color: ${Ht}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${y(O("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${g}; }
.oc-sdk-popup-empty { color: ${g}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ae}; border-radius: 4px; color: ${Y}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${y(Y,60,ae)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ae}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${re}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${oe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${jo} }
.oc-sdk-check-desc { color: ${g}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${y(Y,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${g}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Y}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Dt}; background: ${Gt}; border-color: ${ae}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ee}; background: var(--oc-sdk-raised-bg); ${Bt} }
.oc-sdk-tab-count { color: ${g}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${y(Y,6)}; color: ${g}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${F}; }
.oc-sdk-row[aria-selected="true"] { background: ${Gt}; color: ${Dt}; }
.oc-sdk-row-lead { font-family: ${Xt}; color: ${g}; }
.oc-sdk-row-sub { color: ${g}; }
.oc-sdk-row-meta { color: ${g}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${g}; }

.oc-sdk-empty-body { color: ${g}; }

.oc-sdk-spinner { color: ${g}; }
.oc-sdk-spinner-ring { border-color: ${ae}; border-top-color: ${oe}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${g}; }

.oc-sdk-separator { color: ${g}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${y(ae,40)}; }

.oc-sdk-progress-label { color: ${g}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${y(Y,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${oe}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${O("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${O("success-text","inherit")}; }

.oc-sdk-text a { color: ${$t}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${y(ae,60)}; }
`,D=`
${dt}
${vr}
${Yo}`;var Mr=30000;var Te=(e)=>typeof e==="object"&&e!==null,Lr=(e)=>Te(e)&&(!("current"in e)||Te(e.current)),Pr=(e)=>Te(e)&&typeof e.at==="number"&&Te(e.location||null)&&(e.current===null||Lr(e.current))&&(e.hourly===null||Te(e.hourly))&&(e.daily===null||Te(e.daily))&&(e.error===null||typeof e.error==="string"),Gr=(e)=>{if(!(e instanceof d))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},jt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Qo=(e,r,n,T)=>{let p=!1,S=async()=>{if(p||!jt(r))return;p=!0;try{let f=await e.serviceRequest({method:"GET",path:"/snapshot"}),k;try{k=JSON.parse(f.body)}catch{k=null}if(f.status===200&&Pr(k))n(k);else T(f.status===200?"bad-answer":"service-failed")}catch(f){T(Gr(f))}finally{p=!1,setTimeout(()=>{S()},Mr)}};S();let L=jt(r),v=()=>{let f=jt(r);if(f&&!L)S();L=f};return document.addEventListener("visibilitychange",v),{refresh:()=>{S()}}},Zo=async(e,r)=>{try{return(await e.serviceRequest({method:"POST",path:"/location",body:JSON.stringify({location:r})})).status===200}catch{return!1}};var Dr="en";var $r=(e,r)=>new Intl.NumberFormat(Dr,{minimumFractionDigits:r,maximumFractionDigits:r}).format(e);var Be=(e)=>`${$r(e,e<10?1:0)}%`,qo=(e)=>{if(e===0)return{label:"晴天",icon:"☀️"};if(e===1)return{label:"主要晴朗",icon:"\uD83C\uDF24️"};if(e===2)return{label:"多雲",icon:"⛅"};if(e===3)return{label:"陰天",icon:"☁️"};if(e===45||e===48)return{label:"霧",icon:"\uD83C\uDF2B️"};if(e===51||e===53||e===55)return{label:"細小雨",icon:"\uD83C\uDF26️"};if(e===56||e===57)return{label:"凍雨",icon:"\uD83C\uDF27️"};if(e===61||e===63||e===65)return{label:"雨",icon:"\uD83C\uDF27️"};if(e===66||e===67)return{label:"凍雨",icon:"\uD83C\uDF27️"};if(e===71||e===73||e===75)return{label:"雪",icon:"❄️"};if(e===77)return{label:"雪粒",icon:"\uD83C\uDF28️"};if(e===80||e===81||e===82)return{label:"陣雨",icon:"\uD83C\uDF26️"};if(e===84)return{label:"陣雨，強",icon:"\uD83C\uDF27️"};if(e===85||e===86)return{label:"陣雪",icon:"\uD83C\uDF28️"};if(e===95)return{label:"雷雨",icon:"⛈️"};if(e===96||e===99)return{label:"雷雨伴冰雹",icon:"⛈️"};return{label:"未知名天氣",icon:"\uD83C\uDF08"}};var Se=(e)=>`${Math.round(e)}°C`,er=(e)=>`體感 ${Math.round(e)}°C`;var a=(e,r="",n="",T=[])=>{let p=document.createElement(e);if(r)p.className=r;if(n)p.textContent=n;if(T.length>0)p.append(...T);return p};var Hr=0,se=(e,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg",e);for(let[T,p]of Object.entries(r))n.setAttribute(T,String(p));return n},tr=(e)=>{let r=document.createElement("div");r.className="chart",r.style.height=`${e.height}px`;let n=e.height,T=se("svg",{viewBox:`0 0 300 ${n}`,preserveAspectRatio:"none","aria-hidden":"true"}),p=`fill-${++Hr}`,S=se("defs",{}),L=se("linearGradient",{id:p,x1:0,x2:0,y1:0,y2:1});L.append(se("stop",{offset:"0%","stop-color":e.color,"stop-opacity":0.32}),se("stop",{offset:"100%","stop-color":e.color,"stop-opacity":0.02})),S.append(L);let v=se("path",{d:"",class:"chart-grid"}),f=se("path",{d:"",fill:`url(#${p})`}),k=se("path",{d:"",fill:"none",stroke:e.color,"stroke-width":1.5,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"});T.append(S,v,f,k);let K=document.createElement("div");K.className="chart-cursor";let W=document.createElement("div");W.className="chart-dot",W.style.background=e.color;let H=document.createElement("div");H.className="chart-tip",r.append(T,K,W,H);let A=[],j=1,w=null,P=null,X=(h,R)=>(e.capacity-R+h)/Math.max(1,e.capacity-1)*300,ee=(h)=>n-1-Math.min(h,j)/j*(n-1-2),Q=()=>{let h=w===null?void 0:A[w];if(w===null||h===void 0){r.classList.remove("hovering");return}r.classList.add("hovering");let R=r.getBoundingClientRect(),b=X(w,A.length)/300*R.width,M=ee(h)/n*R.height;K.style.transform=`translateX(${b}px)`,W.style.transform=`translate(${b}px, ${M}px)`;let l=(A.length-1-w)*e.intervalSeconds;H.textContent=`${e.format(h)} · ${l===0?"now":`${l} s ago`}`;let i=b>R.width/2;H.style.left=i?"":`${b+8}px`,H.style.right=i?`${R.width-b+8}px`:""},z=(h)=>{if(A.length===0)return;let R=r.getBoundingClientRect(),b=(h-R.left)/R.width*(e.capacity-1),M=Math.round(b-(e.capacity-A.length));w=Math.min(A.length-1,Math.max(0,M)),Q()};return r.addEventListener("pointermove",(h)=>{P=h.clientX,z(h.clientX)}),r.addEventListener("pointerleave",()=>{P=null,w=null,Q()}),{element:r,update:(h,R)=>{if(A=h,j=R>0?R:1,v.setAttribute("d",[0.25,0.5,0.75].map((b)=>`M0 ${n*b} H300`).join(" ")),A.length===0)f.setAttribute("d",""),k.setAttribute("d","");else{let b=A.map((Z,ie)=>`${X(ie,A.length).toFixed(2)} ${ee(Z).toFixed(2)}`),M=A.length===1,l=M?`M${X(0,1)-2} ${b[0]?.split(" ")[1]} L${b[0]}`:`M${b.join(" L")}`;k.setAttribute("d",l);let i=M?X(0,1)-2:X(0,A.length);f.setAttribute("d",`${l} L300 ${n} L${i.toFixed(2)} ${n} Z`)}if(P!==null)z(P)}}};var or=`
  html, body { margin: 0; background: transparent; color: var(--oc-fg); font: 12px/1.4 var(--oc-font); }
  * { box-sizing: border-box; }
  .num { font-variant-numeric: tabular-nums; }
  .muted { color: var(--oc-muted); }
  .chart { position: relative; width: 100%; overflow: hidden; }
  .chart svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
  .chart-grid { stroke: var(--oc-border); stroke-width: 1; vector-effect: non-scaling-stroke; opacity: .5; fill: none; }
  .chart-cursor, .chart-dot, .chart-tip { position: absolute; pointer-events: none; opacity: 0; }
  .chart.hovering .chart-cursor, .chart.hovering .chart-dot, .chart.hovering .chart-tip { opacity: 1; }
  .chart-cursor { top: 0; bottom: 0; left: 0; width: 1px; background: var(--oc-border); }
  .chart-dot { top: -3px; left: -3px; width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 0 2px color-mix(in srgb, var(--oc-fg) 4%, var(--oc-bg)); }
  .chart-tip { top: 2px; padding: 1px 6px; border-radius: 4px; white-space: nowrap; font-size: 11px;
    background: var(--oc-elevated); color: var(--oc-elevated-fg); font-variant-numeric: tabular-nums;
    box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .8), inset 0 0 0 1px rgb(0 0 0 / .04), 0 0 0 1px rgb(0 0 0 / .1), 0 1px 2px -.5px rgb(0 0 0 / .08); }
  [data-oc-theme="dark"] .chart-tip { box-shadow: inset 0 1px 0 0 rgb(255 255 255 / .06), inset 0 0 0 1px rgb(255 255 255 / .08),
    0 0 0 1px rgb(0 0 0 / .36), 0 1px 1px -.5px rgb(0 0 0 / .22); }
`,rr=`
  html, body { height: 100%; overflow-y: auto; overflow-x: hidden; }
  #root { display: flex; flex-direction: column; gap: 14px; padding: 12px 12px 20px; }
  .head { display: flex; align-items: flex-start; gap: 8px; }
  .head .titles { min-width: 0; flex: 1; }
  .location-name { font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .location-meta { color: var(--oc-muted); font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .search { display: flex; gap: 6px; margin-top: 8px; }
  .search input { flex: 1; padding: 0 8px; border: 1px solid var(--oc-border); border-radius: 6px; font: 12px var(--oc-font); background: var(--oc-background); color: var(--oc-fg); }
  .search input:focus { outline: 2px solid var(--oc-primary); outline-offset: -1px; }
  .search button { padding: 0 12px; border-radius: 6px; border: 1px solid var(--oc-primary); background: var(--oc-primary); color: var(--oc-primary-text, var(--oc-primary)); cursor: pointer; }
  .search button:hover, .search button:focus-visible { background: color-mix(in srgb, var(--oc-primary) 90%, var(--oc-bg)); }
  .card { min-width: 0; display: flex; flex-direction: column; gap: 8px; padding: 12px;
    border-radius: var(--oc-radius); background: color-mix(in srgb, var(--oc-fg) 4%, transparent); }
  .card-top { display: flex; align-items: baseline; gap: 8px; }
  .label { font-size: 11px; font-weight: 600; letter-spacing: .02em; color: var(--oc-muted); text-transform: uppercase; }
  .big { font-size: 22px; font-weight: 600; line-height: 1.1; letter-spacing: -.01em; }
  .card-top .grow { flex: 1; }
  .sub { color: var(--oc-muted); font-size: 11px; }
  .weather-row { display: flex; align-items: baseline; justify-content: space-between; padding: 2px 0; }
  .weather-label { color: var(--oc-muted); font-size: 11px; }
  .weather-icon { font-size: 18px; }
  .weather-value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .weather-detail { display: flex; flex-direction: column; gap: 4px; margin-top: 4px; }
  .forecast-day { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 0; }
  .forecast-day-icon { font-size: 14px; }
  .forecast-day-name { font-size: 11px; min-width: 60px; }
  .forecast-day-range { font-size: 11px; }
  .empty { color: var(--oc-muted); padding: 6px 2px; }
  .banner { padding: 8px 12px; border-radius: var(--oc-radius);
    background: color-mix(in srgb, var(--oc-error) 10%, transparent);
    color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;var zt=Lt(),Ke=document.querySelector("#root");if(!Ke)throw Error("Missing #root");var ir=document.createElement("style");ir.textContent=or+rr;document.head.append(ir);var Yt=a("div","head"),ar=a("div","location-name","Taipei"),cr=a("div","location-meta","載入中…"),le=document.createElement("input");le.className="search-input";le.placeholder="搜尋城市或地區";le.type="text";var fe=a("button","search-button","搜尋"),Xr=a("div","search","",[le,fe]);Yt.append(a("div","titles","",[ar,cr]),Xr);var We=document.createElement("div");We.className="weather-value";We.id="current-temp";We.textContent="–";var je=document.createElement("span");je.className="weather-value";je.id="current-weather";je.textContent="—";var ze=document.createElement("span");ze.className="weather-icon";ze.id="current-icon";ze.textContent="—";var Je=document.createElement("span");Je.className="weather-value";Je.id="current-feels";Je.textContent="—";var Ye=document.createElement("span");Ye.className="weather-value";Ye.id="current-humidity";Ye.textContent="—";var Qe=document.createElement("span");Qe.className="weather-value";Qe.id="current-precipitation";Qe.textContent="—";var Ze=document.createElement("span");Ze.className="weather-value";Ze.id="current-wind";Ze.textContent="—";var qe=document.createElement("span");qe.className="weather-value";qe.id="current-uv";qe.textContent="—";var et=document.createElement("span");et.className="weather-value";et.id="current-cloud";et.textContent="—";var tt=document.createElement("span");tt.className="weather-value";tt.id="current-pressure";tt.textContent="—";var ot=document.createElement("span");ot.className="weather-value";ot.id="current-visibility";ot.textContent="—";var rt=document.createElement("span");rt.className="weather-value";rt.id="current-dew";rt.textContent="—";var nt=document.createElement("span");nt.className="weather-value";nt.id="current-gust";nt.textContent="—";var st=document.createElement("span");st.className="weather-value";st.id="current-sunrise";st.textContent="—";var it=document.createElement("span");it.className="weather-value";it.id="current-sunset";it.textContent="—";var Fr=a("div","card","",[a("div","card-top","",[a("span","label","目前天氣"),a("span","grow")]),We,a("div","weather-detail","",[a("div","weather-row","",[a("span","weather-label","天氣"),je,ze]),a("div","weather-row","",[a("span","weather-label","體感溫度"),Je]),a("div","weather-row","",[a("span","weather-label","濕度"),Ye]),a("div","weather-row","",[a("span","weather-label","降雨"),Qe]),a("div","weather-row","",[a("span","weather-label","風速"),Ze]),a("div","weather-row","",[a("span","weather-label","UV 指數"),qe]),a("div","weather-row","",[a("span","weather-label","雲量"),et]),a("div","weather-row","",[a("span","weather-label","氣壓"),tt]),a("div","weather-row","",[a("span","weather-label","能見度"),ot]),a("div","weather-row","",[a("span","weather-label","露點"),rt]),a("div","weather-row","",[a("span","weather-label","風陣"),nt]),a("div","weather-row","",[a("span","weather-label","日出"),st]),a("div","weather-row","",[a("span","weather-label","日落"),it])])]),lr=tr({color:"var(--oc-primary)",height:56,capacity:24,format:Se,intervalSeconds:1}),Vr=a("div","card","",[a("div","card-top","",[a("span","label","24 小時溫度預報"),a("span","grow")]),lr.element]),dr=a("div","card","",[a("div","card-top","",[a("span","label","每日預報"),a("span","grow")]),a("div","forecast-day","",[a("span","forecast-day-name","–"),a("span","forecast-day-range","–")])]),pr=a("div","sub","資料來源：Open-Meteo");Ke.append(Yt,Fr,Vr,dr,pr);var Br=(e)=>{ar.textContent=e.location?.name??"—",cr.textContent=e.location?`${e.location.country??""} · ${Be(0)}`:"選取地點";let r=document.getElementById("current-temp"),n=document.getElementById("current-weather"),T=document.getElementById("current-icon"),p=document.getElementById("current-feels"),S=document.getElementById("current-humidity"),L=document.getElementById("current-precipitation"),v=document.getElementById("current-wind"),f=document.getElementById("current-uv"),k=document.getElementById("current-cloud"),K=document.getElementById("current-pressure"),W=document.getElementById("current-visibility"),H=document.getElementById("current-dew"),A=document.getElementById("current-gust"),j=document.getElementById("current-sunrise"),w=document.getElementById("current-sunset");if(r&&n&&T&&p&&S&&L&&v&&f&&k&&K&&W&&H&&A&&j&&w)if(e.current){let P=qo(e.current.weather_code);if(r.textContent=Se(e.current.temperature_2m),n.textContent=P.label,T.textContent=P.icon,p.textContent=er(e.current.apparent_temperature),S.textContent=Be(e.current.relative_humidity_2m),L.textContent=`${e.current.precipitation} mm`,v.textContent=`${e.current.wind_speed_10m} km/h · ${Be(e.current.wind_direction_10m)}`,f.textContent=e.current.uv_index?`${e.current.uv_index}`:"—",k.textContent=e.current.cloud_cover?`${e.current.cloud_cover}%`:"—",K.textContent=e.current.pressure_msl?`${Math.round(e.current.pressure_msl)} hPa`:"—",W.textContent=e.current.visibility?`${Math.round(e.current.visibility/1000)} km`:"—",H.textContent=e.current.dew_point_2m?Se(e.current.dew_point_2m):"—",A.textContent=e.current.wind_gusts_10m?`${e.current.wind_gusts_10m} km/h`:"—",e.daily?.sunrise?.[0]&&e.daily?.sunset?.[0])j.textContent=e.daily.sunrise[0].slice(11,16),w.textContent=e.daily.sunset[0].slice(11,16);else j.textContent="—",w.textContent="—"}else r.textContent="–",n.textContent="—",T.textContent="—",p.textContent="—",S.textContent="—",L.textContent="—",v.textContent="—",f.textContent="—",k.textContent="—",K.textContent="—",W.textContent="—",H.textContent="—",A.textContent="—",j.textContent="—",w.textContent="—",j.textContent="—",w.textContent="—";if(e.hourly?.temperature_2m&&e.hourly.time.length>0){let P=e.hourly.temperature_2m,X=Math.max(...P,20);lr.update(P,X)}if(e.daily?.temperature_2m_max&&e.daily.time.length>0){let P=dr.querySelector(".forecast-day"),X=e.daily.time[0],ee=e.daily.temperature_2m_min[0]??null,Q=e.daily.temperature_2m_max[0]??null,z=e.daily.precipitation_sum?.[0]??null,te=e.daily.precipitation_probability_max?.[0]??null,h=e.daily.sunrise?.[0],R=e.daily.sunset?.[0],b=ee!==null&&Q!==null?`${Se(ee)} – ${Se(Q)}`:"—",M=z!==null||te!==null?`${z!==null?`${z} mm`:""}${z!==null&&te!==null?" / ":""}${te!==null?`${te}% 機率`:""}`.trim():"—",l=h&&R?`${h.slice(11,16)} / ${R.slice(11,16)}`:"—";P.replaceChildren(a("span","forecast-day-name",X),a("span","forecast-day-range",`${b} · ${M} · ${l}`))}},nr=(e)=>{let r=document.createElement("div");r.className="banner",r.textContent=e,Ke.replaceChildren(Yt,r,pr)},sr=!1,Jt=()=>{},ur=async()=>{let e=le.value.trim();if(!e)return;fe.textContent="搜尋中…",fe.disabled=!0;let r=await Zo(zt,e);if(fe.textContent="搜尋",fe.disabled=!1,r)le.value="",await Jt()};fe.addEventListener("click",ur);le.addEventListener("keydown",(e)=>{if(e.key==="Enter")ur()});zt.onReady((e)=>{if(Pt(e,document.documentElement),sr)return;sr=!0,{refresh:Jt}=Qo(zt,Ke,(r)=>{if(r.error)nr(r.error);else Br(r)},()=>{nr("無法取得天氣資料")}),Jt()});})();
