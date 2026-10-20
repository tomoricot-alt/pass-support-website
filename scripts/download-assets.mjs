import {readFile,mkdir,writeFile,stat} from 'node:fs/promises';
const entries=Object.entries(JSON.parse(await readFile(new URL('../assets.json',import.meta.url),'utf8')));
const queue=[...entries];
await Promise.all(Array.from({length:5},async()=>{while(queue.length){const [url,path]=queue.shift();const dest=new URL('../public'+path,import.meta.url);try{if((await stat(dest)).size>0)continue}catch{}await mkdir(new URL('.',dest),{recursive:true});let error;for(let attempt=0;attempt<3;attempt++){try{const r=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw new Error(`HTTP ${r.status}`);await writeFile(dest,Buffer.from(await r.arrayBuffer()));error=null;break}catch(e){error=e}}if(error)throw error;}}));
console.log(`Verified ${entries.length} site images`);
