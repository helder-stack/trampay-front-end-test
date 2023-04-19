import SwallHandler from "@/utils/Swall.handler"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
import { deleteCookie, getCookie } from "cookies-next"
import * as _ from 'lodash'

export default function ListClients() {

    const [clients, setClients] = useState([])
    const { authorization } = useSelector(store => store.auth)
    const router = useRouter()
    const cookieAuth = getCookie("authorization")
    const userName = getCookie("userName")
    const dispatch = useDispatch()

    useEffect(() => {
        if (!authorization && !cookieAuth) {
            router.push('/login')
        }
        try {
            axios.get(`${process.env.API_URL}/clients`, {
                headers: {
                    Authorization: decodeURI(cookieAuth)
                }
            }).then(response => {
                const clientsList = _.orderBy(response.data, ['deletedAt'], ['desc'])
                setClients(clientsList)
            })
        } catch (e) {
            SwallHandler("error", "Internal server error")
        }

    }, [])

    function returnPage() {
        router.push('/upload-page')
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
        <div className="list-screen">
            <div className="header">
                <span><strong>Olá, {userName}</strong></span>
                <div className="pagination">
                    <span className="pageButton" onClick={returnPage}>Voltar</span>
                    <span className="pageButton" onClick={logout}>Sair</span>
                </div>
            </div>
            {
                (clients.length) ?
                    <table>
                        <thead>
                            <tr>
                                <td><strong>DOCUMENTO</strong></td>
                                <td><strong>SALDO</strong></td>
                                <td><strong>DATA DE CRIAÇÃO</strong></td>
                                <td><strong>STATUS</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clients.map((client, index) => {
                                    const date = new Date(client.createdAt)
                                    return (
                                        <tr key={index} className={index % 2 == 0 ? 'active' : ""}>
                                            <td>{client.doc}</td>
                                            <td>R${client.balance}</td>
                                            <td>{date.toLocaleString()}</td>
                                            <td><strong>{client.deletedAt ? "Deletado" : "Salvo"}</strong></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    : <table>
                        <h4>Não encontramos nenhum registro...</h4>
                    </table>
            }

        </div>
    )
}