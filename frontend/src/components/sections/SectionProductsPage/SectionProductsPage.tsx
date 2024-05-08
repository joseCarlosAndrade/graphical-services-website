import React, { ReactNode } from 'react'
import './sectionproductspage.css'

interface SectionServicePageProps {
    bottomText: string, // Puedes usar ReactNode o string, dependiendo de tu caso de uso
    sourceImage: string,
}

function SectionProductsPage ({bottomText, sourceImage}: SectionServicePageProps)
{
    
    return(
        <>
        <form>
            
        </form>
        <article className='container'>
            <img src={`${sourceImage}`} className='imagem'/>
            <p className='childText'>{bottomText}</p>
        </article>
        </>
    )
}

export default SectionProductsPage