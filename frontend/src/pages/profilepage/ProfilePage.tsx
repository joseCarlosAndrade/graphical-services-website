import React, { useEffect } from 'react';
import { Header, Footer, AccessibilityTab, SectionProfile } from '../../components';
import { PageProps } from '../../types/interfacePageProps'
import './profilepage.css';


function ProfilePage({ theme, setTheme, action, setAction, fontSizes, setFontsSizes }: PageProps) {
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

            <SectionProfile currentAction={action} setCurrentAction={setAction} pageFont={fontSizes.loginFont} ></SectionProfile>

            <Footer footerFont={fontSizes.footerFont}></Footer>

        </>
    )
}

export default ProfilePage