Technotip.Level2 = function(game){};

Technotip.Level2.prototype = 
{
	preload:preload,
	create:create,
	update:update
};

function preload() {

			//  We need this because the assets are on github pages
			//  Remove the next 2 lines if running locally
			//this.load.baseURL = 'https://bpm187.github.io/Super-Mario/';
			//this.load.crossOrigin = 'anonymous';

			this.load.spritesheet('tiles2', 'assets/tiles2.png', 32, 32);
			this.load.spritesheet('goomba', 'assets/Enemy1.png', 32, 32);	
			this.load.spritesheet('goomba2', 'assets/Enemy2.png', 32, 32);
			this.load.spritesheet('enemy', 'assets/Enemy3.png', 32, 32);
			this.load.spritesheet('bonus', 'assets/Bonus.png', 32, 32);
			this.load.spritesheet('life', 'assets/lives.png', 32, 32);
			this.load.spritesheet('mario', 'assets/player2.png', 32, 32);
			this.load.spritesheet('coin', 'assets/Coin.png', 32, 32);
			this.load.spritesheet('musicButton1', 'assets/music.png');
			this.load.spritesheet('musicButton2', 'assets/music2.png');
			this.load.audio('Theme','audio/Song.mp3');
			this.load.audio('Coin','audio/CoinSound.mp3');
			this.load.audio('Bonus','audio/Bonus1.mp3');
			this.load.audio('Life','audio/Life1.mp3');
			this.load.audio('Splash','audio/Splash.mp3');
			this.load.audio('Pipe','audio/PipeSoundEffect.mp3');
			this.load.audio('Death','audio/DeathSoundEffect.mp3');
			this.load.audio('Finish','audio/Outro.mp3');
			this.load.tilemap('level', 'assets/Random.json', null, Phaser.Tilemap.TILED_JSON);
			}

		var text1;
		var scoreT = 0;
		var bonusT = 0;
		var lifeT = 0; 
		var l = true;
		var m = true;

		function create() 
		{
						
			Phaser.Canvas.setImageRenderingCrisp(game.canvas);
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);

			map = game.add.tilemap('level');
			map.addTilesetImage('tiles2', 'tiles2');
			map.setCollisionBetween(0, 615, true, 'solid');
			map.createLayer('background');
			map.createLayer('flag');
			layer = map.createLayer('solid');
			layer.resizeWorld();							

			bgmusic = game.add.audio('Theme');
			bgmusic.loop = true;
			bgmusic.play();
			coinSound = game.add.audio('Coin');
			coinSound.volume = 0.1;
			bonusSound = game.add.audio('Bonus');
			lifeSound = game.add.audio('Life');
			splashSound = game.add.audio('Splash');
			pipeSound = game.add.audio('Pipe');
			deathSound = game.add.audio('Death');
			finishSound = game.add.audio('Finish');		
			
			//add coins
    			coins = game.add.group();
			coins.enableBody = true;
			map.createFromTiles(616, null, 'coin', 'stuff', coins);
			coins.callAll('animations.add', 'animations', 'updown', [0, 1, 2, 1 ], 3, true);
			coins.callAll('animations.play', 'animations', 'updown');

			bonus = game.add.group();
			bonus.enableBody = true;
			map.createFromTiles(617, null, 'bonus', 'stuff', bonus);
			bonus.callAll('animations.add', 'animations', 'updown',
					[ 0, 1, 2 ], 3, true);
			bonus.callAll('animations.play', 'animations', 'updown');	

			life = game.add.group();
			life.enableBody = true;
			map.createFromTiles(618, null, 'life', 'stuff', life);
			life.callAll('animations.add', 'animations', 'rotate',
					[ 0, 1, 2, 3 ], 4, true);
			life.callAll('animations.play', 'animations', 'rotate');	

			goombas = game.add.group();
			goombas.enableBody = true;
			map.createFromTiles(614, null, 'goomba', 'stuff', goombas);
			goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas.callAll('animations.play', 'animations', 'walk');
			goombas.setAll('body.bounce.x', 1);
			goombas.setAll('body.velocity.x', -70);
			goombas.setAll('body.gravity.y', 500);

			goombas2 = game.add.group();
			goombas2.enableBody = true;
			map.createFromTiles(615, null, 'goomba2', 'stuff', goombas2);
			goombas2.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
			goombas2.callAll('animations.play', 'animations', 'walk');
			goombas2.setAll('body.bounce.x', 1);
			goombas2.setAll('body.velocity.x', -120);
			goombas2.setAll('body.gravity.y', 500);

			enemies = game.add.group();
			enemies.enableBody = true;
			map.createFromTiles(619, null, 'enemy', 'stuff', enemies);

			player = game.add.sprite(64, 128, 'mario');
			game.physics.arcade.enable(player);
			player.body.gravity.y = 400;
			player.body.collideWorldBounds = true;
			player.animations.add('walkRight', [ 0, 1, 2, 3, 4 ], 10, true);
			player.animations.add('walkLeft', [ 5, 6, 7, 8, 9], 10, true);
			player.animations.add('end', [15, 16],3,true);
			player.animations.add('pauseR', [0, 17],10,true);
			player.animations.add('pauseL', [5, 17],10,true);
			player.goesRight = true;

			game.camera.follow(player);

			cursors = game.input.keyboard.createCursorKeys();

			scoreT=0; bonusT=0; lifeT=0; l=true;
			text1 = game.add.text(20,20, 'Score: ' + scoreT + '	Bonus: ' + bonusT + '	Life: ' + lifeT,
				{font:"25px",fill:"#44ff44"});
				
			musicButton1 = game.add.sprite(700,20, 'musicButton1');
			musicButton1.fixedToCamera = true;
			
			musicButton2 = game.add.sprite(700,20, 'musicButton2');
			musicButton2.fixedToCamera = true;
			musicButton2.visible=true;
			
			
			musicButton1.inputEnabled = true;
			musicButton1.events.onInputDown.add(function(){
				if(game.sound.mute==true)  {game.sound.mute=false; musicButton2.visible=true;}
				else {game.sound.mute=true;musicButton2.visible=false;}
			}, this);
			
				
			text1.fixedToCamera = true;
			text1.cameraOfset.setTo(20,20);
						
		}

		function update() {
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.collide(goombas2, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
			game.physics.arcade.overlap(player, goombas2, goombaOverlap);
			game.physics.arcade.overlap(player, enemies, enemyOverlap);
			game.physics.arcade.overlap(player, bonus, bonusOverlap);
			game.physics.arcade.overlap(player, life, lifeOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
			allPositions2();

			if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -180;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 180;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 5;
				}

				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -230;
					player.animations.stop();
				}

				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 10;
					else
						player.frame = 12;
				}
			}
		}

	
		function allPositions2()
		{
			if( player.x>2336 && player.x<2400 && player.y<320 && player.y>248)
			{
				pipeSound.play(); 
				player.x=256; player.y=270;
			}
			if( player.x>6048 && player.x<6112 && player.y<348 && player.y>320)
			{
				pipeSound.play(); 
				player.x=4554; player.y=260;
			}
			if( player.x>6048 && player.x<6112 && player.y<160 && player.y>88)
			{
				pipeSound.play(); 
				player.x=6432; player.y=200;
			}

			if( player.x>7744 && player.x<7968 && player.y<416 && player.y>320 && l==true)
			{
				bgmusic.stop(); 
				finishSound.play();
				l=false;
				player.body.enable=false;
				player.animations.play('end');
				game.time.events.add(Phaser.Timer.SECOND * 27, function() 
				{
					game.paused = true;
				});
			}
			if( player.x>3400 && player.x<8000 && player.y<480 && player.y>442 && l==true)
			{
					bgmusic.stop();
					deathSound.play();
					player.frame = 14;
					l=false;
					player.body.enable = false;
					player.animations.stop();
					game.time.events.add(Phaser.Timer.SECOND * 3, function() 
					{
						scoreT=0; bonusT=0; lifeT=0; 
						this.game.state.restart();
					});
			}
		}

		function coinOverlap(player, coin) {
			coinSound.play();
			coin.kill();
			scoreT+=1;
			text1.text = 'Score: ' + scoreT + '	Bonus: ' + bonusT + '	Life: ' + lifeT;
		}

		function bonusOverlap(player, bonus) {
			bonusSound.play();
			bonus.kill();
			bonusT+=1;
			text1.text='Score: ' + scoreT + '	Bonus: ' + bonusT + '	Life: ' + lifeT;
		}

		function lifeOverlap(player, life) {
			lifeSound.play();
			life.kill();
			lifeT+=1;
			text1.text='Score: ' + scoreT + '	Bonus: ' + bonusT + '	Life: ' + lifeT;
		}


		function enemyOverlap(player, enemy)
		{
			player.body.velocity.y = -80;
			if(lifeT > 0 && l==true)
			{
					enemy.frame = 1;
					lifeT--;
					text1.text = 'Score: ' + scoreT + '		Bonus: '+ bonusT +'		Life: ' + lifeT;
					l = false;
					player.body.enable = false;
					if(player.goesRight==true)player.animations.play('pauseR');
					else player.animations.play('pauseL');
					game.time.events.add(Phaser.Timer.SECOND *2, function() {player.body.enable = true;});
					game.time.events.add(Phaser.Timer.SECOND * 3, function() {l=true;});
			}
			else if(lifeT==0 && l==true)
			{

				enemy.frame = 1;
				bgmusic.stop();
				deathSound.play();
				player.frame = 14;

				player.body.enable = false;
				player.animations.stop();
				game.time.events.add(Phaser.Timer.SECOND * 3, function() 
				{
					scoreT=0; bonusT=0; lifeT=0;
					this.game.state.restart();
				});
			}
		}

		function goombaOverlap(player, goomba) {
			if (player.body.touching.down) {
				splashSound.play();
				goomba.animations.stop();
				goomba.frame = 2;
				goomba.body.enable = false;
				player.body.velocity.y = -80;
				game.time.events.add(Phaser.Timer.SECOND, function() {
					goomba.kill();
				});
			} else 
			{
				if(lifeT > 0 && l==true)
				{
					lifeT--;
					text1.text = 'Score: ' + scoreT + '		Bonus: '+ bonusT +'		Life: ' + lifeT;
					l = false;
					player.body.enable = false;
					if(player.goesRight==true)player.animations.play('pauseR');
					else player.animations.play('pauseL');
					game.time.events.add(Phaser.Timer.SECOND *2, function() {player.body.enable = true;});
					game.time.events.add(Phaser.Timer.SECOND * 3, function() {l=true;});
				}
				else if(lifeT==0 && l==true)
				{
					bgmusic.stop();
					deathSound.play();
					player.frame = 14;
					player.body.enable = false;
					player.animations.stop();
					game.time.events.add(Phaser.Timer.SECOND * 3, function() 
					{ 
						scoreT=0; bonusT=0; lifeT=0;
						this.game.state.restart();
					});
				}
			}
		}
