import{a as x,b as C,f as y}from"./chunk-SDJJOXER.js";import{c as D}from"./chunk-XK32XS4O.js";import"./chunk-KOCIBSW2.js";import{Ia as c,Ka as i,La as n,Wb as g,Za as u,bb as s,fb as r,gb as a,hb as f,ja as d,mb as v,ub as m,vb as p,yb as h}from"./chunk-HYXEKGSD.js";function b(o,t){if(o&1&&(r(0,"div",2),f(1,"img",3),r(2,"div",4)(3,"h5",5),m(4),a(),r(5,"p",6),m(6),a(),r(7,"a",7),m(8,"Go to Profile"),a()()()),o&2){let e=v();i(),s("src",e.userData.avatar_url,c),i(3),p(e.userData.name),i(2),p(e.userData.bio),i(),s("href",e.userData.html_url,c)}}var S=class o{constructor(t,e,l){this.http=t;this.authService=e;this.router=l}userData;ngOnInit(){this.getUserData()}getUserData(){this.http.get("https://api.github.com/users/diegojabie142").subscribe(e=>{this.userData=e})}onLogout(){this.authService.logout().then(()=>{console.log("Sesi\xF3n cerrada exitosamente."),this.router.navigate(["/Login"])}).catch(t=>{console.error("Error al cerrar sesi\xF3n:",t)})}static \u0275fac=function(e){return new(e||o)(n(x),n(D),n(y))};static \u0275cmp=d({type:o,selectors:[["app-home"]],standalone:!0,features:[h],decls:2,vars:1,consts:[[1,"d-flex","justify-content-center","align-items-center",2,"height","100vh"],["class","card","style","width: 18rem;",4,"ngIf"],[1,"card",2,"width","18rem"],["alt","Profile image",1,"card-img-top",3,"src"],[1,"card-body"],[1,"card-title"],[1,"card-text"],["target","_blank",1,"btn","btn-primary",3,"href"]],template:function(e,l){e&1&&(r(0,"div",0),u(1,b,9,4,"div",1),a()),e&2&&(i(),s("ngIf",l.userData))},dependencies:[g,C]})};export{S as HomeComponent};