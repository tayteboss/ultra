import styled from 'styled-components';
import { ProjectType } from '../../../shared/types/types';
import ProjectStripCard from '../ProjectStripCard';
import { useState } from 'react';

type Props = {
	data: ProjectType[];
};

const ProjectsListWrapper = styled.section<{ $isHovered: boolean }>`
	.project-strip-card {
		opacity: ${(props) => props.$isHovered && 0.33};
		filter: ${(props) => props.$isHovered && 'blur(1px)'};
	}
`;

const ProjectsList = (props: Props) => {
	const { data } = props;

	const [isHovered, setIsHovered] = useState(false);

	const hasData = data.length > 0;

	return (
		<ProjectsListWrapper $isHovered={isHovered}>
			{hasData &&
				data.map((item, i) => (
					<ProjectStripCard
						client={item?.client}
						title={item?.title}
						slug={item?.slug.current}
						thumbnails={item?.thumbnailStrip}
						key={i}
						setIsHovered={setIsHovered}
					/>
				))}
		</ProjectsListWrapper>
	);
};

export default ProjectsList;
