import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import FirstSection from "./Section/FirstSection";
import Dashboard from "./Dashboard";

export default function Carousel() {
  const renderSlides = () =>
    [<FirstSection />, <Dashboard />].map((component) => (
      <div>{component}</div>
    ));

  return (
    <div className="my-10">
      <Slider dots={true} autoplay={false} autoplaySpeed={3000}>
        {renderSlides()}
      </Slider>
    </div>
  );
}
