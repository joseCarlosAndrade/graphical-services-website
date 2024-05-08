import { Header, Footer, SectionProductsPage, AccessibilityTab } from '../../components';
import {PageProps} from '../../types/interfacePageProps';
import {agenda, caja, cajaTorta, baseTorta, search} from '../../assets';


const products = [
    {
      bottomText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sourceImage: agenda
    },
    {
      bottomText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sourceImage: caja
    },
    {
      bottomText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sourceImage: cajaTorta
    },
    {
      bottomText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      sourceImage: baseTorta
    }
  ]

export default function ProductsPage({theme, setTheme, fontSizes, setFontsSizes, action, setAction} : PageProps) {
  
  return (
    <>
        <AccessibilityTab 
        currentTheme={theme}
        setCurrentTheme={setTheme}
        fontSizes={fontSizes}
        setFontSizes={setFontsSizes}
        ></AccessibilityTab>
        <Header currentAction='register' setCurrentAction={setAction} headerFontSize={fontSizes.headerFont}></Header>
        <h1 className='titleProducts'>PRODUTOS</h1>
        <form>
          <div className='searchBarContainer'>
            <input type='search' placeholder='Pesquisar produtos'></input>
            
              <img src={search} className='imageSearch'>
              </img>
          </div>
          
        </form>
        <section className='sectionProducts'>
        {products.map( (product) => (
            <SectionProductsPage   
            bottomText={product.bottomText}
            sourceImage={product.sourceImage} 
            ></SectionProductsPage>
        ))
        }
        </section>
        
        <Footer></Footer>
    </>
  )
}

