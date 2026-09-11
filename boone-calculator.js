window.BooneCalc=(function(){

/* ---------- shared result panel ---------- */
var PANEL="<hr class='BC-dv'><div class='BC-r'><div class='BC-hd'><span class='BC-hl'>Your selection</span><span class='BC-hv' data-b='hdr'>--</span></div><div class='BC-it' data-b='items'></div><div class='BC-m'><div class='BC-mi'><div class='BC-ml'>Calories</div><div class='BC-mv' data-b='kv'>--</div><div class='BC-mc' data-b='kc'>--</div></div><div class='BC-bw'><div class='BC-bl'><span>0</span><span data-b='kl'>--</span></div><div class='BC-bt'><div class='BC-bf' data-b='kb' style='width:0%'></div></div></div><div class='BC-tg' data-b='kt'>--</div></div><div class='BC-m'><div class='BC-mi'><div class='BC-ml'>Free (added) sugar</div><div class='BC-mv' data-b='sv'>--</div><div class='BC-mc' data-b='sc'>--</div></div><div class='BC-bw'><div class='BC-bl'><span>0</span><span data-b='sl'>--</span></div><div class='BC-bt'><div class='BC-bf' data-b='sb' style='width:0%'></div></div></div><div class='BC-tg' data-b='st'>--</div></div><div class='BC-m'><div class='BC-mi'><div class='BC-ml'>Salt</div><div class='BC-mv' data-b='xv'>--</div><div class='BC-mc' data-b='xc'>--</div></div><div class='BC-bw'><div class='BC-bl'><span>0</span><span data-b='xl'>--</span></div><div class='BC-bt'><div class='BC-bf' data-b='xb' style='width:0%'></div></div></div><div class='BC-tg' data-b='xt'>--</div></div><div class='BC-m'><div class='BC-mi'><div class='BC-ml'>Saturated fat</div><div class='BC-mv' data-b='fv'>--</div><div class='BC-mc' data-b='fc'>--</div></div><div class='BC-bw'><div class='BC-bl'><span>0</span><span data-b='fl'>--</span></div><div class='BC-bt'><div class='BC-bf' data-b='fb' style='width:0%'></div></div></div><div class='BC-tg' data-b='ft'>--</div></div><div class='BC-x'><div><div class='BC-xl'>Carbohydrate</div><div class='BC-xv' data-b='carb'>--</div></div><div><div class='BC-xl'>Protein</div><div class='BC-xv' data-b='prot'>--</div></div><div><div class='BC-xl'>Total sugar</div><div class='BC-xv' data-b='tsug'>--</div></div><div><div class='BC-xl'>Naturally occurring</div><div class='BC-xv' data-b='nfree'>--</div></div></div><div class='BC-ing' data-b='ingblock'><div><div class='BC-xl'>Raw ingredients</div><div class='BC-xv' data-b='iraw'>--</div></div><div><div class='BC-xl'>Manufactured</div><div class='BC-xv' data-b='iman'>--</div></div><div><div class='BC-xl'>Total ingredients</div><div class='BC-xv' data-b='itot'>--</div></div></div><div class='BC-ft' data-b='foot'></div></div></div>";

var FOOT_MEAL="Boone calculates free sugar by removing the sugars naturally present in milk and whole fruit, which NHS daily limits do not count. Ingredient counts are distinct named ingredients from published component lists, including sub-ingredients, and are a minimum. Calories, free sugar, salt and saturated fat are scored against daily guidelines for the age and sex chosen; the other figures are running totals. For guidance only.";
var FOOT_ITEM="Boone calculates free sugar by removing the sugars naturally present in milk and whole fruit, which NHS daily limits do not count. Plant milk sugars are counted as free sugars. Calories, free sugar, salt and saturated fat are scored against daily guidelines for the age and sex chosen. For guidance only.";

var AGESEX="<div class='BC-f'><label>Age</label><select data-b='age'><option value='adult' selected>Adult</option><option value='11'>11 to 17</option><option value='7'>7 to 10</option><option value='4'>4 to 6</option></select></div><div class='BC-f'><label>Sex</label><select data-b='sex'><option value='female'>Female</option><option value='male'>Male</option></select></div>";

var SHELL={
"breakfast":"<div class='BC-c'><div class='BC-ey'>Boone nutrition calculator</div><div class='BC-ti'>Breakfast nutrition calculator</div><div class='BC-su'>Choose a breakfast item, add a side and a drink, then set age and sex to see how it fits a day.</div><div class='BC-g BC-g2'><div class='BC-f'><label>Breakfast item</label><select data-b='item'></select></div><div class='BC-f'><label>Add a side</label><select data-b='side'></select></div></div><div class='BC-g BC-g3'><div class='BC-f'><label>Add a drink</label><select data-b='drink'></select></div>"+AGESEX+"</div>"+PANEL,

"meal":"<div class='BC-c'><div class='BC-ey'>Boone nutrition calculator</div><div class='BC-ti'>Build a meal and see the totals</div><div class='BC-su'>Starts with this item on its own. Add fries, a drink, dips and a dessert, then set age and sex for the combined totals.</div><div class='BC-g'><div class='BC-f'><label>Main item</label><select data-b='item'></select></div></div><div class='BC-g BC-g2'><div class='BC-f'><label>Fries or side</label><select data-b='side'></select></div><div class='BC-f'><label>Drink</label><select data-b='drink'></select></div></div><div class='BC-g'><div class='BC-f'><label>Dips and sauces</label><div class='BC-ck' data-b='dips'></div></div></div><div class='BC-g BC-g3'><div class='BC-f'><label>Dessert</label><select data-b='dessert'></select></div>"+AGESEX+"</div>"+PANEL,

/* nested: drink = item + size + milk */
"drinkitem":"<div class='BC-c'><div class='BC-ey'>Boone nutrition calculator</div><div class='BC-ti'>Check any drink by size and milk</div><div class='BC-su'>Pick the drink, then the size and the milk. Set age and sex to see how it fits a day.</div><div class='BC-g BC-g3'><div class='BC-f'><label>Drink</label><select data-b='base'></select></div><div class='BC-f' data-b='sizewrap'><label>Size</label><select data-b='size'></select></div><div class='BC-f' data-b='milkwrap'><label>Milk</label><select data-b='milk'></select></div></div><div class='BC-g BC-g2'>"+AGESEX+"</div>"+PANEL,

/* nested: food = category + item */
"fooditem":"<div class='BC-c'><div class='BC-ey'>Boone nutrition calculator</div><div class='BC-ti'>Check any item against the day</div><div class='BC-su'>Pick a category and an item, then set age and sex to see how it fits a day.</div><div class='BC-g BC-g2'><div class='BC-f' data-b='catwrap'><label>Category</label><select data-b='cat'></select></div><div class='BC-f'><label>Item</label><select data-b='base'></select></div></div><div class='BC-g BC-g2'>"+AGESEX+"</div>"+PANEL
};

/* ---------- reference intakes ---------- */
var CA={male:{'4':1386,'7':1649,'11':2032,adult:2500},female:{'4':1291,'7':1553,'11':1936,adult:2000}};
var SF={'4':16,'7':18,'11':20,adult:20},SU={'4':19,'7':24,'11':30,adult:30},SA={'4':3,'7':5,'11':6,adult:6};

/* ---------- UK / US guidance (dual datasets only, e.g. McDonald's US) ---------- */
var USR={cal:{female:{'4':1500,'9':1800,'14':2000,adult:2000},male:{'4':1500,'9':2000,'14':2600,adult:2600}},sod:{'4':1500,'9':1800,'14':2300,adult:2300}};
function km(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,',')}
function capTxt(a){var x=a/10;return x>=2?(Math.round(x*10)/10)+' times the 10g per-meal added sugar limit':pc(r1(a),10)+'% of the 10g per-meal added sugar limit'}
function yrs(y){return y==='adult'?99:+y}
function usL(y,sx){var n=yrs(y),b=y==='adult'?'adult':(n<=8?'4':n<=13?'9':'14'),c=(USR.cal[sx]||USR.cal.female)[b];
 return {c:c,sf:Math.round(c*0.1/9),so:USR.sod[b],su:n>=11?10:0}}
function ukL(y,sx){var n=yrs(y),b=n>=18?'adult':(n<=6?'4':n<=10?'7':'11');
 return {c:(CA[sx]||CA.female)[b]||2000,sf:SF[b]||20,su:SU[b]||30,sa:SA[b]||6}}
function yl(y,sx){return y==='adult'?(sx==='male'?'an adult man':'an adult woman'):'a '+y+'-year-old '+(sx==='male'?'boy':'girl')}
var FOOT_US="Added sugar is scored against the Dietary Guidelines for Americans, 2025\u20132030: no more than 10g per meal from age 11 and none for younger children. Sodium uses National Academies limits by age, calories use USDA estimates for moderately active people, and saturated fat is capped at 10% of those calories. Ingredient counts are added up across the items chosen, so an ingredient shared by two items counts twice. For guidance only.";
var FOOT_UKUS="Free sugar and salt are scored against NHS daily limits by age. Free sugar also counts sugar from fruit juice, pur\u00e9e and concentrate, and removes the sugars naturally present in milk and whole fruit. Salt is converted from McDonald\u2019s US sodium figures (sodium \u00d7 2.5). Ingredient counts are added up across the items chosen, so an ingredient shared by two items counts twice. For guidance only.";
var CSS_DUAL=".BC-gd{display:inline-flex;border:1px solid #d5ddd9;border-radius:8px;overflow:hidden;margin:4px 0 16px}.BC-gd button{border:0;background:#fff;color:#0f1a16;font:inherit;font-size:13px;font-weight:500;padding:8px 14px;cursor:pointer}.BC-gd button.on{background:#0f1a16;color:#fff}.BC-cmp{margin:16px 0 0;padding:12px 14px;background:#fff;border:1px solid #e2e8e5;border-radius:8px;font-size:13px;line-height:1.6;color:#0f1a16}.BC-cmp b{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#58A754;margin-bottom:4px}";

function expand(D){
 if(!D||!D.rows||D.__x)return D;
 var C=D.meta.cols,M={};
 D.rows.forEach(function(r){var o={};C.forEach(function(k,i){o[k]=r[i]});
  o.salt=o.sod==null?0:o.sod*2.5/1000;
  var L=o.list;(D[L]=D[L]||[]).push(o);
  M[D.meta.pre+o.id+D.meta.suf]={i:o.id,s:(L==='breakfast'||L==='main')?'item':L,k:L==='breakfast'?'breakfast':'meal'}});
 D.map=D.map||M;D.__x=1;return D}

function setupDual(R,q,D){
 if(!document.getElementById('BC-dual-css')){var st=document.createElement('style');st.id='BC-dual-css';st.textContent=CSS_DUAL;document.head.appendChild(st)}
 R.__g=String(D.meta.market||'UK').toLowerCase()==='us'?'us':'uk';
 var h="<option value='adult' selected>Adult</option>";for(var a=18;a>=4;a--)h+="<option value='"+a+"'>"+a+" years</option>";
 q('age').innerHTML=h;
 var gd=document.createElement('div');gd.className='BC-gd';
 gd.innerHTML="<button type='button' data-g='uk'>UK guidance</button><button type='button' data-g='us'>US guidance</button>";
 var su=R.querySelector('.BC-su');if(su&&su.parentNode)su.parentNode.insertBefore(gd,su.nextSibling);else R.insertBefore(gd,R.firstChild);
 function paint(){gd.querySelectorAll('button').forEach(function(b){b.className=b.getAttribute('data-g')===R.__g?'on':''})}
 gd.addEventListener('click',function(e){var g=e.target.getAttribute&&e.target.getAttribute('data-g');if(!g)return;R.__g=g;paint();if(R.__recalc)R.__recalc()});
 paint();
 var ft=q('foot'),cmp=document.createElement('div');cmp.className='BC-cmp';cmp.setAttribute('data-b','cmp');
 if(ft&&ft.parentNode)ft.parentNode.insertBefore(cmp,ft);
}

function renderDual(items,q,R){
 var g=R.__g,t={kcal:0,carb:0,protein:0,sugar:0,free:0,add:0,sod:0,sat:0},ing=0,man=0,raw=0,estA=0,estS=0;
 items.forEach(function(i){t.kcal+=i.kcal||0;t.carb+=i.carb||0;t.protein+=i.protein||0;t.sugar+=i.sugar||0;t.free+=i.free||0;
  if(i.add==null){estA=1;t.add+=i.free||0}else t.add+=i.add;
  if(i.sod==null)estS=1;else t.sod+=i.sod;
  t.sat+=i.sat||0;ing+=i.ing||0;man+=i.man||0;raw+=i.raw||0});
 var y=q('age').value,sx=q('sex').value,al=yl(y,sx),U=usL(y,sx),K=ukL(y,sx),salt=t.sod*2.5/1000;
 var ml=R.querySelectorAll('.BC-ml'),us=g==='us',L=us?U:K;
 if(ml[1])ml[1].textContent=us?'Added sugar':'Free sugar';if(ml[2])ml[2].textContent=us?'Sodium':'Salt';
 var cp=pc(t.kcal,L.c),fp=pc(r1(t.sat),L.sf);
 T(q,'kv',Math.round(t.kcal)+' kcal');T(q,'kc',cp+'% of the daily intake for '+al);T(q,'kl',km(L.c)+' kcal');BAR(q,'kb',cp);TAG(q,'kt',cp);
 var sp,xp,sugTxt;
 if(us){
  if(U.su===0){sp=t.add>0?100:0;sugTxt=t.add>0?'No added sugar is recommended for '+al+' ('+r1(t.add/4)+' tsp)':'No added sugar, in line with guidance for '+al;T(q,'sl','none')}
  else{sp=pc(r1(t.add),U.su);sugTxt=capTxt(t.add)+' for '+al+' ('+r1(t.add/4)+' tsp)';T(q,'sl','10g')}
  if(estA)sugTxt+=', includes an estimate';
  T(q,'sv',r1(t.add)+'g');T(q,'sc',sugTxt);BAR(q,'sb',sp);TAG(q,'st',sp);
  xp=pc(t.sod,U.so);T(q,'xv',km(t.sod)+'mg');T(q,'xc',xp+'% of the daily sodium limit for '+al);T(q,'xl',km(U.so)+'mg');BAR(q,'xb',xp);TAG(q,'xt',xp);
  T(q,'nfree',r1(Math.max(t.sugar-t.add,0))+'g');
 }else{
  sp=pc(r1(t.free),K.su);T(q,'sv',r1(t.free)+'g');T(q,'sc',sp+'% of the daily free sugar limit for '+al+' ('+r1(t.free/4)+' tsp)');T(q,'sl',K.su+'g');BAR(q,'sb',sp);TAG(q,'st',sp);
  xp=pc(r1(salt),K.sa);T(q,'xv',r1(salt)+'g');T(q,'xc',xp+'% of the daily salt limit for '+al);T(q,'xl',K.sa+'g');BAR(q,'xb',xp);TAG(q,'xt',xp);
  T(q,'nfree',r1(Math.max(t.sugar-t.free,0))+'g');
 }
 T(q,'fv',r1(t.sat)+'g');T(q,'fc',fp+'% of the daily saturated fat guideline for '+al);T(q,'fl',L.sf+'g');BAR(q,'fb',fp);TAG(q,'ft',fp);
 T(q,'carb',r1(t.carb)+'g');T(q,'prot',r1(t.protein)+'g');T(q,'tsug',r1(t.sugar)+'g');
 var ib=q('ingblock');
 if(ing||man||raw){if(ib)ib.style.display='';T(q,'iraw',raw);T(q,'iman',man);T(q,'itot',ing)}else if(ib){ib.style.display='none'}
 q('items').innerHTML=items.map(function(i){return "<span>"+i.label+" &middot; "+Math.round(i.kcal||0)+" kcal</span>"}).join('');
 T(q,'hdr',items.length+(items.length===1?' item':' items'));
 var c=q('cmp');
 if(c){
  if(!items.length){c.style.display='none'}else{c.style.display='';
  var o;
  if(us){o='Under UK guidance, this comes to '+r1(t.free)+'g of free sugar ('+pc(r1(t.free),K.su)+'% of the daily limit) and '+r1(salt)+'g of salt ('+pc(r1(salt),K.sa)+'% of the daily limit) for '+al+'.'}
  else{o='Under US guidance, this comes to '+r1(t.add)+'g of added sugar ('+(U.su?capTxt(t.add):(t.add>0?'none is recommended at this age':'in line with guidance'))+') and '+km(t.sod)+'mg of sodium ('+pc(t.sod,U.so)+'% of the daily limit) for '+al+'.'}
  if(t.free-t.add>=1)o+=' The sugar figures differ because the UK counts sugar from fruit juice, pur\u00e9e and concentrate as free sugar, and US added sugar does not.';
  if(estA)o+=' Includes an estimate for an item whose added sugar McDonald\u2019s does not publish consistently.';
  if(estS)o+=' One item has no reliable sodium figure and is left out of the sodium and salt totals.';
  c.innerHTML='<b>UK vs US</b>'+o}}
 T(q,'foot',us?FOOT_US:FOOT_UKUS);
}

function r1(n){return Math.round(n*10)/10}
function pc(v,l){return Math.min(Math.round(v/l*100),999)}
function sc(p){return p>=75?'BC-sh':p>=20?'BC-sm':'BC-sl'}
function bc(p){return p>=75?'BC-fh':p>=20?'BC-fm':'BC-fl'}
function lb(p){return p>=100?'Exceeds limit':p>=75?'High':p>=20?'Moderate':'Low'}
function T(q,k,v){var e=q(k);if(e)e.textContent=v}
function BAR(q,k,p){var e=q(k);if(!e)return;e.className='BC-bf '+bc(p);e.style.width=Math.min(p,100)+'%'}
function TAG(q,k,p){var e=q(k);if(!e)return;e.className='BC-tg '+sc(p);e.textContent=lb(p)}
function opts(sel,arr,none){var h=none?"<option value='__'>None</option>":'';h+=arr.map(function(i){return "<option value='"+i.id+"'>"+i.label+"</option>"}).join('');sel.innerHTML=h}
function find(arr,id){for(var i=0;i<arr.length;i++){if(arr[i].id===id)return arr[i]}return null}
function agelabel(a,g){return a==='adult'?(g==='male'?'an adult man':'an adult woman'):'a child aged '+(a==='4'?'4 to 6':a==='7'?'7 to 10':'11 to 17')}

function render(items,q){
 var t={kcal:0,carb:0,protein:0,sugar:0,free:0,salt:0,sat:0};var ing=0,man=0,raw=0;
 items.forEach(function(i){t.kcal+=i.kcal||0;t.carb+=i.carb||0;t.protein+=i.protein||0;t.sugar+=i.sugar||0;t.free+=i.free||0;t.salt+=i.salt||0;t.sat+=i.sat||0;ing+=i.ing||0;man+=i.man||0;raw+=i.raw||0});
 var a=q('age').value,g=q('sex').value;
 var L={c:(CA[g]||CA.female)[a]||2000,sf:SF[a]||20,su:SU[a]||30,sa:SA[a]||6};
 var al=agelabel(a,g);
 var cp=pc(t.kcal,L.c),fp=pc(r1(t.sat),L.sf),sp=pc(r1(t.free),L.su),xp=pc(r1(t.salt),L.sa);
 T(q,'kv',Math.round(t.kcal)+' kcal');T(q,'kc',cp+'% of the daily intake for '+al);T(q,'kl',L.c+' kcal');BAR(q,'kb',cp);TAG(q,'kt',cp);
 T(q,'sv',r1(t.free)+'g');T(q,'sc',sp+'% of the daily free sugar limit for '+al+' ('+r1(t.free/4)+' tsp)');T(q,'sl',L.su+'g');BAR(q,'sb',sp);TAG(q,'st',sp);
 T(q,'xv',r1(t.salt)+'g');T(q,'xc',xp+'% of the daily salt limit for '+al);T(q,'xl',L.sa+'g');BAR(q,'xb',xp);TAG(q,'xt',xp);
 T(q,'fv',r1(t.sat)+'g');T(q,'fc',fp+'% of the daily saturated fat guideline for '+al);T(q,'fl',L.sf+'g');BAR(q,'fb',fp);TAG(q,'ft',fp);
 T(q,'carb',r1(t.carb)+'g');T(q,'prot',r1(t.protein)+'g');T(q,'tsug',r1(t.sugar)+'g');T(q,'nfree',r1(t.sugar-t.free)+'g');
 var ib=q('ingblock');
 if(ing||man||raw){if(ib)ib.style.display='';T(q,'iraw',raw);T(q,'iman',man);T(q,'itot',ing)}
 else if(ib){ib.style.display='none'}
 q('items').innerHTML=items.map(function(i){return "<span>"+i.label+" &middot; "+Math.round(i.kcal||0)+" kcal</span>"}).join('');
 T(q,'hdr',items.length+(items.length===1?' item':' items'));
}

/* ---------- FLAT format (McDonald's): unchanged behaviour ---------- */
function buildFlat(root,kind,D,defId,defSlot){
 root.innerHTML=SHELL[kind];var R=root;
 function q(k){return R.querySelector("[data-b='"+k+"']")}
 T(q,'foot',FOOT_MEAL);
 var DUAL=!!(D.meta&&D.meta.dual);if(DUAL)setupDual(R,q,D);
 var IT=kind==='breakfast'?(D.breakfast||[]):(D.main||[]),SD=D.side||[],DR=D.drink||[],DP=D.dip||[],DS=D.dessert||[];
 opts(q('item'),IT,kind!=='breakfast');opts(q('side'),SD,true);opts(q('drink'),DR,true);
 if(q('dessert'))opts(q('dessert'),DS,true);
 if(q('dips'))q('dips').innerHTML=DP.map(function(i){return "<label><input type='checkbox' data-dip='1' value='"+i.id+"'> "+i.label+"</label>"}).join('');
 q('side').value='__';q('drink').value='__';if(q('dessert'))q('dessert').value='__';
 if(kind!=='breakfast')q('item').value='__';
 var POOL={item:IT,side:SD,drink:DR,dessert:DS};
 if(defSlot==='dip'){var c=R.querySelector("[data-dip][value='"+defId+"']");if(c)c.checked=true}
 else if(POOL[defSlot]&&find(POOL[defSlot],defId)){q(defSlot).value=defId}
 else if(find(IT,defId)){q('item').value=defId}
 function calc(){var out=[];
  var mv=q('item').value;if(mv&&mv!=='__'){var m=find(IT,mv);if(m)out.push(m)}
  var s=q('side').value;if(s!=='__'){var si=find(SD,s);if(si)out.push(si)}
  var d=q('drink').value;if(d!=='__'){var di=find(DR,d);if(di)out.push(di)}
  if(q('dessert')){var z=q('dessert').value;if(z!=='__'){var zi=find(DS,z);if(zi)out.push(zi)}}
  R.querySelectorAll("[data-dip]:checked").forEach(function(e){var x=find(DP,e.value);if(x)out.push(x)});
  if(DUAL)renderDual(out,q,R);else render(out,q)}
 R.__recalc=calc;
 ['item','side','drink','dessert','age','sex'].forEach(function(k){var e=q(k);if(e)e.addEventListener('change',calc)});
 R.querySelectorAll('[data-dip]').forEach(function(e){e.addEventListener('change',calc)});
 calc();
}

/* ---------- NESTED format (Starbucks): base + size + milk, or category + item ---------- */
function vkey(s,m){return (s||'-')+'|'+(m||'-')}

function buildNested(root,D,sel){
 var isFood=(D.meta&&D.meta.kind==='food');
 root.innerHTML=SHELL[isFood?'fooditem':'drinkitem'];var R=root;
 function q(k){return R.querySelector("[data-b='"+k+"']")}
 T(q,'foot',FOOT_ITEM);
 var B=D.drinks||{};
 var keys=Object.keys(B);

 /* category filter, food and bottled only */
 var cats=(D.meta&&D.meta.categories)||[];
 if(isFood&&cats.length>1){
   q('cat').innerHTML="<option value='__'>All</option>"+cats.map(function(c){
     return "<option value='"+c+"'>"+c.charAt(0).toUpperCase()+c.slice(1)+"</option>"}).join('');
 } else if(q('catwrap')){q('catwrap').className='BC-f BC-hide'}

 function fillBases(){
   var c=q('cat')?q('cat').value:'__';
   var list=keys.filter(function(k){return c==='__'||!c||B[k].cat===c})
                .sort(function(a,b){return B[a].label.localeCompare(B[b].label)});
   q('base').innerHTML=list.map(function(k){return "<option value='"+k+"'>"+B[k].label+"</option>"}).join('');
   return list;
 }

 function fillVariants(keepSize,keepMilk){
   var k=q('base').value,d=B[k];if(!d)return;
   var sz=d.sizes||[],mk=d.milks||[];
   if(sz.length){q('sizewrap').className='BC-f';
     q('size').innerHTML=sz.map(function(s){return "<option value='"+s+"'>"+s+"</option>"}).join('');
     q('size').value=(sz.indexOf(keepSize)>-1?keepSize:(sz.indexOf('Grande')>-1?'Grande':sz[0]));
   } else if(q('sizewrap')){q('sizewrap').className='BC-f BC-hide';q('size').innerHTML=''}
   if(mk.length){q('milkwrap').className='BC-f';
     q('milk').innerHTML=mk.map(function(m){return "<option value='"+m+"'>"+(m==='Semi'?'Semi-skimmed':m+' milk')+"</option>"}).join('');
     q('milk').value=(mk.indexOf(keepMilk)>-1?keepMilk:(d.default_milk&&mk.indexOf(d.default_milk)>-1?d.default_milk:mk[0]));
   } else if(q('milkwrap')){q('milkwrap').className='BC-f BC-hide';q('milk').innerHTML=''}
 }

 function calc(){
   var k=q('base').value,d=B[k];if(!d){render([],q);return}
   var s=q('size')?q('size').value:'',m=q('milk')?q('milk').value:'';
   var v=d.v[vkey(s,m)];
   if(!v){ /* fall back to any variant that matches on the axis we do have */
     var alt=Object.keys(d.v).filter(function(x){
       var p=x.split('|');return (!s||p[0]===s||p[0]==='-')&&(!m||p[1]===m||p[1]==='-')});
     v=d.v[alt[0]]||d.v[Object.keys(d.v)[0]];
   }
   if(!v){render([],q);return}
   var label=d.label+(s?' ('+s+')':'')+(m&&m!=='Semi'?', '+m+' milk':'');
   render([{label:label,kcal:v.kcal,carb:v.carb,protein:v.protein,sugar:v.sugar,free:v.free,salt:v.salt,sat:v.sat,ing:v.ing||0,man:v.man||0,raw:v.raw||0}],q);
 }

 fillBases();
 if(sel&&sel.b&&B[sel.b]){
   if(q('cat')&&B[sel.b].cat){q('cat').value=B[sel.b].cat;fillBases()}
   q('base').value=sel.b;
 }
 fillVariants(sel&&sel.s,sel&&sel.m);

 if(q('cat'))q('cat').addEventListener('change',function(){fillBases();fillVariants();calc()});
 q('base').addEventListener('change',function(){fillVariants();calc()});
 ['size','milk','age','sex'].forEach(function(k){var e=q(k);if(e)e.addEventListener('change',calc)});
 R.addEventListener('change',function(e){if(e.target.getAttribute('data-b')==='size'||e.target.getAttribute('data-b')==='milk')calc()});
 calc();
}

/* ---------- loading ---------- */
var CACHE={};
function clean(t){ if(!t)return ''; t=String(t);
 var d=document.createElement('textarea');d.innerHTML=t;t=d.value;
 t=t.replace(/<br\s*\/?>/gi,'').replace(/<[^>]*>/g,'');
 d.innerHTML=t;t=d.value;
 var a=t.indexOf('{'),b=t.lastIndexOf('}');
 return a>=0&&b>a?t.slice(a,b+1):t.trim()}
function parseIt(t,where){ try{return JSON.parse(t)}catch(e){}
 var c=clean(t); try{return JSON.parse(c)}catch(e){
  throw new Error('the data in '+where+' is not valid JSON. It starts: '+c.slice(0,40))}}
function getDataset(name){
 if(CACHE[name])return CACHE[name];
 var inline=document.getElementById('boone-data-'+name);
 if(inline){try{CACHE[name]=Promise.resolve(parseIt(inline.textContent,'the page'));return CACHE[name]}catch(e){}}
 CACHE[name]=fetch('/datasets/'+name).then(function(r){return r.text()}).then(function(t){
  var d=document.createElement('div');d.innerHTML=t;
  var s=d.querySelector('[data-boone-dataset]');
  var raw=s?(s.textContent||s.innerHTML):'';
  if(!raw){var m=t.match(/data-boone-dataset[^>]*>([\s\S]*?)<\/script>/);raw=m?m[1]:''}
  if(!raw)throw new Error('no dataset found on /datasets/'+name);
  return parseIt(raw,'/datasets/'+name)});
 return CACHE[name]}
function pageSlug(){var p=location.pathname.replace(/\/+$/,'');return p.substring(p.lastIndexOf('/')+1)}
function msg(t){return "<p style='font-family:sans-serif;font-size:13px;color:#5a6b63;margin:1rem 0'>"+t+"</p>"}

function build(root,kind,D,defId,defSlot){
 D=expand(D);
 if(D&&D.drinks)return buildNested(root,D,{b:defId});
 return buildFlat(root,kind||'meal',D,defId,defSlot);
}

function mount(el){
 var ds=el.getAttribute('data-dataset');
 if(!ds||!ds.trim()||ds.indexOf('{')>-1||ds.indexOf('[')>-1){el.innerHTML='';return}
 el.innerHTML=msg('Loading the calculator...');
 getDataset(ds).then(function(D){
  D=expand(D);
  var nested=!!D.drinks;
  var slug=pageSlug();
  if(nested){
   var sel=(D.map&&D.map[slug])||null;
   if(!sel){
    var id=el.getAttribute('data-item');
    sel=id?{b:id}:null;
   }
   if(!sel){el.innerHTML=msg('This page is not in the '+ds+' dataset yet.');return}
   buildNested(el,D,sel);return;
  }
  var id2=el.getAttribute('data-item'),slot=el.getAttribute('data-slot'),kind=el.getAttribute('data-calc');
  if(!id2&&D.map){var m=D.map[slug];
   if(!m){el.innerHTML=msg('This page is not in the '+ds+' dataset yet.');return}
   id2=m.i;slot=m.s;kind=m.k}
  buildFlat(el,kind||'meal',D,id2,slot||'item')})
 .catch(function(e){el.innerHTML=msg('Could not load the '+ds+' dataset. '+e.message)})}

function initAll(){document.querySelectorAll('[data-boone-calc-mount]').forEach(function(el){
  if(el.getAttribute('data-boone-ready')==='1')return;
  el.setAttribute('data-boone-ready','1');mount(el)})}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',initAll)}else{initAll()}
window.addEventListener('load',initAll);

return {build:build,mount:mount,getDataset:getDataset};})();
