"use strict";(self.webpackChunk_teamhanko_docs=self.webpackChunk_teamhanko_docs||[]).push([[569],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),m=i,f=p["".concat(s,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(f,o(o({ref:t},u),{},{components:n})):r.createElement(f,o({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var c=2;c<a;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6525:(e,t,n)=>{n.d(t,{Z:()=>w});var r=n(7294),i=n(6010),a=n(3438),o=n(9960),l=n(3919),s=n(5999),c=n(4996);const u="cardContainer_S8oU",d="cardTitle_HoSo",p="cardDescription_c27F",m="cardIcon_whke";function f(e){let{href:t,children:n}=e;return r.createElement(o.Z,{href:t,className:(0,i.Z)("card padding--lg",u)},n)}function h(e){let{href:t,icon:n,title:a,description:o,showDescription:l}=e;return r.createElement(f,{href:t},r.createElement("h2",{className:(0,i.Z)("text--truncate",d),title:a},n," ",a),o&&l&&r.createElement("p",{className:(0,i.Z)("text--truncate",p),title:o},o))}function g(e){var t;let{item:n}=e;const i=(0,a.Wl)(n);if(!i)return null;const o=r.createElement(b,{item:n});return r.createElement(h,{href:i,icon:o,title:n.label,description:(0,s.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:n.items.length}),showDescription:!(null==(t=n.customProps)||!t.docCardShowDescription)})}function y(e){var t;let{item:n}=e;const i=r.createElement(b,{item:n}),o=(0,a.xz)(n.docId??void 0);return r.createElement(h,{href:n.href,icon:i,title:n.label,description:null==o?void 0:o.description,showDescription:!(null==(t=n.customProps)||!t.docCardShowDescription)})}function k(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(y,{item:t});case"category":return r.createElement(g,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function b(e){var t;let n,{item:i}=e;if(null!=(t=i.customProps)&&t.docCardIconName){const e=i.customProps.docCardIconName;n=r.createElement("img",{alt:`${e} icon`,src:(0,c.Z)(`/img/icons/${e}.svg`)})}else n="category"===i.type?"\ud83d\uddc3\ufe0f":(0,l.Z)(i.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17";return r.createElement("div",{className:m},n)}function v(e){let{className:t}=e;const n=(0,a.jA)();return r.createElement(w,{items:n.items,className:t})}function w(e){const{items:t,className:n}=e;if(!t)return r.createElement(v,e);const o=(0,a.MN)(t);return r.createElement("section",{className:(0,i.Z)("row",n)},o.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(k,{item:e})))))}},4618:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var r=n(7462),i=(n(7294),n(3905)),a=n(6525);const o={title:"Social Login",sidebar_label:"Social Login",keywords:["social login","hanko"]},l=void 0,s={unversionedId:"guides/social/index",id:"guides/social/index",title:"Social Login",description:"Social Login allows using existing credentials from a third party provider (like",source:"@site/docs/guides/social/index.mdx",sourceDirName:"guides/social",slug:"/guides/social/",permalink:"/guides/social/",draft:!1,tags:[],version:"current",frontMatter:{title:"Social Login",sidebar_label:"Social Login",keywords:["social login","hanko"]},sidebar:"docs",previous:{title:"Mobile guide (Beta)",permalink:"/guides/mobile_guide"},next:{title:"GitHub",permalink:"/guides/social/github"}},c={},u=[{value:"Before you get started",id:"before-you-get-started",level:2},{value:"Available providers",id:"available-providers",level:2},{value:"Limitations",id:"limitations",level:2}],d={toc:u};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Social Login allows using existing credentials from a third party provider (like\nGoogle or GitHub) to sign in to a third party website instead of explicitly creating a new account and new credentials\non that website. This simplifies registrations and logins for end users."),(0,i.kt)("h2",{id:"before-you-get-started"},"Before you get started"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"If you plan on using Hanko Cloud, you need a ",(0,i.kt)("a",{parentName:"li",href:"https://cloud.hanko.io"},"Hanko Cloud Console")," account.",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Once signed in, create an ",(0,i.kt)("inlineCode",{parentName:"li"},"Organization"),"."),(0,i.kt)("li",{parentName:"ul"},"In your organization, create a new ",(0,i.kt)("inlineCode",{parentName:"li"},"Project"),". All third party provider settings are done on the project level."))),(0,i.kt)("li",{parentName:"ul"},"If you plan on self-hosting, you need to have a running instance of the ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/teamhanko/hanko/tree/main/backend#hanko-backend"},"Hanko API"),"."),(0,i.kt)("li",{parentName:"ul"},"If you prefer a prebuilt UI, then the easiest way to integrate Hanko social logins in your frontend app is to use the\n",(0,i.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@teamhanko/hanko-elements"},(0,i.kt)("inlineCode",{parentName:"a"},"@teamhanko/hanko-elements")),"\nweb components. If you want to build your own UI, you can use the\n",(0,i.kt)("a",{parentName:"li",href:"https://www.npmjs.com/package/@teamhanko/hanko-frontend-sdk"},(0,i.kt)("inlineCode",{parentName:"a"},"@teamhanko/hanko-frontend-sdk")),". Learn more about frontend\napp integration in the provider specific guides below.")),(0,i.kt)("h2",{id:"available-providers"},"Available providers"),(0,i.kt)("p",null,"Get started with your favourite third party provider:"),(0,i.kt)(a.Z,{mdxType:"DocCardList"}),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"We're working on adding support for more providers, stay tuned!")),(0,i.kt)("h2",{id:"limitations"},"Limitations"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Social logins currently mainly target classic web applications (as opposed to, e.g. native mobile apps) and use\nthe OAuth ",(0,i.kt)("a",{parentName:"li",href:"https://www.rfc-editor.org/rfc/rfc6749#section-1.3.1"},"authorization code flow"),"."),(0,i.kt)("li",{parentName:"ul"},"Sign up with a third party provider is only allowed if the email address used with the provider is not also\nused by an existing Hanko user."),(0,i.kt)("li",{parentName:"ul"},"Only one third party provider can be linked to a Hanko user."),(0,i.kt)("li",{parentName:"ul"},"Requesting additional OAuth scopes with a provider is not possible.")))}p.isMDXComponent=!0}}]);