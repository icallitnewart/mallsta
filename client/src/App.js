import GlobalStyle from "./styles/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Auth from "./hoc/auth";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={Auth(<Login />, false)} />
        <Route path="/register" element={Auth(<Register />, false)} />

        {/* Navbar, Footer 포함 */}
        <Route element={<Layout />}>
          <Route path="/" element={Auth(<div>TEST</div>, null)} />
          <Route path="/account/:path" element={Auth(<Account />, true)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
