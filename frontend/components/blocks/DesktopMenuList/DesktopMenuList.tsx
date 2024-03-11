import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { AnimatePresence, motion } from 'framer-motion';
import useActiveLink from '../../../hooks/useActiveLink';

type Props = {
	headerIsActive: boolean;
};

type MenuItemProps = {
	title: string;
	url: string;
	isActive: boolean;
};

const dotVariants = {
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

const MotionWrapper = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: ${pxToRem(6)};
`;

const LinkTag = styled.a<{ $isActive: boolean }>`
	color: var(--menu-inactive);
	font-size: ${pxToRem(18)};
	opacity: ${(props) => (props.$isActive ? 1 : 0.5)};

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 1;
	}
`;

const MenuItem = (props: MenuItemProps) => {
	const { title, url, isActive } = props;

	return (
		<MotionWrapper variants={childVariants}>
			<Link href={url} scroll={false} passHref legacyBehavior>
				<LinkTag $isActive={isActive}>{title}</LinkTag>
			</Link>
		</MotionWrapper>
	);
};

const DesktopMenuList = (props: Props) => {
	const { headerIsActive } = props;

	const activeLink = useActiveLink();

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
					<MenuItem
						title="Work"
						url="/work"
						isActive={activeLink === 'Work'}
					/>
					<MenuItem
						title="About"
						url="/about"
						isActive={activeLink === 'About'}
					/>
					<MenuItem
						title="Off Brief"
						url="/off-brief"
						isActive={activeLink === 'Off Brief'}
					/>
					<MenuItem
						title="Contact"
						url="/contact"
						isActive={activeLink === 'Contact'}
					/>
				</DesktopMenuListWrapper>
			)}
		</AnimatePresence>
	);
};

export default DesktopMenuList;
