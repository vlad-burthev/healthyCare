import UserListItem from "../UserListItem/UserListItem";
import styles from "./UserList.module.scss";

const UserList = ({ users, delateUser, searchUser, patient }) => {
  const userFilter = users.filter(
    (user) =>
      user.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchUser.toLowerCase().replace(/\s+/g, "")) ||
      user.id.toString().includes(searchUser) ||
      user.disease
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(searchUser.toLowerCase().replace(/\s+/g, ""))
  );

  return (
    <div className={styles["list-item"]}>
      {userFilter.length > 0 ? (
        userFilter
          .reverse()
          .map((user) => (
            <UserListItem
              delateUser={delateUser}
              key={user.id}
              user={user}
              patient={patient}
            />
          ))
      ) : (
        <h1>Такого лікаря не має</h1>
      )}
    </div>
  );
};

export default UserList;
