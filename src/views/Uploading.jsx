import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import SwallHandler from "@/utils/Swall.handler"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { deleteCookie } from "cookies-next"

export default function UploadingPage() {
    const { file, lines, invalid } = useSelector(state => state.file)
    const [uploading, setUploadingStatus] = useState(false)
    const router = useRouter()
    const cookieAuth = getCookie("authorization")
    const dispatch = useDispatch()

    async function formatAndValidateData() {
        const data = []
        for (let index = 0; index < lines.length; index++) {
            const [doc, balance] = lines[index]
            const userData = {
                doc,
                balance
            }
            const isValid = await validateData(userData)
            if (isValid) {
                data.push(userData)
            }
        }
        return {data}
    }

    function validateData(data) {
        if (isNaN(data.doc)) {
            return false
        }
        if (isNaN(data.balance)) {
            return false
        }
        return true
    }

    async function sendData() {
        setUploadingStatus(true)
        const {data: formattedData} = await formatAndValidateData()
        
        try{
            await axios.post(`${process.env.API_URL}/clients`, {
                clients: formattedData
            }, {
                headers: {
                    Authorization: decodeURI(cookieAuth)
                }
            })
            SwallHandler("success", "Clientes salvos com sucesso!")
            router.push("/list")
        }catch(e){
            console.error(e)
            SwallHandler("error", "")
        }
    }    

    function sendOtherFile(){
        dispatch({
            type: 'SET_FILE',
            payload: {
                file: null,
                header: null,
                lines: null,
                invalid: 0
            }
        })
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
        <>
            <div className="file-data">
                <span>Nome do arquivo: <strong>{file.name}</strong></span>
                <span>Tamanho do arquivo: <strong>{file.size}B</strong></span>
                <span>Total de registros: <strong>{lines.length}</strong></span>
                <span>Registros inválidos: <strong style={{color: 'red'}}>{invalid}</strong></span>
            </div>
            <div className="file-upload">
                {
                    (uploading) ?
                        <LinearProgress
                            size="sm"
                            value={25}
                            style={{ color: "red", marginTop: "5%" }}
                        />
                        :
                        <></>
                }
            </div>
            <div className="file-controls">
                <button onClick={sendData} disabled={(invalid >= lines.length ? true : false)}>Enviar arquivo</button>
                <span onClick={sendOtherFile}>Enviar outro arquivo</span>
                <span id="logout" style={{ cursor: 'pointer' }} onClick={logout}>Sair</span>
            </div>
        </>
    )
}