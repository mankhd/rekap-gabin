const DEFAULT_PRODUCTS = [
  {id:"coklat",name:"Coklat",price:10000,cost:7000},
  {id:"stroberi",name:"Stroberi",price:10000,cost:7000},
  {id:"vanila",name:"Vanila",price:10000,cost:7000},
  {id:"matcha",name:"Matcha",price:10000,cost:7000},
  {id:"oreo",name:"Oreo",price:10000,cost:7000},
  {id:"mangga",name:"Mangga",price:10000,cost:7000},
  {id:"milo",name:"Milo",price:10000,cost:7000}
];

const SAMPLE = [
  {date:"2026-09-26", sales:{coklat:1,stroberi:1,vanila:1,matcha:1,oreo:1,mangga:0,milo:0}},
  {date:"2026-09-27", sales:{coklat:2,stroberi:2,vanila:0,matcha:1,oreo:2,mangga:0,milo:0}},
  {date:"2026-09-28", sales:{coklat:1,stroberi:0,vanila:0,matcha:1,oreo:2,mangga:0,milo:1}},
  {date:"2026-09-29", sales:{coklat:2,stroberi:4,vanila:2,matcha:2,oreo:4,mangga:1,milo:3}}
];

let products = JSON.parse(localStorage.getItem("gabin_products") || "null") || DEFAULT_PRODUCTS;
let records = JSON.parse(localStorage.getItem("gabin_records") || "null") || SAMPLE;
let currentPeriod = "today";
let chart;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => "Rp" + Math.round(n||0).toLocaleString("id-ID");
const fmtDate = s => new Date(s+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"});
const todayISO = () => { const d=new Date(); const z=n=>String(n).padStart(2,"0"); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`; };
function save(){localStorage.setItem("gabin_products",JSON.stringify(products));localStorage.setItem("gabin_records",JSON.stringify(records));}
function calc(r){
  let sold=0,revenue=0,cost=0;
  products.forEach(p=>{const q=Number(r.sales?.[p.id]||0);sold+=q;revenue+=q*p.price;cost+=q*p.cost});
  return {sold,revenue,cost,profit:revenue-cost};
}
function filteredRecords(){
  const t=$("#dashboardDate")?.value || todayISO();
  if(currentPeriod==="today") return records.filter(r=>r.date===t);
  if(currentPeriod==="month") return records.filter(r=>r.date.slice(0,7)===t.slice(0,7));
  return [...records];
}
function aggregate(rs){return rs.reduce((a,r)=>{const c=calc(r);a.sold+=c.sold;a.revenue+=c.revenue;a.cost+=c.cost;a.profit+=c.profit;return a},{sold:0,revenue:0,cost:0,profit:0});}
function renderStats(){
  const a=aggregate(filteredRecords());
  $("#statSold").textContent=a.sold.toLocaleString("id-ID");
  $("#statRevenue").textContent=money(a.revenue);
  $("#statCost").textContent=money(a.cost);
  $("#statProfit").textContent=money(a.profit);
  $("#marginLabel").textContent=`margin ${a.revenue?Math.round(a.profit/a.revenue*100):0}%`;
  $("#periodLabel").textContent=currentPeriod==="today"?"Hari Ini":currentPeriod==="month"?"Bulan Ini":"Semua Data";
}
function renderProductBars(){
  const totals={};products.forEach(p=>totals[p.id]=records.reduce((n,r)=>n+Number(r.sales?.[p.id]||0),0));
  const max=Math.max(1,...Object.values(totals));
  $("#productBars").innerHTML=products.map(p=>`<div class="bar-row"><span>${p.name}</span><div class="bar-track"><div class="bar-fill" style="width:${totals[p.id]/max*100}%"></div></div><b>${totals[p.id]}</b></div>`).join("");
}
function renderDailyTable(){
  const rs=[...records].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,8);
  $("#dailyTable").innerHTML=rs.length?rs.map(r=>{const c=calc(r);return `<tr><td>${fmtDate(r.date)}</td><td>${c.sold} pcs</td><td class="money">${money(c.revenue)}</td><td>${money(c.cost)}</td><td class="profit-text">${money(c.profit)}</td></tr>`}).join(""):`<tr><td colspan="5">Belum ada data penjualan.</td></tr>`;
}
function renderChart(){
  const rs=[...records].sort((a,b)=>a.date.localeCompare(b.date)).slice(-14);
  const ctx=$("#profitChart");
  if(chart)chart.destroy();
  chart=new Chart(ctx,{type:"line",data:{labels:rs.map(r=>new Date(r.date+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"short"})),datasets:[{label:"Keuntungan",data:rs.map(r=>calc(r).profit),borderWidth:2,pointRadius:3,tension:.35,fill:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:"#68717c",font:{size:9}}},y:{grid:{color:"rgba(120,130,140,.10)"},ticks:{color:"#68717c",font:{size:9},callback:v=>money(v)}}}}});
  $("#chartBadge").textContent=`${rs.length} hari`;
}
function renderHistory(){
  const q=($("#historySearch")?.value||"").toLowerCase();
  const rs=[...records].filter(r=>r.date.includes(q)).sort((a,b)=>b.date.localeCompare(a.date));
  $("#historyTable").innerHTML=rs.length?rs.map(r=>{const c=calc(r);return `<tr><td>${fmtDate(r.date)}</td><td>${c.sold} pcs</td><td>${money(c.revenue)}</td><td>${money(c.cost)}</td><td class="profit-text">${money(c.profit)}</td><td><button class="ghost-btn edit-record" data-date="${r.date}">Edit</button> <button class="danger-btn delete-record" data-date="${r.date}">Hapus</button></td></tr>`}).join(""):`<tr><td colspan="6">Tidak ada data.</td></tr>`;
}
function renderProducts(){
  $("#productsGrid").innerHTML=products.map((p,i)=>`<div class="product-card"><div class="product-head"><div><div class="product-dot">${p.name[0]}</div></div><h3>${p.name}</h3></div><div class="price-row"><label>Harga Jual<input type="number" data-product="${p.id}" data-field="price" value="${p.price}" min="0"></label><label>Modal / pcs<input type="number" data-product="${p.id}" data-field="cost" value="${p.cost}" min="0"></label></div><button class="ghost-btn product-save" data-save-product="${p.id}">Simpan Harga</button></div>`).join("");
}
function renderInputs(date=todayISO(), values={}){
  $("#saleDate").value=date;
  $("#productInputs").innerHTML=products.map(p=>`<div class="product-input"><div><label>${p.name}</label><small>${money(p.price)} jual • ${money(p.cost)} modal</small></div><input class="qty" type="number" min="0" step="1" value="${values[p.id]||0}" data-qty="${p.id}"></div>`).join("");
  updateFormSummary();
}
function updateFormSummary(){
  const r={sales:{}};$$("[data-qty]").forEach(i=>r.sales[i.dataset.qty]=Number(i.value)||0);
  const c=calc(r);$("#formSold").textContent=`${c.sold} pcs`;$("#formRevenue").textContent=money(c.revenue);$("#formCost").textContent=money(c.cost);$("#formProfit").textContent=money(c.profit);
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function go(section){
  $$(".section").forEach(s=>s.classList.remove("active"));$(`#section-${section}`).classList.add("active");
  $$(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.section===section));
  $("#pageTitle").textContent={dashboard:"Dashboard",sales:"Input Penjualan",history:"Riwayat Penjualan",products:"Produk & Harga",settings:"Pengaturan"}[section];
  $("#sidebar").classList.remove("open");
  if(section==="dashboard"){renderStats();renderProductBars();renderDailyTable();renderChart()}
}
function downloadJSON(){
  const blob=new Blob([JSON.stringify({products,records},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="backup-gabin-dashboard.json";a.click();URL.revokeObjectURL(a.href);
}
function init(){
  $("#todayLabel").textContent=new Date().toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});
  $("#dashboardDate").value=todayISO();$("#saleDate").value=todayISO();
  $$(".nav-item").forEach(n=>n.addEventListener("click",()=>go(n.dataset.section)));
  $$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
  $("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
  $$(".period").forEach(b=>b.onclick=()=>{$$(".period").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentPeriod=b.dataset.period;renderStats()});
  $("#dashboardDate").onchange=renderStats;
  $("#salesForm").onsubmit=e=>{e.preventDefault();const date=$("#saleDate").value,sales={};$$("[data-qty]").forEach(i=>sales[i.dataset.qty]=Number(i.value)||0);const idx=records.findIndex(r=>r.date===date);if(idx>=0)records[idx].sales=sales;else records.push({date,sales});save();toast("Penjualan berhasil disimpan");renderStats();renderDailyTable();renderProductBars();renderChart();go("dashboard")};
  $("#productInputs").addEventListener("input",updateFormSummary);
  $("#historySearch").oninput=renderHistory;
  $("#historyTable").addEventListener("click",e=>{const d=e.target.dataset.date;if(!d)return;if(e.target.classList.contains("delete-record")){if(confirm(`Hapus data ${fmtDate(d)}?`)){records=records.filter(r=>r.date!==d);save();renderHistory();renderStats();renderDailyTable();renderChart();toast("Data dihapus")}}else if(e.target.classList.contains("edit-record")){const r=records.find(x=>x.date===d);renderInputs(d,r?.sales||{});go("sales")}});
  $("#productsGrid").addEventListener("click",e=>{const id=e.target.dataset.saveProduct;if(!id)return;const p=products.find(x=>x.id===id);const card=e.target.closest(".product-card");p.price=Number(card.querySelector('[data-field="price"]').value)||0;p.cost=Number(card.querySelector('[data-field="cost"]').value)||0;save();renderInputs($("#saleDate").value);renderProducts();renderStats();renderChart();toast(`Harga ${p.name} diperbarui`)});
  $("#exportBtn").onclick=downloadJSON;$("#backupBtn").onclick=downloadJSON;
  $("#clearBtn").onclick=()=>{if(confirm("Hapus seluruh riwayat penjualan? Data tidak bisa dikembalikan kecuali dari backup.")){records=[];save();renderHistory();renderStats();renderDailyTable();renderChart();toast("Semua data dihapus")}};
  $("#importInput").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const d=JSON.parse(rd.result);if(!d.products||!d.records)throw Error();products=d.products;records=d.records;save();renderAll();toast("Backup berhasil diimpor")}catch{toast("File backup tidak valid")}};rd.readAsText(f)};
  $("#themeToggle").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("gabin_theme",document.body.classList.contains("light")?"light":"dark")};
  if(localStorage.getItem("gabin_theme")==="light")document.body.classList.add("light");
  renderAll();
}
function renderAll(){renderStats();renderProductBars();renderDailyTable();renderChart();renderHistory();renderProducts();renderInputs();}
init();
