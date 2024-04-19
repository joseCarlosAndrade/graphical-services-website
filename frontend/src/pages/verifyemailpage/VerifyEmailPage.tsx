import React, { useEffect } from 'react';
import { Header, Footer, AccessibilityTab, SectionVerifyEmail } from '../../components';
import './verifyemailpage.css';

interface VerifyEmailProps {
    theme: string,
    setTheme: (args0: string) => void,
    action: string,
    setAction: (args0: string) => void,
    fontSizes: fontSizes,
    setFontsSizes: (args0: number) => void,
}

interface fontSizes {
    accessButtonFont: number,

    headerFont: number,
    homepageFont: number,
    footerFont: number,

    loginFont: number,
}

function VerifyEmailPage({ theme, setTheme, action, setAction, fontSizes, setFontsSizes }: VerifyEmailProps) {
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-dark)');
            document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-dark)');
        } else {
            document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-light)');
            document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-light)');
        }
    }, [theme])

    return (
        <>
            <AccessibilityTab currentTheme={theme} setCurrentTheme={setTheme} fontSizes={fontSizes} setFontSizes={setFontsSizes}></AccessibilityTab>
            <Header currentAction={action} setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>
            <SectionVerifyEmail currentTheme={theme} homepageFont={fontSizes.homepageFont}></SectionVerifyEmail>
            <Footer></Footer>
        </>
    )
}

export default VerifyEmailPage