import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './MypageStayList.module.scss';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

function MypageStayList({ API주소 }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  let cardContainerRef = useRef();
  const carouselRef = useRef();

  const pages = 10; // 총 room 개수
  const numberOfpages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfpages.push(i);
  }
  const [CurrentButton, setCurrentButton] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3000/data/Mypage.json')
      .then(res => res.json())
      .then(fetchdata => {
        setData(fetchdata);
      });
  }, []);

  // pagenation 버튼 클릭 후, fetch해올 때 사용예정
  // useEffect(() => {
  //   fetch("API 주소", {
  //     method: "GET",
  // 		headers: {
  // 			Content-Type: "application/json"
  // 		},
  //     body: JSON.stringify({
  //       email: id,
  //       password: pw,
  //     }),
  //   })
  //   .then(res => res.json())
  //   .then(fetchdata => {
  //     setData(fetchdata);
  //   });
  // }, [CurrentButton]);

  const goToDetail = id => {
    navigate(`/rooms/${data[id].rooms_id}`);
  };

  useEffect(() => {
    let isPressedDown = false;
    let cursorXspace;
    let carouselRefCurrent = carouselRef.current;

    function mouseUpCallback() {
      isPressedDown = false;
    }

    function mouseDownCallback(e) {
      console.log('Hi');
      isPressedDown = true;
      cursorXspace = e.offsetX - cardContainerRef.current.offsetLeft;
    }

    function mouseMoveCallback(e) {
      if (!isPressedDown) return;
      e.preventDefault();
      cardContainerRef.current.style.scrollBehavior = 'smooth';
      if (cursorXspace - e.offsetX > carouselRefCurrent.offsetWidth * 0.2) {
        cardContainerRef.current.scrollLeft += carouselRefCurrent.offsetWidth;
      } else if (
        cursorXspace - e.offsetX <
        carouselRefCurrent.offsetWidth * -0.2
      ) {
        cardContainerRef.current.scrollLeft -= carouselRefCurrent.offsetWidth;
      }
    }

    window.addEventListener('mouseup', mouseUpCallback);
    carouselRefCurrent?.addEventListener('mousedown', mouseDownCallback);
    carouselRefCurrent?.addEventListener('mouseup', mouseUpCallback);
    carouselRefCurrent?.addEventListener('mousemove', mouseMoveCallback);

    return () => {
      window.removeEventListener('mouseup', mouseUpCallback);
      carouselRefCurrent?.removeEventListener('mousedown', mouseDownCallback);
      carouselRefCurrent?.removeEventListener('mouseup', mouseUpCallback);
      carouselRefCurrent?.removeEventListener('mousemove', mouseMoveCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselRef.current]);

  return (
    <div className={css.container}>
      {data &&
        data.map((a, i) => {
          return (
            <div className={css.card} key={i}>
              <div className={css.roomInfo}>
                <div className={css.roomName}>{data[i].room_name}</div>
                <div className={css.roomDetail}>
                  <div>
                    <span className={css.province}>{data[i].province}</span>
                    <span className={css.city}>{data[i].city}</span>
                  </div>
                  <div>
                    <span className={css.minNumPeople}>
                      최소 {data[i].min_limit}명
                    </span>
                    <span className={css.maxNumPeople}>
                      최대 {data[i].max_limit}명
                    </span>
                  </div>
                  <div className={css.price}>
                    ￦{data[i].price.toLocaleString('ko-KR')}
                  </div>
                </div>
                <button
                  className={css.reservationBtn}
                  onClick={() => {
                    goToDetail(i);
                  }}
                >
                  예약하기
                </button>
              </div>
              <div className={css.carousel} ref={carouselRef}>
                <div className={css.cardContainer} ref={cardContainerRef}>
                  {data[i].images &&
                    data[i].images.map((aa, ii) => {
                      return (
                        <div
                          className={css.roomImage}
                          style={{
                            backgroundImage: `url(${data[i].images[ii]})`,
                          }}
                          key={ii}
                          onClick={() => {
                            goToDetail(i);
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      <div>
        <div className={css.paginationContainer}>
          <div
            onClick={() =>
              setCurrentButton(prev => (prev === 1 ? prev : prev - 1))
            }
          >
            <MdArrowBackIosNew />
          </div>
          {numberOfpages.map((page, i) => {
            return (
              <div
                key={i}
                className={`${CurrentButton === page && css.active}`}
                onClick={() => setCurrentButton(page)}
              >
                {page}
              </div>
            );
          })}
          <div
            onClick={() =>
              setCurrentButton(prev =>
                prev === numberOfpages ? prev : prev + 1
              )
            }
          >
            <MdArrowForwardIos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageStayList;