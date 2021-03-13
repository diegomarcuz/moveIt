import { useContext } from "react"

import styles from '../styles/components/ExperienceBar.module.css'
import { ChallengeContext } from "../contexts/ChallengeContext"

const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext)

  const percentToNextLevel = currentExperience * 100 / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>

      <span> 0 px
      </span>
      <div >
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentExperience} px</span>
      </div>

      <span>{experienceToNextLevel} px</span>
    </header>
  )
}

export default ExperienceBar;