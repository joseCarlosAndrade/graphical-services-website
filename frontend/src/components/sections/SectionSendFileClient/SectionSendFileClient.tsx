import React from 'react'
import './sectionsendfileclient.css';

function SectionSendFileClient() {
  return (
    <>
        <div className='sendFileContainer'>
            <div className='sendFile--boldText-box'>
                <text className='sendFile--boldText-box-text'>Enviar aquivos CDR para orçamento</text>
            </div>

            <div className='sendFile--productType'>
                <text className='sendFile--productType-text'></text>
                <div className='sendFile--productType-dropbox'>
                    <text className='sendFile--productType-dropbox-dropbtn'>Selecione o tipo de produto aqui! É tudo muito fácil.</text>
                    <div className='sendFile--productType-dropbox-contents'>
                        <button>Opcao 1</button>
                        <button>Opcao 2</button>
                        <button>Opcao 3</button>
                    </div>
                </div>
            </div>

            <div className='sendFile--divider'></div>

            <div className='sendFile--loadfile'>
                <text className='sendFile--loadfile-text'>Carregue o arquivo desejado aqui ou arraste-o até a caixa indicada.</text>
                <button className='sendFile--loadfile-button'>Carregue arquivos CDR</button>
                <div className='dragndrop'></div>
                <input type='file' className='sendFile--loadfile-drag'></input>
            </div>

            <div className='sendFile--divider'></div>

            <div className='sendFile--send'>
                <div className='sendFile--send-text'>Agora é só clicar em enviar</div>
                <button className='sendFile--send-button'>Enviar</button>
            </div>
        </div>
    </>
  )
}

export default SectionSendFileClient