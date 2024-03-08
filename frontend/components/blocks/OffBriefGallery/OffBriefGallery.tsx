import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	data: [];
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		x: -5,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	}
};

const OffBriefGalleryWrapper = styled.div``;

const Embla = styled.div`
	cursor: grab;

	&:active {
		cursor: grabbing;

		img {
			transform: scale(1.02);
		}
	}

	img {
		transition: all 500ms var(--transition-ease);
	}
`;

const EmblaContainer = styled(motion.div)`
	padding-left: ${pxToRem(16)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		padding-left: ${pxToRem(8)};
	}
`;

const EmblaSlide = styled(motion.div)`
	margin-right: ${pxToRem(16)};

	&.embla__slide {
		flex: 0 0 33%;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		&.embla__slide {
			flex: 0 0 50%;
		}
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	padding-top: 100%;
	overflow: hidden;
	border-radius: ${pxToRem(4)};
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
`;

const OffBriefGallery = (props: Props) => {
	const { data } = props;

	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<OffBriefGalleryWrapper ref={ref}>
			<Embla className="embla" ref={emblaRef}>
				<EmblaContainer
					className="embla__container"
					variants={wrapperVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
					exit="hidden"
				>
					{data.map((item, i) => (
						<EmblaSlide
							className="embla__slide"
							key={i}
							variants={childVariants}
						>
							<ImageWrapper>
								<ImageInner>
									<Image
										src={item?.asset}
										alt={item.alt}
										fill
									/>
								</ImageInner>
							</ImageWrapper>
						</EmblaSlide>
					))}
				</EmblaContainer>
			</Embla>
		</OffBriefGalleryWrapper>
	);
};

export default OffBriefGallery;
