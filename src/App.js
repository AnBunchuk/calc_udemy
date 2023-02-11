import React, { useState, useEffect } from "react"
import './App.css'


const App = (props) => {

  const [count, setCount] = useState(1)
  const [valApi, setValApi] = useState([])

  const [currency, setCurrency] = useState([])


  const currencyAPI = async () => {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then(res => res.json())
      .then(res => res.filter(item => item.cc === 'RUB' || item.cc === 'USD' || item.cc === 'EUR'))
      .then(setValApi);
  }


  useEffect(() => {
    console.log("effect1")
    currencyAPI()
  }, [])

useEffect(()=>{
  document.title=`курс ${currency}`
},[currency])

  const cur = (nameCurrency) => {
    let res = valApi.filter(item => item.cc === nameCurrency)
    console.log(res)
    setCount((props.counter / res[0].rate).toFixed(2))
    setCurrency(res[0].cc)

  }


  const GRN = () => {
    console.log('grivna')
    setCount(props.counter)
    setCurrency("GRN")
  }

  return (
    <div className="app">
      <div className='futer'>
        <div className="counter">{props.counter} <br/><span> GRN </span></div>
        <div className="counter">{count} <span> <br/> {currency}</span></div>
      </div>

      <div className="controls">
        <button onClick={() => cur('USD')}>USD</button>
        <button onClick={() => cur('EUR')}>EUR</button>
        <button onClick={() => cur('RUB')}>RUB</button>
        <button onClick={GRN}>GRN</button>
      </div>
    </div>
  )

}

export default App;

// ReactDOM.render(<App counter={14}/>, document.getElementById('app'));

// 1) Начальное значение счетчика должно передаваться через props
// 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
// 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
// 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов
