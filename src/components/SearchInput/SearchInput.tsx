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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search.length) {
        findByName(search);
      }
    }
  };
  useEffect(() => {
    if (isSuccessPoke && !isErrorPoke) {
      navigate(`poke-card/${dataPoke.id}`);
    }
  }, [dataPoke, isSuccessPoke]);

  return (
    <div className={styles.input_wrapper}>
      {isFetchingPoke && <Loader />}
      {isErrorPoke && (
        <div className={styles.error}>
          Pokemon is missing
        </div>
      )}
      <input
        className={styles.input}
        type="text"
        value={search}
        disabled={isFetchingPoke}
        placeholder="Search for Pokemon by name"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
