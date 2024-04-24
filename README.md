
## Noughts and crosses
## Game representation
A 3x3 game board is represented as a 2D array of rows and columns. Coordinates start from zero on the top-left.

| 0,0 | 1,0 | 2,0 |
| 0,1 | 1,1 | 2,1 |
| 0,2 | 1,2 | 2,2 |


## Backend
The backend is an Express.js application. 
`/frontend`: static frontend

POST `/api/start-game`: starts a new game

POST `/api/make-move`: Makes a move
Parameters:
```
{"player":"X","x":2,"y":0}
```

Response:
```
{
    "value": "X",
    "gameStatus": {
        "board": [
            [
                {
                    "x": 0,
                    "y": 0,
                    "value": null
                },
                {
                    "x": 0,
                    "y": 1,
                    "value": null
                },
                {
                    "x": 0,
                    "y": 2,
                    "value": null
                }
            ],
            [
                {
                    "x": 1,
                    "y": 0,
                    "value": null
                },
                {
                    "x": 1,
                    "y": 1,
                    "value": null
                },
                {
                    "x": 1,
                    "y": 2,
                    "value": null
                }
            ],
            [
                {
                    "x": 2,
                    "y": 0,
                    "value": "X"
                },
                {
                    "x": 2,
                    "y": 1,
                    "value": null
                },
                {
                    "x": 2,
                    "y": 2,
                    "value": null
                }
            ]
        ],
        "emptySlots": 8,
        "occupiedSlots": 1,
        "winner": null
    }
}
```

GET `/api/get-game-state`: 
Response:
```
{
    "value": "X",
    "gameStatus": {
        "board": [
            [
                {
                    "x": 0,
                    "y": 0,
                    "value": null
                },
                {
                    "x": 0,
                    "y": 1,
                    "value": null
                },
                {
                    "x": 0,
                    "y": 2,
                    "value": null
                }
            ],
            [
                {
                    "x": 1,
                    "y": 0,
                    "value": null
                },
                {
                    "x": 1,
                    "y": 1,
                    "value": null
                },
                {
                    "x": 1,
                    "y": 2,
                    "value": null
                }
            ],
            [
                {
                    "x": 2,
                    "y": 0,
                    "value": "X"
                },
                {
                    "x": 2,
                    "y": 1,
                    "value": null
                },
                {
                    "x": 2,
                    "y": 2,
                    "value": null
                }
            ]
        ],
        "emptySlots": 8,
        "occupiedSlots": 1,
        "winner": null
    }
}
```

## Running
```
docker-compose up
```

visit [http://localhost:3000/](http://localhost:3000/) in your browser
The backend is proxied to http://backend:8080/ in development

The game is player in the browser in a single session for two players.

The first player is Cross and the game toggles to the next player after the current player makes a move.

## Improvements
Sessions. Create a game with a session. The other user can join a session with a given session ID. The game state will be stored in a MongoDB database. The next player will be barred from making a move until the current player has finished their move. The frontend will poll the backend to let the player know when it's their turn.

API keys. Protect the backend with an API key so that it cannot be called by other clients. 


## Building and deployment
```
cd frontend
yarn run build-localhost
rm -rf ../backend/frontend
cp -r build ../backend/frontend
```
The backend is a node application which can be run on nodemon on a server