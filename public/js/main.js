$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.modal').modal();
  $('.collapsible').collapsible();

    $.ajax({
      url:'/api/inventory',
      method: 'GET',
      success: function(json) {
        // console.log("HERE IS YOUR INVENTORY DATA", json);
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
