import css from './Pagination.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

function Pagination({ maxPage }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const minPage = 1;
  const currentPage = +queryParams.get('page');

  let showedPageList = { list: [], ellipsis: 'none' };
  // 1. 출력할 페이지가 6페이지 이하인 경우
  if (maxPage < 6) {
    showedPageList.list = new Array(maxPage)
      .fill()
      .map((value, index) => index + 1);
    showedPageList.ellipsis = 'none';
  } else {
    // 2-1. 뒤쪽에 생략 기호가 필요한 경우 ex.(1 2 3 4 5 ... 9)
    if (currentPage - minPage <= 2 && maxPage - currentPage > 2) {
      showedPageList.list = new Array(5)
        .fill()
        .map((value, index) => index + 1);
      showedPageList.ellipsis = 'back';
    }

    // 2-2. 앞뒤에 생략 기호가 필요한 경우 ex.(1 ... 3 4 5 6 7 ... 9 )
    if (currentPage - minPage > 2 && maxPage - currentPage > 2) {
      showedPageList.list = new Array(5)
        .fill()
        .map((value, index) => currentPage + index - 2);
      showedPageList.ellipsis = 'both';
    }

    // 2-3. 앞쪽에 생략 기호가 필요한 경우 ex.(1 ... 5 6 7 8 9)
    if (currentPage - minPage > 2 && maxPage - currentPage <= 2) {
      showedPageList.list = new Array(5)
        .fill()
        .map((value, index) => maxPage + index - 4);
      showedPageList.ellipsis = 'front';
    }
  }

  const clickPageHandler = e => {
    queryParams.set('page', e.target.value);
    navigate(`?${queryParams.toString()}`);
  };

  const clickBackBtnHandler = () => {
    if (currentPage > 1) {
      queryParams.set('page', currentPage - 1);
      navigate(`?${queryParams.toString()}`);
    }
  };

  const clickNextBtnHandler = () => {
    if (currentPage < maxPage) {
      queryParams.set('page', currentPage + 1);
      navigate(`?${queryParams.toString()}`);
    }
  };

  return (
    <div className={css.pagination}>
      <IoIosArrowBack onClick={clickBackBtnHandler} />
      <ol className={css.pages}>
        {(showedPageList.ellipsis === 'front' ||
          showedPageList.ellipsis === 'both') && (
          <>
            <li>
              <button
                className={`${css.page} ${
                  currentPage === minPage ? css.isActive : ''
                }`}
                value={minPage}
                onClick={clickPageHandler}
              >
                1
              </button>
            </li>
            <li>
              <p>...</p>
            </li>
          </>
        )}
        {showedPageList.list.map((value, index) => (
          <li key={index}>
            <button
              className={`${css.page} ${
                currentPage === value ? css.isActive : ''
              }`}
              value={value}
              onClick={clickPageHandler}
            >
              {value}
            </button>
          </li>
        ))}
        {(showedPageList.ellipsis === 'back' ||
          showedPageList.ellipsis === 'both') && (
          <>
            <li>
              <p>...</p>
            </li>
            <li>
              <button
                className={`${css.page} ${
                  currentPage === maxPage ? css.isActive : ''
                }`}
                value={maxPage}
                onClick={clickPageHandler}
              >
                {maxPage}
              </button>
            </li>
          </>
        )}
      </ol>
      <IoIosArrowForward onClick={clickNextBtnHandler} />
    </div>
  );
}

export default Pagination;
