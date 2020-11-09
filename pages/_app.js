import '../styles/globals.css';
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import LayoutMain from './layouts/generallayout';
import LayoutAdmin from './layouts/adminlayout';
import {useRouter} from 'next/router';
import { loadState , saveState } from '../store/localStorage';

function MyApp({ Component, pageProps }) {

  const persistedState = loadState();
  const store = useStore(persistedState);

  store.subscribe(() => {
    saveState({
      items: store.getState().items,
      price: store.getState().price
    });
  })

  const router = useRouter();
  const currentUrl = router.asPath;
  
  return (
    <Provider store={store}>
    
        {!currentUrl.includes("admin") ? <LayoutMain><Component className="global" {...pageProps} /></LayoutMain> : <LayoutAdmin><Component {...pageProps} /></LayoutAdmin>}
    
    </Provider>
  );
}

export default MyApp
