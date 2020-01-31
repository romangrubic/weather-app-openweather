# Weather 360°
## Interactive Frontend Development Project - Code Institute
---
## Weather 360°
Since the beginning of time, humans used to predict weather just by looking into skies. Sometimes they would be right, more often wrong. But, no more! 

Introducing new Weather 360°, website that shows weather around the globe! Look for current and future weather for any city on Earth (hope to include Lunar colonies and even Martian colonies 
including Utopia Planitia in near future!). See the cities exact location on a map and even roam the city streets using Pegman in full-screen mode. Just like the simulations!

### A live demo is hosted [here](https://romangrubic.github.io/weather-app-openweather/.)
![Weather 360° Demo](https://raw.githubusercontent.com/romangrubic/weather-app-openweather/master/assets/images/responsive.png "Weather 360° Demo")

## UX
---- Implenemt UX ----

## Features
* Search button

  - Show the user instructions on how to search weather for a city. It is `required ` so user can not just press enter and search for empty space and requires 
  minimum of 2 characters to be inputed.

* City not found

  - In case that user has searched for a city that is not in the database, a message will show that the city searched is not in the database and instruction to 
  click on button to try again. It will show the user exact name of the city that was searched beacuse, I set-up a function to do that in JavaScript file so 
  that user can what is wrong (probably a spelling mistake).

* Reset button

  - Once the user searched for a city and wants to search again for other city, it can be done by pressing `Try a different city` which is positiond in the 
  upper left corner above the name of the city.

* `More data...` button

    - This button is used to toggle between google map showing the location of the searched city and additional statistics about the weather in the searched city 

* Google map

  - Google maps API is used to show the exact location of the searched city in case user want to see it. User can go fullscreen mode and can use StreetView with Pegman.

* `Future weather` carousel

  - I decided to use interactive Bootstrap element `Carousel` to show the user weather for next days instead of using static HTML `<div>` element.
  Also, it will change the day which is showing by itself after a certain time or user can interact with the icon for `previous` and `next` day.

* Social icons

  - In the footer are three social icons with links, one leading to my GitHub page, one for my LinkedIN profile (both of them open in a new tab because of 
  `target="_blank"` attribute) and last one opens a contact modal from which user can contact me.

* Contact modal

  - When user click on contact icon, it opens a new modal. User has to input all the requested information in order for e-mail to be sent. When the e-mail has been successfully
  sent, the text in the submit button will go from red outline color and `submit` to blue background color with `Message sent! Closing....` text and modal will close itself after 2seconds using `setTimeout` function.


## Technologies used

* HTML5 & CCS3: Essential languages used to build a websites foundations.
* Bootstrap: An easy to use, responsive framework. Bootstrap was used to allow easy implementation of the overall responsivness and contact modal. Bootstrap's 
grid system was also used for simplicity and efficiency.

    - https://getbootstrap.com/
* Font Awesome: A vast and free library of responsive icons. This library was used for the social link icons found in the footer.

    - https://fontawesome.com/
* Google fonts: Library of fonts. This library was used for the font across the page.

    - https://fonts.google.com/
* JavaScript and jQuery: These technologies were essential for the function of the web-site (interactivity with the user), and to allow Bootstap to display/hide buttons, map and modal.

    - https://jquery.com/
* EmailJS: Service that helps sending emails using client side technologies only. It only requires to connect EmailJS to one of the supported email services, 
create an email template, and use their Javascript library to trigger an email. This was used for contact modal so that user's can get in contact with me. 

    - https://www.emailjs.com/
* OpenWeather API: Free (up to a certain point) weather API that has current weather for any geolocation in the world. It is used in this website as main API 
because you need only city name in order to pull data from it.

    - https://openweathermap.org/api
* DarkSky API: Free weather API similar to Openweather but main difference is that it uses coordinates to pull data. It is used to present weather for future 
days(the same option on OpenWeather has to be purchased) and is using coordinates pulled from OpenWeather API to pull data for searched city.

    - https://darksky.net/dev
* Google maps API: Maps API is used to show the location of the searched city if a user don't know it geographical location, user can open Gmaps fullscreen 
and use the Street View and drag Pegman to look around. I have set the limit of calls that can be used per user.
    - https://cloud.google.com/maps-platform


## Testing
This site was was tested on multiple browsers (Google Chrome, Mozzila Firefox and Opera), multiple mobile devices (Samsung Galaxy, Huawei, Sony) and tablet device(Samsung Galaxy Tab) and it shown 
responsivness and compatibility.

Search bar will only search if user wrote something in it because of `required ` attribute. Furthermore, it will ask the user for a minimum of 2 characters because of the `minlength` attribute. 
In addition, if a user writes incorrect name of the city or city does not exist in the OpenWeather API database, it will show the user the city name that was searched with a text that it is not
 in database and ask him to try again.

All links will open in a new tab using `target="_blank"`. All links have been manually tested to ensure that they are pointing to the correct destination.

If you try to submit the contact form with an invalid email address, there will be an error noting the invalid email address. Furthermore, the `required` attribute is added to the 'name,' 'email,' 
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