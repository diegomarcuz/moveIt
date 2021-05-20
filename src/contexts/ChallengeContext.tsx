import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | "eye";
  description: string;
  amount: number;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number,
  challengesCompleted: number,
  currentExperience: number
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  currentChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  experienceToNextLevel: number;
  closeLevelUpModal: () => void;
}


export const ChallengeContext = createContext({} as ChallengeContextData)



const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set("level", String(level))
    Cookies.set("challengesCompleted", String(challengesCompleted))
    Cookies.set("currentExperience", String(currentExperience))

  }, [level, challengesCompleted, currentExperience])



  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }


  function startNewChallenge() {

    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setCurrentChallenge(challenge)

    new Audio('/notification.mp3').play()


    if (Notification.permission === 'granted') {
      console.log(Notification.permission)
      const myNot = new Notification('New challenge!!', {
        body: `Receives ${challenge.amount} xp`,
      })
      console.log(myNot)
    }
  }
  function resetChallenge() {
    setCurrentChallenge(null)
  }
  function completeChallenge() {
    if (!currentChallenge) return;


    const { amount } = currentChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp()
    }


    setCurrentExperience(finalExperience);
    setCurrentChallenge(null);
    setChallengesCompleted(challengesCompleted + 1)


  }
  return (
    <ChallengeContext.Provider
      value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge, currentChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeLevelUpModal }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )

}

export default ChallengesProvider;
