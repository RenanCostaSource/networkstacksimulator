function newCamadaEnlace(mac,meio){
    var obj;
    obj.mac = mac;
    obj.camadafisica = newCamadaFisica(meio);
    obj.csma= function(mac,data){

    };

    obj.data4Me = function(){

    };

    return obj;
};