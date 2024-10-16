export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		...,
		projects[]-> {
			...,
			'desktopSnippetVideo': DesktopSnippetVideo.asset->playbackId,
			'mobileSnippetVideo': MobileSnippetVideo.asset->playbackId,
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

export const newsPageQueryString = `
	*[_type == 'newsPage'][0] {
		...,
	}
`;

export const contactPageQueryString = `
	*[_type == 'contactPage'][0] {
		...,
		'showreelVideo': showreelVideo.asset->playbackId,
	}
`;

export const offBriefPageQueryString = `
	*[_type == 'offBriefPage'][0] {
		...,
		"gallery": gallery[] {
			"asset": asset->url,
			"alt:": alt,
		}
	}
`;

export const aboutPageQueryString = `
	*[_type == 'aboutPage'][0] {
		...,
		'clientList': clientList[] {
			...,
			title,
			logo {
				...,
				asset-> {
					url,
				}
			}
		}
	}
`;

export const projectQueryString = `
	*[_type == 'project' && !inactive] | order(orderRank) [0...100] {
		...,
		"thumbnailStrip": thumbnailStrip[] {
			alt,
			asset-> {
				url,
				playbackId
			}
		},
	}
`;

export const articleQueryString = `
	*[_type == 'article'] | order(date desc) [0...8] {
		...,
		'heroImage': heroImage.asset->url
	}
`;
