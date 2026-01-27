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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const count = periods.length;
  const step = 360 / count;
  const circleRadius = 265;
  const pointRadius = 266;
  const startAngleOffset = 330 - step / 2;

  const pointsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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

    // Анимация появления label через секунду
    setShowLabel(false);
    const timer = setTimeout(() => {
      setShowLabel(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeIndex, step]);

  const handlePointClick = (index: number) => {
    setActiveIndex(index);
    setHoveredIndex(null); // Сбрасываем hover при клике
  };

  const handlePointMouseEnter = (index: number) => {
    if (index !== activeIndex) {
      setHoveredIndex(index);
    }
  };

  const handlePointMouseLeave = () => {
    setHoveredIndex(null);
  };

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

        {/* Center numbers */}
        <div className="circle-numbers" ref={numbersRef}>
          <span className="circle-numbers__from">
            {periods[activeIndex].from}
          </span>
          <span className="circle-numbers__to">{periods[activeIndex].to}</span>
        </div>

        {/* Rotating points layer */}
        <div className="circle-points" ref={pointsRef}>
          {periods.map((period, index) => {
            const angle = startAngleOffset + step * index;
            const isActive = index === activeIndex;
            const isHovered = hoveredIndex === index;
            const shouldShowLabel = isActive && showLabel;

            const radian = (angle * Math.PI) / 180;
            const x = Math.cos(radian) * pointRadius;
            const y = Math.sin(radian) * pointRadius;

            return (
              <div
                key={period.id}
                className={`circle-point ${isActive ? "is-active" : ""} ${
                  isHovered ? "is-hovered" : ""
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                onClick={() => handlePointClick(index)}
                onMouseEnter={() => handlePointMouseEnter(index)}
                onMouseLeave={handlePointMouseLeave}
              >
                <span className="circle-point__dot">
                  {(isActive || isHovered) && (
                    <span className="circle-point__id">{index + 1}</span>
                  )}
                </span>

                {/* Label показывается только для активной точки после задержки */}
                {shouldShowLabel && (
                  <div
                    className="circle-point__label-wrapper"
                    style={
                      {
                        "--compensation-angle": `${step * activeIndex}deg`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="circle-point__label">{period.label}</span>
                  </div>
                )}
              </div>
            );
          })}
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
