*{box-sizing:border-box;margin:0;padding:0}
body{background:#14103a;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:16px 16px 110px;min-height:100vh}
.wrap{max-width:560px;margin:0 auto}
header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;gap:8px}
header h1{font-size:1.3rem}
a{color:#e0b034}
button{cursor:pointer;border:0;border-radius:8px;font-weight:700;padding:11px 16px;font-size:.95rem}
.gold{background:#e0b034;color:#000}.green{background:#00d85a;color:#000}.grey{background:#2a2552;color:#fff}
.card{background:#1d1850;border-radius:16px;padding:18px;margin-bottom:16px}
.card h2{font-size:1.05rem;margin-bottom:8px}
.pool{text-align:center;font-size:2.6rem;font-weight:800;color:#e0b034}
.sub{text-align:center;color:#aab;margin-top:4px}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;font-size:.9rem;color:#ccd}
.stats b{color:#fff}
.balls{display:grid;grid-template-columns:repeat(9,1fr);gap:7px}
.ball{aspect-ratio:1;border-radius:50%;background:#4b34b8;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;cursor:pointer;user-select:none}
.ball.on{background:#e0b034;color:#000}
.buy{display:flex;gap:10px;align-items:center;justify-content:space-between;margin-top:14px}
label{display:block;font-size:.8rem;color:#aab;margin:10px 0 4px}
input{width:100%;padding:10px;border-radius:6px;border:1px solid #3a3470;background:#120e33;color:#fff}
.row{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.foot{text-align:center;margin-top:8px;font-size:.85rem}
#msg{display:none;position:fixed;left:0;right:0;bottom:0;z-index:9;padding:14px 16px;text-align:center;font-size:.9rem;background:#0d0a26;border-top:1px solid #3a3470}
