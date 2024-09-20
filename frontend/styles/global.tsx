import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import pxToRem from '../utils/pxToRem';

const siteSettings = require('../json/siteSettings.json');
const firstAccentHexCode = 'accentHexCodes[0]';

export const GlobalStyles = createGlobalStyle`
	:root {
		--menu-blend-mode: normal;
		--menu-active: ${theme.colours.black};
		--html-bg: ${theme.colours.black};
		--footer-fg: ${theme.colours.black};
		--footer-contact-fg: ${theme.colours.white};
		--colour-white: ${theme.colours.white};
		--colour-black: ${theme.colours.black};
		--colour-off-black: ${theme.colours.offBlack};
		--colour-orange: ${firstAccentHexCode};
		--menu-inactive: var(--colour-orange);
		--footer-bg: var(--colour-orange);
		--colour-off-white: ${theme.colours.offWhite};
		--font-default: ${theme.fonts.HaasGrotDisp};
		--transition-speed-default: ${theme.transitionSpeed.default};
		--transition-speed-fast: ${theme.transitionSpeed.fast};
		--transition-speed-extra-fast: ${theme.transitionSpeed.extraFast};
		--transition-speed-slow: ${theme.transitionSpeed.slow};
		--transition-speed-extra-slow: ${theme.transitionSpeed.extraSlow};
		--transition-ease: cubic-bezier(0.65, 0, 0.35, 1);
	}

	svg path {
		transition: all var(--transition-speed-slow) var(--transition-ease);
	}

	.CookieConsent {
		@media ${theme.mediaBreakpoints.mobile} {
			max-width: 100% !important;
			margin: 0 0 !important;
			border-radius: 0 !important;
			flex-wrap: nowrap !important;

			& > div {
				flex: auto !important;
			}
		}
	}

	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: none;
		list-style: none;
		background: none;
		outline: none;
		border-radius: 0;
		box-shadow: none;
	}

	::selection {
		background-color: var(--colour-black);
		color: var(--colour-orange);
	}

	html {
		font-size: 16px;
		background: var(--html-bg);

		transition: background 500ms var(--transition-ease);

		&.no-scroll {
			overflow-y: hidden;
			
			body {
				overflow-y: hidden;
			}
		}
	}

	body {
		position: relative;
	}

	input,
	textarea,
	select,
	button,
	label,
	body {
		font-family: var(--font-default);
		line-height: normal;
	}

	strong,
	b {
		font-weight: 900;
	}

	em {
		font-style: italic;
	}

	a {
		text-decoration: none;
		color: var(--colour-black);
	}

	button {
		cursor: pointer;
	}

	h1,
	.type-h1 {
		font-size: ${pxToRem(90)};
		line-height: ${pxToRem(85)};
		letter-spacing: -2.7px;
		font-weight: 500;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(46)};
			line-height: ${pxToRem(46)};
			letter-spacing: -1.38px;
		}
	}

	h2,
	.type-h2 {
		font-size: ${pxToRem(48)};
		line-height: 1.1;
		font-weight: 500;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(32)};
			line-height: ${pxToRem(35)};
		}
	}

	h3,
	.type-h3 {
		font-size: ${pxToRem(36)};
		line-height: ${pxToRem(36)};
		font-weight: 500;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(28)};
			line-height: ${pxToRem(28)};
		}
	}

	h4,
	.type-h4 {
		font-size: ${pxToRem(28)};
		line-height: 1.3;
		font-weight: 500;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(20)};
			line-height: ${pxToRem(26)};
		}
	}

	h5,
	.type-h5 {
		font-size: ${pxToRem(25)};
		line-height: 1.3;
		font-weight: 500;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(18)};
			line-height: ${pxToRem(18)};
		}
	}

	p,
	.type-p,
	a,
	button,
	div {
		font-size: ${pxToRem(18)};
		line-height: normal;
		font-weight: 500;
		letter-spacing: normal;
	}

	.type-d1 {
		font-size: ${pxToRem(120)};
		line-height: ${pxToRem(112)};
		font-weight: 500;
		letter-spacing: -3.6px;

		@media ${theme.mediaBreakpoints.tabletPortrait} {
			font-size: ${pxToRem(46)};
			line-height: ${pxToRem(46)};
			letter-spacing: -1.38px;
		}
	}

	mux-player {
		--media-object-fit: contain;
		--media-object-position: center;
		--controls: none;
		--media-object-fit: cover;
		--media-object-position: center;
	}

	.content {
		h1,
		h2,
		h3,
		h4 {
			&:not(:last-child ) {
				margin-bottom: ${pxToRem(32)};
			}

			&:not(:first-child) {
				padding-top: ${pxToRem(24)};
			}
		}

		p {
			&:not(:last-child ) {
				margin-bottom: ${pxToRem(16)};
			}
		}
	}

	.view-element-fade-in
	{
		opacity: 0;

		transition: opacity var(--transition-speed-slow) ease;

		&--in-view
		{
			opacity: 1;
		}
	}

	.view-element-bottom-top
	{
		opacity: 0;
		transform: translateY(15px);

		transition: opacity var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1), transform var(--transition-speed-default) cubic-bezier(0.65, 0, 0.35, 1);

		&--in-view
		{
			opacity: 1;
			transform: translateY(0);
		}
	}

	.view-element-img-scale-down
	{
		img,
		mux-player {
			opacity: 0;
			transform: scale(1.05);

			transition: opacity var(--transition-speed-default) ease, transform 3000ms ease;
		}


		&--in-view
		{
			img,
			mux-player {
				opacity: 1;
				transform: scale(1);
			}
		}
	}

	.embla {
		overflow: hidden;
	}

	.embla__container {
		display: flex;
	}

	.embla__slide {
		flex: 0 0 33%;
		min-width: 0;
	}

	.logo {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	.performance {
		-webkit-transform: translateZ(0);
		backface-visibility: hidden;
		perspective: 1000;
		transform: translate3d(0,0,0);
		transform: translateZ(0);
	}

	::placeholder {
		color: currentcolor;
		opacity: 1;
	}

	input[type="search"]::-webkit-search-decoration,
	input[type="search"]::-webkit-search-cancel-button,
	input[type="search"]::-webkit-search-results-button,
	input[type="search"]::-webkit-search-results-decoration {
		-webkit-appearance: none;
	}

	input[type="hidden"] {
		display: none;
	}

	input,
	textarea,
	select {
		font-size: ${pxToRem(18)};
		width: 100%;
		appearance: none;
	}

	input::placeholder,
	textarea::placeholder {
		transition: all var(--transition-speed-default) var(--transition-ease);
	}

	textarea {
		min-height: 5rem;
	}

	label {
		display: inline-block;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	img,
	video {
		max-width: 100%;
		display: block;
		height: auto;
	}

	iframe {
		max-width: 100%;
		display: block;
	}

	html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

.right-align {
	text-align: right;
}
`;
