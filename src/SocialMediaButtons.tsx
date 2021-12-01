import React from "react";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, 
    WhatsappIcon, WhatsappShareButton } from "react-share";

      
export default function SocialMediaButtons( props: { image?: string, description?: string }) { 
    const { image, description } = props; 
    const url = process.env.PUBLIC_URL || "www.nesta.org.uk";

    return (
        <>
            <FacebookShareButton 
                url={url}
                quote={description}
                hashtag="gasheatingclimatechange"
                className="socialMediaButton">
                <FacebookIcon size={36} />
            </FacebookShareButton>
            <TwitterShareButton
                url={url}
                title={description}
                hashtags={['gasheatingclimatechange']}
                className="socialMediaButton">
                <TwitterIcon size={36} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={url}
                title={description}
                separator=""
                className="socialMediaButton" >
                <WhatsappIcon size={36} />
            </WhatsappShareButton>
           
       </>
   );
}