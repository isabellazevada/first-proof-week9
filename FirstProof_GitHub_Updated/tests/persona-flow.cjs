const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');const FP=require('../dist/logic.js');
const elements={};function element(){return {hidden:false,value:'',checked:false,textContent:'',className:'',disabled:false,classList:{toggle(){}},append(){},replaceChildren(){},scrollIntoView(){},reset(){}};}
const html=fs.readFileSync('dist/index.html','utf8');for(const [,id] of html.matchAll(/id="([^"]+)"/g))elements[id]=element();
assert.match(html,/id="employer-panel" hidden/);
const context={FP,document:{getElementById(id){assert.ok(elements[id],'Element exists: '+id);return elements[id];},querySelectorAll(){return [element(),element(),element(),element()];},createElement:element,createTextNode:x=>x},window:{scrollTo(){}},URL:{},Blob,setTimeout};vm.createContext(context);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
vm.runInContext('screen(2)',context);assert.equal(elements['employer-panel'].hidden,true);assert.equal(elements['candidate-review'].hidden,false);assert.equal(elements['role-state'].textContent,'VISTA DE CANDIDATA');
elements['review-form'].onsubmit({preventDefault(){}});assert.match(elements.notice.textContent,/Abre la simulación/);
elements['show-employer'].onclick();assert.equal(elements['candidate-review'].hidden,true);assert.equal(elements['employer-panel'].hidden,false);assert.match(elements['role-state'].textContent,/EMPLEADOR/);
elements['back-candidate'].onclick();assert.equal(elements['employer-panel'].hidden,true);
vm.runInContext("state.evidence=FP.example;state.result={status:'interview',text:'Simulado',reason:'Razón ficticia',provenance:'No verificado'};renderOutcome()",context);assert.equal(elements.appeal.disabled,true);assert.match(elements['appeal-note'].textContent,/ya habilitó una entrevista simulada/);assert.equal(elements['role-state'].textContent,'VISTA DE CANDIDATA');
vm.runInContext("state.result.status='feedback';renderOutcome()",context);assert.equal(elements.appeal.disabled,false);elements.appeal.onclick();assert.equal(elements['employer-panel'].hidden,true);assert.equal(elements['candidate-review'].hidden,false);
console.log('PASS: hidden reviewer, explicit role switch, return, submit guard, outcome role, contextual appeal and second-review candidate state. DOM-stub unit check; not browser QA.');
