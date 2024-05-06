export type MediaType = {
	media: [
		{
			webmVideoFile: {
				url: string;
			};
			mp4VideoFile: {
				url: string;
			};
			placeholderImage: {
				url: string;
			};
		}
	];
};

export type TransitionsType = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		};
	};
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number;
		};
	};
};

export type HomePageType = {
	seoTitle: string;
	seoDescription: string;
	projects: ProjectType[];
	taglineIntro: string;
};

export type SiteSettingsType = {
	postCode: string;
	linkedInUrl: string;
	addressUrl: string;
	newBusinessEmail: string;
	streetAddress: string;
	instagramUrl: string;
	careersEmail: string;
	generalEnquiriesEmail: string;
	accentHexCode: string;
	accentHexCodes: string[];
	cookieCta: string;
};

export type WorkPageType = {
	seoTitle: string;
	seoDescription: string;
};

export type ProjectType = {
	title: string;
	slug: { current: string };
	seoDescription: string;
	client: string;
	desktopSnippetVideo: string;
	mobileSnippetVideo: string;
	heroImage: string;
	mobileHeroImage: string;
	heroVideo: string;
	mobileHeroVideo: string;
	relatedProjects: ProjectType[];
	thumbnailStrip: [];
	desktopBlurHashBase64: string;
	mobileBlurHashBase64: string;
	heroTitle: string;
	pageBuilder: [];
	_id: string;
};

export type ContactPageType = {
	seoTitle: string;
	seoDescription: string;
	contactButtonTitle: string;
	contactCta: string;
	generalEnquiriesButtonTitle: string;
	generalEnquiriesCta: string;
	newBusinessButtonTitle: string;
	newBusinessCta: string;
	prefixHeroTitle: string;
	suffixHeroTitle: string;
	showreelVideo: string;
};

export type OffBriefPageType = {
	seoTitle: string;
	seoDescription: string;
	heroTitle: string;
	gallery: [];
	content: string;
};

export type AboutPageType = {
	seoTitle: string;
	seoDescription: string;
	clientList: [];
	locationCta: string;
	suffixHeroTitle: string;
	prefixHeroTitle: string;
	teamRoles: [];
	servicesList: [];
	description: string;
	clientsLogos: [];
	teamRolesPrefix: string;
	teamCursors: [];
};
