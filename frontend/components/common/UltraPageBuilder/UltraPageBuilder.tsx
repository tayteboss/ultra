import TwoColumnContent from '../../blocks/TwoColumnContent';

type Props = {
	data: [];
};

const UltraPageBuilder = (props: Props) => {
	const { data } = props;

	const sections = {
		projectTwoColumnContent: TwoColumnContent
	};

	return (
		<>
			{data &&
				data.map((section) => {
					{
						const Component = sections[section._type];
						return <Component key={section._key} {...section} />;
					}
				})}
		</>
	);
};

export default UltraPageBuilder;
