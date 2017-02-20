function docLoaded(fn){
  if(document.readyState !== 'loading'){
    fn();
  }
  else{
    document.addEventListener('DOMContentLoaded', fn);
  }
}


function drinkTable() {
    for (var i = 0; i < drinks.length; i++){

    if((i % 2) == 0){
      var tr = document.createElement('tr');
      document.getElementById('tableDrink').appendChild(tr);
    }

    var td = document.createElement('td');
    td.id = drinks[i].label;
    td.value = drinks[i].price;

    var label = document.createElement('label');
    label.htmlfor = drinks[i].label;

    var button = document.createElement('input');
    button.type = "submit";
    button.value = drinks[i].label + ", " + drinks[i].size + "cl, " + drinks[i].price + ":-";
    button.name = drinks[i].label;

    button.addEventListener("click", createAddToList( td ) );
    button.style.height="4em";
    button.style.width="20em";
    button.style.textAlign="center";


    label.appendChild(button);
    td.appendChild(label);
    tr.appendChild(td);
  }
}


function foodTable(){
  for(var i = 0; i < foods.length; i++){

    if((i % 3) == 0){
      var tr = document.createElement('tr');
      document.getElementById('tableFood').appendChild(tr);
    }
      
    var importedImage = foods[i].img;
    var image = document.createElement("img");
    image.setAttribute("src", importedImage);
    image.style.height = '15em';
    image.style.width = '15em';

    var td = document.createElement('td');
    td.id = foods[i].label;
    td.value = foods[i].price;

    var label = document.createElement('label');
    label.htmlfor = foods[i].label;

    var button = document.createElement('input');
    button.type = "submit";
    button.value = foods[i].label + ", " + foods[i].price + ":-";
    button.name = foods[i].label;
    button.addEventListener("click", createAddToList( td ) );

    label.appendChild(image);
    var br = document.createElement("br");
    td.appendChild(br);
    label.appendChild(button);
    td.appendChild(label);


    if(foods[i].details.length > 0){
      var details = document.createElement('table');

      for(var j = 0; j < foods[i].details.length; j++){
        if( (j % 2) == 0){
          var trDetails = document.createElement('tr');
          details.appendChild(trDetails);
        }

        var tdDetails = document.createElement('td');
        var labelDetails = document.createElement('label');
        labelDetails.htmlfor = foods[i].details[j].extra;

        var checkboxDetails = document.createElement('input');
        checkboxDetails.type = "checkbox";
        checkboxDetails.value = foods[i].details[j].extra;
        checkboxDetails.name = (foods[i].label + "extra");


        labelDetails.appendChild(checkboxDetails);
        labelDetails.appendChild( document.createTextNode( foods[i].details[j].extra + ", " + foods[i].details[j].price + ":-" ) );

        tdDetails.appendChild(labelDetails);
        trDetails.appendChild(tdDetails);
      }
    }

    /*if(foods[i].details.length > 0){
      var details = document.createElement('ul');

      for(var j = 0; j < foods[i].details.length; j++){

        var liDetails = document.createElement('li');
        var labelDetails = document.createElement('label');
        labelDetails.htmlfor = foods[i].details[j].extra;

        var checkboxDetails = document.createElement('input');
        checkboxDetails.type = "checkbox";
        checkboxDetails.value = foods[i].details[j].extra;
        checkboxDetails.name = (foods[i].label + "extra");

        labelDetails.appendChild(checkboxDetails);
        labelDetails.appendChild( document.createTextNode( foods[i].details[j].extra + ", " + foods[i].details[j].price + ":-" ) );

        liDetails.appendChild(labelDetails);
        details.appendChild(liDetails);
      }
    }*/

    td.appendChild(details);
    tr.appendChild(td);
  }
}



function sideorderTable(){
  for(var i = 0; i < sideorders.length; i++){

    if((i % 3) == 0){
      var tr = document.createElement('tr');
      document.getElementById('sideorderTable').appendChild(tr);
    }

    var td = document.createElement('td');
    td.id = sideorders[i].label;
    td.value = sideorders[i].price;
    
    var label = document.createElement('label');
    label.htmlfor = sideorders[i].label;

    var button = document.createElement('input');
    button.type = "submit";
    button.value = button.value = sideorders[i].label + ", " + sideorders[i].price + ":-";
    button.name = "item[]";
    button.addEventListener("click", createAddToList( td ) );


    label.appendChild(button);
    td.appendChild(label);


    if(sideorders[i].details.length > 0){
      var extraList = document.createElement('table');

      for(var j = 0; j < sideorders[i].details.length; j++){
        if( (j % 2) == 0){
          var trDetails = document.createElement('tr');
          extraList.appendChild(trDetails);
        }

        var tdDetails = document.createElement('td');
        var labelDetails = document.createElement('label');
        labelDetails.htmlfor = sideorders[i].details[j].extra;

        var checkboxDetails = document.createElement('input');
        checkboxDetails.type = "checkbox";
        checkboxDetails.value = sideorders[i].details[j].extra;
        checkboxDetails.name = (sideorders[i].label + "extra");


        labelDetails.appendChild(checkboxDetails);
        labelDetails.appendChild( document.createTextNode( sideorders[i].details[j].extra + ", " + sideorders[i].details[j].price + ":-" ) );

        tdDetails.appendChild(labelDetails);
        trDetails.appendChild(tdDetails);

      }
    }

    td.appendChild(extraList);
    tr.appendChild(td);
  }
}


function createAddToList(name){
  return function(){
    addToList(name);
  }
}


function checkedCheckboxes(name){
  var allCheckboxes = document.getElementsByName(name);
  var checked = [];
  for (var i=0; i<allCheckboxes.length; i++) {
     if (allCheckboxes[i].checked) {
        checked.push(allCheckboxes[i]);
     }
  }

  return checked;
}


function addToList(name){

  var table = document.getElementById("orderTable");

  /* console.log("Name: " + name.id + " - Price: " + name.value);     /* DEBUGGING PURPOSES*/

  /* TODO - CREATE FUNCTION FOR FINDING IDENTICAL ORDERS WITH EXTRA DETAILS ADDED */
  var checkboxes = checkedCheckboxes(name.id + "extra");
  for (var i = 0, row; row = table.rows[i]; i++) {

      if(row.cells.item(1) != null){
        /* console.log(name.id + " - EQUALS - " + row.cells.item(1).innerHTML);     /* DEBUGGING PURPOSES*/
      } 

      if( (name.id == row.cells.item(1).innerHTML) && checkboxes.length == 0 ){

        row.cells.item(0).innerHTML++;

        /* console.log(row.cells.item(2).innerHTML);     /* DEBUGGING PURPOSES*/
        var price = Number(row.cells.item(2).innerHTML);

        price += Number(name.value);
        row.cells.item(2).innerHTML = price;

        var totalPrice = document.getElementById('totalPrice');
        var totPrice = Number(totalPrice.innerHTML);
        totPrice += Number(name.value);
        totalPrice.innerHTML = totPrice;
        return 0;
      }
    }

  var totalPrice = document.getElementById('totalPrice');
  var totPrice = Number(totalPrice.innerHTML);
  totPrice += Number(name.value);
  totalPrice.innerHTML = totPrice;

  var tr = document.createElement('tr');

  var td = document.createElement('td');
  td.appendChild( document.createTextNode( 1 ) );
  tr.appendChild(td);

  td = document.createElement('td');
  td.appendChild( document.createTextNode( name.id ) );


  var orders = document.getElementById('currentOrders');

  if(checkboxes.length > 0){
    var ul = document.createElement('ul');
    for (var i=0; i<checkboxes.length; i++) {
      if (checkboxes[i].checked) {
      var li = document.createElement('li');
      li.appendChild( document.createTextNode(checkboxes[i].value) );
      checkboxes[i].checked = false;
      ul.appendChild(li);
      }
    }
  td.appendChild(ul);
  }
  else{

  }
  tr.appendChild(td);

  td = document.createElement('td');
  td.appendChild( document.createTextNode( name.value ) );
  tr.appendChild(td);


  tr.appendChild(td);
  var element = document.getElementById('orderTable');
  element.appendChild(tr);
  
}


function indexPageLoaded(){
  drinkTable(); 
  foodTable();
  sideorderTable();
}

