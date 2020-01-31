## Interactive Frontend Development Project - Code Institute
---
# Weather 360°
Since the beginning of time, humans used to predict weather just by looking into skies. Sometimes they would be right, more often wrong. But, no more! 

Introducing new Weather 360°, web-site that shows weather around the globe! Look for current and future weather for any city on Earth (hope to include Lunar colonies and even Martian colonies 
including Utopia Planitia in near future!). See the cities exact location on a map and even roam the city streets using Pegman in full-screen mode. Just like the simulations!

---
### A live demo is hosted [here](https://romangrubic.github.io/weather-app-openweather/.)
![Weather 360° Demo](https://raw.githubusercontent.com/romangrubic/weather-app-openweather/master/assets/images/responsive.png "Weather 360° Demo")

---
## UX
### Strategy

Weather 360° web-site purpose is to interact with the user and show them local weather in the searched city. It gives the information which is important to the user first, like name and country where the 
city is located(to make sure they are looking at the right city), current temperature, description of weather, local date and time and a map with position on the city coordinates.

### Scope

In designing this page, I wanted for the user to have a positive experience. This website is simple in design, user just 
has to type in a city and everything else will be done for him. 

This is made with collaboration between three different API's ([OpenWeather API](https://openweathermap.org/api), [DarkSky API](https://darksky.net/dev) and [Google maps API](https://cloud.google.com/maps-platform)) and a proxy.
My choice in deciding which API's to use was mainly in their simplicity. I started this project using DarkSky API.
In order to make the DarkSky API to work, I had to use a proxy to bypass CORS problem. I googled how to bypass cors and
found this nice proxy [CORS anywhere](https://cors-anywhere.herokuapp.com/) solution, which is described as an API that enables cross-origin 
requests to anywhere. After that problem, I found out that DarkSky API can only locate a city based on it's
coordinates, which restricted it and made complicated for user to use (it is simpler to type city name instead of latitude and longtitude). 
This is when I found about OpenWeather API. This API uses only city name to search it's database of weather information but 
has restricted access to some information and in order to get same amount of data as in DarkSky API, I would need to pay. So, I faced dilemma about 
which one to use and finally decided to combine this two API's and make them work together in order to give 
the best user experience. I took from OpenWeather API it's capability to sort through database easily just 
by typing city name. Once the user types city name, it feeds DarkSky API with coordinates of the city and in that way 
I can access more information that I thought would be desirable for user to see. Also, in same way OpenWeather API feeds coordinates 
into Google maps API to show the user exact location of the searched city. User can use the Google maps in full-screen mode and also 
can go into StreetView mode but each user has a certain amount of calls to Google maps and once he reaches the limit, 
has to wait for it to reset.

All three API's and a proxy, work together to give the user as best experience and as intuitive design as they can.

### Structure

When the user arrives on site, first thing to see will be calming background photo of sky with
clouds and cornfield. In the same time user will see the name of the website with an input field,
instructing with the placeholder text to write in city name and press enter key. 

Once user enters the city name and press enter,
page will pull data from weather API's and Google map API. The page itself is divided into two sections:
 - First section is showing the user current data for the city (name, country, temperature, summary, local date and time) 
on left side of the section and on the right side of the section, user can see on google maps
the exact position of the city and can interact with it (fullscreen size, StreetView) Furthermore,
a button with text `More data...` positioned above the google maps, on click will hide google maps and
show more data about the local weather (clouds, humidity, pressure, wind speed,sunrise and sunset).
 - Second section is a carousel which is showing the user weather information (date, summary, temperature and rain) 
for next 7 days, one day at a time, in a five second interval between rotations. 
When user hovers with mouse over carousel, it will stop rotating through days as long as 
the mouse is over. Once the user moves mouse it will start rotating again in five second interval.
Same time, user can rotate between the days by clicking on the arrow icons positioned
on the left (previous day) and right (next day) of the carousel.

When the user is finished with viewing data for one city and wish to look for another city, a button `Try a different city` 
positioned above the current city name will bring user back to landing page. 

If user types a city name that is not in database, message will be shown in the middle of the screen that 
`user typed city name` is not in database and will instruct the user to click on the 
`Try a different city` button located in the upper left corner.

Footer is visible on any page and it's opacity lowered to blend with the background but 
still be visible. Icon themselves are clickable and leading to different pages or opening a 
contact modal. 

#### Further description of buttons, icons and elements used is in the next section (Features).

### Skeleton
--- Add wireframes ---

### Surface 
Using only light colors and colors with opacity lowered, a background photo of sky with clouds,
making all the elements stand out correctly and are simple to use, I'm creating a calm and tranquil environment where 
user can relax and is not forced to look at flashy pictures and bright colors. User's experience of Weather 360° is going to be 
positive and it will be a web-site which user will visit in future.

---
## Features
* Search button

  - Show the user instructions on how to search weather for a city. It is `required ` so user can not just press enter and search for empty space and requires 
  minimum of 2 characters to be inputed.

* City not found

  - In case that user has searched for a city that is not in the database, a message will show that the city searched is not in the database and instruction to 
  click on button to try again. It will show the user exact name of the city that was searched beacuse, I set-up a function to do that in JavaScript file so 
  that user can what is wrong (probably a spelling mistake).

* `Try a different city` button

  - Once the user searched for a city and wants to search again for other city, it can be done by pressing `Try a different city` which is positiond in the 
  upper left corner above the name of the city.

* `More data...` button

    - This button is used to toggle between google map showing the location of the searched city and additional statistics about the weather in the searched city 

* Google map

  - Google maps API is used to show the exact location of the searched city in case user want to see it. User can go fullscreen mode and can use StreetView with Pegman.

* Carousel

  - I decided to use interactive Bootstrap element `Carousel` to show the user weather for next days instead of using static HTML `<div>` element.
  Also, it will change the day which is showing by itself after a certain time or user can interact with the icon for `previous` and `next` day.

* Social icons

  - In the footer are three social icons with links, one leading to my GitHub page, one for my LinkedIN profile (both of them open in a new tab because of 
  `target="_blank"` attribute) and last one opens a contact modal from which user can contact me.

* Contact modal

  - When user click on contact icon, it opens a new modal. User has to input all the requested information in order for e-mail to be sent. When the e-mail has been successfully
  sent, the text in the submit button will go from red outline color and `submit` to blue background color with `Message sent! Closing....` text and modal will close itself after 2seconds using `setTimeout` function.
---

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
    
---

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
---

## Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The deployed site will update automatically upon new commits to the master 
branch. In order for the site to deploy correctly on GitHub pages, the landing page must be named `index.html`.

To run locally, you can clone this repository directly into the editor of your choice by pasting `git clone https://github.com/romangrubic/weather-app-openweather.git` into your terminal. To cut ties with this GitHub repository, type `git remote rm origin` into the terminal.  

---
## Content
+ All content in the website was written by me.
---
## Media
+ Background photo used in this web-site was obtained from [Pexels](https://www.pexels.com/), a stock image library.
---
## Acknowledgement
* Big thanks to [W3 Schools](https://www.w3schools.com/) for all the content and clarification of different methods.
* All images are taken from [Pexels.com](https://www.pexels.com/).
* Special thanks to [CORS anywhere](https://cors-anywhere.herokuapp.com/) for my problem with CORS.
