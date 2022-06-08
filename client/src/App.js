import GlobalStyle from "./styles/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Navbar, Footer 포함 */}
        <Route element={<Layout />}>
          <Route path="/" element={<div>TEST</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
