import { FC } from "react";
import loader from "../../assets/images/loader.png";
import styles from "./Loader.module.scss";

export const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <img src={loader} alt="loader image" />
    </div>
  );
};
