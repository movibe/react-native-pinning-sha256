import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import {
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from "styled-system";

type DivProps = LayoutProps &
  FlexboxProps &
  SpaceProps &
  ColorProps &
  TouchableOpacityProps;
type TextProps = SpaceProps & ColorProps & TypographyProps;

export const Div = styled.View<DivProps>`
  ${color}
  ${space}
  ${layout}
  ${flexbox}
  width: 100%;
`;
export const Button = styled.TouchableOpacity<DivProps>`
  ${color}
  ${space}
  ${layout}
  ${flexbox}
  padding: 10px;
  border-radius: 12px;
  width: 100%;
`;
export const Text = styled.Text<TextProps>`
  ${space}
  ${typography}
  ${color}
`;
