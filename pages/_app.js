import '../styles/globals.css'
import Header from '../components/navigation/header';
import Footer from '../components/navigation/Footer/footer';
import Head from 'next/head';
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import Wrapper from '../components/UI/Cart/Wrapper/wrapper';
import Cart from '../components/Cart/cart';

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
        <Head>
          <title>TraktorLand</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"></link>
        </Head>
        <Header/>
          <Wrapper/>
          <Cart/>
          <Component {...pageProps} />
        <Footer/>
      </Provider>
  );
}

export default MyApp
