import React from 'react'

import { PageProps } from '../../types/interfacePageProps'
import { Header, Footer, AccessibilityTab,  } from '../../components';
import SectionSendFileClient from '../../components/sections/SectionSendFileClient/SectionSendFileClient';

function SendFileClientPage( props: PageProps) {

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