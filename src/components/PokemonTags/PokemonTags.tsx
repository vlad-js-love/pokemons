import { FC } from "react";
import styles from "./PokemonTags.module.scss";
import type_icon from "../../assets/images/pokecard/type_icon.svg";
import clsx from "clsx";

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

  const findByIdHandler = (payload: string) => {
    if(clickable){
      console.log(payload);
      
    }
  }
 
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
            className={clsx(styles.tag, { [styles.tag_clickable]: clickable })}
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
