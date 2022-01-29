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
}class AcGame{
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