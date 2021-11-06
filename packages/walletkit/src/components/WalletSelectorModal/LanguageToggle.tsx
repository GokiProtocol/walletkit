import styled from "@emotion/styled";
import type { ChangeEventHandler } from "react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import type { LocaleInfo, Locales } from "../../types";

interface Props<L extends string>
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  locales: Locales<L>;
}

export const LanguageToggle = <L extends string>({
  locales,
}: Props<L>): React.ReactElement => {
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState<string>(i18n.language);

  const handleSelectLanguage: ChangeEventHandler<HTMLSelectElement> = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value).catch((e) => console.log(e));
  };

  return (
    <BottomArea>
      <label>{t("changeLanguage", "Change Language")}</label>
      <select id="language" value={lang} onChange={handleSelectLanguage}>
        {Object.entries<LocaleInfo>(locales).map(([locale, info]) => (
          <option
            key={locale}
            value={locale}
            style={{
              border: "1px solid #dfdfdf",
              boxSizing: "border-box",
              borderRadius: "4px",
              padding: "0 4px",
            }}
          >
            {info.nativeName}
          </option>
        ))}
      </select>
    </BottomArea>
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
