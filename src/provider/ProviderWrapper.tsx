import React, { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/storages/store'

interface Props{
    children : ReactNode
}

const ProviderWrapper : FC<Props> = ({children} : Props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </BrowserRouter>
  )
}

export default ProviderWrapper