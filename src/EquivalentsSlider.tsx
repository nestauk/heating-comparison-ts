import Slider from "react-slick";
import React from "react";
import Emoji from 'a11y-react-emoji';
import { Stat } from './calculator';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function EquivalentsSlider(props: { equivalents: Stat[] }) {
  const { 
    equivalents
  } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <>
      <Slider {...settings} >
        { equivalents.map(stat => {
            return (
              <div key={stat.name}>
              <p>
                {`${stat.value} `}
                {stat.desc}
              </p>
              <p>
                {[
                  ...Array(stat.iconCount),
                ].map((value: undefined, index: number) => 
                <span className="icon">
                    <Emoji key={stat.name} label={stat.name} symbol={stat.iconChar}/>
                </span>
                )}
              </p>
            </div>
            );
        })}
      </Slider>
    </>
  );
}
