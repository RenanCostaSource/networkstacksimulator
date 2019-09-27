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
    for(var i=0;i<computers.length;i++){

    }
};