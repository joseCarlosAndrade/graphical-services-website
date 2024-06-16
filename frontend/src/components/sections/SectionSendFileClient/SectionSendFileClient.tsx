import React, { useEffect, useState } from 'react'
import './sectionsendfileclient.css';
import { createRequest } from '../../../services';
import { requestModel } from '../../../types/requestModel';

// import 'react-dropzone';

interface SectionSendFileClientPageProps {
  fontSize: number
}

function SectionSendFileClient(props: SectionSendFileClientPageProps) {
  // const input : HTMLInputElement | null= document.querySelector(".sendFile--loadfile-input");

  const label: HTMLLabelElement | null = document.querySelector(".file--label");
  let [textoFile, setTextoFile] = useState("Nenhum arquivo selecionado");
  let [fileUrl, setFileUrl] = useState('');
  const [selectedValue, setSelectedValue] = useState('example');

  // Função para criar a URL em alguma plataforma cloud (amazon?)
  const createUrl = async () => {

    // utilizar setFileUrl para setar a string da url
    setFileUrl("example.com");
  }

  // após o usuário clicar em enviar, manda o request para criar na base de dados
  const handleFileToSend = async () => {
    await createUrl();

    const request: requestModel = {
      title: selectedValue,
      url: fileUrl
    }
    const ans = await createRequest(request)
    console.log(ans);
  }

  // Update the selectedValue state variable with the new selected value
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  }

  return (
    <>
      <div className='sendFileContainer' style={{ fontSize: `${props.fontSize}rem` }}>
        <div className='sendFile--boldText-box'>
          <text className='sendFile--boldText-box-text'>Enviar aquivos CDR para orçamento</text>
        </div>


        <div className='sendFile--productType'>
          {/* <text className='sendFile--productType-text'></text> */}
          <div role="form" className='sendFile--productType-dropbox'>
            <label htmlFor='product-type' className='sendFile--productType-dropbox-dropbtn'>Selecione o tipo de produto aqui! É tudo muito fácil.</label>
            <select name="product-type" id="product-type" onChange={handleSelectChange}>
              <option value='opcao1'>Opcao 1</option>
              <option value='opcao2'>Opcao 2</option>
              <option value='opcao3'>Opcao 3</option>
            </select>
          </div>
        </div>

        {/* divider */}
        <div className='sendFile--divider'></div>

        {/* Drag and Drop */}
        <div className='sendFile--loadfile'>
          <text className='sendFile--loadfile-text'>Carregue o arquivo desejado aqui <br></br> ou arraste-o até a caixa indicada.</text>

          {/* <button className='sendFile--loadfile-button'>Carregue arquivos CDR</button> */}

          <label htmlFor="sendFile-input" className='file--label'
            onDragEnter={() => {
              label?.classList.add("active");
            }}
            onDrop={() => { label?.classList.remove("active"); }}
            onDragEnd={() => { label?.classList.remove("active"); }}
            onDragLeave={() => { label?.classList.remove("active"); }}>

            <div className='sendFile--loadfile-dropzone'>
              <p className='sendFile--loadfile-text-inside'>Clique ou arraste-os aqui.</p>
            </div>

            <input type='file' className='sendFile--loadfile-input' id='sendFile-input'
              onChange={(ev) => {
                const file = ev.target.files && ev.target.files[0];
                if (file) {
                  setTextoFile(file.name);
                } else {
                  setTextoFile("");
                }

              }}></input>
          </label>

          <div className='sendFile-fileName'>Arquivo: {textoFile}</div>
          {/* <div className='dragndrop'></div> */}

        </div>

        {/* divider */}
        <div className='sendFile--divider'></div>

        <div className='sendFile--send'>
          <div className='sendFile--send-text'>Agora é só clicar em enviar</div>
          <button className='sendFile--send-button' onClick={() => {
            handleFileToSend()
            alert("Dados enviados com sucesso!")
          }}>Enviar</button>
        </div>
      </div>
    </>
  )
}

export default SectionSendFileClient