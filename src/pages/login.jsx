import InputGroup from '../components/InputGroup'
import axios from 'axios'
import { useState } from 'react';
import { CircularProgress } from "@mui/material"
import SwallHandler from '../utils/Swall.handler';
import { useDispatch } from "react-redux";
import Link from 'next/link';
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next';

export default function LoginPage() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loging, setLoginStatus] = useState(false)


    async function Login() {
        setLoginStatus(true)
        await axios.post(`${process.env.API_URL}/user/auth`, {
            email,
            password
        }).then(({data}) => {
            dispatch({
                type: 'SET_TOKEN',
                payload: {
                    authorization: data.authorization
                }
            })
            setCookie('authorization', data.authorization)
            setCookie("userName", data.userName)
            router.push('/upload-page')
        }).catch(e => {
            let message = ''
            if (e.message.includes("não encontrado")) {
                message = "Usuário não encontrado"
            } else if (e.message.includes("Invalid password")) {
                message = "Senha incorreta"
            } else {
                message = "Erro interno"
            }
            SwallHandler('error', message)
        })
        setLoginStatus(false)
    }

    return (
        <div className='login-container'>
            <div className='logo'>
                <img src="/logo.png" />
            </div>
            <div className='form'>
                <h3>Login</h3>
                <InputGroup
                    labelText="E-mail"
                    inputType="text"
                    inputId="email"
                    placeholder="Digite seu e-mail"
                    setState={setEmail}
                />
                <InputGroup
                    labelText="Senha"
                    inputType="password"
                    inputId="password"
                    placeholder="Digite sua senha"
                    setState={setPassword}
                />
                {
                    (loging) ?
                        <CircularProgress
                            style={
                                {
                                    color: '#00ff65',
                                    margin: 'auto'
                                }
                            }
                        /> :
                        <button onClick={() => { Login() }}>Login</button >
                }
                <Link href="/register">Registrar-se</Link>
            </div>
        </div>
    )
}