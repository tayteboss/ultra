import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LogoSvg from '../../svgs/LogoSvg';
import DesktopMenuList from '../../blocks/DesktopMenuList';
import { useRouter } from 'next/router';
import throttle from 'lodash.throttle';
import { useRef, useEffect, useState } from 'react';
import useNoScroll from '../../../hooks/useNoScroll';
import Link from 'next/link';

type Props = {
	menuIsActive: boolean;
	setMenuIsActive: (value: boolean) => void;
};

const HeaderWrapper = styled.header`
	position: fixed;
	top: ${pxToRem(8)};
	left: ${pxToRem(16)};
	/* background: rgba(255, 255, 255, 0.01); */
	/* backdrop-filter: blur(2px); */
	border-radius: ${pxToRem(4)};
	z-index: 100;
	height: ${pxToRem(33)};
	mix-blend-mode: var(--menu-blend-mode);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		left: ${pxToRem(8)};
		width: 100%;
		left: 0;
		padding: 0 ${pxToRem(8)};
	}
`;

const Inner = styled.div`
	display: flex;
	gap: ${pxToRem(32)};
	padding: ${pxToRem(8)} ${pxToRem(8)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		justify-content: space-between;
		width: 100%;
	}

	.logo {
		width: ${pxToRem(66)};
		height: ${pxToRem(17)};
	}
`;

const MobileMenuButton = styled.button`
	display: none;
	color: var(--menu-inactive);
	font-size: ${pxToRem(18)};

	transition: color var(--transition-speed-slow) var(--transition-ease);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		text-align: right;
	}
`;

const Header = (props: Props) => {
	const { menuIsActive, setMenuIsActive } = props;

	const [headerIsActive, setHeaderIsActive] = useState(true);

	const router = useRouter();

	const prevScrollPosRef = useRef(0);

	// const handleScroll = () => {
	// 	const currentScrollPos = window.pageYOffset;

	// 	const windowHeight = window.innerHeight;
	// 	const documentHeight = document.body.clientHeight;

	// 	if (currentScrollPos > documentHeight - windowHeight * 2) {
	// 		setHeaderIsActive(true);
	// 		return;
	// 	}

	// 	if (currentScrollPos < 30) {
	// 		setHeaderIsActive(true);
	// 		return;
	// 	}

	// 	const isScrollingDown = currentScrollPos > prevScrollPosRef.current;

	// 	setHeaderIsActive(!isScrollingDown);
	// 	prevScrollPosRef.current = currentScrollPos;
	// };

	// useEffect(() => {
	// 	if (menuIsActive) {
	// 		useNoScroll(true);
	// 	} else {
	// 		useNoScroll(false);
	// 	}
	// }, [menuIsActive]);

	// useEffect(() => {
	// 	setMenuIsActive(false);
	// }, [router]);

	// useEffect(() => {
	// 	const throttledHandleScroll = throttle(handleScroll, 50);
	// 	window.addEventListener('scroll', throttledHandleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', throttledHandleScroll);
	// 	};
	// }, []);

	return (
		<HeaderWrapper
			className="header"
			onMouseOver={() => setHeaderIsActive(true)}
			onMouseEnter={() => setHeaderIsActive(true)}
		>
			<Inner>
				<Link href="/" scroll={false}>
					<LogoSvg color="var(--menu-inactive)" />
				</Link>
				<DesktopMenuList headerIsActive={headerIsActive} />
				<MobileMenuButton
					onClick={() => setMenuIsActive(!menuIsActive)}
				>
					{menuIsActive ? 'Close' : 'Menu'}
				</MobileMenuButton>
			</Inner>
		</HeaderWrapper>
	);
};

export default Header;
