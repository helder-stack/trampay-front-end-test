import "@/styles/App.css"
import "@/styles/InputGroup.css"
import '@/styles/Login.css'
import '@/styles/Register.css'
import "@/styles/Upload.css"
import "@/styles/ListScreen.css"
import store from "@/store/index"
import { Provider } from "react-redux"
import LoginPage from "./login"

function App({ Component, pageProps }) {
  return <Provider store={store}>
    <LoginPage />
  </Provider>
}

export default App