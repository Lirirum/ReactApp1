import React from 'react';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Header from './components/Main/Header.jsx';
import Footer from './components/Main/Footer.jsx';
import CartMenu from './components/Menu/CartMenu.jsx';
import Authorization from './components/Forms/Authorization.jsx';
import { ColorModeContext, useMode } from './theme';
import Topbar from "./pages/global/TopBar.jsx"
import SideBar from "./pages/global/SideBar.jsx";
import ProductDetail from './pages/ProductDetail.jsx';
import Body from './pages/Body';
import Product from './pages/product';
import ProductForm from './pages/form';
import CurrencyTracker from "./pages/CurrencyTracker.jsx"
import { store, persistor } from './store';

const AdminApp = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = React.useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="admin app">
                    <SideBar isSidebar={isSidebar} />
                    <main className="admin content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Routes>
                            <Route path="/productList" element={<Product />} />
                            <Route path="/" element={<ProductForm />} />
                            <Route path="/convector" element={< CurrencyTracker />} />
                        </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

const ClientApp = () => (
  
        <div className="client app">
            <Header />
            <main className="client content">
        <Routes>

            <Route path="/" element={<Body />} />
            <Route path="/product/:id" element={<ProductDetail />} />
           
                </Routes>
            </main>
        <Footer></Footer>
   
    </div>
);

const mapStateToProps = (state) => ({
    menuIsOpen: state.cart.cartMenu,
});

const ConnectedClientApp = connect(mapStateToProps)(ClientApp);

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        
                <CartMenu></CartMenu>
                <Authorization></Authorization>
                <Routes>
                    <Route path="/*" element={<AdminApp />} />
                <Route path="/client/*" element={<ConnectedClientApp />} />
                </Routes>
       
        </PersistGate>
    </Provider>
);

export default App;
