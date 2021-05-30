"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Case Problem 2

   Author: Hector Solis
   Date:   04/04/2021   

   Filename: sub_cart.js


   Functions List:
   setupCart() 
      Sets up the event handlers for the Add to Order buttons on the web page.
      
   addItem(e)
      Adds the food item associated with the Add to Order button to the shopping
      cart, keeping track of the number of items of each product ordered by 
      the customer.

*/

window.addEventListener("load", setupCart);

function setupCart(){
   // define the event handlers fo the Add to Order buttons on the page.
   var addButtons = document.getElementsByClassName("addButton");

   for(var i=0; i < addButtons.length; i++){
      addButtons[i].addEventListener("click", addItem);
   }
}


function addItem(){
   // adds items to the shopping cart on the page.
   var foodItem = event.target.nextElementSibling;
   var foodID = foodItem.getAttribute("id");
   var foodDescription = foodItem.cloneNode(true);
   var cartBox = document.getElementById("cart");
   var duplicateOrder = false;

   for(var i=0; i < cartBox.childNodes.length; i++){
      
      if (foodID == cartBox.childNodes[i].id){
         cartBox.childNodes[i].firstChild.value += 1;
         cartBox.childNodes[i].firstChild.innerHTML = cartBox.childNodes[i].firstChild.value;
         duplicateOrder = true;
         break;
      }
   }

   if (duplicateOrder == false){
      var orderCount = document.createElement("span");
      orderCount.textContent = 1;
      orderCount.value = 1;
      foodDescription.prepend(orderCount);
      cartBox.append(foodDescription);
   }

   
}