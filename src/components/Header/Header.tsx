import { FC } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/header/poke.png";
import { Link } from "react-router-dom";
import { SearchInput } from "../SearchInput/SearchInput";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { pokeFindByTypeSlice } from "../../store/slices/pokeFindByType.slice";
import { homeSlice } from '../../store/slices/homeSlice.slice';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { setTypePoke } = pokeFindByTypeSlice.actions;
  const { setCurrentPage } = homeSlice.actions;

  const resetHandler = () => {
    dispatch(setTypePoke(null));
    dispatch(setCurrentPage(1));
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Link
            className={styles.image}
            onClick={() => resetHandler()}
            to="/"
          >
            <img className={styles.img} src={logo} alt="logo image" />
          </Link>
          <SearchInput />
        </div>
      </div>
    </header>
  );
};
