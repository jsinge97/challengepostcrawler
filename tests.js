var hack, hackers; // stuff we need
var data = { hack: "", hackers : ""}; // set up an object to hold the key values


$('.software-entry-name entry-body').filter(function(){ // look for the class that holds chal


  var scraped = $(this);

  hack = scraped.children('h4').first().text();


  data.hack = hack;
}
