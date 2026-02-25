import{o as H,c as J,a,b as d,f as P,u as p,n as Z,d as _,t as ee,r as m,e as te,g as V,h as ne}from"./vue.esm-bundler---ZXwWOj.js";import{u as se,R as oe}from"./index-DRYZ2iuB.js";import{_ as K,s as I,a as B,b as ae,l as re}from"./auth-xUViAsM_.js";import{w as W,u as x}from"./index-BoMSYY0t.js";const le={class:"login-card card"},ie={class:"field"},ce={class:"input-wrapper"},ue={class:"field"},de={class:"input-wrapper"},pe=["aria-label"],z={__name:"LoginForm",emits:["login"],setup(r,{expose:s,emit:g}){const l=g,t=te({userName:"",password:""}),c=m(!1),n=m(""),i=m(!1),b=u=>u&&u.length>0&&/^[\x00-\x7F]+$/.test(u);function N(u,e){const o=u.target.value,E=o.replace(/[^\x00-\x7F]/g,"");E!==o&&(t[e]=E,u.target.value=E)}function Q(){c.value=!c.value}function X(){return!t.userName||!t.password?(n.value="Vui lòng nhập đầy đủ thông tin",i.value=!0,!1):t.userName.length>20?(n.value="Email không được quá 20 ký tự",i.value=!0,!1):b(t.userName)?t.password.length<6?(n.value="Mật khẩu phải có ít nhất 6 ký tự",i.value=!0,!1):t.password.length>15?(n.value="Mật khẩu không được quá 15 ký tự",i.value=!0,!1):b(t.password)?!0:(n.value="Mật khẩu không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode",i.value=!0,!1):(n.value="Email không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode",i.value=!0,!1)}function L(){X()&&l("login",{userName:t.userName,password:t.password})}s({showError:Y});function Y(u){n.value=u,i.value=!0}return(u,e)=>(H(),J("div",le,[e[8]||(e[8]=a("h2",{style:{margin:"8px 0 16px","text-align":"center"}},"Sign in",-1)),a("div",ie,[a("div",ce,[e[6]||(e[6]=a("i",{class:"pi pi-user input-icon"},null,-1)),d(p(I),{modelValue:t.userName,"onUpdate:modelValue":e[0]||(e[0]=o=>t.userName=o),type:"text",placeholder:"E-mail address",maxlength:20,autocomplete:"username",onKeydown:P(L,["enter"]),onInput:e[1]||(e[1]=o=>N(o,"userName")),class:"input-with-icon"},null,8,["modelValue"])])]),a("div",ue,[a("div",de,[e[7]||(e[7]=a("i",{class:"pi pi-lock input-icon"},null,-1)),d(p(I),{modelValue:t.password,"onUpdate:modelValue":e[2]||(e[2]=o=>t.password=o),type:c.value?"text":"password",placeholder:"Password",maxlength:15,autocomplete:"current-password",onKeydown:P(L,["enter"]),onInput:e[3]||(e[3]=o=>N(o,"password")),class:"input-with-icon"},null,8,["modelValue","type"]),a("button",{type:"button",class:"password-toggle",onClick:Q,"aria-label":c.value?"Ẩn mật khẩu":"Hiện mật khẩu"},[a("i",{class:Z(c.value?"pi pi-eye-slash":"pi pi-eye")},null,2)],8,pe)])]),d(p(B),{label:"Login",onClick:L,class:"login-button"}),d(p(ae),{visible:i.value,"onUpdate:visible":e[5]||(e[5]=o=>i.value=o),modal:"",header:"Message",style:{width:"420px"},closable:!0},{footer:_(()=>[d(p(B),{label:"Ok",icon:"pi pi-check",onClick:e[4]||(e[4]=o=>i.value=!1),class:"p-button-text"})]),default:_(()=>[a("p",null,ee(n.value),1)]),_:1},8,["visible"])]))}},me=K(z,[["__scopeId","data-v-c494ead7"]]);z.__docgenInfo={exportName:"default",displayName:"LoginForm",description:"",tags:{},expose:[{name:"showError"}],events:[{name:"login"}],sourceFiles:["C:/Users/dodod/OneDrive/Documents/Development/Java_Train-FE/src/components/LoginForm.vue"]};const f=m(!1),v=m(null),ge=()=>{const r=l=>{f.value=!0,v.value=l,localStorage.setItem("isAuthenticated","true"),localStorage.setItem("user",JSON.stringify(l))},s=()=>{f.value=!1,v.value=null,localStorage.removeItem("isAuthenticated"),localStorage.removeItem("user")},g=()=>{const l=localStorage.getItem("isAuthenticated"),t=localStorage.getItem("user");l==="true"&&t&&(f.value=!0,v.value=JSON.parse(t))};return{isAuthenticated:V(()=>f.value),user:V(()=>v.value?v.value.userName:null),loginSaved:r,logout:s,checkAuth:g}},ve={class:"auth-wrapper"},he={class:"register-box card"},G={__name:"ScreenLogin",setup(r){const s=se(),g=ge(),l=m(null);async function t(c){try{const n=await re(c.userName,c.password);n.status==200?(g.loginSaved(n.data),s.push("/list")):l.value.showError(n.message||"Login failed. Please try again.")}catch{l.value.showError("An error occurred during login. Please try again.")}}return(c,n)=>(H(),J("div",ve,[d(me,{ref_key:"loginFormRef",ref:l,onLogin:t},null,512),a("div",he,[n[1]||(n[1]=a("span",{class:"hint"},"Don't have an account? ",-1)),d(p(oe),{to:"/register",class:"link"},{default:_(()=>[...n[0]||(n[0]=[ne("Register",-1)])]),_:1})])]))}},h=K(G,[["__scopeId","data-v-7f850ec7"]]);G.__docgenInfo={exportName:"default",displayName:"ScreenLogin",description:"",tags:{},sourceFiles:["C:/Users/dodod/OneDrive/Documents/Development/Java_Train-FE/src/views/ScreenLogin.vue"]};const ke={title:"Views/ScreenLogin",component:h,parameters:{docs:{description:{component:"Màn hình Login chạy cô lập trong Storybook với PrimeVue và router bộ nhớ."}},layout:"centered"}},w={render:()=>({components:{ScreenLogin:h},template:"<ScreenLogin />"})},y={render:()=>({components:{ScreenLogin:h},template:"<ScreenLogin />",mounted(){const r=this.$el.querySelector('input[placeholder="E-mail address"]'),s=this.$el.querySelector('input[placeholder="Password"]');r&&(r.value="john@doe.com"),s&&(s.value="secret123")}})},S={render:()=>({components:{ScreenLogin:h},template:"<ScreenLogin />"}),play:async({canvasElement:r})=>{const s=W(r);await x.type(s.getByPlaceholderText("E-mail address"),"john@doe.com"),await x.type(s.getByPlaceholderText("Password"),"secret123"),await x.click(s.getByRole("button",{name:/Hiện mật khẩu/i}))}},k={render:()=>({components:{ScreenLogin:h},template:"<ScreenLogin />"}),play:async({canvasElement:r})=>{const s=W(r);await x.click(s.getByRole("button",{name:/login/i}))}};var F,$,R;w.parameters={...w.parameters,docs:{...(F=w.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenLogin
    },
    template: '<ScreenLogin />'
  })
}`,...(R=($=w.parameters)==null?void 0:$.docs)==null?void 0:R.source}}};var A,D,T;y.parameters={...y.parameters,docs:{...(A=y.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenLogin
    },
    template: '<ScreenLogin />',
    mounted() {
      // Điền sẵn dữ liệu để mô phỏng state đã nhập
      const email = this.$el.querySelector('input[placeholder="E-mail address"]') as HTMLInputElement | null;
      const pass = this.$el.querySelector('input[placeholder="Password"]') as HTMLInputElement | null;
      if (email) email.value = 'john@doe.com';
      if (pass) pass.value = 'secret123';
    }
  })
}`,...(T=(D=y.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var M,O,U;S.parameters={...S.parameters,docs:{...(M=S.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenLogin
    },
    template: '<ScreenLogin />'
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByPlaceholderText('E-mail address'), 'john@doe.com');
    await userEvent.type(c.getByPlaceholderText('Password'), 'secret123');
    await userEvent.click(c.getByRole('button', {
      name: /Hiện mật khẩu/i
    }));
  }
}`,...(U=(O=S.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var C,j,q;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenLogin
    },
    template: '<ScreenLogin />'
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', {
      name: /login/i
    }));
  }
}`,...(q=(j=k.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};const xe=["Default","WithPrefilled","ShowPassword","ValidationErrors"];export{w as Default,S as ShowPassword,k as ValidationErrors,y as WithPrefilled,xe as __namedExportsOrder,ke as default};
