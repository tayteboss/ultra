import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import { useEffect } from 'react';

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
`;

const TitleWrapper = styled.div``;

const Title = styled.h2`
	margin-bottom: ${pxToRem(16)};
`;

const Subtitle = styled.h4`
	color: var(--colour-off-black);
`;

const FormWrapper = styled.div``;

type Props = {
	isOpen: boolean;
};

const NewsletterModal = (props: Props) => {
	const { isOpen } = props;

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://js.hsforms.net/forms/shell.js';
		document.body.appendChild(script);

		script.addEventListener('load', () => {
			// @TS-ignore
			if (window.hbspt) {
				// @TS-ignore
				window.hbspt.forms.create({
					region: 'eu1',
					portalId: portalId,
					formId: formId,
					target: '#hubspotForm'
				});
			}
		});
	}, []);

	return (
		<AnimatePresence>
			{isOpen && (
				<NewsletterModalWrapper>
					<Inner>
						<TitleWrapper>
							<Title>Get Ultra in your inbox</Title>
							<Subtitle>
								Enter your email to receive our newsletter
							</Subtitle>
						</TitleWrapper>
						<FormWrapper>
							<div id="hubspotForm"></div>
						</FormWrapper>
					</Inner>
				</NewsletterModalWrapper>
			)}
		</AnimatePresence>
	);
};

export default NewsletterModal;
