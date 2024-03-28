import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

type Props = {
	title: string;
	items: string[] | { title: string; url: string }[];
	useLink?: boolean;
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
			staggerChildren: 0.05,
			when: 'beforeChildren'
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	}
};

const TitleListWrapper = styled.section`
	margin-bottom: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(62)};
	}
`;

const Title = styled.h4`
	grid-column: span 6;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(8)};
	}
`;

const ListWrapper = styled(motion.ul)`
	grid-column: span 6;
`;

const ListItem = styled(motion.li)`
	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(28)} !important;
		line-height: ${pxToRem(36)} !important;
	}
`;

const ListItemLink = styled(motion.a)`
	color: var(--colour-black);

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		font-size: ${pxToRem(28)} !important;
		line-height: ${pxToRem(36)} !important;
	}
`;

const TitleList = (props: Props) => {
	const { title, items, useLink } = props;

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	const hasItems = items?.length > 0;

	return (
		<>
			{hasItems && (
				<TitleListWrapper
					ref={ref}
					className={`view-element-fade-in ${
						inView ? 'view-element-fade-in--in-view' : ''
					}`}
				>
					<LayoutWrapper>
						<LayoutGrid>
							<Title>{title}</Title>
							<ListWrapper
								variants={wrapperVariants}
								initial="hidden"
								animate={inView ? 'visible' : 'hidden'}
							>
								{items.map((item, i) =>
									useLink ? (
										item.url ? (
											<ListItemLink
												href={item.url}
												target="_blank"
												className="type-h4"
												key={i}
												variants={childVariants}
											>
												{item.title}
											</ListItemLink>
										) : (
											<ListItem
												className="type-h4"
												key={i}
												variants={childVariants}
											>
												{item.title}
											</ListItem>
										)
									) : (
										<ListItem
											className="type-h4"
											key={i}
											variants={childVariants}
										>
											{item}
										</ListItem>
									)
								)}
							</ListWrapper>
						</LayoutGrid>
					</LayoutWrapper>
				</TitleListWrapper>
			)}
		</>
	);
};

export default TitleList;
