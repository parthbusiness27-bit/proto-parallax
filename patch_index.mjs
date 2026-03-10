import fs from 'fs';

const path = 'proto-parallax/src/pages/index.astro';
let content = fs.readFileSync(path, 'utf8');

// Replace external script that is missing
const scriptRegex = /<script type=module src=\/_astro\/Hero.*?><\/script>/;
const inlineScript = `
<script>
  const words = ["animated", "beautiful", "accessible"];
  const wordEl = document.getElementById("animated-word");
  let idx = 0;

  function animateOut(el, callback) {
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = '0';
    setTimeout(callback, 300);
  }

  function animateIn(el) {
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = '1';
  }

  if (wordEl) {
    wordEl.innerText = words[0];
    setInterval(() => {
      animateOut(wordEl, () => {
        idx = (idx + 1) % words.length;
        wordEl.innerText = words[idx];
        animateIn(wordEl);
      });
    }, 2500);
  }
</script>
`;

content = content.replace(scriptRegex, inlineScript);

// Remove hardcoded "dark" from html class if it exists
content = content.replace('<html lang="en" class="dark">', '<html lang="en">');

fs.writeFileSync(path, content);
console.log('Successfully patched index.astro');
