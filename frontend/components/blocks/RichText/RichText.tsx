import { PortableText } from '@portabletext/react';
import styled from 'styled-components';

const RichTextWrapper = styled.div``;

const RichText = (props: any) => {
	const { data } = props;

	return (
		<RichTextWrapper className="content">
			{data && <PortableText value={data} />}
		</RichTextWrapper>
	);
};

export default RichText;
