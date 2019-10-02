function newCamadaRede(ip,mask){
    var obj={};
    obj.myIp = ip;
    obj.myMask = mask;
    
    obj.route =[];
    route.push(getNetIp(ip,mask)+"|"+ip);
    obj.arp=[];
    obj.sendARP=function(whatip){

    };

    obj.sendToIP=function(toip,data){

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