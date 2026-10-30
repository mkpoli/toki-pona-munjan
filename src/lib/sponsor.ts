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
		ask: 'If Sitelen Munjan is useful to you, a tip on Ko-fi gives me time to keep improving it.',
		howTo: 'How to tip',
		steps: [
			'Tap Ko-fi below.',
			'Pick any amount, one-time or monthly.',
			'Pay with PayPal or a card. No sign-up needed.'
		],
		kofi: 'One-time or monthly',
		company: 'Companies can sponsor too.',
		companyHint: 'With an ad on this site. Write to mkpoli@mkpo.li.',
		thanks: 'Thank you for using Sitelen Munjan 💗',
		close: 'Close'
	},
	{
		code: 'tok',
		lang: 'art-Latn-x-tokipona',
		name: 'toki pona',
		label: 'o pana e mani',
		lead: 'mi wan li pali e ilo Sitelen Munjan. mi jo ala e mani tan jan ante tawa pali ni. jan ale li ken kepeken ilo ni kepeken mani ala. mi wile awen e ni.',
		ask: 'ilo Sitelen Munjan li pona tawa sina la, sina ken pana e mani lili tawa mi lon ilo Ko-fi. ni la, mi ken kepeken tenpo suli ni: mi awen pona e ilo.',
		howTo: 'nasin pi pana mani',
		steps: [
			'o luka e nena Ko-fi lon anpa.',
			'o pana e mani pi mute ni: sina wile. sina ken pana lon tenpo wan anu lon tenpo mun ale.',
			'o pana e mani kepeken ilo PayPal anu lipu mani. sina wile ala kama jan pi ilo Ko-fi.'
		],
		kofi: 'lon tenpo wan anu lon tenpo mun ale',
		company: 'kulupu esun li ken pana kin e mani.',
		companyHint: 'mi ken pana e toki esun sina lon lipu ni. o sitelen tawa mkpoli@mkpo.li.',
		thanks: 'sina kepeken ilo Sitelen Munjan. pona tawa sina 💗',
		close: 'o pini'
	},
	{
		code: 'lzh',
		lang: 'lzh',
		name: '文言',
		label: '贊助',
		lead: 'Sitelen Munjan為我一人所作，未受資助。人人皆可免費用之，願長久如此。',
		ask: '若Sitelen Munjan有益於君，可於Ko-fi小額相助，使我得暇續加改進。',
		howTo: '相助之法',
		steps: ['點按下方Ko-fi。', '金額隨意，一次或按月皆可。', '以PayPal或銀行卡付款，無須註冊。'],
		kofi: '一次或按月皆可',
		company: '商家亦可贊助。',
		companyHint: '可於本站刊登廣告，請致函mkpoli@mkpo.li。',
		thanks: '謝君惠用Sitelen Munjan💗',
		close: '閉'
	}
]
