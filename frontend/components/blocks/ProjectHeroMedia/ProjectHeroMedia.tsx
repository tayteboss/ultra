import MuxPlayer from '@mux/mux-player-react';
import Image from 'next/image';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useViewportWidth from '../../../hooks/useViewportWidth';
import MobileControls from '../../elements/MobileControls';

type Props = {
	desktopVideo: { asset: { playbackId: string } } | null;
	mobileVideo: { asset: { playbackId: string } } | null;
	heroImage: { asset: { url: string } };
	mobileHeroImage: { asset: { url: string } };
	blurHashBase64: string | null;
};

const ProjectHeroMediaWrapper = styled.section``;

const Inner = styled(motion.div)`
	width: 100%;
`;

const DesktopWrapper = styled.div`
	height: 100svh;
	width: 100%;
	position: relative;
	border-radius: ${pxToRem(4)};
	overflow: hidden;

	img,
	mux-player {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

const VideoInner = styled.div`
	height: 100%;
	width: 100%;
`;

const ProjectHeroMedia = (props: Props) => {
	const {
		desktopVideo,
		mobileVideo,
		heroImage,
		mobileHeroImage,
		blurHashBase64
	} = props;

	const hasData = desktopVideo || mobileVideo || heroImage || mobileHeroImage;

	const isUsingVideo = desktopVideo || mobileVideo;

	const [windowHeight, setWindowHeight] = useState(0);
	const [isMuted, setIsMuted] = useState(true);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollY } = useScroll();

	const viewport = useViewportWidth();
	const isMobile = viewport === 'mobile';

	const padding = useTransform(
		scrollY,
		[0, windowHeight * 0.5],
		[isMobile ? '8px' : '16px', '0px']
	);

	useEffect(() => {
		setWindowHeight(window.innerHeight);

		const timer = setTimeout(() => {
			setWindowHeight(window.innerHeight);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{hasData && (
				<ProjectHeroMediaWrapper ref={wrapperRef}>
					<Inner style={{ padding }}>
						<DesktopWrapper>
							{isUsingVideo && desktopVideo?.asset?.playbackId ? (
								<VideoInner
									className="cursor-text"
									data-text={isMuted ? 'Unmute' : 'Mute'}
									data-theme="orange"
									onClick={() => setIsMuted(!isMuted)}
								>
									<MuxPlayer
										streamType="on-demand"
										playbackId={
											isMobile &&
											mobileVideo?.asset?.playbackId
												? mobileVideo?.asset?.playbackId
												: desktopVideo?.asset
														?.playbackId
										}
										autoPlay="muted"
										loop={true}
										thumbnailTime={1}
										preload="auto"
										muted={isMuted}
									/>
									<MobileControls
										setIsMuted={setIsMuted}
										isMuted={isMuted}
									/>
								</VideoInner>
							) : (
								<Image
									src={
										isMobile
											? mobileHeroImage?.asset?.url
											: heroImage?.asset?.url
									}
									alt="Hero image"
									fill
									priority={true}
								/>
							)}
						</DesktopWrapper>
					</Inner>
				</ProjectHeroMediaWrapper>
			)}
		</>
	);
};

export default ProjectHeroMedia;
