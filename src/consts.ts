// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Hustle Teacher';
export const SITE_DESCRIPTION = 'Your Guide to Making Money Online.';
export const SITE_URL = 'https://HustleTeacher.vercel.app';
export const SITE_AUTHOR = 'Parth';
export const SITE_EMAIL = 'contact@hustleteacher.com';

// SEO & Social
export const SOCIAL_TWITTER = '@HustleTeacher';
export const SOCIAL_FACEBOOK = 'hustleteacher';
export const SOCIAL_LINKEDIN = 'hustle-teacher';
export const SOCIAL_YOUTUBE = '@hustleteacher';
export const SOCIAL_INSTAGRAM = '@hustleteacher';

// Content
export const POSTS_PER_PAGE = 10;
export const MIN_WORD_COUNT = 1500;

// Keywords for SEO
export const PRIMARY_KEYWORDS = [
	'make money online',
	'student side hustle',
	'online earning',
	'digital skills',
	'work from home',
];

// Organization Schema
export const ORGANIZATION = {
	name: SITE_TITLE,
	description: SITE_DESCRIPTION,
	url: SITE_URL,
	logo: `${SITE_URL}/logo.png`,
	email: SITE_EMAIL,
	sameAs: [
		`https://twitter.com/${SOCIAL_TWITTER}`,
		`https://facebook.com/${SOCIAL_FACEBOOK}`,
	],
};

