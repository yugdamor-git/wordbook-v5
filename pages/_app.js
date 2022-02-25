import Layout from '../components/layout'
import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';


function MyApp({ Component, pageProps }) {

  return <Layout>
    <NextNProgress
    options={{ easing: 'ease', speed: 500,showSpinner: false }}
    color="#6468fc"
    startPosition={0.3}
    stopDelayMs={200}
    height={3}
    showOnShallow={false}
  />
    <Component {...pageProps} />
    
    </Layout>
}

export default MyApp
