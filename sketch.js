//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
function preload()
{
  //load images here
  dogSad = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,300,20,50);
  dog.scale = 0.3;
  dog.addImage(dogSad);

  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy);
  //foodStock-=1;
}
if(keyWentDown(DOWN_ARROW)){
  writeStock(foodS);
  dog.addImage(dogSad);
  //foodStock-=1;
}
  drawSprites();
  //add styles here
textSize(20);
fill("pink")
text("Food remaining: " + foodS, 150, 150);
}

function readStock(data){
  foodS=data.val();
  console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  database.ref('/').update({
    Food:x
  })
}

