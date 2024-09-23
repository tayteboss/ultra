import styled from 'styled-components';
import { ArticleType } from '../../../shared/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import moment from 'moment';
import pxToRem from '../../../utils/pxToRem';

const ArticleCardWrapper = styled.article`
	grid-column: span 4;

	&:hover {
		img {
			transform: scale(1.05);
		}
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletMedium} {
		grid-column: span 6;
	}

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		grid-column: span 6;
	}
`;

const ImageWrapper = styled.div`
	width: 100%;
	position: relative;
	padding-top: 67%;
	overflow: hidden;
	margin-bottom: ${pxToRem(24)};
	border-radius: ${pxToRem(4)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(8)};
	}

	img {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}
`;

const ImageInner = styled.div`
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
`;

const Title = styled.h4`
	margin-bottom: ${pxToRem(8)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(4)};
	}
`;

const Date = styled.p`
	color: var(--colour-off-black);
`;

type Props = {
	title: ArticleType['title'];
	slug: ArticleType['slug'];
	heroImage: ArticleType['heroImage'];
	date: ArticleType['date'];
	isPriority: boolean;
};

const ArticleCard = (props: Props) => {
	const { title, slug, heroImage, date, isPriority } = props;

	const [formattedDate, setFormattedDate] = useState('');

	useEffect(() => {
		if (date) {
			setFormattedDate(moment(date).format('MMM YYYY'));
		}
	}, [date]);

	return (
		<ArticleCardWrapper>
			<Link href={`/news/${slug?.current}`}>
				<ImageWrapper>
					<ImageInner>
						{heroImage && (
							<Image
								src={heroImage}
								alt={title}
								fill
								priority={isPriority}
							/>
						)}
					</ImageInner>
				</ImageWrapper>
				{title && <Title>{title}</Title>}
				{formattedDate && <Date>{formattedDate}</Date>}
			</Link>
		</ArticleCardWrapper>
	);
};

export default ArticleCard;
