function docLoaded(fn){
  if(document.readyState !== 'loading'){
    fn();
  }
  else{
    document.addEventListener('DOMContentLoaded', fn);
  }
}


function calcBatch(){

  	var batchTable = document.getElementById('batch');
  	var table = document.createElement('table');

  	batchTable.appendChild(table);
	for(i = 0; i <= 3; i++){
		var row = document.createElement('tr');
		table.appendChild(row);
		var col1 = document.createElement('td');
		var col2 = document.createElement('td');
		row.appendChild(col1);
		row.appendChild(col2);
		if(i==0){
			var tex1 = document.createTextNode("Antal");
  			var tex2 = document.createTextNode("Vara");
			
		}
		else if (i == 1){
			var tex1 = document.createTextNode("0");
  			var tex2 = document.createTextNode("Hamburgare");

		}
		else if (i == 2){
			var tex1 = document.createTextNode("0");
  			var tex2 = document.createTextNode("Ostburgare");

		}
		else if (i == 3){
			var tex1 = document.createTextNode("0");
  			var tex2 = document.createTextNode("Veganburgare");

		}
		
		col1.appendChild(tex1);
		col2.appendChild(tex2);
  }
  



}

function indexPageLoaded(){
	calcBatch();
}