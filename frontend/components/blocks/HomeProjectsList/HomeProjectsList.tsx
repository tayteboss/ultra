import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import ProjectCard from '../ProjectCard';

type Props = {
	data: ProjectType[];
};

const HomeProjectsListWrapper = styled.section``;

const HomeProjectsList = (props: Props) => {
	const { data } = props;

	const hasData = data && data.length > 0;

	return (
		<HomeProjectsListWrapper>
			{hasData &&
				data.map((item, i) => (
					<ProjectCard
						title={item?.title}
						slug={item?.slug?.current}
						heroImage={item?.heroImage}
						heroVideo={item?.heroVideo}
						mobileHeroImage={item?.mobileHeroImage}
						mobileHeroVideo={item?.mobileHeroVideo}
						desktopBlurHashBase64={item?.desktopBlurHashBase64}
						mobileBlurHashBase64={item?.mobileBlurHashBase64}
						index={i}
						key={i}
					/>
				))}
		</HomeProjectsListWrapper>
	);
};

export default HomeProjectsList;
