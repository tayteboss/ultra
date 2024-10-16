import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import moment from 'moment';

const ProjectHeroTitleWrapper = styled(motion.div)`
	padding-top: ${pxToRem(180)};
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 100%;
		padding-top: ${pxToRem(120)};
		margin-bottom: ${pxToRem(16)};
	}
`;

const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column-reverse;
		align-items: flex-start;
		gap: ${pxToRem(8)};
	}
`;

const Title = styled.h1<{ $useLight: boolean }>`
	color: ${(props) =>
		props.$useLight ? 'var(--colour-black)' : 'var(--colour-off-white)'};
`;

const DateText = styled.p`
	opacity: 0.5;
	text-align: right;
`;

type Props = {
	title?: string;
	useLight?: boolean;
	date?: string;
};

const ProjectHeroTitle = (props: Props) => {
	const { title, date, useLight } = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [formattedDate, setFormattedDate] = useState('');

	useEffect(() => {
		if (date) {
			setFormattedDate(moment(date).format('MMM YYYY'));
		}
	}, [date]);

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
					{title && (
						<Title $useLight={useLight || false}>{title}</Title>
					)}
					{formattedDate && <DateText>{formattedDate}</DateText>}
				</Inner>
			</LayoutWrapper>
		</ProjectHeroTitleWrapper>
	);
};

export default ProjectHeroTitle;
