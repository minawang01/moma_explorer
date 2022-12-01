$(document).ready(function() {
    $("#edit").click(() => {
        let link = window.location.origin + "/edit/" + artwork["id"]
        location.href = link
    })
    if (nearby.length > 0) {
        let title = $("<p class='font bold'>Works nearby:</p>")
        $("#nearby").append(title)
        for (let elem of nearby) {
            let img = $("<img class='img-fluid col-3'>")
            img.attr("src", elem["img"])
            img.attr("alt", elem["alt_text"])
            let link = $("<a>")
            link.attr("href", window.location.origin + "/view/" + elem["id"])
            link.append(img)
            $("#nearby").append(link)
        }
    } else {
        let noart = $("<p class='font bold'>No art to recommend nearby</p>")
        $("#nearby").append(noart)
    }


    if (artist.length > 0) {
        let title = $("<p class='font bold'>Works from the same artist</p>")
        $("#same_artist").append(title)
        for (let elem of artist) {
            let img = $("<img class='img-fluid col-3'>")
            img.attr("src", elem["img"])
            img.attr("alt", elem["alt_text"])
            let link = $("<a>")
            link.attr("href", window.location.origin + "/view/" + elem["id"])
            link.append(img)
            $("#same_artist").append(link)
        }
    } else {
        let noart = $("<p class='font bold'>No art to recommend from this artist</p>")
        $("#same_artist").append(noart)
    }
})