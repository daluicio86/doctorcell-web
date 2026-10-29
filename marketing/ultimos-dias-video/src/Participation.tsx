import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {clamp,Flash,Frame,lime,Phone,type} from './design';
export const Participation = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <Frame>
  <div style={{...type,position:'absolute',top:475,left:90,width:900,fontSize:94,letterSpacing:-3,scale:interpolate(f,[0,.45*fps],[.8,1],clamp)}}>¡COMPRA Y<br/><span style={{color:lime}}>PARTICIPA!</span></div>
  <Phone top={640} size={730}/>
  <div style={{...type,position:'absolute',top:1270,left:90,width:900,fontSize:62,color:'white'}}>SAMSUNG A07</div>
  <div style={{position:'absolute',left:90,top:1350,width:900,height:183,borderRadius:30,background:lime,color:'#03214a',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 35px #b8ff3244',translate:`${interpolate(f,[.3*fps,.7*fps],[1000,0],clamp)}px 0px`}}><div style={{fontSize:44,lineHeight:1.13}}>Por cada <b style={{fontSize:54}}>$25</b><br/>acumulados en compras<br/><b>¡1 oportunidad para el sorteo!</b></div></div>
  <div style={{...type,position:'absolute',left:70,top:1545,width:940,fontSize:30,fontWeight:700,color:'#d6e8ff'}}>Participa hasta el 31 de octubre de 2026</div>
  <Flash/>
 </Frame>;
};
