<template>
    <div class="loading">
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
        <div class="obj"></div>
    </div>
</template>

<style lang="scss" scoped>
.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 40px;
    display: flex;
    align-items: center;
}
.obj {
    width: 6px;
    height: 40px;
    background: #e74c3c;
    margin: 0 3px;
    border-radius: 10px;
    animation: loading 0.8s infinite;
    &:nth-child(2) {
        background: #e67e22;
        animation-delay: 0.1s;
    }
    &:nth-child(3) {
        background: #f1c40f;
        animation-delay: 0.2s;
    }
    &:nth-child(4) {
        background: #2ecc71;
        animation-delay: 0.3s;
    }
    &:nth-child(5) {
        background: #3498db;
        animation-delay: 0.4s;
    }
    &:nth-child(6) {
        background: #9b59b6;
        animation-delay: 0.5s;
    }
    &:nth-child(7) {
        background: #8e44ad;
        animation-delay: 0.6s;
    }
    &:nth-child(8) {
        background: #2c3e50;
        animation-delay: 0.7s;
    }
}
@keyframes loading {
    0% {
        height: 0;
    }
    50% {
        height: 40px;
    }
    100% {
        height: 0;;
    }
}
</style>