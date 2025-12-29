---
title: "ML on an Arduino - Minimax Tic-Tac-Toe"
date: 2025-12-17
tags: post
permalink: "/tictactoe/"
---

# Tiny Tic-Tac-Toe
{{ page.date | date: "%Y-%m-%d" }}
[[toc]]

## Background
My friend gifted me an Arduino Uno R3 kit a while back and I thought it would be really funny to try to do machine learning on it. To start small, I am implementing the [Minimax algorithm](https://en.wikipedia.org/wiki/Minimax) on TicTacToe.

## Minimax Algorithm
The Minimax algorithm takes into account all possible moves that can be made from the current state of the game and then assigns a score to that state. This score is calculated by recursive checking of all possible future states until a terminal state is reached (win, lose, or tie).

The Minimax algorithm assumes that both players are playing optimally and at each recursive step the best choice for the respective player is chosen.

We can think of us winning as a positive score, and the more we win by, the higher the score. For the opponent wining, we would receive a negative score, and the more they win by the lower the score we receive. A tie would be a score of 0.

[Stockfish](https://github.com/official-stockfish/Stockfish), the [highest ranking chess engine](https://computerchess.org.uk/ccrl/404/), uses the Minimax algorithm [reference](https://github.com/official-stockfish/Stockfish/wiki/Stockfish-FAQ#what-is-depth)

::: info
Below is a 3x3 grid of Tic-Tac-Toe games, where each board represents a different state in the game. You can adjust the move for either player at different stages in the game by clicking on a cell. The Minimax algorithm then evaluates how the game would proceed from that state if both players played optimally.
:::

{% tictactoe %}

## Creating the Game
The code for the game can be found on my github page ([tinytictactoe](https://github.com/VitoLin/tinytictactoe)). Below is a simple implementation of the Minimax algorithm in pseudocode and Python.

```js [g1:Psuedocode]
// https://en.wikipedia.org/wiki/Minimax#Pseudocode
function minimax(node, depth, maximizingPlayer) is
    if depth = 0 or node is a terminal node then
        return the heuristic value of node
    if maximizingPlayer then
        value := −∞
        for each child of node do
            value := max(value, minimax(child, depth − 1, FALSE))
        return value
    else (* minimizing player *)
        value := +∞
        for each child of node do
            value := min(value, minimax(child, depth − 1, TRUE))
        return value
```

```python [g1:Python]
def minimax(board, depth, player):
    # Heuristic evaluation
    winner = check_if_won(board)
    if winner == 1:
        return 10 - depth
    if winner == -1:
        return depth - 10
    possible_moves = get_possible_moves(board)
    if not possible_moves:
        return 0

    if player == 1: # Maximizer
        best_val = float('-inf')
        for move in possible_moves:
            best_val = max(best_val, minimax(apply_move(board, move, 1), depth + 1, -1))
        return best_val
    else: # Minimizer
        best_val = float('inf')
        for move in possible_moves:
            best_val = min(best_val, minimax(apply_move(board, move, -1), depth + 1, 1))
        return best_val
```

### TinkerCAD Proof of Concept
![](/static/circuit.png)

I simulated the project first in TinkerCAD as it made it much easier to iterate quickly, especially since I did not need to carry the physical Arduino and mess of wires around. You can view and interact with the simulation at this [TinkerCad link](https://www.tinkercad.com/things/ewSBIPnRqvL-ai-tic-tac-toe).


## Continuation
At the start of this project, I wanted to challenge myself by trying to reduce the storage needed to fit the "weights" of the TicTacToe game states into the limited memory of the Arduino Uno (32KB of flash memory and 2KB of SRAM).

I wanted to use techniques like pruning, symmetry reduction, and storing only games that the AI would start to reduce the number of states that needed to be stored. The more elegant solution ended up just using the location in memory as the state itself.

I think a fun next step would be to implement a more complex game with larger state space or to to make the interface to play against the bot to be more interesting (e.g. a physical board).
