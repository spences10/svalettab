(function () {
	const stored = localStorage.getItem('svalettab-theme');
	let theme = stored;
	if (!stored || stored === 'system') {
		theme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	document.documentElement.setAttribute('data-theme', theme);
})();
