import UploadingPage from "@/views/Uploading"
import Upload from "@/views/Upload"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/router'
import { useEffect } from "react"
import { getCookie, deleteCookie } from "cookies-next"

export default function UploadPage() {
    const { file } = useSelector(store => store.file)
    const { authorization } = useSelector(store => store.auth)
    const cookieAuth = getCookie('authorization')
    const router = useRouter()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (!authorization && !cookieAuth) {
            router.push('/login')
        }
    })
    
    function goToClientsList(){
        router.push('/list')
    }

    function logout() {
        deleteCookie("authorization")
        dispatch({
            type: 'SET_TOKEN',
            payload: {
                authorization: null
            }
        })
        dispatch({
            type: "SET_FILE",
            payload: {
                file: null,
                header: null,
                lines: null
            }
        })
        router.push('/login')
    }
    return (
        <div className="upload-container">
                <div className="header">
                <span id="title">IMPORTAR CSV</span>
                <span id="logout" onClick={logout}>Sair</span>
                </div>
            {
                (file) ?
                    <UploadingPage />
                    :
                    <Upload />

            }
        </div>
    )
}