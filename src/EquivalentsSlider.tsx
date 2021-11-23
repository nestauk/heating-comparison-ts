import Slider from "react-slick";
import Emoji from "a11y-react-emoji";
import { Stat } from "./calculator";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SocialMediaButtons from "./SocialMediaButtons";
import React from "react";

export function EquivalentsSlider(props: {
  equivalents: Stat[];
  applyReduction: boolean;
  banner: string;
  shareEnabled: boolean;
  className: string;
}) {
  const { equivalents, shareEnabled, applyReduction, className, banner } =
    props;
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {equivalents.map((stat) => {
        return (
          <div key={stat.name} className="mb-5">
            <div className="mx-3 shadow-lg">
              <div
                className={
                  className + " px-7 py-5 h-72 md:h-56 flex items-center"
                }
              >
                <div className="w-full">
                  {banner === "" ? null : <div className="mb-2">{banner}</div>}
                  <div className="text-3xl text-center mb-2">
                    {[...Array(stat.iconCountTotal)].map(
                      (value: undefined, index: number) =>
                        applyReduction && index >= stat.iconCountActive ? (
                          <span className="shadeOut">
                            <Emoji
                              key={`${stat.name}-${index}`}
                              label={stat.name}
                              symbol={stat.iconChar}
                              className="mr-2 inline-block"
                            />
                          </span>
                        ) : (
                          <Emoji
                            key={`${stat.name}-${index}`}
                            label={stat.name}
                            symbol={stat.iconChar}
                            className="mr-2 inline-block"
                          />
                        )
                    )}
                  </div>

                  <p
                    className={
                      "text-2xl text-center font-bold " +
                      (className === "bg-white" ? "text-base" : "text-white")
                    }
                  >
                    {`${stat.value} ${stat.desc}`}
                  </p>
                </div>
              </div>

              <div className="bg-white pl-3 text-gray-500 flex items-center justify-between">
                Share this
                <div>
                  {shareEnabled ? (
                    <SocialMediaButtons
                      description={`description ${stat.desc}`}
                      image={"./logo.svg"}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
}
