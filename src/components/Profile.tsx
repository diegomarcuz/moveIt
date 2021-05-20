import { useContext } from "react"
import styles from "../styles/components/Profile.module.css"
import { ChallengeContext } from "../contexts/ChallengeContext"


const Profile = () => {

  const { level } = useContext(ChallengeContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/diegomarcuz.png" alt=" Diego MARCUZ" />
      <div>
        <strong>Diego Marcuz</strong>
        <p>
          <img src="icons/level.svg" alt="" />
          Level {level}</p>
      </div>
    </div>
  )


}
export default Profile;
