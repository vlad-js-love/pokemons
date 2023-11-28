import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./PokeHomeItem.module.scss";
import { ReqPoke } from "../../types/pokes.types";
import { useGetPokeQuery } from "../../store/api/pokes.api";
import not_found_photo from "../../assets/images/not_found_photo.svg";
import { Loader } from "../Loadeer/Loader";

interface IProps {
  poke: ReqPoke;
}

export const PokeHomeItem: FC<IProps> = ({ poke }) => {
  const {
    data: dataPoke,
    isSuccess: isSuccessPoke,
    isFetching: isFetchingPoke,
  } = useGetPokeQuery(poke.url);

  return (
    <Link to={`/poke-card/${dataPoke?.id}`} className={styles.item}>
      {isFetchingPoke ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : isSuccessPoke && dataPoke?.sprites?.front_default ? (
        <img src={dataPoke.sprites.front_default} alt="pokemon image" />
      ) : (
        <img src={not_found_photo} alt="photo image not provided" />
      )}
      <h4 className={styles.item_name}>{poke.name}</h4>
    </Link>
  );
};
