import { k } from "./kaboomCtx";

// Charger les sprites loadSprite( name , file , { properties to slice the image }), les fichiers de 'public' sont directement accessible grâce à Vite
k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-down": 936,
    }
})