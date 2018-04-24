import * as $ from 'jquery';
import { rendererTypeName } from '@angular/compiler';

var ws_config = {
    server_base_url: 'http://localhost:8000',
    login_url:'/ws/login',
    session_id:false
};

var herolist = [{name:"khas",  id:1},{name:"aam",  id:2}]

function ws_request(request_url,request_data, cb) {
    //send_request("test", {}, false);
    switch (request_url)
    {
        case "/addhero":
            var nid =  herolist.length;
            var nhero = {name:request_data.name, id:nid};
            herolist.push(nhero);            
            break;
        case "/getheroes":
            cb(herolist);
            break;
        case "/gethero":
            cb({name:"khas",  id:6});
            break;
        case "/searchheroes":
            var res = [];
            herolist.forEach(function(h, i)
            {
                if(h.name.indexOf(request_data.kw)> -1)
                {
                    res.push(h);                    
                }
            });
            cb(res);
            break;            
        case "/updatehero":
            herolist.forEach(function(h, i)
            {
                if(h.id == request_data.hero.id)
                {
                    h = request_data.hero;
                    cb(h);                    
                    return;
                }
            });
            break;
        case "/delhero":
            break;           
    }
    if(!request_url.startsWith("fuzool"))
        return;

    var api_url = undefined;
    if(request_url != 'test')
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
    else
    {
        send_request(api_url,request_data,cb);
    }
}

function send_request(api_url, dataToSend, cb)
{
    if(api_url=='test')
    {
        api_url = "https://maps.googleapis.com/maps/api/geocode/json?address=lahore";
    }
    $.ajax({
        url: api_url,
        dataType:'json',
        data : dataToSend,
        beforeSend:function(a, b){
            console.log(b.url);
        },
        success:function(data){
            console.log(data);
            if(cb)
            {
                cb(data);
            }
        },
        error:function(a)
        {
            console.log(a);
        }
    });
}
export { ws_request };