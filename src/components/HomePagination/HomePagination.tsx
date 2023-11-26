import { Dispatch, FC, SetStateAction, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import styles from "./HomePagination.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { INavigation } from "../../pages/Home/Home";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { homeSlice } from '../../store/slices/homeSlice.slice';

interface IProps {
  navigation: INavigation;
  isFetchingPokes: boolean;
  getPokes: (offset: number) => void;
}

export const HomePagination: FC<IProps> = ({
  navigation,
  getPokes,
  isFetchingPokes
}) => {

  const dispatch = useAppDispatch();
  const { setCurrentPage } = homeSlice.actions

  const { currentPage } = useAppSelector((state) => state.homeReducer);

  useEffect(() => {
    getPokes(currentPage * 20);
  }, [currentPage]);

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(value));
  };

  return (
    <div className={styles.pagination}>
      <Pagination
        count={navigation.btns_count}
        page={currentPage}
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
