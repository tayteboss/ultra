import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type Props = {
	setIsMuted: (isMuted: boolean) => void;
	isMuted: boolean;
};

const MobileControlsWrapper = styled.button`
	position: absolute;
	bottom: ${pxToRem(16)};
	right: ${pxToRem(16)};
	z-index: 2;
	color: var(--colour-white);
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	padding: ${pxToRem(2)} ${pxToRem(8)};
	border-radius: ${pxToRem(4)};
	mix-blend-mode: difference;
	display: none;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
	}
`;

const MobileControls = (props: Props) => {
	const { setIsMuted, isMuted } = props;

	return (
		<MobileControlsWrapper onClick={() => setIsMuted(isMuted)}>
			{isMuted ? 'Unmute' : 'Mute'}
		</MobileControlsWrapper>
	);
};

export default MobileControls;
