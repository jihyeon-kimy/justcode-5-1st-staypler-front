import React, { useState } from 'react';
import css from './WhenModal.module.scss';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import moment from 'moment';
import Calendar from '../Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
import SearchModalLayout from '../SearchModalLayout';

function WhenModal({ onClose }) {
  const navigate = useNavigate();
  const [stateMoment, setStateMoment] = useState(moment());

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [tempoCheckOut, setTempoCheckOut] = useState(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  let query = `start_date=${startDate}&end_date=${endDate}`;

  const checkDateHandler = checkedDay => {
    // 선택된 체크인 날짜가 없는 경우
    if (!checkIn) {
      setCheckIn(checkedDay);
    }

    // 선택된 체크인 날짜가 있고, 체크아웃 날짜가 없는 경우
    if (checkIn && !checkOut) {
      if (moment(checkIn).isAfter(checkedDay)) {
        setCheckIn(checkedDay);
      } else {
        setCheckOut(checkedDay);
      }
    }

    // 선택된 체크인 날짜와 체크아웃 날짜가 있는 경우
    if (checkIn && checkOut) {
      if (moment(checkIn).isAfter(checkedDay)) {
        setCheckIn(checkedDay);
      } else {
        setCheckOut(checkedDay);
      }
    }
  };

  const clickPrevBtnHandler = () => {
    setCheckIn(null);
    setCheckOut(null);
    setStateMoment(prevstateMoment =>
      prevstateMoment.clone().subtract(1, 'month')
    );
  };

  const clickNextBtnHandler = () => {
    setCheckIn(null);
    setCheckOut(null);
    setStateMoment(prevstateMoment => prevstateMoment.clone().add(1, 'month'));
  };

  const onHover = day => {
    if (checkIn && !checkOut && !moment(checkIn).isAfter(day)) {
      setTempoCheckOut(day); //여기가 chekin만 클릭 후 마우스로 원하는 날짜까지 드래그 할 시
    }
  };

  const onHoverReset = () => {
    setTempoCheckOut(null);
  };

  const searchDateHandler = () => {
    navigate(`/findstay?${query}`);
    onClose();
  };

  return (
    <SearchModalLayout
      header="언제 떠날까요?"
      onClose={onClose}
      onSearch={searchDateHandler}
    >
      <div className={css.calendarWrapper}>
        <Calendar
          stateMoment={stateMoment}
          checkIn={checkIn}
          checkOut={checkOut}
          onCheck={checkDateHandler}
          tempoCheckOut={tempoCheckOut}
          onHover={onHover}
          onHoverReset={onHoverReset}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <AiOutlineLeft
          size="22"
          className={css.prevBtn}
          onClick={clickPrevBtnHandler}
        />
        <AiOutlineRight
          size="22"
          className={css.nextBtn}
          onClick={clickNextBtnHandler}
        />
      </div>
    </SearchModalLayout>
  );
}

export default WhenModal;
