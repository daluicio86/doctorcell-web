import {Composition,Folder,Series,staticFile,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {Opening} from './Opening';
import {Participation} from './Participation';
import {Closing} from './Closing';
const DoctorCellSpot = () => {
 const {fps}=useVideoConfig();
 return <>
  <Audio name="Música original · electrónica 128 BPM" src={staticFile('doctorcell-electro-original.wav')} premountFor={fps} volume={.85}/>
  <Series>
   <Series.Sequence name="Últimos días · Samsung A07" durationInFrames={4*fps} premountFor={fps}><Opening/></Series.Sequence>
   <Series.Sequence name="Compra y participa" durationInFrames={5*fps} premountFor={fps}><Participation/></Series.Sequence>
   <Series.Sequence name="Síguenos · web" durationInFrames={6*fps} premountFor={fps}><Closing/></Series.Sequence>
  </Series>
 </>;
};
export const RemotionRoot = () => <>
 <Composition id="DoctorCell-UltimosDias-15s" component={DoctorCellSpot} durationInFrames={450} fps={30} width={1080} height={1920}/>
 <Folder name="Escenas">
  <Composition id="UltimosDias" component={Opening} durationInFrames={120} fps={30} width={1080} height={1920}/>
  <Composition id="CompraYParticipa" component={Participation} durationInFrames={150} fps={30} width={1080} height={1920}/>
  <Composition id="Siguenos" component={Closing} durationInFrames={180} fps={30} width={1080} height={1920}/>
 </Folder>
</>;
