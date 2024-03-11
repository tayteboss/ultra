import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import router from 'next/router';
import { useState, useRef, useEffect } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import useViewportWidth from '../../../hooks/useViewportWidth';

type Props = {
	data: any[];
};

const ThumbnailStripWrapper = styled(motion.div)`
	margin-bottom: ${pxToRem(80)};
	width: 100%;
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(64)};
	}
`;

const WrapperInner = styled(motion.div)`
	display: flex;
`;

const ImageWrapper = styled.div`
	overflow: hidden;
	flex: 0 0 25%;
	min-width: 0;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		flex: 0 0 40%;
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		flex: 0 0 45%;
	}
`;

const Outer = styled.div`
	padding-top: 56.25%;
	position: relative;
`;

const Inner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		transform: scale(1.01);
	}
`;

const ThumbnailStrip = (props: Props) => {
	const { data } = props;

	const hasData = data.length > 0;
	const screenSize = useViewportWidth();

	let doubleData = [];

	if (data.length < 5) {
		doubleData = [...data, ...data];
	} else {
		doubleData = data;
	}

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollY } = useScroll();

	const transform = useTransform(
		scrollY,
		[distanceToTop - windowHeight, distanceToTop + windowHeight * 2],
		[
			'translateX(0)',
			screenSize === 'mobile' ? 'translateX(-50%)' : 'translateX(-35%)'
		]
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
		<ThumbnailStripWrapper ref={wrapperRef}>
			<WrapperInner style={{ transform }}>
				{hasData &&
					doubleData.map((item, i) => {
						let isImage = item?.asset?.url;

						return isImage ? (
							<ImageWrapper key={i}>
								<Outer>
									<Inner>
										<img
											src={item?.asset?.url}
											alt={item?.alt}
											loading="eager"
										/>
									</Inner>
								</Outer>
							</ImageWrapper>
						) : (
							<ImageWrapper key={i}>
								<Outer>
									<Inner>
										<img
											src={`https://image.mux.com/${item?.asset?.playbackId}/animated.webp`}
											loading="eager"
										/>
									</Inner>
								</Outer>
							</ImageWrapper>
						);
					})}
			</WrapperInner>
		</ThumbnailStripWrapper>
	);
};

export default ThumbnailStrip;
