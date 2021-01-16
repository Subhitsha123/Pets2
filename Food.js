class Food{
    constructor(x,y,width,heigth){
        this.foodStock = null;
        this.lastFed = hour();
        this.image = "images/Milk.png";
    }

    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",(data)=>{
            foodStock = data.val();
        })
    }

    updateFoodStock(count){
        database.ref('/').update({
            foodStock: count
        });
    }

    deductFood(){
        
    }

    display(){
       var x = 80,y = 100;

       console.log(this.foodStock);

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodStock!==0){
           console.log("hey");
           for(var i = 0;i<this.foodStock;i++){
               if(i%10===0){
                   x = 80;
                   y = y+50;
               }
               this.image(this.image,x,y,50,50);
               x = x+30;
           }
       }
    }

}