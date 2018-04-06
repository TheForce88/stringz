#Stringz
Stringz is an Nodejs/express/MongoDB app created to help stringing teams manage inventory and scheduling.

##Planning Deliverables:
*[ERD](https://www.draw.io/#G1Mco6PszQoTaRwokO6yBLzstdqDkqMpM6)
*[Wireframes](https://www.canva.com/design/DAC0KRaGYFg/X3hYEKdMtXNhchlPCLBkow/edit?category=tACFat6uXco)

##User Stories:
###Individual Employee
*A user can login or sign up for the app
*A user can navigate to their profile page, inventory page (what’s in stock?), racquet page (lists strung racquets), or the employee schedule page [STRETCH]

####Profile Page:
*A user can see which days they’re scheduled to work, the number of racquets they’ve strung this week, and their employee status (i.e. Stringer, Court Reservation Staff, or Administrator)
*A user can click on the “Shelf” option to see how many racquets need to be strung that day
*[STRETCH] Later we will incorporate functionality that allows a Court Res employee to enter information about racquets “On the Shelf”
*[STRETCH] Form with Dropdown Selection
*[STRETCH] If a Court Res employee tries to assign inventory to a racquet that is out of stock, they will not be able to submit the form and they will be notified that the string is not in stock
*[STRETCH] If a Court Res employee tries to assign inventory to a racquet that does not exist, they will not be able to submit the form and they will be prompted to select an existing string
*A user can click on the “Recently Strung” option to see racquets they’ve strung in the last week
Racquets Page:
*A user can view specs on racquets strung over the last week, month, or year
####Inventory Page:
*A user can view inventory specs
[STRETCH] Schedule Page:
(Calendar view) a user can view which days each employee is scheduled to work

###Admin
*An admin can do everything a user can do, but also has the ability to EDIT the work schedule
