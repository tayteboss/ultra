import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import ProjectCard from '../ProjectCard';
import BrandedIntro from '../BrandedIntro';

type Props = {
	data: ProjectType[];
	taglineIntro: string;
};

const HomeProjectsListWrapper = styled.section``;

const HomeProjectsList = (props: Props) => {
	const { data, taglineIntro } = props;

	const hasData = data && data.length > 0;

	const firstProject = data[0];
	const restOfProjects = data.slice(1);

	return (
		<HomeProjectsListWrapper>
			{firstProject && (
				<ProjectCard
					title={firstProject?.title}
					slug={firstProject?.slug?.current}
					heroImage={firstProject?.heroImage}
					heroVideo={firstProject?.heroVideo}
					mobileHeroImage={firstProject?.mobileHeroImage}
					mobileHeroVideo={firstProject?.mobileHeroVideo}
					desktopBlurHashBase64={firstProject?.desktopBlurHashBase64}
					mobileBlurHashBase64={firstProject?.mobileBlurHashBase64}
					index={0}
				/>
			)}
			{taglineIntro && <BrandedIntro data={taglineIntro} />}
			{hasData &&
				restOfProjects.map((item, i) => (
					<ProjectCard
						title={item?.title}
						slug={item?.slug?.current}
						heroImage={item?.heroImage}
						heroVideo={item?.heroVideo}
						mobileHeroImage={item?.mobileHeroImage}
						mobileHeroVideo={item?.mobileHeroVideo}
						desktopBlurHashBase64={item?.desktopBlurHashBase64}
						mobileBlurHashBase64={item?.mobileBlurHashBase64}
						index={i + 1}
						key={i + 1}
					/>
				))}
		</HomeProjectsListWrapper>
	);
};

export default HomeProjectsList;
