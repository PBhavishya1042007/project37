class Food
{
    constructor(foodStock,lastFed)
    {
        this.foodS = 0;
        this.lastFed;
       this.image =loadImage("milk.png");
    }
    getfoodStock()
    {
        if(this.foodS>0)
        {
            return this.foodS;
        }
    }
    readgameState()
    {
        readState = database.ref('gameState');
        readState.on("value",function(data){
            gameState=data.val();
        })
    }
    updatefoodStock(foodS)
    {
        this.foodS=foodS;
    }

    updatecurrentTime(currentTime)
    {
        this.lastFed=currentTime;
    }

    display()
    {
        var x=80,y=100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodS!=0)
       {
          for(var i =0;i<this.foodS;i++)
          {
              if(i%10==0)
              {
                  x=80;
                  y=y+50;
              }
            image(this.image,x,y,50,50);
            x=x+30;
          }
       }
       //console.log(this.lastFed);
    }

    bedroom()
    {
        background(bedroom,500,400);
    }
    garden()
    {
        background(garden,500,400);
    }
    washroom()
    {
        background(washroom,500,400);
    }
}