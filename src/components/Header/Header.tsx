import { FC } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/header/poke.png";
import { Link } from "react-router-dom";
import { SearchInput } from '../SearchInput/SearchInput';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { pokeFindByTypeSlice } from '../../store/slices/pokeFindByType.slice';

export const Header: FC = () => {

  const dispatch = useAppDispatch()
  const { setTypePoke } = pokeFindByTypeSlice.actions

  const resetPokeTypeHandler = () => {
    dispatch(setTypePoke(null))
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__wrapper}>
          <Link className={styles.image} onClick={() => resetPokeTypeHandler()} to="/">
            <img className={styles.img} src={logo} alt="" />
          </Link>
          <SearchInput />
        </div>
      </div>
    </header>
  );
};
