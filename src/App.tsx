import React from 'react';
import { Route, Routes } from 'react-router-dom';
//import { Loadable } from 'react-loadable';
import Header from './components/Header'

import './scss/app.scss'
import NotFound from './pages/NotFound';
import { FC, Suspense, lazy } from 'react';
// import Cart from './pages/Cart';
// import Cart from './pages/Cart';


// const Cart = Loadable({
//   loader: () => import('./pages/Cart'),
//   loading : () => <div>тут будет спинер</div>
// })

 const Cart = lazy(() => import("./pages/Cart"))
 const Main = lazy(() => import("./pages/Main"))

const App : FC = () => {

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/react-pizza-ts" element={
            <Suspense fallback="sdsdsd">
              <Main />
            </Suspense>
          }/>
          
          <Route path="react-pizza-ts/cart" element={
            <Suspense fallback=" dsds">
              <Cart/>
            </Suspense>
          }/>
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
