function newRouter(mac,ip,mask,meio,ARP,mac1,ip1,mask1,meio1,ARP1){
    var obj={};
    obj.next=0;
    obj.camadaenlace = newCamadaEnlace(mac,meio);
    obj.camadarede = newCamadaRedeRouter(ip,mask,ARP);
    obj.camadaenlace1 = newCamadaEnlace(mac1,meio1);
    obj.camadarede1 = newCamadaRedeRouter(ip1,mask1,ARP1);
    obj.step= function(){
        var receivebuffer=obj.checkmsg();
    };
    obj.checkmsg = function(){
        var receber = this.camadaenlace.data4Me();
        if (receber&&receber!==1){
            return receber;
        }
            return null
        
    };
    return obj;
};