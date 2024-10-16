import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import Link from 'next/link';
import pxToRem from '../../../utils/pxToRem';
import useActiveLink from '../../../hooks/useActiveLink';

type Props = {
	isActive: boolean;
	postcode: string;
	linkedInUrl: string;
	instagramUrl: string;
	setMenuIsActive: (value: boolean) => void;
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
			ease: 'easeInOut'
		}
	}
};

const MobileMenuWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(5px);
	z-index: 90;
	height: 100dvh;
	width: 100%;
`;

const Inner = styled.div`
	padding-top: ${pxToRem(120)};
`;

const MainList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-bottom: ${pxToRem(64)};
`;

const MainListTag = styled.a<{ $isActive: boolean }>`
	color: ${(props) =>
		props.$isActive ? 'var(--colour-orange)' : 'var(--colour-white)'};

	transition: all var(--transition-speed-slow) var(--transition-ease);
`;

const SecondaryList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const SecondaryListTag = styled.a`
	color: var(--colour-off-white);
`;

const MobileMenu = (props: Props) => {
	const { isActive, linkedInUrl, instagramUrl, setMenuIsActive } = props;

	const activeLink = useActiveLink();

	return (
		<>
			<AnimatePresence>
				{isActive && (
					<MobileMenuWrapper
						variants={wrapperVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						<LayoutWrapper>
							<Inner>
								<MainList
									onClick={() => setMenuIsActive(false)}
								>
									<Link href="/" passHref legacyBehavior>
										<MainListTag
											$isActive={activeLink === 'Home'}
											className="type-h1"
										>
											Home
										</MainListTag>
									</Link>
									<Link href="/work" passHref legacyBehavior>
										<MainListTag
											$isActive={activeLink === 'Work'}
											className="type-h1"
										>
											Work
										</MainListTag>
									</Link>
									{/* <Link href="/news" passHref legacyBehavior>
										<MainListTag
											$isActive={activeLink === 'News'}
											className="type-h1"
										>
											News
										</MainListTag>
									</Link> */}
									<Link href="/about" passHref legacyBehavior>
										<MainListTag
											$isActive={activeLink === 'About'}
											className="type-h1"
										>
											About
										</MainListTag>
									</Link>
									<Link
										href="/contact"
										passHref
										legacyBehavior
									>
										<MainListTag
											$isActive={activeLink === 'Contact'}
											className="type-h1"
										>
											Contact
										</MainListTag>
									</Link>
								</MainList>
								<SecondaryList>
									{instagramUrl && (
										<SecondaryListTag
											href={instagramUrl}
											target="_blank"
											className="type-h3"
										>
											Instagram
										</SecondaryListTag>
									)}
									{linkedInUrl && (
										<SecondaryListTag
											href={instagramUrl}
											target="_blank"
											className="type-h3"
										>
											LinkedIn
										</SecondaryListTag>
									)}
								</SecondaryList>
							</Inner>
						</LayoutWrapper>
					</MobileMenuWrapper>
				)}
			</AnimatePresence>
		</>
	);
};

export default MobileMenu;
