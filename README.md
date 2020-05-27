# Box Office Data Compiler for STX Entertainment

![Example 1](./demo.gif)

===================

## Description

Full-Stack application developed for STX Entertainment to help their advertising team compile box office data programmatically through the [Opus API](https://www.opusdata.com/). Unfortunately, the client did not adopt the application due to the emergence of [IMDbPro](https://pro.imdb.com/signup/index.html?rf=google_brand_us_187248834&ref_google_brand_us_187248834&gclid=Cj0KCQjw-_j1BRDkARIsAJcfmTHsItQNaoOife3lt70a-MADUkm_F-EvpWhLADVXoCp2vexDvBDNPsYaAqnrEALw_wcB) which included similar features at a lower cost than competitive data providers. 

## Functionality

The client was able to query and filter the data by movie title, weekend or genre. Advanced filters included looking for movies above a certain level of revenue broken out by day, week or weekends only. In addition, subgenre filters and data range selectors were also available in the UI. 

The application is no longer active due to expiration of the Opus API's Token trial period. However, pleae find the deployed application [HERE](http://stx-box-office.herokuapp.com) to review CSS and HTML structure if desired. 

## Process

We began by researching different movie database APIs - ranging from Fandango, to IMDB's, to boxofficemojo.com's data feed. Every API that we encountered did not give us daily box office information until we found OpusData. 

We contacted OpusData, and they gave us sample files that showed box office numbers by day, week, and genre. This was excellent news, however, we did not realize how difficult it would be to make API calls to their server.

After about a week of trying to make AJAX calls, our instructors referred us to [node.js](https://nodejs.org/en/) which was still foreign to our student cohort at the time. Once we learned node.js in less than a week, we modified the response and sent data back and forth between our frontend and backend to meet our delivery deadline. 

## Credits

Our UCLA Extension instructor, Omar Patel, helped us integrate node.js and heroku deployment. OpusData.com supplied the response data.

## Dependencies 

1. Express
2. Loadash
3. Node
4. OpusData Token

## License

MIT License

Copyright (c) [2019] [Hannah Folk, Eduardo Urbaez, Marie Gilbert]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. THE APPLICATION WAS USED FOR EDUCATIONAL PURPOSES ONLY AND WAS NOT ADOPTED BY ANY CLIENTS OR THIRD PARTIES AT THE TIME OF COMPLETION. 
