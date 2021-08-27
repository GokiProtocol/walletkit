import styled from "@emotion/styled";
import { lighten } from "polished";

export const ContinueButton = styled.button`
  border: none;
  outline: none;

  border-radius: 16px;
  height: 55px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  background: #000000;
  color: #fff;
  &:hover {
    background: ${lighten(0.133, "#000")};
  }
  &:active {
    background: ${lighten(0.212, "#000")};
  }
  cursor: pointer;
`;
