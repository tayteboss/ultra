import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
	headerIsActive: boolean;
};

type MenuItemProps = {
	title: string;
	url: string;
};

const wrapperVariants = {
	hidden: {
		opacity: 0,
		width: 0,
		transition: {
			duration: 0.3,
			ease: 'linear',
			when: 'afterChildren',
			staggerChildren: 0.1,
			staggerDirection: -1
		}
	},
	visible: {
		opacity: 1,
		width: 'auto',
		transition: {
			duration: 0.3,
			ease: 'linear',
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		x: -3,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: 'easeInOut'
		}
	}
};

const DesktopMenuListWrapper = styled(motion.div)`
	display: flex;
	gap: ${pxToRem(16)};
`;

const MotionWrapper = styled(motion.div)``;

const LinkTag = styled.a`
	color: var(--colour-white);
	font-size: ${pxToRem(18)};
`;

const MenuItem = (props: MenuItemProps) => {
	const { title, url } = props;

	return (
		<MotionWrapper variants={childVariants}>
			<Link href={url} scroll={false} passHref legacyBehavior>
				<LinkTag>{title}</LinkTag>
			</Link>
		</MotionWrapper>
	);
};

const DesktopMenuList = (props: Props) => {
	const { headerIsActive } = props;

	return (
		<AnimatePresence>
			{headerIsActive && (
				<DesktopMenuListWrapper
					variants={wrapperVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					layout
				>
					<MenuItem title="Work" url="/work" />
					<MenuItem title="About" url="/about" />
					<MenuItem title="Off Brief" url="/off-brief" />
					<MenuItem title="Contact" url="/contact" />
				</DesktopMenuListWrapper>
			)}
		</AnimatePresence>
	);
};

export default DesktopMenuList;
