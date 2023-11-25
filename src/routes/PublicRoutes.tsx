import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from '../pages/Home/Home';
import styles from "./PublicRoutes.module.scss";
import { PokeCard } from '../pages/PokeCard/PokeCard';

export const PublicRoutes: FC = () => {
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
