import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	title: string;
	url: string;
};

const LocationCTAWrapper = styled.section`
	padding: ${pxToRem(120)} 0;
`;

const Inner = styled.div`
	max-width: ${pxToRem(1200)};
	margin: 0 auto;
	text-align: center;
`;

const Title = styled.a`
	text-align: center;
	display: block;
	color: var(--colour-black);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(24)};
	}
`;

const Button = styled.a`
	display: none;
	background: var(--colour-orange);
	color: var(--colour-black);
	padding: ${pxToRem(4)} ${pxToRem(8)};
	border-radius: ${pxToRem(4)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: inline-block;
	}
`;

const LocationCTA = (props: Props) => {
	const { title, url } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<>
			{title && url && (
				<LocationCTAWrapper
					ref={ref}
					className={`view-element-fade-in ${
						inView ? 'view-element-fade-in--in-view' : ''
					}`}
				>
					<LayoutWrapper>
						<Inner>
							<Title
								className="type-d1 cursor-text"
								href={url}
								target="_blank"
								data-text="See on map"
								data-theme="orange"
							>
								{title}
							</Title>
							<Button href={url} target="_blank">
								See on map
							</Button>
						</Inner>
					</LayoutWrapper>
				</LocationCTAWrapper>
			)}
		</>
	);
};

export default LocationCTA;
