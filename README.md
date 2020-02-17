# Train-Scheduler
Keeps track of train schedules

This train scheduler allows users to input a train name, start time, and frequency in order to keep track of when the next train will arrive and how far away it is. Input from the user is sent to firebase as an object, then retrieved when the page is loaded. In order to work with the time, an additiona library - "Moment JS" - was used in the completion of the project.

Originally, users were able to input any string into the "Start Time" form, which would result in an error being displayed in the table. To combat this, regular expressions are used to validate the user input and will only allow access to the Firebase database if the "HH:mm" format is followed as listed. 
