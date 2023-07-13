/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import "./fonts/pokemon-hollow.ttf";
import brockAttack from "./images/brock-attack.png";
import brockDefend from "./images/brock-defend.png";
import brockShinyRival from "./images/brock-shiny-rival.png";
import brockShinyPlayer from "./images/brock-shiny-player.png";
import brockShinyDouble from "./images/brock-shiny-double.png";
import pokeball from "./images/pokeball.png";
import ButtonList from "./Components/ButtonList";
import PlayerInstruction from "./Components/PlayerInstruction";
import ScoresAndShinies from "./Components/ScoresAndShinies";
import PkmnImgsGameText from "./Components/PkmnImgsGameText";
import AttackMode from "./Components/AttackMode";
import BrockPhoto from "./Components/BrockPhoto";
import effectivenessCalculation from "./functions/effectivenessCalculation";
import capitaliseName from "./functions/capitaliseName";
import getPkmnPlayer from "./functions/getPkmnPlayer";
import { getPkmnRival } from "./functions/getPkmnRival";

function App() {
  const [brockPhoto, setBrockPhoto] = useState(brockAttack);
  const [gamePlay, setGameplay] = useState(true);
  const [playerPkmnImg, setPlayerPkmnImg] = useState(pokeball);
  const [rivalPkmnImg, setRivalPkmnImg] = useState(pokeball);
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
  const roundDataBlank = {
    pkmnNamePlayer: "",
    pkmnType1Player: "",
    pkmnType2Player: "",
    pkmnSpritePlayer: "",
    pkmnSpriteShinyPlayer: "",
    pkmnNameRival: "",
    pkmnType1Rival: "",
    pkmnType2Rival: "",
    pkmnSpriteRival: "",
    pkmnSpriteShinyRival: "",
    outcome: "",
  };
  const [roundData, setRoundData] = useState(roundDataBlank);

  function isItShinyPlayer() {
    const randomNo = Math.floor(Math.random() * 100);
    // const randomNo = 0;
    if (randomNo === 0) {
      setPlayerShiny(true);
    } else {
      setPlayerShiny(false);
    }
  }

  function isItShinyRival() {
    const randomNo = Math.floor(Math.random() * 100);
    // const randomNo = 0;
    if (randomNo === 0) {
      setRivalShiny(true);
    } else {
      setRivalShiny(false);
    }
  }

  function shinyBrockPhoto() {
    if (playerShiny === true && rivalShiny === true) {
      setBrockPhoto(brockShinyDouble);
    }
    if (playerShiny === true && rivalShiny === false) {
      setBrockPhoto(brockShinyPlayer);
    }
    if (playerShiny === false && rivalShiny === true) {
      setBrockPhoto(brockShinyRival);
    }
  }

  function setSprites() {
    if (!playerShiny) {
      setPlayerPkmnImg(roundData.pkmnSpritePlayer);
    } else {
      setPlayerPkmnImg(roundData.pkmnSpriteShinyPlayer);
      setPlayerShinyCount((prevCount) => prevCount + 1);
      setShowShinyCountPlayer(true);
    }
    if (!rivalShiny) {
      setRivalPkmnImg(roundData.pkmnSpriteRival);
    } else {
      setRivalPkmnImg(roundData.pkmnSpriteShinyRival);
      setRivalShinyCount((prevCount) => prevCount + 1);
      setShowShinyCountRival(true);
    }
  }

  function getOutcome(
    pkmnType1Player,
    pkmnType2Player,
    pkmnType1Rival,
    pkmnType2Rival
  ) {
    let outcome;
    attackMode
      ? (outcome =
          1 *
          effectivenessCalculation(pkmnType1Player, pkmnType1Rival) *
          effectivenessCalculation(pkmnType1Player, pkmnType2Rival))
      : (outcome =
          1 *
          effectivenessCalculation(pkmnType1Rival, pkmnType1Player) *
          effectivenessCalculation(pkmnType1Rival, pkmnType2Player));
    return outcome;
  }

  function displayRound() {
    shinyBrockPhoto();
    setSprites();
    runGameText();
  }

  async function processRound(type) {
    const [playerPkmn, rivalPkmn] = await Promise.all([
      getPkmnPlayer(type),
      getPkmnRival(),
    ]);
    const outcome = getOutcome(
      playerPkmn.pkmnType1,
      playerPkmn.pkmnType2,
      rivalPkmn.pkmnType1,
      rivalPkmn.pkmnType2
    );
    setRoundData({
      pkmnNamePlayer: playerPkmn.pkmnName,
      pkmnType1Player: playerPkmn.pkmnType1,
      pkmnType2Player: playerPkmn.pkmnType2,
      pkmnSpritePlayer: playerPkmn.pkmnSprite,
      pkmnSpriteShinyPlayer: playerPkmn.pkmnSpriteShiny,
      pkmnNameRival: rivalPkmn.pkmnName,
      pkmnType1Rival: rivalPkmn.pkmnType1,
      pkmnType2Rival: rivalPkmn.pkmnType2,
      pkmnSpriteRival: rivalPkmn.pkmnSprite,
      pkmnSpriteShinyRival: rivalPkmn.pkmnSpriteShiny,
      outcome: outcome,
    });
  }

  function resetGame() {
    switch (roundData.outcome) {
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
    setRoundData(roundDataBlank);
    setP1("");
    setP2("");
    setP3("");
    isItShinyPlayer();
    isItShinyRival();
    setAttackMode(!attackMode);
    setBrockPhoto(attackMode ? brockDefend : brockAttack);
    setPlayerPkmnImg(pokeball);
    setRivalPkmnImg(pokeball);
    setGameplay(true);
  }

  function runGameText() {
    let {
      pkmnNamePlayer,
      pkmnType1Player,
      pkmnType2Player,
      pkmnNameRival,
      pkmnType1Rival,
      pkmnType2Rival,
      outcome,
    } = roundData;

    if (attackMode) {
      setP1(
        pkmnType1Player === "electric" || pkmnType1Player === "ice"
          ? `Your ${capitaliseName(
              pkmnNamePlayer
            )} used an ${pkmnType1Player}-type move!`
          : `Your ${capitaliseName(
              pkmnNamePlayer
            )} used a ${pkmnType1Player}-type move!`
      );
    }
    if (!attackMode) {
      setP1(
        pkmnType1Rival === "electric" || pkmnType1Rival === "ice"
          ? `Your rival's ${capitaliseName(
              pkmnNameRival
            )} used an ${pkmnType1Rival}-type move!`
          : `Your rival's ${capitaliseName(
              pkmnNameRival
            )} used a ${pkmnType1Rival}-type move!`
      );
    }

    setTimeout(() => {
      let defenderCombination;
      if (attackMode) {
        pkmnType2Rival
          ? (defenderCombination = `${pkmnType1Rival}/${pkmnType2Rival}`)
          : (defenderCombination = `${pkmnType1Rival}`);
        setP2(`Your rival's ${capitaliseName(pkmnNameRival)} is
${pkmnType1Rival === "electric" || pkmnType1Rival === "ice" ? "an " : "a "}
${defenderCombination}-type Pokémon!`);
      }
      if (!attackMode) {
        pkmnType2Player
          ? (defenderCombination = `${pkmnType1Player}/${pkmnType2Player}`)
          : (defenderCombination = `${pkmnType1Player}`);
        setP2(`Your ${capitaliseName(pkmnNamePlayer)} is
  ${pkmnType1Player === "electric" || pkmnType1Player === "ice" ? "an " : "a "}
  ${defenderCombination}-type Pokémon!`);
      }
    }, 2400);

    setTimeout(() => {
      //update gametext dependent on outcome
      switch (outcome) {
        case 2:
        case 4:
          setP3(
            attackMode
              ? `Your ${capitaliseName(
                  pkmnNamePlayer
                )}'s move is super effective!`
              : `Your rival's ${capitaliseName(
                  pkmnNameRival
                )}'s move is super effective!`
          );
          break;
        case 0.5:
        case 0.25:
          setP3(
            attackMode
              ? `Your ${capitaliseName(
                  pkmnNamePlayer
                )}'s move is not very effective...`
              : `Your rival's ${capitaliseName(
                  pkmnNameRival
                )}'s move is not very effective...`
          );
          break;
        case 1:
          setP3("Your Pokémon are evenly matched!");
          break;
        case 0:
          setP3(
            attackMode
              ? `Your ${capitaliseName(pkmnNamePlayer)}'s move had no effect...`
              : `Your rival's ${capitaliseName(
                  pkmnNameRival
                )}'s move had no effect...`
          );
          break;

        default:
          setP3("Error");
      }
    }, 4800);

    setTimeout(() => {
      resetGame();
    }, 8400);
  }

  function handleClick(type) {
    if (gamePlay === true) {
      setGameplay(false);
      processRound(type);
    }
  }

  useEffect(() => {
    if (roundData !== roundDataBlank && gamePlay === false) {
      displayRound();
    }
  }, [roundData]);

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
          playerPkmnName={roundData.pkmnNamePlayer}
          playerPkmnImg={playerPkmnImg}
          p1={p1}
          p2={p2}
          p3={p3}
          rivalPkmnName={roundData.pkmnNameRival}
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
