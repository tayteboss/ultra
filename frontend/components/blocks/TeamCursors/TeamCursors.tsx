import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

type Props = {
	data: string[];
};

const TeamCursorsWrapper = styled.div`
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;
	height: 100%;
	width: 100%;
	transform: translate(-50%, -50%);
`;

const TeamCursor = styled(motion.div)`
	color: var(--colour-orange);
	position: absolute;

	transition: color var(--transition-speed-slow) var(--transition-ease);

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		right: calc(100% + 8px);
		height: 8px;
		width: 8px;
		background: var(--colour-orange);
		transform: translateY(-50%);
		border-radius: 100%;

		transition: background var(--transition-speed-slow)
			var(--transition-ease);
	}
`;

const cursorOneVariants = {
	hidden: {
		opacity: 1
	},
	visible: {
		opacity: 1,
		top: ['50%', '10%', '70%', '30%', '20%', '10%', '50%', '80%', '50%'],
		left: ['10%', '40%', '30%', '60%', '50%', '10%', '30%', '80%', '10%'],
		transition: {
			duration: 100,
			repeat: Infinity
		}
	}
};

const cursorTwoVariants = {
	hidden: {
		opacity: 1
	},
	visible: {
		opacity: 1,
		top: ['80%', '70%', '20%', '60%', '10%', '20%', '80%', '80%'],
		left: ['60%', '30%', '40%', '70%', '80%', '60%'],
		transition: {
			duration: 100,
			repeat: Infinity,
			delay: 3
		}
	}
};

const cursorThreeVariants = {
	hidden: {
		opacity: 1
	},
	visible: {
		opacity: 1,
		top: ['30%', '70%', '40%', '10%', '30%'],
		left: ['30%', '60%', '10%', '40%', '30%'],
		transition: {
			duration: 100,
			repeat: Infinity
		}
	}
};

const cursorFourVariants = {
	hidden: {
		opacity: 1
	},
	visible: {
		opacity: 1,
		top: ['10%', '30%', '50%', '20%', '40%', '70%', '40%', '70%'],
		left: ['80%', '70%', '80%', '20%', '10%', '70%', '5%', '40%'],
		transition: {
			duration: 100,
			repeat: Infinity
		}
	}
};

const cursorFiveVariants = {
	hidden: {
		opacity: 1
	},
	visible: {
		opacity: 1,
		top: ['80%', '70%', '90%', '80%', '40%'],
		left: ['10%', '20%', '50%', '10%', '50%'],
		transition: {
			duration: 100,
			repeat: Infinity
		}
	}
};

const TeamCursors = (props: Props) => {
	const { data } = props;

	const cursorOne = data[0];
	const cursorTwo = data[1];
	const cursorThree = data[2];
	const cursorFour = data[3];
	const cursorFive = data[4];

	return (
		<TeamCursorsWrapper>
			<AnimatePresence>
				{cursorOne && (
					<TeamCursor
						key={cursorOne}
						variants={cursorOneVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{cursorOne}
					</TeamCursor>
				)}
				{cursorTwo && (
					<TeamCursor
						key={cursorTwo}
						variants={cursorTwoVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{cursorTwo}
					</TeamCursor>
				)}
				{cursorThree && (
					<TeamCursor
						key={cursorThree}
						variants={cursorThreeVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{cursorThree}
					</TeamCursor>
				)}
				{cursorFour && (
					<TeamCursor
						key={cursorFour}
						variants={cursorFourVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{cursorFour}
					</TeamCursor>
				)}
				{cursorFive && (
					<TeamCursor
						key={cursorFive}
						variants={cursorFiveVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
					>
						{cursorFive}
					</TeamCursor>
				)}
			</AnimatePresence>
		</TeamCursorsWrapper>
	);
};

export default TeamCursors;
