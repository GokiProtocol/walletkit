import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import styled from "@emotion/styled";
import { LangOption } from "../../types";

interface Props
    extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
    > {
    langOption?: LangOption;
}

export const LanguageToggle: React.FC<Props> = ({
    langOption,
}: Props) => {
    const { t, i18n } = useTranslation();

    const [lang, setLang] = useState(i18n.language);

    const handleSelectLanguage = (e: any) => {
        setLang(e.target.value);
        i18n.changeLanguage(e.target.value)
    }

    return (
        <BottomArea>
            <label>
                <Trans i18nKey="changeLanguage">
                    Change Langugae
                </Trans>
            </label>
            <select id="language" value={lang} onChange={handleSelectLanguage}>
                {Object.keys(langOption!).map((lng) => (
                    <option
                        key={lng}
                        value={lng}
                        style={{
                            border: "1px solid #dfdfdf",
                            boxSizing: "border-box",
                            borderRadius: "4px",
                            padding: "0 4px"
                        }}
                    >
                        {langOption![lng]!.nativeName}
                    </option>
                ))}
            </select>
        </BottomArea >
    );
};

export const BottomArea = styled.div`
  font-size: 14px;
  line-height: 15px;
  color: #696969;
  margin: 0 10px;

  display: flex;
  justify-content: space-around;
`;
