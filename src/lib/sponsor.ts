export type SponsorLocale = {
	code: string
	lang: string
	name: string
	label: string
	lead: string
	ask: string
	howTo: string
	steps: [string, string, string]
	kofi: string
	ofuse: string
	company: string
	companyHint: string
	thanks: string
	close: string
}

// The site writes in Literary Chinese, toki pona and English side by side; the dialog offers
// the same three. The toki pona and Literary Chinese texts are unreviewed by a fluent reader.
export const sponsorLocales: SponsorLocale[] = [
	{
		code: 'en',
		lang: 'en',
		name: 'English',
		label: 'Sponsor',
		lead: "I build Sitelen Munjan on my own, with no funding behind it. It's free for everyone, and I'd like to keep it that way.",
		ask: 'If Sitelen Munjan is useful to you, a tip gives me time to keep improving it.',
		howTo: 'How to tip',
		steps: [
			'Tap either button below.',
			'Pick an amount.',
			'Pay by card. No sign-up needed.'
		],
		kofi: 'One-time or monthly',
		ofuse: 'Tip with a message',
		company: 'Companies can sponsor too.',
		companyHint: 'Write to mkpoli@mkpo.li.',
		thanks: 'Thank you for using Sitelen Munjan 💗',
		close: 'Close'
	},
	{
		code: 'tok',
		lang: 'art-Latn-x-tokipona',
		name: 'toki pona',
		label: 'o pana e mani',
		lead: 'mi wan li pali e ilo Sitelen Munjan. mi jo ala e mani tan jan ante tawa pali ni. jan ale li ken kepeken ilo ni kepeken mani ala. mi wile awen e ni.',
		ask: 'ilo Sitelen Munjan li pona tawa sina la, mani lili sina li pana e tenpo tawa mi. mi ken awen pona e ilo ni.',
		howTo: 'nasin pi pana mani',
		steps: [
			'o luka e nena wan tan nena tu lon anpa.',
			'o anu e mute mani.',
			'o pana e mani kepeken lipu mani. sina wile ala pali e lipu pi jan kepeken.'
		],
		kofi: 'lon tenpo wan anu lon tenpo mun ale',
		ofuse: 'o pana e mani e toki',
		company: 'kulupu esun li ken pana kin e mani.',
		companyHint: 'o sitelen tawa mkpoli@mkpo.li.',
		thanks: 'sina kepeken ilo Sitelen Munjan. pona tawa sina 💗',
		close: 'o pini'
	},
	{
		code: 'lzh',
		lang: 'lzh',
		name: '文言',
		label: '贊助',
		lead: 'Sitelen Munjan為我一人所作，未受資助。人人皆可免費用之，願長久如此。',
		ask: '若Sitelen Munjan有益於君，薄贈可使吾得暇續修之。',
		howTo: '相助之法',
		steps: ['請按下列二鈕之一。', '請擇所贈之數。', '以卡付款，毋須註冊。'],
		kofi: '一次或按月皆可',
		ofuse: '薄贈並留言',
		company: '商家亦可贊助。',
		companyHint: '請致函mkpoli@mkpo.li。',
		thanks: '謝君惠用Sitelen Munjan💗',
		close: '閉'
	}
]
