function newCamadaRedeRouter(ip,mask,ARP){
    var obj={};
    obj.myIp = ip;
    obj.myMask = mask;
    obj.myNet = getNetIp(ip,mask);
    obj.route =[];
    obj.route.push(getNetIp(ip,mask)+"|"+ip);
    obj.arp=ARP;
    obj.sendARP=function(whatip){

    };

    obj.sendToIP=function(toip,mask,data){
        if(getNetIp(toip,mask)===obj.myNet){
            var toMac= obj.getMac(toip);
            console.log(toMac);
        }else{
            console.log("no Arp");
        }
    };

    obj.getMac=function(toip){
        for(var i = 0; i<obj.arp.length;i++){
            if(toip===obj.arp[i].substring(0,obj.arp[i].indexOf("|")) ) {
                return obj.arp[i].substring(obj.arp[i].indexOf("|")+1,obj.arp[i].length);
            }
        }
        //obj.sendARP();

    };

    obj.routing = function(toip,data){

    }

    obj.receive = function(data){
    var separator =data.indexOf("|");
    var ipFinal =data.substring(0,separator);
        data = data.substring(separator+1,data.length);
        separator =data.indexOf("|");
    var maskFinal = data.substring(0,separator);
    data = data.substring(separator+1,data.length);

    separator =data.indexOf("|");
    var ipOrigem =data.substring(0,separator);
        data = data.substring(separator+1,data.length);
        separator =data.indexOf("|");
    var maskOrigem = data.substring(0,separator);
    data = data.substring(separator+1,data.length);

    getNetIp(ipFinal,maskFinal);
    getNetIp(ipOrigem,maskOrigem);



    }
    return obj;
};




function getNetIp(ip,mask){
    var ipBlocks=[],maskBlocks=[];
    
    ipBlocks.push(ip.substring(0,ip.indexOf(".")));
    ip=ip.substring(ip.indexOf(".")+1,ip.length);
    ipBlocks.push(ip.substring(0,ip.indexOf(".")));
    ip=ip.substring(ip.indexOf(".")+1,ip.length);
    ipBlocks.push(ip.substring(0,ip.indexOf(".")));
    ip=ip.substring(ip.indexOf(".")+1,ip.length);
    ipBlocks.push(ip.substring(0,ip.length));

    maskBlocks.push(mask.substring(0,mask.indexOf(".")));
    mask=mask.substring(mask.indexOf(".")+1,mask.length);
    maskBlocks.push(mask.substring(0,mask.indexOf(".")));
    mask=mask.substring(mask.indexOf(".")+1,mask.length);
    maskBlocks.push(mask.substring(0,mask.indexOf(".")));
    mask=mask.substring(mask.indexOf(".")+1,mask.length);
    maskBlocks.push(mask.substring(0,mask.length));
    


    var netIp="";
    for(var i=0;i<4;i++){
        
        if(parseInt(ipBlocks[i]) <= parseInt(maskBlocks[i])){
            
            netIp+=ipBlocks[i]+".";
        }else{
            netIp+="0."
        }
    }
    netIp= netIp.substring(0,netIp.length-1);
   
    return netIp;
}