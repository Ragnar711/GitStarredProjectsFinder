import "../src/style.css";

$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        var startDate = $("#start-date").val();
        var endDate = $("#end-date").val();
        var url =
            "https://api.github.com/search/repositories?q=created:" +
            startDate +
            ".." +
            endDate +
            "&sort=stars&order=desc";
        $.get(url, function (response) {
            var projects = response.items;
            var results = $("#results");
            results.empty();

            var minStars = 1000;

            projects.forEach(function (project) {
                if (project.stargazers_count >= minStars) {
                    var card = $("<div>").addClass("card");
                    var title = $("<h2>").text(project.name);
                    var description = $("<p>").text(project.description);
                    var stars = $("<p>").text(
                        "Stars: " + project.stargazers_count
                    );
                    var link = $("<a>")
                        .attr("href", project.html_url)
                        .attr("target", "_blank")
                        .text("View on GitHub");
                    card.append(title, description, stars, link);
                    results.append(card);
                }
            });
        });
    });
});
