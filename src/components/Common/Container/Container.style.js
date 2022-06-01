import { Row } from "antd";
import styledComponents from "styled-components";
import { lg } from "../../../constants/breakPoint";
import useResponsive from "../../../hooks/useResponsive";

export const ContainerWrapper = styledComponents(Row)`
margin: 10rem auto !important;
height: 50rem;
width: 100%;
padding: 0;

`;