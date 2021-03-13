import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'




const Countdown = () => {
  const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountDown } = useContext(CountdownContext);


  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


  function changeButtonType() {
    if (isActive) {
      return (
        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive} `} onClick={resetCountDown}>
          Stop
        </button>
      )
    } else {

      if (hasFinished) {
        return (
          <button disabled className={styles.countdownButton} >
            Done
          </button>
        )
      }
      return (
        <button type="button" className={styles.countdownButton} onClick={startCountdown}>
          Play
        </button>
      )

    }



  }





  return (
    <div>
      <div className={styles.countdownContainer}>

        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {changeButtonType()}



    </div>
  )
}

export default Countdown;