import React, { useRef } from 'react'
import './sectionquoting.css';
import { useEffect, useState } from 'react';
import { fetchData } from '../../../services';
import { download, upload } from '../../../assets';
import { UserScrollable } from '../../index';

interface SectionQuotingProps {
  pageFont: number
}

function SectionQuoting({ pageFont }: SectionQuotingProps) {
  const [useCookie, setUseCookie] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
  const [display, setDisplay] = useState(false);

  const label: HTMLLabelElement | null = document.querySelector('.label--fileQuoting');

  const [textoFile, setTextoFile] = useState("Nenhum arquivo selecionado.");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  // gets user session on reload
  useEffect(() => {
    fetchData(); // Immediately invoke the async function
  }, [])

  const displayScrollable = (event: React.MouseEvent<HTMLButtonElement>) => {
    const scrollable = document.querySelector('.fileQuoting--scrollableList');
    if (scrollable && display == false) {
      event.currentTarget.style.transform = 'translate(10rem)';
      (scrollable as HTMLElement).style.display = 'block';
      setDisplay(true);
    } else {
      event.currentTarget.style.transform = 'translate(0rem)';
      (scrollable as HTMLElement).style.display = 'none';
      setDisplay(false);
    }
  }

  return (
    <>
      <div className="fileQuoting--container" style={{ fontSize: `${pageFont}rem` }}>

        <button onClick={displayScrollable} className='fileQuoting--responsive--button'>=</button>
        <UserScrollable className="fileQuoting--scrollableList" search={searchValue} onChange={e => handleInputChange(e)} />

        <div className="fileQuoting">
          <div className="fileQuoting--text">Solicitação de orçamento de molde</div>
          <button className="fileQuoting--button">
            <img className="fileQuoting--img" src={download} alt='Icone download'></img>
            Faça o download do arquivo aqui
          </button>
          <div className="division"></div>
          <div className="fileQuoting--text">Envio de orçamento</div>
          <button className="fileQuoting--button">
            <img className="fileQuoting--img" src={upload} alt='Icone upload'></img>
            Selecionar arquivos
          </button>

          <label className='label--fileQuoting' htmlFor="fileQuoting--dragndrop-input"
            onDragEnter={() => {
              label?.classList.add("active");
            }}
            onDrop={() => { label?.classList.remove("active"); }}
            onDragEnd={() => { label?.classList.remove("active"); }}
            onDragLeave={() => { label?.classList.remove("active"); }}>

            <div className='fileQuoting--dragndrop'>
              Arraste arquivos aqui
            </div>


            <input type='file' id='fileQuoting--dragndrop-input'
              onChange={(ev) => {
                const file = ev.target.files && ev.target.files[0];
                if (file) {
                  setTextoFile(file.name);
                } else {
                  setTextoFile("");
                }

              }}></input>
          </label>
          <div className='fileQuoting--send-fileName'>{textoFile}</div>

          <button className='fileQuoting--send'>Enviar</button>
        </div>
      </div>
    </>
  )
}

export default SectionQuoting