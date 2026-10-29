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
// the same three. The toki pona and Literary Chinese texts are unreviewed machine drafts.
export const sponsorLocales: SponsorLocale[] = [
	{
		code: 'en',
		lang: 'en',
		name: 'English',
		label: 'Sponsor',
		lead: "I make this site out of love for Toki Pona and Hanzi, and I've put several hundred dollars of my own into it. I don't have a job, and my small TA pay doesn't cover rent and food. Some days I can barely afford to eat.",
		ask: 'Please help me keep going 🥺 Even one dollar helps me eat today.',
		howTo: 'How to help',
		steps: [
			'Tap Ko-fi below.',
			'Pick any amount. Small is fine.',
			'Pay with PayPal or a card. No sign-up needed.'
		],
		kofi: 'One-time or monthly',
		company: 'Company sponsorship',
		companyHint: "I'd love to put your ad on this site. Please write to mkpoli@mkpo.li.",
		thanks: 'Thank you for reading this far. Your help keeps me fed and keeps this site growing 💗',
		close: 'Close'
	},
	{
		code: 'tok',
		lang: 'art-Latn-x-tokipona',
		name: 'toki pona',
		label: 'pana mani',
		lead: 'mi pali e lipu ni tan olin pi toki pona en sitelen Hanzi, li pana e mani mute tawa ona. mi jo ala e pali, li jo e mani lili tan tawa sona, taso mani ni li lawa ala e mani tomo en mani moku. tenpo suno ante la, moku li wile e mani mute tawa mi.',
		ask: 'o pana e mani tawa ni: mi ken pali tawa 🥺 mani wan taso li ken moku e mi lon tenpo ni.',
		howTo: 'nasin pi pana mani',
		steps: [
			'o luka e Ko-fi lon anpa.',
			'o toki e mute mani. mani lili li pona.',
			'o pana e mani kepeken PayPal anu lipu mani. o sitelen e nimi sina ala.'
		],
		kofi: 'tenpo wan anu tenpo ale',
		company: 'pana mani pi kulupu pali',
		companyHint:
			'mi wile pana e sitelen toki pi kulupu sina lon lipu ni. o sitelen tawa mkpoli@mkpo.li.',
		thanks:
			'taso pona tawa sina tan ni: sina lukin e toki ni. pana mani sina li moku e mi, li suli e lipu ni 💗',
		close: 'pini'
	},
	{
		code: 'lzh',
		lang: 'lzh',
		name: '文言',
		label: '贊助',
		lead: '妾愛Toki Pona與漢字而作此網，自出數百金。無職，助教之微俸不足償僦賃與饍。或日幾不給食。',
		ask: '祈助妾得續行🥺雖一⁠金亦能濟今日之飢。',
		howTo: '助之之道',
		steps: ['點下方Ko-fi。', '擇其所欲，少亦可也。', '以PayPal或券納之，毋須註冊。'],
		kofi: '或一給或按月',
		company: '商號贊助',
		companyHint: '妾願置閣下之廣告於此網。請書函至mkpoli@mkpo.li。',
		thanks: '感君至此。閣下之助使妾得食而此網日滋💗',
		close: '閉'
	}
]
