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
		lead: 'mi olin e toki pona e sitelen Hanzi, la mi pali e lipu ni. mi pana e mani mute mi tawa ona. mi jo ala e pali. mani lili mi tan pali pi pana sona li lili tawa tomo en moku. tenpo suno ante la mi ken lili taso esun e moku.',
		ask: 'o pana e pona tawa mi. ni la mi ken awen pali 🥺 mani wan taso li pana e moku tawa mi lon tenpo suno ni.',
		howTo: 'nasin pi pana mani',
		steps: [
			'o luka e nena Ko-fi lon anpa.',
			'o pana e mani pi mute wile sina. mani lili li pona.',
			'o pana kepeken PayPal anu lipu mani. sina wile ala sitelen e nimi sina.'
		],
		kofi: 'tenpo wan anu tenpo mun ale',
		company: 'pana mani tan kulupu esun',
		companyHint: 'mi wile pana e sitelen esun sina lon lipu ni. o pana e lipu tawa mkpoli@mkpo.li.',
		thanks:
			'sina lukin e toki mi ale. pona mute tawa sina! pona sina li pana e moku tawa mi, li suli e lipu ni 💗',
		close: 'o pini'
	},
	{
		code: 'lzh',
		lang: 'lzh',
		name: '文言',
		label: '贊助',
		lead: '吾愛Toki Pona與漢字而作此網，自出數百元。今無職，助教之微俸不足以供賃居與食。或日幾不能得食。',
		ask: '祈助吾得續行🥺雖一⁠元亦能濟今日之飢。',
		howTo: '助之之道',
		steps: ['點下方Ko-fi。', '擇其所欲，少亦可也。', '以PayPal或信用卡納之，毋須註冊。'],
		kofi: '或一給或按月',
		company: '商號贊助',
		companyHint: '吾願置貴號之廣告於此網。請致函mkpoli@mkpo.li。',
		thanks: '感君讀至此。君之助使吾得食，而此網日滋💗',
		close: '閉'
	}
]
