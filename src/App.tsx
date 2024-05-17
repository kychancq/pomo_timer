import { useEffect, useState } from 'react'
import './App.css'

enum TimerState {
  STARTED = 0,
  PAUSED,
  STOPPED
}

function App() {
  const [timer, setTimer] = useState<boolean>(true) //true: pomo, false:rest
  const POMO_TIME = 25*60;
  const REST_TIME = 5*60;
  const [time, setTime] = useState(POMO_TIME); //s
  let interval: number | undefined;
  const [status, setStatus] = useState<TimerState>(TimerState.STOPPED)


  useEffect(() => {
    setTime(timer?POMO_TIME:REST_TIME);
  },[timer])

  useEffect(() => {
    if(status == TimerState.STARTED) {
      startTimer()
    }
    else if(status == TimerState.PAUSED)
      clearInterval(interval)
    else
      stopTimer()

    return () => clearInterval(interval)
  },[status])

  const startTimer = () => {
    interval = setInterval(() => {
      if(status !== TimerState.STARTED)
        return
      setTime(v => v-1);
      if(time <= 0)
        stopTimer()
    }, 1000)

    return () => clearInterval(interval)
  }

  const pauseTimer = () => {
    if(status == TimerState.PAUSED)
      setStatus(TimerState.STARTED)
    else
      setStatus(TimerState.PAUSED)
  }

  const stopTimer = () => {
    setTimer(!timer)
    clearInterval(interval);
  }

  return (
    <>
      <h1>Pomodoro Timer</h1>
      <div className="card">
        <p className='label'>{timer? 'WORK MODE': 'BREAK'}</p>
        <p className='timer_label'>{Math.floor(time/60).toString().padStart(2,'0')}:{(time%60).toString().padStart(2,'0')}</p>
        <div className='btn_container'>
          <button onClick={() => setStatus(TimerState.STARTED)}>Start</button>
          <button onClick={() => pauseTimer()}>{status == TimerState.PAUSED? 'Resume':'Pause'}</button>
          <button onClick={() => setStatus(TimerState.STOPPED)}>Stop</button>
        </div>
      </div>
    </>
  )
}

export default App
