import styled from 'styled-components';
import FullScreenMedia from '../../blocks/FullScreenMedia';
import TwoColumnContent from '../../blocks/TwoColumnContent';
import TwoColumnMedia from '../../blocks/TwoColumnMedia';
import ProjectRichText from '../../blocks/ProjectRichText';

type Props = {
	data: [];
};

const PageBuilderWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const UltraPageBuilder = (props: Props) => {
	const { data } = props;

	if (!data || data.length === 0) return <></>;

	const sections = {
		projectTwoColumnContent: TwoColumnContent,
		projectTwoColumnMedia: TwoColumnMedia,
		projectFullScreenMedia: FullScreenMedia,
		projectRichText: ProjectRichText
	};

	return (
		<PageBuilderWrapper>
			{data &&
				data.map((section) => {
					if (!sections[section._type]) {
						return (
							<div key={Math.random() * 10000}>
								No section found for {section.name}
							</div>
						);
					} else {
						const Component = sections[section._type];
						return <Component key={section._key} {...section} />;
					}
				})}
		</PageBuilderWrapper>
	);
};

export default UltraPageBuilder;
