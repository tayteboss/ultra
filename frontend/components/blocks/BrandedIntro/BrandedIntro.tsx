import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string;
};

const BrandedIntroWrapper = styled.div`
	padding: 25vh 0 ${pxToRem(120)};
	background: var(--colour-black);
	position: sticky;
	top: 0;
`;

const Inner = styled.div``;

const Title = styled(motion.h1)`
	color: var(--colour-off-white);
	max-width: 1300px;
`;

const BrandedIntro = (props: Props) => {
	const { data } = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const wrapperRef = useRef<HTMLAnchorElement>(null);

	const { scrollY } = useScroll();

	const brightness = useTransform(
		scrollY,
		[distanceToTop + windowHeight, distanceToTop + windowHeight * 2],
		['brightness(1) blur(0px)', 'brightness(0) blur(2px)']
	);

	const scale = useTransform(
		scrollY,
		[
			distanceToTop,
			distanceToTop + windowHeight,
			distanceToTop + windowHeight * 2
		],
		[
			'scale(1) translateY(0)',
			'scale(1) translateY(0)',
			'scale(0.98) translateY(-550px)'
		]
	);

	useEffect(() => {
		if (wrapperRef?.current) {
			setDistanceToTop(
				window.pageYOffset +
					wrapperRef.current.getBoundingClientRect().top
			);
		}

		setWindowHeight(window.innerHeight);

		const timer = setTimeout(() => {
			if (wrapperRef?.current) {
				setDistanceToTop(
					window.pageYOffset +
						wrapperRef.current.getBoundingClientRect().top
				);
			}

			setWindowHeight(window.innerHeight);
		}, 1000);

		return () => clearTimeout(timer);
	}, [distanceToTop]);

	return (
		<BrandedIntroWrapper>
			<LayoutWrapper>
				<Link href="/about">
					<Inner
						className="cursor-text"
						data-text="Learn more"
						data-theme="orange"
					>
						<Title
							className="type-d1"
							style={{ filter: brightness, transform: scale }}
						>
							{data}
						</Title>
					</Inner>
				</Link>
			</LayoutWrapper>
		</BrandedIntroWrapper>
	);
};

export default BrandedIntro;
