(()=>{var u="openchamber.sdk",_=1;var Ke=`
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
`;function $t(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(f)=>{let p=f.target===e?r:f.target;if(!(p instanceof Element))return;if(!p.hasAttribute("data-oc-scrolling"))p.setAttribute("data-oc-scrolling","");let b=n.get(p);if(b!==void 0)clearTimeout(b);n.set(p,setTimeout(()=>{n.delete(p),p.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Ho=`(${$t.toString()})(document);`;var je=128,ze=65536;var Oe=128;var Ae=65536;var jt=/^[a-z][a-z0-9-]{0,39}$/;var Vt=(e)=>Object(e)===e&&!Array.isArray(e),We=(e,r)=>Object.keys(e).every((n)=>r.includes(n)),Bt=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Kt=(e)=>String(e)===e&&e.length>=1&&e.length<=80,zt=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let r=new Set;for(let n of e){if(!Vt(n)||!jt.test(n.id)||!Bt(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(r.has(n.id))return!1;if(r.add(n.id),n.kind==="button"){if(!We(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!We(n,["kind","id","label","value","options","disabled"]))return!1;if(!Kt(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let f=new Set;for(let p of n.options){if(!Vt(p)||!We(p,["value","label"])||!Kt(p.value)||!Bt(p.label)||f.has(p.value))return!1;f.add(p.value)}if(!f.has(n.value))return!1}return!0};var Wt=["{id}","{segment}","{segments+}"];var Or=new Set(Wt);var Jt=["turn-finished","turn-failed","permission-asked","question-asked"];var xr=new Set(Jt);var xe=20000000,Re=256;var Je=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Yt=(e,r)=>{if(e.path!==r.path||e.readOnly!==r.readOnly)return!1;if(e.encoding==="text"||r.encoding==="text")return e.encoding==="text"&&r.encoding==="text"&&e.content===r.content;if(e.bytes.byteLength!==r.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==r.bytes[n])return!1;return!0};var Qt=/^[A-Za-z0-9_-]{1,80}$/;var Zt=["left","right","top","bottom"];var qt=(e,r=0,n={remaining:16000})=>{if(--n.remaining<0||r>=32)return!1;if(e===null)return!0;let f=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let p of f)if(!qt(p,r+1,n))return!1;return!0},Ye=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((r)=>/^(0|[1-9]\d*)$/.test(r)&&Number(r)<e.length)&&e.every(Ye);if(Object(e)===e){let r=Object.getPrototypeOf(e);return(r===null||r===Object.prototype)&&Object.values(e).every(Ye)}return String(e)===e||Number.isFinite(e)},Qe=(e)=>{try{if(String(e.id)!==e.id||!Qt.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Zt.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!qt(e.data)||!Ye(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var to=["file","directory","other","missing"],qe=(e)=>Boolean(e&&"sessionId"in e),et=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var oo=/^[0-9a-f]{7,64}$/i,tt=(e)=>oo.test(e),be=500,ge=32000,ro=16000,no=128,so=200,io=2000,ao=16000,co=80,lo=200,po=16000;var uo=2000;var ot=20000,ke=1024,Ie=2000000;var ye=64000,Ue=8000,rt=4000;var nt=960000;var _o=999,Eo=1e4,de=500,To=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],So=["stopped","starting","ready","failed"],Fo=new Set(To),fo=(e)=>Fo.has(e),ho=(e)=>e&&fo(e)?e:"HOST_REJECTED",Y=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Y);if(Object(e)===e)return Object.values(e).every(Y);return!1},mo=(e)=>Y(e)&&JSON.stringify(e).length<=po,eo=(e)=>e?.trim().slice(0,lo)??"",Q=(e)=>{let r=e.id.trim().slice(0,no),n=e.title.trim().slice(0,so),f=e.url.trim().slice(0,io),p=e.text?.trim().slice(0,ao),b=e.author?.trim().slice(0,co),w=e.kind==="pull"?"pull":"issue",v={providerId:e.providerId.trim(),id:r,title:n||r,url:f,kind:w};if(p)v.text=p;if(b)v.author=b;if(w==="pull"){let g=eo(e.branches?.head),N=eo(e.branches?.base);if(g&&N)v.branches={head:g,base:N}}if(mo(e.data))v.data=e.data;return v},st=(e)=>{let r=Q(e);if(e.projectId)r.projectId=e.projectId;if(e.navigation)r.navigation=e.navigation;if(e.worktree)r.worktree=e.worktree;return r},it=(e)=>{let r={text:e.text.trim().slice(0,ro)};if(e.send)r.send=!0;return r},at=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(_o,Math.max(0,Math.round(e)))},ct=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Eo,Math.max(0,Math.ceil(e)))};var Z=(e)=>e.length>0&&e.length<=ke&&!e.includes("\x00")&&!e.includes("\\");var Ce=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>uo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},$o=new Set(So),dt=(e)=>Boolean(e&&"status"in e&&$o.has(String(e.status))&&!("body"in e)),ve=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),lt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),pt=(e)=>Boolean(e&&"written"in e&&e.written===!0),ut=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Vo=new Set(to),_t=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Vo.has(String(e.kind))&&Number.isFinite(e.size)),Et=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Bo=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Ko=(e)=>Object(e)===e?e:null,Ze=(e)=>String(e)===e&&e.length>0,jo=(e)=>{if(!Ze(e.id))return null;if(e.ok===!0){let r={channel:u,v:_,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)r.payload=e.payload;return r}if(e.ok===!1&&Ze(e.error))return{channel:u,v:_,type:"result",id:e.id,ok:!1,error:e.error,code:ho(Ze(e.code)?e.code:void 0)};return null},Tt=(e)=>{let r=Ko(e);if(!r||r.channel!==u||r.v!==_)return null;if(r.type==="result")return jo(r);if(!Bo.has(String(r.type))||Object(r.payload)!==r.payload)return null;return r};var Oo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),zo=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class a extends Error{code;constructor(e,r){super(r);this.name="HostRequestError",this.code=e}}var Ao=()=>Promise.reject(new a("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ne=()=>Promise.reject(new a("BAD_PATH",`File path must be 1 to ${ke} characters without NUL or backslash.`)),Me=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new a("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},l=(e)=>(e.value+=1,`oc-${e.value}`),St=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new a("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((t)=>t===r.parent),f=e.requestTimeoutMs??ot,p=new Set,b=new Set,w=new Set,v=new Set,g=new Set,N=new Set,oe=new Set,_e=new Set,Ee=new Set,j=new Set,Xe=[],re=null,ne=null,Te=new Set,Se=new Set,se=null,ie=null,Fe=!1,z=new Map,W=new Map,J=new Map,G=!1,d={value:0},c=null,D=null,ae=!1,ce=!1,Ct=null,vt=(t)=>{if(!t)return null;return{sessionId:t.id,phase:t.busy?"started":"completed"}},M=(t)=>{r.parent.postMessage(t,"*")},Nt=()=>{if(G||r.parent===r||j.size===0||c?.features?.lateGenerateResults!==!0)return;M({channel:u,v:_,type:"generate-late-listen"})},O=(t,o)=>{for(let s of t)try{s(o)}catch(i){console.error(i)}},Mt=(t)=>{if(!(t instanceof MessageEvent))return;if(!n(t.source))return;let o=Tt(t.data);if(!o)return;if(o.type==="workspace"){let i=W.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="shells"){let i=J.get(o.payload.subscriptionId);if(i)O([i],o.payload.snapshot);return}if(o.type==="ready"){if(c=o.payload,D=vt(o.payload.session),O(p,o.payload),O(b,o.payload.directory),O(w,o.payload.session),D)O(v,D);O(g,o.payload.connection),O(N,o.payload.settings),O(oe,o.payload.item),Nt();return}if(o.type==="generate-late"){if(j.size===0)Xe.push(o.payload);else O(j,o.payload);return}if(o.type==="directory"){if(c)c={...c,directory:o.payload.directory};O(b,o.payload.directory);return}if(o.type==="session"){if(c)c={...c,session:o.payload.session};if(!o.payload.session)D=null;else if(D?.sessionId!==o.payload.session.id)D=vt(o.payload.session);O(w,o.payload.session);return}if(o.type==="session-lifecycle"){D=o.payload,O(v,o.payload);return}if(o.type==="connection"){if(c)c={...c,connection:o.payload.connection};O(g,o.payload.connection);return}if(o.type==="settings"){if(c)c={...c,settings:o.payload.settings};O(N,o.payload.settings);return}if(o.type==="item"){if(c)c={...c,item:o.payload.item};O(oe,o.payload.item);return}if(o.type==="status-control-event"){O(_e,o.payload);return}if(o.type==="popover-closed"){O(Ee,o.payload);return}if(o.type==="action"){let i=(E)=>{if(!G)M({channel:u,v:_,type:"action-result",id:o.id,payload:E})},T=ne;if(!T){i({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>T(o.payload)).then(()=>i({ok:!0}),(E)=>{let R=(E instanceof Error?E.message:String(E)).trim();i({ok:!1,error:(R||"Action failed.").slice(0,de)})});return}if(o.type==="file-open"){let i=o.payload;if(ie&&Yt(ie,i))return;ie=i,O(Te,o.payload);return}if(o.type==="file-saved"){O(Se,o.payload.version);return}if(o.type==="file-snapshot"){let i=(R)=>{if(!G)M({channel:u,v:_,type:"file-snapshot-result",id:o.id,payload:R})},T=(R)=>i({error:(R.trim()||"Could not read the edited file.").slice(0,de)}),E=se;if(!E){T("This extension does not edit files.");return}Promise.resolve().then(()=>E(o.payload.purpose)).then((R)=>{if(Je(R)>xe){T(`The file is over ${xe} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>Re){T(`The snapshot version is over ${Re} characters.`);return}i({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},(R)=>T(R instanceof Error?R.message:String(R)));return}if(o.type==="resolve"){let i=(E)=>{M({channel:u,v:_,type:"resolve-result",id:o.id,payload:E})},T=re;if(!T){i({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>T(o.payload)).then((E)=>i({item:E?Q(E):null}),(E)=>{let R=(E instanceof Error?E.message:String(E)).trim();i({error:(R||"Command failed.").slice(0,de)})});return}let s=z.get(o.id);if(!s)return;if(clearTimeout(s.timer),z.delete(o.id),o.ok){s.resolve(o.payload);return}s.reject(new a(o.code,o.error))};r.addEventListener("message",Mt),M({channel:u,v:_,type:"hello"});let k=(t,o=f)=>{if(G||r.parent===r)return Promise.reject(new a("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((s,i)=>{let T=setTimeout(()=>{z.delete(t.id),i(new a("HOST_TIMEOUT","Host did not answer in time."))},o);z.set(t.id,{resolve:s,reject:i,timer:T}),M(t)})},A=(t)=>k(t).then(()=>{return}),x={channel:u,v:_},$e=(t)=>{if(!G&&r.parent!==r)M(t)},Lt=()=>$e({...x,type:"file-save"}),wt=(t)=>{if(!Oo(t)||!zo(t))return;t.preventDefault(),Lt()},Pt=(t)=>{if(!Oo(t)||t.key!=="Escape"||c?.surface!=="popover"||!c.popover)return;t.preventDefault(),Xt(c.popover.id,"escape").catch(()=>{return})},fe=()=>{let t=c?.surface==="popover"?c.popover:void 0;if(!t)return;let o=ae||ce;if(Ct===o)return;Ct=o,Ft(t.id,o).catch(()=>{return})},he=()=>{if(c?.surface!=="popover"||ae)return;ae=!0,fe()},Gt=(t)=>{if(c?.surface!=="popover"||t.relatedTarget!==null||!ae)return;ae=!1,fe()},Dt=()=>{if(c?.surface!=="popover"||ce)return;ce=!0,fe()},Ht=()=>{if(c?.surface!=="popover"||!ce)return;ce=!1,fe()},P=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new a("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Ve=async(t)=>{if(t.kind!=="projects")P(t.projectId);let o=await k({...x,type:"workspace-read",id:l(d),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new a("HOST_REJECTED","Host did not return workspace data.");return o},Be=async(t,o)=>{if(t.kind!=="projects")P(t.projectId);let s=l(d);W.set(s,o);try{await A({...x,type:"workspace-subscribe",id:l(d),payload:{subscriptionId:s,query:t}})}catch(i){if(W.delete(s),!G)M({...x,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!W.delete(s)||G)return;M({...x,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},Do=async(t,o)=>{if(t.kind==="session")P(t.sessionId);if(t.kind==="project")P(t.projectId);let s=l(d);J.set(s,o);try{await A({...x,type:"shells-subscribe",id:l(d),payload:{subscriptionId:s,scope:t}})}catch(i){if(J.delete(s),!G)M({...x,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}});throw i}return()=>{if(!J.delete(s)||G)return;M({...x,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:s}})}},me=async(t)=>{if("key"in t&&(t.key.length===0||t.key.length>je))throw new a("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!Y(t.value))throw new a("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>ze)throw new a("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&c?.features?.deviceStorage!==!0)throw new a("UNSUPPORTED","This host does not support device storage.");let o=await k({...x,type:"storage",id:l(d),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new a("HOST_REJECTED","Host did not return storage data.");return o},Xt=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):A({...x,type:"popover-close",id:l(d),payload:o?{id:t,reason:o}:{id:t}}),Ft=(t,o)=>c?.features?.popovers!==!0&&!(c?.surface==="popover"&&c.popover?.id===t)?Promise.reject(new a("UNSUPPORTED","This host does not support popovers.")):A({...x,type:"popover-anchor",id:l(d),payload:{id:t,active:o}});return r.addEventListener("keydown",Pt,!0),r.addEventListener("pointerover",he),r.addEventListener("pointermove",he),r.addEventListener("pointerout",Gt),r.addEventListener("focus",Dt),r.addEventListener("blur",Ht),{onAction:(t)=>(ne=t,()=>{if(ne===t)ne=null}),listProjects:async()=>{let t=await Ve({kind:"projects"});if(t.kind!=="projects")throw new a("HOST_REJECTED","Expected projects.");return t},listWorktrees:async(t)=>{let o=await Ve({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new a("HOST_REJECTED","Expected worktrees.");return o},listSessions:async(t)=>{let o=await Ve({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new a("HOST_REJECTED","Expected sessions.");return o},onProjects:(t)=>Be({kind:"projects"},(o)=>{if(o.kind==="projects")t(o)}),onWorktrees:(t,o)=>Be({kind:"worktrees",projectId:t},(s)=>{if(s.kind==="worktrees")o(s)}),onSessions:(t,o)=>Be({kind:"sessions",projectId:t},(s)=>{if(s.kind==="sessions")o(s)}),onRunningShells:(t,o)=>Do(t,o),readShellOutput:async(t,o)=>{P(t,Oe);let s=o?.cursor;if(s!==void 0&&(!Number.isInteger(s)||s<0))throw new a("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let i=o?.tailBytes;if(i!==void 0&&(!Number.isInteger(i)||i<1||i>Ae))throw new a("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ae}.`);let E=await k({...x,type:"shell-output",id:l(d),payload:{shellId:t,cursor:s,tailBytes:i}});if(!E||typeof E.output!=="string"||!Number.isFinite(E.cursor))throw new a("HOST_REJECTED","Host did not return shell output.");return E},stopShell:async(t)=>{if(P(t,Oe),(await k({...x,type:"shell-stop",id:l(d),payload:{shellId:t}}))?.stopped!==!0)throw new a("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(t)=>{P(t),await A({...x,type:"open-session",id:l(d),payload:{sessionId:t}})},storage:{get:async(t,o)=>{let s=Me(o),i={op:"get",key:t};if(s)i.scope=s;let T=await me(i);return T.op==="get"&&T.found?T.value:void 0},set:async(t,o,s)=>{let i=Me(s),T={op:"set",key:t,value:o};if(i)T.scope=i;await me(T)},delete:async(t,o)=>{let s=Me(o),i={op:"delete",key:t};if(s)i.scope=s;await me(i)},keys:async(t)=>{let o=Me(t),s={op:"keys"};if(o)s.scope=o;let i=await me(s);if(i.op!=="keys")throw new a("HOST_REJECTED","Expected storage keys.");return i.keys}},onReady:(t)=>{if(p.add(t),c)t(c);return()=>{p.delete(t)}},onDirectory:(t)=>{if(b.add(t),c)t(c.directory);return()=>{b.delete(t)}},onSession:(t)=>{if(w.add(t),c)t(c.session);return()=>{w.delete(t)}},onSessionLifecycle:(t)=>{if(v.add(t),D)t(D);return()=>{v.delete(t)}},onConnection:(t)=>{if(g.add(t),c)t(c.connection);return()=>{g.delete(t)}},onSettings:(t)=>{if(N.add(t),c)t(c.settings);return()=>{N.delete(t)}},onItem:(t)=>{if(oe.add(t),c)t(c.item);return()=>{oe.delete(t)}},onStatusControl:(t)=>(_e.add(t),()=>{_e.delete(t)}),onPopoverClosed:(t)=>(Ee.add(t),()=>{Ee.delete(t)}),setStatusControls:(t)=>{if(c?.features?.statusControls!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support status controls."));if(!zt(t))return Promise.reject(new a("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return A({...x,type:"status-controls",id:l(d),payload:{controls:t}})},openPopover:(t)=>{if(c?.features?.popovers!==!0)return Promise.reject(new a("UNSUPPORTED","This host does not support popovers."));if(!Qe(t))return Promise.reject(new a("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return A({...x,type:"popover-open",id:l(d),payload:t})},closePopover:Xt,setPopoverAnchorActive:Ft,onResolve:(t)=>(re=t,()=>{if(re===t)re=null}),toast:(t)=>{let o=t.message.trim();if(!o||o.length>be)return Promise.reject(new a("HOST_REJECTED",`Toast message must contain 1 to ${be} characters.`));if(t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>ge))return Promise.reject(new a("HOST_REJECTED",`Toast copy text must contain 1 to ${ge} characters.`));return A({channel:u,v:_,type:"toast",id:l(d),payload:{...t,message:o}})},openUrl:(t)=>A({channel:u,v:_,type:"open-url",id:l(d),payload:{url:t}}),openCommit:(t)=>tt(t)?A({channel:u,v:_,type:"open-commit",id:l(d),payload:{sha:t}}):Promise.reject(new a("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:(t)=>A({channel:u,v:_,type:"open-surface",id:l(d),payload:{surfaceId:t}}),writeClipboard:(t)=>A({channel:u,v:_,type:"clipboard-write",id:l(d),payload:{text:t}}),compose:(t)=>A({channel:u,v:_,type:"compose",id:l(d),payload:t}),attach:(t)=>A({channel:u,v:_,type:"attach",id:l(d),payload:Q(t)}),startSession:async(t)=>{if(t.projectId!==void 0)P(t.projectId);let o=t.worktree;if(o&&o!==!0)if(o.kind==="existing")P(o.directory);else{if(o.name!==void 0)P(o.name,200);if(o.baseBranch!==void 0)P(o.baseBranch,200)}let s=await k({channel:u,v:_,type:"start-session",id:l(d),payload:st(t)},e.requestTimeoutMs??180000);if(!qe(s))throw new a("HOST_REJECTED","Host did not return a session.");return s},prompt:(t)=>k({channel:u,v:_,type:"prompt",id:l(d),payload:it(t)}).then((o)=>{if(!et(o))throw new a("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:(t)=>A({channel:u,v:_,type:"session-link",id:l(d),payload:Q(t)}),close:()=>A({channel:u,v:_,type:"close",id:l(d)}),oauthStart:()=>A({channel:u,v:_,type:"oauth-start",id:l(d)}),oauthDisconnect:()=>A({channel:u,v:_,type:"oauth-disconnect",id:l(d)}),request:(t)=>(Ce(t.path)?k({channel:u,v:_,type:"request",id:l(d),payload:t}):Ao()).then((o)=>{if(!ve(o))throw new a("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:(t)=>(Ce(t.path)?k({channel:u,v:_,type:"service-request",id:l(d),payload:t}):Ao()).then((o)=>{if(!ve(o))throw new a("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>k({channel:u,v:_,type:"service-status",id:l(d)}).then((t)=>{if(!dt(t))throw new a("HOST_REJECTED","Host did not return service status.");return t}),readFile:(t)=>(Z(t)?k({channel:u,v:_,type:"file-read",id:l(d),payload:{path:t}}):Ne()).then((o)=>{if(!lt(o))throw new a("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>{if(!Z(t))return Ne();if(o.length>Ie)return Promise.reject(new a("FILE_TOO_LARGE",`Content is over ${Ie} characters.`));return k({channel:u,v:_,type:"file-write",id:l(d),payload:{path:t,content:o}}).then((s)=>{if(!pt(s))throw new a("HOST_REJECTED","Host did not confirm the write.");return s})},listDir:(t)=>(Z(t)?k({channel:u,v:_,type:"file-list",id:l(d),payload:{path:t}}):Ne()).then((o)=>{if(!ut(o))throw new a("HOST_REJECTED","Host did not return directory entries.");return o}),stat:(t)=>(Z(t)?k({channel:u,v:_,type:"file-stat",id:l(d),payload:{path:t}}):Ne()).then((o)=>{if(!_t(o))throw new a("HOST_REJECTED","Host did not return file status.");return o}),generate:(t)=>{let o=t.prompt.trim(),s=t.system?.trim();if(o.length===0||o.length>ye)return Promise.reject(new a("HOST_REJECTED",`Prompt must be 1 to ${ye} characters.`));if(s!==void 0&&(s.length===0||s.length>Ue))return Promise.reject(new a("HOST_REJECTED",`System prompt must be 1 to ${Ue} characters.`));let i=t.maxOutputTokens===void 0?void 0:Math.min(rt,Math.max(1,Math.floor(t.maxOutputTokens)));if(i!==void 0&&!Number.isFinite(i))return Promise.reject(new a("HOST_REJECTED","maxOutputTokens must be a number."));let T={prompt:o};if(s!==void 0)T.system=s;if(i!==void 0)T.maxOutputTokens=i;return k({channel:u,v:_,type:"generate",id:l(d),payload:T},e.requestTimeoutMs??nt).then((E)=>{if(!Et(E))throw new a("HOST_REJECTED","Host did not return generated text.");return E})},onLateGenerateResult:(t)=>{j.add(t);for(let o of Xe.splice(0))O([t],o);return Nt(),()=>{j.delete(t)}},setBadge:(t)=>A({channel:u,v:_,type:"badge",id:l(d),payload:{count:at(t)}}),setHeight:(t)=>A({channel:u,v:_,type:"resize",id:l(d),payload:{height:ct(t)}}),onFileOpen:(t)=>{if(Te.add(t),!Fe)Fe=!0,r.addEventListener("keydown",wt,!0);if(ie)t(ie);return()=>{Te.delete(t)}},onFileSnapshot:(t)=>(se=t,()=>{if(se===t)se=null}),onFileSaved:(t)=>(Se.add(t),()=>{Se.delete(t)}),reportFileChange:(t)=>$e({...x,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Lt,reportFileUnsupported:()=>$e({...x,type:"file-unsupported"}),dispose:()=>{for(let t of W.keys())M({...x,type:"workspace-unsubscribe",id:l(d),payload:{subscriptionId:t}});W.clear();for(let t of J.keys())M({...x,type:"shells-unsubscribe",id:l(d),payload:{subscriptionId:t}});if(J.clear(),G=!0,re=null,ne=null,se=null,Te.clear(),Se.clear(),Fe)r.removeEventListener("keydown",wt,!0);r.removeEventListener("message",Mt),r.removeEventListener("keydown",Pt,!0),r.removeEventListener("pointerover",he),r.removeEventListener("pointermove",he),r.removeEventListener("pointerout",Gt),r.removeEventListener("focus",Dt),r.removeEventListener("blur",Ht);for(let t of z.values())clearTimeout(t.timer),t.reject(new a("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),p.clear(),b.clear(),w.clear(),v.clear(),g.clear(),N.clear(),oe.clear(),_e.clear(),Ee.clear(),j.clear(),Xe.length=0}}};var xo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Pr=new Set(xo);var Ro=["none","agent","user"];var Dr=new Set(Ro);var Wo=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Jo=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],bo=(e,r)=>{r.style.colorScheme=e.mode;for(let[n,f]of Wo)r.style.setProperty(n,e.tokens[f]);for(let[n,f,p]of Jo){let b=e.tokens[p]??"";r.style.setProperty(n,b),r.style.setProperty(f,b)}r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},ft=(e,r)=>{if(bo(e.theme,r),r.dataset)r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode};var Yo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},S=(e,r)=>`var(--${e}, var(--oc-${Yo[e]}, ${r}))`,X=S("surface-background","transparent"),we=S("surface-elevated","transparent"),q=S("surface-elevated-foreground","inherit"),L=S("surface-foreground","inherit"),h=S("surface-muted-foreground","gray"),Qo=S("surface-muted","transparent"),V=S("interactive-border","currentColor"),y=S("interactive-hover","transparent"),B=S("interactive-active","transparent"),ht=S("interactive-selection","transparent"),mt=S("interactive-selection-foreground","inherit"),H=S("primary","currentColor"),Ot=S("primary-text","inherit"),At=S("error-text","inherit"),Zo=S("font-sans","inherit"),xt=S("font-mono","monospace"),yo=S("radius","9px"),Rt=`calc(${yo} - 2px)`,go=`calc(${yo} - 4px)`,m=(e,r,n="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${n})`,ko=`background-image: linear-gradient(${y}, ${y});`,bt=(e,r="0.5px")=>`box-shadow: inset 0 0 0 ${r} ${e}, var(--oc-sdk-field-lift);`,gt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Io="box-shadow: var(--oc-sdk-lit);",kt=`inset 0 0.5px 0 0 ${m(L,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,qo=`
:root {
  --oc-sdk-edge: ${m(L,16)};
  --oc-sdk-field-bg: ${we};
  --oc-sdk-raised-bg: ${X};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${m(L,14)};
  --oc-sdk-field-bg: ${m(X,50,we)};
  --oc-sdk-raised-bg: ${we};
  --oc-sdk-field-lift: ${kt};
  --oc-sdk-raised-lift: ${kt};
  --oc-sdk-lit: ${kt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Le=(e)=>{let r=S(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${S(`${e}-text`,"inherit")}; }`},er=`
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
`,Uo=`${qo}
.oc-sdk { color: ${L}; font-family: ${Zo}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ko} }
.oc-sdk-mono { font-family: ${xt}; }
.oc-sdk-muted { color: ${h}; }
${Le("success")}${Le("warning")}${Le("error")}${Le("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${H}; --oc-sdk-tone-text: ${Ot}; }

.oc-sdk-btn { border-radius: ${Rt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${go}; }
.oc-sdk-btn[data-variant="default"] { color: ${Ot}; background: ${m(H,10,X)}; border-color: ${m(H,12)}; ${Io} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${m(H,16,X)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${m(H,22,X)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Qo}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${q}; ${gt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${B}, ${B}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${y}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${B}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${S("status-error","red")}; color: ${At}; background: ${m("var(--oc-sdk-tone)",7,X)}; border-color: ${m("var(--oc-sdk-tone)",12)}; ${Io} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${m("var(--oc-sdk-tone)",9,X)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${m("var(--oc-sdk-tone)",11,X)}; box-shadow: none; }

.oc-sdk-field-note { color: ${h}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${At}; }
.oc-sdk-input { border-radius: ${Rt}; background: var(--oc-sdk-field-bg); color: ${q}; ${bt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${h}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${bt(m(L,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${bt(S("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${xt}; }

.oc-sdk-search-icon { color: ${h}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search-clear { border-radius: ${go}; color: ${h}; }
.oc-sdk-search-clear:hover { background: ${y}; color: ${L}; }

.oc-sdk-trigger { border-radius: ${Rt}; background: var(--oc-sdk-raised-bg); color: ${q}; ${gt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${y}, ${y}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${B}, ${B}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${h}; }
.oc-sdk-trigger-chevron { color: ${h}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${q}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${we}; background-clip: padding-box; color: ${q}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${y}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ht}; color: ${mt}; }
.oc-sdk-option-check { color: ${L}; }
.oc-sdk-option[data-destructive="true"] { color: ${At}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${m(S("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${h}; }
.oc-sdk-popup-empty { color: ${h}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${V}; border-radius: 4px; color: ${L}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${m(L,60,V)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${V}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${X}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${H}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ko} }
.oc-sdk-check-desc { color: ${h}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${m(L,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${h}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${L}; }
.oc-sdk-tab[aria-selected="true"] { color: ${mt}; background: ${ht}; border-color: ${V}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${q}; background: var(--oc-sdk-raised-bg); ${gt} }
.oc-sdk-tab-count { color: ${h}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${m(L,6)}; color: ${h}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${m("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${y}; }
.oc-sdk-row[aria-selected="true"] { background: ${ht}; color: ${mt}; }
.oc-sdk-row-lead { font-family: ${xt}; color: ${h}; }
.oc-sdk-row-sub { color: ${h}; }
.oc-sdk-row-meta { color: ${h}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${h}; }

.oc-sdk-empty-body { color: ${h}; }

.oc-sdk-spinner { color: ${h}; }
.oc-sdk-spinner-ring { border-color: ${V}; border-top-color: ${H}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${m("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${h}; }

.oc-sdk-separator { color: ${h}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${m(V,40)}; }

.oc-sdk-progress-label { color: ${h}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${m(L,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${H}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${S("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${S("success-text","inherit")}; }

.oc-sdk-text a { color: ${Ot}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${m(V,60)}; }
`,I=`
${Ke}
${er}
${Uo}`;var sr=30000;var te=(e)=>typeof e==="object"&&e!==null,ir=(e)=>te(e)&&(!("current"in e)||te(e.current)),ar=(e)=>te(e)&&typeof e.at==="number"&&te(e.location||null)&&(e.current===null||ir(e.current))&&(e.hourly===null||te(e.hourly))&&(e.daily===null||te(e.daily))&&(e.error===null||typeof e.error==="string"),cr=(e)=>{if(!(e instanceof a))return"unreachable";if(e.code==="NO_SERVICE"||e.code==="NOT_GRANTED")return"needs-approval";if(e.code==="DISABLED")return"paused";if(e.code==="SERVICE_FAILED")return"service-failed";return"unreachable"},yt=(e)=>!document.hidden&&e.getBoundingClientRect().width>0,Co=(e,r,n,f)=>{let p=!1,b=async()=>{if(p||!yt(r))return;p=!0;try{let g=await e.serviceRequest({method:"GET",path:"/snapshot"}),N;try{N=JSON.parse(g.body)}catch{N=null}if(g.status===200&&ar(N))n(N);else f(g.status===200?"bad-answer":"service-failed")}catch(g){f(cr(g))}finally{p=!1,setTimeout(()=>{b()},sr)}};b();let w=yt(r),v=()=>{let g=yt(r);if(g&&!w)b();w=g};return document.addEventListener("visibilitychange",v),{refresh:()=>{b()}}};var vo=(e)=>{if(e===0)return{label:"晴天",icon:"☀️"};if(e===1)return{label:"主要晴朗",icon:"\uD83C\uDF24️"};if(e===2)return{label:"多雲",icon:"⛅"};if(e===3)return{label:"陰天",icon:"☁️"};if(e===45||e===48)return{label:"霧",icon:"\uD83C\uDF2B️"};if(e===51||e===53||e===55)return{label:"細小雨",icon:"\uD83C\uDF26️"};if(e===56||e===57)return{label:"凍雨",icon:"\uD83C\uDF27️"};if(e===61||e===63||e===65)return{label:"雨",icon:"\uD83C\uDF27️"};if(e===66||e===67)return{label:"凍雨",icon:"\uD83C\uDF27️"};if(e===71||e===73||e===75)return{label:"雪",icon:"❄️"};if(e===77)return{label:"雪粒",icon:"\uD83C\uDF28️"};if(e===80||e===81||e===82)return{label:"陣雨",icon:"\uD83C\uDF26️"};if(e===84)return{label:"陣雨，強",icon:"\uD83C\uDF27️"};if(e===85||e===86)return{label:"陣雪",icon:"\uD83C\uDF28️"};if(e===95)return{label:"雷雨",icon:"⛈️"};if(e===96||e===99)return{label:"雷雨伴冰雹",icon:"⛈️"};return{label:"未知名天氣",icon:"\uD83C\uDF08"}};var No=(e)=>`${Math.round(e)}°C`;var pe=(e,r="",n="",f=[])=>{let p=document.createElement(e);if(r)p.className=r;if(n)p.textContent=n;if(f.length>0)p.append(...f);return p};var Mo=`
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
`;var Lo=`
  html, body { overflow: hidden; }
  #root { display: flex; flex-direction: column; gap: 6px; padding: 2px 0 4px; }
  .line { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; align-items: center; gap: 8px; min-height: 18px; }
  .line .what { color: var(--oc-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .line .value { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .note { color: var(--oc-muted); }
  .note.error { color: var(--oc-error-text, var(--oc-fg)); }
  [hidden] { display: none !important; }
`;var Ut=St(),ue=document.querySelector("#root");if(!ue)throw Error("Missing #root");var Po=document.createElement("style");Po.textContent=Mo+Lo;document.head.append(Po);var Go=pe("div","line","",[pe("span","what","天氣"),pe("span","value num","—")]),K=pe("div","note","載入中…");ue.append(Go,K);var wo=!1,dr=(e)=>{let r=Go.querySelector(".value");if(e.current){let n=vo(e.current.weather_code);r.textContent=`${e.location?.name??"—"} ${No(e.current.temperature_2m)} · ${n.label}`}else r.textContent="—";K.hidden=!e.error,K.className=e.error?"note error":"note",K.textContent=e.error??"載入中…"},lr=(e)=>{K.hidden=!1,K.className="note error",K.textContent=e};Ut.onReady(async(e)=>{if(ft(e,document.documentElement),wo)return;wo=!0;let{refresh:r}=Co(Ut,ue,(n)=>{dr(n)},(n)=>{lr(n)});r()});new ResizeObserver(()=>{let e=Math.ceil(ue.getBoundingClientRect().height);Ut.setHeight(e).catch(()=>{return})}).observe(ue);})();
