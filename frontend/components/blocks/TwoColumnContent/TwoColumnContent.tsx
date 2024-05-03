import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import { PortableText } from '@portabletext/react';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	title: string;
	content: [];
};

const TwoColumnContentWrapper = styled.section`
	padding: ${pxToRem(120)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(60)} 0;
	}
`;

const Title = styled.h3`
	grid-column: 1 / 6;
	color: var(--colour-off-white);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
		margin-bottom: ${pxToRem(24)};
	}
`;

const ContentWrapper = styled.div`
	grid-column: 7 / -1;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: 1 / -1;
	}

	* {
		color: var(--colour-off-white);
		font-size: ${pxToRem(28)};
		line-height: 1.3;
		font-weight: 500;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(20)};
			line-height: ${pxToRem(26)};
		}
	}
`;

const TwoColumnContent = (props: Props) => {
	const { title, content } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<TwoColumnContentWrapper
			ref={ref}
			className={`view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view' : ''
			}`}
		>
			<LayoutWrapper>
				<LayoutGrid>
					{title && <Title>{title}</Title>}
					<ContentWrapper className="content">
						{content && <PortableText value={content} />}
					</ContentWrapper>
				</LayoutGrid>
			</LayoutWrapper>
		</TwoColumnContentWrapper>
	);
};

export default TwoColumnContent;
