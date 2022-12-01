const EMPTY_FIELD_MSG = "This field cannot be empty"
const NAN_FIELD_MSG = "This field must be a number"

const ARTIST_ERROR_ID = "empty_artist"
const TITLE_ERROR_ID = "empty_title"
const URL_ERROR_ID = "empty_url"
const FLOOR_ERROR_ID = "floor_error"
const ROOM_ERROR_ID = "room_error"
const YEAR_ERROR_ID = "year_error"
const MEDIUM_ERROR_ID = "medium_error"
const DESC_ERROR_ID = "desc_error"
const GALL_ERROR_ID = "gallery_error"

function create_warning(span_id, message) {
    $("#" + span_id).text(message)
}

function hide_warning(warning_id) {
    $("#" + warning_id).empty()
    $('#submit').attr('disabled', false);
}

$(document).ready(function() {
    $("#dialog").dialog({
        autoOpen: false
    })

    $("#artist").on("input", function() {
        hide_warning(ARTIST_ERROR_ID)

    })
    $("#view-title").on("input", function() {
        hide_warning(TITLE_ERROR_ID)

    })
    $("#url").on("input", function() {
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
    $("#description").on("input", function() {
        hide_warning(DESC_ERROR_ID)
    })

    $("#gallery").on("input", function() {
        hide_warning(GALL_ERROR_ID)
    })

    $("#submit").click(function() {
        let title = $.trim($("#view-title").val())
        let artist = $.trim($("#artist").val())
        let year = $.trim($("#year").val())
        let medium = $.trim($("#medium").val())
        let description = $.trim($("#description").val())
        let floor = $.trim($("#floor").val())
        let room = $.trim($("#room").val())
        let gallery = $.trim($("#gallery").val())
        let url = $.trim($("#url").val())
        let alt = artwork["alt_text"]

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
            $("#submit").attr("disabled", true)
        } else {
            console.log(artwork["id"])
            let new_artwork = {
                "id": artwork["id"],
                "title": title,
                "artist": artist,
                "year": year,
                "medium": medium,
                "description": description,
                "floor": floor,
                "room": room,
                "gallery": gallery,
                "img": url,
                "alt_text": alt
            }
            $.ajax({
                type: "POST",
                url: artwork["id"],
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(new_artwork),
                success: function(result) {
                    let id = result["art_id"]
                    let link = window.location.origin + "/view/" + id
                    window.location.href = link
                },
                error: function(request, status, error) {
                    console.log("Error occurred in submitting data")
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            })
        }
    })

    $("#url").keypress(function() {
        $("#img").attr("src", $("#url").val())
    })

    $("#discard").click(function() {
        $("#dialog").dialog("open")
    })

    $("#not-sure").click(function() {
        $("#dialog").dialog("close")
    })

    $("#sure").click(function() {
        $("#dialog").dialog("close")
        let link = window.location.origin + "/view/" + artwork["id"]
        window.location.href = link
    })

})