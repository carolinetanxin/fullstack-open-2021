(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),a=t(7),o=t(3),u=t(1),s=t(4),i=t.n(s),l="/api/persons",d=function(){return i.a.get(l).then((function(e){return e.data}))},j=function(e){return i.a.post(l,e).then((function(e){return e.data}))},b=function(e){return i.a.put("".concat(l,"/").concat(e.id),e).then((function(e){return e.data}))},f=function(e){return i.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},h=t(0),m=function(e){return Object(h.jsxs)("div",{children:["filter shown with ",Object(h.jsx)("input",{value:e.newFilterName,onChange:e.filterNameChange})]})},O=function(e){return Object(h.jsxs)("form",{onSubmit:e.addName,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})},g=function(e){var n=e.personsToShow,t=e.setPersons,c=e.setErrorMessage;return n.map((function(e){return Object(h.jsxs)("p",{children:[e.name,": ",e.number,Object(h.jsx)("button",{onClick:function(){return function(e){window.confirm("Delete ".concat(e.name,"?"))&&f(e.id).then((function(c){t(n.filter((function(n){return n.id!==e.id})))})).catch((function(n){c("Inform of ".concat(e.name," has already been removed from server")),setTimeout((function(){c(null)}),5e3)}))}(e)},children:"delete"})]},e.name)}))},p=function(e){var n=e.successMessage,t=e.errorMessage;return n||t?n?Object(h.jsx)("div",{className:"success",children:n}):t?Object(h.jsx)("div",{className:"error",children:t}):void 0:null},v=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),s=Object(o.a)(r,2),i=s[0],l=s[1],f=Object(u.useState)(""),v=Object(o.a)(f,2),x=v[0],w=v[1],N=Object(u.useState)(""),C=Object(o.a)(N,2),S=C[0],k=C[1],M=Object(u.useState)(!0),y=Object(o.a)(M,2),E=y[0],T=y[1],P=Object(u.useState)(null),D=Object(o.a)(P,2),F=D[0],I=D[1],J=Object(u.useState)(null),L=Object(o.a)(J,2),A=L[0],B=L[1];Object(u.useEffect)((function(){console.log("effect");d().then((function(e){console.log("promise fulfilled"),c(e)}))}),[]);var q=function(){return t.map((function(e){return e.name})).indexOf(i)>-1},z=E?t:t.filter((function(e){return e.name.toLowerCase().indexOf(S.toLowerCase())>-1}));return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(p,{successMessage:F,errorMessage:A}),Object(h.jsx)(m,{newFilterName:S,filterNameChange:function(e){T(""===e.target.value),k(e.target.value)}}),Object(h.jsx)("h2",{children:"add a new"}),Object(h.jsx)(O,{addName:function(e){if(e.preventDefault(),q()){if(window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===i})),r=Object(a.a)(Object(a.a)({},n),{},{number:x});b(r).then((function(e){c(z.map((function(t){return t.id!==n.id?t:e}))),l(""),w("")}))}}else{var o={name:i,number:x,id:t.length+1};j(o).then((function(e){I("Added ".concat(e.name)),setTimeout((function(){I(null)}),5e3),c(t.concat(e)),l(""),w("")})).catch((function(e){console.log("\u62a5\u9519\u5566\uff01"),console.log(e.response)}))}},newName:i,handleNameChange:function(e){l(e.target.value)},newNumber:x,handleNumberChange:function(e){w(e.target.value)}}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(g,{personsToShow:z,setPersons:c,setErrorMessage:B})]})};t(41);r.a.render(Object(h.jsx)(v,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.6df89b6e.chunk.js.map