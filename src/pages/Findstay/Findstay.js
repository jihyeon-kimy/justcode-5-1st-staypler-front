import React, { useState, useEffect, useContext } from 'react';
import css from './Findstay.module.scss';
import Feed from './Feed.js';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useLocation } from 'react-router-dom';
import Filter from './Filter/Filter';
import Order from './Filter/Order/Order';
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import { rooms } from '../../lib/room-api';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

function Findstay() {
  const location = useLocation();
  const authCtx = useContext(AuthContext);

  const {
    sendRequest: fetchRoomsInfoHandler,
    status,
    data: loadedRooms,
    error,
  } = useHttp(rooms);

  let [pageBtnNum, setPageBtnNum] = useState(1);

  const pageNumber = [];
  for (let i = 1; i <= loadedRooms?.maxPage; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    fetchRoomsInfoHandler(location.search, authCtx.token);
  }, [authCtx.token, fetchRoomsInfoHandler, location.search]);

  let loadedRoomList;

  // 1. 로딩 중인 경우
  if (status === 'pending') {
    loadedRoomList = (
      <div className={css.centered}>
        <LoadingSpinner />
      </div>
    );
  }

  // 2. fetch 에러가 발생한 경우
  if (error) {
    loadedRoomList = (
      <div className={css.centered}>
        <p>{error}</p>
      </div>
    );
  }

  // 3. 검색 결과가 없을 경우
  if (
    status === 'completed' &&
    (!loadedRooms || loadedRooms?.data.length === 0)
  ) {
    loadedRoomList = (
      <div className={css.centered}>
        <p>검색 결과가 존재하지 않습니다.</p>
      </div>
    );
  }

  // 4. 로딩을 성공적으로 마친 경우
  if (status === 'completed' && loadedRooms?.data.length > 0) {
    loadedRoomList = loadedRooms?.data.map(feed => {
      return (
        <Feed
          key={feed.id}
          id={feed.id}
          roomName={feed.title}
          roomType={feed.type}
          province={feed.province}
          images={feed.images[0]}
          city={feed.city}
          maxPrice={feed.max_price}
          minPrice={feed.min_price}
          maxLimit={feed.max_limit}
          minLimit={feed.min_limit}
          isLike={feed.isLike}
        />
      );
    });
  }

  return (
    <div className={css.container}>
      <PageHeader
        pageTitleEN="FIND STAY"
        pageTitleKO="머무는 것 자체로 여행이 되는 공간"
        url="/findstay"
      />
      <Filter />
      <Order />

      {loadedRoomList}

      <div className={css.pagenationWrapper}>
        {pageNumber.map(num => {
          return (
            <div
              className={css.pageNumber}
              key={num}
              onClick={() => {
                setPageBtnNum(num);
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Findstay;
