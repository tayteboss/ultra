import Link from 'next/link';
import styled from 'styled-components';
import pxToRem from '../../../utils/pxToRem';

type MenuItemProps = {
	title: string;
	url: string;
};

const DesktopMenuListWrapper = styled.div`
	display: flex;
	gap: ${pxToRem(16)};
`;

const LinkTag = styled.a`
	color: var(--colour-white);
`;

const MenuItem = (props: MenuItemProps) => {
	const { title, url } = props;

	return (
		<Link href={url} scroll={false} passHref>
			<LinkTag>{title}</LinkTag>
		</Link>
	);
};

const DesktopMenuList = () => {
	return (
		<DesktopMenuListWrapper>
			<MenuItem title="Work" url="/work" />
			<MenuItem title="About" url="/about" />
			<MenuItem title="Off Brief" url="/off-brief" />
			<MenuItem title="Contact" url="/contact" />
		</DesktopMenuListWrapper>
	);
};

export default DesktopMenuList;
