import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';
import LayoutWrapper from '../../common/LayoutWrapper';

type Props = {
	handleClick: () => void;
	isLoading: boolean;
	useDark?: boolean;
};

const LoadMoreWrapper = styled.section`
	padding-top: ${pxToRem(80)};
`;

const Trigger = styled.button<{ $useDark: boolean }>`
	text-align: center;
	color: ${(props) =>
		props.$useDark ? 'var(--colour-black)' : 'var(--colour-white)'};
	width: 100%;

	transition: all var(--transition-speed-default) var(--transition-ease);

	&:hover {
		opacity: 0.5;
	}
`;

const LoadMore = (props: Props) => {
	const { handleClick, isLoading, useDark } = props;

	return (
		<LoadMoreWrapper>
			<LayoutWrapper>
				<Trigger
					className="type-h1"
					onClick={() => handleClick()}
					$useDark={useDark}
				>
					{isLoading ? 'Loading...' : 'Load more work'}
				</Trigger>
			</LayoutWrapper>
		</LoadMoreWrapper>
	);
};

export default LoadMore;
