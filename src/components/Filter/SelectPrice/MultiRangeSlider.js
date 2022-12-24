import React, { useCallback, useState, useRef, useEffect } from 'react';
import css from './MultiRangeSlider.module.scss';

const MultiRangeSlider = props => {
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);

  const range = useRef(null);

  const minValueChangeHHandler = event => {
    const changedvalue = Math.min(+event.target.value, maxVal - 1);
    setMinVal(changedvalue);
  };

  const maxValueChangeHandler = event => {
    const changedvalue = Math.max(+event.target.value, minVal + 1);
    setMaxVal(changedvalue);
  };

  const getPercent = useCallback(
    value => Math.round(((value - props.min) / (props.max - props.min)) * 100),
    [props.min, props.max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    range.current.style.left = `${minPercent}%`;
    range.current.style.width = `${maxPercent - minPercent}%`;
  }, [getPercent, maxVal, minVal]);

  return (
    <>
      <form className={css.slider} id={props.type} onSubmit={props.onSubmit}>
        <div className={css['slider-track']} />
        <div className={css['slider-range']} ref={range} />
        <input
          type="range"
          id="min_price"
          name={props.type}
          min={props.min}
          max={props.max}
          value={minVal}
          onChange={minValueChangeHHandler}
        />
        <input
          type="range"
          id="max_price"
          name={props.type}
          min={props.min}
          max={props.max}
          value={maxVal}
          onChange={maxValueChangeHandler}
        />
      </form>
      <div className={css['slider-desc']}>
        <div>
          <p className={css.title}>최저요금</p>
          <input
            className={css.value}
            type="text"
            value={`${minVal}만원`}
            readOnly
          />
        </div>
        <p>-</p>
        <div>
          <p className={css.title}>최고요금</p>
          <input
            className={css.value}
            type="text"
            value={`${maxVal}만원`}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default MultiRangeSlider;
