import { Popper } from "@mui/material";
import SocialMediaMetaData from './SocialMediaMetadata';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
      
export default function SocialMediaButtons(props: any) {  
    return (
        <Popper open={true} transition>
            <SocialMediaMetaData></SocialMediaMetaData>
            <FacebookShareButton 
                url={"http://www.nesta.org.uk"}
                quote={"Gas Heating Climate Change Impact"}
                hashtag="#gasheatingclimatechange"
                className="socialMediaButton">
                <FacebookIcon size={36} />
            </FacebookShareButton>
            <TwitterShareButton
                url={"http://www.nesta.org.uk"}
                title={"Gas Heating Climate Change Impact"}
                hashtags={['#gasheatingclimatechange']}
                className="socialMediaButton">
                <TwitterIcon size={36} />
            </TwitterShareButton>
            <WhatsappShareButton
                url={"http://www.nesta.org.uk"}
                title={"Gas Heating Climate Change Impact"}
                separator=":: "
                className="socialMediaButton" >
                <WhatsappIcon size={36} />
            </WhatsappShareButton>
       </Popper>
   );
}