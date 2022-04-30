import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// import { API } from "aws-amplify";

// const myAPI = "playerTestAPI";
// const path = "/player"

let minute;
let second;

let homeTeam = "Hippos";
let awayTeam = "GSquad";
const homeGoalMessages = [
  homeTeam + " goal scored by Forward",
  homeTeam + " goal scored by Forward",
  homeTeam + " goal scored by Goalie",
];
const awayGoalMessages = [
  awayTeam + " goal scored by Forward",
  awayTeam + " goal scored by Forward",
  awayTeam + " goal scored by Goalie",
];
const shotMessages = [
  homeTeam + " shot on goal by Forward",
  awayTeam + " shot on goal by Forward",
  homeTeam + " shot on goal by Forward",
  awayTeam + " shot on goal by Forward",
  homeTeam + " shot on goal by Goalie",
  awayTeam + " shot on goal by Goalie",
  homeTeam + " shot missed by Forward",
  awayTeam + " shot missed by Forward",
  homeTeam + " shot missed by Forward",
  awayTeam + " shot missed by Forward",
  homeTeam + " shot missed by Goalie",
  awayTeam + " shot missed by Goalie",
];

function Sim() {
  //set variables
  const [count, setCount] = useState(300);
  const [period, setPeriod] = useState(1);
  const [periodText, setPeriodText] = useState("1st");
  const [clockRunning, setClock] = useState(false);
  const [periodEnd, setPeriodEnd] = useState(false);
  const [buttonText, setText] = useState("Play");
  const [listItems, addToPlayList] = useState([]);
  const [eventChance, changeEventChance] = useState(5);
  const [speed, setSpeed] = useState(1000);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  // const [input, setInput] = useState("");
  // const [players, setPlayers] = useState([]);

  //when user presses play/pause/next period
  function updateClockRun() {
    if (period < 3) {
      if (periodEnd) {
        setPeriodEnd(false);
        setPeriod((per) => per + 1);
        setCount(300);
        setText("Pause");
      }
      if (clockRunning) {
        setText("Play");
      } else {
        setText("Pause");
      }
      setClock(!clockRunning);
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
    if (clockRunning) {
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
          let messageValue =
            shotMessages[Math.floor(Math.random() * shotMessages.length)] +
            " | " +
            minute +
            ":" +
            second +
            " " +
            periodText;
          addToPlayList((arr) => [messageValue, ...arr]);
        }
        if (eventChance === 31) {
          updateScore("home");
          let messageValue =
            homeGoalMessages[
              Math.floor(Math.random() * homeGoalMessages.length)
            ] +
            " | " +
            minute +
            ":" +
            second +
            " " +
            periodText;
          addToPlayList((arr) => [messageValue, ...arr]);
        }
        if (eventChance === 32) {
          updateScore("away");
          let messageValue =
            awayGoalMessages[
              Math.floor(Math.random() * awayGoalMessages.length)
            ] +
            " | " +
            minute +
            ":" +
            second +
            " " +
            periodText;
          addToPlayList((arr) => [messageValue, ...arr]);
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
    } else if (!clockRunning) {
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

  function messageToClass(e) {
    let messageClass = "shot_text";
    if (e.includes("goal scored")) {
      messageClass = "goal_text";
    } else if (e.includes("period")) {
      messageClass = "noti_text";
    }
    return messageClass;
  }

  // function getPlayer(e) {
  //   let playerId = e.input;
  //   console.log(e.input);
  //   API.get(myAPI, path + "/" + playerId)
  //     .then((response) => {
  //       setPlayers([response]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

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
      {/* <div>
        <input
          placeholder="player id"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button class="button" onClick={() => getPlayer({ input })}>
        generate
      </button>
      {players.map((thisPlayer, index) => {
        return (
          <div key={thisPlayer.playerId}>
            <span>
              <b>PlayerId:</b> {thisPlayer.playerId}
            </span>
          </div>
        );
      })} */}
      <div class="scoreboard">
        <div class="scoreboard_time">
          {minute}:{second} {periodText}
        </div>
        <div class="scoreboard_teams">
          <div class="scoreboard_name scoreboard_name--away">{awayTeam}</div>
          <div class="scoreboard_name scoreboard_name--home">{homeTeam}</div>
          <div class="scoreboard_score scoreboard_score--home">{awayScore}</div>
          <div class="scoreboard_score scoreboard_score--away">{homeScore}</div>
          <div class="scoreboard_control"></div>
        </div>
        <div class="play_by_play">
          {listItems.map((e) => (
            <div class={messageToClass(e)}>{e}</div>
          ))}
        </div>
      </div>
      <Link to="/home">
        <button class="button">Back!</button>
      </Link>
    </body>
  );
}

export default Sim;
