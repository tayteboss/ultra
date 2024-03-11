import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
	data: string;
};

type LetterProps = {
	letter: string;
};

const OffBriefContentWrapper = styled.section`
	margin-bottom: ${pxToRem(24)};
`;

const Inner = styled.div`
	background: var(--colour-black);
	border-radius: ${pxToRem(4)};
	padding: ${pxToRem(16)};
	display: flex;
	flex-wrap: wrap;
	overflow: hidden;
`;

const Span = styled(motion.span)<{ $inlineBlock: boolean }>`
	color: var(--colour-orange);
	position: relative;
	display: ${(props) => props.$inlineBlock && 'inline-block'};
`;

const Word = styled.span`
	display: inline;
	white-space: pre;
`;

const Letter = (props: LetterProps) => {
	const { letter } = props;

	const [isActive, setIsActive] = useState(false);

	const randInt = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1)) + min;

	const letterVariants = {
		hidden: {
			filter: 'blur(0px)',
			transition: {
				duration: randInt(1, 3),
				ease: 'easeInOut'
			}
		},
		visible: {
			filter: 'blur(2px)',
			scale: randInt(-0.5, 2.5),
			x: randInt(-100, 100),
			y: randInt(-100, 100),
			rotate: randInt(-180, 180),
			transition: {
				duration: randInt(2, 3),
				ease: 'easeInOut'
			}
		}
	};

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				setIsActive(false);
			}, 3000);
		}
	}, [isActive]);

	return (
		<Span
			initial="hidden"
			animate={isActive ? 'visible' : 'hidden'}
			onMouseOver={() => setIsActive(true)}
			variants={letterVariants}
			$inlineBlock={letter !== ' '}
		>
			{letter}
		</Span>
	);
};

const OffBriefContent = (props: Props) => {
	const { data } = props;

	const words = data.split(' ').map((word) => [...word, ' ']);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<OffBriefContentWrapper ref={ref}>
			<LayoutWrapper>
				<Inner className="type-d1">
					{words.map((word, i) => {
						return (
							<Word key={i}>
								{word.map((letter, j) => {
									return <Letter letter={letter} key={j} />;
								})}
							</Word>
						);
					})}
				</Inner>
			</LayoutWrapper>
		</OffBriefContentWrapper>
	);
};

export default OffBriefContent;
