import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';

type Props = {
	image?: string;
	video?: string;
};

const FullScreenMediaWrapper = styled.section`
	img,
	mux-player {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const MediaWrapper = styled.div`
	width: 100%;
	padding-top: 56.25%;
	position: relative;
	border-radius: ${pxToRem(4)};
	overflow: hidden;
`;

const MediaInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
`;

const FullScreenMedia = (props: Props) => {
	const { image, video } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<FullScreenMediaWrapper
			className={`view-element-img-scale-down ${
				inView ? 'view-element-img-scale-down--in-view' : ''
			}`}
			ref={ref}
		>
			<LayoutWrapper>
				<MediaWrapper>
					<MediaInner>
						{video ? (
							<MuxPlayer
								streamType="on-demand"
								playbackId={video}
								autoPlay="muted"
								loop={true}
								thumbnailTime={1}
								preload="auto"
								muted
								playsInline={true}
							/>
						) : (
							<Image
								src={image}
								alt="Hero image"
								fill
								priority={true}
							/>
						)}
					</MediaInner>
				</MediaWrapper>
			</LayoutWrapper>
		</FullScreenMediaWrapper>
	);
};

export default FullScreenMedia;
