const express = require('express');
const Redis = require('ioredis');

const app = express();
app.use(express.json());
const redis = new Redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

async function fetchAndCache() {
  const response = await fetch('https://api.orhanaydogdu.com.tr/deprem/kandilli/live');
  const data = await response.json();
  await redis.set('earthquakes', JSON.stringify(data.result), 'EX', 300);
  console.log('Deprem verisi güncellendi');
}

app.get('/earthquakes', async (req, res) => {
    const data = await redis.get('earthquakes');
    if(data){
        console.log(`Veriler Redis'den alınıyor.`);
        return res.json(JSON.parse(data));
    }
    else{
        const response = await fetch('https://api.orhanaydogdu.com.tr/deprem/kandilli/live');
        const data = await response.json();
        return res.json(data.result);
        await redis.set('earthquakes', JSON.stringify(data.result), 'EX', 300);
        console.log('Deprem verisi güncellendi');
    }
});

fetchAndCache();
setInterval(fetchAndCache, 60000);
app.listen(3000, () => console.log('API running on port 3000'));

