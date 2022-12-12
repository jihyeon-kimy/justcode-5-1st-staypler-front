import React from 'react';
import Footer from './Footer';
import Header from './MainHeader';
import css from './Layout.module.scss';

function Layout(props) {
  return (
    <div className={css.layout}>
      <Header className={css.header} />
      <main className={css.main}>{props.children}</main>
      <Footer className={css.footer} />
    </div>
  );
}

export default Layout;
