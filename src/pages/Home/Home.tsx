import { FC, useState, useEffect } from "react";
import { useLazyGetPokesQuery } from "../../store/api/pokes.api";
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
};

export const Home: FC = () => {
  // requests
  const [
    getPokes,
    { data: dataPokes, isSuccess: isSuccessPokes, isFetching: isFetchingPokes },
  ] = useLazyGetPokesQuery({ refetchOnReconnect: true });

  // local state
  const [navigation, setNavigation] = useState<INavigation>({
    btns_count: 0,
    countPages: dataPokes?.count || null,
    previous: dataPokes?.previous || null,
    next: dataPokes?.next || null
  });

  // global state
  const { typePoke, result, isFetching } = useAppSelector(
    (state) => state.pokeFindByTypeReducer
  );
  const { currentPage } = useAppSelector((state) => state.homeReducer);

  // listeners
  useEffect(() => {
    window.scrollTo(0, 0);
    getPokes(currentPage * 20);
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

  return (
    <div>
      <SelectTypes />

      {typePoke ? (
        isFetching ? (
          <div className={styles.poke_items}>
            {[...Array(20)].map((_, idx) => (
              <Skeleton
                variant="rounded"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                height={141}
                key={idx}
              />
            ))}
          </div>
        ) : (
          <div className={styles.poke_items}>
            {result && result.pokemon && result.pokemon.length > 0 ? (
              result.pokemon.map((item: any, idx: number) => (
                <PokeHomeItem poke={item.pokemon} key={idx} />
              ))
            ) : (
              <h4 className={styles.error}>
                Ohh... no Pokémon of this type found
              </h4>
            )}
          </div>
        )
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
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    height={141}
                    key={idx}
                  />
                ))}
          </div>

          <HomePagination
            getPokes={getPokes}
            navigation={navigation}
            isFetchingPokes={isFetchingPokes}
          />
        </>
      )}
    </div>
  );
};
