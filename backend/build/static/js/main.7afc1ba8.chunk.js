(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,function(e,t,a){},,function(e,t,a){e.exports=a.p+"static/media/logo.b1f03904.svg"},function(e,t,a){e.exports=a.p+"static/media/circle.58750543.svg"},function(e,t,a){e.exports=a(21)},,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(7),c=a.n(r),s=(a(18),a(3)),o=(a(6),a(8)),i=a.n(o);a(19);function m(){const[e,t]=Object(n.useState)([]);Object(n.useEffect)(()=>{fetch("http://localhost:3001/students").then(e=>e.json()).then(e=>t(e.map(e=>({...e,present:!1})))).catch(e=>console.error("Error while fetcheing",e))},[]);return l.a.createElement("div",{className:"studentsContainer"},l.a.createElement("div",{className:"studentscard"},e.map(e=>l.a.createElement("div",{key:e.id,className:"attendance-card"},l.a.createElement("div",{className:"text"},l.a.createElement("h3",null,e.firstName," ",e.lastName)),l.a.createElement("div",{className:"markattendance"},l.a.createElement("p",null,"Branch: ",e.branch),l.a.createElement("label",null,l.a.createElement("input",{type:"checkbox",checked:e.present,onChange:()=>{return a=e.id,void t(e=>e.map(e=>e.id===a?{...e,present:!e.present}:e));var a}})," ","present"),l.a.createElement("button",{onClick:()=>((e,t)=>{const a={studentId:e,present:t};fetch("http://localhost:3001/markAttendance",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(e=>e.json()).then(e=>console.log("Attendance marked successfully:",e)).catch(e=>console.error("Error marking attendance:",e))})(e.id,e.present)},"Submit"))))))}function u(){return l.a.createElement("div",{className:"Navbar"},l.a.createElement("div",{className:"logogrp"},l.a.createElement("img",{src:i.a,alt:"logo of attendify"}),l.a.createElement("h2",{className:"attendify"},"attendify")),l.a.createElement("h3",null,l.a.createElement(s.b,{to:"/students"},"Students")))}var d=a(2),E=a(9),p=a.n(E);function h(){return l.a.createElement("div",{className:"Bodycontainer"},l.a.createElement("div",{className:"Body"},l.a.createElement("h2",null,"Student attendance marking made easy"),l.a.createElement("h4",null,"today's session: html"),l.a.createElement("div",{className:"sinup"},l.a.createElement("button",{className:"login-body"},"LOGIN"),l.a.createElement(s.b,{className:"siginin",to:"/siginin"},l.a.createElement("button",{className:"siginin-body"},"SIGN IN")))),l.a.createElement("img",{src:p.a,alt:"circle"}))}function f(){return l.a.createElement("div",null,l.a.createElement(h,null))}a(20);function g(){const[e,t]=Object(n.useState)({username:"",password:""}),a=e=>{const{name:a,value:n}=e.target;t(e=>({...e,[a]:n}))};return l.a.createElement("div",{className:"Signincontainer"},l.a.createElement("div",{className:"Siginin"},l.a.createElement("div",{className:"textcontainer"},l.a.createElement("h2",null,"attendify"),l.a.createElement("input",{type:"text",placeholder:"UserName","aria-label":"Text",name:"username",value:e.username,onChange:a}),l.a.createElement("input",{type:"password",placeholder:"Password","aria-label":"Password",name:"password",value:e.password,onChange:a})),l.a.createElement("div",{className:"buttons"},l.a.createElement("button",{className:"outline secondary"},"LOG IN"),l.a.createElement("button",{onClick:async t=>{t.preventDefault();try{(await fetch("http://localhost:3001/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.username,password:e.password})})).ok?console.log("Form submitted successfully!"):console.error("Form submission failed.")}catch(a){console.error("Error during form submission:",a)}}},"SIGN IN"))))}var N=function(){return l.a.createElement(s.a,null,l.a.createElement(u,null),l.a.createElement(d.c,null,l.a.createElement(d.a,{path:"/siginin",element:l.a.createElement(g,null)}),l.a.createElement(d.a,{path:"/students",element:l.a.createElement(m,null)}),l.a.createElement(d.a,{path:"/",element:l.a.createElement(f,null),index:!0})))};var b=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,22)).then(t=>{let{getCLS:a,getFID:n,getFCP:l,getLCP:r,getTTFB:c}=t;a(e),n(e),l(e),r(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(N,null))),b()}],[[10,1,2]]]);
//# sourceMappingURL=main.7afc1ba8.chunk.js.map