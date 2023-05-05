<template>
    <canvas ref="canvas" :width="world.width" :height="world.height" :style="`filter: invert(${(clock >= 6 && clock < 18) ? 0 : 100}%);`"></canvas>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import pavementBulge from './pavementBulge.png';
import pavementConcave from './pavementConcave.png';
import dinosaurBothFootstep from './dinosaurBothFootstep.png';
import dinosaurLeftFootstep from './dinosaurLeftFootstep.png';
import dinosaurRightFootstep from './dinosaurRightFootstep.png';
import dinosaurCreepLeftFootstep from './dinosaurCreepLeftFootstep.png';
import dinosaurCreepRightFootstep from './dinosaurCreepRightFootstep.png';
import dinosaurDie from './dinosaurDie.png';
import cloud from './cloud.png';
import bigCactus from './bigCactus.png';
import middleCactus from './middleCactus.png';
import doubleCactus from './doubleCactus.png';
import tripleCactus from './tripleCactus.png';
import quadraCactus from './quadraCactus.png';
import pterosaurUp from './pterosaurUp.png';
import pterosaurDown from './pterosaurDown.png';
const imageResource = {
    pavementBulge, pavementConcave, cloud,
    dinosaurBothFootstep, dinosaurLeftFootstep, dinosaurRightFootstep, dinosaurCreepLeftFootstep, dinosaurCreepRightFootstep, dinosaurDie,
    bigCactus, middleCactus, doubleCactus, tripleCactus, quadraCactus, pterosaurUp, pterosaurDown
};
const canvas = ref('canvas');
const clock = ref(6);
const world = {
    // 6 - 17 代表白天，18 - 5 代表夜晚
    // clock,
    level: .5,
    // 重力加速度
    gravity: 100,
    // 帧率间隔 ms
    interval: 16,
    // 宽度
    width: 600,
    // 高度
    height: 150,
    // 地平线高度
    horizonHeight: 16,
    timer: null,
    // 障碍物的最小间距
    obstacleMinGap: 300,
    // 障碍物距离
    // 当生成障碍物的时候，将 obstacleDistance 设置为 obstacleMinGap
    // 每一帧移动 speed 距离的时候，将 obstacleDistance 减去相同的值
    // 当 obstacleDistance 为 0 的时候，随机生成下一个障碍物
    obstacleDistance: 0,
    // 障碍物列表（碰撞）
    obstacleList: [],
    // 地面物体列表（不会碰撞，比如坑洼，石子之类的）
    pavementList: [],
    // 云朵列表（不会碰撞）
    cloudList: [],
    // 当前分数
    score: 0,
    // 移动的速度
    speed: 12,
    next: function () {
        if (dinosaur.state !== 'alive') {
            return false;
        }
        clock.value = (clock.value + 0.024 * world.level) % 24;
        dinosaur.next();
        // 地面移动
        world.pavementList.forEach(pavement => (pavement.x = pavement.x - world.speed * world.level));
        const pavementList = world.pavementList.filter(n => n.x + n.width > 0);
        const lastPavement = pavementList[pavementList.length - 1];
        let x = lastPavement.x + lastPavement.width;
        while (true) {
            if (x > world.width) {
                break;
            }
            const pavement = new Pavement(x);
            x = x + pavement.width;
            pavementList.push(pavement);
        }
        world.pavementList = pavementList;
        // 云朵移动
        world.cloudList.forEach(cloud => (cloud.x = cloud.x - world.speed * world.level));
        const cloudList = world.cloudList.filter(n => n.x + n.width > 0);
        Math.random() < 0.01 && cloudList.push(new Cloud(world.width));
        world.cloudList = cloudList;
        // 障碍物
        world.obstacleList.forEach(obstacle => {
            obstacle.x = obstacle.x - world.speed * world.level;
            if (obstacle.type === 'pterosaur') {
                obstacle.wingCounter = (obstacle.wingCounter + 1) % 10;
                obstacle.wingCounter === 0 && (obstacle.wing = obstacle.wing === 'up' ? 'down' : 'up');
            }
        });
        world.obstacleList = world.obstacleList.filter(n => n.x + n.width > 0);
        world.obstacleDistance = world.obstacleDistance - world.speed * world.level;
        if (world.obstacleDistance <= 0) {
            const isCreateObstacle = Math.random() < 0.02;
            if (isCreateObstacle) {
                const obstacle = new Obstacle(world.width);
                world.obstacleList.push(obstacle);
                world.obstacleDistance = world.obstacleMinGap;
            }
        }
        // 碰撞监测
        let dinosaurWidth;
        let dinosaurHeight;
        if (!dinosaur.creep) {
            dinosaurWidth = dinosaur.width;
            dinosaurHeight = dinosaur.height;
        } else {
            dinosaurWidth = dinosaur.creepWidth;
            dinosaurHeight = dinosaur.creepHeight;
        }
        for (let i = 0; i < world.obstacleList.length; i++) {
            const obstacle = world.obstacleList[i];
            const x1 = obstacle.x;
            const y1 = world.height - world.horizonHeight - obstacle.y - obstacle.height;
            const x2 = x1 + obstacle.width;
            const y2 = y1 + obstacle.height;
            // 计算矩形 2 的边界坐标
            const x3 = dinosaur.x;
            const y3 = world.height - world.horizonHeight - dinosaur.y - dinosaurHeight;
            const x4 = x3 + dinosaurWidth;
            const y4 = y3 + dinosaurHeight;
            const rec1 = [x1, y1, x2, y2];
            const rec2 = [x3, y3, x4, y4];
            if (!(rec1[2] <= rec2[0] || rec2[2] <= rec1[0] || rec1[3] <= rec2[1] || rec2[3] <= rec1[1])) {
                dinosaur.state = 'die';
                break;
            }
        }
    },
};
const dinosaur = {
    // ready 准备阶段, alive 存活，die 死亡
    state: 'ready',
    // 距离地平线的高度
    y: 0,
    x: 28,
    // 跳跃的速度
    jumpSpeed: 1000,
    // 移动速度
    verticalSpeed: 0,
    // moveSpeed: 10,
    width: 42,
    height: 45,
    creepWidth: 57,
    creepHeight: 28,
    // both 两脚着地，left 左脚，right 右脚
    footstep: 'both',
    // 是否是匍匐状态
    creep: false,
    footstepCounter: 0,
    next: function () {
        if (dinosaur.state === 'alive') {
            dinosaur.footstepCounter = (dinosaur.footstepCounter + 1) % 6;
            dinosaur.footstepCounter === 0 && (dinosaur.footstep = dinosaur.footstep === 'left' ? 'right' : 'left');
        }
        const t = world.interval / 1000;
        const gravity = world.gravity * world.level;
        const verticalSpeed = dinosaur.verticalSpeed * world.level;
        const y = dinosaur.y + verticalSpeed * t - 0.5 * gravity * t * t;
        dinosaur.y = y < 0 ? 0 : y;
        if (y > 0) {
            dinosaur.verticalSpeed = dinosaur.verticalSpeed - gravity;
        }
    }
};
class Pavement {
    constructor (x) {
        this.x = x;
        const randomness = Math.random();
        if (randomness < 0.025) {
            // 凸起
            this.type = 'bulge';
            this.width = 14;
            this.height = 5;
        } else if (randomness < 0.05) {
            // 凹陷
            this.type = 'concave';
            this.width = 11;
            this.height = 3;
        } else if (randomness < 0.2) {
            // 凹陷
            this.type = 'stone';
            this.width = 2 + Math.ceil(Math.random() * 3);
            this.height = 2 + Math.round(Math.random() * 3);
        } else {
            this.type = 'flat';
            this.width = 5 + Math.round(Math.random() * 3);
        }
    }
}
class Obstacle {
    static types = [
        {
            type: 'bigCactus',
            width: 25,
            height: 48
        },
        {
            type: 'middleCactus',
            width: 17,
            height: 35
        },
        {
            type: 'doubleCactus',
            width: 34,
            height: 35
        },
        {
            type: 'tripleCactus',
            width: 51,
            height: 35
        },
        {
            type: 'quadraCactus',
            width: 75,
            height: 49
        },
        {
            type: 'pterosaur',
            width: 44,
            height: 38
        }
    ]
    constructor (x) {
        this.x = x;
        const type = Obstacle.types[Math.floor(Math.random() * Obstacle.types.length)];
        this.type = type.type;
        this.width = type.width;
        this.height = type.height;
        this.y = 0;
        if (this.type === 'pterosaur') {
            this.wingCounter = 0;
            this.wing = 'up';
            this.y = Math.round(Math.random() * (world.height - world.horizonHeight));
        }
    }
}
class Cloud {
    constructor (x) {
        this.x = x;
        this.width = 48;
        this.height = 15;
        const skyHeight = world.height - world.horizonHeight - this.height;
        this.y = Math.random() * skyHeight;
    }
    next () {
        this.x = this.x - this.speed;
    }
}
let ctx;
function initGame () {
    dinosaur.state = 'ready';
    dinosaur.y = 0;
    dinosaur.footstep = 'both';
    dinosaur.creep = false;
    dinosaur.footstepCounter = 0;
    world.obstacleDistance = 0;
    world.obstacleList = [];
    world.pavementList = [];
    world.cloudList = [];
    world.level = 0.75
    createPavement();
    createCloud();
    if (world.timer) {
        clearInterval(world.timer);
    }
    world.timer = setInterval(() => {
        const level = world.level + 0.1
        world.level = level > 3 ? 3 : level;
    }, 10 * 1000);
    !ctx && (ctx = canvas.value.getContext('2d'));
    render();
}
function render () {
    if (world.animation) {
        world.animation && window.cancelAnimationFrame(world.animation);
        world.animation = null;
    }
    world.next();
    ctx.clearRect(0, 0, world.width, world.height);
    drawHorizon();
    drawCloud();
    drawObstacle();
    drawDinosaur();
    world.animation = window.requestAnimationFrame(render);
}
// 创建地平线上的物体（不会发生碰撞）
function createPavement () {
    const pavementList = [];
    let x = 0;
    while (true) {
        const pavement = new Pavement(x);
        x = x + pavement.width;
        pavementList.push(pavement);
        if (x > world.width) {
            break;
        }
    }
    world.pavementList = pavementList;
}
// 创建云朵
function createCloud () {
    const cloudList = [];
    const cloudCount = Math.round(Math.random() * 6);
    for (let i = 0; i < cloudCount; i++) {
        const x = Math.random() * world.width;
        cloudList.push(new Cloud(x));
    }
    world.cloudList = cloudList;
}
// 绘制地平线
function drawHorizon () {
    world.pavementList.forEach(pavement => {
        if (['flat', 'stone'].includes(pavement.type)) {
            ctx.beginPath();
            ctx.moveTo(pavement.x, world.height - world.horizonHeight - 0.5);
            ctx.lineTo(pavement.x + pavement.width, world.height - world.horizonHeight - 0.5);
            ctx.strokeStyle = 'rgb(83, 83, 83)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }
        if (pavement.type === 'stone') {
            ctx.beginPath();
            ctx.moveTo(pavement.x, world.height - world.horizonHeight - 0.5 + pavement.height);
            ctx.lineTo(pavement.x + pavement.width, world.height - world.horizonHeight - 0.5 + pavement.height);
            ctx.strokeStyle = 'rgb(83, 83, 83)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }
        if (pavement.type === 'bulge') {
            ctx.beginPath();
            ctx.drawImage(imageResource.pavementBulge, pavement.x, world.height - world.horizonHeight - pavement.height);
            ctx.closePath();
        }
        if (pavement.type === 'concave') {
            ctx.beginPath();
            ctx.drawImage(imageResource.pavementConcave, pavement.x, world.height - world.horizonHeight - 1);
            ctx.closePath();
        }
    });
}
function drawCloud () {
    world.cloudList.forEach(cloud => {
        ctx.beginPath();
        ctx.drawImage(imageResource.cloud, cloud.x, cloud.y);
        ctx.closePath();
    })
}
function drawDinosaur () {
    ctx.beginPath();
    let dinosaurImage;
    let y = world.height - world.horizonHeight - dinosaur.y;
    if (dinosaur.state === 'ready') {
        dinosaurImage = imageResource.dinosaurBothFootstep;
        y = y - dinosaur.height;
    }
    else if (dinosaur.state === 'alive') {
        if (dinosaur.creep) {
            dinosaurImage = dinosaur.footstep === 'left' ? imageResource.dinosaurCreepLeftFootstep : imageResource.dinosaurCreepRightFootstep;
            y = y - dinosaur.creepHeight;
        } else {
            dinosaurImage = dinosaur.footstep === 'left' ? imageResource.dinosaurLeftFootstep : imageResource.dinosaurRightFootstep;
            y = y - dinosaur.height;
        }
    } else {
        dinosaurImage = imageResource.dinosaurDie;
        y = y - dinosaur.height;
    }
    ctx.drawImage(dinosaurImage, dinosaur.x, y);
    ctx.closePath();
}
function drawObstacle () {
    ctx.beginPath();
    world.obstacleList.forEach(obstacle => {
        if (['bigCactus', 'middleCactus', 'doubleCactus', 'tripleCactus', 'quadraCactus'].includes(obstacle.type)) {
            ctx.beginPath();
            ctx.drawImage(imageResource[obstacle.type], obstacle.x, world.height - world.horizonHeight - obstacle.height);
            ctx.closePath();
        }
        if (['pterosaur'].includes(obstacle.type)) {
            ctx.beginPath();
            const wingImage = obstacle.wing === 'up' ? imageResource.pterosaurUp : imageResource.pterosaurDown;
            ctx.drawImage(wingImage, obstacle.x, world.height - world.horizonHeight - obstacle.y - obstacle.height);
            ctx.closePath();
        }
    });
}
function loadImageResource () {
    const promises = [];
    for (const key in imageResource) {
        const loadPromise = new Promise(resolve => {
            const src = imageResource[key];
            const img = document.createElement('img');
            img.src = src;
            img.onload = () => {
                imageResource[key] = img;
                resolve();
            };
        });
        promises.push(loadPromise);
    }
    return Promise.all(promises);
}
window.onkeydown = e => {
    if (dinosaur.state === 'ready') {
        initGame();
        dinosaur.state = 'alive';
        return false;
    }
    if (dinosaur.state === 'die') {
        initGame();
        dinosaur.state = 'alive';
        return false;
    }
    if (dinosaur.y === 0 && e.keyCode === 38) {
        dinosaur.verticalSpeed = dinosaur.jumpSpeed;
    } else if (dinosaur.y === 0 && e.keyCode === 40) {
        dinosaur.creep = true;
    }
};
window.onkeyup = e => {
    if (dinosaur.y === 0 && e.keyCode === 40) {
        dinosaur.creep = false;
    }
};
onMounted(async () => {
    await loadImageResource();
    initGame();
});
</script>
<style lang="scss" scoped>
canvas {
    display: block;
    margin: 100px auto;
    border: 1px solid;
    background-color: white;
    transition: filter 0.5s;
}
</style>
