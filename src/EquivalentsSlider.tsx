import Slider from "react-slick";
import Emoji from 'a11y-react-emoji';
import { Stat } from './calculator';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SocialMediaButtons from "./SocialMediaButtons";
import React from "react";
import { Grid } from "@mui/material";

export function EquivalentsSlider(
  props: { equivalents: Stat[], applyReduction: boolean, banner: string
            shareEnabled: boolean, className: string }
            ) {
  const { 
    equivalents, shareEnabled, applyReduction, className, banner
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
      <Slider {...settings} >
        { equivalents.map(stat => {
            return (
              <Grid container key={stat.name} className={className}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {banner}
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {`${stat.value} `}{stat.desc}
                </Grid>
                <Grid item xs={12}  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div className="icons">
                    {      
                    [
                      ...Array(stat.iconCountTotal),
                    ].map((value: undefined, index: number) => 
                      (applyReduction && index >= stat.iconCountActive) ?
                      <span className="shadeOut">
                        <Emoji key={`${stat.name}-${index}`} label={stat.name} symbol={stat.iconChar} />
                      </span>
                      : 
                        <Emoji key={`${stat.name}-${index}`} label={stat.name} symbol={stat.iconChar} />
                    )}
                  </div>
                </Grid>
                <Grid container item xs={12} className="shareBar">
                   <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start">
                      <div>Share this</div>
                    </Grid>
                    <Grid item xs={6} justifyContent="flex-end" alignItems="flex-end">
                      <div>
                      { shareEnabled 
                        ? 
                        <SocialMediaButtons description={`description ${stat.desc}`} image={'./logo.svg'}/>
                        : null
                      }
                      </div>
                    </Grid>
                </Grid>
              </Grid>
              );
          })}     
      </Slider>
  );
}
