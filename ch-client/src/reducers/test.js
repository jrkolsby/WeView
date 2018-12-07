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
        8: { title: "Oh Brother Where Art Thou", user: 2 },
        7: { title: "The Departed", user: 2 },
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
	[],
        // Winner
        [], 
        // Finals
	[],
        [8,1],
        // Semifinals
	[],
	[],
        [8,6], 
        [3,1],
        // First Round
	[],
	[],
	[],
	[],
        [5,6],
        [7,8],
        [3,4],
        [1,2],
    ],
    round: [1],
    results: [0, 1, 0, 0,
	      0, 0, 0, 1,
	      0, 0, 0, 0,
	      0, 1, 1, 1],
}
