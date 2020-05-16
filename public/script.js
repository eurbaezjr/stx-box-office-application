$(document).ready(function() {

    
    // ================== CREATE VARIABLES ================== //

    // ================== Variables for INDEX.HTML ================== //
    var movieInput = ""; // User-inputted movie title
    var boxFrequency = ""; // If user decides to search by time period
    var movieDateRange = ""; // User-inputted date range for time period
    var movieStartDate = ""; // Start date grabbed from date range
    var movieEndDate = ""; // End date grabbed from date range
    var whichMovieName;

    // ================== Variables for WEEKEND.HTML ================== //
    // var numYearsInput = 1; // How many years back the user wants to look for a given week in the year
    var weekRevInput = 0; // The minimum amount of revenue in movies returned to the user
    // var week = ""; // To store which week in the year the user is looking at, so we can look back 5, 10 years in the past
    // var dayOfWeek = ""; // To store which day of the week they chose, aka Thurs, Fri, Sat, Sun
    var weekendRange =""; // Range selected by the user for weekend
    var weekendStartDate = ""; // Start date for the weekend selected
    var weekendEndDate = ""; // End date for the weekend selected
    var yesNoChecked = ""; // Toggle button for weekend

    // ================== Variables for GENRE.HTML ================== //
    var genreInput = ""; // User-inputted genre
    var subGenreInput = ""; // User-inputted sub-genre
    var limitInput = ""; // User-inputted number of movies they would like back with that genre
    var genreRevInput = ""; // The minimum amount of revenue in movies returned to the user
    var genreDateRange = ""; // Range selected by user for genre
    var genreStartDate = ""; // Start date for the genre tab
    var genreEndDate = ""; // End date for the genre tab

    //==================== Other Variables ==================// 

    var today = moment().format("YYYY-MM-DD"); // Grabs today's date
    var currentYear = moment().format("YYYY"); // Grabs current year
    $(".datepicker").attr("placeholder", today + " to " + today); // Puts today's date in the datepicker
    var region = "North America";
    var country = "United States";
    var movieURI; // The URI to send to the server-side
    var whichTab; // Saves which tab the user is in

   //==================== MAIN CODE BODY BELOW THIS LINE ================== //

    function getUserInput(event) {
        event.preventDefault();

        // ================== Stores input values referencing INDEX.HTML ================== //
        // Stores the user-inputted movie title
        if ($("#movie-input").val() != null && $("#movie-input").val() !== "") {
            movieInput = $("#movie-input").val();
            movieInput = movieInput.toLowerCase();

            // Clear the form
            $("#movie-input").val("");

            // If movieInput starts with "The" or "A" or "An", change "movie_od_name" to "movie_display_name"
            if (movieInput.startsWith("the ") || movieInput.startsWith("a ")) {
                whichMovieName = "movie_display_name";
            } else {
                whichMovieName = "movie_od_name";
            };
        };

        // Stores the box office frequency
        if ($("#daily").is(":checked")) {
            boxFrequency = $("#daily").val();
        } else if ($("#weekend").is(":checked")) {
            boxFrequency = $("#weekend").val();
        } else if ($("#weekly").is(":checked")) {
            boxFrequency = $("#weekly").val();
        };
        
        if ($("#movie-date-range").val() != null && $("#movie-date-range").val() !== "") {
            movieDateRange = $("#movie-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            movieStartDate = movieDateRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            movieEndDate = movieDateRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
        };

        // ================ Stores input values referencing WEEKEND.HTML ================== //
        // Stores the user-inputted number of years they want to look back on
        // if ($("#num-years-input").val() != null && $("#num-years-input").val() !== "" && isNaN($("#num-years-input").val()) === false) {
        //     numYearsInput = $("#num-years-input").val();
        //     $("#num-years-input").val("");
        // };

        if ($("#weekend-date-range").val() != null && $("#weekend-date-range").val() !== "") {
            weekendRange = $("#weekend-date-range").val(); // Returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            weekendStartDate = weekendRange.substring(0, 10); // Gets start date as "YYYY-MM-DD"
            weekendEndDate = weekendRange.substring(14, 24); // Gets end date as "YYYY-MM-DD"
            week = moment(weekendStartDate, "YYYY-MM-DD").week().toString(); // Gets what number of the week it is in the given year 
            dayOfWeek = moment(weekendStartDate, "YYYY-MM-DD").format("ddd").toString(); // Gets what day of the week it is
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#weekend-revenue-input").val() != null && $("#weekend-revenue-input").val() !== 0 && isNaN($("#weekend-revenue-input").val()) === false) {
            weekRevInput = $("#weekend-revenue-input").val();
            $("#weekend-revenue-input").val("");
        };

        // Stores whether or not the user wants to only see movies that were released in the chosen weekend
        if ($("#toggle-yes-no").is(":checked")) {
            yesNoChecked = "Yes";
        } else {
            yesNoChecked = "No";
        };

        // =================== Stores input values referencing GENRE.HTML ================== //
        // Stores the user-inputted genre
        if ($("#genre-input").val() != null && $("#genre-input").val() !== "Select a Genre:" && $("#genre-input").val() !== "") {
            genreInput = $("#genre-input").val();
        };

        // Stores the user-inputted sub-genre
        if ($("#sub-genre-input").val() != null && $("#sub-genre-input").val() !== "Select a Sub-genre (optional):" && $("#sub-genre-input").val() !== "") {
            subGenreInput = $("#sub-genre-input").val();
        };

        // Stores the user-inputted number of movies they would like returned
        if ($("#limit-input").val() != null && $("#limit-input").val() !== "" && isNaN($("#limit-input").val()) === false) {
            limitInput = $("#limit-input").val();
            $("#limit-input").val("");
        };

        // Stores the minimum amount of revenue the user wants to see in movies returned
        if ($("#genre-revenue-input").val() != null && $("#genre-revenue-input").val() !== "" && isNaN($("#genre-revenue-input").val()) === false) {
            genreRevInput = $("#genre-revenue-input").val();
            $("#genre-revenue-input").val("");
        };

        if ($("#genre-date-range").val() != null && $("#genre-date-range").val() !== "") {
            genreDateRange = $("#genre-date-range").val(); // returns value in format of "YYYY-MM-DD to YYY-MM-DD"
            genreStartDate = genreDateRange.substring(0, 10); // gets start date as "YYYY-MM-DD"
            genreEndDate = genreDateRange.substring(14, 24); // gets end date as "YYYY-MM-DD"
        };
        
        createDataURLs();
        
        // Passing all the variables from user input into the server-side js
        $.post("/api", {
            movieURI: movieURI,
            whichTab: whichTab,
            // week: week,
            // dayOfWeek: dayOfWeek,
            weekRevInput: weekRevInput,
            yesNoChecked: yesNoChecked,
            // numYearsInput: numYearsInput,
            // country: country,
            genreRevInput: genreRevInput
        }).then(function(response) {

            console.log(response);

            // Empty the responseCard
            $(".responseCard").empty();

            // Create the necessary elements for the responseCard
            var responseCardDiv = $("<div>");
            var responseCardBody = $("<div>");
            var tableEl = $("<table>");
            var tHeadEl = $("<thead>");
            var tBodyEl = $("<tbody>");
            var headTrEl = $("<tr>");
            
            for (var i = 0; i < response.colTitles.length; i++) {
                var headThEl = $("<th>");
                headTrEl.attr("scope", "col");
                headThEl.text(response.colTitles[i]);
                headTrEl.append(headThEl);
            };

            for (var i = 0; i < response.movies.length; i++) {
                var bodyTrEl = $("<tr>");
                var bodyThEl = $("<th>");
                // var posterBtn = $("<button>");
                // var posterModal = $("<div>");
                // var posterModalDialog = $("<div>");
                // var posterModalContent = $("<div>");
                // var posterModalHeader = $("<div>");
                // var posterModalBtn = $("<button>");
                // var posterModalBtnSpan = $("<span>");
                // var posterModalBody = $("<div>");

                bodyThEl.attr("scope", "row");
                // posterBtn.attr("type", "button");
                // posterBtn.attr("class", "btn btn-link posterBtn");
                // posterBtn.attr("data-toggle", "modal");
                // posterBtn.attr("data-target", "#posterModal");
                // posterModal.attr("class", "modal fade");
                // posterModal.attr("tabindex", "-1");
                // posterModal.attr("role", "dialog");
                // posterModal.attr("aria-labelledby", "posterModalLabel");
                // posterModal.attr("aria-hidden", "true");
                // posterModalDialog.attr("class", "modal-dialog");
                // posterModalDialog.attr("role", "document");
                // posterModalContent.attr("class", "modal-content");
                // posterModalHeader.attr("class", "modal-header");
                // posterModalBtn.attr("type", "button");
                // posterModalBtn.attr("class", "close");
                // posterModalBtn.attr("data-dismiss", "modal");
                // posterModalBtn.attr("aria-label", "Close");
                // posterModalBtnSpan.attr("aria-hidden", "true");
                // posterModalBody.attr("class", "modal-body text-center");

                // var posterURL = "https://www.omdbapi.com/?t=" + response.movies[i].movieTitle + "&apikey=trilogy";

                // Grab the poster for the movie
                // $.ajax({
                //     url: posterURL,
                //     method: "GET"
                // }).then (function(omdbResponse) {
                //     var poster = omdbResponse.Poster;

                //     var posterImg = $("<img>");
                //     posterImg.attr("class", "posterImg");
                //     posterImg.attr("src", poster);
                //     // posterModalBody.empty();
                //     posterModalBody.append(posterImg);
                // });

                // posterBtn.text(response.movies[i].movieTitle);
                // posterModalBtnSpan.text("\u00D7");
                
                tBodyEl.append(bodyTrEl);
                bodyTrEl.append(bodyThEl);
                bodyThEl.append(response.movies[i].movieTitle);
                // bodyThEl.append(posterBtn);
                // bodyThEl.append(posterModal);
                // posterModal.append(posterModalDialog);
                // posterModalDialog.append(posterModalContent);
                // posterModalContent.append(posterModalHeader);
                // posterModalHeader.append(posterModalBtn);
                // posterModalBtn.append(posterModalBtnSpan);
                // posterModalContent.append(posterModalBody);

                for (var j = 0; j < response.movies[i].responseInfos.length; j++) {
                    var tdEl = $("<td>");
                    tdEl.text(response.movies[i].responseInfos[j]);
                    bodyTrEl.append(tdEl);
                };

            };

            responseCardDiv.attr("class", "card col-12");
            responseCardBody.attr("class", "card-body");
            tableEl.attr("class", "table");

            $(".responseCard").append(responseCardDiv);
            responseCardDiv.append(responseCardBody);
            responseCardBody.append(tableEl);
            tableEl.append(tHeadEl);
            tableEl.append(tBodyEl);
            tHeadEl.append(headTrEl);

            if (yesNoChecked === "No") {
                var notePEl = $("<p>");
                notePEl.attr("class", "note");

                notePEl.text("* means the movie was released in the weekend chosen");

                responseCardBody.append(notePEl);
            };

        });

    };
    
    $(document).on("click", ".posterBtn", function() {
        $(this.nextSibling).modal("show");
    });

    // Creates the different URIs to attach at the end of the dataURL for the three different tabs
    function createDataURLs() {

        // =================== FOR THE MOVIE TAB ===================== //

        if (movieInput !== "") {

            // If user selects a date range (if boxFrequency === "daily," "weekend," or "weekly"), add movieDateFilter to movieBox and use movieBox
            if (movieStartDate !== "") {
                // Set the movieDateFilter using start and end date
                var movieDateFilter = "%20AND%20chart_date%20between%20%22" + movieStartDate + "%22%20AND%20%22" + movieEndDate + "%22";

                // Add the movieDateFilter into the movieBox URI
                var movieBox = "/movie_theatrical_chart_entries?filter=" + whichMovieName + "%20like%20(%22" + movieInput + "%%22)%20AND%20movie_chart_type_od_name=%22" + boxFrequency + "%22" + movieDateFilter;

                movieURI = movieBox;
                whichTab = "movieBox";
            } else {
                // If boxFrequency === "Summary", use movieSummary.
                var movieSummary = "/movie_financial_summaries?filter=" + whichMovieName + "%20like%20(%22" + movieInput + "%%22)";

                movieURI = movieSummary;
                whichTab = "movieSummary";
            };
        } 
        // =================== FOR THE WEEKEND TAB ===================== //

        else if (weekendStartDate !== "") {

            // var movieRange = "/movie_theatrical_releases?merge=movie_theatrical_chart_entry,region&filter=chart_date%20between%20%22" + weekendStartDate + "%22%20AND%20%22" + weekendEndDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22%20AND%20region_od_name%20like%20(%22" + region + "%%22)";
  
            var movieRange = "/movie_theatrical_chart_entries?merge=country&filter=chart_date%20between%20%22" + weekendStartDate + "%22%20AND%20%22" + weekendEndDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22%20AND%20country_od_name%20like%20(%22" + country + "%%22)";

            // var movieRange = "/movie_theatrical_releases?merge=movie_theatrical_chart_entries&filter=chart_date%20between%20%22" + weekendStartDate + "%22%20AND%20%22" + weekendEndDate + "%22%20AND%20movie_chart_type_od_name=%22Daily%22";

            movieURI = movieRange;
            whichTab= "movieRange";
        }
        // =================== FOR THE GENRE TAB ===================== //

        // If they enter a genre, use movieGenre
        else if (genreInput !== "") {

            // If they enter a sub-genre, add sub-genre to URI
            if (subGenreInput !== "") {
                var subGenre = "%20AND%20work_keyword_od_name%20like%20(%22" + subGenreInput + "%%22)";
            } else {
                subGenre = "";
            };

            // If they enter a limit, add limit to URI
            if (limitInput !== "") {
                limit = "&limit=" + limitInput;
            } else {
                limit = "";
            };

            var movieGenre = "/movie_extended_summaries?merge=movie_genre,country,work_keyword&filter=movie_genre_od_name%20like%20(%22" + genreInput + "%%22)%20AND%20country_od_name%20like%20(%22" + country + "%%22)%20AND%20release_date%20between%20%22" + genreStartDate + "%22%20AND%20%22" + genreEndDate + "%22" + subGenre + limit;

            movieURI = movieGenre;
            whichTab = "movieGenre";
        };

        return movieURI, whichTab;
    };

    // Opens the date range picker and stores the user-selected date range
    function createDateRange(released) {
        $(".datepicker").flatpickr({
            mode: "range",
            dateFormat: "Y-m-d",
            defaultDate: [released]
        });

        $("#weekend-date-range").flatpickr({
            mode: "range",
            "disable": [
                function(date) {
                    // return true to disable
                    return (date.getDay() === 1 || date.getDay() === 2 || date.getDay() === 3 || date.getDay() === 4);
                }
            ]
        });
    };

    function getReleaseDate() {
        
        var tempMovieInput = $("#movie-input").val().trim();
        tempMovieInput = capitalize(tempMovieInput);

        var queryURL = "https://www.omdbapi.com/?t=" + tempMovieInput + "&apikey=trilogy";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then (function(response) {
            $("#release-date").text(tempMovieInput + " was released on " + moment(response.Released).format("MMMM Do YYYY") + ".");
            createDateRange(moment(response.Released).format("YYYY-MM-DD"));
        });
    }

    // Proper case user-inputted movie name
    function capitalize(name) {
        var splitName = name.split(" ");
        for (var i = 0; i < splitName.length; i++) {
            splitName[i] = splitName[i].charAt(0).toUpperCase() + splitName[i].substr(1).toLowerCase();
            // console.log(newName);
            var properName = splitName.join(" ");
            // console.log(properName);
        };
        return properName;
    };

    // Add the date range if the user selects daily, weekend, or week
    $(".form-check-input").on("click", function() {

        // Empty the div so that you don't end up multiple datepickers
        $("#movieDateDiv").empty();

        if ($(this).val() === "Daily" || $(this).val() === "Weekend" || $(this).val() === "Week") {

            if ($("#movie-input").val() !== "") {
                var pEl = $("<p>");
                var datepickerEl = $("<input>");

                datepickerEl.attr("type", "text");
                datepickerEl.attr("class", "datepicker form-control");
                datepickerEl.attr("id", "movie-date-range");
                datepickerEl.attr("data-input", "");
                pEl.text("Please select your date range: ");

                $("#movieDateDiv").append(pEl);
                $("#movieDateDiv").append(datepickerEl);

                createDateRange();
                getReleaseDate();
            };
            
        };
    });

    createDateRange();
    $(".searchBtn").on("click", getUserInput);
});
