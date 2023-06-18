<!-- <script setup>
import { ref } from 'vue';
import Table from '../bai2_tictoctoe/Table.vue'
import '../../assets/styles/game.css'

const rows = ref()

</script> -->

<template>
    <div class="container">
        <h1>Tic-toc-toe</h1>
        <div class="fill_infos">
            <div class="fill_info">
                <label for="">Nhập số hàng</label>
                <input type="number" placeholder="Nhập hàng" v-model="rows">
            </div>
            <div class="fill_info">
                <label for="">Nhập số cột</label>
                <input type="number" placeholder="Nhập cột" v-model="columns">
            </div>
            <div class="fill_info">
                <label for="">Nhập số ô thắng liên tiếp</label>
                <input type="number" placeholder="Enter ô thắng liên tiếp" v-model="cellwins">
            </div>
            <h3 v-if="winner">{{ winner }} thắng</h3>
        </div>
        <div class="chessboard">
            <Board :isRefresh="isRefresh" :rows="rows" :columns="columns" :cellwins="cellwins" @uploadData="handleDataFromChild"/>
        </div>
        <div class="luot_choi">
            <h3>Lượt chơi: {{ currentPlayer }}</h3>
        </div>
        <button @click="handleRefresh">Chơi lại</button>
    </div>
</template>

<script>
import '../../assets/styles/game.css'
import Board from '../bai2_tictoctoe/Board.vue'
export default {
    name: 'game-',
    emits: ['uploadData'],
    components: {
        Board
    },
    data() {
        return {
            rows: 3,
            columns: 3,
            cellwins: 3,
            currentPlayer: 'X',
            winner: null,
            isRefresh: false
        }
    },
    methods: {
        handleDataFromChild(data) {
            console.log(data)
            this.currentPlayer = data.currentPlayer;
            this.winner = data.winner
        },
        handleRefresh() {
            this.currentPlayer = 'X';
            this.winner = null;
            this.rows = 3;
            this.columns = 3;
            this.cellwins = 3;
            this.isRefresh = !this.isRefresh
        }
    }
}
</script>
