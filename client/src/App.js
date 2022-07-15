import GlobalStyle from "./styles/common/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Auth from "./hoc/auth";
import Layout from "./components/common/Layout";
import MembershipLayout from "./components/membership/MembershipLayout";
import ShoppingLayout from "./components/shopping/ShoppingLayout";
import AccountLayout from "./components/account/AccountLayout";

//membership
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
//account
import EditProfilePage from "./pages/EditProfilePage";
import EditStorePage from "./pages/EditStorePage";
//shopping
import StorePage from "./pages/StorePage";
import WishlistPage from "./pages/WishlistPage";
import ReviewPage from "./pages/ReviewPage";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {/* Membership Pages */}
        <Route element={<MembershipLayout />}>
          <Route 
            path="/membership/login" 
            element={Auth(<LoginPage />, false)} 
          />
          <Route 
            path="/membership/register" 
            element={Auth(<RegisterPage />, false)} 
          />
        </Route>

        {/* Common Layout: Navbar, Footer */}
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={Auth(<div>TEST</div>, null)} 
          />

          {/* Account Pages */}
          <Route element={<AccountLayout />}>
            <Route 
              path="/account/profile" 
              element={Auth(<EditProfilePage />, true)} 
            />
            <Route 
              path="/account/store" 
              element={Auth(<EditStorePage />, true)} 
            />
          </Route>

          {/* Shopping Pages */}
          <Route element={<ShoppingLayout />}>
            <Route 
              path="/:username/shopping" 
              element={Auth(<StorePage />, null)} 
            />
            <Route 
              path="/:username/shopping/product/:productId" 
              element={Auth(<StorePage />, null)} 
            />
            <Route 
              path="/:username/shopping/likes" 
              element={Auth(<WishlistPage />, true)} 
            />
            <Route 
              path="/:username/shopping/reviews" 
              element={Auth(<ReviewPage />, true)} 
            />
            <Route 
              path="/:username/shopping/order" 
              element={Auth(<OrderPage />, true)} 
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
