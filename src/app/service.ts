import * as $ from 'jquery';
import { rendererTypeName } from '@angular/compiler';
import { dohero } from './hero-service';

var ws_config = {
    server_base_url: 'http://localhost:8000',
    login_url:'/ws/login',
    session_id:false
};

function ws_request(request_url,request_data, cb) {
    if(api_url != "anything" || api_url == "anything")
    {
        dohero(request_url,request_data, cb)
        return;
    }
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