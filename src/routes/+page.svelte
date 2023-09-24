<script lang="ts">
	import Converter from '$lib/Converter.svelte'
	import Navigator from '$lib/Navigator.svelte'
	import Section from '$lib/Section.svelte'

	import MdiTransferDown from '~icons/mdi/transfer-down'
	const DICT_TARGET =
		'https://raw.githubusercontent.com/mkpoli/rime-toki-pona-munjan/main/toki_pona.dict.yaml'

	// let textArea: HTMLTextAreaElement
	let input: string
	let output: string = ''

	let dictionary: Record<string, string>
	async function getDict(): Promise<Record<string, string>> {
		const response = await fetch(DICT_TARGET)
		const text = await response.text()
		const lines = text.split(/\r\n|\n/).slice(6)

		const items = lines
			.filter((line) => line && !line.startsWith('#') && line.includes('\t'))
			.map((line) => line.split('\t'))
			.map(([m, t]) => [t, m])

		return Object.fromEntries(items)
	}

	const PUNCTUATIONS = {
		'.': '。',
		',': '，',
		':': '：'
	}

	/* TODO: sitelen toki pona -> sitelen munjan */
	async function convertTokiPona2MunJan(tokiPona: string): Promise<string> {
		if (!dictionary) {
			dictionary = await getDict()
		}
		const words = tokiPona
			.split(/([\W])/)
			.filter((word) => word && word != ' ')
			.map((word) => (word in PUNCTUATIONS ? PUNCTUATIONS[word] : word))
		return words.map((word) => (dictionary[word] ? dictionary[word] : word)).join('')
	}

	async function onConvert() {
		if (!input) return
		output = await convertTokiPona2MunJan(input)
	} /* TODO: sitelen munjan -> sitelen toki pona  */

	let inView: boolean[] = Array(4).fill(false)

	function onenter(index: number) {
		return () => {
			inView[index] = true
		}
	}

	function onleave(index: number) {
		return () => {
			inView[index] = false
		}
	}
</script>

<svelte:head>
	<title>書文言｜sitelen munjan</title>
</svelte:head>

<Navigator {inView} />

<main>
	<Section id="home" on:enter={onenter(0)} on:leave={onleave(0)}>
		<h1>
			<span lang="art-HanT-x-tokipona">書文言</span><br />
			sitelen Munjan
		</h1>
	</Section>

	<Section id="introduction" on:enter={onenter(1)} on:leave={onleave(1)}>
		<h2>
			<span lang="art-HanT-x-tokipona">來葉</span><br />kama lipu<br /><span lang="en"
				>Introduction</span
			>
		</h2>
		<p>
			<b>書文言</b>者作乎書于<a href="tokipona.org" target="_blank">言善</a>以書中國新無。
		</p>

		<p>
			<b>sitelen Munjan</b> li pali e sitelen tawa
			<a href="tokipona.org" target="_blank">toki pona</a> kepeken sitelen Sonko sin ala.
		</p>

		<p lang="en">
			<b>Sitelen Munjan</b> is a Classical-Chinese-styled script for writing
			<a href="tokipona.org" target="_blank">Toki Pona</a> with Hanzi.
		</p>
	</Section>

	<Section
		id="converter"
		on:enter={onenter(2)}
		on:leave={onleave(2)}
		style="min-height: 100vh; height:auto;"
	>
		<h2>
			<span lang="art-HanT-x-tokipona">器書異</span><br />
			ilo sitelen ante
			<br />
			<span lang="en">Converter</span>
		</h2>
		<Converter />
	</Section>

	<Section id="wordlist" on:enter={onenter(3)} on:leave={onleave(3)}>
		<h2>
			<span lang="art-HanT-x-tokipona">葉言</span><br />
			lipu toki
			<br /><span lang="en">Word List</span>
		</h2>
		<a
			href="https://github.com/mkpoli/rime-toki-pona-munjan/blob/main/toki_pona.dict.yaml"
			target="_blank"
			rel="noopener noreferrer"
		>
			toki_pona.dict.yaml
		</a>
	</Section>
</main>

<style>
	:global(html) {
		font-size: 10px;
	}

	:global(body) {
		height: 100%;
		margin: 0;
		font-size: 2em;
		color: white;

		background: rgba(0, 16, 148, 1) 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-image: linear-gradient(
			0deg,
			rgb(169, 220, 203) 0%,
			rgb(2, 167, 199) 26%,
			rgba(0, 16, 148, 1) 100%
		);
		box-sizing: border-box;
	}

	:global(*) {
		box-sizing: border-box;
	}

	main {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	:global(.icon) {
		color: rgba(0, 0, 0, 0.4);
		filter: drop-shadow(0 0 0.75rem white);
	}

	:global(button.convert:focus .icon) {
		color: #0092d7;
	}

	h1,
	h2 {
		text-align: center;
		margin: 0;
	}

	h1 {
		font-size: 3em;
		line-height: 1.5em;
	}

	h2 {
		line-height: 1.45em;
	}

	h2 > span[lang='en'] {
		font-size: 0.8em;
	}

	h2 {
		margin-bottom: 1em;
	}

	p {
		max-width: 30em;
		text-align: center;
		margin: 0;
		margin-bottom: 1em;
	}

	a {
		color: inherit;
	}
</style>
