import React from 'react'
import './sectionverifyemail.css';
import { useEffect } from 'react';
import { verifyEmail } from '../../services';

interface HomepageProps {
    currentTheme: string,
    homepageFont?: number
}

function SectionVerifyEmail({ currentTheme, homepageFont }: HomepageProps) {
    useEffect(() => {
        verifyEmail();
    }, [])
    return (
        <>
            <h1>
                Email Verified!
            </h1>
        </>
    )
}

export default SectionVerifyEmail