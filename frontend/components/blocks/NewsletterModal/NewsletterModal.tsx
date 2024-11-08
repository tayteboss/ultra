import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { CircleX } from 'lucide-react';
import HubspotForm from 'react-hubspot-form';

const NewsletterModalWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Inner = styled.div`
	background: var(--colour-white);
	width: ${pxToRem(700)};
	padding: ${pxToRem(40)};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
`;

const TitleWrapper = styled.div`
	margin-bottom: ${pxToRem(24)};
`;

const Title = styled.h2`
	margin-bottom: ${pxToRem(16)};
`;

const Subtitle = styled.h4`
	color: var(--colour-off-black);
`;

const FormWrapper = styled.div`
	#hubspotForm {
		width: 100%;
	}
`;

const CloseTrigger = styled.button`
	position: absolute;
	top: ${pxToRem(16)};
	right: ${pxToRem(16)};
	z-index: 2;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 0.5;
	}
`;

type Props = {
	isOpen: boolean;
	setNewsletterIsOpen: (value: boolean) => void;
};

const NewsletterModal = (props: Props) => {
	const { isOpen, setNewsletterIsOpen } = props;

	return (
		<AnimatePresence>
			{isOpen && (
				<NewsletterModalWrapper>
					<Inner>
						<CloseTrigger
							onClick={() => setNewsletterIsOpen(false)}
						>
							<CircleX />
						</CloseTrigger>
						<TitleWrapper>
							<Title>Get Ultra in your inbox</Title>
							<Subtitle>
								Enter your email to receive our newsletter
							</Subtitle>
						</TitleWrapper>
						<HubspotForm
							portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}
							formId={process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID}
							onSubmit={() => console.log('Submit!')}
							loading={<div>Loading...</div>}
						/>
					</Inner>
				</NewsletterModalWrapper>
			)}
		</AnimatePresence>
	);
};

export default NewsletterModal;
