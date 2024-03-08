import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	data: string;
};

type LetterProps = {
	letter: string;
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0,
			ease: 'easeInOut',
			when: 'beforeChildren'
		}
	}
};

const letterVariants = {
	hidden: {
		opacity: 0,
		filter: 'blur(2px)',
		x: -10,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		filter: 'blur(0)',
		y: 0,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	}
};

const OffBriefContentWrapper = styled.section`
	margin-bottom: ${pxToRem(24)};
`;

const Inner = styled(motion.div)`
	background: var(--colour-black);
	border-radius: ${pxToRem(4)};
	padding: ${pxToRem(16)};
`;

const Span = styled(motion.span)`
	color: var(--colour-orange);
`;

const Letter = (props: LetterProps) => {
	const { letter } = props;

	return <Span variants={letterVariants}>{letter}</Span>;
};

const OffBriefContent = (props: Props) => {
	const { data } = props;

	const splitData = data.split('');

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<OffBriefContentWrapper ref={ref}>
			<LayoutWrapper>
				<Inner
					className="type-d1"
					variants={wrapperVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
					exit="hidden"
				>
					{splitData.map((letter, index) => {
						return <Letter letter={letter} key={index} />;
					})}
				</Inner>
			</LayoutWrapper>
		</OffBriefContentWrapper>
	);
};

export default OffBriefContent;
