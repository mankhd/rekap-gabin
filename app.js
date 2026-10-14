const DEFAULT_PRODUCTS = [
  {
    "id": "coklat",
    "name": "Coklat",
    "price": 10000,
    "cost": 7000,
    "stock": 16
  },
  {
    "id": "stroberi",
    "name": "Stroberi",
    "price": 10000,
    "cost": 7000,
    "stock": 0
  },
  {
    "id": "vanila",
    "name": "Vanila",
    "price": 10000,
    "cost": 7000,
    "stock": 0
  },
  {
    "id": "matcha",
    "name": "Matcha",
    "price": 10000,
    "cost": 7000,
    "stock": 2
  },
  {
    "id": "oreo",
    "name": "Oreo",
    "price": 10000,
    "cost": 7000,
    "stock": 9
  },
  {
    "id": "mangga",
    "name": "Mangga",
    "price": 10000,
    "cost": 7000,
    "stock": 21
  },
  {
    "id": "milo",
    "name": "Milo",
    "price": 10000,
    "cost": 7000,
    "stock": 0
  },
  {
    "id": "durian",
    "name": "Durian",
    "price": 10000,
    "cost": 7000,
    "stock": 23
  },
  {
    "id": "blueberry",
    "name": "Blueberry",
    "price": 10000,
    "cost": 7000,
    "stock": 0
  }
];

const SAMPLE = [
  {
    "date": "2026-09-26",
    "sales": {
      "milo": 0,
      "oreo": 1,
      "coklat": 1,
      "mangga": 0,
      "matcha": 1,
      "vanila": 1,
      "stroberi": 1
    }
  },
  {
    "date": "2026-09-27",
    "sales": {
      "milo": 0,
      "oreo": 2,
      "coklat": 2,
      "mangga": 0,
      "matcha": 1,
      "vanila": 0,
      "stroberi": 2
    }
  },
  {
    "date": "2026-09-28",
    "sales": {
      "milo": 1,
      "oreo": 2,
      "coklat": 1,
      "mangga": 0,
      "matcha": 1,
      "vanila": 0,
      "stroberi": 0
    }
  },
  {
    "date": "2026-09-29",
    "sales": {
      "milo": 3,
      "oreo": 4,
      "coklat": 2,
      "mangga": 1,
      "matcha": 2,
      "vanila": 2,
      "stroberi": 4
    }
  },
  {
    "date": "2026-09-30",
    "sales": {
      "milo": 0,
      "oreo": 4,
      "coklat": 4,
      "mangga": 0,
      "matcha": 0,
      "vanila": 1,
      "stroberi": 3
    }
  },
  {
    "date": "2026-10-01",
    "sales": {
      "milo": 1,
      "oreo": 2,
      "coklat": 2,
      "mangga": 1,
      "matcha": 1,
      "vanila": 2,
      "stroberi": 1
    }
  },
  {
    "date": "2026-10-02",
    "sales": {
      "milo": 0,
      "oreo": 1,
      "coklat": 1,
      "mangga": 0,
      "matcha": 1,
      "vanila": 1,
      "stroberi": 1
    }
  },
  {
    "date": "2026-10-04",
    "sales": {
      "milo": 1,
      "oreo": 1,
      "coklat": 1,
      "mangga": 0,
      "matcha": 1,
      "vanila": 1,
      "stroberi": 1
    }
  },
  {
    "date": "2026-10-05",
    "sales": {
      "milo": 0,
      "oreo": 0,
      "coklat": 1,
      "mangga": 0,
      "matcha": 1,
      "vanila": 0,
      "stroberi": 1
    }
  },
  {
    "date": "2026-10-06",
    "sales": {
      "milo": 1,
      "oreo": 4,
      "coklat": 4,
      "mangga": 0,
      "matcha": 1,
      "vanila": 2,
      "stroberi": 0
    }
  },
  {
    "date": "2026-10-07",
    "sales": {
      "milo": 0,
      "oreo": 1,
      "coklat": 1,
      "mangga": 0,
      "matcha": 1,
      "vanila": 1,
      "stroberi": 1
    }
  },
  {
    "date": "2026-10-08",
    "sales": {
      "milo": 1,
      "oreo": 0,
      "coklat": 0,
      "mangga": 1,
      "matcha": 0,
      "vanila": 1,
      "stroberi": 2
    }
  },
  {
    "date": "2026-10-10",
    "sales": {
      "milo": 0,
      "oreo": 1,
      "coklat": 1,
      "mangga": 1,
      "matcha": 1,
      "vanila": 0,
      "stroberi": 1
    }
  },
  {
    "date": "2026-10-11",
    "sales": {
      "milo": 1,
      "oreo": 2,
      "coklat": 2,
      "mangga": 0,
      "matcha": 2,
      "vanila": 0,
      "stroberi": 3
    }
  }
];

const storedProducts = JSON.parse(localStorage.getItem("gabin_products") || "null") || [];
let products = DEFAULT_PRODUCTS.map(d => ({...d, ...(storedProducts.find(p=>p.id===d.id)||{})}));
let records = JSON.parse(localStorage.getItem("gabin_records") || "null") || SAMPLE;
let currentPeriod = "today";
let chart;

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => "Rp" + Math.round(n||0).toLocaleString("id-ID");
const fmtDate = s => new Date(s+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"});
const todayISO = () => { const d=new Date(); const z=n=>String(n).padStart(2,"0"); return `${d.getFullYear()}-${z(d.getMonth()+1)}-${z(d.getDate())}`; };
function save(){localStorage.setItem("gabin_products",JSON.stringify(products));localStorage.setItem("gabin_records",JSON.stringify(records));}
function adjustStock(quantities, multiplier=-1){
  products.forEach(p=>{const q=Math.max(0,Number(quantities?.[p.id])||0);if(q){p.stock=Math.max(0,(Number(p.stock)||0)+(multiplier*q));}});
  save(); products.forEach(p=>cloudSaveProduct(p)); renderProducts();
}
function regularSalesFor(record){const result={};products.forEach(p=>result[p.id]=Math.max(0,Number(record?.sales?.[p.id])||0));return result;}
function adjustStockDelta(oldQty,newQty){
  products.forEach(p=>{const delta=(Number(newQty?.[p.id])||0)-(Number(oldQty?.[p.id])||0);if(delta){p.stock=Math.max(0,(Number(p.stock)||0)-delta);}});
  save();products.forEach(p=>cloudSaveProduct(p));renderProducts();
}
function calc(r){
  let sold=0,revenue=0,cost=0;
  products.forEach(p=>{const q=Number(r.sales?.[p.id]||0);sold+=q;revenue+=q*p.price;cost+=q*p.cost});
  getOnlineOrders(r).forEach(o=>products.forEach(p=>{const q=Number(o.quantities?.[p.id]||0);sold+=q;revenue+=q*p.price;cost+=q*p.cost;}));
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
  $("#productsGrid").innerHTML=products.map(p=>`<div class="product-card"><div class="product-head"><div><div class="product-dot">${p.name[0]}</div></div><h3>${p.name}</h3><span class="stock-pill">Stok: ${Number(p.stock)||0}</span></div><div class="price-row"><label>Harga Jual<input type="number" data-product="${p.id}" data-field="price" value="${p.price}" min="0"></label><label>Modal / pcs<input type="number" data-product="${p.id}" data-field="cost" value="${p.cost}" min="0"></label><label class="stock-field">Stok tersedia<input type="number" data-product="${p.id}" data-field="stock" value="${Number(p.stock)||0}" min="0" step="1"></label></div><button class="ghost-btn product-save" data-save-product="${p.id}">Simpan Harga & Stok</button></div>`).join("");
  renderStockMessage();
}
function renderStockMessage(){
  const d=new Date();
  const hari=d.toLocaleDateString('id-ID',{weekday:'long'}).toUpperCase();
  const tanggal=d.toLocaleDateString('id-ID',{day:'2-digit',month:'long',year:'numeric'}).toUpperCase();
  const available=products.filter(p=>Number(p.stock)>0).map(p=>`- ${p.name}: ${p.stock} pcs`);
  const msg=`*${hari}, ${tanggal}*

Halo warga Pekanbaru! 🍦❤️
Ice cream gabin premium all variant cuma 10K aja! Tebal, creamy, dan cocok buat nemenin harimu 😋

Buka setiap hari jam 08.00–21.00
(Tersedia di: Grab, Gojek, Shopee)
Siap Antar 🚀

Berikut stock tersedia saat ini:
${available.length?available.join('\n'):'- Stok sedang kosong'}`;
  const el=document.querySelector('#stockMessage'); if(el)el.value=msg;
}

function renderInputs(date=todayISO(), values={}){
  $("#saleDate").value=date;
  $("#productInputs").innerHTML=products.map(p=>`<div class="product-input"><div><label>${p.name}</label><small>${money(p.price)} jual • ${money(p.cost)} modal</small></div><div class="qty-control"><button type="button" class="qty-btn minus" data-minus="${p.id}">−</button><input class="qty" type="number" min="0" step="1" value="${values[p.id]||0}" data-qty="${p.id}"><button type="button" class="qty-btn plus" data-plus="${p.id}">+</button></div></div>`).join("");
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
  $("#pageTitle").textContent={dashboard:"Dashboard",sales:"Input Penjualan",online:"Penjualan Online",history:"Riwayat Penjualan",products:"Produk & Harga",settings:"Pengaturan"}[section];
  $("#sidebar").classList.remove("open");
  if(section==="dashboard"){renderStats();renderProductBars();renderDailyTable();renderChart()}
}
function downloadJSON(){
  const blob=new Blob([JSON.stringify({products,records},null,2)],{type:"application/json"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="backup-gabin-dashboard.json";a.click();URL.revokeObjectURL(a.href);
}
const SUPABASE_URL = "https://lzikpznqgiuxqlxhtenp.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jwFKQXrAmA19nLcloCrdZw_tD3vGkhr";
let cloud = null;
const CLOUD_ENABLED = !SUPABASE_URL.includes("PASTE_") && !SUPABASE_ANON_KEY.includes("PASTE_");
function initCloud(){const el=$("#cloudStatus");if(!CLOUD_ENABLED||!window.supabase){if(el)el.innerHTML='<span class="status-dot"></span><span>Mode lokal — cloud belum dikonfigurasi</span>';return}cloud=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);if(el)el.innerHTML='<span class="status-dot online"></span><span>Cloud aktif — sinkron otomatis</span>'}
async function cloudLoad(){
  if(!cloud)return;
  try{
    const [{data:cloudRows,error},{data:invRows,error:invError}]=await Promise.all([
      cloud.from("gabin_daily_sales").select("*").order("date",{ascending:true}),
      cloud.from("gabin_inventory").select("*")
    ]);
    if(error)throw error;
    if(invError)console.warn("Inventory table:",invError.message);
    const merged=new Map(records.map(r=>[r.date,r]));
    (cloudRows||[]).forEach(row=>merged.set(row.date,{date:row.date,sales:row.sales||{}}));
    records=[...merged.values()].sort((a,b)=>a.date.localeCompare(b.date)); save();
    // Upload local backup/history rows too, without deleting cloud records.
    for(const r of records){ if(!(cloudRows||[]).some(x=>x.date===r.date)) await cloudSaveRecord(r); }
    if(invRows&&invRows.length){
      products=products.map(p=>{const r=invRows.find(x=>x.id===p.id);return r?{...p,stock:Number(r.stock)||0,price:Number(r.price??p.price),cost:Number(r.cost??p.cost)}:p});
    } else { for(const p of products) await cloudSaveProduct(p); }
    save(); renderStats(); renderProductBars(); renderDailyTable(); renderChart(); renderHistory(); renderOnlineOrderList(); renderProducts();
    const el=$("#cloudStatus"); if(el)el.innerHTML='<span class="status-dot online"></span><span>Cloud terhubung • data tersinkron</span>';
  }catch(e){console.warn("Cloud load:",e);const el=$("#cloudStatus");if(el)el.innerHTML='<span class="status-dot"></span><span>Cloud gagal: cek tabel dan RLS</span>';}
}
async function cloudSaveProduct(p){if(!cloud)return;try{const {error}=await cloud.from("gabin_inventory").upsert({id:p.id,name:p.name,stock:Number(p.stock)||0,price:Number(p.price)||0,cost:Number(p.cost)||0,updated_at:new Date().toISOString()},{onConflict:"id"});if(error)throw error;}catch(e){console.warn("Cloud inventory save:",e);toast("Stok lokal tersimpan, cek tabel gabin_inventory");}}

async function cloudSaveRecord(record){if(!cloud)return;try{const {error}=await cloud.from("gabin_daily_sales").upsert({date:record.date,sales:record.sales,updated_at:new Date().toISOString()},{onConflict:"date"});if(error)throw error}catch(e){console.warn("Cloud save:",e);toast("Tersimpan lokal; cloud belum tersedia")}}
async function cloudDeleteRecord(date){if(!cloud)return;try{await cloud.from("gabin_daily_sales").delete().eq("date",date)}catch(e){console.warn(e)}}

function init(){
  initCloud();
  $("#todayLabel").textContent=new Date().toLocaleDateString("id-ID",{weekday:"short",day:"2-digit",month:"short",year:"numeric"});
  $("#dashboardDate").value=todayISO();$("#saleDate").value=todayISO();
  $$(".nav-item").forEach(n=>n.addEventListener("click",()=>go(n.dataset.section)));
  $$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
  $("#mobileMenu").onclick=()=>$("#sidebar").classList.toggle("open");
  $$(".period").forEach(b=>b.onclick=()=>{$$(".period").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentPeriod=b.dataset.period;renderStats()});
  $("#dashboardDate").onchange=renderStats;
  $("#salesForm").onsubmit=e=>{e.preventDefault();const date=$("#saleDate").value,sales={};$$("[data-qty]").forEach(i=>sales[i.dataset.qty]=Number(i.value)||0);const idx=records.findIndex(r=>r.date===date);const oldQty=idx>=0?regularSalesFor(records[idx]):{};if(idx>=0){const online=Array.isArray(records[idx].sales?.__onlineOrders)?records[idx].sales.__onlineOrders:[];records[idx].sales={...sales,__onlineOrders:online};}else records.push({date,sales});adjustStockDelta(oldQty,sales);save();cloudSaveRecord(records.find(r=>r.date===date));toast("Penjualan berhasil disimpan");renderStats();renderDailyTable();renderProductBars();renderChart();go("dashboard")};
  if(document.querySelector('#onlineDate'))document.querySelector('#onlineDate').value=todayISO();
  renderOnlineInputs();
  document.querySelector('#onlineProductInputs').addEventListener('input',updateOnlineSummary);
  document.querySelector('#onlineProductInputs').addEventListener('click',e=>{const id=e.target.dataset.onlinePlus||e.target.dataset.onlineMinus;if(!id)return;const input=document.querySelector(`[data-online-qty="${id}"]`);let n=Math.max(0,Number(input.value)||0);n=e.target.dataset.onlinePlus!==undefined?n+1:Math.max(0,n-1);input.value=n;updateOnlineSummary();});
  document.querySelector('#onlineReceived').addEventListener('input',updateOnlineSummary);
  document.querySelector('#onlineForm').addEventListener('submit',async e=>{e.preventDefault();const date=document.querySelector('#onlineDate').value,quantities=onlineDraft();if(!products.some(p=>(quantities[p.id]||0)>0)){toast('Masukkan jumlah produk terlebih dahulu');return;}const received=Number(document.querySelector('#onlineReceived').value);if(!Number.isFinite(received)||received<0){toast('Nominal uang diterima tidak valid');return;}let rec=records.find(r=>r.date===date);if(!rec){rec={date,sales:{}};records.push(rec);}rec.sales=rec.sales||{};rec.sales.__onlineOrders=Array.isArray(rec.sales.__onlineOrders)?rec.sales.__onlineOrders:[];rec.sales.__onlineOrders.push({id:String(Date.now()),platform:document.querySelector('#onlinePlatform').value,quantities,received,note:document.querySelector('#onlineNote').value.trim(),createdAt:new Date().toISOString()});adjustStock(quantities,-1);save();await cloudSaveRecord(rec);document.querySelector('#onlineReceived').value='';document.querySelector('#onlineNote').value='';renderOnlineInputs();renderOnlineOrderList();renderStats();renderDailyTable();renderProductBars();renderChart();toast('Pesanan online disimpan');});

  $("#onlineOrderList").addEventListener("click", async e=>{
    const btn=e.target.closest(".delete-online-order"); if(!btn)return;
    if(!confirm("Hapus riwayat pesanan online ini?"))return;
    const rec=records.find(r=>r.date===btn.dataset.onlineDate); if(!rec)return;
    const removed=(rec.sales.__onlineOrders||[]).find(o=>String(o.id)===String(btn.dataset.onlineId));
    if(removed)adjustStock(removed.quantities,+1);
    rec.sales.__onlineOrders=(rec.sales.__onlineOrders||[]).filter(o=>String(o.id)!==String(btn.dataset.onlineId));
    save(); await cloudSaveRecord(rec); renderOnlineOrderList(); renderStats(); renderDailyTable(); renderProductBars(); renderChart(); toast("Riwayat online dihapus");
  });
  $("#clearOnlineHistory").addEventListener("click", async ()=>{
    const count=records.reduce((n,r)=>n+(Array.isArray(r.sales?.__onlineOrders)?r.sales.__onlineOrders.length:0),0);
    if(!count){toast("Riwayat online masih kosong");return;}
    if(!confirm(`Hapus semua ${count} riwayat penjualan online? Penjualan reguler tetap aman.`))return;
    for(const rec of records){if(Array.isArray(rec.sales?.__onlineOrders)&&rec.sales.__onlineOrders.length){rec.sales.__onlineOrders.forEach(o=>adjustStock(o.quantities,+1));rec.sales.__onlineOrders=[];await cloudSaveRecord(rec);}}
    save();renderOnlineOrderList();renderStats();renderDailyTable();renderProductBars();renderChart();toast("Semua riwayat online dihapus");
  });
  $("#productInputs").addEventListener("input",updateFormSummary);
  $("#productInputs").addEventListener("click",e=>{const id=e.target.dataset.plus||e.target.dataset.minus;if(!id)return;const input=$(`[data-qty="${id}"]`);let n=Math.max(0,Number(input.value)||0);if(e.target.dataset.plus!==undefined)n++;else n=Math.max(0,n-1);input.value=n;updateFormSummary()});
  $("#historySearch").oninput=renderHistory;
  $("#historyTable").addEventListener("click",e=>{const d=e.target.dataset.date;if(!d)return;if(e.target.classList.contains("delete-record")){if(confirm(`Hapus data ${fmtDate(d)}?`)){records=records.filter(r=>r.date!==d);save();cloudDeleteRecord(d);renderHistory();renderStats();renderDailyTable();renderChart();toast("Data dihapus")}}else if(e.target.classList.contains("edit-record")){const r=records.find(x=>x.date===d);renderInputs(d,r?.sales||{});go("sales")}});
  $("#productsGrid").addEventListener("click",e=>{const id=e.target.dataset.saveProduct;if(!id)return;const p=products.find(x=>x.id===id);const card=e.target.closest(".product-card");p.price=Number(card.querySelector('[data-field="price"]').value)||0;p.cost=Number(card.querySelector('[data-field="cost"]').value)||0;p.stock=Math.max(0,Number(card.querySelector('[data-field="stock"]').value)||0);save();cloudSaveProduct(p);renderInputs($("#saleDate").value);renderProducts();renderStats();renderChart();toast(`Harga ${p.name} diperbarui`)});
  $("#exportBtn").onclick=downloadJSON;$("#backupBtn").onclick=downloadJSON;
  $("#copyStockMessage").onclick=async()=>{try{await navigator.clipboard.writeText($("#stockMessage").value);toast("Format stok berhasil disalin")}catch{ $("#stockMessage").select();document.execCommand("copy");toast("Format stok disalin")}};
  $("#openWhatsAppChannel").onclick=()=>window.open("https://whatsapp.com/channel/0029VbE1LeZFi8xY7FVC2I1v/100","_blank");
  $("#clearBtn").onclick=async()=>{if(confirm("Hapus seluruh riwayat penjualan? Data tidak bisa dikembalikan kecuali dari backup.")){const oldDates=records.map(r=>r.date);records=[];save();if(cloud){for(const d of oldDates)await cloudDeleteRecord(d)}renderHistory();renderStats();renderDailyTable();renderChart();toast("Semua data dihapus")}};
  $("#importInput").onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{try{const d=JSON.parse(rd.result);if(!d.products||!d.records)throw Error();products=DEFAULT_PRODUCTS.map(p=>({...p,...(d.products.find(x=>x.id===p.id)||{})}));records=d.records;save();renderAll();if(cloud){records.forEach(cloudSaveRecord);products.forEach(cloudSaveProduct)}toast("Backup berhasil diimpor")}catch{toast("File backup tidak valid")}};rd.readAsText(f)};
  $("#themeToggle").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("gabin_theme",document.body.classList.contains("light")?"light":"dark")};
  if(localStorage.getItem("gabin_theme")==="light")document.body.classList.add("light");
  renderAll();
  cloudLoad();
  if(cloud) setInterval(()=>cloudLoad(),30000);
}

function getOnlineOrders(record){return Array.isArray(record?.sales?.__onlineOrders)?record.sales.__onlineOrders:[];}
function escapeHTML(v){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function onlineDraft(){const q={};document.querySelectorAll('#onlineProductInputs [data-online-qty]').forEach(i=>q[i.dataset.onlineQty]=Math.max(0,Number(i.value)||0));return q;}
function updateOnlineSummary(){const q=onlineDraft();let sold=0,value=0,cost=0;products.forEach(p=>{let n=q[p.id]||0;sold+=n;value+=n*p.price;cost+=n*p.cost;});document.querySelector('#onlineSold').textContent=sold+' pcs';document.querySelector('#onlineValue').textContent=money(value);document.querySelector('#onlineReceivedPreview').textContent=money(Number(document.querySelector('#onlineReceived').value)||0);document.querySelector('#onlineCost').textContent=money(cost);}
function renderOnlineInputs(){if(!document.querySelector('#onlineProductInputs'))return;document.querySelector('#onlineProductInputs').innerHTML=products.map(p=>`<div class="product-input"><div><label>${p.name}</label><small>${money(p.price)} jual • ${money(p.cost)} modal</small></div><div class="qty-control"><button type="button" class="qty-btn" data-online-minus="${p.id}">−</button><input class="qty" type="number" min="0" step="1" value="0" data-online-qty="${p.id}"><button type="button" class="qty-btn" data-online-plus="${p.id}">+</button></div></div>`).join('');updateOnlineSummary();}
function renderOnlineOrderList(){const root=document.querySelector('#onlineOrderList');if(!root)return;const list=[];[...records].sort((a,b)=>b.date.localeCompare(a.date)).forEach(r=>getOnlineOrders(r).forEach(o=>list.push({...o,date:r.date})));root.innerHTML=list.slice(0,12).map(o=>{const count=products.reduce((s,p)=>s+(Number(o.quantities?.[p.id])||0),0);const detail=products.filter(p=>(Number(o.quantities?.[p.id])||0)>0).map(p=>`${p.name} ${o.quantities[p.id]}`).join(' • ')||'Tidak ada item';return `<div class="online-order-card"><div class="online-order-head"><strong>${escapeHTML(o.platform)} · ${fmtDate(o.date)}</strong><button type="button" class="danger-btn delete-online-order" data-online-id="${escapeHTML(o.id)}" data-online-date="${o.date}">Hapus</button></div><small>${detail}<br>${count} pcs${o.note?' · '+escapeHTML(o.note):''}</small><div class="order-money">Diterima: ${money(o.received)}</div></div>`;}).join('')||'<p class="muted">Belum ada order online yang dicatat.</p>'; }

function renderAll(){renderStats();renderProductBars();renderDailyTable();renderChart();renderHistory();renderProducts();renderInputs();renderOnlineInputs();renderOnlineOrderList();}
init();
