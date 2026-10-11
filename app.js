const DEFAULT_PRODUCTS = [
  {
    "id": "coklat",
    "name": "Coklat",
    "price": 10000,
    "cost": 7000,
    "stock": 30
  },
  {
    "id": "stroberi",
    "name": "Stroberi",
    "price": 10000,
    "cost": 7000,
    "stock": 11
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
    "stock": 11
  },
  {
    "id": "oreo",
    "name": "Oreo",
    "price": 10000,
    "cost": 7000,
    "stock": 20
  },
  {
    "id": "mangga",
    "name": "Mangga",
    "price": 10000,
    "cost": 7000,
    "stock": 25
  },
  {
    "id": "milo",
    "name": "Milo",
    "price": 10000,
    "cost": 7000,
    "stock": 9
  },
  {
    "id": "durian",
    "name": "Durian",
    "price": 10000,
    "cost": 7000,
    "stock": 0
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
  $("#pageTitle").textContent={dashboard:"Dashboard",sales:"Input Penjualan",history:"Riwayat Penjualan",products:"Produk & Harga",settings:"Pengaturan"}[section];
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
    save(); renderAll();
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
  $("#salesForm").onsubmit=e=>{e.preventDefault();const date=$("#saleDate").value,sales={};$$("[data-qty]").forEach(i=>sales[i.dataset.qty]=Number(i.value)||0);const idx=records.findIndex(r=>r.date===date);if(idx>=0)records[idx].sales=sales;else records.push({date,sales});save();cloudSaveRecord({date,sales});toast("Penjualan berhasil disimpan");renderStats();renderDailyTable();renderProductBars();renderChart();go("dashboard")};
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
  cloudLoad().then(()=>renderAll());
  if(cloud) setInterval(()=>cloudLoad(),30000);
}
function renderAll(){renderStats();renderProductBars();renderDailyTable();renderChart();renderHistory();renderProducts();renderInputs();}
init();
