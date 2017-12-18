var Technotip = {};
 
Technotip.Menu = function(game){};
 
Technotip.Menu.prototype = {
	
	preload: function()
	{
		this.load.image('wallpaper', 'assets/wallpaper.png');
		this.load.image('level1', 'assets/level1.png');
		this.load.image('level2', 'assets/level2.png');
		
	},	
	create: function()
	{
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		
		wallpaper=game.add.sprite(0,0,'wallpaper');
		wallpaper.width = game.world.width;
		wallpaper.height = game.world.height;
		
		level1btn=game.add.sprite(game.world.width/3.8,game.world.height/6.15,'level1');
		level2btn=game.add.sprite(game.world.width/3.8,game.world.height/4.15,'level2');
		
		level1btn.inputEnabled = true;
        level1btn.events.onInputDown.add(function(){this.state.start('Level1');}, this);
		
		level2btn.inputEnabled = true;
        level2btn.events.onInputDown.add(function(){this.state.start('Level2');}, this);
    },
};
