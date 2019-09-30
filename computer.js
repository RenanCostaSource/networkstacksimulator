function newComputer(mac,ip,mask,meio){
    var obj={};
    obj.next=0;
    obj.camadaenlace = newCamadaEnlace(mac,meio);
    obj.camadarede = newCamadaRede(ip,mask);
    obj.step= function(){
        switch (obj.next){
            case 0:
        }
    };
    obj.checkmsg = function(){
        var receber = this.camadaenlace.data4Me();
        if (receber&&receber!==1){
            
        }

    };
    return obj;
};