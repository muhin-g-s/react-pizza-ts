import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import {persistor, store} from './storages/store'
import { PersistGate } from 'redux-persist/integration/react'


const rootEl = document.getElementById('root')

if (rootEl) {

    const root = ReactDOM.createRoot(rootEl);

    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </BrowserRouter>,
    );
}


