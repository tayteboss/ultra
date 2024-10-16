import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import ThumbnailStrip from '../ThumbnailStrip';
import { useRouter } from 'next/router';

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
	margin-bottom: ${pxToRem(24)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(16)};
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

	const router = useRouter();

	const onLinkMouseDown = () => {
		router.push(`/work/${slug}`);
	};

	return (
		<ProjectStripCardWrapper
			href={`/work/${slug}`}
			className="cursor-text project-strip-card"
			data-theme="orange"
			data-text="View work"
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
			onMouseDown={onLinkMouseDown}
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
