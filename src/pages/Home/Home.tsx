import { FC, useState, useEffect } from "react";
import {
  useLazyGetPokesQuery,
} from "../../store/api/pokes.api";
import styles from "./Home.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { SelectTypes } from "../../components/SelectTypes/SelectTypes";
import { PokeHomeItem } from "../../components/PokeHomeItem/PokeHomeItem";
import { ReqPoke } from "../../types/pokes.types";
import { HomePagination } from "../../components/HomePagination/HomePagination";
import { useAppSelector } from "../../hooks/redux-hooks";

export type INavigation = {
  btns_count: number;
  countPages: number | null;
  previous: string | null;
  next: string | null;
  currentPage: number;
};

export const Home: FC = () => {
  const [
    getPokes,
    { data: dataPokes, isSuccess: isSuccessPokes, isFetching: isFetchingPokes },
  ] = useLazyGetPokesQuery({ refetchOnReconnect: true });

  const [navigation, setNavigation] = useState<INavigation>({
    btns_count: 0,
    countPages: dataPokes?.count || null,
    previous: dataPokes?.previous || null,
    next: dataPokes?.next || null,
    currentPage: 1,
  });

  const { typePoke, result } = useAppSelector(
    (state) => state.pokeFindByTypeReduces
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    getPokes(20);
  }, []);

  useEffect(() => {
    if (dataPokes) {
      setNavigation((prev) => ({
        ...prev,
        btns_count:
          dataPokes.count >= 20 ? Math.floor(dataPokes.count / 20) : 1,
        previous: dataPokes.previous,
        next: dataPokes.next,
        countPages: dataPokes.count,
      }));
    }
  }, [dataPokes]);

  const skeletonStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
  };

  return (
    <div>
      <SelectTypes />

      {typePoke ? (
        <div className={styles.poke_items}>
          {result
            ? result.pokemon?.map((item: any, idx: number) => (
                <PokeHomeItem poke={item.pokemon} key={idx} />
              ))
            : [...Array(20)].map((_, idx) => (
                <Skeleton
                  variant="rounded"
                  style={skeletonStyle}
                  height={141}
                  key={idx}
                />
              ))}
        </div>
      ) : (
        <>
          <div className={styles.poke_items}>
            {isSuccessPokes && !isFetchingPokes
              ? dataPokes?.results.map((item: ReqPoke, idx: number) => (
                  <PokeHomeItem poke={item} key={idx} />
                ))
              : [...Array(20)].map((_, idx) => (
                  <Skeleton
                    variant="rounded"
                    style={skeletonStyle}
                    height={141}
                    key={idx}
                  />
                ))}
          </div>

          <HomePagination
            getPokes={getPokes}
            navigation={navigation}
            setNavigation={setNavigation}
            isFetchingPokes={isFetchingPokes}
          />
        </>
      )}
    </div>
  );
};
