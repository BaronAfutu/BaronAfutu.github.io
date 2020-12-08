var store = ()=>{
    var start = 0;
    var ips = 10; //itemsPerSet
    var end = (ITEMS.length>ips)?ips:ITEMS.length;
    var ckCt = 0;
    for(var i=0;i<end;){
        var tempArr = ITEMS.slice(i,end)
        setCookie(("set"+ckCt),JSON.stringify(tempArr))
        ckCt++;
        i+=ips;
        end = (ITEMS.length>(i+ips)?(i+ips):ITEMS.length);
    }
}


var readItems = ()=>{
    ITEMS = [];
    //console.log(ITEMS.length);

    var i=0;
    do {
        val = cookieVal(('set'+i+''));
        if(val==0)break;
        ITEMS = ITEMS.concat(JSON.parse(val))
        i++;
    } while (val!=0);
    
    //document.write(JSON.stringify(ITEMS))
}

