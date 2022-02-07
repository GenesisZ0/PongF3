
class Tableau1 extends Phaser.Scene{


    preload(){
        this.load.image('square','assets/carre.png');
        this.load.image('circle','assets/cercle.png');


    }

    create(){


        this.hauteur = 800
        this.largeur = 800
        this.speedY = 0
        while(this.speedY===0){
            this.speedY = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500



        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'circle')
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false)


        this.haut = this.physics.add.sprite(0, 0, 'square').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);




        this.gauche = this.physics.add.sprite(0, 0, 'square').setOrigin(0, 0)
        this.gauche.setDisplaySize(20, this.largeur)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true);

        this.droite = this.physics.add.sprite(780, 0, 'square').setOrigin(0, 0)
        this.droite.setDisplaySize(20, this.largeur)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true);



        for (let y = 5; y < 10; y++) {
            for (let x = 2; x < 11; x++) {

                let mabriquedumoment = this.physics.add.sprite(x* 62 , y* 32, 'square').setOrigin(0, 0)
                mabriquedumoment.setDisplaySize(60, 30)
                mabriquedumoment.body.setAllowGravity(false)
                console.log('test')

                mabriquedumoment.body.setAllowGravity(false)
                mabriquedumoment.setImmovable(true)
                this.physics.add.collider(this.balle,mabriquedumoment, function(){
                    mabriquedumoment.destroy(true);
                    this.scoreplayer1 += 1
                });


            }
        }


        this.player1 = this.physics.add.sprite(this.largeur/2, this.hauteur/1.1, 'square')
        this.player1.setDisplaySize(200, 20)
        this.player1.body.setAllowGravity(false)
        this.player1.setImmovable(true)


        let me = this;
        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebond(me.player1)
        })



        this.physics.add.collider(this.balle, this.haut)
        this.physics.add.collider(this.balle, this.gauche)
        this.physics.add.collider(this.balle, this.droite)

        this.balle.setMaxVelocity(1000)

        this.physics.add.collider(this.haut, this.player1)



        this.player1Speed = 0


        if(this.balle< 0)
        {
            this.scoreplayer2 +=1;
            this.textplayer1.setText('Player 1 = ' + this.scoreplayer1);

        }

        if(this.balle> 0)
        {
            this.scoreplayer1  +=1;
            this.textplayer2.setText('Player 2 = ' + this.scoreplayer2);
        }


        this.joueurGauche = new Joueur('J1','joueurGauche')
        this.joueurDroite = new Joueur('J2','joueurDroite')
        console.log(this.joueurGauche)

        this.balleAucentre();
        this.initKeyboard()
    }

    rebond(raquette){

        let hauteurRaquette = raquette.displayWidth;

        let positionRelativeRaquette =(this.balle.x-this.player1.x);

        positionRelativeRaquette = (positionRelativeRaquette/hauteurRaquette);

        positionRelativeRaquette = (positionRelativeRaquette*2-1);

        this.balle.setVelocityX( this.balle.body.velocity.x + positionRelativeRaquette * hauteurRaquette)
    }

    balleAucentre(){
        this.balle.y = this.largeur/2
        this.balle.X = this.hauteur/2
        this.speedX = 0

        this.balle.setVelocityY(Math.random()>0.5?-100:100)
        this.balle.setVelocityX(0)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.y > 800){
            this.balleAucentre()
        }
        if (this.player1.x > 680 ) {
            this.player1.x = 680
        }
        if (this.player1.x < 120 ) {
            this.player1.x = 120
        }

        this.player1.x += this.player1Speed

    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.player1Speed = 5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.player1Speed = -5
                    break;

            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.player1Speed = 0
                    break;

            }
        });
    }
}




