netlify link:https://weatherappanu.netlify.app/
 Note: please allow access of your location to browser get the weather report.
steps: 
step1: download the zipped file
step 2: extract and arrange the folders
step3: make a folder src and shift assets,components,pages,App.js,App.test,index.css,index.js and setup Tests.js to src folder.
step4:open the project in vs code
step5: install node modules using command npm i
step 6: npm start to start the development server.

description:
This weather app is developed using React JS and tailwind CSS 
major Functionality:
1. on initial load shows the weather report of the current location of the user.
2. on search of any city, shows the weather report of searched city
3. last three searched cities are stored in the local storage and report of those cities can be accessed through the city dropdown
4. weather report of the current location of the user can be accessed any time by clicking on the current location button.
5. temperature conversion of report (from deg C to deg F) can be achieved by clicking on the toggle button
6. 5 day weather report is achieved with the first day report as the current day report followed by next four day report
7. general weather conditions are also achieved
8. loading state is used to to show the msgs while data is being fetched

 
 For fetching the weather report of the current location and searched city open-mateo.com is used and to fetch the name of the city nominatim.openstreetmap.org is used. 


