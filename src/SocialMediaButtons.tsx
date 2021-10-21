import { Popper } from "@mui/material";
import React from "react";
import SocialMediaMetaData from './SocialMediaMetadata';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { Stat } from "./calculator";
      
export default function SocialMediaButtons( props: { image?: string, description?: string }) { 
    const { image, description } = props; 

    return (
        <>
            <FacebookShareButton 
                url={"http://www.nesta.org.uk"}
                quote={description}
                hashtag="#gasheatingclimatechange"
                className="socialMediaButton">
                <FacebookIcon size={36} />
            </FacebookShareButton>
            <TwitterShareButton
                url={"http://www.nesta.org.uk"}
                title={description}
                hashtags={['#gasheatingclimatechange']}
                className="socialMediaButton">
                <TwitterIcon size={36} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={"http://www.nesta.org.uk"}
                title={description}
                separator=":: "
                className="socialMediaButton" >
                <WhatsappIcon size={36} />
            </WhatsappShareButton>
           
       </>
   );
}