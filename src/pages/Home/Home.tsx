import { FC, useState, useEffect } from "react";
import {
  useLazyGetPokesByTypeQuery,
  useLazyGetPokesQuery,
} from "../../store/api/pokes.api";
import styles from "./Home.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { SelectTypes } from '../../components/SelectTypes/SelectTypes';
import { PokeHomeItem } from '../../components/PokeHomeItem/PokeHomeItem';
import { ReqPoke } from '../../types/pokes.types';
import { HomePagination } from '../../components/HomePagination/HomePagination';

export type INavigation = {
  typePoke: string | null;
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
  const [
    getPokeByType,
    {
      data: dataPokeByType,
      isSuccess: isSuccessPokeType,
      isFetching: isFetchingPokesByType,
    },
  ] = useLazyGetPokesByTypeQuery();
  const [navigation, setNavigation] = useState<INavigation>({
    btns_count: 0,
    countPages: dataPokes?.count || null,
    previous: dataPokes?.previous || null,
    next: dataPokes?.next || null,
    typePoke: null,
    currentPage: 1,
  });
  useEffect(() => {
    getPokes(20);
  }, []);
  useEffect(() => {
    if (navigation.typePoke) {
      getPokeByType(navigation.typePoke);
    }
  }, [navigation.typePoke]);

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
      <SelectTypes typePoke={navigation.typePoke} setTypePoke={setNavigation} />
      {navigation.typePoke !== null && isSuccessPokeType ? (
        <div className={styles.poke_items}>
          {isSuccessPokeType && !isFetchingPokesByType
            ? dataPokeByType?.pokemon?.map((item: any, idx: number) => (
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
