class AcGameMenu{
    constructor(root) {
        this.root = root;
        //前端 html显示
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            退出
        </div>
    </div>
</div>`);
        this.root.$ac_game.append(this.$menu);
        this.$single = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

        this.start();
    }

    start() {
        //调用监听函数
        this.add_listening_events();
    }

    /**
     * 模式选择
     */
    add_listening_events(){
        //进入函数内部的this 为函数本身 ，保存之前的this
        let outter = this;
        this.$single.click(function (){
            console.log("todo single click");
            //游戏开始  关闭当前页面
            outter.hide();
            outter.root.playground.show();
        });
        this.$multi.click(function (){
            console.log("todo multi click");
        });
        this.$settings.click(function (){
            console.log("todo setting click");
        });

    }

    /**
     * 菜单显瘦
     */
    show() {
        this.$menu.show();
    }

    /**
     * 菜单隐藏
     */
    hide(){
        this.$menu.hide();
    }
}







let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.has_called_start = false;  // 是否执行过start函数
        this.timedelta = 0;  // 当前帧距离上一帧的时间间隔
        //this.uuid = this.create_uuid();
    }

    // create_uuid() {
    //     let res = "";
    //     for (let i = 0; i < 8; i ++ ) {
    //         let x = parseInt(Math.floor(Math.random() * 10));  // 返回[0, 1)之间的数
    //         res += x;
    //     }
    //     return res;
    // }

    start() {  // 只会在第一帧执行一次
    }

    update() {  // 每一帧均会执行一次
    }

    // late_update() {  // 在每一帧的最后执行一次
    // }

    on_destroy() {  // 在被销毁前执行一次
    }

    destroy() {  // 删掉该物体
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp) {
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            //第一帧调用 不用计算 帧间隔的时间
            obj.start();
            obj.has_called_start = true;
        } else {
            //第二帧调用  计算和更新 帧间隔的时间
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    // for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
    //     let obj = AC_GAME_OBJECTS[i];
    //     obj.late_update();
    // }

    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);
/**
 * 游戏地图
 */
class GameMap extends AcGameObject{
    constructor(playground) {
        super();
        this.playground = playground;
        //创建游戏画布
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');

        //画布的高和宽
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;

        this.playground.$playground.append(this.$canvas);
        // 开始游戏
        //this.start();
    }


    /**
     * 来世调用游戏
     */
    start() {

    }
    //更新游戏画面
    update() {
        //画游戏界面
        this.render();
    }

    /**
     * 渲染游戏界面
     */
    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}class player extends AcGameObject{
    constructor(playground, x, y,radius, color, speed, is_me) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        //移动变量
        this.vx = 0;
        this.vy = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.1;
        //**********一定要初始化  move_length ，不然回味nan 报错
        this.move_length = 0;
        //this.spent_time = 0;
        //this.fireballs = [];

        //this.cur_skill = null;
    }
    start() {
        //如果是自己  则可以通过监听函数操作小球
        if (this.is_me){
            this.add_listening_events();
        }
    }

    add_listening_events(){
        //this 函数内的this为函数本身 ， 用变量保存外部class的this
        let outer= this;
        this.playground.game_map.$canvas.on("contextmenu", function (){
            //游戏界面鼠标右键时  不出现游览器的操作选项
            return false;
        });
        this.playground.game_map.$canvas.mousedown(function(e) {
            //鼠标右键 移动
            if (e.which === 3){
                outer.move_to(e.clientX, e.clientY);
             }//else if (e.which === 1){//鼠标左键 发射火球
            //     if (outer.cur_skill === "fireballs"){
            //         outer.shoot_fireball(e.clientX, e.clientY);
            //     }
            //     //释放完技能 晴空
            //
            //     outer.cur_skill = null;
            // }
        });
        // this.playground.game_map.$canvas.keydown(function(e) {
        //     if (e.which === 81) {  // q
        //         outer.cur_skill = "fireball";
        //         return false;
        //     }
        // });

    }
    // shoot_fireball(tx, ty) {
    //     console.log("firballss");
    //      let x = this.x, y = this.y;
    //     let radius = 0.01;
    //     let angle = Math.atan2(ty - this.y, tx - this.x);
    //     let vx = Math.cos(angle), vy = Math.sin(angle);
    //     let color = "orange";
    //     let speed = 0.5;
    //     let move_length = 1;
    //     let fireball = new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, 0.01);
    //     // this.fireballs.push(fireball);
    //     //
    //     // this.fireball_coldtime = 3;
    //
    //     return fireball;
    //
    // }


    /**
     * 移动距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @returns {number}
     */
    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }


    move_to(tx, ty) {
        console.log("move", tx, ty);
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        //单位距离的X Y 轴移动速度
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }


    /**
     * 实时更新圆圈
     */
    update() {
        if (this.move_length < this.eps) {
            this.move_length = 0;
            this.vx = this.vy = 0;
        }else {
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
            console.log(moved);
            console.log(this.move_length);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        this.render();
    }
    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}class FireBall extends AcGameObject {
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length, damage) {
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        //this.damage = damage;
        this.eps = 0.01;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps) {
            this.destroy();
            return false;
        }

        // this.update_move();
        //
        // if (this.player.character !== "enemy") {
        //     this.update_attack();
        // }
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        this.render();
    }

    // update_move() {
    //     let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
    //     this.x += this.vx * moved;
    //     this.y += this.vy * moved;
    //     this.move_length -= moved;
    // }
    //
    // update_attack() {
    //     for (let i = 0; i < this.playground.players.length; i ++ ) {
    //         let player = this.playground.players[i];
    //         if (this.player !== player && this.is_collision(player)) {
    //             this.attack(player);
    //             break;
    //         }
    //     }
    // }
    //
    // get_dist(x1, y1, x2, y2) {
    //     let dx = x1 - x2;
    //     let dy = y1 - y2;
    //     return Math.sqrt(dx * dx + dy * dy);
    // }
    //
    // is_collision(player) {
    //     let distance = this.get_dist(this.x, this.y, player.x, player.y);
    //     if (distance < this.radius + player.radius)
    //         return true;
    //     return false;
    // }
    //
    // attack(player) {
    //     let angle = Math.atan2(player.y - this.y, player.x - this.x);
    //     player.is_attacked(angle, this.damage);
    //
    //     if (this.playground.mode === "multi mode") {
    //         this.playground.mps.send_attack(player.uuid, player.x, player.y, angle, this.damage, this.uuid);
    //     }
    //
    //     this.destroy();
    // }

    render() {
        //let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x , this.y , this.radius , 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    // on_destroy() {
    //     let fireballs = this.player.fireballs;
    //     for (let i = 0; i < fireballs.length; i ++ ) {
    //         if (fireballs[i] === this) {
    //             fireballs.splice(i, 1);
    //             break;
    //         }
    //     }
    // }
}
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`
        <div class="ac-game-playground"></div>`);
        //this.hide()

        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        //玩家列表
        this.player = [];
        this.player.push(new player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15,true));
        //开始游戏
        this.start();
    }

    /**
     * playground显示
     */
    show() {
        this.$playground.show();
    }

    /**
     * playground隐藏
     */
    hide() {
        this.$playground.hide();
    }

    /**
     * 来世调用游戏
     */
    start() {

    }

    update() {

    }
}export class AcGame{
    //游戏主操作页面
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#'+id);
        //菜单类
        //this.menu = new AcGameMenu(this);
        //游戏界面类
        this.playground = new AcGamePlayground(this);

        //初始化操作
        this.start();
    }

    start() {

    }
}
