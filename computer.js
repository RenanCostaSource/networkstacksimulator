function newComputer(mac,ip,mask,meio,ARP){
    var obj={};
    obj.next=0;
    obj.camadaenlace = newCamadaEnlace(mac,meio);
    obj.camadarede = newCamadaRede(ip,mask,ARP);
    obj.step= function(){
        var receivebuffer=obj.checkmsg();
        if(receivebuffer){
            obj.camadarede.receive(receivebuffer);
        }
        if(obj.camadarede.somethingToSend.yes){
            console.log("rede to enlace");
            obj.camadaenlace.csma(obj.camadarede.somethingToSend.mac,obj.camadarede.somethingToSend.data);
            obj.camadarede.somethingToSend.yes=false;
        }
        obj.camadaenlace.csmaStep();
    };
    obj.checkmsg = function(){
        var receber = this.camadaenlace.data4Me();
        if (receber&&receber!==1){
            console.log("pacote Completo");
            console.log(receber);
            return receber;
        }
            return null
        
    };
    return obj;
};