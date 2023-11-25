import { FC } from "react";
import { Loader } from "../Loadeer/Loader";
import styles from "./AppLoader.module.scss";

export const AppLoader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );
};
