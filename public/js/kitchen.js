/* global sharedVueStuff, Vue, socket */
'use strict';
function docLoaded(fn){
  if(document.readyState !== 'loading'){
	fn();
  }
  else{
	document.addEventListener('DOMContentLoaded', fn);
  }
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
        dest.appendChild(img);
    }
    
}

new Vue({
  el: '#orders',
  mixins: [sharedVueStuff], // include stuff that goes to both diner and kitchen
  methods: {
    markDone: function(orderid) {
      this.orders[orderid].done = true;
      socket.emit("orderDone", orderid);
    }
  }
});

function indexPageLoaded(){
 
	show_layout('pub_map_v1.jpg', 1);
}