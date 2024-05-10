import React from 'react'
import './sectionquoting.css';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../services';
import { download, upload } from '../../../assets';
import { UserScrollable } from '../../index';

interface SectionQuotingProps {
    currentAction: string
    setCurrentAction: (args0: string) => void
    pageFont: number
}

function SectionQuoting({ currentAction, setCurrentAction, pageFont }: SectionQuotingProps) {
    const [useCookie, setUseCookie] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    }

    // gets user session on reload
    useEffect(() => {
        fetchData(); // Immediately invoke the async function
    }, [])

    return (
        <>
            <div className="fileQuoting--container">
                <UserScrollable className="fileQuoting--scrollableList" search={searchValue} onChange={e => handleInputChange(e)} />
                <div className="fileQuoting">
                    <div className="fileQuoting--text">Solicitação de orçamento de molde</div>
                    <button className="fileQuoting--button">
                        <img className="fileQuoting--img" src={download}></img>
                        Faça o download do arquivo aqui
                    </button>
                    <div className="division"></div>
                    <div className="fileQuoting--text">Envio de orçamento</div>
                    <button className="fileQuoting--button">
                        <img className="fileQuoting--img" src={upload}></img>
                        Selecionar arquivos
                    </button>
                    <div className='fileQuoting--dragndrop'></div>
                    <button className='fileQuoting--send'>Enviar</button>
                </div>
            </div>
        </>
    )
}

export default SectionQuoting