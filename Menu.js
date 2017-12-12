var Technotip = {};
 
Technotip.Menu = function(game){
    var text1;
	var text2;
	var myImage;
};
 
Technotip.Menu.prototype = {
	
	preload: function()
	{
		this.load.image('wallpaper', 'assets/wallpaper.png');
		this.load.image('play', 'assets/play.png');
		
	},	
	create: function()
	{
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		
		wallpaper=game.add.sprite(0,0,'wallpaper');
		wallpaper.width = game.world.width;
		wallpaper.height = game.world.height;
		
		play=game.add.sprite(game.world.width/4.35,game.world.height/5.3,'play');
		
		play.inputEnabled = true;
        play.events.onInputDown.add(function(){this.state.start('Level1');}, this);
    },
};