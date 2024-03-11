import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import ThumbnailStrip from '../ThumbnailStrip';

type Props = {
	client: string;
	title: string;
	slug: string;
	thumbnails: [];
	setIsHovered: (value: boolean) => void;
};

const ProjectStripCardWrapper = styled.a`
	display: block;

	transition: all var(--transition-speed-slow) var(--transition-ease);

	&:hover {
		opacity: 1 !important;
		filter: blur(0px) !important;
	}
`;

const Inner = styled.div`
	margin-bottom: ${pxToRem(32)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}
`;

const Client = styled.h2`
	color: var(--colour-off-white);
	margin-bottom: ${pxToRem(4)};
`;

const Title = styled.h3`
	color: var(--colour-off-white);
`;

const ProjectStripCard = (props: Props) => {
	const { client, title, slug, thumbnails, setIsHovered } = props;

	return (
		<ProjectStripCardWrapper
			href={`/work/${slug}`}
			className="cursor-text project-strip-card"
			data-text="See project"
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<LayoutWrapper>
				<Inner>
					{client && <Client className="type-h4">{client}</Client>}
					{title && <Title className="type-h1">{title}</Title>}
				</Inner>
			</LayoutWrapper>
			<ThumbnailStrip data={thumbnails} />
		</ProjectStripCardWrapper>
	);
};

export default ProjectStripCard;
