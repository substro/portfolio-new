import { motion, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Slide1 } from "../slides/slide1";
import { Slide2 } from "../slides/slide2";
import { Slide3 } from "../slides/slide3";
import { Slide4 } from "../slides/slide4";
import { Button } from "../ui/button";

const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
	type: "spring",
	mass: 3,
	stiffness: 400,
	damping: 50,
};

const slides = [
	{ component: <Slide1 />, name: "slide1" },
	{ component: <Slide2 />, name: "slide2" },
	{ component: <Slide3 />, name: "slide3" },
	{ component: <Slide4 />, name: "slide4" },
];

export const SwipeCarousel = () => {
	const [slideIndex, setSlideIndex] = useState(0);

	const dragX = useMotionValue(0);

	const onDragEnd = () => {
		const x = dragX.get();

		if (x <= -DRAG_BUFFER && slideIndex < slides.length - 1) {
			setSlideIndex((pv) => pv + 1);
		} else if (x >= DRAG_BUFFER && slideIndex > 0) {
			setSlideIndex((pv) => pv - 1);
		}
	};

	const goToPrevSlide = () => {
		setSlideIndex((pv) => pv - 1);
	};
	const goToNextSlide = () => {
		setSlideIndex((pv) => pv + 1);
	};

	return (
		<div className="relative bg-red-500 overflow-hidden h-[100dvh]">
			<motion.div
				drag="x"
				dragConstraints={{
					left: 0,
					right: 0,
				}}
				style={{
					x: dragX,
				}}
				animate={{
					translateX: `-${slideIndex * 100}%`,
				}}
				transition={SPRING_OPTIONS}
				onDragEnd={onDragEnd}
				className="flex cursor-grab items-center active:cursor-grabbing"
			>
				<Slides slideIndex={slideIndex} />
			</motion.div>
			{/* <Dots slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
			 */}

			{/* <GradientEdges /> */}

			<div className="absolute inset-0 flex justify-between items-end sm:px-[5rem] md:px-[2rem] py-[2.5rem] lg:px-[4rem]">
				{slideIndex > 0 ? (
					<Button
						onClick={goToPrevSlide}
						className="bg-gray-800 text-white p-2 rounded"
						disabled={slideIndex === 0}
					>
						<ArrowLeft />
						{slideIndex > 0 ? slides[slideIndex - 1].name : ""}
					</Button>
				) : (
					<div />
				)}
				{slideIndex < slides.length - 1 ? (
					<Button
						onClick={goToNextSlide}
						className="bg-gray-800 text-white p-2 rounded"
						disabled={slideIndex === slides.length - 1}
					>
						{slideIndex < slides.length - 1 ? slides[slideIndex + 1].name : ""}
						<ArrowRight />
					</Button>
				) : (
					<div />
				)}
			</div>
		</div>
	);
};

const Slides = ({ slideIndex }: { slideIndex: number }) => {
	return (
		<>
			{slides.map((slide, idx) => (
				<motion.div
					key={idx}
					animate={{
						scale: slideIndex === idx ? 0.95 : 0.85,
					}}
					transition={SPRING_OPTIONS}
					className="w-screen shrink-0 rounded-xl bg-white object-cover h-[100dvh]"
				>
					{slide.component}
				</motion.div>
			))}
		</>
	);
};

// const Dots = ({
// 	slideIndex,
// 	setSlideIndex,
// }: {
// 	slideIndex: number;
// 	setSlideIndex: Dispatch<SetStateAction<number>>;
// }) => {
// 	return (
// 		<div className="flex justify-between my-4 mx-8">
// 			{slides.map((_, idx) => {
// 				return (
// 					<button
// 						key={idx}
// 						onClick={() => setSlideIndex(idx)}
// 						className={`h-3 w-3 rounded-full transition-colors ${
// 							idx === slideIndex ? "bg-neutral-50" : "bg-neutral-500"
// 						}`}
// 					/>
// 				);
// 			})}
// 		</div>
// 	);
// };

export const GradientEdges = () => {
	return (
		<>
			<div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
			<div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
		</>
	);
};
