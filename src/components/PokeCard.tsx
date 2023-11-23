import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetPokeByIdQuery } from "../store/api/pokes.api";

export const PokeCard: FC = () => {
  const { id } = useParams();
  const [getPokeById, { data: dataPokeById, isSuccess: isSuccessPokeById }] =
    useLazyGetPokeByIdQuery();

  useEffect(() => {
    if (id) {
      getPokeById(id);
    }
  }, [id]);

  return (
    isSuccessPokeById &&
    dataPokeById && (
      <div>
        <img src={dataPokeById.sprites?.front_default} alt="" />
        <div>
          Moves
          {dataPokeById.moves.map((el: any, idx: number) => (
            <div key={idx}>{el.move.name}</div>
          ))}
        </div>
        <div>
          Types:
          {dataPokeById.types.map((el: any, idx: number) => (
            <div key={idx}>{el.type.name}</div>
          ))}
        </div>
      </div>
    )
  );
};
