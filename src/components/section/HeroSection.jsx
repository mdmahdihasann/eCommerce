import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const HeroSection = () => {
  const images = [
    "https://images.pexels.com/photos/29834641/pexels-photo-29834641.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/29834645/pexels-photo-29834645.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/29834632/pexels-photo-29834632.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "https://images.pexels.com/photos/30700820/pexels-photo-30700820.jpeg?auto=compress&cs=tinysrgb&w=1800",
  ];

  return (
    <section className="w-full min-h-screen overflow-hidden">
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
