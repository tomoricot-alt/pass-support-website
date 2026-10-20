interface Env { RESEND_API_KEY?: string; CONTACT_TO?: string; CONTACT_FROM?: string; TURNSTILE_SECRET?: string }
export const onRequestPost: PagesFunction<Env> = async ({request,env}) => {
 const reply=(data:object,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
 if(request.headers.get('origin')!==new URL(request.url).origin)return reply({error:'送信元を確認できません。'},403);
 if(Number(request.headers.get('content-length')||0)>20000)return reply({error:'入力内容が長すぎます。'},413);
 let form:FormData;try{form=await request.formData()}catch{return reply({error:'入力内容をご確認ください。'},400)}
 if(form.get('website'))return reply({ok:true});
 const name=String(form.get('Name')||'').trim(),email=String(form.get('Email')||'').trim(),message=String(form.get('Message')||'').trim();
 if(!name||name.length>100||!/^\S+@\S+\.\S+$/.test(email)||email.length>254||!message||message.length>10000)return reply({error:'必須項目と入力内容をご確認ください。'},400);
 if(!env.RESEND_API_KEY||!env.CONTACT_TO||!env.CONTACT_FROM)return reply({error:'現在フォームの送信設定を準備中です。お手数ですが公式サイトのお問い合わせをご利用ください。'},503);
 try{
 const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.CONTACT_FROM,to:[env.CONTACT_TO],reply_to:email,subject:'【パスサポート】公式サイトからのお問い合わせ',text:`お名前: ${name}\nメール: ${email}\n\n${message}`})});
 if(!sent.ok)return reply({error:'送信できませんでした。時間をおいて再度お試しください。'},502);
 return reply({ok:true});
 }catch{return reply({error:'通信に失敗しました。時間をおいて再度お試しください。'},502)}
};
