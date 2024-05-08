import React from 'react'
import './userscrollable.css';

interface FormFieldProps {
    action: string
    type: string
    label: string
    placeholder: string
    value: any
    onChange?: (...args: any) => any
}

function UserScrollable({ action, type, label, placeholder, onChange = () => { }, value }: FormFieldProps) {
    return (
        <>
            <div className={action + "__field__" + type}>
                <div className={action + "__field__" + type + "_text"}>{label}</div>
                <input className={action + "__field__" + type + "_input"} placeholder={placeholder}
                    onChange={e => {
                        onChange(e)
                    }} value={value} type={(label === 'Senha' || label === 'Confirmar Senha') ? 'password' : ''}></input>
            </div>
        </>
    )
}

export default UserScrollable