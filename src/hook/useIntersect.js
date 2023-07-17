import { useRef, useCallback, useEffect } from 'react';

export default function useIntersect(onIntersect, options = { threshold: 1 }) {
	const ref = useRef(null);

	const callback = useCallback(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) onIntersect(entry, observer);
			});
		},
		[onIntersect]
	);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(callback, options);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref, options, callback]);

	return ref;
}
