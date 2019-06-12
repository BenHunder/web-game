# web-game

run in local with: npm run start

pause is "\" for now

-------------NOTES-------------------
"Sprite" refers to a creature's image file
"Creature" refers to a character, it has its own sprite, stats, and traits

implementing lazy loading: instead of loading all characters at the beginning of the game, load load characters only when needed by a level.
loading a level triggers -> loadCharacter() -> loadSprites(), loadSounds()
