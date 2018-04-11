alert("Home Loaded")

// jquery listeners:
/*
  when someone clicks on profile, make an ajax request to get profile info
  then append it to the current view.


  make a "home" button or whatever and then bring abck the four links.

  */

$.get('/getProfile').then(yay => console.log(yay));
