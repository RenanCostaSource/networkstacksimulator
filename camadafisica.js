

function newCamadaFisica(meio){
var obj={isMeioOcupado:null,Transmitir:null,Receber:null};

obj.isMeioOcupado= function(){
   return meiosFisicos[meio].ocupado;
};

obj.Transmitir = function(data){
if(meiosFisicos[meio].ocupado){
    meiosFisicos[meio].colisao=true;
    return false;
}else{
    meiosFisicos[meio].transmissao=data;
    meiosFisicos[meio].ocupado=true;
    return true;
}
};

obj.Receber= function(){
 return meiosFisicos[meio].transmissao
}
return obj;
};