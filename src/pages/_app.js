import "@/styles/App.css"
import "@/styles/InputGroup.css"
import '@/styles/Login.css'
import '@/styles/Register.css'
import "@/styles/Upload.css"
import "@/styles/ListScreen.css"
import store from "@/store/index"
import { Provider } from "react-redux"
import { useRouter } from "next/router"



function App({ Component, props }) {
  return <Provider store={store}>
    <Component {...props} />
  </Provider>
}

export default App