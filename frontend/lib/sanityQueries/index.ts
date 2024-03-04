export const siteSettingsQueryString = `
	*[_type == 'siteSettings'][0] {
		...,
	}
`;

export const homePageQueryString = `
	*[_type == 'homePage'][0] {
		...,
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