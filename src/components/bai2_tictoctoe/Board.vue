<!-- <script setup>
import { defineProps } from 'vue';
const a = defineProps(['hi'])
</script> -->
<template>
      <div class="rowboard" v-for="(row, rowIndex) in board" :key="rowIndex">
        <div v-for="(cell, colIndex) in row" 
            :key="colIndex"
            @click="handleChoose(rowIndex, colIndex)"   
        >
            {{ cell }}
        </div>
      </div>
</template>

<script>
export default {
    name: 'board-',
    props: {
        rows: {
            type: Number,
            required: true 
        },
        columns: {
            type: Number,
            required: true 
        },
        cellwins: {
            type: Number,
            required: true 
        },
        isRefresh: {
            type: Boolean
        }
    },
    data() {
        return {
            board: [],
            currentPlayer: 'X',
            winner: null,
            isDraw: false
        }
    },
    mounted() {
        this.initBoard();
        console.log(this.board)
    },
    computed: {

    },
    methods: {
        initBoard() {
            this.board = Array(this.rows).fill(Array(this.columns).fill(null))
            this.winner = null;
            this.currentPlayer = 'X';
        },
        sendData() {
            const data = {
                currentPlayer: this.currentPlayer,
                winner: this.winner
            }
            this.$emit('uploadData', data)
        },
        handleChoose(row, column) {
            if(this.board[row][column] || this.winner) {
                return;
            }
            const newBoard = this.board.map(row => [...row])
            newBoard[row][column] = this.currentPlayer;
            this.board = newBoard
            this.checkWin(row, column);
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'

        },
        checkWin(row, column) {
            const player = this.board[row][column];
            console.log(player)



            let count=0;
            for(let i=0;i<this.columns;i++) {
                if(this.board[row][i] == player) {
                    count++;
                } else {
                    count =0;
                }
                if(count >= this.cellwins) {
                    this.winner = player;
                    return;
                }
            }

            count=0;
            for(let i=0;i<this.rows;i++) {
                if(this.board[i][column] == player) {
                    count++;
                } else {
                    count=0;
                }

                if(count >= this.cellwins) {
                    this.winner = player;
                    return;
                }
            }

            count=0;
            for(let i=0;i<this.rows;i++) {
                if(this.board[i][i] == player) {
                    count++;
                } else {
                    count =0;
                }

                if(count >= this.cellwins) {
                    this.winner = player;
                    return;
                }
            }

            count=0;
            for(let i=0;i<this.rows;i++) {
                if(this.board[i][this.columns -1-i] == player) {
                    count++;
                } else {
                    count=0;
                }

                if(count >= this.cellwins) {
                    this.winner = player;
                    return;
                }
            }

            console.log(this.winner)
            
        }
    },
    watch: {
        rows() {
            this.initBoard();
        },
        columns() {
            this.initBoard();
        },
        currentPlayer() {
            this.sendData();
        },
        winner() {
            this.sendData();
        },
        isRefresh() {
            this.initBoard()
        }
    }
    
}
</script>