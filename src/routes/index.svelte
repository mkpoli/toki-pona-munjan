<script lang="ts">
	import Icon from '@iconify/svelte';
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
			.map((line) => line.split('\t')).map(([m, t]) => [t, m])

		return Object.fromEntries(items)
	}
	
	const PUNCTUATIONS = {
		'.': "。",
		',': "，",
		':': "："
	}

	/* TODO: sitelen toki pona -> sitelen munjan */
	async function convertTokiPona2MunJan(tokiPona: string): Promise<string> {
		if (!dictionary) {
			dictionary = await getDict()
		}
		const words = tokiPona.split(/([\W])/).filter(word => word && word != ' ').map(word => word in PUNCTUATIONS ? PUNCTUATIONS[word] : word)
		return words.map((word) => dictionary[word] ? dictionary[word] : word).join('')
	}


	async function onConvert() {
		if (!input) return
		 output = await convertTokiPona2MunJan(input) 
	}	/* TODO: sitelen munjan -> sitelen toki pona  */
	
</script>

<div class="container">
	<textarea class="text-box" bind:value={input} />
	<!-- <div class="button-container"></div> -->
	<button class="convert" on:click={onConvert}>
		<Icon class="icon" icon="mdi:transfer-down" />
	</button>
	<div class="text-box">{output}</div>
</div>

<style>
	:global(html) {
		font-size: 10px;
	}

	:global(body) {
		height: 100%;
		margin: 0;
		font-size: 2em;
		background: rgba(0,16,148,1) 100%;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-image: linear-gradient(0deg, rgba(241,253,249,1) 0%, rgba(0,212,255,1) 26%, rgba(0,16,148,1) 100%);
		box-sizing: border-box;
	}

	textarea {
		resize: none;
		font-size: inherit;
		font-family: inherit;
	}

	.container {
		width: 800px;
		margin: 0 auto;
		padding: 3rem 0;
	}

	button.convert {
		appearance: none;
		background: white;
		width: 5rem;
		height: 5rem;
		margin: -2rem auto;
		margin-bottom: -1rem;
		border: none;
		border-radius: 50%;
		box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 10%);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);		
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		position: relative;
		z-index: 3;
	}

	button.convert:hover {
		filter: brightness(1.2);
	}

	:global(.icon) {
		color: rgba(0, 0, 0, 0.4);
		filter: drop-shadow(0 0 0.75rem white);;
	}

	:global(button.convert:focus .icon) {
		color: #0092d7;
	}

	.text-box {
		appearance: none;
		padding: 1.2em 1.7em;
		border-radius: 10px;
		border: none;
		box-shadow: 2px 2px 1px 5px rgba(0, 0, 0, 1%);
		background: white;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		width: 100%;
		min-height: calc((100vh - 10em) / 2);

		color: rgb(0% 2.46% 36.8%);
	}
</style>