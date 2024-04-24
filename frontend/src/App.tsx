import React, { useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
// import {  } from './components';
import { fontSizes } from './types/interfacePageProps';
import { Homepage, LoginPage, VerifyEmailPage, SendFileClientPage} from './pages';



function App() {

  const [theme, setTheme] = useState('light');
  const [action, setAction] = useState('login')

 

  const [fontSizesHolder, setFontSizesHolder] = useState<fontSizes>( {
    accessButtonFont: 1.2,

    headerFont : 0.8,
    homepageFont : 0.9,
    footerFont : 1,

    loginFont : 1

  });


  const changeFont = (i : number) => {
    const changeFactor: number = 0.2
    setFontSizesHolder(prevState => ({
      accessButtonFont: prevState.accessButtonFont + (i === 1 ? changeFactor : -changeFactor),
      headerFont: prevState.headerFont + (i === 1 ? changeFactor : -changeFactor),
      homepageFont: prevState.homepageFont + (i === 1 ? changeFactor : -changeFactor),
      footerFont: prevState.footerFont + (i === 1 ? changeFactor : -changeFactor),
      loginFont: prevState.loginFont + (i === 1 ? changeFactor : -changeFactor),
    }));
  }

  return (
    // <Router>
    <>
      <Routes>
        <Route path="/" element={
          <Homepage 
            theme={theme} 
            setTheme={setTheme} 
            action={action} 
            setAction={setAction}
            fontSizes={fontSizesHolder} 
            setFontsSizes={changeFont}/>
          } />
        <Route path="/login" element={
          <LoginPage 
            theme={theme} 
            setTheme={setTheme} 
            action={action} 
            setAction={setAction}
            fontSizes={fontSizesHolder}
            setFontsSizes={changeFont} />} />
        <Route path="/verify-email" element={
          <VerifyEmailPage
            theme={theme}
            setTheme={setTheme}
            action={action}
            setAction={setAction}
            fontSizes={fontSizesHolder}
            setFontsSizes={changeFont} />} />

        <Route path='/sendfile' element={
          <SendFileClientPage 
            theme={theme}
            setTheme={setTheme}
            action={action}
            setAction={setAction}
            fontSizes={fontSizesHolder}
            setFontsSizes={changeFont}
          
          />
        }></Route>
      </Routes>
      </>
    // </Router>
  );
}

export default App;
