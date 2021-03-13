import Head from 'next/head'
import { GetServerSideProps } from 'next'

import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import styles from '../styles/pages/Home.module.css'

import ChallengeBox from "../components/ChallengeBox";
import CountdownProvider from "../contexts/CountdownContext";
import ChallengesProvider from '../contexts/ChallengeContext';

interface HomeProps {
  level: number,
  challengesCompleted: number,
  currentExperience: number
}

export default function Home(props: HomeProps) {


  return (
    <ChallengesProvider
      level={props.level}
      challengesCompleted={props.challengesCompleted}
      currentExperience={props.currentExperience}
    >

      <div className={styles.container}>
        <Head>
          <title>Home | move.it</title>
        </Head>
        <ExperienceBar />


        <CountdownProvider>
          <section>
            <div className={styles.leftContainer}>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>

          </section>
        </CountdownProvider>

      </div>
    </ChallengesProvider>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, challengesCompleted, currentExperience } = ctx.req.cookies
  return {
    props: {
      level: Number(level),
      challengesCompleted: Number(challengesCompleted),
      currentExperience: Number(currentExperience)
    }
  }
}