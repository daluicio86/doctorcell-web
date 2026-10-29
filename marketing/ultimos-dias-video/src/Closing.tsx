import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {clamp,Flash,Frame,lime,Phone,type} from './design';
export const Closing = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <Frame>
  <div style={{...type,position:'absolute',top:480,left:80,width:920,fontSize:48,letterSpacing:6,color:lime}}>¡ÚLTIMOS DÍAS!</div>
  <div style={{position:'absolute',top:590,left:430,width:220,height:170,display:'flex',alignItems:'center',justifyContent:'center',scale:1+.05*Math.sin(f/fps*Math.PI*128/60)}}><svg width="170" height="150" viewBox="0 0 100 90"><path d="M50 86 10 48C-16 20 19-15 50 16 81-15 116 20 90 48Z" fill={lime}/></svg></div>
  <div style={{...type,position:'absolute',top:810,left:90,width:900,fontSize:106,letterSpacing:-4,opacity:interpolate(f,[.08*fps,.4*fps],[0,1],clamp),translate:`0px ${interpolate(f,[.08*fps,.5*fps],[50,0],clamp)}px`}}>¡SÍGUENOS!</div>
  <div style={{...type,position:'absolute',top:945,left:90,width:900,fontSize:67,lineHeight:1.15,color:lime,opacity:interpolate(f,[.35*fps,.7*fps],[0,1],clamp)}}>en nuestras<br/>redes sociales</div>
  <Phone top={1100} size={430}/>
  <div style={{...type,position:'absolute',top:1490,left:100,width:880,fontSize:34,lineHeight:1.25,fontWeight:700}}>Sorteo: 7 de noviembre de 2026<br/><span style={{color:lime}}>¡Compra, participa y cruza los dedos!</span></div>
  <Flash/>
 </Frame>;
};
