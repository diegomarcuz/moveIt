import { useContext } from "react"

import styles from "../styles/components/CompletedChallenges.module.css"
import { ChallengeContext } from "../contexts/ChallengeContext"

const CompletedChallenges = () => {

  const { challengesCompleted } = useContext(ChallengeContext)

  return (

    <div className={styles.completedChallengesContainer}>
      <span>Completed Challenges</span>
      <span>{challengesCompleted}</span>

    </div>
  )
}

export default CompletedChallenges;