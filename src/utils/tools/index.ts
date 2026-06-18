/**
 * 判断当前主题是否为浅色主题
 *
 * @param theme 主题名称，可以是 "light"（浅色）、"dark"（深色）或 "auto"（自动）
 * @returns 如果当前主题为浅色主题，则返回 true；否则返回 false
 */
export function isLightTheme(theme: string) {
	let light = theme === "light";
	if (theme === "auto") {
		light = window.matchMedia("(prefers-color-scheme: light)").matches;
	}
	return light;
}


/**
 * 判断当前主题是否为深色主题
 *
 * @param theme 主题名称，可选值为 'dark'、'light' 或 'auto'
 * @returns 如果当前主题为深色主题，则返回 true；否则返回 false
 */
export function isDarkTheme(theme: string) {
	let dark = theme === "dark";
	if (theme === "auto") {
		dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
	return dark;
}

/**
 * 判断一个值是否为字符串类型
 *
 * @param value 待判断的值 / The value to be checked
 * @returns 返回布尔值，表示该值是否为字符串类型 / Returns a boolean value indicating whether the value is of the string type
 */
export function isString(value: unknown) {
	return typeof value === "string";
}
/** 
 * 判断当前操作系统是否为 Windows 系统
 * @returns 如果当前操作系统为 Windows 系统，则返回 true；否则返回 false
 * @example
*/
export function isWindowsOs() {
	const windowsRegex = /windows|win32/i;
	return windowsRegex.test(navigator.userAgent);
}

/** 
 * 判断当前操作系统是否为 macOS 系统
 * @returns 如果当前操作系统为 macOS 系统，则返回 true；否则返回 false
 * @example
*/
export function isMacOs() {
	const macRegex = /macintosh|mac os x/i;
	return macRegex.test(navigator.userAgent);
}

export function toggleHtmlClass(className: string) {
	function add() {
		document.documentElement.classList.add(className);
	}

	function remove() {
		document.documentElement.classList.remove(className);
	}

	return {
		add,
		remove,
	};
}