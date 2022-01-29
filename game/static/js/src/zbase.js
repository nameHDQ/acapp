class AcGame{
    //游戏主操作页面
    constructor(id) {
        this.id = id;
        this.$ac_game = $('#'+id);
        //菜单类
        this.menu = new AcGameMenu(this);
        //游戏界面类
        this.playground = new AcGamePlayground(this);

        //初始化操作
        this.start();
    }

    start() {

    }
}