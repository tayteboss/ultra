export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		...,
		"projects": *[_type == 'project'] {
			...,
			'heroVideo': heroVideo.asset->playbackId,
			'mobileHeroVideo': mobileHeroVideo.asset->playbackId,
			'heroImage': heroImage.asset->url,
			'mobileHeroImage': mobileHeroImage.asset->url,
			relatedProjects[]->{
				...,
				'heroVideo': heroVideo.asset->playbackId,
			},
			thumbnailStrip[] {
				...,
				'video': video.asset->playbackId,
				'image': image.asset->url,
			},
		}
	}
`;

export const workPageQueryString = `
	*[_type == 'workPage'][0] {
		...,
	}
`;

export const contactPageQueryString = `
	*[_type == 'contactPage'][0] {
		...,
	}
`;

export const offBriefPageQueryString = `
	*[_type == 'offBriefPage'][0] {
		...,
		"gallery": gallery[] {
			"asset": asset->url,
		}
	}
`;

export const aboutPageQueryString = `
	*[_type == 'aboutPage'][0] {
		...,
	}
`;

export const projectQueryString = `
	*[_type == 'project'] {
		...,
	}
`;