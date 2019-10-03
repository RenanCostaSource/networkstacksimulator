var computers=[];//globais
var meiosFisicos=[];



function init(){
    //TODO criar forma de adicionar dinamicamente
    meiosFisicos.push(newMeioFisico());//cria dois meios fisicos
    meiosFisicos.push(newMeioFisico());
    var ARP =["192.168.0.1|1F23","192.168.0.2|5FB4","192.168.0.3|4D91"];
    computers.push(newComputer("1F23","192.168.0.1","255.255.255.0",0,ARP));
    computers.push(newComputer("5FB4","192.168.0.2","255.255.255.0",0,ARP));
    computers.push(newComputer("4D91","192.168.0.3","255.255.255.0",0,ARP));
    ARP =["192.169.0.1|7E28","192.169.0.2|FF57","192.169.0.3|12BA"];
    computers.push(newComputer("7E28","192.169.0.1","255.255.255.0",1,ARP));
    computers.push(newComputer("FF57","192.169.0.2","255.255.255.0",1,ARP));
    computers.push(newComputer("12BA","192.169.0.3","255.255.255.0",1,ARP));
};


function step(){
    computers= shuffle(computers);//randomiza a ordem dos computadores
    for(var i=0;i<computers.length;i++){
        console.log(computers[i].camadarede.myIp);
        computers[i].step();
        console.log("end");
    }

    for(var i =0;i<meiosFisicos.length;i++){//vida da transmissao de dois ciclos(de um a dois ciclos para ser mais exato)
        console.log("meio fisico"+i+": ");
        console.log(meiosFisicos[i]);
        if(meiosFisicos[i].life===1){
            meiosFisicos[i].life=0;
        }else{
            meiosFisicos[i]=newMeioFisico();
        }
    }
};



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }