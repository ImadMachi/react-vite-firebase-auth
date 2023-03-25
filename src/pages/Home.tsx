import useTheme from "@hooks/useTheme";
import useUser from "@hooks/useUser";
import styles from "@styles/pages/home.module.scss";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const { toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <div className={styles.home} data-testId="home">
      <div>
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
        <button onClick={handleLogout}>signout</button>

        <h1>Hello {user?.displayName}</h1>
      </div>
    </div>
  );
};

export default Home;
