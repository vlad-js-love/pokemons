import { Dispatch, FC, SetStateAction, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { INavigation } from "../Home/Home";
import styles from "./HomePagination.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface IProps {
  navigation: INavigation;
  setNavigation: Dispatch<SetStateAction<INavigation>>;
  isFetchingPokes: boolean;
  getPokes: (offset: number) => void;
}

export const HomePagination: FC<IProps> = ({
  navigation,
  getPokes,
  isFetchingPokes,
  setNavigation,
}) => {
  useEffect(() => {
    getPokes(navigation.currentPage * 20);
  }, [navigation.currentPage]);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setNavigation((prev) => ({ ...prev, currentPage: value }));
    window.scrollTo(0, 0);
  };

  const activePageStyle = {
    color: "#fccb07", // ваш цвет
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        count={navigation.btns_count}
        page={navigation.currentPage}
        disabled={isFetchingPokes}
        onChange={handleChange}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </div>
  );
};
