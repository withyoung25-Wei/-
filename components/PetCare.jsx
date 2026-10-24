"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { menus } from '../lib/menus';

function localDate(date = new Date()) {
 return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export default function PetCare() {
 const [currentPet, setCurrentPet] = useState('dog');
 const [bookingPet, setBookingPet] = useState('dog');
 const [service, setService] = useState('0');
 const [result, setResult] = useState('');
 const [today, setToday] = useState('');
 const [year, setYear] = useState(2026);
 const [bookingRequest, setBookingRequest] = useState(0);
 const dialogRef = useRef(null);
 const formRef = useRef(null);
 useEffect(() => {setToday(localDate()); setYear(new Date().getFullYear());}, []);
 useEffect(() => {
  if (bookingRequest > 0 && dialogRef.current && !dialogRef.current.open) {
   dialogRef.current.showModal();
  }
 }, [bookingRequest]);
 function resetBooking() {
  formRef.current?.reset();
  formRef.current?.elements.date.setCustomValidity('');
  formRef.current?.elements.time.setCustomValidity('');
  setResult('');
 }
 function openBooking(index) {
  resetBooking();
  setBookingPet(currentPet);
  setService(String(index));
  setToday(localDate());
  setBookingRequest(request => request + 1);
 }
 function closeOnBackdrop(event) {
  if (event.target !== event.currentTarget) return;
  const rect = event.currentTarget.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialogRef.current.close();
 }
 function submitBooking(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.elements.date.value < localDate()) {
   form.elements.date.setCustomValidity('请选择今天或之后的日期'); form.elements.date.reportValidity(); return;
  }
  const arrival = new Date(form.elements.date.value + 'T' + form.elements.time.value + ':00+08:00');
  if (arrival.getTime() <= Date.now()) {
   form.elements.time.setCustomValidity('这个时间已经过去啦，请选择之后的到店时间');
   form.elements.time.reportValidity();
   return;
  }
  const data = new FormData(form);
  const petType = data.get('petType');
  const selectedService = Number(data.get('service'));
  setResult('♡ ' + data.get('petName') + ' 的预约预览：期望到店时间 ' + data.get('date') + ' ' + data.get('time') + '，' + menus[petType].titles[selectedService] + '。本演示未提交预约，请通过门店正式渠道确认时间及费用。');
 }
 return (<>

<div className="wrap">
<header><a className="brand" href="#home" aria-label="毛茸茸首页"><span className="brand-mark">✿</span><span className="brand-name">毛茸茸<small>FURRY CLUB</small></span></a><nav aria-label="主导航"><a href="#services">洗护服务</a><a href="#reviews">顾客心声</a><a href="#about">关于我们</a><a href="#space">门店环境</a><a href="#visit">到店指南</a></nav><button className="btn small-btn" onClick={() => openBooking(0)}>预约洗护 <span>↗</span></button></header><main>
<section className="hero" id="home"><div><div className="eyebrow">A LITTLE CARE, A LOT OF LOVE</div><h1>把小脏包，<br />变回<em>香香宝贝。</em></h1><p className="intro">洗掉撒欢的痕迹，留下被爱的香气。<br />在毛茸茸，让每一次洗护都成为温柔的小假期。</p><div className="hero-actions"><button className="btn" onClick={() => openBooking(0)}>预约一场变美之旅 <span>↗</span></button><a className="text-link" href="#services">探索洗护服务 ↘</a></div><div className="hero-note"><span>一宠一消毒</span><span>温柔低压洗护</span><span>猫犬分区照护</span></div></div><div className="hero-visual"><span className="spark" aria-hidden="true">✳</span><img src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85" alt="阳光下毛发蓬松的金毛犬" fetchPriority="high" /><div className="round-stamp">HAPPY PETS<b>☺</b>HAPPY DAYS</div><span className="photo-label">FRESH COAT. HAPPY SOUL.</span><div className="bubble">今天也是蓬松的一天！<small>Soft fur, big smiles.</small></div></div></section>
<div className="promise"><div className="promise-item"><span className="promise-icon">♧</span><div><strong>温和洗护</strong><small>为敏感的小家伙多想一点</small></div></div><div className="promise-item"><span className="promise-icon">✧</span><div><strong>细致清洁</strong><small>从小耳朵到软软的爪子</small></div></div><div className="promise-item"><span className="promise-icon">♡</span><div><strong>耐心陪伴</strong><small>跟着它们的节奏慢慢来</small></div></div><div className="promise-item"><span className="promise-icon">⌂</span><div><strong>安心空间</strong><small>干净、舒适，也充满善意</small></div></div></div>
<section className="section" id="services"><div className="section-top"><div><div className="kicker">OUR SERVICES / 洗护菜单</div><h2>每一种可爱，都值得用心照顾。</h2><p className="section-sub">从日常清洁到精致造型，找到属于它的蓬松配方。</p></div><div className="tabs" role="group" aria-label="宠物类型"><button className={currentPet === 'dog' ? 'tab active' : 'tab'} onClick={() => setCurrentPet('dog')} aria-pressed={currentPet === 'dog'}>汪汪洗护</button><button className={currentPet === 'cat' ? 'tab active' : 'tab'} onClick={() => setCurrentPet('cat')} aria-pressed={currentPet === 'cat'}>喵喵洗护</button></div></div><div className="services"><article className="service"><div className="service-image"><img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=750&q=80" alt="可爱的小型犬" loading="lazy" /></div><div className="service-body"><span className="service-num">01 / FRESH & CLEAN</span><h3>{menus[currentPet].titles[0]}</h3><p>{menus[currentPet].descs[0]}</p><div className="service-bottom"><span className="price">¥<span>{menus[currentPet].prices[0]}</span> <small>起 / 次</small></span><button className="arrow-btn" onClick={() => openBooking(0)} aria-label={'选择' + menus[currentPet].titles[0]}>↗</button></div></div></article><article className="service"><div className="service-image"><img src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=750&q=80" alt="精心打理毛发的小狗" loading="lazy" /></div><span className="popular">✦ 人气之选</span><div className="service-body"><span className="service-num">02 / FLUFF & STYLE</span><h3>{menus[currentPet].titles[1]}</h3><p>{menus[currentPet].descs[1]}</p><div className="service-bottom"><span className="price">¥<span>{menus[currentPet].prices[1]}</span> <small>起 / 次</small></span><button className="arrow-btn" onClick={() => openBooking(1)} aria-label={'选择' + menus[currentPet].titles[1]}>↗</button></div></div></article><article className="service"><div className="service-image"><img src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&w=750&q=80" alt="在绿地上放松的宠物犬" loading="lazy" /></div><div className="service-body"><span className="service-num">03 / EXTRA LOVE</span><h3>{menus[currentPet].titles[2]}</h3><p>{menus[currentPet].descs[2]}</p><div className="service-bottom"><span className="price">¥<span>{menus[currentPet].prices[2]}</span> <small>起 / 次</small></span><button className="arrow-btn" onClick={() => openBooking(2)} aria-label={'选择' + menus[currentPet].titles[2]}>↗</button></div></div></article></div><p className="price-note">* 此为概念店演示价目，按小型宠物展示；实际费用需根据体型、毛量、毛结及护理需求评估。</p></section>
<section className="reviews section" id="reviews"><div className="reviews-heading"><div><div className="kicker">KIND WORDS / 顾客心声</div><h2>每一次放心托付，都是喜欢的理由。</h2><p className="section-sub">从第一次见面，到熟门熟路的摇尾巴。</p></div><div className="review-score"><strong>5.0</strong><span>★★★★★<small>示例评分</small></span></div></div><div className="review-grid"><article className="review-card"><div className="review-stars" aria-label="5 星评价">★★★★★</div><blockquote>“以前洗澡要哄半天，这次居然自己跟着店员进去啦。洗完香香软软，回家还开心地跑了好几圈。”</blockquote><div className="review-author"><span className="review-avatar">豆</span><div><strong>豆豆的家长</strong><small>比熊 · 日常洗护体验</small></div><span className="review-paw">♡</span></div></article><article className="review-card"><div className="review-stars" aria-label="5 星评价">★★★★★</div><blockquote>“沟通很细心，会先了解团子的皮肤情况和怕不怕吹风。全程都温温柔柔的，接回家摸起来像一朵小云。”</blockquote><div className="review-author"><span className="review-avatar peach">团</span><div><strong>团子的家长</strong><small>英短 · 温和洗护体验</small></div><span className="review-paw">♡</span></div></article><article className="review-card"><div className="review-stars" aria-label="5 星评价">★★★★★</div><blockquote>“修剪前会一起确认想要的造型，细节也照顾到了。最喜欢这里不催不赶，会等毛孩子慢慢适应。”</blockquote><div className="review-author"><span className="review-avatar sage">米</span><div><strong>米粒的家长</strong><small>柯基 · 洗护造型体验</small></div><span className="review-paw">♡</span></div></article></div><p className="reviews-note">以上为概念页面展示用的示例评价与评分，非真实顾客反馈。</p></section>
<section className="about" id="about"><div className="about-photo"><img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=85" alt="两只快乐奔跑的小狗" loading="lazy" /><span>A GOOD DAY TO BE A PET. ♡</span></div><div><div className="kicker">MORE THAN GROOMING</div><h2>我们照顾的不只是毛发，<br />还有它的小情绪。</h2><p>有些小家伙喜欢水，有些需要再多一点勇气。<br />我们相信，好的洗护从认识它开始。先交个朋友，再慢慢洗香香，让它带着轻松的心情来，摇着尾巴回家。</p><div className="steps"><div><b>01 / HELLO</b>先熟悉，再开始</div><div><b>02 / RELAX</b>多观察，少催促</div><div><b>03 / ALL DONE</b>香喷喷，回家啦</div></div></div></section>
<section className="space-section" id="space"><div className="section-top"><div><div className="kicker">OUR SPACE / 门店一角</div><h2>让每一只小家伙，<br />都能自在一点。</h2><p className="section-sub">从友好迎接、温柔洗护到安静休息，给它一段舒服的小假期。</p></div><p className="space-disclaimer">空间氛围示意<br /><span>概念门店图片，实际环境以门店为准</span></p></div><div className="space-grid"><article className="space-card"><div className="space-image"><Image src="/images/salon-reception.webp" alt="明亮温暖的宠物门店接待区" width={1400} height={933} sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw" /></div><div className="space-caption"><span>01 / SAY HELLO</span><h3>在阳光里，先认识一下</h3><p>留一点时间熟悉环境和新朋友。</p></div></article><article className="space-card"><div className="space-image"><Image src="/images/salon-grooming.webp" alt="整洁专业的宠物洗护工作区" width={1400} height={933} sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw" /></div><div className="space-caption"><span>02 / GENTLE CARE</span><h3>干净明亮的洗护区</h3><p>工具收纳有序，护理过程更安心。</p></div></article><article className="space-card"><div className="space-image"><Image src="/images/salon-lounge.webp" alt="为宠物准备的柔软休息角落" width={1400} height={933} sizes="(max-width: 650px) 100vw, (max-width: 900px) 50vw, 33vw" /></div><div className="space-caption"><span>03 / TAKE A BREATH</span><h3>也有可以放松的小角落</h3><p>累了就歇一会儿，按自己的节奏来。</p></div></article></div></section>
<section className="visit" id="visit"><div><div className="kicker">COME SAY HELLO</div><h2>下一次见面，带它一起来。</h2><p>喜欢干净的毛毛，也喜欢沾着草香的小脚丫。<br />营业时间示例 · 周二至周日 10:00—19:00<br />概念门店 · 地址与联系方式待店主补充</p></div><div className="visit-action"><button className="btn dark" onClick={() => openBooking(0)}>为我家宝贝预约 <span>↗</span></button><small>预约演示 · 无需付款 · 不会发送真实订单</small></div></section>
</main><footer><span className="footer-brand">✿ 毛茸茸 FURRY CLUB</span><span>把每一份小小的信任，照顾得毛茸茸。</span><span>© <span>{year}</span> 毛茸茸 · 概念店展示页面</span></footer>
</div>
<dialog ref={dialogRef} onClick={closeOnBackdrop} onClose={resetBooking} id="booking" aria-labelledby="booking-title"><div className="dialog-top"><h2 id="booking-title">预约一点小美好</h2><button className="close" type="button" onClick={() => dialogRef.current.close()} aria-label="关闭预约">×</button></div><p className="form-note">这是本地预约演示。填写内容仅用于当前页面展示，关闭后不会保存，也不会发送到门店。</p><form ref={formRef} id="booking-form" onSubmit={submitBooking} onInput={() => {setResult(""); formRef.current?.elements.time.setCustomValidity("");}}><label>宝贝的名字<input name="petName" placeholder="例如：奶油" maxLength="24" required autoComplete="off" /></label><label>宝贝类型<select name="petType" value={bookingPet} onChange={event => {setBookingPet(event.target.value); setService("0"); setResult("");}}><option value="dog">狗狗</option><option value="cat">猫咪</option></select></label><label>选择服务<select name="service" value={service} onChange={event => {setService(event.target.value); setResult("");}}>{menus[bookingPet].titles.map((title, index) => <option key={title} value={index}>{title} · ¥{menus[bookingPet].prices[index]} 起</option>)}</select></label><label>期望到店日期<input name="date" type="date" min={today} onInput={event => event.target.setCustomValidity("")} required /></label><label>期望到店时间<input name="time" type="time" min="10:00" max="19:00" required aria-describedby="arrival-note" /></label><p className="form-note" id="arrival-note">请选择 10:00—19:00 内的到店时间（北京时间），实际安排以门店确认为准。</p><button className="btn" type="submit">生成预约预览 <span>↗</span></button></form><div id="result" role="status" aria-live="polite">{result}</div></dialog>

</>);
}
