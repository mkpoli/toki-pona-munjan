import { writable } from 'svelte/store'

const DICT_URL =
	'https://raw.githubusercontent.com/mkpoli/rime-toki-pona-munjan/main/toki_pona.dict.yaml'

async function getDict(): Promise<Record<string, string>> {
	const response = await fetch(DICT_URL)
	const text = await response.text()
	const lines = text.split(/\r\n|\n/).slice(6)

	const items = lines
		.filter((line) => line && !line.startsWith('#') && line.includes('\t'))
		.map((line) => line.split('\t'))
		.map(([m, t]) => [t, m])

	return Object.fromEntries(items)
}

export const dictionary = writable<Record<string, string> | null>(null)

getDict().then((dict) => {
	dictionary.set(dict)
})
