"use client";
import React from "react";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";
import {Box,Container,Typography,Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Image from "next/image";
import WavyHeroBackground from "@/components/shared/WavyHeroBackground";
import AnimatedWaveSeparator from "@/components/shared/AnimatedWaveSeparator";
import {useProfileImage} from "@/lib/hooks/useProfileImage";
import AnimatedSquigglyLine from "@/components/animations/AnimatedSquigglyLine";
import {getLocalizedHref} from "@/lib/utils";
interface P{id:number;title:string;category:string;image:string|null;slug:string;gridClass:string;}
const dP:P[]=[{id:1,title:"ALIA ALYAL",category:"WEB APP",image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",slug:"",gridClass:"col-span-1 row-span-2"},{id:2,title:"CACHOU",category:"WEB APP",image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",slug:"",gridClass:"col-span-1 row-span-1"},{id:3,title:"VOUJI CHOCOLATE",category:"UI/UX DESIGN",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",slug:"",gridClass:"col-span-1 row-span-2"},{id:4,title:"NATA",category:"BRANDING",image:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",slug:"",gridClass:"col-span-1 row-span-1"},{id:5,title:"FLY HIGHLIGHTS",category:"MOBILE APP",image:"https://images.unsplash.com/photo-1512413316925-fd4b9a78a529?w=800&q=80",slug:"",gridClass:"col-span-1 row-span-1"},{id:6,title:"TEAM",category:"DESIGN",image:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",slug:"",gridClass:"col-span-1 row-span-1"}];
export default function ProjectsPageClient({lang,projects}:{lang:string;projects:P[];}){
const path=usePathname();
const list=projects.length>0?projects:dP;
const img=useProfileImage();
return(<Box sx={{bgcolor:"var(--background)",minHeight:"100vh",pb:{xs:10,md:20}}}>
<Box sx={{bgcolor:"var(--primary)",position:"relative",pt:{xs:12,md:20},pb:{xs:20,md:30},overflow:"hidden",color:"white"}}>
<WavyHeroBackground/><Container maxWidth="xl" sx={{position:"relative",zIndex:1}}>
<Grid container sx={{alignItems:"center"}} spacing={{xs:6,md:4}}><Grid size={{xs:12,md:7}}>
<motion.div initial={{opacity:0,x:-50}} animate={{opacity:1,x:0}} transition={{duration:0.8}}>
<Box sx={{position:"relative",width:"fit-content"}}><Typography variant="h1" sx={{fontWeight:900,fontSize:{xs:"3.5rem",sm:"4.5rem",md:"5.5rem"},lineHeight:1,textTransform:"uppercase",mb:2}}>MY<br/>WORK</Typography>
<AnimatedSquigglyLine width="100%" delay={0.3}/></Box>
<Stack direction="row" spacing={2} sx={{mt:4}}><Box sx={{px:2,py:0.5,bgcolor:"rgba(255,255,255,0.15)",borderRadius:1,backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.2)"}}>
<Typography variant="body2" sx={{fontWeight:600,letterSpacing:1}}>{list.length} PROJECTS</Typography></Box></Stack></motion.div></Grid>
<Grid size={{xs:12,md:5}}><motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.2}}>
<Box sx={{position:"relative",width:{xs:"90%",md:"80%"},height:{xs:420,md:620},borderRadius:4,overflow:"hidden",boxShadow:"0 30px 60px rgba(0,0,0,0.3)",mx:"auto"}}>
{img?<Image src={img} alt="P" fill style={{objectFit:"cover"}} priority/>:null}</Box></motion.div></Grid></Grid></Container>
<AnimatedWaveSeparator/></Box><Container maxWidth="xl" sx={{mt:{xs:8,md:12}}}><Box sx={{px:{xs:3,md:4}}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32">{list.map((p,i)=>(
<motion.div key={p.id} initial={{opacity:0,y:80}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:(i%2)*0.15}} className={`relative ${i%2===1?"md:translate-y-48":""}`}>
<Link href={getLocalizedHref(`/projects/${p.slug}`,path)}><Box sx={{position:"relative",height:{xs:280,md:400},borderRadius:"10px",overflow:"hidden",transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)",boxShadow:"0 30px 60px rgba(0,0,0,0.1)","&:hover":{transform:"translateY(-20px) scale(1.02)",boxShadow:"0 50px 100px rgba(16,106,90,0.2)"}}}>
<Image src={p.image||"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"} alt={p.title} fill className="object-cover" priority={i<2}/>
<Box sx={{position:"absolute",inset:0,bgcolor:"rgba(16,106,90,0.3)",backdropFilter:"blur(8px)",opacity:0,transition:"all 0.5s ease",display:"flex",alignItems:"center",justifyContent:1,"&:hover":{opacity:1}}}>
<Typography variant="h4" sx={{color:"white",fontWeight:900,textTransform:"uppercase"}}>{p.title}</Typography></Box></Box></Link></motion.div>))}
</div></Box></Container></Box>);}

