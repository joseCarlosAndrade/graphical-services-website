import React, { ReactNode } from 'react'
import './sectionwhowarewe.css'
import {agenda, caja} from '../../../assets';

interface SectionWhoAreWePageProps {
    somosFontSize: number
}

function SectionProductsPage ({somosFontSize}: SectionWhoAreWePageProps)
{
    
    return(
        <>

        <article className='containerSomos'>
            <img src={agenda} className='imageSomos'/>
            <p className='containerText' style={{ fontSize: `${somosFontSize}rem` }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </article>

        <article className='containerSomos'>
            <p className='containerText' style={{ fontSize: `${somosFontSize}rem` }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <img src={caja} className='imageSomos'/>
        </article>
        </>
    )
}

export default SectionProductsPage