import React from 'react'
import { useState, useEffect } from 'react'
import { btn } from './btn'

function Cal() {
  const [firstC, setFirstC] = useState(0)
  const [result, setResult] = useState(0)
  const [secondC, setSecondC] = useState(0)
  const [position, setPosition] = useState(1)
  const [clear, setClear] = useState(false)
  const [sign, setSign] = useState(0) // + - * / % -x

  const _signC = {
    '+': 1,
    '-': 2,
    '*': 3,
    '/': 4,
    '%': 5,
    '-(x)': 6,
  }

  useEffect(() => {
    setFirstC(result)
  }, [result])

  function Csign(a, b, s) {
    if (s === 1) {
      setResult(parseFloat(a) + parseFloat(b))
    } else if (s === 2) {
      setResult(parseFloat(a) - parseFloat(b))
    } else if (s === 3) {
      setResult(parseFloat(a) * parseFloat(b))
    } else if (s === 4) {
      setResult(parseFloat(a) / parseFloat(b))
    }
  }

  function CFunc() {
    if (position === 1) {
      setFirstC(0)
    } else if (position === 2) {
      setSecondC(0)
      setClear(true)
      if (secondC === 0) {
        setPosition(1)
        setFirstC(0)
        setSecondC(0)
        setResult(0)
      }
    } else if (position === 3) {
      setPosition(1)
      setFirstC(0)
      setSecondC(0)
      setResult(0)
    }
  }

  function Nfunc(b) {
    if (b.typeB === 'number') {
      if (position === 1) {
        if (firstC / 100000000 <= 1)
          setFirstC((prev) => (prev === 0 ? b.name : prev + b.name))
        setClear(false)
      } else if (position === 2) {
        setSecondC((prev) => (prev === 0 ? b.name : prev + b.name))
      } else if (position === 3) {
        if (secondC === -1) {
        } else {
          setPosition(1)
          setFirstC(0)
          setSecondC(0)
          setFirstC((prev) => (prev === 0 ? b.name : prev + b.name))
        }
      }
    } else if (b.typeB === 'func') {
      if (position === 3) {
      }
      if (position === 2) {
        setSign(_signC[b.name])
        Csign(firstC, secondC, sign)
        setSecondC(0)
      } else {
        setSign(_signC[b.name])
        setSecondC(0)
        setPosition(2)
      }
    } else if (b.typeB === 'result') {
      Csign(firstC, secondC, sign)
      setPosition(3)
    } else if (b.typeB === 'funcS') {
      if (position === 1) {
        if (b.name === '-(x)') {
          setFirstC(firstC * -1)
        } else if (b.name === '%') {
          setFirstC(firstC / 100)
        }
      }
      if (position === 2) {
        if (b.name === '-(x)') {
          setSecondC(secondC * -1)
        } else if (b.name === '%') {
          setSecondC((firstC * secondC) / 100)
        }
      }
      if (position === 3) {
          if (b.name === '-(x)') {
            setResult(result * -1)
          } else if (b.name === '%') {
            setResult(result / 100)
          }
        }
    }
  }

  const _button = btn.map((b, index) => {
    if (b.name === 'C') {
      return (
        <>
          <div className="col p-0" key={index}>
            <button
              type="button"
              key={index}
              onClick={() => CFunc()}
              className={`btn ${
                b.col === 4 ? 'btn-warning' : b.col === 2 ? 'btn-dark' : ''
              } btn-c`}>
              {clear ? 'AC' : b.name}
            </button>
          </div>
        </>
      )
    }
    return (
      <>
        <div className={`${b.name === '0' ? 'col-6' : 'col'} p-0`} key={index}>
          <button
            type="button"
            key={index}
            onClick={() => Nfunc(b)}
            className={`btn ${
              b.col === 4 ? 'btn-warning' : b.col === 2 ? 'btn-dark' : ''
            } btn-c`}>
            {b.name}
          </button>
        </div>
      </>
    )
  })
  console.log({ firstC, secondC, sigh: sign, result, position })
  return (
    <div className="cal">
      <div className="result-layout m-1">
        <h2 className="m-0">
          {position === 1 ? firstC : position === 2 ? secondC : result}
        </h2>
      </div>
      <div className="row row-cols-4 m-0">{_button}</div>
    </div>
  )
}

export default Cal
