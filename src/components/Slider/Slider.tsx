import { FC } from "react";
import styles from "./Slider.module.scss";
import not_found_photo from "../../assets/images/not_found_photo.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

interface IProps {
  dataPokeById: any;
}

export const Slider: FC<IProps> = ({ dataPokeById }) => {
  return (
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
                <img src={dataPokeById.sprites.other.home.front_shiny} alt="" />
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
            alt="images of a photo not found"
          />
        </>
      )}
      <h1 className={styles.name}>My name is {dataPokeById.name}</h1>
    </div>
  );
};
