import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import MobileControls from '../../elements/MobileControls';

type Props = {
	image?: string;
	video?: string;
};

const FullScreenMediaWrapper = styled.section`
	padding: ${pxToRem(16)} 0;

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

const VideoInner = styled.div`
	height: 100%;
	width: 100%;
`;

const FullScreenMedia = (props: Props) => {
	const { image, video } = props;

	const [isMuted, setIsMuted] = useState(true);

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
							<VideoInner
								className="cursor-text"
								data-text={isMuted ? 'Unmute' : 'Mute'}
								data-theme="orange"
								onClick={() => setIsMuted(!isMuted)}
							>
								<MuxPlayer
									streamType="on-demand"
									playbackId={video}
									autoPlay="muted"
									loop={true}
									thumbnailTime={1}
									preload="auto"
									muted={isMuted}
									playsInline={true}
								/>
								<MobileControls
									setIsMuted={setIsMuted}
									isMuted={isMuted}
								/>
							</VideoInner>
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
