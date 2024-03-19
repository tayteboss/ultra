import { motion } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import MuxPlayer from '@mux/mux-player-react';
import Image from 'next/image';
import LayoutWrapper from '../../common/LayoutWrapper';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useLenis } from '@studio-freight/react-lenis';

type Props = {
	desktopVideo: string;
	mobileVideo: string;
	heroImage: string;
	mobileHeroImage: string;
	title: string;
	link: string;
};

const RelatedProjectCoverWrapper = styled.div`
	cursor: pointer;
	position: ${(props) => (props.$isFixed ? 'fixed' : 'relative')};
	top: ${(props) => (props.$isFixed ? '0' : 'unset')};
	left: ${(props) => (props.$isFixed ? '0' : 'unset')};
	width: 100%;
	background: var(--colour-black);
	z-index: 10;
`;

const TitleInner = styled.div`
	padding-top: ${pxToRem(180)};
	max-width: 80%;
	margin-bottom: ${pxToRem(32)};
	display: flex;
	flex-direction: column;
	gap: ${pxToRem(8)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		max-width: 100%;
		padding-top: ${pxToRem(120)};
		margin-bottom: ${pxToRem(16)};
	}
`;

const Text = styled.p`
	color: var(--colour-off-white);
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const Title = styled.h1`
	color: var(--colour-off-white);
`;

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

const RelatedProjectCover = (props: Props) => {
	const {
		desktopVideo,
		mobileVideo,
		heroImage,
		mobileHeroImage,
		title,
		link
	} = props;

	const [isFixed, setIsFixed] = useState(false);

	const lenis = useLenis(({ scroll }) => {});

	const hasData = desktopVideo || mobileVideo || heroImage || mobileHeroImage;

	const isUsingVideo = desktopVideo || mobileVideo;

	const ref = useRef<HTMLDivElement>(null);

	const router = useRouter();

	const handleLink = () => {
		if (!lenis || !ref) return;

		const topOfContainer = ref?.current?.offsetTop;

		lenis.scrollTo(topOfContainer, { duration: 0.5 });

		const timer = setTimeout(() => {
			setIsFixed(true);
			window.scrollTo(0, 0);
		}, 500);

		const timer3 = setTimeout(() => {
			router.push(link);
		}, 500);

		return () => {
			clearTimeout(timer);
			clearTimeout(timer3);
		};
	};

	return (
		<>
			{hasData && (
				<RelatedProjectCoverWrapper
					onClick={() => handleLink()}
					ref={ref}
					$isFixed={isFixed}
					className="cursor-text"
					data-text="Next project"
					data-theme="orange"
				>
					<LayoutWrapper>
						<TitleInner className="type-d1">
							<Text className="type-p">Next project</Text>
							{title && <Title>{title}</Title>}
						</TitleInner>
						<Inner>
							<DesktopWrapper>
								{isUsingVideo &&
								desktopVideo?.asset?.playbackId ? (
									<MuxPlayer
										streamType="on-demand"
										playbackId={
											desktopVideo?.asset?.playbackId
										}
										autoPlay="muted"
										loop={true}
										thumbnailTime={1}
										preload="auto"
										muted
										playsInline={true}
									/>
								) : (
									<Image
										src={heroImage}
										alt="Related Image"
										fill
									/>
								)}
							</DesktopWrapper>
						</Inner>
					</LayoutWrapper>
				</RelatedProjectCoverWrapper>
			)}
		</>
	);
};

export default RelatedProjectCover;
