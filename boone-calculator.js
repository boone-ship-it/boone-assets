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
  render(out,q)}
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
 if(D&&D.drinks)return buildNested(root,D,{b:defId});
 return buildFlat(root,kind||'meal',D,defId,defSlot);
}

function mount(el){
 var ds=el.getAttribute('data-dataset');
 if(!ds||!ds.trim()||ds.indexOf('{')>-1||ds.indexOf('[')>-1){el.innerHTML='';return}
 el.innerHTML=msg('Loading the calculator...');
 getDataset(ds).then(function(D){
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
