import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";


const HeroSection = () => {
   const images = [
  "https://objectstorage.ap-singapore-1.oraclecloud.com/n/aximxvolvk6d/b/sailorbucket/o/uploads/all/AZ498xOWkTQR21gKoV5wlvTY7r70Wrag8bzYnXVq.jpg",
  "https://objectstorage.ap-singapore-1.oraclecloud.com/n/aximxvolvk6d/b/sailorbucket/o/uploads/all/3wM9JMdPGtv9GIcYYpZk34O41804XbTY49nK8vUZ.png",
];

  return (
    <section className="w-[100%] h-[600px] overflow-hidden rounded-lg">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-screen"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              className="w-full h-screen object-cover rounded-xl"
              alt="Fashion Banner"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
