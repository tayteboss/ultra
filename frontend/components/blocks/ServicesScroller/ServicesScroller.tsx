import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import { AboutPageType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay'; // Include autoplay styles

const ServicesScrollerWrapper = styled.section`
	position: relative;
	padding: ${pxToRem(240)} 0;
	overflow: hidden;

	.swiper-wrapper {
		transition-timing-function: linear !important;
	}

	.swiper-slide {
		height: ${pxToRem(54)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			height: ${pxToRem(32)};
		}
	}
`;

const Inner = styled.ul`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(8)};
	position: relative;
	height: 80vh;
`;

const Title = styled.h4`
	margin-bottom: ${pxToRem(64)};
`;

const ServiceItem = styled.li`
	text-align: center;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(25)} !important;
		line-height: ${pxToRem(28)} !important;
	}
`;

const GradTop = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 30%;
	background: linear-gradient(0deg, rgba(232, 227, 223, 0) 0%, #e8e3df 100%);
	z-index: 2;
`;

const GradBottom = styled.div`
	position: absolute;
	bottom: -5px;
	left: 0;
	width: 100%;
	height: 30%;
	background: linear-gradient(0deg, #e8e3df 0%, rgba(232, 227, 223, 0) 100%);
	z-index: 2;
`;

type Props = {
	data: AboutPageType['clientList'];
};

const ServicesScroller = (props: Props) => {
	const { data } = props;

	const hasData = data && data.length > 0;

	return (
		<ServicesScrollerWrapper>
			<LayoutWrapper>
				<Inner>
					<Title>Our services</Title>
					<Swiper
						direction="vertical" // Set vertical scroll direction
						spaceBetween={10}
						slidesPerView="auto"
						loop={true}
						autoplay={{
							delay: 0,
							pauseOnMouseEnter: false,
							disableOnInteraction: true
						}}
						speed={1000} // Control speed for smooth scrolling
						modules={[Autoplay]}
					>
						<GradTop />
						{hasData &&
							data.map((item, i) => (
								<SwiperSlide key={i}>
									<Service className="type-h1">
										{item}
									</Service>
								</SwiperSlide>
							))}
						<GradBottom />
					</Swiper>
				</Inner>
			</LayoutWrapper>
		</ServicesScrollerWrapper>
	);
};

const Service = (props: any) => {
	const { children } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.01,
		rootMargin: '-50px'
	});

	return (
		<ServiceItem
			ref={ref}
			className={`type-h2 view-element-bottom-top ${
				inView ? 'view-element-bottom-top--in-view' : ''
			}`}
		>
			{children}
		</ServiceItem>
	);
};

export default ServicesScroller;
