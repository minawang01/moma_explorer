$(document).ready(function() {
    let span = $("<span class='accent'>")
    span.text(search_term)
    let nr = $("#num-results")

    if (num_results > 0) {
        let num_res = $("<span class='accent'>")
        num_res.text(num_results)

        nr.append("Your search for ")
        nr.append(span)
        nr.append(" yielded ")
        nr.append(num_res)
        nr.append(" results:")
    } else {
        nr.append("No search results matching ")
        nr.append(span)
    }

    let artists = results["artists"]
    let title = results["title"]
    let medium = results["medium"]
    if (artists.length > 0) {
        let artist_results = $("<div class='row'>")
        let header = $("<div class='font results-label'>Artworks with ARTISTS matching </div>")
        let term = $("<span class='accent'>")
        term.text(search_term)
        artist_results.append(header)
        header.append(term)
        for (let elem of artists) {
            let work = create_result(elem, "artist")
            artist_results.append(work)
        }

        $("#results-container").append(artist_results)
    }
    if (title.length > 0) {
        let title_results = $("<div class='row'>")
        let header = $("<div class='font results-label'>Artworks with TITLES matching </div>")
        let term = $("<span class='accent'>")
        term.text(search_term)
        title_results.append(header)
        header.append(term)
        for (let elem of title) {
            let work = create_result(elem, "title")
            title_results.append(work)
        }

        $("#results-container").append(title_results)

    }
    if (medium.length > 0) {
        let medium_results = $("<div class='row'>")
        let header = $("<div class='font results-label'>Works with MEDIUMS matching </div>")
        let term = $("<span class='accent'>")
        term.append(search_term)
        header.append(term)
        medium_results.append(header)
        for (let elem of medium) {
            let work = create_result(elem, "medium")
            medium_results.append(work)
        }

        $("#results-container").append(medium_results)
    }
    create_highlight(search_term)
})

function create_highlight(phrase) {
    $('.art-result:contains("' + phrase + '")').each(function(index, value) {
        $(this).html(function(i, str) {
            let simpletext = new RegExp("(" + phrase + ")", "gi");
            return str.replace(simpletext, "<span style='background-color: #FFFF00'>$1</span>")
        });
    });

}

function create_result(result, where_search) {
    let div = $("<div class='row mb-4 mt-2'>")
    let img = $("<img class='img-fluid'>");
    let col = $("<div class='col-md-10'>")
    img.attr("src", result["img"]);
    img.attr("alt", result["alt_text"])
    let link = $("<a class='col-md-2'>")
    link.attr("href", window.location.origin + "/view/" + result["id"])
    link.append(img)
    let search_in = result[where_search]
    div.append(link)
    if (where_search == "title") {
        let title = $("<span class='mini-title art-result font'>")
        title.text(search_in)
        col.append(title)
        col.append("<br>")
        let artist = $("<span class='font mini-artist'>")
        artist.text(result["artist"])
        col.append(artist)
    } else if (where_search == "artist") {
        let title = $("<span class='font mini-title'>")
        title.text(result["title"])
        col.append(title)
        col.append("<br>")
        let artist = $("<span class='font art-result mini-artist'>")
        artist.text(search_in)
        col.append(artist)
    } else {
        let title = $("<span class='font mini-title'>")
        title.text(result["title"])
        col.append(title)
        col.append("<br>")
        let artist = $("<span class='font mini-artist'>")
        artist.text(result["artist"])
        col.append(artist)
        col.append("<br>")
        let medium = $("<span class='font art-result'>")
        medium.text(search_in)
        col.append(medium)
    }
    div.append(col)
    return div
}

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});