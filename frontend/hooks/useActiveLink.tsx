import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useActiveLink = (): string => {
	const [activeLink, setActiveLink] = useState<string>('Home');
	const router = useRouter();

	useEffect(() => {
		if (router.pathname === '/') {
			setActiveLink('Home');
		} else if (router.pathname === '/off-brief') {
			setActiveLink('Off Brief');
		} else if (router.pathname === '/about') {
			setActiveLink('About');
		} else if (
			router.pathname === '/news' ||
			router.pathname.includes('/news/')
		) {
			setActiveLink('News');
		} else if (router.pathname === '/contact') {
			setActiveLink('Contact');
		} else if (router.pathname.includes('/work')) {
			setActiveLink('Work');
		} else {
			setActiveLink('');
		}
	}, [router]);

	return activeLink;
};

export default useActiveLink;
