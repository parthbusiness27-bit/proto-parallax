async function getLinks() {
  try {
    const res = await fetch('https://linktr.ee/thehustleteacher', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
      }
    });
    const text = await res.text();
    const urls = text.match(/https:\/\/[^"'\s<>\\}]+/g);
    if (urls) {
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
        console.log("No URLs found.");
    }
  } catch (e) {
    console.error(e);
  }
}
getLinks();
