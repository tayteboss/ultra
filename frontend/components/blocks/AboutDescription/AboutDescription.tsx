import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	data: string;
};

const AboutDescriptionWrapper = styled.section`
	margin-bottom: ${pxToRem(80)};
`;

const Inner = styled.div``;

const Description = styled.h2``;

const AboutDescription = (props: Props) => {
	const { data } = props;

	return (
		<AboutDescriptionWrapper>
			<LayoutWrapper>
				<Inner>
					<Description>{data}</Description>
				</Inner>
			</LayoutWrapper>
		</AboutDescriptionWrapper>
	);
};

export default AboutDescription;
