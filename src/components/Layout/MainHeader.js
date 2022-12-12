import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineLocationOn } from 'react-icons/md';
import { BsCalendar4 } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsJournalText } from 'react-icons/bs';
import css from './MainHeader.module.scss';
import WhereModal from '../SearchModal/WhereModal/WhereModal';
import WhenModal from '../SearchModal/WhenModal/WhenModal';
import staypler_logo from '../../assets/images/staypler_logo.jpg';
import AuthContext from '../../store/auth-context';

function Header() {
  const authCtx = useContext(AuthContext);
  const [whenModal, setWhenModal] = useState(false);
  const [whereModal, setWhereModal] = useState(false);

  const openWhenModalHandler = () => {
    setWhenModal(true);
  };

  const closeWhenModalHandler = () => {
    setWhenModal(false);
  };

  const openWhereModalHandler = () => {
    setWhereModal(true);
  };

  const closeWhereModalHandler = () => {
    setWhereModal(false);
  };

  return (
    <>
      {whenModal && <WhenModal onClose={closeWhenModalHandler} />}
      {whereModal && <WhereModal onClose={closeWhereModalHandler} />}

      <header className={css.header}>
        <Link to="/" className={css.logo}>
          <img src={staypler_logo} alt="로고 이미지" />
        </Link>
        <div className={css.search}>
          <button type="button" onClick={openWhereModalHandler}>
            <MdOutlineLocationOn />
            <p>어디로 떠날까요?</p>
          </button>
          <button type="button" onClick={openWhenModalHandler}>
            <BsCalendar4 />
            <p>언제 떠날까요?</p>
          </button>
        </div>
        <nav className={css.nav}>
          <ul>
            <li>
              <NavLink
                to="/findstay"
                className={({ isActive }) => (isActive ? css.active : '')}
              >
                <AiOutlineSearch className={css['findstay-icon']} />
                <p>FIND STAY</p>
              </NavLink>
            </li>
            {authCtx.isLoggedIn && (
              <li>
                <NavLink
                  to="/mypage"
                  className={({ isActive }) => (isActive ? css.active : '')}
                >
                  <BsJournalText className={css['mypage-icon']} />
                  <p>MY PAGE</p>
                </NavLink>
              </li>
            )}
            {!authCtx.isLoggedIn && (
              <li className={css.auth}>
                <Link to="/login">
                  <MdPerson />
                  <p>LOGIN</p>
                </Link>
              </li>
            )}
            {authCtx.isLoggedIn && (
              <li className={css.auth}>
                <button type="button" onClick={authCtx.onLogout}>
                  <MdPerson />
                  <p>LOGOUT</p>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
