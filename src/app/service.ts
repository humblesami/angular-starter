var ws_config = {
    server_base_url: 'http://localhost:8000',
    login_url:'/ws/login',
    session_id:false
};
function ws_request(request_url,request_data, cb) {

    switch (request_url)
    {
        case "/addhero":
            break;
        case "/getheroes":
        cb([{name:"khas",  id:6},{name:"aam",  id:5}]);
            break;
        case "/gethero":
            cb({name:"khas",  id:6});
            break;
        case "/updatehero":
            break;
        case "/delhero":
            break;           
    }
    if(!request_url.startsWith("fuzool"))
        return;

    var api_url = undefined;
    if(request_url=='test')
    {
        api_url = "https://maps.googleapis.com/maps/api/geocode/json?address=lahore";
        send_request(api_url,request_data,cb);
    }
    else
    {
        request_data.ws_sid = ws_config.session_id; 
        if(ws_config.server_base_url)   
        {
            api_url = ws_config.server_base_url + request_url;
        }
        else
        {
            api_url = request_url;
        }
        var break_point = 1;

        send_request(api_url,request_data,function(data){
            if(data.error)
            {
                if (data.error == "unauthorized")
                {
                    ws_config.session_id = false;
                }
            }
            else
            {
                data = data.data;
                cb(data);            
            }
        });
    }
}

function send_request(api_url, dataToSend, cb)
{
    if(api_url=='test')
    {
        api_url = "https://maps.googleapis.com/maps/api/geocode/json?address=lahore";
    }
    // $.ajax({
    //     url: api_url,
    //     dataType:'json',
    //     data : dataToSend,
    //     beforeSend:function(a, b){
    //         console.log(b.url);
    //     },
    //     success:function(data){
    //         console.log(data);
    //         if(cb)
    //         {
    //             cb(data);
    //         }
    //     },
    //     error:function(a)
    //     {
    //         console.log(a);
    //     }
    // });
}
export { ws_request };