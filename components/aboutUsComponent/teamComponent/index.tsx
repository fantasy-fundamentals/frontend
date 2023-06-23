import React from "react";
import styles from "./teamComponent.module.scss";
const TeamMembers = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.teamsDetail}>
            <div className={styles.teamOne}>
              <div className={styles.leftWrapper}>
                <img src={"/aboutus/thProfileImage.png"} alt="" />
              </div>
              <div className={styles.rightWrapper}>
                <label>Jaired Ziviski </label>
                <p className={styles.subPara}>
                  <span className={styles.borderWrapper} />
                  <span>The Thinker</span>
                </p>
                <p>
                  As a child I started watching The New York jets, I then
                  learned to love football at a “funduhmental” level. This truck
                  driver has nothing but time to reflect on last night’s game,
                  or tomorrow’s stat line. This creation might have started with
                  me, but it wouldn’t have become anything without the fellows
                  you will read about next. I can’t speak for them, but I’m not
                  doing this for the money, or the prestige, I’m doing this
                  because I love sports and I don’t think the fantasy games that
                  have been available for the past 50 years are good enough for
                  this fanatic. I just wanted to play a new, fair, fantasy game
                  with my friends. If nobody else is going to make it, then I
                  will.
                </p>
              </div>
            </div>
            <div className={styles.teamTwo}>
              <div className={styles.leftWrapper}>
                <label>Duane Ours </label>
                <p className={styles.subPara}>
                  <span className={styles.borderWrapper} />
                  <span>The Executive</span>
                </p>
                <p>
                  Cool grandfather to 7, so-so father to 6 and thankful husband
                  to 1 woman of 33 years – so far. He has no clue why his wife
                  keeps him other than his quick wit and ability to make money
                  because God himself knows how she likes to spend it. He also
                  enjoys bourbon, writing, boating and sports -not necessarily
                  in that order but sometimes all at once. Marketing is his real
                  specialty – aka: he knows how to mind read – which means he
                  knows what you want before you do and he concocts crafty ways
                  of getting in your head and convincing you to spend your
                  money. The good thing is that he loves to help people make
                  brilliant decisions – which is why you are here. There’s your
                  proof that he is A- MAZ-ING at what he does.
                </p>
              </div>
              <div className={styles.rightWrapper}>
                <img src={"/aboutus/secProfileImage.webp"} alt="" />
              </div>
            </div>
            <div className={styles.teamThree}>
              <div className={styles.leftWrapper}>
                <img src={"/aboutus/profileImage.webp"} alt="" />
              </div>
              <div className={styles.rightWrapper}>
                <label>Alex Alafita</label>
                <p className={styles.subPara}>
                  <span className={styles.borderWrapper} />
                  <span>The Nerd</span>
                </p>
                <p>
                  Hello, my name is Alex Alafita, I’m the guy that keeps Jaired
                  in check every time he says the Jets are “going to be good
                  this year.” As a butcher I carve up the competition in fantasy
                  sports, they need a new game because I OWN THEM. This meat
                  smoking, Fantasy winning, video game playing spider monkey is
                  going to watch the Pats beat up on the jets. PEACE.
                </p>
                <p>Doug Raymond – The Winner</p>
                <p>Berry Dwyer – The Believer</p>
              </div>
            </div>
            <div className={styles.teamTwo}>
              <div className={styles.leftWrapper}>
                <label>Barry</label>
                <p className={styles.subPara}>
                  <span className={styles.borderWrapper} />
                  {/* <span>The Executive</span> */}
                </p>
                <p>
                  Proud husband, father, and grandfather. Work in the
                  transportation industry for 30 years. My hobbies are flying
                  and fishing.
                </p>
              </div>
              <div className={styles.rightWrapper}>
                <img src={"/aboutus/team.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMembers;
