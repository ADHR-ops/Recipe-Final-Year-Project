
import { useEffect } from 'react';
// import ResetPasswordPage from './ResetPasswordPage'
import translate from 'translate'
export default function App() {
  translate.engine = "google"; // "google", "yandex", "libre", "deepl"
  useEffect(() => {
    (async () => {

      const text = await translate("Cómo estás", { from: "spanish", to: 'english' })
      console.log(text);
    })()
  }, [])
  return (
    <div>
      {/* <ResetPasswordPage /> */}
      app
    </div>
  )
}
