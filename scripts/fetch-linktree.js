const https = require('https');

const options = {
  hostname: 'linktr.ee',
  port: 443,
  path: '/thehustleteacher',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (d) => { data += d; });
  res.on('end', () => {
    const urls = data.match(/https:\/\/[^"'\s<>\\}]+/g);
    if(urls) {
        const uniqueUrls = [...new Set(urls)];
        const socialUrls = uniqueUrls.filter(u => 
            u.includes('instagram.com') || 
            u.includes('youtube.com') || 
            u.includes('twitter.com') || 
            u.includes('x.com') || 
            u.includes('facebook.com') || 
            u.includes('tiktok.com') || 
            u.includes('pinterest.com') || 
            u.includes('linkedin.com') ||
            u.includes('t.me') ||
            u.includes('wa.me') ||
            u.includes('whatsapp.com') ||
            u.includes('snapchat.com') ||
            u.includes('threads.net')
        );
        console.log("Social Links Found:");
        console.log(socialUrls.map(u => u.replace(/(&quot;$|\\&quot;$|\\u0026.*$)/g, '')).filter((v, i, a) => a.indexOf(v) === i));
    } else {
        console.log("No URLs found or unable to parse.");
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
