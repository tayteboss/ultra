import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	preCursor: string;
};

const HeroTitleWrapper = styled.section`
	padding-top: ${pxToRem(180)};
`;

const PreCursor = styled.span``;

const Inner = styled.h1`
	margin-bottom: ${pxToRem(32)};
`;

const HeroTitle = (props: Props) => {
	const { preCursor } = props;

	return (
		<HeroTitleWrapper>
			<LayoutWrapper>
				<Inner className="type-d1">
					{preCursor && <PreCursor>{preCursor}</PreCursor>}
				</Inner>
			</LayoutWrapper>
		</HeroTitleWrapper>
	);
};

export default HeroTitle;
