import React from 'react'
import './formfield.css';

interface FormFieldProps {
    action: string
    type: string
    label: string
    placeholder: string
    value: any
    onChange?: (...args: any) => any
}

function FormField({ action, type, label, placeholder, onChange = () => { }, value }: FormFieldProps) {
    return (
        <>
            <div className={action + "__field__" + type}>
                <div className={action + "__field__" + type + "_text"}>{label}</div>
                <input className={action + "__field__" + type + "_input"} placeholder={placeholder}
                    onChange={e => {
                        onChange(e)
                    }} value={value}></input>
            </div>
        </>
    )
}

export default FormField