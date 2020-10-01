import '../styles/globals.css';
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import LayoutMain from './layouts/generallayout';
import LayoutAdmin from './layouts/adminlayout';
import {useRouter} from 'next/router';
function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();
  const currentUrl = router.asPath;
  return (
    <Provider store={store}>
        {!currentUrl.includes("admin") ? <LayoutMain><Component className="global" {...pageProps} /></LayoutMain> : <LayoutAdmin><Component {...pageProps} /></LayoutAdmin>}
    </Provider>
  );
}

export default MyApp
