import React from 'react'
import { numberWithCommas } from '../utils/config'

export const SliderInput = ({title,state,min,max,onChange,labelMin,labelMax,underLineTitle}) => {
  return (
    <React.Fragment>
        <span className="title">{title}</span>
        {state>0 &&<span className="title" style={{ textDecoration: "undeline" }}>
         {underLineTitle}
          
        </span>}

        <div>
          <input
            type="range"
            min={min}
            max={max}
            className="slider"
            value={state}
            onChange={onChange}
          />
          <div className="lables">
            <label>{labelMin ?? numberWithCommas(min)}</label>
            <b>{numberWithCommas(state)}</b>
            <label>{labelMax ?? numberWithCommas(max)}</label>
          </div>
        </div>
    </React.Fragment>
  )
}
