const assert=require('node:assert/strict');const F=require('../dist/logic.js');let passed=0;function test(name,fn){try{fn();passed++;console.log('PASS '+name);}catch(e){console.log('FAIL '+name+': '+e.message);process.exitCode=1;}}
for(const s of ['none','full','barrier','expired'])test('blocks '+s,()=>assert.ok(F.gate(F.commitment(s))));
test('valid commitment opens preparation',()=>assert.equal(F.gate(F.commitment('valid')),''));
test('valid evidence accepted',()=>assert.equal(F.validate(F.example),''));
test('blank contribution rejected',()=>assert.ok(F.validate({...F.example,contribution:'   '})));
test('overlong problem rejected',()=>assert.ok(F.validate({...F.example,problem:'x'.repeat(501)})));
test('fractional count rejected',()=>assert.ok(F.validate({...F.example,count:1.5})));
test('negative count rejected',()=>assert.ok(F.validate({...F.example,count:-1})));
test('unknown evidence enum rejected',()=>assert.ok(F.validate({...F.example,type:'verified-real'})));
test('unsupported result remains unverified',()=>assert.match(F.provenance(F.example),/no verificado/));
const state={commitment:F.commitment('valid'),reserved:false};const reason='La persona explica el cálculo y justifica su decisión.';
test('human criteria enable interview',()=>assert.equal(F.decide(state,[true,true,true],reason,'valid').status,'interview'));
test('missing skill receives specific feedback',()=>assert.equal(F.decide(state,[true,false,true],reason,'valid').status,'feedback'));
test('capacity changes block final reservation',()=>assert.equal(F.decide(state,[true,true,true],reason,'full').status,'blocked'));
test('unpaid usable work pauses review',()=>assert.equal(F.decide(state,[true,true,true],reason,'unpaid').status,'paused'));
test('short reason rejected',()=>assert.ok(F.decide(state,[true,true,true],'ok','valid').error));
test('duplicate reservation is blocked',()=>assert.equal(F.decide({...state,reserved:true},[true,true,true],reason,'valid').status,'blocked'));
console.log(`${passed}/18 checks passed`);
