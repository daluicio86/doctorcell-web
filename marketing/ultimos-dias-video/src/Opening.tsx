import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {clamp,Frame,lime,Phone,type} from './design';
export const Opening = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <Frame>
  <div style={{...type,position:'absolute',left:70,top:475,width:940,fontSize:114,letterSpacing:-4,translate:`0px ${interpolate(f,[0,.5*fps],[70,0],clamp)}px`,opacity:interpolate(f,[0,.25*fps],[0,1],clamp),textShadow:'0 8px 0 #00205f,0 0 30px #319cff66'}}>¡ÚLTIMOS</div>
  <div style={{...type,position:'absolute',left:80,top:590,width:920,fontSize:196,letterSpacing:-7,color:lime,scale:interpolate(f,[.12*fps,.62*fps],[.4,1],clamp),opacity:interpolate(f,[.12*fps,.25*fps],[0,1],clamp),textShadow:'0 9px 0 #247539,0 0 45px #b8ff3240'}}>DÍAS!</div>
  <div style={{...type,position:'absolute',top:820,left:110,width:860,fontSize:48,fontWeight:700,lineHeight:1.13,opacity:interpolate(f,[.6*fps,1*fps],[0,1],clamp)}}>Tus compras pueden<br/>hacerte ganar</div>
  <Phone top={880} size={670}/>
  <div style={{...type,position:'absolute',top:1480,left:100,width:880,fontSize:66,letterSpacing:-1,color:lime,opacity:interpolate(f,[.8*fps,1.2*fps],[0,1],clamp)}}>SAMSUNG A07</div>
 </Frame>;
};
