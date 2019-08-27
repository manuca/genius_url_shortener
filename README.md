# README

Visit: https://genius-shortener.herokuapp.com/

![Screenshot](https://raw.githubusercontent.com/manuca/genius_url_shortener/master/screenshot_1.png)

To follow redirection stats check:

[https://genius-shortener.herokuapp.com/visits](https://genius-shortener.herokuapp.com/visits)

## What went well?

The app was developed in time.

## What didn't go well?

* Not much but I had to deal with some very small deprecation errors in Rails since this
  is my first project on Rails 6.

## If you had more time to work on this,
  * Use a more elegant state handling library like Redux (although maybe
    overkill, not 100% sure)
  * Add proper specs for the features implemented
  * Put stats inside an authenticated environment
  * Use smarter input handling so that user specifies http or
    https only if he wants to be specific
  * Pagination, we'll need pagination to display all those visits (Pagy,
    Haminari, etc)

Optional features

* [ ] Geo tracking
* [ ] Stats by redirections (we're already storing the data for this)
* [ ] Do some benchmarks to measure performance
