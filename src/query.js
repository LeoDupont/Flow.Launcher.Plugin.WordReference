import wr from "wordreference-api";
import { Config } from "./config.js";

/** Matches 3 groups in `<from><to> <phrase>` */
const PARAMS_REGEX = /^(\w{2})(\w{2}) (.*)/;

/**
 * From https://github.com/fega/wordreference-api
 * All combinations available
 */
const AVAILABLE_LANGUAGES = ["es", "en", "it", "fr"];

/**
 * - Parses a parameters string in the form `<from><to> <phrase>`
 * - Queries WordReference for the translations
 * - Displays the results
 * @param {string} parameters
 */
export async function query(parameters) {

	// === Parsing parameters ===

	const match = parameters.match(PARAMS_REGEX);
	if (match?.length !== 4) return sendResult();

	const fromLang = match[1];
	const toLang = match[2];
	const phrase = match[3];

	// Checking all languages are available and distinct:
	if (
		!AVAILABLE_LANGUAGES.includes(fromLang) ||
		!AVAILABLE_LANGUAGES.includes(toLang) ||
		fromLang === toLang
	) {
		return sendResult();
	}

	// === Querying WordReference ===

	const resp = await wr(phrase, fromLang, toLang);
	if (resp?.translations?.length < 1) return sendResult();

	// Flatten translations from each "section" (Principal, Compound forms, etc...):
	const translations = resp.translations.reduce((acc, section) => {
		acc.push(...section.translations);
		return acc;
	}, []);

	// === Displaying results ===

	const wrUrl = `https://www.wordreference.com/${fromLang}${toLang}/${phrase}`;

	const result = translations.map(translation => {

		const examples = [
			...translation.example.from,
			...translation.example.to
		];

		return {
			Title:
				`${translation.from} (${translation.fromType}) ➡️ ${translation.to} (${translation.toType})`,

			SubTitle: examples.join(" ➡️ "),

			IcoPath: Config.IcoPath,
			score: 100,

			jsonRPCAction: {
				method: "open_wordreference_page",
				parameters: [wrUrl]
			}
		};
	});

	sendResult(result);
}

function sendResult(result = []) {
	console.log(JSON.stringify({ result }));
}
