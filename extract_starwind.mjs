import fs from 'fs';

const htmlUrl = 'starwind_home.html';
const html = fs.readFileSync(htmlUrl, 'utf8');

const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>') + 9;
const header = html.substring(headerStart, headerEnd);

const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>') + 7;
const main = html.substring(mainStart, mainEnd);

const astroComponent = `---
import BaseHead from '../components/BaseHead.astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import "@/styles/starwind.css";
---

<!doctype html>
<html lang="en" class="dark">
	<head>
		<BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
	</head>
	<body class="bg-background text-foreground scheme-light dark:scheme-dark">
		${header}
		${main}
	</body>
</html>
`;

fs.writeFileSync('proto-parallax/src/pages/index.astro', astroComponent);
console.log('Successfully wrote to index.astro');
