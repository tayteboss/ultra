import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Props } from 'next/script';
import { useState, useRef, useEffect } from 'react';

const ProjectHeroTitleWrapper = styled(motion.div)`
	padding-top: ${pxToRem(180)};
	max-width: 90%;
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 100%;
		padding-top: ${pxToRem(120)};
		margin-bottom: ${pxToRem(16)};
	}
`;

const Inner = styled.div``;

const Title = styled.h1`
	color: var(--colour-off-white);
`;

const ProjectHeroTitle = (props: Props) => {
	const { title } = props;

	const [windowHeight, setWindowHeight] = useState(0);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollY } = useScroll();

	const transform = useTransform(
		scrollY,
		[0, windowHeight],
		['translateY(0) scale(1)', 'translateY(100px) scale(0.99)']
	);

	const blur = useTransform(
		scrollY,
		[0, windowHeight],
		['blur(0px) brightness(1)', 'blur(1px) brightness(0.7)']
	);

	useEffect(() => {
		setWindowHeight(window.innerHeight);

		const timer = setTimeout(() => {
			setWindowHeight(window.innerHeight);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<ProjectHeroTitleWrapper
			ref={wrapperRef}
			style={{ filter: blur, transform }}
		>
			<LayoutWrapper>
				<Inner className="type-d1">
					{title && <Title>{title}</Title>}
				</Inner>
			</LayoutWrapper>
		</ProjectHeroTitleWrapper>
	);
};

export default ProjectHeroTitle;
