import React from 'react';
import {AbsoluteFill, CanvasImage, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
export const lime = '#b8ff32';
export const ease = Easing.bezier(.16,1,.3,1);
export const clamp = {extrapolateLeft:'clamp', extrapolateRight:'clamp', easing:ease} as const;
export const type: React.CSSProperties = {fontFamily:'Arial, Helvetica, sans-serif', color:'white', fontWeight:900, textAlign:'center', lineHeight:1.03};
export const Backdrop = () => {
 const f = useCurrentFrame(); const {fps} = useVideoConfig();
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 54%, #075ca4 0%, #06377c 38%, #020c30 82%)', overflow:'hidden'}}>
  <div style={{position:'absolute',width:1600,height:1600,left:-260,top:180,rotate:`${f/fps*3}deg`,background:'conic-gradient(from 20deg,transparent 0deg,#0767cc44 35deg,transparent 60deg,transparent 150deg,#0879ed44 170deg,transparent 190deg,transparent 290deg,#2e96ff30 315deg,transparent 340deg)',borderRadius:'50%'}}/>
  <div style={{position:'absolute',left:70,top:570,width:940,height:940,border:'3px solid #78dfff30',borderRadius:'50%',scale:1+.035*Math.sin(f/fps*2),boxShadow:'0 0 90px #23aaff25, inset 0 0 90px #005aff22'}}/>
  <div style={{position:'absolute',left:125,top:625,width:830,height:830,border:'3px solid #b8ff3255',borderRadius:'50%',scale:1+.03*Math.sin(f/fps*2+1),boxShadow:'0 0 30px #b8ff3222'}}/>
  {Array.from({length:32},(_,i)=><div key={i} style={{position:'absolute',left:(i*179+27)%1080,top:((i*283+f*(.65+i%4*.2))%2200)-150,width:8+i%4*4,height:17+i%3*10,background:i%3===0?'#73d8ff':lime,opacity:.35+(i%4)*.1,rotate:`${i*37+f*(i%2?1:-1)}deg`,borderRadius:2}}/>)}
  <div style={{position:'absolute',left:-300,top:1300,width:1700,height:3,background:'linear-gradient(90deg,transparent,#4bdfff,transparent)',rotate:'-23deg',boxShadow:'0 0 20px #28cfff'}}/>
  <div style={{position:'absolute',left:-400,top:850,width:1700,height:3,background:'linear-gradient(90deg,transparent,#b8ff32,transparent)',rotate:'23deg',boxShadow:'0 0 18px #b8ff32'}}/>
 </AbsoluteFill>;
};
export const Brand = () => <div style={{position:'absolute',left:330,top:215,width:420,height:220,background:'white',borderRadius:35,boxShadow:'0 0 50px #4db3ff40',overflow:'hidden'}}><CanvasImage src={staticFile('doctorcell-logo.png')} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>;
export const Website = () => <>
 <div style={{position:'absolute',left:90,top:1590,width:900,height:108,border:'2px solid #3bbcff',background:'#021b4de8',borderRadius:54,boxShadow:'0 0 30px #168dff55',display:'flex',alignItems:'center',justifyContent:'center',gap:19}}>
  <svg width="46" height="46" viewBox="0 0 48 48" fill="none" stroke={lime} strokeWidth="3"><circle cx="24" cy="24" r="21"/><ellipse cx="24" cy="24" rx="10" ry="21"/><path d="M3 24h42M7 13h34M7 35h34"/></svg>
  <span style={{...type,fontSize:66,letterSpacing:-1.7}}>doctorcell.com.ec</span>
 </div>
 <div style={{...type,position:'absolute',top:1722,left:80,width:920,fontSize:25,fontWeight:400,color:'#d6e8ff'}}>Consulta condiciones en nuestra web. Imagen referencial.</div>
</>;
export const Frame = ({children}:{children:React.ReactNode}) => <AbsoluteFill style={type}><Backdrop/><Brand/>{children}<Website/></AbsoluteFill>;
export const Phone = ({top=790,size=820}:{top?:number,size?:number}) => {
 const f=useCurrentFrame(); const {fps}=useVideoConfig();
 return <div style={{position:'absolute',top,left:(1080-size)/2,width:size,height:size,translate:`0px ${Math.sin(f/fps*2.3)*9}px`,rotate:`${Math.sin(f/fps*1.4)*1.3}deg`,scale:interpolate(f,[0,.65*fps],[.8,1],clamp)}}>
  <div style={{position:'absolute',left:'17%',width:'66%',height:'9%',bottom:'8%',background:'#b8ff3240',borderRadius:'50%',filter:'blur(20px)'}}/>
  <CanvasImage src={staticFile('samsung-a07.png')} style={{width:'100%',height:'100%',objectFit:'contain',filter:'drop-shadow(0 18px 24px #0008)'}}/>
 </div>;
};
export const Flash = () => {const f=useCurrentFrame();const {fps}=useVideoConfig();return <AbsoluteFill style={{background:'linear-gradient(125deg,#b8ff32,transparent 70%)',opacity:interpolate(f,[0,.17*fps],[.45,0],clamp),pointerEvents:'none'}}/>;};
