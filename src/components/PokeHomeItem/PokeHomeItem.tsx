import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./PokeHomeItem.module.scss";
import { ReqPoke } from "../../types/pokes.types";
import { useGetPokeQuery } from "../../store/api/pokes.api";

interface IProps {
  poke: ReqPoke;
}

export const PokeHomeItem: FC<IProps> = ({ poke }) => {
  const { data: dataPoke, isSuccess } = useGetPokeQuery(poke.url);

  return (
    <Link to={`/poke-card/${dataPoke?.id}`} className={styles.item}>
      {isSuccess && (
        <img src={dataPoke.sprites.front_default} alt="pokemon image" />
      )}
      <h4 className={styles.item_name}>{poke.name}</h4>
    </Link>
  );
};
