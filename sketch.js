var dog, happyDog;
var database;
var food,foodStock;
var lastFed;
var foodS;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(800,250,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}

function draw() {  

  background(46, 139, 87);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+lastFed + "AM",350,30);
  }

  drawSprites();

  }

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  
}

function feedDog(){
  dog.addImage(happyImg);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}