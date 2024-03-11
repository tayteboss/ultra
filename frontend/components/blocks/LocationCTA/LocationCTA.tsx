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
`;

const Title = styled.a`
	text-align: center;
	display: block;
	color: var(--colour-black);
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
						</Inner>
					</LayoutWrapper>
				</LocationCTAWrapper>
			)}
		</>
	);
};

export default LocationCTA;
