import{r as c,j as e,L as g,l as f}from"./index-d4c46eb0.js";import{u as j}from"./DelateBtn-ab931404.js";import{C as S}from"./MyInput-77183f57.js";import{R as D}from"./RecordItem-0619de8f.js";import{a as R}from"./Main-b11b10bd.js";const L="_home_17f60_1",h={home:L,"home-records":"_home-records_17f60_4","home-records-none":"_home-records-none_17f60_7"},I="_RightSideList_fc4i6_1",N={RightSideList:I},$="_RightSideItem_1goph_1",u={RightSideItem:$},v=({record:t})=>{const[i,r]=c.useState([]);return c.useEffect(()=>{t&&R.get(`http://localhost:3000/doctors/${t.doctorId}/records`).then(d=>{r(d.data)}).catch(d=>{console.log(d)})},[]),e.jsx("div",{className:u.RightSideItem,children:e.jsxs("div",{children:[e.jsx(g,{to:`/main/doctors/${t.doctorId}`,children:t.doctorName}),e.jsxs("p",{className:u["RightSideItem-date"],children:[t.recordDate," - ",t.recordTime]}),e.jsx(g,{to:`/main/patients/${t.patinetId}`,children:t.patientName})]})})},y=({records:t,loader:i})=>e.jsxs("div",{className:N.RightSideList,children:[e.jsx("h2",{children:"Всі записи до лікарів"}),i?e.jsx(f,{}):t.map(r=>e.jsx(v,{record:r},r.id))]}),x={"right-side":"_right-side_v8jld_1"},E=()=>{const[t,i]=c.useState([]),[r,d]=c.useState(!0),{data:a,isLoading:l}=j("http://localhost:3000/records");return c.useEffect(()=>{a&&(i(a),d(l))},[a]),e.jsx("div",{className:x["right-side"],children:e.jsx("div",{className:x["right-side__content"],children:e.jsx(y,{records:t,loader:r})})})},T=()=>{const[t,i]=c.useState([]),[r,d]=c.useState(!0),{data:a,isLoading:l,error:F}=j("http://localhost:3000/records");c.useEffect(()=>{a&&(i(a),d(!1))},[a]);const n=new Date;n.setHours(0,0,0,0);const m=t.filter(o=>{const s=new Date(o.recordDate);return s.setHours(0,0,0,0),s.getFullYear()===n.getFullYear()&&s.getMonth()===n.getMonth()&&s.getDate()===n.getDate()}),p=t.some(o=>{const s=new Date(o.recordDate);return s.setHours(0,0,0,0),s.getFullYear()<=n.getFullYear()&&s.getMonth()<=n.getMonth()&&s.getDate()<=n.getDate()}),_=async o=>{R.delete(`http://localhost:3000/records/${o}`).then(s=>{console.log(`Запис видалено + ${s}`)}).catch(s=>{console.error("Помилка при видалені запису",s)}),i(t.filter(s=>s.id!==o))};return e.jsx("div",{className:h.home,children:e.jsxs(S,{children:[e.jsxs("div",{className:h["home-records"],children:[e.jsx("h1",{children:"Запси на сьогодні "}),m.length===0?e.jsx("h3",{className:h["home-records-none"],children:"На сьогодні записів не має"}):"",r?e.jsx(f,{}):m.map(o=>e.jsx(D,{delateRecords:_,record:o,filteredRecordsTime:p},o.id))]}),e.jsx(E,{})]})})};export{T as default};
