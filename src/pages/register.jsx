import InputGroup from '@/components/InputGroup'
import axios from 'axios'
import { useState } from 'react';
import { CircularProgress } from "@mui/material"
import SwallHandler from '@/utils/Swall.handler';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validatePassword, setValidatePassword] = useState("")
    const [registering, setregisterStatus] = useState(false)

    async function register() {
        try {
            const passwordIsEqual = await passwordHandler()
            if (passwordIsEqual) {
                const userData = mountUserData()
                setregisterStatus(true)
                const { data } = await axios.post(`${process.env.API_URL}/user`, userData)
                SwallHandler('success', "Registrado com sucesso")
            } else {
                SwallHandler('error', "As senhas não coincidem")
            }
        } catch (e) {
            console.log(e.response)
            let message = e.response.message == 'This e-mail is already used.' ? "Este e-mail já está sendo utilizado" : "Preencha as informações corretamente"
            SwallHandler('error', message)
        } finally {
            setregisterStatus(false)
        }
    }

    function passwordHandler() {
        if (password == validatePassword) {
            return true
        }
        return false
    }

    function mountUserData() {
        return {
            name,
            lastName,
            email,
            password
        }
    }

    return (
        <div className='register-container'>
            <h3>Register</h3>
            <div className='form'>
                <InputGroup
                    labelText="Nome"
                    inputType="text"
                    inputId="name"
                    placeholder="Digite seu primeiro nome"
                    setState={setName}
                />
                <InputGroup
                    labelText="Sobrenome"
                    inputType="text"
                    inputId="lastName"
                    placeholder="Digite seu sobrenome"
                    setState={setLastName}
                />
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
                <InputGroup
                    labelText="Confirmar senha"
                    inputType="password"
                    inputId="validatePassword"
                    placeholder="Confirme sua senha"
                    setState={setValidatePassword}
                />
                 {
                    (registering) ?
                        <CircularProgress
                            style={
                                {
                                    color: '#00ff65',
                                    margin: 'auto'
                                }
                            }
                        /> :
                        <button onClick={() => { register() }}>register</button >
                }
                <span></span>
                <Link href="/login">Fazer login</Link>
            </div>
        </div>
    )
}