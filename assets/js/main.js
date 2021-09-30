
function create_table(){
    let data = params["data"]
    var table = document.createElement('table');
    let d0 = data[0]
    console.log(Object.keys(d0))   
}

function create_card(){
    let data = params["data"]

}



$(document).ready(function(){
    let end_point =  "https://data.cityofnewyork.us/resource/h9gi-nx95.json"
    let params = {
        "$limit": 10,
        "$offset":0,
        "layout": "card",
        "data": []
    }

    function fetch_data(){
        let url = end_point + "?$offset=" + params["$offset"] + "&$limit=" + params["$limit"]
        console.log("url", url)
        $.ajax({
            url:url,
            method: 'GET',
            success:function(data){
                console.log(data)
                create_table(data)
                params["data"] = data
            },error:function(data){
                console.log("error", data)
            }
        })

    }


    fetch_data(end_point)

    $(document).on("change", ".perPage", function(e){
        params['$limit'] = $(this).val() 
        fetch_data()
        console.log(params)

    })

    $(document).on("click", ".pagination li a", function(e){
        console.log($(this).attr("data-val"))
        params['$offset'] = $(this).attr("data-val")
        fetch_data()
        console.log(params)
    })

    $(document).on("change", ".viewChange", function(){
        console.log($(this).is(":checked"))
        if($(this).is(":checked")){
            $(".card-view").css({"display": "block"})
            $(".tableDiv").css({"display": "none"})
            create_card()
        }else{
            $(".card-view").css({"display": "none"})
            $(".tableDiv").css({"display": "block"})
        }
    })

    $(document).on("click", ".btnClick", function(){
        let id = $(this).attr("data-id")
        window.location.href = "/detail.html?id="+id+"";
    })


})