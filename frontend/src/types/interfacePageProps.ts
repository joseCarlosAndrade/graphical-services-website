
// implementing an interface to all pages that use it
export interface PageProps {
  theme: string,
  setTheme: (args0: string) => void,
  action: string,
  setAction: (args0: string) => void,
  fontSizes : fontSizes,
  setFontsSizes : (args0 : number) => void,
}
  

export interface fontSizes {
  accessButtonFont : number,

  headerFont : number,
  homepageFont : number,
  servicePageFont: number,
  whoAreWePageFont: number,
  productPageFont: number,
  footerFont: number,
  sendFilePageFont: number,

  loginFont : number,
}
