import { useState, useEffect } from "react";
import "./App.css";
import ButtonList from "./Components/ButtonList";
import PlayerInstruction from "./Components/PlayerInstruction";
import getRivalType from "./functions/getRivalType";
import getOutcome from "./functions/getOutcome";
import capitaliseName from "./functions/capitaliseName";
import ScoresAndShinies from "./Components/ScoresAndShinies";
import PkmnImgsGameText from "./Components/PkmnImgsGameText";
import AttackMode from "./Components/AttackMode";
import BrockPhoto from "./Components/BrockPhoto";
import brockAttack from "./images/brock-attack.png";
import brockDefend from "./images/brock-defend.png";
import brockShinyRival from "./images/brock-shiny-rival.png";
import brockShinyPlayer from "./images/brock-shiny-player.png";
import brockShinyDouble from "./images/brock-shiny-double.png";
import "./fonts/pokemon-hollow.ttf";

function App() {
  //create states
  const [brockPhoto, setBrockPhoto] = useState(brockAttack);
  const [gamePlay, setGameplay] = useState(true);
  const [playerType, setPlayerType] = useState("");
  const [playerPkmnName, setPlayerPkmnName] = useState("");
  const [playerPkmnImg, setPlayerPkmnImg] = useState("");
  const [rivalType, setRivalType] = useState("");
  const [defenderType1, setDefenderType1] = useState("");
  const [defenderType2, setDefenderType2] = useState("");
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
  const [attackMode, setAttackMode] = useState(true);
  const [showShinyCountPlayer, setShowShinyCountPlayer] = useState(false);
  const [showShinyCountRival, setShowShinyCountRival] = useState(false);

  function isItShinyPlayer() {
    // const randomNo = Math.floor(Math.random() * 4096);
    const randomNo = Math.floor(Math.random() * 100);
    // const randomNo = 0;

    if (randomNo === 0) {
      setPlayerShiny(true);
    } else {
      setPlayerShiny(false);
    }
  }

  function isItShinyRival() {
    // const randomNo = Math.floor(Math.random() * 4096);
    const randomNo = Math.floor(Math.random() * 100);
    // const randomNo = 0;
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
      let randomNo = Math.floor(Math.random() * data.pokemon.length);
      setPlayerPkmnName(data.pokemon[randomNo].pokemon.name);
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

      let randomNo = Math.floor(Math.random() * data.pokemon.length);

      setRivalPkmnName(data.pokemon[randomNo].pokemon.name);
      // rivalPkmnCaps = capitaliseName(rivalPkmn);
    }
    getRivalPkmnName(rivalType);
  }, [rivalType]);

  //define defenderType 1 and defenderType2 which will be undefined if only one type
  useEffect(() => {
    async function getDefenderType1and2(pkmnName) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pkmnName}`
      );
      let data = await response.json();
      console.log(data);
      setDefenderType1(data.types[0].type.name);
      setDefenderType2(data.types.length > 1 ? data.types[1].type.name : null);
    }
    if (attackMode === true) {
      getDefenderType1and2(rivalPkmnName);
    } else {
      getDefenderType1and2(playerPkmnName);
    }
  }, [attackMode, playerPkmnName, rivalPkmnName]);

  //get playerPkmnImg after name set
  useEffect(() => {
    async function getPlayerPkmnImg(pkmnName) {
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pkmnName}`
      );
      let data = await response.json();
      console.log(data);
      //pick normal sprite if not shiny
      if (!playerShiny) {
        setPlayerPkmnImg(data.sprites.front_default);
      } else {
        //pick shiny sprite if shiny and incread shiny count

        setPlayerPkmnImg(data.sprites.front_shiny);
        setPlayerShinyCount((prevCount) => prevCount + 1);
        setShowShinyCountPlayer(true);
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
        setRivalPkmnImg(data.sprites.front_default);
      } else {
        //pick shiny sprite if shiny and increase shiny count

        setRivalPkmnImg(data.sprites.front_shiny);
        setRivalShinyCount((prevCount) => prevCount + 1);
        setShowShinyCountRival(true);
      }
    }

    getRivalPkmnImg(rivalPkmnName);
  }, [rivalPkmnName, rivalShiny, rivalType]);

  //define outcomes

  //get outcome once both pkmn names set
  useEffect(() => {
    let attackerType = attackMode ? playerType : rivalType;

    if (
      defenderType1 !== "" &&
      (defenderType2 !== "" || defenderType2 !== null)
    ) {
      setOutcome(
        1 *
          getOutcome(attackerType, defenderType1) *
          getOutcome(attackerType, defenderType2)
      );
    }
    if (defenderType1 !== "" && defenderType2 === null) {
      setOutcome(1 * getOutcome(attackerType, defenderType1));
    }
  }, [attackMode, playerType, rivalType, defenderType1, defenderType2]);

  //change game text after outcome set
  //then resetGame
  useEffect(() => {
    //reset function
    function resetGame() {
      //updating scores
      switch (outcome) {
        case 2:
          attackMode
            ? setPlayerScore(playerScore + 1)
            : setRivalScore(rivalScore + 1);
          break;
        case 4:
          attackMode
            ? setPlayerScore(playerScore + 2)
            : setRivalScore(rivalScore + 2);
          break;
        case 0.5:
          attackMode
            ? setRivalScore(rivalScore + 1)
            : setPlayerScore(playerScore + 1);
          break;
        case 0.25:
          attackMode
            ? setRivalScore(rivalScore + 2)
            : setPlayerScore(playerScore + 2);
          break;
        case 0:
          attackMode
            ? setRivalScore(rivalScore + 3)
            : setPlayerScore(playerScore + 3);
          break;
        default:
        // no score change
      }
      setBrockPhoto(attackMode ? brockDefend : brockAttack);
      setPlayerType("");
      setPlayerPkmnName("");
      setPlayerPkmnImg("");
      setRivalType("");
      setDefenderType1("");
      setDefenderType2("");
      setRivalPkmnName("");
      setRivalPkmnImg("");
      setP1("");
      setP2("");
      setP3("");
      setOutcome(null);
      isItShinyPlayer();
      isItShinyRival();
      setAttackMode(!attackMode);
      setGameplay(true);
    }

    //run gametext
    if (outcome !== null) {
      if (playerShiny === true && rivalShiny === true) {
        setBrockPhoto(brockShinyDouble);
      }
      if (playerShiny === true && rivalShiny === false) {
        setBrockPhoto(brockShinyPlayer);
      }
      if (playerShiny === false && rivalShiny === true) {
        setBrockPhoto(brockShinyRival);
      }

      if (attackMode) {
        setP1(
          playerType === "electric" || playerType === "ice"
            ? `Your ${capitaliseName(
                playerPkmnName
              )} used an ${playerType}-type move!`
            : `Your ${capitaliseName(
                playerPkmnName
              )} used a ${playerType}-type move!`
        );
      }
      if (!attackMode) {
        setP1(
          rivalType === "electric" || rivalType === "ice"
            ? `Your rival's ${capitaliseName(
                rivalPkmnName
              )} used an ${rivalType}-type move!`
            : `Your rival's ${capitaliseName(
                rivalPkmnName
              )} used a ${rivalType}-type move!`
        );
      }

      setTimeout(() => {
        if (defenderType2 === null) {
          setP2(
            attackMode
              ? `Your rival's ${capitaliseName(rivalPkmnName)} is ${
                  defenderType1 === "electric" || defenderType1 === "ice"
                    ? "an "
                    : "a "
                }${defenderType1}-type Pokémon!`
              : `Your ${capitaliseName(playerPkmnName)} is ${
                  defenderType1 === "electric" || defenderType1 === "ice"
                    ? "an "
                    : "a "
                }${defenderType1}-type Pokémon!`
          );
        } else {
          setP2(
            attackMode
              ? `Your rival's ${capitaliseName(rivalPkmnName)} is ${
                  defenderType1 === "electric" || defenderType1 === "ice"
                    ? "an "
                    : "a "
                }${defenderType1}/${defenderType2}-type Pokémon!`
              : `Your ${capitaliseName(playerPkmnName)} is ${
                  defenderType1 === "electric" || defenderType1 === "ice"
                    ? "an "
                    : "a "
                }${defenderType1}/${defenderType2}-type Pokémon!`
          );
        }
      }, 2000);

      setTimeout(() => {
        //update gametext dependent on outcome
        switch (outcome) {
          case 2:
          case 4:
            setP3(
              attackMode
                ? `Your ${capitaliseName(
                    playerPkmnName
                  )}'s move is super effective!`
                : `Your rival's ${capitaliseName(
                    rivalPkmnName
                  )}'s move is super effective!`
            );
            // setBrockPhoto(attackMode ? brockWin : brockLoss);
            break;
          case 0.5:
          case 0.25:
            setP3(
              attackMode
                ? `Your ${capitaliseName(
                    playerPkmnName
                  )}'s move is not very effective...`
                : `Your rival's ${capitaliseName(
                    rivalPkmnName
                  )}'s move is not very effective...`
            );
            // setBrockPhoto(attackMode ? brockLoss : brockWin);
            break;
          case 1:
            setP3("Your Pokémon are evenly matched!");
            break;
          case 0:
            setP3(
              attackMode
                ? `Your ${capitaliseName(
                    playerPkmnName
                  )}'s move had no effect...`
                : `Your rival's ${capitaliseName(
                    rivalPkmnName
                  )}'s move had no effect...`
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
    attackMode,
    outcome,
    playerPkmnName,
    rivalPkmnName,
    playerType,
    rivalType,
    defenderType1,
    defenderType2,
    playerScore,
    rivalScore,
    playerShiny,
    rivalShiny,
  ]);

  useEffect(() => {
    console.log(playerType);
  }, [playerType]);

  return (
    <div id="app-border">
      <div id="app">
        <div id="top-row">
          <div id="top-left">
            <h1 id="heading">Brock Paper Scissors</h1>
            <BrockPhoto brockPhoto={brockPhoto} />
            <AttackMode attackMode={attackMode} />
          </div>
          <div id="top-right">
            <PlayerInstruction gamePlay={gamePlay} />
            <ButtonList onClick={handleClick} />
          </div>
        </div>
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
          showShinyCountPlayer={showShinyCountPlayer}
          showShinyCountRival={showShinyCountRival}
        />
      </div>
    </div>
  );
}

export default App;
