import React from 'react';
import css from './Footer.module.scss';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';

function Footer(props) {
  return (
    <div className={`${css.footer} ${props.className}`}>
      <div className={css.content}>
        <div className={css['content-topbox']}>
          <ul className={css['content-topbox_left']}>
            <li>ABOUT</li>
            <li>4 POINT APPROACH</li>
            <li>NEWSLETTER</li>
            <li>CAREERS</li>
          </ul>

          <div className={css['content-topbox_right']}>
            <p>
              STAY
              <br />
              PLER
            </p>
            <ul className={css.socials}>
              <li>
                <FaFacebookF />
              </li>
              <li>
                <FaInstagram />
              </li>
              <li>
                <SiNaver />
              </li>
              <li>
                <FaYoutube />
              </li>
            </ul>
          </div>
        </div>

        <div className={css.info}>
          상호 : (주)스테이플러 | 대표자 : 구씨 | 서울특별시 종로구 어쩌구로1길
          12, 3층(서울동) | TEL:1234-5678 | summer@staypler.com |
          사업자등록번호: 123-45-67890 | 통신판매업신고: 제1234-
          서울종로-05678호[사업자정보확인]
        </div>
      </div>
    </div>
  );
}

export default Footer;
