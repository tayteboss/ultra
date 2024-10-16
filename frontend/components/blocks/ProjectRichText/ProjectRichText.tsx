import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { PortableText } from '@portabletext/react';

type Props = {
	footerText: string;
	content: [];
};

const ProjectRichTextWrapper = styled.section`
	padding: ${pxToRem(240)} 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding: ${pxToRem(120)} 0;
	}
`;

const Inner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${pxToRem(32)};
	margin: 0 auto;
	max-width: ${pxToRem(1170)};
`;

const RichTextWrapper = styled.div`
	* {
		color: var(--colour-off-white);
		text-align: center;
	}

	h1 {
		font-size: ${pxToRem(120)};
		line-height: ${pxToRem(112)};
		font-weight: 500;
		letter-spacing: -3.6px;

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(46)};
			line-height: ${pxToRem(46)};
			letter-spacing: -1.38px;
		}
	}
`;

const FooterText = styled.h5`
	color: var(--colour-off-white);
	text-align: center;
`;

const ProjectRichText = (props: Props) => {
	const { footerText, content } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<ProjectRichTextWrapper ref={ref}>
			<LayoutWrapper>
				<Inner
					className={`view-element-fade-in ${
						inView ? 'view-element-fade-in--in-view' : ''
					}`}
				>
					{content && (
						<RichTextWrapper className="content">
							<PortableText value={content} />
						</RichTextWrapper>
					)}
					{footerText && (
						<FooterText className="type-h3">
							{footerText}
						</FooterText>
					)}
				</Inner>
			</LayoutWrapper>
		</ProjectRichTextWrapper>
	);
};

export default ProjectRichText;
