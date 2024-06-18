import React, { useState } from 'react';
import './sectionsendfileclient.css';
import { createRequest } from '../../../services';
import { requestModel } from '../../../types/requestModel';
import AWS from 'aws-sdk';

interface SectionSendFileClientPageProps {
  fontSize: number;
}

function SectionSendFileClient(props: SectionSendFileClientPageProps) {
  const [textoFile, setTextoFile] = useState("Nenhum arquivo selecionado");
  const [selectedValue, setSelectedValue] = useState('example');
  const [file, setFile] = useState<File | null>(null);

  // Configuração do AWS S3 p2
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION
  });

  const s3 = new AWS.S3();
  const bucketName = 'server-test-graphical-services';

  // Função para criar a URL em alguma plataforma cloud (Amazon S3)
  const createUrl = async (file: File) => {
    const params = {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read'
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (err) {
      console.error('Erro ao fazer upload no S3:', err);
      throw new Error('Erro ao fazer upload no S3');
    }
  }

  const handleFileToSend = async () => {
    if (!file) {
      alert('Por favor, selecione um arquivo.');
      return;
    }

    try {
      const url = await createUrl(file);

      const request: requestModel = {
        title: selectedValue,
        url: url
      }
      const ans = await createRequest(request);
      console.log(ans);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error('Erro ao criar a URL:', error);
      alert("Erro ao enviar os dados.");
    }
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
          <div role="form" className='sendFile--productType-dropbox'>
            <label htmlFor='product-type' className='sendFile--productType-dropbox-dropbtn'>
              Selecione o tipo de produto aqui! É tudo muito fácil.
            </label>
            <select name="product-type" id="product-type" onChange={handleSelectChange}>
              <option value='opcao1'>Opcao 1</option>
              <option value='opcao2'>Opcao 2</option>
              <option value='opcao3'>Opcao 3</option>
            </select>
          </div>
        </div>

        <div className='sendFile--divider'></div>

        <div className='sendFile--loadfile'>
          <text className='sendFile--loadfile-text'>
            Carregue o arquivo desejado aqui <br></br> ou arraste-o até a caixa indicada.
          </text>

          <label htmlFor="sendFile-input" className='file--label'>
            <div className='sendFile--loadfile-dropzone'>
              <p className='sendFile--loadfile-text-inside'>Clique ou arraste-os aqui.</p>
            </div>

            <input type='file' className='sendFile--loadfile-input' id='sendFile-input'
              onChange={(ev) => {
                const file = ev.target.files && ev.target.files[0];
                if (file) {
                  setTextoFile(file.name);
                  setFile(file);
                } else {
                  setTextoFile("Nenhum arquivo selecionado");
                  setFile(null);
                }
              }}></input>
          </label>

          <div className='sendFile-fileName'>Arquivo: {textoFile}</div>
        </div>

        <div className='sendFile--divider'>
        </div>

        <div className='sendFile--send'>
          <div className='sendFile--send-text'>Agora é só clicar em enviar</div>
          <button className='sendFile--send-button' onClick={handleFileToSend}>Enviar</button>
        </div>
      </div>
    </>
  )
}

export default SectionSendFileClient;
