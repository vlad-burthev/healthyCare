import{r as s,j as t,l as x}from"./index-d4c46eb0.js";import{C as j,M as P}from"./MyInput-77183f57.js";import{A as S,U}from"./UserList-57482c60.js";import{u as _}from"./DelateBtn-ab931404.js";import{a as g}from"./Main-b11b10bd.js";import{A as y}from"./AddBtn-52c48a5f.js";const A="_patients_zh54i_1",L={patients:A,"patients-add":"_patients-add_zh54i_4"},H=()=>{const[i,d]=s.useState(""),[r,o]=s.useState([]),[l,p]=s.useState(!0),{data:n,isLoading:h,error:C}=_("http://localhost:3000/patients");s.useEffect(()=>{n&&(o(n),p(!1))},[n]);const m=e=>{d(e)},[u,c]=s.useState(!1),f=async e=>{g.delete(`http://localhost:3000/patients/${e}`).then(a=>{console.log("Пацієнта видалено")}).catch(a=>{console.error("Помилка при видалені пацієнта",a)}),o(r.filter(a=>a.id!==e))};return t.jsx("div",{className:L.patients,children:t.jsxs(j,{children:[t.jsx(P,{value:i,onChange:e=>m(e.target.value),type:"text",maxLength:"50",placeholder:"Введіть ім'я або ID пацієнта"}),t.jsx(y,{onClick:()=>c(!0),children:"Додати пацієнта"}),u&&t.jsx(S,{desie:"Введіть симптоми захворювання",addUser:"Додати пацієнта",userHistory:"Введіть медичну історцію",userInformation:"Введіть медичні процедури",address:"Введіть адресу",setShowForm:c,user:r,setUser:o,api:"patients"}),h||l?t.jsx(x,{}):t.jsx(U,{searchUser:i,delateUser:f,users:r})]})})};export{H as default};