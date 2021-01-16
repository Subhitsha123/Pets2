var dog, happyDog, database, food, foodStock;
var database;
var fedTime, lastFed,foodObj;
var addFood,feed;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,100,100);
  dog.addImage(dogImg);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(660,120);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(765,120);
  addFood.mousePressed(increaseFood);
  
}

function draw() {  

  background(46, 139, 87);

  console.log(food);

  if(food!==undefined){

  if (keyWentDown(UP_ARROW)&&food>=0){
    writeStock(food);
    dog.addImage(happyImg);
    dog.scale = 0.5;
       
  }
}

if (food<=0){
  dog.addImage(dogImg);
    dog.scale = 0.5;
}

  drawSprites();

  textSize(20);
  fill(255);
  text("Food Remaining:"+food,200,50);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+lastFed + "AM",350,30);
  }


  }

function readStock(data){
  food = data.val();

}

function writeStock(x){

  if (x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
  console.log("feed dog worked!");

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function increaseFood(){
  food++;
  database.ref('/').update({
    Food:food
  })
}