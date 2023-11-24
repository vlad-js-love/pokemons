import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";
import { useGetPokesTypesQuery } from "../../store/api/pokes.api";
import styles from "./SelectTypes.module.scss";
import clsx from "clsx";
import { INavigation } from '../../pages/Home/Home';

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
    <>
      {isSuccessTypes && (
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <div
              className={clsx(styles.select, {
                [styles.select_opened]: !isOpen,
              })}
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
          <div
            className={clsx(styles.cancel, {
              [styles.cancel_disabled]: !typePoke,
            })}
            onClick={() => setTypePoke((prev) => ({ ...prev, typePoke: null }))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 128 128"
            >
              <path
                fill="#fff"
                d="M64 9A55 55 0 1 0 64 119A55 55 0 1 0 64 9Z"
                transform="rotate(-45.001 64 64.001)"
              ></path>
              <path
                fill="red"
                d="M64 24A40 40 0 1 0 64 104A40 40 0 1 0 64 24Z"
                transform="rotate(-45.001 64 64.001)"
              ></path>
              <path
                fill="#444b54"
                d="M64,122c-15.5,0-30.1-6-41-17C12,94.1,6,79.5,6,64s6-30.1,17-41c11-11,25.5-17,41-17s30.1,6,41,17l0,0l0,0 c11,11,17,25.5,17,41s-6,30.1-17,41C94.1,116,79.5,122,64,122z M64,12c-13.9,0-26.9,5.4-36.8,15.2S12,50.1,12,64 s5.4,26.9,15.2,36.8S50.1,116,64,116s26.9-5.4,36.8-15.2S116,77.9,116,64s-5.4-26.9-15.2-36.8l0,0C90.9,17.4,77.9,12,64,12z"
              ></path>
              <path
                fill="#fff"
                d="M68.2,64l11.3-11.3c1.2-1.2,1.2-3.1,0-4.2c-1.2-1.2-3.1-1.2-4.2,0L64,59.8L52.7,48.4c-1.2-1.2-3.1-1.2-4.2,0 c-1.2,1.2-1.2,3.1,0,4.2L59.8,64L48.4,75.3c-1.2,1.2-1.2,3.1,0,4.2c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9L64,68.2l11.3,11.3 c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2L68.2,64z"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
