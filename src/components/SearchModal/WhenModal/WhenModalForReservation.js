import React, { useState } from 'react';
import css from './WhenModal.module.scss';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import BlackButton from '../../BlackButton/BlackButton';
import moment from 'moment';
import Calendar from '../Calendar/Calendar';
import { BASEURL } from '../../../ApiOrigin';

function WhenModal({
  modalRef,
  closeModal,
  roomid,
  setPrice,
  setStart,
  setEnd,
}) {
  const [stateMoment, setStateMoment] = useState(moment());
  const prev = () => {
    setStateMoment(stateMoment.clone().subtract(1, 'month'));
  };
  const next = () => {
    setStateMoment(stateMoment.clone().add(1, 'month'));
  };

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [tempoCheckOut, setTempoCheckOut] = useState(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const checked = checkedDay => {
    if (!checkIn) {
      setCheckIn(checkedDay);
    } else if (checkIn && !checkOut) {
      if (moment(checkIn).isAfter(checkedDay)) {
        setCheckIn(checkedDay);
      } else {
        setCheckOut(checkedDay);
      }
    } else {
      if (moment(checkIn).isAfter(checkedDay)) {
        setCheckIn(checkedDay);
      } else if (
        !moment(checkIn).isAfter(checkedDay) &&
        moment(checkOut).isAfter(checkedDay)
      ) {
        setCheckOut(checkedDay);
      } else {
        setCheckOut(checkedDay);
      }
    }
  };

  const reset = () => {
    Payment();
    setCheckIn(null);
    setCheckOut(null);
    setStateMoment(moment());
    setStart(startDate);
    setEnd(endDate);
  };

  const onHover = day => {
    if (checkIn && !checkOut && !moment(checkIn).isAfter(day)) {
      setTempoCheckOut(day); //여기가 chekin만 클릭 후 마우스로 원하는 날짜까지 드래그 할 시,
    }
  };

  const onHoverReset = () => {
    setTempoCheckOut(null);
  };

  let params = {
    start_date: startDate,
    end_date: endDate,
  };

  let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');

  function Payment() {
    fetch(`${BASEURL}/rooms/${roomid}/room?${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('login-token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(fetchdata => {
        setPrice(fetchdata.data[0].total_price);
      });
  }

  return (
    <div className={css.modalWrapper} ref={modalRef}>
      <div>
        <div className={css.modal}>
          <div className={css.titleWrapper}>
            <div className={css.modalTitle}>
              <p className={css.whenText}>언제떠날까요?</p>
              <AiOutlineClose
                className={css.closeModal}
                size="50"
                id="modalClose1"
                onClick={() => {
                  closeModal();
                  reset();
                }} // 기존에 onclick시 close만 되던 기능에 추가해서 선택사항들 reset시키기
              />
            </div>
          </div>
          <div className={css.calendarWrapper}>
            <Calendar
              stateMoment={stateMoment}
              checkIn={checkIn}
              checkOut={checkOut}
              onCheck={checked}
              tempoCheckOut={tempoCheckOut}
              onHover={onHover}
              onHoverReset={onHoverReset}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <AiOutlineLeft size="22" className={css.prevBtn} onClick={prev} />
            <AiOutlineRight size="22" className={css.nextBtn} onClick={next} />
          </div>
          <div
            className={css.btnWrapper}
            onClick={() => {
              closeModal();
              reset();
            }}
          >
            <BlackButton
              className={css.searchBtn}
              content="날짜선택 &nbsp; &nbsp; →"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhenModal;
