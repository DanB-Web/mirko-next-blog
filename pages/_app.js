import Head from 'next/head'
import NavBar from '../components/NavBar'
import '../styles/globals.css'

/*
Default props:
Component - the page being rendered for the url path
pagesProps - the props for the rendered page
*/

const App = ({Component, pageProps}) => {
  console.log('[App] rendered')
  return (
    <>
      <Head>
        <link rel="icon" href="icons/favicon.ico" />
      </Head>
      <header>
        <NavBar/>
      </header>
      <Component {...pageProps}/>
    </>
    
  )
}

export default App