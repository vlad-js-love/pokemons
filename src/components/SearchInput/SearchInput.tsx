import { FC, KeyboardEvent, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchInput.module.scss";
import { useLazyFindByNameQuery } from "../../store/api/pokes.api";
import { Loader } from "../Loadeer/Loader";

export const SearchInput: FC = () => {
  const navigate = useNavigate();

  // requests
  const [
    findByName,
    {
      data: dataPoke,
      isFetching: isFetchingPoke,
      isError: isErrorPoke,
      isSuccess: isSuccessPoke,
    },
  ] = useLazyFindByNameQuery();

  // local state
  const [search, setSearch] = useState({
    previousValue: "",
    currentValue: "",
  });
  const [isVisibleError, setIsVisibleError] = useState<boolean>(false);

  // handles
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({ ...prev, currentValue: e.target.value }));
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search.currentValue.length) {
        findByName(search.currentValue.toLowerCase());
        setIsVisibleError(true);
      }
    }
  };
  const findByNameHandler = () => {
    if (search.currentValue.length) {
      findByName(search.currentValue.toLowerCase());
      setIsVisibleError(true);
    }
  };

  // listeners
  useEffect(() => {
    if (dataPoke && !isErrorPoke) {
      navigate(`poke-card/${dataPoke.id}`);
      setSearch((prev) => ({ ...prev, currentValue: "" }));
    }
  }, [dataPoke, isSuccessPoke]);
  useEffect(() => {
    if (search.currentValue !== search.previousValue) {
      setIsVisibleError(false);
      setSearch((prev) => ({ ...prev, previousValue: search.currentValue }));
    }
  }, [search, search.previousValue]);

  return (
    <div className={styles.input_wrapper}>
      {isFetchingPoke && <Loader />}
      {isErrorPoke && isVisibleError && (
        <div className={styles.error}>Pokemon is missing</div>
      )}
      <div className={styles.input_box}>
        <input
          className={styles.input}
          type="text"
          value={search.currentValue}
          disabled={isFetchingPoke}
          placeholder="Search by name"
          onChange={(e) => onChangeHandler(e)}
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
