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

Below is an example of how the Minimax algorithm would evaluate a Tic-Tac-Toe board state. You can click on the cells to change the board state and see how the Minimax algorithm evaluates it.
{% tictactoe %}


The pseudocode for this process is below:
```js
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

### Example with Tic-Tac-Toe


## Creating the Game

### Python implementation

### TinkerCAD Proof of Concept
To get less concerned looks in public, I simulated the project first in TinkerCAD.

https://www.tinkercad.com/things/ewSBIPnRqvL-copy-of-display/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard&sharecode=KI1W2gOHwPRZwAMvh86yNdgH0sr7LUl6wwLwan1sSCs

### Wiring it up

### I want to train it on the Arduino as well

## Learnings

## Continuation


Talk about how arduino less ram than apollo 11

We will be reducing the possible moves by 
1. Pruning any moves that don't result in a win or a tie
2. Checking if rotation or mirroring matches a stored state to reduce the amount of states we have to store

# Unbeatable Tic Tac Toe on the Arduino
5,478 possible board states
2 for whichever turn it is
10,956 possible states

incorrect: https://www.reddit.com/r/explainlikeimfive/comments/15rlp9e/comment/jwp4rc4/?utm_source=reddit&utm_medium=web2x&context=3

32kb in flash memory

10 and -10 highest value, need 8 bit int to represent

