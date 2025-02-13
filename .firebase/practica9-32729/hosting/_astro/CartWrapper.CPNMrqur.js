import{j as e}from"./jsx-runtime.CLpGMVip.js";import{r as c}from"./index.BL7xzsR_.js";import{B as x,g as u,r as f}from"./button.NJqs0wxn.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),p=(...s)=>s.filter((t,r,l)=>!!t&&t.trim()!==""&&l.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=c.forwardRef(({color:s="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:l,className:o="",children:n,iconNode:m,...h},a)=>c.createElement("svg",{ref:a,...g,width:t,height:t,stroke:s,strokeWidth:l?Number(r)*24/Number(t):r,className:p("lucide",o),...h},[...m.map(([i,d])=>c.createElement(i,d)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=(s,t)=>{const r=c.forwardRef(({className:l,...o},n)=>c.createElement(w,{ref:n,iconNode:t,className:p(`lucide-${j(s)}`,l),...o}));return r.displayName=`${s}`,r};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],y=b("Trash2",C),v=({courses:s,total:t,isOpen:r,onClose:l,onConfirm:o})=>{const n=c.useRef(null);return c.useEffect(()=>{r?n.current?.showModal():n.current?.close()},[r]),e.jsxs("dialog",{ref:n,className:"bg-white p-6 rounded-lg shadow-lg w-96",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Confirmar compra"}),e.jsx("div",{className:"space-y-2",children:s.map(m=>e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:m.titulo}),e.jsxs("span",{children:["$",m.precio.toFixed(2)]})]},m.id))}),e.jsxs("div",{className:"flex justify-between mt-4 font-bold",children:[e.jsx("span",{children:"Total:"}),e.jsxs("span",{children:["$",t]})]}),e.jsxs("div",{className:"flex justify-end space-x-2 mt-4",children:[e.jsx(x,{variant:"secondary",onClick:l,children:"Cancelar"}),e.jsx(x,{className:"bg-green-600 text-white",onClick:o,children:"Confirmar compra"})]})]})},N=({userId:s})=>{const[t,r]=c.useState([]),[l,o]=c.useState(!1);c.useEffect(()=>{console.log("userId recibido en Cart.tsx:",s),(async()=>{const i=await u(s);r(i)})()},[s]);const n=async a=>{await f(s,a),r(i=>i.filter(d=>d.id!==a))},m=()=>t.reduce((a,i)=>a+i.precio,0).toFixed(2),h=async()=>{try{if(!s){alert("Debes iniciar sesión para comprar.");return}const a={courses:t.map(d=>d.id),timestamp:new Date().toISOString()},i=`https://firestore.googleapis.com/v1/projects/practica9-32729/databases/(default)/documents/purchases/${s}`;await fetch(i,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({fields:{courses:{arrayValue:{values:a.courses.map(d=>({stringValue:d}))}}}})});for(const d of t)await f(s,d.id);r([]),o(!1),alert("¡Compra realizada con éxito! 🎉")}catch(a){console.error("Error al finalizar la compra:",a),alert("Hubo un problema al procesar la compra. Inténtalo de nuevo.")}};return e.jsxs("div",{className:"w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold text-center mb-4",children:"Carrito de Cursos"}),e.jsx("div",{className:"space-y-4",children:t.map(a=>e.jsxs("div",{className:"flex items-center justify-between border-b pb-2",children:[e.jsxs("div",{className:"flex flex-row items-center space-x-4",children:[e.jsx("img",{src:a.imagen,alt:a.titulo,className:"w-16 h-16 object-cover rounded-md"}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-sm",children:a.titulo}),e.jsxs("p",{className:"text-muted-foreground text-xs",children:["Por ",a.instructor]}),e.jsxs("p",{className:"text-primary font-bold",children:["$",a.precio.toFixed(2)]})]})]}),e.jsx(x,{variant:"destructive",size:"icon",className:"h-8 w-8 ml-2",onClick:()=>n(a.id),children:e.jsx(y,{className:"h-4 w-4"})})]},a.id))}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsx("span",{className:"text-lg font-bold",children:"Total:"}),e.jsxs("span",{className:"text-xl font-bold",children:["$",m()]})]}),e.jsx(x,{className:"text-white bg-green-600",onClick:()=>o(!0),children:"Finalizar Compra"}),e.jsx(v,{courses:t,total:m(),isOpen:l,onClose:()=>o(!1),onConfirm:h})]})},S=()=>{const[s,t]=c.useState([]),[r,l]=c.useState("");return c.useEffect(()=>{const o=localStorage.getItem("userId");o&&(l(o),u(o).then(n=>t(n)))},[]),e.jsx(N,{courses:s,userId:r})};export{S as default};
