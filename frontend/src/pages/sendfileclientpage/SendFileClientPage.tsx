import React, { useEffect } from 'react'

import { PageProps } from '../../types/interfacePageProps'
import { Header, Footer, AccessibilityTab,  } from '../../components';
import SectionSendFileClient from '../../components/sections/SectionSendFileClient/SectionSendFileClient';
import './sendfileclientpage.css';

import { setCSSVar } from './../../utils';

function SendFileClientPage( props: PageProps) {

    useEffect(() => {
        if (props.theme === 'dark') {
        //   document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-dark)');
        //   document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-dark)');
            setCSSVar('--text-color', 'var(--text-color-dark)');
            setCSSVar('--text-bold', 'var(--text-bold-dark)');
        } else {
        //   document.documentElement.style.setProperty('--sign-text-color-var', 'var(--sign-text-color-light)');
        //   document.documentElement.style.setProperty('--sign-textBold-color-var', 'var(--sign-textBold-color-light)');
            setCSSVar('--text-color', 'var(--text-color-light)');
            setCSSVar('--text-bold', 'var(--text-bold-light)');
        }
      }, [props.theme])

    return (
    <>
        <AccessibilityTab currentTheme={props.theme} setCurrentTheme={props.setTheme} fontSizes={props.fontSizes} setFontSizes={props.setFontsSizes}></AccessibilityTab>
        <Header currentAction={props.action} setCurrentAction={props.setAction} headerFontSize={props.fontSizes.headerFont}></Header>
        <SectionSendFileClient></SectionSendFileClient>
        <Footer></Footer>
    </>
    )
}

export default SendFileClientPage