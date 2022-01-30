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
}