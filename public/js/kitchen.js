/* global sharedVueStuff, Vue, socket */
'use strict';

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
        img.width = 600;
        img.height = 600;
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