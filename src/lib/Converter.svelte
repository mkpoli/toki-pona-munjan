<script lang="ts">
	import MdiTransferDown from '~icons/mdi/transfer-down'
	import smartquotes from 'smartquotes'
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

	const PUNCTUATIONS: Record<string, string> = {
		'.': '。',
		',': '，',
		':': '：',
		'“': '「',
		'”': '」'
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
		output = await convertTokiPona2MunJan(smartquotes(input))
	} /* TODO: sitelen munjan -> sitelen toki pona  */
</script>

<div class="container">
	<textarea class="text-box input-box" bind:value={input} />
	<!-- <div class="button-container"></div> -->
	<button class="convert" on:click={onConvert}>
		<MdiTransferDown class="icon" />
	</button>
	<div class="text-box output-box">{output}</div>
</div>

<style>
	textarea {
		resize: none;
		font-size: inherit;
		font-family: inherit;
	}

	.container {
		width: 820px; /* 800px -> 820px to account for new 10px padding */
		max-width: 100%;
		margin: 0 auto;
		padding: 0 1em; /* adds a horizontal padding for smaller screens */
		box-sizing: border-box; /* prevents the horizontal padding from causing overflow */
	}

	button.convert {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		background: white;
		background: rgba(255, 255, 255, 0.9);

		width: 5rem;
		height: 5rem;
		margin: -2rem auto;
		margin-bottom: -1rem;
		border: none;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		position: relative;
		z-index: 3;

		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px); /* Safari */

		box-shadow: 1px 2px 3px 3px rgba(0, 0%, 0%, 10%);
		-webkit-box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.1); /* Chrome, Safari, Firefox, IE, Opera, ... */
		-moz-box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.1); /* earlier versions of Firefox*/
	}

	button.convert:hover {
		filter: brightness(1.2);
	}

	.text-box {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		padding: 1.2em 1.7em;
		border-radius: 10px;
		border: none;
		width: 100%;
		box-sizing: border-box; /* fixes overflow issue on smaller screens; box-sizing does not inherit */
		min-height: calc((100vh - 25rem) / 2);

		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px); /* Safari */

		box-shadow: 2px 2px 1px 5px rgba(0, 0%, 0%, 1%);
		-webkit-box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.03); /* Chrome, Safari, Firefox, IE, Opera, ... */
		-moz-box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.03); /* earlier versions of Firefox*/
	}

	.input-box {
		background: white;
		background: rgba(255, 255, 255, 0.8);
		color: black;
		color: rgb(0, 6, 94); /* For browsers that don't support RGB percentages */
		color: rgb(0% 2.46% 36.8%);
	}

	.output-box {
		/* makes the output box look different from the input box to avoid user confusion */
		background: black;
		background: rgba(
			0,
			6,
			65,
			0.6
		); /* basically the text color for .input-box, but with some transparency, and with 
					            the blue component toned down a bit */
		color: #eee;
	}
</style>
