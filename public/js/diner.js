/* global sharedVueStuff, Vue, socket */
'use strict';

function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
}

function getOrderNumber() {
		// It's probably not a good idea to generate a random order number, client-side. 
		// A better idea would be to let the server decide.
		return "#" + getRandomInt(1, 1000000);
}

function show_layout(src, id) {
    var img;
    var dest = document.getElementById("layout");
    
    if(img = document.getElementById("imgId")) {
        if(img.value == id)
            dest.removeChild(img);
        else {
            img.src = src;
            img.value = id;
        }
        
    }
    else {
        img = document.createElement("img");
        img.src = src;
        img.id = "imgId";
        img.value = id;
        img.width = 520;
        img.height = 520;
        dest.appendChild(img);
    }
    
}

new Vue({
    el: '#ordering',
    mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
    data: {
        selected: 0,
        options: [
            { text: 'Välj bord här', value: 0},
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            { text: '3', value: 3 },
            { text: '4', value: 4 },
            { text: '5', value: 5 },
            { text: '6', value: 6 },
            { text: '7', value: 7 },
            { text: '8', value: 8 },
            { text: '9', value: 9 },
            { text: '10', value: 10 },
            { text: '11', value: 11 },
            { text: '12', value: 12 },
            { text: '13', value: 13 },
            { text: '14', value: 14 }
        ],
        mainDish: [],
        extras: []
    },
    methods: {
        placeOrder: function() {
            // Here two ways of getting selected items are illustrated
            // 1. The Vue way, notice the data model declarations above
            var mainCourse = this.mainDish;
            var extras = this.extras;
            // 2. The old-school way: create an array with values of checked items
            var theRest = [].filter.call(document.getElementsByName('item[]'), function(i) {
                return i.checked;
            }).map(function(i) {
                return i.value;
            });

						// THIS IS FOR DROPDOWN SELECT
            // var tablelist = document.getElementById('tableId');
            // var tablenr = 0;
            // for (var j = 0; j < tablelist.length; j++) {
            //     if(tablelist.options[j].selected) {
            //         var tablenr = tablelist.options[j].value; 
            //     }
            // }

						// THIS IS FOR RADIOBUTTONS
						var tablenr = 0;
						var radios = document.getElementsByName('table');
						for (var i = 0, length = radios.length; i < length; i++) {
								if (radios[i].checked) {
										tablenr = radios[i].value;
										break;
								}
						}

						var orderItems = mainCourse.concat(extras).concat(theRest);

						// get the table
						var ot = document.getElementById('orderTable');
						var nrRows = ot.rows.length;

						for(var i = 1; i < nrRows - 1; i++) {
								// append relevant info from table rows.
								orderItems = orderItems.concat(ot.rows[1].cells[0].innerHTML
																							 + ' st '
																							 + ot.rows[1].cells[1].innerHTML);

								// add extra information
								var list = ot.rows[1].cells[2].getElementsByTagName('li')
								var str = '';
								if( list.length > 0 ) {
										
										str += 'Extra: ';
										for(var j = 0; j < list.length; j++) {
												str +=  ' ' + list[j].id;
										}
										
								}
								orderItems = orderItems.concat(str + ' ||| ');
								ot.rows[1].remove();
						}

						var dt = document.getElementById('orderDrink');
						nrRows = dt.rows.length;

						for(var i = 1; i < nrRows -1; i++) {
								dt.rows[1].remove();
						}

						var foodOrdered = document.getElementById('totalPrice').innerHTML;
						
						// reset all 'Total:' fields in table
						document.getElementById('totalPrice').innerHTML = 0;
						document.getElementById('totalDrink').innerHTML = 0;
						document.getElementById('totaltotal').innerHTML = 0;
						
            // OK, it's not really neat to use two different ways of accomplishing the same thing
            // but let's pretend it's for an educational purpose ... here comes another no-no:
            
            if(tablenr != 0)
                orderItems = orderItems.concat('Table: '+tablenr);
            
            // Finally we make use of socket.io's magic to send the stuff to the kitchen
						if(foodOrdered > 0) {
								socket.emit('order', {orderId: getOrderNumber(), orderItems: orderItems});
						}
						
        }
    }
});


