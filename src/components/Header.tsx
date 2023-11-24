import { FC } from "react";
import styles from "../styles/header.module.scss";
import { SearchInput } from "./SearchInput/SearchInput";
import logo from "../assets/images/header/poke.png";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Link className={styles.image} to="/">
            <img className={styles.img} src={logo} alt="" />
          </Link>
          <SearchInput />
        </div>
      </div>
    </header>
  );
};
