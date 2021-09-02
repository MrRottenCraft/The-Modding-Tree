addLayer("p", {
    name: "lubens", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#blue",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Lubens", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {

        11: {
            name: "1",
            description: "Point gain x4.",
            cost: new Decimal(2),
        },

        12: {
            name: "2",
            description: "Lands boost Point gain.",
            cost: new Decimal(5),

            effect() {if(hasUpgrade('p',15))return player.points.add(3).pow(0.562).times(upgradeEffect('p',15)).min(1000)
                else return player.points.add(3).pow(0.222).min(1000)
            },


            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

        13: {
            name: "3",
            description: "Points boost themself",
            cost: new Decimal(20),


           
            effect() {if(hasUpgrade('p',15))return player.points.add(3).pow(0.562).times(upgradeEffect('p',15)).min(30)
                else return player.points.add(0.2).pow(0.15).min(30)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

        },

        14: {
            name: "4",
            description: "Points boost Rubens gain.",
            cost: new Decimal(60),

            effect() {
                return player.points.add(2).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, 

        },

        15: {
            name: "5",
            description: "Points boost Rubens gain.",
            cost: new Decimal(321),

            effect(){return player.points.add(1).add(1).log(10)},

        },

    },
}),

addLayer("r", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "Rubens",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.p.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 3.25,

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
})