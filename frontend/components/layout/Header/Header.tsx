import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LogoSvg from '../../svgs/LogoSvg';
import DesktopMenuList from '../../blocks/DesktopMenuList';
import LayoutWrapper from '../../common/LayoutWrapper';
import { useRouter } from 'next/router';
import throttle from 'lodash.throttle';
import { useRef, useEffect, useState } from 'react';
import useNoScroll from '../../../hooks/useNoScroll';

const HeaderWrapper = styled.header`
	position: fixed;
	top: ${pxToRem(8)};
	left: ${pxToRem(8)};
	background: rgba(0, 0, 0, 0.01);
	backdrop-filter: blur(5px);
	border-radius: ${pxToRem(4)};
	z-index: 100;
	height: ${pxToRem(33)};
`;

const Inner = styled.div`
	display: flex;
	gap: ${pxToRem(32)};
	padding: ${pxToRem(8)} 0;

	.logo {
		width: ${pxToRem(66)};
		height: ${pxToRem(17)};
	}
`;

const Header = () => {
	const [headerIsActive, setHeaderIsActive] = useState(true);
	const [menuIsActive, setMenuIsActive] = useState(false);

	const router = useRouter();

	const prevScrollPosRef = useRef(0);

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;

		if (currentScrollPos < 30) {
			setHeaderIsActive(true);
			return;
		}

		const isScrollingDown = currentScrollPos > prevScrollPosRef.current;

		setHeaderIsActive(!isScrollingDown);
		prevScrollPosRef.current = currentScrollPos;
	};

	useEffect(() => {
		if (menuIsActive) {
			useNoScroll(true);
		} else {
			useNoScroll(false);
		}
	}, [menuIsActive]);

	useEffect(() => {
		setMenuIsActive(false);
	}, [router]);

	useEffect(() => {
		const throttledHandleScroll = throttle(handleScroll, 100);
		window.addEventListener('scroll', throttledHandleScroll);

		return () => {
			window.removeEventListener('scroll', throttledHandleScroll);
		};
	}, []);

	return (
		<HeaderWrapper
			className="header"
			onMouseOver={() => setHeaderIsActive(true)}
		>
			<LayoutWrapper>
				<Inner>
					<LogoSvg color="white" />
					<DesktopMenuList headerIsActive={headerIsActive} />
				</Inner>
			</LayoutWrapper>
		</HeaderWrapper>
	);
};

export default Header;
