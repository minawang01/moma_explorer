$(document).ready(function() {
    $("#search-form").submit(function(event) {
        event.preventDefault()
        let search = $.trim($("#search-bar").val())
        if (search.length == 0) {
            $("#search-bar").val("")
            $("#search-bar").focus()
        } else {
            let data = { "search_term": search }
            $.ajax({
                "type": "POST",
                "url": "/search_results",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                success: function(result) {
                    window.location.href = result.redirect
                },
                error: function(request, status, error) {
                    console.log("Error occurred in sending data")
                    console.log(request)
                    console.log(status)
                    console.log(error)
                }
            })
        }
    })
})