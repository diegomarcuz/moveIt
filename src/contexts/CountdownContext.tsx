import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData {
  resetCountDown: () => void,
  startCountdown: () => void,
  startNewChallenge: () => void,
  time: number,
  isActive: boolean,
  hasFinished: boolean,
  minutes: number,
  seconds: number
}
interface CountdownProviderProps {
  children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextData);
let countDownTimeout: NodeJS.Timeout;


const CountdownProvider = ({ children }: CountdownProviderProps) => {

  const { startNewChallenge } = useContext(ChallengeContext)

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function resetCountDown() {
    clearTimeout(countDownTimeout)
    setIsActive(false)
    setTime(0.05 * 60)
    setHasFinished(false)
  }
  function startCountdown() {
    setIsActive(true)
  }


  useEffect(() => {
    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false);
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider
      value={{
        startNewChallenge,
        time,
        isActive,
        hasFinished,
        minutes,
        seconds,
        resetCountDown,
        startCountdown
      }}
    >
      {children}

    </CountdownContext.Provider>

  )
}


export default CountdownProvider;