import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { INavigation } from "../Home/Home";
import { useGetPokesTypesQuery } from "../../store/api/pokes.api";
import styles from "./SelectTypes.module.scss";
import clsx from "clsx";

interface IProps {
  typePoke: string | null;
  setTypePoke: Dispatch<SetStateAction<INavigation>>;
}

export const SelectTypes: FC<IProps> = ({ typePoke, setTypePoke }) => {
  const { data: dataTypes, isSuccess: isSuccessTypes } =
    useGetPokesTypesQuery(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdowmRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdowmRef.current && setIsOpen) {
        const target = event.target as Node;
        if (target && !dropdowmRef.current.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isSuccessTypes && (
        <div className={styles.list}>
          <div
            className={clsx(styles.select, { [styles.select_opened]: !isOpen })}
            ref={dropdowmRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            {typePoke !== null ? `Type: ${typePoke}` : "Select type"}
          </div>
          {isOpen && (
            <div className={styles.items}>
              {dataTypes?.results.map((el, idx: number) => (
                <div
                  className={styles.item}
                  onClick={() => {
                    setTypePoke((prev) => ({ ...prev, typePoke: el.name }));
                    setIsOpen(false);
                  }}
                  key={idx}
                >
                  {el.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
