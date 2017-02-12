function createTable(latitude,longitude,lst,beta,gamma){
    var table=document.getElementsByTagName("tbody").item(1);
    var n=1;
    for(var i=1;i<=365;i++){
        var tr=document.createElement('tr');
        var td=document.createElement('td');
        td.innerHTML="Day "+i+": ";
        tr.appendChild(td);

        var td=document.createElement('td');
        n=i;
        td.innerHTML=getH0(getGSC(),n,getPhi(latitude),getDelta(n),getOmega_s(getPhi(latitude),getDelta(n))).toFixed(2);
        tr.appendChild(td);
        table.appendChild(tr);
    }
}
function degToRad(deg){
    return (Math.PI * deg / 180);
}
function radToDeg(rad){
    return (180 * rad / Math.PI);
}
function getPhi(latitude){
    return (latitude);
}
function getB(n){
    return ((n-1.0)*(360.0/365.0));
}
function getDelta(n){
    return 23.45*Math.sin(degToRad(((360.0/365.0)*(284.0+n))));
}
function getE(B){
    return 229.2*(0.000075+0.001868*Math.cos(degToRad(B))-0.032077*Math.sin(degToRad(B))-0.014615*Math.cos(degToRad(2.0*B))-0.04089*Math.sin(degToRad(2.0*B)));
}
function getSolar_time(lst,longitude,e,local_time){
    return ((4.0*(lst-(360.0-longitude))+e)/60)+local_time;
}
function getOmega(solar_time){
    return (solar_time-12.0)*15.0;
}
function getTheta(delta,phi,beta,gamma,omega){
    var t1=Math.sin(degToRad(delta))*Math.sin(degToRad(phi))*Math.cos(degToRad(beta));
    var t2=Math.sin(degToRad(delta))*Math.cos(degToRad(phi))*Math.sin(degToRad(beta))*Math.cos(degToRad(gamma));
    var t3=Math.cos(degToRad(delta))*Math.cos(degToRad(phi))*Math.cos(degToRad(beta))*Math.cos(degToRad(omega));
    var t4=Math.cos(degToRad(delta))*Math.sin(degToRad(phi))*Math.sin(degToRad(beta))*Math.cos(degToRad(gamma))*Math.cos(degToRad(omega));
    var t5=Math.cos(degToRad(delta))*Math.sin(degToRad(beta))*Math.sin(degToRad(gamma))*Math.sin(degToRad(omega));

    return radToDeg(Math.acos(t1-t2+t3+t4+t5));
}
function getGSC(){
    return 1367;
}
function getOmega_s(phi,delta){
    return radToDeg(Math.acos(-Math.tan(degToRad(phi))*Math.tan(degToRad(delta))))
}
function getH0(GSC,n,phi,delta,omega_s){
    var h01=((24.0*3600.0)/(1000.0*Math.PI))*GSC;
    var h02=1.0+(0.033*Math.cos(degToRad(360.0*n/365.0)));
    var h03=Math.cos(degToRad(phi))*Math.cos(degToRad(delta))*Math.sin(degToRad(omega_s));
    var h04=(Math.PI*omega_s/180.0)*Math.sin(degToRad(phi))*Math.sin(degToRad(delta));

    return h01*h02*(h03+h04);
}
function getI0(GSC,n,delta,phi,omega){
    var i01=(3600.0/(1000.0))*GSC;
    var i02=1.0+(0.033*Math.cos(degToRad(360.0*n/365.0)));
    var i03=Math.cos(degToRad(delta))*Math.cos(degToRad(phi))*Math.cos(degToRad(omega));
    var i04=Math.sin(degToRad(phi))*Math.sin(degToRad(delta));
    return i01*i02*(i03+i04);
}
function getLatitude(){
    return Number(document.getElementById('latitude').value);
}
function getLongitude(){
    var direction=document.getElementById('direction').value;
    
    if(direction=='E'){
        return 360.0-Number(document.getElementById('longitude').value);
    }
    else{
        return Number(document.getElementById('longitude').value);
    }
}
function getLst(){
    return 360.0-Number(document.getElementById('lst').value);
}
function getN(){
    return Number(document.getElementById('n').value);
}
function getLocal_time(){
    return Number(document.getElementById('local_time').value);
}
function getBeta(){
    return Number(document.getElementById('beta').value);
}
function getGamma(){
    return Number(document.getElementById('gamma').value);
}
function setup(){
    // Input
    var latitude=getLatitude();
    var longitude=getLongitude();
    var lst=getLst();
    var n=getN();
    var local_time=getLocal_time();
    var beta=getBeta();
    var gamma=getGamma();

    // Output
    var phi=getPhi(latitude);
    document.getElementById('phi').value=phi.toFixed(2);

    var B=getB(n);
    //document.getElementById('B').value=B.toFixed(2);

    var delta=getDelta(n);
    document.getElementById('delta').value=delta.toFixed(2);

    var e=getE(B);
    document.getElementById('e').value=e.toFixed(2);

    var solar_time=getSolar_time(lst,longitude,e,local_time);
    document.getElementById('solar_time').value=solar_time.toFixed(2);

    var omega=getOmega(solar_time);
    document.getElementById('omega').value=omega.toFixed(2);

    var theta=getTheta(delta,phi,beta,gamma,omega);
    document.getElementById('theta').value=theta.toFixed(2);

    var GSC=getGSC();
    var omega_s=getOmega_s(phi,delta);
    document.getElementById('omega_s').value=omega_s.toFixed(2);

    var H0=getH0(GSC,n,phi,delta,omega_s);
    document.getElementById('H0').value=H0.toFixed(2);

    var I0=getI0(GSC,n,delta,phi,omega);
    document.getElementById('I0').value=I0.toFixed(2);

    //createTable(latitude,longitude,lst,beta,gamma);
}
