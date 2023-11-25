import { FC } from "react";
import styles from "./BackHistoryArrow.module.scss";
import { useBackHistory } from "../../hooks/useBack";
import back_arrow from "../../assets/images/back_arrow.svg";

export const BackHistoryArrow: FC = () => {
  const { goBack } = useBackHistory();

  return (
    <div className={styles.wrapper}>
      <div className={styles.btn} onClick={goBack}>
        <img src={back_arrow} alt="back arrow icon" />
      </div>
    </div>
  );
};
