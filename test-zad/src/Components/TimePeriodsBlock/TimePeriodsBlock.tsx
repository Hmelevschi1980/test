import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";
import { TimePeriod } from "./types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TimePeriodsBlock.scss";
import ArrowLeft from "../assets/arrowLeft.svg"
import ArrowRight from "../assets/arrowRight.svg"

interface Props {
  periods: TimePeriod[];
}

export const TimePeriodsBlock: React.FC<Props> = ({ periods }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const [animatedFrom, setAnimatedFrom] = useState(periods[0].from);
  const [animatedTo, setAnimatedTo] = useState(periods[0].to);

  const count = periods.length;
  const step = 360 / count;
  const circleRadius = 265;
  const pointRadius = 266;
  const startAngleOffset = 330 - step / 2;

  const pointsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLSpanElement>(null);
  const toRef = useRef<HTMLSpanElement>(null);

  // Функция для анимации счетчика
  const animateCounter = (targetFrom: number, targetTo: number) => {
    const duration = 1000;
    const steps = 30;
    const stepDuration = duration / steps;

    const startFrom = animatedFrom;
    const startTo = animatedTo;
    const diffFrom = targetFrom - startFrom;
    const diffTo = targetTo - startTo;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      const newFrom = Math.round(startFrom + diffFrom * progress);
      const newTo = Math.round(startTo + diffTo * progress);

      setAnimatedFrom(newFrom);
      setAnimatedTo(newTo);

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedFrom(targetFrom);
        setAnimatedTo(targetTo);
      }
    }, stepDuration);

    return timer;
  };

  useEffect(() => {
    if (!pointsRef.current || !numbersRef.current || !sliderRef.current) return;

    const tl = gsap.timeline();

    tl.to(pointsRef.current, {
      rotate: -step * activeIndex,
      duration: 0.6,
      ease: "power2.out",
    });

    const targetFrom = periods[activeIndex].from;
    const targetTo = periods[activeIndex].to;

    const timer = animateCounter(targetFrom, targetTo);

    tl.fromTo(
      sliderRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    );

    setShowLabel(false);
    const labelTimer = setTimeout(() => {
      setShowLabel(true);
    }, 1000);

    return () => {
      clearTimeout(labelTimer);
      if (timer) clearInterval(timer);
    };
  }, [activeIndex, step]);

  const handlePointClick = (index: number) => {
    setActiveIndex(index);
    setHoveredIndex(null);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? periods.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === periods.length - 1 ? 0 : prev + 1));
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
      {/* Контейнер для заголовка и круга на одном уровне */}
      <div className="time-periods__top-section">
        {/* Header слева */}
        <header className="time-periods__header">
          <span className="time-periods__accent" />
          <h2 className="time-periods__title">
            <span>Исторические</span>
            <span>даты</span>
          </h2>
        </header>

        {/* Circle block по центру */}
        <div className="time-periods__circle-wrapper">
          <div className="circle-bg" />
          <div className="circle-axis" />
          <div className="circle-axis circle-axis--horizontal" />

          <div className="circle-numbers" ref={numbersRef}>
            <span className="circle-numbers__from" ref={fromRef}>
              {animatedFrom}
            </span>
            <span className="circle-numbers__to" ref={toRef}>
              {animatedTo}
            </span>
          </div>

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
                  style={
                    {
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      "--counter-rotation": `${step * activeIndex}deg`,
                    } as React.CSSProperties
                  }
                  onClick={() => handlePointClick(index)}
                  onMouseEnter={() => handlePointMouseEnter(index)}
                  onMouseLeave={handlePointMouseLeave}
                >
                  <span className="circle-point__dot">
                    {(isActive || isHovered) && (
                      <span className="circle-point__id">{index + 1}</span>
                    )}
                  </span>

                  {shouldShowLabel && (
                    <div className="circle-point__label-wrapper">
                      <span className="circle-point__label">
                        {period.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Навигация по слайдеру */}
      <div className="period-controls">
        <span className="period-controls__counter">
          {" "}
          {String(activeIndex + 1).padStart(2, "0")}/
          {String(periods.length).padStart(2, "0")}
        </span>

        <div className="period-controls__buttons">
          <button
            className="period-controls__btn"
            onClick={handlePrev}
            aria-label="Предыдущий период"
          >
            <img src={ArrowLeft} alt="" />
          </button>

          <button
            className="period-controls__btn"
            onClick={handleNext}
            aria-label="Следующий период"
          >
            <img src={ArrowRight} alt="" />
          </button>
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
