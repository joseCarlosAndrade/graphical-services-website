import React, { useRef } from 'react'
import './sectionquoting.css';
import { useEffect, useState } from 'react';
import { adminAuth, getAllUsers } from '../../../services';
import { download, upload } from '../../../assets';
import { UserScrollable } from '../../index';
import { UserDBData } from '../../../types/userModel';

interface SectionQuotingProps {
  pageFont: number
}

function SectionQuoting({ pageFont }: SectionQuotingProps) {
  const [searchValue, setSearchValue] = useState("");
  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
  const [display, setDisplay] = useState(false);
  const [users, setUsers] = useState([]);

  const label: HTMLLabelElement | null = document.querySelector('.label--fileQuoting');

  const [textoFile, setTextoFile] = useState("Nenhum arquivo selecionado.");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  // gets user session on reload
  useEffect(() => {
    const load = async () => {
      const result = await adminAuth(); // Immediately invoke the async function
      if (result) {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } else {
        console.error(result);
      }
    }
    load();
  }, [])

  // const displayScrollable = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   const scrollable = document.querySelector('.fileQuoting--scrollableList');
  //   if (scrollable && display == false) {
  //     event.currentTarget.style.transform = 'translate(10rem)';
  //     (scrollable as HTMLElement).style.display = 'block';
  //     setDisplay(true);
  //   } else {
  //     event.currentTarget.style.transform = 'translate(0rem)';
  //     (scrollable as HTMLElement).style.display = 'none';
  //     setDisplay(false);
  //   }
  // }

  return (
    <>
      <div className="fileQuoting--container" style={{ fontSize: `${pageFont}rem` }}>

        <input className="fileQuoting--userList-searchbar" type="text" placeholder="search names" onChange={e => { handleInputChange(e) }} ></input>
        <div className='fileQuoting--userList-label'>
          <div>Nome</div>
          <div>Arquivos a cotar</div>
        </div>
        <div className="fileQuoting--userList" role="list">
          {users.map((user: UserDBData) => {
            return (
              <div className='fileQuoting--userList-item' role="listitem">
                <div>{user.displayName}</div>
                <div className='fileQuoting--userList-item-number'>{user.reqCount}</div>
              </div>
            )
          })}
        </div>

        {/* <button onClick={displayScrollable} className='fileQuoting--responsive--button'>=</button>
        <UserScrollable className="fileQuoting--scrollableList" search={searchValue} onChange={e => handleInputChange(e)} />

        <div className="fileQuoting">
          <div className="fileQuoting--text">Solicitação de orçamento de molde</div>
          <button className="fileQuoting--button">
            <img className="fileQuoting--img" src={download} alt='Icone download'></img>
            Faça o download do arquivo aqui
          </button>
          <div className="division"></div>
          <div className="fileQuoting--text">Escreva o orçamento</div>

          

          <button className='fileQuoting--send'>Enviar</button>
        </div> */}
      </div>
    </>
  )
}

export default SectionQuoting