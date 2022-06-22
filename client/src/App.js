import GlobalStyle from "./styles/common/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Auth from "./hoc/auth";
import Layout from "./components/common/Layout";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import ShoppingPage from "./pages/ShoppingPage";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {/* Membership Pages */}
        <Route 
          path="/membership/login" 
          element={Auth(<LoginPage />, false)} 
        />
        <Route 
          path="/membership/register" 
          element={Auth(<RegisterPage />, false)} 
        />

        {/* Layout: Navbar, Footer */}
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={Auth(<div>TEST</div>, null)} 
          />
          <Route 
            path="/account/:path" 
            element={Auth(<AccountPage />, true)} 
          />

          {/* Shopping Pages */}
          <Route 
            path="/:username/shopping" 
            element={Auth(<ShoppingPage type="store" />, null)} 
          />
          <Route 
            path="/:username/shopping/product/:productId" 
            element={Auth(<ShoppingPage type="store" />, null)} 
          />
          <Route 
            path="/:username/shopping/likes" 
            element={Auth(<ShoppingPage type="likes" />, true)} 
          />
          <Route 
            path="/:username/shopping/reviews" 
            element={Auth(<ShoppingPage type="reviews" />, true)} 
          />
          <Route 
            path="/:username/shopping/order" 
            element={Auth(<ShoppingPage type="order" />, true)} 
          />

          {/* Page Not Found */}
          <Route path="*" element={Auth(<div>Page Not Found.</div>, null)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
