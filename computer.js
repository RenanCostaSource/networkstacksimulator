function newComputer(mac,ip,mask,meio){
    var obj={};
    
    obj.camadaenlace = newCamadaEnlace(mac,meio);
    obj.camadarede = newCamadaRede(ip,mask);
    obj.step= function(){

    };
    return obj;
};