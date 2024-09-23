import styled from 'styled-components';
import { ArticleType } from '../../../shared/types/types';
import LayoutWrapper from '../../common/LayoutWrapper';
import LayoutGrid from '../../common/LayoutGrid';
import ArticleCard from '../ArticleCard';
import pxToRem from '../../../utils/pxToRem';

const ArticleListWrapper = styled.div`
	.layout-grid {
		row-gap: ${pxToRem(80)};

		@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
			row-gap: ${pxToRem(64)};
		}

		@media ${(props) => props.theme.mediaBreakpoints.mobile} {
			row-gap: ${pxToRem(24)};
		}
	}
`;

type Props = {
	data: ArticleType[];
};

const ArticleList = (props: Props) => {
	const { data } = props;

	const hasData = data.length > 0;

	console.log('data', data);

	return (
		<ArticleListWrapper>
			<LayoutWrapper>
				<LayoutGrid>
					{hasData &&
						data.map((item, i) => (
							<ArticleCard
								key={i}
								title={item?.title}
								slug={item?.slug}
								heroImage={item?.heroImage}
								date={item?.date}
								isPriority={i < 4}
							/>
						))}
				</LayoutGrid>
			</LayoutWrapper>
		</ArticleListWrapper>
	);
};

export default ArticleList;
