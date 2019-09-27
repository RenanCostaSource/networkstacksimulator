var computers=[];//globais
var meiosFisicos=[];



function init(){
    //TODO criar forma de adicionar dinamicamente
    meiosFisicos.push(newMeioFisico());//cria dois meios fisicos
    meiosFisicos.push(newMeioFisico());
    computers.push(newComputer("1F23","192.168.0.1","255.255.255.0",1));
    computers.push(newComputer("5FB4","192.168.0.2","255.255.255.0",1));

    computers.push(newComputer("7E28","192.169.0.1","255.255.255.0",2));
    computers.push(newComputer("FF57","192.169.0.2","255.255.255.0",2));
};


function step(){
    computers= shuffle(computers);//randomiza a ordem dos computadores
    for(var i=0;i<computers.length;i++){

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