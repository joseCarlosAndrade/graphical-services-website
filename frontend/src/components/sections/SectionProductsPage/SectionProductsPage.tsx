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
        <article className='container--products'>
            <img src={`${sourceImage}`} className='container--image'/>
            <p className='container--childText'>{bottomText}</p>
        </article>
        </>
    )
}

export default SectionProductsPage