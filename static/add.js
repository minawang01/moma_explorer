const EMPTY_FIELD_MSG = "This field cannot be empty"
const NAN_FIELD_MSG = "This field must be a number"

const ARTIST_ERROR_ID = "empty_artist"
const TITLE_ERROR_ID = "empty_title"
const URL_ERROR_ID = "empty_url"
const FLOOR_ERROR_ID = "floor_error"
const ROOM_ERROR_ID = "room_error"
const YEAR_ERROR_ID = "year_error"
const MEDIUM_ERROR_ID = "medium_error"
const ALT_TEXT_ERROR_ID = "alt_error"
const DESC_ERROR_ID = "desc_error"
const GALL_ERROR_ID = "gallery_error"

$(document).ready(function() {
    $("#submit_btn").click((event) => {
        submit_art()
    })
    $("#artist").on("input", function() {
        hide_warning(ARTIST_ERROR_ID)

    })
    $("#title").on("input", function() {
        hide_warning(TITLE_ERROR_ID)

    })
    $("#image").on("input", function() {
        hide_warning(URL_ERROR_ID)
    })

    $("#floor").on("input", function() {
        hide_warning(FLOOR_ERROR_ID)
    })

    $("#room").on("input", function() {
        hide_warning(ROOM_ERROR_ID)
    })

    $("#year").on("input", function() {
        hide_warning(YEAR_ERROR_ID)

    })
    $("#medium").on("input", function() {
        hide_warning(MEDIUM_ERROR_ID)

    })
    $("#alt_text").on("input", function() {
        hide_warning(ALT_TEXT_ERROR_ID)
    })

    $("#description").on("input", function() {
        hide_warning(DESC_ERROR_ID)

    })

    $("#gallery").on("input", function() {
        hide_warning(GALL_ERROR_ID)

    })

})

function submit_art() {
    let title = $.trim($("#title").val())
    let artist = $.trim($("#artist").val())
    let year = $("#year").val()
    let medium = $.trim($("#medium").val())
    let description = $.trim($("#description").val())
    let floor = $.trim($("#floor").val())
    let room = $.trim($("#room").val())
    let gallery = $.trim($("#gallery").val())
    let url = $.trim($("#image").val())
    let alt = $.trim($("#alt_text").val())
    let throw_error = false
    if (title == "") {
        $("#title").focus()
        $("#title").val("")
        create_warning(TITLE_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (artist == "") {
        $("#artist").focus()
        $("#artist").val("")
        create_warning(ARTIST_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (year == "") {
        $("#year").focus()
        $("#year").val("")
        create_warning(YEAR_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    } else if (isNaN(year)) {
        $("#year").focus()
        create_warning(YEAR_ERROR_ID, NAN_FIELD_MSG)
        throw_error = true
    }
    if (medium == "") {
        $("#medium").focus()
        $("#medium").val("")
        create_warning(MEDIUM_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (url == "") {
        $("#image").focus()
        $("#image").val("")
        create_warning(URL_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (alt == "") {
        $("#alt_text").focus()
        $("#alt_text").val("")
        create_warning(ALT_TEXT_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (description == "") {
        $("#description").focus()
        $("#description").val("")
        create_warning(DESC_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (floor == "") {
        $("#floor").focus()
        $("#floor").val("")
        create_warning(FLOOR_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    } else if (isNaN(floor)) {
        $("#floor").focus()
        $("#floor").val("")
        create_warning(FLOOR_ERROR_ID, NAN_FIELD_MSG)
        throw_error = true
    }
    if (room == "") {
        $("#room").focus()
        $("#room").val("")
        create_warning(ROOM_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }
    if (gallery == "") {
        $("#gallery").focus()
        $("#gallery").val("")
        create_warning(GALL_ERROR_ID, EMPTY_FIELD_MSG)
        throw_error = true
    }

    if (throw_error) {
        $("#submit_btn").attr("disabled", true)
    } else {
        let new_artwork = {
            "title": title,
            "artist": artist,
            "year": year,
            "medium": medium,
            "description": description,
            "floor": floor,
            "room": room,
            "gallery": gallery,
            "img": url
        }
        $.ajax({
            type: "POST",
            url: "add",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(new_artwork),
            success: function(result) {
                let id = result["id"]
                reset()
                see_results(id)
            },
            error: function(request, status, error) {
                console.log("Error occurred in submitting data")
                console.log(request)
                console.log(status)
                console.log(error)
            }
        })
    }
}

function see_results(art_id) {
    $("#status").empty()
    let link = $("<a>")
    link.attr("href", window.location.origin + "/view/" + art_id)
    link.text("here")
    let div = $("<div>New element successfully created! See it </div>")
    div.append(link)
    $("#status").append(div)
}

function reset() {
    $("#title").val("")
    $("#artist").val("")
    $("#year").val("")
    $("#medium").val("")
    $("#description").val("")
    $("#floor").val("")
    $("#room").val("")
    $("#gallery").val("")
    $("#image").val("")
    $("#artist").focus()
}

function create_warning(span_id, message) {
    $("#" + span_id).text(message)
}

function hide_warning(warning_id) {
    $("#" + warning_id).empty()
    $('#submit_btn').attr('disabled', false);
}

function validate_form() {
    let throw_error = false
    if (artist == "") {
        $("#artist").focus()
        $("#artist").val("")
        create_warning(ARTIST_ERROR_ID, EMPTY_ARTIST_MSG)
        throw_error = true
    }
    if (title == "") {
        $("#title").focus()
        $("#title").val("")
        create_warning(TITLE_ERROR_ID, EMPTY_TITLE_MSG)
        throw_error = true

    }

    if (url == "") {
        $("#image").focus()
        $("#image").val("")
        create_warning(URL_ERROR_ID, EMPTY_URL_MSG)
        throw_error = true

    }
    if (floor != "" && isNaN(floor)) {
        console.log(floor)
        console.log(isNaN(floor))
        $("#floor").focus()
        $("#floor").val("")
        create_warning(FLOOR_ERROR_ID, FLOOR_NAN_MSG)
        throw_error = true

    }
    if (room != "" && isNaN(room)) {
        console.log("hello")
        $("#room").focus()
        $("#room").val("")
        create_warning(ROOM_ERROR_ID, ROOM_NAN_MSG)
        throw_error = true
    }
    return throw_error
}