<script lang="ts">
	import { dictionary } from './data'

	function sortDictionary(dictionary: Record<string, string>): [string, string][] {
		return Object.entries(dictionary).sort((a, b) => a[0].localeCompare(b[0]))
	}

	function isProperNoun(word: string): boolean {
		return word[0] === word[0].toUpperCase()
	}

	const NEED_FALLBACK = ['kulijo']
</script>

<table>
	<thead>
		<tr>
			<th>toki pona<br />sitelen Lasina</th>
			<th title="sitelen pona" class="sitelen-pona">
				<span title="toki pona">toki-pona</span><br /><span title="sitelen pona">sitelen-pona</span
				></th
			>

			<th><span title="toki pona">言善</span><br /><span title="sitelen Munjan">書文言</span></th>
			<!-- <JAN /> -->
		</tr>
	</thead>
	<tbody>
		{#if $dictionary}
			{#each sortDictionary($dictionary) as [latn, hani]}
				<tr>
					<td>{latn}</td>
					<td class="sitelen-pona" class:fallback-font={NEED_FALLBACK.includes(latn)}
						>{isProperNoun(latn) ? latn.toUpperCase() : latn}</td
					>
					<td>{hani}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style>
	@font-face {
		font-family: 'sitelen-pona';
		src: url('/linja-sike.otf') format('opentype');
	}

	@font-face {
		font-family: 'fallback-sitelen-pona';
		src: url('/FairfaxPonaHD.ttf') format('truetype');
	}

	td {
		text-align: center;
	}

	.sitelen-pona {
		font-family: 'sitelen-pona';
		font-size: 2em;
	}

	.sitelen-pona.fallback-font {
		font-family: 'fallback-sitelen-pona';
	}
</style>
