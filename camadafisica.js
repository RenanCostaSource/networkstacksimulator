

function newCamadaFisica(meio){
var obj;

obj.isMeioOcupado= function(){
   return meiosFisicos[meio].ocupado;
};

obj.Transmitir = function(data){
if(meiosFisicos[meio].ocupado){
    meiosFisicos[meio].colisao=true;
}else{
    meiosFisicos[meio].transmissao=data;
    meiosFisicos[meio].ocupado=true;
}
};

obj.Receber= function(){
 return meiosFisicos[meio].transmissao
}
return obj;
};