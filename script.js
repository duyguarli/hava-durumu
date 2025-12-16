const apiKey = "3d41f842ef4b93f9ba7a177f1a3e4e18"; 

const araButon = document.getElementById('araButon');
const sehirInput = document.getElementById('sehirInput');
const sonucAlani = document.getElementById('weatherResult');

async function havaDurumuGetir(sehirIsmi) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${sehirIsmi}&appid=${apiKey}&units=metric&lang=tr`;

    try {
        const yanit = await fetch(url);
        
        if (yanit.status === 401) {
            alert("API anahtarınız henüz aktif değil.");
            return;
        }

        const veri = await yanit.json();

        if (veri.cod === "404") {
            alert("Şehir bulunamadı!");
        } else {
            sonucAlani.style.display = 'block';
            
            // Verileri Yazdır
            document.getElementById('sehirAd').innerText = `${veri.name}, ${veri.sys.country}`;
            document.getElementById('derece').innerText = `${Math.round(veri.main.temp)}°`;
            document.getElementById('aciklama').innerText = veri.weather[0].description;
            document.getElementById('nem').innerText = veri.main.humidity;
            document.getElementById('ruzgar').innerText = veri.wind.speed;
            
            // İkon
            const ikon = veri.weather[0].icon;
            document.getElementById('havaIkon').src = `https://openweathermap.org/img/wn/${ikon}@4x.png`; // @4x daha net

            // DİNAMİK ARKA PLAN
            if (veri.main.temp > 20) {
                document.body.style.background = "linear-gradient(135deg, #f83600, #f9d423)"; // Sıcaksa Turuncu
            } else {
                document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)"; // Soğuksa Mavi
            }
        }
    } catch (hata) {
        console.error(hata);
    }
}

araButon.addEventListener('click', () => {
    if (sehirInput.value.trim()) havaDurumuGetir(sehirInput.value.trim());
});

sehirInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && sehirInput.value.trim()) havaDurumuGetir(sehirInput.value.trim());
});