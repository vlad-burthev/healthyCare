import{h as c,j as e}from"./index-8caec843.js";import{D as n}from"./DelateBtn-49cae500.js";const a="_record_1ls8m_1",d={record:a,"record-id":"_record-id_1ls8m_9","record-content":"_record-content_1ls8m_15","record-patient":"_record-patient_1ls8m_27","record-doctor":"_record-doctor_1ls8m_30","record-btn__delate":"_record-btn__delate_1ls8m_33","record-datetime":"_record-datetime_1ls8m_48"},m=({record:t,delateRecords:o,filteredRecordsTime:r})=>{const i=c(s=>s.repos.register);return e.jsxs("div",{style:{backgroundColor:r?"rgb(205, 248, 208)":"none"},className:d.record,children:[e.jsxs("div",{className:d["record-id"],children:["ID: ",t.id]}),e.jsxs("div",{className:d["record-content"],children:[e.jsxs("div",{className:d["record-patient"],children:[e.jsx("div",{style:{width:"150px",height:"150px",backgroundPosition:"center center",backgroundSize:"cover",borderRadius:"50%",border:"2px solid #4b7e52",backgroundImage:`url(${t.patientPhoto?t.patientPhoto:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="})`}}),e.jsx("div",{children:t.patientName}),e.jsx("div",{children:t.patientPhone}),e.jsx("div",{children:t.patientEmail}),e.jsx("div",{children:t.patientAddress}),e.jsx("div",{children:t.patientDisease})]}),e.jsxs("div",{className:d["record-datetime"],children:[e.jsx("p",{children:t.recordDate}),e.jsx("p",{children:t.recordTime})]}),e.jsxs("div",{className:d["record-doctor"],children:[e.jsx("div",{style:{width:"150px",height:"150px",border:"2px solid #000",backgroundPosition:"center center",backgroundSize:"cover",borderRadius:"50%",backgroundImage:`url(${t.doctorPhoto?t.doctorPhoto:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="})`}}),e.jsx("div",{children:t.doctorName}),e.jsx("div",{children:t.doctorPhone}),e.jsx("div",{children:t.doctorEmail}),e.jsx("div",{children:t.doctorAddress}),e.jsx("div",{children:t.doctorSpec})]})]}),i&&e.jsx(n,{className:d["record-btn__delate"],onClick:()=>o(t.id),children:"Видалити"})]})};export{m as R};