import Image from 'next/image';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useViewportWidth from '../../../hooks/useViewportWidth';

const ArticleHeroImageWrapper = styled.section``;

const Inner = styled(motion.div)`
	width: 100%;
`;

const DesktopWrapper = styled.div`
	height: 100svh;
	width: 100%;
	position: relative;
	border-radius: ${pxToRem(4)};
	overflow: hidden;

	img,
	mux-player {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

type Props = {
	heroImage: string;
};

const ArticleHeroImage = (props: Props) => {
	const { heroImage } = props;

	const [windowHeight, setWindowHeight] = useState(0);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollY } = useScroll();

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';

	const padding = useTransform(
		scrollY,
		[0, windowHeight * 0.5],
		[isMobile ? '8px' : '16px', '0px']
	);

	useEffect(() => {
		setWindowHeight(window.innerHeight);

		const timer = setTimeout(() => {
			setWindowHeight(window.innerHeight);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{heroImage && (
				<ArticleHeroImageWrapper ref={wrapperRef}>
					<Inner style={{ padding }}>
						<DesktopWrapper>
							<Image
								src={heroImage}
								alt="Hero image"
								fill
								priority={true}
							/>
						</DesktopWrapper>
					</Inner>
				</ArticleHeroImageWrapper>
			)}
		</>
	);
};

export default ArticleHeroImage;
