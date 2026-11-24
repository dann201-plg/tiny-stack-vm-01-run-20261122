// Tiny stack VM (ISA v1): runs each /input/<id>/program.bin on its input.bin,
// writes /output/<id>/stdout.bin and /output/<id>/exit.txt. Values wrap mod 2^32.
import{readdirSync,readFileSync,writeFileSync,mkdirSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
function r(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,pc=0,t=0;
const n=p.length,e=new TextEncoder(),d=x=>({o:o.slice(0,l),c:x});
for(;;){
if(t==1e6)return d(10);
if(pc<0||pc>=n)return d(9);
const a=p[pc],m=a==1?1:a==2?4:a>47&&a<52?2:0;
if(!(a<8||a>15&&a<35&&a!=31||a>47&&a<53||a>63&&a<66||a>79&&a<84))return d(5);
if(pc+m>=n)return d(9);
t++;
const x=pc+1+m;
let g=0,h=0;
if(a==7){g=3;h=3}
else if(a==5||a==6||a==65||a>15&&a<35&&a!=23&&a!=27){g=2;h=a==5?2:a==6?3:a==65?0:1}
else if(a==3||a==4||a==23||a==27||a==49||a==50||a==64||a==80||a==81||a==83){g=1;h=a==4?2:a==23||a==27||a==64?1:0}
else if(a==1||a==2||a==82)h=1;
if(s<g)return d(2);
if(s-g+h>256)return d(3);
pc=x;
switch(a){
case 0:return d(0);
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{const y=(p[x-2]|p[x-1]<<8)<<16>>16;let k=1;if(a!=48){const v=D[--s];k=a==49?v==0:v!=0}if(k)pc=x+y;break}
case 51:if(c==64)return d(7);C[c++]=x;pc=p[x-2]|p[x-1]<<8;break;
case 52:if(c==0)return d(8);pc=C[--c];break;
case 64:{const v=D[s-1];if(v<0||v>255)return d(6);D[s-1]=M[v];break}
case 65:{const v=D[s-1],w=D[s-2];if(v<0||v>255)return d(6);s-=2;M[v]=w;break}
case 80:{const b=e.encode(String(D[s-1]));if(l+b.length>65536)return d(11);s--;o.set(b,l);l+=b.length;break}
case 81:if(l+1>65536)return d(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return d(D[--s]&255);
default:{
const b=D[s-1],v=D[s-2];let z;
if(a==16)z=(v+b)|0;
else if(a==17)z=(v-b)|0;
else if(a==18)z=Math.imul(v,b);
else if(a==19){if(b==0)return d(4);z=v==-2147483648&&b==-1?v:(v/b)|0}
else if(a==20){if(b==0)return d(4);z=b==-1?0:(v%b)|0}
else if(a==21){if(b==0)return d(4);z=Math.floor((v>>>0)/(b>>>0))|0}
else if(a==22){if(b==0)return d(4);z=((v>>>0)%(b>>>0))|0}
else if(a==24)z=v&b;
else if(a==25)z=v|b;
else if(a==26)z=v^b;
else if(a==28)z=v<<(b&31);
else if(a==29)z=v>>(b&31);
else if(a==30)z=(v>>>(b&31))|0;
else if(a==32)z=v==b?1:0;
else if(a==33)z=v<b?1:0;
else z=(v>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=z;
}
}
}
}
for(const id of readdirSync(I).sort()){const z=r(new Uint8Array(readFileSync(join(I,id,"program.bin"))),new Uint8Array(readFileSync(join(I,id,"input.bin"))));mkdirSync(join(O,id),{recursive:true});writeFileSync(join(O,id,"stdout.bin"),z.o);writeFileSync(join(O,id,"exit.txt"),z.c+"\n")}
