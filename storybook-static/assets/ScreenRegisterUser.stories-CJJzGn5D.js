import{o as A,c as G,a as o,b as d,u as g,n as U,d as T,t as X,r as h,e as Y}from"./vue.esm-bundler---ZXwWOj.js";import{u as Z}from"./index-DRYZ2iuB.js";import{_ as J,s as R,a as S,b as ee,r as te}from"./auth-xUViAsM_.js";import{w as B,u as c}from"./index-BoMSYY0t.js";const se={class:"register-card card"},re={class:"field"},ae={class:"field"},ne={class:"input-wrapper"},oe={class:"field"},le={class:"input-wrapper"},ie={class:"actions-right"},W={__name:"RegisterForm",emits:["register","back"],setup(u,{expose:r,emit:p}){const w=p,t=Y({userName:"",password:"",password2:""}),m=h(!1),i=h(!1),n=h(""),a=h(!1),x=l=>/^[\x00-\x7F]*$/.test(l);function P(l,e){const s=l.target.value,E=s.replace(/[^\x00-\x7F]/g,"");E!==s&&(t[e]=E,l.target.value=E)}function H(){return!t.userName||!t.password||!t.password2?(n.value="Vui lòng nhập đầy đủ thông tin",a.value=!0,!1):t.userName.length>20?(n.value="Email không được quá 20 ký tự",a.value=!0,!1):x(t.userName)?t.password.length<6?(n.value="Mật khẩu phải có ít nhất 6 ký tự",a.value=!0,!1):t.password.length>15?(n.value="Mật khẩu không được quá 15 ký tự",a.value=!0,!1):x(t.password)?t.password2.length<6?(n.value="Mật khẩu xác nhận phải có ít nhất 6 ký tự",a.value=!0,!1):t.password2.length>15?(n.value="Mật khẩu xác nhận không được quá 15 ký tự",a.value=!0,!1):x(t.password2)?t.password!==t.password2?(n.value="Mật khẩu xác nhận không khớp",a.value=!0,!1):!0:(n.value="Mật khẩu xác nhận không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode",a.value=!0,!1):(n.value="Mật khẩu không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode",a.value=!0,!1):(n.value="Email không được chứa ký tự tiếng Việt có dấu, emoji hoặc ký tự đặc biệt Unicode",a.value=!0,!1)}function L(){H()&&w("register",{userName:t.userName,password:t.password,confirmPassword:t.password2})}r({showError:K,showSuccess:Q});function K(l){n.value=l,a.value=!0}function Q(l){n.value=l,a.value=!0}return(l,e)=>(A(),G("div",se,[e[11]||(e[11]=o("h2",{class:"title"},"REGISTER",-1)),o("div",re,[d(g(R),{modelValue:t.userName,"onUpdate:modelValue":e[0]||(e[0]=s=>t.userName=s),type:"text",placeholder:"Email",maxlength:20,autocomplete:"username",onInput:e[1]||(e[1]=s=>P(s,"userName")),class:"w-full"},null,8,["modelValue"])]),o("div",ae,[o("div",ne,[d(g(R),{modelValue:t.password,"onUpdate:modelValue":e[2]||(e[2]=s=>t.password=s),type:m.value?"text":"password",placeholder:"Password",maxlength:15,autocomplete:"new-password",onInput:e[3]||(e[3]=s=>P(s,"password")),class:"w-full"},null,8,["modelValue","type"]),o("button",{type:"button",class:"password-toggle",onClick:e[4]||(e[4]=s=>m.value=!m.value)},[o("i",{class:U(m.value?"pi pi-eye-slash":"pi pi-eye")},null,2)])])]),o("div",oe,[o("div",le,[d(g(R),{modelValue:t.password2,"onUpdate:modelValue":e[5]||(e[5]=s=>t.password2=s),type:i.value?"text":"password",placeholder:"Confirm Password",maxlength:15,autocomplete:"new-password",onInput:e[6]||(e[6]=s=>P(s,"password2")),class:"w-full"},null,8,["modelValue","type"]),o("button",{type:"button",class:"password-toggle",onClick:e[7]||(e[7]=s=>i.value=!i.value)},[o("i",{class:U(i.value?"pi pi-eye-slash":"pi pi-eye")},null,2)])])]),o("div",ie,[d(g(S),{label:"Back",class:"back-button",onClick:e[8]||(e[8]=s=>l.$emit("back"))}),d(g(S),{label:"REGISTER",class:"register-button",onClick:L})]),d(g(ee),{visible:a.value,"onUpdate:visible":e[10]||(e[10]=s=>a.value=s),modal:"",header:"Message",style:{width:"420px"},closable:!0},{footer:T(()=>[d(g(S),{label:"Ok",icon:"pi pi-check",onClick:e[9]||(e[9]=s=>a.value=!1),class:"p-button-text"})]),default:T(()=>[o("p",null,X(n.value),1)]),_:1},8,["visible"])]))}},ce=J(W,[["__scopeId","data-v-1b0d10b7"]]);W.__docgenInfo={exportName:"default",displayName:"RegisterForm",description:"",tags:{},expose:[{name:"showError"},{name:"showSuccess"}],events:[{name:"back"},{name:"register"}],sourceFiles:["C:/Users/dodod/OneDrive/Documents/Development/Java_Train-FE/src/components/RegisterForm.vue"]};const ue={class:"auth-wrapper"},z={__name:"ScreenRegisterUser",setup(u){const r=Z(),p=h(null);function w(){r.push("/login")}async function t(m){try{const i=await te(m);i.status===200?(p.value.showSuccess("Đăng ký thành công!"),setTimeout(()=>{r.push("/login")},1500)):p.value.showError(i.message||"Đăng ký thất bại. Vui lòng thử lại.")}catch{p.value.showError("Đăng ký thất bại. Vui lòng thử lại.")}}return(m,i)=>(A(),G("div",ue,[d(ce,{ref_key:"registerFormRef",ref:p,onRegister:t,onBack:w},null,512)]))}},v=J(z,[["__scopeId","data-v-5272b6ea"]]);z.__docgenInfo={exportName:"default",displayName:"ScreenRegisterUser",description:"",tags:{},sourceFiles:["C:/Users/dodod/OneDrive/Documents/Development/Java_Train-FE/src/views/ScreenRegisterUser.vue"]};const we={title:"Views/ScreenRegisterUser",component:v,parameters:{docs:{description:{component:"Màn hình Register chạy cô lập trong Storybook với PrimeVue và router bộ nhớ."}},layout:"centered"}},f={render:()=>({components:{ScreenRegisterUser:v},template:"<ScreenRegisterUser />"})},y={render:()=>({components:{ScreenRegisterUser:v},template:"<ScreenRegisterUser />"}),play:async({canvasElement:u})=>{const r=B(u);await c.type(r.getByPlaceholderText("Email"),"john@doe.com"),await c.type(r.getByPlaceholderText("Password"),"secret123"),await c.type(r.getByPlaceholderText("Confirm Password"),"secret123")}},k={render:()=>({components:{ScreenRegisterUser:v},template:"<ScreenRegisterUser />"}),play:async({canvasElement:u})=>{const r=B(u);await c.type(r.getByPlaceholderText("Email"),"john@doe.com"),await c.type(r.getByPlaceholderText("Password"),"secret123"),await c.type(r.getByPlaceholderText("Confirm Password"),"secret456"),await c.click(r.getByRole("button",{name:/register/i}))}},b={render:()=>({components:{ScreenRegisterUser:v},template:"<ScreenRegisterUser />"}),play:async({canvasElement:u})=>{const r=B(u);await c.type(r.getByPlaceholderText("Password"),"secret123"),await c.type(r.getByPlaceholderText("Confirm Password"),"secret123"),u.querySelectorAll("button.password-toggle").forEach(w=>w.click())}};var _,V,C;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenRegisterUser
    },
    template: '<ScreenRegisterUser />'
  })
}`,...(C=(V=f.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var N,M,F;y.parameters={...y.parameters,docs:{...(N=y.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenRegisterUser
    },
    template: '<ScreenRegisterUser />'
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByPlaceholderText('Email'), 'john@doe.com');
    await userEvent.type(c.getByPlaceholderText('Password'), 'secret123');
    await userEvent.type(c.getByPlaceholderText('Confirm Password'), 'secret123');
  }
}`,...(F=(M=y.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var $,D,I;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenRegisterUser
    },
    template: '<ScreenRegisterUser />'
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByPlaceholderText('Email'), 'john@doe.com');
    await userEvent.type(c.getByPlaceholderText('Password'), 'secret123');
    await userEvent.type(c.getByPlaceholderText('Confirm Password'), 'secret456');
    await userEvent.click(c.getByRole('button', {
      name: /register/i
    }));
  }
}`,...(I=(D=k.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var j,O,q;b.parameters={...b.parameters,docs:{...(j=b.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ScreenRegisterUser
    },
    template: '<ScreenRegisterUser />'
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    // Bấm 2 nút mắt cho password và confirm password
    await userEvent.type(c.getByPlaceholderText('Password'), 'secret123');
    await userEvent.type(c.getByPlaceholderText('Confirm Password'), 'secret123');
    const buttons = canvasElement.querySelectorAll('button.password-toggle');
    buttons.forEach(btn => (btn as HTMLButtonElement).click());
  }
}`,...(q=(O=b.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};const he=["Default","WithPrefilled","PasswordMismatch","TogglePasswordVisibility"];export{f as Default,k as PasswordMismatch,b as TogglePasswordVisibility,y as WithPrefilled,he as __namedExportsOrder,we as default};
