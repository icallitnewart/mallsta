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

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={Auth(<LoginPage />, false)} />
        <Route path="/register" element={Auth(<RegisterPage />, false)} />

        {/* Navbar, Footer 포함 */}
        <Route element={<Layout />}>
          <Route path="/" element={Auth(<div>TEST</div>, null)} />
          <Route path="/account/:path" element={Auth(<AccountPage />, true)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
