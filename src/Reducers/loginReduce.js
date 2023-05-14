const SET_REGISTER = "SET_REGISTER";
const SET_LOGIN = "SET_LOGIN";
const SET_PATIENT = "SET_PATIENT";
const SET_DOCTOR = "SET_DOCTOR";
const GET_ID = "GET_ID";
const SET_LOGINHOW = "SET_LOGINHOW";
const SET_PERSONAL = "SET_PERSONAL";

const defaultState = {
  register: false,
  login: false,
  patient: false,
  doctor: false,
  personal: false,
  id: "",
  loginhow: "",
};

export default function reposReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_REGISTER:
      return {
        ...state,
        register: action.payload,
      };

    case SET_PERSONAL:
      return {
        ...state,
        personal: action.payload,
      };

    case SET_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
      };

    case SET_LOGINHOW:
      return {
        ...state,
        loginhow: action.payload,
      };

    case GET_ID:
      return {
        ...state,
        id: action.payload,
      };

    case SET_LOGIN:
      return {
        ...state,
        login: action.payload,
      };

    case SET_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };
    default:
      return state;
  }
}

export const setRegister = (register) => ({
  type: SET_REGISTER,
  payload: register,
});

export const setLogin = (login) => ({
  type: SET_LOGIN,
  payload: login,
});

export const setPatient = (patient) => ({
  type: SET_PATIENT,
  payload: patient,
});

export const setDoctorLogin = (doctor) => ({
  type: SET_DOCTOR,
  payload: doctor,
});

export const setID = (id) => ({
  type: GET_ID,
  payload: id,
});

export const setLoginHow = (loginhow) => ({
  type: SET_LOGINHOW,
  payload: loginhow,
});

export const setPersonalLogin = (personal) => ({
  type: SET_PERSONAL,
  payload: personal,
});
