import styled from 'styled-components';
import LayoutWrapper from '../../common/LayoutWrapper';
import Slider from 'react-slick';
import React from 'react';
import pxToRem from '../../../utils/pxToRem';
import TeamCursors from '../TeamCursors';

type Props = {
	roles: string[];
	prefix: string;
	cursors: string[];
};

const TeamWrapper = styled.section`
	margin-bottom: ${pxToRem(120)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		margin-bottom: ${pxToRem(80)};
	}
`;

const Inner = styled.div`
	background: var(--colour-black);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: ${pxToRem(620)};
	border-radius: ${pxToRem(4)};
	position: relative;
	overflow: hidden;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		height: 100svh;
	}
`;

const TitleWrapper = styled.div`
	color: var(--colour-off-white);
	display: flex;
	position: relative;
	z-index: 5;

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		flex-direction: column;
		align-items: center;
	}
`;

const Title = styled.div`
	color: var(--colour-off-white);
`;

const RoleWrapper = styled.div`
	width: 200px;
	display: inline;
	margin-left: ${pxToRem(8)};

	@media ${(props) => props.theme.mediaBreakpoints.tabletPortrait} {
		display: block;
		text-align: center;
		width: 200px;
		margin-left: 0;
	}
`;

const Role = styled.div`
	color: var(--colour-off-white);
	background: transparent;
`;

const Team = (props: Props) => {
	const { roles, prefix, cursors } = props;

	var settings = {
		dots: false,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		autoplay: true,
		autoplaySpeed: 1500
	};

	const hasRoles = roles.length > 0;
	const hasCursors = cursors.length > 0;

	return (
		<TeamWrapper className="performance">
			<LayoutWrapper>
				<Inner>
					<TitleWrapper>
						{prefix && (
							<Title className="type-h3">
								Our team is made up of
							</Title>
						)}
						{hasRoles && (
							<RoleWrapper>
								<Slider {...settings}>
									{roles.map((item, index) => (
										<Role className="type-h3" key={index}>
											{item}
										</Role>
									))}
								</Slider>
							</RoleWrapper>
						)}
					</TitleWrapper>
					{hasCursors && <TeamCursors data={cursors} />}
				</Inner>
			</LayoutWrapper>
		</TeamWrapper>
	);
};

export default Team;
