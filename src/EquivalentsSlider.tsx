import Slider from "react-slick";
import React from "react";
import Emoji from 'a11y-react-emoji';
import { Stat } from './calculator';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SocialMediaButtons from "./SocialMediaButtons";

export function EquivalentsSlider(props: { equivalents: Stat[], applyReduction: boolean, shareEnabled: boolean }) {
  const { 
    equivalents, shareEnabled, applyReduction,
  } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const description = "I just found out that heating my home with gas is the same as ";
  return (
    <>
      <Slider {...settings} >
        { equivalents.map(stat => {
            return (
              <div key={stat.name}>
                <div>
                  {`${stat.value} `}
                  {stat.desc}
                </div>
                <div className="icons">
                  {[
                    ...Array(stat.iconCount),
                  ].map((value: undefined, index: number) => 
                    <span className="shadeOut">
                      <Emoji key={stat.name} label={stat.name} symbol={stat.iconChar} />
                    </span>
                  )}
                  </div>
                  <div className="shareBar">
                  { shareEnabled 
                    ? 
                    <SocialMediaButtons description={`description ${stat.desc}`} image={'./logo.svg'}/>
                    : null
                  }
                  </div>
              </div>
            );
        })}
      
      </Slider>
    </>
  );
}
