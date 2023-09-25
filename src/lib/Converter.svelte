<script lang="ts">
	import MdiTransferDown from '~icons/mdi/transfer-down'
	import smartquotes from 'smartquotes'
	import { tick } from 'svelte'
	import { caret } from './caret'
	import Suggestions from './Suggestions.svelte'

	import { dictionary } from '$lib/data'

	// let textArea: HTMLTextAreaElement
	let input: string = ''
	let output: string = ''

	const PUNCTUATIONS: Record<string, string> = {
		'.': '。',
		',': '，',
		':': '：',
		'“': '「',
		'”': '」'
	}

	/* TODO: sitelen toki pona -> sitelen munjan */
	function convertTokiPona2MunJan(tokiPona: string, dictionary: Record<string, string>): string {
		const words = tokiPona
			.split(/([\W])/)
			.filter((word) => word !== ' ')
			.map((word) => (word in PUNCTUATIONS ? PUNCTUATIONS[word] : word))
		return words.map((word) => (dictionary[word] ? dictionary[word] : word)).join('')
	}

	$: if ($dictionary && input) {
		output = convertTokiPona2MunJan(smartquotes(input), $dictionary)
	}

	let suggestionBox: HTMLDivElement

	let suggestions: string[] = ['a', 'b', 'c']

	// function getLastChar()

	function compileSuggestions(
		input: string,
		caretPos: number,
		dictionary: Record<string, string>
	): string[] {
		// Get caret position
		console.log('carretPos', caretPos)
		console.log('inputLength', input.length)

		// Get substring until caret position
		const sub = input.slice(0, caretPos)
		console.log('sub', sub)

		// Get the last word
		const lastWord = sub.split(/[\s\W]/).pop()

		if (!lastWord) return []
		return Object.keys(dictionary).filter((word) => word.startsWith(lastWord))
	}

	$: if ($dictionary) {
		suggestions = compileSuggestions(input, caretPos, $dictionary)
	}

	let textArea: HTMLTextAreaElement

	let caretRect: DOMRect | undefined = undefined
	let caretPos: number = 0
</script>

<Suggestions
	bind:box={suggestionBox}
	{suggestions}
	rect={caretRect}
	{textArea}
	on:select={async ({ detail: repl }) => {
		const beforeCaret = input.slice(0, caretPos)
		const lastWord = beforeCaret.split(/[\s\W]/).pop()
		if (!lastWord) return
		const afterCaret = input.slice(caretPos)
		input =
			beforeCaret.slice(0, -lastWord.length) +
			repl +
			(afterCaret.startsWith(' ') ? '' : ' ') +
			afterCaret
		await tick()
		textArea.setSelectionRange(input.length - afterCaret.length, input.length - afterCaret.length)
	}}
/>

<div class="container">
	<textarea
		class="text-box input-box"
		bind:value={input}
		bind:this={textArea}
		use:caret
		on:caretmove={({
			detail: {
				rect,
				selection: { end }
			}
		}) => {
			caretRect = rect
			caretPos = end
		}}
	/>
	<!-- <div class="button-container"></div> -->
	<div class="convert">
		<MdiTransferDown class="icon" />
	</div>
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

	.convert {
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

		box-shadow: 1px 2px 3px 3px rgba(0, 0%, 0%, 10%);
		-webkit-box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.1); /* Chrome, Safari, Firefox, IE, Opera, ... */
		-moz-box-shadow: 1px 2px 3px 3px rgba(0, 0, 0, 0.1); /* earlier versions of Firefox*/
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
		white-space: break-spaces;
		word-break: break-all;
	}
</style>
