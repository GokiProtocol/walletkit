import styled from "@emotion/styled";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  name: string;
};

export const LabeledInput: React.FC<Props> = ({
  label,
  ...inputProps
}: Props) => {
  return (
    <Fieldset>
      <Label htmlFor={inputProps.name}>{label}</Label>
      <InputBorder>
        <Input {...inputProps} />
      </InputBorder>
    </Fieldset>
  );
};

const Fieldset = styled.fieldset`
  border: none;
  outline: none;

  height: 66px;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const InputBorder = styled.div`
  position: absolute;
  height: 56px;
  top: 10px;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 1;
  width: 100%;
  padding: 0 4px;

  display: flex;
  align-items: center;

  &:hover {
    border: 1px solid #aaa;
  }
  &:focus-within {
    border: 1px solid #6764fb;
  }
  transition: border 0.2s ease;
`;

const Label = styled.label`
  position: absolute;
  display: block;
  left: 11px;
  z-index: 2;
  padding: 0 4px;
  height: 20px;

  background: #fff;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #696969;
`;

const Input = styled.input`
  border: none;
  outline: none;
  height: 43px;

  padding: 0 11px;
  flex-grow: 1;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;

  color: #000;
  &::placeholder {
    color: #b5b5b5;
  }
`;
