import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Upload() {

    const dispatch = useDispatch();
    const router = useRouter()

    const [file, setFile] = useState()
    const [content, setContent] = useState()

    async function readFile(e) {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            setContent(text)
        };
        setFile(e.target.files[0])
        reader.readAsText(e.target.files[0])
    }

    useEffect(() => {
        if (content) {
            let [header] = content.split('\n')
            header = formatLine(header)
            const lines = content.split('\n').map(line => formatLine(line))
            lines.shift()
            const invalid = lines.filter(line => isNaN(line[0]) || isNaN(line[1]))
            dispatch({
                type: 'SET_FILE',
                payload: {
                    file,
                    header,
                    lines,
                    invalid: invalid.length
                }
            })
        }
    }, [content])

    function formatLine(line) {
        return line.split(',').map(row => {
            row = row.replace('\r', '')
            return row
        })
    }

    function listclients() {
        router.push('/list')
    }

    function downloadExampleFile() {
        router.push("/example.csv")
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
            <img src="/upload.svg" className="uploadImg" />
            <div className="file-controls">
                <label htmlFor="uploadFile">ENVIAR ARQUIVO</label>
                <input name="uploadFile" type="file" id="uploadFile" style={{ width: "80%" }} accept={".csv"}
                    onChange={(e) => { readFile(e) }} />
                <div className="footer">
                    <span style={{ cursor: 'pointer' }} onClick={downloadExampleFile}>Baixar arquivo de exemplo</span>
                    <span style={{ cursor: 'pointer' }} onClick={listclients}>Ver clientes</span>
                    <span id="logout" style={{ cursor: 'pointer' }} onClick={logout}>Sair</span>
                </div>
            </div>
        </>
    )
}