import styled from "@emotion/styled";

interface Props {
  icon: React.ReactNode;
  title: React.ReactNode | string;
  description: React.ReactNode | string;
}

export const Detail: React.FC<Props> = ({
  icon,
  title,
  description,
}: Props) => {
  return (
    <Wrapper>
      {icon}
      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  grid-column-gap: 9px;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
`;
