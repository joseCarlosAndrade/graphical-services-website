import React from 'react'
import './sectionhomepage.css';
import { machine } from '../../assets';
import { getCookie } from '../../utils/cookie';
import { useEffect } from 'react';

interface HomepageProps {
  currentTheme : string,
  homepageFont? : number
}

function SectionHomepage({ currentTheme, homepageFont }: HomepageProps) {
  useEffect(() => {
    fetchData(); // Immediately invoke the async function
  }, [])
  const fetchData = async () => {
    try {
      const token = getCookie('token')
      // console.log('testing for token: ', token)
      const res = await fetch(`http://localhost:8080/protected`, {
        method: 'GET',
        headers: { 'X-JWT-Token': token || '' },
      });
      const resObject = await res.json();
      console.log(resObject.message)
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  return (
    <>
     <section className="homepage">
        <div className="homepage--slide">
            <img className= "homepage--slide-image" src={machine} alt="Máquina usada pela empresa"/>

            <div className="homepage--slide-leftbutton"></div>
            <div className="homepage--slide-rightbutton"></div>
        </div>

        <div style={{fontSize: `${homepageFont}rem`}}  className="homepage--text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
        </div>

    </section>
    </>
  )
}

export default SectionHomepage