import styled from 'styled-components';
import MuxPlayer from '@mux/mux-player-react/lazy';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import router from 'next/router';
import { useState, useRef, useEffect } from 'react';

type Props = {
	title: string;
	slug: string;
	heroImage: string;
	heroVideo: string;
	mobileHeroImage: string;
	mobileHeroVideo: string;
	desktopBlurHashBase64: string;
	mobileBlurHashBase64: string;
	index: number;
};

const ProjectCardWrapper = styled(motion.a)``;

const Inner = styled(motion.div)`
	position: relative;

	mux-player,
	img {
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

const Desktop = styled.div`
	position: relative;
	height: 100vh;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: none;
	}
`;

const Mobile = styled.div`
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		display: block;
		position: relative;
		height: 100svh;
	}
`;

const TitleWrapper = styled.div`
	position: absolute;
	bottom: ${pxToRem(16)};
	left: ${pxToRem(16)};
`;

const Title = styled.h2`
	color: var(--colour-white);
	mix-blend-mode: difference;
`;

const ImageWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const ProjectCard = (props: Props) => {
	const {
		title,
		slug,
		heroImage,
		heroVideo,
		mobileHeroImage,
		mobileHeroVideo,
		desktopBlurHashBase64,
		mobileBlurHashBase64,
		index
	} = props;

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const wrapperRef = useRef<HTMLAnchorElement>(null);

	const { scrollY } = useScroll();

	const brightness = useTransform(
		scrollY,
		[distanceToTop, distanceToTop + windowHeight * 1],
		['brightness(1)', 'brightness(0.9)']
	);

	const blur = useTransform(
		scrollY,
		[distanceToTop, distanceToTop + windowHeight * 1],
		['blur(0px)', 'blur(1px)']
	);

	const scale = useTransform(
		scrollY,
		[distanceToTop, distanceToTop + windowHeight * 1],
		['scale(1)', 'scale(1.01)']
	);

	useEffect(() => {
		if (wrapperRef?.current) {
			setDistanceToTop(
				window.pageYOffset +
					wrapperRef.current.getBoundingClientRect().top
			);
		}

		setWindowHeight(window.innerHeight);

		const timer = setTimeout(() => {
			if (wrapperRef?.current) {
				setDistanceToTop(
					window.pageYOffset +
						wrapperRef.current.getBoundingClientRect().top
				);
			}

			setWindowHeight(window.innerHeight);
		}, 1000);

		return () => clearTimeout(timer);
	}, [distanceToTop, router]);

	return (
		<ProjectCardWrapper
			href={`/work/${slug}`}
			style={{ filter: brightness }}
			key={index}
			ref={wrapperRef}
			className="cursor-text"
			data-text="See project"
		>
			<Inner style={{ transform: scale, filter: blur }}>
				<Desktop>
					{heroVideo && !heroImage && (
						<MuxPlayer
							streamType="on-demand"
							playbackId={heroVideo}
							autoPlay="muted"
							loop={true}
							thumbnailTime={1}
							loading="page"
							preload="auto"
							muted
							playsInline={true}
							poster={desktopBlurHashBase64}
						/>
					)}
					{!heroVideo && heroImage && (
						<ImageWrapper>
							<Image
								src={heroImage}
								alt=""
								fill
								priority={index === 0}
							/>
						</ImageWrapper>
					)}
				</Desktop>
				<Mobile>
					{(heroVideo || mobileHeroVideo) && !heroImage && (
						<MuxPlayer
							streamType="on-demand"
							playbackId={
								mobileHeroVideo ? mobileHeroVideo : heroVideo
							}
							autoPlay="muted"
							loop={true}
							thumbnailTime={1}
							loading="page"
							preload="auto"
							muted
							playsInline={true}
							poster={mobileBlurHashBase64}
						/>
					)}
					{!heroVideo && (heroImage || mobileHeroImage) && (
						<ImageWrapper>
							<Image
								src={
									mobileHeroImage
										? mobileHeroImage
										: heroImage
								}
								alt=""
								fill
								priority={index === 0}
							/>
						</ImageWrapper>
					)}
				</Mobile>
				<TitleWrapper>
					{title && <Title className="type-d1">{title}</Title>}
				</TitleWrapper>
			</Inner>
		</ProjectCardWrapper>
	);
};

export default ProjectCard;
