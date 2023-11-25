import { FC } from "react";
import styles from "./PokemonTags.module.scss";
import type_icon from "../../assets/images/pokecard/type_icon.svg";
import clsx from "clsx";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { pokeFindByTypeSlice } from "../../store/slices/pokeFindByType.slice";
import { useNavigate } from "react-router-dom";

interface IProps {
  dataPokeById: any;
  modification: [string, string];
  title: string;
  tagsBackgroung?: string;
  clickable?: boolean;
}

export const PokemonTags: FC<IProps> = ({
  dataPokeById,
  modification,
  title,
  tagsBackgroung,
  clickable,
}) => {
  const dispatch = useAppDispatch();
  const { setTypePoke } = pokeFindByTypeSlice.actions;

  const navigate = useNavigate();

  const findByIdHandler = (pokeType: string) => {
    if (clickable) {
      dispatch(setTypePoke(pokeType));
      navigate("/");
    }
  };

  return (
    <div className={styles.types}>
      <div className={styles.box}>
        <img className={styles.title_img} src={type_icon} alt="" />
        <div className={styles.title}>{title}:</div>
      </div>
      {dataPokeById && (
        <div className={styles.tags}>
          {dataPokeById[modification[0]].map((el: any, idx: number) => (
            <div
              className={clsx(styles.tag, {
                [styles.tag_clickable]: clickable,
              })}
              style={{ backgroundColor: tagsBackgroung || "#000" }}
              key={idx}
              onClick={() => findByIdHandler(el[modification[1]].name)}
            >
              {el[modification[1]].name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
