import { FC, KeyboardEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchInput.module.scss";
import { useLazyFindByNameQuery } from "../../store/api/pokes.api";
import { Loader } from "../Loadeer/Loader";

export const SearchInput: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [
    findByName,
    {
      data: dataPoke,
      isFetching: isFetchingPoke,
      isError: isErrorPoke,
      isSuccess: isSuccessPoke,
    },
  ] = useLazyFindByNameQuery();

  useEffect(() => {
    if (isSuccessPoke && !isErrorPoke) {
      navigate(`poke-card/${dataPoke.id}`);
    }
  }, [dataPoke, isSuccessPoke]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search.length) {
        findByName(search);
      }
    }
  };

  const findByNameHandler = () => {
    if (search.length) {
      findByName(search);
    }
  };

  return (
    <div className={styles.input_wrapper}>
      {isFetchingPoke && <Loader />}
      {isErrorPoke && <div className={styles.error}>Pokemon is missing</div>}
      <div className={styles.input_box}>
        <input
          className={styles.input}
          type="text"
          value={search}
          disabled={isFetchingPoke}
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 30 30"
          onClick={() => findByNameHandler()}
        >
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
        </svg>
      </div>
    </div>
  );
};
