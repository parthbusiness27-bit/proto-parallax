// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Hustle Teacher';
export const SITE_DESCRIPTION = 'Learn proven ways to earn money from home. Simple guides for students and beginners. Start your side hustle today and grow your digital income step by step.';
export const SITE_URL = 'https://hustle-teacher.vercel.app';
export const SITE_AUTHOR = 'Parth';
export const SITE_EMAIL = 'thehustleteacher@gmail.com';

// SEO & Social
export const SOCIAL_TWITTER = 'https://x.com/thustleteacher';
export const SOCIAL_FACEBOOK = 'hustle.teacher';
export const SOCIAL_LINKEDIN = 'hustle.teacher';
export const SOCIAL_YOUTUBE = 'https://www.youtube.com/@TheHustleTeacher';
export const SOCIAL_INSTAGRAM = 'https://www.instagram.com/hustle.teacher';
export const SOCIAL_PINTEREST = 'https://www.pinterest.com/thehustleteacher';
export const SOCIAL_WHATSAPP = 'https://wa.me/919041890565';


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
		SOCIAL_TWITTER,
		`https://facebook.com/${SOCIAL_FACEBOOK}`,
		SOCIAL_INSTAGRAM,
		SOCIAL_PINTEREST,
		SOCIAL_YOUTUBE,
	],
};


