import MuxPlayer from '@mux/mux-player-react/lazy';
import Image from 'next/image';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import useViewportWidth from '../../../hooks/useViewportWidth';

type Props = {
	desktopVideo: string;
	mobileVideo: string;
	heroImage: string;
	mobileHeroImage: string;
	blurHashBase64: string | null;
};

const ProjectHeroMediaWrapper = styled.section``;

const Inner = styled(motion.div)`
	height: 100svh;
	width: 100%;
`;

const DesktopWrapper = styled.div`
	height: 100%;
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
								<MuxPlayer
									streamType="on-demand"
									playbackId={desktopVideo?.asset?.playbackId}
									autoPlay="muted"
									loop={true}
									thumbnailTime={1}
									loading="page"
									preload="auto"
									muted
									playsInline={true}
									poster={
										blurHashBase64 ? blurHashBase64 : ''
									}
								/>
							) : (
								<Image
									src={heroImage}
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
