import './App.css';
import { Main } from './parts/main/main';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { GoPag } from './parts/gopag/gopag';
import { ChakraProvider } from '@chakra-ui/react';
import PhonePePayment, { PaymentPage } from './parts/gateway/gateway';
import { AdminDashboard } from './parts/admin/admin';
import { AdminLogin } from './parts/admin/login';
import { CustomFileUpload } from './parts/mempics/fileupload';
import { HamsterWheel } from './parts/payload/payloade';
import { Loadin } from './parts/loader/loadin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/go" element={<GoPag/>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/fileupload" element={<CustomFileUpload/>} />
        <Route path="/lding" element={<HamsterWheel/>} />
        <Route path="/lg" element={<Loadin/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;