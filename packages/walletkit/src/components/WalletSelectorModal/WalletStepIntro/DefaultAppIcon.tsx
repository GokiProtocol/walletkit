import styled from "@emotion/styled";

export const DefaultAppIcon: React.FC = () => <Wrapper>?</Wrapper>;

export const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px dashed #dedede;
  background: #f9f9f9;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 36px;
  color: #dedede;
  user-select: none;
`;
