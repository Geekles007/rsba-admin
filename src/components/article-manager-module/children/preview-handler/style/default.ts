import styled from "styled-components";
import {blue50} from "@carbon/colors";

export const PreviewHandlerWrapper = styled.div`
  padding: 1em 1em;
  
  .backButton{
    cursor: pointer;
    color: ${blue50};
  }

  h1 {
    font-size: 3.5em;
    font-weight: 700;
    margin-bottom: 1em;
  }

  * {
    font-size: 1.1em;
  }
  
  b{
    font-weight: bold;
  }

  i {
    font-style: italic;
  }
  
  p {
    font-size: 1.1em;
  }
  
  .content_container{
    margin-bottom: 2em;
  }
`;