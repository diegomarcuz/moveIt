import { useContext } from "react"

import { ChallengeContext } from "../contexts/ChallengeContext"
import { CountdownContext } from "../contexts/CountdownContext"

import styles from "../styles/components/ChallengeBox.module.css"

const ChallengeBox = () => {

  const { currentChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
  const { resetCountDown } = useContext(CountdownContext);


  function handleSuccededChallenge() {
    completeChallenge()
    resetCountDown()
  }
  function handleFailedChallenge() {
    resetChallenge()
    resetCountDown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {currentChallenge ? (
        <div className={styles.challengeActive}>
          <header>
            Earn {currentChallenge.amount} xp
          </header>
          <main>
            <img src={`icons/${currentChallenge.type}.svg`} alt="" />
            <strong>New Challenge</strong>
            <p>{currentChallenge.description}</p>

          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleFailedChallenge}
            >
              Failed
            </button>
            <button
              type="button"
              className={styles.challengeSuccededButton}
              onClick={handleSuccededChallenge}
            >
              Succeded
            </button>
          </footer>

        </div>
      ) : (

        <div className={styles.challengeNotActive}>
          <strong>Wait the countdown ends to receive the challenge</strong>
          <p>
            <img src="icons/level-up.svg" alt="LEVEL UP" />
            Finish the challenges in order to raise the level.
          </p>
        </div>

      )}
    </div>
  )
}

export default ChallengeBox;
