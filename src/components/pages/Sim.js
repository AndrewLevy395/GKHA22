import React, { useState, useEffect } from "react";

import "../styles/Sim.css";

let minute;
let second;

let home_team = "Hippos";
let away_team = "GSquad";
const home_goal_messages = [
  home_team + " goal scored by Forward",
  home_team + " goal scored by Forward",
  home_team + " goal scored by Goalie",
];
const away_goal_messages = [
  away_team + " goal scored by Forward",
  away_team + " goal scored by Forward",
  away_team + " goal scored by Goalie",
];
const shot_messages = [
  home_team + " shot on goal by Forward",
  away_team + " shot on goal by Forward",
  home_team + " shot on goal by Forward",
  away_team + " shot on goal by Forward",
  home_team + " shot on goal by Goalie",
  away_team + " shot on goal by Goalie",
  home_team + " shot missed by Forward",
  away_team + " shot missed by Forward",
  home_team + " shot missed by Forward",
  away_team + " shot missed by Forward",
  home_team + " shot missed by Goalie",
  away_team + " shot missed by Goalie",
];

function Sim() {
  //set variables
  const [count, setCount] = useState(300);
  const [period, setPeriod] = useState(1);
  const [periodText, setPeriodText] = useState("1st");
  const [clock_running, setClock] = useState(false);
  const [period_end, setPeriodEnd] = useState(false);
  const [buttonText, setText] = useState("Play");
  const [listItems, addToPlayList] = useState([]);
  const [eventChance, changeEventChance] = useState(5);
  const [speed, setSpeed] = useState(1000);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);

  //when user presses play/pause/next period
  function updateClockRun() {
    if (period < 3) {
      if (period_end) {
        setPeriodEnd(false);
        setPeriod((per) => per + 1);
        setCount(300);
        setText("Pause");
      }
      if (clock_running) {
        setText("Play");
      } else {
        setText("Pause");
      }
      setClock(!clock_running);
    }
  }

  //when user presses update speed
  function updateSpeed() {
    if (speed === 1000) {
      setSpeed(500);
    } else if (speed === 500) {
      setSpeed(100);
    } else if (speed === 100) {
      setSpeed(10);
    } else {
      setSpeed(1000);
    }
  }

  function updateScore(team) {
    if (team === "home") {
      setHomeScore((score) => score + 1);
    }
    if (team === "away") {
      setAwayScore((score) => score + 1);
    }
  }

  //clock timing and events
  useEffect(() => {
    let interval = null;
    if (clock_running) {
      interval = setInterval(() => {
        if (period === 2) {
          setPeriodText("2nd");
        } else if (period === 3) {
          setPeriodText("3rd");
        }
        setCount((count) => count - 1);
        minute = Math.floor(count / 60);
        second = ("0" + (count % 60)).slice(-2);
        if (count === 260) {
          addToPlayList((arr) => [
            "It's the Bob's 4:20 of the period!",
            ...arr,
          ]);
        } else if (count === 60) {
          addToPlayList((arr) => [
            "It's the Googus12 last minute of the period!",
            ...arr,
          ]);
        }
        changeEventChance(Math.floor(Math.random() * 300));
        if (eventChance < 20) {
          let message_value =
            shot_messages[Math.floor(Math.random() * shot_messages.length)] +
            " | " +
            minute +
            ":" +
            second +
            " " +
            periodText;
          addToPlayList((arr) => [message_value, ...arr]);
        }
        if (eventChance === 31) {
          updateScore("home");
          let message_value =
            home_goal_messages[
              Math.floor(Math.random() * home_goal_messages.length)
            ] +
            " | " +
            minute +
            ":" +
            second +
            " " +
            periodText;
          addToPlayList((arr) => [message_value, ...arr]);
        }
        if (eventChance === 32) {
          updateScore("away");
          let message_value =
            away_goal_messages[
              Math.floor(Math.random() * away_goal_messages.length)
            ] +
            " | " +
            minute +
            ":" +
            second +
            " " +
            periodText;
          addToPlayList((arr) => [message_value, ...arr]);
        }
        if (count <= 1) {
          if (period < 3) {
            setText("Next Period");
            setPeriodEnd(true);
            setClock(false);
          } else {
            setText("Game Over");
            setPeriod(1000);
            setPeriodText("Final");
            setPeriodEnd(true);
            setClock(false);
          }
        }
      }, speed);
    } else if (!clock_running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  });

  //Speed shown to user
  let speedText;
  switch (speed) {
    case 500:
      speedText = "2x";
      break;
    case 100:
      speedText = "10x";
      break;
    case 10:
      speedText = "100x";
      break;
    default:
      speedText = "1x";
  }

  //calculate minute and second for clock
  minute = Math.floor(count / 60);
  second = ("0" + (count % 60)).slice(-2);

  function message_to_class(e) {
    let messageClass = "shot_text";
    if (e.includes("goal scored")) {
      messageClass = "goal_text";
    } else if (e.includes("period")) {
      messageClass = "noti_text";
    }
    return messageClass;
  }

  return (
    <body>
      <h1>Sim Page</h1>
      <h2>GSquad vs. Hippos</h2>
      <button class="button" onClick={updateClockRun}>
        {buttonText}
      </button>
      <button class="button" onClick={updateSpeed}>
        {speedText}
      </button>
      <div class="scoreboard">
        <div class="scoreboard_time">
          {minute}:{second} {periodText}
        </div>
        <div class="scoreboard_teams">
          <div class="scoreboard_name scoreboard_name--away">{away_team}</div>
          <div class="scoreboard_name scoreboard_name--home">{home_team}</div>
          <div class="scoreboard_score scoreboard_score--home">{awayScore}</div>
          <div class="scoreboard_score scoreboard_score--away">{homeScore}</div>
          <div class="scoreboard_control"></div>
        </div>
        <div class="play_by_play">
          {listItems.map((e) => (
            <div class={message_to_class(e)}>{e}</div>
          ))}
        </div>
      </div>
    </body>
  );
}

export default Sim;
