import { SCALE_FACTOR } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue } from "./utils";

/**
 * Charger les sprites loadSprite( name , file , { properties to slice the image }), les fichiers de 'public' sont directement accessible grâce à Vite
 * .loadSprite([name], [file], {parameters})
 * int target spritesheets sprites references
 */
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
k.scene("main", async () => {
    const mapData = await(await fetch("./map.json")).json();
    const layers = mapData.layers;

    const map = k.make([            // .make([]) create a (kaboom) object NOT displaying it
        k.sprite("map"),            // from .loadSprite() (l.18)
        k.pos(0),                   // position where the object is drawn
        k.scale(SCALE_FACTOR)      // the scale of the object (here x4, see ./constants)
    ]);

    const player = k.make([
        k.sprite("spritesheet", { anim: "idle-down" }), // anim parameter is default animation of the sprite
        k.area({                                        // .area({ [parameters] }) : hitbox of this player
            shape: new k.Rect(vec2(0, 3), 10, 10),      // plays with hitbox position X and Y values, and the width, height values
        }),
        k.body(),                                       // activate collision for this object
        k.anchor("center"),                             // X, Y coordinates from where the object is drawn
        k.pos(),                                        // TO DO player spawn 
        k.scale(SCALE_FACTOR),
        {                                               // create an object inside the array. Properties are accessible with .propertie attributes
            speed: 250,
            direction: "down",
            isInDialogue: false,
        },
        "player"
    ]);

    for (const layer of layers) {
        if (layer.name === "boundaries") {              // if we are on the 'boundaries' layer (map.json)
            for (const boundary of layer.objects) {     // the 'objects' property contains an array with all the objects of the layer
                map.add([                               // add a child map object
                    k.area({
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    }),
                    k.body({ isStatic: true }),
                    k.pos(boundary.x, boundary.y),
                    boundary.name,
                ]);

                if (boundary.name) {
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true;
                        displayDialogue("TODO text to display", () => (player.isInDialogue = false));
                    })
                }
            }
            continue;
        }

        if (layer.name === "spawnpoints") {
            for (const entity of layer.objects) {
                if (entity.name === "player") {
                    player.pos = k.vec2( 
                        (map.pos.x + entity.x) * SCALE_FACTOR,
                        (map.pos.y + entity.y) * SCALE_FACTOR
                    );
                    k.add(player);
                    continue;
                }
            }
        }
    }

    

});

// .go([scene name]) which scene go with the app launch, using main.js as entrance point
k.go("main");