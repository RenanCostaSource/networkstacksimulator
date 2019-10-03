function newCamadaEnlace(mac,meio){
    var obj={};
    obj.retardo=0;
    obj.mac = mac;
    obj.camadafisica = newCamadaFisica(meio);
    obj.buffer=[];
    obj.receivebuffer=[];
    obj.numpackets=null;
    
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
        
        console.log("buffer to send");
        console.log(obj.buffer);
        //obj.csmaStep();
    };
    obj.csmaStep= function(){
      if(obj.buffer.length>0){
         if(!obj.camadafisica.isMeioOcupado()&&obj.retardo===0){

             var transmitindo =obj.buffer.shift();
             console.log("pacote enviado: "+transmitindo);
             obj.camadafisica.Transmitir(transmitindo);
             obj.retardo=0;
         }else if(obj.retardo===0){
            // obj.retardo=getRandomInt(1,10);
            obj.retardo=1;
         }else{
             obj.retardo--;
         }
        }
     };

    obj.data4Me = function(){
        var recebe= obj.camadafisica.Receber();
        
        if(obj.numpackets&&obj.numpackets===""+obj.receivebuffer.length){
            
            var packagesData = obj.joinPackages()
            this.receivebuffer=[];
            return packagesData;
        }
        if(recebe){
        if(recebe.substring(0,recebe.indexOf("|"))===obj.mac){
            console.log("chegou pacote para mim\n meus pacotes:");
            

            obj.numpackets=recebe.charAt(12);
            if('0'===obj.numpackets){
                return recebe;
            }else{
                if(this.receivebuffer.length<obj.numpackets){
                    this.receivebuffer.push(recebe);
                    console.log(obj.receivebuffer);
                    return 1;
               
            }



        }
            return null;
        }
    }
    
    return null;
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
        obj.numpackets=null;
        fulldata=fulldata.substring(0,fulldata.lastIndexOf("|"));
        return fulldata;
        

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