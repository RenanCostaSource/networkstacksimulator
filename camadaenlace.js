function newCamadaEnlace(mac,meio){
    var obj={};
    obj.retardo=0;
    obj.mac = mac;
    obj.camadafisica = newCamadaFisica(meio);
    obj.buffer=[];
    obj.receivebuffer=[];
    
    
    var packetsize=20;
    obj.csma= function(mac,data){
        var packets = Math.ceil(data.length/packetsize);
       
        if (packets<1||packets===1){
           var packet = packetsize-data.length;
            var fill="|";
            for(var i=0;i<packet;i++){
                fill+="¨";
            }
            data +=fill;
            obj.buffer.push(obj.createHeader(mac,0,0,data));
        }else{
            for(var i=1;i<packets;i++){
                var packetdata=data.substring((i-1)*packetsize,((i-1)*packetsize)+packetsize);
                obj.buffer.push(obj.createHeader(mac,i,packets,packetdata));
            }
            var lastpacket =data.substring((packets-1)*packetsize,data.length);
            var lastpacketfillsize = packetsize - lastpacket.length;
          
            var fill="|";
            for(var i=0;i<lastpacketfillsize;i++){
                fill+="-";
            }
            lastpacket+=fill;
            obj.buffer.push(obj.createHeader(mac,packets,packets,lastpacket));

        }
        obj.receivebuffer=obj.buffer;
        this.joinPackages();
        //obj.csmaStep();
    };
    obj.csmaStep= function(){

         if(!obj.camadafisica.isMeioOcupado()&&obj.retardo===0){
             obj.camadafisica.Transmitir(obj.buffer.shift());
             obj.retardo=0;
         }else if(obj.retardo===0){
             obj.retardo=getRandomInt(1,10);
         }else{
             obj.retardo--;
         }
     };

    obj.data4Me = function(){
        var recebe= obj.camadafisica.Receber();
        if(recebe.substring(0,3).equals(obj.mac)){
            var totalPackets=recebe.charAt(12);
            if('0'===totalPackets){
                return recebe;
            }else{
                if(this.receivebuffer.length<totalPackets){
                    this.receivebuffer.push(recebe);
                    return 1;
                }else{
                    var packagesData = obj.joinPackages()
                    this.receivebuffer=[];
                    return packagesData;
                }
            }



        }else{
            return null;
        }
    };

    obj.joinPackages=function(){
    
        for(var i=0;i<this.receivebuffer.length;i++){//bubble sort
            for(var j=0;j<this.receivebuffer.length-1;j++){
                if(this.receivebuffer[j].charAt(10)>this.receivebuffer[j+1].charAt(10)){
                    var tmp=this.receivebuffer[j];
                    this.receivebuffer[j]=this.receivebuffer[j+1];
                    this.receivebuffer[j+1]=tmp;
                }
            }
            
        }
        var fulldata="";
        for(var i=0;i<this.receivebuffer.length;i++){
           fulldata+=this.receivebuffer[i].substring(14,this.receivebuffer[i].length);
        }
        return fulldata=fulldata.substring(0,fulldata.indexOf("|"));
        console.log(fulldata);

    }

    obj.createHeader = function(mac,packetnumber,lastpacketnumber,data){
        return mac+"|"+obj.mac+"|"+packetnumber+"|"+lastpacketnumber+"|"+data;
//char indexes: 0-3 4  5-8      9    10          11       12         13    14-$
    };

    return obj;
};



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }