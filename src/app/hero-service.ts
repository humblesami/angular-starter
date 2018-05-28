var herolist = [{name:"khas",  id:1},{name:"aam",  id:2}];

function dohero(request_url, request_data, cb)
{
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
            herolist.forEach(function(h, i)
            {
                if(h.id==  request_data.id)
                {
                    cb(h);
                }
            });
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
            console.log(herolist);
            herolist.forEach(function(h, i)
            {
                if(h.id == request_data.hero.id)
                {
                    h = request_data.hero;
                    cb(h);
                }
            });
            break;
        case "/delhero":
            break;           
    }
}
export { dohero };