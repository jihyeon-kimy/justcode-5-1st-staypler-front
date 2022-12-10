import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BASEURL } from './ApiOrigin';
import Layout from './components/Layout/Layout';
import Detail from './pages/Detail/Detail';
import Findstay from './pages/Findstay/Findstay';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MypageEditInformation from './pages/Mypage/components/MypageEditInformation/MypageEditInformation';
import MypageroomSlider from './pages/Mypage/components/MypageroomSlider/MypageroomSlider';
import MypageStayList from './pages/Mypage/components/MypageStayList/MypageStayList';
import Mypage from './pages/Mypage/Mypage';
import Payment from './pages/Payment/Payment';
import Reservation from './pages/Reservation/Reservation';
import Signup from './pages/Signup/Signup';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
        {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}
        <Route path="/findstay" element={<Findstay />} />
        <Route path="/reservation/:roomid" element={<Reservation />} />
        <Route path="/rooms/:id" element={<Detail />} />
        <Route path="/payment" element={<Payment />} />
        {authCtx.isLoggedIn && (
          <Route path="/mypage" element={<Mypage />}>
            <Route
              path=""
              element={
                <>
                  <MypageroomSlider
                    title="다가올 예약"
                    API={`${BASEURL}/mypage/bookings`}
                  />
                  <MypageroomSlider
                    title="관심 스테이"
                    API={`${BASEURL}/mypage/like`}
                  />
                </>
              }
            />
            <Route
              path="likestay"
              element={<MypageStayList API={`${BASEURL}/mypage/like`} />}
            />
            <Route
              path="reservation"
              element={<MypageStayList API={`${BASEURL}/mypage/bookings`} />}
            />
            <Route path="edit" element={<MypageEditInformation />} />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/mypage" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </Layout>
  );
}

export default App;
