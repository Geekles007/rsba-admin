import {memo} from "react";
import {Tile} from "carbon-components-react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {FormProps} from "../../../../models/FormProps";
import {yupResolver} from "@hookform/resolvers/yup";
import MakeArticleController from "./../../controller";
import FormHandler from "../form-handler";

const CustomTile = styled(Tile)`
  background-color: transparent;
`;

const MakeArticleForm = () => {
    const formProps = useForm<FormProps>({
        resolver: yupResolver(MakeArticleController.MySchema)
    });

    return (
        <CustomTile>
            <h3>Создать статью</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit tempore voluptate.</p>

            <FormHandler formProps={formProps} />
        </CustomTile>
    );

}

export default memo(MakeArticleForm);