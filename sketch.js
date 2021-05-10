//Create variables here
var dog,happydog,hungrydog,database,foodS,foodStockRef,database;
var frameCountNow = 0;
var fedTime,lastFed,foodObj;
var milk,input,name;
var gameState = "hungry";
var gameStateRef;
var bedroom,garden,washroom,sleeping,running;
var feed,addFood;
var input,button;
var currentTime;
var changingGameState,readingGameState;

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  happydog = loadImage("Happy.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");
  sleeping = loadImage("Lazy.png");
  livingroom = loadImage("Living Room.png");
  running = loadImage("running.png");
}

function setup() {
  createCanvas(600,800);

  database = firebase.database();
  //console.log(database);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(500,400);
  dog.addImage(dogImage);
  dog.scale=0.3;

  feed =createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedPet);

  add_Food=createButton("Add Food");
  add_Food.position(800,95);
  add_Food.mousePressed(addFood);

  
    readingGameState = database.ref('gameState');
    readingGameState.on("value",(data)=>{gameState=data.val()});

    database.ref('FeedTime').on("value",(data)=>{lastFed=data.val()});

  foodObj = new Food();

  // console.log(hour());

}


function draw() { 
  background("green");

  

  if(gameState !== "Hungry")
  {
    feed.hide();
    add_Food.hide();
    dog.remove();
  }
  else
  {
    feed.show();
    add_Food.show();
    dog.addImage(dogImage);
  }

  currentTime = hour();

  if(currentTime === lastFed+1)
  {
    gameState = "Playing";
    updateGameState("Playing");
    foodObj.garden();
  }
  else if(currentTime === lastFed+2)
  {
    gameState = "Sleeping";
    updateGameState("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > lastFed+2 && currentTime<=lastFed+4)
  {
    gameState = "Bathing";
    updateGameState("Bathing");
    foodObj.washroom();
  }
  else
  {
    gameState = "Hungry";
    updateGameState("Hungry");
    foodObj.display();
  }

  fill("red");
  strokeWeight(4);
  stroke("yellow");
  textSize(25);
  
  if(lastFed>=12)
  {
    text("Lastfed: "+lastFed%12 + " PM",300,30);
  }
  else if(lastFed === 0)
  {
    text("LastFed: 12 AM",350,30);
  }
  else
  {
    text("LastFed: "+lastFed+" AM",300,30);
  }
  foodObj.display();

  console.log(lastFed);

  drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updatefoodStock(foodS);
}

function feedPet()
{
    dog.addImage(happydog);
    
    foodObj.updatefoodStock(foodObj.getfoodStock()-1);
    database.ref('/').update({
    Food : foodObj.getfoodStock(),
    FeedTime : hour(),
    gameState:"Hungry"
    })
}

function  addFood()
{
    foodS++;
    database.ref('/').update({
    Food : foodS
    })
}

function updateGameState(state)
{
  database.ref('/').update({
    gameState: state
  })
}

// async function hour()
// {
//   var site = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
//   var siteJSON = await site.json();
//   var datetime = siteJSON.datetime;
//   var hourTime = datetime.slice(11,13);
//   return hourTime;
// }