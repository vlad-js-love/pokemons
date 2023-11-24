import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./PokeCard.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import not_found_photo from "../../../assets/images/pokecard/not_found_photo.svg";
import { useLazyGetPokeByIdQuery } from "../../../store/api/pokes.api";
import { PokemonTags } from "../../../components/PokemonTags/PokemonTags";

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
  
  return (
    isSuccessPokeById &&
    dataPokeById && (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          {dataPokeById.sprites?.other?.home?.front_default ||
          dataPokeById.sprites?.other?.home?.front_female ||
          dataPokeById.sprites?.other?.home?.front_shiny ||
          dataPokeById.sprites?.other?.home?.front_shiny_female ||
          dataPokeById.sprites?.other?.dream_world?.front_default ||
          dataPokeById.sprites?.other?.dream_world?.front_female ? (
            <Swiper
              slidesPerView={1}
              pagination={{ clickable: true }}
              effect={"cube"}
              grabCursor={true}
              modules={[EffectCube, Autoplay, Pagination]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              speed={600}
              loop
            >
              {dataPokeById.sprites?.other?.home?.front_default && (
                <SwiperSlide>
                  <div className={styles.image}>
                    <img
                      src={dataPokeById.sprites.other.home.front_default}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
              {dataPokeById.sprites?.other?.home?.front_female && (
                <SwiperSlide>
                  <div className={styles.image}>
                    <img
                      src={dataPokeById.sprites.other.home.front_female}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
              {dataPokeById.sprites?.other?.home?.front_shiny && (
                <SwiperSlide>
                  <div className={styles.image}>
                    <img
                      src={dataPokeById.sprites.other.home.front_shiny}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
              {dataPokeById.sprites?.other?.home?.front_shiny_female && (
                <SwiperSlide>
                  <div className={styles.image}>
                    <img
                      src={dataPokeById.sprites.other.home.front_shiny_female}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
              {dataPokeById.sprites?.other?.dream_world?.front_default && (
                <SwiperSlide>
                  <div className={styles.image}>
                    <img
                      src={dataPokeById.sprites.other.dream_world.front_default}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
              {dataPokeById.sprites?.other?.dream_world?.front_female && (
                <SwiperSlide>
                  <div className={styles.image}>
                    <img
                      src={dataPokeById.sprites.other.dream_world.front_female}
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          ) : (
            <>
              <div className={styles.error_title}>
                Unfortunately, no photos of this Pokemon were found.
              </div>
              <img
                className={styles.error_photo}
                src={not_found_photo}
                alt=""
              />
            </>
          )}
          <div className={styles.name}>My name is {dataPokeById.name}</div>
        </div>

        <div>
          {dataPokeById.types && (
            <>
              <PokemonTags
                dataPokeById={dataPokeById}
                modification={["types", "type"]}
                tagsBackgroung={"#31a0e1"}
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
                tagsBackgroung={"#D07D00"}
                title={"Move(s)"}
              />
            </>
          )}
        </div>
      </div>
    )
  );
};
