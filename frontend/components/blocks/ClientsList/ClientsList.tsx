import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import { useInView } from 'react-intersection-observer';
import pxToRem from '../../../utils/pxToRem';
import Image from 'next/image';
import LayoutGrid from '../../common/LayoutGrid';
import { motion } from 'framer-motion';

const ClientsListWrapper = styled.section`
	margin-bottom: ${pxToRem(240)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(120)};
	}
`;

const Inner = styled.div``;

const Title = styled.h2`
	text-align: center;
	margin-bottom: ${pxToRem(80)};
`;

const ClientList = styled(motion.div)`
	padding: 0 10vw;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		padding: 0;
	}
`;

const IconWrapper = styled(motion.div)`
	grid-column: span 3;
	width: 100%;
	padding-top: 57%;
	position: relative;

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 4;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 3;
	}
`;

const IconInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
`;

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
			staggerChildren: 0.1
		}
	}
};

const innerVariants = {
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
			ease: 'easeInOut'
		}
	}
};

type Props = {
	data: any;
};

const ClientsList = (props: Props) => {
	const { data } = props;

	const hasData = data?.length > 0;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.01,
		rootMargin: '-50px'
	});

	return (
		<ClientsListWrapper>
			<LayoutWrapper>
				<Inner>
					<Title
						className={`type-h4 view-element-fade-in ${
							inView ? 'view-element-fade-in--in-view' : ''
						}`}
						ref={ref}
					>
						Who we've worked with
					</Title>
					{hasData && (
						<ClientList
							variants={wrapperVariants}
							initial="hidden"
							animate={inView ? 'visible' : 'hidden'}
						>
							<LayoutGrid>
								{data.map((item: any, i: number) => (
									<IconWrapper
										key={i}
										variants={innerVariants}
									>
										{item?.logo && (
											<IconInner>
												<Image
													src={item?.logo?.asset?.url}
													alt="logo"
													fill
												/>
											</IconInner>
										)}
									</IconWrapper>
								))}
							</LayoutGrid>
						</ClientList>
					)}
				</Inner>
			</LayoutWrapper>
		</ClientsListWrapper>
	);
};

export default ClientsList;
