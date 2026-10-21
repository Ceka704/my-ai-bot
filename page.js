'use client';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// BURAYI KENDİ KONTRAKTLARINIZA GÖRE DOLDURACAKSINIZ
const CONTRACT_ADDRESS = "0xSözleşmeAdresiniz";
const LOTTERY_ABI = [
  "function buyTickets(uint256 _count) external",
  "function drawWinner() external",
  "function updateSettings(uint256 _price, uint256 _duration, uint256 _commission) external",
  "function giveTestTokens(address _to, uint256 _amount) external",
  "function ticketPrice() external view returns (uint256)",
  "function currentRound() external view returns (uint256)"
];

export default function Home() {
  // Cüzdan ve Bağlantı Stateleri
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);

  // Oyun Durumu Stateleri
  const [round, setRound] = useState("1");
  const [price, setPrice] = useState("5");
  const [ticketCount, setTicketCount] = useState(1);

  // Admin Paneli Form Stateleri
  const [newPrice, setNewPrice] = useState(5);
  const [newDuration, setNewDuration] = useState(182);
  const [newCommission, setNewCommission] = useState(8);
  const [targetAddress, setTargetAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  // Web3 Cüzdan Bağlantısı
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const lotteryContract = new ethers.Contract(CONTRACT_ADDRESS, LOTTERY_ABI, signer);
        
        setWallet(accounts[0]);
        setContract(lotteryContract);
        
        // Kontrattan canlı verileri oku
        const cRound = await lotteryContract.currentRound();
        const cPrice = await lotteryContract.ticketPrice();
        setRound(cRound.toString());
        setPrice(ethers.formatEther(cPrice));
      } catch (err) {
        console.error("Bağlantı hatası:", err);
      }
    } else {
      alert("Lütfen MetaMask yükleyin!");
    }
  };

  // Kullanıcı: Bilet Satın Alma
  const handleBuyTickets = async () => {
    if (!contract) return alert("Önce cüzdanınızı bağlayın!");
    try {
      const tx = await contract.buyTickets(ticketCount);
      await tx.wait();
      alert("Bilet başarıyla alındı!");
    } catch (err) {
      console.error(err);
    }
  };

  // Admin: Ayarları Güncelleme
  const handleUpdateSettings = async () => {
    if (!contract) return;
    try {
      const parsedPrice = ethers.parseEther(newPrice.toString());
      const tx = await contract.updateSettings(parsedPrice, newDuration, newCommission);
      await tx.wait();
      alert("Oyun ayarları başarıyla güncellendi!");
    } catch (err) {
      console.error(err);
    }
  };

  // Admin: Kendine veya Başkasına Deneme/Oyun Tokeni Verme
  const handleGiveTokens = async () => {
    if (!contract || !targetAddress || !tokenAmount) return alert("Eksik bilgi girdiniz!");
    try {
      const tx = await contract.giveTestTokens(targetAddress, tokenAmount);
      await tx.wait();
      alert(`${tokenAmount} adet deneme tokeni başarıyla adrese gönderildi!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0e14', color: '#fff', minHeight: '100vh', padding: '30px', fontFamily: 'sans-serif' }}>
      
      {/* ÜST BAR / CÜZDAN BAĞLAMA */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e2530', paddingBottom: '15px' }}>
        <h2 style={{ letterSpacing: '1px' }}>🔮 LOTTERY dAPP</h2>
        <button onClick={connectWallet} style={{ backgroundColor: '#e0b034', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          {wallet ? `${wallet.substring(0,6)}...${wallet.substring(38)}` : 'Cüzdanı Bağla'}
        </button>
      </header>

      {/* KULLANICI ARAYÜZÜ (GÖRSELDEKİ ANA EKRAN) */}
      <main style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem' }}>Çekiliş Hazırlanıyor...</p>
        <h1 style={{ color: '#e0b034', fontSize: '3.5rem', margin: '10px 0' }}>\$1,280.70</h1>
        <p style={{ color: '#00ff66', fontWeight: 'bold' }}>Tur: #{round} | Bilet Fiyatı: {price} TOKN</p>

        {/* Bilet Alım Kısmı */}
        <div style={{ margin: '20px auto', maxWidth: '300px', background: '#131924', padding: '15px', borderRadius: '8px' }}>
          <input type="number" value={ticketCount} onChange={(e) => setTicketCount(e.target.value)} min="1" style={{ width: '60px', padding: '8px', marginRight: '10px', background: '#0b0e14', border: '1px solid #333', color: '#fff', textAlign: 'center' }} />
          <button onClick={handleBuyTickets} style={{ backgroundColor: '#00ff66', color: '#000', border: 'none', padding: '9px 18px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>Bilet Satın Al</button>
        </div>

        {/* 1-75 Arası Sayı Matrisi */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '10px', maxWidth: '550px', margin: '30px auto', background: '#131924', padding: '20px', borderRadius: '10px', border: '1px solid #1e2530' }}>
          {Array.from({ length: 75 }, (_, i) => i + 1).map((num) => (
            <div key={num} style={{ background: '#252f41', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', margin: 'auto' }}>
              {num}
            </div>
          ))}
        </div>
      </main>

      {/* ADMİN PANELİ ALANI (SAYFANIN EN ALTI) */}
      <section style={{ marginTop: '60px', borderTop: '2px solid #1e2530', paddingTop: '40px' }}>
        <h2 style={{ color: '#ff3366', marginBottom: '20px', textAlign: 'center' }}>⚙️ Admin Yönetim & Test Paneli</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Sol Kutu: Oyun Ayarlarını Güncelleme */}
          <div style={{ background: '#11151d', padding: '25px', borderRadius: '8px', border: '1px solid #222' }}>
            <h4 style={{ color: '#00ff66', marginTop: 0 }}>Oyun Parametreleri</h4>
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Bilet Fiyatı (TOKN)</label>
              <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a202c', border: '1px solid #444', color: '#fff' }} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Tur Süresi (Gün/Döngü)</label>
              <input type="number" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a202c', border: '1px solid #444', color: '#fff' }} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Komisyon Oranı (%)</label>
              <input type="number" value={newCommission} onChange={(e) => setNewCommission(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a202c', border: '1px solid #444', color: '#fff' }} />
            </div>
            <button onClick={handleUpdateSettings} style={{ marginTop: '15px', width: '100%', padding: '10px', background: '#00ff66', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Ayarları Kaydet</button>
          </div>

          {/* Sağ Kutu: Test Token Dağıtımı (Kendine/Başkasına Verme) */}
          <div style={{ background: '#11151d', padding: '25px', borderRadius: '8px', border: '1px solid #222' }}>
            <h4 style={{ color: '#e0b034', marginTop: 0 }}>Kendine/Başkasına Deneme Tokeni Ekle</h4>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>Sistemi test etmek için dilediğiniz adrese anında oyun tokeni tanımlayın.</p>
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Hedef Cüzdan Adresi (0x...)</label>
              <input type="text" placeholder="0x..." value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a202c', border: '1px solid #444', color: '#fff' }} />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Gönderilecek Miktar (TOKN)</label>
              <input type="number" placeholder="Örn: 1000" value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '5px', background: '#1a202c', border: '1px solid #444',color: '#fff' }} />
            </div>
            <button onClick={handleGiveTokens} style={{ marginTop: '43px', width: '100%', padding: '10px', background: '#e0b034', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Test Tokeni Gönder</button>
          </div>

        </div>
      </section>
    </div>
  );
}
