

function newCamadaFisica(meio){
var obj={isMeioOcupado:null,Transmitir:null,Receber:null};
obj.ultimatransmissao="";//para evitar transmissoes duplicadas
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
    meiosFisicos[meio].life=1;
    return true;
}
};

obj.Receber= function(){
    if(meiosFisicos[meio].ocupado&&meiosFisicos[meio].transmissao!==obj.ultimatransmissao){
        obj.ultimatransmissao=meiosFisicos[meio].transmissao;
        return meiosFisicos[meio].transmissao;
}return null;
}
return obj;
};