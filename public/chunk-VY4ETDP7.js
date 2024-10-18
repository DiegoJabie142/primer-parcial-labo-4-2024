import{a as I,b as k,c,d as q,e as V,f as j,g as G,h as L,i as M,m as O,n as R,o as $}from"./chunk-UUFDLWEU.js";import{a as B}from"./chunk-LFCTIJXA.js";import{a as z}from"./chunk-PUTQHCAL.js";import"./chunk-2HDYPOS6.js";import"./chunk-77IT2KEC.js";import{$a as d,Ga as A,Ia as a,Ja as _,Qb as w,Rb as D,Xa as p,db as i,eb as e,fb as m,gb as N,ha as C,ib as f,kb as P,nb as T,pa as F,qa as E,rb as o,sb as y,wa as x,wb as b}from"./chunk-77DZ2PKD.js";function J(r,t){if(r&1){let n=N();i(0,"li",5),f("click",function(){let s=F(n).$implicit,u=P();return E(u.onCountryClick(s.name))}),i(1,"div",6),m(2,"img",7),i(3,"h6",8),o(4),e()(),i(5,"small",9),o(6,"South American Country"),e()()}if(r&2){let n=t.$implicit;a(2),T("alt","",n.name," flag"),d("src",n.flag,A),a(2),y(n.name)}}var S=class r{southAmericanCountries=[];countrySelected=new x;constructor(){}ngOnInit(){this.getSouthAmericanCountries()}getSouthAmericanCountries(){fetch("https://restcountries.com/v3.1/all").then(t=>{if(!t.ok)throw new Error(`Error: ${t.status}`);return t.json()}).then(t=>{this.southAmericanCountries=t.filter(n=>n.subregion==="South America").map(n=>({name:n.name.common,flag:n.flags.png}))}).catch(t=>{console.error(t)})}onCountryClick(t){this.countrySelected.emit(t)}static \u0275fac=function(n){return new(n||r)};static \u0275cmp=C({type:r,selectors:[["app-tabla-paises"]],outputs:{countrySelected:"countrySelected"},standalone:!0,features:[b],decls:7,vars:2,consts:[[1,"d-flex","justify-content-between","align-items-center","mb-3"],[1,"text-primary"],[1,"badge","bg-primary","rounded-pill"],[1,"list-group","mb-3"],["class","list-group-item d-flex justify-content-between lh-sm",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item","d-flex","justify-content-between","lh-sm",3,"click"],[1,"d-flex","align-items-center"],[2,"width","40px","height","30px","margin-right","10px",3,"src","alt"],[1,"my-0"],[1,"text-muted"]],template:function(n,l){n&1&&(i(0,"h4",0)(1,"span",1),o(2,"Lista de pa\xEDses"),e(),i(3,"span",2),o(4),e()(),i(5,"ul",3),p(6,J,7,4,"li",4),e()),n&2&&(a(4),y(l.southAmericanCountries.length),a(2),d("ngForOf",l.southAmericanCountries))},dependencies:[w]})};function K(r,t){r&1&&(i(0,"div",29),o(1," Valid first name is required. "),e())}function Q(r,t){r&1&&(i(0,"div",29),o(1," Por favor indicar un n\xFAmero de documento v\xE1lido. "),e())}function W(r,t){r&1&&(i(0,"div",29),o(1," Por favor indicar una edad v\xE1lida. "),e())}function X(r,t){r&1&&(i(0,"div",29),o(1," Por favor indicar un n\xFAmero de documento v\xE1lido. "),e())}function Y(r,t){r&1&&(i(0,"div",29),o(1," Por favor seleccionar un pa\xEDs v\xE1lido. "),e())}var U=class r{constructor(t,n){this.fb=t;this.firestoreService=n}choferForm;selectedCountry="";ngOnInit(){this.choferForm=this.fb.group({nombre:["",[c.required,c.pattern(/^[a-zA-Z\s]*$/)]],documento:["",[c.required,c.minLength(8),c.maxLength(8)]],licencia:["",[c.required,c.minLength(7)]],edad:["",[c.required,c.min(1)]],pais:[{value:"",disabled:!0},c.required],licenciaProfesional:[!1]})}onCountrySelected(t){this.selectedCountry=t,this.choferForm.patchValue({pais:t})}guardarChofer(){if(this.choferForm.valid){let t=this.choferForm.getRawValue();console.log("Datos del chofer:",t),this.firestoreService.guardarChofer(t)}else console.log("Formulario inv\xE1lido")}static \u0275fac=function(n){return new(n||r)(_(R),_(z))};static \u0275cmp=C({type:r,selectors:[["app-alta-chofer"]],standalone:!0,features:[b],decls:49,vars:6,consts:[[1,"bg-light"],[1,"container"],[1,"py-5","text-center"],[1,"lead"],[1,"row","g-5"],[1,"col-md-5","col-lg-4","order-md-last"],[3,"countrySelected"],[1,"col-md-7","col-lg-8"],[1,"mb-3"],["novalidate","",1,"needs-validation",3,"ngSubmit","formGroup"],[1,"row","g-3"],[1,"col-sm-12"],["for","nombre",1,"form-label"],["type","text","id","nombre","formControlName","nombre","required","",1,"form-control"],["class","invalid-feedback",4,"ngIf"],[1,"col-12"],["for","documento",1,"form-label"],["type","number","id","documento","formControlName","documento","placeholder","Ejemplo: 42598325","required","",1,"form-control"],["for","edad",1,"form-label"],["type","number","id","edad","formControlName","edad","placeholder","Ejemplo: 24","required","",1,"form-control"],["for","licencia",1,"form-label"],["type","number","id","licencia","formControlName","licencia","placeholder","Ejemplo: 42598325","required","",1,"form-control"],[1,"col-12","form-check"],["type","checkbox","id","licenciaProfesional","formControlName","licenciaProfesional",1,"form-check-input"],["for","licenciaProfesional",1,"form-check-label"],["for","pais",1,"form-label"],["type","text","id","pais","formControlName","pais","placeholder","Seleccionar un pa\xEDs","required","","readonly","",1,"form-control"],[1,"my-4"],["type","submit",1,"w-100","btn","btn-primary","btn-lg"],[1,"invalid-feedback"]],template:function(n,l){if(n&1&&(m(0,"app-nav"),i(1,"body",0)(2,"div",1)(3,"main")(4,"div",2)(5,"h2"),o(6,"Formulario de Alta Chofer"),e(),i(7,"p",3),o(8,"Rellene los campos con la informaci\xF3n del Chofer"),e()(),i(9,"div",4)(10,"div",5)(11,"app-tabla-paises",6),f("countrySelected",function(u){return l.onCountrySelected(u)}),e()(),i(12,"div",7)(13,"h4",8),o(14,"Datos del Chofer"),e(),i(15,"form",9),f("ngSubmit",function(){return l.guardarChofer()}),i(16,"div",10)(17,"div",11)(18,"label",12),o(19,"Nombre"),e(),m(20,"input",13),p(21,K,2,0,"div",14),e(),i(22,"div",15)(23,"label",16),o(24,"N\xFAmero de documento"),e(),m(25,"input",17),p(26,Q,2,0,"div",14),e(),i(27,"div",15)(28,"label",18),o(29,"Edad"),e(),m(30,"input",19),p(31,W,2,0,"div",14),e(),i(32,"div",15)(33,"label",20),o(34,"N\xFAmero de licencia"),e(),m(35,"input",21),p(36,X,2,0,"div",14),e(),i(37,"div",22),m(38,"input",23),i(39,"label",24),o(40," Licencia Profesional "),e()(),i(41,"div",15)(42,"label",25),o(43,"Pa\xEDs"),e(),m(44,"input",26),p(45,Y,2,0,"div",14),e()(),m(46,"hr",27),i(47,"button",28),o(48,"Dar de alta al chofer"),e()()()()()()()),n&2){let s,u,h,g,v;a(15),d("formGroup",l.choferForm),a(6),d("ngIf",((s=l.choferForm.get("nombre"))==null?null:s.invalid)&&((s=l.choferForm.get("nombre"))==null?null:s.touched)),a(5),d("ngIf",((u=l.choferForm.get("documento"))==null?null:u.invalid)&&((u=l.choferForm.get("documento"))==null?null:u.touched)),a(5),d("ngIf",((h=l.choferForm.get("edad"))==null?null:h.invalid)&&((h=l.choferForm.get("edad"))==null?null:h.touched)),a(5),d("ngIf",((g=l.choferForm.get("licencia"))==null?null:g.invalid)&&((g=l.choferForm.get("licencia"))==null?null:g.touched)),a(9),d("ngIf",((v=l.choferForm.get("pais"))==null?null:v.invalid)&&((v=l.choferForm.get("pais"))==null?null:v.touched))}},dependencies:[$,j,k,G,I,q,V,O,L,M,D,S,B]})};export{U as AltaChoferComponent};
