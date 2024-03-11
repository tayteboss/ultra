import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Slider from 'react-slick';

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

const OffBriefGalleryWrapper = styled(motion.div)`
	cursor: grab;
	margin-left: ${pxToRem(16)};
	border-radius: ${pxToRem(4)};
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-left: ${pxToRem(8)};
	}

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

const ImageWrapper = styled(motion.div)`
	position: relative;
	padding-top: 100%;
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
	margin-right: ${pxToRem(16)};
	overflow: hidden;
	border-radius: ${pxToRem(4)};
`;

const OffBriefGallery = (props: Props) => {
	const { data } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	var settings = {
		dots: false,
		arrows: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false
	};

	return (
		<OffBriefGalleryWrapper
			ref={ref}
			variants={wrapperVariants}
			initial="hidden"
			animate={inView ? 'visible' : 'hidden'}
		>
			<Slider {...settings}>
				{data.map((item, i) => (
					<ImageWrapper
						variants={childVariants}
						style={i === 0 ? { marginLeft: '16px' } : {}}
					>
						<ImageInner>
							<Image src={item?.asset} alt={item.alt} fill />
						</ImageInner>
					</ImageWrapper>
				))}
			</Slider>
		</OffBriefGalleryWrapper>
	);
};

export default OffBriefGallery;
