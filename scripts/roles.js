export const roles = [
    {
        id: 'digital-marketer',
        title: 'The Digital Marketer',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-blue-400" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>',
        mission: 'Orchestrating brand growth, driving organic traffic, and mastering content strategy to capture audience attention.',
        dailyStack: ['Google Analytics', 'Ahrefs / SEMrush', 'HubSpot', 'Canva'],
        difficulty: 3,
        income: '$2k - $8k+ / month',
        color: 'from-blue-500/20 to-blue-500/5',
        borderColor: 'group-hover:border-blue-500/50',
        categories: [
            { name: 'Digital Marketing', slug: 'digital-marketing' },
            { name: 'Affiliate Marketing', slug: 'affiliate-marketing' }
        ],
        description: 'The Digital Marketer is the architect behind audience acquisition. In a world full of noise, they possess the analytical and psychological tools to make a brand genuinely stand out, generate organic reach, and seamlessly convert followers into loyal customers.'
    },
    {
        id: 'ads-manager',
        title: 'The Ads Manager / Media Buyer',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-emerald-400" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 10-4 4-4-4"/></svg>',
        mission: 'Managing massive ad budgets across Meta and Google to guarantee positive Return on Ad Spend (ROAS) for clients.',
        dailyStack: ['Meta Ads Manager', 'Google Ads', 'Triple Whale', 'TikTok Ads Manager'],
        difficulty: 4,
        income: '$4k - $15k+ / month',
        color: 'from-emerald-500/20 to-emerald-500/5',
        borderColor: 'group-hover:border-emerald-500/50',
        categories: [
            { name: 'Agencies', slug: 'agencies' },
            { name: 'E-commerce', slug: 'ecommerce' },
            { name: 'Digital Marketing', slug: 'digital-marketing' }
        ],
        description: 'The Ads Manager treats marketing like a high-stakes stock market. They take a client\'s money, test creatives aggressively, and ensure that for every $1 put into the machine, $3 comes out. It is highly analytical, data-driven, and intensely lucrative.'
    },
    {
        id: 'lead-developer',
        title: 'The Lead Developer',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-indigo-400" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
        mission: 'Writing the code and establishing the architecture that powers modern web apps, SaaS tools, and smart contracts.',
        dailyStack: ['VS Code', 'GitHub', 'Next.js', 'Vercel / AWS'],
        difficulty: 5,
        income: '$5k - $20k+ / month',
        color: 'from-indigo-500/20 to-indigo-500/5',
        borderColor: 'group-hover:border-indigo-500/50',
        categories: [
            { name: 'Programming & Dev', slug: 'programming-development' },
            { name: 'Software & SaaS', slug: 'software-saas' },
            { name: 'Web3 & Blockchain', slug: 'web3-blockchain' }
        ],
        description: 'The Lead Developer creates the underlying infrastructure of the internet. By mastering complex coding languages and systems architecture, they are inherently capable of building their own standalone software products or charging premium rates for contract work.'
    },
    {
        id: 'sales-closer',
        title: 'The Sales Generator / Closer',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-amber-400" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><polyline points="15 9 18 9 18 11"/><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"/></svg>',
        mission: 'Securing revenue by mastering cold outreach, handling objections, and closing high-ticket deals over the phone.',
        dailyStack: ['Instantly.ai', 'Apollo.io', 'Zoom / Meet', 'Salesforce / CRM'],
        difficulty: 4,
        income: '$3k - $12k+ / month',
        color: 'from-amber-500/20 to-amber-500/5',
        borderColor: 'group-hover:border-amber-500/50',
        categories: [
            { name: 'Agencies', slug: 'agencies' },
            { name: 'Freelancing', slug: 'freelancing' }
        ],
        description: 'The backbone of any B2B business. The Closer thrives on human interaction, deeply understanding pain points, and facilitating high-ticket transactions. Without this role, no agency or SaaS product can survive.'
    },
    {
        id: 'ai-specialist',
        title: 'The AI Specialist / Prompt Engineer',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-fuchsia-400" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/></svg>',
        mission: 'Automating workflows and leveraging LLMs to drastically cut down an organizations operational costs.',
        dailyStack: ['Make.com / Zapier', 'OpenAI API', 'Midjourney', 'VoiceFlow'],
        difficulty: 4,
        income: '$3k - $10k+ / month',
        color: 'from-fuchsia-500/20 to-fuchsia-500/5',
        borderColor: 'group-hover:border-fuchsia-500/50',
        categories: [
            { name: 'Agencies', slug: 'agencies' },
            { name: 'No-Code Development', slug: 'no-code-development' }
        ],
        description: 'The newest archetype in the digital space. The AI Specialist isn\'t necessarily a Python genius, but rather an expert in hooking together APIs and no-code tools to replace 40 hours of manual labor with a 10-second automated trigger.'
    },
    {
        id: 'content-architect',
        title: 'The Content Architect',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-rose-400" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 8 6 4-6 4Z"/></svg>',
        mission: 'Scripting, recording, and editing engaging short or long-form video content to build massive, cult-like audiences.',
        dailyStack: ['Premiere Pro / CapCut', 'Notion', 'Figma', 'YouTube Studio'],
        difficulty: 3,
        income: '$2k - $15k+ / month',
        color: 'from-rose-500/20 to-rose-500/5',
        borderColor: 'group-hover:border-rose-500/50',
        categories: [
            { name: 'Content Creation', slug: 'content-creation' },
            { name: 'Creator Economy', slug: 'creator-economy' }
        ],
        description: 'The mastermind behind going viral. The Content Architect understands the algorithms, pacing, script hooks, and visual storytelling necessary to capture human attention span and convert views into a wildly profitable personal brand or creator business.'
    }
];
