import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';

type Props = {
	handleClick: () => void;
	isLoading: boolean;
};

const LoadMoreWrapper = styled.section`
	padding-top: ${pxToRem(80)};
`;

const Trigger = styled.button`
	text-align: center;
	color: var(--colour-off-white);
	width: 100%;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		color: var(--colour-white);
	}
`;

const LoadMore = (props: Props) => {
	const { handleClick, isLoading } = props;

	return (
		<LoadMoreWrapper>
			<LayoutWrapper>
				<Trigger className="type-h1" onClick={() => handleClick()}>
					{isLoading ? 'Loading...' : 'Load more work'}
				</Trigger>
			</LayoutWrapper>
		</LoadMoreWrapper>
	);
};

export default LoadMore;
