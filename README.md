# Weather 360°
## Interactive Frontend Development Project - Code Institute
---

### A live demo is hosted [here](https://romangrubic.github.io/weather-app-openweather/.)
![Weather 360° Demo](https://raw.githubusercontent.com/romangrubic/weather-app-openweather/master/assets/images/responsive.png "Weather 360° Demo")
## Testing
This site was was tested on multiple browsers (Google Chrome, Mozzila Firefox and Opera), multiple mobile devices (Samsung Galaxy, Huawei, Sony) and tablet device(Samsung Galaxy Tab) and it shown 
responsivness and compatibility.

Search bar will only search if user wrote something in it because of `required ` attribute. Furthermore, it will ask the user for a minimum of 2 characters because of the `minlength` attribute. 
In addition, if a user writes incorrect name of the city or city does not exist in the OpenWeather API database, it will show the user the city name that was searched with a text that it is not
 in database and ask him to try again.

All links will open in a new tab using 'target="_blank". All links have been manually tested to ensure that they are pointing to the correct destination.

If you try to submit the contact form with an invalid email address, there will be an error noting the invalid email address. Furthermore, the 'required' attribute is added to the 'name,' 'email,' 
and 'message' fields, so if those fields are not filled in, the form will not submit. If all field are valid, e-mail will be sent and modal will close itself. If an user is interested in contacting me,
 they will have to fill out all fields in order for the form to go through.

Additional manual testing was done to ensure:
* The web-site runs as intended.
* Appropriate notifications show up when the specific conditions are met.
* Gmaps updates correctly when coordinates are pulled from API.
* Modal is working correctly.
* The buttons provided to the user, functioned as intended.


### Validating code
HTML
 - code is validated through [W3 validator](https://validator.w3.org/).

CSS
 - code is validated through [W3 Jigsaw](https://jigsaw.w3.org/css-validator/).

JS
 - code is validated through [JS Hint](https://jshint.com/).


## Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master 
branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named `index.html`.

To run locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/romangrubic/weather-app-openweather.git` into your terminal. To cut ties with this GitHub repository, type `git remote rm origin` into the terminal.  
## Content
+ All content in the website was written by me.
## Media
+ Background photo used in this web-site was obtained from [Pexels](https://www.pexels.com/), a stock image library.
## Acknowledgement
* Big thanks to [W3 Schools](https://www.w3schools.com/) for all the content and clarification of different methods.
* All images are taken from [Pexels.com](https://www.pexels.com/).