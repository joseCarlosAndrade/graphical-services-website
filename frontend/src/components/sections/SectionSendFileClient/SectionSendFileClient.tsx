import React, { useEffect, useState } from 'react'
import './sectionsendfileclient.css';

// import 'react-dropzone';

function SectionSendFileClient() {
    // const input : HTMLInputElement | null= document.querySelector(".sendFile--loadfile-input");

    const label : HTMLLabelElement | null = document.querySelector(".file--label");
    let [textoFile, setTextoFile] = useState("Nenhum arquivo selecionado"); 
   

  return (
    <>
        <div className='sendFileContainer'>
            <div className='sendFile--boldText-box'>
                <text className='sendFile--boldText-box-text'>Enviar aquivos CDR para orçamento</text>
            </div>

            
            <div className='sendFile--productType'>
                {/* <text className='sendFile--productType-text'></text> */}
                <div className='sendFile--productType-dropbox'>
                    <label htmlFor='product-type' className='sendFile--productType-dropbox-dropbtn'>Selecione o tipo de produto aqui! É tudo muito fácil.</label>
                    <select name="product-type" id="product-type">
                        <option value='opcao1'>Opcao 1</option>
                        <option value='opcao2'>Opcao 2</option>
                        <option value='opcao3'>Opcao 3</option>
                    </select>
                        
                        {/* <div className='sendFile--productType-dropbox-contents'>
                        <button>Opcao 1</button>
                        <button>Opcao 2</button>
                        <button>Opcao 3</button>
                    </div> */}
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
                    // console.log("entering");

                
                }}
                onDrop={()=>{
                   
                    label?.classList.remove("active"); 
                    }}
                onDragEnd={()=>{label?.classList.remove("active");}}
                onDragLeave={()=>{label?.classList.remove("active");}}>
                        
                    <div className='sendFile--loadfile-dropzone'>
                        <p className='sendFile--loadfile-text'>Clique ou arraste-os aqui.</p>
                    </div>

                    <input type='file' className='sendFile--loadfile-input' id='sendFile-input'
                    onChange={(ev)=>{
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
                <button className='sendFile--send-button' onClick={() => {alert("Dados enviados com sucesso!")}}>Enviar</button>
            </div>
        </div>
    </>
  )
}

export default SectionSendFileClient