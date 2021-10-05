import {memo} from "react";
import {Tile} from "carbon-components-react";
import styled from "styled-components";
import FormHandler from "../form-handler";
import {FormProps} from "../../../../models/FormProps";

const CustomTile = styled(Tile)`
  background-color: transparent;
  position: sticky;
  position: -webkit-sticky;
  top: 1em;
  
`;

interface MakeArticleFormProps {
    token: string;
    formProps: FormProps
}

const MakeArticleForm = ({token, formProps}: MakeArticleFormProps) => {

    return (
        <CustomTile>
            <h3>Создать статью</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit tempore voluptate.</p>

            <FormHandler token={token} formProps={formProps} />
        </CustomTile>
    );

}

export default memo(MakeArticleForm);