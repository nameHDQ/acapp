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
}