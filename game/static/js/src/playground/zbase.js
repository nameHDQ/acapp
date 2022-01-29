class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`
        <div>游戏界面</div>`);
        this.hide()
        this.root.$ac_game.append(this.$playground);

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