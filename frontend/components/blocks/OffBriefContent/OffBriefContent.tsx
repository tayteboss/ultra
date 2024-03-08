import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';

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
`;

const Span = styled.span`
	color: var(--colour-orange);
`;

const Letter = (props: LetterProps) => {
	const { letter } = props;

	return <Span>{letter}</Span>;
};

const OffBriefContent = (props: Props) => {
	const { data } = props;

	const splitData = data.split('');

	return (
		<OffBriefContentWrapper>
			<LayoutWrapper>
				<Inner className="type-d1">
					{splitData.map((letter, index) => {
						return <Letter letter={letter} key={index} />;
					})}
				</Inner>
			</LayoutWrapper>
		</OffBriefContentWrapper>
	);
};

export default OffBriefContent;
