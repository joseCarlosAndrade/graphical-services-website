import './sectionproducts.css'

interface SectionProductPageProps {
  bottomText: string, // Puedes usar ReactNode o string, dependiendo de tu caso de uso
  sourceImage: string,
  altText : string
}

function SectionProductsPage({ bottomText, sourceImage, altText }: SectionProductPageProps) {

  return (
    <>
      <article className='container--products'>
        <img alt={altText} src={`${sourceImage}`} className='container--image' />
        <p className='container--childText'>{bottomText}</p>
      </article>
    </>
  )
}

export default SectionProductsPage