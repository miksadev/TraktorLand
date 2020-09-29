import '../styles/globals.css';
import { Provider } from "react-redux";
import { useStore } from "../store/store";
import LayoutMain from './layouts/generallayout';
import LayoutAdmin from './layouts/adminlayout';

function MyApp({ Component, pageProps }) {

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
        {"a" == "a" ? <LayoutMain><Component className="global" {...pageProps} /></LayoutMain> : <LayoutAdmin><Component {...pageProps} /></LayoutAdmin>}
    </Provider>
  );
}

export default MyApp
