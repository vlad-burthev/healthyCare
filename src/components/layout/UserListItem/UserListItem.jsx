import { Link } from "react-router-dom";
import styles from "./UserListItem.module.scss";
import DelateBtn from "../../UI/DelateBtn/DelateBtn";
import { useSelector } from "react-redux";

const UserListItem = ({ user, delateUser, patient }) => {
  const words = user.disease.split(" "); // Разбить текст на слова
  const shortenedText = words.slice(0, 5).join(" "); // Выбрать первые 10 слов и объединить их обратно в текст
  const registerLogin = useSelector((state) => state.repos.register);

  return (
    <div className={styles["user-list__item"]}>
      <div className={styles["user-list__content"]}>
        <div className={styles["user-list__id"]}>ID: {user.id}</div>
        <div className={styles["user-list__info"]}>
          <div>{user.name}</div>
          <div>{user.phone}</div>
          <div>{user.email}</div>
          <div>{user.address}</div>
          <div>{shortenedText}</div>
        </div>

        <div
          className={styles["user-list__photo"]}
          style={{
            border: "2px solid #000",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundImage: `url(${
              user.photo
                ? user.photo
                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            })`,
          }}
        ></div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Link
          style={{
            textDecoration: "underline",
            color: "green",
          }}
          to={`${user.id}`}
        >
          Детальніше
        </Link>
        {registerLogin && (
          <DelateBtn
            className={styles["user-list__btn-delate"]}
            onClick={() => delateUser(user.id)}
          >
            Видалити
          </DelateBtn>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
