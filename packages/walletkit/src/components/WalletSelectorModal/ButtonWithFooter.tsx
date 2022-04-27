import styled from "@emotion/styled";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  footer?: React.ReactNode;
}

export const ButtonWithFooter: React.FC<Props> = ({
  footer,
  children,
  ...props
}: Props) => {
  return (
    <BottomArea>
      <BigButton {...props}>{children}</BigButton>
      <FooterText>{footer}</FooterText>
    </BottomArea>
  );
};

export const BottomArea = styled.div`
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 28px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

export const FooterText = styled.div`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
  & > a {
    color: #696969;
    font-weight: bold;
  }
`;

export const BigButton = styled.button`
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
    background: #212121;
  }
  &:active {
    background: #363636;
  }
  cursor: pointer;
`;
