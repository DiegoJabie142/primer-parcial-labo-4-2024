import{a as y}from"./chunk-LFCTIJXA.js";import{a as D}from"./chunk-PUTQHCAL.js";import"./chunk-2HDYPOS6.js";import{a as b,b as x,f as S}from"./chunk-SQKK5MZI.js";import"./chunk-77IT2KEC.js";import{$a as s,Ga as l,Ia as r,Ja as m,Rb as C,Xa as f,db as t,eb as n,fb as p,ha as u,ib as v,kb as h,rb as a,sb as d,wb as g}from"./chunk-77DZ2PKD.js";function I(o,i){if(o&1&&(t(0,"div",3),p(1,"img",4),t(2,"div",5)(3,"h5",6),a(4),n(),t(5,"p",7),a(6),n(),t(7,"a",8),a(8,"Go to Profile"),n()()()),o&2){let e=h();r(),s("src",e.userData.avatar_url,l),r(3),d(e.userData.name),r(2),d(e.userData.bio),r(),s("href",e.userData.html_url,l)}}var _=class o{constructor(i,e,c){this.http=i;this.authService=e;this.router=c}userData;ngOnInit(){this.getUserData()}getUserData(){this.http.get("https://api.github.com/users/diegojabie142").subscribe(e=>{this.userData=e})}onLogout(){this.authService.logout().then(()=>{console.log("Sesi\xF3n cerrada exitosamente."),this.router.navigate(["/Login"])}).catch(i=>{console.error("Error al cerrar sesi\xF3n:",i)})}static \u0275fac=function(e){return new(e||o)(m(b),m(D),m(S))};static \u0275cmp=u({type:o,selectors:[["app-home"]],standalone:!0,features:[g],decls:5,vars:1,consts:[[1,"d-flex","justify-content-center","align-items-center",2,"height","100vh"],["class","card","style","width: 18rem;",4,"ngIf"],[3,"click"],[1,"card",2,"width","18rem"],["alt","Profile image",1,"card-img-top",3,"src"],[1,"card-body"],[1,"card-title"],[1,"card-text"],["target","_blank",1,"btn","btn-primary",3,"href"]],template:function(e,c){e&1&&(p(0,"app-nav"),t(1,"div",0),f(2,I,9,4,"div",1),n(),t(3,"button",2),v("click",function(){return c.onLogout()}),a(4,"Cerrar sesi\xF3n"),n()),e&2&&(r(2),s("ngIf",c.userData))},dependencies:[C,x,y]})};export{_ as HomeComponent};
