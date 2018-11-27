export default {
    listID: -1,
    editing: 0,
    choices: {
        1: { title: "The Royal Tennenbaums", user: 1 },
        2: { title: "Moonrise Kingdom", user: 2 },
        3: { title: "The Big Lebowski", user: 2 },
        4: { title: "Toy Story 2", user: 1 },
        5: { title: "Wall-E", user: 1 },
        6: { title: "The Ring", user: 2 },
        7: { title: "The Departed", user: 2 },
        8: { title: "Oh Brother Where Art Thou", user: 2 }
    },
    users: {
        1: { name: "James Kolsby" },
        2: { name: "India Chai" }
    },
    votes: [
        { user: 1, id: 0, vote: 0 },
        { user: 1, id: 0, vote: 0 },
        { user: 1, id: 0, vote: 0 },
        { user: 1, id: 0, vote: 0 }, 
    ],
    bracket: [
        // Winner
        [1], 
        // Finals
        [1,7],
        // Semifinals
        [1,3],
        [6,7], 
        // First Round
        [1,2],
        [3,4],
        [5,6],
        [7,8],
    ]
}
