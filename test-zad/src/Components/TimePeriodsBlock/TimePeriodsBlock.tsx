import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import { TimePeriod } from "./types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TimePeriodsBlock.scss";

interface Props {
  periods: TimePeriod[];
}

export const TimePeriodsBlock: React.FC<Props> = ({ periods }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = periods.length;
  const step = 360 / count;
  const radius = 237; // (530 / 2) - 28

  const pointsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const labelAngles = useRef<(number | null)[]>([]);

  useEffect(() => {
    if (!pointsRef.current || !numbersRef.current || !sliderRef.current) return;

    const tl = gsap.timeline();

    tl.to(pointsRef.current, {
      rotate: -step * activeIndex,
      duration: 0.6,
      ease: "power2.out",
    });

    tl.fromTo(
      numbersRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4 },
      "<"
    );

    tl.fromTo(
      sliderRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    );
  }, [activeIndex, step]);

  useEffect(() => {
    labelAngles.current = periods.map((_, index) => step * index);
  }, [periods, step]);

  return (
    <section className="time-periods">
      {/* Header */}
      <header className="time-periods__header">
        <span className="time-periods__accent" />
        <h2 className="time-periods__title">Исторические даты</h2>
      </header>

      {/* Circle block */}
      <div className="time-periods__circle-wrapper">
        {/* Background circle */}
        <div className="circle-bg" />
        {/* Vertical axis */}
        <div className="circle-axis" />
        {/* Horizontal axis */}
        <div className="circle-axis circle-axis--horizontal" />
        {/* Rotating points layer */}
        <div className="circle-points" ref={pointsRef}>
          {periods.map((period, index) => {
            const angle = step * index;
            const isActive = index === activeIndex;

            return (
              <div
                key={period.id}
                className={"circle-point" + (isActive ? " is-active" : "")}
                style={{
                  transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <span className="circle-point__dot">
                  {isActive && (
                    <span className="circle-point__id">{index + 1}</span>
                  )}
                </span>
                {isActive && (
                  <span className="circle-point__label">{period.label}</span>
                )}
              </div>
            );
          })}
        </div>
        {/* Center numbers */}
        <div className="circle-numbers" ref={numbersRef}>
          <span className="circle-numbers__from">
            {periods[activeIndex].from}
          </span>
          <span className="circle-numbers__to">{periods[activeIndex].to}</span>
        </div>
      </div>

      {/* Slider */}
      <div className="time-periods__slider" ref={sliderRef}>
        <Swiper
          key={activeIndex}
          modules={[Navigation, Pagination]}
          slidesPerView={3}
          spaceBetween={25}
          navigation
          pagination={{ clickable: true }}
        >
          {periods[activeIndex].events.map((event, idx) => (
            <SwiperSlide key={idx}>
              <div className="event">
                <h3 className="event__year">{event.year}</h3>
                <p className="event__description">{event.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
