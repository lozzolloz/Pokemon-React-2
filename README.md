# Brock-Paper-Scissors

One of the first things I made when learning to code was the classic rock-paper-scissors game.

When learning about APIs and finding [PokéAPI](https://pokeapi.co/), I had the idea to combine them and expand the game to include all 18 Pokémon types. 

I initially coded the game in vanilla Javascript in one big file. You can see where I got up to with that in the `old data` folder. Then when I learned about React and component-based architecture, I rebuilt the game that way to practise my React skills.

Now I have even more coding experience, and know that having something in a React hook doesn't necessarily mean it's better, if I was to rebuild the site again, it would probably be somewhere in-between the two versions.  

## Features

### All generations

When you click a `type button`, the entire Pokédex is scoured to select a Pokémon of that type for you at random. Your CPU rival will also select a type and then a Pokémon at random.

### Multi-type effectiveness calculation

If a defending Pokémon has two types, this is taken into account when calculating effectiveness. Different scores are awarded at the end of each round depending on the final effectiveness modifier.

4x effectiveness: attacker +2  
2x effectiveness: attacker +1  
1x effectiveness: +0  
1/2x effectiveness: defender +1  
1/4x effectiveness: defender +2  
0x effectiveness: defender +3  

### Attack and defend mode

Each round, the player and computer alternate `attack mode` and `defend mode`, mimicking the turn-based play of the Pokémon games. The unique `Brock photo`in each mode gives a handy reminder at a glance.

### Shiny Pokémon

Pokémon have a 1 in 100 chance of being `shiny`. This can happen for player or rival (or 1 in 10000 times, for both at once). This renders a shiny Pokémon sprite, and you will also see a special `Brock photo`. When player or rival gets their first shiny Pokémon, their `shiny counter` will appear next to their `score counter`.

### Pokémon name rendering

Pokémon names in the API are given uncapitalised, with hypens instead of spaces and with no special characters. The `capitaliseName` function aims to convert these properly, so that `ditto`, `tapu-lele` and `mr-mime` become `Ditto`, `Tapu Lele` and `Mr. Mime`. Additional form descriptors are removed, so that `gyarados-mega`, `lapras-gmax` and `mr-mime-galar` become `Gyarados`, `Lapras` and `Mr. Mime`.

### Responsiveness

The screen layout is dynamic and will change at certain aspect ratios, appearing different on desktop and mobile.

## Known issues

### Missing sprites

Very occasionally, a Pokémon sprite will not render for a selected Pokémon. This is an issue with the API, with the relevant sprite not being included for that Pokémon.

I have mitigated this by taking the last 8 Pokémon of each type out of circulation, as it tends to be the newer, later Pokémon that have this issue. I would like to add some logic so that Pokémon selection runs again if the sprite is `null` to fix this fully.
