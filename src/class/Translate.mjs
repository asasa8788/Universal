import { Console, fetch } from "@nsnanocat/util";
import MD5 from "crypto-js/md5.js";

export default class Translate {
	constructor(options = {}) {
		this.Name = "Translate";
		this.Version = "1.0.8";
		Console.log(`🟧 ${this.Name} v${this.Version}`);
		this.Source = "AUTO";
		this.Target = "ZH";
		this.API = {};
		Object.assign(this, options);
	}

	#LanguagesCode = {
		Google: {
			AUTO: "auto",
			AF: "af",
			AM: "am",
			AR: "ar",
			AS: "as",
			AY: "ay",
			AZ: "az",
			BG: "bg",
			BE: "be",
			BM: "bm",
			BN: "bn",
			BHO: "bho",
			CS: "cs",
			DA: "da",
			DE: "de",
			EL: "el",
			EU: "eu",
			EN: "en",
			"EN-GB": "en",
			"EN-US": "en",
			"EN-US SDH": "en",
			ES: "es",
			"ES-419": "es",
			"ES-ES": "es",
			ET: "et",
			FI: "fi",
			FR: "fr",
			"FR-CA": "fr",
			HU: "hu",
			ID: "id",
			IS: "is",
			IT: "it",
			JA: "ja",
			KM: "km",
			KO: "ko",
			LT: "lt",
			LV: "lv",
			NL: "nl",
			NO: "no",
			PL: "pl",
			PT: "pt",
			"PT-PT": "pt",
			"PT-BR": "pt",
			PA: "pa",
			RO: "ro",
			RU: "ru",
			SK: "sk",
			SL: "sl",
			SQ: "sq",
			ST: "st",
			SV: "sv",
			TH: "th",
			TR: "tr",
			UK: "uk",
			UR: "ur",
			VI: "vi",
			ZH: "zh",
			"ZH-HANS": "zh-CN",
			"ZH-HK": "zh-TW",
			"ZH-HANT": "zh-TW",
		},
		Microsoft: {
			AUTO: "",
			AF: "af",
			AM: "am",
			AR: "ar",
			AS: "as",
			AY: "ay",
			AZ: "az",
			BG: "bg",
			BE: "be",
			BM: "bm",
			BN: "bn",
			BHO: "bho",
			CS: "cs",
			DA: "da",
			DE: "de",
			EL: "el",
			EU: "eu",
			EN: "en",
			"EN-GB": "en",
			"EN-US": "en",
			"EN-US SDH": "en",
			ES: "es",
			"ES-419": "es",
			"ES-ES": "es",
			ET: "et",
			FI: "fi",
			FR: "fr",
			"FR-CA": "fr-ca",
			HU: "hu",
			ID: "id",
			IS: "is",
			IT: "it",
			JA: "ja",
			KM: "km",
			KO: "ko",
			LT: "lt",
			LV: "lv",
			NL: "nl",
			NO: "no",
			PL: "pl",
			PT: "pt",
			"PT-PT": "pt-pt",
			"PT-BR": "pt",
			PA: "pa",
			RO: "ro",
			RU: "ru",
			SK: "sk",
			SL: "sl",
			SQ: "sq",
			ST: "st",
			SV: "sv",
			TH: "th",
			TR: "tr",
			UK: "uk",
			UR: "ur",
			VI: "vi",
			ZH: "zh-Hans",
			"ZH-HANS": "zh-Hans",
			"ZH-HK": "yue",
			"ZH-HANT": "zh-Hant",
		},
		DeepL: { AUTO: "", BG: "BG", CS: "CS", DA: "DA", DE: "de", EL: "el", EN: "EN", ES: "ES", ET: "ET", FI: "FI", FR: "FR", HU: "HU", ID: "ID", IT: "IT", JA: "JA", KO: "ko", LT: "LT", LV: "LV", NL: "NL", PL: "PL", PT: "PT", RO: "RO", RU: "RU", SK: "SK", SL: "SL", SV: "SV", TR: "TR", ZH: "ZH" },
		Baidu: {
			AUTO: "auto",
			AR: "ara",
			CS: "cs",
			DA: "dan",
			DE: "de",
			EL: "el",
			EN: "en",
			ES: "spa",
			ET: "est",
			FI: "fin",
			FR: "fra",
			HU: "hu",
			IT: "it",
			JA: "jp",
			KO: "kor",
			NL: "nl",
			PL: "pl",
			PT: "pt",
			RO: "RO",
			RU: "rom",
			SL: "slo",
			SV: "swe",
			TH: "th",
			VI: "vie",
			ZH: "zh",
			"ZH-HANS": "zh",
			"ZH-HK": "cht",
			"ZH-HANT": "cht",
		},
	};

	#UAPool = [
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", // 13.5%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", // 6.6%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0", // 6.4%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0", // 6.2%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", // 5.2%
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36", // 4.8%
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
		"Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1",
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
		"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0",
	];

	#Length = {
		Google: 120,
		GoogleCloud: 120,
		Microsoft: 99,
		Azure: 99,
		DeepL: 49,
	};

	async Google(text = [], source = this.Source, target = this.Target) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.Google[source] ?? this.#LanguagesCode.Google[source?.split?.(/[-_]/)?.[0]] ?? source.toLowerCase();
		target = this.#LanguagesCode.Google[target] ?? this.#LanguagesCode.Google[target?.split?.(/[-_]/)?.[0]] ?? target.toLowerCase();
		const BaseRequest = [
			{
				// Google API
				url: "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t",
				headers: {
					Accept: "*/*",
					"User-Agent": this.#UAPool[Math.floor(Math.random() * this.#UAPool.length)], // 随机UA
					Referer: "https://translate.google.com",
				},
			},
			{
				// Google Dictionary Chrome extension https://chrome.google.com/webstore/detail/google-dictionary-by-goog/mgijmajocgfcbeboacabfgobmjgjcoja
				url: "https://clients5.google.com/translate_a/t?client=dict-chrome-ex",
				headers: {
					Accept: "*/*",
					"User-Agent": this.#UAPool[Math.floor(Math.random() * this.#UAPool.length)], // 随机UA
				},
			},
			{
				// Google Translate App
				url: "https://translate.google.com/translate_a/single?client=it&dt=qca&dt=t&dt=rmt&dt=bd&dt=rms&dt=sos&dt=md&dt=gt&dt=ld&dt=ss&dt=ex&otf=2&dj=1&hl=en&ie=UTF-8&oe=UTF-8",
				headers: {
					Accept: "*/*",
					"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)",
				},
			},
			{
				// Google Translate App
				url: "https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&source=bubble&dt=t&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at",
				headers: {
					Accept: "*/*",
					"User-Agent": "GoogleTranslate/6.29.59279 (iPhone; iOS 15.4; en; iPhone14,2)",
				},
			},
		];
		const request = BaseRequest[Math.floor(Math.random() * (BaseRequest.length - 2))]; // 随机Request, 排除最后两项
		request.url = `${request.url}&sl=${source}&tl=${target}&q=${encodeURIComponent(text.join("\r"))}`;
		return await fetch(request)
			.then(response => {
				const body = JSON.parse(response.body);
				if (Array.isArray(body)) {
					if (Array.isArray(body?.[0])) {
						if (body.length === 1) {
							body[0].pop();
							text = body[0] ?? `翻译失败, vendor: ${"google"}`;
						} else text = body?.[0]?.map(item => item?.[0] ?? `翻译失败, vendor: ${"google"}`);
					} else text = body ?? `翻译失败, vendor: ${"google"}`;
				} else if (body?.sentences) text = body?.sentences?.map(item => item?.trans ?? `翻译失败, vendor: ${"google"}`);
				return text?.join("")?.split(/\r/);
			})
			.catch(error => Promise.reject(error));
	}

	async GoogleCloud(text = [], source = this.Source, target = this.Target, api = this.API) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.Google[source] ?? this.#LanguagesCode.Google[source?.split?.(/[-_]/)?.[0]] ?? source.toLowerCase();
		target = this.#LanguagesCode.Google[target] ?? this.#LanguagesCode.Google[target?.split?.(/[-_]/)?.[0]] ?? target.toLowerCase();
		const request = {};
		const BaseURL = "https://translation.googleapis.com";
		switch (api?.Version) {
			case "v2":
			default:
				request.url = `${BaseURL}/language/translate/v2`;
				request.headers = {
					//"Authorization": `Bearer ${api?.Token ?? api?.Auth}`,
					"User-Agent": "DualSubs",
					"Content-Type": "application/json; charset=utf-8",
				};
				request.body = JSON.stringify({
					q: text,
					source: source,
					target: target,
					format: "html",
					//"key": api?.Key
				});
				switch (api?.Mode) {
					case "Token":
						request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
						break;
					case "Key":
					default:
						request.url += `?key=${api?.Key ?? api?.Auth}`;
						break;
				}
				break;
			case "v3":
				request.url = `${BaseURL}/v3/projects/${api?.ID}`;
				request.headers = {
					Authorization: `Bearer ${api?.Token ?? api?.Auth}`,
					"x-goog-user-project": api?.ID,
					"User-Agent": "DualSubs",
					"Content-Type": "application/json; charset=utf-8",
				};
				request.body = JSON.stringify({
					sourceLanguageCode: source,
					targetLanguageCode: target,
					contents: Array.isArray(text) ? text : [text],
					mimeType: "text/html",
				});
				break;
		}
		return await fetch(request)
			.then(response => {
				const body = JSON.parse(response.body);
				return body?.data?.translations?.map(item => item?.translatedText ?? `翻译失败, vendor: ${"GoogleCloud"}`);
			})
			.catch(error => Promise.reject(error));
	}

	async Microsoft(text = [], source = this.Source, target = this.Target, api = this.API) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.Microsoft[source] ?? this.#LanguagesCode.Microsoft[source?.split?.(/[-_]/)?.[0]] ?? source.toLowerCase();
		target = this.#LanguagesCode.Microsoft[target] ?? this.#LanguagesCode.Microsoft[target?.split?.(/[-_]/)?.[0]] ?? target.toLowerCase();
		const request = {};
		let BaseURL = "https://api.cognitive.microsofttranslator.com";
		switch (api?.Version) {
			case "Azure":
			default:
				BaseURL = "https://api.cognitive.microsofttranslator.com";
				break;
			case "AzureCN":
				BaseURL = "https://api.translator.azure.cn";
				break;
			case "AzureUS":
				BaseURL = "https://api.cognitive.microsofttranslator.us";
				break;
		}
		request.url = `${BaseURL}/translate?api-version=3.0&textType=html&${source ? `from=${source}` : ""}&to=${target}`;
		request.headers = {
			"Content-Type": "application/json; charset=UTF-8",
			Accept: "application/json, text/javascript, */*; q=0.01",
			"Accept-Language": "zh-hans",
			//"Authorization": `Bearer ${api?.Auth}`,
			//"Ocp-Apim-Subscription-Key": api?.Auth,
			//"Ocp-Apim-Subscription-Region": api?.Region, // chinanorth, chinaeast2
			//"X-ClientTraceId": uuidv4().toString()
		};
		switch (api?.Mode) {
			case "Token":
			default:
				request.headers.Authorization = `Bearer ${api?.Token ?? api?.Auth}`;
				break;
			case "Key":
				request.headers["Ocp-Apim-Subscription-Key"] = api?.Key ?? api?.Auth;
				request.headers["Ocp-Apim-Subscription-Region"] = api?.Region;
				break;
		}
		text = text.map(item => {
			return { text: item };
		});
		request.body = JSON.stringify(text);
		return await fetch(request)
			.then(response => {
				const body = JSON.parse(response.body);
				return body?.map(item => item?.translations?.[0]?.text ?? `翻译失败, vendor: ${"Microsoft"}`);
			})
			.catch(error => Promise.reject(error));
	}

	async DeepL(text = [], source = this.Source, target = this.Target, api = this.API) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.DeepL[source] ?? this.#LanguagesCode.DeepL[source?.split?.(/[-_]/)?.[0]] ?? source.toLowerCase();
		target = this.#LanguagesCode.DeepL[target] ?? this.#LanguagesCode.DeepL[target?.split?.(/[-_]/)?.[0]] ?? target.toLowerCase();
		const request = {};
		let BaseURL = "https://api-free.deepl.com";
		switch (api?.Version) {
			case "Free":
			default:
				BaseURL = "https://api-free.deepl.com";
				break;
			case "Pro":
				BaseURL = "https://api.deepl.com";
				break;
		}
		request.url = `${BaseURL}/v2/translate`;
		request.headers = {
			//"Accept": "*/*",
			"User-Agent": "DualSubs",
			"Content-Type": "application/json",
			Authorization: `DeepL-Auth-Key ${api?.Token ?? api?.Auth}`,
		};
		const body = {
			text: text,
			//"source_lang": source,
			target_lang: target,
			tag_handling: "html",
		};
		if (source) body.source_lang = source;
		request.body = JSON.stringify(body);
		return await fetch(request)
			.then(response => {
				const body = JSON.parse(response.body);
				return body?.translations?.map(item => item?.text ?? `翻译失败, vendor: ${"DeepL"}`);
			})
			.catch(error => Promise.reject(error));
	}

	// DeepLX：自建 DeepL 兼容服务（协议定稿 Docs/03 §8）
	// 令牌桶与全局暂停为类级共享：同一次脚本执行内所有并发分片共用（Docs/03 §8.2）
	static #Bucket = { tokens: 10, last: Date.now(), rate: 2, capacity: 10 }; // 2 req/s，桶 10（Docs/07 第二轮：3/s 并发突发会触发 DeepL 限流）
	static #Pause = { until: 0, delay: 1000 }; // 429/5xx 全局暂停，指数退避 1s→30s 封顶（盖过 DeepL ~1 分钟限流窗口）

	async DeepLX(text = [], source = this.Source, target = this.Target, api = this.API) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.DeepL[source] ?? this.#LanguagesCode.DeepL[source?.split?.(/[-_]/)?.[0]] ?? source.toLowerCase();
		target = this.#LanguagesCode.DeepL[target] ?? this.#LanguagesCode.DeepL[target?.split?.(/[-_]/)?.[0]] ?? target.toLowerCase();
		if (!api?.Endpoint) return text.map(() => `翻译失败, vendor: DeepLX(未配置 Endpoint)`);
		// v2 数组协议端点派生：.../translate → .../v2/translate（服务端逐条独立翻译：
		// 无段数漂移、无回显连坐、按条缓存跨视频复用——Docs/07 第三轮定稿）
		const endpoint = api.Endpoint.replace(/\/translate\/?(\?.*)?$/, "/v2/translate");
		const headers = { "Content-Type": "application/json", "User-Agent": "DualSubs", Accept: "*/*" };
		const token = api?.Token ?? api?.Auth; // Token ?? Auth 整体判断
		if (token) headers.Authorization = `Bearer ${token}`;
		// 行级去重 + 空行过滤：相同行仅请求一次；空行无需翻译，原样返回
		const unique = [...new Set(text)];
		const translatable = unique.filter(line => line.trim() !== "");
		// 失败隔离分批：每批 ≤20 条（与编排器 Part 粒度对齐）；批失败 → 该批回填原文，响应永远完整
		const batches = [];
		for (let index = 0; index < translatable.length; index += 20) batches.push(translatable.slice(index, index + 20));
		const map = new Map();
		for (const batch of batches) {
			try {
				const translations = await this.#DeepLXFetch({
					url: endpoint,
					headers,
					body: JSON.stringify({ text: batch, source_lang: source, target_lang: target }),
					timeout: 30, // 服务端受控并发逐条处理，长批放宽超时（Docs/03 §8.3）
				});
				batch.forEach((line, index) => map.set(line, translations[index] ?? line));
			} catch (error) {
				// 失败隔离：本批回填原文，绝不整体失败（Docs/07 第三轮：全有或全无 → 永远显示）
				Console.error(`DeepLX: 批量(${batch.length}条)失败，本批回填原文`, error?.message ?? error);
				batch.forEach(line => map.set(line, line));
			}
		}
		return text.map(line => map.get(line) ?? line); // 空行原样返回
	}

	static async #waitToken() {
		for (;;) {
			const now = Date.now();
			if (now < Translate.#Pause.until) {
				await new Promise(resolve => setTimeout(resolve, Translate.#Pause.until - now));
				continue;
			}
			const bucket = Translate.#Bucket;
			bucket.tokens = Math.min(bucket.capacity, bucket.tokens + (now - bucket.last) / 1000 * bucket.rate);
			bucket.last = now;
			if (bucket.tokens >= 1) {
				bucket.tokens--;
				return;
			}
			await new Promise(resolve => setTimeout(resolve, Math.ceil((1 - bucket.tokens) / bucket.rate * 1000)));
		}
	}

	static #pause() {
		Translate.#Pause.until = Date.now() + Translate.#Pause.delay;
		Translate.#Pause.delay = Math.min(Translate.#Pause.delay * 2, 30000);
	}

	async #DeepLXFetch(request) {
		await Translate.#waitToken();
		const response = await fetch(request);
		if (response.status === 429 || response.status >= 500) {
			Translate.#pause(); // 全局暂停后抛出，由编排器 retry 退避接管
			Console.error(`DeepLX: HTTP ${response.status}（上游限频/故障，已全局暂停）`);
			throw new Error(`DeepLX: HTTP ${response.status}`);
		}
		let result;
		try {
			result = JSON.parse(response.body);
		} catch {
			Console.error(`DeepLX: 响应非 JSON（HTTP ${response.status}）`, String(response.body ?? "").slice(0, 120));
			throw new Error(`DeepLX: 响应非 JSON`);
		}
		const translations = Array.isArray(result?.translations) ? result.translations.map(item => String(item?.text ?? "")) : null;
		if (!translations) {
			Console.error(`DeepLX: 响应缺少 translations（HTTP ${response.status}）`, JSON.stringify(result).slice(0, 120));
			throw new Error(`DeepLX: 响应缺少 translations`);
		}
		return translations;
	}

	async BaiduFanyi(text = [], source = this.Source, target = this.Target, api = this.API) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.Baidu[source] ?? this.#LanguagesCode.Baidu[source?.split?.(/[-_]/)?.[0]] ?? source.toLowerCase();
		target = this.#LanguagesCode.Baidu[target] ?? this.#LanguagesCode.Baidu[target?.split?.(/[-_]/)?.[0]] ?? target.toLowerCase();
		const request = {};
		// https://fanyi-api.baidu.com/doc/24
		const BaseURL = "https://fanyi-api.baidu.com";
		request.url = `${BaseURL}/api/trans/vip/language`;
		request.headers = {
			"User-Agent": "DualSubs",
			"Content-Type": "application/x-www-form-urlencoded",
		};
		const salt = new Date().getTime();
		request.body = `q=${encodeURIComponent(text.join("\n"))}&from=${source}&to=${target}&appid=${api.id}&salt=${salt}&sign=${MD5(api.id + text + salt + api.key)}`;
		return await fetch(request)
			.then(response => {
				const body = JSON.parse(response.body);
				return body?.trans_result?.map(item => item?.dst ?? `翻译失败, vendor: ${"BaiduFanyi"}`);
			})
			.catch(error => Promise.reject(Console.error(error)));
	}

	async YoudaoAI(text = [], source = this.Source, target = this.Target, api = this.API) {
		text = Array.isArray(text) ? text : [text];
		source = this.#LanguagesCode.Youdao[source] ?? this.#LanguagesCode.Youdao[source?.split?.(/[-_]/)?.[0]];
		target = this.#LanguagesCode.Youdao[target] ?? this.#LanguagesCode.Youdao[target?.split?.(/[-_]/)?.[0]];
		const request = {};
		// https://ai.youdao.com/docs
		// https://ai.youdao.com/DOCSIRMA/html/自然语言翻译/API文档/文本翻译服务/文本翻译服务-API文档.html
		const BaseURL = "https://openapi.youdao.com";
		request.url = `${BaseURL}/api`;
		request.headers = {
			"User-Agent": "DualSubs",
			"Content-Type": "application/json; charset=utf-8",
		};
		request.body = {
			q: text,
			from: source,
			to: target,
			appKey: api?.Key,
			salt: new Date().getTime(),
			signType: "v3",
			sign: "",
			curtime: Math.floor(+new Date() / 1000),
		};
		return await fetch(request)
			.then(response => {
				const body = JSON.parse(response.body);
				return body?.data ?? `翻译失败, vendor: ${"DeepL"}`;
			})
			.catch(error => Promise.reject(error));
	}
}
