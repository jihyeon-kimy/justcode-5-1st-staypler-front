import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from './RoomItem.module.scss';
function RoomItem(props) {
  const {
    roomName,
    roomType,
    province,
    city,
    id,
    maxLimit,
    minLimit,
    minPrice,
    maxPrice,
    images,
  } = props;

  const navigate = useNavigate();
  const goToDetail = id => {
    navigate(`/rooms/${id}`);
  };

  const numToPriceHandler = price => {
    return `￦${(+price).toLocaleString('ko-KR')}`;
  };

  return (
    <div
      className={css.container}
      onClick={() => {
        goToDetail(id);
      }}
    >
      <h3 className={css.name}>{roomName}</h3>
      <p className={css.type}>{roomType}</p>
      <div className={css.content}>
        <div className={css.info}>
          <ul>
            <li>
              {province}/{city}
            </li>
            <li>
              {minLimit}명 (최대 {maxLimit}명)
            </li>
            <li>
              {numToPriceHandler(minPrice)} ~ {numToPriceHandler(maxPrice)}
            </li>
          </ul>
          <button
            type="button"
            className={css.reservationBtn}
            onClick={() => {
              goToDetail(id);
            }}
          >
            예약하기
          </button>
        </div>
        <img src={images} alt="방 대표 이미지" />
      </div>
    </div>
  );
}

export default RoomItem;
