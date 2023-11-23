import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./MainRoutes.module.scss";
import { PokeCard } from "../PokeCard";
import { Home } from '../Home/Home';

export const MainRoutes: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<PokeCard />} path="poke-card/:id" />
        </Routes>
      </div>
    </div>
  );
};
