import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PokeCard.module.scss";
import { useLazyGetPokeByIdQuery } from "../../store/api/pokes.api";
import { PokemonTags } from "../../components/PokemonTags/PokemonTags";
import { Slider } from "../../components/Slider/Slider";
import { Loader } from "../../components/Loadeer/Loader";
import { BackHistoryArrow } from "../../components/BackHistoryArrow/BackHistoryArrow";

export const PokeCard: FC = () => {
  const { id } = useParams();
  const [getPokeById, { data: dataPokeById, isSuccess: isSuccessPokeById }] =
    useLazyGetPokeByIdQuery();

  useEffect(() => {
    if (id) {
      getPokeById(id);
    }
    window.scrollTo(0, 0);
  }, [id]);

  return isSuccessPokeById && dataPokeById ? (
    <div className={styles.box}>
      <BackHistoryArrow />
      <div className={styles.wrapper}>
        <Slider dataPokeById={dataPokeById} />
        <div>
          {dataPokeById.types && (
            <>
              <PokemonTags
                dataPokeById={dataPokeById}
                modification={["types", "type"]}
                tagsBackgroung={"#5E9CEC"}
                title={"Type(s)"}
                clickable={true}
              />
              <br />
            </>
          )}
          {dataPokeById.moves && (
            <>
              <PokemonTags
                dataPokeById={dataPokeById}
                modification={["moves", "move"]}
                tagsBackgroung={"#A0D468"}
                title={"Move(s)"}
              />
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.loader_wrapper}>
      <Loader />
    </div>
  );
};
