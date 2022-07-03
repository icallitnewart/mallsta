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

import StoreSection from './components/shopping/StoreSection';
import LikeSection from './components/shopping/LikeSection';
import ReviewSection from './components/shopping/ReviewSection';
import OrderSection from './components/shopping/OrderSection';

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
          <Route element={<ShoppingPage />}>
            <Route 
              path="/:username/shopping" 
              element={Auth(<StoreSection />, null)} 
            />
            <Route 
              path="/:username/shopping/product/:productId" 
              element={Auth(<StoreSection />, null)} 
            />
            <Route 
              path="/:username/shopping/likes" 
              element={Auth(<LikeSection />, true)} 
            />
            <Route 
              path="/:username/shopping/reviews" 
              element={Auth(<ReviewSection />, true)} 
            />
            <Route 
              path="/:username/shopping/order" 
              element={Auth(<OrderSection />, true)} 
            />
          </Route>

          {/* Page Not Found */}
          <Route path="*" element={Auth(<div>Page Not Found.</div>, null)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
