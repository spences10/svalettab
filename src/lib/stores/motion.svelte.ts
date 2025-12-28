import { browser } from '$app/environment';

function get_prefers_reduced_motion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)')
		.matches;
}

let reduced_motion = $state<boolean>(get_prefers_reduced_motion());

if (browser) {
	const media_query = window.matchMedia(
		'(prefers-reduced-motion: reduce)',
	);
	media_query.addEventListener('change', (e) => {
		reduced_motion = e.matches;
	});
}

export { reduced_motion };
