import { Link } from "react-router-dom";
import "./NoLoggin.scss";

const NoLoggin = () => {
  return (
    <div className="nologgin-block">
      <div className="nologgin">
        <h1>Ви не авторизувались!</h1>
        <Link to="/">Авторизуватись</Link>
      </div>
    </div>
  );
};

export default NoLoggin;
