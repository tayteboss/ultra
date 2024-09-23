import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import { AboutPageType } from '../../../shared/types/types';
import pxToRem from '../../../utils/pxToRem';
import { motion, useScroll, useTransform } from 'framer-motion';
import router from 'next/router';
import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ServicesScrollerWrapper = styled.section`
	position: relative;
	padding: ${pxToRem(240)} 0;
	margin-bottom: -250px;
	overflow: hidden;
`;

const Inner = styled(motion.ul)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${pxToRem(8)};
	position: relative;
`;

const Title = styled.h2`
	margin-bottom: ${pxToRem(40)};
`;

const ServiceItem = styled.li`
	text-align: center;
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

	const [windowHeight, setWindowHeight] = useState(0);
	const [distanceToTop, setDistanceToTop] = useState(0);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const { scrollY } = useScroll();

	const transform = useTransform(
		scrollY,
		[distanceToTop - windowHeight, distanceToTop + windowHeight * 2],
		['translateY(250px)', 'translateY(-250px)']
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

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.01,
		rootMargin: '-50px'
	});

	return (
		<ServicesScrollerWrapper>
			<LayoutWrapper>
				<Inner style={{ transform }}>
					<GradTop />
					{/* <Title
						className={`type-h3 view-element-fade-in ${
							inView ? 'view-element-fade-in--in-view' : ''
						}`}
						ref={ref}
					>
						Our services
					</Title> */}
					{hasData &&
						data.map((item, i) => (
							<Service className="type-h1" key={i}>
								{item}
							</Service>
						))}
					<GradBottom />
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
			className={`type-h1 view-element-bottom-top ${
				inView ? 'view-element-bottom-top--in-view' : ''
			}`}
		>
			{children}
		</ServiceItem>
	);
};

export default ServicesScroller;
