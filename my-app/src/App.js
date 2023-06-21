import { useState, useEffect } from "react";
import "./App.css";
import ButtonList from "./Components/ButtonList";
import PlayerInstruction from "./Components/PlayerInstruction";
import getRivalType from "./functions/getRivalType";
import getOutcome from "./functions/getOutcome";
import capitaliseName from "./functions/capitaliseName";
import ScoresAndShinies from "./Components/ScoresAndShinies";
import PkmnImgsGameText from "./Components/PkmnImgsGameText";

function App() {
  //create states
  const [gamePlay, setGameplay] = useState(true);
  const [playerType, setPlayerType] = useState("");
  const [playerPkmnName, setPlayerPkmnName] = useState("");
  const [playerPkmnImg, setPlayerPkmnImg] = useState("");
  const [rivalType, setRivalType] = useState("");
  const [rivalType1, setRivalType1] = useState("");
  const [rivalType2, setRivalType2] = useState("");
  const [rivalPkmnName, setRivalPkmnName] = useState("");
  const [rivalPkmnImg, setRivalPkmnImg] = useState("");
  const [outcome, setOutcome] = useState(null);
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [playerShiny, setPlayerShiny] = useState(false);
  const [rivalShiny, setRivalShiny] = useState(false);
  const [playerShinyCount, setPlayerShinyCount] = useState(0);
  const [rivalShinyCount, setRivalShinyCount] = useState(0);

  //functions to decide if shiny

  function isItShinyPlayer() {
    const randomNo = Math.floor(Math.random() * 4096);
    // const randomNo = 0;
    if (randomNo === 0) {
      setPlayerShiny(true);
    } else {
      setPlayerShiny(false);
    }
  }

  function isItShinyRival() {
    // const randomNo = Math.floor(Math.random() * 4096);
    const randomNo = Math.floor(Math.random() * 4096);
    if (randomNo === 0) {
      setRivalShiny(true);
    } else {
      setRivalShiny(false);
    }
  }

  //handleclick function to set the playerType and rivalType states when button clicked
  function handleClick(type) {
    if (gamePlay === true) {
      setGameplay(false);
      //assign player type
      setPlayerType(type);
      //assign rival type
      setRivalType(getRivalType());
    }
  }

  //get playerPkmnName after type set on click
  useEffect(() => {
    async function getPlayerPkmnName(type) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/type/${type}?limit=1`
      );
      let data = await response.json();
      // console.log(data);
      const randomNo = Math.floor(Math.random() * data.pokemon.length);
      // console.log(randomNo);
      setPlayerPkmnName(data.pokemon[randomNo].pokemon.name);
      // playerPkmnCaps = capitaliseName(playerPkmn);
    }
    getPlayerPkmnName(playerType);
  }, [playerType]);

  //get rivalPkmnName after type set on click
  useEffect(() => {
    async function getRivalPkmnName(type) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/type/${type}?limit=1`
      );
      let data = await response.json();
      // console.log(data);
      const randomNo = Math.floor(Math.random() * data.pokemon.length);
      // console.log(randomNo);
      setRivalPkmnName(data.pokemon[randomNo].pokemon.name);
      // rivalPkmnCaps = capitaliseName(rivalPkmn);
    }
    getRivalPkmnName(rivalType);
  }, [rivalType]);

  //define rivalType 1 and rivalType2 which will be undefined if only one type
  useEffect(() => {
    async function getRivalType1and2(rivalPkmnName) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${rivalPkmnName}`
      );
      let data = await response.json();
      console.log(data);
      setRivalType1(data.types[0].type.name);
      setRivalType2(data.types.length > 1 ? data.types[1].type.name : null);
    }
    getRivalType1and2(rivalPkmnName);
  }, [rivalPkmnName]);

  //get playerPkmnImg after name set
  useEffect(() => {
    async function getPlayerPkmnImg(pkmnName) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pkmnName}`
      );
      let data = await response.json();
      //pick normal sprite if not shiny
      if (!playerShiny) {
        //pick new pokemon if no sprite
        if (data.sprites.front_default === null) {
          const prevType = playerType;
          setPlayerType("");
          setPlayerType(prevType);
        } else {
          setPlayerPkmnImg(data.sprites.front_default);
        }
      } else {
        //pick shiny sprite if shiny and incread shiny count
        //pick new pokemon if no sprite
        if (data.sprites.front_shiny === null) {
          const prevType = playerType;
          setPlayerType("");
          setPlayerType(prevType);
        } else {
          setPlayerPkmnImg(data.sprites.front_shiny);
          setPlayerShinyCount((prevCount) => prevCount + 1);
        }
      }
    }

    getPlayerPkmnImg(playerPkmnName);
  }, [playerPkmnName, playerShiny, playerType]);

  //get rivalPkmnImg after name set
  useEffect(() => {
    async function getRivalPkmnImg(pkmnName) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pkmnName}`
      );
      let data = await response.json();
      if (!rivalShiny) {
        //pick new pokemon if no sprite
        if (data.sprites.front_default === null) {
          const prevType = rivalType;
          setRivalType("");
          setRivalType(prevType);
        } else {
          setRivalPkmnImg(data.sprites.front_default);
        }
      } else {
        //pick shiny sprite if shiny and incread shiny count
        //pick new pokemon if no sprite
        if (data.sprites.front_shiny === null) {
          const prevType = rivalType;
          setRivalType("");
          setRivalType(prevType);
        } else {
          setRivalPkmnImg(data.sprites.front_shiny);
          setRivalShinyCount((prevCount) => prevCount + 1);
        }
      }
    }

    getRivalPkmnImg(rivalPkmnName);
  }, [rivalPkmnName, rivalShiny]);

  //define outcomes

  //get outcome once both pkmn names set
  useEffect(() => {
    if (rivalType1 !== "" && (rivalType2 !== "" || rivalType2 !== null)) {
      setOutcome(
        1 *
          getOutcome(playerType, rivalType1, playerPkmnName) *
          getOutcome(playerType, rivalType2, playerPkmnName)
      );
    }
    if (rivalType1 !== "" && rivalType2 === null) {
      setOutcome(1 * getOutcome(playerType, rivalType1, playerPkmnName));
    }
  }, [playerType, rivalType1, rivalType2, playerPkmnName, rivalPkmnName]);

  //change game text after outcome set
  //then resetGame
  useEffect(() => {
    //reset function
    function resetGame() {
      //updating scores
      console.log(outcome);
      switch (outcome) {
        case 2:
          setPlayerScore(playerScore + 1);
          break;
        case 4:
          setPlayerScore(playerScore + 2);
          break;
        case 0.5:
          setRivalScore(rivalScore + 1);
          break;
        case 0.25:
          setRivalScore(rivalScore + 2);
          break;
        case 0:
          setRivalScore(rivalScore + 3);
          break;
        default:
        // no score change
      }
      setPlayerType("");
      setPlayerPkmnName("");
      setPlayerPkmnImg("");
      setRivalType("");
      setRivalType1("");
      setRivalType2("");
      setRivalPkmnName("");
      setRivalPkmnImg("");
      setP1("");
      setP2("");
      setP3("");
      setOutcome(null);
      isItShinyPlayer();
      isItShinyRival();
      setGameplay(true);
    }

    //run gametext
    if (outcome !== null) {
      if (playerType === "electric" || playerType === "ice") {
        setP1(
          `Your ${capitaliseName(
            playerPkmnName
          )} used an ${playerType}-type move!`
        );
      } else {
        setP1(
          `Your ${capitaliseName(
            playerPkmnName
          )} used a ${playerType}-type move!`
        );
      }
      setTimeout(() => {
        if (rivalType2 === null) {
          setP2(
            `Your rival's ${capitaliseName(
              rivalPkmnName
            )} is a ${rivalType1}-type Pokémon!`
          );
        } else {
          setP2(
            `Your rival's ${capitaliseName(
              rivalPkmnName
            )} is a ${rivalType1}/${rivalType2}-type Pokémon!`
          );
        }
      }, 2000);
      setTimeout(() => {
        //update gametext dependent on outcome
        switch (outcome) {
          case 2:
          case 4:
            setP3(
              `Your ${capitaliseName(
                playerPkmnName
              )}'s move is super effective!`
            );
            break;
          case 0.5:
          case 0.25:
            setP3(
              `Your ${capitaliseName(
                playerPkmnName
              )}'s move is not very effective...`
            );
            break;
          case 1:
            setP3("Your Pokémon are evenly matched!");
            break;
          case 0:
            setP3(
              `Your ${capitaliseName(playerPkmnName)}'s move had no effect...`
            );
            break;

          default:
            setP3("Error");
        }
      }, 4000);
      setTimeout(() => {
        //reset
        resetGame();
      }, 7000);
    }
  }, [
    outcome,
    playerPkmnName,
    rivalPkmnName,
    playerType,
    rivalType1,
    rivalType2,
    playerScore,
    rivalScore,
  ]);

  return (
    <div id="app">
      Brock Paper Scissors
      <PlayerInstruction gamePlay={gamePlay} />
      <ButtonList onClick={handleClick} />
      <div id="gameplay-and-scores">
        <PkmnImgsGameText
          id="pkmnimgs-gametext"
          playerPkmnName={playerPkmnName}
          playerPkmnImg={playerPkmnImg}
          p1={p1}
          p2={p2}
          p3={p3}
          rivalPkmnName={rivalPkmnName}
          rivalPkmnImg={rivalPkmnImg}
        />
        <ScoresAndShinies
          id="scores-and-shinies"
          playerScore={playerScore}
          rivalScore={rivalScore}
          playerShinyCount={playerShinyCount}
          rivalShinyCount={rivalShinyCount}
        />
      </div>
    </div>
  );
}

export default App;
