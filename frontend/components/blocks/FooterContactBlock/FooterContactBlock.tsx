import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type CardProps = {
	title: string;
	email: string;
};

type Props = {
	newBusinessEmail: string;
	generalEnquiriesEmail: string;
	careersEmail: string;
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
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: 'easeInOut'
		}
	}
};

const FooterContactBlockWrapper = styled(motion.div)`
	display: flex;
	justify-content: center;
	gap: ${pxToRem(80)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		gap: ${pxToRem(30)};
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: none;
	}
`;

const CardWrapper = styled(motion.a)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0.75;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 1;

		.card-wrapper-email {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;

const Email = styled.p`
	color: var(--footer-contact-fg);
	margin-bottom: ${pxToRem(4)};
	transform: translateY(3px);
	opacity: 0;

	transition: all var(--transition-speed-default) var(--transition-ease);
`;

const Title = styled.h2`
	color: var(--footer-contact-fg);

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		font-size: ${pxToRem(36)};
	}
`;

const FooterContactCard = (props: CardProps) => {
	const { title, email } = props;

	return (
		<CardWrapper variants={childVariants} href={`mailto:${email}`}>
			<Email className="card-wrapper-email">{email}</Email>
			<Title>{title}</Title>
		</CardWrapper>
	);
};

const FooterContactBlock = (props: Props) => {
	const { newBusinessEmail, generalEnquiriesEmail, careersEmail } = props;

	const [isActive, setIsActive] = useState(true);

	const router = useRouter();

	useEffect(() => {
		if (router.asPath === '/contact') {
			setIsActive(false);
		} else {
			setIsActive(true);
		}
	}, [router]);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-50px'
	});

	return (
		<>
			{isActive && (
				<FooterContactBlockWrapper
					ref={ref}
					variants={wrapperVariants}
					initial="hidden"
					animate={inView ? 'visible' : 'hidden'}
					exit="hidden"
				>
					<FooterContactCard
						title="New business"
						email={newBusinessEmail}
					/>
					<FooterContactCard
						title="General enquiries"
						email={generalEnquiriesEmail}
					/>
					<FooterContactCard
						title="Join our team"
						email={careersEmail}
					/>
				</FooterContactBlockWrapper>
			)}
		</>
	);
};

export default FooterContactBlock;
