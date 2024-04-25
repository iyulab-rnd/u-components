import { useT } from "./src/localize";

export function ReactComponent() {
  const { t } = useT();
  return (
    <>
      React i18next: {t('hello')}
      <br />
      <KKK />
    </>
  )
}

export function KKK() {
  const { t } = useT();
  return (
    <>
      ReactKK i18next: {t('world')}
    </>
  )
}