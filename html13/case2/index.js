"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Hector Solis
   Date:   04/18/2021
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/

window.onload = function(){

   var changingCells = document.forms.expReport.getElementsByClassName("sum");
   
   for(var i=0; i < changingCells.length; i++){
      changingCells[i].onchange = calcExp;
   }
   
   document.getElementById("submitButton").onclick = validateSummary();
}

function validateSummary(){

   var x = document.forms["expReport"]["summary"].oninvalid = function(e) {
      e.target.setCustomValidity("You must include a summary of the trip in your report.");
   }
}

function calcClass(sumClass){
   var sumFields = document.getElementsByClassName(sumClass);
   var sumTotal = 0;
   for(var i=0; i < sumFields.length; i++){
      var itemValue = parseFloat(sumFields[i].value);
      if (!isNaN(itemValue)){
         sumTotal += itemValue;
      }
   }
   
   return sumTotal;
}


function calcExp(){

   var expTable = document.querySelectorAll("#travelExp > tbody > tr");

   for (var i=0; i < expTable.length; i++){
      document.forms["expReport"]["subtotal"+i].value = formatNumber(calcClass("date"+i), 2);
   }

   document.forms["expReport"]["transTotal"].value = formatNumber(calcClass("trans"), 2);
   document.forms["expReport"]["lodgeTotal"].value = formatNumber(calcClass("lodge"), 2);
   document.forms["expReport"]["mealTotal"].value = formatNumber(calcClass("meal"), 2);
   document.forms["expReport"]["otherTotal"].value = formatNumber(calcClass("other"), 2);
   document.forms["expReport"]["expTotal"].value = formatUSCurrency(calcClass("sum"), 2);
}




function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}