import { k } from "./kaboomCtx";

// Charger les sprites loadSprite( name , file , { properties to slice the image }), les fichiers de 'public' sont directement accessible grâce à Vite
k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-down": 936,
        "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
        "idle-side": 975,
        "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
        "idle-up": 1014,
        "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
    },
})

k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#311047"));

/**
 * Setup the first scene (for this project the first and only).
 * Function : what happening in the scene...
 * .scene([name], [function]) 
 */
k.scene("main", () => {

});

// .go(scene name) which scene go with the app launch, using main.js as entrance point
k.go("main");