$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.modal').modal();
  // $('input.autocomplete').autocomplete({
  //   data: {
  //     "Nxt 16": null,
  //     "RPM Blast": null,
  //     "Pro Hurricane": 'https://placehold.it/250x250'
  //   },
  // });

    $.ajax({
      url:"/api/inventory",
      method: "GET",
      success: function(json) {
        console.log("HERE IS YOUR DAMN DATA", json);
        var data = {};
        json.inventoryItems.forEach(function(item, idx) {
          data[item.item] = ''
        });
        $('input.autocomplete').autocomplete({
          data,
          limit: 20,
          onAutocomplete: function(val) {

          },
          minLength: 1,
        });
      }
    });

});
