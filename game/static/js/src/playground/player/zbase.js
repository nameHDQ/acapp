class player extends AcGameObject{
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
}