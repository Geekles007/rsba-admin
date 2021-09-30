import {memo} from "react";
import styled from "styled-components";
import {Tile} from "carbon-components-react";

interface YoutubeEmbedderProps {
    videoId: string;
}

const IframeWrapper = styled(Tile)`
  
    iframe {
      width: 100%;
    }
    
`;

const YoutubeEmbedder = ({videoId}: YoutubeEmbedderProps) => {

    return (
        <>
            {
                (videoId === "" || !videoId) ?
                    <></> :
                    <IframeWrapper>
                        <iframe
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </IframeWrapper>
            }
        </>
    );

}

export default memo(YoutubeEmbedder);