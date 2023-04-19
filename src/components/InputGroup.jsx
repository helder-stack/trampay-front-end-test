export default function InputGroup({labelText, inputType, inputId, placeholder, setState}) {
    return (
        <div className="input-group">
            <label>{labelText}</label>
            <input type={inputType} id={inputId} placeholder={placeholder} onKeyUp={function(e){setState(e.target.value)}}/>
        </div>
    )
}